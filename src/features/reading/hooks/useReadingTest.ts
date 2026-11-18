import { useState, useEffect, useCallback } from 'react';
import type { ReadingTestSessionState } from '../types';

export function useReadingTest(testId: string, durationMinutes: number = 60) {
  const [session, setSession] = useState<ReadingTestSessionState>({
    testId,
    activePassageIndex: 0,
    answers: {},
    flaggedQuestionIds: [],
    timeRemainingSeconds: durationMinutes * 60,
    isCompleted: false,
    isPaused: false,
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

  const setPassageIndex = useCallback((index: number) => {
    setSession((prev) => ({ ...prev, activePassageIndex: index }));
  }, []);

  const togglePause = useCallback(() => {
    setSession((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  useEffect(() => {
    if (session.isCompleted || session.isPaused || session.timeRemainingSeconds <= 0) return;
    const timer = setInterval(() => {
      setSession((prev) => {
        if (prev.timeRemainingSeconds <= 1) {
          clearInterval(timer);
          return { ...prev, timeRemainingSeconds: 0, isCompleted: true };
        }
        return { ...prev, timeRemainingSeconds: prev.timeRemainingSeconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [session.isCompleted, session.isPaused, session.timeRemainingSeconds]);

  return {
    session,
    setAnswer,
    toggleFlag,
    setPassageIndex,
    togglePause,
  };
}
