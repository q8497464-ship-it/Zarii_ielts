import { describe, it, expect } from 'vitest';
import { calculateSM2, createInitialVocabProgress, calculateStreak } from './sm2';
import {
  ALL_ACADEMIC_WORDS,
  ALL_GRAMMAR_LESSONS,
  ALL_PHRASE_CATEGORIES,
  VOCAB_TOPICS,
  getWordsByTopic,
  searchAcademicWords,
} from './vocabContent';
import type { VocabProgress } from '../../types';

describe('SuperMemo-2 (SM-2) Spaced Repetition Algorithm', () => {
  it('creates default initial progress entry correctly', () => {
    const entry = createInitialVocabProgress('env_01', false);
    expect(entry.wordId).toBe('env_01');
    expect(entry.isCustom).toBe(false);
    expect(entry.repetitions).toBe(0);
    expect(entry.interval).toBe(1);
    expect(entry.easeFactor).toBe(2.5);
  });

  it('handles "again" (lapse) rating by resetting repetitions and setting interval to 1 day', () => {
    const current = {
      repetitions: 3,
      interval: 15,
      easeFactor: 2.5,
      timesCorrect: 3,
      timesIncorrect: 0,
      mastered: false,
    };

    const updated = calculateSM2(current, 'again');
    expect(updated.repetitions).toBe(0);
    expect(updated.interval).toBe(1);
    // Ease factor should decrease on again
    expect(updated.easeFactor).toBeLessThan(2.5);
    expect(updated.timesIncorrect).toBe(1);
    expect(updated.mastered).toBe(false);
  });

  it('handles "good" progression through standard SM-2 intervals (1 -> 6 -> interval * EF)', () => {
    let state = {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      timesCorrect: 0,
      timesIncorrect: 0,
      mastered: false,
    };

    // First successful review (repetitions becomes 1, interval = 1)
    state = calculateSM2(state, 'good');
    expect(state.repetitions).toBe(1);
    expect(state.interval).toBe(1);

    // Second review (repetitions becomes 2, interval = 6)
    state = calculateSM2(state, 'good');
    expect(state.repetitions).toBe(2);
    expect(state.interval).toBe(6);

    // Third review (repetitions becomes 3, interval = 6 * 2.5 = 15)
    state = calculateSM2(state, 'good');
    expect(state.repetitions).toBe(3);
    expect(state.interval).toBe(Math.round(6 * state.easeFactor));
  });

  it('handles "easy" rating by increasing ease factor and giving interval bonus', () => {
    let state = {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      timesCorrect: 0,
      timesIncorrect: 0,
      mastered: false,
    };

    state = calculateSM2(state, 'easy');
    expect(state.repetitions).toBe(1);
    expect(state.interval).toBe(4); // Easy first interval is 4
    expect(state.easeFactor).toBeGreaterThan(2.5);
  });

  it('enforces ease factor lower bound at 1.30', () => {
    let state = {
      repetitions: 0,
      interval: 1,
      easeFactor: 1.35,
      timesCorrect: 0,
      timesIncorrect: 0,
      mastered: false,
    };

    // Multiple "again" lapses
    state = calculateSM2(state, 'again');
    state = calculateSM2(state, 'again');
    state = calculateSM2(state, 'again');

    expect(state.easeFactor).toBeGreaterThanOrEqual(1.30);
  });

  it('calculates daily streak accurately', () => {
    expect(calculateStreak([])).toBe(0);

    const todayIso = new Date().toISOString();
    const mockEntries: VocabProgress[] = [
      {
        wordId: 'w1',
        word: 'mitigate',
        definition: 'make less severe',
        urduMeaning: 'کم کرنا',
        partOfSpeech: 'verb',
        topic: 'environment',
        exampleSentence: 'Policies mitigate carbon emission.',
        collocations: [],
        synonyms: [],
        repetitions: 1,
        interval: 1,
        easeFactor: 2.5,
        lastReviewedAt: todayIso,
        nextReviewAt: todayIso,
        timesCorrect: 1,
        timesIncorrect: 0,
        mastered: false,
        isCustom: false,
      },
    ];

    expect(calculateStreak(mockEntries)).toBeGreaterThanOrEqual(1);
  });
});

