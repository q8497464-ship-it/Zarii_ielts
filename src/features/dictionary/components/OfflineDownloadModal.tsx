import React, { useState, useRef } from 'react';
import {
  X,
  DownloadCloud,
  CheckCircle2,
  HardDrive,
  Trash2,
  Loader2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { dictionaryStore, type OfflineStorageStatus } from '../dictionaryService';
import { useAppStore } from '../../../store/useAppStore';

interface OfflineDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: OfflineStorageStatus;
  onStatusChange: (newStatus: OfflineStorageStatus) => void;
}

export function OfflineDownloadModal({
  isOpen,
  onClose,
  status,
  onStatusChange,
}: OfflineDownloadModalProps) {
  const { addToast } = useAppStore();
  const [downloadType, setDownloadType] = useState<'essential' | 'full'>('essential');
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadedBytes, setDownloadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  if (!isOpen) return null;

  const handleStartDownload = async () => {
    setIsDownloading(true);
    setProgress(0);
    abortControllerRef.current = new AbortController();

    const success = await dictionaryStore.downloadOfflineDictionary(
      downloadType,
      (pct, dBytes, tBytes) => {
        setProgress(pct);
        setDownloadedBytes(dBytes);
        setTotalBytes(tBytes);
      },
      abortControllerRef.current.signal
    );

    setIsDownloading(false);
    if (success) {
      const updated = dictionaryStore.getOfflineStatus();
      onStatusChange(updated);
      addToast({
        type: 'success',
        title: 'Offline Dictionary Ready',
        message: `${downloadType === 'essential' ? 'Essential 20,000' : 'Full'} dictionary downloaded successfully.`,
      });
      onClose();
    }
  };

  const handleCancelDownload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsDownloading(false);
    setProgress(0);
    addToast({
      type: 'info',
      title: 'Download Cancelled',
      message: 'Offline dictionary download was stopped.',
    });
  };

  const handleRemoveOffline = async () => {
    await dictionaryStore.clearOfflineStorage();
    const updated = dictionaryStore.getOfflineStatus();
    onStatusChange(updated);
    addToast({
      type: 'info',
      title: 'Offline Storage Removed',
      message: 'Cached dictionary files have been cleared from this browser.',
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 MB';
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DownloadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Offline Dictionary Storage
              </h3>
              <p className="text-2xs text-slate-500">Fast lookups anywhere without internet</p>
            </div>
          </div>
          <button
            disabled={isDownloading}
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Status Banner */}
          {status.isDownloaded && !isDownloading ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Offline Dictionary Installed ({status.type === 'essential' ? 'Essential 20k' : 'Full 144k'})
                  </div>
                  <div className="text-2xs text-emerald-700/80 dark:text-emerald-400/80">
                    {status.cachedEntriesCount.toLocaleString()} words • {formatSize(status.sizeBytes)} used
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveOffline}
                className="text-xs text-rose-600 border-rose-200 dark:border-rose-900/40 hover:bg-rose-50 dark:hover:bg-rose-950/30 gap-1.5 h-8"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </Button>
            </div>
          ) : null}

          {/* Download Options */}
          {!isDownloading ? (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Choose Offline Package
              </span>

              <div className="grid grid-cols-1 gap-3">
                {/* Option 1: Essential 20k */}
                <div
                  onClick={() => setDownloadType('essential')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    downloadType === 'essential'
                      ? 'border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        Essential 20,000 Words
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-2xs font-mono">
                      ~2.4 MB gz
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Recommended for mobile & low data. Covers 98% of all everyday English and IELTS exam vocabulary.
                  </p>
                </div>

                {/* Option 2: Full Dictionary */}
                <div
                  onClick={() => setDownloadType('full')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    downloadType === 'full'
                      ? 'border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        Full Comprehensive Dictionary
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-2xs font-mono">
                      ~17.3 MB gz
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Complete 144,456 entries with all scientific, domain-specific, and rare academic senses.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Download Progress Screen */
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  Downloading {downloadType === 'essential' ? 'Essential 20k' : 'Full Dictionary'}...
                </span>
                <span className="font-mono font-bold text-emerald-600">{progress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-2xs text-slate-400">
                <span>Transferred: {formatSize(downloadedBytes)}</span>
                <span>Est. Total: {formatSize(totalBytes || 18000000)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isDownloading}>
            Close
          </Button>

          {isDownloading ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelDownload}
              className="text-rose-600 border-rose-300"
            >
              Cancel Download
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleStartDownload}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
            >
              <DownloadCloud className="w-4 h-4" />
              <span>Start Download</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
