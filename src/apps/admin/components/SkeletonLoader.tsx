import React from 'react';

export function SkeletonLoader({
  type = 'card',
  count = 1,
  className = '',
}: {
  type?: 'card' | 'row' | 'stat' | 'text';
  count?: number;
  className?: string;
}) {
  const items = Array.from({ length: count });

  if (type === 'stat') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
        {items.map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] animate-pulse space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>
            <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-3 w-36 bg-slate-100 dark:bg-slate-800/60 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'row') {
    return (
      <div className={`space-y-2 ${className}`}>
        {items.map((_, i) => (
          <div
            key={i}
            className="h-12 w-full bg-slate-100 dark:bg-[#172A21]/60 rounded-xl animate-pulse flex items-center px-4 gap-4"
          >
            <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-1/6 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-1/8 rounded bg-slate-200 dark:bg-slate-800 ml-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] animate-pulse space-y-4 ${className}`}>
      <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/60 rounded" />
      <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800/60 rounded" />
    </div>
  );
}
