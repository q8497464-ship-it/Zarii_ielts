import React, { useState, useMemo } from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';
import { Button } from '../../../../components/ui/Button';

interface OrderSentenceExerciseProps {
  id: string;
  prompt: string;
  sentenceTokens: string[];
  correctOrder: string[];
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, orderedTokens: string[]) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const OrderSentenceExercise: React.FC<OrderSentenceExerciseProps> = ({
  id,
  prompt,
  sentenceTokens = [],
  correctOrder = [],
  explanation,
  urduExplanation,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  // Token state with unique tracking keys to handle duplicate words
  const initialTokens = useMemo(() => {
    // Deterministic pseudo-random shuffle for starting state
    return sentenceTokens
      .map((token, index) => ({ id: `${token}-${index}`, text: token }))
      .sort(() => 0.5 - Math.random());
  }, [sentenceTokens]);

  const [availableTokens, setAvailableTokens] = useState(initialTokens);
  const [placedTokens, setPlacedTokens] = useState<Array<{ id: string; text: string }>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Dragging support
  const [draggedTokenId, setDraggedTokenId] = useState<string | null>(null);

  const handlePlaceToken = (token: { id: string; text: string }) => {
    if (isSubmitted) return;
    setAvailableTokens((prev) => prev.filter((t) => t.id !== token.id));
    setPlacedTokens((prev) => [...prev, token]);
  };

  const handleRemoveToken = (token: { id: string; text: string }) => {
    if (isSubmitted) return;
    setPlacedTokens((prev) => prev.filter((t) => t.id !== token.id));
    setAvailableTokens((prev) => [...prev, token]);
  };

  const handleReset = () => {
    if (isSubmitted) return;
    setAvailableTokens(initialTokens);
    setPlacedTokens([]);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    if (placedTokens.length === 0) return;

    const assembled = placedTokens.map((t) => t.text);
    const correct =
      assembled.length === correctOrder.length &&
      assembled.every((t, i) => t.toLowerCase() === correctOrder[i].toLowerCase());

    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(correct, assembled);
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setIsCorrect(false);
    setAvailableTokens(initialTokens);
    setPlacedTokens([]);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, tokenId: string) => {
    setDraggedTokenId(tokenId);
    e.dataTransfer.setData('text/plain', tokenId);
  };

  const handleDropOnPlaced = (e: React.DragEvent) => {
    e.preventDefault();
    if (isSubmitted || !draggedTokenId) return;
    const token = availableTokens.find((t) => t.id === draggedTokenId);
    if (token) {
      handlePlaceToken(token);
    }
    setDraggedTokenId(null);
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {prompt}
      </div>

      <div className="text-xs text-gray-700 dark:text-gray-300">
        Tap or drag words to build the sentence in the correct order.
      </div>

      {/* Sentence Builder Drop Zone / Tray */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnPlaced}
        className={`min-h-[64px] p-3 rounded-xl border-2 border-dashed flex flex-wrap items-center gap-2 transition-all ${
          isSubmitted
            ? isCorrect
              ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
              : 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/20'
            : placedTokens.length === 0
            ? 'border-gray-300 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/30'
            : 'border-[#124F40]/50 dark:border-[#5BB78D]/50 bg-white dark:bg-gray-800'
        }`}
      >
        {placedTokens.length === 0 ? (
          <span className="text-sm text-gray-600 dark:text-gray-300 italic px-2">
            Select words below in order...
          </span>
        ) : (
          placedTokens.map((token) => (
            <button
              key={token.id}
              type="button"
              disabled={isSubmitted}
              onClick={() => handleRemoveToken(token)}
              className="px-3.5 py-2 rounded-lg bg-[#124F40] text-white font-medium text-sm md:text-base shadow-sm hover:bg-[#0e3f33] active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>{token.text}</span>
            </button>
          ))
        )}
      </div>

      {/* Available Word Chips Pool */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {availableTokens.map((token) => (
          <button
            key={token.id}
            type="button"
            draggable={!isSubmitted}
            onDragStart={(e) => handleDragStart(e, token.id)}
            disabled={isSubmitted}
            onClick={() => handlePlaceToken(token)}
            className="px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium text-sm md:text-base shadow-sm hover:border-[#124F40] hover:text-[#124F40] dark:hover:border-[#5BB78D] dark:hover:text-[#5BB78D] active:scale-95 transition-all"
          >
            {token.text}
          </button>
        ))}
      </div>

      {/* Action Controls */}
      {!isSubmitted && (
        <div className="flex items-center gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={placedTokens.length === 0}
            className="gap-1.5 text-gray-600 dark:text-gray-300"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={placedTokens.length === 0}
            className="bg-[#124F40] hover:bg-[#0e3f33] text-white px-5 rounded-xl ml-auto"
          >
            Check Order
          </Button>
        </div>
      )}

      {isSubmitted && (
        <ExerciseFeedbackBanner
          isCorrect={isCorrect}
          explanation={`${explanation} (Correct sentence: "${correctOrder.join(' ')}")`}
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
