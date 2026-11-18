import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAppStore } from '../../store/useAppStore';
import { ZariiLogo } from '../ui/ZariiLogo';

interface StudentAuthGuardProps {
  children: React.ReactNode;
}

export function StudentAuthGuard({ children }: StudentAuthGuardProps) {
  const location = useLocation();
  const { profile, isLoadingProfile } = useAppStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function evaluateAuth() {
      // 1. Guest mode in localStorage
      if (typeof window !== 'undefined' && localStorage.getItem('zarii_guest_mode') === 'true') {
        if (isMounted) setIsAuthenticated(true);
        return;
      }

      // 2. Active Supabase Auth Session
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          if (isMounted) setIsAuthenticated(true);
          return;
        }
      } catch {}

      // 3. Saved Profile in Dexie (local offline session)
      if (profile && profile.id) {
        if (isMounted) setIsAuthenticated(true);
        return;
      }

      if (isMounted) setIsAuthenticated(false);
    }

    if (!isLoadingProfile) {
      evaluateAuth();
    }

    return () => {
      isMounted = false;
    };
  }, [profile, isLoadingProfile]);

  if (isLoadingProfile || isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7FAF8] dark:bg-[#0B1612] text-slate-800 dark:text-slate-100 transition-colors">
        <div className="flex flex-col items-center animate-zarii-fade">
          <ZariiLogo variant="mark" size="xl" />
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="h-0.5 w-44 bg-teal-200 dark:bg-[#124F40]/50 rounded-full overflow-hidden relative">
              <div className="h-full w-20 bg-[#124F40] dark:bg-[#5BB78D] rounded-full animate-mint-progress" />
            </div>
            <span className="text-2xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Verifying student session...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve requested path, query params, and hash for redirection after login
    const targetUrl = location.pathname + location.search + location.hash;
    return <Navigate to={`/login?redirect=${encodeURIComponent(targetUrl)}`} replace />;
  }

  return <>{children}</>;
}
