import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  Flag,
  FileText,
  Highlighter,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
  HelpCircle,
  Eye,
  Check,
  Bookmark,
  Sparkles,
  BookOpen,
  X,
  Type,
  Minimize2,
  Maximize2,
  Trash2,
  Plus,
  MessageSquare,
  Sliders,
  AlignJustify,
} from 'lucide-react';
import { getReadingTestById } from './readingContent';
import { evaluateReadingAttempt, isAnswerCorrect } from './marking';
import { shuffleMcqOptions } from '../../lib/mcqShuffle';
import { db } from '../../lib/db';
import {
  saveActiveTestProgress,
  loadActiveTestProgress,
  clearActiveTestProgress,
} from '../../lib/readingProgress';
import { recordDailyActivity, awardXp, recordWeeklyChallengeProgress } from '../habits/habitEngine';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { cn, formatSecondsToTime } from '../../lib/utils';
import type { BaseQuestion, QuestionType } from '../../types';
import {
  ExamHeader,
  ExamBottomNav,
  ExamReviewModal,
  ExamTestSetupModal,
  type ExamQuestionItem,
} from '../../components/exam';
import { TimingCoach } from '../adaptive/TimingCoach';
import { recordQuestionResponses } from '../adaptive/adaptiveTracker';

export interface TextHighlightItem {
  id: string;
  passageNumber: number;
  text: string;
  color: 'yellow' | 'green' | 'pink';
  note?: string;
}

