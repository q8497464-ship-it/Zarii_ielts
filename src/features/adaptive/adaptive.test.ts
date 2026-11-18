import { describe, it, expect } from 'vitest';
import {
  calculateAdaptiveMetrics,
  extractMistakesFromResponses,
  evaluateMistakeRetry,
  CORE_QUESTION_TYPES,
} from './adaptiveTracker';
import {
  QUESTION_STRATEGY_LESSONS,
  getLessonByQuestionType,
} from './questionLessonsData';
import {
  generateStudyPlan,
  recalculateWeeklyPlan,
  identifyWeaknessesFromResponses,
} from '../plan/planGenerator';
import type { QuestionResponse, MistakeItem, StudyPlanDay } from '../../types';

describe('Adaptive Learning Engine & Tracker', () => {
  it('tracks performance per question type, topic and difficulty correctly', () => {
    const responses: QuestionResponse[] = [
      {
        attemptId: 101,
        module: 'reading',
        questionId: 'q-1',
        questionType: 'true_false_not_given',
        topic: 'environment',
        difficulty: 'standard',
        userAnswer: 'TRUE',
        correctAnswer: 'TRUE',
        isCorrect: true,
        timeSpentSeconds: 65,
      },
      {
        attemptId: 101,
        module: 'reading',
        questionId: 'q-2',
        questionType: 'true_false_not_given',
        topic: 'environment',
        difficulty: 'standard',
        userAnswer: 'FALSE',
        correctAnswer: 'NOT GIVEN',
        isCorrect: false,
        timeSpentSeconds: 95,
      },
      {
        attemptId: 101,
        module: 'reading',
        questionId: 'q-3',
        questionType: 'matching_headings',
        topic: 'technology',
        difficulty: 'standard',
        userAnswer: 'ii',
        correctAnswer: 'iv',
        isCorrect: false,
        timeSpentSeconds: 110,
      },
    ];

    const perf = calculateAdaptiveMetrics(responses, 7.0);

    // TFNG has 1 correct, 1 incorrect = 50%
    expect(perf.byType['true_false_not_given'].totalAttempts).toBe(2);
    expect(perf.byType['true_false_not_given'].correctAttempts).toBe(1);
    expect(perf.byType['true_false_not_given'].accuracy).toBe(50);

    // Matching Headings has 0/1 = 0%
    expect(perf.byType['matching_headings'].totalAttempts).toBe(1);
    expect(perf.byType['matching_headings'].accuracy).toBe(0);

    // Topics tracked
    expect(perf.byTopic['environment'].totalAttempts).toBe(2);
    expect(perf.byTopic['environment'].accuracy).toBe(50);
    expect(perf.byTopic['technology'].totalAttempts).toBe(1);
    expect(perf.byTopic['technology'].accuracy).toBe(0);

    // Weakest types should rank Matching Headings and TFNG at the top
    expect(perf.weakestTypes).toContain('matching_headings');
    expect(perf.weakestTypes).toContain('true_false_not_given');
  });

  it('increases adaptive difficulty after 3 consecutive good results', () => {
    // Target band 5.5 starts at easy difficulty
    const responses: QuestionResponse[] = [
      {
        attemptId: 1,
        module: 'reading',
        questionId: 'q-h1',
        questionType: 'matching_headings',
        userAnswer: 'i',
        correctAnswer: 'i',
        isCorrect: true,
        answeredAt: '2026-11-10T10:00:00Z',
      },
      {
        attemptId: 1,
        module: 'reading',
        questionId: 'q-h2',
        questionType: 'matching_headings',
        userAnswer: 'ii',
        correctAnswer: 'ii',
        isCorrect: true,
        answeredAt: '2026-11-10T10:01:00Z',
      },
      {
        attemptId: 1,
        module: 'reading',
        questionId: 'q-h3',
        questionType: 'matching_headings',
        userAnswer: 'iii',
        correctAnswer: 'iii',
        isCorrect: true,
        answeredAt: '2026-11-10T10:02:00Z',
      },
    ];

    const updatedPerf = calculateAdaptiveMetrics(responses, 5.5);
    // After 3 consecutive good results, difficulty levels up from easy to standard
    expect(updatedPerf.byType['matching_headings'].adaptiveDifficulty).toBe('standard');
    expect(updatedPerf.byType['matching_headings'].recentStreak).toBe(3);
  });

  it('decreases adaptive difficulty after poor results', () => {
    // Target band 6.5 starts at standard difficulty
    const responses: QuestionResponse[] = [
      {
        attemptId: 2,
        module: 'reading',
        questionId: 'q-s1',
        questionType: 'sentence_completion',
        userAnswer: 'wrong1',
        correctAnswer: 'right1',
        isCorrect: false,
        answeredAt: '2026-11-10T11:00:00Z',
      },
      {
        attemptId: 2,
        module: 'reading',
        questionId: 'q-s2',
        questionType: 'sentence_completion',
        userAnswer: 'wrong2',
        correctAnswer: 'right2',
        isCorrect: false,
        answeredAt: '2026-11-10T11:01:00Z',
      },
    ];

    const updatedPerf = calculateAdaptiveMetrics(responses, 6.5);
    // After poor results (consecutive errors), difficulty eases from standard to easy
    expect(updatedPerf.byType['sentence_completion'].adaptiveDifficulty).toBe('easy');
    expect(updatedPerf.byType['sentence_completion'].recentStreak).toBe(-2);
  });
});

