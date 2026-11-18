import type { ListeningTestContent, BaseQuestion, QuestionType, TestAttempt } from '../../types';

export type { ListeningTestContent, BaseQuestion, QuestionType, TestAttempt };

export interface ListeningSection {
  sectionNumber: number;
  title: string;
  audioUrl?: string;
  introDurationSeconds?: number;
  questions: BaseQuestion[];
}

export interface AudioPlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
}

export interface ListeningTestSessionState {
  testId: string;
  activeSectionIndex: number;
  answers: Record<string, string>;
  flaggedQuestionIds: string[];
  playback: AudioPlaybackState;
  isCompleted: boolean;
}

export interface ListeningMarkResult {
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
