import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Loader2, Clock, Lock, Key, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { authApi } from '../../shared/api';
import type { UserRole } from '../../shared/types';
import { AdminAuthLayout } from './AdminAuthLayout';

interface AdminGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const WARNING_TIMEOUT_MS = 25 * 60 * 1000;    // 25 minutes warning threshold
const ABSOLUTE_SESSION_LIMIT_MS = 12 * 60 * 60 * 1000; // 12 hours absolute maximum
const ACTIVITY_STORAGE_KEY = 'zarii_admin_last_activity';

export function AdminGuard({ children, allowedRoles }: AdminGuardProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>('admin@zarii.app');
  const [adminName, setAdminName] = useState<string>('Admin');

  // Timeouts & Security Modals
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [showUnlockPassword, setShowUnlockPassword] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Auto-inject noindex, nofollow on all admin pages
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
        if (created) meta.remove();
        else meta.content = previousContent || '';
      }
    };
  }, []);

  const handleSignOut = useCallback(() => {
    authApi.signOut();
    sessionStorage.removeItem('zarii_admin_session');
    sessionStorage.removeItem(ACTIVITY_STORAGE_KEY);
    localStorage.removeItem('zarii_admin_auth');
    setIsAuthenticated(false);
    setUserRole(null);
  }, []);

  // Update activity timestamp
  const updateActivity = useCallback(() => {
    const now = Date.now();
    sessionStorage.setItem(ACTIVITY_STORAGE_KEY, String(now));
    setShowWarningModal(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function verifyAdminAuth() {
      try {
        const adminSessionRaw = sessionStorage.getItem('zarii_admin_session');
        const legacyAdminAuth = localStorage.getItem('zarii_admin_auth') === 'true';

        let detectedRole: UserRole | null = null;
        let sessionEmail = 'admin@zarii.app';
        let sessionName = 'Admin';
        let loginTime = 0;

        if (adminSessionRaw) {
          try {
            const parsed = JSON.parse(adminSessionRaw);
            if (parsed.role) detectedRole = parsed.role;
            if (parsed.email) sessionEmail = parsed.email;
            if (parsed.name) sessionName = parsed.name;
            if (parsed.loginTime) loginTime = Number(parsed.loginTime);
          } catch {}
        }

        // Check 12-hour absolute session expiration
        const now = Date.now();
        if (loginTime > 0 && now - loginTime > ABSOLUTE_SESSION_LIMIT_MS) {
          handleSignOut();
          if (isMounted) {
            navigate('/admin/login?reason=session_limit', { replace: true });
          }
          return;
        }

        // Check 30-minute inactivity timeout
        const lastActivity = Number(sessionStorage.getItem(ACTIVITY_STORAGE_KEY) || 0);
        if (lastActivity > 0 && now - lastActivity > INACTIVITY_TIMEOUT_MS) {
          if (isMounted) {
            setIsTimedOut(true);
            setIsChecking(false);
            setAdminEmail(sessionEmail);
            setAdminName(sessionName);
          }
          return;
        }

        const { data } = await authApi.getSession();
        const user = data.session?.user;

        if (user) {
          const profile = await authApi.getProfile(user.id);
          const role = profile?.role || (user.user_metadata?.role as UserRole) || detectedRole || 'student';
          if (isMounted) {
            setUserRole(role);
            setAdminEmail(user.email || sessionEmail);
            setAdminName(user.user_metadata?.full_name || sessionName);
            setIsAuthenticated(true);
            setIsChecking(false);
            sessionStorage.setItem(ACTIVITY_STORAGE_KEY, String(Date.now()));
          }
          return;
        }

        // Dev mode session
        if (legacyAdminAuth || detectedRole) {
          if (isMounted) {
            setUserRole(detectedRole || 'admin');
            setAdminEmail(sessionEmail);
            setAdminName(sessionName);
            setIsAuthenticated(true);
            setIsChecking(false);
            sessionStorage.setItem(ACTIVITY_STORAGE_KEY, String(Date.now()));
          }
          return;
        }

        if (isMounted) {
          setIsAuthenticated(false);
          setUserRole(null);
          setIsChecking(false);
        }
      } catch (err) {
        console.error('Admin authentication verification failed:', err);
        if (isMounted) {
          setIsAuthenticated(false);
          setIsChecking(false);
        }
      }
    }

    verifyAdminAuth();

    return () => {
      isMounted = false;
    };
  }, [handleSignOut, navigate]);

  // Monitor user activity and periodic timeout check
  useEffect(() => {
    if (!isAuthenticated || isTimedOut) return;

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    const throttledUpdate = () => {
      const now = Date.now();
      const last = Number(sessionStorage.getItem(ACTIVITY_STORAGE_KEY) || 0);
      if (now - last > 5000) {
        updateActivity();
      }
    };

    events.forEach((evt) => window.addEventListener(evt, throttledUpdate, { passive: true }));

    // Periodic check every 10 seconds
    const interval = setInterval(() => {
      const lastActivity = Number(sessionStorage.getItem(ACTIVITY_STORAGE_KEY) || 0);
      const elapsed = Date.now() - lastActivity;

      if (lastActivity > 0) {
        // Warning at 25 minutes
        if (elapsed >= WARNING_TIMEOUT_MS && elapsed < INACTIVITY_TIMEOUT_MS) {
          setShowWarningModal(true);
        }
        // Expiration lock at 30 minutes
        if (elapsed >= INACTIVITY_TIMEOUT_MS) {
          setIsTimedOut(true);
          setShowWarningModal(false);
        }
      }
    }, 10000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, throttledUpdate));
      clearInterval(interval);
    };
  }, [isAuthenticated, isTimedOut, updateActivity]);

  // Handle inline unlocking of timed-out session
  const handleUnlockSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unlockPassword || isUnlocking) return;

    setUnlockError(null);
    setIsUnlocking(true);

    try {
      const res = await authApi.authenticateAdmin(adminEmail, unlockPassword);
      if (res.success) {
        setIsTimedOut(false);
        setUnlockPassword('');
        sessionStorage.setItem(ACTIVITY_STORAGE_KEY, String(Date.now()));
        sessionStorage.setItem(
          'zarii_admin_session',
          JSON.stringify({
            role: res.role || userRole || 'admin',
            email: adminEmail,
            name: adminName,
            loginTime: Date.now(),
          })
        );
      } else {
        setUnlockError('Incorrect password. Please verify and try again.');
      }
    } catch {
      setUnlockError('Unable to unlock session. Please sign in again.');
    } finally {
      setIsUnlocking(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-400 select-none">
        <Loader2 className="w-6 h-6 animate-spin text-[#5BB78D]" />
        <span className="text-2xs font-mono tracking-wider uppercase text-slate-500">
          Verifying administrative credentials...
        </span>
      </div>
    );
  }

  // Session timed out due to 30-min inactivity -> In-situ Lock Screen
  if (isTimedOut) {
    return (
      <AdminAuthLayout
        title="Session expired"
        subtitle="For platform security, your session ended after 30 minutes of inactivity."
      >
        <form onSubmit={handleUnlockSession} className="space-y-4">
          <div className="flex flex-col items-center text-center space-y-1 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 flex items-center justify-center mb-1">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Welcome back, {adminName}
            </p>
            <p className="text-2xs text-slate-500 dark:text-slate-400 font-mono">
              {adminEmail}
            </p>
          </div>

          {unlockError && (
            <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs">
              {unlockError}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="unlock-pass" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Enter password to unlock
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="unlock-pass"
                type={showUnlockPassword ? 'text' : 'password'}
                required
                autoFocus
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowUnlockPassword(!showUnlockPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showUnlockPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUnlocking || !unlockPassword}
            className="w-full py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] disabled:opacity-50 cursor-pointer"
          >
            {isUnlocking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#5BB78D]" />
                <span>Unlocking...</span>
              </>
            ) : (
              <span>Unlock and resume session</span>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                handleSignOut();
                window.location.href = '/admin/login';
              }}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors cursor-pointer"
            >
              Sign in with another account
            </button>
          </div>
        </form>
      </AdminAuthLayout>
    );
  }

  // Not logged in -> Redirect to admin login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Logged in as student -> Redirect to /admin/forbidden
  if (userRole !== 'admin' && userRole !== 'editor') {
    return <Navigate to="/admin/forbidden" replace />;
  }

  // Role check: If editor attempts to access admin-only section
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white dark:bg-[#112019] border border-amber-500/30 rounded-2xl p-8 space-y-4 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Editor Restriction</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This administrative section requires full Administrator clearance. As an Editor, your permissions are scoped to Content and Communication management.
            </p>
          </div>
          <div className="pt-2">
            <a
              href="/admin/content"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Go to Content Management
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}

      {/* 25-Minute Idle Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs select-none animate-zarii-fade">
          <div className="max-w-sm w-full bg-white dark:bg-[#112019] border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Inactivity Warning
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You will be signed out in <strong className="text-amber-600 dark:text-amber-400">5 minutes</strong> due to inactivity. Would you like to stay signed in?
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleSignOut}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Sign out
              </button>
              <button
                type="button"
                onClick={updateActivity}
                className="flex-1 py-2 px-3 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#5BB78D] cursor-pointer"
              >
                Stay signed in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
