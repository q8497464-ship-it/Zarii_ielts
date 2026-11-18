import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Shield } from 'lucide-react';
import { ZariiLogo } from '../../components/ui/ZariiLogo';

interface AdminAuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AdminAuthLayout({ children, title, subtitle }: AdminAuthLayoutProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
    return false;
  });

  // Keep robots meta tag noindex, nofollow on all admin auth pages
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let created = false;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
      created = true;
    }
    const previousContent = meta.content;
    meta.content = 'noindex, nofollow';

    return () => {
      if (meta) {
        if (created) {
          meta.remove();
        } else {
          meta.content = previousContent || '';
        }
      }
    };
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between items-center p-4 sm:p-6 select-text overflow-hidden relative bg-gradient-to-b from-[#0E3D32] to-[#124F40]">
      {/* 1. Subtle Open-Book Line Pattern Background (3.5% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.038] mix-blend-overlay overflow-hidden select-none"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="open-book-pattern" width="120" height="80" patternUnits="userSpaceOnUse">
              {/* Left page contour */}
              <path
                d="M 10 40 Q 35 25, 60 38 L 60 70 Q 35 55, 10 68 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
              {/* Right page contour */}
              <path
                d="M 60 38 Q 85 25, 110 40 L 110 70 Q 85 55, 60 70 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
              {/* Spine line */}
              <line x1="60" y1="36" x2="60" y2="72" stroke="#5BB78D" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#open-book-pattern)" />
        </svg>
      </div>

      {/* 2. Top-Right Theme Toggle */}
      <div className="w-full max-w-6xl flex justify-end z-10">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-all backdrop-blur-xs border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-200" />}
        </button>
      </div>

      {/* 3. Centered Content Container */}
      <div className="w-full max-w-[400px] z-10 flex flex-col items-center my-auto px-1 sm:px-0">
        {/* Header above card */}
        <div className="flex flex-col items-center mb-5 text-center space-y-2 select-none">
          <div className="flex items-center gap-2">
            <ZariiLogo variant="mark" size="md" theme="dark" className="drop-shadow-sm" />
            <span className="text-xl font-bold tracking-tight text-white flex items-center">
              Zarii<span className="text-[#5BB78D] ml-0.5 text-2xl leading-none">.</span>
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-2xs font-bold uppercase tracking-wider bg-[#5BB78D]/20 text-[#5BB78D] border border-[#5BB78D]/30 backdrop-blur-xs">
            <Shield className="w-3 h-3" />
            Admin Console
          </div>
        </div>

        {/* White Form Card (Max Width 400px) */}
        <div className="w-full bg-white dark:bg-[#112019] rounded-2xl shadow-2xl p-6 sm:p-7 border border-white/15 dark:border-white/10 text-slate-900 dark:text-slate-100 transition-colors">
          {(title || subtitle) && (
            <div className="text-center mb-5 space-y-1">
              {title && (
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {children}
        </div>
      </div>

      {/* 4. Footer under card */}
      <div className="w-full max-w-[400px] text-center z-10 pb-2 space-y-1.5">
        <p className="text-2xs text-white/50 tracking-wide">
          Authorized personnel only. All activity is logged.
        </p>
        <div>
          <Link
            to="/welcome"
            className="text-2xs text-[#5BB78D] hover:text-[#78cfab] hover:underline font-semibold transition-colors"
          >
            Student login
          </Link>
        </div>
      </div>
    </div>
  );
}
