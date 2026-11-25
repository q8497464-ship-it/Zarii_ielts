export type DateRange = '7d' | '30d' | '90d' | 'all';
export type AnalyticsTrack = 'all' | 'ielts' | 'english';

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

export interface DictionarySearchMetric {
  word: string;
  searches: number;
  pos: string;
  level: string;
  definitionSnippet: string;
}

export interface UnitDropoffMetric {
  unitId: string;
  unitTitle: string;
  level: string;
  startedCount: number;
  completedCount: number;
  completionRatePercent: number;
  dropoffRatePercent: number;
}

export function getAnalyticsDataset(range: DateRange = '30d', track: AnalyticsTrack = 'all') {
  // Multipliers based on date range
  const multiplier = range === '7d' ? 0.35 : range === '90d' ? 2.6 : range === 'all' ? 4.2 : 1.0;

  // 1. Core KPIs
  const isEnglish = track === 'english';
  const isIelts = track === 'ielts';

  const dau = isEnglish ? Math.round(98 * multiplier) : isIelts ? Math.round(112 * multiplier) : Math.round(184 * multiplier);
  const wau = isEnglish ? Math.round(340 * multiplier) : isIelts ? Math.round(410 * multiplier) : Math.round(642 * multiplier);
  const mau = isEnglish ? Math.round(920 * multiplier) : isIelts ? Math.round(1180 * multiplier) : Math.round(1890 * multiplier);
  const totalSignups = Math.round(312 * multiplier);

  // English Course Specific Metrics
  const englishLessonsCompleted = Math.round(2140 * multiplier);
  const englishAveragePassRate = 78.6;
  const englishPlacementCount = Math.round(340 * multiplier);

  // Most Searched Dictionary Words
  const mostSearchedDictionaryWords: DictionarySearchMetric[] = [
    { word: 'resilience', searches: Math.round(482 * multiplier), pos: 'noun', level: 'B2', definitionSnippet: 'Capacity to recover quickly from difficulties' },
    { word: 'eloquent', searches: Math.round(395 * multiplier), pos: 'adjective', level: 'C1', definitionSnippet: 'Fluent or persuasive in speaking or writing' },
    { word: 'meticulous', searches: Math.round(341 * multiplier), pos: 'adjective', level: 'B2', definitionSnippet: 'Showing great attention to detail; careful' },
    { word: 'serendipity', searches: Math.round(298 * multiplier), pos: 'noun', level: 'C1', definitionSnippet: 'Occurrence of events by chance in a happy way' },
    { word: 'pragmatic', searches: Math.round(274 * multiplier), pos: 'adjective', level: 'B2', definitionSnippet: 'Dealing with things sensibly and realistically' },
    { word: 'paradigm', searches: Math.round(245 * multiplier), pos: 'noun', level: 'C1', definitionSnippet: 'A typical example or pattern of something' },
    { word: 'advocate', searches: Math.round(219 * multiplier), pos: 'verb', level: 'B1', definitionSnippet: 'Publicly recommend or support' },
  ];

  // Unit Drop-off Analysis (A1 to C1)
  const unitDropoffMetrics: UnitDropoffMetric[] = [
    { unitId: 'eng-a1-u1', unitTitle: 'Unit 1: Introductions & Basics', level: 'A1', startedCount: Math.round(640 * multiplier), completedCount: Math.round(614 * multiplier), completionRatePercent: 96, dropoffRatePercent: 4 },
    { unitId: 'eng-a1-u2', unitTitle: 'Unit 2: Daily Routines & Present Simple', level: 'A1', startedCount: Math.round(590 * multiplier), completedCount: Math.round(537 * multiplier), completionRatePercent: 91, dropoffRatePercent: 9 },
    { unitId: 'eng-a1-u3', unitTitle: 'Unit 3: Places, Home & Prepositions', level: 'A1', startedCount: Math.round(510 * multiplier), completedCount: Math.round(444 * multiplier), completionRatePercent: 87, dropoffRatePercent: 13 },
    { unitId: 'eng-a1-u4', unitTitle: 'Unit 4: Family & Possessives', level: 'A1', startedCount: Math.round(430 * multiplier), completedCount: Math.round(348 * multiplier), completionRatePercent: 81, dropoffRatePercent: 19 },
    { unitId: 'eng-a2-u1', unitTitle: 'Unit 1: Past Memories & Narratives', level: 'A2', startedCount: Math.round(360 * multiplier), completedCount: Math.round(270 * multiplier), completionRatePercent: 75, dropoffRatePercent: 25 },
    { unitId: 'eng-b1-u1', unitTitle: 'Unit 1: Hopes, Dreams & Ambitions', level: 'B1', startedCount: Math.round(290 * multiplier), completedCount: Math.round(197 * multiplier), completionRatePercent: 68, dropoffRatePercent: 32 },
    { unitId: 'eng-b2-u1', unitTitle: 'Unit 1: Complex Opinion & Debate', level: 'B2', startedCount: Math.round(180 * multiplier), completedCount: Math.round(97 * multiplier), completionRatePercent: 54, dropoffRatePercent: 46 },
  ];

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
    track,
    kpis: { dau, wau, mau, totalSignups },
    englishMetrics: {
      lessonsCompleted: englishLessonsCompleted,
      averagePassRate: englishAveragePassRate,
      placementTestsTaken: englishPlacementCount,
    },
    mostSearchedDictionaryWords,
    unitDropoffMetrics,
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
