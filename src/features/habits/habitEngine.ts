import { db } from '../../lib/db';
import type {
  StreakData,
  LevelInfo,
  LevelName,
  AchievementBadge,
  WeeklyChallenge,
  WeeklyChallengeTask,
} from '../../types';
import { ALL_ACHIEVEMENTS } from './achievementsData';

const STREAK_STORAGE_KEY = 'zarii_habit_streak';
const XP_STORAGE_KEY = 'zarii_habit_xp';
const BADGES_STORAGE_KEY = 'zarii_habit_badges';
const WEEKLY_CHALLENGE_KEY = 'zarii_habit_weekly_challenge';

/**
 * Returns current ISO week format: "YYYY-Www"
 */
export function getISOWeekString(date = new Date()): string {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  const weekNum = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  return `${target.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`;
}

/**
 * Formats a Date object to "YYYY-MM-DD" local date string.
 */
export function getLocalDateString(date = new Date()): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Retrieves the current StreakData with weekly freeze restoration.
 */
export function getStreakData(): StreakData {
  if (typeof window === 'undefined') {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: '',
      freezeAvailable: true,
      freezeUsedDates: [],
      activeDates: [],
    };
  }

  const raw = localStorage.getItem(STREAK_STORAGE_KEY);
  let data: StreakData;

  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: '',
        freezeAvailable: true,
        freezeUsedDates: [],
        activeDates: [],
      };
    }
  } else {
    data = {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: '',
      freezeAvailable: true,
      freezeUsedDates: [],
      activeDates: [],
    };
  }

  // Refresh freeze if new calendar week has started
  const currentWeek = getISOWeekString();
  if (data.freezeLastUsedWeek && data.freezeLastUsedWeek !== currentWeek) {
    data.freezeAvailable = true;
  }

  return data;
}

/**
 * Saves streak data to local storage.
 */
export function saveStreakData(data: StreakData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(data));
}

/**
 * Records daily study activity and evaluates streak continuity + weekly freeze logic.
 * Accepts optional minutesSpent number or explicit date string.
 */
export function recordDailyActivity(
  minutesOrDate?: number | string,
  dateParam?: string
): {
  streakUpdated: boolean;
  freezeUsed: boolean;
  currentStreak: number;
  longestStreak: number;
} {
  const data = getStreakData();
  let today = getLocalDateString();
  if (typeof minutesOrDate === 'string') {
    today = minutesOrDate;
  } else if (dateParam) {
    today = dateParam;
  }

  if (data.lastActiveDate === today) {
    // Already logged active today
    return {
      streakUpdated: false,
      freezeUsed: false,
      currentStreak: data.currentStreak,
      longestStreak: data.longestStreak,
    };
  }

  let streakUpdated = true;
  let freezeUsed = false;

  if (!data.lastActiveDate) {
    // First active day ever
    data.currentStreak = 1;
    data.longestStreak = 1;
  } else {
    const lastDate = new Date(data.lastActiveDate);
    const currDate = new Date(today);
    const diffTime = currDate.getTime() - lastDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

    if (diffDays === 1) {
      // Consecutive day!
      data.currentStreak += 1;
    } else if (diffDays === 2) {
      // Missed exactly 1 day — check for freeze
      const currentWeek = getISOWeekString();
      if (data.freezeAvailable) {
        // Use freeze to rescue streak!
        freezeUsed = true;
        data.freezeAvailable = false;
        data.freezeLastUsedWeek = currentWeek;

        // Calculate skipped date
        const skippedDate = new Date(lastDate);
        skippedDate.setDate(skippedDate.getDate() + 1);
        const skippedStr = getLocalDateString(skippedDate);
        if (!data.freezeUsedDates.includes(skippedStr)) {
          data.freezeUsedDates.push(skippedStr);
        }

        // Streak is preserved and incremented
        data.currentStreak += 1;
      } else {
        // No freeze available: streak resets to 1
        data.currentStreak = 1;
      }
    } else {
      // Missed 2+ days: streak resets to 1
      data.currentStreak = 1;
    }

    if (data.currentStreak > data.longestStreak) {
      data.longestStreak = data.currentStreak;
    }
  }

  data.lastActiveDate = today;
  if (!data.activeDates.includes(today)) {
    data.activeDates.push(today);
  }

  saveStreakData(data);

  return {
    streakUpdated,
    freezeUsed,
    currentStreak: data.currentStreak,
    longestStreak: data.longestStreak,
  };
}

