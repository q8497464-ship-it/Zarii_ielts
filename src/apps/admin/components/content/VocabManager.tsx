import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import type { VocabWordEntity } from '../../../../shared/types/database';
import { contentStore } from '../../../../shared/content/contentStore';
import { DataTable, type ColumnDef } from '../DataTable';
import { FilterBar, type FilterGroup } from '../FilterBar';
import { useAdminToast } from '../AdminToast';

export function VocabManager() {
  const { addToast } = useAdminToast();
  const [words, setWords] = useState<VocabWordEntity[]>(() => contentStore.getVocabWords());

  // Filters
  const [searchValue, setSearchValue] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');

  // Modal State for Editing / Adding
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeWord, setActiveWord] = useState<VocabWordEntity | null>(null);

  // CSV Import State
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvContent, setCsvContent] = useState('');
  const [csvValidation, setCsvValidation] = useState<{
    validRows: VocabWordEntity[];
    errorRows: Array<{ line: number; error: string; raw: string }>;
  } | null>(null);

  // Reload listener
  React.useEffect(() => {
    return contentStore.subscribe(() => {
      setWords(contentStore.getVocabWords());
    });
  }, []);

  const topics = useMemo(() => {
    const set = new Set<string>();
    words.forEach((w) => w.topic && set.add(w.topic));
    return Array.from(set);
  }, [words]);

  const filterGroups: FilterGroup[] = [
    {
      id: 'topic',
      label: 'Topic Category',
      selectedValue: topicFilter,
      options: [
        { label: 'All Topics', value: 'all' },
        ...topics.map((t) => ({ label: t.toUpperCase(), value: t })),
      ],
    },
  ];

  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      if (topicFilter !== 'all' && w.topic !== topicFilter) return false;
      if (searchValue.trim()) {
        const q = searchValue.toLowerCase();
        return (
          w.word.toLowerCase().includes(q) ||
          w.definition.toLowerCase().includes(q) ||
          (w.urdu_meaning && w.urdu_meaning.includes(q))
        );
      }
      return true;
    });
  }, [words, topicFilter, searchValue]);

  // Handle Export CSV
  const handleExportCsv = () => {
    const csv = contentStore.exportVocabCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zarii-academic-vocabulary-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Vocabulary Exported',
      message: `Downloaded CSV with ${words.length} vocabulary words.`,
    });
  };

  // Handle CSV file selection
  const handleCsvFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvContent(text);
      const res = contentStore.validateVocabCsv(text);
      setCsvValidation(res);
    };
    reader.readAsText(file);
  };

  // Commit CSV Import
  const handleCommitCsvImport = () => {
    if (!csvValidation || csvValidation.validRows.length === 0) return;
    const count = contentStore.importVocabRows(csvValidation.validRows);
    addToast({
      type: 'success',
      title: 'Vocabulary Imported',
      message: `Successfully loaded ${count} words into the database.`,
    });
    setIsCsvModalOpen(false);
    setCsvContent('');
    setCsvValidation(null);
  };

  // Save single word
  const handleSaveWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWord || !activeWord.word || !activeWord.definition) return;

    contentStore.saveVocabWord(activeWord);
    addToast({
      type: 'success',
      title: 'Word Saved',
      message: `"${activeWord.word}" updated in curriculum repository.`,
    });
    setIsEditModalOpen(false);
    setActiveWord(null);
  };

  const columns: ColumnDef<VocabWordEntity>[] = [
    {
      id: 'word',
      header: 'Headword',
      accessorKey: 'word',
      sortable: true,
      cell: (item) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{item.word}</span>
          <span className="text-[11px] font-mono text-slate-400">{item.phonetic || item.part_of_speech}</span>
        </div>
      ),
    },
    {
      id: 'definition',
      header: 'Definition',
      accessorKey: 'definition',
      cell: (item) => (
        <span className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 max-w-md">
          {item.definition}
        </span>
      ),
    },
    {
      id: 'urdu_meaning',
      header: 'Urdu Translation',
      accessorKey: 'urdu_meaning',
      cell: (item) => (
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-sans">
          {item.urdu_meaning || '—'}
        </span>
      ),
    },
    {
      id: 'academic_band',
      header: 'Band Target',
      accessorKey: 'academic_band',
      sortable: true,
      cell: (item) => (
        <span className="text-xs font-mono font-bold text-[#124F40] dark:text-[#5BB78D]">
          Band {item.academic_band}
        </span>
      ),
    },
    {
      id: 'topic',
      header: 'Topic',
      accessorKey: 'topic',
      sortable: true,
      cell: (item) => (
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {item.topic || 'General'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setActiveWord({ ...item });
              setIsEditModalOpen(true);
            }}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-white"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              contentStore.deleteVocabWord(item.id);
              addToast({
                type: 'info',
                title: 'Word Removed',
                message: `"${item.word}" removed.`,
              });
            }}
            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Vocabulary &amp; Academic Word List
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage {words.length} lexical items with Urdu translations, collocations, and bulk CSV integration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>

          <button
            onClick={() => {
              setCsvValidation(null);
              setCsvContent('');
              setIsCsvModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-[#5BB78D]" /> Bulk CSV Import
          </button>

          <button
            onClick={() => {
              setActiveWord({
                id: `vw-${Date.now().toString().slice(-4)}`,
                word: '',
                phonetic: '',
                part_of_speech: 'noun',
                definition: '',
                urdu_meaning: '',
                collocations: [],
                synonyms: [],
                antonyms: [],
                example_sentence: '',
                academic_band: 7.5,
                topic: 'academic',
                status: 'published',
                version: 1,
                created_at: new Date().toISOString(),
              });
              setIsEditModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#5BB78D]" /> Add Word
          </button>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search headwords, definitions, or Urdu translations..."
        filters={filterGroups}
        onFilterChange={(_, val) => setTopicFilter(val)}
        onResetFilters={() => {
          setSearchValue('');
          setTopicFilter('all');
        }}
      />

      {/* 3. DataTable */}
      <DataTable
        data={filteredWords}
        columns={columns}
        keyExtractor={(item) => item.id}
        title="VOCABULARY REPOSITORY"
      />

      {/* 4. Single Word Edit Modal */}
      {isEditModalOpen && activeWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {activeWord.id.startsWith('vw-') ? 'Add Academic Word' : 'Edit Academic Word'}
              </h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveWord} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Headword
                  </label>
                  <input
                    type="text"
                    required
                    value={activeWord.word}
                    onChange={(e) => setActiveWord({ ...activeWord, word: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phonetic IPA
                  </label>
                  <input
                    type="text"
                    value={activeWord.phonetic || ''}
                    onChange={(e) => setActiveWord({ ...activeWord, phonetic: e.target.value })}
                    placeholder="/dɪˈvɛləpmənt/"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Definition &amp; Meaning
                </label>
                <textarea
                  rows={2}
                  required
                  value={activeWord.definition}
                  onChange={(e) => setActiveWord({ ...activeWord, definition: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Urdu Meaning
                  </label>
                  <input
                    type="text"
                    value={activeWord.urdu_meaning || ''}
                    onChange={(e) => setActiveWord({ ...activeWord, urdu_meaning: e.target.value })}
                    placeholder="ترقی، ارتقاء"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Band Level
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={activeWord.academic_band}
                    onChange={(e) => setActiveWord({ ...activeWord, academic_band: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs"
                >
                  Save Word
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Bulk CSV Import Modal with Dry-run Preview & Error Reporting */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-2xl p-6 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#5BB78D]" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Bulk CSV Import with Dry-Run Validation
                </h2>
              </div>
              <button onClick={() => setIsCsvModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Select a CSV file containing: <code>Word, Phonetic, PartOfSpeech, Definition, Urdu, Band, Topic</code>
                </p>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleCsvFileLoad}
                  className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#124F40] file:text-white hover:file:bg-[#0E3D32] cursor-pointer"
                />
              </div>

              {/* Validation Summary */}
              {csvValidation && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Valid Rows Detected: {csvValidation.validRows.length}
                    </span>
                    {csvValidation.errorRows.length > 0 && (
                      <span className="text-rose-600 dark:text-rose-400 font-bold">
                        ⚠ Faulty Rows Skipped: {csvValidation.errorRows.length}
                      </span>
                    )}
                  </div>

                  {/* Error Report if any */}
                  {csvValidation.errorRows.length > 0 && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs space-y-1">
                      <span className="font-bold text-rose-800 dark:text-rose-300 block">
                        CSV Error Report:
                      </span>
                      {csvValidation.errorRows.map((err, i) => (
                        <div key={i} className="text-[11px] text-rose-700 dark:text-rose-400">
                          Line {err.line}: {err.error}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Preview Table of First 5 Rows */}
                  {csvValidation.validRows.length > 0 && (
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 uppercase">
                          <tr>
                            <th className="p-2">Word</th>
                            <th className="p-2">Definition</th>
                            <th className="p-2">Urdu</th>
                            <th className="p-2">Band</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {csvValidation.validRows.slice(0, 5).map((r) => (
                            <tr key={r.id}>
                              <td className="p-2 font-bold">{r.word}</td>
                              <td className="p-2 truncate max-w-xs">{r.definition}</td>
                              <td className="p-2">{r.urdu_meaning}</td>
                              <td className="p-2 font-mono">Band {r.academic_band}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCsvModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!csvValidation || csvValidation.validRows.length === 0}
                  onClick={handleCommitCsvImport}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    csvValidation && csvValidation.validRows.length > 0
                      ? 'bg-[#124F40] hover:bg-[#0E3D32] text-white cursor-pointer'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Import {csvValidation?.validRows.length || 0} Words
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
