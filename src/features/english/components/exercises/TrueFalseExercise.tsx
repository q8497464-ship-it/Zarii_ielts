import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';

interface TrueFalseExerciseProps {
  id: string;
  prompt: string;
  correctAnswer: boolean | string; // true | false or "true" | "false"
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, response: boolean) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const TrueFalseExercise: React.FC<TrueFalseExerciseProps> = ({
  id,
  prompt,
  correctAnswer,
  explanation,
  urduExplanation,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  const [selectedVal, setSelectedVal] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const targetBool = typeof correctAnswer === 'boolean' ? correctAnswer : String(correctAnswer).toLowerCase() === 'true';

  const handleSelect = (val: boolean) => {
    if (isSubmitted) return;
    setSelectedVal(val);
    setIsSubmitted(true);
    const correct = val === targetBool;
    onAnswer(correct, val);
  };

  const handleRetry = () => {
    setSelectedVal(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedVal === targetBool;

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100 leading-snug">
        {prompt}
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
        <button
          type="button"
          disabled={isSubmitted}
          onClick={() => handleSelect(true)}
          className={`p-4 rounded-xl border-2 text-center font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm ${
            isSubmitted
              ? targetBool === true
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/30'
                : selectedVal === true
                ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100'
                : 'opacity-50 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-emerald-600 hover:text-emerald-700 active:scale-98'
          }`}
        >
          <Check className="w-5 h-5 text-emerald-600" />
          <span>TRUE</span>
        </button>

        <button
          type="button"
          disabled={isSubmitted}
          onClick={() => handleSelect(false)}
          className={`p-4 rounded-xl border-2 text-center font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm ${
            isSubmitted
              ? targetBool === false
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/30'
                : selectedVal === false
                ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100'
                : 'opacity-50 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-rose-600 hover:text-rose-700 active:scale-98'
          }`}
        >
          <X className="w-5 h-5 text-rose-600" />
          <span>FALSE</span>
        </button>
      </div>

      {isSubmitted && (
        <ExerciseFeedbackBanner
          isCorrect={isCorrect}
          explanation={explanation}
          urduExplanation={urduExplanation}
          showUrdu={showUrdu}
          onRetry={handleRetry}
          onContinue={onNext}
          canRetry={canRetry}
        />
      )}
    </div>
  );
};
