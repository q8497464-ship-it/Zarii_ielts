import { db } from '../../../lib/db';
import { ALL_COURSE_LEVELS, getLevelMetadata, getUnitMetadata, getLessonSummary } from '../data/curriculumStructure';
import type { EnglishCEFRLevel } from '../../../types';
import type { UnitProgressState, UnitNodeStatus, CourseLessonSummary } from '../../../types/course';
import { isLessonPracticePassed, isUnitTestOutQualified } from './masteryService';

// Pre-bundled sample JSON lessons
import sampleA1Lesson from '../../../../content/course/a1/unit-1/lesson-1.json';
import sampleA2Lesson from '../../../../content/course/a2/unit-1/lesson-1.json';

const SAMPLE_LESSONS_MAP: Record<string, any> = {
  'eng-a1-u1-l1': sampleA1Lesson,
  'eng-a2-u1-l1': sampleA2Lesson,
};

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
 * Loads a lesson definition by ID. Returns the full sample lesson if available,
 * or generates a structured interactive lesson template from curriculum metadata.
 */
export async function getCourseLesson(lessonId: string): Promise<any> {
  // 1. Check if complete sample lesson is loaded
  if (SAMPLE_LESSONS_MAP[lessonId]) {
    return SAMPLE_LESSONS_MAP[lessonId];
  }

  // 2. Fallback to curriculum metadata template
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
