import React, { useState } from 'react';
import { X, Flag, Languages, Check, MessageSquare } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

export interface SectionSummary {
  id: string;
  type: string;
  title: string;
}

interface LessonTopBarProps {
  lessonTitle: string;
  unitTitle?: string;
  sections: SectionSummary[];
  activeSectionIdx: number;
  completedSectionIndices: Set<number>;
  onSelectSection: (idx: number) => void;
  onClose: () => void;
  showUrdu: boolean;
  onToggleUrdu: () => void;
  lessonId: string;
}

export const LessonTopBar: React.FC<LessonTopBarProps> = ({
  lessonTitle,
  unitTitle,
  sections,
  activeSectionIdx,
  completedSectionIndices,
  onSelectSection,
  onClose,
  showUrdu,
  onToggleUrdu,
  lessonId,
}) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setIsReportOpen(false);
      setReportText('');
    }, 1500);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-2.5 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
            aria-label="Close lesson"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Unit info */}
          <div className="flex-1 min-w-0 text-center">
            {unitTitle && (
              <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider truncate">
                {unitTitle}
              </div>
            )}
            <h1 className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 truncate">
              {lessonTitle}
            </h1>
          </div>

          {/* Right Action buttons: Urdu toggle & Report */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onToggleUrdu}
              title={showUrdu ? 'Hide Urdu hints' : 'Show Urdu hints'}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                showUrdu
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D] border border-emerald-300 dark:border-emerald-800'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="font-urdu hidden sm:inline">اردو</span>
            </button>

            <button
              type="button"
              onClick={() => setIsReportOpen(true)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Report a problem"
              title="Report a problem"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Segmented Progress Bar */}
        <div className="max-w-4xl mx-auto pt-2.5 pb-0.5">
          <div className="flex items-center gap-1.5 w-full" role="tablist" aria-label="Lesson sections">
            {sections.map((sec, idx) => {
              const isCurrent = idx === activeSectionIdx;
              const isCompleted = completedSectionIndices.has(idx);

              let barClass = 'bg-gray-200 dark:bg-gray-700';
              if (isCompleted) {
                barClass = 'bg-[#124F40] dark:bg-[#5BB78D]';
              } else if (isCurrent) {
                barClass = 'bg-[#5BB78D] dark:bg-[#5BB78D] ring-2 ring-[#5BB78D]/30';
              }

              return (
                <button
                  key={sec.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Section ${idx + 1}: ${sec.title}`}
                  onClick={() => onSelectSection(idx)}
                  className="flex-1 h-2 rounded-full transition-all relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#124F40]"
                >
                  <div className={`w-full h-full ${barClass}`} />
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Report a Problem Modal */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Flag className="w-5 h-5 text-amber-600" />
                Report an Issue
              </h3>
              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 text-center font-medium text-sm flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                Thank you! Your feedback has been recorded.
              </div>
            ) : (
              <form onSubmit={handleSendReport} className="space-y-4">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Lesson: <span className="font-semibold text-gray-700 dark:text-gray-300">{lessonTitle} ({lessonId})</span>
                </div>

                <textarea
                  rows={4}
                  required
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Describe the typo, audio issue, or grammar question..."
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-[#124F40] focus:ring-2 focus:ring-[#124F40]/20 resize-none"
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsReportOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!reportText.trim()}
                    className="bg-[#124F40] hover:bg-[#0e3f33] text-white"
                  >
                    Submit Report
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
