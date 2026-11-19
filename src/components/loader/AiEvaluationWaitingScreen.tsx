import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatedZariiMark, ShimmerProgressBar } from './Loader';
import { getRandomTip, LoadingTip } from '../../lib/loadingTips';
import { Button } from '../ui/Button';

export interface AiEvaluationWaitingScreenProps {
  moduleType?: 'writing' | 'speaking';
  title?: string;
  onRetry?: () => void;
  error?: string | null;
  className?: string;
}

export function AiEvaluationWaitingScreen({
  moduleType = 'writing',
  title,
  onRetry,
  error,
  className,
}: AiEvaluationWaitingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSlow, setIsSlow] = useState(false);
  const [currentTip, setCurrentTip] = useState<LoadingTip>(() =>
    getRandomTip(moduleType === 'writing' ? 'tip-writing-1' : 'tip-speaking-1')
  );
  const [tipFade, setTipFade] = useState(true);

  const steps =
    moduleType === 'writing'
      ? [
          'Reading your essay submission',
          'Checking grammar range and lexical accuracy',
          'Assessing task response and coherence structure',
          'Preparing Cambridge criterion feedback & band estimates',
        ]
      : [
          'Transcribing and parsing audio metrics',
          'Analyzing fluency, pauses, and speech tempo',
          'Evaluating grammar structures and lexical resource',
          'Calibrating criterion feedback to IELTS Speaking standards',
        ];

  // Advance steps smoothly across typical 3-6s wait time
  useEffect(() => {
    if (error) return;

    const t1 = setTimeout(() => setCurrentStep(1), 1200);
    const t2 = setTimeout(() => setCurrentStep(2), 2600);
    const t3 = setTimeout(() => setCurrentStep(3), 4200);
    const slowTimer = setTimeout(() => setIsSlow(true), 7500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(slowTimer);
    };
  }, [error]);

  // Rotate tips every 2.5s
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipFade(false);
      setTimeout(() => {
        setCurrentTip((prev) => getRandomTip(prev.id));
        setTipFade(true);
      }, 200);
    }, 2500);

    return () => clearInterval(tipInterval);
  }, []);

  if (error) {
    return (
      <div
        role="alert"
        className={cn(
          'w-full max-w-xl mx-auto my-8 p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-[#112019]/95 border border-rose-200 dark:border-rose-900/50 shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200',
          className
        )}
      >
        <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-900/60">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Evaluation Could Not Complete
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            {error || 'The examiner assessment took longer than expected or network connection was interrupted.'}
          </p>
        </div>
        {onRetry && (
          <div className="pt-2">
            <Button
              variant="primary"
              onClick={onRetry}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Retry Evaluation
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'w-full max-w-xl mx-auto my-8 p-6 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#112019]/90 border border-slate-200/90 dark:border-white/10 shadow-xl text-center space-y-6 select-none animate-in fade-in duration-200',
        className
      )}
    >
      <span className="sr-only">Examiner evaluating submission...</span>

      {/* Pulsing Mark */}
      <AnimatedZariiMark size="md" className="mx-auto" />

      {/* Main Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#124F40] dark:text-white tracking-tight">
          {title || (moduleType === 'writing' ? 'Examiner is Evaluating Your Essay...' : 'Examiner is Assessing Your Speaking Test...')}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Official 4-Criterion IELTS Band Calibration
        </p>
      </div>

      {/* Progress Shimmer */}
      <ShimmerProgressBar className="mx-auto w-48" />

      {/* Honest Step Checklist */}
      <div className="text-left space-y-2.5 max-w-sm mx-auto pt-2">
        {steps.map((step, idx) => {
          const isDone = currentStep > idx;
          const isCurrent = currentStep === idx;

          return (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-3 text-xs sm:text-[13px] transition-all duration-300',
                isDone && 'text-[#124F40] dark:text-[#5BB78D] font-semibold',
                isCurrent && 'text-slate-900 dark:text-white font-bold translate-x-1',
                !isDone && !isCurrent && 'text-slate-400 dark:text-slate-600 opacity-60'
              )}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-[#5BB78D] shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-[#5BB78D] border-t-transparent animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 shrink-0" />
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>

      {/* Slow Warning if taking > 7.5s */}
      {isSlow && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-center justify-center gap-2 animate-in fade-in">
          <Clock className="w-4 h-4 shrink-0" />
          <span>Still working, thanks for waiting. AI examiner is generating thorough comments...</span>
        </div>
      )}

      {/* Rotating Friendly Study Tip */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 min-h-[50px] flex items-center justify-center">
        <p
          className={cn(
            'text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 italic transition-opacity duration-200',
            tipFade ? 'opacity-100' : 'opacity-0'
          )}
        >
          {currentTip.text}
        </p>
      </div>
    </div>
  );
}

export default AiEvaluationWaitingScreen;
