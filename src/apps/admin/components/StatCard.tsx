import React from 'react';
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: 'mint' | 'amber' | 'rose' | 'slate';
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'positive',
  subtitle,
  icon: Icon,
  badge,
  badgeColor = 'amber',
  className = '',
}: StatCardProps) {
  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';

  const badgeColorClass =
    badgeColor === 'mint'
      ? 'bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] border-[#5BB78D]/30'
      : badgeColor === 'rose'
      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
      : badgeColor === 'amber'
      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200';

  return (
    <div
      className={`p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
          {title}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {badge && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColorClass}`}>
              {badge}
            </span>
          )}
          {Icon && (
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#172A21] text-[#124F40] dark:text-[#5BB78D]">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </div>

        <div className="flex items-center gap-2 text-xs">
          {change && (
            <span
              className={`inline-flex items-center font-bold font-mono px-1.5 py-0.5 rounded text-[11px] ${
                isPositive
                  ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40'
                  : isNegative
                  ? 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40'
                  : 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800'
              }`}
            >
              {isPositive && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
              {isNegative && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-500 dark:text-slate-400 text-[11px] truncate">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
