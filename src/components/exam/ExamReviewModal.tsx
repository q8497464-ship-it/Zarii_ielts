import React, { useState } from 'react';
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Flag,
  HelpCircle,
  ArrowRight,
  Send,
  X,
  Search,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import type { ExamQuestionItem } from './ExamBottomNav';

export interface ExamReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: ExamQuestionItem[];
  userAnswers: Record<string, string>;
  flaggedQuestions: Set<string>;
  onSelectQuestion: (questionNumber: number) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  moduleName?: string;
  timeRemainingSeconds?: number;
}

export const ExamReviewModal: React.FC<ExamReviewModalProps> = ({
  isOpen,
  onClose,
  questions,
  userAnswers,
  flaggedQuestions,
  onSelectQuestion,
  onSubmit,
  isSubmitting = false,
  moduleName = 'Exam',
  timeRemainingSeconds,
}) => {
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'flagged'>('all');

  const totalQuestions = questions.length;
  const answeredQuestions = questions.filter(
    (q) => userAnswers[q.id] && userAnswers[q.id].trim().length > 0
  );
  const unansweredQuestions = questions.filter(
    (q) => !userAnswers[q.id] || userAnswers[q.id].trim().length === 0
  );
  const flaggedList = questions.filter((q) => flaggedQuestions.has(q.id));

  const answeredCount = answeredQuestions.length;
  const unansweredCount = unansweredQuestions.length;
  const flaggedCount = flaggedList.length;

  const filteredQuestions = questions.filter((q) => {
    if (filter === 'unanswered') {
      return !userAnswers[q.id] || userAnswers[q.id].trim().length === 0;
    }
    if (filter === 'flagged') {
      return flaggedQuestions.has(q.id);
    }
    return true;
  });

  const handleJumpToQuestion = (qNumber: number) => {
    onSelectQuestion(qNumber);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${moduleName} Review & Submission Matrix`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'p-3.5 rounded-xl border text-left transition-all cursor-pointer',
              filter === 'all'
                ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 dark:bg-teal-950/40'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Questions
              </span>
              <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {answeredCount}
              <span className="text-xs text-slate-400 font-normal"> / {totalQuestions} answered</span>
            </div>
          </button>

          <button
            onClick={() => setFilter('unanswered')}
            className={cn(
              'p-3.5 rounded-xl border text-left transition-all cursor-pointer',
              filter === 'unanswered'
                ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 dark:bg-amber-950/40'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Unanswered
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-1">
              {unansweredCount}
              <span className="text-xs text-amber-600/70 font-normal"> questions blank</span>
            </div>
          </button>

          <button
            onClick={() => setFilter('flagged')}
            className={cn(
              'p-3.5 rounded-xl border text-left transition-all cursor-pointer',
              filter === 'flagged'
                ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 dark:bg-rose-950/40'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                Flagged for Review
              </span>
              <Flag className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-rose-700 dark:text-rose-400 mt-1">
              {flaggedCount}
              <span className="text-xs text-rose-600/70 font-normal"> flagged</span>
            </div>
          </button>
        </div>

        {/* Warning if unanswered */}
        {unansweredCount > 0 && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong>Attention:</strong> You have {unansweredCount} unanswered questions. Remember that IELTS tests do not penalize wrong answers—there is no negative marking. We strongly recommend making an educated guess before submitting.
            </div>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-2">
              Filter by:
            </span>
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'px-2.5 py-1 text-2xs font-bold rounded-lg transition-colors',
                filter === 'all'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              )}
            >
              All ({totalQuestions})
            </button>
            <button
              onClick={() => setFilter('unanswered')}
              className={cn(
                'px-2.5 py-1 text-2xs font-bold rounded-lg transition-colors',
                filter === 'unanswered'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              )}
            >
              Unanswered ({unansweredCount})
            </button>
            <button
              onClick={() => setFilter('flagged')}
              className={cn(
                'px-2.5 py-1 text-2xs font-bold rounded-lg transition-colors',
                filter === 'flagged'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              )}
            >
              Flagged ({flaggedCount})
            </button>
          </div>
          <span className="text-2xs text-slate-400">Click any question to jump to it</span>
        </div>

        {/* Question Grid */}
        <div className="max-h-72 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {filteredQuestions.map((q) => {
              const answer = userAnswers[q.id];
              const isAnswered = !!(answer && answer.trim().length > 0);
              const isFlagged = flaggedQuestions.has(q.id);

              return (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(q.questionNumber)}
                  className={cn(
                    'p-2.5 rounded-lg border text-left transition-all relative flex flex-col justify-between group hover:border-teal-500 hover:shadow-xs cursor-pointer',
                    isAnswered
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-800/60'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      Q{q.questionNumber}
                    </span>
                    <div className="flex items-center gap-1">
                      {isFlagged && (
                        <Flag className="w-3 h-3 fill-rose-500 text-rose-500" />
                      )}
                      {isAnswered ? (
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </div>
                  </div>

                  <div className="mt-1 text-2xs truncate font-mono text-slate-500 dark:text-slate-400">
                    {isAnswered ? (
                      <span className="text-slate-800 dark:text-slate-200 font-medium">
                        "{answer}"
                      </span>
                    ) : (
                      <span className="italic text-amber-600 dark:text-amber-400 font-sans">
                        No answer entered
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-xs"
          >
            Return to Test
          </Button>

          <Button
            variant="primary"
            onClick={onSubmit}
            isLoading={isSubmitting}
            rightIcon={<Send className="w-3.5 h-3.5" />}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm"
          >
            Confirm & Submit Exam
          </Button>
        </div>
      </div>
    </Modal>
  );
};
