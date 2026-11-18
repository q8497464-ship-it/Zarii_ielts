import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Headphones,
  Filter,
  ArrowRight,
  Sparkles,
  HelpCircle,
  AlertCircle,
  Volume2,
  Play,
  Share2,
} from 'lucide-react';
import { db } from '../../lib/db';
import { getListeningTestById, LISTENING_QUESTION_TYPE_LABELS } from './listeningContent';
import { isListeningAnswerCorrect } from './marking';
import { cleanOptionText } from '../../lib/mcqShuffle';
import { useAppStore } from '../../store/useAppStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import {
  CircularAccuracyMeter,
  WhatToDoNextCard,
  ShareableProgressCard,
} from '../../components/results';
import { LowAccuracyLessonPrompt, QuestionMiniLessonModal } from '../adaptive/QuestionMiniLessonModal';
import { getLessonByQuestionType } from '../adaptive/questionLessonsData';
import type { QuestionStrategyLesson } from '../../types';
import { formatBand, formatSecondsToTime, getBandBadgeColor } from '../../lib/utils';
import type { TestAttempt, QuestionResponse, QuestionType } from '../../types';

export function ListeningResultsPage() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const { profile } = useAppStore();

  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<QuestionStrategyLesson | null>(null);

  // Audio snippet playback
  const [speakingSnippetId, setSpeakingSnippetId] = useState<string | null>(null);

  useEffect(() => {
    async function loadResults() {
      if (!attemptId) return;
      try {
        const id = parseInt(attemptId, 10);
        const att = await db.attempts.get(id);
        if (!att) {
          setIsLoading(false);
          return;
        }
        setAttempt(att);

        const resp = await db.responses.where('attemptId').equals(id).toArray();
        setResponses(resp);
      } catch (err) {
        console.error('Failed to load listening results from Dexie', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadResults();
  }, [attemptId]);

  const test = useMemo(() => {
    return attempt ? getListeningTestById(attempt.testId) : undefined;
  }, [attempt]);

  // Map each response to its full question definition in the test JSON
  const detailedQuestions = useMemo(() => {
    if (!test) return [];
    const map = new Map<string, any>();
    for (const s of test.sections) {
      for (const g of s.questionGroups) {
        for (const q of g.questions) {
          map.set(q.id, {
            ...q,
            sectionNumber: s.sectionNumber,
            sectionTitle: s.title,
          });
        }
      }
    }

    return responses.map((r) => {
      const qDef = map.get(r.questionId);
      const isCorrect = qDef ? isListeningAnswerCorrect(r.userAnswer, qDef.correctAnswer, qDef.type) : false;

      return {
        ...r,
        questionDef: qDef,
        isCorrect,
      };
    });
  }, [test, responses]);

  // Breakdown by listening task type
  const typeBreakdown = useMemo(() => {
    const stats: Record<string, { total: number; correct: number; type: QuestionType }> = {};

    for (const item of detailedQuestions) {
      const qType = item.questionDef?.type || 'short_answer';
      if (!stats[qType]) {
        stats[qType] = { total: 0, correct: 0, type: qType };
      }
      stats[qType].total++;
      if (item.isCorrect) stats[qType].correct++;
    }

    return Object.values(stats);
  }, [detailedQuestions]);

  // Find weakest listening question type
  const weakestType = useMemo(() => {
    if (typeBreakdown.length === 0) return undefined;
    const sorted = [...typeBreakdown].sort((a, b) => a.correct / a.total - b.correct / b.total);
    const worst = sorted[0];
    if (worst && worst.correct / worst.total < 0.8) {
      return LISTENING_QUESTION_TYPE_LABELS[worst.type] || worst.type;
    }
    return undefined;
  }, [typeBreakdown]);

  // Play audio snippet evidence using browser SpeechSynthesis
  const handlePlayEvidence = (questionId: string, snippetText: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (speakingSnippetId === questionId) {
      setSpeakingSnippetId(null);
      return;
    }

    setSpeakingSnippetId(questionId);
    const utterance = new SpeechSynthesisUtterance(snippetText);
    utterance.lang = 'en-GB';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setSpeakingSnippetId(null);
    };
    utterance.onerror = () => {
      setSpeakingSnippetId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Grading listening responses against audio evidence...</p>
      </div>
    );
  }

  if (!attempt || !test) {
    return (
      <Card className="max-w-xl mx-auto my-16 p-8 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold">Attempt Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The requested listening test attempt could not be retrieved from your local browser database.
        </p>
        <Button variant="primary" onClick={() => navigate('/practice/listening')}>
          Back to Listening Hub
        </Button>
      </Card>
    );
  }

  const accuracyPct = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const targetBand = profile?.targetBand || 7.5;
  const incorrectCount = detailedQuestions.filter((q) => !q.isCorrect).length;

  const lowestAccuracyTypeItem = useMemo(() => {
    const belowFifty = typeBreakdown.filter((t) => Math.round((t.correct / t.total) * 100) < 50);
    if (belowFifty.length === 0) return null;
    belowFifty.sort((a, b) => a.correct / a.total - b.correct / b.total);
    return belowFifty[0];
  }, [typeBreakdown]);

  const filteredQuestions = detailedQuestions.filter((item) => {
    if (filterMode === 'incorrect') return !item.isCorrect;
    if (filterMode === 'correct') return item.isCorrect;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="navy">LISTENING EVALUATION REPORT</Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400">Completed on {new Date(attempt.completedAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {attempt.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {incorrectCount > 0 && (
            <Link to="/mistakes">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Headphones className="w-3.5 h-3.5 text-rose-500" />}
                className="text-xs text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60"
              >
                Mistakes ({incorrectCount})
              </Button>
            </Link>
          )}

          <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 rounded-md hover:bg-white dark:hover:bg-slate-700/60 transition-colors"
              title="Share Progress Badge"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Share</span>
            </button>
            <div className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
            <button
              onClick={() => navigate(`/practice/listening/test/${test.id}?mode=exam`)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-white dark:hover:bg-slate-700/60 transition-colors"
              title="Retake Test"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/practice/listening')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="text-xs bg-brand-800 hover:bg-brand-700 text-white font-semibold shadow-xs"
          >
            Listening Hub
          </Button>
        </div>
      </div>

      {/* 1. Main Score Hero Card with Big Animated Band & Circular Accuracy Progress */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-white via-brand-50/20 to-slate-50/40 dark:from-[#112019] dark:via-brand-950/20 dark:to-[#112019] border-[#E1EBE5] dark:border-[#24392F] shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Big Animated Band Score (5 cols) */}
          <div className="md:col-span-5 text-center md:text-left md:border-r border-slate-200 dark:border-[#24392F] md:pr-6 space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9DB3A7]">
                Estimated Listening Band
              </span>
              <Badge variant={attempt.bandEstimate >= targetBand ? 'success' : 'primary'} size="xs">
                {attempt.bandEstimate >= targetBand ? 'Target Achieved' : `Target: Band ${targetBand}`}
              </Badge>
            </div>

            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <AnimatedCounter
                value={attempt.bandEstimate}
                decimals={1}
                className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-[#124F40] dark:text-[#5BB78D]"
              />
              <span className="text-xl font-mono text-slate-400 font-semibold">/ 9.0</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-[#9DB3A7]">
              Scored with official IELTS Listening conversion tables across 4 recording sections.
            </p>
          </div>

          {/* Circular Accuracy Progress Meter (4 cols) */}
          <div className="md:col-span-4 flex items-center justify-center md:border-r border-slate-200 dark:border-[#24392F] md:pr-6">
            <CircularAccuracyMeter
              accuracyPercentage={accuracyPct}
              score={attempt.score}
              total={attempt.totalQuestions}
              color="brand"
              size={115}
              strokeWidth={10}
              label="Listening Accuracy"
            />
          </div>

          {/* Metrics summary (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-center md:text-left">
            <div>
              <span className="text-2xs uppercase tracking-wider text-slate-400 font-bold block">
                Time Elapsed
              </span>
              <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                {formatSecondsToTime(attempt.timeSpentSeconds)}
              </span>
              <span className="text-2xs text-slate-400 block">Exam Standard: 40:00</span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-2xs uppercase tracking-wider text-slate-400 font-bold block">
                Target Delta
              </span>
              <span className="text-xs font-bold font-mono text-sky-600 dark:text-sky-400">
                {attempt.bandEstimate >= targetBand
                  ? `+${(attempt.bandEstimate - targetBand).toFixed(1)} above target`
                  : `-${(targetBand - attempt.bandEstimate).toFixed(1)} to target band`}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. "What To Do Next" Strategy Card with 3 Specific Actions */}
      <WhatToDoNextCard
        module="listening"
        incorrectCount={incorrectCount}
        weakestType={weakestType}
        targetBand={targetBand}
        currentBand={attempt.bandEstimate}
        onFilterIncorrect={() => {
          setFilterMode('incorrect');
          const el = document.getElementById('listening-question-review');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onRetake={() => navigate(`/practice/listening/test/${test.id}?mode=exam`)}
      />

      {/* 3. Accuracy Breakdown by Task Type */}
      <Card className="p-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-sky-600" />
          Accuracy Breakdown by Listening Task
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {typeBreakdown.map((item) => {
            const pct = Math.round((item.correct / item.total) * 100);
            return (
              <div
                key={item.type}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {LISTENING_QUESTION_TYPE_LABELS[item.type] || item.type}
                  </span>
                  <span className="font-mono font-bold text-slate-600 dark:text-slate-400">
                    {item.correct}/{item.total}
                  </span>
                </div>
                <ProgressBar
                  value={pct}
                  variant={pct >= 80 ? 'teal' : pct >= 60 ? 'navy' : 'amber'}
                  size="sm"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* 3b. Automatic Low-Accuracy Strategy Mini-Lesson Prompt (< 50% accuracy) */}
      {lowestAccuracyTypeItem && (
        <LowAccuracyLessonPrompt
          questionType={lowestAccuracyTypeItem.type}
          accuracyPercent={Math.round((lowestAccuracyTypeItem.correct / lowestAccuracyTypeItem.total) * 100)}
          onOpenLesson={() => {
            const lesson = getLessonByQuestionType(lowestAccuracyTypeItem.type);
            if (lesson) setActiveLesson(lesson);
          }}
        />
      )}

      {/* 4. Color-Coded Question List with Audio Snippet Replay */}
      <div id="listening-question-review" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Color-Coded Question Review & Audio Proof Snippets
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click "Listen to this part again" to replay the exact speech line containing the answer.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              All ({detailedQuestions.length})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'incorrect'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Incorrect ({incorrectCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Correct ({detailedQuestions.filter((q) => q.isCorrect).length})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {filteredQuestions.map((item) => {
            const q = item.questionDef;
            if (!q) return null;

            const isSpeakingThis = speakingSnippetId === q.id;

            return (
              <Card
                key={item.questionId}
                className={`p-5 border transition-all ${
                  item.isCorrect
                    ? 'border-emerald-200 dark:border-emerald-950/60 bg-white dark:bg-[#112019]'
                    : 'border-rose-200 dark:border-rose-950/60 bg-[#FDF2F1]/80 dark:bg-[#2D1412]/40'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-lg text-white font-mono text-xs font-bold ${
                        item.isCorrect ? 'bg-[#1E9E63]' : 'bg-[#D1453B]'
                      }`}
                    >
                      {q.questionNumber}
                    </span>
                    <Badge variant="navy">Section {q.sectionNumber}</Badge>
                    <span className="text-xs text-slate-400 font-medium uppercase">
                      {q.type.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold">
                    {item.isCorrect ? (
                      <span className="text-[#1E9E63] dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-[#D1453B] dark:text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                {/* Prompt */}
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  {q.prompt}
                </p>

                {/* Shuffled Options Review List */}
                {(item.options || q.options) && (item.options || q.options).length > 0 && q.type === 'multiple_choice_single' && (
                  <div className="space-y-2 mb-4">
                    {(item.options || q.options).map((optText: string, oIdx: number) => {
                      const displayLetter = String.fromCharCode(65 + oIdx);
                      const isOptionCorrect = isListeningAnswerCorrect(optText, q.correctAnswer, q.type, q.options);
                      const isOptionSelected =
                        cleanOptionText(item.userAnswer).toLowerCase() === cleanOptionText(optText).toLowerCase() ||
                        item.userAnswer?.toUpperCase() === displayLetter;

                      let rowClass = 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300';
                      if (isOptionCorrect) {
                        rowClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        rowClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={oIdx}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs transition-all ${rowClass}`}
                        >
                          <span className="font-mono font-bold text-slate-400">
                            {displayLetter}.
                          </span>
                          <span className="flex-1">{cleanOptionText(optText)}</span>
                          {isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                          {isOptionSelected && !isOptionCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Answers comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Your Spoken / Typed Answer
                    </span>
                    <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                      {item.userAnswer?.trim() ? (
                        <span className={item.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                          {item.userAnswer}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic font-sans font-normal">
                          (Unanswered)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Correct Answer
                    </span>
                    <div className="text-sm font-mono font-bold text-emerald-800 dark:text-emerald-300">
                      {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' / ') : q.correctAnswer}
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="mb-3 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white block mb-1">
                      Explanation:
                    </strong>
                    {q.explanation}
                  </div>
                )}

                {/* Exact Audio Script Evidence with Audio Button */}
                {q.evidence && (
                  <div className="p-3.5 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/60 text-xs text-sky-950 dark:text-sky-200 leading-relaxed space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-sky-700 dark:text-sky-300">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Script Line Evidence (Section {q.sectionNumber}):</span>
                      </div>

                      {/* Listen to this part again button */}
                      <Button
                        variant="secondary"
                        size="sm"
                        isLoading={isSpeakingThis}
                        onClick={() => handlePlayEvidence(q.id, q.evidence)}
                        leftIcon={<Volume2 className="w-3.5 h-3.5 text-sky-600" />}
                        className="text-xs h-8 bg-white dark:bg-slate-900 border border-sky-300 dark:border-sky-700 hover:bg-sky-50"
                      >
                        Listen to this part again
                      </Button>
                    </div>

                    <blockquote className="italic border-l-2 border-sky-500 pl-2.5 my-1 text-sky-900 dark:text-sky-100">
                      "{q.evidence}"
                    </blockquote>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Shareable Progress Card Modal */}
      <ShareableProgressCard
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        candidateName={profile?.displayName || 'IELTS Candidate'}
        overallBand={attempt.bandEstimate}
        targetBand={targetBand}
        streakDays={5}
        skills={{
          listening: attempt.bandEstimate,
          reading: 7.0,
          writing: 6.5,
          speaking: 6.5,
        }}
        testsCompleted={1}
        accuracyPercentage={accuracyPct}
      />

      {/* Strategy Mini-Lesson Modal */}
      {activeLesson && (
        <QuestionMiniLessonModal
          lesson={activeLesson}
          isOpen={true}
          onClose={() => setActiveLesson(null)}
          accuracyPercent={
            lowestAccuracyTypeItem
              ? Math.round((lowestAccuracyTypeItem.correct / lowestAccuracyTypeItem.total) * 100)
              : undefined
          }
        />
      )}
    </div>
  );
}
