import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rounded' | 'card';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'rounded',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
    card: 'h-32 w-full rounded-2xl',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200/80 dark:bg-slate-800/80 shrink-0',
        variants[variant],
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 space-y-3.5 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="w-10 h-10" />
        <div className="space-y-1.5 flex-1">
          <Skeleton variant="text" className="w-2/3 h-4" />
          <Skeleton variant="text" className="w-1/3 h-3" />
        </div>
      </div>
      <Skeleton variant="text" className="w-full h-3" />
      <Skeleton variant="text" className="w-4/5 h-3" />
      <div className="pt-2 flex justify-between items-center">
        <Skeleton variant="rounded" className="w-20 h-6" />
        <Skeleton variant="rounded" className="w-16 h-8" />
      </div>
    </div>
  );
}
