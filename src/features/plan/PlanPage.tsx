import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  RefreshCw,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Brain,
  GraduationCap,
  AlertCircle,
  Filter,
} from 'lucide-react';
import { db } from '../../lib/db';
import { useAppStore } from '../../store/useAppStore';
import {
  generateStudyPlan,
  rescheduleMissedTasks,
  recalculateWeeklyPlan,
  rebalancePlanFromActualResults,
} from './planGenerator';
import type { StudyPlanDay, StudyPlanTask } from '../../types';

export const PlanPage: React.FC = () => {
  const { profile, addToast } = useAppStore();
  const [planDays, setPlanDays] = useState<StudyPlanDay[]>([]);
  const [filterMode, setFilterMode] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [rebalanceSummary, setRebalanceSummary] = useState<string[]>([]);
  const [lastRebalancedDate, setLastRebalancedDate] = useState<string | null>(
    localStorage.getItem('zarii_last_plan_rebalance')
  );

  const todayStr = new Date().toISOString().split('T')[0];

  // Load or generate initial plan
  useEffect(() => {
    async function loadPlan() {
      try {
        const storedPlan = await db.studyPlan.toArray();
        if (storedPlan && storedPlan.length > 0) {
          // Sort by dayIndex
          storedPlan.sort((a, b) => a.dayIndex - b.dayIndex);
          setPlanDays(storedPlan);

          // Check if automatic weekly rebalance is due (every 7 days)
          const lastRebalance = localStorage.getItem('zarii_last_plan_rebalance');
          const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
          if (!lastRebalance || Date.now() - new Date(lastRebalance).getTime() > sevenDaysMs) {
            const rebalanceResult = await rebalancePlanFromActualResults(
              storedPlan,
              profile?.targetBand || 7.5,
              profile?.examDate,
              profile?.dailyStudyMinutes || 60
            );
            if (rebalanceResult.rebalanced) {
              setPlanDays(rebalanceResult.updatedPlan);
              setRebalanceSummary(rebalanceResult.changesSummary);
              setLastRebalancedDate(new Date().toISOString());
            }
          }
        } else {
          // Generate default plan
          const newPlan = generateStudyPlan(
            profile?.targetBand || 7.5,
            profile?.examDate,
            profile?.dailyStudyMinutes || 60
          );
          await db.studyPlan.bulkAdd(newPlan);
          const reloaded = await db.studyPlan.toArray();
          reloaded.sort((a, b) => a.dayIndex - b.dayIndex);
          setPlanDays(reloaded);
        }
      } catch (err) {
        console.error('Failed to load study plan:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlan();
  }, [profile]);

  // Toggle task completion
  const handleToggleTask = async (dayIndex: number, taskId: string) => {
    const day = planDays.find((d) => d.dayIndex === dayIndex);
    if (!day) return;

    const updatedTasks = (day.tasks || []).map((t) => {
      if (t.id === taskId) {
        const completed = !t.completed;
        return {
          ...t,
          completed,
          completedAt: completed ? new Date().toISOString() : undefined,
        };
      }
      return t;
    });

    const allCompleted = updatedTasks.every((t) => t.completed);
    const updatedDay: StudyPlanDay = {
      ...day,
      tasks: updatedTasks,
      completed: allCompleted,
      completedAt: allCompleted ? new Date().toISOString() : undefined,
    };

    setPlanDays((prev) =>
      prev.map((d) => (d.dayIndex === dayIndex ? updatedDay : d))
    );

    await db.studyPlan.put(updatedDay);
  };

  // Auto-reschedule missed tasks from past days
  const handleRescheduleMissed = async () => {
    const updated = rescheduleMissedTasks(planDays);
    setPlanDays(updated);
    await db.studyPlan.clear();
    await db.studyPlan.bulkAdd(updated);

    addToast({
      type: 'success',
      title: 'Missed Tasks Rescheduled',
      message: 'Uncompleted tasks from past days have been redistributed into upcoming study sessions.',
    });
  };

  // Auto-rebalance from actual test results
  const handleRebalanceFromResults = async () => {
    setIsLoading(true);
    try {
      const res = await rebalancePlanFromActualResults(
        planDays,
        profile?.targetBand || 7.5,
        profile?.examDate,
        profile?.dailyStudyMinutes || 60
      );
      if (res.rebalanced) {
        setPlanDays(res.updatedPlan);
        setRebalanceSummary(res.changesSummary);
        setLastRebalancedDate(new Date().toISOString());
        addToast({
          type: 'success',
          title: 'Study Plan Re-balanced!',
          message: 'Curriculum adjusted based on your actual accuracy and weakest question types.',
        });
      } else {
        addToast({
          type: 'info',
          title: 'Plan Current',
          message: res.changesSummary[0] || 'Keep practicing to build more evaluation data.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Recalculate plan weekly / refresh
  const handleRecalculatePlan = async () => {
    const recalculated = recalculateWeeklyPlan(
      planDays,
      profile?.targetBand || 7.5,
      profile?.examDate,
      profile?.dailyStudyMinutes || 60
    );

    setPlanDays(recalculated);
    await db.studyPlan.clear();
    await db.studyPlan.bulkAdd(recalculated);

    addToast({
      type: 'info',
      title: 'Plan Recalculated',
      message: 'Your curriculum has been rebalanced based on your remaining exam days.',
    });
  };

  // Stats calculation
  const totalTasks = planDays.reduce((acc, d) => acc + (d.tasks?.length || 0), 0);
  const completedTasks = planDays.reduce(
    (acc, d) => acc + (d.tasks?.filter((t) => t.completed).length || 0),
    0
  );
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter days
  const filteredDays = planDays.filter((d) => {
    if (filterMode === 'today') return d.dateStr === todayStr;
    if (filterMode === 'upcoming') return d.dateStr >= todayStr && !d.completed;
    if (filterMode === 'completed') return d.completed;
    return true;
  });

  const getModuleIcon = (mod: string) => {
    switch (mod) {
      case 'reading':
        return <BookOpen className="w-4 h-4 text-[#1E7A62]" />;
      case 'listening':
        return <Headphones className="w-4 h-4 text-[#0F8B8D]" />;
      case 'writing':
        return <PenTool className="w-4 h-4 text-[#C98A0A]" />;
      case 'speaking':
        return <Mic className="w-4 h-4 text-[#CF5C45]" />;
      case 'vocab':
        return <Brain className="w-4 h-4 text-brand-700 dark:text-brand-400" />;
      case 'grammar':
        return <GraduationCap className="w-4 h-4 text-purple-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-cyan-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Adaptive Daily Curriculum
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Personalized IELTS Study Plan
            </h1>
            <p className="text-white/90 text-sm mt-1 max-w-xl">
              Target Band {profile?.targetBand || 7.5} • {profile?.dailyStudyMinutes || 60} mins/day.
              Every task links directly to practice exercises with automatic missed-task rescheduling.
            </p>
          </div>

          {/* Progress Ring / Percentage */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center border border-white/20 shrink-0 self-start md:self-auto">
            <span className="block text-xs uppercase tracking-wider text-white/80 font-bold mb-1">
              Curriculum Progress
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono">
              {progressPercent}%
            </div>
            <span className="block text-xs text-white/80 mt-1">
              {completedTasks} of {totalTasks} tasks completed
            </span>
          </div>
        </div>

        {/* Action Buttons bar */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
          <button
            onClick={handleRebalanceFromResults}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-teal-800 hover:bg-white/90 shadow-sm transition-all inline-flex items-center gap-1.5 font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Auto Re-balance from Results</span>
          </button>
          <button
            onClick={handleRescheduleMissed}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/20 hover:bg-white/30 text-white transition-all inline-flex items-center gap-1.5 backdrop-blur-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Auto-Reschedule Missed Tasks</span>
          </button>
          <button
            onClick={handleRecalculatePlan}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/20 hover:bg-white/30 text-white transition-all inline-flex items-center gap-1.5 backdrop-blur-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recalculate Remaining Days</span>
          </button>
        </div>
      </div>

      {/* Adaptive Rebalance Info Banner */}
      {rebalanceSummary.length > 0 && (
        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-xs space-y-1.5 text-teal-900 dark:text-teal-200 animate-fadeIn">
          <div className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
            Plan automatically re-balanced from your actual test results:
          </div>
          <ul className="list-disc pl-5 space-y-0.5 text-2xs text-slate-700 dark:text-slate-300">
            {rebalanceSummary.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => setFilterMode('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            filterMode === 'all'
              ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          All Days ({planDays.length})
        </button>
        <button
          onClick={() => setFilterMode('today')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            filterMode === 'today'
              ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Today's Tasks
        </button>
        <button
          onClick={() => setFilterMode('upcoming')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            filterMode === 'upcoming'
              ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilterMode('completed')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            filterMode === 'completed'
              ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Completed Days
        </button>
      </div>

      {/* Daily Cards List */}
      <div className="space-y-4">
        {filteredDays.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6">
            <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white">No tasks in this view</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Switch to "All Days" or recalculate your plan above.</p>
          </div>
        ) : (
          filteredDays.map((day) => {
            const isToday = day.dateStr === todayStr;
            const isPast = day.dateStr < todayStr;

            return (
              <div
                key={day.dayIndex}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all p-5 shadow-xs ${
                  isToday
                    ? 'border-teal-500 dark:border-teal-400 ring-2 ring-teal-500/20'
                    : day.completed
                    ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {/* Day Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700/60 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                        isToday
                          ? 'bg-teal-600 text-white'
                          : day.completed
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Day {day.dayIndex}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {new Date(day.dateStr).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    {isToday && (
                      <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-[10px] font-bold uppercase tracking-wider">
                        Today
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {day.estimatedMinutes} mins
                    </span>
                    {day.completed && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Day Done
                      </span>
                    )}
                  </div>
                </div>

                {/* Day Tasks */}
                <div className="space-y-3">
                  {(day.tasks || []).map((task) => (
                    <div
                      key={task.id}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                        task.completed
                          ? 'bg-slate-50/80 dark:bg-slate-700/30 border-slate-200/60 dark:border-slate-700/60 opacity-80'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleTask(day.dayIndex, task.id)}
                          className="mt-0.5 text-slate-400 hover:text-teal-600 transition-colors shrink-0"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              {getModuleIcon(task.module)}
                              <span className={task.completed ? 'line-through text-slate-400' : ''}>
                                {task.title}
                              </span>
                            </span>
                            {task.skillFocus && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {task.skillFocus}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <span className="text-xs font-mono font-medium text-slate-400">
                          {task.estimatedMinutes}m
                        </span>
                        <Link
                          to={task.targetPath}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200/60 dark:border-teal-800/60 transition-all inline-flex items-center gap-1"
                        >
                          <span>Start</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