/**
 * XP & Level Engine
 * Level 1: Beginner (0 - 499 XP)
 * Level 2: Explorer (500 - 1,499 XP)
 * Level 3: Achiever (1,500 - 3,499 XP)
 * Level 4: Expert (3,500 - 6,999 XP)
 * Level 5: Master (7,000+ XP)
 */
export function getLevelInfo(totalXp: number): LevelInfo {
  if (totalXp >= 7000) {
    return {
      level: 5,
      name: 'Master',
      currentXp: totalXp,
      minXp: 7000,
      maxXp: 15000,
      progressPercent: Math.min(100, Math.round(((totalXp - 7000) / 8000) * 100)),
      xpToNextLevel: Math.max(0, 15000 - totalXp),
    };
  }

  if (totalXp >= 3500) {
    return {
      level: 4,
      name: 'Expert',
      currentXp: totalXp,
      minXp: 3500,
      maxXp: 6999,
      progressPercent: Math.round(((totalXp - 3500) / (7000 - 3500)) * 100),
      xpToNextLevel: 7000 - totalXp,
    };
  }

  if (totalXp >= 1500) {
    return {
      level: 3,
      name: 'Achiever',
      currentXp: totalXp,
      minXp: 1500,
      maxXp: 3499,
      progressPercent: Math.round(((totalXp - 1500) / (3500 - 1500)) * 100),
      xpToNextLevel: 3500 - totalXp,
    };
  }

  if (totalXp >= 500) {
    return {
      level: 2,
      name: 'Explorer',
      currentXp: totalXp,
      minXp: 500,
      maxXp: 1499,
      progressPercent: Math.round(((totalXp - 500) / (1500 - 500)) * 100),
      xpToNextLevel: 1500 - totalXp,
    };
  }

  return {
    level: 1,
    name: 'Beginner',
    currentXp: totalXp,
    minXp: 0,
    maxXp: 499,
    progressPercent: Math.round((totalXp / 500) * 100),
    xpToNextLevel: 500 - totalXp,
  };
}

export function getUserXp(): number {
  if (typeof window === 'undefined') return 0;
  const raw = localStorage.getItem(XP_STORAGE_KEY);
  return raw ? parseInt(raw, 10) || 0 : 0;
}

export function awardXp(amount: number): {
  newTotal: number;
  leveledUp: boolean;
  oldLevel: LevelInfo;
  newLevel: LevelInfo;
} {
  const current = getUserXp();
  const oldLevel = getLevelInfo(current);
  const newTotal = current + Math.max(0, amount);

  if (typeof window !== 'undefined') {
    localStorage.setItem(XP_STORAGE_KEY, String(newTotal));
  }

  const newLevel = getLevelInfo(newTotal);
  const leveledUp = newLevel.level > oldLevel.level;

  return { newTotal, leveledUp, oldLevel, newLevel };
}

/**
 * Weekly Challenge Manager (5 Curated Tasks)
 */
export function getWeeklyChallenge(): WeeklyChallenge {
  const currentWeekId = getISOWeekString();

  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(WEEKLY_CHALLENGE_KEY);
    if (raw) {
      try {
        const stored: WeeklyChallenge = JSON.parse(raw);
        if (stored.weekId === currentWeekId) {
          return stored;
        }
      } catch {
        // rebuild
      }
    }
  }

  // Generate new weekly challenge for the current week
  const defaultTasks: WeeklyChallengeTask[] = [
    {
      id: 'task-reading',
      title: 'Complete 1 Reading Test or Passage',
      description: 'Finish any Academic or General reading section with answers checked.',
      targetCount: 1,
      currentCount: 0,
      completed: false,
      module: 'reading',
      linkPath: '/practice/reading',
    },
    {
      id: 'task-listening',
      title: 'Complete 1 Listening Audio Section',
      description: 'Listen to any 10-question section and submit your answer sheet.',
      targetCount: 1,
      currentCount: 0,
      completed: false,
      module: 'listening',
      linkPath: '/practice/listening',
    },
    {
      id: 'task-writing',
      title: 'Write 1 Task 2 Essay',
      description: 'Submit an essay to the evaluation engine for diagnostic scoring.',
      targetCount: 1,
      currentCount: 0,
      completed: false,
      module: 'writing',
      linkPath: '/practice/writing',
    },
    {
      id: 'task-speaking',
      title: 'Record 1 Speaking Practice Response',
      description: 'Complete a Part 1, Part 2 cue card, or Part 3 interview session.',
      targetCount: 1,
      currentCount: 0,
      completed: false,
      module: 'speaking',
      linkPath: '/practice/speaking',
    },
    {
      id: 'task-vocab',
      title: 'Review 15 Vocabulary Flashcards',
      description: 'Review words in your spaced repetition deck or master 3 notebook mistakes.',
      targetCount: 15,
      currentCount: 0,
      completed: false,
      module: 'vocab',
      linkPath: '/vocab',
    },
  ];

  const challenge: WeeklyChallenge = {
    weekId: currentWeekId,
    tasks: defaultTasks,
    completedCount: 0,
    totalCount: defaultTasks.length,
    isAllCompleted: false,
    rewardClaimed: false,
  };

  saveWeeklyChallenge(challenge);
  return challenge;
}

