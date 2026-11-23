import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  RotateCcw,
  BookOpen,
  Check,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  X,
} from 'lucide-react';
import { ALL_COURSE_LEVELS, getLevelMetadata } from '../data/curriculumStructure';
import { getLevelUnitsProgress, testOutUnit } from '../services/courseService';
import type { EnglishCEFRLevel } from '../../../types';
import type { CourseUnitMetadata, UnitProgressState, CourseLessonSummary } from '../../../types/course';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ProgressBar } from '../../../components/ui/ProgressBar';

export function EnglishCourseCatalogPage() {
  const navigate = useNavigate();
  const { profile, addToast } = useAppStore();

  const userLevel = (profile?.englishLevel && profile.englishLevel !== 'unknown'
    ? profile.englishLevel
    : 'A1') as EnglishCEFRLevel;

  const [selectedLevel, setSelectedLevel] = useState<EnglishCEFRLevel>(userLevel);
  const [unitsProgress, setUnitsProgress] = useState<Record<string, UnitProgressState>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Unit Test-Out Modal state
  const [testOutTargetUnit, setTestOutTargetUnit] = useState<CourseUnitMetadata | null>(null);
  const [testOutScore, setTestOutScore] = useState<number | null>(null);
  const [isSubmittingTestOut, setIsSubmittingTestOut] = useState(false);

  const levelMeta = getLevelMetadata(selectedLevel);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getLevelUnitsProgress(selectedLevel).then((res) => {
      if (!isMounted) return;
      setUnitsProgress(res);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [selectedLevel]);

  // Overall level statistics
  const totalUnits = levelMeta.units.length;
  const completedUnitsCount = levelMeta.units.filter(
    (u) => unitsProgress[u.id]?.status === 'completed'
  ).length;
  const overallLevelPercent = totalUnits > 0
    ? Math.round((completedUnitsCount / totalUnits) * 100)
    : 0;

  // "Continue where you left off" active unit resolution
  const activeUnit = levelMeta.units.find(
    (u) => unitsProgress[u.id]?.status === 'in_progress'
  ) || levelMeta.units.find(
    (u) => unitsProgress[u.id]?.status === 'available'
  ) || levelMeta.units[0];

  const activeUnitProgress = activeUnit ? unitsProgress[activeUnit.id] : undefined;
  const nextLessonId = activeUnit?.lessons.find(
    (l) => !activeUnitProgress?.completedLessonIds.includes(l.id)
  )?.id || activeUnit?.lessons[0]?.id;

  const handleStartTestOut = (unit: CourseUnitMetadata) => {
    setTestOutTargetUnit(unit);
    setTestOutScore(null);
  };

  const handleConfirmTestOut = async (simulatedScore: number) => {
    if (!testOutTargetUnit) return;
    setIsSubmittingTestOut(true);

    const result = await testOutUnit(testOutTargetUnit.id, selectedLevel, simulatedScore);
    setTestOutScore(simulatedScore);
    setIsSubmittingTestOut(false);

    if (result.qualified) {
      addToast({
        type: 'success',
        title: 'Tested Out Successfully!',
        message: result.message,
      });
      // Refresh progress
      const refreshed = await getLevelUnitsProgress(selectedLevel);
      setUnitsProgress(refreshed);
    } else {
      addToast({
        type: 'warning',
        title: 'Test Out Not Passed',
        message: result.message,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* 1. Header & Level Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                English Course Map
              </h1>
              <Badge variant="teal" className="text-2xs font-bold uppercase">
                A1–C1 Curriculum
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Interactive structured path with vertical unit nodes, review checkpoints, and 85%+ test-out skipping.
            </p>
          </div>

          <Link to="/app/english/placement">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-xs border-teal-600/40 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/30"
            >
              <Compass className="w-3.5 h-3.5 mr-1.5" />
              {profile?.englishLevel ? 'Retake Placement Test' : 'Take Placement Test'}
            </Button>
          </Link>
        </div>

        {/* Level Tabs Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {ALL_COURSE_LEVELS.map((lvl) => {
            const active = selectedLevel === lvl.level;
            return (
              <button
                key={lvl.level}
                onClick={() => setSelectedLevel(lvl.level)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  active
                    ? 'bg-[#124F40] text-white shadow-xs'
                    : 'bg-white dark:bg-[#112019] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-[#24392F] hover:border-[#5BB78D]'
                }`}
              >
                <span>{lvl.level}</span>
                <span className="opacity-70 font-normal">{lvl.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. "Continue Where You Left Off" Hero Card */}
      {activeUnit && (
        <Card className="p-6 sm:p-7 bg-gradient-to-r from-emerald-50 via-teal-50 to-white dark:from-[#112019] dark:to-[#0B1612] border border-teal-200/80 dark:border-teal-900/40 rounded-3xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-2xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Continue Where You Left Off
            </div>
            <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
              Unit {activeUnit.unitNumber} of {totalUnits}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {activeUnit.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                {activeUnit.description}
              </p>
            </div>

            <Button
              onClick={() => navigate(`/app/english/course/lesson/${nextLessonId}`)}
              className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs shrink-0"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" />
              Resume Lesson
            </Button>
          </div>

          {/* Overall Level Progress Bar */}
          <div className="pt-2 border-t border-teal-200/40 dark:border-teal-900/30 space-y-1.5">
            <div className="flex items-center justify-between text-2xs text-slate-500">
              <span>Level {selectedLevel} Completion Progress</span>
              <span className="font-mono font-bold text-teal-700 dark:text-teal-400">
                {completedUnitsCount}/{totalUnits} Units ({overallLevelPercent}%)
              </span>
            </div>
            <ProgressBar value={overallLevelPercent} variant="teal" size="sm" />
          </div>
        </Card>
      )}

      {/* 3. The Vertical Path / Learning Tree */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Level {selectedLevel} Learning Path
          </h3>
          <span className="text-xs text-slate-400">
            Units unlock in sequence • 70% required to complete
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6">
          {/* Vertical continuous path line */}
          <div className="absolute left-[23px] sm:left-[31px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-[#24392F]" />

          {levelMeta.units.map((unit, idx) => {
            const state = unitsProgress[unit.id] || {
              unitId: unit.id,
              level: selectedLevel,
              status: idx === 0 ? 'available' : 'locked',
              progressPercent: 0,
              completedLessonIds: [],
              testedOut: false,
            };

            const isLocked = state.status === 'locked';
            const isCompleted = state.status === 'completed';
            const isInProgress = state.status === 'in_progress';
            const isAvailable = state.status === 'available';

            return (
              <div key={unit.id} className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Node Ring Icon */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-md'
                      : isInProgress
                      ? 'bg-[#124F40] text-white ring-4 ring-[#5BB78D]/30 shadow-md'
                      : isAvailable
                      ? 'bg-white dark:bg-[#112019] border-2 border-teal-600 text-teal-600 dark:text-teal-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <span className="text-xs sm:text-sm font-black font-mono">
                      {unit.unitNumber}
                    </span>
                  )}
                </div>

                {/* Unit Content Card */}
                <Card
                  className={`flex-1 p-5 sm:p-6 rounded-3xl border transition-all ${
                    isLocked
                      ? 'bg-slate-50/50 dark:bg-[#112019]/40 border-slate-200/60 dark:border-[#24392F]/60 opacity-70'
                      : 'bg-white dark:bg-[#112019] border-slate-200/90 dark:border-[#24392F] hover:border-[#5BB78D] shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-3xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                          Unit {unit.unitNumber}
                        </span>
                        {isCompleted && (
                          <Badge variant="teal" className="text-3xs py-0 h-4">
                            {state.testedOut ? 'Tested Out' : 'Completed'}
                          </Badge>
                        )}
                        {isInProgress && (
                          <Badge variant="secondary" className="text-3xs py-0 h-4">
                            In Progress ({state.progressPercent}%)
                          </Badge>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {unit.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {unit.description}
                      </p>
                    </div>

                    {/* Unit Actions */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                      {!isLocked ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => navigate(`/app/english/course/lesson/${unit.lessons[0].id}`)}
                            className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-4 py-2 rounded-xl"
                          >
                            <span>{isCompleted ? 'Review' : 'Open Unit'}</span>
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>

                          {!isCompleted && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStartTestOut(unit)}
                              className="text-xs rounded-xl border-dashed border-teal-600/60 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/30"
                              title="Skip this unit by scoring 85%+ on the unit test"
                            >
                              <Zap className="w-3.5 h-3.5 mr-1 text-amber-500" />
                              Test Out
                            </Button>
                          )}
                        </>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-2xs font-semibold">
                          <Lock className="w-3.5 h-3.5" />
                          Complete Unit {unit.unitNumber - 1} to unlock
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lessons list dropdown / preview for active/available units */}
                  {!isLocked && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {unit.lessons.map((lesson) => {
                        const isLessonDone = state.completedLessonIds.includes(lesson.id);
                        return (
                          <Link
                            key={lesson.id}
                            to={`/app/english/course/lesson/${lesson.id}`}
                            className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 transition-colors"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-3xs ${
                                isLessonDone
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}>
                                {isLessonDone ? '✓' : lesson.order}
                              </span>
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className="text-3xs text-slate-400 shrink-0 ml-2">
                              {lesson.estimatedMinutes}m
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Unit Test-Out Modal */}
      {testOutTargetUnit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6 bg-white dark:bg-[#112019] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Test Out of Unit {testOutTargetUnit.unitNumber}
                </h3>
              </div>
              <button
                onClick={() => setTestOutTargetUnit(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p>
                Strong learners can skip <strong>{testOutTargetUnit.title}</strong> by scoring <strong>85% or higher</strong> on the mastery evaluation.
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Anti-Guessing Evaluation Rules
                </div>
                <p>
                  Questions feature plausible distractors, randomized option positions, and test all {testOutTargetUnit.lessons.length} core concepts in this unit.
                </p>
              </div>
            </div>

            {testOutScore === null ? (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-slate-500">
                  Select your test mode:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleConfirmTestOut(90)}
                    disabled={isSubmittingTestOut}
                    className="bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs py-2.5 rounded-xl font-bold"
                  >
                    Simulate 90% (Pass)
                  </Button>
                  <Button
                    onClick={() => handleConfirmTestOut(75)}
                    disabled={isSubmittingTestOut}
                    variant="outline"
                    className="text-xs py-2.5 rounded-xl"
                  >
                    Simulate 75% (Below 85%)
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className={`p-4 rounded-2xl text-center font-bold text-sm ${
                  testOutScore >= 85
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                }`}>
                  Result: {testOutScore}% — {testOutScore >= 85 ? 'Passed! Unit Unlocked.' : '85% Required. Review Unit Lessons.'}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setTestOutTargetUnit(null)}
                    className="bg-[#124F40] text-white text-xs px-6 py-2 rounded-xl"
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
