import React from 'react';
import { Flame, Snowflake, CheckCircle2, Target } from 'lucide-react';
import type { StreakData } from '../../types';

interface DailyGoalRingProps {
  studiedMinutes: number;
  targetMinutes: number;
  streak: StreakData;
  size?: number;
  strokeWidth?: number;
}

export function DailyGoalRing({
  studiedMinutes,
  targetMinutes,
  streak,
  size = 120,
  strokeWidth = 9,
}: DailyGoalRingProps) {
  const percent = targetMinutes > 0 ? Math.min(100, Math.round((studiedMinutes / targetMinutes) * 100)) : 0;
  const isGoalMet = percent >= 100;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs">
      {/* SVG Ring */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id="dailyGoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5BB78D" />
              <stop offset="100%" stopColor="#124F40" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-[#24392F]"
            fill="transparent"
          />
          {/* Progress circle with mint-to-green gradient */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isGoalMet ? '#1E9E63' : 'url(#dailyGoalGrad)'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            fill="transparent"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {isGoalMet ? (
            <CheckCircle2 className="w-7 h-7 text-[#1E9E63] mb-0.5 animate-bounce-short" />
          ) : (
            <span className="text-xl font-black text-brand-800 dark:text-brand-300 font-mono tracking-tight">
              {percent}%
            </span>
          )}
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {isGoalMet ? 'Achieved' : 'Daily Goal'}
          </span>
        </div>
      </div>

      {/* Details & Streak Stat */}
      <div className="space-y-3 text-center sm:text-left flex-1">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
              Today's Commitment
            </span>
            {isGoalMet && (
              <span className="px-2 py-0.2 rounded-full text-2xs font-extrabold bg-[#1E9E63]/10 text-[#1E9E63] border border-[#1E9E63]/20">
                Completed
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            {studiedMinutes} of {targetMinutes} minutes studied
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isGoalMet
              ? 'Outstanding focus! Your daily practice keeps you ahead of your test preparation schedule.'
              : `${targetMinutes - studiedMinutes} more minutes to complete today's target and lock in your streak.`}
          </p>
        </div>

        {/* Streak & Freeze Status Bar */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          {/* Streak Flame */}
          <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>
              {streak.currentStreak} Day{streak.currentStreak === 1 ? '' : 's'} Streak
            </span>
          </div>

          <span className="text-slate-300 dark:text-slate-700">•</span>

          {/* Freeze indicator */}
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Snowflake
              className={`w-3.5 h-3.5 ${
                streak.freezeAvailable ? 'text-brand-500' : 'text-slate-400 opacity-50'
              }`}
            />
            <span className="text-2xs font-medium">
              {streak.freezeAvailable ? '1 Weekly Freeze Ready' : 'Freeze Used this Week'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
