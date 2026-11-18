import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Headphones,
  Clock,
  Filter,
  Play,
  HelpCircle,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { db } from '../../lib/db';
import { getOfflineTestIds, downloadTestForOffline, removeOfflineTest } from '../../lib/pwa';
import type { TestAttempt } from '../../types';
import {
  ALL_LISTENING_TESTS,
  getAllFlattenedListeningQuestions,
} from './listeningContent';
import { formatBand } from '../../lib/utils';
import {
  ModuleLandingStructure,
  type ModuleHistoryAttempt,
  type ModuleStrategyTip,
} from '../../components/practice/ModuleLandingStructure';

export function ListeningPage() {
  const { profile, addToast } = useAppStore();
  const navigate = useNavigate();

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
      await removeOfflineTest(testId, [`/content/listening/${testId}.json`]);
      setOfflineTestIds((prev) => prev.filter((id) => id !== testId));
      addToast({
        type: 'info',
        title: 'Removed from Offline Cache',
        message: 'This listening test was removed from offline storage.',
      });
    } else {
      setDownloadingId(testId);
      await downloadTestForOffline(testId, [`/content/listening/${testId}.json`]);
      setOfflineTestIds((prev) => [...prev, testId]);
      setDownloadingId(null);
      addToast({
        type: 'success',
        title: 'Downloaded for Offline Use',
        message: 'This listening test is cached and ready to run offline.',
      });
    }
  };

  useEffect(() => {
    async function fetchAttempts() {
      try {
        const list = await db.attempts
          .where('module')
          .equals('listening')
          .reverse()
          .sortBy('completedAt');
        setAttempts(list);
      } catch (err) {
        console.error('Failed to load listening attempts', err);
      }
    }
    fetchAttempts();
  }, []);

  const getBestScoreForTest = (testId: string) => {
    const match = attempts.filter((a) => a.testId === testId);
    if (match.length === 0) return null;
    return match.reduce((best, curr) => (curr.bandEstimate > best.bandEstimate ? curr : best));
  };

  const filteredTests = ALL_LISTENING_TESTS.filter((test) => {
    if (selectedQuestionType !== 'all') {
      const hasType = test.sections.some((s) =>
        s.questionGroups.some((g) => g.questionType === selectedQuestionType)
      );
      if (!hasType) return false;
    }
    return true;
  });

  const questionTypeOptions = [
    { id: 'all', label: 'All Question Types', count: getAllFlattenedListeningQuestions().length },
    {
      id: 'sentence_completion',
      label: 'Form / Note Completion',
      count: getAllFlattenedListeningQuestions().filter((q) => q.type === 'sentence_completion').length,
    },
    {
      id: 'diagram_label_completion',
      label: 'Map / Diagram Labelling',
      count: getAllFlattenedListeningQuestions().filter((q) => q.type === 'diagram_label_completion').length,
    },
    {
      id: 'multiple_choice_single',
      label: 'Multiple Choice (Single)',
      count: getAllFlattenedListeningQuestions().filter((q) => q.type === 'multiple_choice_single').length,
    },
    {
      id: 'matching',
      label: 'Matching Information',
      count: getAllFlattenedListeningQuestions().filter((q) => q.type === 'matching').length,
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
    title: a.title || `Listening Test #${a.testId}`,
    date: a.completedAt ? a.completedAt.split('T')[0] : 'Recent',
    scoreText: `${a.score}/${a.totalQuestions}`,
    band: a.bandEstimate,
    durationText: `${Math.round((a.timeSpentSeconds || 0) / 60)} mins`,
    reviewUrl: `/practice/listening/results/${a.id}`,
  }));

  // Recommended Next Test for Section C
  const recommendedTest = ALL_LISTENING_TESTS[0];
  const recommendedItem = {
    title: recommendedTest?.title || 'Cambridge Listening Practice Test 1',
    tag: 'Official 4-Section Flow',
    description: 'Complete 40-question audio exam featuring conversation booking, university campus guide, academic tutorial, and lecture notes.',
    timeMinutes: 40,
    actionUrl: `/practice/listening/test/${recommendedTest?.id || 'cambridge-18-listening-1'}?mode=exam`,
    actionLabel: 'Start Full Listening Audio',
  };

  // Section E: Tips & Strategies
  const listeningStrategyTips: ModuleStrategyTip[] = [
    {
      title: 'Predicting Answer Types (The 30-Second Window)',
      category: 'Audio Preparation',
      duration: '3m read',
      summary: 'Before the recording starts, use your preparation seconds to underline headings and decide if the blank expects a noun, date, number, or adjective.',
      lessonUrl: '/lessons',
    },
    {
      title: 'Watch Out for Speaker Self-Corrections',
      category: 'Examiner Trap',
      duration: '4m read',
      summary: 'Examiners frequently use distractors: "We leave at 3:15... actually no, let\'s make it 3:45". Never write the first number you hear until confirmed.',
      lessonUrl: '/lessons',
    },
    {
      title: 'Map & Diagram Navigation: Establish Orientation',
      category: 'Spatial Tactics',
      duration: '4m read',
      summary: 'Locate the entrance, North arrow, and landmark cross-roads immediately before the audio begins to follow the speaker without losing track.',
      lessonUrl: '/lessons',
    },
  ];

  const startTestNode = (
    <div className="space-y-6">
      {/* Targeted Question Type Filter */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          Filter Tests by Question Type
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {questionTypeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedQuestionType(opt.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                selectedQuestionType === opt.id
                  ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-2xs'
                  : 'bg-white dark:bg-[#112019] text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-[#24392F] hover:border-slate-400'
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedQuestionType === opt.id
                    ? 'bg-white/20 text-white'
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
          const totalQuestions = test.sections.reduce(
            (acc, s) => acc + s.questionGroups.reduce((gAcc, g) => gAcc + g.questions.length, 0),
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
                      <Badge variant="navy">4 SECTIONS</Badge>
                      <Badge variant="slate">{test.difficulty.toUpperCase()}</Badge>
                      {offlineTestIds.includes(test.id) && (
                        <Badge variant="emerald" className="flex items-center gap-1 text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          Offline Ready
                        </Badge>
                      )}
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        30m + 10m Transfer
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {test.title}
                    </h2>
                  </div>

                  {bestAttempt && (
                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Best Band</span>
                      <div className="text-lg font-extrabold font-mono text-purple-600 dark:text-purple-400">
                        {formatBand(bestAttempt.bandEstimate)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sections breakdown */}
                <div className="space-y-2 mb-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-[#24392F] text-xs">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">
                    Included Audio Sections (4):
                  </div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                    {test.sections.map((s) => (
                      <li key={s.sectionNumber} className="truncate">
                        <strong>Section {s.sectionNumber}:</strong> {s.title}
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
                    className="text-xs text-slate-500 hover:text-purple-600 dark:hover:text-purple-400"
                    leftIcon={<Download className={`w-3.5 h-3.5 ${downloadingId === test.id ? 'animate-bounce text-purple-600' : ''}`} />}
                  >
                    {offlineTestIds.includes(test.id) ? 'Cached' : 'Offline'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/practice/listening/test/${test.id}?mode=practice`)}
                    leftIcon={<HelpCircle className="w-3.5 h-3.5" />}
                  >
                    Practice
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/practice/listening/test/${test.id}?mode=exam`)}
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
      moduleKey="listening"
      title="Listening Practice Tests"
      description="Practice Cambridge-style listening recordings with native British, Australian, and North American voices, timed answer transfer, and highlighted transcripts."
      icon={<Headphones className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
      badgeText="4 SECTIONS • 40 QUESTIONS"
      accentColor="#8B5CF6"
      currentBand={avgBand}
      totalAttemptsCount={completedAttempts.length}
      totalMinutesSpent={totalMinutes}
      trendText={completedAttempts.length >= 2 ? '+0.5 Band Growth' : undefined}
      trendPositive={true}
      startTestSection={startTestNode}
      recommendedItem={recommendedItem}
      recentAttempts={formattedHistory}
      strategyTips={listeningStrategyTips}
    />
  );
}
