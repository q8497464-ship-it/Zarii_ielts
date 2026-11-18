import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PenTool,
  Clock,
  Sparkles,
  ArrowRight,
  BarChart2,
  Mail,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { db } from '../../lib/db';
import type { WritingSubmission } from '../../types';
import {
  ALL_WRITING_PROMPTS,
} from './writingContent';
import { formatBand } from '../../lib/utils';
import { ParaphrasePracticeModal } from './ParaphrasePracticeModal';
import { Task2IdeaGeneratorModal } from './Task2IdeaGeneratorModal';
import {
  ModuleLandingStructure,
  type ModuleHistoryAttempt,
  type ModuleStrategyTip,
} from '../../components/practice/ModuleLandingStructure';

export function WritingPage() {
  const { profile } = useAppStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'task1_academic' | 'task1_general' | 'task2'>(
    profile?.testType === 'general' ? 'task1_general' : 'task2'
  );
  const [selectedSubtype, setSelectedSubtype] = useState<string>('all');
  const [submissions, setSubmissions] = useState<WritingSubmission[]>([]);
  const [isParaphraseOpen, setIsParaphraseOpen] = useState(false);
  const [isIdeaGenOpen, setIsIdeaGenOpen] = useState(false);

  useEffect(() => {
    async function loadSubmissions() {
      try {
        const list = await db.writingSubmissions.reverse().sortBy('submittedAt');
        setSubmissions(list);
      } catch (err) {
        console.error('Failed to load writing submissions', err);
      }
    }
    loadSubmissions();
  }, []);

  const getBestScore = (promptId: string) => {
    const matching = submissions.filter((s) => s.promptId === promptId);
    if (matching.length === 0) return null;
    return matching.reduce((best, curr) => (curr.bandEstimate > best.bandEstimate ? curr : best));
  };

  const filteredPrompts = ALL_WRITING_PROMPTS.filter((p) => {
    if (activeTab !== 'all' && p.taskType !== activeTab) {
      return false;
    }
    if (selectedSubtype !== 'all') {
      const type = p.chartType || p.letterType || p.essayType;
      if (type !== selectedSubtype) return false;
    }
    return true;
  });

  // Calculated Stats for Section A
  const avgBand = submissions.length
    ? submissions.reduce((acc, s) => acc + s.bandEstimate, 0) / submissions.length
    : null;
  const totalMinutes = Math.round(
    submissions.reduce((acc, s) => acc + (s.timeSpentSeconds || 2400), 0) / 60
  );

  // Recent History for Section D
  const formattedHistory: ModuleHistoryAttempt[] = submissions.slice(0, 5).map((s) => ({
    id: s.id || `${s.promptId}-${s.submittedAt}`,
    title: s.promptTitle || `Writing ${s.taskType.replace('_', ' ').toUpperCase()}`,
    date: s.submittedAt ? s.submittedAt.split('T')[0] : 'Recent',
    scoreText: `${s.wordCount} words`,
    band: s.bandEstimate,
    durationText: `${Math.round((s.timeSpentSeconds || 2400) / 60)} mins`,
    reviewUrl: `/practice/writing/submission/${s.id}`,
  }));

  // Recommended Next Prompt for Section C
  const recommendedPrompt = ALL_WRITING_PROMPTS.find((p) => p.taskType === 'task2') || ALL_WRITING_PROMPTS[0];
  const recommendedItem = {
    title: recommendedPrompt?.title || 'Academic Writing Task 2 Essay',
    tag: recommendedPrompt?.taskType === 'task2' ? 'Task 2 Essay' : 'Task 1 Report',
    description: recommendedPrompt?.promptText.slice(0, 160) + '...',
    timeMinutes: recommendedPrompt?.taskType === 'task2' ? 40 : 20,
    actionUrl: `/practice/writing/prompt/${recommendedPrompt?.id}`,
    actionLabel: 'Launch Writing Editor',
  };

  // Section E: Tips & Strategies
  const writingStrategyTips: ModuleStrategyTip[] = [
    {
      title: 'Task 1: The Non-Negotiable Overview Paragraph',
      category: 'Report Tactic',
      duration: '4m read',
      summary: 'Examiners cannot award Band 7.0+ for Task Achievement without a clear overview paragraph highlighting the main trends, highest points, or key anomalies without quoting exact figures.',
      lessonUrl: '/lessons',
    },
    {
      title: 'Task 2: The PEEL Body Paragraph Formula',
      category: 'Essay Structure',
      duration: '5m read',
      summary: 'Point (topic sentence) -> Explanation (why this happens) -> Evidence (concrete example or statistic) -> Link (reconnect directly to the essay prompt).',
      lessonUrl: '/lessons',
    },
    {
      title: 'Lexical Resource: Precision Over Fancy Words',
      category: 'Vocabulary',
      duration: '4m read',
      summary: 'Examiners penalize forced idioms or archaic words. Score higher by using natural academic collocations, topic-specific nouns, and varied sentence connectors.',
      lessonUrl: '/lessons',
    },
  ];

  const startTestNode = (
    <div className="space-y-6">
      {/* Task Type Filters & Tools */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all' as const, label: 'All Tasks' },
            { id: 'task1_academic' as const, label: 'Task 1 (Academic Graphs)' },
            { id: 'task1_general' as const, label: 'Task 1 (General Letters)' },
            { id: 'task2' as const, label: 'Task 2 (Essays)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedSubtype('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Practice Tools */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsParaphraseOpen(true)}
            leftIcon={<FileText className="w-3.5 h-3.5 text-orange-600" />}
          >
            Paraphrase Drill
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsIdeaGenOpen(true)}
            leftIcon={<Lightbulb className="w-3.5 h-3.5 text-amber-500" />}
          >
            Idea Generator
          </Button>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrompts.map((prompt) => {
          const bestScore = getBestScore(prompt.id);
          const isTask1 = prompt.taskType !== 'task2';

          return (
            <Card
              key={prompt.id}
              className="flex flex-col justify-between border-slate-200/80 dark:border-[#24392F] p-6 hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="amber">
                        {prompt.taskType === 'task2' ? 'TASK 2 ESSAY' : 'TASK 1 REPORT'}
                      </Badge>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {prompt.recommendedMinutes} Mins
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {prompt.title}
                    </h2>
                  </div>

                  {bestScore && (
                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Best Band</span>
                      <div className="text-lg font-extrabold font-mono text-orange-600">
                        {formatBand(bestScore.bandEstimate)}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {prompt.promptText}
                </p>

                <div className="flex flex-wrap gap-2 text-2xs text-slate-500 mb-4">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-medium">
                    Min Words: {prompt.minWordCount}
                  </span>
                  {prompt.chartType && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-medium capitalize">
                      {prompt.chartType.replace('_', ' ')}
                    </span>
                  )}
                  {prompt.essayType && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-medium capitalize">
                      {prompt.essayType.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-[#24392F] flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  {isTask1 ? '150+ Words' : '250+ Words'}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/practice/writing/prompt/${prompt.id}`)}
                  leftIcon={<PenTool className="w-3.5 h-3.5" />}
                >
                  Write Essay
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <ParaphrasePracticeModal
        isOpen={isParaphraseOpen}
        onClose={() => setIsParaphraseOpen(false)}
      />
      <Task2IdeaGeneratorModal
        isOpen={isIdeaGenOpen}
        onClose={() => setIsIdeaGenOpen(false)}
      />
    </div>
  );

  return (
    <ModuleLandingStructure
      moduleKey="writing"
      title="Writing Practice & Evaluation"
      description="Timed distraction-free essay editor with live word count, Cambridge examiner band descriptors, and criteria-specific feedback."
      icon={<PenTool className="w-6 h-6 text-orange-600 dark:text-orange-400" />}
      badgeText="TASK 1 & TASK 2 • 60 MINUTES"
      accentColor="#EA580C"
      currentBand={avgBand}
      totalAttemptsCount={submissions.length}
      totalMinutesSpent={totalMinutes}
      trendText={submissions.length >= 2 ? '+0.5 Band Growth' : undefined}
      trendPositive={true}
      startTestSection={startTestNode}
      recommendedItem={recommendedItem}
      recentAttempts={formattedHistory}
      strategyTips={writingStrategyTips}
    />
  );
}