export function saveWeeklyChallenge(challenge: WeeklyChallenge): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WEEKLY_CHALLENGE_KEY, JSON.stringify(challenge));
}

export function recordWeeklyChallengeProgress(
  module: 'reading' | 'listening' | 'writing' | 'speaking' | 'vocab',
  count = 1
): { challengeUpdated: boolean; isNowCompleted: boolean } {
  const challenge = getWeeklyChallenge();
  let challengeUpdated = false;

  for (const t of challenge.tasks) {
    if (t.module === module && !t.completed) {
      t.currentCount = Math.min(t.targetCount, t.currentCount + count);
      if (t.currentCount >= t.targetCount) {
        t.completed = true;
      }
      challengeUpdated = true;
    }
  }

  challenge.completedCount = challenge.tasks.filter((t) => t.completed).length;
  const isNowCompleted = challenge.completedCount === challenge.totalCount;

  if (isNowCompleted && !challenge.isAllCompleted) {
    challenge.isAllCompleted = true;
    if (!challenge.rewardClaimed) {
      challenge.rewardClaimed = true;
      awardXp(250); // bonus XP for full weekly challenge completion
    }
  }

  if (challengeUpdated) {
    saveWeeklyChallenge(challenge);
  }

  return { challengeUpdated, isNowCompleted };
}

/**
 * Achievement Unlocker & Audit Engine
 * Inspects all Dexie stores and unlocks eligible badges.
 */
