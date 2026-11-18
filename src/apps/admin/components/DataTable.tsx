import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  MinusSquare,
} from 'lucide-react';

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  defaultVisible?: boolean;
}

interface BulkAction<T> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (selectedItems: T[]) => void;
  isDestructive?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string;
  title?: string;
  searchFilter?: string;
  bulkActions?: BulkAction<T>[];
  initialPageSize?: number;
  emptyState?: React.ReactNode;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  title,
  searchFilter = '',
  bulkActions = [],
  initialPageSize = 10,
  emptyState,
  onRowClick,
  className = '',
}: DataTableProps<T>) {
  // 1. Column visibility state
  const [visibleColumnIds, setVisibleColumnIds] = useState<Set<string>>(() => {
    return new Set(columns.filter((c) => c.defaultVisible !== false).map((c) => c.id));
  });
  const [isColumnPickerOpen, setIsColumnPickerOpen] = useState(false);

  // 2. Sorting state
  const [sortColumnId, setSortColumnId] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // 3. Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // 4. Pagination state
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter data based on searchFilter
  const filteredData = useMemo(() => {
    if (!searchFilter.trim()) return data;
    const query = searchFilter.toLowerCase().trim();
    return data.filter((item) => {
      return Object.values(item).some((val) => {
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [data, searchFilter]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!sortColumnId) return filteredData;
    const col = columns.find((c) => c.id === sortColumnId);
    if (!col) return filteredData;

    return [...filteredData].sort((a, b) => {
      let valA = col.accessorKey ? a[col.accessorKey] : a[col.id];
      let valB = col.accessorKey ? b[col.accessorKey] : b[col.id];

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      const comp = String(valA).localeCompare(String(valB), undefined, { numeric: true });
      return sortDirection === 'asc' ? comp : -comp;
    });
  }, [filteredData, sortColumnId, sortDirection, columns]);

  // Paginated slice
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Toggle Column Visibility
  const toggleColumnVisibility = (colId: string) => {
    setVisibleColumnIds((prev) => {
      const next = new Set(prev);
      if (next.has(colId)) {
        if (next.size > 1) next.delete(colId);
      } else {
        next.add(colId);
      }
      return next;
    });
  };

  // Toggle Sorting
  const handleSort = (colId: string) => {
    if (sortColumnId === colId) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else {
        setSortColumnId(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumnId(colId);
      setSortDirection('asc');
    }
  };

  // Selection handlers
  const allCurrentSelected = paginatedData.length > 0 && paginatedData.every((item) => selectedIds.has(keyExtractor(item)));
  const someCurrentSelected = paginatedData.some((item) => selectedIds.has(keyExtractor(item))) && !allCurrentSelected;

  const toggleSelectAllCurrent = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allCurrentSelected) {
        paginatedData.forEach((item) => next.delete(keyExtractor(item)));
      } else {
        paginatedData.forEach((item) => next.add(keyExtractor(item)));
      }
      return next;
    });
  };

  const toggleSelectRow = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // CSV Export
  const exportToCSV = () => {
    const exportColumns = columns.filter((c) => visibleColumnIds.has(c.id));
    const headers = exportColumns.map((c) => `"${c.header.replace(/"/g, '""')}"`).join(',');

    const itemsToExport = selectedIds.size > 0
      ? data.filter((item) => selectedIds.has(keyExtractor(item)))
      : sortedData;

    const rows = itemsToExport.map((item) => {
      return exportColumns
        .map((c) => {
          const raw = c.accessorKey ? item[c.accessorKey] : item[c.id];
          const text = raw === null || raw === undefined ? '' : String(raw);
          return `"${text.replace(/"/g, '""')}"`;
        })
        .join(',');
    });

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(title || 'export').toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const selectedItemsList = useMemo(() => {
    return data.filter((item) => selectedIds.has(keyExtractor(item)));
  }, [data, selectedIds, keyExtractor]);

  const activeColumns = columns.filter((c) => visibleColumnIds.has(c.id));

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          {title && (
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
          )}
          <span className="text-xs text-slate-400 font-mono">
            ({sortedData.length} total)
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Column Visibility Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsColumnPickerOpen(!isColumnPickerOpen)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-[#24392F] bg-white dark:bg-[#112019] text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#172b22] flex items-center gap-1.5 transition-colors"
              title="Show or hide columns"
              aria-expanded={isColumnPickerOpen}
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>Columns</span>
            </button>

            {isColumnPickerOpen && (
              <div
                className="absolute right-0 mt-1 z-30 w-48 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xl p-2 animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 border-b border-slate-100 dark:border-slate-800">
                  Toggle Columns
                </div>
                <div className="space-y-1 py-1 max-h-56 overflow-y-auto">
                  {columns.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-[#172b22] text-xs text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumnIds.has(c.id)}
                        onChange={() => toggleColumnVisibility(c.id)}
                        className="rounded border-slate-300 text-[#124F40] focus:ring-[#5BB78D]"
                      />
                      <span className="truncate">{c.header}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Export to CSV Button */}
          <button
            onClick={exportToCSV}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-[#24392F] bg-white dark:bg-[#112019] text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#172b22] flex items-center gap-1.5 transition-colors"
            title="Download CSV export"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Bulk Actions Floating Bar */}
      {selectedIds.size > 0 && (
        <div className="p-2.5 rounded-xl bg-[#124F40] dark:bg-[#172b22] text-white flex items-center justify-between gap-3 animate-in fade-in duration-150 shadow-md">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="px-2 py-0.5 rounded-full bg-[#5BB78D]/20 text-[#5BB78D] font-mono font-bold">
              {selectedIds.size}
            </span>
            <span>items selected</span>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-xs text-slate-300 hover:text-white underline ml-2"
            >
              Deselect all
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {bulkActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => action.onClick(selectedItemsList)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  action.isDestructive
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {action.icon && <action.icon className="w-3.5 h-3.5" />}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-[#24392F] bg-white dark:bg-[#112019] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs" role="table">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-[#24392F] bg-slate-50/75 dark:bg-[#172A21]/50 text-slate-500 dark:text-slate-400">
                {/* Select All Checkbox */}
                <th className="w-10 px-3.5 py-3">
                  <button
                    onClick={toggleSelectAllCurrent}
                    aria-label="Select all rows on current page"
                    className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none"
                  >
                    {allCurrentSelected ? (
                      <CheckSquare className="w-4 h-4 text-[#124F40] dark:text-[#5BB78D]" />
                    ) : someCurrentSelected ? (
                      <MinusSquare className="w-4 h-4 text-[#124F40] dark:text-[#5BB78D]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>

                {/* Column Headers */}
                {activeColumns.map((col) => (
                  <th
                    key={col.id}
                    onClick={() => col.sortable !== false && handleSort(col.id)}
                    className={`px-4 py-3 font-semibold uppercase tracking-wider text-[11px] ${
                      col.sortable !== false ? 'cursor-pointer hover:text-slate-800 dark:hover:text-white select-none' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable !== false && (
                        <span className="shrink-0">
                          {sortColumnId === col.id ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-[#124F40] dark:text-[#5BB78D]" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-[#124F40] dark:text-[#5BB78D]" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-[#24392F]/60">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={activeColumns.length + 1} className="py-12 text-center text-slate-400">
                    {emptyState || 'No records found matching your filters.'}
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => {
                  const key = keyExtractor(item);
                  const isSelected = selectedIds.has(key);

                  return (
                    <tr
                      key={key}
                      onClick={() => onRowClick && onRowClick(item)}
                      className={`transition-colors ${
                        onRowClick ? 'cursor-pointer' : ''
                      } ${
                        isSelected
                          ? 'bg-[#124F40]/5 dark:bg-[#5BB78D]/10'
                          : 'hover:bg-slate-50/60 dark:hover:bg-[#172b22]/40'
                      }`}
                    >
                      {/* Row Checkbox */}
                      <td className="w-10 px-3.5 py-3">
                        <button
                          onClick={(e) => toggleSelectRow(key, e)}
                          aria-label={`Select row ${key}`}
                          className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#124F40] dark:text-[#5BB78D]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Cell Data */}
                      {activeColumns.map((col) => (
                        <td key={col.id} className="px-4 py-3 text-slate-800 dark:text-slate-200">
                          {col.cell ? col.cell(item) : (col.accessorKey ? String(item[col.accessorKey] ?? '') : String(item[col.id] ?? ''))}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination Controls */}
        <div className="px-4 py-3 border-t border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-[#172A21]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              Showing {sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} records
            </span>

            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-[11px]">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="py-1 px-2 rounded-lg bg-white dark:bg-[#112019] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#5BB78D]"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112019] hover:bg-slate-50 dark:hover:bg-[#172b22] disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono font-medium">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112019] hover:bg-slate-50 dark:hover:bg-[#172b22] disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
