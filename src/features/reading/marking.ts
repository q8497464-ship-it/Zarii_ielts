import type { TestType, QuestionType } from '../../types';
import { cleanOptionText, getCorrectOriginalIndex } from '../../lib/mcqShuffle';

export interface ScoreBreakdownItem {
  type: QuestionType;
  total: number;
  correct: number;
  accuracy: number;
}

export interface MarkingResult {
  rawScore: number;
  totalQuestions: number;
  bandScore: number;
  accuracyPercentage: number;
  breakdownByType: Record<string, ScoreBreakdownItem>;
}

/**
 * Standard Academic Reading raw-score to band score mapping (40 questions).
 */
export const ACADEMIC_READING_BAND_TABLE: Record<number, number> = {
  40: 9.0, 39: 9.0,
  38: 8.5, 37: 8.5,
  36: 8.0, 35: 8.0,
  34: 7.5, 33: 7.5,
  32: 7.0, 31: 7.0, 30: 7.0,
  29: 6.5, 28: 6.5, 27: 6.5,
  26: 6.0, 25: 6.0, 24: 6.0, 23: 6.0,
  22: 5.5, 21: 5.5, 20: 5.5, 19: 5.5,
  18: 5.0, 17: 5.0, 16: 5.0, 15: 5.0,
  14: 4.5, 13: 4.5,
  12: 4.0, 11: 4.0, 10: 4.0,
  9: 3.5, 8: 3.5,
  7: 3.0, 6: 3.0,
  5: 2.5, 4: 2.5,
  3: 2.0, 2: 2.0, 1: 2.0, 0: 0.0,
};

/**
 * Standard General Training Reading raw-score to band score mapping (40 questions).
 * In General Training, questions are typically more everyday so higher raw accuracy is required for top bands.
 */
export const GENERAL_READING_BAND_TABLE: Record<number, number> = {
  40: 9.0,
  39: 8.5,
  38: 8.0, 37: 8.0,
  36: 7.5,
  35: 7.0, 34: 7.0,
  33: 6.5, 32: 6.5,
  31: 6.0, 30: 6.0,
  29: 5.5, 28: 5.5, 27: 5.5,
  26: 5.0, 25: 5.0, 24: 5.0, 23: 5.0,
  22: 4.5, 21: 4.5, 20: 4.5, 19: 4.5,
  18: 4.0, 17: 4.0, 16: 4.0, 15: 4.0,
  14: 3.5, 13: 3.5, 12: 3.5,
  11: 3.0, 10: 3.0, 9: 3.0,
  8: 2.5, 7: 2.5, 6: 2.5,
  5: 2.0, 4: 2.0, 3: 2.0, 2: 2.0, 1: 2.0, 0: 0.0,
};

/**
 * Converts a raw score to an estimated IELTS band score.
 * If totalQuestions is not 40 (e.g. for a diagnostic test with 20 questions),
 * the score is proportionally normalized to a 40-question scale.
 */
export function convertRawToBand(rawScore: number, testType: TestType = 'academic', totalQuestions = 40): number {
  if (totalQuestions <= 0 || rawScore <= 0) return 0.0;

  // Scale raw score to 40 questions if test is shorter or longer
  const scaledRaw = totalQuestions === 40 
    ? Math.round(rawScore) 
    : Math.min(40, Math.max(0, Math.round((rawScore / totalQuestions) * 40)));

  const table = testType === 'general' ? GENERAL_READING_BAND_TABLE : ACADEMIC_READING_BAND_TABLE;
  return table[scaledRaw] ?? 0.0;
}

/**
 * Normalizes an answer string by:
 * - Lowercasing
 * - Stripping out surrounding punctuation like quotes, parentheses, trailing dots
 * - Normalizing contractions and whitespace
 */
export function normalizeAnswerText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/^["'‘“]+|["'’”]+$/g, '') // remove quotes
    .replace(/[.,;:!?]+$/, '') // remove trailing punctuation
    .replace(/\s+/g, ' ') // collapse multi-spaces
    .trim();
}

/**
 * Expands parentheses variations: e.g. "(a) bus" -> ["a bus", "bus"]
 */
