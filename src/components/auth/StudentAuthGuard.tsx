import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAppStore } from '../../store/useAppStore';
import { ZariiLogo } from '../ui/ZariiLogo';
import { Loader } from '../loader';

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
    return <Loader variant="splash" message="Verifying student session..." showTip={true} />;
  }

  if (!isAuthenticated) {
    // Preserve requested path, query params, and hash for redirection after login
    const targetUrl = location.pathname + location.search + location.hash;
    return <Navigate to={`/login?redirect=${encodeURIComponent(targetUrl)}`} replace />;
  }

  return <>{children}</>;
}
