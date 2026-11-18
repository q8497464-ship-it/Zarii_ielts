import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Zap,
  FileSpreadsheet,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAppStore } from '../../store/useAppStore';

const TOUR_STORAGE_KEY = 'zarii_product_tour_completed';

interface TourStep {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  tips: string[];
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'step-command-palette',
    badge: 'Quick Navigation',
    title: 'Instant Command Palette (⌘K / Ctrl+K)',
    description:
      'Jump anywhere in milliseconds. Search for specific reading passages, listening audio tests, vocabulary sets, or switch themes directly from your keyboard.',
    icon: Search,
    iconBg: 'bg-teal-50 dark:bg-teal-950/60',
    iconColor: 'text-teal-600 dark:text-teal-400',
    tips: [
      'Press ⌘K on macOS or Ctrl+K on Windows/Linux anywhere',
      'Instant fuzzy search for all 36 test modules and tools',
      'Zero mouse required for power navigation',
    ],
  },
  {
    id: 'step-smart-practice',
    badge: 'Adaptive Learning',
    title: 'Smart Practice & Mistake Notebook',
    description:
      'Stop guessing what to practice. Zarii continuously tracks your question-type accuracy, automatically targets your weakest areas, and adjusts difficulty to your target band.',
    icon: Zap,
    iconBg: 'bg-amber-50 dark:bg-amber-950/60',
    iconColor: 'text-amber-600 dark:text-amber-400',
    tips: [
      'Every missed question is automatically cataloged with explanations',
      'Retry only your errors with one click in the Mistake Notebook',
      'Adaptive difficulty levels scale up as your accuracy improves',
    ],
  },
  {
    id: 'step-official-exam',
    badge: 'Exam Simulation',
    title: 'Real Computer-Delivered IELTS Experience',
    description:
      'Train in the exact interface of the official computer-delivered test. Split-screen reading with draggable dividers, live audio waveforms, flag for review, and official timing alerts.',
    icon: FileSpreadsheet,
    iconBg: 'bg-brand-50 dark:bg-brand-950/60',
    iconColor: 'text-brand-700 dark:text-brand-300',
    tips: [
      'Draggable passage split view with font size and highlight tools',
      'Timing coach warns you when questions exceed target pace',
      'Full review matrix shows answered, unanswered and flagged items',
    ],
  },
  {
    id: 'step-ai-feedback',
    badge: 'Calibrated AI Scoring',
    title: 'Examiner-Level Writing & Speaking Feedback',
    description:
      'Get strict, realistic scores based on official Band 5–8 descriptors. Enjoy sentence-level grammar highlights, Band 6-to-7 upgrade recommendations, and model band answers.',
    icon: Sparkles,
    iconBg: 'bg-orange-50 dark:bg-orange-950/60',
    iconColor: 'text-orange-600 dark:text-orange-400',
    tips: [
      'Conservative scoring benchmarked within ±0.25 bands of official examiners',
      'Concrete rewrite suggestions to upgrade vocabulary and cohesion',
      'Works 100% offline with heuristic analysis or with free AI keys',
    ],
  },
  {
    id: 'step-habits-badges',
    badge: 'Habits & Consistency',
    title: 'Daily Streaks, Freeze Shields & 30 Badges',
    description:
      'Stay disciplined until test day. Build your daily streak with 1 automatic weekly freeze skip, earn XP across all 5 levels (Beginner to Master), and unlock 30 academic badges.',
    icon: Award,
    iconBg: 'bg-purple-50 dark:bg-purple-950/60',
    iconColor: 'text-purple-600 dark:text-purple-400',
    tips: [
      '1 free freeze shield every week to protect your consistency',
      '5-task weekly challenge sprint with +250 bonus XP reward',
      'Settings toggle allows you to turn all gamification off for pure neutral focus',
    ],
  },
];

export function ProductTour() {
  const { isTourOpen, setTourOpen, profile } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0);

  // Check on mount if tour should be opened automatically (first run after onboarding)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const completed = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!completed && profile?.onboardingCompleted) {
      setTourOpen(true);
    }
  }, [profile, setTourOpen]);

  // Keyboard navigation for tour
  useEffect(() => {
    if (!isTourOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentStep < TOUR_STEPS.length - 1) {
          setCurrentStep((s) => s + 1);
        } else {
          handleDismiss();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentStep > 0) {
          setCurrentStep((s) => s - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourOpen, currentStep]);

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    }
    setTourOpen(false);
    setCurrentStep(0);
  };

  const step = TOUR_STEPS[currentStep];
  const StepIcon = step.icon;

  if (!isTourOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-dialog-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          onClick={handleDismiss}
        />

        {/* Tour Card */}
        <motion.div
          key={step.id}
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-modal overflow-hidden flex flex-col"
        >
          {/* Top Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 flex">
            {TOUR_STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 transition-all duration-300 ${
                  i <= currentStep ? 'bg-teal-600 dark:bg-teal-400' : 'bg-transparent'
                }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800/60">
                {step.badge}
              </span>
              <span className="text-2xs text-slate-400 font-mono">
                Step {currentStep + 1} of {TOUR_STEPS.length}
              </span>
            </div>

            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              aria-label="Skip product tour"
              title="Skip Tour (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${step.iconBg} ${step.iconColor}`}
              >
                <StepIcon className="w-6 h-6" />
              </div>
              <div>
                <h3
                  id="tour-dialog-title"
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white"
                >
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Checklist / Highlights */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              {step.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
            <button
              onClick={handleDismiss}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors px-2 py-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              Skip Tour
            </button>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                  className="text-xs"
                >
                  Back
                </Button>
              )}

              {currentStep < TOUR_STEPS.length - 1 ? (
                <Button
                  variant="teal"
                  size="sm"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="text-xs font-bold"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="teal"
                  size="sm"
                  onClick={handleDismiss}
                  className="text-xs font-bold"
                >
                  Finish & Start Practicing
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
