import { useEffect, useState, useRef } from 'react';
import { Timer as TimerIcon, Play, Pause, RotateCcw, AlertCircle } from 'lucide-react';
import { cn, formatSecondsToTime } from '../../lib/utils';
import { Button } from './Button';

export interface TimerProps {
  initialSeconds: number; // e.g. 3600 for 60 mins
  onExpire?: () => void;
  onTick?: (remainingSeconds: number) => void;
  autoStart?: boolean;
  warningThresholdSeconds?: number; // e.g. 300 for 5 mins
  compact?: boolean;
  className?: string;
}

export function Timer({
  initialSeconds,
  onExpire,
  onTick,
  autoStart = false,
  warningThresholdSeconds = 300,
  compact = false,
  className,
}: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsRunning(false);
            if (onExpire) onExpire();
            return 0;
          }
          const next = prev - 1;
          if (onTick) onTick(next);
          return next;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, onExpire, onTick]);

  const togglePlay = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
    if (onTick) onTick(initialSeconds);
  };

  const isWarning = secondsLeft <= warningThresholdSeconds && secondsLeft > 0;
  const isExpired = secondsLeft === 0;

  if (compact) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wider transition-colors',
          isExpired
            ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
            : isWarning
            ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800 animate-pulse'
            : 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
          className
        )}
      >
        <TimerIcon className="w-3.5 h-3.5" />
        <span>{formatSecondsToTime(secondsLeft)}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3.5 sm:px-4 rounded-xl border transition-all',
        isExpired
          ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-900 text-rose-800 dark:text-rose-200'
          : isWarning
          ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900 text-amber-900 dark:text-amber-200'
          : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'p-2 rounded-lg',
            isWarning || isExpired
              ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
              : 'bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300'
          )}
        >
          {isWarning ? <AlertCircle className="w-5 h-5 animate-bounce" /> : <TimerIcon className="w-5 h-5" />}
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
            {isExpired ? 'Time Up' : isWarning ? 'Time Warning' : 'Exam Timer'}
          </div>
          <div className="text-2xl font-mono font-bold tracking-tight">
            {formatSecondsToTime(secondsLeft)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant={isRunning ? 'secondary' : 'teal'}
          size="sm"
          onClick={togglePlay}
          disabled={isExpired}
          className="h-9 w-9 p-0"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetTimer}
          className="h-9 w-9 p-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
