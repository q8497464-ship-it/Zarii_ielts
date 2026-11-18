import React, { useState } from 'react';
import {
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  FileCode,
  Layers,
  X,
} from 'lucide-react';
import { contentStore } from '../../../../shared/content/contentStore';
import { useAdminToast } from '../AdminToast';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ImportExportModal({ isOpen, onClose, onSuccess }: ImportExportModalProps) {
  const { addToast } = useAdminToast();
  const [jsonString, setJsonString] = useState('');
  const [dryRunResult, setDryRunResult] = useState<{
    isValid: boolean;
    testsCount: number;
    writingCount: number;
    vocabCount: number;
    grammarCount: number;
    errors: string[];
  } | null>(null);

  if (!isOpen) return null;

  const handleDownloadFullExport = () => {
    const json = contentStore.exportAllContent();
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zarii-full-content-export-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Curriculum Bundle Downloaded',
      message: 'All tests, prompts, vocabulary words, and lessons exported.',
    });
  };

  const handleDryRunCheck = () => {
    if (!jsonString.trim()) return;
    const res = contentStore.dryRunImport(jsonString);
    setDryRunResult(res);
  };

  const handleCommitImport = () => {
    if (!dryRunResult || !dryRunResult.isValid) return;
    const success = contentStore.commitImport(jsonString);
    if (success) {
      addToast({
        type: 'success',
        title: 'Full Curriculum Imported',
        message: 'Database refreshed with imported curriculum entities.',
      });
      onSuccess();
      onClose();
    } else {
      addToast({
        type: 'error',
        title: 'Import Failed',
        message: 'Could not commit imported JSON bundle.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-2xl p-6 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#5BB78D]" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Curriculum Data Import &amp; Full Export
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* 1. Full Export Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Download Full Curriculum Export
            </h3>
            <p className="text-[11px] text-slate-500">
              Download all Reading, Listening, Writing, Speaking, Vocab, and Grammar assets in one JSON snapshot.
            </p>
          </div>
          <button
            onClick={handleDownloadFullExport}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <Download className="w-4 h-4 text-[#5BB78D]" /> Export All
          </button>
        </div>

        {/* 2. Dry-Run Import Area */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
              Dry-Run JSON Import
            </label>
            <textarea
              rows={6}
              value={jsonString}
              onChange={(e) => {
                setJsonString(e.target.value);
                setDryRunResult(null);
              }}
              placeholder="Paste curriculum JSON export payload here..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleDryRunCheck}
              disabled={!jsonString.trim()}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50"
            >
              Run Pre-flight Schema Validation
            </button>
          </div>

          {dryRunResult && (
            <div className="space-y-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold">Dry-Run Inspection Results:</span>
                {dryRunResult.isValid ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Ready to Import
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Schema Errors
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded bg-white dark:bg-slate-800">
                  <div className="font-bold text-sm">{dryRunResult.testsCount}</div>
                  <div className="text-[10px] text-slate-400">Tests</div>
                </div>
                <div className="p-2 rounded bg-white dark:bg-slate-800">
                  <div className="font-bold text-sm">{dryRunResult.writingCount}</div>
                  <div className="text-[10px] text-slate-400">Writing</div>
                </div>
                <div className="p-2 rounded bg-white dark:bg-slate-800">
                  <div className="font-bold text-sm">{dryRunResult.vocabCount}</div>
                  <div className="text-[10px] text-slate-400">Vocab</div>
                </div>
                <div className="p-2 rounded bg-white dark:bg-slate-800">
                  <div className="font-bold text-sm">{dryRunResult.grammarCount}</div>
                  <div className="text-[10px] text-slate-400">Grammar</div>
                </div>
              </div>

              {dryRunResult.errors.length > 0 && (
                <div className="p-2.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 space-y-1 text-[11px]">
                  {dryRunResult.errors.map((err, i) => (
                    <div key={i}>• {err}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-white">
            Cancel
          </button>
          <button
            type="button"
            disabled={!dryRunResult || !dryRunResult.isValid}
            onClick={handleCommitImport}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              dryRunResult && dryRunResult.isValid
                ? 'bg-[#124F40] hover:bg-[#0E3D32] text-white cursor-pointer'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            Commit &amp; Write to Database
          </button>
        </div>
      </div>
    </div>
  );
}
