import { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { TimingCoach } from './TimingCoach';
import {
  getAdaptivePerformance,
  recordQuestionResponses,
  QUESTION_TYPE_LABELS,
  AdaptivePerformanceSummary,
} from './adaptiveTracker';
import { useAppStore } from '../../store/useAppStore';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import type { QuestionType } from '../../types';
import { getReadingTests } from '../reading/readingContent';
import { isAnswerCorrect } from '../reading/marking';
import { shuffleMcqOptions, cleanOptionText } from '../../lib/mcqShuffle';

interface PracticeQuestionItem {
  id: string;
  passageTitle: string;
  passageText: string;
  questionNumber: number;
  questionType: QuestionType;
  topic: string;
  difficulty: 'easy' | 'standard' | 'challenging';
  prompt: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export function SmartPracticePage() {
  const { profile, addToast } = useAppStore();
  const [stats, setStats] = useState<AdaptivePerformanceSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Practice state
  const [practiceSeed, setPracticeSeed] = useState(() => `practice_${Date.now()}`);
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestionItem[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeSpentMap, setTimeSpentMap] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [adaptationMessage, setAdaptationMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      try {
        const perf = await getAdaptivePerformance(profile?.targetBand || 7.0);
        setStats(perf);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, [profile?.targetBand]);

  // Generate Smart Practice Set
  const handleStartSmartPractice = () => {
    if (!stats) return;
    setPracticeSeed(`practice_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);

    // Pick top 2 weakest question types
    const targetedTypes = stats.weakestTypes.slice(0, 2);

    // Collect matching questions from the test library
    const allTests = getReadingTests();
    const collected: PracticeQuestionItem[] = [];

    for (const test of allTests) {
      for (const passage of test.passages) {
        for (const group of passage.questionGroups) {
          if (targetedTypes.includes(group.questionType)) {
            for (const q of group.questions) {
              // Determine difficulty
              const diff =
                (stats.byType[group.questionType]?.adaptiveDifficulty as
                  | 'easy'
                  | 'standard'
                  | 'challenging') || 'standard';

              collected.push({
                id: q.id,
                passageTitle: passage.title,
                passageText: passage.text,
                questionNumber: collected.length + 1,
                questionType: group.questionType,
                topic: test.attribution.authorOrTopic || 'Academic Science',
                difficulty: diff,
                prompt: q.prompt,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation:
                  q.explanation ||
                  `In this ${QUESTION_TYPE_LABELS[group.questionType] || group.questionType} question, verify direct textual evidence in the passage.`,
              });

              if (collected.length >= 5) break;
            }
          }
          if (collected.length >= 5) break;
        }
        if (collected.length >= 5) break;
      }
      if (collected.length >= 5) break;
    }

    // Fallback if none found
    if (collected.length === 0) {
      collected.push({
        id: 'smart-fallback-1',
        passageTitle: 'Urban Climate Adaptation',
        passageText:
          'Urban microclimates in coastal cities face severe heat island intensification due to dense asphalt infrastructure. Planners advocate green corridors and reflective rooftop materials to mitigate peak temperatures.',
        questionNumber: 1,
        questionType: 'true_false_not_given',
        topic: 'environment',
        difficulty: 'standard',
        prompt: 'Green corridors are promoted as a means of reducing peak urban heat.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'TRUE',
        explanation: 'Passage affirms: "Planners advocate green corridors and reflective rooftop materials to mitigate peak temperatures."',
      });
    }

    setPracticeQuestions(collected);
    setActiveQuestionIndex(0);
    setUserAnswers({});
    setTimeSpentMap({});
    setIsSubmitted(false);
    setAdaptationMessage(null);
    setIsPracticing(true);
  };

  const handleSelectAnswer = (qId: string, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleTimeUpdate = (seconds: number) => {
    const currentQ = practiceQuestions[activeQuestionIndex];
    if (currentQ) {
      setTimeSpentMap((prev) => ({ ...prev, [currentQ.id]: seconds }));
    }
  };

  // Submit Smart Practice
  const handleSubmitPractice = async () => {
    setIsSubmitted(true);

    const responsesToRecord = practiceQuestions.map((q) => {
      const uAns = userAnswers[q.id] || '';
      const isCorrect = isAnswerCorrect(uAns, q.correctAnswer, q.questionType, q.options);
      let savedOptions = q.options;
      if (q.questionType === 'multiple_choice_single' && q.options) {
        savedOptions = shuffleMcqOptions(q.options, `${practiceSeed}_${q.id}`).map((o) => o.text);
      }

      return {
        attemptId: 999900 + Date.now() % 1000,
        module: 'reading' as const,
        questionId: q.id,
        userAnswer: uAns,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        questionType: q.questionType,
        topic: q.topic,
        difficulty: q.difficulty,
        timeSpentSeconds: timeSpentMap[q.id] || 60,
        questionPrompt: q.prompt,
        passageOrSectionTitle: q.passageTitle,
        contextText: q.passageText.slice(0, 300) + '...',
        options: savedOptions,
        answeredAt: new Date().toISOString(),
      };
    });

    await recordQuestionResponses(responsesToRecord);

    const score = responsesToRecord.filter((r) => r.isCorrect).length;
    const accuracy = Math.round((score / practiceQuestions.length) * 100);

    // Evaluate adaptation message
    if (accuracy >= 80) {
      setAdaptationMessage(
        '🌟 Adaptive Level Up: Outstanding accuracy! Your adaptive difficulty for these question types has been upgraded to Challenging.'
      );
    } else if (accuracy < 50) {
      setAdaptationMessage(
        '💡 Adaptive Adjust: Difficulty temporarily adjusted to Standard to reinforce foundational patterns. Wrong answers archived in your Mistake Notebook.'
      );
    } else {
      setAdaptationMessage(
        '👍 Solid Practice: 1 good session closer to the next difficulty level. Keep your streak going!'
      );
    }

    addToast({
      type: 'success',
      title: 'Smart Practice Complete!',
      message: `Scored ${score}/${practiceQuestions.length} (${accuracy}%).`,
    });

    // Refresh stats
    const updated = await getAdaptivePerformance(profile?.targetBand || 7.0);
    setStats(updated);
  };

  const currentQ = practiceQuestions[activeQuestionIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Practice', href: '/practice' },
          { label: 'Smart Practice' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              AI-Powered Adaptation
            </span>
            <Badge variant="teal" size="sm">
              Band-Calibrated
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Adaptive Smart Practice
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
            Automatically selects questions targeting your weakest question types first. The difficulty adapts to your performance: it levels up after 3 strong results and eases after difficult ones.
          </p>
        </div>

        {!isPracticing && (
          <Button
            variant="primary"
            size="md"
            onClick={handleStartSmartPractice}
            leftIcon={<Sparkles className="w-4 h-4" />}
            className="shadow-sm"
          >
            Start Smart Practice Session
          </Button>
        )}
      </div>

      {/* ACTIVE SMART PRACTICE RUNNER */}
      {isPracticing && currentQ ? (
        <div className="space-y-6">
          {/* Top Progress & Timing Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-between col-span-1 md:col-span-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                  {activeQuestionIndex + 1}/{practiceQuestions.length}
                </span>
                <div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    {QUESTION_TYPE_LABELS[currentQ.questionType] || currentQ.questionType}
                  </span>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Difficulty: <span className="capitalize">{currentQ.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Question Navigation Bubbles */}
              <div className="flex items-center gap-1.5">
                {practiceQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionIndex(idx)}
                    className={cn(
                      'w-7 h-7 rounded-lg text-xs font-bold transition-all',
                      activeQuestionIndex === idx
                        ? 'bg-teal-600 text-white shadow-xs'
                        : userAnswers[q.id]
                        ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    )}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </Card>

            {/* Timing Coach Widget */}
            <TimingCoach
              activeQuestionNumber={activeQuestionIndex + 1}
              totalQuestions={practiceQuestions.length}
              recommendedSeconds={90}
              questionType={currentQ.questionType}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>

          {/* Split Passage & Question View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Passage Side */}
            <Card className="p-6 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs space-y-4 max-h-[550px] overflow-y-auto">
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">
                  Targeted Text Context
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {currentQ.passageTitle}
                </h3>
              </div>
              <div className="text-xs font-serif leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line border-t border-slate-100 dark:border-slate-800 pt-4">
                {currentQ.passageText}
              </div>
            </Card>

            {/* Question Side */}
            <Card className="p-6 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm">
                    {QUESTION_TYPE_LABELS[currentQ.questionType] || currentQ.questionType}
                  </Badge>
                  <span className="text-2xs text-slate-400">
                    Question {activeQuestionIndex + 1} of {practiceQuestions.length}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {currentQ.prompt}
                </div>

                {/* Options or text input */}
                {currentQ.options && currentQ.options.length > 0 ? (
                  <div className="space-y-2 pt-2">
                    {(() => {
                      const isMcq = currentQ.questionType === 'multiple_choice_single';
                      const optionsToRender = isMcq
                        ? shuffleMcqOptions(currentQ.options, `${practiceSeed}_${currentQ.id}`)
                        : currentQ.options.map((opt, idx) => ({ id: `opt-${idx}`, text: opt, raw: opt, originalIndex: idx, isPinned: false }));

                      return optionsToRender.map((optItem, idx) => {
                        const optText = optItem.text;
                        const displayLetter = String.fromCharCode(65 + idx);
                        const isSelected =
                          userAnswers[currentQ.id] === optText ||
                          userAnswers[currentQ.id]?.toUpperCase() === displayLetter;

                        const isCorrectOption = isAnswerCorrect(optText, currentQ.correctAnswer, currentQ.questionType, currentQ.options);

                        return (
                          <button
                            key={optItem.id || idx}
                            disabled={isSubmitted}
                            onClick={() => handleSelectAnswer(currentQ.id, optText)}
                            className={cn(
                              'w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between',
                              isSelected
                                ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-100 font-bold'
                                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {isMcq && (
                                <span className="font-mono font-bold text-slate-400">
                                  {displayLetter}.
                                </span>
                              )}
                              <span>{optText}</span>
                            </span>
                            {isSubmitted && (
                              isCorrectOption ? (
                                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                              ) : isSelected ? (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              ) : null
                            )}
                          </button>
                        );
                      });
                    })()}
                  </div>
                ) : (
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={userAnswers[currentQ.id] || ''}
                    onChange={(e) => handleSelectAnswer(currentQ.id, e.target.value)}
                    placeholder="Type exact answer from text..."
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                )}

                {/* Feedback on submit */}
                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 animate-fadeIn">
                    <div className="font-bold flex items-center gap-1.5">
                      {userAnswers[currentQ.id]?.trim().toLowerCase() ===
                      (Array.isArray(currentQ.correctAnswer)
                        ? currentQ.correctAnswer[0].toLowerCase()
                        : currentQ.correctAnswer.toLowerCase()) ? (
                        <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect (Correct: {Array.isArray(currentQ.correctAnswer) ? currentQ.correctAnswer.join(' / ') : currentQ.correctAnswer})
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{currentQ.explanation}</p>
                  </div>
                )}
              </div>

              {/* Bottom Nav Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {activeQuestionIndex + 1 < practiceQuestions.length ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      Next Question
                    </Button>
                  ) : !isSubmitted ? (
                    <Button variant="primary" size="sm" onClick={handleSubmitPractice}>
                      Submit Smart Practice
                    </Button>
                  ) : (
                    <Button variant="primary" size="sm" onClick={() => setIsPracticing(false)}>
                      Finish & Return
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Adaptation Result Banner */}
          {adaptationMessage && (
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-xs font-semibold text-teal-900 dark:text-teal-200 flex items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600 shrink-0" />
                <span>{adaptationMessage}</span>
              </div>
              <Link to="/mistakes">
                <Button variant="outline" size="sm" className="shrink-0">
                  View Mistake Notebook
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        /* ADAPTIVE STATS & DASHBOARD OVERVIEW */
        <div className="space-y-6">
          {/* Top Highlights Banner */}
          <Card className="p-6 border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-transparent rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  Personalized Adaptive Engine
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                  Ready to Target Your Weakest IELTS Question Types?
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                  Based on your performance, we have tailored your next practice session with:
                  <span className="font-bold text-teal-700 dark:text-teal-300 ml-1">
                    {stats?.weakestTypes.slice(0, 2).map((t) => QUESTION_TYPE_LABELS[t] || t).join(' & ')}
                  </span>
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleStartSmartPractice}
                leftIcon={<Sparkles className="w-4 h-4" />}
                className="shrink-0 shadow-sm"
              >
                Start Smart Practice (5 Qs)
              </Button>
            </div>
          </Card>

          {/* Question Type Performance Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              Question-Type Accuracy & Adaptive Level
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats &&
                Object.values(stats.byType).map((item) => (
                  <Card
                    key={item.questionType}
                    className="p-4 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {item.label}
                      </span>
                      <Badge
                        variant={
                          item.adaptiveDifficulty === 'challenging'
                            ? 'rose'
                            : item.adaptiveDifficulty === 'standard'
                            ? 'teal'
                            : 'outline'
                        }
                        size="sm"
                      >
                        {item.adaptiveDifficulty}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-2xs text-slate-500 dark:text-slate-400">
                        <span>Accuracy</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {item.totalAttempts > 0 ? `${item.accuracy}%` : 'Not tested'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            item.accuracy >= 75
                              ? 'bg-teal-600'
                              : item.accuracy >= 50
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          )}
                          style={{ width: `${item.totalAttempts > 0 ? item.accuracy : 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-2xs text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span>{item.totalAttempts} total answered</span>
                      <span>Streak: {item.recentStreak >= 0 ? `+${item.recentStreak}` : item.recentStreak}</span>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
