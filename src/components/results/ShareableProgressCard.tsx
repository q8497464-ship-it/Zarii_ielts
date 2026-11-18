import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import {
  Download,
  Share2,
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  GraduationCap,
  Copy,
  Check,
  TrendingUp,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatBand } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

export interface ShareableProgressCardProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  overallBand: number;
  targetBand: number;
  streakDays: number;
  skills: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  testsCompleted?: number;
  accuracyPercentage?: number;
}

export const ShareableProgressCard: React.FC<ShareableProgressCardProps> = ({
  isOpen,
  onClose,
  candidateName,
  overallBand,
  targetBand,
  streakDays,
  skills,
  testsCompleted = 12,
  accuracyPercentage = 82,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { addToast } = useAppStore();

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#0f172a',
      });

      const link = document.createElement('a');
      link.download = `zarii-ielts-score-${candidateName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();

      addToast({
        type: 'success',
        title: 'Progress Card Downloaded! 📸',
        message: 'Your official-style progress card is ready to share on LinkedIn, WhatsApp, or Instagram.',
      });
    } catch (err) {
      console.error('Failed to export card image:', err);
      addToast({
        type: 'error',
        title: 'Export Failed',
        message: 'Could not generate image from card element. Please try again.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    addToast({
      type: 'info',
      title: 'Link Copied',
      message: 'Zarii app URL copied to clipboard.',
      duration: 2000,
    });
  };

  const bandDelta = (overallBand - (targetBand - 1.0)).toFixed(1);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Your IELTS Progress Card"
      size="lg"
    >
      <div className="space-y-6">
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Celebrate your study milestones! Download this high-resolution progress badge and share your hard work with friends, teachers, or study partners.
        </p>

        {/* The Exportable Visual Card */}
        <div className="flex justify-center p-2 sm:p-4 bg-slate-100 dark:bg-slate-950/80 rounded-2xl overflow-hidden">
          <div
            ref={cardRef}
            className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white border-2 border-teal-500/30 shadow-2xl relative overflow-hidden select-none"
          >
            {/* Background Glow Accents */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-brand-500/15 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-brand-400/15 blur-2xl pointer-events-none" />

            {/* Top Row: App Brand & Watermark */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
                  <GraduationCap className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <span className="font-extrabold text-sm tracking-tight text-white block">
                    Zarii IELTS
                  </span>
                  <span className="text-[10px] text-teal-400 font-mono tracking-wider uppercase block">
                    Verified Preparation
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-2xs font-bold text-amber-300">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{streakDays || 5} Day Streak</span>
              </div>
            </div>

            {/* Main Score Hero */}
            <div className="py-6 text-center space-y-2 relative z-10">
              <span className="text-2xs uppercase tracking-widest text-slate-300 font-semibold block">
                Current Estimated Band
              </span>

              <div className="inline-flex items-baseline justify-center gap-1">
                <span className="font-mono text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-emerald-300 tracking-tight drop-shadow-md">
                  {formatBand(overallBand)}
                </span>
                <span className="text-lg font-mono text-slate-400 font-medium">/ 9.0</span>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold inline-flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
                  Target: Band {formatBand(targetBand)}
                </span>
                <span className="text-2xs text-slate-300">
                  {candidateName}
                </span>
              </div>
            </div>

            {/* 4 Skills Breakdown Grid */}
            <div className="grid grid-cols-4 gap-2 pt-2 pb-4 relative z-10">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-sky-400 block mb-0.5">
                  Listen
                </span>
                <span className="font-mono text-base font-extrabold text-white">
                  {formatBand(skills.listening)}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-0.5">
                  Read
                </span>
                <span className="font-mono text-base font-extrabold text-white">
                  {formatBand(skills.reading)}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">
                  Write
                </span>
                <span className="font-mono text-base font-extrabold text-white">
                  {formatBand(skills.writing)}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">
                  Speak
                </span>
                <span className="font-mono text-base font-extrabold text-white">
                  {formatBand(skills.speaking)}
                </span>
              </div>
            </div>

            {/* Footer Metrics & Timestamp */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
              <span>{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="text-teal-400 font-medium">100% Free IELTS Preparation</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            leftIcon={copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            className="text-xs w-full sm:w-auto"
          >
            {copiedLink ? 'Copied App Link' : 'Copy App Link'}
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-xs flex-1 sm:flex-none text-slate-500"
            >
              Close
            </Button>

            <Button
              variant="primary"
              onClick={handleDownloadImage}
              isLoading={isExporting}
              leftIcon={<Download className="w-4 h-4" />}
              className="text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white shadow-md flex-1 sm:flex-none h-9 px-5"
            >
              Download as PNG
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
