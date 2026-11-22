import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ZariiLogo } from './components/ui/ZariiLogo';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { StudentAuthGuard } from './components/auth/StudentAuthGuard';
import { PublicInfoLayout } from './components/layout/PublicInfoLayout';
import { Loader, TopProgressBar } from './components/loader';
import { runMockAttemptsMigration } from './lib/mockMigration';
import { runTrackMigration } from './lib/trackMigration';

// Lazy-loaded code-split applications
const LandingPage = lazy(() => import('./landing/LandingPage'));
const StudentApp = lazy(() => import('./apps/student/StudentApp'));
const AdminApp = lazy(() => import('./apps/admin/AdminApp'));

// Lazy-loaded standalone auth pages
const LoginPage = lazy(() => import('./features/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const SignUpPage = lazy(() => import('./features/auth/SignUpPage').then((m) => ({ default: m.SignUpPage })));
const ForgotPasswordPage = lazy(() =>
  import('./features/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import('./features/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage }))
);
const VerifyEmailPage = lazy(() =>
  import('./features/auth/VerifyEmailPage').then((m) => ({ default: m.VerifyEmailPage }))
);

// Lazy-loaded public informational pages
const AboutPage = lazy(() => import('./features/info/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./features/info/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./features/info/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./features/info/TermsPage').then((m) => ({ default: m.TermsPage })));
const FaqPage = lazy(() => import('./features/info/FaqPage').then((m) => ({ default: m.FaqPage })));
const CreditsPage = lazy(() => import('./features/info/CreditsPage').then((m) => ({ default: m.CreditsPage })));

function RouteLoadingFallback({ message = 'Loading Zarii IELTS...' }: { message?: string }) {
  return (
    <>
      <TopProgressBar isLoading={true} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7FAF8] dark:bg-[#0B1612] transition-colors">
        <Loader variant="page" message={message} showTip={true} />
      </div>
    </>
  );
}

function AdminLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-400 select-none">
      <ZariiLogo variant="mark" size="md" className="opacity-90 animate-pulse" />
      <div className="h-0.5 w-32 bg-slate-800 rounded-full overflow-hidden relative">
        <div className="h-full w-16 bg-amber-400 rounded-full animate-mint-progress" />
      </div>
      <span className="text-2xs font-mono font-bold tracking-widest text-slate-500 uppercase">
        Loading Admin Console...
      </span>
    </div>
  );
}

// Redirects legacy un-prefixed student URLs to the /app/* namespace preserving subpaths, searches, & hashes
function LegacyAppRedirect() {
  const location = useLocation();
  return <Navigate to={`/app${location.pathname}${location.search}${location.hash}`} replace />;
}

export default function App() {
  const { initialize } = useAppStore();

  useEffect(() => {
    initialize().finally(() => {
      runMockAttemptsMigration().catch(console.error);
      runTrackMigration().catch(console.error);
      if (typeof window !== 'undefined' && (window as any).__dismissZariiSplash) {
        (window as any).__dismissZariiSplash();
      }
    });
  }, [initialize]);

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        {/* 1. Public Landing Page at root / (Strictly code-split) */}
        <Route
          path="/"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Welcome to Zarii IELTS..." />}>
              <LandingPage />
            </Suspense>
          }
        />

        {/* 2. Standalone Full-Window Auth Pages */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading login..." />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading registration..." />}>
              <SignUpPage />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading password recovery..." />}>
              <ForgotPasswordPage />
            </Suspense>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading password reset..." />}>
              <ResetPasswordPage />
            </Suspense>
          }
        />
        <Route
          path="/verify-email"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Verifying email..." />}>
              <VerifyEmailPage />
            </Suspense>
          }
        />

        {/* 3. Public Informational & Legal Pages (No auth required) */}
        <Route
          path="/about"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading About Zarii..." />}>
              <PublicInfoLayout>
                <AboutPage />
              </PublicInfoLayout>
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading Contact..." />}>
              <PublicInfoLayout>
                <ContactPage />
              </PublicInfoLayout>
            </Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading Privacy Policy..." />}>
              <PublicInfoLayout>
                <PrivacyPage />
              </PublicInfoLayout>
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading Terms of Service..." />}>
              <PublicInfoLayout>
                <TermsPage />
              </PublicInfoLayout>
            </Suspense>
          }
        />
        <Route
          path="/faq"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading FAQs..." />}>
              <PublicInfoLayout>
                <FaqPage />
              </PublicInfoLayout>
            </Suspense>
          }
        />
        <Route
          path="/credits"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading Credits & Attributions..." />}>
              <PublicInfoLayout>
                <CreditsPage />
              </PublicInfoLayout>
            </Suspense>
          }
        />

        {/* 4. Lazy-Loaded Admin Portal (Isolated under /admin/*) */}
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminApp />
            </Suspense>
          }
        />

        {/* 5. Student Workspace Application (under /app/*, protected by session guard) */}
        <Route
          path="/app/*"
          element={
            <Suspense fallback={<RouteLoadingFallback message="Loading student workspace..." />}>
              <StudentAuthGuard>
                <StudentApp />
              </StudentAuthGuard>
            </Suspense>
          }
        />

        {/* 6. Backward-Compatibility Redirects: Un-prefixed legacy URLs -> /app/* */}
        <Route path="/practice/*" element={<LegacyAppRedirect />} />
        <Route path="/mock/*" element={<LegacyAppRedirect />} />
        <Route path="/vocab/*" element={<LegacyAppRedirect />} />
        <Route path="/grammar/*" element={<Navigate to="/app/vocab?tab=grammar" replace />} />
        <Route path="/grammar" element={<Navigate to="/app/vocab?tab=grammar" replace />} />
        <Route path="/diagnostic" element={<LegacyAppRedirect />} />
        <Route path="/dashboard" element={<LegacyAppRedirect />} />
        <Route path="/progress" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/plan" element={<LegacyAppRedirect />} />
        <Route path="/settings" element={<LegacyAppRedirect />} />
        <Route path="/profile" element={<Navigate to="/app/settings" replace />} />
        <Route path="/mistakes" element={<Navigate to="/app/dashboard?tab=mistakes" replace />} />
        <Route path="/lessons" element={<LegacyAppRedirect />} />
        <Route path="/strategies" element={<LegacyAppRedirect />} />
        <Route path="/weekly-review" element={<Navigate to="/app/dashboard?tab=weekly-review" replace />} />
        <Route path="/achievements" element={<Navigate to="/app/dashboard?tab=achievements" replace />} />
        <Route path="/badges" element={<Navigate to="/app/dashboard?tab=achievements" replace />} />
        <Route path="/habits" element={<Navigate to="/app/dashboard?tab=achievements" replace />} />
        <Route path="/design-system" element={<LegacyAppRedirect />} />
        <Route path="/welcome" element={<Navigate to="/app" replace />} />
        <Route path="/landing" element={<Navigate to="/" replace />} />

        {/* Catch-all: Route unrecognized top-level routes to /app */}
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}
