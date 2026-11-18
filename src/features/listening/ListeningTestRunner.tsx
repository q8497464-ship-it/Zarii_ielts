import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Flag,
  FileText,
  ChevronLeft,
  Send,
  Check,
  AlertTriangle,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  MapPin,
  Clock,
  Radio,
  FastForward,
  Headphones,
  Sliders,
  ShieldAlert,
} from 'lucide-react';
import { getListeningTestById } from './listeningContent';
import { evaluateListeningAttempt, isListeningAnswerCorrect } from './marking';
import { shuffleMcqOptions } from '../../lib/mcqShuffle';
import { ListeningAudioEngine, type PlaybackSpeed, type ScriptLine } from './audioEngine';
import { db } from '../../lib/db';
import { useAppStore } from '../../store/useAppStore';
import { recordDailyActivity, awardXp, recordWeeklyChallengeProgress } from '../habits/habitEngine';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { cn, formatSecondsToTime } from '../../lib/utils';
import type { QuestionType } from '../../types';
import {
  ExamHeader,
  ExamBottomNav,
  ExamReviewModal,
  ExamTestSetupModal,
  type ExamQuestionItem,
} from '../../components/exam';
import { TimingCoach } from '../adaptive/TimingCoach';
import { recordQuestionResponses } from '../adaptive/adaptiveTracker';

