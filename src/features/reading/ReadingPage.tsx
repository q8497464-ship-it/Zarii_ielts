import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Filter,
  CheckCircle2,
  Play,
  HelpCircle,
  Download,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { db } from '../../lib/db';
import { getOfflineTestIds, downloadTestForOffline, removeOfflineTest } from '../../lib/pwa';
import type { TestAttempt, QuestionType } from '../../types';
import {
  ALL_READING_TESTS,
  QUESTION_TYPE_LABELS,
  getAllFlattenedQuestions,
  type FlattenedQuestion,
} from './readingContent';
import { formatBand } from '../../lib/utils';
import {
  ModuleLandingStructure,
  type ModuleHistoryAttempt,
  type ModuleStrategyTip,
} from '../../components/practice/ModuleLandingStructure';

export function ReadingPage() {
  const { profile, addToast } = useAppStore();
  const navigate = useNavigate();

  const [testTypeFilter, setTestTypeFilter] = useState<'all' | 'academic' | 'general'>(
    profile?.testType || 'academic'
  );
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>('all');
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [offlineTestIds, setOfflineTestIds] = useState<string[]>(() => getOfflineTestIds());
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    const handleOfflineChanged = () => {
      setOfflineTestIds(getOfflineTestIds());
    };
    window.addEventListener('zarii:offline-tests-changed', handleOfflineChanged);
    return () => window.removeEventListener('zarii:offline-tests-changed', handleOfflineChanged);
  }, []);

  const handleToggleOffline = async (testId: string) => {
    if (offlineTestIds.includes(testId)) {
      await removeOfflineTest(testId, [`/content/reading/${testId}.json`]);
      setOfflineTestIds((prev) => prev.filter((id) => id !== testId));
      addToast({
        type: 'info',
        title: 'Removed from Offline Cache',
        message: 'This test was removed from local offline storage.',
      });
    } else {
      setDownloadingId(testId);
      await downloadTestForOffline(testId, [`/content/reading/${testId}.json`]);
      setOfflineTestIds((prev) => [...prev, testId]);
      setDownloadingId(null);
      addToast({
        type: 'success',
        title: 'Downloaded for Offline Use',
        message: 'This test is now fully available offline without an internet connection.',
      });
    }
  };

  useEffect(() => {
    async function fetchAttempts() {
      try {
        const list = await db.attempts
          .where('module')
          .equals('reading')
          .reverse()
          .sortBy('completedAt');
        setAttempts(list);
      } catch (err) {
        console.error('Failed to load reading attempts', err);
      }
    }
    fetchAttempts();
  }, []);

  const filteredTests = ALL_READING_TESTS.filter((test) => {
    if (testTypeFilter !== 'all' && test.testType !== testTypeFilter) {
      return false;
    }
    if (selectedQuestionType !== 'all') {
      const hasType = test.passages.some((p) =>
        p.questionGroups.some((g) => g.questionType === selectedQuestionType)
      );
      if (!hasType) return false;
    }
    return true;
  });

  const getBestScoreForTest = (testId: string) => {
    const testAttempts = attempts.filter((a) => a.testId === testId);
    if (testAttempts.length === 0) return null;
    return testAttempts.reduce((best, curr) => (curr.bandEstimate > best.bandEstimate ? curr : best));
  };

  const questionTypeOptions = [
    { id: 'all', label: 'All Question Types', count: getAllFlattenedQuestions().length },
    {
      id: 'true_false_not_given',
      label: 'True / False / Not Given',
      count: getAllFlattenedQuestions().filter((q) => q.type === 'true_false_not_given').length,
    },
    {
      id: 'yes_no_not_given',
      label: 'Yes / No / Not Given',
      count: getAllFlattenedQuestions().filter((q) => q.type === 'yes_no_not_given').length,
    },
    {
      id: 'matching_headings',
      label: 'Matching Headings',
      count: getAllFlattenedQuestions().filter((q) => q.type === 'matching_headings').length,
    },
    {
      id: 'multiple_choice_single',
      label: 'Multiple Choice (Single)',
      count: getAllFlattenedQuestions().filter((q) => q.type === 'multiple_choice_single').length,
    },
    {
      id: 'sentence_completion',
      label: 'Sentence Completion',
      count: getAllFlattenedQuestions().filter((q) => q.type === 'sentence_completion').length,
    },
    {
      id: 'summary_completion',
      label: 'Summary Completion',
      count: getAllFlattenedQuestions().filter((q) => q.type === 'summary_completion').length,
    },
    {
      id: 'matching_information',
      label: 'Matching Information',
      count: getAllFlattenedQuestions().filter((q) => q.type === 'matching_information').length,
    },
  ];

  // Calculated Stats for Section A
  const completedAttempts = attempts.filter((a) => a.status === 'completed');
  const avgBand = completedAttempts.length
    ? completedAttempts.reduce((acc, a) => acc + a.bandEstimate, 0) / completedAttempts.length
    : null;
  const totalMinutes = Math.round(
    attempts.reduce((acc, a) => acc + (a.timeSpentSeconds || 0), 0) / 60
  );

  // Recent Attempts formatted for Section D
  const formattedHistory: ModuleHistoryAttempt[] = completedAttempts.slice(0, 5).map((a) => ({
    id: a.id || `${a.testId}-${a.completedAt}`,
    title: a.title || `Reading Test #${a.testId}`,
    date: a.completedAt ? a.completedAt.split('T')[0] : 'Recent',
    scoreText: `${a.score}/${a.totalQuestions}`,
    band: a.bandEstimate,
    durationText: `${Math.round((a.timeSpentSeconds || 0) / 60)} mins`,
    reviewUrl: `/practice/reading/results/${a.id}`,
  }));

  // Recommended Next Test for Section C
  const recommendedTest = ALL_READING_TESTS[0];
  const recommendedItem = {
    title: recommendedTest?.title || 'Academic Reading Test #1',
    tag: recommendedTest?.testType === 'general' ? 'General Training' : 'Academic Focus',
    description: `Full 3-passage timed simulation featuring ${recommendedTest?.passages.map((p) => p.title).slice(0, 2).join(' & ')}. Calibrated for Band ${profile?.targetBand || 7.5} candidates.`,
    timeMinutes: 60,
    actionUrl: `/practice/reading/test/${recommendedTest?.id || 'cambridge-18-test-1'}?mode=exam`,
    actionLabel: 'Start Timed Exam Mode',
  };

  // Section E: Tips & Strategies
  const readingStrategyTips: ModuleStrategyTip[] = [
    {
      title: 'Skimming vs Scanning: The 3-Minute Rule',
      category: 'Speed Technique',
      duration: '3m read',
      summary: 'Never read every word in the passage first. Spend 2–3 minutes skimming topic sentences, headings, and bold names to create a mental map.',
      lessonUrl: '/lessons',
    },
    {
      title: 'Cracking True / False / Not Given Traps',
      category: 'Trap Alert',
      duration: '4m read',
      summary: 'FALSE means the passage directly contradicts the statement. NOT GIVEN means the idea cannot be verified from the text, even if you know it to be true in the real world.',
      lessonUrl: '/lessons',
    },
    {
      title: 'Matching Headings: Read the Paragraph First',
      category: 'Main Idea Strategy',
      duration: '5m read',
      summary: 'Cross out used headings, underline keywords in remaining choices, and look for transition markers (However, Although, In contrast) inside each paragraph.',
      lessonUrl: '/lessons',
    },
  ];

  const startTestNode = (
    <div className="space-y-6">
      {/* Test Track Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Exam Track:</span>
          <div className="flex items-center gap-1">
            {(['all', 'academic', 'general'] as const).map((track) => (
              <button
                key={track}
                onClick={() => setTestTypeFilter(track)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  testTypeFilter === track
                    ? 'bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-slate-950 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {track === 'all' ? 'All Tracks' : track}
              </button>
            ))}
          </div>
        </div>

        {selectedQuestionType !== 'all' && (
          <button
            onClick={() => setSelectedQuestionType('all')}
            className="text-xs text-[#124F40] dark:text-[#5BB78D] hover:underline font-bold"
          >
            Clear Question Filter
          </button>
        )}
      </div>

      {/* Question Type Filter Pills for Targeted Drills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#124F40] dark:text-[#5BB78D]" />
          Targeted Drill by Question Type
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {questionTypeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedQuestionType(opt.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                selectedQuestionType === opt.id
                  ? 'bg-[#124F40] text-white border-[#124F40] dark:bg-[#5BB78D] dark:text-slate-950 dark:border-[#5BB78D] font-bold shadow-2xs'
                  : 'bg-white dark:bg-[#112019] text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-[#24392F] hover:border-slate-400'
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedQuestionType === opt.id
                    ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {opt.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTests.map((test) => {
          const totalQuestions = test.passages.reduce(
            (acc, p) => acc + p.questionGroups.reduce((gAcc, g) => gAcc + g.questions.length, 0),
            0
          );
          const bestAttempt = getBestScoreForTest(test.id);

          return (
            <Card
              key={test.id}
              className="flex flex-col justify-between border-slate-200/80 dark:border-[#24392F] p-6 hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={test.testType === 'academic' ? 'teal' : 'navy'}>
                        {test.testType.toUpperCase()}
                      </Badge>
                      <Badge variant="slate">{test.difficulty.toUpperCase()}</Badge>
                      {offlineTestIds.includes(test.id) && (
                        <Badge variant="emerald" className="flex items-center gap-1 text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          Offline Ready
                        </Badge>
                      )}
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {test.timeLimitMinutes} Mins
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {test.title}
                    </h2>
                  </div>

                  {bestAttempt && (
                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Best Band</span>
                      <div className="text-lg font-extrabold font-mono text-[#124F40] dark:text-[#5BB78D]">
                        {formatBand(bestAttempt.bandEstimate)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Passages breakdown */}
                <div className="space-y-2 mb-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-[#24392F] text-xs">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">
                    Included Passages ({test.passages.length}):
                  </div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                    {test.passages.map((p) => (
                      <li key={p.passageNumber} className="truncate">
                        <strong>Passage {p.passageNumber}:</strong> {p.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#24392F] flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-medium">
                  {totalQuestions} Questions total
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleOffline(test.id)}
                    disabled={downloadingId === test.id}
                    className="text-xs text-slate-500 hover:text-[#124F40] dark:hover:text-[#5BB78D]"
                    leftIcon={<Download className={`w-3.5 h-3.5 ${downloadingId === test.id ? 'animate-bounce text-[#124F40]' : ''}`} />}
                  >
                    {offlineTestIds.includes(test.id) ? 'Cached' : 'Offline'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/practice/reading/test/${test.id}?mode=practice`)}
                    leftIcon={<HelpCircle className="w-3.5 h-3.5" />}
                  >
                    Practice
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/practice/reading/test/${test.id}?mode=exam`)}
                    leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                  >
                    Exam Mode
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <ModuleLandingStructure
      moduleKey="reading"
      title="Reading Practice Tests"
      description="Simulate authentic Cambridge-standard reading passages with split-screen texts, in-passage highlighting, and automated band scoring."
      icon={<BookOpen className="w-6 h-6 text-[#124F40] dark:text-[#5BB78D]" />}
      badgeText="3 PASSAGES • 60 MINUTES"
      accentColor="#124F40"
      currentBand={avgBand}
      totalAttemptsCount={completedAttempts.length}
      totalMinutesSpent={totalMinutes}
      trendText={completedAttempts.length >= 2 ? '+0.5 Band Growth' : undefined}
      trendPositive={true}
      startTestSection={startTestNode}
      recommendedItem={recommendedItem}
      recentAttempts={formattedHistory}
      strategyTips={readingStrategyTips}
    />
  );
}
