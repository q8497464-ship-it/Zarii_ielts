import React, { useState, useEffect, useRef } from 'react';
import { evaluateTextAnswer } from '../../utils/answerEvaluation';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';
import { Button } from '../../../../components/ui/Button';

interface FillBlankExerciseProps {
  id: string;
  prompt: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, answer: string) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const FillBlankExercise: React.FC<FillBlankExerciseProps> = ({
  id,
  prompt,
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

  // Render prompt with clean visual blank if _____ is used
  const renderPromptWithBlank = () => {
    const parts = prompt.split(/_{3,}/);
    if (parts.length <= 1) {
      return <div>{prompt}</div>;
    }

    return (
      <div className="flex flex-wrap items-baseline gap-2 text-lg font-medium text-gray-900 dark:text-gray-100">
        <span>{parts[0]}</span>
        <span className="inline-block border-b-2 border-[#124F40] dark:border-[#5BB78D] px-2 py-0.5 min-w-[80px] text-center font-bold text-[#124F40] dark:text-[#5BB78D]">
          {isSubmitted ? inputVal || '—' : inputVal || '...'}
        </span>
        <span>{parts.slice(1).join('')}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="leading-snug">{renderPromptWithBlank()}</div>

      <form onSubmit={handleSubmit} className="flex gap-2.5 max-w-lg mt-3">
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          disabled={isSubmitted}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type your answer here..."
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          aria-label="Your answer"
          className={`flex-1 px-4 py-3 rounded-xl border text-base outline-none transition-all ${
            isSubmitted
              ? evalResult?.isCorrect
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100'
                : 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-[#124F40] dark:focus:border-[#5BB78D] focus:ring-2 focus:ring-[#124F40]/20'
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
          explanation={`${explanation} (Correct answer: ${correctAnswer})`}
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
