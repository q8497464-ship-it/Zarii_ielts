import { db } from '../../../lib/db';
import { ALL_COURSE_LEVELS, getLevelMetadata, getUnitMetadata, getLessonSummary } from '../data/curriculumStructure';
import type { EnglishCEFRLevel } from '../../../types';
import type { UnitProgressState, UnitNodeStatus, CourseLessonSummary } from '../../../types/course';
import { isLessonPracticePassed, isUnitTestOutQualified } from './masteryService';
import { adminCourseStore } from './adminCourseStore';

// Dynamically import all course JSON lessons
const lessonModules = import.meta.glob<{ default: any }>('../../../../content/course/**/*.json', { eager: true });
const COURSE_LESSONS_MAP: Record<string, any> = {};

for (const path in lessonModules) {
  const mod = lessonModules[path];
  const lessonData = (mod && (mod.default || mod)) as any;
  if (lessonData && lessonData.id) {
    COURSE_LESSONS_MAP[lessonData.id] = lessonData;
  }
}

/**
 * Returns all pre-bundled lesson objects
 */
export function getAllLoadedCourseLessons(): Record<string, any> {
  return COURSE_LESSONS_MAP;
}

/**
 * Returns progress records for all units in a given level
 */
export async function getLevelUnitsProgress(level: EnglishCEFRLevel): Promise<Record<string, UnitProgressState>> {
  const levelMeta = getLevelMetadata(level);
  const result: Record<string, UnitProgressState> = {};

  try {
    const records = await db.courseProgress.where('level').equals(level).toArray();
    const recordMap = new Map(records.map((r) => [r.courseId, r]));

    for (let i = 0; i < levelMeta.units.length; i++) {
      const unit = levelMeta.units[i];
      const record = recordMap.get(unit.id);

      const completedLessons = record?.completedLessons || [];
      const totalLessonsInUnit = unit.lessons.length;
      const percent = totalLessonsInUnit > 0
        ? Math.round((completedLessons.length / totalLessonsInUnit) * 100)
        : 0;

      let status: UnitNodeStatus = 'locked';
      const isFirstUnit = i === 0;

      if (record?.status === 'completed' || percent >= 100) {
        status = 'completed';
      } else if (record?.status === 'in_progress' || completedLessons.length > 0) {
        status = 'in_progress';
      } else if (isFirstUnit) {
        status = 'available';
      } else {
        // Unlocks if prior unit is completed
        const prevUnit = levelMeta.units[i - 1];
        const prevRecord = recordMap.get(prevUnit.id);
        if (prevRecord?.status === 'completed' || (prevRecord?.completedLessons?.length || 0) >= prevUnit.lessons.length) {
          status = 'available';
        } else {
          status = 'locked';
        }
      }

      result[unit.id] = {
        unitId: unit.id,
        level,
        status,
        progressPercent: percent,
        completedLessonIds: completedLessons,
        testedOut: record?.status === 'completed' && completedLessons.length === 0,
        lastStudiedAt: record?.lastAccessedAt,
      };
    }
  } catch (err) {
    console.error('Failed to load level progress:', err);
  }

  return result;
}

/**
 * Loads a lesson definition by ID.
 * Returns the full JSON lesson if available, or synthesizes a unit test / review, or fallback.
 */
