import React from 'react';

interface BrowseLetterGridProps {
  selectedLetter: string | null;
  onSelectLetter: (letter: string) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function BrowseLetterGrid({ selectedLetter, onSelectLetter }: BrowseLetterGridProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">
          Browse A to Z
        </h3>
        {selectedLetter && (
          <button
            onClick={() => onSelectLetter('')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Clear letter filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-7 sm:grid-cols-13 gap-1.5 sm:gap-2">
        {ALPHABET.map(letter => {
          const isSelected = selectedLetter?.toUpperCase() === letter;
          return (
            <button
              key={letter}
              onClick={() => onSelectLetter(isSelected ? '' : letter)}
              className={`h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md scale-105 ring-2 ring-emerald-500/40'
                  : 'bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-300'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
