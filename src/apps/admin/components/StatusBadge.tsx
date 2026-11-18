import React from 'react';

export type BadgeStatus =
  | 'published'
  | 'draft'
  | 'archived'
  | 'active'
  | 'suspended'
  | 'pending'
  | 'new'
  | 'reviewed'
  | 'resolved'
  | 'error'
  | 'success'
  | 'warning';

export type ContentStatus = BadgeStatus;

interface StatusBadgeProps {
  status: string;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
  const norm = (status || '').toLowerCase() as BadgeStatus;

  let colorClasses = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  switch (norm) {
    case 'published':
    case 'active':
    case 'resolved':
    case 'success':
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60';
      break;
    case 'draft':
    case 'pending':
    case 'new':
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60';
      break;
    case 'archived':
    case 'reviewed':
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60';
      break;
    case 'suspended':
    case 'error':
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60';
      break;
    case 'warning':
      colorClasses = 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/60';
      break;
  }

  const displayText = label || (status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' '));

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border tracking-wide uppercase font-mono ${colorClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {displayText}
    </span>
  );
}
