import React, { useState, useEffect, useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';

interface McqOption {
  id: string;
  text: string;
  isPinned?: boolean;
}

interface McqExerciseProps {
  id: string;
  prompt: string;
  options: McqOption[];
  correctOptionId: string;
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, selectedId: string) => void;
  onNext: () => void;
  isSubmitted?: boolean;
  canRetry?: boolean;
}

export const McqExercise: React.FC<McqExerciseProps> = ({
  id,
  prompt,
  options = [],
  correctOptionId,
  explanation,
  urduExplanation,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Stable shuffle per attempt; pinned options ("all of the above") stay at the end
  const displayOptions = useMemo(() => {
    const unpinned = options.filter((o) => !o.isPinned);
    const pinned = options.filter((o) => o.isPinned);

    // If shuffleSeed is 0, keep author order; otherwise shuffle unpinned
    if (shuffleSeed === 0) {
      return [...unpinned, ...pinned];
    }

    const shuffled = [...unpinned].sort((a, b) => {
      const hashA = (a.id.charCodeAt(0) * 31 + shuffleSeed) % 100;
      const hashB = (b.id.charCodeAt(0) * 31 + shuffleSeed) % 100;
      return hashA - hashB;
    });

    return [...shuffled, ...pinned];
  }, [options, shuffleSeed]);

  // Keyboard navigation (1-4 to select, Enter to submit/continue)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitted) {
        if (e.key === 'Enter') {
          e.preventDefault();
          onNext();
        }
        return;
      }

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= displayOptions.length) {
        e.preventDefault();
        setSelectedId(displayOptions[num - 1].id);
      } else if (e.key === 'Enter' && selectedId) {
        e.preventDefault();
        handleSubmit(selectedId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayOptions, selectedId, isSubmitted, onNext]);

  const handleSubmit = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedId(optionId);
    setIsSubmitted(true);
    const isCorrect = optionId === correctOptionId;
    onAnswer(isCorrect, optionId);
  };

  const handleRetry = () => {
    setSelectedId(null);
    setIsSubmitted(false);
    setShuffleSeed((prev) => prev + 1);
  };

  const isCorrect = selectedId === correctOptionId;

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100 leading-snug">
        {prompt}
      </div>

      <div className="space-y-2.5" role="radiogroup" aria-label={prompt}>
        {displayOptions.map((opt, idx) => {
          const isSelected = selectedId === opt.id;
          const isKeyOption = opt.id === correctOptionId;

          let btnClass = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500';

          if (isSubmitted) {
            if (isKeyOption) {
              btnClass = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/30';
            } else if (isSelected && !isKeyOption) {
              btnClass = 'border-rose-400 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100';
            } else {
              btnClass = 'opacity-60 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40';
            }
          } else if (isSelected) {
            btnClass = 'border-[#124F40] dark:border-[#5BB78D] bg-emerald-50/40 dark:bg-emerald-950/20 text-[#124F40] dark:text-[#5BB78D] ring-2 ring-[#124F40]/20';
          }

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isSubmitted}
              onClick={() => {
                if (!isSubmitted) {
                  handleSubmit(opt.id);
                }
              }}
              className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border text-left text-sm md:text-base font-normal transition-all shadow-sm ${btnClass}`}
            >
              <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold border bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10">
                {idx + 1}
              </span>
              <span className="flex-1 leading-relaxed">{opt.text}</span>
              {isSubmitted && isKeyOption && (
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-label="Correct" />
              )}
              {isSubmitted && isSelected && !isKeyOption && (
                <X className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" aria-label="Incorrect" />
              )}
            </button>
          );
        })}
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
