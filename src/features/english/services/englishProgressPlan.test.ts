import { describe, it, expect, beforeEach } from 'vitest';
import { englishProgressService } from './englishProgressService';
import { englishStudyPlanService } from './englishStudyPlanService';
import { db } from '../../../lib/db';

const mockStorage: Record<string, string> = {};
if (typeof globalThis.localStorage === 'undefined') {
  (globalThis as any).localStorage = {
    getItem: (k: string) => mockStorage[k] ?? null,
    setItem: (k: string, v: string) => { mockStorage[k] = v; },
    removeItem: (k: string) => { delete mockStorage[k]; },
    clear: () => { Object.keys(mockStorage).forEach((k) => delete mockStorage[k]); },
    length: 0,
    key: () => null,
  };
}

describe('English Progress, Study Plan & Motivation Suite', () => {
  beforeEach(async () => {
    // Clear relevant IndexedDB tables if supported
    try {
      await db.courseProgress.clear();
      await db.lessonAttempts.clear();
      await db.studyPlan.clear();
      await db.mistakes.clear();
      await db.vocabProgress.clear();
    } catch {
      // ignore
    }
  });

  describe('1. English Progress & Honest Mastery Engine', () => {
    it('returns honest "Not attempted" overview when learner has 0 attempts', async () => {
      const overview = await englishProgressService.getProgressOverview('Test Learner');
      expect(overview).toBeDefined();
      expect(overview.totalLessonsCompleted).toBe(0);
      expect(overview.estimatedLevelText).toBe('Not attempted');
      expect(overview.isEstimateHonest).toBe(true);
      expect(overview.levelSummaries.length).toBe(5); // A1, A2, B1, B2, C1
    });

    it('calculates skill tag heatmap accuracy categories accurately', async () => {
      const overview = await englishProgressService.getProgressOverview('Test Learner');
      expect(Array.isArray(overview.skillTagHeatmap)).toBe(true);
      expect(overview.skillTagHeatmap.length).toBeGreaterThan(0);

      overview.skillTagHeatmap.forEach((item) => {
        expect(['mastered', 'learning', 'weak', 'unattempted']).toContain(item.status);
        if (item.status === 'unattempted') {
          expect(item.accuracy).toBeNull();
        }
      });
    });

    it('generates weak points with functional "Fix it" practice routes', async () => {
      const overview = await englishProgressService.getProgressOverview('Test Learner');
      expect(Array.isArray(overview.weakPoints)).toBe(true);
      overview.weakPoints.forEach((wp) => {
        expect(wp.fixItUrl).toContain('/app/english/practice?mode=topics&tag=');
        expect(wp.recommendation).toBeDefined();
      });
    });

    it('generates Certificate of Completion with strict mandatory disclaimer', () => {
      const cert = englishProgressService.generateCertificate('A1', 'Sarah Candidate');
      expect(cert.level).toBe('A1');
      expect(cert.studentName).toBe('Sarah Candidate');
      expect(cert.disclaimer).toBe('Zarii certificate of completion. Not an official qualification or exam result.');
      expect(cert.certificateCode).toMatch(/^ZR-ENG-A1-/);
    });
  });

  describe('2. English Study Plan & Adaptive Rebalancer', () => {
    it('generates rule-based 7-day schedule with balanced lessons and reviews', async () => {
      const plan = await englishStudyPlanService.generateWeeklyPlan({
        targetLevel: 'B1',
        minutesPerDay: 30,
        reminderEnabled: false,
        reminderTime: '20:00',
      });

      expect(plan.days).toHaveLength(7);
      expect(plan.config.targetLevel).toBe('B1');
      expect(plan.weeklyTargetMinutes).toBe(210);

      // Verify tasks in each day
      plan.days.forEach((day) => {
        expect(day.dayName).toBeDefined();
        expect(day.tasks.length).toBeGreaterThan(0);
        day.tasks.forEach((task) => {
          expect(task.title).toBeDefined();
          expect(task.actionUrl).toBeDefined();
        });
      });
    });

    it('auto-rebalances study plan and flags target areas when forceRebalance is requested', async () => {
      const rebalanced = await englishStudyPlanService.generateWeeklyPlan(
        {
          targetLevel: 'A2',
          minutesPerDay: 15,
          reminderEnabled: true,
          reminderTime: '19:00',
        },
        true // forceRebalance
      );

      expect(rebalanced).toBeDefined();
      expect(rebalanced.days).toHaveLength(7);
      expect(rebalanced.rebalancedDate).toBeDefined();
      expect(rebalanced.rebalanceReason).toBeDefined();
    });
  });
});
