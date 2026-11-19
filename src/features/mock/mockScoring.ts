/**
 * Official IELTS Mock Exam Scoring Engine
 * 
 * Strict assessment status management, input validation, official IELTS rounding,
 * and empirical strengths/weaknesses generation.
 */

import { convertListeningRawToBand, isListeningAnswerCorrect } from '../listening/marking';
import { convertRawToBand as convertReadingBand, isAnswerCorrect as isReadingAnswerCorrect } from '../reading/marking';
import { formatBand } from '../../lib/utils';

export type AssessmentStatus =
  | 'not_attempted'
  | 'incomplete'
  | 'assessed_ai'
  | 'assessed_rules'
  | 'unavailable';

export interface SkillScoreReport {
  status: AssessmentStatus;
  band?: number;
  reason?: string;
  raw?: number;
  total?: number;
  answeredCount?: number;
  skippedCount?: number;
  // Writing specific
  task1Status?: AssessmentStatus;
  task2Status?: AssessmentStatus;
  task1Band?: number;
  task2Band?: number;
  wordCountTask1?: number;
  wordCountTask2?: number;
  task1Warning?: string;
  task2Warning?: string;
  // Speaking specific
  partsAttempted?: number;
  partsSkipped?: number;
  wordCountPart1?: number;
  wordCountPart2?: number;
  wordCountPart3?: number;
  totalWords?: number;
}

export interface MockReportData {
  mockId: string;
  mockTitle: string;
  testType: 'academic' | 'general';
  completedAt: string;
  candidateName: string;
  scores: {
    listening: SkillScoreReport;
    reading: SkillScoreReport;
    writing: SkillScoreReport;
    speaking: SkillScoreReport;
  };
  overallBand: number | null; // null if any skill is not assessed_*
  partialAverageBand: number | null; // average of completed skills only, clearly labelled
  allSkillsAssessed: boolean;
  unassessedSkills: Array<'listening' | 'reading' | 'writing' | 'speaking'>;
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
}

/**
 * Official IELTS Rounding Rules:
 * Average of component scores rounded to nearest 0.5:
 * - Fractional part < 0.25 -> rounds down to .0
 * - Fractional part >= 0.25 and < 0.75 -> rounds up to .5
 * - Fractional part >= 0.75 -> rounds up to next whole band .0
 */
export function roundIeltsBand(avg: number): number {
  if (isNaN(avg) || avg < 0) return 0;
  const clamped = Math.min(9.0, Math.max(0, avg));
  const floor = Math.floor(clamped);
  const decimal = Number((clamped - floor).toFixed(4));

  if (decimal < 0.25) {
    return floor;
  } else if (decimal < 0.75) {
    return floor + 0.5;
  } else {
    return Math.min(9.0, floor + 1.0);
  }
}

// Common recognizable English vocabulary for validation
const COMMON_ENGLISH_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not',
  'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from',
  'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would',
  'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which',
  'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
  'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
  'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is',
  'are', 'was', 'were', 'been', 'has', 'had', 'should', 'could', 'might', 'must',
  'many', 'more', 'much', 'very', 'such', 'both', 'between', 'through', 'during',
  'before', 'under', 'around', 'among', 'important', 'problem', 'increase', 'decrease',
  'government', 'education', 'society', 'technology', 'world', 'country', 'environment',
  'percent', 'percentage', 'graph', 'chart', 'table', 'diagram', 'shows', 'illustrates',
  'trend', 'figure', 'data', 'period', 'level', 'rate', 'number', 'amount', 'overall',
  'conclusion', 'opinion', 'agree', 'disagree', 'believe', 'argue', 'hand', 'result',
  'however', 'furthermore', 'therefore', 'moreover', 'although', 'despite', 'because',
  'children', 'students', 'family', 'school', 'university', 'work', 'job', 'health',
  'city', 'development', 'growth', 'change', 'future', 'present', 'past', 'information',
  'support', 'reason', 'example', 'issue', 'factor', 'impact', 'effect', 'benefit',
  'advantage', 'disadvantage', 'solution', 'measure', 'individual', 'public', 'private',
  'modern', 'traditional', 'life', 'daily', 'system', 'process', 'study', 'research'
]);

export interface TextValidationResult {
  isValid: boolean;
  wordCount: number;
  reason?: string;
}

/**
 * Validates candidate written response for meaningful English composition.
 * Minimum: Task 1 >= 40 words, Task 2 >= 80 words.
 * Rejects repeated characters, random keys, copied question text, and non-English gibberish.
 */
