import type { EnglishCEFRLevel } from './index';

export type CourseItemType = 'lesson' | 'review' | 'test';

export interface CourseLessonSummary {
  id: string;
  unitId: string;
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  type: CourseItemType;
  skillTags: string[];
  prerequisites?: string[];
}

export interface CourseUnitMetadata {
  id: string;
  unitNumber: number;
  level: EnglishCEFRLevel;
  title: string;
  description: string;
  topicIcon: string;
  estimatedHours: number;
  lessons: CourseLessonSummary[];
  reviewLesson: CourseLessonSummary;
  unitTest: CourseLessonSummary;
}

export interface CourseLevelMetadata {
  level: EnglishCEFRLevel;
  title: string;
  subtitle: string;
  description: string;
  totalUnits: number;
  badge: string;
  themeColor: string;
  units: CourseUnitMetadata[];
}

export type UnitNodeStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface UnitProgressState {
  unitId: string;
  level: EnglishCEFRLevel;
  status: UnitNodeStatus;
  progressPercent: number;
  completedLessonIds: string[];
  testedOut: boolean;
  unitTestScore?: number;
  lastStudiedAt?: string;
}

export interface SkillMasteryRecord {
  skillTag: string;
  level: EnglishCEFRLevel;
  masteryPercent: number; // 0 - 100
  totalAttempts: number;
  lastScore: number;
  recentScores: number[]; // Last 5 scores for recency weighting
  lastPracticedAt: string;
}

export interface PlacementQuestion {
  id: string;
  level: EnglishCEFRLevel;
  category: 'grammar' | 'vocabulary' | 'reading';
  skillTag: string;
  difficultyWeight: number; // 1 (A1) to 5 (C1)
  prompt: string;
  readingPassage?: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctOptionId: string;
  explanation: string;
}

export interface PlacementTestResult {
  estimatedLevel: EnglishCEFRLevel;
  overallScorePercent: number;
  answeredCount: number;
  totalQuestions: number;
  isReliable: boolean; // Must have >= 20 questions answered
  categoryScores: {
    grammar: number;
    vocabulary: number;
    reading: number;
  };
  strengths: string[];
  knowledgeGaps: string[];
  recommendedUnitId: string;
  recommendedLevel: EnglishCEFRLevel;
  completedAt: string;
}