describe('Mistake Notebook & Error Retry Engine', () => {
  it('automatically extracts and logs incorrect responses into the Mistake Notebook', () => {
    const responses: QuestionResponse[] = [
      {
        attemptId: 201,
        module: 'reading',
        questionId: 'test-q-10',
        questionType: 'true_false_not_given',
        questionPrompt: 'Global warming has ceased since 2015.',
        passageOrSectionTitle: 'Climate Dynamics Passage',
        userAnswer: 'TRUE',
        correctAnswer: 'FALSE',
        isCorrect: false,
        explanation: 'The passage explicitly notes that warming trends accelerated post-2015.',
      },
      {
        attemptId: 201,
        module: 'reading',
        questionId: 'test-q-11',
        questionType: 'true_false_not_given',
        questionPrompt: 'Glaciers in Greenland are retreating.',
        passageOrSectionTitle: 'Climate Dynamics Passage',
        userAnswer: 'TRUE',
        correctAnswer: 'TRUE',
        isCorrect: true,
      },
    ];

    const mistakes = extractMistakesFromResponses(responses);
    expect(mistakes.length).toBe(1);
    expect(mistakes[0].questionId).toBe('test-q-10');
    expect(mistakes[0].userAnswer).toBe('TRUE');
    expect(mistakes[0].correctAnswer).toBe('FALSE');
    expect(mistakes[0].isMastered).toBe(false);
  });

  it('allows retrying mistakes and marks them mastered when answered correctly', () => {
    const mistake: MistakeItem = {
      id: 1,
      questionId: 'list-m-1',
      module: 'listening',
      questionType: 'short_answer',
      questionPrompt: 'What time does the library open on weekends?',
      passageOrContextTitle: 'Library Tour Section 1',
      userAnswer: '9:00 AM',
      correctAnswer: '10:00 AM',
      explanation: 'Speaker states weekend opening is 10:00 AM.',
      isMastered: false,
      retryCount: 0,
      createdAt: '2026-11-10T09:00:00Z',
    };

    // First try: still wrong
    const attempt1 = evaluateMistakeRetry(mistake, '8:30 AM');
    expect(attempt1.isCorrect).toBe(false);
    expect(attempt1.updatedMistake.isMastered).toBe(false);
    expect(attempt1.updatedMistake.retryCount).toBe(1);

    // Second try: correct
    const attempt2 = evaluateMistakeRetry(attempt1.updatedMistake, '10:00 AM');
    expect(attempt2.isCorrect).toBe(true);
    expect(attempt2.updatedMistake.isMastered).toBe(true);
    expect(attempt2.updatedMistake.retryCount).toBe(2);
  });
});

