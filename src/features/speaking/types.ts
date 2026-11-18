import type { SpeakingCardContent, SpeakingSession } from '../../types';

export type { SpeakingCardContent, SpeakingSession };

export interface SpeakingCriterionFeedback {
  score: number;
  comments: string;
  strengths: string[];
  improvements: string[];
}

export interface SpeakingEvaluationResult {
  overallBand: number;
  fluencyAndCoherence: SpeakingCriterionFeedback;
  lexicalResource: SpeakingCriterionFeedback;
  grammaticalRange: SpeakingCriterionFeedback;
  pronunciation: SpeakingCriterionFeedback;
  metrics: {
    wordsPerMinute: number;
    pauseCount: number;
    fillerWordCount: number;
    totalDurationSeconds: number;
    transcriptionText: string;
  };
}

export interface SpeakingPartState {
  partNumber: 1 | 2 | 3;
  questionIndex: number;
  isRecording: boolean;
  preparationTimeLeft: number;
  speakingTimeLeft: number;
}
