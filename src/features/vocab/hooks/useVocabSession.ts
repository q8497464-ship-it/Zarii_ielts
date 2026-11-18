import { useState, useCallback } from 'react';
import type { FlashcardItem } from '../types';

export function useVocabSession(words: FlashcardItem[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedWordIds, setCompletedWordIds] = useState<string[]>([]);

  const currentWord = words[currentIndex] || null;

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const nextWord = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.min(prev + 1, words.length - 1));
  }, [words.length]);

  const markComplete = useCallback((id: string) => {
    setCompletedWordIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  return {
    currentIndex,
    currentWord,
    isFlipped,
    flipCard,
    nextWord,
    markComplete,
    isFinished: currentIndex >= words.length - 1 && words.length > 0,
  };
}
