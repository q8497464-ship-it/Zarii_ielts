import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Play,
  Pause,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  ListChecks,
  SpellCheck,
  Loader2,
  Save,
  Maximize2,
  Minimize2,
  Columns,
  Square,
  Eye,
  Sliders,
  ChevronRight,
  ShieldAlert,
  PenTool,
} from 'lucide-react';
import { getWritingPromptById } from './writingContent';
import { WritingChartViewer } from './WritingChartViewer';
import { evaluateWriting } from './aiEvaluator';
import { copy } from '../../lib/copy';
import { db, debouncedSave } from '../../lib/db';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';
import type { WritingPromptContent, WritingSubmission } from '../../types';
import { ExamTestSetupModal } from '../../components/exam';
import { ParaphrasePracticeModal } from './ParaphrasePracticeModal';
import { Task2IdeaGeneratorModal } from './Task2IdeaGeneratorModal';
import { Lightbulb } from 'lucide-react';
import { recordDailyActivity, awardXp, recordWeeklyChallengeProgress } from '../habits/habitEngine';

export function WritingEditor() {
  const { promptId } = useParams<{ promptId: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const [prompt, setPrompt] = useState<WritingPromptContent | null>(null);
  const [essayText, setEssayText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(true);

  // View modes
  const [viewMode, setViewMode] = useState<'split' | 'full'>('split');
  const [mobileTab, setMobileTab] = useState<'editor' | 'prompt'>('editor');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showPromptDrawer, setShowPromptDrawer] = useState(false);
  const [showPlanningGuide, setShowPlanningGuide] = useState(true);
  const [showChecklist, setShowChecklist] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-save state
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [saveStatusText, setSaveStatusText] = useState('All changes saved locally');

  // Timer states
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [isUntimed, setIsUntimed] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isParaphraseModalOpen, setIsParaphraseModalOpen] = useState(false);
  const [isIdeaGenModalOpen, setIsIdeaGenModalOpen] = useState(false);

  const draftKey = `zarii_writing_draft_${promptId}`;

  // Load prompt
  useEffect(() => {
    if (!promptId) return;
    const found = getWritingPromptById(promptId);
    if (found) {
      setPrompt(found);
    } else {
      setPrompt(null);
    }

    // Load draft if exists
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      setEssayText(savedDraft);
      setLastSavedTime(new Date());
    }
  }, [promptId, draftKey]);

  // Timer interval
  useEffect(() => {
    if (!timerRunning || isUntimed) return;
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, isUntimed]);

  // Safe debounced autosave of draft on text change
  useEffect(() => {
    if (!promptId) return;
    setIsSaving(true);
    setSaveStatusText('Saving draft...');

    debouncedSave(
      `draft_${promptId}`,
      async () => {
        localStorage.setItem(draftKey, essayText);
        setIsSaving(false);
        setLastSavedTime(new Date());
      },
      800
    );
  }, [essayText, promptId, draftKey]);

  // Dynamic "Saved Xs ago" ticker
  useEffect(() => {
    const updateTicker = () => {
      if (isSaving) return;
      if (!lastSavedTime) {
        setSaveStatusText('All changes saved locally');
        return;
      }
      const secondsAgo = Math.floor((Date.now() - lastSavedTime.getTime()) / 1000);
      if (secondsAgo < 5) {
        setSaveStatusText('Saved just now');
      } else if (secondsAgo < 60) {
        setSaveStatusText(`Saved ${secondsAgo}s ago`);
      } else {
        const mins = Math.floor(secondsAgo / 60);
        setSaveStatusText(`Saved ${mins}m ago`);
      }
    };

    updateTicker();
    const interval = setInterval(updateTicker, 5000);
    return () => clearInterval(interval);
  }, [lastSavedTime, isSaving]);

  // Keyboard shortcut for Focus Mode (Esc exits focus mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode]);

  if (!prompt) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Prompt Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The requested writing task could not be located.
        </p>
        <Link
          to="/practice/writing"
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Writing Hub
        </Link>
      </div>
    );
  }

  const minWords = prompt.minWordCount || (prompt.taskType === 'task2' ? 250 : 150);
  const targetSeconds = (prompt.recommendedMinutes || (prompt.taskType === 'task2' ? 40 : 20)) * 60;
  const remainingSeconds = Math.max(0, targetSeconds - timeSpent);

  // Live word counter
  const words = essayText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Word count color state logic
  let wordCountColorState: 'under' | 'approaching' | 'satisfied' = 'under';
  if (wordCount >= minWords + 30) {
    wordCountColorState = 'satisfied';
  } else if (wordCount >= minWords) {
    wordCountColorState = 'approaching';
  } else {
    wordCountColorState = 'under';
  }

  // Format time
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleClearDraft = () => {
    if (window.confirm('Are you sure you want to clear your current draft?')) {
      setEssayText('');
      localStorage.removeItem(draftKey);
      setLastSavedTime(new Date());
    }
  };

  const handleSubmitEvaluation = async () => {
    if (wordCount < 20) {
      const msg = copy.errors.wordCountLow;
      setSubmitError(msg);
      addToast({
        type: 'warning',
        title: 'More Text Required',
        message: msg,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const feedback = await evaluateWriting(essayText, prompt);

      const submission: WritingSubmission = {
        promptId: prompt.id,
        taskType: prompt.taskType,
        promptTitle: prompt.title,
        promptBody: prompt.promptText,
        essayText,
        wordCount,
        targetTimeSeconds: targetSeconds,
        timeSpentSeconds: timeSpent,
        submittedAt: new Date().toISOString(),
        bandEstimate: feedback.overallBand,
        feedback,
      };

      const newId = await db.writingSubmissions.add(submission);
      localStorage.removeItem(draftKey);

      // Record daily study activity, XP, and weekly sprint progress
      const minsSpent = Math.max(1, Math.round(timeSpent / 60));
      recordDailyActivity(minsSpent);
      const earnedXp = Math.round(75 + (feedback.overallBand || 6) * 10);
      awardXp(earnedXp);
      recordWeeklyChallengeProgress('writing', 1);

      addToast({
        type: 'success',
        title: 'Essay Evaluated!',
        message: `Your essay has been scored: Band ${feedback.overallBand?.toFixed(1) || '6.5'}. Quoted criterion feedback is ready.`,
      });

      navigate(`/practice/writing/submission/${newId}`);
    } catch (err: any) {
      console.error('Submission failed:', err);
      const friendlyMessage = copy.errors.evaluationFailed;
      setSubmitError(friendlyMessage);
      addToast({
        type: 'error',
        title: 'Evaluation Issue',
        message: friendlyMessage,
      });
      setIsSubmitting(false);
    }
  };

  const isTimerUrgent = remainingSeconds <= 300 && !isUntimed;
  const isTimerAmber = remainingSeconds <= 600 && remainingSeconds > 300 && !isUntimed;

  return (
    <div className={cn('min-h-screen transition-colors', isFocusMode ? 'bg-[#0B1612] text-slate-100' : 'bg-[#F7FAF8] dark:bg-[#0B1612] pb-16')}>
      {/* 1. Official CD-IELTS Writing Header (Hidden in deep focus mode, or minimal in focus mode) */}
      {!isFocusMode ? (
        <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white px-4 py-2.5 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/practice/writing"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Return to Writing Hub"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800/80">
                    {prompt.taskType === 'task2' ? 'Task 2 Essay' : 'Task 1 Report'}
                  </span>
                  <span className="text-2xs text-slate-400 hidden sm:inline">
                    Required: {minWords}+ words
                  </span>
                </div>
                <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[85px] xs:max-w-xs sm:max-w-md">
                  {prompt.title}
                </h1>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Auto-Save Indicator */}
              <div className="hidden md:flex items-center gap-1.5 text-2xs text-slate-400 font-mono">
                <Save className="w-3.5 h-3.5 text-brand-300" />
                <span>{saveStatusText}</span>
              </div>

              {/* View Layout Toggle (Split vs Full-Width) */}
              <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-slate-800 border border-slate-700">
                <button
                  onClick={() => setViewMode('split')}
                  className={cn(
                    'px-2.5 py-1 text-2xs font-semibold rounded flex items-center gap-1 transition-all',
                    viewMode === 'split' ? 'bg-[#124F40] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  )}
                  title="Split view (prompt on left, editor on right)"
                >
                  <Columns className="w-3 h-3" />
                  <span>Split</span>
                </button>
                <button
                  onClick={() => setViewMode('full')}
                  className={cn(
                    'px-2.5 py-1 text-2xs font-semibold rounded flex items-center gap-1 transition-all',
                    viewMode === 'full' ? 'bg-[#124F40] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  )}
                  title="Calm full-width zen editor"
                >
                  <Square className="w-3 h-3" />
                  <span>Full Width</span>
                </button>
              </div>

              {/* Focus Mode Button */}
              <button
                onClick={() => setIsFocusMode(true)}
                className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium items-center gap-1 transition-colors"
                title="Enter distraction-free Focus Mode (Esc to exit)"
              >
                <Maximize2 className="w-3.5 h-3.5 text-brand-300" />
                <span>Focus Mode</span>
              </button>

              {/* Live Save Status */}
              <span
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="hidden xl:inline text-2xs font-mono text-slate-400"
              >
                {saveStatusText}
              </span>

              {/* Countdown Timer with CD-IELTS Urgency Colors */}
              <div
                className={cn(
                  'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all',
                  isTimerUrgent
                    ? 'bg-[#CF5C45] text-white border border-[#D1453B] animate-pulse'
                    : isTimerAmber
                    ? 'bg-amber-950 text-amber-300 border border-amber-600'
                    : 'bg-[#124F40] text-white border border-[#17634F]'
                )}
              >
                <Clock className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                <span>{!isUntimed ? formatTime(remainingSeconds) : 'Untimed'}</span>
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="p-0.5 text-slate-400 hover:text-white ml-0.5"
                  title={timerRunning ? 'Pause timer' : 'Resume timer'}
                >
                  {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>

              {/* Word Count with Color States */}
              <div
                className={cn(
                  'flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-colors border',
                  wordCountColorState === 'under'
                    ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                    : wordCountColorState === 'approaching'
                    ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                    : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                )}
                title={`Word requirement: ${minWords} words`}
              >
                <span>{wordCount}</span>
                <span className="text-[10px] opacity-75">/{minWords}</span>
                {wordCountColorState === 'satisfied' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 hidden xs:inline" />
                )}
              </div>

              {/* Evaluate Button */}
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmitEvaluation}
                isLoading={isSubmitting}
                className="bg-brand-800 hover:bg-brand-700 text-white font-semibold text-xs h-8 px-2.5 sm:px-3 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 hidden xs:inline mr-1" />
                Evaluate
              </Button>
            </div>
          </div>
        </header>
      ) : (
        /* Minimal Focus Mode Header */
        <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFocusMode(false)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-2xs font-medium"
            >
              <Minimize2 className="w-3 h-3 text-teal-400" />
              <span>Exit Focus Mode (Esc)</span>
            </button>
            <button
              onClick={() => setShowPromptDrawer(!showPromptDrawer)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-2xs font-medium"
            >
              <Eye className="w-3 h-3 text-teal-400" />
              <span>{showPromptDrawer ? 'Hide Prompt' : 'View Prompt'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-2xs font-mono text-slate-500"
            >
              {saveStatusText}
            </span>

            {/* Word count */}
            <div
              className={cn(
                'px-2 py-0.5 rounded font-mono text-xs font-bold',
                wordCountColorState === 'under'
                  ? 'text-rose-400'
                  : wordCountColorState === 'approaching'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              )}
            >
              {wordCount} / {minWords} words
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1 font-mono text-xs text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded">
              <Clock className="w-3 h-3 text-teal-400" />
              <span>{!isUntimed ? formatTime(remainingSeconds) : 'Untimed'}</span>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmitEvaluation}
              isLoading={isSubmitting}
              className="bg-teal-600 hover:bg-teal-500 text-white font-semibold text-2xs h-7 px-3"
            >
              Finish & Evaluate
            </Button>
          </div>
        </header>
      )}

      {/* Focus Mode Floating Prompt Drawer */}
      {isFocusMode && showPromptDrawer && (
        <div className="fixed top-12 left-4 right-4 z-40 max-w-2xl mx-auto p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              {prompt.title}
            </span>
            <button
              onClick={() => setShowPromptDrawer(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              Close
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {prompt.promptText}
          </p>
        </div>
      )}

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        {submitError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Mobile View Switcher (< lg) */}
        {!isFocusMode && (
          <div className="lg:hidden flex items-center p-1 mb-3 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setMobileTab('editor')}
              className={cn(
                'flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all min-h-[40px]',
                mobileTab === 'editor'
                  ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Essay Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('prompt')}
              className={cn(
                'flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all min-h-[40px]',
                mobileTab === 'prompt'
                  ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Task Prompt & Hints</span>
            </button>
          </div>
        )}

        <div className={cn('gap-6 lg:gap-8', viewMode === 'split' && !isFocusMode ? 'grid grid-cols-1 lg:grid-cols-12 items-start' : 'max-w-4xl mx-auto')}>
          {/* Left Column: Prompt, Chart & Strategy (Split View reference column) */}
          {viewMode === 'split' && !isFocusMode && (
            <div className={cn('lg:col-span-5 space-y-4 lg:sticky lg:top-20', mobileTab === 'prompt' ? 'block' : 'hidden lg:block')}>
              {/* Prompt Card */}
              <div className="bg-slate-50/90 dark:bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 dark:border-slate-800/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    Official Task Instructions
                  </span>
                  <span className="text-2xs font-medium px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Target: {prompt.recommendedMinutes}m
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {prompt.promptText}
                </p>

                {/* Academic Chart Viewer */}
                {prompt.taskType === 'task1_academic' && <WritingChartViewer prompt={prompt} />}

                {/* Brainstorming & Paraphrase Quick Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsParaphraseModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-300 dark:border-teal-700 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 text-xs font-semibold hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Paraphrase Practice
                  </button>
                  {prompt.taskType === 'task2' && (
                    <button
                      type="button"
                      onClick={() => setIsIdeaGenModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-300 dark:border-brand-700 bg-brand-50 dark:bg-brand-950/40 text-brand-800 dark:text-brand-200 text-xs font-semibold hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors shadow-2xs"
                    >
                      <Lightbulb className="w-3.5 h-3.5" /> Brainstorm Task 2 Ideas
                    </button>
                  )}
                </div>
              </div>

              {/* Planning Guide Accordion */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <button
                  onClick={() => setShowPlanningGuide(!showPlanningGuide)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      Band 8+ Paragraph Structure & Strategy
                    </span>
                  </div>
                  <span className="text-2xs text-slate-500">{showPlanningGuide ? 'Hide' : 'Show'}</span>
                </button>

                {showPlanningGuide && prompt.planningGuide && (
                  <div className="p-4 pt-0 space-y-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    {prompt.planningGuide.map((step, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                        <span className="font-bold text-teal-700 dark:text-teal-300 block mb-0.5">
                          {step.paragraph}: {step.focus}
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.tips}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checklist Accordion */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <button
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      Examiner Checklist
                    </span>
                  </div>
                  <span className="text-2xs text-slate-500">{showChecklist ? 'Hide' : 'Show'}</span>
                </button>

                {showChecklist && prompt.checklist && (
                  <div className="p-4 pt-0 space-y-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    {prompt.checklist.map((item, idx) => (
                      <label
                        key={idx}
                        className="flex items-start gap-2 text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right Column (or Full Width): Calm Editor Canvas */}
          <div className={cn('flex flex-col space-y-3', viewMode === 'split' && !isFocusMode ? 'lg:col-span-7' : 'w-full', mobileTab === 'editor' ? 'flex' : 'hidden lg:flex')}>
            {/* Full-width mode collapsible prompt banner */}
            {viewMode === 'full' && !isFocusMode && (
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                    {prompt.title}
                  </span>
                  <Badge variant="slate">{prompt.recommendedMinutes} mins recommended</Badge>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {prompt.promptText}
                </p>
                {prompt.taskType === 'task1_academic' && <WritingChartViewer prompt={prompt} />}
              </div>
            )}

            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-t-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Mobile Quick Switch to Prompt */}
                <button
                  type="button"
                  onClick={() => setMobileTab('prompt')}
                  className="lg:hidden flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-2xs font-semibold"
                  title="View task prompt & instructions"
                >
                  <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                  <span>Prompt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSpellCheckEnabled(!spellCheckEnabled)}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded transition-colors text-2xs sm:text-xs',
                    spellCheckEnabled
                      ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 font-semibold'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                  title="Toggle browser spellcheck"
                >
                  <SpellCheck className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Spellcheck</span> {spellCheckEnabled ? 'On' : 'Off'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsUntimed(!isUntimed)}
                  className={cn(
                    'px-2 py-1 rounded transition-colors text-2xs font-medium',
                    isUntimed
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  {isUntimed ? 'Untimed' : 'Timed Exam'}
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Save className="w-3 h-3 text-teal-500" />
                  <span className="hidden xs:inline">{saveStatusText}</span>
                </span>

                <button
                  type="button"
                  onClick={handleClearDraft}
                  className="text-rose-500 hover:text-rose-700 transition-colors text-[11px] font-medium"
                >
                  Clear Draft
                </button>
              </div>
            </div>

            {/* Tranquil Text Area */}
            <div className="relative flex-1 bg-white dark:bg-slate-900 rounded-b-xl border-x border-b border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <textarea
                ref={textareaRef}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                onFocus={() => {
                  setTimeout(() => {
                    textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }, 250);
                }}
                spellCheck={spellCheckEnabled}
                placeholder={`Type your response here...\n\nOrganise your answer into clear logical paragraphs. Minimum word requirement: ${minWords} words.`}
                className={cn(
                  'w-full flex-1 p-4 sm:p-6 pb-28 sm:pb-6 rounded-b-xl resize-none font-reading text-base sm:text-lg leading-relaxed bg-transparent focus:outline-none focus:ring-0',
                  isFocusMode
                    ? 'text-slate-100 placeholder:text-slate-600 min-h-[480px] sm:min-h-[550px]'
                    : 'text-slate-800 dark:text-slate-100 placeholder:text-slate-400 min-h-[380px] sm:min-h-[480px]'
                )}
              />

              {/* Bottom Status Ribbon with Real-time Word Count States */}
              <div className="px-5 py-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/80 dark:bg-slate-900/80 rounded-b-xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={cn(
                      'px-2.5 py-1 rounded-md border text-xs font-bold inline-flex items-center gap-1.5 transition-colors',
                      wordCountColorState === 'under'
                        ? 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-800'
                        : wordCountColorState === 'approaching'
                        ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-200 dark:border-emerald-800'
                    )}
                  >
                    <span>Words: {wordCount}</span>
                    <span className="opacity-75 font-normal">/ {minWords} min</span>
                    {wordCountColorState === 'under' && (
                      <span className="text-2xs font-medium opacity-90">({minWords - wordCount} more needed)</span>
                    )}
                    {wordCountColorState === 'approaching' && (
                      <span className="text-2xs font-semibold">(Min requirement met)</span>
                    )}
                    {wordCountColorState === 'satisfied' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                    )}
                  </span>

                  <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>

                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Paragraphs:{' '}
                    <strong className="text-slate-900 dark:text-white font-bold">
                      {essayText.trim() ? essayText.trim().split(/\n\s*\n/).filter(Boolean).length : 0}
                    </strong>
                  </span>
                </div>

                <span className="text-2xs text-slate-400 dark:text-slate-500 hidden sm:inline font-mono">
                  Auto-saved to local IndexedDB
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Setup modal */}
      <ExamTestSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        requiredChecks={['fullscreen']}
        title="IELTS Writing Environment Setup"
      />

      {/* Paraphrase Practice Modal */}
      <ParaphrasePracticeModal
        isOpen={isParaphraseModalOpen}
        onClose={() => setIsParaphraseModalOpen(false)}
        defaultTaskType={prompt.taskType === 'task2' ? 'task2' : 'task1'}
      />

      {/* Task 2 Idea Generator Modal */}
      <Task2IdeaGeneratorModal
        isOpen={isIdeaGenModalOpen}
        onClose={() => setIsIdeaGenModalOpen(false)}
        initialTopic={prompt.title}
      />
    </div>
  );
}
