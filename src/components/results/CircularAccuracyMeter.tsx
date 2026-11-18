import React from 'react';
import { cn } from '../../lib/utils';

export interface CircularAccuracyMeterProps {
  accuracyPercentage: number;
  score: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  color?: 'teal' | 'brand' | 'sky' | 'emerald' | 'indigo' | 'amber';
  label?: string;
  className?: string;
}

export const CircularAccuracyMeter: React.FC<CircularAccuracyMeterProps> = ({
  accuracyPercentage,
  score,
  total,
  size = 110,
  strokeWidth = 9,
  color = 'teal',
  label = 'Accuracy',
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(100, Math.max(0, accuracyPercentage));
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  const colorMap = {
    teal: 'text-brand-800 dark:text-brand-400 stroke-[#5BB78D]',
    brand: 'text-brand-800 dark:text-brand-400 stroke-[#5BB78D]',
    sky: 'text-sky-600 dark:text-sky-400 stroke-sky-500',
    emerald: 'text-[#1E9E63] dark:text-emerald-400 stroke-[#1E9E63]',
    indigo: 'text-brand-800 dark:text-brand-400 stroke-[#5BB78D]',
    amber: 'text-[#C98A0A] dark:text-amber-400 stroke-[#C98A0A]',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center select-none', className)}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-slate-200 dark:stroke-[#24392F]"
            fill="transparent"
          />

          {/* Animated Value Stroke Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn('transition-all duration-1000 ease-out fill-transparent', colorMap[color])}
          />
        </svg>

        {/* Center Text Metrics */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-2xl font-black text-brand-800 dark:text-brand-400 leading-none">
            {Math.round(clampedPercentage)}%
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-[#9DB3A7] mt-0.5">
            {score}/{total}
          </span>
        </div>
      </div>

      {label && (
        <span className="text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2">
          {label}
        </span>
      )}
    </div>
  );
};
