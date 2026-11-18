// Core Types for Zarii IELTS App

export type TestType = 'academic' | 'general';

export type IELTSModule = 'listening' | 'reading' | 'writing' | 'speaking';

export type BandScore = 5.0 | 5.5 | 6.0 | 6.5 | 7.0 | 7.5 | 8.0 | 8.5 | 9.0;

export type EnglishProficiencyLevel = 'beginner' | 'intermediate' | 'upper_intermediate' | 'advanced';

export interface UserProfile {
  id?: number;
  testType: TestType;
  targetBand: number;
  examDate: string; // ISO string or YYYY-MM-DD, empty if not booked
  isExamBooked: boolean;
  dailyStudyMinutes: number;
  dailyStudyTimeMinutes?: number;
  currentLevel: EnglishProficiencyLevel;
  displayName: string;
  onboardingCompleted: boolean;
  diagnosticCompleted?: boolean;
  diagnosticBand?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  id?: number;
  theme: 'light' | 'dark' | 'system' | 'high-contrast';
  textSize: 'normal' | 'medium' | 'large';
  fontFamily?: 'inter' | 'dyslexic' | 'serif';
  lineSpacing?: 'normal' | 'relaxed' | 'loose';
  geminiApiKey?: string;
  groqApiKey?: string;
  preferredAiProvider?: 'gemini' | 'groq' | 'none';
  soundEnabled: boolean;
  hapticEnabled: boolean;
  urduHintsEnabled?: boolean;
  showTimer?: boolean;
  timerWarningEnabled?: boolean;
  notificationsEnabled?: boolean;
  notificationTime?: string;
  dailyReminderEnabled?: boolean;
  dailyReminderTime?: string;
  gamificationEnabled?: boolean; // toggle all streaks, XP, badges, celebrations off
  weeklyGoalDays?: number; // target active days per week (default 5)
  productTourCompleted?: boolean;
  updatedAt: string;
}

export type LevelName = 'Beginner' | 'Explorer' | 'Achiever' | 'Expert' | 'Master';

