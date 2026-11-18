import { useState } from 'react';
import {
  X,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import type { QuestionStrategyLesson } from '../../types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';
import { isAnswerCorrect } from '../reading/marking';
import { shuffleMcqOptions } from '../../lib/mcqShuffle';

interface QuestionMiniLessonModalProps {
  lesson: QuestionStrategyLesson;
  isOpen: boolean;
  onClose: () => void;
  accuracyPercent?: number;
}

export function QuestionMiniLessonModal({
  lesson,
  isOpen,
  onClose,
  accuracyPercent,
}: QuestionMiniLessonModalProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [hasSubmittedPractice, setHasSubmittedPractice] = useState(false);
  const [activeTab, setActiveTab] = useState<'strategy' | 'practice'>('strategy');

  if (!isOpen) return null;

  const handleSelectAnswer = (qId: string, answer: string) => {
    if (hasSubmittedPractice) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleResetPractice = () => {
    setSelectedAnswers({});
    setHasSubmittedPractice(false);
  };

  const score = lesson.practiceQuestions.reduce((acc, q) => {
    const userAns = (selectedAnswers[q.id] || '').trim().toLowerCase();
    const correctAns = Array.isArray(q.correctAnswer)
      ? q.correctAnswer.map((a) => a.trim().toLowerCase())
      : [q.correctAnswer.trim().toLowerCase()];
    return acc + (correctAns.includes(userAns) ? 1 : 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  {lesson.estimatedMinutes} min Strategy Guide
                </span>
                {accuracyPercent !== undefined && accuracyPercent < 50 && (
                  <Badge variant="error" size="sm">
                    {accuracyPercent}% Accuracy
                  </Badge>
                )}
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {lesson.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('strategy')}
            className={cn(
              'py-3 px-4 text-xs font-bold tracking-wide border-b-2 transition-all flex items-center gap-2',
              activeTab === 'strategy'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400 dark:border-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            )}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Strategy & Traps
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={cn(
              'py-3 px-4 text-xs font-bold tracking-wide border-b-2 transition-all flex items-center gap-2',
              activeTab === 'practice'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400 dark:border-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            3-Question Practice
            {hasSubmittedPractice && (
              <Badge variant={score === 3 ? 'success' : 'warning'} size="sm">
                {score}/3
              </Badge>
            )}
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'strategy' ? (
            <div className="space-y-6">
              {/* Overview */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {lesson.overview}
              </div>

              {/* Key Rules */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Golden IELTS Rules
                </h3>
                <ul className="space-y-2">
                  {lesson.keyRules.map((rule, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/70 dark:border-slate-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-2xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Traps */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Common Examiner Traps to Avoid
                </h3>
                <div className="space-y-3">
                  {lesson.commonTraps.map((trap, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-rose-200/70 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5 text-xs"
                    >
                      <div className="font-bold text-rose-900 dark:text-rose-200">
                        ⚠️ Trap {idx + 1}: {trap.trap}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{trap.howToAvoid}</p>
                      {trap.exampleSnippet && (
                        <div className="mt-1.5 p-2 rounded bg-white/80 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-950 text-2xs font-mono text-slate-600 dark:text-slate-400">
                          {trap.exampleSnippet}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by step */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4 text-teal-600" />
                  Step-by-Step Test Execution
                </h3>
                <div className="space-y-2">
                  {lesson.stepByStepStrategy.map((step, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-slate-700 dark:text-slate-300 pl-3 border-l-2 border-teal-500 dark:border-teal-400 py-1"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Practice Passage Excerpt */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                  Practice Passage Excerpt
                </span>
                <p className="text-xs leading-relaxed font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line">
                  {lesson.practicePassage}
                </p>
              </div>

              {/* Practice Questions */}
              <div className="space-y-6">
                {lesson.practiceQuestions.map((q) => {
                  const userAns = selectedAnswers[q.id] || '';
                  const isCorrect = isAnswerCorrect(userAns, q.correctAnswer, lesson.questionType as any, q.options);

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-2xs shrink-0 mt-0.5">
                          {q.questionNumber}
                        </span>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                          {q.prompt}
                        </div>
                      </div>

                      {/* Options / Input */}
                      {q.options && q.options.length > 0 ? (
                        <div className="space-y-1.5 pl-7">
                          {(() => {
                            const isMcq = (lesson.questionType as string) === 'multiple_choice_single' || q.options.length >= 2;
                            const shuffled = isMcq
                              ? shuffleMcqOptions(q.options, `lesson_${lesson.questionType}_${q.id}`)
                              : q.options.map((opt, idx) => ({ id: `opt-${idx}`, text: opt, raw: opt, originalIndex: idx, isPinned: false }));

                            return shuffled.map((optItem, idx) => {
                              const opt = optItem.text;
                              const displayLetter = String.fromCharCode(65 + idx);
                              const isSelected = userAns === opt || userAns.toUpperCase() === displayLetter;
                              const isThisOptCorrect = isAnswerCorrect(opt, q.correctAnswer, lesson.questionType as any, q.options);

                              return (
                                <button
                                  key={optItem.id || idx}
                                  onClick={() => handleSelectAnswer(q.id, opt)}
                                  disabled={hasSubmittedPractice}
                                  className={cn(
                                    'w-full text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-between',
                                    isSelected
                                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-800 dark:text-teal-200 font-bold'
                                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300',
                                    hasSubmittedPractice &&
                                      isThisOptCorrect &&
                                      'border-teal-500 bg-teal-50 dark:bg-teal-950/80 font-bold',
                                    hasSubmittedPractice &&
                                      isSelected &&
                                      !isCorrect &&
                                      'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-700'
                                  )}
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="font-mono font-bold text-slate-400">
                                      {displayLetter}.
                                    </span>
                                    <span>{opt}</span>
                                  </span>
                                  {hasSubmittedPractice && (
                                    isThisOptCorrect ? (
                                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                                    ) : isSelected && !isCorrect ? (
                                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                    ) : null
                                  )}
                                </button>
                              );
                            });
                          })()}
                        </div>
                      ) : (
                        <div className="pl-7">
                          <input
                            type="text"
                            value={userAns}
                            onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                            disabled={hasSubmittedPractice}
                            placeholder="Type your exact answer..."
                            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      )}

                      {/* Explanation Feedback */}
                      {hasSubmittedPractice && (
                        <div
                          className={cn(
                            'p-3 rounded-lg text-xs leading-relaxed ml-7 border',
                            isCorrect
                              ? 'bg-teal-50/60 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900 text-teal-900 dark:text-teal-200'
                              : 'bg-rose-50/60 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
                          )}
                        >
                          <div className="font-bold flex items-center gap-1.5 mb-1">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                                Correct!
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                Incorrect (Correct: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' / ') : q.correctAnswer})
                              </>
                            )}
                          </div>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          {activeTab === 'strategy' ? (
            <>
              <span className="text-2xs text-slate-400">Ready to test what you learned?</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('practice')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Go to 3-Question Practice
              </Button>
            </>
          ) : (
            <>
              {hasSubmittedPractice ? (
                <div className="flex items-center justify-between w-full">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Practice Score: {score} / 3 ({Math.round((score / 3) * 100)}%)
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetPractice}
                      leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                    >
                      Try Again
                    </Button>
                    <Button variant="primary" size="sm" onClick={onClose}>
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('strategy')}>
                    Back to Strategy
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={Object.keys(selectedAnswers).length < lesson.practiceQuestions.length}
                    onClick={() => setHasSubmittedPractice(true)}
                  >
                    Check Practice Answers
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Low Accuracy Automatic Lesson Prompt
 * Displays automatically when a user's accuracy on that question type is below 50%.
 */
export function LowAccuracyLessonPrompt({
  questionType,
  accuracyPercent,
  onOpenLesson,
  className,
}: {
  questionType: string;
  accuracyPercent: number;
  onOpenLesson: () => void;
  className?: string;
}) {
  if (accuracyPercent >= 50) return null;

  return (
    <div
      className={cn(
        'p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 flex items-center justify-between gap-4 animate-fadeIn shadow-sm',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 font-bold">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Low Accuracy Detected ({accuracyPercent}%)
            </span>
            <Badge variant="warning" size="sm">
              Below 50%
            </Badge>
          </div>
          <p className="text-2xs text-slate-600 dark:text-slate-400 mt-0.5">
            Take a 3-minute mini-lesson on this question type to learn common traps and boost your band score.
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={onOpenLesson}
        className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white"
        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
      >
        View Strategy
      </Button>
    </div>
  );
}
