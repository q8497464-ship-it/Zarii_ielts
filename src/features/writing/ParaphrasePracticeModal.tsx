import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  Award,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
} from 'lucide-react';
import { PARAPHRASE_PROMPTS } from './paraphraseData';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface ParaphrasePracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTaskType?: 'task1' | 'task2';
}

export function ParaphrasePracticeModal({
  isOpen,
  onClose,
  defaultTaskType,
}: ParaphrasePracticeModalProps) {
  const [filterType, setFilterType] = useState<'all' | 'task1' | 'task2'>(defaultTaskType || 'all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAttempt, setUserAttempt] = useState('');
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [copiedBand, setCopiedBand] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = PARAPHRASE_PROMPTS.filter((p) =>
    filterType === 'all' ? true : p.taskType === filterType
  );
  const activePrompt = filtered[currentIndex] || filtered[0];

  const handleNext = () => {
    if (currentIndex < filtered.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAttempt('');
      setHasEvaluated(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAttempt('');
      setHasEvaluated(false);
    }
  };

  const handleCheck = () => {
    if (!userAttempt.trim()) return;
    setHasEvaluated(true);
  };

  const handleCopy = (text: string, bandLabel: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBand(bandLabel);
    setTimeout(() => setCopiedBand(null), 2000);
  };

  // Evaluate user paraphrase quality
  const evaluateParaphrase = () => {
    const origWords = new Set(
      activePrompt.originalSentence.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/)
    );
    const userWords = userAttempt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

    let reusedCount = 0;
    for (const w of userWords) {
      if (origWords.has(w) && w.length > 3) {
        reusedCount++;
      }
    }

    const totalWords = userWords.length;
    const similarityPercent = totalWords > 0 ? Math.round((reusedCount / totalWords) * 100) : 0;
    const isTransformed = similarityPercent < 60 && totalWords >= 10;

    return {
      similarityPercent,
      isTransformed,
      feedbackMsg: isTransformed
        ? 'Well done! You demonstrated vocabulary flexibility and altered the syntactic structure.'
        : similarityPercent >= 60
        ? 'You reused many original words verbatim. Try swapping more nouns for nominalizations or changing active/passive voice.'
        : 'Your sentence appears quite brief. Aim for a complete, academic IELTS introductory sentence.',
    };
  };

  const evalResult = hasEvaluated ? evaluateParaphrase() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                IELTS Paraphrase Practice
              </h2>
              <p className="text-xs text-slate-500">
                Master introductory paraphrasing for Bands 7, 8, and 9
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Navigation Bar */}
        <div className="px-6 py-2.5 bg-slate-100/60 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setFilterType('all');
                setCurrentIndex(0);
                setHasEvaluated(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Prompts
            </button>
            <button
              onClick={() => {
                setFilterType('task1');
                setCurrentIndex(0);
                setHasEvaluated(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterType === 'task1'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Task 1
            </button>
            <button
              onClick={() => {
                setFilterType('task2');
                setCurrentIndex(0);
                setHasEvaluated(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterType === 'task2'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Task 2
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <span>
              {currentIndex + 1} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentIndex === 0}
                onClick={handlePrev}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentIndex === filtered.length - 1}
                onClick={handleNext}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Target Prompt Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="teal" size="sm">
                {activePrompt.context}
              </Badge>
              <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                Original Prompt Sentence
              </span>
            </div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed italic">
              "{activePrompt.originalSentence}"
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 items-center">
              <span className="text-2xs font-semibold text-slate-500">Key targets to transform:</span>
              {activePrompt.keyTermsToParaphrase.map((term, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-2xs font-medium bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* User Input Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Your Paraphrased Sentence:</span>
              <span className="text-2xs text-slate-400 font-normal">
                {userAttempt.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </label>
            <textarea
              value={userAttempt}
              onChange={(e) => setUserAttempt(e.target.value)}
              placeholder="Rewrite the prompt sentence above in formal academic style..."
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all placeholder:text-slate-400"
            />
            <div className="flex items-center justify-between pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setUserAttempt('');
                  setHasEvaluated(false);
                }}
                disabled={!userAttempt}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCheck}
                disabled={!userAttempt.trim()}
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Check & Compare
              </Button>
            </div>
          </div>

          {/* Feedback & Model Answers (Revealed on Check or skip) */}
          {hasEvaluated && evalResult && (
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
              {/* Quality Diagnostic */}
              <div
                className={`p-3 rounded-xl border flex items-start gap-3 ${
                  evalResult.isTransformed
                    ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
                }`}
              >
                {evalResult.isTransformed ? (
                  <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                ) : (
                  <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="text-xs space-y-1">
                  <span className="font-bold block">
                    {evalResult.isTransformed ? 'Strong Paraphrasing' : 'Room for Transformation'}
                  </span>
                  <p>{evalResult.feedbackMsg}</p>
                </div>
              </div>

              {/* Examiner Tip */}
              <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-brand-900 dark:text-brand-200 text-xs flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-brand-700 dark:text-brand-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">Examiner Strategy:</span>
                  <p className="text-slate-600 dark:text-slate-300">{activePrompt.examinerTip}</p>
                </div>
              </div>

              {/* Model Band 7, 8, 9 Variations */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Examiner Model Paraphrases:
                </span>

                {/* Band 7 */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="teal" size="sm">
                      Band 7.0 Standard
                    </Badge>
                    <button
                      onClick={() => handleCopy(activePrompt.modelAnswers.band7, 'Band 7')}
                      className="text-2xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                    >
                      {copiedBand === 'Band 7' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      {copiedBand === 'Band 7' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-200 font-serif leading-relaxed">
                    "{activePrompt.modelAnswers.band7}"
                  </p>
                </div>

                {/* Band 8 */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" size="sm">
                      Band 8.0 Advanced
                    </Badge>
                    <button
                      onClick={() => handleCopy(activePrompt.modelAnswers.band8, 'Band 8')}
                      className="text-2xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                    >
                      {copiedBand === 'Band 8' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      {copiedBand === 'Band 8' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-200 font-serif leading-relaxed">
                    "{activePrompt.modelAnswers.band8}"
                  </p>
                </div>

                {/* Band 9 */}
                <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="success" size="sm">
                      Band 9.0 Native Academic
                    </Badge>
                    <button
                      onClick={() => handleCopy(activePrompt.modelAnswers.band9, 'Band 9')}
                      className="text-2xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                    >
                      {copiedBand === 'Band 9' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      {copiedBand === 'Band 9' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-100 font-serif leading-relaxed font-medium">
                    "{activePrompt.modelAnswers.band9}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHasEvaluated(!hasEvaluated)}
          >
            {hasEvaluated ? 'Hide Model Answers' : 'Reveal Model Answers'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === filtered.length - 1}
          >
            Next Exercise <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