export async function getCourseLesson(
  lessonId: string,
  options: { forStudent?: boolean } = { forStudent: true }
): Promise<any> {
  // 0. Check admin course store with draft vs published privacy enforcement
  const dynamicLesson = adminCourseStore.getLesson(lessonId, { forStudent: options.forStudent });
  if (dynamicLesson) {
    return dynamicLesson;
  }
  const draftLesson = adminCourseStore.getLesson(lessonId, { forStudent: false });
  if (draftLesson && draftLesson.status === 'draft' && options.forStudent) {
    return null;
  }

  // 1. Check if complete lesson is loaded in map
  if (COURSE_LESSONS_MAP[lessonId]) {
    return COURSE_LESSONS_MAP[lessonId];
  }

  // 2. Unit Test requests (e.g. eng-a1-u1-test)
  if (lessonId.endsWith('-test')) {
    return getUnitTest(lessonId);
  }

  // 3. Unit Review requests (e.g. eng-a1-u1-review)
  if (lessonId.endsWith('-review')) {
    return getUnitReview(lessonId);
  }

  // 4. Fallback to curriculum metadata template
  const summary = getLessonSummary(lessonId);
  if (!summary) return null;

  return {
    id: summary.id,
    level: summary.id.split('-')[1]?.toUpperCase() || 'A1',
    unit: summary.unitId,
    order: summary.order,
    title: summary.title,
    description: summary.description,
    objectives: [
      `Understand key grammatical patterns for ${summary.title}`,
      `Identify core vocabulary and conversational structures`,
      `Demonstrate 70%+ accuracy in interactive practice exercises`,
    ],
    estimatedMinutes: summary.estimatedMinutes,
    prerequisites: summary.prerequisites || [],
    skillTags: summary.skillTags,
    vocabularyList: [
      {
        word: 'practice',
        partOfSpeech: 'noun',
        definition: 'Repeated exercise in or performance of an activity so as to acquire or maintain proficiency.',
        urduMeaning: 'مشق کرنا',
      },
      {
        word: 'improve',
        partOfSpeech: 'verb',
        definition: 'Make or become better in quality or skill.',
        urduMeaning: 'بہتر بنانا',
      },
    ],
    sections: [
      {
        id: `${summary.id}-sec-1`,
        type: 'explain',
        title: summary.title,
        content: `Welcome to **${summary.title}**.\n\nIn this lesson, you will master the principles of ${summary.description.toLowerCase()}\n\nStudy the examples below, review the dialogue, and complete the practice exercises to earn progress.`,
      },
      {
        id: `${summary.id}-sec-2`,
        type: 'examples',
        title: 'Key Examples',
        examples: [
          {
            english: `This is an essential example sentence illustrating ${summary.title}.`,
            urdu: 'یہ ایک اہم وضاحتی جملہ ہے۔',
            audioText: `This is an essential example sentence illustrating ${summary.title}.`,
          },
        ],
      },
      {
        id: `${summary.id}-sec-3`,
        type: 'practice',
        title: 'Interactive Practice',
        exercises: [
          {
            id: `${summary.id}-ex-1`,
            type: 'mcq',
            skillTag: summary.skillTags[0] || 'general-grammar',
            prompt: `Choose the correct option representing ${summary.title}:`,
            options: [
              { id: 'opt-1', text: 'Accurate grammatical application' },
              { id: 'opt-2', text: 'Incorrect grammatical distractor' },
              { id: 'opt-3', text: 'Unrelated distractor option' },
              { id: 'opt-4', text: 'None of the above', isPinned: true },
            ],
            correctOptionId: 'opt-1',
            explanation: 'The first option demonstrates the correct grammatical rule outlined in this unit.',
            urduExplanation: 'پہلا آپشن اس یونٹ کے بنیادی گرامر کے اصول کے مطابق درست ہے۔',
          },
        ],
      },
    ],
  };
}

/**
 * Constructs a 20-question Unit Test dynamically from the unit's lessons
 */
