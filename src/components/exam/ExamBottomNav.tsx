import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ExamQuestionItem {
  id: string;
  questionNumber: number;
  sectionOrPassage: number;
}

export interface ExamBottomNavProps {
  questions: ExamQuestionItem[];
  userAnswers: Record<string, string>;
  flaggedQuestions: Set<string>;
  activeQuestionNumber: number;
  onSelectQuestion: (questionNumber: number) => void;
  onToggleFlag: (questionId: string) => void;
  onOpenReview: () => void;
  currentSectionOrPassage?: number;
  sectionOrPassageCount?: number;
  onSelectSectionOrPassage?: (idx: number) => void;
  labelPrefix?: 'Passage' | 'Section' | 'Part';
}

export const ExamBottomNav: React.FC<ExamBottomNavProps> = ({
  questions,
  userAnswers,
  flaggedQuestions,
  activeQuestionNumber,
  onSelectQuestion,
  onToggleFlag,
  onOpenReview,
  currentSectionOrPassage = 1,
  sectionOrPassageCount = 3,
  onSelectSectionOrPassage,
  labelPrefix = 'Passage',
}) => {
  const currentQ = questions.find((q) => q.questionNumber === activeQuestionNumber);
  const isCurrentFlagged = currentQ ? flaggedQuestions.has(currentQ.id) : false;

  const totalAnswered = questions.filter(
    (q) => userAnswers[q.id] && userAnswers[q.id].trim().length > 0
  ).length;

  // Filter or highlight questions for the current passage/section
  const displayedQuestions = questions.filter(
    (q) => !currentSectionOrPassage || q.sectionOrPassage === currentSectionOrPassage
  );

  const currentIndexInAll = questions.findIndex((q) => q.questionNumber === activeQuestionNumber);
  const hasPrev = currentIndexInAll > 0;
  const hasNext = currentIndexInAll >= 0 && currentIndexInAll < questions.length - 1;

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll the active question button into the center of the scroll view
  React.useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeBtn = scrollContainerRef.current.querySelector<HTMLElement>('[aria-current="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeQuestionNumber]);

  const handlePrev = () => {
    if (hasPrev) {
      onSelectQuestion(questions[currentIndexInAll - 1].questionNumber);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onSelectQuestion(questions[currentIndexInAll + 1].questionNumber);
    }
  };

  // Keyboard support: Arrow keys navigate between questions
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const tag = (activeEl?.tagName || '').toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || (activeEl as HTMLElement)?.isContentEditable;
      if (isInput) return;

      if (e.key === 'ArrowLeft' && hasPrev) {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasPrev, hasNext, currentIndexInAll, questions, onSelectQuestion]);

  return (
    <footer
      className="h-16 bg-white dark:bg-[#112019] border-t border-[#E1EBE5] dark:border-[#24392F] px-2 sm:px-4 flex items-center justify-between shrink-0 select-none z-20 shadow-xs safe-bottom"
      role="navigation"
      aria-label="Exam question navigator"
    >
      {/* Left: Section/Passage switcher & Flag button */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Flag for Review toggle button */}
        {currentQ && (
          <button
            onClick={() => onToggleFlag(currentQ.id)}
            className={cn(
              'inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 min-h-[44px] sm:min-h-0 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
              isCurrentFlagged
                ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            )}
            title="Flag question to review later before submission"
          >
            <Flag
              className={cn(
                'w-4 h-4 sm:w-3.5 sm:h-3.5',
                isCurrentFlagged ? 'fill-amber-500 text-amber-500' : 'text-slate-400'
              )}
            />
            <span className="hidden sm:inline">
              {isCurrentFlagged ? 'Flagged' : 'Review'}
            </span>
          </button>
        )}

        {/* Section/Passage quick jump tabs */}
        {onSelectSectionOrPassage && sectionOrPassageCount > 1 && (
          <div className="hidden md:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {Array.from({ length: sectionOrPassageCount }, (_, i) => i + 1).map((idx) => (
              <button
                key={idx}
                onClick={() => onSelectSectionOrPassage(idx - 1)}
                className={cn(
                  'px-2.5 py-1 text-2xs font-bold rounded-md transition-all',
                  currentSectionOrPassage === idx
                    ? 'bg-[#124F40] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                {labelPrefix} {idx}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Center: Question numbers grid/scroll area (Official CD IELTS style) */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto py-1 px-1 sm:px-2 mx-1 sm:mx-2 scrollbar-none flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 touch-pan-x"
        role="group"
        aria-label="Question selection buttons. Use Left and Right arrow keys to navigate."
      >
        {displayedQuestions.map((q) => {
          const isAnswered = !!(userAnswers[q.id] && userAnswers[q.id].trim().length > 0);
          const isFlagged = flaggedQuestions.has(q.id);
          const isActive = q.questionNumber === activeQuestionNumber;

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(q.questionNumber)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Question ${q.questionNumber}${isAnswered ? ', answered' : ', unanswered'}${isFlagged ? ', flagged' : ''}`}
              className={cn(
                'relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-brand-500',
                isActive
                  ? 'ring-2 ring-[#124F40] dark:ring-brand-400 ring-offset-1 dark:ring-offset-slate-900 font-bold bg-brand-50 text-brand-900 dark:bg-brand-950/70 dark:text-brand-200 scale-105'
                  : isAnswered
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 hover:border-solid hover:bg-slate-200'
              )}
              title={`Question ${q.questionNumber}${isAnswered ? ' (Answered)' : ' (Not answered)'}${isFlagged ? ' • Flagged' : ''}`}
            >
              <span>{q.questionNumber}</span>

              {/* Amber flag corner indicator */}
              {isFlagged && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 border border-white dark:border-slate-900" aria-hidden="true" />
              )}

              {/* Mint answered line indicator */}
              {isAnswered && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-0.5 rounded-full bg-[#5BB78D]" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Prev, Next, and Review Screen Modal Button */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          className="w-11 h-11 sm:w-auto sm:h-auto sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold inline-flex items-center justify-center gap-1 active:scale-95 transition-all"
          title="Previous Question"
          aria-label="Previous Question"
        >
          <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
          <span className="hidden md:inline">Back</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!hasNext}
          className="w-11 h-11 sm:w-auto sm:h-auto sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold inline-flex items-center justify-center gap-1 active:scale-95 transition-all"
          title="Next Question"
          aria-label="Next Question"
        >
          <span className="hidden md:inline">Next</span>
          <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-0.5 hidden sm:block" />

        <button
          onClick={onOpenReview}
          className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 min-h-[44px] sm:min-h-0 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-800 dark:text-brand-300 text-xs font-semibold hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors"
          title="Review all answered, unanswered and flagged questions"
        >
          <FileCheck2 className="w-4 h-4 text-brand-700 dark:text-brand-400" />
          <span className="hidden sm:inline">Review</span>
          <span className="font-mono text-2xs text-brand-900 dark:text-brand-200">
            ({totalAnswered}/{questions.length})
          </span>
        </button>
      </div>
    </footer>
  );
};
