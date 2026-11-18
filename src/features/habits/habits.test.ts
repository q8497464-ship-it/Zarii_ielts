import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';

class LocalStorageMock {
  private store: Record<string, string> = {};
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const mockStorage = new LocalStorageMock();

// Mock Dexie db for audit test
vi.mock('../../lib/db', () => ({
  db: {
    attempts: {
      toArray: vi.fn().mockResolvedValue([
        {
          testId: 'test-audit-1',
          testType: 'academic',
          module: 'reading',
          title: 'Academic Reading Mock',
          score: 38,
          totalQuestions: 40,
          bandEstimate: 8.5,
          timeSpentSeconds: 3200,
          startedAt: '2026-11-17T10:00:00.000Z',
          completedAt: '2026-11-17T11:00:00.000Z',
          status: 'completed',
        },
      ]),
    },
    writingSubmissions: {
      toArray: vi.fn().mockResolvedValue([]),
    },
    speakingSessions: {
      toArray: vi.fn().mockResolvedValue([]),
    },
    vocabProgress: {
      where: vi.fn().mockReturnValue({
        equals: vi.fn().mockReturnValue({
          toArray: vi.fn().mockResolvedValue([]),
        }),
      }),
    },
    mistakes: {
      where: vi.fn().mockReturnValue({
        equals: vi.fn().mockReturnValue({
          toArray: vi.fn().mockResolvedValue([]),
        }),
      }),
    },
  },
}));

import {
  getLevelInfo,
  awardXp,
  getUserXp,
  getStreakData,
  saveStreakData,
  recordDailyActivity,
  getWeeklyChallenge,
  recordWeeklyChallengeProgress,
  getISOWeekString,
  getLocalDateString,
  auditAndUnlockAchievements,
} from './habitEngine';
import { ALL_ACHIEVEMENTS } from './achievementsData';

describe('Habits & Motivation Engine', () => {
  beforeAll(() => {
    (globalThis as any).localStorage = mockStorage;
    (globalThis as any).window = globalThis;
  });

  beforeEach(() => {
    mockStorage.clear();
  });

  describe('30 Achievement Badges Definition', () => {
    it('defines exactly 30 unique achievement badges', () => {
      expect(ALL_ACHIEVEMENTS).toHaveLength(30);

      const ids = ALL_ACHIEVEMENTS.map((a) => a.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(30);
    });

    it('covers all required categories: bands, habits, volume, vocab, milestones', () => {
      const categories = new Set(ALL_ACHIEVEMENTS.map((a) => a.category));
      expect(categories.has('bands')).toBe(true);
      expect(categories.has('habits')).toBe(true);
      expect(categories.has('volume')).toBe(true);
      expect(categories.has('vocab')).toBe(true);
      expect(categories.has('milestones')).toBe(true);
    });

    it('ensures every badge has valid title, description, and positive XP reward', () => {
      for (const badge of ALL_ACHIEVEMENTS) {
        expect(badge.title).toBeTruthy();
        expect(badge.description).toBeTruthy();
        expect(badge.xpReward).toBeGreaterThan(0);
        expect(badge.iconName).toBeTruthy();
      }
    });
  });

  describe('Level Progression System (5 Ranks)', () => {
    it('accurately maps XP to Level 1 (Beginner: 0 - 499)', () => {
      const level0 = getLevelInfo(0);
      expect(level0.level).toBe(1);
      expect(level0.name).toBe('Beginner');
      expect(level0.progressPercent).toBe(0);

      const level250 = getLevelInfo(250);
      expect(level250.level).toBe(1);
      expect(level250.name).toBe('Beginner');
      expect(level250.progressPercent).toBe(50);
    });

    it('accurately maps XP to Level 2 (Explorer: 500 - 1499)', () => {
      const level500 = getLevelInfo(500);
      expect(level500.level).toBe(2);
      expect(level500.name).toBe('Explorer');
      expect(level500.progressPercent).toBe(0);

      const level1000 = getLevelInfo(1000);
      expect(level1000.level).toBe(2);
      expect(level1000.progressPercent).toBe(50);
    });

    it('accurately maps XP to Level 3 (Achiever: 1500 - 3499)', () => {
      const level1500 = getLevelInfo(1500);
      expect(level1500.level).toBe(3);
      expect(level1500.name).toBe('Achiever');

      const level2500 = getLevelInfo(2500);
      expect(level2500.level).toBe(3);
      expect(level2500.progressPercent).toBe(50);
    });

    it('accurately maps XP to Level 4 (Expert: 3500 - 6999)', () => {
      const level3500 = getLevelInfo(3500);
      expect(level3500.level).toBe(4);
      expect(level3500.name).toBe('Expert');
    });

    it('accurately maps XP to Level 5 (Master: 7000+)', () => {
      const level7000 = getLevelInfo(7000);
      expect(level7000.level).toBe(5);
      expect(level7000.name).toBe('Master');

      const level10000 = getLevelInfo(10000);
      expect(level10000.level).toBe(5);
      expect(level10000.name).toBe('Master');
    });

    it('awards XP and tracks level up events', () => {
      expect(getUserXp()).toBe(0);

      const res1 = awardXp(300);
      expect(res1.newTotal).toBe(300);
      expect(res1.leveledUp).toBe(false);

      const res2 = awardXp(250);
      expect(res2.newTotal).toBe(550);
      expect(res2.leveledUp).toBe(true);
      expect(res2.oldLevel.name).toBe('Beginner');
      expect(res2.newLevel.name).toBe('Explorer');
      expect(getUserXp()).toBe(550);
    });
  });

  describe('Streak Tracking & Weekly Freeze Shield', () => {
    it('initializes clean streak data', () => {
      const streak = getStreakData();
      expect(streak.currentStreak).toBe(0);
      expect(streak.longestStreak).toBe(0);
      expect(streak.freezeAvailable).toBe(true);
    });

    it('increments streak on first practice activity', () => {
      const today = getLocalDateString();
      const res = recordDailyActivity(20, today);
      expect(res.currentStreak).toBe(1);
      expect(res.longestStreak).toBe(1);
      expect(res.freezeUsed).toBe(false);

      const streak = getStreakData();
      expect(streak.currentStreak).toBe(1);
      expect(streak.lastActiveDate).toBe(today);
    });

    it('is idempotent for multiple practice sessions on the same date', () => {
      const today = getLocalDateString();
      recordDailyActivity(15, today);
      const res = recordDailyActivity(30, today);
      expect(res.currentStreak).toBe(1);
      expect(res.streakUpdated).toBe(false);
    });

    it('consumes weekly streak freeze shield when 1 day is missed', () => {
      const d1 = new Date();
      d1.setDate(d1.getDate() - 2); // 2 days ago (missed yesterday)
      const dayBeforeYesterday = getLocalDateString(d1);

      saveStreakData({
        currentStreak: 5,
        longestStreak: 5,
        lastActiveDate: dayBeforeYesterday,
        freezeAvailable: true,
        freezeUsedDates: [],
        activeDates: [dayBeforeYesterday],
      });

      const today = getLocalDateString();
      const res = recordDailyActivity(25, today);

      expect(res.freezeUsed).toBe(true);
      expect(res.currentStreak).toBe(6); // Streak preserved and incremented!

      const streak = getStreakData();
      expect(streak.freezeAvailable).toBe(false);
    });

    it('resets streak to 1 if more than 1 day missed and freeze unavailable', () => {
      const d = new Date();
      d.setDate(d.getDate() - 4);
      const oldDate = getLocalDateString(d);

      saveStreakData({
        currentStreak: 7,
        longestStreak: 7,
        lastActiveDate: oldDate,
        freezeAvailable: false, // Freeze already used
        freezeUsedDates: [],
        activeDates: [oldDate],
      });

      const today = getLocalDateString();
      const res = recordDailyActivity(20, today);

      expect(res.freezeUsed).toBe(false);
      expect(res.currentStreak).toBe(1); // Reset
      expect(res.longestStreak).toBe(7); // Longest preserved
    });
  });

  describe('Weekly 5-Task Challenge Sprint', () => {
    it('initializes a 5-task sprint for current ISO week', () => {
      const challenge = getWeeklyChallenge();
      expect(challenge.weekId).toBe(getISOWeekString());
      expect(challenge.tasks).toHaveLength(5);
      expect(challenge.totalCount).toBe(5);
      expect(challenge.completedCount).toBe(0);
      expect(challenge.isAllCompleted).toBe(false);
    });

    it('records progress across modules', () => {
      const p1 = recordWeeklyChallengeProgress('reading', 1);
      expect(p1.challengeUpdated).toBe(true);

      const challenge = getWeeklyChallenge();
      const readingTask = challenge.tasks.find((t) => t.module === 'reading');
      expect(readingTask?.completed).toBe(true);
      expect(challenge.completedCount).toBe(1);
    });

    it('awards 250 bonus XP when all 5 weekly tasks are completed', () => {
      recordWeeklyChallengeProgress('reading', 1);
      recordWeeklyChallengeProgress('listening', 1);
      recordWeeklyChallengeProgress('writing', 1);
      recordWeeklyChallengeProgress('speaking', 1);
      const finalRes = recordWeeklyChallengeProgress('vocab', 15);

      expect(finalRes.isNowCompleted).toBe(true);
      const challenge = getWeeklyChallenge();
      expect(challenge.isAllCompleted).toBe(true);
      expect(challenge.rewardClaimed).toBe(true);
      expect(getUserXp()).toBeGreaterThanOrEqual(250);
    });
  });

  describe('Achievement Audit & Dexie Database Scanner', () => {
    it('audits database and awards badges', async () => {
      const { allBadges } = await auditAndUnlockAchievements();
      expect(allBadges).toHaveLength(30);

      // Should have unlocked first_step, reading_7
      const unlockedIds = allBadges.filter((b) => b.unlocked).map((b) => b.id);
      expect(unlockedIds).toContain('first_step');
      expect(unlockedIds).toContain('reading_7');
    });
  });
});