describe('Question-Type Mini-Lessons Content', () => {
  it('covers core IELTS question types with strategy, traps, and 3 practice questions', () => {
    expect(QUESTION_STRATEGY_LESSONS.length).toBeGreaterThanOrEqual(5);

    for (const lesson of QUESTION_STRATEGY_LESSONS) {
      expect(lesson.id).toBeTruthy();
      expect(lesson.questionType).toBeTruthy();
      expect(lesson.title).toBeTruthy();
      expect(lesson.overview.length).toBeGreaterThan(30);
      expect(lesson.keyRules.length).toBeGreaterThanOrEqual(3);
      expect(lesson.commonTraps.length).toBeGreaterThanOrEqual(2);
      expect(lesson.stepByStepStrategy.length).toBeGreaterThanOrEqual(3);
      expect(lesson.practicePassage.length).toBeGreaterThan(50);
      expect(lesson.practiceQuestions.length).toBe(3);

      lesson.practiceQuestions.forEach((q) => {
        expect(q.id).toBeTruthy();
        expect(q.prompt).toBeTruthy();
        expect(q.correctAnswer).toBeDefined();
        expect(q.explanation.length).toBeGreaterThan(15);
      });
    }
  });

  it('retrieves lesson by question type correctly', () => {
    const tfng = getLessonByQuestionType('true_false_not_given');
    expect(tfng).toBeDefined();
    expect(tfng?.title).toContain('True / False / Not Given');

    const headings = getLessonByQuestionType('matching_headings');
    expect(headings).toBeDefined();
    expect(headings?.title).toContain('Matching Headings');
  });
});

describe('Automatic Weekly Study Plan Rebalancing', () => {
  it('identifies weak question types from actual responses and re-balances plan curriculum', () => {
    // Generate initial plan
    const initialPlan: StudyPlanDay[] = generateStudyPlan(7.0, undefined, 60);

    // Record responses showing low accuracy (< 50%) in matching_headings
    const responses: QuestionResponse[] = [
      {
        attemptId: 301,
        module: 'reading',
        questionId: 'qh-1',
        questionType: 'matching_headings',
        userAnswer: 'wrongA',
        correctAnswer: 'rightA',
        isCorrect: false,
      },
      {
        attemptId: 301,
        module: 'reading',
        questionId: 'qh-2',
        questionType: 'matching_headings',
        userAnswer: 'wrongB',
        correctAnswer: 'rightB',
        isCorrect: false,
      },
      {
        attemptId: 301,
        module: 'reading',
        questionId: 'qh-3',
        questionType: 'matching_headings',
        userAnswer: 'rightC',
        correctAnswer: 'rightC',
        isCorrect: true,
      },
    ];

    const { computedWeaknesses, changesSummary } = identifyWeaknessesFromResponses(responses);

    expect(computedWeaknesses.length).toBe(1);
    expect(computedWeaknesses[0].questionType).toBe('matching_headings');
    expect(computedWeaknesses[0].accuracy).toBe(33); // 1 / 3 = 33%
    expect(changesSummary.some((s) => s.includes('MATCHING HEADINGS'))).toBe(true);

    const rebalancedPlan = recalculateWeeklyPlan(
      initialPlan,
      7.0,
      undefined,
      60,
      computedWeaknesses
    );

    expect(rebalancedPlan.length).toBeGreaterThan(0);
    // Verifies that matching_headings was injected into the reading tasks
    const readingDay = rebalancedPlan.find((d) => d.module === 'reading' && !d.isRestDay);
    expect(readingDay).toBeDefined();
    expect(readingDay?.taskTitle.toLowerCase()).toContain('matching headings');
  });
});
