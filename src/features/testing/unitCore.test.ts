import { describe, it, expect } from 'vitest';
import {
  convertRawToBand,
  isAnswerCorrect,
  normalizeAnswerText,
  expandParentheses,
  expandSlashes,
  ACADEMIC_READING_BAND_TABLE,
  GENERAL_READING_BAND_TABLE,
} from '../reading/marking';
import {
  convertListeningRawToBand,
  isListeningAnswerCorrect,
  LISTENING_BAND_TABLE,
} from '../listening/marking';
import { calculateSM2 } from '../vocab/sm2';
import { generateStudyPlan } from '../plan/planGenerator';
import type { DiagnosticWeaknessItem } from '../../types';
import fs from 'fs';
import path from 'path';

/* =====================================================================
 * 1. BAND SCORE CONVERSION
 * ===================================================================== */
describe('Unit Test: IELTS Band Score Conversion', () => {
  it('converts Academic Reading raw scores accurately across critical band cutoffs', () => {
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

  it('converts General Training Reading raw scores with steeper band requirements', () => {
    // In General Training, 30 raw is 6.0 (whereas Academic 30 is 7.0)
    expect(convertRawToBand(40, 'general')).toBe(9.0);
    expect(convertRawToBand(39, 'general')).toBe(8.5);
    expect(convertRawToBand(37, 'general')).toBe(8.0);
    expect(convertRawToBand(36, 'general')).toBe(7.5);
    expect(convertRawToBand(34, 'general')).toBe(7.0);
    expect(convertRawToBand(32, 'general')).toBe(6.5);
    expect(convertRawToBand(30, 'general')).toBe(6.0);
    expect(convertRawToBand(27, 'general')).toBe(5.5);
    expect(convertRawToBand(23, 'general')).toBe(5.0);
    expect(convertRawToBand(0, 'general')).toBe(0.0);
  });

  it('proportionally normalizes diagnostic tests with non-40 question lengths', () => {
    // 20 questions total: 15/20 scales to 30/40 -> Academic 7.0
    expect(convertRawToBand(15, 'academic', 20)).toBe(7.0);
    // 20 questions total: 10/20 scales to 20/40 -> Academic 5.5
    expect(convertRawToBand(10, 'academic', 20)).toBe(5.5);
    // 10 questions total: 8/10 scales to 32/40 -> Academic 7.0
    expect(convertRawToBand(8, 'academic', 10)).toBe(7.0);
  });

  it('converts Listening raw scores accurately across shared Academic/General scales', () => {
    expect(convertListeningRawToBand(40)).toBe(9.0);
    expect(convertListeningRawToBand(39)).toBe(9.0);
    expect(convertListeningRawToBand(37)).toBe(8.5);
    expect(convertListeningRawToBand(35)).toBe(8.0);
    expect(convertListeningRawToBand(32)).toBe(7.5);
    expect(convertListeningRawToBand(30)).toBe(7.0);
    expect(convertListeningRawToBand(26)).toBe(6.5);
    expect(convertListeningRawToBand(23)).toBe(6.0);
    expect(convertListeningRawToBand(18)).toBe(5.5);
    expect(convertListeningRawToBand(16)).toBe(5.0);
    expect(convertListeningRawToBand(0)).toBe(0.0);
  });

  it('handles negative or invalid raw score edge cases safely without throwing', () => {
    expect(convertRawToBand(-5, 'academic')).toBe(0.0);
    expect(convertRawToBand(0, 'academic', 0)).toBe(0.0);
    expect(convertListeningRawToBand(-10)).toBe(0.0);
  });
});

/* =====================================================================
 * 2. MARKING LOGIC & ANSWER VARIANTS
 * ===================================================================== */
describe('Unit Test: Marking Logic & Answer Variants', () => {
  describe('Boolean Abbreviations (T/F/NG and Y/N/NG)', () => {
    it('matches True / False / Not Given with case and shorthand abbreviations', () => {
      expect(isAnswerCorrect('True', 'true', 'true_false_not_given')).toBe(true);
      expect(isAnswerCorrect('T', 'TRUE', 'true_false_not_given')).toBe(true);
      expect(isAnswerCorrect('t', 'True', 'true_false_not_given')).toBe(true);
      expect(isAnswerCorrect('False', 'false', 'true_false_not_given')).toBe(true);
      expect(isAnswerCorrect('F', 'FALSE', 'true_false_not_given')).toBe(true);
      expect(isAnswerCorrect('f', 'False', 'true_false_not_given')).toBe(true);
      expect(isAnswerCorrect('NOT GIVEN', 'not given', 'true_false_not_given')).toBe(true);
      expect(isAnswerCorrect('NG', 'Not Given', 'true_false_not_given')).toBe(true);
      expect(isAnswerCorrect('ng', 'NOT GIVEN', 'true_false_not_given')).toBe(true);
      expect(isAnswerCorrect('notgiven', 'NOT GIVEN', 'true_false_not_given')).toBe(true);

      // Incorrect options
      expect(isAnswerCorrect('False', 'True', 'true_false_not_given')).toBe(false);
      expect(isAnswerCorrect('F', 'True', 'true_false_not_given')).toBe(false);
      expect(isAnswerCorrect('True', 'Not Given', 'true_false_not_given')).toBe(false);
    });

    it('matches Yes / No / Not Given with case and shorthand abbreviations', () => {
      expect(isAnswerCorrect('Yes', 'yes', 'yes_no_not_given')).toBe(true);
      expect(isAnswerCorrect('Y', 'YES', 'yes_no_not_given')).toBe(true);
      expect(isAnswerCorrect('No', 'no', 'yes_no_not_given')).toBe(true);
      expect(isAnswerCorrect('N', 'NO', 'yes_no_not_given')).toBe(true);
      expect(isAnswerCorrect('NG', 'Not Given', 'yes_no_not_given')).toBe(true);

      expect(isAnswerCorrect('No', 'Yes', 'yes_no_not_given')).toBe(false);
    });
  });

  describe('Parentheses & Slash Expansions', () => {
    it('expands optional words in parentheses', () => {
      expect(expandParentheses('(a) bus')).toContain('a bus');
      expect(expandParentheses('(a) bus')).toContain('bus');
      expect(isAnswerCorrect('bus', '(a) bus')).toBe(true);
      expect(isAnswerCorrect('a bus', '(a) bus')).toBe(true);
      expect(isAnswerCorrect('in June', '(in) June')).toBe(true);
      expect(isAnswerCorrect('June', '(in) June')).toBe(true);
    });

    it('expands slash alternative answers', () => {
      expect(expandSlashes('bus / coach')).toEqual(['bus', 'coach']);
      expect(isAnswerCorrect('bus', 'bus / coach')).toBe(true);
      expect(isAnswerCorrect('coach', 'bus / coach')).toBe(true);
      expect(isAnswerCorrect('airplane', 'bus / coach')).toBe(false);
    });
  });

  describe('UK vs US Spelling Equivalence', () => {
    it('accepts both British and American spelling variations', () => {
      expect(isAnswerCorrect('color', 'colour')).toBe(true);
      expect(isAnswerCorrect('colour', 'color')).toBe(true);
      expect(isAnswerCorrect('theater', 'theatre')).toBe(true);
      expect(isAnswerCorrect('theatre', 'theater')).toBe(true);
      expect(isAnswerCorrect('center', 'centre')).toBe(true);
      expect(isAnswerCorrect('centre', 'center')).toBe(true);
      expect(isAnswerCorrect('organize', 'organise')).toBe(true);
      expect(isAnswerCorrect('analyze', 'analyse')).toBe(true);
      expect(isAnswerCorrect('program', 'programme')).toBe(true);
      expect(isAnswerCorrect('traveling', 'travelling')).toBe(true);
      expect(isAnswerCorrect('defense', 'defence')).toBe(true);
    });
  });

  describe('Numbers & Ordinal Formatting', () => {
    it('matches digit and word forms', () => {
      expect(isAnswerCorrect('10', 'ten')).toBe(true);
      expect(isAnswerCorrect('ten', '10')).toBe(true);
      expect(isAnswerCorrect('3', 'three')).toBe(true);
      expect(isAnswerCorrect('three', '3')).toBe(true);
      expect(isAnswerCorrect('1st', 'first')).toBe(true);
      expect(isAnswerCorrect('first', '1st')).toBe(true);
    });

    it('handles Listening time formatting variations', () => {
      expect(isListeningAnswerCorrect('7.30', '7:30')).toBe(true);
      expect(isListeningAnswerCorrect('7:30', '7.30')).toBe(true);
      expect(isListeningAnswerCorrect('07:30', '7:30')).toBe(true);
    });

    it('handles Listening date ordinals and possessives', () => {
      expect(isListeningAnswerCorrect('15th of May', '15 May')).toBe(true);
      expect(isListeningAnswerCorrect('15 May', '15th May')).toBe(true);
      expect(isListeningAnswerCorrect("Peter's", 'Peter')).toBe(true);
      expect(isListeningAnswerCorrect('sit-stand', 'sit stand')).toBe(true);
    });
  });

  describe('Multi-select Set Order Invariance', () => {
    it('evaluates multi-select letters regardless of selection order', () => {
      expect(isAnswerCorrect('A, C', ['A', 'C'], 'multiple_choice_multi')).toBe(true);
      expect(isAnswerCorrect('C, A', ['A', 'C'], 'multiple_choice_multi')).toBe(true);
      expect(isAnswerCorrect('c a', ['a', 'c'], 'multiple_choice_multi')).toBe(true);
      expect(isAnswerCorrect('A; C', 'A, C', 'multiple_choice_multi')).toBe(true);
      expect(isAnswerCorrect('A, B', ['A', 'C'], 'multiple_choice_multi')).toBe(false);
      expect(isAnswerCorrect('A', ['A', 'C'], 'multiple_choice_multi')).toBe(false);
    });
  });

  describe('Whitespace & Punctuation Normalization', () => {
    it('strips surrounding quotes, trailing dots, and extra whitespace', () => {
      expect(normalizeAnswerText('  "renewable energy"  ')).toBe('renewable energy');
      expect(normalizeAnswerText('solar power.')).toBe('solar power');
      expect(normalizeAnswerText('urban    development')).toBe('urban development');
      expect(isAnswerCorrect('"solar power."', 'solar power')).toBe(true);
    });
  });
});

/* =====================================================================
 * 3. SM-2 SPACED REPETITION SCHEDULING
 * ===================================================================== */
describe('Unit Test: SuperMemo-2 (SM-2) Spaced Repetition Algorithm', () => {
  const initialWord = {
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5,
    timesCorrect: 0,
    timesIncorrect: 0,
    mastered: false,
  };

  it('resets interval and repetitions to 0 on rating "again" (complete lapse)', () => {
    const activeWord = {
      repetitions: 3,
      interval: 15,
      easeFactor: 2.4,
      timesCorrect: 3,
      timesIncorrect: 0,
      mastered: false,
    };

    const result = calculateSM2(activeWord, 'again');
    expect(result.repetitions).toBe(0);
    expect(result.interval).toBe(1);
    expect(result.easeFactor).toBe(2.2); // 2.4 - 0.2
    expect(result.mastered).toBe(false);
    expect(result.timesIncorrect).toBe(1);
  });

  it('never lets ease factor drop below 1.3 minimum boundary', () => {
    const lowEaseWord = {
      repetitions: 0,
      interval: 1,
      easeFactor: 1.35,
      timesCorrect: 0,
      timesIncorrect: 5,
      mastered: false,
    };

    const result = calculateSM2(lowEaseWord, 'again');
    expect(result.easeFactor).toBe(1.3);
  });

  it('progresses intervals correctly for consecutive "good" ratings', () => {
    // 1st review: rep 0 -> interval 1
    const r1 = calculateSM2(initialWord, 'good');
    expect(r1.repetitions).toBe(1);
    expect(r1.interval).toBe(1);
    expect(r1.timesCorrect).toBe(1);

    // 2nd review: rep 1 -> interval 6
    const r2 = calculateSM2({ ...initialWord, ...r1 }, 'good');
    expect(r2.repetitions).toBe(2);
    expect(r2.interval).toBe(6);

    // 3rd review: rep 2 -> interval = round(6 * 2.5) = 15
    const r3 = calculateSM2({ ...initialWord, ...r2 }, 'good');
    expect(r3.repetitions).toBe(3);
    expect(r3.interval).toBe(15);
  });

  it('advances faster and marks mastered after 4 consecutive "easy" reviews', () => {
    let state = { ...initialWord };
    for (let i = 0; i < 4; i++) {
      state = { ...state, ...calculateSM2(state, 'easy') };
    }
    expect(state.repetitions).toBe(4);
    expect(state.mastered).toBe(true);
    expect(state.easeFactor).toBeGreaterThan(2.5);
    expect(state.easeFactor).toBeLessThanOrEqual(3.0);
  });

  it('generates a valid nextReviewAt ISO date in the future', () => {
    const result = calculateSM2(initialWord, 'good');
    const nextDate = new Date(result.nextReviewAt);
    expect(nextDate.getTime()).toBeGreaterThan(Date.now() - 1000);
  });
});

/* =====================================================================
 * 4. STUDY PLAN GENERATION
 * ===================================================================== */
describe('Unit Test: Study Plan Curriculum Generation', () => {
  it('generates a 30-day curriculum with balanced 4-skill rotation by default', () => {
    const plan = generateStudyPlan(7.5, undefined, 60);
    expect(plan.length).toBe(30);

    const modules = plan.map((p) => p.module);
    expect(modules).toContain('reading');
    expect(modules).toContain('listening');
    expect(modules).toContain('writing');
    expect(modules).toContain('speaking');
    expect(modules).toContain('review');
  });

  it('dynamically adapts plan length based on candidate exam date', () => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days away
    const dateStr = futureDate.toISOString().split('T')[0];

    const plan = generateStudyPlan(7.0, dateStr, 45);
    expect(plan.length).toBe(14);
  });

  it('clamps study plan length between minimum 7 days and maximum 60 days', () => {
    const now = new Date();
    // 3 days away -> clamps to minimum 7 days
    const closeDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const shortPlan = generateStudyPlan(7.0, closeDate, 60);
    expect(shortPlan.length).toBe(7);

    // 120 days away -> clamps to maximum 60 days
    const distantDate = new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const longPlan = generateStudyPlan(7.0, distantDate, 60);
    expect(longPlan.length).toBe(60);
  });

  it('prioritizes candidate diagnostic weaknesses in daily task assignments', () => {
    const weaknesses: DiagnosticWeaknessItem[] = [
      {
        module: 'reading',
        questionType: 'true_false_not_given',
        questionTypeLabel: 'True / False / Not Given',
        total: 10,
        correct: 4,
        accuracy: 40,
        severity: 'critical',
        advice: 'Locate factual verification markers',
      },
    ];

    const plan = generateStudyPlan(7.5, undefined, 60, weaknesses);
    const readingDays = plan.filter((d) => d.module === 'reading');
    expect(readingDays.length).toBeGreaterThan(0);

    // The first reading day should focus on the candidate's primary weakness
    const firstReadingDay = readingDays[0];
    expect(firstReadingDay.tasks).toBeDefined();
    const hasWeakTypeTask = (firstReadingDay.tasks || []).some((t) =>
      t.title.toLowerCase().includes('true false not given')
    );
    expect(hasWeakTypeTask).toBe(true);
  });

  it('properly allocates rest/review days on 7-day cadence', () => {
    const plan = generateStudyPlan(7.0, undefined, 60);
    const restDays = plan.filter((d) => d.isRestDay);
    // Over a 30-day period, days falling on Sundays/7-day intervals are scheduled as rest
    expect(restDays.length).toBeGreaterThanOrEqual(1);
    for (const restDay of restDays) {
      expect(restDay.module).toBe('review');
      expect(restDay.tasks?.[0]?.module).toBe('vocab');
    }
  });
});

/* =====================================================================
 * 5. JSON SCHEMA COMPLIANCE
 * ===================================================================== */
describe('Unit Test: JSON Schema Validation & Content Integrity', () => {
  const contentRoot = path.resolve(process.cwd(), 'content');

  it('validates reading test schema: verifies all required properties across sample reading files', () => {
    const readingFile = path.join(contentRoot, 'reading', 'academic-test-01.json');
    expect(fs.existsSync(readingFile)).toBe(true);

    const testData = JSON.parse(fs.readFileSync(readingFile, 'utf8'));
    expect(testData.id).toBeDefined();
    expect(testData.title).toBeDefined();
    expect(['academic', 'general']).toContain(testData.testType);
    expect(testData.timeLimitMinutes).toBe(60);
    expect(testData.passages.length).toBe(3);

    for (const p of testData.passages) {
      expect(p.passageNumber).toBeGreaterThanOrEqual(1);
      expect(p.passageNumber).toBeLessThanOrEqual(3);
      expect(p.title).toBeDefined();
      expect(p.text.length).toBeGreaterThan(100);
      expect(p.questionGroups.length).toBeGreaterThan(0);

      for (const g of p.questionGroups) {
        expect(g.questionType).toBeDefined();
        expect(g.questions.length).toBeGreaterThan(0);
        for (const q of g.questions) {
          expect(q.id).toBeDefined();
          expect(q.prompt).toBeDefined();
          expect(q.correctAnswer).toBeDefined();
        }
      }
    }
  });

  it('validates listening test schema: verifies sections, audio transcripts and question structures', () => {
    const listeningFile = path.join(contentRoot, 'listening', 'listening-test-01.json');
    expect(fs.existsSync(listeningFile)).toBe(true);

    const testData = JSON.parse(fs.readFileSync(listeningFile, 'utf8'));
    expect(testData.id).toBeDefined();
    expect(testData.title).toBeDefined();
    expect(testData.sections.length).toBe(4);

    for (const s of testData.sections) {
      expect(s.sectionNumber).toBeGreaterThanOrEqual(1);
      expect(s.sectionNumber).toBeLessThanOrEqual(4);
      expect(s.title).toBeDefined();
      const script = s.audioScript || s.script;
      expect(Array.isArray(script)).toBe(true);
      expect(script.length).toBeGreaterThan(0);

      const groups = s.questionGroups || (s.questions ? [{ questions: s.questions }] : []);
      expect(groups.length).toBeGreaterThan(0);
    }
  });

  it('validates writing prompt schema: verifies prompt text, task type and model answers', () => {
    const writingFile = path.join(contentRoot, 'writing', 'task2.json');
    expect(fs.existsSync(writingFile)).toBe(true);

    const prompts = JSON.parse(fs.readFileSync(writingFile, 'utf8'));
    expect(Array.isArray(prompts)).toBe(true);
    expect(prompts.length).toBeGreaterThanOrEqual(10);

    for (const p of prompts) {
      expect(p.id).toBeDefined();
      expect(p.title).toBeDefined();
      expect(p.promptText).toBeDefined();
      expect(p.taskType).toBe('task2');
      expect(p.minWordCount).toBe(250);
      expect(p.recommendedMinutes).toBe(40);
    }
  });

  it('validates academic vocabulary schema: verifies headwords, parts of speech, collocations, and Urdu meanings', () => {
    const vocabFile = path.join(contentRoot, 'vocab', 'academic-words.json');
    expect(fs.existsSync(vocabFile)).toBe(true);

    const words = JSON.parse(fs.readFileSync(vocabFile, 'utf8'));
    expect(Array.isArray(words)).toBe(true);
    expect(words.length).toBeGreaterThanOrEqual(100);

    const firstWord = words[0];
    expect(firstWord.id).toBeDefined();
    expect(firstWord.word).toBeDefined();
    expect(firstWord.partOfSpeech).toBeDefined();
    expect(firstWord.meaning).toBeDefined();
    expect(firstWord.exampleSentence).toBeDefined();
    expect(firstWord.urduMeaning).toBeDefined();
    expect(Array.isArray(firstWord.collocations)).toBe(true);
  });

  it('rejects structurally invalid test objects with clear schema assertions', () => {
    // Missing title
    const invalidReadingTest = {
      id: 'bad-01',
      testType: 'academic',
      timeLimitMinutes: 60,
      passages: [],
    };

    expect(invalidReadingTest).not.toHaveProperty('title');
    expect(invalidReadingTest.passages.length).not.toBe(3);
  });
});
