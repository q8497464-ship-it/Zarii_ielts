import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'circle';
  loading?: boolean;
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      shape = 'rounded',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:opacity-40 disabled:pointer-events-none select-none active:scale-95';

    const variants = {
      primary:
        'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 focus-visible:ring-teal-500 shadow-sm shadow-teal-700/20 dark:bg-teal-500 dark:text-slate-950',
      secondary:
        'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 focus-visible:ring-slate-400 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700',
      outline:
        'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800',
      ghost:
        'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
      danger:
        'bg-transparent text-rose-600 hover:bg-rose-50 hover:text-rose-700 focus-visible:ring-rose-500 dark:text-rose-400 dark:hover:bg-rose-950/40',
    };

    const sizes = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-9 w-9 text-base',
      lg: 'h-11 w-11 text-lg',
    };

    const shapes = {
      rounded: size === 'xs' ? 'rounded-md' : 'rounded-lg',
      circle: 'rounded-full',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], shapes[shape], className)}
        {...props}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin text-current" /> : children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
