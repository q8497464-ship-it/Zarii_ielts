import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  Bell, 
  BellOff, 
  Target, 
  ChevronRight, 
  Check, 
  SlidersHorizontal,
  GraduationCap,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  englishStudyPlanService, 
  type WeeklyStudyPlan, 
  type EnglishPlanConfig, 
  type EnglishDayTask 
} from '../services/englishStudyPlanService';
import type { EnglishCEFRLevel } from '../../../types';
import { cn } from '../../../lib/utils';
import { useAppStore } from '../../../store/useAppStore';

export const EnglishStudyPlanPage: React.FC = () => {
  const { addToast } = useAppStore();
  const [plan, setPlan] = useState<WeeklyStudyPlan | null>(null);
  const [config, setConfig] = useState<EnglishPlanConfig>(() => englishStudyPlanService.getDefaultConfig());
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [reminderGranted, setReminderGranted] = useState(false);

  useEffect(() => {
    async function init() {
      let saved = englishStudyPlanService.getSavedPlan();
      if (!saved) {
        saved = await englishStudyPlanService.generateWeeklyPlan(config);
      }
      setPlan(saved);
      setConfig(saved.config);
    }
    init();
  }, []);

  const handleSaveConfig = async () => {
    setIsRebalancing(true);
    const newPlan = await englishStudyPlanService.generateWeeklyPlan(config, true);
    setPlan(newPlan);
    setIsRebalancing(false);
    setShowConfigModal(false);
  };

  const handleToggleTask = (dayDateStr: string, taskId: string) => {
    if (!plan) return;
    const updatedDays = plan.days.map((day) => {
      if (day.dateStr === dayDateStr) {
        return {
          ...day,
          tasks: day.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return day;
    });

    const completedMins = updatedDays.reduce(
      (sum, d) => sum + d.tasks.filter((t) => t.completed).reduce((ts, t) => ts + t.estimatedMinutes, 0),
      0
    );

    const updatedPlan: WeeklyStudyPlan = {
      ...plan,
      days: updatedDays,
      completedMinutes: completedMins
    };

    setPlan(updatedPlan);
    englishStudyPlanService.savePlan(updatedPlan);
  };

  const handleAutoRebalance = async () => {
    if (!plan) return;
    setIsRebalancing(true);
    const rebalanced = await englishStudyPlanService.generateWeeklyPlan(plan.config, true);
    setPlan(rebalanced);
    setIsRebalancing(false);
    addToast({
      type: 'success',
      title: 'Schedule Rebalanced',
      message: rebalanced.rebalanceReason || 'Your weekly plan has been updated.',
    });
  };

  const handleToggleReminder = async () => {
    if (!config.reminderEnabled) {
      const granted = await englishStudyPlanService.requestReminderPermission();
      setReminderGranted(granted);
      setConfig(prev => ({ ...prev, reminderEnabled: true }));
    } else {
      setConfig(prev => ({ ...prev, reminderEnabled: false }));
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1510] flex items-center justify-center p-8">
        <div className="text-center text-slate-500 font-semibold text-sm">
          Loading study plan...
        </div>
      </div>
    );
  }

  const completionPct = plan.weeklyTargetMinutes > 0
    ? Math.min(100, Math.round((plan.completedMinutes / plan.weeklyTargetMinutes) * 100))
    : 0;

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1510] text-slate-800 dark:text-slate-100 p-4 md:p-8">
      {/* Configurator Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#24392F] pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#124F40] dark:text-[#5BB78D]">
                  Customize Your Study Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Target CEFR level and weekly availability.
                </p>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Target Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                1. Target CEFR Level
              </label>
              <div className="grid grid-cols-5 gap-2">
                {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, targetLevel: lvl }))}
                    className={cn(
                      'py-2 rounded-xl text-xs font-bold border transition-all',
                      config.targetLevel === lvl
                        ? 'bg-[#124F40] text-white border-[#124F40] dark:bg-[#5BB78D] dark:text-[#0B1510]'
                        : 'border-slate-200 dark:border-[#24392F] text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Commitment */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                2. Daily Time Available
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { mins: 15, label: '15 min/day', desc: 'Casual' },
                  { mins: 30, label: '30 min/day', desc: 'Balanced' },
                  { mins: 60, label: '60 min/day', desc: 'Intensive' },
                ].map(opt => (
                  <button
                    key={opt.mins}
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, minutesPerDay: opt.mins as any }))}
                    className={cn(
                      'p-3 rounded-xl border text-center transition-all',
                      config.minutesPerDay === opt.mins
                        ? 'bg-emerald-50 text-[#124F40] border-[#124F40] dark:bg-emerald-950/60 dark:text-[#5BB78D] font-bold'
                        : 'border-slate-200 dark:border-[#24392F] text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    <div className="text-xs">{opt.label}</div>
                    <div className="text-[10px] text-slate-400">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                3. Target Completion Date (Optional)
              </label>
              <input
                type="date"
                value={config.deadlineDate || ''}
                onChange={e => setConfig(prev => ({ ...prev, deadlineDate: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-xl text-xs"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-[#24392F] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveConfig}
                className="px-5 py-2 rounded-xl bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] text-xs font-bold shadow-xs"
              >
                Generate Updated Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 1. Header */}
        <div className="pb-6 border-b border-emerald-900/10 dark:border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D]">
                English Track
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Weekly Adaptive Schedule</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
              Adaptive Study Plan
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Goal: CEFR Level {plan.config.targetLevel} • {plan.config.minutesPerDay} min/day • Auto-rebalanced from real mistake patterns.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfigModal(true)}
              className="px-4 py-2 bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] hover:bg-slate-50 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> Preferences
            </button>

            <button
              onClick={handleAutoRebalance}
              disabled={isRebalancing}
              className="px-4 py-2 bg-emerald-50 text-[#124F40] dark:bg-emerald-950/60 dark:text-[#5BB78D] border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition-colors shadow-2xs"
            >
              <RotateCcw className={cn('w-4 h-4', isRebalancing && 'animate-spin')} />
              <span>{isRebalancing ? 'Rebalancing...' : 'Auto-Rebalance'}</span>
            </button>
          </div>
        </div>

        {/* 2. Target Progress & Rebalance Banner */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Weekly Target Completion
              </div>
              <div className="text-2xl font-extrabold text-[#124F40] dark:text-[#5BB78D]">
                {plan.completedMinutes} of {plan.weeklyTargetMinutes} Minutes Completed ({completionPct}%)
              </div>
            </div>

            {/* Browser Reminder Switch */}
            <button
              onClick={handleToggleReminder}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all',
                config.reminderEnabled
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700'
              )}
            >
              {config.reminderEnabled ? (
                <>
                  <Bell className="w-4 h-4 text-emerald-600" /> Reminders Active ({config.reminderTime})
                </>
              ) : (
                <>
                  <BellOff className="w-4 h-4 text-slate-400" /> Enable Daily Study Reminder
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#124F40] dark:bg-[#5BB78D] transition-all"
              style={{ width: `${completionPct}%` }}
            />
          </div>

          {plan.rebalanceReason && (
            <div className="text-xs text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 p-3 rounded-xl flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{plan.rebalanceReason}</span>
            </div>
          )}
        </div>

        {/* 3. 7-Day Weekly Schedule Grid */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            This Week's Scheduled Workouts
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.days.map((day) => (
              <div
                key={day.dayName}
                className={cn(
                  'p-5 rounded-2xl border transition-all',
                  day.isToday
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-[#5BB78D] ring-2 ring-[#5BB78D]/20 shadow-xs'
                    : 'bg-white dark:bg-[#112019] border-slate-200/80 dark:border-[#24392F]'
                )}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-[#24392F]">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      {day.dayName}
                    </span>
                    {day.isToday && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510]">
                        TODAY
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{day.dateStr}</span>
                </div>

                <div className="space-y-3">
                  {day.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={cn(
                        'p-3 rounded-xl border flex items-start justify-between gap-3 transition-colors',
                        task.completed
                          ? 'bg-slate-50/80 border-slate-200 text-slate-400 line-through dark:bg-[#0B1510]'
                          : 'bg-white dark:bg-[#112019] border-slate-200/80 dark:border-[#24392F]'
                      )}
                    >
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleToggleTask(day.dateStr, task.id)}
                          className={cn(
                            'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                            task.completed
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                          )}
                        >
                          {task.completed && <Check className="w-3.5 h-3.5" />}
                        </button>

                        <div>
                          <div className={cn('text-xs font-bold leading-snug', !task.completed && 'text-slate-800 dark:text-slate-200')}>
                            {task.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {task.description} • {task.estimatedMinutes}m
                          </div>
                        </div>
                      </div>

                      {!task.completed && (
                        <Link
                          to={task.actionUrl}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:bg-emerald-100 text-[11px] font-bold text-[#124F40] dark:text-[#5BB78D] transition-colors shrink-0"
                        >
                          Start
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
