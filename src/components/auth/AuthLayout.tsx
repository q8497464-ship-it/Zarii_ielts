import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sun, Moon, ArrowLeft } from 'lucide-react';
import { ZariiLogo } from '../ui/ZariiLogo';
import { useAppStore } from '../../store/useAppStore';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeScreen?: 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'verify-email';
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { theme, setTheme, resolvedTheme } = useAppStore();

  const toggleTheme = () => {
    const nextTheme = (theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark')) ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col md:flex-row bg-[#F7FAF8] dark:bg-[#0B1612] text-[#12211B] dark:text-[#E8F2EC] overflow-hidden select-text">
      {/* Mobile Compact Top Bar (<768px): logo + one-line tagline */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#124F40] to-[#0E3D32] text-white shadow-sm shrink-0 h-14">
        <Link to="/" className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-lg" aria-label="Zarii Home">
          <ZariiLogo variant="mark-wordmark" theme="dark" size="sm" />
          <span className="text-[11px] text-white/75 font-medium border-l border-white/20 pl-2 hidden xs:inline">
            IELTS Preparation
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-xs font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-md px-1.5 py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Desktop & Tablet Left Brand Panel (50% desktop, 40% tablet, 100vh) */}
      <section
        aria-label="Brand Overview"
        className="hidden md:flex md:w-[42%] lg:w-1/2 relative bg-gradient-to-b from-[#124F40] to-[#0E3D32] text-white flex-col justify-between p-10 md:p-12 lg:p-16 overflow-hidden shrink-0 select-none"
      >
        {/* Giant Logo Watermark on the side with ~80% showing on the green panel */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-20 lg:-right-24 xl:-right-28 pointer-events-none select-none opacity-[0.09] overflow-hidden">
          <img
            src="/brand/zarii-mark-white.svg"
            alt=""
            className="w-[500px] h-[500px] lg:w-[580px] lg:h-[580px] xl:w-[640px] xl:h-[640px] object-contain max-w-none"
          />
        </div>

        {/* Top: Large White Zarii Logo (Bigger & Highly Prominent) */}
        <div className="relative z-10 shrink-0">
          <Link
            to="/"
            className="inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-2xl p-1 -ml-1 transition-transform hover:scale-[1.02]"
            aria-label="Zarii Home"
          >
            <img
              src="/brand/zarii-logo-full-white.svg"
              alt="Zarii IELTS Preparation"
              className="h-20 sm:h-24 lg:h-28 w-auto object-contain drop-shadow-sm"
            />
          </Link>
        </div>

        {/* Middle: Clean, Simple Vertically Centered Block (Max-width 480px) */}
        <div className="relative z-10 w-full max-w-[480px] my-auto py-6 space-y-6">
          <div className="space-y-3">
            {/* High-contrast Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5BB78D]/15 text-[#5BB78D] text-xs font-bold uppercase tracking-wider">
              <span>Free Student Workspace</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-3xl lg:text-[42px] xl:text-[46px] font-bold text-white tracking-tight leading-[1.15]">
              Prepare for IELTS.<br />
              <span className="text-[#5BB78D]">Confidently.</span>
            </h1>

            {/* 2-line Subtext */}
            <p className="text-base lg:text-[18px] text-white/80 leading-[1.6] pt-1">
              The all-in-one free preparation workspace built for genuine examiner standards and high band scores.
            </p>
          </div>

          {/* 3 Core Benefit Points */}
          <ul className="space-y-4 pt-2 text-sm sm:text-base text-white/90">
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-[#5BB78D]/20 text-[#5BB78D] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span><strong className="text-white font-semibold">Free forever</strong> — complete library with no paywalls</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-[#5BB78D]/20 text-[#5BB78D] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span><strong className="text-white font-semibold">All four skills</strong> — Listening, Reading, Writing &amp; Speaking</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-[#5BB78D]/20 text-[#5BB78D] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span><strong className="text-white font-semibold">Personalised study plan</strong> — adaptive to your target band</span>
            </li>
          </ul>
        </div>

        {/* Bottom: Thin divider and 13px footer text */}
        <div className="relative z-10 pt-4 border-t border-white/10 text-[13px] text-white/70 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span>Free for every student. No credit card needed.</span>
          <span>&copy; {new Date().getFullYear()} Zarii</span>
        </div>
      </section>

      {/* Right Form Card Panel (50% desktop, 60% tablet, 100% mobile) */}
      <main className="flex-1 md:w-[58%] lg:w-1/2 flex flex-col justify-between relative h-full overflow-y-auto">
        {/* Top Right Controls & Back to Home */}
        <div className="flex items-center justify-between p-6 sm:p-8 lg:p-12 pb-0 shrink-0">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#124F40] dark:text-slate-400 dark:hover:text-[#5BB78D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-lg px-2 py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to home</span>
          </Link>
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-[#24392F] bg-white dark:bg-[#112019] text-slate-600 dark:text-[#9DB3A7] hover:text-[#124F40] dark:hover:text-[#5BB78D] hover:border-[#8ACFAE] dark:hover:border-[#5BB78D] transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Vertically Centered Form Container (Max 420px) */}
        <div className="w-full max-w-[420px] mx-auto px-6 py-6 my-auto flex flex-col justify-center">
          {children}
        </div>

        {/* Clean Sub-Footer */}
        <footer className="text-center py-4 px-6 text-[13px] text-[#5B6B63] dark:text-[#9DB3A7] shrink-0">
          <span>Zarii IELTS Preparation &bull; Diagnostic Estimates</span>
        </footer>
      </main>
    </div>
  );
}
