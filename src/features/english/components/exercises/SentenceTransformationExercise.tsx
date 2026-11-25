import React, { useState, useRef, useEffect } from 'react';
import { evaluateTextAnswer } from '../../utils/answerEvaluation';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';
import { Button } from '../../../../components/ui/Button';

interface SentenceTransformationExerciseProps {
  id: string;
  prompt: string;
  originalSentence?: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, response: string) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const SentenceTransformationExercise: React.FC<SentenceTransformationExerciseProps> = ({
  id,
  prompt,
  originalSentence,
  correctAnswer,
  acceptableAnswers = [],
  explanation,
  urduExplanation,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [evalResult, setEvalResult] = useState<{ isCorrect: boolean; isTypo: boolean } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitted) {
      onNext();
      return;
    }
    if (!inputVal.trim()) return;

    const res = evaluateTextAnswer(inputVal, correctAnswer, acceptableAnswers);
    setEvalResult({ isCorrect: res.isCorrect, isTypo: res.isTypo });
    setIsSubmitted(true);
    onAnswer(res.isCorrect, inputVal);
  };

  const handleRetry = () => {
    setInputVal('');
    setIsSubmitted(false);
    setEvalResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="space-y-4">
      <div className="text-base text-gray-700 dark:text-gray-300 font-medium">
        {prompt}
      </div>

      {originalSentence && (
        <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40 text-lg font-semibold text-gray-900 dark:text-gray-100">
          "{originalSentence}"
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-1">
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          disabled={isSubmitted}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type the transformed sentence..."
          autoCapitalize="sentences"
          spellCheck="false"
          className={`flex-1 px-4 py-3 rounded-xl border text-base outline-none transition-all ${
            isSubmitted
              ? evalResult?.isCorrect
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100'
                : 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-[#124F40] focus:ring-2 focus:ring-[#124F40]/20'
          }`}
        />

        {!isSubmitted && (
          <Button
            type="submit"
            disabled={!inputVal.trim()}
            className="bg-[#124F40] hover:bg-[#0e3f33] text-white px-5 rounded-xl font-medium"
          >
            Check
          </Button>
        )}
      </form>

      {isSubmitted && evalResult && (
        <ExerciseFeedbackBanner
          isCorrect={evalResult.isCorrect}
          isTypo={evalResult.isTypo}
          explanation={`${explanation} (Target sentence: "${correctAnswer}")`}
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
