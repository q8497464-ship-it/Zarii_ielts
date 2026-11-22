import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  BookOpen,
  MessageSquare,
  Award,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { getCourseLessonById, type CourseLesson } from '../data/courseContent';
import { db } from '../../../lib/db';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { playPronunciation } from '../../dictionary/dictionaryService';
import { cn } from '../../../lib/utils';

export function EnglishLessonRunnerPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const lesson = getCourseLessonById(lessonId || 'eng-a1-l1');

  // Navigation steps: 1 = Theory, 2 = Vocabulary, 3 = Dialogue, 4 = Exercises, 5 = Complete
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [showUrdu, setShowUrdu] = useState(true);

  // Exercise states
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [exerciseChecked, setExerciseChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  if (!lesson) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold">Lesson Not Found</h2>
        <Link to="/app/english/course" className="text-teal-600 hover:underline">
          Return to English Course Syllabus
        </Link>
      </div>
    );
  }

  const currentExercise = lesson.exercises[exerciseIdx];
  const totalExercises = lesson.exercises.length;

  const handleSelectOption = (opt: string) => {
    if (exerciseChecked) return;
    setSelectedAnswers({ ...selectedAnswers, [exerciseIdx]: opt });
  };

  const handleCheckAnswer = () => {
    if (!currentExercise || exerciseChecked) return;
    const userAnswer = selectedAnswers[exerciseIdx];
    const correct = userAnswer === currentExercise.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setExerciseChecked(true);
  };

  const handleNextExercise = () => {
    if (exerciseIdx + 1 < totalExercises) {
      setExerciseIdx((prev) => prev + 1);
      setExerciseChecked(false);
    } else {
      // Completed all exercises
      saveLessonCompletion();
      setCurrentStep(5);
    }
  };

  const saveLessonCompletion = async () => {
    try {
      const now = new Date().toISOString();
      await db.lessonAttempts.add({
        lessonId: lesson.id,
        courseId: lesson.unitId,
        track: 'english',
        score,
        totalQuestions: totalExercises,
        answers: selectedAnswers,
        completedAt: now,
      });

      // Update course progress in Dexie
      const existing = await db.courseProgress.where('courseId').equals(lesson.unitId).first();
      const completedSet = new Set(existing?.completedLessons || []);
      completedSet.add(lesson.id);

      if (existing && existing.id) {
        await db.courseProgress.update(existing.id, {
          completedLessons: Array.from(completedSet),
          status: 'in_progress',
          lastAccessedAt: now,
        });
      } else {
        await db.courseProgress.add({
          courseId: lesson.unitId,
          level: lesson.level,
          status: 'in_progress',
          progressPercentage: 50,
          completedLessons: [lesson.id],
          lastAccessedAt: now,
        });
      }

      addToast({
        type: 'success',
        title: 'Lesson Completed!',
        message: `You earned +${lesson.xpReward} XP in Level ${lesson.level}.`,
      });
    } catch (err) {
      console.error('Error saving lesson progress:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* 1. Top Bar: Back, Title, Step Progress */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-[#24392F]">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/app/english/course')}
            className="rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Syllabus
          </Button>
          <div>
            <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
              Level {lesson.level} • {lesson.grammarFocus}
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                'w-6 h-1.5 rounded-full transition-all',
                currentStep >= s ? 'bg-[#124F40] dark:bg-[#5BB78D]' : 'bg-slate-200 dark:bg-slate-800'
              )}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: THEORY & GRAMMAR */}
      {currentStep === 1 && (
        <Card className="p-6 sm:p-8 bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Step 1: Grammar Concept & Rules
              </h2>
            </div>
            <button
              onClick={() => setShowUrdu(!showUrdu)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {showUrdu ? 'Hide Urdu Translation' : 'Show Urdu Translation'}
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
            {lesson.theoryMarkdown}
          </div>

          {showUrdu && lesson.urduTheoryMarkdown && (
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-amber-950 dark:text-amber-200 font-serif leading-relaxed text-sm whitespace-pre-line" dir="rtl">
              {lesson.urduTheoryMarkdown}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button
              onClick={() => setCurrentStep(2)}
              className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
            >
              Next: Key Vocabulary
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: VOCABULARY */}
      {currentStep === 2 && (
        <Card className="p-6 sm:p-8 bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Step 2: Core Vocabulary & Pronunciation
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              {lesson.vocabulary.length} Words to Learn
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lesson.vocabulary.map((v, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#162720] border border-slate-200/80 dark:border-[#24392F] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 dark:text-white capitalize">
                      {v.word}
                    </span>
                    <button
                      onClick={() => playPronunciation(v.word)}
                      className="p-1 rounded-md text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-2xs font-bold uppercase text-teal-600">{v.partOfSpeech}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{v.meaning}</p>
                {v.urduMeaning && (
                  <span className="text-xs font-serif text-amber-700 dark:text-amber-400 block" dir="rtl">
                    {v.urduMeaning}
                  </span>
                )}
                <p className="text-2xs text-slate-500 italic pt-1">"{v.example}"</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="text-xs rounded-xl"
            >
              Back to Grammar
            </Button>
            <Button
              onClick={() => setCurrentStep(lesson.dialogue && lesson.dialogue.length > 0 ? 3 : 4)}
              className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
            >
              Next: {lesson.dialogue && lesson.dialogue.length > 0 ? 'Conversation Dialogue' : 'Practice Exercises'}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: CONVERSATION DIALOGUE */}
      {currentStep === 3 && lesson.dialogue && (
        <Card className="p-6 sm:p-8 bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs rounded-3xl space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Step 3: Real-World Conversation Dialogue
            </h2>
          </div>

          <div className="space-y-3">
            {lesson.dialogue.map((turn, i) => (
              <div
                key={i}
                className={cn(
                  'p-4 rounded-2xl border space-y-1',
                  i % 2 === 0
                    ? 'bg-teal-50/60 dark:bg-teal-950/30 border-teal-200/70 dark:border-teal-900/50 mr-8'
                    : 'bg-slate-50 dark:bg-[#162720] border-slate-200/80 dark:border-[#24392F] ml-8'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                    {turn.speaker}
                  </span>
                  <button
                    onClick={() => playPronunciation(turn.english)}
                    className="p-1 rounded-md text-slate-400 hover:text-teal-600"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {turn.english}
                </p>
                {turn.urdu && (
                  <p className="text-xs font-serif text-slate-500 dark:text-slate-400" dir="rtl">
                    {turn.urdu}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(2)}
              className="text-xs rounded-xl"
            >
              Back to Vocabulary
            </Button>
            <Button
              onClick={() => setCurrentStep(4)}
              className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
            >
              Next: Interactive Exercises
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: INTERACTIVE EXERCISES */}
      {currentStep === 4 && currentExercise && (
        <Card className="p-6 sm:p-8 bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Exercise {exerciseIdx + 1} of {totalExercises}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-teal-600">
              Score: {score}/{totalExercises}
            </span>
          </div>

          <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentExercise.prompt}
          </p>

          {/* Options */}
          {currentExercise.options && (
            <div className="space-y-2.5">
              {currentExercise.options.map((opt) => {
                const selected = selectedAnswers[exerciseIdx] === opt;
                const isThisCorrect = opt === currentExercise.correctAnswer;

                let optClass = 'border-slate-200/90 dark:border-[#24392F] hover:border-[#5BB78D]';
                if (exerciseChecked) {
                  if (isThisCorrect) {
                    optClass = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
                  } else if (selected && !isThisCorrect) {
                    optClass = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
                  }
                } else if (selected) {
                  optClass = 'border-[#124F40] bg-[#124F40]/10 text-[#124F40] dark:border-[#5BB78D] dark:text-[#5BB78D] font-bold';
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className={cn(
                      'w-full p-4 rounded-2xl border-2 text-left text-sm transition-all flex items-center justify-between cursor-pointer',
                      optClass
                    )}
                  >
                    <span>{opt}</span>
                    {exerciseChecked && isThisCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {exerciseChecked && selected && !isThisCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Feedback Explanation */}
          {exerciseChecked && (
            <div className={cn('p-4 rounded-2xl border space-y-1', isCorrect ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-200' : 'bg-rose-50/60 border-rose-200 text-rose-900 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-200')}>
              <span className="text-xs font-bold uppercase tracking-wider block">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
              <p className="text-xs leading-relaxed">{currentExercise.explanation}</p>
              {currentExercise.urduExplanation && (
                <p className="text-xs font-serif pt-1" dir="rtl">{currentExercise.urduExplanation}</p>
              )}
            </div>
          )}

          {/* Button Footer */}
          <div className="pt-4 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(3)}
              className="text-xs rounded-xl"
            >
              Back to Dialogue
            </Button>

            {!exerciseChecked ? (
              <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswers[exerciseIdx]}
                className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextExercise}
                className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
              >
                {exerciseIdx + 1 < totalExercises ? 'Next Question' : 'Complete Lesson'}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* STEP 5: COMPLETION & CELEBRATION */}
      {currentStep === 5 && (
        <Card className="p-8 sm:p-12 text-center bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-lg rounded-3xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Lesson Completed!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Great job! You have mastered {lesson.title} and boosted your English proficiency.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200/80 dark:border-teal-900 max-w-sm mx-auto flex items-center justify-around">
            <div>
              <span className="text-2xs font-bold uppercase text-slate-400">Score</span>
              <h4 className="text-lg font-bold text-teal-800 dark:text-teal-300">{score}/{totalExercises}</h4>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <span className="text-2xs font-bold uppercase text-slate-400">Earned</span>
              <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400">+{lesson.xpReward} XP</h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button
              onClick={() => navigate('/app/english/course')}
              className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
            >
              Continue Syllabus
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentStep(1);
                setExerciseIdx(0);
                setSelectedAnswers({});
                setExerciseChecked(false);
                setScore(0);
              }}
              className="text-xs rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Review Lesson
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
