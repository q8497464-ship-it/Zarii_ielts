import type { VocabWordContent, VocabProgress } from '../../types';
import type { SM2Rating } from './sm2';

export type { VocabWordContent, VocabProgress, SM2Rating };

export interface FlashcardItem extends VocabWordContent {
  intervalDays?: number;
  repetition?: number;
  easeFactor?: number;
  nextReviewDate?: string;
  isMastered?: boolean;
}

export interface GrammarLesson {
  id: string;
  title: string;
  category: string;
  bandLevel: string;
  content: string;
  exercises: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }>;
}
