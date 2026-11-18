import { useState, useCallback } from 'react';
import type { ListeningTestSessionState } from '../types';

export function useListeningTest(testId: string) {
  const [session, setSession] = useState<ListeningTestSessionState>({
    testId,
    activeSectionIndex: 0,
    answers: {},
    flaggedQuestionIds: [],
    playback: {
      isPlaying: false,
      currentTime: 0,
      duration: 1800,
      playbackRate: 1,
      volume: 1,
    },
    isCompleted: false,
  });

  const setAnswer = useCallback((questionId: string, answer: string) => {
    setSession((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  }, []);

  const toggleFlag = useCallback((questionId: string) => {
    setSession((prev) => {
      const isFlagged = prev.flaggedQuestionIds.includes(questionId);
      return {
        ...prev,
        flaggedQuestionIds: isFlagged
          ? prev.flaggedQuestionIds.filter((id) => id !== questionId)
          : [...prev.flaggedQuestionIds, questionId],
      };
    });
  }, []);

  const setSectionIndex = useCallback((index: number) => {
    setSession((prev) => ({ ...prev, activeSectionIndex: index }));
  }, []);

  return {
    session,
    setAnswer,
    toggleFlag,
    setSectionIndex,
  };
}
