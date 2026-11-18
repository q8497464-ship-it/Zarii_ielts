import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { AppShell } from '../../components/layout/AppShell';
import { OnboardingModal } from '../../features/onboarding/OnboardingModal';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import { settingsStore } from '../../shared/settings/settingsStore';
import { MaintenanceScreen } from '../../components/maintenance/MaintenanceScreen';

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

function RouteLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-brand-neutral-muted dark:text-brand-dark-muted">
      <ZariiLogo variant="mark" size="md" className="opacity-90 animate-pulse" />
      <div className="h-0.5 w-32 bg-brand-200 dark:bg-brand-dark-border rounded-full overflow-hidden relative">
        <div className="h-full w-16 bg-brand-400 rounded-full animate-mint-progress" />
      </div>
      <span className="text-2xs font-semibold tracking-wider uppercase text-brand-neutral-muted dark:text-brand-dark-muted">
        Loading module...
      </span>
    </div>
  );
}

export function StudentApp() {
  const { profile, isLoadingProfile } = useAppStore();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [maintenance, setMaintenance] = useState(() => settingsStore.getMaintenance());

  useEffect(() => {
    return settingsStore.subscribe(() => {
      setMaintenance(settingsStore.getMaintenance());
    });
  }, []);

  useEffect(() => {
    if (!isLoadingProfile) {
      if (!profile || !profile.onboardingCompleted) {
        setShowOnboarding(true);
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

      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          {/* Fullscreen Mock Exam Runner */}
          <Route path="mock/exam/:mockId" element={<MockExamRunner />} />

          {/* Standard Student Portal Layout (under /app/*) */}
          <Route element={<AppShell />}>
            <Route path="" element={<HomePage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="practice/smart" element={<Navigate to="/app/practice?tab=smart" replace />} />
            <Route path="mistakes" element={<Navigate to="/app/dashboard?tab=mistakes" replace />} />
            <Route path="lessons" element={<QuestionLessonsPage />} />
            <Route path="strategies" element={<QuestionLessonsPage />} />
            <Route path="weekly-review" element={<Navigate to="/app/dashboard?tab=weekly-review" replace />} />
            <Route path="achievements" element={<Navigate to="/app/dashboard?tab=achievements" replace />} />
            <Route path="badges" element={<Navigate to="/app/dashboard?tab=achievements" replace />} />
            <Route path="habits" element={<Navigate to="/app/dashboard?tab=achievements" replace />} />
            <Route path="practice/reading" element={<ReadingPage />} />
            <Route path="practice/reading/test/:testId" element={<ReadingTestRunner />} />
            <Route path="practice/reading/results/:attemptId" element={<ReadingResultsPage />} />
            <Route path="practice/listening" element={<ListeningPage />} />
            <Route path="practice/listening/test/:testId" element={<ListeningTestRunner />} />
            <Route path="practice/listening/results/:attemptId" element={<ListeningResultsPage />} />
            <Route path="practice/writing" element={<WritingPage />} />
            <Route path="practice/writing/prompt/:promptId" element={<WritingEditor />} />
            <Route path="practice/writing/submission/:submissionId" element={<WritingFeedbackPage />} />
            <Route path="practice/speaking" element={<SpeakingPage />} />
            <Route path="practice/speaking/mock" element={<SpeakingMockRunner />} />
            <Route path="practice/speaking/part1" element={<SpeakingPart1Practice />} />
            <Route path="practice/speaking/part2" element={<SpeakingPart2Practice />} />
            <Route path="practice/speaking/shadowing" element={<SpeakingShadowing />} />
            <Route path="practice/speaking/results/:sessionId" element={<SpeakingResultsPage />} />
            <Route path="mock" element={<MockPage />} />
            <Route path="vocab" element={<VocabPage />} />
            <Route path="vocab/flashcards" element={<VocabFlashcards />} />
            <Route path="vocab/quiz" element={<VocabQuiz />} />
            <Route path="vocab/bank" element={<PersonalWordBank />} />
            <Route path="vocab/phrases" element={<PhraseBankPage />} />
            <Route path="grammar" element={<Navigate to="/app/vocab?tab=grammar" replace />} />
            <Route path="grammar/lesson/:lessonId" element={<GrammarLessonRunner />} />
            <Route path="diagnostic" element={<DiagnosticPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="progress" element={<Navigate to="/app/dashboard" replace />} />
            <Route path="plan" element={<PlanPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<Navigate to="/app/settings" replace />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="design-system" element={<DesignSystemPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default StudentApp;
