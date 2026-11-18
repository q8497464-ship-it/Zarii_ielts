import { useState, useCallback } from 'react';
import type { MockExamSession } from '../types';

export function useMockExam(initialExam: MockExamSession) {
  const [session, setSession] = useState<MockExamSession>(initialExam);

  const nextSection = useCallback(() => {
    setSession((prev) => {
      const nextIndex = prev.currentSectionIndex + 1;
      const isFinished = nextIndex >= prev.sections.length;
      return {
        ...prev,
        currentSectionIndex: nextIndex,
        isFinished,
      };
    });
  }, []);

  return {
    session,
    nextSection,
  };
}