export function getUnitTest(testId: string): any {
  // Support both eng-a1-u1-test and unit-a1-1-test / unit-a1-1
  let level = 'A1';
  let unitNum = 1;

  const engMatch = testId.match(/^eng-([a-c][1-2])-u([0-9]+)-test$/i);
  const unitMatch = testId.match(/^unit-([a-c][1-2])-([0-9]+)(?:-test)?$/i);

  if (engMatch) {
    level = engMatch[1].toUpperCase();
    unitNum = parseInt(engMatch[2], 10);
  } else if (unitMatch) {
    level = unitMatch[1].toUpperCase();
    unitNum = parseInt(unitMatch[2], 10);
  }

  const unitId = `unit-${level.toLowerCase()}-${unitNum}`;

  // Gather all exercises across this unit's lessons
  const pool: any[] = [];
  for (let l = 1; l <= 6; l++) {
    const lId = `eng-${level.toLowerCase()}-u${unitNum}-l${l}`;
    const lesson = COURSE_LESSONS_MAP[lId];
    if (lesson && lesson.sections) {
      for (const sec of lesson.sections) {
        if ((sec.type === 'practice' || sec.type === 'quiz') && Array.isArray(sec.exercises)) {
          pool.push(...sec.exercises);
        }
      }
    }
  }

  // Shuffle and pick 20 questions
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, 20);

  return {
    id: testId,
    level,
    unit: unitId,
    order: 99,
    title: `Unit ${unitNum} Comprehensive Mastery Test`,
    description: `Evaluate your overall mastery across Unit ${unitNum}. Score 70%+ to unlock the next unit (or 85%+ to test out).`,
    objectives: [
      `Demonstrate 70%+ comprehensive mastery of Unit ${unitNum} grammar and vocabulary`,
      `Complete 20 timed evaluation questions across all unit topics`,
      `Unlock the subsequent unit on the learning path`,
    ],
    estimatedMinutes: 20,
    skillTags: [`unit-${unitNum}-test`],
    vocabularyList: [],
    sections: [
      {
        id: `${testId}-sec-1`,
        type: 'explain',
        title: `Unit ${unitNum} Test Instructions`,
        content: `Welcome to the **Unit ${unitNum} Mastery Test**.\n\nThis test contains **20 questions** covering grammar, vocabulary, sentence structure, and listening comprehension from Unit ${unitNum}.\n\n- **Pass Mark:** 70% (14 / 20 questions)\n- **Test-Out Mark:** 85% (17 / 20 questions)\n- **Daily Retries:** Up to 3 attempts per day with randomized question order.\n\nClick **Next** when you are ready to begin the test questions.`,
      },
      {
        id: `${testId}-sec-2`,
        type: 'quiz',
        title: 'Mastery Test Questions',
        exercises: selectedQuestions.length > 0 ? selectedQuestions : [
          {
            id: `${testId}-q1`,
            type: 'mcq',
            skillTag: 'grammar-basics',
            prompt: 'Choose the grammatically correct sentence:',
            options: [
              { id: 'opt-1', text: 'She works in a hospital every day.' },
              { id: 'opt-2', text: 'She work in a hospital every day.' },
              { id: 'opt-3', text: 'She working in a hospital every day.' },
              { id: 'opt-4', text: 'She is work in a hospital every day.' },
            ],
            correctOptionId: 'opt-1',
            explanation: 'Third-person singular takes -s on the base verb.',
          },
        ],
      },
    ],
  };
}

/**
 * Constructs a spaced Unit Review session
 */
