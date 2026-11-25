import React from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, AlertCircle, Lightbulb } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

interface ExerciseFeedbackBannerProps {
  isCorrect: boolean;
  isTypo?: boolean;
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onRetry?: () => void;
  onContinue: () => void;
  canRetry?: boolean;
  continueLabel?: string;
}

export const ExerciseFeedbackBanner: React.FC<ExerciseFeedbackBannerProps> = ({
  isCorrect,
  isTypo = false,
  explanation,
  urduExplanation,
  showUrdu = true,
  onRetry,
  onContinue,
  canRetry = true,
  continueLabel = 'Continue',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-4 rounded-xl p-4 border transition-all ${
        isCorrect
          ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
          : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          ) : (
            <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">
              {isCorrect ? (isTypo ? 'Correct (Minor typo tolerated)' : 'Correct!') : 'Not quite right'}
            </span>
          </div>

          <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {explanation}
          </div>

          {showUrdu && urduExplanation && (
            <div
              dir="rtl"
              className="font-urdu text-sm text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-gray-900/40 p-2.5 rounded-lg border border-black/5 dark:border-white/5 leading-relaxed"
            >
              {urduExplanation}
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            {!isCorrect && canRetry && onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="gap-1.5 border-rose-300 dark:border-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-800 dark:text-rose-200"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            )}

            <Button
              variant={isCorrect ? 'primary' : 'outline'}
              size="sm"
              onClick={onContinue}
              className={`gap-1.5 ml-auto ${
                isCorrect ? 'bg-[#124F40] hover:bg-[#0e3f33] text-white' : ''
              }`}
            >
              {continueLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
