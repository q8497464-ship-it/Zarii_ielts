import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Upload,
  Download,
  Layers,
  Sparkles,
  RefreshCw,
  FileSpreadsheet,
  X,
  Volume2,
  ExternalLink,
  Shield,
  HelpCircle,
  Flag,
} from 'lucide-react';
import {
  dictionaryAdminStore,
  type AdminDictionaryPatch,
  type DictionaryReportEntity,
  type CsvDryRunResult,
  type DictionaryBuildInfo,
} from '../../../../features/dictionary/dictionaryAdminStore';
import { dictionaryStore, type DictionaryEntry } from '../../../../features/dictionary/dictionaryService';
import { useAdminToast } from '../AdminToast';
import { ConfirmDialog } from '../ConfirmDialog';
import { StatusBadge } from '../StatusBadge';

export function DictionaryManager() {
  const { addToast } = useAdminToast();

  // Sub-tabs: 'patches' | 'search' | 'reports' | 'bulk_import' | 'build_info'
  const [activeTab, setActiveTab] = useState<
    'patches' | 'search' | 'reports' | 'bulk_import' | 'build_info'
  >('patches');

  // Patches state
  const [patches, setPatches] = useState<AdminDictionaryPatch[]>(() =>
    dictionaryAdminStore.getPatches()
  );
  const [patchSearch, setPatchSearch] = useState('');
  const [patchStatusFilter, setPatchStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [needsReviewOnly, setNeedsReviewOnly] = useState(false);

  // Reports state
  const [reports, setReports] = useState<DictionaryReportEntity[]>(() =>
    dictionaryAdminStore.getReports()
  );
  const [reportStatusFilter, setReportStatusFilter] = useState<string>('all');

  // Build info state
  const [buildInfo, setBuildInfo] = useState<DictionaryBuildInfo>(() =>
    dictionaryAdminStore.getBuildInfo()
  );

  // Search Live Dictionary State
  const [liveSearchQuery, setLiveSearchQuery] = useState('');
  const [liveSearchResult, setLiveSearchResult] = useState<DictionaryEntry | null>(null);
  const [isSearchingLive, setIsSearchingLive] = useState(false);

  // Patch Editor Modal
  const [editingPatch, setEditingPatch] = useState<Partial<AdminDictionaryPatch> | null>(null);
  const [isPatchModalOpen, setIsPatchModalOpen] = useState(false);

  // Delete Confirm Dialog
  const [deletePatchTarget, setDeletePatchTarget] = useState<AdminDictionaryPatch | null>(null);

  // CSV Bulk Import State
  const [csvText, setCsvText] = useState(
    'word,urdu_meaning,example_sentence\nresilience,مصیبت سے ابھرنے کی صلاحیت,She showed great resilience.\neloquent,فصیح و بلیغ,He gave an eloquent speech.\nmeticulous,انتہائی محتاط,She is meticulous about grammar.'
  );
  const [dryRunResult, setDryRunResult] = useState<CsvDryRunResult | null>(null);
  const [isCommittingImport, setIsCommittingImport] = useState(false);

  useEffect(() => {
    return dictionaryAdminStore.subscribe(() => {
      setPatches(dictionaryAdminStore.getPatches());
      setReports(dictionaryAdminStore.getReports());
      setBuildInfo(dictionaryAdminStore.getBuildInfo());
    });
  }, []);

  // Filtered patches
  const filteredPatches = useMemo(() => {
    return patches.filter((p) => {
      if (patchStatusFilter !== 'all' && p.status !== patchStatusFilter) return false;
      if (needsReviewOnly && !p.needsReview) return false;
      if (patchSearch.trim()) {
        const q = patchSearch.toLowerCase().trim();
        const matchesWord = p.headword.toLowerCase().includes(q);
        const matchesUrdu = p.urduMeaning && p.urduMeaning.toLowerCase().includes(q);
        if (!matchesWord && !matchesUrdu) return false;
      }
      return true;
    });
  }, [patches, patchStatusFilter, needsReviewOnly, patchSearch]);

  // Handle Search in full dictionary
  const handleLiveSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!liveSearchQuery.trim()) return;
    setIsSearchingLive(true);
    try {
      const res = await dictionaryStore.getEntry(liveSearchQuery.trim());
      setLiveSearchResult(res.entry);
    } catch {
      setLiveSearchResult(null);
    } finally {
      setIsSearchingLive(false);
    }
  };

  // Open Patch Editor
  const handleOpenAddPatch = (prefillWord = '') => {
    setEditingPatch({
      headword: prefillWord,
      pos: 'noun',
      action: 'add',
      urduMeaning: '',
      urduNotes: '',
      needsReview: false,
      status: 'draft',
      senses: [{ def: '', urduMeaning: '', examples: [] }],
    });
    setIsPatchModalOpen(true);
  };

  const handleOpenEditPatch = (patch: AdminDictionaryPatch) => {
    setEditingPatch({ ...patch });
    setIsPatchModalOpen(true);
  };

  const handleSavePatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatch?.headword?.trim()) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Headword is required.',
      });
      return;
    }

    dictionaryAdminStore.savePatch(editingPatch as any);
    addToast({
      type: 'success',
      title: 'Patch Saved',
      message: `Patch for "${editingPatch.headword}" was saved as ${editingPatch.status || 'draft'}.`,
    });
    setIsPatchModalOpen(false);
    setEditingPatch(null);
  };

  const handleDeletePatch = () => {
    if (!deletePatchTarget) return;
    dictionaryAdminStore.deletePatch(deletePatchTarget.id);
    addToast({
      type: 'info',
      title: 'Patch Deleted',
      message: `Patch for "${deletePatchTarget.headword}" removed.`,
    });
    setDeletePatchTarget(null);
  };

  const handlePublishRelease = () => {
    const res = dictionaryAdminStore.publishPatches();
    addToast({
      type: 'success',
      title: 'Patch Release Published',
      message: `Published release ${res.version} containing ${res.publishedCount} updated patches without shard redeploy.`,
    });
  };

  const handleRunDryRun = () => {
    const res = dictionaryAdminStore.dryRunImportUrduCsv(csvText);
    setDryRunResult(res);
  };

  const handleCommitCsvImport = () => {
    setIsCommittingImport(true);
    setTimeout(() => {
      const res = dictionaryAdminStore.commitImportUrduCsv(csvText);
      setIsCommittingImport(false);
      setDryRunResult(null);
      addToast({
        type: 'success',
        title: 'Urdu Meanings Imported',
        message: `Successfully created/updated ${res.importedCount} dictionary patches.`,
      });
      setActiveTab('patches');
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Build Info Badge and Release Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              English Dictionary &amp; Lexical Patch Manager
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#124F40] text-[#5BB78D]">
              {buildInfo.patchReleaseVersion}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage runtime word patches, Urdu translations, reported student errors, and instant versioned releases.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Publish Patch Release */}
          <button
            onClick={handlePublishRelease}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            title="Publish all draft patches as a new version without touching static shards"
          >
            <CheckCircle className="w-3.5 h-3.5 text-[#5BB78D]" />
            <span>Publish Patch Release ({buildInfo.draftPatchesCount} Drafts)</span>
          </button>

          {/* New Word Patch */}
          <button
            onClick={() => handleOpenAddPatch()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#5BB78D]" />
            <span>New Word Patch</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {[
          { id: 'patches', label: `Active Patches (${patches.length})`, icon: Layers },
          { id: 'search', label: 'Lookup & Inspect Word', icon: Search },
          { id: 'reports', label: `Reported Issues (${reports.filter((r) => r.status === 'new').length} New)`, icon: Flag },
          { id: 'bulk_import', label: 'Bulk Import Urdu (CSV)', icon: FileSpreadsheet },
          { id: 'build_info', label: 'Build & Licenses', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-[#5BB78D] text-[#124F40] dark:text-[#5BB78D] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB: ACTIVE PATCHES */}
      {activeTab === 'patches' && (
        <div className="space-y-4">
          {/* Patch Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#112019] border border-slate-200 dark:border-[#24392F]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={patchSearch}
                onChange={(e) => setPatchSearch(e.target.value)}
                placeholder="Search patches by word or Urdu meaning..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={patchStatusFilter}
                onChange={(e) => setPatchStatusFilter(e.target.value as any)}
                className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={needsReviewOnly}
                  onChange={(e) => setNeedsReviewOnly(e.target.checked)}
                  className="rounded text-[#124F40] focus:ring-0"
                />
                <span>Needs Review</span>
              </label>
            </div>
          </div>

          {/* Patches Table */}
          <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold bg-slate-50/50 dark:bg-slate-800/20">
                    <th className="py-3 px-3">Headword</th>
                    <th className="py-3 px-3">Action</th>
                    <th className="py-3 px-3">Urdu Meaning &amp; Notes</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Flags</th>
                    <th className="py-3 px-3">Version</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredPatches.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No dictionary patches found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredPatches.map((patch) => (
                      <tr
                        key={patch.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 dark:text-white capitalize block">
                            {patch.headword}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {patch.pos || 'noun'}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              patch.action === 'hide'
                                ? 'bg-rose-500/15 text-rose-600 border border-rose-500/30'
                                : patch.action === 'add'
                                ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                                : 'bg-blue-500/15 text-blue-700 border border-blue-500/30'
                            }`}
                          >
                            {patch.action}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span className="text-slate-800 dark:text-slate-200 font-urdu text-sm block">
                            {patch.urduMeaning || '—'}
                          </span>
                          {patch.urduNotes && (
                            <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                              {patch.urduNotes}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <StatusBadge status={patch.status} />
                        </td>

                        <td className="py-3 px-3">
                          {patch.needsReview ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 border border-amber-500/30">
                              Needs Review
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">—</span>
                          )}
                        </td>

                        <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                          v{patch.version}
                        </td>

                        <td className="py-3 px-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditPatch(patch)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                              title="Edit Patch"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletePatchTarget(patch)}
                              className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600"
                              title="Delete Patch"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB: LOOKUP & INSPECT ENTRY */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <form onSubmit={handleLiveSearch} className="flex gap-2 max-w-xl">
            <input
              type="text"
              value={liveSearchQuery}
              onChange={(e) => setLiveSearchQuery(e.target.value)}
              placeholder="Enter English word to inspect (e.g. resilience, serendipity)..."
              className="flex-1 px-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSearchingLive}
              className="px-4 py-2 rounded-xl bg-[#124F40] text-white text-xs font-bold hover:bg-[#0E3D32]"
            >
              {isSearchingLive ? 'Searching...' : 'Lookup Word'}
            </button>
          </form>

          {liveSearchResult ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] space-y-4 max-w-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                    {liveSearchResult.word}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="font-mono">{liveSearchResult.phonetic || liveSearchResult.pronunciation?.ipa}</span>
                    <span>&bull;</span>
                    <span className="capitalize">{liveSearchResult.partOfSpeech}</span>
                    <span>&bull;</span>
                    <span className="font-semibold text-emerald-600">Level {liveSearchResult.level || liveSearchResult.levelEstimate}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAddPatch(liveSearchResult.word)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:bg-slate-200"
                >
                  Create / Edit Patch &rarr;
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Definition:</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {liveSearchResult.definition}
                </p>
                {liveSearchResult.urduMeaning && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Urdu Meaning:</span>
                    <p className="text-sm font-urdu text-[#124F40] dark:text-[#5BB78D] mt-0.5">
                      {liveSearchResult.urduMeaning}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : liveSearchQuery && !isSearchingLive ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] text-center max-w-md space-y-3">
              <p className="text-xs text-slate-500">
                Word "{liveSearchQuery}" not found in static shards or active patches.
              </p>
              <button
                onClick={() => handleOpenAddPatch(liveSearchQuery)}
                className="px-4 py-2 rounded-xl bg-[#124F40] text-white text-xs font-bold hover:bg-[#0E3D32]"
              >
                + Add "{liveSearchQuery}" as New Headword Patch
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* 5. TAB: STUDENT REPORTED PROBLEMS */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#112019] border border-slate-200 dark:border-[#24392F]">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Candidate Reported Issues &amp; Triage
              </h3>
              <p className="text-[11px] text-slate-400">
                Issues submitted from the dictionary entry report modal.
              </p>
            </div>

            <select
              value={reportStatusFilter}
              onChange={(e) => setReportStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Reports</option>
              <option value="new">New Reports</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold bg-slate-50/50 dark:bg-slate-800/20">
                    <th className="py-3 px-3">Word</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Report Details</th>
                    <th className="py-3 px-3">Reported By</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {reports
                    .filter((r) => reportStatusFilter === 'all' || r.status === reportStatusFilter)
                    .map((rep) => (
                      <tr key={rep.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-white capitalize">
                          {rep.word}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {rep.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-300 max-w-sm truncate">
                          {rep.details || 'No additional details provided.'}
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px] font-mono">
                          {rep.user_email || 'anonymous'}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              rep.status === 'new'
                                ? 'bg-amber-500/15 text-amber-700 border border-amber-500/30'
                                : 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                            }`}
                          >
                            {rep.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {rep.status !== 'resolved' && (
                              <button
                                onClick={() => {
                                  dictionaryAdminStore.updateReportStatus(rep.id, 'resolved');
                                  addToast({
                                    type: 'success',
                                    title: 'Report Resolved',
                                    message: `Report for "${rep.word}" marked as resolved.`,
                                  });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-bold"
                              >
                                Resolve
                              </button>
                            )}
                            <button
                              onClick={() => handleOpenAddPatch(rep.word)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-xs font-semibold"
                            >
                              Create Patch
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB: BULK IMPORT URDU CSV WITH DRY-RUN */}
      {activeTab === 'bulk_import' && (
        <div className="space-y-6 max-w-3xl">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Bulk Import Urdu Meanings from CSV (with Interactive Dry-Run)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Paste comma-separated rows formatted as: <code>word,urdu_meaning,example_sentence</code>.
              </p>
            </div>

            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRunDryRun}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200"
              >
                Perform Dry-Run Validation
              </button>
              {dryRunResult && dryRunResult.validRows > 0 && (
                <button
                  type="button"
                  disabled={isCommittingImport}
                  onClick={handleCommitCsvImport}
                  className="px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold cursor-pointer"
                >
                  {isCommittingImport ? 'Importing...' : `Commit Import (${dryRunResult.validRows} Rows)`}
                </button>
              )}
            </div>

            {/* Dry-run results card */}
            {dryRunResult && (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Dry-Run Report Summary
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700">
                    {dryRunResult.validRows} of {dryRunResult.totalRows} Rows Valid
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-500">
                  <div>
                    <span>Total Rows:</span> <b className="text-slate-900 dark:text-white">{dryRunResult.totalRows}</b>
                  </div>
                  <div>
                    <span>Valid Rows:</span> <b className="text-emerald-600">{dryRunResult.validRows}</b>
                  </div>
                  <div>
                    <span>New Patches:</span> <b className="text-blue-600">{dryRunResult.newWordsCount}</b>
                  </div>
                  <div>
                    <span>Overrides:</span> <b className="text-amber-600">{dryRunResult.existingWordsCount}</b>
                  </div>
                </div>

                {dryRunResult.sampleRows.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Parsed Sample Rows:
                    </span>
                    <div className="space-y-1">
                      {dryRunResult.sampleRows.map((s, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                        >
                          <span className="font-bold capitalize">{s.word}</span>
                          <span className="font-urdu text-sm text-[#124F40] dark:text-[#5BB78D]">{s.urduMeaning}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {s.isExisting ? 'Update existing' : 'New patch'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. TAB: BUILD INFO & LICENSES */}
      {activeTab === 'build_info' && (
        <div className="space-y-6 max-w-3xl">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Dictionary Build Metadata &amp; Offline Shard Engine
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Static binary shards are immutable; runtime patches overlay without app re-deployments.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 font-mono uppercase">Engine Core</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">{buildInfo.engineVersion}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 font-mono uppercase">Patch Release</span>
                <p className="font-bold text-sm text-[#5BB78D] mt-0.5">{buildInfo.patchReleaseVersion}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 font-mono uppercase">Static Headwords</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {buildInfo.totalStaticHeadwords.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 font-mono uppercase">Active Shards</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">{buildInfo.totalShards} Shards</p>
              </div>
            </div>

            {/* Sources & Licenses List */}
            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Open-Source Lexical Sources &amp; Compliance Attribution
              </h4>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                {buildInfo.sources.map((s, idx) => (
                  <div key={idx} className="p-3.5 bg-white dark:bg-slate-900/60 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{s.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {s.version}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{s.description}</p>
                      <span className="inline-block text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        License: {s.license}
                      </span>
                    </div>

                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. PATCH EDITOR MODAL */}
      {isPatchModalOpen && editingPatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#112019] rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-[#24392F]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {editingPatch.id ? 'Edit Dictionary Patch' : 'Create Headword Patch'}
              </h3>
              <button
                onClick={() => {
                  setIsPatchModalOpen(false);
                  setEditingPatch(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePatch} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Headword
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPatch.headword || ''}
                    onChange={(e) => setEditingPatch({ ...editingPatch, headword: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Patch Action
                  </label>
                  <select
                    value={editingPatch.action || 'edit'}
                    onChange={(e) => setEditingPatch({ ...editingPatch, action: e.target.value as any })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="edit">Edit / Enrich Meaning</option>
                    <option value="add">Add New Word</option>
                    <option value="hide">Hide from Search</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Urdu Translation / Meaning
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={editingPatch.urduMeaning || ''}
                  onChange={(e) => setEditingPatch({ ...editingPatch, urduMeaning: e.target.value })}
                  placeholder="اردو معنی درج کریں..."
                  className="w-full px-3 py-1.5 text-sm font-urdu rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Urdu Contrastive Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={editingPatch.urduNotes || ''}
                  onChange={(e) => setEditingPatch({ ...editingPatch, urduNotes: e.target.value })}
                  placeholder="اردو زبان اور انگریزی کے تقابل کے متعلق وضاحتی نوٹ..."
                  className="w-full px-3 py-1.5 text-xs font-urdu rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPatch.needsReview || false}
                    onChange={(e) => setEditingPatch({ ...editingPatch, needsReview: e.target.checked })}
                    className="rounded text-[#124F40]"
                  />
                  <span>Mark as "Needs Review"</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPatchModalOpen(false);
                      setEditingPatch(null);
                    }}
                    className="px-3.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs rounded-xl bg-[#124F40] text-white font-bold hover:bg-[#0E3D32]"
                  >
                    Save Patch
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deletePatchTarget}
        title="Delete Dictionary Patch"
        message={`Are you sure you want to remove the patch for "${deletePatchTarget?.headword}"? Static dictionary data will be restored.`}
        confirmLabel="Delete Patch"
        onConfirm={handleDeletePatch}
        onClose={() => setDeletePatchTarget(null)}
      />
    </div>
  );
}
