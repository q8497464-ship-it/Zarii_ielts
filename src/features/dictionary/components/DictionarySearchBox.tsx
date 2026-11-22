import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  History,
  Bookmark,
  Sparkles,
  ArrowRight,
  CornerDownLeft,
  Volume2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import {
  dictionaryStore,
  playPronunciation,
  recordDictionarySearch,
  getDictionaryHistory,
  clearDictionaryHistory,
  type SearchResultItem,
  type SearchOptions,
} from '../dictionaryService';
import { Badge } from '../../../components/ui/Badge';
import { useAppStore } from '../../../store/useAppStore';

interface DictionarySearchBoxProps {
  searchOptions: SearchOptions;
  onSelectWord?: (word: string) => void;
  className?: string;
}

export function DictionarySearchBox({
  searchOptions,
  onSelectWord,
  className = '',
}: DictionarySearchBoxProps) {
  const navigate = useNavigate();
  const { currentTrack } = useAppStore();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inflectedMatch, setInflectedMatch] = useState<{ original: string; lemma: string } | undefined>();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load recent searches from history
  const loadRecentHistory = useCallback(async () => {
    const hist = await getDictionaryHistory(8);
    setRecentSearches(hist.map(h => h.query));
  }, []);

  useEffect(() => {
    loadRecentHistory();
  }, [loadRecentHistory]);

  // Debounce search query by 120ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 120);
    return () => clearTimeout(timer);
  }, [query]);

  // Execute prefix search when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setSuggestions([]);
      setInflectedMatch(undefined);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    dictionaryStore
      .search(debouncedQuery, searchOptions)
      .then(res => {
        if (!isMounted) return;
        setResults(res.results);
        setSuggestions(res.suggestions);
        setInflectedMatch(res.inflectedMatch);
        setIsLoading(false);
        setActiveIndex(-1);
      })
      .catch(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery, searchOptions]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenWord = (word: string) => {
    recordDictionarySearch(word, currentTrack);
    loadRecentHistory();
    setIsOpen(false);
    if (onSelectWord) {
      onSelectWord(word);
    } else {
      navigate(`/app/dictionary/${encodeURIComponent(word.toLowerCase())}`);
    }
  };

  // Keyboard navigation inside combobox
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        handleOpenWord(results[activeIndex].word);
      } else if (query.trim()) {
        handleOpenWord(query.trim());
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      {/* Combobox Search Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="dictionary-search-results"
          aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search 144,000+ words, idioms, inflected forms... (Press '/' to focus)"
          className="w-full pl-12 pr-24 py-4 text-base sm:text-lg font-medium rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-200"
        />

        <div className="absolute right-4 flex items-center gap-2">
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                setDebouncedQuery('');
                setResults([]);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div
          ref={dropdownRef}
          id="dictionary-search-results"
          role="listbox"
          className="absolute z-40 left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[420px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Inflected Form Banner */}
          {inflectedMatch && (
            <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>
                  Form detected: <strong className="font-semibold capitalize">{inflectedMatch.original}</strong> is an inflected form of{' '}
                  <strong className="font-semibold capitalize text-emerald-700 dark:text-emerald-400">{inflectedMatch.lemma}</strong>.
                </span>
              </div>
              <button
                onClick={() => handleOpenWord(inflectedMatch.lemma)}
                className="font-bold underline hover:text-emerald-700"
              >
                Open Base Lemma
              </button>
            </div>
          )}

          {/* Search Results Items */}
          {results.length > 0 ? (
            <div className="p-2 space-y-0.5">
              {results.map((item, idx) => (
                <div
                  key={item.id}
                  id={`result-${idx}`}
                  role="option"
                  aria-selected={activeIndex === idx}
                  onClick={() => handleOpenWord(item.word)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-sm transition-colors ${
                    activeIndex === idx
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-base capitalize">{item.word}</span>
                    <Badge variant="secondary" className="text-3xs font-mono uppercase px-1.5 py-0 h-4">
                      {item.partOfSpeech}
                    </Badge>
                    {item.isInflectedForm && (
                      <Badge variant="outline" className="text-3xs text-emerald-600 border-emerald-500/30">
                        Form of {item.lemma}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xs font-mono text-slate-400">
                      {item.frequencyRank <= 3000
                        ? 'Common'
                        : item.frequencyRank <= 12000
                        ? 'Mid'
                        : 'Advanced'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : debouncedQuery && !isLoading ? (
            /* Not Found & Did You Mean Suggestions */
            <div className="p-6 text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  No exact matches for "{query}"
                </h4>
                <p className="text-xs text-slate-500">
                  Check your spelling, or select one of the suggested alternatives below:
                </p>
              </div>

              {suggestions.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block">
                    Did you mean:
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {suggestions.map(sug => (
                      <button
                        key={sug}
                        onClick={() => handleOpenWord(sug)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 capitalize transition-colors"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Recent Searches Section (when empty or typing starts) */}
          {!debouncedQuery && recentSearches.length > 0 && (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  Recent Searches
                </span>
                <button
                  onClick={async () => {
                    await clearDictionaryHistory();
                    setRecentSearches([]);
                  }}
                  className="hover:text-rose-500 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => handleOpenWord(term)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 capitalize transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer keyboard hint */}
          <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between text-3xs text-slate-400">
            <span>Use ↑↓ to navigate, Enter to open</span>
            <span>Esc to close</span>
          </div>
        </div>
      )}
    </div>
  );
}
