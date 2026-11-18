import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  footerActions,
  className = '',
}: FormSectionProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/90 dark:border-[#24392F] bg-white dark:bg-[#112019] shadow-xs overflow-hidden ${className}`}
    >
      <div className="p-6 border-b border-slate-100 dark:border-[#24392F]/60">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="p-6 space-y-4">{children}</div>

      {footerActions && (
        <div className="px-6 py-4 bg-slate-50/60 dark:bg-[#172A21]/30 border-t border-slate-100 dark:border-[#24392F]/60 flex items-center justify-end gap-3">
          {footerActions}
        </div>
      )}
    </div>
  );
}
