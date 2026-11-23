import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  BookOpen,
  MessageSquare,
  Award,
  Layers,
  RotateCcw,
  Check,
  AlertTriangle,
  Lightbulb,
  Clock,
  Mic,
  Info,
} from 'lucide-react';
import { getCourseLesson, completeLesson } from '../services/courseService';
import {
  recordMistakeToNotebook,
  addLessonVocabToSpacedRepetition,
  recordSkillPracticeResult,
} from '../services/masteryService';
import { playPronunciation } from '../../dictionary/dictionaryService';
import { isAnswerMatch } from '../../../shared/vocab-engine/sm2';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ProgressBar } from '../../../components/ui/ProgressBar';

export function EnglishLessonRunnerPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const [lesson, setLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Section navigation state
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [showUrdu, setShowUrdu] = useState(true);

  // Practice state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<string, { isCorrect: boolean; showExplanation: boolean }>>({});
  const [selectedTokens, setSelectedTokens] = useState<Record<string, string[]>>({});
  const [matchedPairs, setMatchedPairs] = useState<Record<string, Record<string, string>>>({});
  const [selectedPairLeft, setSelectedPairLeft] = useState<string | null>(null);

  // Completion state
  const [completionResult, setCompletionResult] = useState<{ passed: boolean; message: string; score: number } | null>(null);

  const effectiveId = lessonId?.includes('-u') ? lessonId : (lessonId === 'eng-a1-l1' ? 'eng-a1-u1-l1' : lessonId || 'eng-a1-u1-l1');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getCourseLesson(effectiveId).then((data) => {
      if (!isMounted) return;
      setLesson(data);
      setIsLoading(false);

      // Auto-feed lesson vocabulary to spaced-repetition on first view
      if (data?.vocabularyList?.length) {
        addLessonVocabToSpacedRepetition(data.vocabularyList, data.title);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [effectiveId]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-xs text-slate-500">Loading interactive lesson...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold">Lesson Not Found</h2>
        <Link to="/app/english/course" className="text-teal-600 hover:underline text-xs">
          Return to English Course Map
        </Link>
      </div>
    );
  }

  const sections = lesson.sections || [];
  const currentSection = sections[activeSectionIdx] || sections[0];
  const isPracticeSection = currentSection.type === 'practice' || currentSection.type === 'quiz';
  const exercises = currentSection.exercises || [];

  // Handle checking a practice exercise
  const handleCheckExercise = async (ex: any) => {
    let isCorrect = false;
    let givenAnswer = userAnswers[ex.id] || '';

    if (ex.type === 'mcq') {
      isCorrect = givenAnswer === ex.correctOptionId;
    } else if (ex.type === 'fill_blank' || ex.type === 'error_correction') {
      const acceptable = [ex.correctAnswer, ...(ex.acceptableAnswers || [])];
      isCorrect = acceptable.some((ans) => isAnswerMatch(givenAnswer, ans));
    } else if (ex.type === 'order_sentence') {
      const currentOrder = selectedTokens[ex.id] || [];
      isCorrect = JSON.stringify(currentOrder) === JSON.stringify(ex.correctOrder);
      givenAnswer = currentOrder.join(' ');
    } else if (ex.type === 'match_pairs') {
      const userPairs = matchedPairs[ex.id] || {};
      const allMatched = ex.pairs.every((p: any) => userPairs[p.left] === p.right);
      isCorrect = allMatched;
      givenAnswer = JSON.stringify(userPairs);
    } else if (ex.type === 'repeat_after_me') {
      isCorrect = true; // Speech simulated complete
      givenAnswer = 'Pronunciation verified';
    }

    setExerciseFeedback((prev) => ({
      ...prev,
      [ex.id]: { isCorrect, showExplanation: true },
    }));

    // Record skill tag practice result
    if (ex.skillTag) {
      recordSkillPracticeResult(ex.skillTag, lesson.level, isCorrect ? 100 : 0);
    }

    // Feed mistakes into Mistake Notebook
    if (!isCorrect) {
      await recordMistakeToNotebook({
        questionId: ex.id,
        skillTag: ex.skillTag || 'general-grammar',
        lessonTitle: lesson.title,
        prompt: ex.prompt,
        userAnswer: givenAnswer || '(empty)',
        correctAnswer: ex.correctAnswer || ex.options?.find((o: any) => o.id === ex.correctOptionId)?.text || 'See explanation',
        explanation: ex.explanation,
      });
    }
  };

  // Check all exercises and complete lesson
  const handleCompletePractice = async () => {
    let correctCount = 0;
    const total = exercises.length || 1;

    for (const ex of exercises) {
      const fb = exerciseFeedback[ex.id];
      if (fb?.isCorrect) correctCount += 1;
    }

    const scorePercent = Math.round((correctCount / total) * 100);
    const result = await completeLesson(
      lesson.id,
      lesson.unit,
      lesson.level,
      scorePercent,
      userAnswers
    );

    setCompletionResult({
      passed: result.passed,
      message: result.message,
      score: scorePercent,
    });

    if (result.passed) {
      addToast({
        type: 'success',
        title: 'Lesson Completed!',
        message: `Score: ${scorePercent}% — Great work!`,
      });
    } else {
      addToast({
        type: 'warning',
        title: '70% Required to Pass',
        message: result.message,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* 1. Header Bar: Back, Title, Progress */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-[#24392F]">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/app/english/course')}
            className="rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Course Map
          </Button>
          <div className="hidden sm:block">
            <span className="text-2xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase">
              {lesson.level} • {lesson.unit}
            </span>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {lesson.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="teal" className="text-3xs font-mono">
            {lesson.estimatedMinutes}m
          </Badge>
          <button
            onClick={() => setShowUrdu(!showUrdu)}
            className="text-xs px-2.5 py-1 rounded-xl border border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            {showUrdu ? 'اردو On' : 'اردو Off'}
          </button>
        </div>
      </div>

      {/* 2. Step Navigator Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {sections.map((sec: any, idx: number) => {
          const isActive = idx === activeSectionIdx;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSectionIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#124F40] text-white shadow-xs'
                  : 'bg-white dark:bg-[#112019] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-[#24392F] hover:border-[#5BB78D]'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{sec.title}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Section Content Display */}
      <Card className="p-6 sm:p-8 bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs rounded-3xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-xs flex items-center justify-center">
              {activeSectionIdx + 1}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {currentSection.title}
            </h2>
          </div>
          <span className="text-3xs font-mono uppercase text-slate-400">
            {currentSection.type}
          </span>
        </div>

        {/* SECTION TYPE: EXPLAIN */}
        {currentSection.type === 'explain' && (
          <div className="space-y-6">
            <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
              {currentSection.content}
            </div>

            {/* Tables */}
            {currentSection.tables?.map((tbl: any, tIdx: number) => (
              <div key={tIdx} className="space-y-2 overflow-x-auto">
                {tbl.title && (
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {tbl.title}
                  </h4>
                )}
                <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                    <tr>
                      {tbl.headers.map((h: string, hIdx: number) => (
                        <th key={hIdx} className="p-2.5 border-b border-slate-200 dark:border-slate-800 font-bold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {tbl.rows.map((row: string[], rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        {row.map((cell: string, cIdx: number) => (
                          <td key={cIdx} className="p-2.5 text-slate-600 dark:text-slate-300 font-mono">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            {/* Callouts */}
            {currentSection.callouts?.map((c: any, cIdx: number) => (
              <div
                key={cIdx}
                className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 ${
                  c.type === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200/60 dark:border-amber-800/40 text-amber-950 dark:text-amber-200'
                    : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/60 dark:border-emerald-800/40 text-emerald-950 dark:text-emerald-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {c.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-600" /> : <Lightbulb className="w-4 h-4 text-emerald-600" />}
                  {c.title}
                </div>
                <p className="leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* SECTION TYPE: TIMELINE (Visual SVG Tense Map) */}
        {currentSection.type === 'timeline' && currentSection.timeline && (
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#162720] border border-slate-200/80 dark:border-[#24392F] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {currentSection.timeline.title}
            </h4>

            {/* Visual SVG Timeline Bar */}
            <div className="relative py-8">
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="grid grid-cols-3 text-center pt-4 text-xs font-medium text-slate-500">
                <div className="space-y-1">
                  <div className="w-3 h-3 rounded-full bg-slate-400 mx-auto -mt-6.5 ring-4 ring-white dark:ring-slate-900" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">Past</span>
                  <p className="text-3xs text-slate-500">{currentSection.timeline.past}</p>
                </div>
                <div className="space-y-1">
                  <div className={`w-3.5 h-3.5 rounded-full mx-auto -mt-7 ring-4 ${
                    currentSection.timeline.activePoint === 'present'
                      ? 'bg-emerald-600 ring-emerald-200 dark:ring-emerald-900'
                      : 'bg-slate-400 ring-white dark:ring-slate-900'
                  }`} />
                  <span className="font-bold text-slate-700 dark:text-slate-300">Present (Now)</span>
                  <p className="text-3xs text-slate-500">{currentSection.timeline.present}</p>
                </div>
                <div className="space-y-1">
                  <div className="w-3 h-3 rounded-full bg-slate-400 mx-auto -mt-6.5 ring-4 ring-white dark:ring-slate-900" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">Future</span>
                  <p className="text-3xs text-slate-500">{currentSection.timeline.future}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic border-t border-slate-200/60 dark:border-slate-800 pt-3">
              💡 {currentSection.timeline.explanation}
            </p>
          </div>
        )}

        {/* SECTION TYPE: EXAMPLES */}
        {currentSection.type === 'examples' && (
          <div className="space-y-4">
            {currentSection.examples?.map((eg: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#162720] border border-slate-200/80 dark:border-[#24392F] flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {eg.english}
                  </p>
                  {eg.phonetic && (
                    <span className="text-2xs font-mono text-slate-400">
                      {eg.phonetic}
                    </span>
                  )}
                  {showUrdu && eg.urdu && (
                    <p className="text-xs font-serif text-teal-700 dark:text-teal-300" dir="rtl">
                      {eg.urdu}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => playPronunciation(eg.audioText || eg.english, { lang: 'en-US' })}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-teal-600 hover:text-teal-700 hover:bg-slate-50 shrink-0"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SECTION TYPE: DIALOGUE */}
        {currentSection.type === 'dialogue' && (
          <div className="space-y-4">
            {currentSection.dialogue?.map((turn: any, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {turn.avatar || turn.speaker.charAt(0)}
                </div>
                <div className="flex-1 p-4 rounded-2xl bg-slate-50 dark:bg-[#162720] border border-slate-200/80 dark:border-[#24392F] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {turn.speaker}
                    </span>
                    <button
                      onClick={() => playPronunciation(turn.audioText || turn.english, { lang: 'en-US' })}
                      className="text-slate-400 hover:text-teal-600"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-900 dark:text-white">{turn.english}</p>
                  {showUrdu && turn.urdu && (
                    <p className="text-xs font-serif text-teal-700 dark:text-teal-300 pt-1" dir="rtl">
                      {turn.urdu}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION TYPE: PRACTICE / QUIZ */}
        {isPracticeSection && (
          <div className="space-y-8">
            {exercises.map((ex: any, idx: number) => {
              const fb = exerciseFeedback[ex.id];

              return (
                <div
                  key={ex.id}
                  className="p-5 rounded-3xl bg-slate-50 dark:bg-[#162720] border border-slate-200/80 dark:border-[#24392F] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-mono font-bold text-teal-600 uppercase">
                      Exercise {idx + 1} • {ex.type.replace('_', ' ')}
                    </span>
                    {fb?.showExplanation && (
                      <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${
                        fb.isCorrect
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}>
                        {fb.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {ex.prompt}
                  </p>

                  {/* MCQ Options */}
                  {ex.type === 'mcq' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ex.options?.map((opt: any, oIdx: number) => {
                        const isSelected = userAnswers[ex.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setUserAnswers({ ...userAnswers, [ex.id]: opt.id })}
                            className={`p-3 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all ${
                              isSelected
                                ? 'border-[#124F40] bg-emerald-50 dark:bg-emerald-950/30 text-[#124F40] dark:text-[#5BB78D] font-bold'
                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span className="font-mono text-2xs mr-2 opacity-60">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Fill in Blank / Error Correction */}
                  {(ex.type === 'fill_blank' || ex.type === 'error_correction') && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={userAnswers[ex.id] || ''}
                        onChange={(e) => setUserAnswers({ ...userAnswers, [ex.id]: e.target.value })}
                        placeholder="Type your answer here..."
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  )}

                  {/* Sentence Token Ordering */}
                  {ex.type === 'order_sentence' && (
                    <div className="space-y-3">
                      <div className="min-h-12 p-3 rounded-xl border border-dashed border-teal-500/60 bg-white dark:bg-slate-900 flex flex-wrap gap-2 items-center">
                        {(selectedTokens[ex.id] || []).map((tok, tIdx) => (
                          <span
                            key={tIdx}
                            onClick={() => {
                              const cur = selectedTokens[ex.id] || [];
                              setSelectedTokens({
                                ...selectedTokens,
                                [ex.id]: cur.filter((_, i) => i !== tIdx),
                              });
                            }}
                            className="px-2.5 py-1 rounded-lg bg-teal-600 text-white text-xs font-bold cursor-pointer hover:bg-teal-700"
                          >
                            {tok} ✕
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {ex.sentenceTokens?.map((tok: string, tIdx: number) => (
                          <button
                            key={tIdx}
                            onClick={() => {
                              const cur = selectedTokens[ex.id] || [];
                              setSelectedTokens({
                                ...selectedTokens,
                                [ex.id]: [...cur, tok],
                              });
                            }}
                            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium hover:bg-slate-100"
                          >
                            {tok}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Repeat After Me Speaking */}
                  {ex.type === 'repeat_after_me' && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{ex.audioPrompt || ex.prompt}</p>
                        <span className="text-2xs text-slate-400">Listen, repeat, and verify speech cadence</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => playPronunciation(ex.audioPrompt || ex.prompt, { lang: 'en-US' })}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-teal-600"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setUserAnswers({ ...userAnswers, [ex.id]: 'verified' })}
                          className="px-3 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5"
                        >
                          <Mic className="w-3.5 h-3.5" />
                          Speak
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Check Exercise Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <Button
                      size="sm"
                      onClick={() => handleCheckExercise(ex)}
                      className="bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs rounded-xl px-4 py-1.5"
                    >
                      Check Answer
                    </Button>
                  </div>

                  {/* Explanation rationale */}
                  {fb?.showExplanation && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5 text-teal-700 dark:text-teal-300">
                        <Info className="w-4 h-4" />
                        Explanation
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {ex.explanation}
                      </p>
                      {showUrdu && ex.urduExplanation && (
                        <p className="text-teal-700 dark:text-teal-300 font-serif pt-1" dir="rtl">
                          {ex.urduExplanation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Complete Section CTA */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <Button
                onClick={handleCompletePractice}
                className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
              >
                Submit Practice & Record Progress
              </Button>
            </div>
          </div>
        )}

        {/* SECTION TYPE: SUMMARY */}
        {currentSection.type === 'summary' && (
          <div className="space-y-4">
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {currentSection.summaryPoints?.map((pt: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SECTION TYPE: URDUNOTE */}
        {currentSection.type === 'urduNote' && (
          <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 space-y-3" dir="rtl">
            <h4 className="font-bold text-sm text-amber-950 dark:text-amber-200 font-serif">
              {currentSection.title}
            </h4>
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-100 font-serif leading-relaxed whitespace-pre-line">
              {currentSection.urduText}
            </p>
          </div>
        )}
      </Card>

      {/* Completion Modal / Celebration */}
      {completionResult && (
        <Card className={`p-6 rounded-3xl border text-center space-y-4 ${
          completionResult.passed
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200'
        }`}>
          <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 mx-auto flex items-center justify-center shadow-xs">
            {completionResult.passed ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            )}
          </div>
          <h3 className="font-bold text-base">
            {completionResult.passed ? 'Lesson Mastered!' : 'Passing Mark Not Reached'}
          </h3>
          <p className="text-xs max-w-md mx-auto">
            {completionResult.message}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Button
              onClick={() => navigate('/app/english/course')}
              className="bg-[#124F40] text-white text-xs px-6 py-2 rounded-xl"
            >
              Return to Course Map
            </Button>
          </div>
        </Card>
      )}

      {/* 4. Bottom Stepper Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveSectionIdx((prev) => Math.max(0, prev - 1))}
          disabled={activeSectionIdx === 0}
          className="rounded-xl text-xs"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Previous Section
        </Button>

        {activeSectionIdx < sections.length - 1 ? (
          <Button
            onClick={() => setActiveSectionIdx((prev) => Math.min(sections.length - 1, prev + 1))}
            className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs"
          >
            Next Section
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/app/english/course')}
            className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs"
          >
            Finish Lesson
            <Check className="w-4 h-4 ml-1.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
