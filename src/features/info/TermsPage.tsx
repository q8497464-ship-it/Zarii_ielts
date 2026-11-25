import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, AlertCircle, FileCheck, ShieldAlert, Award } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-6 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="navy">Terms of Service</Badge>
          <span className="text-xs text-slate-400 font-medium">Simple &amp; Plain Language</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          By using Zarii (English Course and IELTS Preparation), you agree to these clear and straightforward terms. No deceptive small print.
        </p>
      </div>

      {/* Prominent Legal Disclaimer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-100 space-y-2.5">
        <div className="flex items-center gap-2 font-bold text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Non-Affiliation, Course Qualifications &amp; Educational Purpose Disclaimer</span>
        </div>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
          IELTS is a registered trademark of its owners. Zarii is independent and not affiliated with or endorsed by IELTS partners. Course levels and certificates are for self-study purposes and are not official qualifications.
        </p>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          All calculated IELTS band scores (e.g. Band 7.0, Band 7.5) and CEFR course assessments (A1 to C1) are <strong>diagnostic estimations only</strong> based on official conversion tables and band descriptors. They do not constitute an official IELTS test report form (TRF) or an accredited institutional qualification.
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-teal-600" />
            1. 100% Free &amp; Open Educational Material
          </h2>
          <p>
            Zarii is provided completely free of charge. You may use it for personal study, independent learning, or non-commercial classroom instruction without paying any subscription fees or licensing costs.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-700 dark:text-brand-400" />
            2. Intellectual Property, Course Curriculum &amp; Dictionary Corpora
          </h2>
          <p>
            All original course lessons, grammar rules, timelines, reading passages, listening scripts, audio recordings, writing prompts, and vocabulary items published within Zarii are educational works designed to foster genuine fluency. Our offline dictionary is built upon open-source corpora (Open English WordNet, CMUdict, and frequency datasets) accredited in full on our <Link to="/credits" className="text-teal-600 dark:text-teal-400 underline font-semibold">Credits &amp; Attributions page</Link>. You may not republish, scrape, or resell this content for commercial gain.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" />
            3. Disclaimer of Warranties
          </h2>
          <p>
            The software, practice material, and lexical definitions are provided "as is" without warranty of any kind, express or implied. While we take meticulous care to calibrate all answer keys and evaluation criteria against official examiner standards, we cannot warrant that the service will be uninterrupted or error-free.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            4. Local Data Responsibility &amp; Offline Downloads
          </h2>
          <p>
            Because all progress, course completions, and essay submissions are stored locally on your device's browser, you are responsible for maintaining your own backups via our built-in JSON export feature if you intend to preserve your records across devices or browser resets. Offline dictionary shards downloaded to your browser are for local caching only.
          </p>
        </div>
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <Link to="/privacy" className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">
          View Privacy Policy &rarr;
        </Link>
        <Link to="/" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
