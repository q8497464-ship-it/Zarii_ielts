import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, HardDrive, Cookie, EyeOff, FileText, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-6 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="emerald">100% Client-Side Privacy</Badge>
          <span className="text-xs text-slate-400 font-medium">Last updated: November 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Plain language, zero legal jargon: Zarii is designed from the ground up so that your study data, essays, audio recordings, and results never leave your personal computer or phone.
        </p>
      </div>

      {/* Summary Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-950 dark:text-emerald-100 space-y-2">
        <span className="font-bold text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          The Privacy Guarantee at a Glance
        </span>
        <ul className="space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300 leading-relaxed">
          <li><strong>No Tracking Cookies:</strong> We do not set marketing, ad-targeting, or cross-site tracking cookies.</li>
          <li><strong>Local Storage Only:</strong> All IELTS test responses, English Course progress, and dictionary lookups are stored directly on your device.</li>
          <li><strong>Offline Lexicon Caching:</strong> Dictionary shards and voice syntheses work offline without transmitting lookup history to any server.</li>
          <li><strong>You Own Your Data:</strong> You can export everything as JSON anytime, use optional cloud sync when signed in, or wipe all local records with one click.</li>
        </ul>
      </div>

      {/* Trademark & Course Certificate Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
        <span className="font-bold block">Important Trademark &amp; Qualification Notice:</span>
        <p className="leading-relaxed">
          IELTS is a registered trademark of its owners. Zarii is independent and not affiliated with or endorsed by IELTS partners. Course levels and certificates are for self-study purposes and are not official qualifications.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-teal-600" />
            1. Where is my practice, course, and dictionary data stored?
          </h2>
          <p>
            When you take an IELTS Reading or Listening test, complete an English Course lesson (A1 to C1), practice speaking or writing, or save words in the offline dictionary, all entries, exercise scores, audio blobs, and timestamps are written directly to your browser's local database (IndexedDB via Dexie.js and CacheStorage).
          </p>
          <p>
            This data remains private to your device. If you use guest mode or stay offline, your study telemetry is never transmitted to any third-party analytics. If you switch devices without creating a backup, local records may be lost when clearing site data. You can export a complete JSON archive anytime in <strong>Settings &rarr; Data Backup &rarr; Export Progress as JSON</strong>.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#5BB78D]" />
            2. Offline dictionary downloads and search queries
          </h2>
          <p>
            The built-in English dictionary utilizes sharded static files that cache automatically in your browser's CacheStorage. When you search for headwords, inspect IPA transcriptions, or listen to browser text-to-speech audio, all lookups execute entirely client-side. Your search history, favorited words, and custom Urdu notes are never monitored or logged.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-700 dark:text-brand-400" />
            3. How does AI evaluation handle my essays and speaking transcripts?
          </h2>
          <p>
            Zarii operates on a free-first model. If you do not configure an AI key, Zarii evaluates essays and exercises using local, deterministic rule-based algorithms completely offline on your device.
          </p>
          <p>
            If you optionally configure a free Google Gemini or Groq API key in Settings, your browser sends your essay text or transcript directly from your browser to Google or Groq using your own key. Zarii maintains no intermediary server, proxy, or database capturing your prompts.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cookie className="w-4 h-4 text-amber-600" />
            4. Cookies, Optional Cloud Sync &amp; Analytics
          </h2>
          <p>
            Zarii does not use tracking cookies. We do not integrate Google Analytics, Meta Pixel, or commercial advertising SDKs. When signed into an optional account, progress synchronizes securely with Supabase Row Level Security (RLS) ensuring only your authenticated identity can access your records. CDN analytics operate completely cookieless and without personal identification.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-rose-600" />
            5. Deleting Your Information
          </h2>
          <p>
            You have complete sovereignty over your data. In <strong>Settings</strong>, the "Danger Zone" allows you to permanently wipe all stored attempts, course lessons, dictionary bookmarks, and profile settings with a single confirmation.
          </p>
        </div>
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <Link to="/terms" className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">
          Read Terms of Service &rarr;
        </Link>
        <Link to="/" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
