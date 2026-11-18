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
          <li><strong>Local Storage Only:</strong> All test responses, recordings, and progress are stored in your browser's IndexedDB.</li>
          <li><strong>You Own Your Data:</strong> You can export everything as JSON anytime or wipe all local records with one click.</li>
          <li><strong>Estimated Scores:</strong> All scoring and band projections are local diagnostic estimates, not official scores.</li>
        </ul>
      </div>

      {/* Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-teal-600" />
            1. Where is my practice data stored?
          </h2>
          <p>
            When you take a Reading or Listening test, type an essay in Writing, or record your voice in Speaking, all text, timestamps, audio blobs, and scores are written directly to your device's browser database (IndexedDB via Dexie.js).
          </p>
          <p>
            This data never transits through our servers. If you switch computers or clear your browser cache without exporting a backup, your local test history will be deleted. You can create a complete portable backup anytime in <strong>Settings &rarr; Data Backup &rarr; Export Progress as JSON</strong>.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-700 dark:text-brand-400" />
            2. How does AI evaluation handle my essays and speaking transcripts?
          </h2>
          <p>
            Zarii operates on a free-first model. If you do not configure an AI key, Zarii evaluates essays using local, deterministic rule-based algorithms completely offline on your device.
          </p>
          <p>
            If you optionally configure a free Google Gemini or Groq API key in Settings, your browser sends your essay text or transcript directly from your browser to Google or Groq using your own key. Zarii maintains no intermediary server, proxy, or database capturing your prompts.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cookie className="w-4 h-4 text-amber-600" />
            3. Cookies and Analytics
          </h2>
          <p>
            Zarii does not use tracking cookies. We do not integrate Google Analytics, Meta Pixel, or any commercial advertising SDK. If privacy-friendly web analytics (such as Cloudflare Web Analytics) are enabled on the hosting CDN, they operate completely cookieless, do not track across sites, and do not record personal identifiable information.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-rose-600" />
            4. Deleting Your Information
          </h2>
          <p>
            You have complete sovereignty over your data. In <strong>Settings</strong>, the "Danger Zone" allows you to permanently wipe all stored attempts, vocabulary progress, and profile settings with a single confirmation.
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
