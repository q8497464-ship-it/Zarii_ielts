import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function AdminEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: AdminEmptyStateProps) {
  return (
    <div
      className={`py-12 px-6 rounded-2xl bg-white dark:bg-[#112019] border border-dashed border-slate-300 dark:border-[#24392F] flex flex-col items-center justify-center text-center ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#124F40]/10 dark:bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#124F40] hover:bg-[#0E3D32] dark:bg-[#5BB78D] dark:hover:bg-[#4AA67C] text-white dark:text-[#0B1612] text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
