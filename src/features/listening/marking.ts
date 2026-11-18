import type { QuestionType } from '../../types';
import { isAnswerCorrect as baseIsAnswerCorrect, normalizeAnswerText } from '../reading/marking';

export interface ListeningMarkingResult {
  rawScore: number;
  totalQuestions: number;
  bandScore: number;
  accuracyPercentage: number;
  breakdownByType: Record<string, { total: number; correct: number; accuracy: number }>;
}

/**
 * Standard IELTS Listening raw-score to band score mapping (40 questions).
 * Both Academic and General Training share the identical Listening conversion curve.
 */
export const LISTENING_BAND_TABLE: Record<number, number> = {
  40: 9.0, 39: 9.0,
  38: 8.5, 37: 8.5,
  36: 8.0, 35: 8.0,
  34: 7.5, 33: 7.5, 32: 7.5,
  31: 7.0, 30: 7.0,
  29: 6.5, 28: 6.5, 27: 6.5, 26: 6.5,
  25: 6.0, 24: 6.0, 23: 6.0,
  22: 5.5, 21: 5.5, 20: 5.5, 19: 5.5, 18: 5.5,
  17: 5.0, 16: 5.0,
  15: 4.5, 14: 4.5, 13: 4.5,
  12: 4.0, 11: 4.0, 10: 4.0,
  9: 3.5, 8: 3.5,
  7: 3.0, 6: 3.0,
  5: 2.5, 4: 2.5,
  3: 2.0, 2: 2.0, 1: 2.0, 0: 0.0,
};

export function convertListeningRawToBand(rawScore: number, totalQuestions = 40): number {
  if (totalQuestions <= 0 || rawScore <= 0) return 0.0;

  const scaledRaw = totalQuestions === 40
    ? Math.round(rawScore)
    : Math.min(40, Math.max(0, Math.round((rawScore / totalQuestions) * 40)));

  return LISTENING_BAND_TABLE[scaledRaw] ?? 0.0;
}

/**
 * Normalizes number/time representations commonly found in IELTS listening:
 * e.g. "9.30" vs "9:30" vs "9 30"
 * e.g. "15th" vs "15"
 */
export function isListeningAnswerCorrect(
  userAnswer: string | undefined | null,
  correctAnswer: string | string[],
  type?: QuestionType,
  options?: Array<string | { id?: string; text?: string; label?: string }>
): boolean {
  if (!userAnswer || !userAnswer.trim()) return false;

  // Standard base answer matching
  if (baseIsAnswerCorrect(userAnswer, correctAnswer, type, options)) return true;

  const normUser = normalizeAnswerText(userAnswer);
  const acceptedList = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];

  for (const accepted of acceptedList) {
    const normAccepted = normalizeAnswerText(accepted);

    // 1. Time formatting normalization (e.g. 7:30 vs 7.30, 07:30 vs 7:30)
    const normalizeTime = (s: string) => s.replace(/\./g, ':').replace(/^0(\d:\d{2})/, '$1');
    if (normalizeTime(normUser) === normalizeTime(normAccepted)) return true;

    // 2. Numerical ordinal stripping (e.g. "15th of may" vs "15 may")
    const stripOrdinals = (s: string) => s.replace(/(\d+)(st|nd|rd|th)\b/g, '$1').replace(/\bof\b/g, ' ').replace(/\s+/g, ' ').trim();
    if (stripOrdinals(normUser) === stripOrdinals(normAccepted)) return true;

    // 3. Hyphens & spaces: "sit-stand" vs "sit stand"
    if (normUser.replace(/[-_]/g, ' ') === normAccepted.replace(/[-_]/g, ' ')) return true;

    // 4. Possessive 's stripping (e.g. "peter" vs "peter's")
    const stripPossessive = (s: string) => s.replace(/['’]s?\b/g, '').trim();
    if (stripPossessive(normUser) === stripPossessive(normAccepted)) return true;
  }

  return false;
}

export function evaluateListeningAttempt(
  responses: Array<{
    questionId: string;
    questionType: QuestionType;
    userAnswer: string;
    correctAnswer: string | string[];
    options?: Array<string | { id?: string; text?: string; label?: string }>;
  }>,
  totalTestQuestions = 40
): ListeningMarkingResult {
  let rawScore = 0;
  const breakdown: Record<string, { total: number; correct: number; accuracy: number }> = {};

  for (const item of responses) {
    const correct = isListeningAnswerCorrect(item.userAnswer, item.correctAnswer, item.questionType, item.options);
    if (correct) rawScore++;

    if (!breakdown[item.questionType]) {
      breakdown[item.questionType] = { total: 0, correct: 0, accuracy: 0 };
    }
    breakdown[item.questionType].total++;
    if (correct) breakdown[item.questionType].correct++;
  }

  for (const key of Object.keys(breakdown)) {
    const g = breakdown[key];
    g.accuracy = g.total > 0 ? Math.round((g.correct / g.total) * 100) : 0;
  }

  const bandScore = convertListeningRawToBand(rawScore, totalTestQuestions);
  const accuracyPercentage = totalTestQuestions > 0 ? Math.round((rawScore / totalTestQuestions) * 100) : 0;

  return {
    rawScore,
    totalQuestions: totalTestQuestions,
    bandScore,
    accuracyPercentage,
    breakdownByType: breakdown,
  };
}
