import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  interactive?: boolean;
  variant?: 'default' | 'subtle' | 'outline' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hoverEffect = false,
      interactive = false,
      variant = 'default',
      padding = 'md',
      ...props
    },
    ref
  ) => {
    const isInteractive = hoverEffect || interactive;

    const variants = {
      default:
        'border border-slate-200/80 bg-white shadow-card dark:border-slate-800/80 dark:bg-slate-900',
      subtle:
        'border border-slate-200/50 bg-slate-50/70 dark:border-slate-800/50 dark:bg-slate-900/60',
      outline:
        'border border-slate-300 dark:border-slate-700 bg-transparent',
      flat:
        'border-0 bg-slate-100 dark:bg-slate-800/60',
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-3.5 sm:p-4',
      md: 'p-5 sm:p-6',
      lg: 'p-6 sm:p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-200 text-slate-900 dark:text-slate-100',
          variants[variant],
          paddings[padding],
          isInteractive &&
            'cursor-pointer hover:shadow-card-hover hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 active:translate-y-0',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 pb-3', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100', className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center pt-4 border-t border-slate-100 dark:border-slate-800/60', className)} {...props} />;
}
