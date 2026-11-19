import { describe, it, expect } from 'vitest';
import {
  roundIeltsBand,
  validateWritingText,
  validateSpeakingPart,
  scoreListeningSection,
  scoreReadingSection,
  scoreWritingSection,
  scoreSpeakingSection,
  computeMockExamReport,
} from './mockScoring';

describe('IELTS Official Rounding Rules (roundIeltsBand)', () => {
  it('rounds exact whole and half bands without modification', () => {
    expect(roundIeltsBand(6.0)).toBe(6.0);
    expect(roundIeltsBand(6.5)).toBe(6.5);
    expect(roundIeltsBand(7.0)).toBe(7.0);
    expect(roundIeltsBand(9.0)).toBe(9.0);
  });

  it('rounds down when fractional part is under 0.25', () => {
    expect(roundIeltsBand(6.1)).toBe(6.0);
    expect(roundIeltsBand(6.125)).toBe(6.0);
    expect(roundIeltsBand(6.24)).toBe(6.0);
  });

  it('rounds up to x.5 when fractional part is exactly 0.25 (Official IELTS Rule)', () => {
    expect(roundIeltsBand(6.25)).toBe(6.5);
    expect(roundIeltsBand(7.25)).toBe(7.5);
    expect(roundIeltsBand(5.25)).toBe(5.5);
  });

  it('rounds to x.5 when fractional part is between 0.25 and 0.75', () => {
    expect(roundIeltsBand(6.375)).toBe(6.5);
    expect(roundIeltsBand(6.5)).toBe(6.5);
    expect(roundIeltsBand(6.625)).toBe(6.5);
    expect(roundIeltsBand(6.74)).toBe(6.5);
  });

  it('rounds up to next whole band when fractional part is exactly 0.75 (Official IELTS Rule)', () => {
    expect(roundIeltsBand(6.75)).toBe(7.0);
    expect(roundIeltsBand(7.75)).toBe(8.0);
    expect(roundIeltsBand(5.75)).toBe(6.0);
  });

  it('rounds up to next whole band when fractional part is >= 0.75', () => {
    expect(roundIeltsBand(6.875)).toBe(7.0);
    expect(roundIeltsBand(7.8)).toBe(8.0);
  });

  it('clamps within 0.0 to 9.0 range', () => {
    expect(roundIeltsBand(-1.5)).toBe(0);
    expect(roundIeltsBand(9.25)).toBe(9.0);
  });
});

describe('Writing Input Validation (validateWritingText)', () => {
  it('rejects empty input', () => {
    const res = validateWritingText('', '', 40);
    expect(res.isValid).toBe(false);
    expect(res.wordCount).toBe(0);
  });

  it('rejects input with too few words', () => {
    const res = validateWritingText('The chart shows the sales of cars in three countries.', '', 40);
    expect(res.isValid).toBe(false);
    expect(res.wordCount).toBeLessThan(40);
  });

  it('rejects repeated character sequences', () => {
    const spam = 'The chart shows wwwwwwwwwwwwwwwwwwwww in the year 2020 and people were happy.';
    const res = validateWritingText(spam, '', 10);
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain('repeated character');
  });

  it('rejects keyboard mashing / consonant clusters', () => {
    const gibberish = 'The chart shows dfjklsdfjklsdfjkl and people work hard in modern society every day.';
    const res = validateWritingText(gibberish, '', 10);
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain('irregular');
  });

  it('rejects copied question prompt text', () => {
    const prompt = 'Some people believe that unpaid community service should be a compulsory part of high school programmes.';
    const res = validateWritingText(prompt, prompt, 10);
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain('copied question text');
  });

  it('accepts genuine academic composition above minimum length', () => {
    const essay = `The line graph delineates the proportion of electricity produced from renewable sources across four European nations between 2000 and 2020. Overall, it is manifest that renewable energy generation experienced an upward trajectory throughout the period. In 2000, Germany produced the largest volume of green power, with roughly twenty percent derived from solar and wind installations, whereas the United Kingdom lagged behind at only five percent.`;
    const res = validateWritingText(essay, '', 40);
    expect(res.isValid).toBe(true);
    expect(res.wordCount).toBeGreaterThanOrEqual(40);
  });
});

