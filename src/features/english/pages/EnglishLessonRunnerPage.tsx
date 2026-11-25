import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2, Sparkles, BookOpen } from 'lucide-react';
import {
  getCourseLesson,
  completeLesson,
  saveLessonSession,
  loadLessonSession,
  clearLessonSession,
  calculateAwardedXp,
  getUnitTestRetriesToday,
  recordUnitTestAttemptToday,
} from '../services/courseService';
import { getUnitMetadata } from '../data/curriculumStructure';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../../components/ui/Button';
import { LessonTopBar } from '../components/player/LessonTopBar';
import { ExplainSection } from '../components/player/ExplainSection';
import { ExamplesSection } from '../components/player/ExamplesSection';
import { TimelineSection } from '../components/player/TimelineSection';
import { DialogueSection } from '../components/player/DialogueSection';
import { PracticeSection } from '../components/player/PracticeSection';
import { SummarySection } from '../components/player/SummarySection';
import { UrduNoteSection } from '../components/player/UrduNoteSection';
import { LessonCompletionScreen, MissedPointItem } from '../components/player/LessonCompletionScreen';
import { LessonErrorBoundary } from '../components/player/LessonErrorBoundary';

export const EnglishLessonRunnerPage: React.FC = () => {
  const { lessonId, unitId } = useParams<{ lessonId?: string; unitId?: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const activeLessonId = lessonId || (unitId ? `${unitId}-test` : 'eng-a1-u1-l1');

  const [lesson, setLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [completedSectionIndices, setCompletedSectionIndices] = useState<Set<number>>(new Set());
  const [showUrdu, setShowUrdu] = useState(true);

  // Exercise tracking & scoring
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, any>>({});
  const [startTime] = useState<number>(() => Date.now());

  // Completion State
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionResult, setCompletionResult] = useState<{
    scorePercent: number;
    isPassed: boolean;
    xpEarned: number;
    isRapidGuessing: boolean;
    skillAccuracy: Record<string, { total: number; correct: number }>;
    missedPoints: MissedPointItem[];
  } | null>(null);

  const headingRef = useRef<HTMLDivElement>(null);

  // 1. Load Lesson Content & Resume Session
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getCourseLesson(activeLessonId);
        if (!isMounted) return;

        if (data) {
          setLesson(data);

          // Check for saved session to resume
          const savedSession = loadLessonSession(activeLessonId);
          if (savedSession && savedSession.activeSectionIdx < (data.sections?.length || 1)) {
            setActiveSectionIdx(savedSession.activeSectionIdx);
            setExerciseAnswers(savedSession.userAnswers || {});
            setCompletedSectionIndices(new Set(savedSession.completedSectionIndices || []));
            addToast({
              type: 'info',
              message: `Resumed where you left off at Section ${savedSession.activeSectionIdx + 1}.`,
            });
          }
        }
      } catch (err) {
        console.error('Failed to load course lesson:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [activeLessonId, addToast]);

  // 2. Keyboard Navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowRight' && !isCompleted && lesson) {
        if (activeSectionIdx < (lesson.sections?.length || 1) - 1) {
          e.preventDefault();
          handleNextSection();
        }
      } else if (e.key === 'ArrowLeft' && !isCompleted) {
        if (activeSectionIdx > 0) {
          e.preventDefault();
          handlePrevSection();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIdx, lesson, isCompleted]);

  // Auto-Save after step changes
  useEffect(() => {
    if (lesson && !isCompleted) {
      saveLessonSession(activeLessonId, {
        activeSectionIdx,
        userAnswers: exerciseAnswers,
        completedSectionIndices: Array.from(completedSectionIndices),
      });
    }
  }, [activeSectionIdx, exerciseAnswers, completedSectionIndices, activeLessonId, lesson, isCompleted]);

  // Focus management: focus heading when section changes
  useEffect(() => {
    headingRef.current?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSectionIdx]);

  const handleNextSection = () => {
    if (!lesson || !lesson.sections) return;

    setCompletedSectionIndices((prev) => new Set([...prev, activeSectionIdx]));

    if (activeSectionIdx < lesson.sections.length - 1) {
      setActiveSectionIdx((prev) => prev + 1);
    } else {
      // Reached final section -> Finish Lesson & Calculate Scores
      handleFinishLesson();
    }
  };

  const handlePrevSection = () => {
    if (activeSectionIdx > 0) {
      setActiveSectionIdx((prev) => prev - 1);
    }
  };

  const handleSelectSection = (idx: number) => {
    if (idx >= 0 && idx < (lesson?.sections?.length || 0)) {
      setActiveSectionIdx(idx);
    }
  };

  // Section exercise completion handler
  const handleSectionExercisesComplete = (scorePercent: number, results: Record<string, boolean>) => {
    setExerciseResults((prev) => ({ ...prev, ...results }));
  };

  // Final evaluation & lesson completion
  const handleFinishLesson = async () => {
    if (!lesson) return;

    // Aggregate all exercises across practice and quiz sections
    const allExercises: any[] = [];
    for (const sec of lesson.sections || []) {
      if ((sec.type === 'practice' || sec.type === 'quiz') && Array.isArray(sec.exercises)) {
        allExercises.push(...sec.exercises);
      }
    }

    const totalQuestions = allExercises.length;
    let correctCount = 0;
    const skillStats: Record<string, { total: number; correct: number }> = {};
    const missed: MissedPointItem[] = [];

    for (const ex of allExercises) {
      const isCorrect = exerciseResults[ex.id] ?? false;
      if (isCorrect) correctCount++;
      else {
        missed.push({
          skillTag: ex.skillTag || 'grammar',
          prompt: ex.prompt,
          correctAnswer: String(ex.correctAnswer || ex.correctOptionId || 'Target answer'),
        });
      }

      const tag = ex.skillTag || 'general-grammar';
      if (!skillStats[tag]) skillStats[tag] = { total: 0, correct: 0 };
      skillStats[tag].total += 1;
      if (isCorrect) skillStats[tag].correct += 1;
    }

    const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
    const isPassed = scorePercent >= 70;
    const totalTimeSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    // Calculate XP with anti-gaming checks
    const { xp, isRapidGuessing } = calculateAwardedXp({
      scorePercent,
      totalQuestions,
      totalTimeSeconds,
    });

    // Record in database
    await completeLesson(
      lesson.id,
      lesson.unit || 'unit-a1-1',
      lesson.level || 'A1',
      scorePercent,
      exerciseAnswers
    );

    setCompletionResult({
      scorePercent,
      isPassed,
      xpEarned: xp,
      isRapidGuessing,
      skillAccuracy: skillStats,
      missedPoints: missed,
    });

    setIsCompleted(true);
  };

  const handleRetryLesson = () => {
    setIsCompleted(false);
    setCompletionResult(null);
    setActiveSectionIdx(0);
    setExerciseResults({});
    setExerciseAnswers({});
    setCompletedSectionIndices(new Set());
    clearLessonSession(activeLessonId);
  };

  const handleReviewExplanation = () => {
    setIsCompleted(false);
    setActiveSectionIdx(0);
  };

  const handleClose = () => {
    navigate('/app/english/course');
  };

  // Skeleton Loader State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7FAF8] dark:bg-gray-900 flex flex-col items-center justify-center p-6 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#124F40] dark:text-[#5BB78D]" />
        <div className="text-center space-y-1">
          <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Loading interactive lesson...
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Preparing vocabulary, audio examples, and practice exercises
          </p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#F7FAF8] dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Lesson Not Found
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          We could not load the requested lesson ID: "{activeLessonId}".
        </p>
        <Button onClick={handleClose} className="bg-[#124F40] text-white">
          Return to Course Map
        </Button>
      </div>
    );
  }

  const sections = lesson.sections || [];
  const currentSection = sections[activeSectionIdx];
  const unitMeta = lesson.unit ? getUnitMetadata(lesson.unit) : null;
  const unitTitle = unitMeta ? `Unit ${unitMeta.unitNumber}: ${unitMeta.title}` : lesson.unit;

  return (
    <LessonErrorBoundary fallbackUrl="/app/english/course" onReset={handleRetryLesson}>
      <div className="min-h-screen bg-[#F7FAF8] dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors">
        {/* Slim Focus Top Bar */}
        <LessonTopBar
          lessonTitle={lesson.title}
          unitTitle={unitTitle}
          sections={sections.map((s: any) => ({ id: s.id, type: s.type, title: s.title }))}
          activeSectionIdx={activeSectionIdx}
          completedSectionIndices={completedSectionIndices}
          onSelectSection={handleSelectSection}
          onClose={handleClose}
          showUrdu={showUrdu}
          onToggleUrdu={() => setShowUrdu((prev) => !prev)}
          lessonId={lesson.id}
        />

        {/* Main Focus Content Area */}
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col justify-between">
          <div ref={headingRef} tabIndex={-1} className="outline-none">
            {isCompleted && completionResult ? (
              <LessonCompletionScreen
                lessonTitle={lesson.title}
                scorePercent={completionResult.scorePercent}
                isPassed={completionResult.isPassed}
                xpEarned={completionResult.xpEarned}
                isRapidGuessing={completionResult.isRapidGuessing}
                skillAccuracy={completionResult.skillAccuracy}
                missedPoints={completionResult.missedPoints}
                onReviewExplanation={handleReviewExplanation}
                onRetryLesson={handleRetryLesson}
                onContinue={handleClose}
              />
            ) : currentSection ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                {currentSection.type === 'explain' && (
                  <ExplainSection
                    title={currentSection.title}
                    content={currentSection.content || ''}
                    tables={currentSection.tables}
                    callouts={currentSection.callouts}
                  />
                )}

                {currentSection.type === 'examples' && (
                  <ExamplesSection
                    title={currentSection.title}
                    examples={currentSection.examples || []}
                    showUrdu={showUrdu}
                  />
                )}

                {currentSection.type === 'timeline' && currentSection.timeline && (
                  <TimelineSection
                    title={currentSection.title}
                    timeline={currentSection.timeline}
                  />
                )}

                {currentSection.type === 'dialogue' && (
                  <DialogueSection
                    title={currentSection.title}
                    dialogue={currentSection.dialogue || []}
                    showUrdu={showUrdu}
                  />
                )}

                {(currentSection.type === 'practice' || currentSection.type === 'quiz') && (
                  <PracticeSection
                    key={currentSection.id}
                    title={currentSection.title}
                    exercises={currentSection.exercises || []}
                    showUrdu={showUrdu}
                    lessonTitle={lesson.title}
                    level={lesson.level}
                    onSectionComplete={handleSectionExercisesComplete}
                  />
                )}

                {currentSection.type === 'summary' && (
                  <SummarySection
                    title={currentSection.title}
                    content={currentSection.content}
                    summaryPoints={currentSection.summaryPoints}
                  />
                )}

                {currentSection.type === 'urduNote' && (
                  <UrduNoteSection
                    title={currentSection.title}
                    content={currentSection.content || ''}
                  />
                )}
              </div>
            ) : null}
          </div>

          {/* Bottom Navigation Controls (When not in completion state) */}
          {!isCompleted && (
            <footer className="mt-12 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                disabled={activeSectionIdx === 0}
                onClick={handlePrevSection}
                className="gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">
                Section {activeSectionIdx + 1} of {sections.length}
              </span>

              <Button
                onClick={handleNextSection}
                className="gap-1.5 bg-[#124F40] hover:bg-[#0e3f33] text-white px-6 shadow-sm"
              >
                <span>{activeSectionIdx === sections.length - 1 ? 'Finish Lesson' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </footer>
          )}
        </main>
      </div>
    </LessonErrorBoundary>
  );
};
