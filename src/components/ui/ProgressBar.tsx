import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export interface ProgressBarProps {
  value?: number; // 0 to 100
  max?: number;
  label?: string;
  sublabel?: string;
  showPercentage?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?:
    | 'primary'
    | 'teal'
    | 'navy'
    | 'emerald'
    | 'amber'
    | 'rose'
    | 'listening'
    | 'reading'
    | 'writing'
    | 'speaking';
  indeterminate?: boolean;
  className?: string;
}

export function ProgressBar({
  value = 0,
  max = 100,
  label,
  sublabel,
  showPercentage = false,
  size = 'md',
  variant = 'primary',
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const sizeClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantFills = {
    primary: 'bg-brand-500 dark:bg-brand-400',
    teal: 'bg-[#0F8B8D] dark:bg-[#29B4B6]',
    navy: 'bg-[#2B7FB8] dark:bg-[#5095C2]',
    emerald: 'bg-[#1E9E63] dark:bg-[#2F9477]',
    amber: 'bg-[#C98A0A] dark:bg-[#E5AC3A]',
    rose: 'bg-[#D1453B] dark:bg-[#E07D69]',
    listening: 'bg-[#0F8B8D] dark:bg-[#29B4B6]',
    reading: 'bg-[#1E7A62] dark:bg-[#5BB78D]',
    writing: 'bg-[#C98A0A] dark:bg-[#E5AC3A]',
    speaking: 'bg-[#CF5C45] dark:bg-[#E07D69]',
  };

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || sublabel || showPercentage) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>}
          <div className="flex items-center gap-2 ml-auto">
            {sublabel && <span className="text-slate-500 dark:text-slate-400">{sublabel}</span>}
            {showPercentage && (
              <span className="font-semibold text-slate-900 dark:text-slate-100">{percentage}%</span>
            )}
          </div>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden relative',
          sizeClasses[size]
        )}
      >
        {indeterminate ? (
          <motion.div
            className={cn('h-full w-1/3 rounded-full', variantFills[variant])}
            animate={{
              x: ['-100%', '350%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: 'easeInOut',
            }}
          />
        ) : (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={cn('h-full rounded-full', variantFills[variant])}
          />
        )}
      </div>
    </div>
  );
}

export const Progress = ProgressBar;
