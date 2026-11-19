import type { VocabProgress, VocabWordContent } from '../../types';

export type SM2Rating = 'again' | 'hard' | 'good' | 'easy';

export const LEECH_LAPSE_THRESHOLD = 8;

export interface SM2Result {
  repetitions: number;
  interval: number; // in days (or fractional for short steps e.g. 10/1440 for 10m)
  easeFactor: number;
  nextReviewAt: string;
  mastered: boolean;
  timesCorrect: number;
  timesIncorrect: number;
  lapses: number;
  isLeech: boolean;
  isDifficult: boolean;
}

export interface IntervalPreview {
  rating: SM2Rating;
  intervalDays: number;
  label: string;
}

/**
 * Human-friendly interval labels matching SuperMemo / Anki conventions:
 * e.g. "10m", "1d", "3d", "6d"
 */
export function formatIntervalPreview(days: number): string {
  if (days <= 0) return 'Immediate';
  const minutes = Math.round(days * 24 * 60);
  if (minutes < 60) {
    return `${Math.max(1, minutes)}m`;
  }
  const hours = Math.round(days * 24);
  if (hours < 24) {
    return `${hours}h`;
  }
  const roundedDays = Math.round(days);
  if (roundedDays < 30) {
    return `${roundedDays}d`;
  }
  const months = Math.round(roundedDays / 30);
  return `${months}mo`;
}

/**
 * SuperMemo-2 (SM-2) algorithm implementation for IELTS academic vocabulary.
 * Extended with learning steps (10m), lapses tracking, and leech handling.
 */
export function calculateSM2(
  current: {
    repetitions: number;
    interval: number;
    easeFactor: number;
    timesCorrect: number;
    timesIncorrect: number;
    mastered: boolean;
    lapses?: number;
    isDifficult?: boolean;
  },
  rating: SM2Rating
): SM2Result {
  let { repetitions, interval, easeFactor, timesCorrect, timesIncorrect, mastered } = current;
  let lapses = current.lapses || 0;
  let isDifficult = current.isDifficult || false;

  // Ensure valid initial ease factor (default 2.5)
  if (!easeFactor || easeFactor < 1.3) easeFactor = 2.5;
  if (!interval || interval < 1) interval = 1;
  if (repetitions === undefined || repetitions === null) repetitions = 0;

  switch (rating) {
    case 'again': {
      // Memory lapse: reset repetition count, increment lapse counter
      repetitions = 0;
      interval = 1; // 1 day
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      timesIncorrect += 1;
      lapses += 1;
      mastered = false;
      break;
    }
    case 'hard': {
      // Recalled with significant hesitation
      repetitions = Math.max(1, repetitions);
      interval = repetitions === 1 ? 1 : Math.max(1, Math.round(interval * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      timesCorrect += 1;
      break;
    }
    case 'good': {
      // Standard successful recall (classic SM-2: 1 -> 6 -> interval * EF)
      if (repetitions === 0) {
        interval = 1; // 1 day
      } else if (repetitions === 1) {
        interval = 6; // 6 days
      } else {
        interval = Math.max(1, Math.round(interval * easeFactor));
      }
      repetitions += 1;
      timesCorrect += 1;
      if (repetitions >= 5) mastered = true;
      break;
    }
    case 'easy': {
      // Instant, effortless recall
      if (repetitions === 0) {
        interval = 4; // 4 days
      } else if (repetitions === 1) {
        interval = 7; // 7 days
      } else {
        interval = Math.max(1, Math.round(interval * easeFactor * 1.3));
      }
      easeFactor = Math.min(3.0, easeFactor + 0.15);
      repetitions += 1;
      timesCorrect += 1;
      if (repetitions >= 4) mastered = true;
      break;
    }
  }

  // Leech handling: after 8 lapses mark the word as difficult
  const isLeech = lapses >= LEECH_LAPSE_THRESHOLD;
  if (isLeech) {
    isDifficult = true;
  }

  const nextReviewMs = Date.now() + interval * 24 * 60 * 60 * 1000;
  const nextReviewAt = new Date(nextReviewMs).toISOString();

  return {
    repetitions,
    interval: Math.round(interval * 100) / 100,
    easeFactor: Math.round(easeFactor * 100) / 100,
    nextReviewAt,
    mastered,
    timesCorrect,
    timesIncorrect,
    lapses,
    isLeech,
    isDifficult,
  };
}

/**
 * Computes interval previews for all four ratings so the UI can display
 * labels like "10m", "1d", "3d", "6d" on rating buttons.
 */
export function previewNextIntervals(current: {
  repetitions: number;
  interval: number;
  easeFactor: number;
}): Record<SM2Rating, { days: number; label: string }> {
  const ratings: SM2Rating[] = ['again', 'hard', 'good', 'easy'];
  const previews = {} as Record<SM2Rating, { days: number; label: string }>;

  for (const r of ratings) {
    const res = calculateSM2(
      {
        repetitions: current.repetitions,
        interval: current.interval,
        easeFactor: current.easeFactor,
        timesCorrect: 0,
        timesIncorrect: 0,
        mastered: false,
      },
      r
    );
    previews[r] = {
      days: res.interval,
      label: formatIntervalPreview(res.interval),
    };
  }

  return previews;
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
    source?: 'built_in' | 'manual' | 'reading' | 'writing_feedback';
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
      lapses: 0,
      lastReviewedAt: now,
      nextReviewAt: now,
      timesCorrect: 0,
      timesIncorrect: 0,
      mastered: false,
      isDifficult: false,
      isCustom: isCustomParam !== undefined ? isCustomParam : true,
      source: details.source || 'manual',
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
    lapses: 0,
    lastReviewedAt: now,
    nextReviewAt: now, // immediately due for initial study
    timesCorrect: 0,
    timesIncorrect: 0,
    mastered: false,
    isDifficult: false,
    isCustom: isCustomParam !== undefined ? isCustomParam : (wordObj.isCustom || false),
    source: wordObj.source || 'built_in',
  };
}

/**
 * Damerau-Levenshtein distance calculation for typo-tolerant typed answers.
 */
export function calculateLevenshteinDistance(a: string, b: string): number {
  const s1 = a.toLowerCase().trim();
  const s2 = b.toLowerCase().trim();

  if (s1 === s2) return 0;
  if (s1.length === 0) return s2.length;
  if (s2.length === 0) return s1.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );

      // Transposition check
      if (i > 1 && j > 1 && s1[i - 1] === s2[j - 2] && s1[i - 2] === s2[j - 1]) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + 1);
      }
    }
  }

  return matrix[s1.length][s2.length];
}

