import { useState, useEffect } from 'react';
import { Timer, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TimingCoachProps {
  activeQuestionNumber: number;
  totalQuestions: number;
  recommendedSeconds?: number;
  questionType?: string;
  onTimeUpdate?: (secondsSpent: number) => void;
  className?: string;
}

export function TimingCoach({
  activeQuestionNumber,
  totalQuestions,
  recommendedSeconds = 90, // Standard 90s per IELTS reading question
  questionType,
  onTimeUpdate,
  className,
}: TimingCoachProps) {
  const [secondsOnCurrent, setSecondsOnCurrent] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Reset timer on question switch
  useEffect(() => {
    setSecondsOnCurrent(0);
  }, [activeQuestionNumber]);

  // Tick timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsOnCurrent((prev) => {
        const next = prev + 1;
        if (onTimeUpdate) onTimeUpdate(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUpdate]);

  const minutes = Math.floor(secondsOnCurrent / 60);
  const seconds = secondsOnCurrent % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const recMinutes = Math.floor(recommendedSeconds / 60);
  const recSecs = recommendedSeconds % 60;
  const recFormatted = `${recMinutes}:${recSecs < 10 ? '0' : ''}${recSecs}`;

  const ratio = secondsOnCurrent / recommendedSeconds;
  const isOverTime = secondsOnCurrent > recommendedSeconds;
  const isSeverelyOverTime = secondsOnCurrent >= recommendedSeconds * 1.33; // e.g. 2 min on 90s question
  const isApproaching = ratio >= 0.75 && !isOverTime;

  // Format question type label
  const typeLabel = questionType ? questionType.replace(/_/g, ' ') : 'Question';

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className={cn(
          'fixed bottom-20 right-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold backdrop-blur-md border transition-all',
          isSeverelyOverTime
            ? 'bg-rose-500/90 text-white border-rose-600 animate-pulse'
            : isOverTime
            ? 'bg-amber-500/90 text-white border-amber-600'
            : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
        )}
        title="Open Timing Coach"
        aria-label="Open Timing Coach"
      >
        <Timer className="w-3.5 h-3.5" />
        <span>{timeFormatted}</span>
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-3 backdrop-blur-md transition-all shadow-sm',
        isSeverelyOverTime
          ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60'
          : isOverTime
          ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60'
          : 'bg-slate-50/90 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors',
              isSeverelyOverTime
                ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300'
                : isOverTime
                ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                : 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300'
            )}
          >
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Timing Coach • Q{activeQuestionNumber}/{totalQuestions}
              </span>
              {isSeverelyOverTime && (
                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-600 text-white uppercase tracking-wider">
                  Over Pace
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span
                className={cn(
                  'text-sm font-bold font-mono tracking-tight',
                  isSeverelyOverTime
                    ? 'text-rose-600 dark:text-rose-400'
                    : isOverTime
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-slate-900 dark:text-slate-100'
                )}
              >
                {timeFormatted}
              </span>
              <span className="text-2xs text-slate-400 dark:text-slate-500">
                / target {recFormatted}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          title="Minimize Timing Coach"
          aria-label="Minimize Timing Coach"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-2.5 w-full bg-slate-200/80 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 rounded-full',
            isSeverelyOverTime
              ? 'bg-rose-500'
              : isOverTime
              ? 'bg-amber-500'
              : isApproaching
              ? 'bg-teal-500'
              : 'bg-teal-600'
          )}
          style={{ width: `${Math.min(ratio * 100, 100)}%` }}
        />
      </div>

      {/* Intelligent Coach Warning Callout */}
      {isSeverelyOverTime ? (
        <div className="mt-2 flex items-start gap-1.5 text-2xs font-medium text-rose-700 dark:text-rose-300 bg-rose-100/60 dark:bg-rose-950/60 p-1.5 rounded-lg border border-rose-200/60 dark:border-rose-900/50 animate-fadeIn">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
          <span>
            You've spent over {timeFormatted} on this {typeLabel}. Select your best guess, flag for review, and keep moving forward to protect your score!
          </span>
        </div>
      ) : isApproaching ? (
        <div className="mt-1.5 flex items-center justify-between text-2xs text-slate-500 dark:text-slate-400">
          <span>Approaching recommended target</span>
          <span className="font-semibold text-teal-600 dark:text-teal-400">On Schedule</span>
        </div>
      ) : null}
    </div>
  );
}
