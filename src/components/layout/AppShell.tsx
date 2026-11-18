import { Outlet, useLocation, Link } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { ToastContainer } from '../ui/Toast';
import { CommandPalette } from '../ui/CommandPalette';
import { ProductTour } from '../tour/ProductTour';
import { FeedbackWidget } from '../feedback/FeedbackWidget';
import { StudentAnnouncementBanner } from '../announcements/StudentAnnouncementBanner';
import { ZariiLogo } from '../ui/ZariiLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';

export function AppShell() {
  const location = useLocation();
  const { sidebarCollapsed } = useAppStore();

  // Full-screen CD-IELTS exam runners require dedicated viewport isolation without portal bars
  const isExamRunner =
    location.pathname.includes('/practice/reading/test/') ||
    location.pathname.includes('/practice/listening/test/') ||
    location.pathname.includes('/practice/writing/prompt/') ||
    location.pathname.includes('/practice/speaking/mock') ||
    location.pathname.includes('/mock/exam/');

  if (isExamRunner) {
    return (
      <div className="h-[100dvh] w-full bg-[#F7FAF8] dark:bg-[#0B1612] text-slate-900 dark:text-slate-100 overflow-hidden flex flex-col m-0 p-0">
        <main id="main-content" role="main" className="flex-1 w-full h-full overflow-hidden">
          <Outlet />
        </main>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="app-shell h-[100dvh] w-full flex bg-[#F7FAF8] dark:bg-[#0B1612] text-slate-900 dark:text-slate-100 overflow-hidden m-0 p-0 relative">
      {/* Skip to Main Content Link for Keyboard / Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#124F40] focus:text-white focus:rounded-xl focus:shadow-xl focus:font-bold focus:text-sm focus:outline-none focus:ring-2 focus:ring-[#5BB78D] transition-all"
      >
        Skip to main content
      </a>

      {/* Fixed Sidebar: touching top: 0, left: 0, bottom: 0 (100dvh) */}
      <Sidebar />

      {/* Right Content Column: starts directly at sidebar's right edge, height: 100dvh */}
      <div
        className={cn(
          'flex-1 flex flex-col h-[100dvh] min-w-0 overflow-hidden transition-all duration-200',
          sidebarCollapsed ? 'md:pl-[72px]' : 'md:pl-64'
        )}
      >
        <TopBar />
        <StudentAnnouncementBanner />

        {/* Scrollable Main Content Area: only this area scrolls */}
        <main
          id="main-content"
          role="main"
          tabIndex={-1}
          className="flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 focus:outline-none [scrollbar-gutter:stable]"
        >
          <div className="max-w-6xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="w-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>

            {/* Global Portal Footer with Disclaimers and Policies */}
            <footer className="mt-12 pt-6 pb-6 border-t border-slate-200/80 dark:border-[#24392F] flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-brand-neutral-muted dark:text-brand-dark-muted">
              <div className="flex items-center gap-3">
                <ZariiLogo variant="full" size="sm" />
                <div>
                  <span>Zarii: IELTS Preparation &bull; 100% Free &amp; Offline-Ready</span>
                  <span className="hidden md:inline text-brand-neutral-muted/80"> &bull; Scores are diagnostic estimates</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-brand-neutral-muted dark:text-brand-dark-muted font-medium">
                <Link to="/about" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">About</Link>
                <Link to="/privacy" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">Terms</Link>
                <Link to="/faq" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">FAQ</Link>
                <Link to="/contact" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">Contact</Link>
              </div>
            </footer>
          </div>
        </main>
      </div>

      <BottomNav />
      <ToastContainer />
      <CommandPalette />
      <ProductTour />
      <FeedbackWidget />
    </div>
  );
}