export function getUnitReview(reviewId: string): any {
  let level = 'A1';
  let unitNum = 1;

  const engMatch = reviewId.match(/^eng-([a-c][1-2])-u([0-9]+)-review$/i);
  const unitMatch = reviewId.match(/^unit-([a-c][1-2])-([0-9]+)(?:-review)?$/i);

  if (engMatch) {
    level = engMatch[1].toUpperCase();
    unitNum = parseInt(engMatch[2], 10);
  } else if (unitMatch) {
    level = unitMatch[1].toUpperCase();
    unitNum = parseInt(unitMatch[2], 10);
  }

  const unitId = `unit-${level.toLowerCase()}-${unitNum}`;

  // Gather summary points and exercises from the unit's lessons
  const reviewExercises: any[] = [];
  const reviewTakeaways: string[] = [];

  for (let l = 1; l <= 6; l++) {
    const lId = `eng-${level.toLowerCase()}-u${unitNum}-l${l}`;
    const lesson = COURSE_LESSONS_MAP[lId];
    if (lesson && lesson.sections) {
      for (const sec of lesson.sections) {
        if (sec.type === 'summary' && Array.isArray(sec.summaryPoints)) {
          reviewTakeaways.push(...sec.summaryPoints);
        }
        if (sec.type === 'practice' && Array.isArray(sec.exercises)) {
          reviewExercises.push(...sec.exercises);
        }
      }
    }
  }

  const shuffledExercises = [...reviewExercises].sort(() => 0.5 - Math.random()).slice(0, 15);

  return {
    id: reviewId,
    level,
    unit: unitId,
    order: 98,
    title: `Unit ${unitNum} Spaced Review`,
    description: `Consolidate grammar rules, vocabulary, and sentence patterns from Unit ${unitNum}.`,
    objectives: [
      `Review key grammar rules and word order patterns from Unit ${unitNum}`,
      `Strengthen memory retention through spaced retrieval practice`,
    ],
    estimatedMinutes: 15,
    skillTags: [`unit-${unitNum}-review`],
    vocabularyList: [],
    sections: [
      {
        id: `${reviewId}-sec-1`,
        type: 'summary',
        title: `Unit ${unitNum} Core Rules Summary`,
        content: `Review these essential principles before tackling the practice problems:`,
        summaryPoints: reviewTakeaways.slice(0, 8),
      },
      {
        id: `${reviewId}-sec-2`,
        type: 'practice',
        title: 'Spaced Retrieval Practice',
        exercises: shuffledExercises,
      },
    ],
  };
}

/**
 * Daily Unit Test Retry Tracking (Allow 3 retries per day with different question order)
 */
export function getUnitTestRetriesToday(unitId: string): { attemptsToday: number; canAttempt: boolean } {
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `zarii_unit_test_retries_${unitId}_${today}`;
    const val = parseInt(localStorage.getItem(key) || '0', 10);
    return {
      attemptsToday: val,
      canAttempt: val < 3,
    };
  } catch (err) {
    return { attemptsToday: 0, canAttempt: true };
  }
}

export function recordUnitTestAttemptToday(unitId: string): void {
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `zarii_unit_test_retries_${unitId}_${today}`;
    const val = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, String(val + 1));
  } catch (err) {
    console.error('Failed to record unit test retry:', err);
  }
}

/**
 * Auto-Save & Resume Progress:
 * Saves user's current step, answers, and section progress in localStorage
 */
export function saveLessonSession(lessonId: string, state: {
  activeSectionIdx: number;
  userAnswers: Record<string, any>;
  completedSectionIndices: number[];
}): void {
  try {
    const key = `zarii_lesson_step_${lessonId}`;
    localStorage.setItem(key, JSON.stringify({
      ...state,
      timestamp: Date.now(),
    }));
  } catch (err) {
    console.warn('Failed to auto-save lesson session:', err);
  }
}