export function expandParentheses(text: string): string[] {
  if (!text.includes('(')) return [text];
  const withInside = text.replace(/\(([^)]+)\)/g, '$1').replace(/\s+/g, ' ').trim();
  const withoutInside = text.replace(/\(([^)]+)\)/g, '').replace(/\s+/g, ' ').trim();
  return Array.from(new Set([text, withInside, withoutInside].filter(Boolean)));
}

/**
 * Expands slash options: e.g. "bus / coach" -> ["bus", "coach"]
 */
export function expandSlashes(text: string): string[] {
  if (!text.includes('/')) return [text];
  return text.split('/').map((s) => s.trim()).filter(Boolean);
}

// UK / US variant equivalence map
const SPELLING_VARIANTS: Record<string, string> = {
  theatre: 'theater',
  theater: 'theatre',
  colour: 'color',
  color: 'colour',
  centre: 'center',
  center: 'centre',
  flavour: 'flavor',
  flavor: 'flavour',
  organise: 'organize',
  organize: 'organise',
  analyse: 'analyze',
  analyze: 'analyse',
  programme: 'program',
  program: 'programme',
  travelling: 'traveling',
  traveling: 'travelling',
  defence: 'defense',
  defense: 'defence',
};

// Word vs Digit numbers (1-10 + ordinals)
const NUMBER_WORD_MAP: Record<string, string> = {
  '1': 'one', 'one': '1',
  '2': 'two', 'two': '2',
  '3': 'three', 'three': '3',
  '4': 'four', 'four': '4',
  '5': 'five', 'five': '5',
  '6': 'six', 'six': '6',
  '7': 'seven', 'seven': '7',
  '8': 'eight', 'eight': '8',
  '9': 'nine', 'nine': '9',
  '10': 'ten', 'ten': '10',
  '1st': 'first', 'first': '1st',
  '2nd': 'second', 'second': '2nd',
  '3rd': 'third', 'third': '3rd',
};

/**
 * Checks if a given user response matches the correct answer.
 * Handles:
 * - Arrays of valid accepted variations
 * - Case-insensitivity
 * - TRUE/FALSE/NOT GIVEN abbreviations (T, F, NG)
 * - YES/NO/NOT GIVEN abbreviations (Y, N, NG)
 * - Single letter choices ('A', 'B', 'C')
 * - Multi-select sets ('A, B' vs 'B, A')
 * - Slash alternatives ('bus / coach')
 * - Optional words in parentheses ('(a) bus')
 * - UK / US spelling variations ('colour' vs 'color')
 * - Digits vs written numbers ('10' vs 'ten')
 */
