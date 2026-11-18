import React from 'react';
import { cn } from '../../lib/utils';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, checked, indeterminate, disabled, id, ...props }, ref) => {
    const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-start gap-2.5 cursor-pointer select-none group',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            id={inputId}
            type="checkbox"
            ref={ref}
            checked={checked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-4 h-4 rounded-md border transition-all duration-150 flex items-center justify-center',
              checked || indeterminate
                ? 'bg-brand-700 border-brand-700 text-white dark:bg-brand-400 dark:border-brand-400 dark:text-brand-950'
                : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 group-hover:border-slate-400 dark:group-hover:border-slate-600',
              'focus-within:ring-2 focus-within:ring-brand-300 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900'
            )}
          >
            {indeterminate ? (
              <Minus className="w-3 h-3 stroke-[3]" />
            ) : checked ? (
              <Check className="w-3 h-3 stroke-[3]" />
            ) : null}
          </div>
        </div>
        {(label || description) && (
          <div className="text-sm">
            {label && (
              <span className="font-medium text-slate-800 dark:text-slate-200 leading-snug">
                {label}
              </span>
            )}
            {description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
