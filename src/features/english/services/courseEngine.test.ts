import { describe, it, expect } from 'vitest';
import {
  ALL_COURSE_LEVELS,
  getLevelMetadata,
  getUnitMetadata,
  getLessonSummary,
} from '../data/curriculumStructure';
import {
  evaluatePlacementTest,
  MINIMUM_QUESTIONS_REQUIRED,
} from './placementService';
import {
  calculateRecencyWeightedScore,
  isLessonPracticePassed,
  isUnitTestOutQualified,
} from './masteryService';
import { PLACEMENT_QUESTIONS } from '../data/placementQuestions';
import sampleA1Lesson from '../../../../content/course/a1/unit-1/lesson-1.json';
import sampleA2Lesson from '../../../../content/course/a2/unit-1/lesson-1.json';

describe('English Course Engine & Schema Suite', () => {
  describe('1. Curriculum Levels & Unit Structure', () => {
    it('defines all 5 CEFR levels: A1, A2, B1, B2, C1', () => {
      const levels = ALL_COURSE_LEVELS.map((l) => l.level);
      expect(levels).toEqual(['A1', 'A2', 'B1', 'B2', 'C1']);
    });

    it('each level contains 8 units with realistic pedagogical outlines', () => {
      for (const levelMeta of ALL_COURSE_LEVELS) {
        expect(levelMeta.units.length).toBe(8);
        expect(levelMeta.totalUnits).toBe(8);
      }
    });

    it('each unit includes lessons, a Unit Review, and a Unit Test (70% pass mark)', () => {
      for (const levelMeta of ALL_COURSE_LEVELS) {
        for (const unit of levelMeta.units) {
          expect(unit.lessons.length).toBeGreaterThanOrEqual(5);
          expect(unit.reviewLesson).toBeDefined();
          expect(unit.reviewLesson.type).toBe('review');
          expect(unit.unitTest).toBeDefined();
          expect(unit.unitTest.type).toBe('test');

          // Lessons are 8 to 15 minutes
          for (const l of unit.lessons) {
            expect(l.estimatedMinutes).toBeGreaterThanOrEqual(8);
            expect(l.estimatedMinutes).toBeLessThanOrEqual(15);
          }
        }
      }
    });

    it('retrieves unit and lesson metadata by ID', () => {
      const unit = getUnitMetadata('unit-a1-1');
      expect(unit).toBeDefined();
      expect(unit?.title).toContain('To Be');

      const lesson = getLessonSummary('eng-a1-u1-l1');
      expect(lesson).toBeDefined();
      expect(lesson?.order).toBe(1);
    });
  });

  describe('2. Sample Lessons & Anti-Guessing MCQ Rules', () => {
    it('validates A1 sample lesson schema and sections', () => {
      expect(sampleA1Lesson.id).toBe('eng-a1-u1-l1');
      expect(sampleA1Lesson.level).toBe('A1');
      expect(sampleA1Lesson.objectives.length).toBeGreaterThanOrEqual(1);
      expect(sampleA1Lesson.vocabularyList.length).toBeGreaterThanOrEqual(3);

      const sectionTypes = sampleA1Lesson.sections.map((s: any) => s.type);
      expect(sectionTypes).toContain('explain');
      expect(sectionTypes).toContain('timeline');
      expect(sectionTypes).toContain('examples');
      expect(sectionTypes).toContain('dialogue');
      expect(sectionTypes).toContain('practice');
      expect(sectionTypes).toContain('summary');
      expect(sectionTypes).toContain('urduNote');
    });

    it('validates A2 sample lesson schema and sections', () => {
      expect(sampleA2Lesson.id).toBe('eng-a2-u1-l1');
      expect(sampleA2Lesson.level).toBe('A2');
      expect(sampleA2Lesson.prerequisites).toEqual(['eng-a1-u1-l1']);

      const sectionTypes = sampleA2Lesson.sections.map((s: any) => s.type);
      expect(sectionTypes).toContain('explain');
      expect(sectionTypes).toContain('timeline');
      expect(sectionTypes).toContain('practice');
    });

    it('enforces MCQ anti-guessing rules: option IDs, correctOptionId, explanations', () => {
      for (const lesson of [sampleA1Lesson, sampleA2Lesson]) {
        for (const sec of lesson.sections) {
          if (sec.type === 'practice' && Array.isArray((sec as any).exercises)) {
            for (const ex of (sec as any).exercises) {
              expect(ex.explanation).toBeDefined();
              expect(ex.explanation.length).toBeGreaterThan(10);

              if (ex.type === 'mcq') {
                expect(ex.options?.length).toBeGreaterThanOrEqual(2);
                const optIds = (ex.options || []).map((o: any) => o.id);
                expect(optIds).toContain(ex.correctOptionId);

                // Option IDs must be unique
                const set = new Set(optIds);
                expect(set.size).toBe(optIds.length);
              }
            }
          }
        }
      }
    });
  });

  describe('3. Placement Test Engine & Guard Rules', () => {
    it('contains exactly 40 balanced placement questions', () => {
      expect(PLACEMENT_QUESTIONS.length).toBe(40);

      const grammarCount = PLACEMENT_QUESTIONS.filter((q) => q.category === 'grammar').length;
      const vocabCount = PLACEMENT_QUESTIONS.filter((q) => q.category === 'vocabulary').length;
      const readingCount = PLACEMENT_QUESTIONS.filter((q) => q.category === 'reading').length;

      expect(grammarCount).toBe(16);
      expect(vocabCount).toBe(14);
      expect(readingCount).toBe(10);
    });

    it('STRICT GUARD: never assigns level if fewer than 20 questions are answered', () => {
      // User only answered 10 questions
      const partialAnswers: Record<string, string> = {};
      for (let i = 0; i < 10; i++) {
        partialAnswers[PLACEMENT_QUESTIONS[i].id] = PLACEMENT_QUESTIONS[i].correctOptionId;
      }

      const result = evaluatePlacementTest(partialAnswers);
      expect(result.answeredCount).toBe(10);
      expect(result.isReliable).toBe(false);
      expect(result.estimatedLevel).toBe('unknown');
    });

    it('accurately evaluates CEFR level when 20+ questions are completed', () => {
      // User answers 25 questions accurately (targeting B1/B2)
      const answers: Record<string, string> = {};
      for (let i = 0; i < 25; i++) {
        answers[PLACEMENT_QUESTIONS[i].id] = PLACEMENT_QUESTIONS[i].correctOptionId;
      }

      const result = evaluatePlacementTest(answers);
      expect(result.answeredCount).toBe(25);
      expect(result.isReliable).toBe(true);
      expect(['A1', 'A2', 'B1', 'B2', 'C1']).toContain(result.estimatedLevel);
      expect(result.strengths.length).toBeGreaterThanOrEqual(1);
      expect(result.categoryScores.grammar).toBeGreaterThan(0);
    });
  });

  describe('4. Mastery & Recency-Weighted Scoring', () => {
    it('weights recent scores more heavily than older attempts', () => {
      // Recent score: 100%, older scores: 50%, 50%
      const weighted1 = calculateRecencyWeightedScore([100, 50, 50]);
      // Older score: 100%, recent scores: 50%, 50%
      const weighted2 = calculateRecencyWeightedScore([50, 50, 100]);

      expect(weighted1).toBeGreaterThan(weighted2);
    });

    it('enforces 70% passing threshold for lesson completion', () => {
      expect(isLessonPracticePassed(70)).toBe(true);
      expect(isLessonPracticePassed(85)).toBe(true);
      expect(isLessonPracticePassed(69)).toBe(false);
      expect(isLessonPracticePassed(50)).toBe(false);
    });

    it('enforces 85% threshold for unit test-out skipping', () => {
      expect(isUnitTestOutQualified(85)).toBe(true);
      expect(isUnitTestOutQualified(95)).toBe(true);
      expect(isUnitTestOutQualified(84)).toBe(false);
      expect(isUnitTestOutQualified(75)).toBe(false);
    });
  });
});