/**
 * Checks whether user typed answer matches target headword with sensible typo tolerance.
 * - Words <= 4 characters: exact match only
 * - Words 5 to 7 characters: max 1 edit allowed
 * - Words >= 8 characters: max 2 edits allowed
 */
export function isAnswerMatch(
  userInput: string,
  targetWord: string
): { isMatch: boolean; isExact: boolean; distance: number } {
  const cleanInput = userInput.toLowerCase().replace(/[^a-z]/g, '').trim();
  const cleanTarget = targetWord.toLowerCase().replace(/[^a-z]/g, '').trim();

  if (cleanInput === cleanTarget) {
    return { isMatch: true, isExact: true, distance: 0 };
  }

  const distance = calculateLevenshteinDistance(cleanInput, cleanTarget);
  const targetLen = cleanTarget.length;

  let maxAllowed = 0;
  if (targetLen >= 8) {
    maxAllowed = 2;
  } else if (targetLen >= 5) {
    maxAllowed = 1;
  }

  const isMatch = distance <= maxAllowed;
  return { isMatch, isExact: distance === 0, distance };
}

/**
 * Overdue card spreading helper (Catch-up mode):
 * If a user missed days and has 50+ overdue cards, distributes them over
 * the next N days to prevent fatigue.
 */
export function spreadOverdueCards(
  cards: VocabProgress[],
  daysToSpread = 3
): Array<{ card: VocabProgress; adjustedNextReviewAt: string }> {
  const now = new Date();
  const overdue = cards.filter((c) => new Date(c.nextReviewAt) < now);

  return overdue.map((card, index) => {
    const dayOffset = (index % daysToSpread) + 1;
    const adjusted = new Date(Date.now() + dayOffset * 24 * 60 * 60 * 1000);
    return {
      card,
      adjustedNextReviewAt: adjusted.toISOString(),
    };
  });
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
