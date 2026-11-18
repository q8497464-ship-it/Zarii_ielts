import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      label,
      description,
      size = 'md',
      className,
      id,
    },
    ref
  ) => {
    const switchId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const sizes = {
      sm: { track: 'w-7 h-4', thumb: 'w-3 h-3', translate: 12 },
      md: { track: 'w-10 h-5', thumb: 'w-4 h-4', translate: 20 },
      lg: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 24 },
    };

    const s = sizes[size];

    return (
      <div className={cn('inline-flex items-center gap-3', disabled && 'opacity-50', className)}>
        <button
          id={switchId}
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={cn(
            'relative inline-flex shrink-0 p-0.5 rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 select-none',
            s.track,
            checked
              ? 'bg-brand-700 dark:bg-brand-400'
              : 'bg-slate-300 dark:bg-slate-700',
            disabled && 'cursor-not-allowed'
          )}
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              'pointer-events-none block rounded-full bg-white shadow-sm ring-0',
              s.thumb
            )}
            style={{
              x: checked ? s.translate : 0,
            }}
          />
        </button>
        {(label || description) && (
          <label htmlFor={switchId} className="cursor-pointer select-none">
            {label && (
              <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">
                {label}
              </span>
            )}
            {description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {description}
              </p>
            )}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
