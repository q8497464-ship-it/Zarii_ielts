import React, { createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

interface RadioGroupContextType {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioGroupProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function RadioGroup({ name, value, onChange, disabled, className, children }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
      <div role="radiogroup" className={cn('space-y-2', className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
  label?: React.ReactNode;
  description?: string;
}

export const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({ className, value, label, description, disabled, id, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    const isChecked = context?.value === value;
    const isDisabled = disabled || context?.disabled;
    const radioId = id || `radio-${context?.name || 'group'}-${value}`;

    return (
      <label
        htmlFor={radioId}
        className={cn(
          'inline-flex items-start gap-2.5 cursor-pointer select-none group',
          isDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            id={radioId}
            type="radio"
            ref={ref}
            name={context?.name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={() => context?.onChange?.(value)}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-4 h-4 rounded-full border transition-all duration-150 flex items-center justify-center',
              isChecked
                ? 'border-brand-700 dark:border-brand-400 bg-white dark:bg-slate-900'
                : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 group-hover:border-slate-400 dark:group-hover:border-slate-600',
              'focus-within:ring-2 focus-within:ring-brand-300 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900'
            )}
          >
            {isChecked && (
              <div className="w-2 h-2 rounded-full bg-brand-700 dark:bg-brand-400 animate-in fade-in zoom-in-75 duration-100" />
            )}
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

RadioItem.displayName = 'RadioItem';
