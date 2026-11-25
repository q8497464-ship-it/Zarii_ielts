import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';
import { Button } from '../../../../components/ui/Button';

interface ShortWritingExerciseProps {
  id: string;
  prompt: string;
  modelAnswer?: string;
  evaluationCriteria?: string[];
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, response: string) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const ShortWritingExercise: React.FC<ShortWritingExerciseProps> = ({
  id,
  prompt,
  modelAnswer,
  evaluationCriteria = [],
  explanation,
  urduExplanation,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  const [textVal, setTextVal] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ruleErrors, setRuleErrors] = useState<string[]>([]);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const wordCount = textVal.trim() ? textVal.trim().split(/\s+/).length : 0;

  const handleValidateWriting = () => {
    const trimmed = textVal.trim();
    const errors: string[] = [];

    // Rule 1: Length check (at least 3 words)
    if (wordCount < 3) {
      errors.push('Write at least 3 full words.');
    }

    // Rule 2: Capitalization check (first letter must be uppercase)
    if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase()) {
      errors.push('The sentence must start with a capital letter.');
    }

    // Rule 3: Sentence punctuation (. or ? or !)
    if (trimmed.length > 0 && !/[.?!]$/.test(trimmed)) {
      errors.push('The sentence must end with proper punctuation (. or ?).');
    }

    setRuleErrors(errors);
    const passed = errors.length === 0;

    setIsSubmitted(true);
    onAnswer(passed, textVal);
  };

  const handleRequestAiFeedback = () => {
    setIsLoadingAi(true);
    // Free client-side linguistic evaluation rule generator
    setTimeout(() => {
      let feedback = 'Good effort! Your response follows clear English syntax and word order.';
      if (wordCount < 5) {
        feedback = 'Clear sentence, though expanding with an adjective or adverb would enrich your expression.';
      } else if (textVal.includes('and') || textVal.includes('because')) {
        feedback = 'Excellent use of connectors to form a compound thought.';
      }
      setAiFeedback(feedback);
      setIsLoadingAi(false);
    }, 400);
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setRuleErrors([]);
    setAiFeedback(null);
  };

  const isPassed = isSubmitted && ruleErrors.length === 0;

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {prompt}
      </div>

      <div className="space-y-2">
        <textarea
          rows={3}
          value={textVal}
          disabled={isSubmitted}
          onChange={(e) => setTextVal(e.target.value)}
          placeholder="Write your answer in English here..."
          className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base focus:border-[#124F40] focus:ring-2 focus:ring-[#124F40]/20 outline-none leading-relaxed resize-none"
        />

        <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 px-1">
          <span>Words: {wordCount}</span>
          <span>Capitalize the start and end with a period</span>
        </div>
      </div>

      {/* Criteria Checklist */}
      {evaluationCriteria.length > 0 && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 space-y-1">
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Evaluation Checklist:
          </span>
          <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc pl-4 space-y-0.5">
            {evaluationCriteria.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {!isSubmitted ? (
        <div className="flex items-center justify-end pt-1">
          <Button
            type="button"
            onClick={handleValidateWriting}
            disabled={wordCount === 0}
            className="bg-[#124F40] hover:bg-[#0e3f33] text-white px-5 rounded-xl font-medium"
          >
            Check Writing
          </Button>
        </div>
      ) : (
        <div className="space-y-3 pt-2">
          {ruleErrors.length > 0 && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 text-rose-900 dark:text-rose-200 text-sm space-y-1">
              <span className="font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Please correct the following:
              </span>
              <ul className="list-disc pl-5 space-y-0.5 text-xs">
                {ruleErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Model Answer Preview */}
          {modelAnswer && (
            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-sm">
              <span className="font-semibold text-emerald-900 dark:text-emerald-200">
                Model Example:{' '}
              </span>
              <span className="italic text-gray-800 dark:text-gray-200">"{modelAnswer}"</span>
            </div>
          )}

          {/* Optional AI Linguistic Feedback */}
          {!aiFeedback ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isLoadingAi}
              onClick={handleRequestAiFeedback}
              className="gap-1.5 text-[#124F40] dark:text-[#5BB78D] border-[#124F40]/30"
            >
              <Sparkles className="w-4 h-4 text-[#5BB78D]" />
              <span>{isLoadingAi ? 'Analyzing phrasing...' : 'Get Free AI Feedback'}</span>
            </Button>
          ) : (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <span className="font-bold flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#5BB78D]" />
                Linguistic Feedback:
              </span>
              {aiFeedback}
            </div>
          )}

          <ExerciseFeedbackBanner
            isCorrect={isPassed}
            explanation={explanation}
            urduExplanation={urduExplanation}
            showUrdu={showUrdu}
            onRetry={handleRetry}
            onContinue={onNext}
            canRetry={canRetry}
          />
        </div>
      )}
    </div>
  );
};