export function validateWritingText(
  text: string,
  promptText = '',
  minWords = 40
): TextValidationResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return { isValid: false, wordCount: 0, reason: 'No submission entered.' };
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount < minWords) {
    return {
      isValid: false,
      wordCount,
      reason: `Insufficient length: ${wordCount} words written (minimum required for assessment is ${minWords} words).`,
    };
  }

  // 1. Repeated character check (e.g. "aaaaa", "xxxxxxxx")
  if (/(.)\1{4,}/i.test(trimmed)) {
    return {
      isValid: false,
      wordCount,
      reason: 'Contains repeated character patterns.',
    };
  }

  // 2. Keyboard mashing / irregular consonants (6+ consecutive consonants without vowel)
  if (/[bcdfghjklmnpqrstvwxyz]{6,}/i.test(trimmed)) {
    return {
      isValid: false,
      wordCount,
      reason: 'Contains irregular non-word character sequences.',
    };
  }

  // 3. Vowel ratio check (natural English text has ~30% to 50% vowels)
  const lettersOnly = trimmed.toLowerCase().replace(/[^a-z]/g, '');
  if (lettersOnly.length > 25) {
    const vowels = lettersOnly.replace(/[^aeiou]/g, '').length;
    const vowelRatio = vowels / lettersOnly.length;
    if (vowelRatio < 0.15 || vowelRatio > 0.85) {
      return {
        isValid: false,
        wordCount,
        reason: 'Character distribution does not represent natural English.',
      };
    }
  }

  // 4. Copied prompt check
  if (promptText && promptText.trim().length > 30) {
    const normPrompt = promptText.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
    const normText = trimmed.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
    if (normText === normPrompt || (normText.includes(normPrompt) && normText.length < normPrompt.length * 1.25)) {
      return {
        isValid: false,
        wordCount,
        reason: 'Submission consists predominantly of copied question text.',
      };
    }
  }

  // 5. English word recognition check: >= 40% known English words or standard morphological words
  let recognizedCount = 0;
  for (const w of words) {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.length > 0 && isLikelyEnglishWord(clean)) {
      recognizedCount++;
    }
  }
  if (recognizedCount / wordCount < 0.45) {
    return {
      isValid: false,
      wordCount,
      reason: 'Less than 50% recognizable English dictionary words.',
    };
  }

  return { isValid: true, wordCount };
}

function isLikelyEnglishWord(word: string): boolean {
  if (COMMON_ENGLISH_WORDS.has(word)) return true;
  if (word.length <= 2) return true;
  // Words with common English suffixes / morphology
  if (
    /(ing|ed|tion|tions|ment|ments|able|ible|ity|ities|ly|al|ally|er|ers|or|ors|ive|ives|est|ous|ate|ated|ating|ence|ance|ances|ences|less|ful|fully|ness|ism|ist|ize|ized|ises|ise|ised)$/.test(
      word
    )
  ) {
    return true;
  }
  // Natural English words contain at least one vowel
  if (!/[aeiouy]/.test(word)) return false;
  // Reject 5+ consecutive consonants
  if (/[bcdfghjklmnpqrstvwxyz]{5,}/.test(word)) return false;
  // Accept standard words
  return true;
}

/**
 * Validates speaking transcript for meaningful speech length per part.
 */
