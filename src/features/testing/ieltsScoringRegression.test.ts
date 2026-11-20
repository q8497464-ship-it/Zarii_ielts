import { describe, it, expect } from 'vitest';
import {
  roundIeltsBand,
  scoreListeningSection,
  scoreReadingSection,
  scoreWritingSection,
  scoreSpeakingSection,
  computeMockExamReport,
  validateWritingText,
  validateSpeakingPart,
} from '../mock/mockScoring';
import { convertRawToBand as convertReadingBand } from '../reading/marking';
import { convertListeningRawToBand } from '../listening/marking';
import { isPlaceholderName, extractCandidateName } from '../../shared/utils/candidateUtils';

describe('IELTS Official Band Rounding & Clamping (Cambridge Standard)', () => {
  it('correctly rounds exact whole and half bands', () => {
    expect(roundIeltsBand(5.0)).toBe(5.0);
    expect(roundIeltsBand(6.5)).toBe(6.5);
    expect(roundIeltsBand(7.0)).toBe(7.0);
    expect(roundIeltsBand(8.5)).toBe(8.5);
    expect(roundIeltsBand(9.0)).toBe(9.0);
  });

  it('rounds down when remainder is under 0.25 (e.g. 6.125 -> 6.0)', () => {
    expect(roundIeltsBand(6.125)).toBe(6.0);
    expect(roundIeltsBand(6.24)).toBe(6.0);
    expect(roundIeltsBand(7.05)).toBe(7.0);
  });

  it('rounds up to x.5 when remainder is exactly 0.25 (e.g. 6.25 -> 6.5)', () => {
    expect(roundIeltsBand(6.25)).toBe(6.5);
    expect(roundIeltsBand(7.25)).toBe(7.5);
    expect(roundIeltsBand(8.25)).toBe(8.5);
  });

  it('rounds to x.5 when remainder is between 0.25 and 0.75 (e.g. 6.375 -> 6.5, 6.625 -> 6.5)', () => {
    expect(roundIeltsBand(6.375)).toBe(6.5);
    expect(roundIeltsBand(6.50)).toBe(6.5);
    expect(roundIeltsBand(6.625)).toBe(6.5);
    expect(roundIeltsBand(6.74)).toBe(6.5);
  });

  it('rounds up to next whole band when remainder is exactly 0.75 (e.g. 6.75 -> 7.0)', () => {
    expect(roundIeltsBand(6.75)).toBe(7.0);
    expect(roundIeltsBand(7.75)).toBe(8.0);
    expect(roundIeltsBand(5.75)).toBe(6.0);
  });

  it('enforces bounds between 0.0 and 9.0', () => {
    expect(roundIeltsBand(-2.5)).toBe(0.0);
    expect(roundIeltsBand(9.5)).toBe(9.0);
  });
});

