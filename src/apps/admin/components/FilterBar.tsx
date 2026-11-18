import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  selectedValue: string;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder?: string;
  filters?: FilterGroup[];
  onFilterChange?: (filterId: string, value: string) => void;
  onResetFilters?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Filter records...',
  filters = [],
  onFilterChange,
  onResetFilters,
  rightAction,
  className = '',
}: FilterBarProps) {
  const activeFiltersCount = filters.filter((f) => f.selectedValue !== 'all' && f.selectedValue !== '').length + (searchValue ? 1 : 0);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input + dropdown filters */}
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-[220px] max-w-sm flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] transition-all"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-2 top-2"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dynamic Dropdown Filters */}
          {filters.map((filter) => (
            <div key={filter.id} className="relative">
              <select
                value={filter.selectedValue}
                onChange={(e) => onFilterChange && onFilterChange(filter.id, e.target.value)}
                className="py-2 pl-3 pr-8 bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#5BB78D] cursor-pointer"
              >
                <option value="all">All {filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Filter className="w-3 h-3 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          ))}

          {/* Reset Filters button */}
          {activeFiltersCount > 0 && onResetFilters && (
            <button
              onClick={onResetFilters}
              className="px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Right action slot (e.g. Export / Create button) */}
        {rightAction && <div className="shrink-0">{rightAction}</div>}
      </div>
    </div>
  );
}
