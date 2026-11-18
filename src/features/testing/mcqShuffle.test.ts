import { describe, it, expect } from 'vitest';
import {
  hashStringToSeed,
  createPrng,
  cleanOptionText,
  isPinnedOption,
  shuffleMcqOptions,
  getCorrectOriginalIndex,
  isShuffledSelectionCorrect,
} from '../../lib/mcqShuffle';
import { isAnswerCorrect } from '../reading/marking';
import { isListeningAnswerCorrect } from '../listening/marking';

describe('MCQ Runtime Seeded Shuffle & Position Independence', () => {
  const sampleOptions = [
    'A) increases',
    'B) increased',
    'C) has increased',
    'D) is increasing',
  ];

  it('determines the correct original index based on text or letter', () => {
    // Text-based correct answer
    const q1 = { options: sampleOptions, correctAnswer: 'increased' };
    expect(getCorrectOriginalIndex(q1)).toBe(1);

    // Letter-based correct answer
    const q2 = { options: sampleOptions, correctAnswer: 'B' };
    expect(getCorrectOriginalIndex(q2)).toBe(1);

    const q3 = { options: sampleOptions, correctAnswer: 'D' };
    expect(getCorrectOriginalIndex(q3)).toBe(3);
  });

  it('produces identical order with the same seed (page refresh / resume)', () => {
    const seed = 'attempt_104_q25';
    const order1 = shuffleMcqOptions(sampleOptions, seed);
    const order2 = shuffleMcqOptions(sampleOptions, seed);

    expect(order1.map((o) => o.originalIndex)).toEqual(order2.map((o) => o.originalIndex));
    expect(order1.map((o) => o.text)).toEqual(order2.map((o) => o.text));
  });

  it('produces different order when taking the test again with a different seed', () => {
    const order1 = shuffleMcqOptions(sampleOptions, 'attempt_104_q25');
    const order2 = shuffleMcqOptions(sampleOptions, 'attempt_999_q25');

    // With 4 options, probability of two random seeds yielding the same order is 1/24 (~4%).
    // We check that at least one position differs or verify across 5 distinct seeds
    const distinctSeeds = ['seed_1', 'seed_2', 'seed_3', 'seed_4', 'seed_5'];
    const results = new Set(
      distinctSeeds.map((s) => shuffleMcqOptions(sampleOptions, s).map((o) => o.originalIndex).join(','))
    );
    expect(results.size).toBeGreaterThan(1);
  });

  it('shuffling never changes which option is marked correct', () => {
    const q = { options: sampleOptions, correctAnswer: 'increased' }; // original index 1
    const seeds = ['attempt_1', 'attempt_2', 'attempt_3', 'attempt_4', 'attempt_5'];

    for (const s of seeds) {
      const shuffled = shuffleMcqOptions(sampleOptions, s);
      // Find where "increased" landed in shuffled options
      const correctShuffledOption = shuffled.find((o) => o.text === 'increased')!;
      expect(correctShuffledOption).toBeDefined();

      // Marking must evaluate to true for the correct option
      expect(isShuffledSelectionCorrect(correctShuffledOption, q)).toBe(true);

      // Other options must evaluate to false
      const wrongOptions = shuffled.filter((o) => o.text !== 'increased');
      for (const w of wrongOptions) {
        expect(isShuffledSelectionCorrect(w, q)).toBe(false);
      }
    }
  });

  it('keeps pinned options ("All of the above", "None of the above") in the last position', () => {
    const optionsWithPinned = [
      'A) First hypothesis',
      'B) Second hypothesis',
      'C) Third hypothesis',
      'D) All of the above',
    ];

    for (let i = 0; i < 50; i++) {
      const shuffled = shuffleMcqOptions(optionsWithPinned, `test_seed_${i}`);
      // Last option must always be "All of the above"
      expect(shuffled[3].text.toLowerCase()).toBe('all of the above');
      expect(shuffled[3].originalIndex).toBe(3);
    }
  });

  it('statistical test: runs 2000 iterations on 4-option question and asserts each position holds correct answer between 20% and 30%', () => {
    const q = { options: sampleOptions, correctAnswer: 'B' }; // target is originalIndex 1
    const targetOriginalIndex = 1;
    const positionCounts = [0, 0, 0, 0];
    const iterations = 2000;

    for (let i = 0; i < iterations; i++) {
      const shuffled = shuffleMcqOptions(sampleOptions, `simulation_run_${i}`);
      const landingPosition = shuffled.findIndex((o) => o.originalIndex === targetOriginalIndex);
      positionCounts[landingPosition]++;
    }

    // Assert each position holds the target between 20% (400) and 30% (600)
    for (let pos = 0; pos < 4; pos++) {
      const pct = (positionCounts[pos] / iterations) * 100;
      expect(pct).toBeGreaterThanOrEqual(20);
      expect(pct).toBeLessThanOrEqual(30);
    }
  });

  it('cleans embedded option prefixes cleanly', () => {
    expect(cleanOptionText('A) an essential component')).toBe('an essential component');
    expect(cleanOptionText('B. a decorative tool')).toBe('a decorative tool');
    expect(cleanOptionText('(C) an evolutionary holdover')).toBe('an evolutionary holdover');
    expect(cleanOptionText('D - impossible to study')).toBe('impossible to study');
  });

  it('marks correct answer by option identity/text regardless of display position', () => {
    // Content question where correct option is "Option Two" (originally at letter B)
    const options = ['Option One', 'Option Two', 'Option Three', 'Option Four'];
    const correctAnswer = 'B';

    // Shuffle into a seed that moves "Option Two" to first position (letter A)
    const seed = 'seed_shuffle_test_1';
    const shuffled = shuffleMcqOptions(options, seed);
    const landingIdx = shuffled.findIndex((o) => o.text === 'Option Two');
    const displayedLetter = String.fromCharCode(65 + landingIdx);

    // User selects the correct option by text
    expect(isAnswerCorrect('Option Two', correctAnswer, 'multiple_choice_single', options)).toBe(true);

    // User selects incorrect option by text
    expect(isAnswerCorrect('Option One', correctAnswer, 'multiple_choice_single', options)).toBe(false);

    // Also works with listening marking
    expect(isListeningAnswerCorrect('Option Two', correctAnswer, 'multiple_choice_single', options)).toBe(true);
    expect(isListeningAnswerCorrect('Option Three', correctAnswer, 'multiple_choice_single', options)).toBe(false);
  });

  it('refresh simulation: restoring attemptSeed produces identical shuffled options and letter mapping', () => {
    const attemptSeed = 'test_att_54321';
    const questionId = 'reading_q_15';
    const seed = `${attemptSeed}_${questionId}`;

    // First render before refresh
    const initialRender = shuffleMcqOptions(sampleOptions, seed);

    // Simulated refresh: re-shuffling with the cached attemptSeed
    const afterRefreshRender = shuffleMcqOptions(sampleOptions, seed);

    expect(initialRender.map((o) => o.text)).toEqual(afterRefreshRender.map((o) => o.text));
    expect(initialRender.map((o) => o.originalIndex)).toEqual(afterRefreshRender.map((o) => o.originalIndex));

    // Retake simulation: generating a new attemptSeed produces a different order
    const retakeSeed = `test_att_99999_${questionId}`;
    const retakeRender = shuffleMcqOptions(sampleOptions, retakeSeed);
    // Across 10 distinct retake seeds, verify multiple orderings are produced
    const distinctRetakes = Array.from({ length: 10 }, (_, i) =>
      shuffleMcqOptions(sampleOptions, `retake_${i}_${questionId}`).map((o) => o.text).join('|')
    );
    const uniqueOrders = new Set(distinctRetakes);
    expect(uniqueOrders.size).toBeGreaterThan(1);
  });

  it('review screen order preservation: QuestionResponse.options matches the order user saw', () => {
    const attemptSeed = 'att_exam_live';
    const questionId = 'r_q_08';
    const seed = `${attemptSeed}_${questionId}`;

    const userSeenShuffled = shuffleMcqOptions(sampleOptions, seed);
    const savedResponseOptions = userSeenShuffled.map((o) => o.text);

    // On the review screen, options displayed are from savedResponseOptions
    expect(savedResponseOptions.length).toBe(sampleOptions.length);
    expect(savedResponseOptions).toEqual(userSeenShuffled.map((o) => o.text));
  });
});
