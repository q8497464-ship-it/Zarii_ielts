import type { VocabProgress, VocabWordContent } from '../../types';

export type SM2Rating = 'again' | 'hard' | 'good' | 'easy';

export interface SM2Result {
  repetitions: number;
  interval: number; // in days
  easeFactor: number;
  nextReviewAt: string;
  mastered: boolean;
  timesCorrect: number;
  timesIncorrect: number;
}

/**
 * SuperMemo-2 (SM-2) algorithm implementation for IELTS academic vocabulary.
 */
export function calculateSM2(
  current: {
    repetitions: number;
    interval: number;
    easeFactor: number;
    timesCorrect: number;
    timesIncorrect: number;
    mastered: boolean;
  },
  rating: SM2Rating
): SM2Result {
  let { repetitions, interval, easeFactor, timesCorrect, timesIncorrect, mastered } = current;

  // Ensure valid initial ease factor (default 2.5)
  if (!easeFactor || easeFactor < 1.3) easeFactor = 2.5;
  if (!interval || interval < 1) interval = 1;
  if (repetitions === undefined || repetitions === null) repetitions = 0;

  switch (rating) {
    case 'again': {
      // Complete memory lapse
      repetitions = 0;
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      timesIncorrect += 1;
      mastered = false;
      break;
    }
    case 'hard': {
      // Recalled with significant hesitation
      repetitions = Math.max(1, repetitions);
      interval = Math.max(1, Math.round(interval * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      timesCorrect += 1;
      break;
    }
    case 'good': {
      // Standard successful recall
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
      timesCorrect += 1;
      if (repetitions >= 5) mastered = true;
      break;
    }
    case 'easy': {
      // Instant, effortless recall
      if (repetitions === 0) {
        interval = 4;
      } else if (repetitions === 1) {
        interval = 8;
      } else {
        interval = Math.round(interval * easeFactor * 1.3);
      }
      easeFactor = Math.min(3.0, easeFactor + 0.15);
      repetitions += 1;
      timesCorrect += 1;
      if (repetitions >= 4) mastered = true;
      break;
    }
  }

  const nextReviewMs = Date.now() + interval * 24 * 60 * 60 * 1000;
  const nextReviewAt = new Date(nextReviewMs).toISOString();

  return {
    repetitions,
    interval,
    easeFactor: Math.round(easeFactor * 100) / 100,
    nextReviewAt,
    mastered,
    timesCorrect,
    timesIncorrect,
  };
}

/**
 * Creates default initial VocabProgress record for a new word.
 */
export function createInitialVocabProgress(
  wordOrId:
    | string
    | VocabWordContent
    | {
        id?: string;
        wordId?: string;
        word?: string;
        meaning?: string;
        definition?: string;
        urduMeaning?: string;
        partOfSpeech?: string;
        topic?: string;
        example?: string;
        exampleSentence?: string;
        collocations?: string[];
        synonyms?: string[];
        isCustom?: boolean;
      },
  isCustomParam?: boolean,
  extraDetails?: {
    word?: string;
    meaning?: string;
    definition?: string;
    urduMeaning?: string;
    partOfSpeech?: any;
    example?: string;
    exampleSentence?: string;
  }
): VocabProgress {
  const now = new Date().toISOString();

  if (typeof wordOrId === 'string') {
    const details = extraDetails || {};
    return {
      wordId: wordOrId,
      word: details.word || wordOrId,
      definition: details.meaning || details.definition || '',
      urduMeaning: details.urduMeaning || '',
      partOfSpeech: (details.partOfSpeech as any) || 'noun',
      topic: 'custom',
      exampleSentence: details.exampleSentence || details.example || '',
      collocations: [],
      synonyms: [],
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      lastReviewedAt: now,
      nextReviewAt: now,
      timesCorrect: 0,
      timesIncorrect: 0,
      mastered: false,
      isCustom: isCustomParam !== undefined ? isCustomParam : true,
    };
  }

  const wordObj = wordOrId as any;
  return {
    wordId: wordObj.wordId || wordObj.id || `custom-${Date.now()}`,
    word: wordObj.word || '',
    definition: wordObj.meaning || wordObj.definition || '',
    urduMeaning: wordObj.urduMeaning || '',
    partOfSpeech: wordObj.partOfSpeech || 'noun',
    topic: wordObj.topic || 'general',
    exampleSentence: wordObj.exampleSentence || wordObj.example || '',
    collocations: wordObj.collocations || [],
    synonyms: wordObj.synonyms || [],
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5,
    lastReviewedAt: now,
    nextReviewAt: now, // immediately due for initial study
    timesCorrect: 0,
    timesIncorrect: 0,
    mastered: false,
    isCustom: isCustomParam !== undefined ? isCustomParam : (wordObj.isCustom || false),
  };
}

/**
 * Calculates current study streak in consecutive days
 */
export function calculateStreak(entries?: VocabProgress[]): number {
  if (entries && entries.length > 0) {
    const dates = new Set(
      entries
        .filter((e) => e.lastReviewedAt)
        .map((e) => e.lastReviewedAt.split('T')[0])
    );
    const sortedDates = Array.from(dates).sort().reverse();
    if (sortedDates.length === 0) return 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (!sortedDates.includes(todayStr) && !sortedDates.includes(yesterdayStr)) {
      return 0;
    }

    let streak = 0;
    const checkDate = sortedDates.includes(todayStr) ? new Date() : yesterday;

    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (sortedDates.includes(dateStr)) {
        streak += 1;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return Math.max(streak, 1);
  }

  return getDailyStudyStreak().streak;
}

function getStorageItem(key: string): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  return null;
}

function setStorageItem(key: string, value: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  }
}

/**
 * Daily streak counter manager
 */
export function getDailyStudyStreak(): { streak: number; lastStudiedDate: string; studiedToday: boolean } {
  const todayStr = new Date().toISOString().split('T')[0];
  const storedStreak = parseInt(getStorageItem('zarii_vocab_streak') || '0', 10);
  const lastStudiedDate = getStorageItem('zarii_vocab_last_date') || '';

  const studiedToday = lastStudiedDate === todayStr;

  return {
    streak: storedStreak,
    lastStudiedDate,
    studiedToday,
  };
}

export function recordStudySessionForStreak(): number {
  const todayStr = new Date().toISOString().split('T')[0];
  const { streak, lastStudiedDate, studiedToday } = getDailyStudyStreak();

  if (studiedToday) {
    return streak; // already counted for today
  }

  // Check if yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak = 1;
  if (lastStudiedDate === yesterdayStr) {
    newStreak = streak + 1;
  }

  setStorageItem('zarii_vocab_streak', newStreak.toString());
  setStorageItem('zarii_vocab_last_date', todayStr);
  return newStreak;
}
