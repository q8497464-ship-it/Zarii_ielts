import React from 'react';
import { McqExercise } from './McqExercise';
import { FillBlankExercise } from './FillBlankExercise';
import { OrderSentenceExercise } from './OrderSentenceExercise';
import { MatchPairsExercise } from './MatchPairsExercise';
import { SortCategoriesExercise } from './SortCategoriesExercise';
import { ErrorCorrectionExercise } from './ErrorCorrectionExercise';
import { SentenceTransformationExercise } from './SentenceTransformationExercise';
import { TrueFalseExercise } from './TrueFalseExercise';
import { ListenTypeExercise } from './ListenTypeExercise';
import { RepeatAfterMeExercise } from './RepeatAfterMeExercise';
import { ShortWritingExercise } from './ShortWritingExercise';

export interface ExerciseData {
  id: string;
  type: string;
  prompt: string;
  audioPrompt?: string;
  explanation: string;
  urduExplanation?: string;
  skillTag?: string;
  // Exercise-specific properties
  options?: Array<{ id: string; text: string; isPinned?: boolean }>;
  correctOptionId?: string;
  correctAnswer?: any;
  acceptableAnswers?: string[];
  sentenceTokens?: string[];
  correctOrder?: string[];
  pairs?: Array<{ left: string; right: string }>;
  categories?: Array<{ category: string; items: string[] }>;
  targetWrongWord?: string;
  originalSentence?: string;
  modelAnswer?: string;
  evaluationCriteria?: string[];
}

interface ExerciseRendererProps {
  exercise: ExerciseData;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, response: any) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({
  exercise,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  switch (exercise.type) {
    case 'mcq':
      return (
        <McqExercise
          id={exercise.id}
          prompt={exercise.prompt}
          options={exercise.options || []}
          correctOptionId={exercise.correctOptionId || ''}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'fill_blank':
      return (
        <FillBlankExercise
          id={exercise.id}
          prompt={exercise.prompt}
          correctAnswer={String(exercise.correctAnswer || '')}
          acceptableAnswers={exercise.acceptableAnswers}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'order_sentence':
      return (
        <OrderSentenceExercise
          id={exercise.id}
          prompt={exercise.prompt}
          sentenceTokens={exercise.sentenceTokens || []}
          correctOrder={exercise.correctOrder || []}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'match_pairs':
      return (
        <MatchPairsExercise
          id={exercise.id}
          prompt={exercise.prompt}
          pairs={exercise.pairs || []}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'sort_categories':
      return (
        <SortCategoriesExercise
          id={exercise.id}
          prompt={exercise.prompt}
          categories={exercise.categories || []}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'error_correction':
      return (
        <ErrorCorrectionExercise
          id={exercise.id}
          prompt={exercise.prompt}
          targetWrongWord={exercise.targetWrongWord}
          correctAnswer={String(exercise.correctAnswer || '')}
          acceptableAnswers={exercise.acceptableAnswers}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'sentence_transformation':
      return (
        <SentenceTransformationExercise
          id={exercise.id}
          prompt={exercise.prompt}
          originalSentence={exercise.originalSentence}
          correctAnswer={String(exercise.correctAnswer || '')}
          acceptableAnswers={exercise.acceptableAnswers}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'true_false':
      return (
        <TrueFalseExercise
          id={exercise.id}
          prompt={exercise.prompt}
          correctAnswer={exercise.correctAnswer}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'listen_type':
      return (
        <ListenTypeExercise
          id={exercise.id}
          prompt={exercise.prompt}
          audioPrompt={exercise.audioPrompt}
          correctAnswer={String(exercise.correctAnswer || '')}
          acceptableAnswers={exercise.acceptableAnswers}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'repeat_after_me':
      return (
        <RepeatAfterMeExercise
          id={exercise.id}
          prompt={exercise.prompt}
          targetSentence={exercise.prompt}
          modelAnswer={exercise.modelAnswer}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    case 'short_writing':
      return (
        <ShortWritingExercise
          id={exercise.id}
          prompt={exercise.prompt}
          modelAnswer={exercise.modelAnswer}
          evaluationCriteria={exercise.evaluationCriteria}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );

    default:
      // Fallback: render as MCQ if options exist, or fill-blank
      if (exercise.options && exercise.options.length > 0) {
        return (
          <McqExercise
            id={exercise.id}
            prompt={exercise.prompt}
            options={exercise.options}
            correctOptionId={exercise.correctOptionId || exercise.options[0].id}
            explanation={exercise.explanation}
            urduExplanation={exercise.urduExplanation}
            showUrdu={showUrdu}
            onAnswer={onAnswer}
            onNext={onNext}
            canRetry={canRetry}
          />
        );
      }
      return (
        <FillBlankExercise
          id={exercise.id}
          prompt={exercise.prompt}
          correctAnswer={String(exercise.correctAnswer || '')}
          acceptableAnswers={exercise.acceptableAnswers}
          explanation={exercise.explanation}
          urduExplanation={exercise.urduExplanation}
          showUrdu={showUrdu}
          onAnswer={onAnswer}
          onNext={onNext}
          canRetry={canRetry}
        />
      );
  }
};