export async function auditAndUnlockAchievements(): Promise<{
  newlyUnlocked: AchievementBadge[];
  allBadges: AchievementBadge[];
}> {
  // Load saved badge status
  let savedUnlockedIds: string[] = [];
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(BADGES_STORAGE_KEY);
    if (raw) {
      try {
        savedUnlockedIds = JSON.parse(raw);
      } catch {
        savedUnlockedIds = [];
      }
    }
  }

  // Gather actual counts from database
  const attempts = await db.attempts.toArray();
  const writings = await db.writingSubmissions.toArray();
  const speakings = await db.speakingSessions.toArray();
  const vocabWords = await db.vocabProgress.where('mastered').equals(1).toArray();
  const mistakes = await db.mistakes.where('isMastered').equals(1).toArray();
  const streak = getStreakData();

  const readingAttempts = attempts.filter((a) => a.module === 'reading');
  const listeningAttempts = attempts.filter((a) => a.module === 'listening');
  const mockAttempts = attempts.filter((a) => a.testType === 'academic' || a.title.toLowerCase().includes('mock'));

  const maxReadingBand = readingAttempts.length > 0 ? Math.max(...readingAttempts.map((a) => a.bandEstimate || 0)) : 0;
  const maxListeningBand = listeningAttempts.length > 0 ? Math.max(...listeningAttempts.map((a) => a.bandEstimate || 0)) : 0;
  const maxWritingBand = writings.length > 0 ? Math.max(...writings.map((w) => w.bandEstimate || 0)) : 0;
  const maxSpeakingBand = speakings.length > 0 ? Math.max(...speakings.map((s) => s.bandEstimate || 0)) : 0;
  const maxOverall = attempts.length > 0 ? Math.max(...attempts.map((a) => a.bandEstimate || 0)) : 0;

  const totalActions = attempts.length + writings.length + speakings.length;
  const newlyUnlocked: AchievementBadge[] = [];

  const evaluatedBadges: AchievementBadge[] = ALL_ACHIEVEMENTS.map((b) => {
    const isAlreadyUnlocked = savedUnlockedIds.includes(b.id);
    let eligible = isAlreadyUnlocked;

    switch (b.id) {
      case 'first_step':
        eligible = eligible || totalActions >= 1;
        break;
      case 'reading_7':
        eligible = eligible || maxReadingBand >= 7.0;
        break;
      case 'listening_7':
        eligible = eligible || maxListeningBand >= 7.0;
        break;
      case 'writing_7':
        eligible = eligible || maxWritingBand >= 7.0;
        break;
      case 'speaking_7':
        eligible = eligible || maxSpeakingBand >= 7.0;
        break;
      case 'high_achiever':
        eligible = eligible || maxOverall >= 7.5 || maxWritingBand >= 7.5 || maxSpeakingBand >= 7.5;
        break;
      case 'band_9_perfection':
        eligible = eligible || maxReadingBand >= 9.0 || maxListeningBand >= 9.0;
        break;
      case 'streak_3':
        eligible = eligible || streak.currentStreak >= 3 || streak.longestStreak >= 3;
        break;
      case 'streak_7':
        eligible = eligible || streak.currentStreak >= 7 || streak.longestStreak >= 7;
        break;
      case 'streak_14':
        eligible = eligible || streak.currentStreak >= 14 || streak.longestStreak >= 14;
        break;
      case 'streak_30':
        eligible = eligible || streak.currentStreak >= 30 || streak.longestStreak >= 30;
        break;
      case 'weekend_warrior':
        eligible = eligible || streak.activeDates.some((d) => {
          const dt = new Date(d);
          return dt.getDay() === 0 || dt.getDay() === 6;
        });
        break;
      case 'freeze_guardian':
        eligible = eligible || streak.freezeUsedDates.length > 0;
        break;
      case 'reading_5':
        eligible = eligible || readingAttempts.length >= 5;
        break;
      case 'reading_15':
        eligible = eligible || readingAttempts.length >= 15;
        break;
      case 'listening_5':
        eligible = eligible || listeningAttempts.length >= 5;
        break;
      case 'listening_15':
        eligible = eligible || listeningAttempts.length >= 15;
        break;
      case 'essays_5':
        eligible = eligible || writings.length >= 5;
        break;
      case 'essays_10':
        eligible = eligible || writings.length >= 10;
        break;
      case 'essays_25':
        eligible = eligible || writings.length >= 25;
        break;
      case 'speaking_5':
        eligible = eligible || speakings.length >= 5;
        break;
      case 'speaking_10':
        eligible = eligible || speakings.length >= 10;
        break;
      case 'speaking_25':
        eligible = eligible || speakings.length >= 25;
        break;
      case 'vocab_50':
        eligible = eligible || vocabWords.length >= 50;
        break;
      case 'vocab_150':
        eligible = eligible || vocabWords.length >= 150;
        break;
      case 'vocab_300':
        eligible = eligible || vocabWords.length >= 300;
        break;
      case 'error_conqueror':
        eligible = eligible || mistakes.length >= 10;
        break;
      case 'grammar_guru':
        eligible = eligible || attempts.filter((a) => a.module === 'reading').length >= 10;
        break;
      case 'mock_pioneer':
        eligible = eligible || mockAttempts.length >= 1;
        break;
      case 'weekly_champion': {
        const ch = getWeeklyChallenge();
        eligible = eligible || ch.isAllCompleted;
        break;
      }
      default:
        break;
    }

    if (eligible && !isAlreadyUnlocked) {
      newlyUnlocked.push(b);
      savedUnlockedIds.push(b.id);
      awardXp(b.xpReward); // award badge XP!
    }

    return {
      ...b,
      unlocked: eligible,
      unlockedAt: eligible ? new Date().toISOString() : undefined,
    };
  });

  if (newlyUnlocked.length > 0 && typeof window !== 'undefined') {
    localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(savedUnlockedIds));
  }

  return { newlyUnlocked, allBadges: evaluatedBadges };
}
