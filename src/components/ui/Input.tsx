import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      required,
      type = 'text',
      id,
      value,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const [hasContent, setHasContent] = useState(Boolean(value));

    const handleClear = () => {
      setHasContent(false);
      onClear?.();
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5"
          >
            {label}
            {required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            value={value}
            disabled={disabled}
            onChange={(e) => {
              setHasContent(Boolean(e.target.value));
              props.onChange?.(e);
            }}
            className={cn(
              'flex h-10 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 transition-all shadow-subtle placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:border-brand-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-brand-400 dark:focus-visible:border-brand-400',
              leftIcon && 'pl-10',
              (rightIcon || (clearable && hasContent)) && 'pr-10',
              error && 'border-rose-500 focus-visible:ring-rose-500 dark:border-rose-500',
              className
            )}
            {...props}
          />
          {clearable && hasContent && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {!clearable && rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export function Label({
  className,
  children,
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label
      className={cn('block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5', className)}
      {...props}
    >
      {children}
      {required && <span className="text-rose-500 ml-1">*</span>}
    </label>
  );
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, required, showCount, maxLength, id, value, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const count = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={textareaId}
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300"
            >
              {label}
              {required && <span className="text-rose-500 ml-1">*</span>}
            </label>
            {showCount && maxLength && (
              <span className="text-2xs text-slate-400">
                {count}/{maxLength}
              </span>
            )}
          </div>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={cn(
            'flex min-h-[100px] w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-all shadow-subtle placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:border-brand-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-brand-400 dark:focus-visible:border-brand-400',
            error && 'border-rose-500 focus-visible:ring-rose-500 dark:border-rose-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, required, id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5"
          >
            {label}
            {required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'flex h-10 w-full appearance-none rounded-xl border border-slate-300 bg-white px-3.5 py-2 pr-9 text-sm text-slate-900 transition-all shadow-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:border-brand-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus-visible:ring-brand-400 dark:focus-visible:border-brand-400',
              error && 'border-rose-500 focus-visible:ring-rose-500 dark:border-rose-500',
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export function CardRadio({
  checked,
  onChange,
  title,
  description,
  badge,
  icon,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        'w-full p-4 rounded-xl border text-left transition-all duration-150 flex items-start gap-3.5',
        checked
          ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 dark:border-brand-500 ring-2 ring-brand-400/25'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
      )}
    >
      <div
        className={cn(
          'w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 shrink-0 transition-colors',
          checked ? 'border-brand-700 bg-brand-700 dark:border-brand-400 dark:bg-brand-400' : 'border-slate-300 dark:border-slate-600'
        )}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-white dark:bg-slate-950" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {icon && <span className="text-slate-500 dark:text-slate-400">{icon}</span>}
          <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">{title}</span>
          {badge && (
            <span className="text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-900/60 dark:text-brand-300">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
      </div>
    </button>
  );
}
