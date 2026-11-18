import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Calendar,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';
import { formatBand } from '../../lib/utils';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import type { UserProfile } from '../../types';

export interface MockReportData {
  mockId: string;
  mockTitle: string;
  testType: 'academic' | 'general';
  completedAt: string;
  candidateName: string;
  scores: {
    listening: { raw: number; total: number; band: number };
    reading: { raw: number; total: number; band: number };
    writing: { band: number; wordCountTask1: number; wordCountTask2: number };
    speaking: { band: number };
  };
  overallBand: number;
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
}

interface MockReportFormProps {
  report: MockReportData;
  onRetake?: () => void;
}

export const MockReportForm: React.FC<MockReportFormProps> = ({ report, onRetake }) => {
  const handlePrint = () => {
    window.print();
  };

  // Convert overall band to CEFR estimate
  const getCefrLevel = (band: number): string => {
    if (band >= 8.5) return 'C2 (Mastery)';
    if (band >= 7.0) return 'C1 (Effective Operational Proficiency)';
    if (band >= 5.5) return 'B2 (Vantage)';
    if (band >= 4.0) return 'B1 (Threshold)';
    return 'A2 (Waystage)';
  };

  const formattedDate = new Date(report.completedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const trfNumber = `TRF-${report.mockId.slice(-4).toUpperCase()}-${Date.now().toString().slice(-6)}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 print:p-0 print:m-0 print:max-w-none">
      {/* Action / Print Bar (Hidden during print) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Official-Style Mock Test Report Form (TRF)
            </h2>
            <p className="text-xs text-slate-500">
              Your comprehensive 4-skill exam report is ready to print or export as PDF.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onRetake && (
            <button
              onClick={onRetake}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Retake Mock Exam
            </button>
          )}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-800 hover:bg-brand-700 text-white transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report as PDF</span>
          </button>
        </div>
      </div>

      {/* Official Test Report Form Layout (A4 formatted) */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-8 sm:p-12 rounded-3xl border-2 border-slate-300 dark:border-slate-800 shadow-md print:bg-white print:text-slate-900 print:border-none print:shadow-none print:p-0 print:rounded-none relative print:avoid-break">
        {/* Top Zarii Official Header Banner */}
        <div className="border-b-2 border-slate-900 dark:border-slate-700 print:border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <ZariiLogo variant="full" size="md" />
            </div>
            <div className="h-12 w-px bg-slate-300 dark:bg-slate-700 print:bg-slate-300 hidden sm:block" />
            <div>
              <div className="text-[11px] font-black tracking-widest uppercase text-brand-800 dark:text-brand-400 print:text-brand-800 mb-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-700 dark:text-brand-400 print:text-brand-700" />
                <span>ZARII SIMULATED TEST REPORT FORM</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white print:text-slate-950">
                IELTS {report.testType.toUpperCase()} MOCK EXAMINATION
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 print:text-slate-600">
                4-Skill Computer-Delivered Benchmark • Certified Rigor Standards
              </p>
            </div>
          </div>

          <div className="text-right border-l-2 sm:border-l-0 pl-4 sm:pl-0 border-slate-200 dark:border-slate-800 print:border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block font-mono">
              Test Report Form No.
            </span>
            <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200 print:text-slate-800 tracking-wider">
              {trfNumber}
            </span>
            <span className="block text-2xs text-slate-500 dark:text-slate-400 print:text-slate-500 mt-0.5">
              Date: {formattedDate}
            </span>
          </div>
        </div>

        {/* Candidate Information Header Box */}
        <div className="bg-slate-50 dark:bg-slate-800/60 print:bg-slate-50 border border-slate-300 dark:border-slate-700 print:border-slate-300 rounded-xl p-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 print:text-slate-500 block">Candidate Name</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white print:text-slate-900">{report.candidateName || 'IELTS Candidate'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 print:text-slate-500 block">Test Module</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white print:text-slate-900 capitalize">{report.testType}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 print:text-slate-500 block">CEFR Level Est.</span>
            <span className="font-bold text-sm text-teal-800 dark:text-teal-300 print:text-teal-800">{getCefrLevel(report.overallBand)}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 print:text-slate-500 block">Center Ref</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white print:text-slate-900">PK-082 • Lahore</span>
          </div>
        </div>

        {/* Official Band Score Matrix */}
        <div className="mb-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 print:text-slate-600 mb-2">
            Component Band Scores & Overall Result
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {/* Listening */}
            <div className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 print:bg-white print:border-slate-300">
              <span className="font-bold text-2xs text-slate-500 dark:text-slate-400 print:text-slate-500 block uppercase mb-0.5">Listening</span>
              <div className="text-3xl font-black font-mono text-slate-950 dark:text-white print:text-slate-950">
                {formatBand(report.scores.listening.band)}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 print:text-slate-500 font-mono block mt-1">
                Score: {report.scores.listening.raw}/{report.scores.listening.total}
              </span>
            </div>

            {/* Reading */}
            <div className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 print:bg-white print:border-slate-300">
              <span className="font-bold text-2xs text-slate-500 dark:text-slate-400 print:text-slate-500 block uppercase mb-0.5">Reading</span>
              <div className="text-3xl font-black font-mono text-slate-950 dark:text-white print:text-slate-950">
                {formatBand(report.scores.reading.band)}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 print:text-slate-500 font-mono block mt-1">
                Score: {report.scores.reading.raw}/{report.scores.reading.total}
              </span>
            </div>

            {/* Writing */}
            <div className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 print:bg-white print:border-slate-300">
              <span className="font-bold text-2xs text-slate-500 dark:text-slate-400 print:text-slate-500 block uppercase mb-0.5">Writing</span>
              <div className="text-3xl font-black font-mono text-slate-950 dark:text-white print:text-slate-950">
                {formatBand(report.scores.writing.band)}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 print:text-slate-500 font-mono block mt-1">
                T1 & T2 Rigor
              </span>
            </div>

            {/* Speaking */}
            <div className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 print:bg-white print:border-slate-300">
              <span className="font-bold text-2xs text-slate-500 dark:text-slate-400 print:text-slate-500 block uppercase mb-0.5">Speaking</span>
              <div className="text-3xl font-black font-mono text-slate-950 dark:text-white print:text-slate-950">
                {formatBand(report.scores.speaking.band)}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 print:text-slate-500 font-mono block mt-1">
                Parts 1, 2 & 3
              </span>
            </div>

            {/* Overall Band Banner */}
            <div className="p-3.5 rounded-xl border-2 border-brand-800 dark:border-brand-500/80 bg-brand-50/60 dark:bg-brand-950/60 print:bg-brand-50/60 print:border-brand-800 col-span-2 sm:col-span-1 flex flex-col justify-center">
              <span className="font-black text-2xs text-brand-900 dark:text-brand-300 print:text-brand-900 uppercase block mb-0.5">Overall Band</span>
              <div className="text-4xl font-black font-mono text-brand-800 dark:text-brand-200 print:text-brand-800">
                {formatBand(report.overallBand)}
              </div>
              <span className="text-[10px] font-bold text-brand-700 dark:text-brand-400 print:text-brand-700 uppercase tracking-wider block mt-0.5 font-mono">
                Scale 0–9.0
              </span>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Analysis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 print:bg-emerald-50/60 border border-emerald-300 dark:border-emerald-800 print:border-emerald-300 space-y-1.5">
            <h4 className="font-bold text-xs text-emerald-950 dark:text-emerald-200 print:text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9E63] dark:text-emerald-400 print:text-[#1E9E63]" /> Key Demonstrated Strengths
            </h4>
            <ul className="space-y-1 text-emerald-950 dark:text-emerald-200 print:text-emerald-950 pl-4 list-disc leading-relaxed text-2xs">
              {report.strengths.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 print:bg-amber-50/60 border border-amber-300 dark:border-amber-800 print:border-amber-300 space-y-1.5">
            <h4 className="font-bold text-xs text-amber-950 dark:text-amber-200 print:text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-3.5 h-3.5 text-[#C98A0A] dark:text-amber-400 print:text-[#C98A0A]" /> Focus Areas & Priority Weaknesses
            </h4>
            <ul className="space-y-1 text-amber-950 dark:text-amber-200 print:text-amber-950 pl-4 list-disc leading-relaxed text-2xs">
              {report.weaknesses.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actionable Next Steps Checklist */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 print:bg-slate-50 border border-slate-300 dark:border-slate-700 print:border-slate-300 mb-6 space-y-1.5 text-xs">
          <h4 className="font-bold text-xs text-slate-900 dark:text-white print:text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
            <ArrowRight className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400 print:text-brand-800" /> Recommended Action Steps
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {report.nextSteps.map((step, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-slate-800 print:bg-white border border-slate-200 dark:border-slate-700 print:border-slate-200 space-y-0.5">
                <span className="font-bold text-[9px] text-brand-800 dark:text-brand-400 print:text-brand-800 uppercase font-mono">Step {idx + 1}</span>
                <p className="text-slate-800 dark:text-slate-200 print:text-slate-800 leading-relaxed text-2xs">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures & Certification Block */}
        <div className="border-t-2 border-slate-900 dark:border-slate-700 print:border-slate-900 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-brand-800 dark:border-brand-400 text-brand-800 dark:text-brand-300 print:border-brand-800 print:text-brand-800 flex items-center justify-center font-bold text-[9px] text-center leading-tight">
              VERIFIED<br />SIMULATOR
            </div>
            <div>
              <span className="font-mono text-2xs font-bold text-slate-800 dark:text-slate-200 print:text-slate-800 block">Assessment Validation</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 print:text-slate-500">Certified by Zarii Automated Evaluation Engine</span>
            </div>
          </div>

          <div className="text-right">
            <div className="font-serif italic text-sm text-slate-800 dark:text-slate-200 print:text-slate-800 border-b border-slate-400 dark:border-slate-600 print:border-slate-400 pb-0.5 px-6">
              Zarii Automated Examiner
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
              Authorized Evaluation Signature
            </span>
          </div>
        </div>

        {/* Official Footer Note */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 print:border-slate-300 mt-6 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 print:text-slate-600">
          Generated by Zarii. Scores are estimates, not official IELTS results.
        </div>
      </div>
    </div>
  );
};