export function loadLessonSession(lessonId: string): {
  activeSectionIdx: number;
  userAnswers: Record<string, any>;
  completedSectionIndices: number[];
} | null {
  try {
    const key = `zarii_lesson_step_${lessonId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Discard sessions older than 7 days
    if (Date.now() - (parsed.timestamp || 0) > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(key);
      return null;
    }
    return {
      activeSectionIdx: parsed.activeSectionIdx || 0,
      userAnswers: parsed.userAnswers || {},
      completedSectionIndices: parsed.completedSectionIndices || [],
    };
  } catch (err) {
    return null;
  }
}

export function clearLessonSession(lessonId: string): void {
  try {
    localStorage.removeItem(`zarii_lesson_step_${lessonId}`);
  } catch (err) {
    // Ignore
  }
}

/**
 * XP & Anti-Gaming Calculation:
 * - Base XP: 50 XP
 * - Mastery Bonus: +25 XP (if >= 90%), +50 XP (if 100%)
 * - No XP for empty or rapid random answers (avg seconds per question < 1.5s & accuracy < 50%)
 */
export function calculateAwardedXp(params: {
  scorePercent: number;
  totalQuestions: number;
  totalTimeSeconds: number;
}): { xp: number; isRapidGuessing: boolean } {
  const { scorePercent, totalQuestions, totalTimeSeconds } = params;

  if (totalQuestions <= 0) return { xp: 0, isRapidGuessing: false };

  const avgSec = totalTimeSeconds / totalQuestions;
  const isRapidGuessing = totalQuestions >= 3 && avgSec < 1.8 && scorePercent < 50;

  if (isRapidGuessing || scorePercent < 50) {
    return { xp: 0, isRapidGuessing };
  }

  let xp = 50;
  if (scorePercent >= 90) xp += 25;
  if (scorePercent === 100) xp += 25;

  return { xp, isRapidGuessing: false };
}

/**
 * Records completion of a lesson if practice score >= 70%
 */
export async function completeLesson(
  lessonId: string,
  unitId: string,
  level: EnglishCEFRLevel,
  scorePercent: number,
  answers: Record<string, any>
): Promise<{ passed: boolean; message: string }> {
  const passed = isLessonPracticePassed(scorePercent);
  const now = new Date().toISOString();

  try {
    // 1. Record individual attempt
    await db.lessonAttempts.add({
      lessonId,
      courseId: unitId,
      track: 'english',
      score: scorePercent,
      totalQuestions: Object.keys(answers).length || 1,
      answers,
      completedAt: now,
    });

    if (passed) {
      // Clear saved in-progress session
      clearLessonSession(lessonId);

      // 2. Update unit progress in Dexie
      const existing = await db.courseProgress.where('courseId').equals(unitId).first();
      const completedSet = new Set(existing?.completedLessons || []);
      completedSet.add(lessonId);

      const unitMeta = getUnitMetadata(unitId);
      const totalLessons = unitMeta ? unitMeta.lessons.length : 5;
      const progressPercent = Math.min(100, Math.round((completedSet.size / totalLessons) * 100));
      const status = progressPercent >= 100 ? 'completed' : 'in_progress';

      if (existing && existing.id) {
        await db.courseProgress.update(existing.id, {
          completedLessons: Array.from(completedSet),
          progressPercentage: progressPercent,
          status,
          lastAccessedAt: now,
        });
      } else {
        await db.courseProgress.add({
          courseId: unitId,
          level,
          status,
          progressPercentage: progressPercent,
          completedLessons: Array.from(completedSet),
          lastAccessedAt: now,
        });
      }

      return { passed: true, message: 'Lesson completed successfully! Progress recorded.' };
    } else {
      return {
        passed: false,
        message: `Practice score was ${scorePercent}%. A score of 70% or higher is required to complete this lesson.`,
      };
    }
  } catch (err) {
    console.error('Failed to complete lesson:', err);
    return { passed: false, message: 'An error occurred while saving progress.' };
  }
}

/**
 * Handles 'Test Out' for a unit: strong learners who score >= 85% on the unit test skip the unit
 */
export async function testOutUnit(
  unitId: string,
  level: EnglishCEFRLevel,
  scorePercent: number
): Promise<{ qualified: boolean; message: string }> {
  const qualified = isUnitTestOutQualified(scorePercent);
  const now = new Date().toISOString();

  if (qualified) {
    try {
      const existing = await db.courseProgress.where('courseId').equals(unitId).first();
      if (existing && existing.id) {
        await db.courseProgress.update(existing.id, {
          status: 'completed',
          progressPercentage: 100,
          lastAccessedAt: now,
        });
      } else {
        await db.courseProgress.add({
          courseId: unitId,
          level,
          status: 'completed',
          progressPercentage: 100,
          completedLessons: [],
          lastAccessedAt: now,
        });
      }
      return {
        qualified: true,
        message: `Congratulations! With a score of ${scorePercent}%, you tested out of this unit.`,
      };
    } catch (err) {
      console.error('Failed to test out of unit:', err);
      return { qualified: false, message: 'Failed to record unit test-out result.' };
    }
  }

  return {
    qualified: false,
    message: `Score was ${scorePercent}%. You need 85% or higher to test out of this unit.`,
  };
}
