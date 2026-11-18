import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { errorLogger } from '../../lib/errorLogger';
import {
  AlertCircle,
  Copy,
  ExternalLink,
  Mail,
  Check,
  Bug,
  Info,
} from 'lucide-react';

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialError?: string;
}

export function ReportProblemModal({
  isOpen,
  onClose,
  initialError,
}: ReportProblemModalProps) {
  const [userNote, setUserNote] = useState('');
  const [copied, setCopied] = useState(false);

  const reportBody = errorLogger.generateDiagnosticReport(
    [
      initialError ? `Initial Error: ${initialError}` : '',
      userNote.trim() ? userNote.trim() : 'User clicked report a problem.',
    ]
      .filter(Boolean)
      .join('\n\n')
  );

  const handleCopyDiagnostics = async () => {
    try {
      await navigator.clipboard.writeText(reportBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleOpenGitHub = () => {
    const title = encodeURIComponent(
      `[Bug]: ${userNote.slice(0, 50) || initialError?.slice(0, 50) || 'Problem in Zarii IELTS'}`
    );
    const body = encodeURIComponent(reportBody);
    const githubUrl = `https://github.com/zarii-ielts/zarii/issues/new?title=${title}&body=${body}`;
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenMailto = () => {
    const subject = encodeURIComponent('Zarii IELTS - Problem Report');
    const body = encodeURIComponent(reportBody);
    window.location.href = `mailto:support@zarii.app?subject=${subject}&body=${body}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Report a Problem"
      size="lg"
    >
      <div className="space-y-4 text-slate-800 dark:text-slate-200">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <Bug className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-slate-900 dark:text-white">
              Help us improve Zarii
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              We collect zero paid third-party tracking. You can file an issue on GitHub or send a direct email with diagnostic info attached.
            </p>
          </div>
        </div>

        {initialError && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs">
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
              Captured Error:
            </span>
            <code className="font-mono text-[11px] text-rose-600 dark:text-rose-400 break-words">
              {initialError}
            </code>
          </div>
        )}

        <div className="space-y-1.5">
          <label
            htmlFor="user-problem-note"
            className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
          >
            What happened? (Optional)
          </label>
          <textarea
            id="user-problem-note"
            rows={3}
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="e.g. When clicking 'Submit' in Reading Passage 2, nothing happened..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-600" />
              Generated Diagnostic Details
            </span>
            <button
              onClick={handleCopyDiagnostics}
              className="text-[11px] text-teal-600 hover:text-teal-700 dark:text-teal-400 flex items-center gap-1 font-semibold"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied to Clipboard' : 'Copy Diagnostics'}
            </button>
          </div>
          <pre className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 max-h-36 overflow-y-auto whitespace-pre-wrap">
            {reportBody}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenMailto}
            leftIcon={<Mail className="w-3.5 h-3.5" />}
          >
            Email Support
          </Button>

          <Button
            variant="teal"
            size="sm"
            onClick={handleOpenGitHub}
            leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
          >
            Create GitHub Issue
          </Button>
        </div>
      </div>
    </Modal>
  );
}