export function ListeningTestRunner() {
  const { testId } = useParams<{ testId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const isExamMode = searchParams.get('mode') === 'exam';

  const test = useMemo(() => {
    return testId ? getListeningTestById(testId) : undefined;
  }, [testId]);

  // Current section (0 = Section 1, 1 = Section 2, 2 = Section 3, 3 = Section 4)
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number>(1);

  // User state
  const [attemptSeed, setAttemptSeed] = useState<string>(() => {
    if (testId) {
      const cacheKey = `zarii_listening_progress_${testId}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.attemptSeed) return parsed.attemptSeed;
        } catch {}
      }
    }
    return `listening_${testId}_${Date.now()}`;
  });
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState<number>(40 * 60); // 40 mins total

  // Audio state
  const [playbackState, setPlaybackState] = useState<'idle' | 'playing' | 'paused' | 'completed'>('idle');
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1.0);
  const [volume, setVolume] = useState<number>(0.85);
  const [hasPlayedSectionInExam, setHasPlayedSectionInExam] = useState<Record<number, boolean>>({});
  const [showLiveTranscript, setShowLiveTranscript] = useState<boolean>(!isExamMode);

  // Exam UI modals
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isShowNoticeModal, setIsShowNoticeModal] = useState(isExamMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransferTime, setIsTransferTime] = useState(false);

  const audioEngineRef = useRef<ListeningAudioEngine | null>(null);

  // Flatten all questions
  const allQuestions = useMemo(() => {
    if (!test) return [];
    return test.sections.flatMap((s) =>
      s.questionGroups.flatMap((g) =>
        g.questions.map((q) => ({
          ...q,
          sectionNumber: s.sectionNumber,
          groupInstruction: g.groupInstruction,
          diagramSvg: g.diagramSvg,
        }))
      )
    );
  }, [test]);

  const examQuestionItems: ExamQuestionItem[] = useMemo(() => {
    return allQuestions.map((q) => ({
      id: q.id,
      questionNumber: q.questionNumber,
      sectionOrPassage: q.sectionNumber,
    }));
  }, [allQuestions]);

  // Initialize audio engine
  useEffect(() => {
    const engine = new ListeningAudioEngine({
      onLineChange: (lineIdx) => {
        setCurrentLineIndex(lineIdx);
      },
      onStateChange: (state) => {
        setPlaybackState(state);
      },
      onComplete: () => {
        addToast({
          type: 'info',
          title: `Section ${activeSectionIndex + 1} Audio Finished`,
          message: isExamMode
            ? 'The recording for this section has finished. Check your answers and proceed to the next part.'
            : 'Audio finished. You may replay or move to another section.',
        });
      },
    });

    audioEngineRef.current = engine;
    engine.setVolume(volume);

    return () => {
      engine.stop();
    };
  }, []);

  // Update script when active section changes
  useEffect(() => {
    if (!test) return;
    const currentSection = test.sections[activeSectionIndex];
    if (audioEngineRef.current && currentSection) {
      audioEngineRef.current.setScript(currentSection.audioScript, currentSection.audioUrl);
      setCurrentLineIndex(0);
      setPlaybackState('idle');
    }
  }, [test, activeSectionIndex]);

  // Restore progress from local storage if available
  useEffect(() => {
    if (!testId) return;
    const cacheKey = `zarii_listening_progress_${testId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.attemptSeed) {
          setAttemptSeed(parsed.attemptSeed);
        }
        setUserAnswers(parsed.answers || {});
        setFlaggedQuestions(new Set(parsed.flagged || []));
        if (isExamMode && parsed.secondsRemaining > 0) {
          setSecondsRemaining(parsed.secondsRemaining);
        }
      } catch (e) {
        console.warn('Failed to parse cached listening test state');
      }
    }
  }, [testId, isExamMode]);

  // Auto-save answers
  useEffect(() => {
    if (!testId) return;
    const cacheKey = `zarii_listening_progress_${testId}`;
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        answers: userAnswers,
        flagged: Array.from(flaggedQuestions),
        secondsRemaining,
        updatedAt: new Date().toISOString(),
        attemptSeed,
      })
    );
  }, [testId, userAnswers, flaggedQuestions, secondsRemaining, attemptSeed]);

  // Timer Countdown
  useEffect(() => {
    if (!isExamMode || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === 600 && !isTransferTime) {
          setIsTransferTime(true);
          addToast({
            type: 'warning',
            title: '10 Minutes Transfer Time Remaining',
            message: 'Official audio has ended. You have 10 minutes to review and finalize your answers.',
            duration: 7000,
          });
        }
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamMode, secondsRemaining, isTransferTime]);

  if (!test) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Listening Test Not Found</h2>
        <Button variant="primary" onClick={() => navigate('/practice/listening')}>
          Back to Listening Hub
        </Button>
      </div>
    );
  }

  const currentSection = test.sections[activeSectionIndex];

  // Section descriptions matching Cambridge CD IELTS
  const sectionDescriptions = [
    'Everyday social dialogue (2 speakers, e.g. booking, inquiry)',
    'Social monologue (1 speaker, e.g. local facility tour, radio talk)',
    'Educational / Training dialogue (2-4 speakers, e.g. tutor & students)',
    'Academic lecture / Monologue (1 speaker, university lecture)',
  ];

  // Play audio handlers
  const handleStartPlay = () => {
    if (isExamMode && hasPlayedSectionInExam[activeSectionIndex]) {
      addToast({
        type: 'warning',
        title: 'Exam Mode Restriction',
        message: 'In official IELTS exam mode, audio is played strictly once per section.',
      });
      return;
    }

    if (playbackState === 'paused') {
      audioEngineRef.current?.resume();
    } else {
      audioEngineRef.current?.play(0);
      if (isExamMode) {
        setHasPlayedSectionInExam((prev) => ({ ...prev, [activeSectionIndex]: true }));
      }
    }
  };

  const handlePause = () => {
    if (isExamMode) return;
    audioEngineRef.current?.pause();
  };

  const handleReplaySection = () => {
    if (isExamMode) return;
    audioEngineRef.current?.play(0);
  };

  const handleSpeedChange = (spd: PlaybackSpeed) => {
    setPlaybackSpeed(spd);
    audioEngineRef.current?.setSpeed(spd);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    audioEngineRef.current?.setVolume(vol);
  };

  const handleAnswerChange = (qId: string, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: answer,
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const jumpToQuestion = (qNumber: number) => {
    setActiveQuestionNumber(qNumber);
    const targetQ = allQuestions.find((q) => q.questionNumber === qNumber);
    if (!targetQ) return;

    const secIdx = targetQ.sectionNumber - 1;
    if (secIdx !== activeSectionIndex) {
      setActiveSectionIndex(secIdx);
    }

    setTimeout(() => {
      const el = document.getElementById(`list-q-${targetQ.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-teal-500');
        setTimeout(() => el.classList.remove('ring-2', 'ring-teal-500'), 1500);
      }
    }, 100);
  };

  // Final submit
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    audioEngineRef.current?.stop();

    try {
      const evaluationItems = allQuestions.map((q) => ({
        questionId: q.id,
        questionType: q.type,
        sectionNumber: q.sectionNumber,
        userAnswer: userAnswers[q.id] || '',
        correctAnswer: q.correctAnswer,
        options: q.options,
      }));

      const result = evaluateListeningAttempt(evaluationItems, allQuestions.length);

      const attemptRecord = {
        testId: test.id,
        testType: 'academic' as const,
        module: 'listening' as const,
        title: test.title,
        score: result.rawScore,
        totalQuestions: result.totalQuestions,
        bandEstimate: result.bandScore,
        timeSpentSeconds: isExamMode ? 40 * 60 - secondsRemaining : 2400 - secondsRemaining,
        startedAt: new Date(Date.now() - 2400000).toISOString(),
        completedAt: new Date().toISOString(),
        status: 'completed' as const,
      };

      const attemptId = await db.attempts.add(attemptRecord);

      const questionResponses = allQuestions.map((q) => {
        const uAns = userAnswers[q.id] || '';
        const isCorrect = isListeningAnswerCorrect(uAns, q.correctAnswer, q.type, q.options);
        let savedOptions = q.options;
        if (q.type === 'multiple_choice_single' && q.options) {
          const shuffled = shuffleMcqOptions(q.options, `${attemptSeed}_${q.id}`);
          savedOptions = shuffled.map((o) => o.text);
        }
        return {
          attemptId: attemptId as number,
          module: 'listening' as const,
          questionId: q.id,
          userAnswer: uAns,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
          questionType: q.type,
          topic: test.title || 'General Listening',
          difficulty: 'standard' as const,
          timeSpentSeconds: 60,
          questionPrompt: q.prompt,
          passageOrSectionTitle: test.title,
          options: savedOptions,
          answeredAt: new Date().toISOString(),
        };
      });

      await recordQuestionResponses(questionResponses);
      localStorage.removeItem(`zarii_listening_progress_${testId}`);

      // Record habits activity, XP, and weekly sprint progress
      const minutesSpent = Math.max(1, Math.round(attemptRecord.timeSpentSeconds / 60));
      recordDailyActivity(minutesSpent);
      const earnedXp = Math.round(60 + result.rawScore * 2);
      const xpResult = awardXp(earnedXp);
      recordWeeklyChallengeProgress('listening', 1);

      addToast({
        type: 'success',
        title: 'Listening Test Evaluated!',
        message: `Your score: Band ${result.bandScore.toFixed(1)} (${result.rawScore}/${result.totalQuestions}). +${earnedXp} XP earned!${xpResult.leveledUp ? ` Level Up: ${xpResult.newLevel.name}!` : ''}`,
      });

      navigate(`/practice/listening/results/${attemptId}`);
    } catch (err) {
      console.error('Failed to submit listening attempt', err);
      addToast({
        type: 'error',
        title: 'Grading Error',
        message: 'Could not record test score to local database.',
      });
    } finally {
      setIsSubmitting(false);
      setIsReviewModalOpen(false);
    }
  };

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k] && userAnswers[k].trim().length > 0
  ).length;

  const totalLines = currentSection.audioScript.length || 1;
  const progressRatio = currentLineIndex / totalLines;

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-[#F7FAF8] dark:bg-[#0B1612]">
      {/* 1. Official IELTS Computer-Delivered Sticky Header */}
      <ExamHeader
        title={test.title}
        module="listening"
        testType="academic"
        isExamMode={isExamMode}
        secondsRemaining={secondsRemaining}
        totalQuestions={allQuestions.length}
        answeredCount={answeredCount}
        flaggedCount={flaggedQuestions.size}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onOpenReview={() => setIsReviewModalOpen(true)}
        onOpenTestSetup={() => setIsSetupModalOpen(true)}
        onSubmit={() => setIsReviewModalOpen(true)}
        onExit={() => {
          audioEngineRef.current?.stop();
          navigate('/practice/listening');
        }}
        extraControls={
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            {test.sections.map((sec, idx) => (
              <button
                key={sec.sectionNumber}
                onClick={() => {
                  if (audioEngineRef.current) audioEngineRef.current.stop();
                  setActiveSectionIndex(idx);
                }}
                className={cn(
                  'px-3 py-1 rounded text-xs font-bold transition-all',
                  activeSectionIndex === idx
                    ? 'bg-[#124F40] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                Part {sec.sectionNumber}
              </button>
            ))}
          </div>
        }
      />

      {/* 2. Authentic CD-IELTS Audio Bar with Waveform & Volume */}
      <div className="bg-slate-900 border-b border-slate-800 text-white px-3 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 shrink-0 shadow-inner">
        {/* Left: Play button & Section Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {playbackState === 'playing' ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handlePause}
                disabled={isExamMode}
                leftIcon={<Pause className="w-4 h-4" />}
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold h-10 min-h-[44px] px-3.5 shadow-sm"
              >
                {isExamMode ? 'Playing Audio' : 'Pause'}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleStartPlay}
                disabled={isExamMode && hasPlayedSectionInExam[activeSectionIndex]}
                leftIcon={<Play className="w-4 h-4 fill-current" />}
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold h-10 min-h-[44px] px-3.5 shadow-sm"
              >
                {isExamMode && hasPlayedSectionInExam[activeSectionIndex]
                  ? 'Section Played'
                  : playbackState === 'paused'
                  ? 'Resume Audio'
                  : `Play Section ${currentSection.sectionNumber}`}
              </Button>
            )}

            {!isExamMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReplaySection}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                className="text-xs text-slate-300 hover:text-white h-10 min-h-[44px] px-2.5 border border-slate-700/60"
                title="Replay section audio"
              >
                Replay
              </Button>
            )}
          </div>

          {/* Section Indicator Badge */}
          <div className="min-w-0 text-right sm:text-left">
            <div className="flex items-center gap-1.5 justify-end sm:justify-start">
              <span className="font-bold text-xs text-white uppercase tracking-wider">
                Part {currentSection.sectionNumber}/4
              </span>
              {isExamMode && (
                <span className="text-[10px] bg-sky-950 text-sky-300 border border-sky-800 px-1.5 py-0.2 rounded font-mono">
                  Once
                </span>
              )}
            </div>
            <p className="text-2xs text-slate-400 truncate max-w-xs md:max-w-md hidden sm:block">
              {sectionDescriptions[activeSectionIndex]}
            </p>
          </div>
        </div>

        {/* Center: Waveform-Style Progress Visualizer */}
        <div className="flex-1 max-w-md w-full flex items-center gap-2 px-1">
          <div className="flex items-center gap-0.5 sm:gap-1 w-full h-6 sm:h-8 px-2 rounded-lg bg-slate-800/80 border border-slate-700/60 overflow-hidden">
            {Array.from({ length: 28 }).map((_, i) => {
              const barProgress = i / 28;
              const isPast = barProgress <= progressRatio;
              const isCurrent = Math.abs(barProgress - progressRatio) < 0.05;

              // Wave height pattern
              const heights = [25, 45, 65, 85, 50, 70, 95, 40, 80, 60, 90, 75, 45, 85];
              const h = heights[i % heights.length];

              return (
                <div
                  key={i}
                  className="flex-1 flex items-center justify-center h-full"
                >
                  <div
                    className={cn(
                      'w-1 rounded-full transition-all duration-150',
                      isPast
                        ? 'bg-sky-400'
                        : 'bg-slate-700',
                      isCurrent && playbackState === 'playing' && 'bg-teal-300 animate-pulse scale-y-125'
                    )}
                    style={{ height: `${h}%` }}
                  />
                </div>
              );
            })}
          </div>

          <div className="text-2xs font-mono text-slate-400 shrink-0 w-14 text-right">
            {currentLineIndex + 1}/{totalLines}
          </div>
        </div>

        {/* Right: Audio Volume Slider & Practice Tools (Desktop / Tablet) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 justify-end">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 accent-sky-500 cursor-pointer h-1 bg-slate-700 rounded-lg"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>

          {!isExamMode && (
            <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 text-xs font-semibold">
              {[0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => handleSpeedChange(spd as PlaybackSpeed)}
                  className={cn(
                    'px-1.5 py-0.5 rounded text-2xs',
                    playbackSpeed === spd && 'bg-sky-600 text-white font-bold'
                  )}
                >
                  {spd}x
                </button>
              ))}
            </div>
          )}

          {!isExamMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLiveTranscript(!showLiveTranscript)}
              className="text-xs text-slate-300 hover:text-white h-8 px-2"
            >
              {showLiveTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </Button>
          )}
        </div>
      </div>

      {/* 3. Main Workspace: Questions Sheet */}
      <div className="flex-1 flex overflow-hidden">
        {/* Practice Mode Transcript Drawer */}
        {showLiveTranscript && !isExamMode && (
          <div className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 overflow-y-auto hidden lg:flex flex-col shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
              Practice Transcript (Audio Script)
            </span>
            <div className="space-y-3">
              {currentSection.audioScript.map((line, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-2.5 rounded-lg text-xs leading-relaxed border transition-colors',
                    currentLineIndex === idx
                      ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-400 text-sky-950 dark:text-sky-100 font-semibold shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  )}
                >
                  <span className="font-bold uppercase text-2xs text-sky-600 dark:text-sky-400 block mb-0.5">
                    {line.speaker}:
                  </span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions Pane */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Section Header */}
            <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Listening Section {currentSection.sectionNumber}
                </span>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Questions {currentSection.questionGroups[0]?.questions[0]?.questionNumber} –{' '}
                  {currentSection.questionGroups[currentSection.questionGroups.length - 1]?.questions.slice(-1)[0]?.questionNumber}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Answer the questions as you listen. Write no more than the required number of words or select the correct letter.
                </p>
              </div>
              <Badge variant="slate">
                {currentSection.questionGroups.reduce((acc, g) => acc + g.questions.length, 0)} Questions
              </Badge>
            </div>

            {/* Question Groups */}
            <div className="space-y-8">
              {currentSection.questionGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-4">
                  {/* Instruction banner */}
                  <div className="p-4 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/60 text-xs text-sky-950 dark:text-sky-200 whitespace-pre-line leading-relaxed">
                    <strong>Instructions:</strong>
                    <br />
                    {group.groupInstruction}
                  </div>

                  {/* SVG Map / Diagram labelling */}
                  {group.diagramSvg && (
                    <Card className="p-4 bg-white dark:bg-slate-900 overflow-x-auto flex flex-col items-center">
                      <div className="text-xs font-bold text-slate-500 mb-2">Diagram / Map Layout</div>
                      <div
                        className="max-w-full"
                        dangerouslySetInnerHTML={{ __html: group.diagramSvg }}
                      />
                    </Card>
                  )}

                  {/* Question Cards */}
                  <div className="space-y-4">
                    {group.questions.map((q) => {
                      const isAnswered = Boolean(userAnswers[q.id]?.trim());
                      const isFlagged = flaggedQuestions.has(q.id);
                      const isFocused = activeQuestionNumber === q.questionNumber;

                      return (
                        <Card
                          key={q.id}
                          id={`list-q-${q.id}`}
                          onClick={() => setActiveQuestionNumber(q.questionNumber)}
                          className={cn(
                            'p-4 sm:p-5 transition-all border',
                            isFocused && 'ring-2 ring-brand-800 dark:ring-brand-400',
                            isFlagged && 'border-amber-400 dark:border-amber-600 bg-amber-50/20',
                            isAnswered && !isFlagged && !isFocused && 'border-slate-300 dark:border-slate-700'
                          )}
                        >
                          {/* Top Row: Q Number, Type, Flag */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white dark:bg-brand-800 font-mono text-xs font-bold">
                                {q.questionNumber}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-400 uppercase">
                                {q.type.replace(/_/g, ' ')}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleFlag(q.id)}
                              className={cn(
                                'flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors',
                                isFlagged
                                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold'
                                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                              )}
                              title="Flag question for review"
                            >
                              <Flag className={cn('w-3.5 h-3.5', isFlagged && 'fill-amber-500 text-amber-500')} />
                              <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
                            </button>
                          </div>

                          {/* Prompt */}
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4 leading-relaxed">
                            {q.prompt}
                          </p>

                          {/* Input Type */}
                          <div>
                            {/* Multiple Choice */}
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
                                          name={`listening-${q.id}`}
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

                            {/* Text / Note / Form / Diagram Fill */}
                            {q.type !== 'multiple_choice_single' && (
                              <div>
                                <Input
                                  placeholder="Write your answer..."
                                  value={userAnswers[q.id] || ''}
                                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                  className="font-mono text-xs max-w-md"
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
      </div>

      {/* 4. Official CD-IELTS Bottom Navigation Bar */}
      <ExamBottomNav
        questions={examQuestionItems}
        userAnswers={userAnswers}
        flaggedQuestions={flaggedQuestions}
        activeQuestionNumber={activeQuestionNumber}
        onSelectQuestion={jumpToQuestion}
        onToggleFlag={toggleFlag}
        onOpenReview={() => setIsReviewModalOpen(true)}
        currentSectionOrPassage={activeSectionIndex + 1}
        sectionOrPassageCount={test.sections.length}
        onSelectSectionOrPassage={(idx) => {
          if (audioEngineRef.current) audioEngineRef.current.stop();
          setActiveSectionIndex(idx);
        }}
        labelPrefix="Section"
      />

      {/* 5. "Audio Will Play Once" Notice Modal */}
      <Modal
        isOpen={isShowNoticeModal}
        onClose={() => setIsShowNoticeModal(false)}
        title="Official IELTS Listening Notice"
        size="md"
      >
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-start gap-3">
            <Headphones className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-sky-950 dark:text-sky-200">
              <strong>The recording will be played ONCE only.</strong>
              <p className="mt-1 text-2xs text-sky-800 dark:text-sky-300">
                In official computer-delivered IELTS testing, each section audio plays once without pause or rewind. You will have time to preview questions before the speech starts.
              </p>
            </div>
          </div>

          <ul className="list-disc pl-5 space-y-1.5 text-2xs text-slate-500">
            <li>You will hear 4 sections with 10 questions each (40 total).</li>
            <li>Answer questions directly into the answer fields as you listen.</li>
            <li>After the 30-minute audio finishes, you will receive 10 minutes transfer and review time.</li>
            <li>Ensure your headphone volume is adjusted to a clear, comfortable level.</li>
          </ul>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <Button
              variant="primary"
              onClick={() => {
                setIsShowNoticeModal(false);
                handleStartPlay();
              }}
              rightIcon={<Play className="w-3.5 h-3.5 fill-current" />}
              className="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs h-9"
            >
              I Understand — Begin Listening
            </Button>
          </div>
        </div>
      </Modal>

      {/* 6. Review Matrix Modal */}
      <ExamReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        questions={examQuestionItems}
        userAnswers={userAnswers}
        flaggedQuestions={flaggedQuestions}
        onSelectQuestion={jumpToQuestion}
        onSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
        moduleName="Listening Exam"
        timeRemainingSeconds={secondsRemaining}
      />

      {/* 7. Setup Modal */}
      <ExamTestSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        requiredChecks={['audio', 'fullscreen']}
        title="IELTS Listening Audio & Screen Check"
      />
    </div>
  );
}
