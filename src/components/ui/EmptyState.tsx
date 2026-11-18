import React from 'react';
import { cn } from '../../lib/utils';
import {
  BookIllustration,
  HeadphonesIllustration,
  PenIllustration,
  MicrophoneIllustration,
  EmptyInboxIllustration,
} from './BrandIllustrations';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  illustration?: 'book' | 'headphones' | 'pen' | 'microphone' | 'empty' | React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  illustration,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const renderVisual = () => {
    if (icon) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-dark-surface text-brand-800 dark:text-brand-400 flex items-center justify-center mb-4 shadow-subtle border border-brand-neutral-border dark:border-brand-dark-border">
          {icon}
        </div>
      );
    }

    if (React.isValidElement(illustration)) {
      return <div className="mb-4">{illustration}</div>;
    }

    if (illustration === 'book') return <div className="mb-4"><BookIllustration /></div>;
    if (illustration === 'headphones') return <div className="mb-4"><HeadphonesIllustration /></div>;
    if (illustration === 'pen') return <div className="mb-4"><PenIllustration /></div>;
    if (illustration === 'microphone') return <div className="mb-4"><MicrophoneIllustration /></div>;

    // Default to clean brand EmptyInboxIllustration
    return <div className="mb-4"><EmptyInboxIllustration /></div>;
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-brand-neutral-border dark:border-brand-dark-border bg-white/60 dark:bg-brand-dark-surface/40',
        className
      )}
    >
      {renderVisual()}
      <h3 className="text-base font-bold text-brand-neutral-main dark:text-brand-dark-text mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
