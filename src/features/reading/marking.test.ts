import { describe, it, expect } from 'vitest';
import {
  convertRawToBand,
  normalizeAnswerText,
  isAnswerCorrect,
  evaluateReadingAttempt,
} from './marking';

describe('IELTS Reading Band Conversion', () => {
  it('converts Academic Reading raw scores accurately', () => {
    expect(convertRawToBand(40, 'academic')).toBe(9.0);
    expect(convertRawToBand(39, 'academic')).toBe(9.0);
    expect(convertRawToBand(37, 'academic')).toBe(8.5);
    expect(convertRawToBand(35, 'academic')).toBe(8.0);
    expect(convertRawToBand(33, 'academic')).toBe(7.5);
    expect(convertRawToBand(30, 'academic')).toBe(7.0);
    expect(convertRawToBand(27, 'academic')).toBe(6.5);
    expect(convertRawToBand(23, 'academic')).toBe(6.0);
    expect(convertRawToBand(19, 'academic')).toBe(5.5);
    expect(convertRawToBand(15, 'academic')).toBe(5.0);
    expect(convertRawToBand(10, 'academic')).toBe(4.0);
    expect(convertRawToBand(0, 'academic')).toBe(0.0);
  });

  it('converts General Training Reading raw scores with strict curve', () => {
    expect(convertRawToBand(40, 'general')).toBe(9.0);
    expect(convertRawToBand(39, 'general')).toBe(8.5);
    expect(convertRawToBand(38, 'general')).toBe(8.0);
    expect(convertRawToBand(36, 'general')).toBe(7.5);
    expect(convertRawToBand(34, 'general')).toBe(7.0);
    expect(convertRawToBand(32, 'general')).toBe(6.5);
    expect(convertRawToBand(30, 'general')).toBe(6.0);
    expect(convertRawToBand(27, 'general')).toBe(5.5);
    expect(convertRawToBand(23, 'general')).toBe(5.0);
    expect(convertRawToBand(15, 'general')).toBe(4.0);
  });

  it('handles proportional scaling for tests with non-40 questions', () => {
    // 10 out of 20 questions in Academic = 20 / 40 -> Band 5.5
    expect(convertRawToBand(10, 'academic', 20)).toBe(5.5);
    // 17 out of 20 questions in Academic = 34 / 40 -> Band 7.5
    expect(convertRawToBand(17, 'academic', 20)).toBe(7.5);
  });
});

describe('Answer Normalization & Evaluation', () => {
  it('normalizes whitespace and punctuation', () => {
    expect(normalizeAnswerText('   Urban Heat Island.  ')).toBe('urban heat island');
    expect(normalizeAnswerText('"Bioluminescence"')).toBe('bioluminescence');
    expect(normalizeAnswerText('seven thirty;')).toBe('seven thirty');
  });

  it('evaluates True/False/Not Given correctly including abbreviations', () => {
    expect(isAnswerCorrect('TRUE', 'TRUE', 'true_false_not_given')).toBe(true);
    expect(isAnswerCorrect('t', 'TRUE', 'true_false_not_given')).toBe(true);
    expect(isAnswerCorrect('False', 'FALSE', 'true_false_not_given')).toBe(true);
    expect(isAnswerCorrect('f', 'FALSE', 'true_false_not_given')).toBe(true);
    expect(isAnswerCorrect('NOT GIVEN', 'NOT GIVEN', 'true_false_not_given')).toBe(true);
    expect(isAnswerCorrect('ng', 'NOT GIVEN', 'true_false_not_given')).toBe(true);
    expect(isAnswerCorrect('true', 'FALSE', 'true_false_not_given')).toBe(false);
  });

  it('evaluates Yes/No/Not Given correctly', () => {
    expect(isAnswerCorrect('YES', 'YES', 'yes_no_not_given')).toBe(true);
    expect(isAnswerCorrect('y', 'YES', 'yes_no_not_given')).toBe(true);
    expect(isAnswerCorrect('no', 'NO', 'yes_no_not_given')).toBe(true);
    expect(isAnswerCorrect('n', 'NO', 'yes_no_not_given')).toBe(true);
  });

  it('evaluates multiple choice multi-select with any order', () => {
    expect(isAnswerCorrect('A, C', ['A', 'C'], 'multiple_choice_multi')).toBe(true);
    expect(isAnswerCorrect('C, A', ['A', 'C'], 'multiple_choice_multi')).toBe(true);
    expect(isAnswerCorrect('a c', ['A', 'C'], 'multiple_choice_multi')).toBe(true);
    expect(isAnswerCorrect('A, B', ['A', 'C'], 'multiple_choice_multi')).toBe(false);
  });

  it('supports multiple accepted spelling variations', () => {
    const accepted = ['underwater', 'subsea', 'sub-surface'];
    expect(isAnswerCorrect('underwater', accepted, 'sentence_completion')).toBe(true);
    expect(isAnswerCorrect('subsea', accepted, 'sentence_completion')).toBe(true);
    expect(isAnswerCorrect('sub-surface', accepted, 'sentence_completion')).toBe(true);
    expect(isAnswerCorrect('aerial', accepted, 'sentence_completion')).toBe(false);
  });

  it('evaluates an entire test attempt and generates accurate breakdown', () => {
    const responses = [
      { questionId: 'q1', questionType: 'true_false_not_given' as const, userAnswer: 'TRUE', correctAnswer: 'TRUE' },
      { questionId: 'q2', questionType: 'true_false_not_given' as const, userAnswer: 'FALSE', correctAnswer: 'TRUE' },
      { questionId: 'q3', questionType: 'multiple_choice_single' as const, userAnswer: 'B', correctAnswer: 'B' },
      { questionId: 'q4', questionType: 'sentence_completion' as const, userAnswer: 'solar energy', correctAnswer: 'solar energy' },
    ];

    const result = evaluateReadingAttempt(responses, 'academic', 4);
    expect(result.rawScore).toBe(3);
    expect(result.accuracyPercentage).toBe(75);
    expect(result.breakdownByType['true_false_not_given'].total).toBe(2);
    expect(result.breakdownByType['true_false_not_given'].correct).toBe(1);
    expect(result.breakdownByType['true_false_not_given'].accuracy).toBe(50);
    expect(result.breakdownByType['multiple_choice_single'].accuracy).toBe(100);
  });
});
