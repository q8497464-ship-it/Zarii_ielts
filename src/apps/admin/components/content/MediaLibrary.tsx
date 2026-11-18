import React, { useState } from 'react';
import {
  HardDrive,
  UploadCloud,
  Play,
  Pause,
  Trash2,
  AlertTriangle,
  Link2,
  FileText,
  Image as ImageIcon,
  Music,
  CheckCircle,
  Eye,
  X,
} from 'lucide-react';
import type { MediaAssetEntity } from '../../../../shared/types/database';
import { contentStore, type MediaUsageRecord } from '../../../../shared/content/contentStore';
import { FileUploader } from '../FileUploader';
import { useAdminToast } from '../AdminToast';

export function MediaLibrary() {
  const { addToast } = useAdminToast();
  const [assets, setAssets] = useState<MediaAssetEntity[]>(() => contentStore.getMediaAssets());

  // Audio Playback Preview State
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Lightbox Preview Modal State
  const [previewMedia, setPreviewMedia] = useState<MediaAssetEntity | null>(null);

  // Usage Modal State
  const [usageTarget, setUsageTarget] = useState<MediaUsageRecord | null>(null);

  React.useEffect(() => {
    return contentStore.subscribe(() => {
      setAssets(contentStore.getMediaAssets());
    });
  }, []);

  const handleAudioToggle = (asset: MediaAssetEntity) => {
    if (playingId === asset.id) {
      audioElement?.pause();
      setPlayingId(null);
    } else {
      audioElement?.pause();
      const audio = new Audio(asset.public_url || asset.storage_path);
      audio.play().catch(() => {
        addToast({
          type: 'info',
          title: 'Audio Preview',
          message: `Simulating playback for "${asset.file_name}".`,
        });
      });
      audio.onended = () => setPlayingId(null);
      setAudioElement(audio);
      setPlayingId(asset.id);
    }
  };

  const handleDelete = (asset: MediaAssetEntity) => {
    const res = contentStore.deleteMediaAsset(asset.id);
    if (!res.success) {
      const usage = contentStore.getMediaUsage(asset.id);
      setUsageTarget(usage);
      addToast({
        type: 'error',
        title: 'Delete Blocked by Protection Policy',
        message: res.error || 'Media file is in use.',
      });
    } else {
      addToast({
        type: 'success',
        title: 'Media Asset Removed',
        message: `"${asset.file_name}" permanently deleted.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Media Asset Library &amp; Storage
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Audio clips (.mp3), passage diagrams, and task stimulus imagery with active usage tracking.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 text-xs font-semibold">
          <HardDrive className="w-4 h-4 text-emerald-500" />
          <span>{assets.length} Assets Staged</span>
        </div>
      </div>

      {/* 2. File Uploader Staging */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-3">
        <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Upload New Listening Audio or Diagram Image
        </h2>
        <FileUploader
          accept="audio/*,image/*"
          maxSizeMb={35}
          onFileSelected={(file) => {
            const uploaded = contentStore.uploadMediaAsset(file);
            addToast({
              type: 'success',
              title: 'Asset Uploaded',
              message: `Uploaded "${uploaded.file_name}" to media storage.`,
            });
          }}
        />
      </div>

      {/* 3. Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => {
          const isAudio = asset.file_type.startsWith('audio');
          const isPlaying = playingId === asset.id;
          const usage = contentStore.getMediaUsage(asset.id);
          const inUseCount = usage.references.length;

          return (
            <div
              key={asset.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isAudio
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {isAudio ? <Music className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-slate-900 dark:text-white block truncate" title={asset.file_name}>
                      {asset.file_name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {asset.file_size_bytes ? `${(asset.file_size_bytes / (1024 * 1024)).toFixed(2)} MB` : '1.4 MB'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewMedia(asset)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Preview Media"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(asset)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Delete Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Usage Indicator & Delete Protection Tag */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setUsageTarget(usage)}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    inUseCount > 0
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  <Link2 className="w-3 h-3" />
                  <span>{inUseCount > 0 ? `In Use (${inUseCount} tests)` : 'Unreferenced'}</span>
                </button>

                {isAudio && (
                  <button
                    onClick={() => handleAudioToggle(asset)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      isPlaying
                        ? 'bg-amber-500 text-white'
                        : 'bg-[#124F40] hover:bg-[#0E3D32] text-white'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#5BB78D]" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Delete Protection & Usage Tracking Modal */}
      {usageTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Asset Reference &amp; Delete Protection
                </h3>
              </div>
              <button onClick={() => setUsageTarget(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                File <strong>"{usageTarget.fileName}"</strong> is referenced in the following curriculum items:
              </p>

              {usageTarget.references.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-500">
                  This asset is safe to delete. No active tests or prompts currently reference it.
                </div>
              ) : (
                <ul className="space-y-1.5 max-h-48 overflow-y-auto">
                  {usageTarget.references.map((ref, i) => (
                    <li
                      key={i}
                      className="text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-medium text-slate-900 dark:text-white truncate">{ref.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setUsageTarget(null)}
                className="px-4 py-2 rounded-xl bg-[#124F40] text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Lightbox Media Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-xs truncate max-w-xs">{previewMedia.file_name}</span>
              <button onClick={() => setPreviewMedia(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-900 rounded-xl min-h-[200px]">
              {previewMedia.file_type.startsWith('image') ? (
                <img
                  src={previewMedia.public_url || previewMedia.storage_path}
                  alt={previewMedia.file_name}
                  className="max-h-72 object-contain rounded"
                />
              ) : (
                <div className="space-y-3 text-center">
                  <Music className="w-12 h-12 text-[#124F40] dark:text-[#5BB78D] mx-auto" />
                  <p className="text-xs font-mono text-slate-500">Audio playback enabled</p>
                  <audio controls className="w-full">
                    <source src={previewMedia.public_url || previewMedia.storage_path} />
                  </audio>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