export interface LevelInfo {
  level: number;
  name: LevelName;
  currentXp: number;
  minXp: number;
  maxXp: number;
  progressPercent: number;
  xpToNextLevel: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  freezeAvailable: boolean;
  freezeLastUsedWeek?: string; // e.g. "2026-W47"
  freezeUsedDates: string[];
  activeDates: string[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'bands' | 'habits' | 'volume' | 'vocab' | 'milestones';
  iconName: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: { current: number; target: number };
}

export interface WeeklyChallengeTask {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  module: 'reading' | 'listening' | 'writing' | 'speaking' | 'vocab';
  linkPath: string;
}

export interface WeeklyChallenge {
  weekId: string;
  tasks: WeeklyChallengeTask[];
  completedCount: number;
  totalCount: number;
  isAllCompleted: boolean;
  rewardClaimed: boolean;
}

export interface TestAttempt {
  id?: number;
  testId: string;
  testType: TestType;
  module: IELTSModule;
  title: string;
  score: number; // Raw score e.g. 32/40
  totalQuestions: number;
  bandEstimate: number; // e.g. 7.5
  timeSpentSeconds: number;
  startedAt: string;
  completedAt: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  notes?: string;
}

export interface QuestionResponse {
  id?: number;
  attemptId: number;
  module: IELTSModule;
  questionId: string;
  userAnswer: string;
  correctAnswer: string | string[];
  isCorrect: boolean;
  explanation?: string;
  questionType?: string;
  topic?: string;
  difficulty?: 'easy' | 'standard' | 'challenging';
  timeSpentSeconds?: number;
  questionPrompt?: string;
  passageOrSectionTitle?: string;
  options?: string[];
  contextText?: string;
  answeredAt?: string;
}

export interface MistakeItem {
  id?: number;
  questionId: string;
  module: IELTSModule;
  questionType: string;
  topic?: string;
  difficulty?: 'easy' | 'standard' | 'challenging';
  questionPrompt: string;
  passageOrContextTitle: string;
  passageOrAudioExcerpt?: string;
  options?: string[];
  userAnswer: string;
  correctAnswer: string | string[];
  explanation: string;
  isMastered: boolean;
  retryCount: number;
  notes?: string;
  createdAt: string;
  lastReviewedAt?: string;
}

export interface QuestionTypePerformance {
  questionType: string;
  label: string;
  module: IELTSModule;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number; // 0 - 100
  recentStreak: number; // positive = consecutive correct, negative = consecutive wrong
  adaptiveDifficulty: 'easy' | 'standard' | 'challenging';
  consecutiveGoodResults: number;
  consecutivePoorResults: number;
  averageTimeSeconds: number;
}

export interface TopicPerformance {
  topic: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
}

export interface DifficultyPerformance {
  difficulty: 'easy' | 'standard' | 'challenging';
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
}

export interface QuestionStrategyLesson {
  id: string;
  questionType: string;
  title: string;
  module: 'reading' | 'listening';
  estimatedMinutes: number;
  overview: string;
  keyRules: string[];
  commonTraps: Array<{ trap: string; howToAvoid: string; exampleSnippet?: string }>;
  stepByStepStrategy: string[];
  practicePassage: string;
  practiceQuestions: Array<{
    id: string;
    questionNumber: number;
    prompt: string;
    options?: string[];
    correctAnswer: string | string[];
    explanation: string;
  }>;
}

export interface WritingErrorItem {
  originalText: string;
  correction: string;
  rule: string;
  type: 'grammar' | 'spelling' | 'vocabulary' | 'punctuation';
}

export interface WritingVocabUpgrade {
  original: string;
  advancedAlternative: string;
  reason: string;
}

export interface WritingSentenceHighlight {
  sentence: string;
  type: 'grammar' | 'vocabulary' | 'cohesion' | 'standard';
  message: string;
  suggestion?: string;
  highlightSnippet?: string;
}

export interface BandUpgradeItem {
  original: string;
  upgraded: string;
  explanation: string;
  criterion: 'lexical' | 'grammar' | 'cohesion' | 'general';
  bandFrom: number;
  bandTo: number;
}

export interface Task1OverviewHelper {
  overallTrends: string[];
  dominantFeature: string;
  lowestOrAnomalous: string;
  strongOverviewSample: string;
  checklist: string[];
  keyComparisons: string[];
}

export interface WritingEvaluationFeedback {
  evaluationMode: 'gemini' | 'groq' | 'rule_based';
  overallBand: number;
  criteria: {
    taskAchievement: { band: number; comments: string; evidenceQuotes?: string[] };
    coherenceAndCohesion: { band: number; comments: string; evidenceQuotes?: string[] };
    lexicalResource: { band: number; comments: string; evidenceQuotes?: string[] };
    grammaticalRangeAndAccuracy: { band: number; comments: string; evidenceQuotes?: string[] };
  };
  strengths: string[];
  weaknesses: string[];
  errors: WritingErrorItem[];
  vocabUpgrades: WritingVocabUpgrade[];
  improvedParagraph: {
    originalParagraph: string;
    rewrittenParagraph: string;
    examinerNote: string;
  };
  wordCountAnalysis: {
    wordCount: number;
    minRequired: number;
    penaltyApplied: boolean;
    details: string;
  };
  sentenceHighlights?: WritingSentenceHighlight[];
  bandUpgradeSuggestions?: BandUpgradeItem[];
  task1OverviewHelper?: Task1OverviewHelper;
}

export interface WritingSubmission {
  id?: number;
  promptId: string;
  taskType: 'task1_academic' | 'task1_general' | 'task2';
  promptTitle: string;
  promptBody: string;
  essayText: string;
  wordCount: number;
  targetTimeSeconds: number;
  timeSpentSeconds: number;
  submittedAt: string;
  bandEstimate: number;
  feedback: WritingEvaluationFeedback;
}

export interface SpeakingSessionFeedback {
  evaluationMode: 'gemini' | 'groq' | 'rule_based';
  overallBand: number;
  criteria: {
    fluencyAndCoherence: { band: number; comments: string; evidenceQuotes?: string[] };
    lexicalResource: { band: number; comments: string; evidenceQuotes?: string[] };
    grammaticalRangeAndAccuracy: { band: number; comments: string; evidenceQuotes?: string[] };
  };
  metrics: {
    wordsPerMinute: number;
    totalWords: number;
    durationSeconds: number;
    fillerWordsCount: number;
    fillerWordsList: Array<{ word: string; count: number }>;
    uniqueWordRatio: number;
    repeatedWords: Array<{ word: string; count: number }>;
  };
  strengths: string[];
  improvementTips: string[];
  upgradedPhrases: Array<{ original: string; upgraded: string; explanation: string }>;
  pronunciationGuide: {
    disclaimer: string;
    practicalTips: string[];
    selfAssessmentChecklist: Array<{ criterion: string; description: string }>;
  };
  followUpQuestion?: {
    question: string;
    rationale: string;
    sampleAnswer?: string;
  };
  topicVocabulary?: Array<{
    wordOrPhrase: string;
    definition: string;
    collocationSnippet: string;
    bandLevel: string;
  }>;
  modelBand7Answer?: {
    transcript: string;
    keyDifferences: string[];
    examinerBreakdown: string;
  };
}

export interface ParaphrasePromptItem {
  id: string;
  originalSentence: string;
  context: string;
  taskType: 'task1' | 'task2';
  keyTermsToParaphrase: string[];
  modelAnswers: {
    band7: string;
    band8: string;
    band9: string;
  };
  examinerTip: string;
}

export interface Task2IdeaItem {
  id: string;
  topic: string;
  theme: string;
  argumentsFor: Array<{ point: string; explanation: string; example: string }>;
  argumentsAgainst: Array<{ point: string; explanation: string; example: string }>;
  topicVocabulary: Array<{ phrase: string; meaning: string; collocation: string }>;
  sampleThesis: string;
}

export interface SpeakingSession {
  id?: number;
  cardId?: string;
  mode: 'mock' | 'part1' | 'part2' | 'shadowing';
  part: 1 | 2 | 3 | 'full';
  topicTitle: string;
  cueCardPoints?: string[];
  durationSeconds: number;
  transcript: string;
  bandEstimate: number;
  recordedAt: string;
  audioBlobUrl?: string;
  hasAudioRecording?: boolean;
  feedback: SpeakingSessionFeedback;
}

export interface VocabProgress {
  id?: number;
  wordId: string;
  word: string;
  definition: string;
  urduMeaning?: string;
  partOfSpeech?: string;
  topic?: string;
  exampleSentence?: string;
  collocations?: string[];
  synonyms?: string[];
  box?: number; // legacy Leitner box support
  repetitions: number; // SM-2 consecutive successful reviews
  interval: number; // SM-2 interval in days
  easeFactor: number; // SM-2 ease factor (default 2.5)
  lastReviewedAt: string;
  nextReviewAt: string;
  timesCorrect: number;
  timesIncorrect: number;
  mastered: boolean;
  isCustom?: boolean; // added by user manually or from reading passage
  notes?: string;
}

export interface StudyPlanTask {
  id: string;
  title: string;
  description: string;
  module: IELTSModule | 'vocab' | 'grammar' | 'mock' | 'review';
  targetPath: string;
  estimatedMinutes: number;
  completed: boolean;
  completedAt?: string;
  skillFocus?: string;
}

export interface StudyPlanDay {
  id?: number;
  dayIndex: number;
  dateStr: string; // YYYY-MM-DD
  module: IELTSModule | 'vocab' | 'review' | 'mixed';
  taskTitle: string;
  estimatedMinutes: number;
  completed: boolean;
  completedAt?: string;
  tasks?: StudyPlanTask[];
  isRestDay?: boolean;
}

export interface DiagnosticQuestionResult {
  questionId: string;
  module: IELTSModule;
  questionType: QuestionType | string;
  userAnswer: string;
  correctAnswer: string | string[];
  isCorrect: boolean;
  prompt: string;
  explanation?: string;
}

export interface DiagnosticSkillBand {
  rawScore: number;
  totalQuestions: number;
  estimatedBand: number;
  accuracy: number;
}

export interface DiagnosticWeaknessItem {
  questionType: string;
  questionTypeLabel: string;
  module: IELTSModule;
  correct: number;
  total: number;
  accuracy: number;
  severity: 'critical' | 'moderate' | 'good';
  advice: string;
}

export interface DiagnosticResult {
  id?: number;
  completedAt: string;
  overallBand: number;
  skills: {
    reading: DiagnosticSkillBand;
    listening: DiagnosticSkillBand;
    writing: DiagnosticSkillBand;
    speaking: DiagnosticSkillBand;
  };
  weaknesses: DiagnosticWeaknessItem[];
  readingResponses: DiagnosticQuestionResult[];
  listeningResponses: DiagnosticQuestionResult[];
  writingSubmission?: {
    prompt: string;
    text: string;
    wordCount: number;
    bandEstimate: number;
    feedbackSummary: string;
  };
  speakingSession?: {
    answers: Array<{ question: string; transcript: string; bandEstimate: number }>;
    bandEstimate: number;
  };
}

export interface SmartRecommendation {
  id: string;
  category: 'weakness' | 'routine' | 'milestone';
  title: string;
  description: string;
  actionText: string;
  targetPath: string;
  priority: 'high' | 'medium' | 'low';
  module?: IELTSModule | 'vocab' | 'grammar';
  metric?: string;
}

// ==========================================
// Test Content Schemas (/content)
// ==========================================

export type QuestionType =
  | 'multiple_choice_single'
  | 'multiple_choice_multi'
  | 'true_false_not_given'
  | 'yes_no_not_given'
  | 'matching_headings'
  | 'matching_information'
  | 'matching_features'
  | 'sentence_completion'
  | 'summary_completion'
  | 'diagram_label_completion'
  | 'matching'
  | 'short_answer';

export interface BaseQuestion {
  id: string;
  questionNumber: number;
  type: QuestionType;
  prompt: string;
  instruction?: string;
  options?: string[]; // For multiple choice / matching options
  correctAnswer: string | string[]; // Can be multiple accepted spellings or multi-select
  explanation?: string;
  evidence?: string; // Exact sentence / excerpt from the passage
  diagramSvg?: string; // For map / diagram labeling questions
}

export interface ReadingPassage {
  passageNumber: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  text: string; // Markdown or raw text with paragraphs and optional section markers [A], [B]
  wordCount: number;
  questionGroups: {
    groupInstruction: string;
    questionType: QuestionType;
    diagramSvg?: string;
    questions: BaseQuestion[];
  }[];
}

export interface ReadingTestContent {
  id: string;
  title: string;
  testType: TestType;
  difficulty: 'easy' | 'standard' | 'challenging';
  timeLimitMinutes: number; // Default 60
  passages: ReadingPassage[];
  attribution: {
    source: string;
    license: string;
    authorOrTopic: string;
  };
}

export interface ListeningSection {
  sectionNumber: 1 | 2 | 3 | 4;
  title: string;
  contextDescription: string;
  audioUrl?: string; // Optional audio file path or Web Speech synthesis script
  audioScript: {
    speaker: string;
    text: string;
  }[];
  questionGroups: {
    groupInstruction: string;
    questionType: QuestionType;
    diagramSvg?: string;
    questions: BaseQuestion[];
  }[];
}

export interface ListeningTestContent {
  id: string;
  title: string;
  difficulty: 'easy' | 'standard' | 'challenging';
  timeLimitMinutes: number; // 30 mins + 10 mins transfer or 30-40 mins
  sections: ListeningSection[];
  attribution: {
    source: string;
    license: string;
    notes: string;
  };
}

export interface WritingPromptContent {
  id: string;
  taskType: 'task1_academic' | 'task1_general' | 'task2';
  title: string;
  promptText: string;
  chartType?: 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map';
  chartData?: any;
  chartSvg?: string;
  letterType?: 'formal' | 'semi-formal' | 'informal';
  essayType?: 'opinion' | 'discussion' | 'problem_solution' | 'advantages_disadvantages' | 'two_part';
  visualDataUrl?: string; // For Task 1 Academic charts/graphs/diagrams
  visualDataDescription?: string;
  minWordCount: number; // 150 for Task 1, 250 for Task 2
  recommendedMinutes: number; // 20 for Task 1, 40 for Task 2
  planningGuide?: { paragraph: string; focus: string; tips: string }[];
  sampleAnswers?: {
    band: number;
    text: string;
    examinerCommentary: string;
  }[];
  checklist?: string[];
}

export interface SpeakingPart1Question {
  id: string;
  text: string;
  sampleOutline: string;
}

export interface SpeakingPart1Topic {
  id: string;
  topic: string;
  questions: SpeakingPart1Question[];
}

export interface SpeakingPart3Question {
  id: string;
  question: string;
  sampleOutline: string;
}

export interface SpeakingPart2CueCard {
  id: string;
  topic: string;
  cueCard: {
    topic: string;
    bulletPoints: string[];
    prepTimeSeconds: number;
    speakTimeSeconds: number;
  };
  sampleAnswer: string;
  keyCollocations: string[];
  part3Questions: SpeakingPart3Question[];
}

export interface SpeakingCardContent {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  leadIn?: string;
  // Part 1: questions
  questions?: string[];
  // Part 2: Cue card
  cueCard?: {
    topic: string;
    bulletPoints: string[];
    prepTimeSeconds: number; // 60
    speakTimeSeconds: number; // 120
  };
  // Part 3: Deep discussion questions
  discussionQuestions?: {
    question: string;
    followUpPrompts?: string[];
  }[];
  tips: string[];
  sampleBand9Response?: string;
}

export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase';

export interface VocabWordContent {
  id: string;
  word: string;
  partOfSpeech: PartOfSpeech;
  topic: string;
  meaning: string;
  urduMeaning: string;
  exampleSentence: string;
  collocations: string[];
  synonyms: string[];
  bandTarget: number;
}

export interface GrammarExercise {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  focus: string;
  explanation: string;
  bandTips: string;
  exercises: GrammarExercise[];
}

export interface WritingPhraseItem {
  phrase: string;
  function: string;
  example: string;
}

export interface WritingPhraseCategory {
  category: string;
  categoryTitle: string;
  description: string;
  phrases: WritingPhraseItem[];
}

export interface UserFeedbackItem {
  id: string;
  rating: number; // 1-5
  category: string;
  comment: string;
  email?: string;
  timestamp: string;
  pageUrl: string;
  version: string;
}
