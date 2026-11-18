import { useState, useCallback } from 'react';
import type { StudyPlanDay } from '../types';

export function useStudyPlanSession(initialDays: StudyPlanDay[]) {
  const [days, setDays] = useState<StudyPlanDay[]>(initialDays);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const toggleTask = useCallback((dayIndex: number) => {
    setDays((prev) =>
      prev.map((d, idx) => (idx === dayIndex ? { ...d, completed: !d.completed } : d))
    );
  }, []);

  return {
    days,
    selectedDayIndex,
    setSelectedDayIndex,
    toggleTask,
  };
}
