import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Heart,
  Globe2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import { copy } from '../../lib/copy';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-6 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="space-y-3">
        <ZariiLogo variant="full" size="lg" />
        <div className="flex items-center gap-2 pt-2">
          <Badge variant="teal">Our Mission</Badge>
          <span className="text-xs text-slate-400 font-medium">100% Free Open Education</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          About Zarii IELTS
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          {copy.brand.shortAbout}
        </p>
      </div>

      {/* Core Disclaimers Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 space-y-3 text-xs leading-relaxed text-teal-900 dark:text-teal-200">
        <div className="flex items-center gap-2 font-bold text-sm text-teal-950 dark:text-teal-100">
          <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <span>Core Commitments &amp; Transparent Disclaimers</span>
        </div>
        <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
          <li>
            <strong>Estimated Scores:</strong> Scores computed by Zarii are diagnostic approximations calibrated to official public band descriptors. They are not official test results issued by Cambridge Assessment English, IDP: IELTS Australia, or the British Council.
          </li>
          <li>
            <strong>100% Original Content:</strong> Every reading passage, listening audio script, writing prompt, and speaking cue card is original educational material authored to match Cambridge IELTS exam standards.
          </li>
          <li>
            <strong>100% Offline Privacy:</strong> All test responses, audio recordings, writing drafts, and progress stats stay strictly on your device inside browser IndexedDB. We collect zero tracking cookies.
          </li>
        </ul>
      </div>

      {/* The 4 Pillars */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Why Zarii Was Built
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 space-y-2 border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Authentic CD-IELTS Simulation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Experience the computer-delivered exam interface: split-screen passage reading, text highlighting, multi-speaker audio with accent variations, and real exam timers.
            </p>
          </Card>

          <Card className="p-5 space-y-2 border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Strict Examiner AI Feedback</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Writing and speaking evaluators calibrated to official band descriptors with evidence quotation, Task 1 overview helpers, and zero paid API subscription requirements.
            </p>
          </Card>

          <Card className="p-5 space-y-2 border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Offline-First Progressive Web App</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Full PWA caching with stale-while-revalidate, on-demand offline test download, and debounced IndexedDB autosave. Practice on commutes with zero internet connection.
            </p>
          </Card>

          <Card className="p-5 space-y-2 border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Habit Science &amp; Spaced Repetition</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Daily streaks with freeze shields, SuperMemo-2 vocabulary flashcards with Urdu support, 30 milestone badges, and adaptive weekly study plans.
            </p>
          </Card>
        </div>
      </div>

      {/* Call to action */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <Link to="/" className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">
          &larr; Back to Home
        </Link>
        <Link to="/signup">
          <Button variant="teal" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Start Free Practice
          </Button>
        </Link>
      </div>
    </div>
  );
}
