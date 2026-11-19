import React from 'react';
import {
  Award,
  Printer,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  RotateCcw,
  FileQuestion,
  HelpCircle,
} from 'lucide-react';
import { formatBand, cn } from '../../lib/utils';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import type { MockReportData, SkillScoreReport, AssessmentStatus } from './mockScoring';

export type { MockReportData };

interface MockReportFormProps {
  report: MockReportData;
  onRetake?: () => void;
  onNavigateSection?: (section: 'listening' | 'reading' | 'writing' | 'speaking') => void;
}

export const MockReportForm: React.FC<MockReportFormProps> = ({
  report,
  onRetake,
  onNavigateSection,
}) => {
  const handlePrint = () => {
    window.print();
  };

  // Convert overall band to CEFR estimate
  const getCefrLevel = (band: number | null): string => {
    if (band === null) return 'Not available';
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

  const reportId = `ZAR-${report.mockId.slice(-4).toUpperCase()}-${new Date(report.completedAt)
    .getTime()
    .toString()
    .slice(-6)}`;

  const isSkillAssessed = (status: AssessmentStatus) =>
    status === 'assessed_ai' || status === 'assessed_rules';

  const renderStatusBadge = (status: AssessmentStatus) => {
    switch (status) {
      case 'assessed_ai':
        return <span className="text-[10px] text-teal-700 dark:text-teal-300 font-semibold">AI Assessed</span>;
      case 'assessed_rules':
        return <span className="text-[10px] text-teal-700 dark:text-teal-300 font-semibold">Standard Scored</span>;
      case 'incomplete':
        return <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">Incomplete</span>;
      case 'unavailable':
        return <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Unavailable</span>;
      case 'not_attempted':
      default:
        return <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Not Attempted</span>;
    }
  };

  const renderSkillCard = (
    name: 'Listening' | 'Reading' | 'Writing' | 'Speaking',
    skillKey: 'listening' | 'reading' | 'writing' | 'speaking',
    data: SkillScoreReport,
    icon: React.ReactNode,
    subtitle: string
  ) => {
    const assessed = isSkillAssessed(data.status);

    return (
      <div
        className={cn(
          'p-3.5 rounded-2xl border flex flex-col justify-between transition-all text-center',
          assessed
            ? 'bg-white dark:bg-slate-800/90 border-slate-300 dark:border-slate-700 shadow-sm'
            : 'bg-slate-50/70 dark:bg-slate-800/40 border-dashed border-slate-300 dark:border-slate-700 text-slate-500'
        )}
      >
        <div>
          <div className="flex items-center justify-center gap-1.5 mb-1 text-slate-600 dark:text-slate-400">
            {icon}
            <span className="font-bold text-2xs uppercase tracking-wider">{name}</span>
          </div>

          {assessed && typeof data.band === 'number' ? (
            <div className="text-3xl font-black font-mono text-slate-950 dark:text-white print:text-slate-950 my-1">
              {formatBand(data.band)}
            </div>
          ) : (
            <div className="my-2 px-1">
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300">
                {data.status === 'not_attempted' ? 'Not Attempted' : data.status === 'incomplete' ? 'Incomplete' : 'Not Available'}
              </span>
              {data.reason && (
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {data.reason}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 flex flex-col items-center">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">
            {subtitle}
          </span>
          <div className="mt-0.5">{renderStatusBadge(data.status)}</div>
          {!assessed && onNavigateSection && (
            <button
              onClick={() => onNavigateSection(skillKey)}
              className="mt-2 text-[10px] font-bold text-teal-700 dark:text-teal-400 hover:underline print:hidden cursor-pointer"
            >
              Take this section →
            </button>
          )}
        </div>
      </div>
    );
  };

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
              Zarii Practice Report
            </h2>
            <p className="text-xs text-slate-500">
              Estimated practice diagnostic report. Print or save as PDF.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onRetake && (
            <button
              onClick={onRetake}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Exam</span>
            </button>
          )}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-800 hover:bg-brand-700 text-white transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Practice Report Layout */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-8 sm:p-12 rounded-3xl border-2 border-slate-300 dark:border-slate-800 shadow-md print:bg-white print:text-slate-900 print:border-none print:shadow-none print:p-0 print:rounded-none relative print:avoid-break">
        {/* Top Header Banner */}
        <div className="border-b-2 border-slate-900 dark:border-slate-700 print:border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <ZariiLogo variant="full" size="md" />
            </div>
            <div className="h-12 w-px bg-slate-300 dark:bg-slate-700 print:bg-slate-300 hidden sm:block" />
            <div>
              <div className="text-[11px] font-black tracking-widest uppercase text-brand-800 dark:text-brand-400 print:text-brand-800 mb-0.5 flex items-center gap-1.5">
                <span>ZARII PRACTICE REPORT</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white print:text-slate-950">
                IELTS {report.testType.toUpperCase()} MOCK EXAMINATION
              </h1>
              <p className="text-xs text-amber-800 dark:text-amber-300 print:text-amber-800 font-semibold mt-0.5">
                Estimated practice score. Not an official IELTS result.
              </p>
            </div>
          </div>

          <div className="text-right border-l-2 sm:border-l-0 pl-4 sm:pl-0 border-slate-200 dark:border-slate-800 print:border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block font-mono">
              Report ID
            </span>
            <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200 print:text-slate-800 tracking-wider">
              {reportId}
            </span>
            <span className="block text-2xs text-slate-500 dark:text-slate-400 print:text-slate-500 mt-0.5">
              Date: {formattedDate}
            </span>
          </div>
        </div>

        {/* Candidate Information Header Box (clean, accurate, no fake center) */}
        <div className="bg-slate-50 dark:bg-slate-800/60 print:bg-slate-50 border border-slate-300 dark:border-slate-700 print:border-slate-300 rounded-xl p-4 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 print:text-slate-500 block">Candidate Name</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white print:text-slate-900">{report.candidateName || 'IELTS Candidate'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 print:text-slate-500 block">Test Module</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white print:text-slate-900 capitalize">{report.testType} Practice</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 print:text-slate-500 block">CEFR Estimate</span>
            <span className="font-bold text-sm text-teal-800 dark:text-teal-300 print:text-teal-800">
              {getCefrLevel(report.overallBand)}
            </span>
          </div>
        </div>

        {/* Component Band Scores Matrix */}
        <div className="mb-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 print:text-slate-600 mb-2">
            Component Scores & Overall Result
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* Listening */}
            {renderSkillCard(
              'Listening',
              'listening',
              report.scores.listening,
              <Headphones className="w-3.5 h-3.5" />,
              report.scores.listening.status === 'not_attempted'
                ? 'Answered 0 of 40'
                : `Answered ${report.scores.listening.answeredCount ?? 0} of 40, correct ${report.scores.listening.raw ?? 0}`
            )}

            {/* Reading */}
            {renderSkillCard(
              'Reading',
              'reading',
              report.scores.reading,
              <BookOpen className="w-3.5 h-3.5" />,
              report.scores.reading.status === 'not_attempted'
                ? 'Answered 0 of 40'
                : `Answered ${report.scores.reading.answeredCount ?? 0} of 40, correct ${report.scores.reading.raw ?? 0}`
            )}

            {/* Writing */}
            {renderSkillCard(
              'Writing',
              'writing',
              report.scores.writing,
              <PenTool className="w-3.5 h-3.5" />,
              report.scores.writing.status === 'not_attempted'
                ? '0 words submitted'
                : `T1: ${report.scores.writing.wordCountTask1 ?? 0}w • T2: ${report.scores.writing.wordCountTask2 ?? 0}w`
            )}

            {/* Speaking */}
            {renderSkillCard(
              'Speaking',
              'speaking',
              report.scores.speaking,
              <Mic className="w-3.5 h-3.5" />,
              report.scores.speaking.status === 'not_attempted'
                ? 'No spoken audio'
                : `${report.scores.speaking.partsAttempted ?? 0} of 3 parts recorded`
            )}

            {/* Overall Band Card */}
            <div
              className={cn(
                'p-3.5 rounded-2xl border-2 col-span-2 sm:col-span-1 flex flex-col justify-between text-center transition-all',
                report.allSkillsAssessed && typeof report.overallBand === 'number'
                  ? 'border-brand-800 dark:border-brand-500/80 bg-brand-50/70 dark:bg-brand-950/60 print:bg-brand-50/60 print:border-brand-800'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 text-slate-500'
              )}
            >
              <div>
                <span className="font-black text-2xs uppercase tracking-wider block mb-0.5 text-slate-700 dark:text-slate-300">
                  Overall Band
                </span>

                {report.allSkillsAssessed && typeof report.overallBand === 'number' ? (
                  <div className="text-4xl font-black font-mono text-brand-800 dark:text-brand-200 print:text-brand-800 my-1">
                    {formatBand(report.overallBand)}
                  </div>
                ) : (
                  <div className="my-2 px-1">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                      Not available
                    </span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      Complete all four sections to get your overall band.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                {report.allSkillsAssessed ? (
                  <span className="text-[10px] font-bold text-brand-700 dark:text-brand-400 uppercase tracking-wider block font-mono">
                    Official Scale 0–9.0
                  </span>
                ) : (
                  <div>
                    {report.partialAverageBand !== null && (
                      <span className="text-[10px] text-slate-600 dark:text-slate-300 block font-mono">
                        Average of completed skills: {formatBand(report.partialAverageBand)} (partial)
                      </span>
                    )}
                    {report.unassessedSkills.length > 0 && (
                      <span className="text-[9px] text-amber-700 dark:text-amber-400 block mt-0.5">
                        Missing: {report.unassessedSkills.join(', ')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Analysis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 print:bg-emerald-50/60 border border-emerald-300 dark:border-emerald-800 print:border-emerald-300 space-y-1.5">
            <h4 className="font-bold text-xs text-emerald-950 dark:text-emerald-200 print:text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9E63] dark:text-emerald-400 print:text-[#1E9E63]" /> Key Demonstrated Strengths
            </h4>
            {report.strengths.length > 0 ? (
              <ul className="space-y-1 text-emerald-950 dark:text-emerald-200 print:text-emerald-950 pl-4 list-disc leading-relaxed text-2xs">
                {report.strengths.map((str, idx) => (
                  <li key={idx}>{str}</li>
                ))}
              </ul>
            ) : (
              <p className="text-2xs text-emerald-800 dark:text-emerald-300 italic">
                No strengths identified yet. Complete all sections to see your strengths.
              </p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 print:bg-amber-50/60 border border-amber-300 dark:border-amber-800 print:border-amber-300 space-y-1.5">
            <h4 className="font-bold text-xs text-amber-950 dark:text-amber-200 print:text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-3.5 h-3.5 text-[#C98A0A] dark:text-amber-400 print:text-[#C98A0A]" /> Focus Areas & Priorities
            </h4>
            {report.weaknesses.length > 0 ? (
              <ul className="space-y-1 text-amber-950 dark:text-amber-200 print:text-amber-950 pl-4 list-disc leading-relaxed text-2xs">
                {report.weaknesses.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            ) : (
              <p className="text-2xs text-amber-800 dark:text-amber-300 italic">
                No critical weaknesses identified for attempted sections.
              </p>
            )}
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

        {/* Practice Assessment Footer Disclaimer */}
        <div className="border-t-2 border-slate-900 dark:border-slate-700 print:border-slate-900 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-brand-800 dark:border-brand-400 text-brand-800 dark:text-brand-300 print:border-brand-800 print:text-brand-800 flex items-center justify-center font-bold text-[8px] text-center leading-tight">
              ZARII<br />DIAG
            </div>
            <div>
              <span className="font-mono text-2xs font-bold text-slate-800 dark:text-slate-200 print:text-slate-800 block">
                Zarii Diagnostic Practice Evaluation
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 print:text-slate-500">
                Simulated examination scoring designed for skill assessment
              </span>
            </div>
          </div>

          <div className="text-right text-2xs text-slate-500 dark:text-slate-400">
            <span>Score estimates are not affiliated with or endorsed by Cambridge, British Council, or IDP.</span>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 print:border-slate-300 mt-6 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 print:text-slate-600">
          Generated by Zarii. Scores are estimates, not official IELTS results.
        </div>
      </div>
    </div>
  );
};
