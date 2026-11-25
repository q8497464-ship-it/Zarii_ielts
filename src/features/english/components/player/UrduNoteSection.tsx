import React from 'react';
import { Languages, HelpCircle } from 'lucide-react';

interface UrduNoteSectionProps {
  title: string;
  content: string;
}

export const UrduNoteSection: React.FC<UrduNoteSectionProps> = ({ title, content }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[#124F40] dark:text-[#5BB78D]">
        <Languages className="w-5 h-5" />
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 font-urdu" dir="rtl">
          {title}
        </h2>
      </div>

      <div
        dir="rtl"
        className="font-urdu p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-white dark:bg-gray-800 shadow-sm text-base md:text-lg leading-loose text-gray-800 dark:text-gray-200 whitespace-pre-line"
      >
        {content}
      </div>

      <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-gray-400 shrink-0" />
        <span>Urdu comparison notes highlight syntactic differences (e.g. SVO vs. SOV) to accelerate native comprehension.</span>
      </div>
    </div>
  );
};
