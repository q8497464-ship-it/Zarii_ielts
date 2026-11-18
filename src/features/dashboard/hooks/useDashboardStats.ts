import { useState, useMemo } from 'react';
import type { TestAttempt } from '../types';

export function useDashboardStats(attempts: TestAttempt[]) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d');

  const filteredAttempts = useMemo(() => {
    if (timeRange === 'all') return attempts;
    const now = Date.now();
    const days = timeRange === '7d' ? 7 : 30;
    const cutoff = now - days * 24 * 60 * 60 * 1000;
    return attempts.filter((a) => new Date(a.completedAt).getTime() >= cutoff);
  }, [attempts, timeRange]);

  const averageBand = useMemo(() => {
    if (!filteredAttempts.length) return 0;
    const sum = filteredAttempts.reduce((acc, a) => acc + (a.bandEstimate || 0), 0);
    return Math.round((sum / filteredAttempts.length) * 10) / 10;
  }, [filteredAttempts]);

  return {
    timeRange,
    setTimeRange,
    filteredAttempts,
    averageBand,
    totalCompleted: filteredAttempts.length,
  };
}
