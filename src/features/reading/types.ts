import type { ReadingTestContent, BaseQuestion, QuestionType, TestType, TestAttempt } from '../../types';
import type { FlattenedQuestion } from './readingContent';

export type { ReadingTestContent, BaseQuestion, QuestionType, TestType, TestAttempt, FlattenedQuestion };

export interface ReadingPassage {
  passageNumber: number;
  title: string;
  text: string;
  groupInstruction?: string;
}

export interface ReadingUserAnswer {
  questionId: string;
  userAnswer: string;
  isFlagged?: boolean;
}

export interface ReadingTestSessionState {
  testId: string;
  activePassageIndex: number;
  answers: Record<string, string>;
  flaggedQuestionIds: string[];
  timeRemainingSeconds: number;
  isCompleted: boolean;
  isPaused: boolean;
}

export interface ReadingMarkResult {
  score: number;
  totalQuestions: number;
  bandEstimate: number;
  results: Array<{
    questionId: string;
    questionNumber: number;
    userAnswer: string;
    correctAnswer: string | string[];
    isCorrect: boolean;
    explanation?: string;
  }>;
}
