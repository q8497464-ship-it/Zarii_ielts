import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Volume2, 
  Zap, 
  Trophy,
  HelpCircle,
  BookOpen,
  Filter
} from 'lucide-react';
import { ALL_ENGLISH_LEVELS, LessonExercise } from '../data/courseContent';
import type { EnglishCEFRLevel } from '../../../types';
import { db } from '../../../lib/db';

interface PracticeItem extends LessonExercise {
  level: EnglishCEFRLevel;
  sourceLesson: string;
}

export const EnglishPracticePage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<EnglishCEFRLevel | 'ALL'>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showUrdu, setShowUrdu] = useState(true);
  const [completed, setCompleted] = useState(false);

  // Extract all exercises from course content
  const allExercises = useMemo<PracticeItem[]>(() => {
    const list: PracticeItem[] = [];
    ALL_ENGLISH_LEVELS.forEach(lvl => {
      lvl.units.forEach(unit => {
        unit.lessons.forEach(lesson => {
          lesson.exercises.forEach(ex => {
            list.push({
              ...ex,
              level: lvl.level,
              sourceLesson: lesson.title,
            });
          });
        });
      });
    });
    return list;
  }, []);

  const filteredExercises = useMemo(() => {
    if (selectedLevel === 'ALL') return allExercises;
    return allExercises.filter(item => item.level === selectedLevel);
  }, [allExercises, selectedLevel]);

  const currentExercise = filteredExercises[currentIndex] || null;

  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = async () => {
    if (!currentExercise || !selectedAnswer || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedAnswer.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase();
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    try {
      await db.lessonAttempts.add({
        lessonId: `practice-${currentExercise.id}`,
        courseId: 'english-practice',
        track: 'english',
        score: isCorrect ? 1 : 0,
        totalQuestions: 1,
        answers: {
          [currentExercise.id]: {
            userAnswer: selectedAnswer,
            isCorrect,
          }
        },
        completedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Could not record practice attempt:', err);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredExercises.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setCompleted(false);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#124F40] dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#124F40] dark:text-emerald-400">
              Interactive Arena
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            English Practice & Exercises
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Test your grammar, vocabulary, and sentence construction with instant feedback.
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-neutral-800 p-1 rounded-xl">
            {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  handleRestart();
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  selectedLevel === lvl
                    ? 'bg-white dark:bg-neutral-700 text-[#124F40] dark:text-emerald-400 shadow-sm font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Practice Container */}
      {!completed && currentExercise ? (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 md:p-8 shadow-sm space-y-6">
          {/* Progress & Meta Bar */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#124F40] dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
              Level {currentExercise.level}
            </span>
            <span>
              Question {currentIndex + 1} of {filteredExercises.length}
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Score: {score}
            </span>
          </div>

          <div className="w-full bg-gray-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#5BB78D] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / filteredExercises.length) * 100}%` }}
            />
          </div>

          {/* Prompt */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                {currentExercise.prompt}
              </h2>
              <button
                onClick={() => speak(currentExercise.prompt)}
                className="p-2 rounded-xl text-gray-500 hover:text-[#124F40] hover:bg-emerald-50 dark:hover:bg-neutral-800 transition-colors"
                title="Listen to question"
                aria-label="Listen"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Source: {currentExercise.sourceLesson}
            </p>
          </div>

          {/* Options */}
          {currentExercise.options && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {currentExercise.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = isAnswerChecked && option === currentExercise.correctAnswer;
                const isWrong = isAnswerChecked && isSelected && option !== currentExercise.correctAnswer;

                let btnStyles = 'border-gray-200 dark:border-neutral-800 hover:border-emerald-300 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200';

                if (isSelected && !isAnswerChecked) {
                  btnStyles = 'border-[#124F40] dark:border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 text-[#124F40] dark:text-emerald-300 font-medium ring-2 ring-emerald-500/20';
                } else if (isCorrect) {
                  btnStyles = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold';
                } else if (isWrong) {
                  btnStyles = 'border-rose-400 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswerChecked}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left text-sm md:text-base transition-all ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 ml-2" />}
                    {isWrong && <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Explanation Box */}
          <AnimatePresence>
            {isAnswerChecked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-gray-50 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 space-y-2 text-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    Explanation
                  </div>
                  {currentExercise.urduExplanation && (
                    <button
                      onClick={() => setShowUrdu(!showUrdu)}
                      className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      {showUrdu ? 'Hide Urdu' : 'Show Urdu'}
                    </button>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentExercise.explanation}
                </p>
                {showUrdu && currentExercise.urduExplanation && (
                  <p className="text-right text-gray-600 dark:text-gray-400 font-serif pt-1 border-t border-gray-200 dark:border-neutral-700/60" dir="rtl">
                    {currentExercise.urduExplanation}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
            {!isAnswerChecked ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                className="px-6 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0d3b30] text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0d3b30] text-white text-sm font-semibold transition-all shadow-sm"
              >
                <span>{currentIndex + 1 < filteredExercises.length ? 'Next Question' : 'Finish Session'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : completed ? (
        /* Completed State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-8 text-center space-y-6 shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-[#124F40] dark:text-emerald-400">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Practice Session Completed!
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              You scored <span className="font-bold text-emerald-600 dark:text-emerald-400">{score}</span> out of{' '}
              <span className="font-bold">{filteredExercises.length}</span> ({Math.round((score / (filteredExercises.length || 1)) * 100)}%)
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No practice exercises found for this level.
        </div>
      )}
    </div>
  );
};
export default EnglishPracticePage;
