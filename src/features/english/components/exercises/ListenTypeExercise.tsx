import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, RotateCcw } from 'lucide-react';
import { playPronunciation } from '../../../dictionary/dictionaryService';
import { evaluateTextAnswer } from '../../utils/answerEvaluation';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';
import { Button } from '../../../../components/ui/Button';

interface ListenTypeExerciseProps {
  id: string;
  prompt: string;
  audioPrompt?: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, response: string) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const ListenTypeExercise: React.FC<ListenTypeExerciseProps> = ({
  id,
  prompt,
  audioPrompt,
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
  const [speed, setSpeed] = useState<'normal' | 'slow'>('normal');
  const inputRef = useRef<HTMLInputElement>(null);

  const textToPlay = audioPrompt || correctAnswer;

  const handlePlayAudio = (chosenSpeed = speed) => {
    playPronunciation(textToPlay, {
      speed: chosenSpeed === 'slow' ? 0.75 : 1.0,
      lang: 'en-US',
    });
  };

  useEffect(() => {
    // Play automatically when opening
    const timer = setTimeout(() => {
      handlePlayAudio('normal');
    }, 200);
    return () => clearTimeout(timer);
  }, [id]);

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
    handlePlayAudio('normal');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {prompt || 'Listen to the audio and type what you hear:'}
      </div>

      {/* Audio Controls Box */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <button
          type="button"
          onClick={() => handlePlayAudio('normal')}
          className="w-12 h-12 rounded-full bg-[#124F40] text-white flex items-center justify-center hover:bg-[#0e3f33] active:scale-95 transition-all shadow-md shrink-0"
          aria-label="Play audio at normal speed"
        >
          <Volume2 className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={() => handlePlayAudio('slow')}
          className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 active:scale-95 transition-all"
          aria-label="Play audio slowly"
        >
          🐢 Slower (0.75x)
        </button>

        <span className="text-xs text-gray-700 dark:text-gray-300 ml-auto italic">
          Click button to replay
        </span>
      </div>

      {/* Typing Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-1">
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          disabled={isSubmitted}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type what you heard..."
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
          explanation={`${explanation} (Correct sentence: "${correctAnswer}")`}
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
