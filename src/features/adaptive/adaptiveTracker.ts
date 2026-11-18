import { db } from '../../lib/db';
import type {
  QuestionResponse,
  MistakeItem,
  QuestionTypePerformance,
  TopicPerformance,
  DifficultyPerformance,
  IELTSModule,
} from '../../types';

export const QUESTION_TYPE_LABELS: Record<string, string> = {
  true_false_not_given: 'True / False / Not Given',
  yes_no_not_given: 'Yes / No / Not Given',
  matching_headings: 'Matching Headings',
  multiple_choice_single: 'Multiple Choice (Single)',
  multiple_choice_multi: 'Multiple Choice (Multiple)',
  sentence_completion: 'Sentence Completion',
  summary_completion: 'Summary Completion',
  matching_information: 'Matching Information',
  matching_features: 'Matching Features',
  diagram_label_completion: 'Diagram / Map Labeling',
  short_answer: 'Short Answer Questions',
  matching: 'Matching Items',
};

export const CORE_QUESTION_TYPES = [
  'true_false_not_given',
  'matching_headings',
  'multiple_choice_single',
  'sentence_completion',
  'summary_completion',
  'matching_information',
  'matching_features',
  'yes_no_not_given',
  'diagram_label_completion',
  'short_answer',
];

/**
 * Record a batch of question responses into Dexie.
 * Automatically extracts and upserts any incorrect answers into the Mistake Notebook!
 */
export async function recordQuestionResponses(responses: QuestionResponse[]): Promise<void> {
  if (responses.length === 0) return;

  const now = new Date().toISOString();

  const formattedResponses = responses.map((r) => ({
    ...r,
    answeredAt: r.answeredAt || now,
  }));

  await db.responses.bulkAdd(formattedResponses);

  // Extract mistakes
  const mistakesToRecord: MistakeItem[] = [];

  for (const r of responses) {
    if (!r.isCorrect) {
      mistakesToRecord.push({
        questionId: r.questionId,
        module: r.module,
        questionType: r.questionType || 'multiple_choice_single',
        topic: r.topic,
        difficulty: r.difficulty || 'standard',
        questionPrompt: r.questionPrompt || `Question ${r.questionId}`,
        passageOrContextTitle: r.passageOrSectionTitle || 'Practice Passage',
        passageOrAudioExcerpt: r.contextText,
        options: r.options,
        userAnswer: r.userAnswer || '(blank)',
        correctAnswer: r.correctAnswer,
        explanation: r.explanation || 'Review the passage lines and key distractors to confirm the correct answer.',
        isMastered: false,
        retryCount: 0,
        createdAt: now,
      });
    }
  }

  if (mistakesToRecord.length > 0) {
    // Upsert to avoid exact duplicate unmastered entries for the same question
    for (const m of mistakesToRecord) {
      const existing = await db.mistakes
        .where('questionId')
        .equals(m.questionId)
        .first();

      if (existing && existing.id) {
        await db.mistakes.update(existing.id, {
          userAnswer: m.userAnswer,
          lastReviewedAt: now,
          isMastered: false,
          retryCount: (existing.retryCount || 0) + 1,
        });
      } else {
        await db.mistakes.add(m);
      }
    }
  }
}

export interface AdaptivePerformanceSummary {
  byType: Record<string, QuestionTypePerformance>;
  byTopic: Record<string, TopicPerformance>;
  byDifficulty: Record<string, DifficultyPerformance>;
  weakestTypes: string[];
  overallAccuracy: number;
  totalResponses: number;
}

/**
 * Pure calculation function for adaptive performance metrics across question types, topics, and difficulties.
 * Implements rule: difficulty adjusts based on performance:
 * - Increases after 3 good results
 * - Decreases after poor results (< 50% accuracy or consecutive errors)
 */
