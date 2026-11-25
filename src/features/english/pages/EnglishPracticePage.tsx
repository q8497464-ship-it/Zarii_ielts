import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Zap,
  Target,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Clock,
  BookOpen,
  Filter,
  Flame,
  ArrowRight,
  TrendingDown,
  Layers,
} from 'lucide-react';
import { ExerciseRenderer, ExerciseData } from '../components/exercises/ExerciseRenderer';
import { getAllLoadedCourseLessons } from '../services/courseService';
import {
  getAllSkillMastery,
  recordSkillPracticeResult,
  recordMistakeToNotebook,
} from '../services/masteryService';
import { db } from '../../../lib/db';
import type { EnglishCEFRLevel } from '../../../types';
import { Button } from '../../../components/ui/Button';

type PracticeMode = 'topics' | 'smart' | 'mistakes' | 'daily' | 'speed';

export const EnglishPracticePage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PracticeMode>('smart');
  const [selectedLevel, setSelectedLevel] = useState<EnglishCEFRLevel | 'ALL'>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Active session state
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionExercises, setSessionExercises] = useState<Array<ExerciseData & { level?: string; sourceTitle?: string }>>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionFinished, setSessionFinished] = useState(false);

  // Speed Round state (60s timer)
  const [speedTimer, setSpeedTimer] = useState(60);
  const [speedStreak, setSpeedStreak] = useState(0);

  // Mistakes notebook cache
  const [savedMistakes, setSavedMistakes] = useState<any[]>([]);

  // 1. Gather all exercises across course lessons
  const allLoadedLessons = getAllLoadedCourseLessons();

  const allExercises = useMemo<Array<ExerciseData & { level: string; sourceTitle: string }>>(() => {
    const list: Array<ExerciseData & { level: string; sourceTitle: string }> = [];
    for (const lId in allLoadedLessons) {
      const lesson = allLoadedLessons[lId];
      const level = lesson.level || 'A1';
      for (const sec of lesson.sections || []) {
        if ((sec.type === 'practice' || sec.type === 'quiz') && Array.isArray(sec.exercises)) {
          for (const ex of sec.exercises) {
            list.push({
              ...ex,
              level,
              sourceTitle: lesson.title,
            });
          }
        }
      }
    }
    return list;
  }, [allLoadedLessons]);

  // Load mistakes from db
  useEffect(() => {
    async function loadMistakes() {
      try {
        const items = await db.mistakes.toArray();
        setSavedMistakes(items);
      } catch (err) {
        console.warn('Failed to load mistakes:', err);
      }
    }
    loadMistakes();
  }, [sessionFinished]);

  // Speed Round Timer
  useEffect(() => {
    let interval: any = null;
    if (sessionActive && activeMode === 'speed' && !sessionFinished && speedTimer > 0) {
      interval = setInterval(() => {
        setSpeedTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            setSessionFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive, activeMode, sessionFinished, speedTimer]);

  // Distinct topics & skill tags
  const topicStats = useMemo(() => {
    const map: Record<string, { count: number; level: string }> = {};
    for (const ex of allExercises) {
      const tag = ex.skillTag || 'general-grammar';
      if (!map[tag]) map[tag] = { count: 0, level: ex.level };
      map[tag].count += 1;
    }
    return map;
  }, [allExercises]);

  // Launch a practice session based on mode
  const startSession = (mode: PracticeMode, topicFilter?: string) => {
    let pool = [...allExercises];

    if (selectedLevel !== 'ALL') {
      pool = pool.filter((e) => e.level === selectedLevel);
    }

    if (mode === 'topics' && topicFilter) {
      pool = pool.filter((e) => (e.skillTag || 'general-grammar') === topicFilter);
    } else if (mode === 'smart') {
      // Prioritize weakest skill tags from mastery store
      const mastery = getAllSkillMastery();
      pool.sort((a, b) => {
        const scoreA = mastery[a.skillTag || '']?.masteryPercent ?? 50;
        const scoreB = mastery[b.skillTag || '']?.masteryPercent ?? 50;
        return scoreA - scoreB;
      });
      pool = pool.slice(0, 10);
    } else if (mode === 'mistakes') {
      // Pull items from mistakes
      const mistakeIds = new Set(savedMistakes.map((m) => m.questionId));
      pool = pool.filter((e) => mistakeIds.has(e.id));
      if (pool.length === 0) {
        // Fallback to random 5
        pool = allExercises.slice(0, 5);
      }
    } else if (mode === 'daily') {
      // 10-minute mixed session (10 questions across grammar, vocabulary)
      pool = pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    } else if (mode === 'speed') {
      // Timed speed round
      pool = pool.sort(() => 0.5 - Math.random()).slice(0, 20);
      setSpeedTimer(60);
      setSpeedStreak(0);
    }

    setSessionExercises(pool);
    setCurrentIdx(0);
    setSessionScore(0);
    setSessionFinished(false);
    setSessionActive(true);
  };

  const handleExerciseAnswer = async (isCorrect: boolean, response: any) => {
    const ex = sessionExercises[currentIdx];
    if (!ex) return;

    if (isCorrect) {
      setSessionScore((s) => s + 1);
      if (activeMode === 'speed') setSpeedStreak((s) => s + 1);
    } else {
      if (activeMode === 'speed') setSpeedStreak(0);
      // Record mistake
      await recordMistakeToNotebook({
        questionId: ex.id,
        skillTag: ex.skillTag || 'grammar',
        lessonTitle: ex.sourceTitle || 'English Practice',
        prompt: ex.prompt,
        userAnswer: typeof response === 'string' ? response : JSON.stringify(response),
        correctAnswer: String(ex.correctAnswer || ex.correctOptionId || 'Answer'),
        explanation: ex.explanation,
      });
    }

    if (ex.skillTag) {
      recordSkillPracticeResult(ex.skillTag, (ex.level as EnglishCEFRLevel) || 'A1', isCorrect ? 100 : 0);
    }
  };

  const handleNextExercise = () => {
    if (currentIdx < sessionExercises.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setSessionFinished(true);
    }
  };

  const currentExercise = sessionExercises[currentIdx];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 font-sans">
      {/* Practice Hub Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D] text-xs font-semibold">
          <Target className="w-3.5 h-3.5" />
          <span>English Practice Arena</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          Adaptive English Practice Hub
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Target your weak areas, review previous mistakes, or jump into high-speed fluency drills.
        </p>
      </div>

      {/* Mode Tabs */}
      {!sessionActive && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
            {[
              { id: 'smart', label: 'Smart Practice', icon: Sparkles },
              { id: 'topics', label: 'By Topic', icon: BookOpen },
              { id: 'mistakes', label: `Mistakes (${savedMistakes.length})`, icon: AlertTriangle },
              { id: 'daily', label: '10-Min Mixed', icon: Clock },
              { id: 'speed', label: 'Speed Round (60s)', icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveMode(tab.id as PracticeMode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                    isActive
                      ? 'bg-[#124F40] text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-semibold text-gray-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Level:
            </span>
            {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedLevel === lvl
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Mode Card View */}
          {activeMode === 'smart' && (
            <div className="p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#124F40] text-white shadow-sm">
                  <Sparkles className="w-6 h-6 text-[#5BB78D]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    AI-Driven Weakness Targeting
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Automatically pulls 10 questions focusing on your lowest accuracy skill tags.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => startSession('smart')}
                className="bg-[#124F40] hover:bg-[#0e3f33] text-white gap-2 font-semibold px-6 py-2.5 rounded-xl shadow-sm"
              >
                <span>Start Smart Practice</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {activeMode === 'topics' && (
            <div className="space-y-4">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Select any grammar rule or vocabulary topic below to practice:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(topicStats).map(([topic, stat]) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => startSession('topics', topic)}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#124F40] dark:hover:border-[#5BB78D] text-left transition-all shadow-sm group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-gray-900 dark:text-gray-100 group-hover:text-[#124F40] dark:group-hover:text-[#5BB78D]">
                        {topic}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold uppercase">
                        {stat.level}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.count} exercises available
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeMode === 'mistakes' && (
            <div className="p-6 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-600 text-white shadow-sm">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Mistakes Notebook Review ({savedMistakes.length})
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Review and conquer exercises you missed during previous practice and quizzes.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => startSession('mistakes')}
                className="bg-[#124F40] hover:bg-[#0e3f33] text-white gap-2 font-semibold px-6 py-2.5 rounded-xl shadow-sm"
              >
                <span>Practice Missed Exercises</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {activeMode === 'daily' && (
            <div className="p-6 rounded-2xl border border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-600 text-white shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Daily 10-Minute Mixed Session
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    A balanced 10-question set mixing grammar, vocabulary, listening, and spelling to keep your streak alive.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => startSession('daily')}
                className="bg-[#124F40] hover:bg-[#0e3f33] text-white gap-2 font-semibold px-6 py-2.5 rounded-xl shadow-sm"
              >
                <span>Start Daily Session</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {activeMode === 'speed' && (
            <div className="p-6 rounded-2xl border border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-rose-600 text-white shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Timed 60-Second Speed Round
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Race against the clock! Answer as many questions as you can before 60 seconds run out.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => startSession('speed')}
                className="bg-rose-600 hover:bg-rose-700 text-white gap-2 font-semibold px-6 py-2.5 rounded-xl shadow-sm"
              >
                <Zap className="w-4 h-4" />
                <span>Begin 60s Speed Round</span>
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Active Practice Session Runner */}
      {sessionActive && (
        <div className="space-y-6">
          {/* Active Session Status Bar */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSessionActive(false)}
                className="text-xs"
              >
                Exit Session
              </Button>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Question {currentIdx + 1} of {sessionExercises.length}
              </span>
            </div>

            {activeMode === 'speed' && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 font-extrabold text-amber-600">
                  <Flame className="w-5 h-5 fill-current" />
                  <span>{speedStreak} Streak</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 font-mono font-bold text-rose-700 text-sm">
                  ⏱️ {speedTimer}s
                </div>
              </div>
            )}
          </div>

          {!sessionFinished && currentExercise ? (
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
              <ExerciseRenderer
                key={currentExercise.id}
                exercise={currentExercise}
                onAnswer={handleExerciseAnswer}
                onNext={handleNextExercise}
              />
            </div>
          ) : (
            /* Session Finished Screen */
            <div className="p-8 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-[#124F40] dark:text-[#5BB78D] mx-auto" />
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Practice Session Completed!
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  You scored {sessionScore} out of {sessionExercises.length} (
                  {sessionExercises.length > 0
                    ? Math.round((sessionScore / sessionExercises.length) * 100)
                    : 100}
                  %)
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <Button
                  onClick={() => setSessionActive(false)}
                  className="bg-[#124F40] hover:bg-[#0e3f33] text-white px-6"
                >
                  Return to Practice Hub
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
