import { describe, it, expect } from 'vitest';
import {
  convertListeningRawToBand,
  isListeningAnswerCorrect,
  evaluateListeningAttempt,
} from './marking';

describe('IELTS Listening Band Conversion', () => {
  it('converts Listening raw scores to accurate bands according to official scale', () => {
    expect(convertListeningRawToBand(40)).toBe(9.0);
    expect(convertListeningRawToBand(39)).toBe(9.0);
    expect(convertListeningRawToBand(37)).toBe(8.5);
    expect(convertListeningRawToBand(35)).toBe(8.0);
    expect(convertListeningRawToBand(33)).toBe(7.5);
    expect(convertListeningRawToBand(30)).toBe(7.0);
    expect(convertListeningRawToBand(27)).toBe(6.5);
    expect(convertListeningRawToBand(23)).toBe(6.0);
    expect(convertListeningRawToBand(19)).toBe(5.5);
    expect(convertListeningRawToBand(16)).toBe(5.0);
    expect(convertListeningRawToBand(13)).toBe(4.5);
    expect(convertListeningRawToBand(10)).toBe(4.0);
    expect(convertListeningRawToBand(0)).toBe(0.0);
  });
});

describe('Listening Answer Matching & Normalization', () => {
  it('handles time formats like 7.30 vs 7:30', () => {
    expect(isListeningAnswerCorrect('7.30', '7:30')).toBe(true);
    expect(isListeningAnswerCorrect('07:30', '7:30')).toBe(true);
    expect(isListeningAnswerCorrect('7:30 am', ['7:30', '7:30 am'])).toBe(true);
  });

  it('handles ordinals and dates', () => {
    expect(isListeningAnswerCorrect('15th of May', '15 May')).toBe(true);
    expect(isListeningAnswerCorrect('15 may', '15 May')).toBe(true);
  });

  it('handles hyphens and spacing variations', () => {
    expect(isListeningAnswerCorrect('full-time', 'full time')).toBe(true);
    expect(isListeningAnswerCorrect('solar-panel', 'solar panel')).toBe(true);
  });

  it('evaluates full listening attempt', () => {
    const responses = [
      { questionId: 'l1', questionType: 'sentence_completion' as const, userAnswer: '7:30', correctAnswer: '7:30' },
      { questionId: 'l2', questionType: 'sentence_completion' as const, userAnswer: 'peter', correctAnswer: "Peter's" },
      { questionId: 'l3', questionType: 'multiple_choice_single' as const, userAnswer: 'B', correctAnswer: 'B' },
      { questionId: 'l4', questionType: 'multiple_choice_multi' as const, userAnswer: 'a, c', correctAnswer: ['A', 'C'] },
    ];

    const res = evaluateListeningAttempt(responses, 4);
    expect(res.rawScore).toBe(4);
    expect(res.accuracyPercentage).toBe(100);
  });
});