describe('Academic Vocabulary Content (600+ Enriched Words)', () => {
  it('contains at least 600 academic words', () => {
    expect(ALL_ACADEMIC_WORDS.length).toBeGreaterThanOrEqual(600);
  });

  it('covers all IELTS Academic topics comprehensively', () => {
    expect(VOCAB_TOPICS.length).toBeGreaterThanOrEqual(20);
    for (const topic of VOCAB_TOPICS) {
      const topicWords = getWordsByTopic(topic);
      expect(topicWords.length).toBeGreaterThan(0);
    }
  });

  it('validates required fields, Urdu translations, collocations and synonyms for every word', () => {
    for (const item of ALL_ACADEMIC_WORDS) {
      expect(item.id).toBeTruthy();
      expect(item.word).toBeTruthy();
      expect(item.partOfSpeech).toMatch(/^(noun|verb|adjective|adverb|phrase)$/);
      expect(item.meaning).toBeTruthy();
      expect(item.exampleSentence).toBeTruthy();
      expect(item.urduMeaning).toBeTruthy();
      expect(item.collocations.length).toBeGreaterThanOrEqual(2);
      expect(item.synonyms.length).toBeGreaterThanOrEqual(2);
      expect(item.bandTarget).toBeGreaterThanOrEqual(5.5);
    }
  });

  it('supports search by English word, meaning, and Urdu text', () => {
    const resultsWord = searchAcademicWords('biodiversity');
    expect(resultsWord.length).toBeGreaterThan(0);
    expect(resultsWord[0].word.toLowerCase()).toBe('biodiversity');

    const resultsUrdu = searchAcademicWords('ماحول');
    expect(resultsUrdu.length).toBeGreaterThan(0);
  });
});

describe('Grammar Masterclass Content (15 Lessons, 150 Exercises)', () => {
  it('contains exactly 15 grammar lessons', () => {
    expect(ALL_GRAMMAR_LESSONS.length).toBe(15);
  });

  it('provides exactly 10 exercises per lesson (150 total)', () => {
    let totalExercises = 0;
    for (const lesson of ALL_GRAMMAR_LESSONS) {
      expect(lesson.exercises.length).toBe(10);
      totalExercises += lesson.exercises.length;

      for (const ex of lesson.exercises) {
        expect(ex.id).toBeTruthy();
        expect(ex.prompt).toBeTruthy();
        expect(ex.correctAnswer).toBeTruthy();
        expect(ex.explanation).toBeTruthy();
      }
    }
    expect(totalExercises).toBe(150);
  });
});

describe('Writing Phrase Bank Content', () => {
  it('contains categorized phrases for Academic Task 1, General Training, and Task 2', () => {
    expect(ALL_PHRASE_CATEGORIES.length).toBeGreaterThan(0);

    const hasTask1 = ALL_PHRASE_CATEGORIES.some((c) => c.category.startsWith('task1_academic'));
    const hasGT = ALL_PHRASE_CATEGORIES.some((c) => c.category.startsWith('task1_general'));
    const hasTask2 = ALL_PHRASE_CATEGORIES.some((c) => c.category.startsWith('task2'));

    expect(hasTask1).toBe(true);
    expect(hasGT).toBe(true);
    expect(hasTask2).toBe(true);
  });

  it('validates that every phrase has a function and an illustrative example', () => {
    for (const cat of ALL_PHRASE_CATEGORIES) {
      expect(cat.phrases.length).toBeGreaterThan(0);
      for (const p of cat.phrases) {
        expect(p.phrase).toBeTruthy();
        expect(p.function).toBeTruthy();
        expect(p.example).toBeTruthy();
      }
    }
  });
});