describe('Writing Assessment & Weighting Math (scoreWritingSection)', () => {
  it('returns not_attempted when both tasks are empty', () => {
    const res = scoreWritingSection('', '');
    expect(res.status).toBe('not_attempted');
    expect(res.band).toBeUndefined();
  });

  it('returns incomplete when one task is missing or under minimum', () => {
    const validT1 = 'The line graph delineates the proportion of electricity produced from renewable sources across four European nations between 2000 and 2020. Overall, it is manifest that renewable energy generation experienced an upward trajectory throughout the period. In 2000, Germany produced the largest volume of green power, with roughly twenty percent derived from solar and wind installations, whereas the United Kingdom lagged behind at only five percent.';
    const res = scoreWritingSection(validT1, '');
    expect(res.status).toBe('incomplete');
    expect(res.band).toBeUndefined();
    expect(res.reason).toContain('Both tasks are required');
  });

  it('applies length capping at 5.0 when Task 1 < 150w or Task 2 < 250w', () => {
    // 50-word Task 1 (under 150w) and 95-word Task 2 (under 250w)
    const shortT1 = 'The line graph delineates the proportion of electricity produced from renewable sources across four European nations between 2000 and 2020. Overall, it is manifest that renewable energy generation experienced an upward trajectory throughout the period. In 2000, Germany produced the largest volume of green power, with roughly twenty percent.';
    const shortT2 = 'Some individuals maintain that education should focus on vocational training, while others advocate for broader intellectual curricula. In my opinion, modern universities must provide comprehensive academic knowledge rather than solely professional trade skills. First, rapid technological development necessitates adaptable critical problem solving. Employees who understand fundamental principles can transition seamlessly between industries when automation alters traditional positions. Conversely, narrow technical instruction risks obsolescence when specific tools change. Therefore, tertiary institutions should cultivate intellectual agility and analytical research alongside practical workplace internships. In conclusion, academic theory prepares students far more robustly for shifting global career landscapes.';

    const res = scoreWritingSection(shortT1, shortT2);
    expect(res.status).toBe('assessed_rules');
    expect(res.task1Warning).toContain('capped at Band 5.0');
    expect(res.task2Warning).toContain('capped at Band 5.0');
    expect(res.task1Band).toBeLessThanOrEqual(5.0);
    expect(res.task2Band).toBeLessThanOrEqual(5.0);
  });

  const sample160Essay = `The line graph delineates the proportion of electricity produced from renewable sources across four European nations, namely Germany, the United Kingdom, France, and Sweden, between 2000 and 2020. Overall, it is manifest that renewable energy generation experienced an upward trajectory throughout the entire chronological timeframe in all examined countries. In 2000, Germany produced the largest initial volume of green power, accounting for roughly twenty percent of domestic supply, whereas the United Kingdom lagged substantially behind at only five percent. Over the subsequent decade, German clean energy expanded progressively, culminating at approximately thirty-five percent by 2020. In stark contrast, Sweden demonstrated the most dramatic acceleration; starting from modest baseline figures in 2005, Swedish hydroelectric and wind outputs surged to surpass all other surveyed competitors, peaking near forty percent. Meanwhile, France maintained comparatively modest renewable growth due to established reliance on nuclear infrastructure. Ultimately, European energy generation shifted decisively toward sustainable technologies over the twenty-year observation interval, highlighting rapid structural transitions across energy sectors.`;

  const sample260Essay = `In contemporary society, an increasing number of scholars debate whether governments should prioritize investment in public healthcare infrastructure rather than allocate resources toward curative medical treatments. From my perspective, preventative community health measures yield substantially greater long-term societal dividends than downstream emergency interventions.

To begin with, preventative healthcare initiatives address the root etiology of chronic lifestyle illnesses before irreversible physiological deterioration occurs. For instance, state-funded nutritional campaigns, public athletic parks, and subsidized diagnostic screenings dramatically reduce incidences of cardiovascular disease and type-two diabetes. When municipal authorities invest in clean air legislation and potable water sanitization, entire population cohorts avoid preventable communicable infections. Consequently, hospital emergency wards encounter diminished patient congestion, enabling clinical staff to administer higher standards of acute care.

Furthermore, preventative medicine generates undeniable economic efficiencies for national treasuries. Treating advanced terminal malignancies or performing repeated cardiovascular surgical procedures imposes immense fiscal strain upon national insurance budgets. In contrast, nationwide vaccination programs and routine preventative monitoring cost only a fraction of specialized surgical equipment and prolonged intensive care stays. These financial savings can subsequently be reinvested into scientific medical research, educational initiatives, and sustainable urban transport networks that further elevate living standards.

In conclusion, although emergency clinical treatments remain indispensable for acute traumatic accidents, public health spending should primarily target proactive preventative policies. By fostering health literacy, subsidizing active lifestyle habits, and detecting pathology at embryonic stages, governments build resilient and prosperous societies for generations to come. Ultimately, proactive prevention safeguards collective well-being far more sustainably than late curative interventions across all socioeconomic demographics.`;

  it('weights Task 2 twice as heavily as Task 1: (T1 + 2*T2)/3', () => {
    // Manually pass AI bands: T1 = 6.0, T2 = 7.5
    // Weighted = (6.0 + 2 * 7.5) / 3 = 21 / 3 = 7.0
    const res = scoreWritingSection(sample160Essay, sample260Essay, '', '', 6.0, 7.5, true);
    expect(res.status).toBe('assessed_ai');
    expect(res.band).toBe(7.0);
  });

  it('rounds weighted average correctly using IELTS rules (.25 and .75 cases)', () => {
    // T1 = 6.0, T2 = 7.0 -> (6.0 + 14.0)/3 = 20/3 = 6.666 -> rounds to 6.5
    const res1 = scoreWritingSection(sample160Essay, sample260Essay, '', '', 6.0, 7.0, true);
    expect(res1.band).toBe(6.5);

    // T1 = 6.5, T2 = 7.0 -> (6.5 + 14.0)/3 = 20.5/3 = 6.833 -> rounds to 7.0
    const res2 = scoreWritingSection(sample160Essay, sample260Essay, '', '', 6.5, 7.0, true);
    expect(res2.band).toBe(7.0);
  });
});