export function ReadingTestRunner() {
  const { testId } = useParams<{ testId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const isExamMode = searchParams.get('mode') === 'exam';

  const test = useMemo(() => {
    return testId ? getReadingTestById(testId) : undefined;
  }, [testId]);

  // Current passage tab (0 = Passage 1, 1 = Passage 2, 2 = Passage 3)
  const [activePassageIndex, setActivePassageIndex] = useState<number>(0);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number>(1);

  // User state
  const [attemptSeed, setAttemptSeed] = useState<string>(() => {
    if (testId) {
      const cached = loadActiveTestProgress(testId);
      if (cached?.attemptSeed) return cached.attemptSeed;
    }
    return `reading_${testId}_${Date.now()}`;
  });
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<string>('');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    isExamMode ? (test?.timeLimitMinutes || 60) * 60 : 3600
  );
  const [questionTimeMap, setQuestionTimeMap] = useState<Record<string, number>>({});

  // Passage highlights
  const [highlights, setHighlights] = useState<Record<number, TextHighlightItem[]>>({});
  const [floatingNoteText, setFloatingNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // UI state
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileView, setMobileView] = useState<'passage' | 'questions'>('passage');

  // Passage styling controls
  const [fontScale, setFontScale] = useState<number>(1); // 0.9, 1, 1.15, 1.3
  const [lineSpacing, setLineSpacing] = useState<'normal' | 'relaxed' | 'loose'>('relaxed');

  // Draggable Split View
  const [splitRatio, setSplitRatio] = useState<number>(50); // percentage for passage pane
  const isDraggingRef = useRef(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  // Responsive mobile screen tracking for clean viewport split
  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Floating text selection toolbar state
  const [selectionRange, setSelectionRange] = useState<string | null>(null);
  const passageContainerRef = useRef<HTMLDivElement>(null);

  // Flatten all questions for indexing & navigation
  const allQuestions = useMemo(() => {
    if (!test) return [];
    return test.passages.flatMap((p) =>
      p.questionGroups.flatMap((g) =>
        g.questions.map((q) => ({
          ...q,
          passageNumber: p.passageNumber,
          groupInstruction: g.groupInstruction,
        }))
      )
    );
  }, [test]);

  const examQuestionItems: ExamQuestionItem[] = useMemo(() => {
    return allQuestions.map((q) => ({
      id: q.id,
      questionNumber: q.questionNumber,
      sectionOrPassage: q.passageNumber,
    }));
  }, [allQuestions]);

  // 1. Restore previous progress on mount
  useEffect(() => {
    if (!testId) return;
    const cached = loadActiveTestProgress(testId);
    if (cached) {
      if (cached.attemptSeed) {
        setAttemptSeed(cached.attemptSeed);
      }
      setUserAnswers(cached.answers || {});
      setFlaggedQuestions(new Set(cached.flagged || []));
      setNotes(cached.notes || '');
      // Compatibility with string[] highlights
      if (cached.highlights) {
        const normalized: Record<number, TextHighlightItem[]> = {};
        Object.entries(cached.highlights).forEach(([k, v]) => {
          const passNum = parseInt(k, 10);
          if (Array.isArray(v)) {
            normalized[passNum] = v.map((item: any, idx) => {
              if (typeof item === 'string') {
                return {
                  id: `hl-${passNum}-${idx}`,
                  passageNumber: passNum,
                  text: item,
                  color: 'yellow' as const,
                };
              }
              return item;
            });
          }
        });
        setHighlights(normalized);
      }
      if (isExamMode && cached.secondsLeft > 0) {
        setSecondsRemaining(cached.secondsLeft);
      }
      addToast({
        type: 'info',
        title: 'Progress Restored',
        message: 'Your previous answers, flags, and highlights have been loaded.',
      });
    }
  }, [testId, isExamMode, addToast]);

  // 2. Auto-save answers, flags, notes, and highlights whenever they change
  useEffect(() => {
    if (!testId) return;
    saveActiveTestProgress({
      testId,
      answers: userAnswers,
      flagged: Array.from(flaggedQuestions),
      secondsLeft: secondsRemaining,
      notes,
      highlights: highlights as any,
      updatedAt: new Date().toISOString(),
      attemptSeed,
    });
  }, [testId, userAnswers, flaggedQuestions, secondsRemaining, notes, highlights, attemptSeed]);

  // Timer countdown
  useEffect(() => {
    if (!isExamMode || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamMode, secondsRemaining]);

  // Draggable Divider Mouse Event Listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const newRatio = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitRatio(Math.min(75, Math.max(25, newRatio)));
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  if (!test) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Reading Test Not Found</h2>
        <Button variant="primary" onClick={() => navigate('/practice/reading')}>
          Back to Reading Hub
        </Button>
      </div>
    );
  }

  const currentPassage = test.passages[activePassageIndex];

  // Answer handler
  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Flag toggle
  const toggleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  // Jump to specific question
  const jumpToQuestion = (qNumber: number) => {
    setActiveQuestionNumber(qNumber);
    const targetQ = allQuestions.find((q) => q.questionNumber === qNumber);
    if (!targetQ) return;

    // Switch to corresponding passage tab if needed
    const passageIdx = targetQ.passageNumber - 1;
    if (passageIdx !== activePassageIndex) {
      setActivePassageIndex(passageIdx);
    }

    setMobileView('questions');

    // Scroll to question element
    setTimeout(() => {
      const el = document.getElementById(`question-card-${targetQ.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-teal-500');
        setTimeout(() => el.classList.remove('ring-2', 'ring-teal-500'), 1500);
      }
    }, 100);
  };

  // Text selection listener for highlighter
  const handlePassageMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectionRange(null);
      return;
    }
    const text = selection.toString().trim();
    if (text.length > 2) {
      setSelectionRange(text);
    } else {
      setSelectionRange(null);
    }
  };

  const applyHighlight = (color: 'yellow' | 'green' | 'pink', noteText?: string) => {
    if (!selectionRange) return;
    const passageNum = currentPassage.passageNumber;
    const newHighlight: TextHighlightItem = {
      id: `hl-${Date.now()}`,
      passageNumber: passageNum,
      text: selectionRange,
      color,
      note: noteText || undefined,
    };

    setHighlights((prev) => ({
      ...prev,
      [passageNum]: [...(prev[passageNum] || []), newHighlight],
    }));

    setSelectionRange(null);
    setIsAddingNote(false);
    setFloatingNoteText('');
    window.getSelection()?.removeAllRanges();

    addToast({
      type: 'info',
      title: 'Text Highlighted',
      message: noteText ? 'Snippet highlighted with note.' : 'Snippet highlighted in passage text.',
      duration: 2000,
    });
  };

  const clearCurrentPassageHighlights = () => {
    const passageNum = currentPassage.passageNumber;
    setHighlights((prev) => ({
      ...prev,
      [passageNum]: [],
    }));
    addToast({
      type: 'info',
      title: 'Highlights Cleared',
      message: `Cleared all highlights for Passage ${passageNum}.`,
      duration: 2000,
    });
  };

  const removeSingleHighlight = (id: string) => {
    const passageNum = currentPassage.passageNumber;
    setHighlights((prev) => ({
      ...prev,
      [passageNum]: (prev[passageNum] || []).filter((h) => h.id !== id),
    }));
  };

  // Render passage with interactive colored highlights & notes
  const renderHighlightedPassageText = (rawText: string) => {
    const passageNum = currentPassage.passageNumber;
    const currentHighlights = highlights[passageNum] || [];

    if (currentHighlights.length === 0) {
      return (
        <div className="space-y-4 whitespace-pre-line text-slate-800 dark:text-slate-200">
          {rawText}
        </div>
      );
    }

    // Split raw text by paragraphs
    const paragraphs = rawText.split('\n\n');

    return (
      <div className="space-y-5">
        {paragraphs.map((p, pIdx) => {
          let elements: React.ReactNode[] = [p];

          currentHighlights.forEach((hl) => {
            const newElements: React.ReactNode[] = [];
            elements.forEach((el) => {
              if (typeof el !== 'string') {
                newElements.push(el);
                return;
              }

              const parts = el.split(hl.text);
              if (parts.length <= 1) {
                newElements.push(el);
                return;
              }

              parts.forEach((part, idx) => {
                if (idx > 0) {
                  const colorClass =
                    hl.color === 'yellow'
                      ? 'bg-amber-200 text-amber-950 dark:bg-amber-900/60 dark:text-amber-200'
                      : hl.color === 'green'
                      ? 'bg-emerald-200 text-emerald-950 dark:bg-emerald-900/60 dark:text-emerald-200'
                      : 'bg-rose-200 text-rose-950 dark:bg-rose-900/60 dark:text-rose-200';

                  newElements.push(
                    <mark
                      key={`${hl.id}-${idx}`}
                      className={cn(
                        'rounded px-1 py-0.5 relative group inline-block font-medium cursor-pointer transition-colors',
                        colorClass
                      )}
                      title={hl.note ? `Note: ${hl.note}` : 'Click X to remove highlight'}
                    >
                      {hl.text}
                      {hl.note && (
                        <span className="ml-1 inline-flex items-center text-2xs bg-white/80 dark:bg-black/60 px-1 rounded font-sans text-slate-700 dark:text-slate-200">
                          📝 {hl.note}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSingleHighlight(hl.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 ml-1 text-slate-500 hover:text-rose-600 font-bold text-xs"
                      >
                        ×
                      </button>
                    </mark>
                  );
                }
                if (part) newElements.push(part);
              });
            });
            elements = newElements;
          });

          return (
            <p key={pIdx} className="whitespace-pre-line text-slate-800 dark:text-slate-200">
              {elements}
            </p>
          );
        })}
      </div>
    );
  };

  // Submit test
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const evaluationItems = allQuestions.map((q) => ({
        questionId: q.id,
        questionType: q.type,
        passageNumber: q.passageNumber,
        userAnswer: userAnswers[q.id] || '',
        correctAnswer: q.correctAnswer,
        options: q.options,
      }));

      const result = evaluateReadingAttempt(evaluationItems, test.testType, allQuestions.length);

      const attemptRecord = {
        testId: test.id,
        testType: test.testType,
        module: 'reading' as const,
        title: test.title,
        score: result.rawScore,
        totalQuestions: result.totalQuestions,
        bandEstimate: result.bandScore,
        timeSpentSeconds: isExamMode
          ? (test.timeLimitMinutes || 60) * 60 - secondsRemaining
          : 3600 - secondsRemaining,
        startedAt: new Date(Date.now() - 3600000).toISOString(),
        completedAt: new Date().toISOString(),
        status: 'completed' as const,
      };

      const attemptId = await db.attempts.add(attemptRecord);

      const questionResponses = allQuestions.map((q) => {
        const uAns = userAnswers[q.id] || '';
        const isCorrect = isAnswerCorrect(uAns, q.correctAnswer, q.type, q.options);
        let savedOptions = q.options;
        if (q.type === 'multiple_choice_single' && q.options) {
          const shuffled = shuffleMcqOptions(q.options, `${attemptSeed}_${q.id}`);
          savedOptions = shuffled.map((o) => o.text);
        }
        return {
          attemptId: attemptId as number,
          module: 'reading' as const,
          questionId: q.id,
          userAnswer: uAns,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
          questionType: q.type,
          topic: test.attribution?.authorOrTopic || 'Academic Reading',
          difficulty: (test.difficulty || 'standard') as 'easy' | 'standard' | 'challenging',
          timeSpentSeconds: questionTimeMap[q.id] || Math.round(attemptRecord.timeSpentSeconds / allQuestions.length),
          questionPrompt: q.prompt,
          passageOrSectionTitle: `Passage ${q.passageNumber}`,
          options: savedOptions,
          answeredAt: new Date().toISOString(),
        };
      });

      await recordQuestionResponses(questionResponses);
      clearActiveTestProgress(testId || '');

      // Record daily activity, XP, and weekly sprint progress
      const minutesSpent = Math.max(1, Math.round(attemptRecord.timeSpentSeconds / 60));
      recordDailyActivity(minutesSpent);
      const earnedXp = Math.round(60 + result.rawScore * 2);
      const xpResult = awardXp(earnedXp);
      recordWeeklyChallengeProgress('reading', 1);

      addToast({
        type: 'success',
        title: 'Reading Test Submitted!',
        message: `Evaluated: Band ${result.bandScore.toFixed(1)} (${result.rawScore}/${result.totalQuestions}). +${earnedXp} XP earned!${xpResult.leveledUp ? ` Level Up: ${xpResult.newLevel.name}!` : ''}`,
      });

      navigate(`/practice/reading/results/${attemptId}`);
    } catch (err) {
      console.error('Failed to submit reading attempt', err);
      addToast({
        type: 'error',
        title: 'Submission Failed',
        message: 'Could not record test results to local database.',
      });
    } finally {
      setIsSubmitting(false);
      setIsReviewModalOpen(false);
    }
  };

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k] && userAnswers[k].trim().length > 0
  ).length;

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-[#F7FAF8] dark:bg-[#0B1612]">
      {/* 1. Official IELTS Computer-Delivered Sticky Header */}
      <ExamHeader
        title={test.title}
        module="reading"
        testType={test.testType}
        isExamMode={isExamMode}
        secondsRemaining={secondsRemaining}
        totalQuestions={allQuestions.length}
        answeredCount={answeredCount}
        flaggedCount={flaggedQuestions.size}
        onOpenReview={() => setIsReviewModalOpen(true)}
        onOpenTestSetup={() => setIsSetupModalOpen(true)}
        onSubmit={() => setIsReviewModalOpen(true)}
        onExit={() => navigate('/practice/reading')}
        extraControls={
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            {test.passages.map((p, idx) => (
              <button
                key={p.passageNumber}
                onClick={() => setActivePassageIndex(idx)}
                className={cn(
                  'px-3 py-1 rounded text-xs font-bold transition-all',
                  activePassageIndex === idx
                    ? 'bg-[#124F40] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                Passage {p.passageNumber}
              </button>
            ))}
          </div>
        }
      />

      {/* Mobile Switcher (Passage vs Questions) */}
      <div className="md:hidden flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 gap-2 shrink-0">
        <button
          onClick={() => {
            setMobileView('passage');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={cn(
            'flex-1 py-2 min-h-[44px] rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1',
            mobileView === 'passage'
              ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-300 dark:border-teal-700 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-850'
          )}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Passage {currentPassage.passageNumber}</span>
        </button>
        <button
          onClick={() => {
            setMobileView('questions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={cn(
            'flex-1 py-2 min-h-[44px] rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1',
            mobileView === 'questions'
              ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-300 dark:border-teal-700 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-850'
          )}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Questions ({answeredCount}/{allQuestions.length})</span>
        </button>
      </div>

      {/* 2. Main Workspace: Draggable Split-Screen Container */}
      <div
        ref={splitContainerRef}
        id="reading-split-container"
        className="flex-1 flex overflow-hidden relative"
      >
        {/* Left Column: Passage Pane */}
        <div
          ref={passageContainerRef}
          onMouseUp={handlePassageMouseUp}
          style={isMobileScreen ? { width: '100%' } : { width: `${splitRatio}%` }}
          className={cn(
            'flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto p-4 sm:p-6 lg:p-8',
            mobileView === 'passage' ? 'w-full flex' : 'hidden md:flex'
          )}
        >
          {/* Passage Top Controls Toolbar: A- / A+, Line Spacing, Clear Highlights */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-4 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Reading Passage {currentPassage.passageNumber} of 3
              </span>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5 tracking-tight">
                {currentPassage.title}
              </h1>
              {currentPassage.subtitle && (
                <p className="text-xs text-slate-500 italic mt-0.5">{currentPassage.subtitle}</p>
              )}
            </div>

            {/* Typography Controls & Clear Highlights */}
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0 flex-wrap">
              {/* Font Size Scale (A- / A+) */}
              <div className="flex items-center gap-0.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                <button
                  onClick={() => setFontScale((s) => Math.max(0.85, s - 0.1))}
                  className="px-2 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 rounded transition-colors"
                  title="Decrease font size (A-)"
                >
                  A-
                </button>
                <span className="text-2xs font-mono text-slate-500 dark:text-slate-400 px-1 select-none">
                  {Math.round(fontScale * 100)}%
                </span>
                <button
                  onClick={() => setFontScale((s) => Math.min(1.35, s + 0.1))}
                  className="px-2 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 rounded transition-colors"
                  title="Increase font size (A+)"
                >
                  A+
                </button>
              </div>

              {/* Line Spacing */}
              <div className="hidden sm:flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                <button
                  onClick={() => setLineSpacing('normal')}
                  className={cn(
                    'px-2 py-1 text-2xs rounded font-medium transition-colors',
                    lineSpacing === 'normal'
                      ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                  title="Standard line spacing (1.5)"
                >
                  1.5
                </button>
                <button
                  onClick={() => setLineSpacing('relaxed')}
                  className={cn(
                    'px-2 py-1 text-2xs rounded font-medium transition-colors',
                    lineSpacing === 'relaxed'
                      ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                  title="Relaxed line spacing (1.8)"
                >
                  1.8
                </button>
                <button
                  onClick={() => setLineSpacing('loose')}
                  className={cn(
                    'px-2 py-1 text-2xs rounded font-medium transition-colors',
                    lineSpacing === 'loose'
                      ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                  title="Loose line spacing (2.2)"
                >
                  2.2
                </button>
              </div>

              {/* Clear Highlights */}
              {(highlights[currentPassage.passageNumber] || []).length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCurrentPassageHighlights}
                  className="text-xs text-slate-400 hover:text-rose-500 h-8"
                  title="Clear highlights on this passage"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Floating Text Selection Mini-Toolbar (Yellow, Green, Pink, Add Note) */}
          {selectionRange && (
            <div className="sticky top-0 z-40 mb-4 p-2.5 rounded-xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex flex-col gap-2 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <Highlighter className="w-4 h-4 text-teal-400" />
                  <span className="font-semibold">Highlight:</span>

                  {/* Yellow */}
                  <button
                    onClick={() => applyHighlight('yellow')}
                    className="w-5 h-5 rounded-full bg-amber-300 border-2 border-white hover:scale-125 transition-transform"
                    title="Yellow highlight"
                  />
                  {/* Green */}
                  <button
                    onClick={() => applyHighlight('green')}
                    className="w-5 h-5 rounded-full bg-emerald-300 border-2 border-white hover:scale-125 transition-transform"
                    title="Green highlight"
                  />
                  {/* Pink */}
                  <button
                    onClick={() => applyHighlight('pink')}
                    className="w-5 h-5 rounded-full bg-rose-300 border-2 border-white hover:scale-125 transition-transform"
                    title="Pink highlight"
                  />

                  <div className="h-4 w-px bg-slate-700 mx-1" />

                  {/* Add Note Button */}
                  <button
                    onClick={() => setIsAddingNote(!isAddingNote)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-2xs font-medium text-slate-200"
                  >
                    <MessageSquare className="w-3 h-3 text-teal-400" />
                    <span>Add Note</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSelectionRange(null);
                    setIsAddingNote(false);
                  }}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Note Input Row */}
              {isAddingNote && (
                <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                  <input
                    type="text"
                    value={floatingNoteText}
                    onChange={(e) => setFloatingNoteText(e.target.value)}
                    placeholder="Type a brief note or translation..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') applyHighlight('yellow', floatingNoteText);
                    }}
                    autoFocus
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => applyHighlight('yellow', floatingNoteText)}
                    className="text-2xs h-7 px-3 bg-teal-600 hover:bg-teal-500"
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Passage Text Body with Interactive Formatting */}
          <div
            className={cn(
              'font-reading selection:bg-teal-200 dark:selection:bg-teal-900',
              lineSpacing === 'normal' && 'leading-normal',
              lineSpacing === 'relaxed' && 'leading-relaxed',
              lineSpacing === 'loose' && 'leading-loose'
            )}
            style={{ fontSize: `${fontScale}rem` }}
          >
            {renderHighlightedPassageText(currentPassage.text)}
          </div>

          {/* Passage Footer Info */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Passage Length: {currentPassage.wordCount} words</span>
            <span>IELTS Academic & General Standards</span>
          </div>
        </div>

        {/* Draggable Divider Handle (Desktop) */}
        <div
          onMouseDown={handleDividerMouseDown}
          className="hidden md:flex w-2 bg-slate-200 dark:bg-slate-800 hover:bg-teal-500 dark:hover:bg-teal-500 cursor-col-resize items-center justify-center transition-colors z-10 shrink-0 group"
          title="Drag to resize passage and questions view"
        >
          <div className="w-0.5 h-8 bg-slate-400 dark:bg-slate-600 group-hover:bg-white rounded-full" />
        </div>

        {/* Right Column: Questions Pane */}
        <div
          style={isMobileScreen ? { width: '100%' } : { width: `${100 - splitRatio}%` }}
          className={cn(
            'flex flex-col bg-slate-50 dark:bg-slate-950 overflow-y-auto p-4 sm:p-6 lg:p-8',
            mobileView === 'questions' ? 'w-full flex' : 'hidden md:flex'
          )}
        >
          {/* Passage Questions Header */}
          <div className="pb-3 mb-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Passage {currentPassage.passageNumber} Questions
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Answer Sheet & Prompts
              </h2>
            </div>
            <Badge variant="slate">
              {currentPassage.questionGroups.reduce((acc, g) => acc + g.questions.length, 0)} Questions
            </Badge>
          </div>

          {/* Timing Coach */}
          <TimingCoach
            activeQuestionNumber={activeQuestionNumber}
            totalQuestions={allQuestions.length}
            recommendedSeconds={
              currentPassage.passageNumber === 1 ? 75 : currentPassage.passageNumber === 2 ? 90 : 105
            }
            questionType={allQuestions.find((q) => q.questionNumber === activeQuestionNumber)?.type}
            onTimeUpdate={(secs) => {
              const targetQ = allQuestions.find((q) => q.questionNumber === activeQuestionNumber);
              if (targetQ) {
                setQuestionTimeMap((prev) => ({ ...prev, [targetQ.id]: secs }));
              }
            }}
            className="mb-6"
          />

          {/* Question Groups */}
          <div className="space-y-8">
            {currentPassage.questionGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-4">
                {/* Group instruction box */}
                <div className="p-4 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 text-xs text-teal-950 dark:text-teal-200 whitespace-pre-line leading-relaxed font-sans">
                  <strong>Instructions:</strong>
                  <br />
                  {group.groupInstruction}
                </div>

                {/* Individual Questions */}
                <div className="space-y-4">
                  {group.questions.map((q) => {
                    const isAnswered = Boolean(userAnswers[q.id]?.trim());
                    const isFlagged = flaggedQuestions.has(q.id);
                    const isFocused = activeQuestionNumber === q.questionNumber;

                    return (
                      <Card
                        key={q.id}
                        id={`question-card-${q.id}`}
                        onClick={() => setActiveQuestionNumber(q.questionNumber)}
                        className={cn(
                          'p-4 sm:p-5 transition-all border',
                          isFocused && 'ring-2 ring-brand-800 dark:ring-brand-400',
                          isFlagged && 'border-amber-400 dark:border-amber-600 bg-amber-50/20',
                          isAnswered && !isFlagged && !isFocused && 'border-slate-300 dark:border-slate-700'
                        )}
                      >
                        {/* Question Top Row with Flag Button */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white dark:bg-brand-800 font-mono text-xs font-bold">
                              {q.questionNumber}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase">
                              {(q.type || group.questionType || '').replace(/_/g, ' ')}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleFlagQuestion(q.id)}
                            className={cn(
                              'flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors',
                              isFlagged
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                            )}
                            title="Flag question for review"
                          >
                            <Flag className={cn('w-3.5 h-3.5', isFlagged && 'fill-rose-500 text-rose-500')} />
                            <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
                          </button>
                        </div>

                        {/* Prompt */}
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4 leading-relaxed">
                          {q.prompt}
                        </p>

                        {/* Interactive Input based on Question Type */}
                        <div>
                          {/* 1. True / False / Not Given */}
                          {q.type === 'true_false_not_given' && (
                            <div className="grid grid-cols-3 gap-2">
                              {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleAnswerChange(q.id, opt)}
                                  className={cn(
                                    'py-2 px-3 rounded-xl border text-xs font-bold transition-all',
                                    userAnswers[q.id]?.toUpperCase() === opt
                                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                                  )}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* 2. Yes / No / Not Given */}
                          {q.type === 'yes_no_not_given' && (
                            <div className="grid grid-cols-3 gap-2">
                              {['YES', 'NO', 'NOT GIVEN'].map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleAnswerChange(q.id, opt)}
                                  className={cn(
                                    'py-2 px-3 rounded-xl border text-xs font-bold transition-all',
                                    userAnswers[q.id]?.toUpperCase() === opt
                                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                                  )}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* 3. Multiple Choice Single */}
                          {q.type === 'multiple_choice_single' && (
                            <div className="space-y-2">
                              {(() => {
                                const shuffled = shuffleMcqOptions(q.options || [], `${attemptSeed}_${q.id}`);
                                return shuffled.map((optItem, oIdx) => {
                                  const displayLetter = String.fromCharCode(65 + oIdx);
                                  const isSelected =
                                    userAnswers[q.id] === optItem.text ||
                                    userAnswers[q.id]?.toUpperCase() === displayLetter;

                                  return (
                                    <label
                                      key={optItem.id || oIdx}
                                      className={cn(
                                        'flex items-center gap-3 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all',
                                        isSelected
                                          ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-800 text-brand-950 dark:text-brand-100 font-semibold shadow-xs'
                                          : 'bg-white dark:bg-[#112019] border-[#E1EBE5] dark:border-[#24392F] text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                                      )}
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={optItem.text}
                                        checked={isSelected}
                                        onChange={() => handleAnswerChange(q.id, optItem.text)}
                                        className="text-brand-800 focus:ring-brand-500 h-4 w-4"
                                      />
                                      <span className="font-mono font-bold text-slate-400 mr-1">
                                        {displayLetter}.
                                      </span>
                                      <span className="flex-1">{optItem.text}</span>
                                    </label>
                                  );
                                });
                              })()}
                            </div>
                          )}

                          {/* 4. Sentence Completion / Short Answer */}
                          {(q.type === 'sentence_completion' ||
                            q.type === 'summary_completion' ||
                            q.type === 'short_answer') && (
                            <div>
                              <Input
                                placeholder="Type your answer here..."
                                value={userAnswers[q.id] || ''}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                className="font-mono text-xs"
                              />
                            </div>
                          )}

                          {/* 5. Matching Headings */}
                          {q.type === 'matching_headings' && (
                            <div className="space-y-2">
                              <select
                                value={userAnswers[q.id] || ''}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
                              >
                                <option value="">Select Roman Numeral Heading...</option>
                                {q.options?.map((head, hIdx) => (
                                  <option key={hIdx} value={head}>
                                    {head}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* Default Fallback */}
                          {!['true_false_not_given', 'yes_no_not_given', 'multiple_choice_single', 'sentence_completion', 'summary_completion', 'short_answer', 'matching_headings'].includes(q.type) && (
                            <div>
                              <Input
                                placeholder="Type answer..."
                                value={userAnswers[q.id] || ''}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                className="font-mono text-xs"
                              />
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile One-Handed Quick Jump Floating Thumb Buttons */}
      {mobileView === 'passage' ? (
        <button
          type="button"
          onClick={() => {
            setMobileView('questions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="md:hidden fixed bottom-20 right-4 z-30 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-teal-600 text-white font-bold text-xs shadow-lg shadow-teal-600/30 active:scale-95 transition-transform border border-teal-500/40"
          aria-label="Jump to Questions"
        >
          <span>Questions</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setMobileView('passage');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="md:hidden fixed bottom-20 left-4 z-30 flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-900/90 dark:bg-slate-800/90 text-white font-bold text-xs border border-slate-700 shadow-lg active:scale-95 transition-transform backdrop-blur-sm"
          aria-label="Jump back to Passage"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Passage</span>
        </button>
      )}

      {/* 3. Official IELTS Computer-Delivered Bottom Navigation Bar */}
      <ExamBottomNav
        questions={examQuestionItems}
        userAnswers={userAnswers}
        flaggedQuestions={flaggedQuestions}
        activeQuestionNumber={activeQuestionNumber}
        onSelectQuestion={jumpToQuestion}
        onToggleFlag={toggleFlagQuestion}
        onOpenReview={() => setIsReviewModalOpen(true)}
        currentSectionOrPassage={activePassageIndex + 1}
        sectionOrPassageCount={test.passages.length}
        onSelectSectionOrPassage={(idx) => setActivePassageIndex(idx)}
        labelPrefix="Passage"
      />

      {/* 4. Official CD-IELTS Review Screen Modal */}
      <ExamReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        questions={examQuestionItems}
        userAnswers={userAnswers}
        flaggedQuestions={flaggedQuestions}
        onSelectQuestion={jumpToQuestion}
        onSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
        moduleName="Reading Exam"
        timeRemainingSeconds={secondsRemaining}
      />

      {/* 5. Pre-Exam Test Setup Screen Modal */}
      <ExamTestSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        requiredChecks={['audio', 'fullscreen']}
        title="IELTS Reading Test Screen Setup"
      />
    </div>
  );
}
