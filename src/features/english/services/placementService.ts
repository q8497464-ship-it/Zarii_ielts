import { PLACEMENT_QUESTIONS } from '../data/placementQuestions';
import { db, saveProfile, getActiveProfile } from '../../../lib/db';
import type { PlacementTestResult, PlacementQuestion } from '../../../types/course';
import type { EnglishCEFRLevel } from '../../../types';

export const MINIMUM_QUESTIONS_REQUIRED = 20;

export function evaluatePlacementTest(answers: Record<string, string>): PlacementTestResult {
  const totalQuestions = PLACEMENT_QUESTIONS.length;
  const answeredKeys = Object.keys(answers).filter((k) => answers[k] !== undefined && answers[k] !== '');
  const answeredCount = answeredKeys.length;

  // Strict Reliability Guard: Never assign an official CEFR level if < 20 questions were answered
  const isReliable = answeredCount >= MINIMUM_QUESTIONS_REQUIRED;

  let totalScoreWeight = 0;
  let earnedScoreWeight = 0;

  const categoryStats = {
    grammar: { earned: 0, total: 0 },
    vocabulary: { earned: 0, total: 0 },
    reading: { earned: 0, total: 0 },
  };

  const strengthsSet = new Set<string>();
  const gapsSet = new Set<string>();

  for (const q of PLACEMENT_QUESTIONS) {
    const weight = q.difficultyWeight;
    const userAnswer = answers[q.id];

    // Only count questions that were presented and attempted
    if (userAnswer !== undefined && userAnswer !== '') {
      totalScoreWeight += weight;
      categoryStats[q.category].total += 1;

      const isCorrect = userAnswer === q.correctOptionId;
      if (isCorrect) {
        earnedScoreWeight += weight;
        categoryStats[q.category].earned += 1;
        strengthsSet.add(humanizeSkillTag(q.skillTag));
      } else {
        gapsSet.add(humanizeSkillTag(q.skillTag));
      }
    }
  }

  const overallScorePercent = totalScoreWeight > 0
    ? Math.round((earnedScoreWeight / totalScoreWeight) * 100)
    : 0;

  const grammarScore = categoryStats.grammar.total > 0
    ? Math.round((categoryStats.grammar.earned / categoryStats.grammar.total) * 100)
    : 0;
  const vocabScore = categoryStats.vocabulary.total > 0
    ? Math.round((categoryStats.vocabulary.earned / categoryStats.vocabulary.total) * 100)
    : 0;
  const readingScore = categoryStats.reading.total > 0
    ? Math.round((categoryStats.reading.earned / categoryStats.reading.total) * 100)
    : 0;

  // Level determination: A1 to C1
  let estimatedLevel: EnglishCEFRLevel = 'unknown';
  let recommendedLevel: EnglishCEFRLevel = 'A1';
  let recommendedUnitId = 'unit-a1-1';

  if (isReliable) {
    if (overallScorePercent >= 85) {
      estimatedLevel = 'C1';
      recommendedLevel = 'C1';
      recommendedUnitId = 'unit-c1-1';
    } else if (overallScorePercent >= 70) {
      estimatedLevel = 'B2';
      recommendedLevel = 'B2';
      recommendedUnitId = 'unit-b2-1';
    } else if (overallScorePercent >= 55) {
      estimatedLevel = 'B1';
      recommendedLevel = 'B1';
      recommendedUnitId = 'unit-b1-1';
    } else if (overallScorePercent >= 40) {
      estimatedLevel = 'A2';
      recommendedLevel = 'A2';
      recommendedUnitId = 'unit-a2-1';
    } else {
      estimatedLevel = 'A1';
      recommendedLevel = 'A1';
      recommendedUnitId = 'unit-a1-1';
    }
  }

  // Pick top 4 strengths and gaps
  const strengths = Array.from(strengthsSet).slice(0, 4);
  const gaps = Array.from(gapsSet).filter((g) => !strengthsSet.has(g)).slice(0, 4);

  return {
    estimatedLevel,
    overallScorePercent,
    answeredCount,
    totalQuestions,
    isReliable,
    categoryScores: {
      grammar: grammarScore,
      vocabulary: vocabScore,
      reading: readingScore,
    },
    strengths,
    knowledgeGaps: gaps,
    recommendedUnitId,
    recommendedLevel,
    completedAt: new Date().toISOString(),
  };
}

export async function savePlacementResult(result: PlacementTestResult): Promise<void> {
  if (!result.isReliable) return;

  try {
    // 1. Update user profile
    const profile = await getActiveProfile();
    if (profile) {
      await saveProfile({
        ...profile,
        englishLevel: result.estimatedLevel,
      });
    }

    // 2. Initialize course progress in Dexie
    const existing = await db.courseProgress.where('courseId').equals(result.recommendedUnitId).first();
    if (!existing) {
      await db.courseProgress.add({
        courseId: result.recommendedUnitId,
        level: result.recommendedLevel,
        status: 'in_progress',
        progressPercentage: 0,
        completedLessons: [],
        lastAccessedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error('Failed to persist placement result:', err);
  }
}

function humanizeSkillTag(tag: string): string {
  return tag
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