export function validateSpeakingPart(
  transcript: string,
  part: 1 | 2 | 3
): { isValid: boolean; wordCount: number; reason?: string } {
  const trimmed = transcript.trim();
  if (!trimmed) {
    return { isValid: false, wordCount: 0, reason: `Part ${part} was not attempted.` };
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const minRequired = part === 1 ? 20 : part === 2 ? 80 : 30;

  if (wordCount < minRequired) {
    return {
      isValid: false,
      wordCount,
      reason: `Part ${part} spoken response was too short (${wordCount} words, minimum ${minRequired} required).`,
    };
  }

  return { isValid: true, wordCount };
}

/**
 * Score Listening Section
 */
export function scoreListeningSection(
  answers: Record<string, string>,
  sections: any[]
): SkillScoreReport {
  let raw = 0;
  let total = 0;
  let answeredCount = 0;

  for (const sec of sections || []) {
    const groups = sec.questionGroups || (sec.questions ? [{ questions: sec.questions }] : []);
    for (const g of groups) {
      for (const q of g.questions || []) {
        total++;
        const userAns = answers[q.id];
        if (userAns !== undefined && userAns !== null && userAns.trim() !== '') {
          answeredCount++;
          if (isListeningAnswerCorrect(userAns, q.correctAnswer)) {
            raw++;
          }
        }
      }
    }
  }

  const actualTotal = total || 40;
  const skippedCount = actualTotal - answeredCount;

  if (answeredCount === 0) {
    return {
      status: 'not_attempted',
      reason: 'No questions were answered in this section.',
      raw: 0,
      total: actualTotal,
      answeredCount: 0,
      skippedCount: actualTotal,
    };
  }

  const band = convertListeningRawToBand(raw, actualTotal);
  return {
    status: 'assessed_rules',
    band,
    raw,
    total: actualTotal,
    answeredCount,
    skippedCount,
  };
}

/**
 * Score Reading Section
 */
export function scoreReadingSection(
  answers: Record<string, string>,
  passages: any[],
  testType: 'academic' | 'general'
): SkillScoreReport {
  let raw = 0;
  let total = 0;
  let answeredCount = 0;

  for (const pas of passages || []) {
    for (const g of pas.questionGroups || []) {
      for (const q of g.questions || []) {
        total++;
        const userAns = answers[q.id];
        if (userAns !== undefined && userAns !== null && userAns.trim() !== '') {
          answeredCount++;
          if (isReadingAnswerCorrect(userAns, q.correctAnswer)) {
            raw++;
          }
        }
      }
    }
  }

  const actualTotal = total || 40;
  const skippedCount = actualTotal - answeredCount;

  if (answeredCount === 0) {
    return {
      status: 'not_attempted',
      reason: 'No questions were answered in this section.',
      raw: 0,
      total: actualTotal,
      answeredCount: 0,
      skippedCount: actualTotal,
    };
  }

  const band = convertReadingBand(raw, testType, actualTotal);
  return {
    status: 'assessed_rules',
    band,
    raw,
    total: actualTotal,
    answeredCount,
    skippedCount,
  };
}

/**
 * Score Writing Section
 * Both tasks required. Task 1 >= 40w, Task 2 >= 80w.
 * Length rule for assessed work: Task 1 < 150w or Task 2 < 250w caps Task Achievement at 5.0 with warning.
 * Writing band = (Task 1 band + 2 x Task 2 band) / 3 rounded to nearest 0.5.
 */
export function scoreWritingSection(
  task1Text: string,
  task2Text: string,
  task1Prompt = '',
  task2Prompt = '',
  aiTask1Band?: number,
  aiTask2Band?: number,
  isAiAssessed = false
): SkillScoreReport {
  const v1 = validateWritingText(task1Text, task1Prompt, 40);
  const v2 = validateWritingText(task2Text, task2Prompt, 80);

  const t1Words = v1.wordCount;
  const t2Words = v2.wordCount;

  // If neither task was attempted at all
  if (t1Words === 0 && t2Words === 0) {
    return {
      status: 'not_attempted',
      reason: 'Neither Task 1 nor Task 2 was attempted.',
      wordCountTask1: 0,
      wordCountTask2: 0,
      task1Status: 'not_attempted',
      task2Status: 'not_attempted',
    };
  }

  // If either task failed validity/length
  if (!v1.isValid || !v2.isValid) {
    const reasons: string[] = [];
    if (!v1.isValid) reasons.push(`Task 1: ${v1.reason}`);
    if (!v2.isValid) reasons.push(`Task 2: ${v2.reason}`);

    return {
      status: 'incomplete',
      reason: `Both tasks are required for assessment. ${reasons.join(' ')}`,
      wordCountTask1: t1Words,
      wordCountTask2: t2Words,
      task1Status: v1.isValid ? (isAiAssessed ? 'assessed_ai' : 'assessed_rules') : (t1Words === 0 ? 'not_attempted' : 'incomplete'),
      task2Status: v2.isValid ? (isAiAssessed ? 'assessed_ai' : 'assessed_rules') : (t2Words === 0 ? 'not_attempted' : 'incomplete'),
    };
  }

  // Both tasks are valid! Calculate Task 1 & Task 2 individual bands
  let t1Band = aiTask1Band ?? estimateTask1BandRuleBased(t1Words);
  let t2Band = aiTask2Band ?? estimateTask2BandRuleBased(t2Words);

  let task1Warning: string | undefined;
  let task2Warning: string | undefined;

  // Length capping rules: Task 1 < 150w caps TA at 5.0; Task 2 < 250w caps TR at 5.0
  if (t1Words < 150) {
    t1Band = Math.min(5.0, t1Band);
    task1Warning = `Underlength (${t1Words}/150 words): Task Achievement score capped at Band 5.0.`;
  }

  if (t2Words < 250) {
    t2Band = Math.min(5.0, t2Band);
    task2Warning = `Underlength (${t2Words}/250 words): Task Response score capped at Band 5.0.`;
  }

  // Writing band = (Task 1 + 2 * Task 2) / 3, rounded using IELTS rules
  const weighted = (t1Band + 2 * t2Band) / 3;
  const writingBand = roundIeltsBand(weighted);

  return {
    status: isAiAssessed ? 'assessed_ai' : 'assessed_rules',
    band: writingBand,
    wordCountTask1: t1Words,
    wordCountTask2: t2Words,
    task1Band: t1Band,
    task2Band: t2Band,
    task1Status: isAiAssessed ? 'assessed_ai' : 'assessed_rules',
    task2Status: isAiAssessed ? 'assessed_ai' : 'assessed_rules',
    task1Warning,
    task2Warning,
  };
}

function estimateTask1BandRuleBased(wordCount: number): number {
  if (wordCount >= 200) return 7.5;
  if (wordCount >= 170) return 7.0;
  if (wordCount >= 150) return 6.5;
  if (wordCount >= 120) return 5.5;
  return 5.0;
}

function estimateTask2BandRuleBased(wordCount: number): number {
  if (wordCount >= 350) return 7.5;
  if (wordCount >= 290) return 7.0;
  if (wordCount >= 250) return 6.5;
  if (wordCount >= 200) return 5.5;
  return 5.0;
}

/**
 * Score Speaking Section
 * Real speech required: P1 >= 20w, P2 >= 80w (P2 mandatory), P3 >= 30w.
 */
export function scoreSpeakingSection(
  transcripts: string[],
  aiBand?: number,
  isAiAssessed = false
): SkillScoreReport {
  const p1 = transcripts[0] || '';
  const p2 = transcripts[1] || '';
  const p3 = transcripts[2] || '';

  const v1 = validateSpeakingPart(p1, 1);
  const v2 = validateSpeakingPart(p2, 2);
  const v3 = validateSpeakingPart(p3, 3);

  const totalWords = v1.wordCount + v2.wordCount + v3.wordCount;
  let partsAttempted = 0;
  if (v1.wordCount > 0) partsAttempted++;
  if (v2.wordCount > 0) partsAttempted++;
  if (v3.wordCount > 0) partsAttempted++;
  const partsSkipped = 3 - partsAttempted;

  if (totalWords === 0) {
    return {
      status: 'not_attempted',
      reason: 'No speaking recordings or transcripts were provided.',
      partsAttempted: 0,
      partsSkipped: 3,
      totalWords: 0,
      wordCountPart1: 0,
      wordCountPart2: 0,
      wordCountPart3: 0,
    };
  }

  // Part 2 is mandatory and all 3 parts must have sufficient speech
  if (!v1.isValid || !v2.isValid || !v3.isValid) {
    const reasons: string[] = [];
    if (!v1.isValid) reasons.push(v1.reason!);
    if (!v2.isValid) reasons.push(v2.reason!);
    if (!v3.isValid) reasons.push(v3.reason!);

    return {
      status: 'incomplete',
      reason: `All three parts are required for an estimated Speaking band. ${reasons.join(' ')}`,
      partsAttempted,
      partsSkipped,
      totalWords,
      wordCountPart1: v1.wordCount,
      wordCountPart2: v2.wordCount,
      wordCountPart3: v3.wordCount,
    };
  }

  // All 3 parts valid!
  let band = aiBand ?? estimateSpeakingBandRuleBased(totalWords);

  return {
    status: isAiAssessed ? 'assessed_ai' : 'assessed_rules',
    band,
    partsAttempted: 3,
    partsSkipped: 0,
    totalWords,
    wordCountPart1: v1.wordCount,
    wordCountPart2: v2.wordCount,
    wordCountPart3: v3.wordCount,
  };
}

function estimateSpeakingBandRuleBased(totalWords: number): number {
  if (totalWords >= 350) return 7.5;
  if (totalWords >= 260) return 7.0;
  if (totalWords >= 180) return 6.5;
  return 6.0;
}

/**
 * Compute Overall Examination Report
 */
export function computeMockExamReport(
  mockIdOrConfig:
    | string
    | {
        mockId: string;
        mockTitle: string;
        testType: 'academic' | 'general';
        candidateName: string;
        listening: SkillScoreReport;
        reading: SkillScoreReport;
        writing: SkillScoreReport;
        speaking: SkillScoreReport;
      },
  mockTitle?: string,
  testType?: 'academic' | 'general',
  candidateName?: string,
  scoresArg?: {
    listening: SkillScoreReport;
    reading: SkillScoreReport;
    writing: SkillScoreReport;
    speaking: SkillScoreReport;
  }
): MockReportData {
  let mockId: string;
  let title: string;
  let tType: 'academic' | 'general';
  let cName: string;
  let scores: {
    listening: SkillScoreReport;
    reading: SkillScoreReport;
    writing: SkillScoreReport;
    speaking: SkillScoreReport;
  };

  if (typeof mockIdOrConfig === 'object') {
    mockId = mockIdOrConfig.mockId;
    title = mockIdOrConfig.mockTitle;
    tType = mockIdOrConfig.testType;
    cName = mockIdOrConfig.candidateName;
    scores = {
      listening: mockIdOrConfig.listening,
      reading: mockIdOrConfig.reading,
      writing: mockIdOrConfig.writing,
      speaking: mockIdOrConfig.speaking,
    };
  } else {
    mockId = mockIdOrConfig;
    title = mockTitle || '';
    tType = testType || 'academic';
    cName = candidateName || 'IELTS Candidate';
    scores = scoresArg!;
  }

  const isAssessed = (status: AssessmentStatus) => status === 'assessed_ai' || status === 'assessed_rules';

  const assessedSkills: number[] = [];
  const unassessedSkills: Array<'listening' | 'reading' | 'writing' | 'speaking'> = [];

  if (isAssessed(scores.listening.status) && scores.listening.band !== undefined) {
    assessedSkills.push(scores.listening.band);
  } else {
    unassessedSkills.push('listening');
  }

  if (isAssessed(scores.reading.status) && scores.reading.band !== undefined) {
    assessedSkills.push(scores.reading.band);
  } else {
    unassessedSkills.push('reading');
  }

  if (isAssessed(scores.writing.status) && scores.writing.band !== undefined) {
    assessedSkills.push(scores.writing.band);
  } else {
    unassessedSkills.push('writing');
  }

  if (isAssessed(scores.speaking.status) && scores.speaking.band !== undefined) {
    assessedSkills.push(scores.speaking.band);
  } else {
    unassessedSkills.push('speaking');
  }

  const allSkillsAssessed = unassessedSkills.length === 0;

  let overallBand: number | null = null;
  let partialAverageBand: number | null = null;

  if (allSkillsAssessed) {
    const sum = assessedSkills.reduce((a, b) => a + b, 0);
    overallBand = roundIeltsBand(sum / 4);
  } else if (assessedSkills.length > 0) {
    const sum = assessedSkills.reduce((a, b) => a + b, 0);
    partialAverageBand = roundIeltsBand(sum / assessedSkills.length);
  }

  // Generate honest strengths & weaknesses
  const strengths = generateHonestStrengths(scores);
  const weaknesses = generateHonestWeaknesses(scores, unassessedSkills);
  const nextSteps = generateHonestNextSteps(scores, unassessedSkills);

  return {
    mockId,
    mockTitle: title,
    testType: tType,
    completedAt: new Date().toISOString(),
    candidateName: cName,
    scores,
    overallBand,
    partialAverageBand,
    allSkillsAssessed,
    unassessedSkills,
    strengths,
    weaknesses,
    nextSteps,
  };
}

/**
 * Generate empirical strengths: ONLY from real performance data.
 */
export function generateHonestStrengths(scores: {
  listening: SkillScoreReport;
  reading: SkillScoreReport;
  writing: SkillScoreReport;
  speaking: SkillScoreReport;
}): string[] {
  const strengths: string[] = [];

  if (scores.listening.status === 'assessed_rules' && (scores.listening.band ?? 0) >= 7.0) {
    strengths.push(`Listening: High auditory comprehension with ${scores.listening.raw}/${scores.listening.total} correct responses.`);
  }

  if (scores.reading.status === 'assessed_rules' && (scores.reading.band ?? 0) >= 7.0) {
    strengths.push(`Reading: Strong analytical skimming and academic text comprehension (${scores.reading.raw}/${scores.reading.total} raw).`);
  }

  if ((scores.writing.status === 'assessed_ai' || scores.writing.status === 'assessed_rules') && (scores.writing.band ?? 0) >= 7.0) {
    strengths.push(`Writing: Thorough development and balanced task completion (${scores.writing.wordCountTask1}w Task 1, ${scores.writing.wordCountTask2}w Task 2).`);
  }

  if ((scores.speaking.status === 'assessed_ai' || scores.speaking.status === 'assessed_rules') && (scores.speaking.band ?? 0) >= 7.0) {
    strengths.push(`Speaking: Sustained long-turn fluency and natural spoken elaboration (${scores.speaking.totalWords} words total).`);
  }

  if (strengths.length === 0) {
    return ['No strengths identified yet. Complete all sections to see your strengths.'];
  }

  return strengths;
}

/**
 * Generate empirical weaknesses and focus areas
 */
export function generateHonestWeaknesses(
  scores: {
    listening: SkillScoreReport;
    reading: SkillScoreReport;
    writing: SkillScoreReport;
    speaking: SkillScoreReport;
  },
  unassessedSkills: Array<'listening' | 'reading' | 'writing' | 'speaking'>
): string[] {
  const weaknesses: string[] = [];

  // 1. Unattempted or incomplete sections
  for (const skill of unassessedSkills) {
    const capSkill = skill.charAt(0).toUpperCase() + skill.slice(1);
    const score = scores[skill];
    if (score.status === 'not_attempted') {
      weaknesses.push(`${capSkill}: Section not attempted. Complete this module to receive an official diagnostic band.`);
    } else if (score.status === 'incomplete') {
      weaknesses.push(`${capSkill}: Incomplete attempt. ${score.reason || 'Complete all parts to receive a band.'}`);
    } else {
      weaknesses.push(`${capSkill}: ${score.reason || 'Evaluation unavailable.'}`);
    }
  }

  // 2. Specific performance weaknesses only for assessed skills
  if (scores.listening.status === 'assessed_rules' && (scores.listening.band ?? 0) < 7.0) {
    weaknesses.push(`Listening: Review distractor filtering and spelling accuracy (${scores.listening.skippedCount || 0} skipped or incorrect).`);
  }

  if (scores.reading.status === 'assessed_rules' && (scores.reading.band ?? 0) < 7.0) {
    weaknesses.push(`Reading: Strengthen heading matching and True/False/Not Given verification under timed conditions.`);
  }

  if ((scores.writing.status === 'assessed_ai' || scores.writing.status === 'assessed_rules') && (scores.writing.band ?? 0) < 7.0) {
    const warnings = [scores.writing.task1Warning, scores.writing.task2Warning].filter(Boolean);
    if (warnings.length > 0) {
      weaknesses.push(`Writing: ${warnings.join(' ')}`);
    } else {
      weaknesses.push(`Writing: Expand advanced grammatical variety and cohesion markers.`);
    }
  }

  if ((scores.speaking.status === 'assessed_ai' || scores.speaking.status === 'assessed_rules') && (scores.speaking.band ?? 0) < 7.0) {
    weaknesses.push(`Speaking: Expand discourse markers and continuous speech duration in Part 2.`);
  }

  return weaknesses;
}

/**
 * Generate actionable next steps
 */
export function generateHonestNextSteps(
  scores: {
    listening: SkillScoreReport;
    reading: SkillScoreReport;
    writing: SkillScoreReport;
    speaking: SkillScoreReport;
  },
  unassessedSkills: Array<'listening' | 'reading' | 'writing' | 'speaking'>
): string[] {
  const steps: string[] = [];

  if (unassessedSkills.length > 0) {
    const names = unassessedSkills.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
    steps.push(`Complete missing sections (${names}) to unlock your official Overall Band score.`);
  }

  if (scores.listening.status === 'assessed_rules') {
    steps.push('Review audio transcripts for missed listening items in the mistake notebook.');
  }

  if (scores.reading.status === 'assessed_rules') {
    steps.push('Practice targeted timed skimming and vocabulary mapping on Passage 3 questions.');
  }

  if (scores.writing.status === 'assessed_ai' || scores.writing.status === 'assessed_rules') {
    steps.push('Study Band 8.0 model essays in the Phrase Bank to master complex paragraph transitions.');
  }

  if (scores.speaking.status === 'assessed_ai' || scores.speaking.status === 'assessed_rules') {
    steps.push('Record 2-minute uninterrupted speech drills using Part 2 cue cards.');
  }

  if (steps.length === 0) {
    steps.push('Take a full 4-skill mock test to establish your comprehensive benchmark.');
  }

  return steps.slice(0, 3);
}
