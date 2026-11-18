import React, { useState, useEffect } from 'react';
import {
  Clock,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sliders,
  AlertTriangle,
  FileCheck2,
  Send,
  LogOut,
  ChevronDown,
  User,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn, formatSecondsToTime } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

export interface ExamHeaderProps {
  title: string;
  module: 'reading' | 'listening' | 'writing' | 'speaking';
  testType?: 'academic' | 'general';
  isExamMode?: boolean;
  secondsRemaining: number;
  totalQuestions?: number;
  answeredCount?: number;
  flaggedCount?: number;
  onTimeExpire?: () => void;
  onOpenReview?: () => void;
  onOpenTestSetup?: () => void;
  onSubmit?: () => void;
  onExit?: () => void;
  volume?: number;
  onVolumeChange?: (vol: number) => void;
  extraControls?: React.ReactNode;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  title,
  module,
  testType = 'academic',
  isExamMode = true,
  secondsRemaining,
  totalQuestions = 40,
  answeredCount = 0,
  flaggedCount = 0,
  onOpenReview,
  onOpenTestSetup,
  onSubmit,
  onExit,
  volume = 1.0,
  onVolumeChange,
  extraControls,
}) => {
  const { profile } = useAppStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVolumeMenuOpen, setIsVolumeMenuOpen] = useState(false);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');

  // Screen reader milestone announcement (only fires at critical time thresholds)
  useEffect(() => {
    if (!isExamMode) return;

    if (secondsRemaining === 3600) {
      setScreenReaderAnnouncement('60 minutes remaining for this section.');
    } else if (secondsRemaining === 1800) {
      setScreenReaderAnnouncement('30 minutes remaining.');
    } else if (secondsRemaining === 900) {
      setScreenReaderAnnouncement('15 minutes remaining.');
    } else if (secondsRemaining === 600) {
      setScreenReaderAnnouncement('Notice: 10 minutes remaining in this section.');
    } else if (secondsRemaining === 300) {
      setScreenReaderAnnouncement('Warning: 5 minutes remaining. Please review your answers.');
    } else if (secondsRemaining === 60) {
      setScreenReaderAnnouncement('1 minute remaining.');
    } else if (secondsRemaining === 0) {
      setScreenReaderAnnouncement('Time is up for this section.');
    }
  }, [secondsRemaining, isExamMode]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
      console.warn('Fullscreen request failed or was dismissed', e);
    }
  };

  // Timer urgency color states
  const isUrgentAmber = secondsRemaining > 0 && secondsRemaining <= 600 && secondsRemaining > 300;
  const isUrgentRed = secondsRemaining > 0 && secondsRemaining <= 300;

  const candidateName = profile?.displayName || 'IELTS Candidate';

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 text-white px-3 sm:px-5 flex items-center justify-between shrink-0 select-none z-30 shadow-md">
      {/* Left: Candidate Info & Test Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {onExit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="text-xs text-slate-300 hover:text-white hover:bg-slate-800/90 border border-slate-700/60 px-2.5 h-8 min-h-[36px] sm:min-h-[32px]"
            title="Exit test session"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">Exit</span>
          </Button>
        )}

        <div className="flex items-center gap-2 min-w-0">
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-2xs text-slate-300">
            <User className="w-3 h-3 text-brand-300" />
            <span className="font-medium truncate max-w-[120px]">{candidateName}</span>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden lg:block" />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white truncate max-w-[110px] xs:max-w-[140px] sm:max-w-xs md:max-w-md">
                {title}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800/80 hidden sm:inline-block">
                {module} • {testType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Extra Controls (Passage/Section Tabs, etc.) */}
      {extraControls && (
        <div className="hidden md:flex items-center gap-1">
          {extraControls}
        </div>
      )}

      {/* Right: Timer, Volume, Fullscreen, Review, Submit */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Screen Reader Live Announcement for Key Timer Milestones Only */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {screenReaderAnnouncement}
        </div>

        {/* Visual Exam Countdown Timer (Hidden from aggressive per-second screen-reader polls) */}
        {isExamMode ? (
          <div
            aria-hidden="true"
            className={cn(
              'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-lg font-mono text-xs sm:text-sm font-bold shadow-xs select-none border min-h-[32px]',
              isUrgentRed
                ? 'bg-[#CF5C45] text-white border-[#D1453B] animate-pulse ring-1 ring-rose-500/30'
                : isUrgentAmber
                ? 'bg-amber-950/80 text-amber-200 border-amber-600/70'
                : 'bg-[#124F40] text-white border-[#17634F]'
            )}
            title={
              isUrgentRed
                ? 'CRITICAL: Less than 5 minutes remaining!'
                : isUrgentAmber
                ? 'NOTICE: Less than 10 minutes remaining!'
                : 'Time remaining in section'
            }
          >
            {isUrgentRed ? (
              <span className="relative flex h-2 w-2 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
            ) : (
              <Clock
                className={cn(
                  'w-3.5 h-3.5 shrink-0',
                  isUrgentAmber ? 'text-amber-400' : 'text-brand-300'
                )}
              />
            )}
            <span>{formatSecondsToTime(secondsRemaining)}</span>
          </div>
        ) : (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-300 border border-slate-700/60 text-xs font-mono min-h-[32px]">
            <Clock className="w-3.5 h-3.5 text-brand-300 shrink-0" />
            <span>Untimed</span>
          </div>
        )}

        {/* Volume Slider (for Audio/Listening) */}
        {onVolumeChange !== undefined && (
          <div className="relative">
            <button
              onClick={() => setIsVolumeMenuOpen(!isVolumeMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700/70 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] flex items-center justify-center"
              title="Adjust Volume"
            >
              {volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-teal-400" />
              )}
            </button>

            {isVolumeMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between text-2xs text-slate-400 mb-2 font-medium">
                  <span>Headphone Volume</span>
                  <span className="font-mono text-white">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* Test Setup Pre-Check button */}
        {onOpenTestSetup && (
          <button
            onClick={onOpenTestSetup}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/70 text-xs font-medium transition-colors h-8"
            title="Audio & Mic Pre-Exam Setup"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Setup</span>
          </button>
        )}

        {/* Fullscreen / Distraction-free Toggle (Desktop/Tablet) */}
        <button
          onClick={toggleFullscreen}
          className="hidden sm:inline-flex p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/70 text-xs font-medium transition-colors items-center justify-center gap-1.5 min-h-[36px] sm:min-h-[32px] sm:h-8"
          title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Distraction-free Fullscreen'}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden lg:inline text-2xs">Exit Fullscreen</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden lg:inline text-2xs">Fullscreen</span>
            </>
          )}
        </button>

        {/* Review Screen Trigger (Desktop/Tablet - on mobile it lives in bottom bar) */}
        {onOpenReview && (
          <button
            onClick={onOpenReview}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-medium transition-colors relative min-h-[36px] sm:min-h-[32px] sm:h-8"
            title="Open CD-IELTS Question Navigator & Review Matrix"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-brand-300" />
            <span className="hidden sm:inline">Review</span>
            {flaggedCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>
        )}

        {/* Finish / Submit Button */}
        {onSubmit && (
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            rightIcon={<Send className="w-3.5 h-3.5" />}
            className="text-xs h-8 min-h-[36px] sm:min-h-[32px] bg-brand-800 hover:bg-brand-700 text-white font-semibold shadow-xs px-2.5 sm:px-3"
          >
            <span className="hidden sm:inline">Finish &</span> Submit
          </Button>
        )}
      </div>
    </header>
  );
};
