import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rounded' | 'card';
  width?: string | number;
  height?: string | number;
}

/**
 * Base Shimmer Skeleton Primitive with subtle Zarii mint tint
 */
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
        'skeleton-shimmer shrink-0 select-none overflow-hidden',
        variants[variant],
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Single Module/Test Card Skeleton
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#112019]/70 p-5 space-y-3.5 shadow-xs',
        className
      )}
    >
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

/**
 * Student Home Dashboard Skeleton
 */
export function HomeSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner Skeleton */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white/70 dark:bg-[#112019]/70 border border-slate-200/80 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Skeleton variant="text" className="w-48 h-7" />
            <Skeleton variant="text" className="w-72 h-4" />
          </div>
          <Skeleton variant="rounded" className="w-36 h-10" />
        </div>
      </div>

      {/* 4 Skill Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Daily Tasks & Sprint Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white/70 dark:bg-[#112019]/70 border border-slate-200/80 dark:border-white/10 p-6 space-y-4">
          <Skeleton variant="text" className="w-40 h-5" />
          <div className="space-y-3">
            <Skeleton variant="rounded" className="w-full h-14" />
            <Skeleton variant="rounded" className="w-full h-14" />
            <Skeleton variant="rounded" className="w-full h-14" />
          </div>
        </div>
        <div className="rounded-2xl bg-white/70 dark:bg-[#112019]/70 border border-slate-200/80 dark:border-white/10 p-6 space-y-4">
          <Skeleton variant="text" className="w-32 h-5" />
          <Skeleton variant="circular" className="w-32 h-32 mx-auto" />
          <Skeleton variant="text" className="w-full h-4" />
        </div>
      </div>
    </div>
  );
}

/**
 * Practice Catalog Skeleton
 */
export function PracticeSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <Skeleton variant="rounded" className="w-full sm:w-72 h-10" />
        <div className="flex gap-2">
          <Skeleton variant="rounded" className="w-24 h-10" />
          <Skeleton variant="rounded" className="w-24 h-10" />
        </div>
      </div>

      {/* Test List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * Reading & Listening Split Test Passage Skeleton
 */
export function PassageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px] animate-in fade-in duration-200">
      {/* Left Passage Pane */}
      <div className="rounded-2xl bg-white/80 dark:bg-[#112019]/80 border border-slate-200/80 dark:border-white/10 p-6 space-y-4">
        <Skeleton variant="text" className="w-2/3 h-6" />
        <Skeleton variant="text" className="w-1/3 h-4" />
        <div className="space-y-2.5 pt-4">
          <Skeleton variant="text" className="w-full h-3.5" />
          <Skeleton variant="text" className="w-[96%] h-3.5" />
          <Skeleton variant="text" className="w-[92%] h-3.5" />
          <Skeleton variant="text" className="w-[98%] h-3.5" />
        </div>
        <div className="space-y-2.5 pt-3">
          <Skeleton variant="text" className="w-[94%] h-3.5" />
          <Skeleton variant="text" className="w-full h-3.5" />
          <Skeleton variant="text" className="w-[90%] h-3.5" />
        </div>
      </div>

      {/* Right Question Pane */}
      <div className="rounded-2xl bg-white/80 dark:bg-[#112019]/80 border border-slate-200/80 dark:border-white/10 p-6 space-y-5">
        <Skeleton variant="text" className="w-48 h-5" />
        <div className="space-y-3">
          <Skeleton variant="rounded" className="w-full h-20" />
          <Skeleton variant="rounded" className="w-full h-20" />
          <Skeleton variant="rounded" className="w-full h-20" />
        </div>
      </div>
    </div>
  );
}

/**
 * Results & Diagnostic Score Breakdown Skeleton
 */
export function ResultsSkeleton() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 animate-in fade-in duration-200">
      <div className="rounded-3xl bg-white/80 dark:bg-[#112019]/80 border border-slate-200/80 dark:border-white/10 p-8 text-center space-y-4">
        <Skeleton variant="circular" className="w-28 h-28 mx-auto" />
        <Skeleton variant="text" className="w-48 h-6 mx-auto" />
        <Skeleton variant="text" className="w-72 h-4 mx-auto" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/70 dark:bg-[#112019]/70 border border-slate-200/80 dark:border-white/10 text-center space-y-2">
            <Skeleton variant="text" className="w-16 h-3 mx-auto" />
            <Skeleton variant="text" className="w-12 h-6 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Analytics Table Skeleton
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#112019]/70 overflow-hidden">
      <div className="p-4 border-b border-slate-200/80 dark:border-white/10 flex justify-between">
        <Skeleton variant="text" className="w-32 h-4" />
        <Skeleton variant="rounded" className="w-20 h-7" />
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-1.5">
            <Skeleton variant="text" className="w-1/4 h-3.5" />
            <Skeleton variant="text" className="w-1/4 h-3.5" />
            <Skeleton variant="text" className="w-1/6 h-3.5" />
            <Skeleton variant="rounded" className="w-12 h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Chart Skeleton
 */
export function ChartSkeleton({ height = 280 }: { height?: number }) {
  return (
    <div
      style={{ height }}
      className="w-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#112019]/70 p-6 flex flex-col justify-between"
    >
      <div className="flex justify-between items-center">
        <Skeleton variant="text" className="w-40 h-4" />
        <Skeleton variant="rounded" className="w-24 h-6" />
      </div>
      <div className="flex items-end justify-between gap-2 h-36 px-4">
        {[40, 65, 30, 85, 55, 70, 95, 60].map((h, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            style={{ height: `${h}%` }}
            className="w-full max-w-[32px]"
          />
        ))}
      </div>
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-16 h-3" />
        <Skeleton variant="text" className="w-16 h-3" />
        <Skeleton variant="text" className="w-16 h-3" />
      </div>
    </div>
  );
}
