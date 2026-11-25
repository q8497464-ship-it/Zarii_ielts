import React from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen, AlertTriangle, Sparkles, Zap } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

export interface MissedPointItem {
  skillTag: string;
  prompt: string;
  correctAnswer: string;
}

interface LessonCompletionScreenProps {
  lessonTitle: string;
  scorePercent: number;
  isPassed: boolean;
  xpEarned: number;
  isRapidGuessing: boolean;
  skillAccuracy: Record<string, { total: number; correct: number }>;
  missedPoints: MissedPointItem[];
  onReviewExplanation: () => void;
  onRetryLesson: () => void;
  onContinue: () => void;
}

export const LessonCompletionScreen: React.FC<LessonCompletionScreenProps> = ({
  lessonTitle,
  scorePercent,
  isPassed,
  xpEarned,
  isRapidGuessing,
  skillAccuracy,
  missedPoints,
  onReviewExplanation,
  onRetryLesson,
  onContinue,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* Header Banner */}
      <div
        className={`p-6 md:p-8 rounded-3xl border text-center space-y-4 shadow-sm transition-all ${
          isPassed
            ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40'
            : 'border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/40'
        }`}
      >
        <div className="inline-flex p-3 rounded-full bg-white dark:bg-gray-800 shadow-md">
          {isPassed ? (
            <Award className="w-12 h-12 text-[#124F40] dark:text-[#5BB78D]" />
          ) : (
            <RotateCcw className="w-12 h-12 text-amber-600 dark:text-amber-400" />
          )}
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {isPassed ? 'Lesson Completed!' : 'Keep Practicing!'}
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-md mx-auto">
            {isPassed
              ? `Great job! You achieved ${scorePercent}% accuracy on "${lessonTitle}".`
              : `You scored ${scorePercent}%. A score of 70% is required to pass. Review the explanation and try again!`}
          </p>
        </div>

        {/* Score & XP Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-700 dark:text-gray-300 block">Score</span>
            <span className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
              {scorePercent}%
            </span>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-700 dark:text-gray-300 block">XP Earned</span>
            <span className="text-xl font-extrabold text-[#124F40] dark:text-[#5BB78D] flex items-center gap-1">
              <Zap className="w-4 h-4 fill-current" />
              +{xpEarned} XP
            </span>
          </div>
        </div>

        {/* Rapid Guessing Anti-Gaming Notice */}
        {isRapidGuessing && (
          <div className="p-3.5 rounded-xl bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-xs text-amber-900 dark:text-amber-200 text-left flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Pacing Notice:</span>
              Answers were submitted too rapidly. Take your time to read the rules and question prompts carefully. XP is awarded only for thoughtful practice.
            </div>
          </div>
        )}
      </div>

      {/* Accuracy per Skill Tag */}
      {Object.keys(skillAccuracy).length > 0 && (
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Accuracy by Skill Topic
          </h3>
          <div className="space-y-2">
            {Object.entries(skillAccuracy).map(([tag, stat]) => {
              const tagPercent = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div key={tag} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-gray-800 dark:text-gray-200">{tag}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">{tagPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        tagPercent >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${tagPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Missed Points / Words with Review Now */}
      {missedPoints.length > 0 && (
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Points to Review ({missedPoints.length})
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={onReviewExplanation}
              className="gap-1 text-xs text-[#124F40] dark:text-[#5BB78D] border-[#124F40]/30"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Review Rules
            </Button>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
            {missedPoints.slice(0, 5).map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="font-medium text-gray-800 dark:text-gray-200 block">
                    {item.prompt}
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    Target: {item.correctAnswer}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 shrink-0">
                  {item.skillTag}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        {!isPassed ? (
          <>
            <Button
              variant="outline"
              onClick={onReviewExplanation}
              className="w-full sm:w-auto gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Review Explanation
            </Button>

            <Button
              onClick={onRetryLesson}
              className="w-full sm:w-auto gap-2 bg-[#124F40] hover:bg-[#0e3f33] text-white"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again with New Order
            </Button>
          </>
        ) : (
          <Button
            onClick={onContinue}
            className="w-full sm:w-auto ml-auto gap-2 bg-[#124F40] hover:bg-[#0e3f33] text-white px-6 py-3 rounded-xl font-semibold shadow-md"
          >
            <span>Continue to Next Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
