import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  BookOpen,
  Award,
  Zap,
  Info,
} from 'lucide-react';
import { PLACEMENT_QUESTIONS } from '../data/placementQuestions';
import { evaluatePlacementTest, savePlacementResult, MINIMUM_QUESTIONS_REQUIRED } from '../services/placementService';
import type { PlacementTestResult, PlacementQuestion } from '../../../types/course';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ProgressBar } from '../../../components/ui/ProgressBar';

export function EnglishPlacementPage() {
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PlacementTestResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = PLACEMENT_QUESTIONS.length;
  const currentQ: PlacementQuestion = PLACEMENT_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).filter((k) => answers[k] !== undefined && answers[k] !== '').length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinishTest();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinishTest = async () => {
    setIsSubmitting(true);
    const evalResult = evaluatePlacementTest(answers);
    setResult(evalResult);

    if (evalResult.isReliable) {
      await savePlacementResult(evalResult);
      addToast({
        type: 'success',
        title: 'Placement Assessment Completed!',
        message: `Your estimated level is ${evalResult.estimatedLevel}. Starting unit unlocked.`,
      });
    }

    setIsSubmitting(false);
  };

  const handleRetake = () => {
    setAnswers({});
    setResult(null);
    setCurrentIndex(0);
  };

  // -------------------------------------------------------------
  // RESULT SCREEN
  // -------------------------------------------------------------
  if (result) {
    if (!result.isReliable) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-12 space-y-6 animate-fade-in text-center">
          <Card className="p-8 bg-white dark:bg-[#112019] border border-amber-300 dark:border-amber-800/60 shadow-lg rounded-3xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Incomplete Assessment
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
              You answered <strong>{result.answeredCount}</strong> out of {totalQuestions} questions.
              At least <strong>{MINIMUM_QUESTIONS_REQUIRED} questions</strong> must be answered to accurately calculate your CEFR level without false placement.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs text-left">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Info className="w-4 h-4 text-amber-600" />
                Reliability Notice
              </div>
              Language assessment standards require sufficient question variety across Grammar, Vocabulary, and Reading to establish a valid baseline.
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => setResult(null)}
                className="w-full sm:w-auto bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-3 rounded-xl"
              >
                Resume Placement Test
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/app/english/course')}
                className="w-full sm:w-auto rounded-xl text-xs"
              >
                Go to Course Map Anyway
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Hero Result Banner */}
        <Card className="p-8 bg-gradient-to-br from-[#124F40] to-[#0B352B] text-white rounded-3xl shadow-xl space-y-6 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mx-auto">
            <Award className="w-4 h-4" />
            Official Level Estimate
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Level {result.estimatedLevel}
            </h1>
            <p className="text-emerald-100 text-sm font-medium">
              Overall Placement Accuracy: {result.overallScorePercent}% ({result.answeredCount}/{result.totalQuestions} Questions)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/20 text-emerald-200 text-xs max-w-lg mx-auto flex items-center justify-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-emerald-300" />
            <span>This is an estimate for study planning. You may test out of any unit or adjust your level at any time.</span>
          </div>
        </Card>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5 bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold">Grammar Accuracy</span>
              <span className="font-mono">{result.categoryScores.grammar}%</span>
            </div>
            <ProgressBar value={result.categoryScores.grammar} variant="teal" size="sm" />
          </Card>

          <Card className="p-5 bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold">Vocabulary Depth</span>
              <span className="font-mono">{result.categoryScores.vocabulary}%</span>
            </div>
            <ProgressBar value={result.categoryScores.vocabulary} variant="teal" size="sm" />
          </Card>

          <Card className="p-5 bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold">Reading Comprehension</span>
              <span className="font-mono">{result.categoryScores.reading}%</span>
            </div>
            <ProgressBar value={result.categoryScores.reading} variant="teal" size="sm" />
          </Card>
        </div>

        {/* Strengths & Gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-6 bg-white dark:bg-[#112019] border border-emerald-200/60 dark:border-emerald-900/40 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              Demonstrated Strengths
            </div>
            {result.strengths.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {result.strengths.map((str, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {str}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">Continue with introductory units to build core strengths.</p>
            )}
          </Card>

          <Card className="p-6 bg-white dark:bg-[#112019] border border-amber-200/60 dark:border-amber-900/40 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              Recommended Focus Areas
            </div>
            {result.knowledgeGaps.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {result.knowledgeGaps.map((gap, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {gap}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">No major gaps identified at this level.</p>
            )}
          </Card>
        </div>

        {/* Action CTAs */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#162720] border border-slate-200/80 dark:border-[#24392F] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Recommended Starting Point
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Begin with Unit 1 in Level {result.estimatedLevel} to reinforce your learning curve.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetake}
              className="rounded-xl text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Retake
            </Button>
            <Button
              onClick={() => navigate('/app/english/course')}
              className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
            >
              Start Course Map
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEST RUNNER
  // -------------------------------------------------------------
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      {/* Top Header & Progress */}
      <div className="space-y-3 pb-4 border-b border-slate-200/80 dark:border-[#24392F]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-600" />
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              English Placement Assessment
            </h1>
          </div>
          <Badge variant="teal" className="text-2xs font-mono">
            {answeredCount}/{totalQuestions} Answered
          </Badge>
        </div>

        <ProgressBar value={progressPercent} variant="teal" size="sm" />

        <div className="flex items-center justify-between text-2xs text-slate-500">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span className="capitalize">{currentQ.category} • Target {currentQ.level}</span>
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-6 sm:p-8 bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-sm rounded-3xl space-y-6">
        {/* Optional Reading Passage */}
        {currentQ.readingPassage && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#162720] border border-slate-200/70 dark:border-[#24392F] text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
            {currentQ.readingPassage}
          </div>
        )}

        {/* Prompt */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {currentQ.prompt}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = answers[currentQ.id] === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#124F40] dark:border-[#5BB78D] bg-emerald-50/50 dark:bg-emerald-950/20 text-[#124F40] dark:text-[#5BB78D] font-semibold'
                    : 'border-slate-200/80 dark:border-[#24392F] hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#124F40] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm">{opt.text}</span>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="rounded-xl text-xs"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {answeredCount >= MINIMUM_QUESTIONS_REQUIRED && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleFinishTest}
              className="rounded-xl text-xs border-emerald-600 text-emerald-700 dark:text-emerald-400"
            >
              Submit Early ({answeredCount} answered)
            </Button>
          )}

          <Button
            onClick={handleNext}
            className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2 rounded-xl shadow-xs"
          >
            {currentIndex === totalQuestions - 1 ? 'Finish & View Level' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
