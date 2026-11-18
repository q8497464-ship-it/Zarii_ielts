import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  BookOpen,
  Sparkles,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { getGrammarLessonById, ALL_GRAMMAR_LESSONS } from './vocabContent';
import { shuffleMcqOptions } from '../../lib/mcqShuffle';

export function GrammarLessonRunner() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const lesson = getGrammarLessonById(lessonId || '');

  const [activeTab, setActiveTab] = useState<'theory' | 'exercises'>('theory');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [attemptSeed, setAttemptSeed] = useState(() => lessonId ? `grammar_${lessonId}_v1` : 'grammar_session');

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h2 className="text-xl font-bold mb-2">Lesson Not Found</h2>
        <Link to="/grammar" className="text-teal-600 hover:underline">
          Return to Grammar Lessons
        </Link>
      </div>
    );
  }

  const currentExercise = lesson.exercises[exerciseIndex];
  const userAnswer = selectedAnswers[exerciseIndex];
  const isAnswered = !!userAnswer;

  const shuffledOptions = useMemo(() => {
    if (!currentExercise?.options) return [];
    return shuffleMcqOptions(currentExercise.options, `${attemptSeed}_${currentExercise.id}`);
  }, [currentExercise, attemptSeed]);

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [exerciseIndex]: opt,
    });
  };

  const handleNextExercise = () => {
    if (exerciseIndex + 1 < lesson.exercises.length) {
      setExerciseIndex((i) => i + 1);
    } else {
      setExerciseCompleted(true);
    }
  };

  const correctCount = Object.entries(selectedAnswers).filter(
    ([idx, ans]) => lesson.exercises[Number(idx)]?.correctAnswer === ans
  ).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/grammar"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Grammar Lesson
            </span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 text-xs">
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeTab === 'theory'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Theory
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeTab === 'exercises'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Exercises (10)
          </button>
        </div>
      </div>

      {/* Theory Tab */}
      {activeTab === 'theory' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Core Concept
            </span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              {lesson.explanation}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Band 7+ Examiner Rule:
            </span>
            <p className="leading-relaxed">{lesson.bandTips}</p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('exercises')}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <span>Practice 10 Exercises</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Exercises Tab */}
      {activeTab === 'exercises' && (
        <>
          {exerciseCompleted ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-950 flex items-center justify-center mx-auto text-teal-600 dark:text-teal-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Lesson Exercises Complete!
                </h2>
                <p className="text-sm text-slate-500">
                  You scored <strong className="text-teal-600">{correctCount}</strong> out of{' '}
                  <strong>{lesson.exercises.length}</strong> ({Math.round((correctCount / lesson.exercises.length) * 100)}%)
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setExerciseIndex(0);
                    setExerciseCompleted(false);
                    setAttemptSeed(`grammar_${lessonId}_${Date.now()}`);
                  }}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry Exercises</span>
                </button>
                <button
                  onClick={() => navigate('/grammar')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                >
                  Return to All Lessons
                </button>
              </div>
            </div>
          ) : currentExercise ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Exercise {exerciseIndex + 1} of {lesson.exercises.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Score: {correctCount} / {Object.keys(selectedAnswers).length}
                </span>
              </div>

              <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                {currentExercise.prompt}
              </p>

              {/* Options (Runtime Seeded Shuffle) */}
              <div className="space-y-2.5">
                {shuffledOptions.map((optItem, idx) => {
                  const opt = optItem.text;
                  let btnClass =
                    'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200';

                  if (isAnswered) {
                    if (opt === currentExercise.correctAnswer) {
                      btnClass =
                        'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200 font-semibold';
                    } else if (opt === userAnswer) {
                      btnClass =
                        'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200 line-through';
                    }
                  }

                  return (
                    <button
                      key={optItem.id || idx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnClass}`}
                    >
                      <span className="font-bold text-slate-400">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                      {isAnswered && opt === currentExercise.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      )}
                      {isAnswered && opt === userAnswer && opt !== currentExercise.correctAnswer && (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1 animate-in fade-in">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Explanation:
                  </span>
                  <p className="leading-relaxed">{currentExercise.explanation}</p>
                </div>
              )}

              {/* Footer */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextExercise}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
                  >
                    <span>
                      {exerciseIndex + 1 < lesson.exercises.length
                        ? 'Next Exercise'
                        : 'View Lesson Score'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
