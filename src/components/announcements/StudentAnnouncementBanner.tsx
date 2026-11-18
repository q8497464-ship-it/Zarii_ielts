import React, { useState, useEffect } from 'react';
import { Sparkles, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import {
  communicationStore,
  type AnnouncementItem,
} from '../../shared/communication/communicationStore';

export function StudentAnnouncementBanner() {
  const [activeAnnouncements, setActiveAnnouncements] = useState<AnnouncementItem[]>(() =>
    communicationStore.getActiveAnnouncementsForStudent()
  );

  useEffect(() => {
    return communicationStore.subscribe(() => {
      setActiveAnnouncements(communicationStore.getActiveAnnouncementsForStudent());
    });
  }, []);

  if (activeAnnouncements.length === 0) return null;

  const current = activeAnnouncements[0];

  const handleDismiss = () => {
    communicationStore.dismissAnnouncementForStudent(current.id);
  };

  const isModal = current.format === 'modal';

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-white dark:bg-[#112019] rounded-2xl border border-slate-200 dark:border-[#24392F] shadow-2xl p-6 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#124F40]/10 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
            {current.type === 'urgent' ? (
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            ) : current.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            ) : current.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            ) : (
              <Sparkles className="w-5 h-5 text-[#5BB78D]" />
            )}
          </div>

          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            {current.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {current.message}
          </p>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleDismiss}
              className="px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Banner Format
  return (
    <div
      className={`w-full px-4 py-2.5 text-xs font-medium flex items-center justify-between gap-3 border-b transition-all select-none ${
        current.type === 'urgent'
          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-900/60'
          : current.type === 'warning'
          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-900/60'
          : current.type === 'success'
          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 border-emerald-200 dark:border-emerald-900/60'
          : 'bg-[#124F40]/10 dark:bg-[#124F40]/25 text-[#124F40] dark:text-[#5BB78D] border-[#124F40]/20'
      }`}
    >
      <div className="flex items-center gap-2 max-w-5xl truncate">
        {current.type === 'urgent' ? (
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
        ) : current.type === 'warning' ? (
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
        ) : current.type === 'success' ? (
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
        ) : (
          <Info className="w-4 h-4 shrink-0 text-[#124F40] dark:text-[#5BB78D]" />
        )}
        <span className="truncate">
          <strong className="font-bold">{current.title}:</strong> {current.message}
        </span>
      </div>

      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="p-1 rounded-md opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-opacity cursor-pointer shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