export function calculateAdaptiveMetrics(
  responses: QuestionResponse[],
  targetBand: number = 7.0
): AdaptivePerformanceSummary {
  const byType: Record<string, QuestionTypePerformance> = {};
  const byTopic: Record<string, TopicPerformance> = {};
  const byDifficulty: Record<string, DifficultyPerformance> = {
    easy: { difficulty: 'easy', totalAttempts: 0, correctAttempts: 0, accuracy: 0 },
    standard: { difficulty: 'standard', totalAttempts: 0, correctAttempts: 0, accuracy: 0 },
    challenging: { difficulty: 'challenging', totalAttempts: 0, correctAttempts: 0, accuracy: 0 },
  };

  // Pre-seed core question types with baseline defaults
  for (const qType of CORE_QUESTION_TYPES) {
    byType[qType] = {
      questionType: qType,
      label: QUESTION_TYPE_LABELS[qType] || qType.replace(/_/g, ' '),
      module: qType.includes('diagram') || qType.includes('sentence') ? 'reading' : 'reading',
      totalAttempts: 0,
      correctAttempts: 0,
      accuracy: 0,
      recentStreak: 0,
      adaptiveDifficulty: targetBand >= 7.5 ? 'challenging' : targetBand >= 6.5 ? 'standard' : 'easy',
      consecutiveGoodResults: 0,
      consecutivePoorResults: 0,
      averageTimeSeconds: 90,
    };
  }

  let totalCorrect = 0;
  const timeTotalsByType: Record<string, { totalTime: number; count: number }> = {};

  // Sort responses chronologically to compute streaks and adaptations
  const sortedResponses = [...responses].sort((a, b) => {
    const timeA = a.answeredAt ? new Date(a.answeredAt).getTime() : 0;
    const timeB = b.answeredAt ? new Date(b.answeredAt).getTime() : 0;
    return timeA - timeB;
  });

  for (const r of sortedResponses) {
    const qType = r.questionType || 'multiple_choice_single';
    if (!byType[qType]) {
      byType[qType] = {
        questionType: qType,
        label: QUESTION_TYPE_LABELS[qType] || qType.replace(/_/g, ' '),
        module: r.module || 'reading',
        totalAttempts: 0,
        correctAttempts: 0,
        accuracy: 0,
        recentStreak: 0,
        adaptiveDifficulty: 'standard',
        consecutiveGoodResults: 0,
        consecutivePoorResults: 0,
        averageTimeSeconds: 90,
      };
    }

    const item = byType[qType];
    item.totalAttempts++;
    if (r.isCorrect) {
      item.correctAttempts++;
      totalCorrect++;
      item.recentStreak = item.recentStreak > 0 ? item.recentStreak + 1 : 1;
      item.consecutiveGoodResults++;
      item.consecutivePoorResults = 0;
    } else {
      item.recentStreak = item.recentStreak < 0 ? item.recentStreak - 1 : -1;
      item.consecutivePoorResults++;
      item.consecutiveGoodResults = 0;
    }

    // Adaptive rule: Increase difficulty after 3 good results
    if (item.consecutiveGoodResults >= 3) {
      if (item.adaptiveDifficulty === 'easy') {
        item.adaptiveDifficulty = 'standard';
        item.consecutiveGoodResults = 0; // reset counter after level up
      } else if (item.adaptiveDifficulty === 'standard') {
        item.adaptiveDifficulty = 'challenging';
        item.consecutiveGoodResults = 0;
      }
    }

    // Adaptive rule: Decrease difficulty after poor results (2 or more consecutive errors, or accuracy dropping)
    if (item.consecutivePoorResults >= 2) {
      if (item.adaptiveDifficulty === 'challenging') {
        item.adaptiveDifficulty = 'standard';
        item.consecutivePoorResults = 0;
      } else if (item.adaptiveDifficulty === 'standard') {
        item.adaptiveDifficulty = 'easy';
        item.consecutivePoorResults = 0;
      }
    }

    // Track time
    if (r.timeSpentSeconds && r.timeSpentSeconds > 0) {
      timeTotalsByType[qType] = timeTotalsByType[qType] || { totalTime: 0, count: 0 };
      timeTotalsByType[qType].totalTime += r.timeSpentSeconds;
      timeTotalsByType[qType].count++;
    }

    // Topic tracking
    const topic = r.topic || 'General Academic';
    if (!byTopic[topic]) {
      byTopic[topic] = { topic, totalAttempts: 0, correctAttempts: 0, accuracy: 0 };
    }
    byTopic[topic].totalAttempts++;
    if (r.isCorrect) byTopic[topic].correctAttempts++;

    // Difficulty tracking
    const diff = (r.difficulty || 'standard') as 'easy' | 'standard' | 'challenging';
    if (byDifficulty[diff]) {
      byDifficulty[diff].totalAttempts++;
      if (r.isCorrect) byDifficulty[diff].correctAttempts++;
    }
  }

  // Calculate percentages
  for (const qType of Object.keys(byType)) {
    const item = byType[qType];
    item.accuracy = item.totalAttempts > 0 ? Math.round((item.correctAttempts / item.totalAttempts) * 100) : 0;
    if (timeTotalsByType[qType] && timeTotalsByType[qType].count > 0) {
      item.averageTimeSeconds = Math.round(timeTotalsByType[qType].totalTime / timeTotalsByType[qType].count);
    }
  }

  for (const topic of Object.keys(byTopic)) {
    const item = byTopic[topic];
    item.accuracy = item.totalAttempts > 0 ? Math.round((item.correctAttempts / item.totalAttempts) * 100) : 0;
  }

  for (const diff of Object.keys(byDifficulty) as Array<'easy' | 'standard' | 'challenging'>) {
    const item = byDifficulty[diff];
    item.accuracy = item.totalAttempts > 0 ? Math.round((item.correctAttempts / item.totalAttempts) * 100) : 0;
  }

  // Identify weakest question types
  const typesWithAttempts = Object.values(byType).filter((t) => t.totalAttempts > 0);
  let weakestTypes: string[] = [];

  if (typesWithAttempts.length > 0) {
    weakestTypes = [...typesWithAttempts]
      .sort((a, b) => {
        if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
        const mistakesA = a.totalAttempts - a.correctAttempts;
        const mistakesB = b.totalAttempts - b.correctAttempts;
        return mistakesB - mistakesA;
      })
      .map((t) => t.questionType)
      .slice(0, 4);
  } else {
    weakestTypes = ['matching_headings', 'true_false_not_given', 'multiple_choice_single', 'sentence_completion'];
  }

  const overallAccuracy =
    responses.length > 0 ? Math.round((totalCorrect / responses.length) * 100) : 0;

  return {
    byType,
    byTopic,
    byDifficulty,
    weakestTypes,
    overallAccuracy,
    totalResponses: responses.length,
  };
}

