import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { ZariiLogo } from '../ui/ZariiLogo';
import { LandingFooter } from '../../landing/components/LandingFooter';
import { useAppStore } from '../../store/useAppStore';

interface PublicInfoLayoutProps {
  children: React.ReactNode;
}

export function PublicInfoLayout({ children }: PublicInfoLayoutProps) {
  const { theme, setTheme } = useAppStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] dark:bg-[#0B1612] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-[#5BB78D]/30 selection:text-[#124F40]">
      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-40 h-[72px] bg-white/90 dark:bg-[#112019]/90 backdrop-blur-md border-b border-slate-200/60 dark:border-white/5 transition-colors">
        <div className="max-w-[1200px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Brand Logo & Back to Home */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-lg p-1"
              aria-label="Zarii Home"
            >
              <ZariiLogo variant="mark-wordmark" size="md" />
            </Link>

            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D] cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="h-9 sm:h-10 px-3.5 sm:px-4 text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 rounded-xl transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="h-9 sm:h-10 px-4 sm:px-5 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {children}
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
