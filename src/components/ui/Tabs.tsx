import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underline' | 'segmented';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  layoutId?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'segmented',
  size = 'md',
  className,
  layoutId = 'active-tab-indicator',
}: TabsProps) {
  const sizes = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5',
  };

  if (variant === 'underline') {
    return (
      <div className={cn('border-b border-slate-200 dark:border-slate-800 flex space-x-6 overflow-x-auto', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative flex items-center gap-2 py-3 px-1 font-medium text-sm transition-colors whitespace-nowrap focus:outline-none focus-visible:text-brand-700 dark:focus-visible:text-brand-400',
                isActive
                  ? 'text-brand-800 dark:text-brand-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
                tab.disabled && 'opacity-40 cursor-not-allowed'
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-bold',
                    isActive
                      ? 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  )}
                >
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId={`${layoutId}-underline`}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-700 dark:bg-brand-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Segmented control (default)
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 max-w-full overflow-x-auto select-none',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center justify-center rounded-lg font-medium transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
              sizes[size],
              isActive
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200',
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span className="text-2xs px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
