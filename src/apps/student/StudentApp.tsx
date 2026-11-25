import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { AppShell } from '../../components/layout/AppShell';
import { OnboardingModal } from '../../features/onboarding/OnboardingModal';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import { settingsStore } from '../../shared/settings/settingsStore';
import { MaintenanceScreen } from '../../components/maintenance/MaintenanceScreen';
import { Loader, TopProgressBar } from '../../components/loader';

// Lazy-loaded Student Feature Pages for High-Performance Code-Splitting
const HomePage = lazy(() => import('../../features/home/HomePage').then((m) => ({ default: m.HomePage })));
const PracticePage = lazy(() => import('../../features/practice/PracticePage').then((m) => ({ default: m.PracticePage })));
const ReadingPage = lazy(() => import('../../features/reading/ReadingPage').then((m) => ({ default: m.ReadingPage })));
const ReadingTestRunner = lazy(() => import('../../features/reading/ReadingTestRunner').then((m) => ({ default: m.ReadingTestRunner })));
const ReadingResultsPage = lazy(() => import('../../features/reading/ReadingResultsPage').then((m) => ({ default: m.ReadingResultsPage })));
const ListeningPage = lazy(() => import('../../features/listening/ListeningPage').then((m) => ({ default: m.ListeningPage })));
const ListeningTestRunner = lazy(() => import('../../features/listening/ListeningTestRunner').then((m) => ({ default: m.ListeningTestRunner })));
const ListeningResultsPage = lazy(() => import('../../features/listening/ListeningResultsPage').then((m) => ({ default: m.ListeningResultsPage })));
const WritingPage = lazy(() => import('../../features/writing/WritingPage').then((m) => ({ default: m.WritingPage })));
const WritingEditor = lazy(() => import('../../features/writing/WritingEditor').then((m) => ({ default: m.WritingEditor })));
const WritingFeedbackPage = lazy(() => import('../../features/writing/WritingFeedbackPage').then((m) => ({ default: m.WritingFeedbackPage })));
const SpeakingPage = lazy(() => import('../../features/speaking/SpeakingPage').then((m) => ({ default: m.SpeakingPage })));
const SpeakingMockRunner = lazy(() => import('../../features/speaking/SpeakingMockRunner').then((m) => ({ default: m.SpeakingMockRunner })));
const SpeakingPart1Practice = lazy(() => import('../../features/speaking/SpeakingPart1Practice').then((m) => ({ default: m.SpeakingPart1Practice })));
const SpeakingPart2Practice = lazy(() => import('../../features/speaking/SpeakingPart2Practice').then((m) => ({ default: m.SpeakingPart2Practice })));
const SpeakingShadowing = lazy(() => import('../../features/speaking/SpeakingShadowing').then((m) => ({ default: m.SpeakingShadowing })));
const SpeakingResultsPage = lazy(() => import('../../features/speaking/SpeakingResultsPage').then((m) => ({ default: m.SpeakingResultsPage })));
const MockPage = lazy(() => import('../../features/mock/MockPage').then((m) => ({ default: m.MockPage })));
const MockExamRunner = lazy(() => import('../../features/mock/MockExamRunner').then((m) => ({ default: m.MockExamRunner })));
const VocabPage = lazy(() => import('../../features/vocab/VocabPage').then((m) => ({ default: m.VocabPage })));
const VocabFlashcards = lazy(() => import('../../features/vocab/VocabFlashcards').then((m) => ({ default: m.VocabFlashcards })));
const VocabQuiz = lazy(() => import('../../features/vocab/VocabQuiz').then((m) => ({ default: m.VocabQuiz })));
const PersonalWordBank = lazy(() => import('../../features/vocab/PersonalWordBank').then((m) => ({ default: m.PersonalWordBank })));
const PhraseBankPage = lazy(() => import('../../features/vocab/PhraseBankPage').then((m) => ({ default: m.PhraseBankPage })));
const GrammarPage = lazy(() => import('../../features/vocab/GrammarPage').then((m) => ({ default: m.GrammarPage })));
const GrammarLessonRunner = lazy(() => import('../../features/vocab/GrammarLessonRunner').then((m) => ({ default: m.GrammarLessonRunner })));
const DiagnosticPage = lazy(() => import('../../features/diagnostic/DiagnosticPage').then((m) => ({ default: m.DiagnosticPage })));
const DashboardPage = lazy(() => import('../../features/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const PlanPage = lazy(() => import('../../features/plan/PlanPage').then((m) => ({ default: m.PlanPage })));
const SettingsPage = lazy(() => import('../../features/settings/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const DesignSystemPage = lazy(() => import('../../features/designSystem/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })));
const QuestionLessonsPage = lazy(() => import('../../features/adaptive/QuestionLessonsPage').then((m) => ({ default: m.QuestionLessonsPage })));
const AboutPage = lazy(() => import('../../features/info/AboutPage').then((m) => ({ default: m.AboutPage })));
const PrivacyPage = lazy(() => import('../../features/info/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('../../features/info/TermsPage').then((m) => ({ default: m.TermsPage })));
const FaqPage = lazy(() => import('../../features/info/FaqPage').then((m) => ({ default: m.FaqPage })));
const ContactPage = lazy(() => import('../../features/info/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('../../features/notfound/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// English Course Lazy-loaded Feature Pages
const EnglishHomePage = lazy(() => import('../../features/english/pages/EnglishHomePage').then((m) => ({ default: m.EnglishHomePage })));
const EnglishCourseCatalogPage = lazy(() => import('../../features/english/pages/EnglishCourseCatalogPage').then((m) => ({ default: m.EnglishCourseCatalogPage })));
const EnglishLessonRunnerPage = lazy(() => import('../../features/english/pages/EnglishLessonRunnerPage').then((m) => ({ default: m.EnglishLessonRunnerPage })));
const EnglishPracticePage = lazy(() => import('../../features/english/pages/EnglishPracticePage').then((m) => ({ default: m.EnglishPracticePage })));
const EnglishGrammarReferencePage = lazy(() => import('../../features/english/pages/EnglishGrammarReferencePage').then((m) => ({ default: m.EnglishGrammarReferencePage })));
const EnglishReadingPage = lazy(() => import('../../features/english/pages/EnglishReadingPage').then((m) => ({ default: m.EnglishReadingPage })));
const EnglishListeningPage = lazy(() => import('../../features/english/pages/EnglishListeningPage').then((m) => ({ default: m.EnglishListeningPage })));
const EnglishWritingPage = lazy(() => import('../../features/english/pages/EnglishWritingPage').then((m) => ({ default: m.EnglishWritingPage })));
const EnglishDailyRoutinePage = lazy(() => import('../../features/english/pages/EnglishDailyRoutinePage').then((m) => ({ default: m.EnglishDailyRoutinePage })));
const EnglishSpeakingPronunciationPage = lazy(() => import('../../features/english/pages/EnglishSpeakingPronunciationPage').then((m) => ({ default: m.EnglishSpeakingPronunciationPage })));
const EnglishPlacementPage = lazy(() => import('../../features/english/pages/EnglishPlacementPage').then((m) => ({ default: m.EnglishPlacementPage })));
const EnglishProgressPage = lazy(() => import('../../features/english/pages/EnglishProgressPage').then((m) => ({ default: m.EnglishProgressPage })));
const EnglishStudyPlanPage = lazy(() => import('../../features/english/pages/EnglishStudyPlanPage').then((m) => ({ default: m.EnglishStudyPlanPage })));

// Shared Dictionary Feature
const DictionaryPage = lazy(() => import('../../features/dictionary/DictionaryPage').then((m) => ({ default: m.DictionaryPage })));
const DictionaryEntryPage = lazy(() => import('../../features/dictionary/DictionaryEntryPage').then((m) => ({ default: m.DictionaryEntryPage })));
import { useTapToLookup } from '../../features/dictionary/hooks/useTapToLookup';
import { TapToLookupPopover } from '../../features/dictionary/components/TapToLookupPopover';

function RouteLoadingFallback() {
  return (
    <>
      <TopProgressBar isLoading={true} />
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <Loader variant="page" message="Loading practice module..." showTip={true} />
      </div>
    </>
  );
}

// Param-Preserving Backward-Compatibility Redirect Components
function LegacyReadingTestRedirect() {
  const { testId } = useParams();
  return <Navigate to={`/app/ielts/practice/reading/test/${testId}`} replace />;
}

function LegacyReadingResultsRedirect() {
  const { attemptId } = useParams();
  return <Navigate to={`/app/ielts/practice/reading/results/${attemptId}`} replace />;
}

function LegacyListeningTestRedirect() {
  const { testId } = useParams();
  return <Navigate to={`/app/ielts/practice/listening/test/${testId}`} replace />;
}

function LegacyListeningResultsRedirect() {
  const { attemptId } = useParams();
  return <Navigate to={`/app/ielts/practice/listening/results/${attemptId}`} replace />;
}

function LegacyWritingPromptRedirect() {
  const { promptId } = useParams();
  return <Navigate to={`/app/ielts/practice/writing/prompt/${promptId}`} replace />;
}

function LegacyWritingSubmissionRedirect() {
  const { submissionId } = useParams();
  return <Navigate to={`/app/ielts/practice/writing/submission/${submissionId}`} replace />;
}

function LegacySpeakingResultsRedirect() {
  const { sessionId } = useParams();
  return <Navigate to={`/app/ielts/practice/speaking/results/${sessionId}`} replace />;
}

function LegacyGrammarLessonRedirect() {
  const { lessonId } = useParams();
  return <Navigate to={`/app/ielts/grammar/lesson/${lessonId}`} replace />;
}

export function StudentApp() {
  const { profile, isLoadingProfile } = useAppStore();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [maintenance, setMaintenance] = useState(() => settingsStore.getMaintenance());
  const { lookupPosition, closeLookup } = useTapToLookup();

  useEffect(() => {
    return settingsStore.subscribe(() => {
      setMaintenance(settingsStore.getMaintenance());
    });
  }, []);

  useEffect(() => {
    if (!isLoadingProfile) {
      const isGuest = typeof window !== 'undefined' && localStorage.getItem('zarii_guest_mode') === 'true';
      if (!profile || !profile.onboardingCompleted) {
        // Do not trap guests who explicitly opted into explore mode
        if (!isGuest) {
          setShowOnboarding(true);
        } else {
          setShowOnboarding(false);
        }
      } else {
        setShowOnboarding(false);
      }
    }
  }, [isLoadingProfile, profile]);

  if (maintenance.enabled) {
    return (
      <MaintenanceScreen
        message={maintenance.message}
        estimatedReturnTime={maintenance.estimatedReturnTime}
      />
    );
  }

  return (
    <>
      <OnboardingModal
        isOpen={showOnboarding}
        onFinish={() => setShowOnboarding(false)}
      />
      <TapToLookupPopover
        position={lookupPosition}
        onClose={closeLookup}
      />

      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          {/* Fullscreen Mock Exam Runner */}
          <Route path="ielts/mock/exam/:mockId" element={<MockExamRunner />} />
          <Route path="mock/exam/:mockId" element={<MockExamRunner />} />

          {/* Fullscreen Focus English Lesson Player & Unit Tests */}
          <Route path="english/lesson/:lessonId" element={<EnglishLessonRunnerPage />} />
          <Route path="english/course/lesson/:lessonId" element={<EnglishLessonRunnerPage />} />
          <Route path="english/unit-test/:unitId" element={<EnglishLessonRunnerPage />} />
          <Route path="english/unit-review/:unitId" element={<EnglishLessonRunnerPage />} />

          {/* Standard Student Portal Layout (under /app/*) */}
          <Route element={<AppShell />}>
            {/* Unified Home */}
            <Route path="" element={<HomePage />} />
            <Route path="ielts" element={<HomePage />} />

            {/* IELTS Track Routes (/app/ielts/*) */}
            <Route path="ielts/practice" element={<PracticePage />} />
            <Route path="ielts/practice/smart" element={<Navigate to="/app/ielts/practice?tab=smart" replace />} />
            <Route path="ielts/mistakes" element={<Navigate to="/app/progress?tab=mistakes" replace />} />
            <Route path="ielts/lessons" element={<QuestionLessonsPage />} />
            <Route path="ielts/strategies" element={<QuestionLessonsPage />} />
            <Route path="ielts/weekly-review" element={<Navigate to="/app/progress?tab=weekly-review" replace />} />
            <Route path="ielts/achievements" element={<Navigate to="/app/progress?tab=achievements" replace />} />
            <Route path="ielts/badges" element={<Navigate to="/app/progress?tab=achievements" replace />} />
            <Route path="ielts/habits" element={<Navigate to="/app/progress?tab=achievements" replace />} />
            <Route path="ielts/practice/reading" element={<ReadingPage />} />
            <Route path="ielts/practice/reading/test/:testId" element={<ReadingTestRunner />} />
            <Route path="ielts/practice/reading/results/:attemptId" element={<ReadingResultsPage />} />
            <Route path="ielts/practice/listening" element={<ListeningPage />} />
            <Route path="ielts/practice/listening/test/:testId" element={<ListeningTestRunner />} />
            <Route path="ielts/practice/listening/results/:attemptId" element={<ListeningResultsPage />} />
            <Route path="ielts/practice/writing" element={<WritingPage />} />
            <Route path="ielts/practice/writing/prompt/:promptId" element={<WritingEditor />} />
            <Route path="ielts/practice/writing/submission/:submissionId" element={<WritingFeedbackPage />} />
            <Route path="ielts/practice/speaking" element={<SpeakingPage />} />
            <Route path="ielts/practice/speaking/mock" element={<SpeakingMockRunner />} />
            <Route path="ielts/practice/speaking/part1" element={<SpeakingPart1Practice />} />
            <Route path="ielts/practice/speaking/part2" element={<SpeakingPart2Practice />} />
            <Route path="ielts/practice/speaking/shadowing" element={<SpeakingShadowing />} />
            <Route path="ielts/practice/speaking/results/:sessionId" element={<SpeakingResultsPage />} />
            <Route path="ielts/mock" element={<MockPage />} />
            <Route path="ielts/vocab" element={<VocabPage />} />
            <Route path="ielts/vocab/flashcards" element={<VocabFlashcards />} />
            <Route path="ielts/vocab/quiz" element={<VocabQuiz />} />
            <Route path="ielts/vocab/bank" element={<Navigate to="/app/word-bank" replace />} />
            <Route path="ielts/vocab/phrases" element={<PhraseBankPage />} />
            <Route path="ielts/grammar" element={<Navigate to="/app/ielts/vocab?tab=grammar" replace />} />
            <Route path="ielts/grammar/lesson/:lessonId" element={<GrammarLessonRunner />} />
            <Route path="ielts/diagnostic" element={<DiagnosticPage />} />
            <Route path="ielts/dashboard" element={<Navigate to="/app/progress" replace />} />
            <Route path="ielts/plan" element={<PlanPage />} />

            {/* English Course Track Routes (/app/english/*) */}
            <Route path="english" element={<EnglishHomePage />} />
            <Route path="english/daily" element={<EnglishDailyRoutinePage />} />
            <Route path="english/course" element={<EnglishCourseCatalogPage />} />
            <Route path="english/placement" element={<EnglishPlacementPage />} />
            <Route path="english/practice" element={<EnglishPracticePage />} />
            <Route path="english/reading" element={<EnglishReadingPage />} />
            <Route path="english/reading/:readerId" element={<EnglishReadingPage />} />
            <Route path="english/listening" element={<EnglishListeningPage />} />
            <Route path="english/listening/:trackId" element={<EnglishListeningPage />} />
            <Route path="english/speaking" element={<EnglishSpeakingPronunciationPage />} />
            <Route path="english/writing" element={<EnglishWritingPage />} />
            <Route path="english/writing/:taskId" element={<EnglishWritingPage />} />
            <Route path="english/grammar" element={<EnglishGrammarReferencePage />} />
            <Route path="english/progress" element={<EnglishProgressPage />} />
            <Route path="english/plan" element={<EnglishStudyPlanPage />} />
            <Route path="english/skills" element={<Navigate to="/app/english/reading" replace />} />

            {/* Shared Pages */}
            <Route path="dictionary" element={<DictionaryPage />} />
            <Route path="dictionary/:word" element={<DictionaryEntryPage />} />
            <Route path="word-bank" element={<PersonalWordBank />} />
            <Route path="progress" element={<DashboardPage />} />
            <Route path="dashboard" element={<Navigate to="/app/progress" replace />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<Navigate to="/app/settings" replace />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="design-system" element={<DesignSystemPage />} />

            {/* Permanent Backward-Compatibility Redirects from Old URLs */}
            <Route path="practice" element={<Navigate to="/app/ielts/practice" replace />} />
            <Route path="practice/smart" element={<Navigate to="/app/ielts/practice?tab=smart" replace />} />
            <Route path="practice/reading" element={<Navigate to="/app/ielts/practice/reading" replace />} />
            <Route path="practice/reading/test/:testId" element={<LegacyReadingTestRedirect />} />
            <Route path="practice/reading/results/:attemptId" element={<LegacyReadingResultsRedirect />} />
            <Route path="practice/listening" element={<Navigate to="/app/ielts/practice/listening" replace />} />
            <Route path="practice/listening/test/:testId" element={<LegacyListeningTestRedirect />} />
            <Route path="practice/listening/results/:attemptId" element={<LegacyListeningResultsRedirect />} />
            <Route path="practice/writing" element={<Navigate to="/app/ielts/practice/writing" replace />} />
            <Route path="practice/writing/prompt/:promptId" element={<LegacyWritingPromptRedirect />} />
            <Route path="practice/writing/submission/:submissionId" element={<LegacyWritingSubmissionRedirect />} />
            <Route path="practice/speaking" element={<Navigate to="/app/ielts/practice/speaking" replace />} />
            <Route path="practice/speaking/mock" element={<Navigate to="/app/ielts/practice/speaking/mock" replace />} />
            <Route path="practice/speaking/part1" element={<Navigate to="/app/ielts/practice/speaking/part1" replace />} />
            <Route path="practice/speaking/part2" element={<Navigate to="/app/ielts/practice/speaking/part2" replace />} />
            <Route path="practice/speaking/shadowing" element={<Navigate to="/app/ielts/practice/speaking/shadowing" replace />} />
            <Route path="practice/speaking/results/:sessionId" element={<LegacySpeakingResultsRedirect />} />
            <Route path="mock" element={<Navigate to="/app/ielts/mock" replace />} />
            <Route path="vocab" element={<Navigate to="/app/ielts/vocab" replace />} />
            <Route path="vocab/flashcards" element={<Navigate to="/app/ielts/vocab/flashcards" replace />} />
            <Route path="vocab/quiz" element={<Navigate to="/app/ielts/vocab/quiz" replace />} />
            <Route path="vocab/bank" element={<Navigate to="/app/word-bank" replace />} />
            <Route path="vocab/phrases" element={<Navigate to="/app/ielts/vocab/phrases" replace />} />
            <Route path="grammar" element={<Navigate to="/app/ielts/vocab?tab=grammar" replace />} />
            <Route path="grammar/lesson/:lessonId" element={<LegacyGrammarLessonRedirect />} />
            <Route path="plan" element={<Navigate to="/app/ielts/plan" replace />} />
            <Route path="diagnostic" element={<Navigate to="/app/ielts/diagnostic" replace />} />
            <Route path="mistakes" element={<Navigate to="/app/progress?tab=mistakes" replace />} />
            <Route path="lessons" element={<Navigate to="/app/ielts/lessons" replace />} />
            <Route path="strategies" element={<Navigate to="/app/ielts/strategies" replace />} />
            <Route path="weekly-review" element={<Navigate to="/app/progress?tab=weekly-review" replace />} />
            <Route path="achievements" element={<Navigate to="/app/progress?tab=achievements" replace />} />
            <Route path="badges" element={<Navigate to="/app/progress?tab=achievements" replace />} />
            <Route path="habits" element={<Navigate to="/app/progress?tab=achievements" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default StudentApp;
