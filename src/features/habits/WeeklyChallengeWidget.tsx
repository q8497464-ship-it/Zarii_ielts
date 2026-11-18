import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Calendar,
} from 'lucide-react';
import type { WeeklyChallenge } from '../../types';
import { ProgressBar } from '../../components/ui/ProgressBar';

interface WeeklyChallengeWidgetProps {
  challenge: WeeklyChallenge;
}

export function WeeklyChallengeWidget({ challenge }: WeeklyChallengeWidgetProps) {
  const percent =
    challenge.totalCount > 0
      ? Math.round((challenge.completedCount / challenge.totalCount) * 100)
      : 0;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-[#C98A0A] dark:text-amber-300 flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xs font-bold uppercase tracking-wider text-[#C98A0A] dark:text-amber-400">
                Weekly Mastery Sprint
              </span>
              <span className="text-2xs text-slate-400 font-mono">
                {challenge.weekId}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              5-Task IELTS Challenge
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
            {challenge.completedCount} / {challenge.totalCount} Done ({percent}%)
          </span>
          {challenge.isAllCompleted && (
            <span className="px-2 py-0.5 rounded-full text-2xs font-extrabold bg-[#1E9E63]/10 text-[#1E9E63] border border-[#1E9E63]/20">
              +250 XP Claimed
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar with mint-to-green gradient */}
      <div className="space-y-1">
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              challenge.isAllCompleted ? 'bg-[#1E9E63]' : 'bg-gradient-to-r from-[#5BB78D] to-[#124F40]'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* 5 Tasks List */}
      <div className="space-y-2">
        {challenge.tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-colors ${
              task.completed
                ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 text-slate-500 line-through'
                : 'bg-white dark:bg-[#112019] border-[#E1EBE5] dark:border-[#24392F] text-slate-800 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {task.completed ? (
                <CheckCircle2 className="w-4 h-4 text-[#1E9E63] shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
              )}
              <span className={`font-medium ${task.completed ? 'opacity-70' : ''}`}>
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-2xs text-slate-400">
                {task.currentCount}/{task.targetCount}
              </span>
              {!task.completed && (
                <Link
                  to={task.linkPath}
                  className="p-1 text-slate-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
                  title="Go to task"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