export function isAnswerCorrect(
  userAnswer: string | undefined | null,
  correctAnswer: string | string[],
  type?: QuestionType,
  options?: Array<string | { id?: string; text?: string; label?: string }>
): boolean {
  if (!userAnswer || !userAnswer.trim()) return false;

  const normalizedUser = normalizeAnswerText(userAnswer);

  // Multi-choice multi-select handler
  if (type === 'multiple_choice_multi') {
    // Collect user letters, e.g. "A, C" or "C A" -> ["a", "c"]
    const userLetters = normalizedUser
      .split(/[\s,;&]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .sort();

    const expectedLetters = Array.isArray(correctAnswer)
      ? correctAnswer.map((c) => normalizeAnswerText(c)).sort()
      : normalizeAnswerText(correctAnswer).split(/[\s,;&]+/).map((s) => s.trim()).filter(Boolean).sort();

    if (userLetters.length !== expectedLetters.length) return false;
    return userLetters.every((val, index) => val === expectedLetters[index]);
  }

  // T/F/NG and Y/N/NG normalization
  const booleanEquivalents: Record<string, string[]> = {
    'true': ['true', 't'],
    'false': ['false', 'f'],
    'not given': ['not given', 'ng', 'notgiven'],
    'yes': ['yes', 'y'],
    'no': ['no', 'n'],
  };

  const getCanonicalBoolean = (val: string): string => {
    const v = val.toLowerCase().replace(/[\s_-]/g, '');
    for (const [canonical, aliases] of Object.entries(booleanEquivalents)) {
      if (aliases.some((a) => a.replace(/[\s_-]/g, '') === v)) {
        return canonical;
      }
    }
    return val;
  };

  const canonicalUser = getCanonicalBoolean(normalizedUser);

  // Gather and expand accepted list (handling arrays, slashes, and parentheses)
  const baseList = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  const expandedList: string[] = [];

  for (const item of baseList) {
    const slashParts = expandSlashes(item);
    for (const sp of slashParts) {
      const parenParts = expandParentheses(sp);
      for (const pp of parenParts) {
        expandedList.push(pp);
      }
    }
  }

  const stripArticles = (s: string) => s.replace(/^(a|an|the)\s+/i, '').trim();

  for (const accepted of expandedList) {
    const normalizedAccepted = normalizeAnswerText(accepted);
    const canonicalAccepted = getCanonicalBoolean(normalizedAccepted);

    // 1. Boolean check (T/F/NG or Y/N/NG)
    if (canonicalUser === canonicalAccepted) {
      return true;
    }

    // 2. Direct string match
    if (normalizedUser === normalizedAccepted) {
      return true;
    }

    // 3. Optional article match (e.g. "a bus" vs "bus")
    if (stripArticles(normalizedUser) === stripArticles(normalizedAccepted)) {
      return true;
    }

    // 4. Number word vs digit (e.g. "10" vs "ten")
    if (
      NUMBER_WORD_MAP[normalizedUser] === normalizedAccepted ||
      NUMBER_WORD_MAP[normalizedAccepted] === normalizedUser
    ) {
      return true;
    }

    // 5. UK / US spelling variant match
    if (
      SPELLING_VARIANTS[normalizedUser] === normalizedAccepted ||
      SPELLING_VARIANTS[normalizedAccepted] === normalizedUser
    ) {
      return true;
    }
  }

  // 6. Option text and option ID resolution if options array is present
  if (options && Array.isArray(options) && options.length > 0) {
    const correctIdx = getCorrectOriginalIndex({ options, correctAnswer });
    if (correctIdx >= 0 && correctIdx < options.length) {
      const correctOptRaw = typeof options[correctIdx] === 'object'
        ? ((options[correctIdx] as any).text || (options[correctIdx] as any).label || '')
        : options[correctIdx];
      const cleanCorrect = cleanOptionText(String(correctOptRaw)).toLowerCase();
      const cleanUser = cleanOptionText(userAnswer).toLowerCase();
      if (cleanUser && cleanCorrect && cleanUser === cleanCorrect) {
        return true;
      }
      if (typeof options[correctIdx] === 'object' && (options[correctIdx] as any).id === userAnswer) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Calculates raw score, band score, and accuracy metrics for an entire test attempt.
 */
export function evaluateReadingAttempt(
  responses: Array<{
    questionId: string;
    questionType: QuestionType;
    userAnswer: string;
    correctAnswer: string | string[];
    options?: Array<string | { id?: string; text?: string; label?: string }>;
  }>,
  testType: TestType = 'academic',
  totalTestQuestions = 40
): MarkingResult {
  let rawScore = 0;
  const breakdown: Record<string, ScoreBreakdownItem> = {};

  for (const item of responses) {
    const correct = isAnswerCorrect(item.userAnswer, item.correctAnswer, item.questionType, item.options);
    if (correct) {
      rawScore++;
    }

    if (!breakdown[item.questionType]) {
      breakdown[item.questionType] = {
        type: item.questionType,
        total: 0,
        correct: 0,
        accuracy: 0,
      };
    }

    breakdown[item.questionType].total++;
    if (correct) {
      breakdown[item.questionType].correct++;
    }
  }

  // Calculate percentages per type
  for (const key of Object.keys(breakdown)) {
    const group = breakdown[key];
    group.accuracy = group.total > 0 ? Math.round((group.correct / group.total) * 100) : 0;
  }

  const bandScore = convertRawToBand(rawScore, testType, totalTestQuestions);
  const accuracyPercentage = totalTestQuestions > 0 ? Math.round((rawScore / totalTestQuestions) * 100) : 0;

  return {
    rawScore,
    totalQuestions: totalTestQuestions,
    bandScore,
    accuracyPercentage,
    breakdownByType: breakdown,
  };
}