describe('Speaking Transcript Validation & Scoring (scoreSpeakingSection)', () => {
  it('returns not_attempted when transcripts are empty', () => {
    const res = scoreSpeakingSection(['', '', '']);
    expect(res.status).toBe('not_attempted');
    expect(res.band).toBeUndefined();
    expect(res.partsAttempted).toBe(0);
    expect(res.partsSkipped).toBe(3);
  });

  it('returns incomplete when Part 2 is missing or too short', () => {
    const res = scoreSpeakingSection([
      'I live in Lahore, which is the historical and cultural center of Pakistan. It has vibrant food streets and magnificent Mughal architecture.',
      '', // Part 2 skipped!
      'In my opinion, artificial intelligence will fundamentally reshape manufacturing and data analysis jobs over the coming decade.',
    ]);
    expect(res.status).toBe('incomplete');
    expect(res.band).toBeUndefined();
    expect(res.reason).toContain('Part 2 was not attempted');
  });

  it('returns incomplete when speech length is below minimums', () => {
    const res = scoreSpeakingSection([
      'I live in Lahore.', // under 20 words
      'I use a smartphone every day. It is very good.', // under 80 words
      'AI will change work.', // under 30 words
    ]);
    expect(res.status).toBe('incomplete');
    expect(res.band).toBeUndefined();
  });

  it('returns assessed when all 3 parts meet length thresholds', () => {
    const p1 = 'I come from Lahore, which is renowned as the cultural heartbeat of Pakistan. It is particularly famous for its historical monuments like the Badshahi Mosque and vibrant bustling food streets.';
    const p2 = 'I would like to speak about my laptop computer, which is an indispensable piece of technology in my daily routine. I utilize this device approximately seven to eight hours every day for academic research, drafting analytical reports, and communicating with university faculty. Without this computer, managing my coursework and collaborating on engineering presentations would be extraordinarily cumbersome. It allows me to organize complex technical datasets and develop software algorithms seamlessly. Furthermore, portable battery longevity guarantees that I can conduct intensive study sessions in libraries and seminar rooms without power anxiety.';
    const p3 = 'In my perspective, automation and artificial intelligence will revolutionize workforce dynamics across multiple sectors. While manual repetitive assembly jobs may decline, entirely new engineering specializations will emerge, requiring educational institutions to adapt their curricula.';

    const res = scoreSpeakingSection([p1, p2, p3]);
    expect(res.status).toBe('assessed_rules');
    expect(res.band).toBeDefined();
    expect(res.partsAttempted).toBe(3);
    expect(res.partsSkipped).toBe(0);
  });
});

