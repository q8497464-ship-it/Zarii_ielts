import React, { useState } from 'react';
import { evaluateTextAnswer } from '../../utils/answerEvaluation';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';
import { Button } from '../../../../components/ui/Button';

interface ErrorCorrectionExerciseProps {
  id: string;
  prompt: string;
  sentence?: string;
  targetWrongWord?: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, response: { wrongWord: string; correction: string }) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const ErrorCorrectionExercise: React.FC<ErrorCorrectionExerciseProps> = ({
  id,
  prompt,
  sentence,
  targetWrongWord,
  correctAnswer,
  acceptableAnswers = [],
  explanation,
  urduExplanation,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  // Extract sentence tokens from prompt or sentence prop
  const sourceSentence = sentence || prompt;
  const tokens = sourceSentence.split(/\s+/);

  const [tappedWordIdx, setTappedWordIdx] = useState<number | null>(null);
  const [correctionInput, setCorrectionInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const cleanWord = (w: string) => w.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').toLowerCase();

  const handleTapWord = (idx: number) => {
    if (isSubmitted) return;
    setTappedWordIdx(idx);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitted || tappedWordIdx === null || !correctionInput.trim()) return;

    const tappedToken = cleanWord(tokens[tappedWordIdx]);
    const expectedWrong = targetWrongWord ? cleanWord(targetWrongWord) : '';

    // If expectedWrong is provided, verify user tapped the right word
    const wordMatched = !expectedWrong || tappedToken === expectedWrong;

    // Verify correction input
    const evalRes = evaluateTextAnswer(correctionInput, correctAnswer, acceptableAnswers);
    const overallCorrect = wordMatched && evalRes.isCorrect;

    setIsCorrect(overallCorrect);
    setIsSubmitted(true);
    onAnswer(overallCorrect, {
      wrongWord: tokens[tappedWordIdx],
      correction: correctionInput,
    });
  };

  const handleRetry = () => {
    setTappedWordIdx(null);
    setCorrectionInput('');
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Tap the incorrect word in the sentence, then type the correct form:
      </div>

      {/* Interactive Sentence Words */}
      <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-wrap items-center gap-2">
        {tokens.map((token, idx) => {
          const isTapped = tappedWordIdx === idx;
          return (
            <button
              key={`${token}-${idx}`}
              type="button"
              disabled={isSubmitted}
              onClick={() => handleTapWord(idx)}
              className={`px-2.5 py-1.5 rounded-lg text-base md:text-lg font-medium transition-all ${
                isTapped
                  ? 'bg-amber-100 dark:bg-amber-950/60 border border-amber-400 text-amber-900 dark:text-amber-200 underline underline-offset-4 decoration-amber-500 font-semibold'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/60 text-gray-900 dark:text-gray-100'
              }`}
            >
              {token}
            </button>
          );
        })}
      </div>

      {/* Correction Input Form */}
      {tappedWordIdx !== null && !isSubmitted && (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-1">
          <div className="flex-1">
            <input
              type="text"
              value={correctionInput}
              onChange={(e) => setCorrectionInput(e.target.value)}
              placeholder={`Replace "${tokens[tappedWordIdx]}" with...`}
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-[#124F40] focus:ring-2 focus:ring-[#124F40]/20 outline-none text-base"
            />
          </div>
          <Button
            type="submit"
            disabled={!correctionInput.trim()}
            className="bg-[#124F40] hover:bg-[#0e3f33] text-white px-5 rounded-xl font-medium"
          >
            Check Fix
          </Button>
        </form>
      )}

      {isSubmitted && (
        <ExerciseFeedbackBanner
          isCorrect={isCorrect}
          explanation={`${explanation} (Correct word: "${correctAnswer}")`}
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
