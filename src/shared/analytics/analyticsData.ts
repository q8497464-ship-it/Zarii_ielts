export type DateRange = '7d' | '30d' | '90d' | 'all';

export interface ModuleAttemptMetric {
  module: string;
  attempts: number;
  avgScore: number;
  avgBand: number;
  avgTimeMinutes: number;
  completionRate: number;
  color: string;
}

export interface QuestionTypeAccuracy {
  type: string;
  label: string;
  accuracyRate: number;
  totalAnswered: number;
  flaggedPoor: boolean;
}

export interface TestUsageRanking {
  testId: string;
  title: string;
  skill: 'reading' | 'listening';
  attemptsCount: number;
  completionRate: number;
  avgScore: number;
  dropOffRate: number;
}

export interface ContentQualityFlag {
  id: string;
  type: 'bad_answer_key' | 'high_dropoff' | 'feedback_complaint';
  title: string;
  testId: string;
  details: string;
  metric: string;
  severity: 'high' | 'medium';
}

export function getAnalyticsDataset(range: DateRange = '30d') {
  // Multipliers based on date range
  const multiplier = range === '7d' ? 0.35 : range === '90d' ? 2.6 : range === 'all' ? 4.2 : 1.0;

  // 1. Core KPIs
  const dau = Math.round(184 * multiplier);
  const wau = Math.round(642 * multiplier);
  const mau = Math.round(1890 * multiplier);
  const totalSignups = Math.round(312 * multiplier);

  // 2. Daily Signups & Attempts Trend
  const activityTrend = [
    { date: 'Oct 21', signups: Math.round(12 * multiplier), attempts: Math.round(45 * multiplier) },
    { date: 'Oct 25', signups: Math.round(15 * multiplier), attempts: Math.round(62 * multiplier) },
    { date: 'Oct 29', signups: Math.round(19 * multiplier), attempts: Math.round(78 * multiplier) },
    { date: 'Nov 02', signups: Math.round(14 * multiplier), attempts: Math.round(71 * multiplier) },
    { date: 'Nov 06', signups: Math.round(22 * multiplier), attempts: Math.round(88 * multiplier) },
    { date: 'Nov 10', signups: Math.round(26 * multiplier), attempts: Math.round(96 * multiplier) },
    { date: 'Nov 14', signups: Math.round(21 * multiplier), attempts: Math.round(92 * multiplier) },
    { date: 'Nov 18', signups: Math.round(29 * multiplier), attempts: Math.round(108 * multiplier) },
  ];

  // 3. Module Breakdown
  const moduleMetrics: ModuleAttemptMetric[] = [
    {
      module: 'Reading',
      attempts: Math.round(1420 * multiplier),
      avgScore: 31.4,
      avgBand: 7.2,
      avgTimeMinutes: 54,
      completionRate: 88.5,
      color: '#124F40',
    },
    {
      module: 'Listening',
      attempts: Math.round(1280 * multiplier),
      avgScore: 32.1,
      avgBand: 7.4,
      avgTimeMinutes: 33,
      completionRate: 91.2,
      color: '#5BB78D',
    },
    {
      module: 'Writing (AI Evaluated)',
      attempts: Math.round(640 * multiplier),
      avgScore: 6.6,
      avgBand: 6.6,
      avgTimeMinutes: 38,
      completionRate: 82.4,
      color: '#F59E0B',
    },
    {
      module: 'Speaking (AI Evaluated)',
      attempts: Math.round(490 * multiplier),
      avgScore: 6.8,
      avgBand: 6.8,
      avgTimeMinutes: 14,
      completionRate: 86.0,
      color: '#8B5CF6',
    },
  ];

  // 4. Question Type Accuracy Benchmark
  const questionTypeAccuracies: QuestionTypeAccuracy[] = [
    { type: 'true-false-not-given', label: 'True / False / Not Given', accuracyRate: 74.2, totalAnswered: 4820, flaggedPoor: false },
    { type: 'multiple-choice', label: 'Multiple Choice', accuracyRate: 68.5, totalAnswered: 6120, flaggedPoor: false },
    { type: 'matching-information', label: 'Matching Information', accuracyRate: 58.1, totalAnswered: 3240, flaggedPoor: false },
    { type: 'completion', label: 'Summary & Notes Completion', accuracyRate: 64.8, totalAnswered: 5890, flaggedPoor: false },
    { type: 'short-answer', label: 'Short Answer Questions', accuracyRate: 62.0, totalAnswered: 2180, flaggedPoor: false },
    { type: 'matching-headings', label: 'Matching Headings', accuracyRate: 31.4, totalAnswered: 3410, flaggedPoor: true }, // Flagged!
    { type: 'map-labelling', label: 'Diagram & Map Labelling', accuracyRate: 49.6, totalAnswered: 1820, flaggedPoor: false },
  ];

  // 5. Test Usage Rankings (Most & Least Used)
  const mostUsedTests: TestUsageRanking[] = [
    {
      testId: 'acad-reading-01',
      title: 'Cambridge Academic 19 — Reading Test 1',
      skill: 'reading',
      attemptsCount: Math.round(542 * multiplier),
      completionRate: 92.4,
      avgScore: 32.8,
      dropOffRate: 7.6,
    },
    {
      testId: 'list-test-01',
      title: 'Academic 19 — Listening Test 1 (Audio)',
      skill: 'listening',
      attemptsCount: Math.round(489 * multiplier),
      completionRate: 94.1,
      avgScore: 33.2,
      dropOffRate: 5.9,
    },
    {
      testId: 'acad-reading-02',
      title: 'Academic Reading Practice Test 2',
      skill: 'reading',
      attemptsCount: Math.round(398 * multiplier),
      completionRate: 89.0,
      avgScore: 31.2,
      dropOffRate: 11.0,
    },
  ];

  const leastUsedTests: TestUsageRanking[] = [
    {
      testId: 'general-test-06',
      title: 'General Training Reading Practice Test 6',
      skill: 'reading',
      attemptsCount: Math.round(28 * multiplier),
      completionRate: 58.2,
      avgScore: 24.5,
      dropOffRate: 41.8, // Flagged drop-off!
    },
    {
      testId: 'list-test-13',
      title: 'Listening Practice Test 13 (Sectional)',
      skill: 'listening',
      attemptsCount: Math.round(42 * multiplier),
      completionRate: 71.0,
      avgScore: 27.8,
      dropOffRate: 29.0,
    },
  ];

  // 6. Completion & Drop-off Funnel
  const funnel = [
    { stage: 'Test Started', count: 100, fill: '#124F40' },
    { stage: 'Section 2 Reached', count: 91, fill: '#176B57' },
    { stage: 'Section 3 Reached', count: 84, fill: '#2A8F76' },
    { stage: 'Full Submission', count: 87, fill: '#5BB78D' },
  ];

  // 7. AI Evaluation Telemetry
  const aiTelemetry = {
    totalCalls: Math.round(1130 * multiplier),
    successfulGradings: Math.round(1124 * multiplier),
    failedOrTimedOut: Math.round(6 * multiplier),
    successRate: 99.47,
    avgGradingTimeSeconds: 4.8,
    estimatedCostToday: '$0.84',
  };

  // 8. Content Quality Insights Flags
  const qualityFlags: ContentQualityFlag[] = [
    {
      id: 'flag-1',
      type: 'bad_answer_key',
      title: 'Abnormal Error Rate: Question #14 in Cambridge 19 Reading Test 1',
      testId: 'acad-reading-01',
      details: '82% of candidates missed Question 14 (Matching Headings). Check if Paragraph C heading key is ambiguous or inverted.',
      metric: '18% Accuracy (Expected ~65%)',
      severity: 'high',
    },
    {
      id: 'flag-2',
      type: 'high_dropoff',
      title: 'Severe Candidate Abandonment: General Training Reading Test 6',
      testId: 'general-test-06',
      details: '41.8% of candidates abandon the test during Passage 2. The stimulus text exceeds 1,400 words, causing fatigue.',
      metric: '41.8% Drop-off Rate',
      severity: 'high',
    },
    {
      id: 'flag-3',
      type: 'feedback_complaint',
      title: 'Reported Audio Stutter: Listening Test 1 (Section 3)',
      testId: 'list-test-01',
      details: '2 candidates submitted tickets reporting audio cutoff at timestamp 04:12 on iOS Safari.',
      metric: '2 User Bug Tickets',
      severity: 'medium',
    },
  ];

  return {
    kpis: { dau, wau, mau, totalSignups },
    activityTrend,
    moduleMetrics,
    questionTypeAccuracies,
    mostUsedTests,
    leastUsedTests,
    funnel,
    aiTelemetry,
    qualityFlags,
  };
}

export function exportAnalyticsCsv(dataset: ReturnType<typeof getAnalyticsDataset>): string {
  const lines: string[] = [];

  lines.push('--- ZARII IELTS AGGREGATED ANALYTICS ---');
  lines.push(`DAU,${dataset.kpis.dau}`);
  lines.push(`WAU,${dataset.kpis.wau}`);
  lines.push(`MAU,${dataset.kpis.mau}`);
  lines.push(`New Signups,${dataset.kpis.totalSignups}`);
  lines.push('');

  lines.push('Module,Attempts,Avg Score,Avg Band,Completion Rate,Avg Time (min)');
  dataset.moduleMetrics.forEach((m) => {
    lines.push(`${m.module},${m.attempts},${m.avgScore},${m.avgBand},${m.completionRate}%,${m.avgTimeMinutes}`);
  });
  lines.push('');

  lines.push('Question Type,Accuracy Rate (%),Total Answered,Flagged');
  dataset.questionTypeAccuracies.forEach((q) => {
    lines.push(`"${q.label}",${q.accuracyRate}%,${q.totalAnswered},${q.flaggedPoor ? 'YES' : 'NO'}`);
  });

  return lines.join('\n');
}