describe('Academic & General Reading & Listening Band Conversion Tables', () => {
  it('correctly maps Academic Reading raw scores out of 40', () => {
    expect(convertReadingBand(40, 'academic')).toBe(9.0);
    expect(convertReadingBand(39, 'academic')).toBe(9.0);
    expect(convertReadingBand(37, 'academic')).toBe(8.5);
    expect(convertReadingBand(35, 'academic')).toBe(8.0);
    expect(convertReadingBand(33, 'academic')).toBe(7.5);
    expect(convertReadingBand(30, 'academic')).toBe(7.0);
    expect(convertReadingBand(27, 'academic')).toBe(6.5);
    expect(convertReadingBand(23, 'academic')).toBe(6.0);
    expect(convertReadingBand(19, 'academic')).toBe(5.5);
    expect(convertReadingBand(15, 'academic')).toBe(5.0);
    expect(convertReadingBand(0, 'academic')).toBe(0.0);
  });

  it('correctly maps General Training Reading raw scores out of 40', () => {
    expect(convertReadingBand(40, 'general')).toBe(9.0);
    expect(convertReadingBand(39, 'general')).toBe(8.5);
    expect(convertReadingBand(38, 'general')).toBe(8.0);
    expect(convertReadingBand(36, 'general')).toBe(7.5);
    expect(convertReadingBand(34, 'general')).toBe(7.0);
    expect(convertReadingBand(32, 'general')).toBe(6.5);
    expect(convertReadingBand(30, 'general')).toBe(6.0);
    expect(convertReadingBand(0, 'general')).toBe(0.0);
  });

  it('correctly maps Listening raw scores out of 40', () => {
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
});

describe('Input Validation for Writing and Speaking', () => {
  it('validates writing text correctly', () => {
    expect(validateWritingText('', '', 50).isValid).toBe(false);
    expect(validateWritingText('Too short', '', 50).isValid).toBe(false);
    expect(validateWritingText('aaaaa aaaaa aaaaa aaaaa', '', 5).isValid).toBe(false);
  });

  it('validates speaking part length', () => {
    expect(validateSpeakingPart('', 1).isValid).toBe(false);
    expect(validateSpeakingPart('Hello world', 1).isValid).toBe(false);
    expect(
      validateSpeakingPart(
        'I have been living in this vibrant coastal city for over five years now and I really enjoy the cultural atmosphere and friendly community in my neighborhood.',
        1
      ).isValid
    ).toBe(true);
  });
});

describe('Empty-Attempt Guards & Anti-Fake Band Protection', () => {
  const dummyReadingPassages = [
    {
      questionGroups: [
        {
          questions: [
            { id: 'r1', correctAnswer: 'true' },
            { id: 'r2', correctAnswer: 'heading 1' },
          ],
        },
      ],
    },
  ];

  const dummyListeningSections = [
    {
      questionGroups: [
        {
          questions: [
            { id: 'l1', correctAnswer: 'central park' },
            { id: 'l2', correctAnswer: 'library' },
          ],
        },
      ],
    },
  ];

  it('returns not_attempted status when user skips Reading', () => {
    const scored = scoreReadingSection({}, dummyReadingPassages, 'academic');
    expect(scored.status).toBe('not_attempted');
    expect(scored.band).toBeUndefined();
    expect(scored.answeredCount).toBe(0);
    expect(scored.skippedCount).toBe(2);
  });

  it('returns not_attempted status when user skips Listening', () => {
    const scored = scoreListeningSection({}, dummyListeningSections);
    expect(scored.status).toBe('not_attempted');
    expect(scored.band).toBeUndefined();
    expect(scored.answeredCount).toBe(0);
    expect(scored.skippedCount).toBe(2);
  });

  it('returns not_attempted status when user skips Writing', () => {
    const scored = scoreWritingSection('', '');
    expect(scored.status).toBe('not_attempted');
    expect(scored.band).toBeUndefined();
  });

  it('returns not_attempted status when user skips Speaking', () => {
    const scored = scoreSpeakingSection(['', '', '']);
    expect(scored.status).toBe('not_attempted');
    expect(scored.band).toBeUndefined();
    expect(scored.partsAttempted).toBe(0);
  });

  it('computes overall band ONLY when all four skills are assessed', () => {
    // 1. Partial/Empty attempt: Overall must be null
    const emptyReport = computeMockExamReport(
      'mock-1',
      'Cambridge Practice 1',
      'academic',
      'Test Candidate',
      {
        listening: { status: 'not_attempted', raw: 0, total: 40, answeredCount: 0, skippedCount: 40 },
        reading: { status: 'not_attempted', raw: 0, total: 40, answeredCount: 0, skippedCount: 40 },
        writing: { status: 'not_attempted', wordCountTask1: 0, wordCountTask2: 0 },
        speaking: { status: 'not_attempted', partsAttempted: 0, partsSkipped: 3, totalWords: 0 },
      }
    );

    expect(emptyReport.allSkillsAssessed).toBe(false);
    expect(emptyReport.overallBand).toBeNull();
    expect(emptyReport.scores.reading.status).toBe('not_attempted');
    expect(emptyReport.scores.listening.status).toBe('not_attempted');
    expect(emptyReport.scores.writing.status).toBe('not_attempted');
    expect(emptyReport.scores.speaking.status).toBe('not_attempted');

    // 2. Completed attempt with all 4 skills assessed
    const completeReport = computeMockExamReport(
      'mock-1',
      'Cambridge Practice 1',
      'academic',
      'Test Candidate',
      {
        reading: { status: 'assessed_rules', band: 7.0, raw: 30, total: 40 },
        listening: { status: 'assessed_rules', band: 6.5, raw: 28, total: 40 },
        writing: { status: 'assessed_rules', band: 6.5, wordCountTask1: 160, wordCountTask2: 270 },
        speaking: { status: 'assessed_rules', band: 7.0, totalWords: 320 },
      }
    );

    expect(completeReport.allSkillsAssessed).toBe(true);
    expect(completeReport.overallBand).toBe(7.0); // (7.0 + 6.5 + 6.5 + 7.0) / 4 = 6.75 -> 7.0
    expect(completeReport.strengths.length).toBeGreaterThan(0);
  });
});

describe('Candidate Identity Resolution & Placeholder Protection', () => {
  it('identifies placeholder names accurately', () => {
    expect(isPlaceholderName('Candidate')).toBe(true);
    expect(isPlaceholderName('IELTS Candidate')).toBe(true);
    expect(isPlaceholderName('Guest Candidate')).toBe(true);
    expect(isPlaceholderName('')).toBe(true);
    expect(isPlaceholderName(null)).toBe(true);
    expect(isPlaceholderName('Zarmeen')).toBe(false);
    expect(isPlaceholderName('Qamar')).toBe(false);
  });

  it('resolves real candidate name from user metadata or formatted email', () => {
    const userWithMeta = {
      email: 'student@example.com',
      user_metadata: { full_name: 'Zarmeen Tariq' },
    };
    expect(extractCandidateName(userWithMeta, 'Candidate')).toBe('Zarmeen Tariq');

    const userWithEmailOnly = {
      email: 'ali.raza@gmail.com',
      user_metadata: {},
    };
    expect(extractCandidateName(userWithEmailOnly, 'Candidate')).toBe('Ali Raza');
  });
});
