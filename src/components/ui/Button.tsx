import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'teal' | 'accent';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const isSpinnerActive = isLoading || loading;

    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98] rounded-xl touch-target';

    const variants = {
      primary:
        'bg-brand-800 text-white hover:bg-brand-900 active:bg-brand-950 focus-visible:ring-brand-300 shadow-sm shadow-brand-900/25 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-950 dark:font-bold',
      teal:
        'bg-brand-800 text-white hover:bg-brand-900 active:bg-brand-950 focus-visible:ring-brand-300 shadow-sm shadow-brand-900/25 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-950 dark:font-bold',
      accent:
        'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 focus-visible:ring-brand-300 shadow-sm shadow-brand-800/25 dark:bg-brand-500 dark:hover:bg-brand-400 dark:text-white',
      secondary:
        'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 focus-visible:ring-brand-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
      outline:
        'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 focus-visible:ring-brand-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',
      ghost:
        'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 focus-visible:ring-brand-300 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 focus-visible:ring-rose-500 shadow-sm shadow-rose-600/20 dark:bg-rose-600 dark:hover:bg-rose-700',
    };

    const sizes = {
      xs: 'text-xs px-2.5 py-1 gap-1 rounded-lg',
      sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg',
      md: 'text-sm px-4 py-2 gap-2 rounded-xl',
      lg: 'text-base px-5 py-2.5 gap-2.5 rounded-xl',
      icon: 'h-9 w-9 p-0 rounded-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isSpinnerActive}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isSpinnerActive ? (
          <svg
            className="w-4 h-4 animate-spin text-current shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-95"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        <span>{isSpinnerActive && loadingText ? loadingText : children}</span>
        {!isSpinnerActive && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
