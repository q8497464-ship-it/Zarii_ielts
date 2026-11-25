import React, { useState, useMemo } from 'react';
import { RotateCcw, Link2, Check, X } from 'lucide-react';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';
import { Button } from '../../../../components/ui/Button';

interface MatchPair {
  left: string;
  right: string;
}

interface MatchPairsExerciseProps {
  id: string;
  prompt: string;
  pairs: MatchPair[];
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, matches: Record<string, string>) => void;
  onNext: () => void;
  canRetry?: boolean;
}

const PAIR_COLORS = [
  'border-blue-500 bg-blue-50/70 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200',
  'border-emerald-500 bg-emerald-50/70 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200',
  'border-amber-500 bg-amber-50/70 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200',
  'border-purple-500 bg-purple-50/70 text-purple-900 dark:bg-purple-950/40 dark:text-purple-200',
  'border-indigo-500 bg-indigo-50/70 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200',
  'border-teal-500 bg-teal-50/70 text-teal-900 dark:bg-teal-950/40 dark:text-teal-200',
];

export const MatchPairsExercise: React.FC<MatchPairsExerciseProps> = ({
  id,
  prompt,
  pairs = [],
  explanation,
  urduExplanation,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  const leftItems = useMemo(() => pairs.map((p) => p.left), [pairs]);
  const rightItems = useMemo(() => {
    return [...pairs.map((p) => p.right)].sort(() => 0.5 - Math.random());
  }, [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const matchedColors = useMemo(() => {
    const map: Record<string, string> = {};
    Object.keys(matches).forEach((lKey, idx) => {
      const rKey = matches[lKey];
      const color = PAIR_COLORS[idx % PAIR_COLORS.length];
      map[lKey] = color;
      map[rKey] = color;
    });
    return map;
  }, [matches]);

  const handleSelectLeft = (left: string) => {
    if (isSubmitted) return;
    if (matches[left]) {
      // Remove match
      const next = { ...matches };
      delete next[left];
      setMatches(next);
      return;
    }
    setSelectedLeft(left);
  };

  const handleSelectRight = (right: string) => {
    if (isSubmitted) return;
    // Check if right is already matched to another left
    const existingLeft = Object.keys(matches).find((k) => matches[k] === right);
    if (existingLeft) {
      const next = { ...matches };
      delete next[existingLeft];
      setMatches(next);
      return;
    }

    if (selectedLeft) {
      setMatches((prev) => ({ ...prev, [selectedLeft]: right }));
      setSelectedLeft(null);
    }
  };

  const handleReset = () => {
    if (isSubmitted) return;
    setMatches({});
    setSelectedLeft(null);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    if (Object.keys(matches).length !== pairs.length) return;

    let correctCount = 0;
    pairs.forEach((p) => {
      if (matches[p.left] === p.right) {
        correctCount++;
      }
    });

    const allCorrect = correctCount === pairs.length;
    setIsCorrect(allCorrect);
    setIsSubmitted(true);
    onAnswer(allCorrect, matches);
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setIsCorrect(false);
    setMatches({});
    setSelectedLeft(null);
  };

  const allMatched = Object.keys(matches).length === pairs.length;

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {prompt}
      </div>

      <div className="text-xs text-gray-700 dark:text-gray-300">
        Tap an item on the left, then tap its matching pair on the right.
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6 pt-2">
        {/* Left Column */}
        <div className="space-y-2">
          {leftItems.map((left) => {
            const isSelected = selectedLeft === left;
            const isMatched = !!matches[left];
            const colorClass = matchedColors[left] || '';

            return (
              <button
                key={left}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleSelectLeft(left)}
                className={`w-full p-3.5 rounded-xl border text-left text-sm md:text-base font-medium transition-all shadow-sm flex items-center justify-between ${
                  isMatched
                    ? `${colorClass} border-2`
                    : isSelected
                    ? 'border-[#124F40] dark:border-[#5BB78D] bg-emerald-50/50 dark:bg-emerald-950/20 text-[#124F40] dark:text-[#5BB78D] ring-2 ring-[#124F40]/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-gray-400'
                }`}
              >
                <span>{left}</span>
                {isMatched && <Link2 className="w-4 h-4 shrink-0 opacity-70" />}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          {rightItems.map((right) => {
            const isMatched = Object.values(matches).includes(right);
            const colorClass = matchedColors[right] || '';

            return (
              <button
                key={right}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleSelectRight(right)}
                className={`w-full p-3.5 rounded-xl border text-left text-sm md:text-base font-medium transition-all shadow-sm flex items-center justify-between ${
                  isMatched
                    ? `${colorClass} border-2`
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-gray-400'
                }`}
              >
                <span>{right}</span>
                {isMatched && <Check className="w-4 h-4 shrink-0 opacity-70" />}
              </button>
            );
          })}
        </div>
      </div>

      {!isSubmitted && (
        <div className="flex items-center gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={Object.keys(matches).length === 0}
            className="gap-1.5 text-gray-600 dark:text-gray-300"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!allMatched}
            className="bg-[#124F40] hover:bg-[#0e3f33] text-white px-5 rounded-xl ml-auto"
          >
            Check Matches ({Object.keys(matches).length}/{pairs.length})
          </Button>
        </div>
      )}

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
