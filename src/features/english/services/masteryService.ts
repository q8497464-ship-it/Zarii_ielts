import { db } from '../../../lib/db';
import type { SkillMasteryRecord } from '../../../types/course';
import type { EnglishCEFRLevel } from '../../../types';
import { createInitialVocabProgress } from '../../../shared/vocab-engine/sm2';

const MASTERY_STORAGE_KEY = 'zarii_english_skill_mastery';

/**
 * Loads all skill mastery records from persistence
 */
export function getAllSkillMastery(): Record<string, SkillMasteryRecord> {
  try {
    const raw = localStorage.getItem(MASTERY_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load skill mastery:', err);
  }
  return {};
}

/**
 * Computes recency-weighted mastery percentage for a skillTag:
 * Latest attempt (0.50), 2nd latest (0.30), 3rd (0.15), 4th/5th (0.05)
 */
export function calculateRecencyWeightedScore(recentScores: number[]): number {
  if (!recentScores || recentScores.length === 0) return 0;
  if (recentScores.length === 1) return recentScores[0];

  const weights = [0.50, 0.30, 0.15, 0.05];
  let totalWeighted = 0;
  let totalWeight = 0;

  for (let i = 0; i < recentScores.length; i++) {
    const w = weights[i] || 0.05;
    totalWeighted += recentScores[i] * w;
    totalWeight += w;
  }

  return Math.round(totalWeighted / totalWeight);
}

/**
 * Updates mastery for a skill tag following practice / quiz results
 */
export function recordSkillPracticeResult(
  skillTag: string,
  level: EnglishCEFRLevel,
  scorePercent: number
): SkillMasteryRecord {
  const store = getAllSkillMastery();
  const existing = store[skillTag] || {
    skillTag,
    level,
    masteryPercent: 0,
    totalAttempts: 0,
    lastScore: 0,
    recentScores: [],
    lastPracticedAt: new Date().toISOString(),
  };

  // Prepend latest score to recentScores (keep at most 5)
  const updatedRecent = [scorePercent, ...(existing.recentScores || [])].slice(0, 5);
  const weighted = calculateRecencyWeightedScore(updatedRecent);

  const updatedRecord: SkillMasteryRecord = {
    skillTag,
    level,
    masteryPercent: weighted,
    totalAttempts: existing.totalAttempts + 1,
    lastScore: scorePercent,
    recentScores: updatedRecent,
    lastPracticedAt: new Date().toISOString(),
  };

  store[skillTag] = updatedRecord;

  try {
    localStorage.setItem(MASTERY_STORAGE_KEY, JSON.stringify(store));
  } catch (err) {
    console.error('Failed to persist skill mastery:', err);
  }

  return updatedRecord;
}

/**
 * Feeds a wrong exercise attempt into the shared Mistake Notebook (db.mistakes)
 */
export async function recordMistakeToNotebook(params: {
  questionId: string;
  skillTag: string;
  lessonTitle: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
}): Promise<void> {
  try {
    const now = new Date().toISOString();
    const existing = await db.mistakes
      .where('questionId')
      .equals(params.questionId)
      .first();

    if (existing && existing.id) {
      await db.mistakes.update(existing.id, {
        retryCount: (existing.retryCount || 0) + 1,
        userAnswer: params.userAnswer,
        lastReviewedAt: now,
      });
    } else {
      await db.mistakes.add({
        questionId: params.questionId,
        module: 'reading' as any, // Typed compatibility with schema
        track: 'english',
        questionType: params.skillTag,
        topic: params.skillTag,
        difficulty: 'standard',
        questionPrompt: params.prompt,
        passageOrContextTitle: params.lessonTitle,
        userAnswer: params.userAnswer,
        correctAnswer: params.correctAnswer,
        explanation: params.explanation,
        isMastered: false,
        retryCount: 0,
        createdAt: now,
      });
    }
  } catch (err) {
    console.error('Failed to record mistake into notebook:', err);
  }
}

/**
 * Feeds lesson vocabulary words into the shared Spaced-Repetition review (db.vocabProgress)
 */
export async function addLessonVocabToSpacedRepetition(
  vocabularyList: Array<{
    word: string;
    partOfSpeech?: string;
    phonetic?: string;
    definition: string;
    urduMeaning?: string;
    exampleSentence?: string;
  }>,
  lessonTitle: string
): Promise<number> {
  let addedCount = 0;
  const now = new Date().toISOString();

  try {
    for (const item of vocabularyList) {
      const cleanWord = item.word.trim().toLowerCase();
      const existing = await db.vocabProgress
        .where('word')
        .equals(cleanWord)
        .first();

      if (!existing) {
        const initial = createInitialVocabProgress({
          id: `eng-vocab-${cleanWord}`,
          word: cleanWord,
          definition: item.definition,
          urduMeaning: item.urduMeaning,
          partOfSpeech: item.partOfSpeech,
          exampleSentence: item.exampleSentence,
          phonetic: item.phonetic,
          topic: lessonTitle,
          track: 'english',
        });

        await db.vocabProgress.add(initial);
        addedCount += 1;
      }
    }
  } catch (err) {
    console.error('Failed to sync vocabulary with spaced repetition:', err);
  }

  return addedCount;
}

/**
 * Evaluates whether a lesson's practice score satisfies the 70% passing threshold
 */
export function isLessonPracticePassed(scorePercent: number): boolean {
  return scorePercent >= 70;
}

/**
 * Evaluates whether a unit test score qualifies for 'Test Out' (>= 85%)
 */
export function isUnitTestOutQualified(scorePercent: number): boolean {
  return scorePercent >= 85;
}
