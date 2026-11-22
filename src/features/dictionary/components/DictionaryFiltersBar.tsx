import React from 'react';
import { Filter, Shield, ShieldAlert, Sparkles, Check } from 'lucide-react';
import type { SearchOptions } from '../dictionaryService';

interface DictionaryFiltersBarProps {
  options: SearchOptions;
  onChangeOptions: (newOptions: SearchOptions) => void;
  showAllWordsSafeMode?: boolean;
}

export function DictionaryFiltersBar({
  options,
  onChangeOptions,
  showAllWordsSafeMode = false,
}: DictionaryFiltersBarProps) {
  const posOptions: Array<{ id: SearchOptions['partOfSpeech']; label: string }> = [
    { id: 'all', label: 'All POS' },
    { id: 'noun', label: 'Nouns' },
    { id: 'verb', label: 'Verbs' },
    { id: 'adjective', label: 'Adjectives' },
    { id: 'adverb', label: 'Adverbs' },
  ];

  const levelOptions: Array<{ id: SearchOptions['level']; label: string }> = [
    { id: 'all', label: 'All Levels' },
    { id: 'A1', label: 'A1' },
    { id: 'A2', label: 'A2' },
    { id: 'B1', label: 'B1' },
    { id: 'B2', label: 'B2' },
    { id: 'C1', label: 'C1' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-2 px-1 text-xs">
      {/* POS and Common word pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          {posOptions.map(pos => (
            <button
              key={pos.id}
              onClick={() => onChangeOptions({ ...options, partOfSpeech: pos.id })}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                (options.partOfSpeech || 'all') === pos.id
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {pos.label}
            </button>
          ))}
        </div>

        {/* Common Words Filter */}
        <button
          onClick={() => onChangeOptions({ ...options, commonOnly: !options.commonOnly })}
          className={`px-3 py-1.5 rounded-xl border font-medium flex items-center gap-1.5 transition-colors ${
            options.commonOnly
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-400'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Common Words Only</span>
        </button>
      </div>

      {/* Safe mode indicator */}
      <div className="flex items-center gap-2">
        <span
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-2xs font-semibold ${
            showAllWordsSafeMode
              ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
          }`}
          title={
            showAllWordsSafeMode
              ? 'Offensive filter is off (Toggle in Settings)'
              : 'Safe mode active: Offensive words hidden (Change in Settings)'
          }
        >
          {showAllWordsSafeMode ? (
            <>
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Unfiltered</span>
            </>
          ) : (
            <>
              <Shield className="w-3.5 h-3.5" />
              <span>Safe Mode</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
