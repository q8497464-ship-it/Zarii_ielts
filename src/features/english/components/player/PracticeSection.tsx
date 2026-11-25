import React, { useState } from 'react';
import { Target, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { ExerciseRenderer, ExerciseData } from '../exercises/ExerciseRenderer';
import { Button } from '../../../../components/ui/Button';
import { recordMistakeToNotebook, recordSkillPracticeResult } from '../../services/masteryService';

interface PracticeSectionProps {
  title: string;
  exercises: ExerciseData[];
  showUrdu?: boolean;
  lessonTitle: string;
  level: any;
  onSectionComplete: (scorePercent: number, results: Record<string, boolean>) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  title,
  exercises = [],
  showUrdu = true,
  lessonTitle,
  level,
  onSectionComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [isSectionFinished, setIsSectionFinished] = useState(false);

  const currentExercise = exercises[currentIdx];

  const handleAnswer = async (isCorrect: boolean, response: any) => {
    if (!currentExercise) return;

    setResults((prev) => ({ ...prev, [currentExercise.id]: isCorrect }));

    // Record skill practice result
    if (currentExercise.skillTag) {
      recordSkillPracticeResult(
        currentExercise.skillTag,
        level,
        isCorrect ? 100 : 0
      );
    }

    // If incorrect, automatically feed to shared Mistake Notebook
    if (!isCorrect) {
      await recordMistakeToNotebook({
        questionId: currentExercise.id,
        skillTag: currentExercise.skillTag || 'general-grammar',
        lessonTitle,
        prompt: currentExercise.prompt,
        userAnswer: typeof response === 'string' ? response : JSON.stringify(response),
        correctAnswer: String(currentExercise.correctAnswer || currentExercise.correctOptionId || 'Target answer'),
        explanation: currentExercise.explanation,
      });
    }
  };

  const handleNext = () => {
    if (currentIdx < exercises.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Completed all exercises in section
      setIsSectionFinished(true);
      const correctCount = Object.values(results).filter(Boolean).length;
      const score = exercises.length > 0 ? Math.round((correctCount / exercises.length) * 100) : 100;
      onSectionComplete(score, results);
    }
  };

  const handleRestartSection = () => {
    setCurrentIdx(0);
    setResults({});
    setIsSectionFinished(false);
  };

  const correctCount = Object.values(results).filter(Boolean).length;
  const progressPercent = Math.round(((currentIdx + 1) / exercises.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#124F40] dark:text-[#5BB78D]">
          <Target className="w-5 h-5" />
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D]">
          Exercise {currentIdx + 1} of {exercises.length}
        </span>
      </div>

      {/* Mini Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-[#124F40] dark:bg-[#5BB78D] h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {!isSectionFinished && currentExercise ? (
        <div className="p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <ExerciseRenderer
            key={currentExercise.id}
            exercise={currentExercise}
            showUrdu={showUrdu}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </div>
      ) : (
        /* Section Completion Card */
        <div className="p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#124F40] dark:text-[#5BB78D] mx-auto" />
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Practice Exercises Complete!
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              You scored {correctCount} out of {exercises.length} (
              {Math.round((correctCount / exercises.length) * 100)}%)
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestartSection}
              className="gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Practice Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