describe('Listening & Reading Section Scoring', () => {
  it('Listening with 0 answers returns not_attempted, NOT 0.0 band', () => {
    const mockSecs = [
      {
        questionGroups: [
          {
            questions: [
              { id: 'l1', correctAnswer: 'A' },
              { id: 'l2', correctAnswer: 'B' },
            ],
          },
        ],
      },
    ];
    const res = scoreListeningSection({}, mockSecs);
    expect(res.status).toBe('not_attempted');
    expect(res.band).toBeUndefined();
    expect(res.answeredCount).toBe(0);
    expect(res.skippedCount).toBe(2);
  });

  it('Listening with at least one answer returns assessed_rules', () => {
    const mockSecs = [
      {
        questionGroups: [
          {
            questions: [
              { id: 'l1', correctAnswer: 'A' },
              { id: 'l2', correctAnswer: 'B' },
            ],
          },
        ],
      },
    ];
    // Answer l1 correctly, leave l2 skipped
    const res = scoreListeningSection({ l1: 'A' }, mockSecs);
    expect(res.status).toBe('assessed_rules');
    expect(res.band).toBeDefined();
    expect(res.raw).toBe(1);
    expect(res.answeredCount).toBe(1);
    expect(res.skippedCount).toBe(1);
  });

  it('Reading with 0 answers returns not_attempted', () => {
    const mockPassages = [
      {
        questionGroups: [
          {
            questions: [
              { id: 'r1', correctAnswer: 'true' },
              { id: 'r2', correctAnswer: 'false' },
            ],
          },
        ],
      },
    ];
    const res = scoreReadingSection({}, mockPassages, 'academic');
    expect(res.status).toBe('not_attempted');
    expect(res.band).toBeUndefined();
  });
});

describe('Overall Examination Report (computeMockExamReport)', () => {
  it('when all sections are skipped, overallBand is null, not counted toward band', () => {
    const report = computeMockExamReport('mock-01', 'Mock 1', 'academic', 'Candidate', {
      listening: { status: 'not_attempted', raw: 0, total: 40, answeredCount: 0, skippedCount: 40 },
      reading: { status: 'not_attempted', raw: 0, total: 40, answeredCount: 0, skippedCount: 40 },
      writing: { status: 'not_attempted', wordCountTask1: 0, wordCountTask2: 0 },
      speaking: { status: 'not_attempted', partsAttempted: 0, partsSkipped: 3, totalWords: 0 },
    });

    expect(report.overallBand).toBeNull();
    expect(report.allSkillsAssessed).toBe(false);
    expect(report.unassessedSkills).toEqual(['listening', 'reading', 'writing', 'speaking']);
    expect(report.strengths).toEqual([
      'No strengths identified yet. Complete all sections to see your strengths.',
    ]);
    expect(report.weaknesses[0]).toContain('Listening: Section not attempted');
  });

  it('when all 4 skills are assessed, overallBand is computed using IELTS rounding', () => {
    const report = computeMockExamReport('mock-01', 'Mock 1', 'academic', 'Candidate', {
      listening: { status: 'assessed_rules', band: 7.0, raw: 30, total: 40 },
      reading: { status: 'assessed_rules', band: 6.5, raw: 27, total: 40 },
      writing: { status: 'assessed_rules', band: 6.5, wordCountTask1: 170, wordCountTask2: 280 },
      speaking: { status: 'assessed_rules', band: 7.0, totalWords: 300 },
    });

    // Average = (7.0 + 6.5 + 6.5 + 7.0) / 4 = 27.0 / 4 = 6.75 -> rounds up to 7.0
    expect(report.allSkillsAssessed).toBe(true);
    expect(report.overallBand).toBe(7.0);
    expect(report.strengths.length).toBeGreaterThan(0);
  });
});
