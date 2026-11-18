import type { WritingPromptContent, WritingSubmission } from '../../types';

export type TaskType = 'task1_academic' | 'task1_general' | 'task2';
export type { WritingPromptContent, WritingSubmission };

export interface WritingCriterionFeedback {
  score: number;
  comments: string;
  strengths: string[];
  improvements: string[];
}

export interface WritingEvaluationResult {
  overallBand: number;
  taskAchievement: WritingCriterionFeedback;
  coherenceAndCohesion: WritingCriterionFeedback;
  lexicalResource: WritingCriterionFeedback;
  grammaticalRangeAndAccuracy: WritingCriterionFeedback;
  detailedAnalysis: {
    wordCount: number;
    sentenceCount: number;
    paragraphCount: number;
    avgSentenceLength: number;
    academicWordCount: number;
    passiveVoiceRatio: number;
  };
  highlightedSentences?: Array<{
    text: string;
    type: 'good' | 'warning' | 'error';
    feedback: string;
  }>;
}

export interface WritingEditorSession {
  promptId: string;
  taskType: TaskType;
  content: string;
  wordCount: number;
  timeRemainingSeconds: number;
  isSubmitting: boolean;
}