/**
 * Extracts mistake items from a collection of question responses.
 */
export function extractMistakesFromResponses(responses: QuestionResponse[]): MistakeItem[] {
  const now = new Date().toISOString();
  const mistakes: MistakeItem[] = [];

  for (const r of responses) {
    if (!r.isCorrect) {
      mistakes.push({
        questionId: r.questionId,
        module: r.module,
        questionType: r.questionType || 'multiple_choice_single',
        topic: r.topic,
        difficulty: r.difficulty || 'standard',
        questionPrompt: r.questionPrompt || `Question ${r.questionId}`,
        passageOrContextTitle: r.passageOrSectionTitle || 'Practice Passage',
        passageOrAudioExcerpt: r.contextText,
        options: r.options,
        userAnswer: r.userAnswer || '(blank)',
        correctAnswer: r.correctAnswer,
        explanation: r.explanation || 'Review the passage lines and key distractors to confirm the correct answer.',
        isMastered: false,
        retryCount: 0,
        createdAt: now,
      });
    }
  }

  return mistakes;
}

/**
 * Evaluates a mistake retry attempt.
 */
export function evaluateMistakeRetry(
  mistake: MistakeItem,
  userAnswer: string
): { isCorrect: boolean; updatedMistake: MistakeItem } {
  const trimmedUser = userAnswer.trim().toLowerCase();
  const isCorrect = Array.isArray(mistake.correctAnswer)
    ? mistake.correctAnswer.map((a) => a.trim().toLowerCase()).includes(trimmedUser)
    : mistake.correctAnswer.trim().toLowerCase() === trimmedUser;

  const updatedMistake: MistakeItem = {
    ...mistake,
    userAnswer,
    retryCount: (mistake.retryCount || 0) + 1,
    isMastered: isCorrect ? true : mistake.isMastered,
    lastReviewedAt: new Date().toISOString(),
  };

  return { isCorrect, updatedMistake };
}

/**
 * Calculates adaptive performance metrics across question types, topics, and difficulties from database.
 */
export async function getAdaptivePerformance(targetBand: number = 7.0): Promise<AdaptivePerformanceSummary> {
  const responses = await db.responses.toArray();
  return calculateAdaptiveMetrics(responses, targetBand);
}

/**
 * Returns all unmastered mistakes from the Mistake Notebook.
 */
export async function getUnmasteredMistakes(): Promise<MistakeItem[]> {
  const all = await db.mistakes.toArray();
  return all.filter((m) => !m.isMastered);
}

/**
 * Returns all mistakes with optional module and type filtering.
 */
export async function getMistakes(filters?: {
  module?: IELTSModule | 'all';
  questionType?: string;
  isMastered?: boolean;
}): Promise<MistakeItem[]> {
  let all = await db.mistakes.toArray();

  if (filters?.module && filters.module !== 'all') {
    all = all.filter((m) => m.module === filters.module);
  }
  if (filters?.questionType && filters.questionType !== 'all') {
    all = all.filter((m) => m.questionType === filters.questionType);
  }
  if (filters?.isMastered !== undefined) {
    all = all.filter((m) => m.isMastered === filters.isMastered);
  }

  return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Marks a mistake as mastered (or unmastered).
 */
export async function markMistakeMastered(id: number, isMastered = true): Promise<void> {
  await db.mistakes.update(id, {
    isMastered,
    lastReviewedAt: new Date().toISOString(),
  });
}

/**
 * Updates personal notes on a mistake item.
 */
export async function updateMistakeNotes(id: number, notes: string): Promise<void> {
  await db.mistakes.update(id, {
    notes,
    lastReviewedAt: new Date().toISOString(),
  });
}

/**
 * Increments the retry count and records whether a retry attempt was successful.
 */
export async function recordMistakeRetry(id: number, wasCorrect: boolean): Promise<void> {
  const mistake = await db.mistakes.get(id);
  if (!mistake) return;

  await db.mistakes.update(id, {
    retryCount: (mistake.retryCount || 0) + 1,
    isMastered: wasCorrect ? true : mistake.isMastered,
    lastReviewedAt: new Date().toISOString(),
  });
}
