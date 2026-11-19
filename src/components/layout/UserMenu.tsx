import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  Laptop,
  Check,
  AlertTriangle,
  ChevronUp,
  MoreVertical,
  Shield,
  Sparkles,
} from 'lucide-react';
import { supabase, type AuthUser } from '../../lib/supabase';
import { useAppStore } from '../../store/useAppStore';
import { formatBand, cn } from '../../lib/utils';
import { db } from '../../lib/db';
import { extractCandidateName } from '../../shared/utils/candidateUtils';

interface UserMenuProps {
  variant?: 'sidebar' | 'topbar' | 'mobile';
  collapsed?: boolean;
  isAdmin?: boolean;
  className?: string;
}

export function UserMenu({
  variant = 'topbar',
  collapsed = false,
  isAdmin = false,
  className,
}: UserMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, theme, setTheme, resolvedTheme, addToast } = useAppStore();

  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isExamInProgress, setIsExamInProgress] = useState(false);
  const [keepDeviceData, setKeepDeviceData] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);

  // Check auth user and guest status
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setAuthUser(data.user);
      const guestStored = localStorage.getItem('zarii_guest_mode') === 'true';
      setIsGuest(!data.user && guestStored);
    });

    const { data: authSub } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthUser(session?.user || null);
      if (event === 'SIGNED_OUT') {
        const guestStored = localStorage.getItem('zarii_guest_mode') === 'true';
        setIsGuest(guestStored);
        // If not in guest mode and on protected route, redirect to login
        if (!guestStored && !location.pathname.startsWith('/login') && !location.pathname.startsWith('/signup') && !location.pathname.startsWith('/welcome')) {
          navigate('/login', { replace: true });
        }
      }
    });

    return () => {
      authSub.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation inside menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    const availableItems = itemsRef.current.filter(Boolean);
    if (!availableItems.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const next = prev + 1 >= availableItems.length ? 0 : prev + 1;
        availableItems[next]?.focus();
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const next = prev - 1 < 0 ? availableItems.length - 1 : prev - 1;
        availableItems[next]?.focus();
        return next;
      });
    }
  };

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
    setFocusedIndex(-1);
  };

  const initiateLogout = () => {
    setIsOpen(false);
    // Check if currently inside an exam runner
    const inExam =
      location.pathname.startsWith('/practice/reading/test/') ||
      location.pathname.startsWith('/practice/listening/test/') ||
      location.pathname.startsWith('/practice/writing/prompt/') ||
      location.pathname.startsWith('/practice/speaking/mock') ||
      location.pathname.startsWith('/mock/exam/');

    setIsExamInProgress(inExam);
    setShowConfirmLogout(true);
  };

  const executeLogout = async () => {
    try {
      if (!keepDeviceData) {
        // Clear local exam attempts if user opted out
        await db.attempts.clear().catch(() => {});
        await db.writingSubmissions.clear().catch(() => {});
        await db.speakingSessions.clear().catch(() => {});
      }

      localStorage.removeItem('zarii_guest_mode');
      await supabase.auth.signOut();

      setShowConfirmLogout(false);
      addToast({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been logged out',
      });
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/', { replace: true });
    }
  };

  const handleExitGuestMode = () => {
    setIsOpen(false);
    localStorage.removeItem('zarii_guest_mode');
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been logged out',
    });
    navigate('/', { replace: true });
  };

  const userMetaName =
    authUser?.user_metadata?.full_name ||
    authUser?.user_metadata?.name ||
    authUser?.user_metadata?.display_name;

  const fallbackEmailName = authUser?.email
    ? authUser.email
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .split(' ')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : undefined;

  const candidateResolved = extractCandidateName(authUser, profile?.displayName);

  const displayName: string = isAdmin
    ? 'Administrator'
    : isGuest
    ? (candidateResolved || 'Guest Scholar')
    : candidateResolved ||
      userMetaName ||
      fallbackEmailName ||
      'Candidate';

  const emailDisplay: string = isAdmin
    ? 'admin@zarii.internal'
    : isGuest
    ? 'Guest (Local only)'
    : authUser?.email || 'student@zarii.app';

  const initials = isAdmin
    ? 'AD'
    : displayName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'C';

  return (
    <div className={cn('relative', className)} ref={menuRef} onKeyDown={handleKeyDown}>
      {/* Trigger Button by Variant */}
      {variant === 'sidebar' ? (
        collapsed ? (
          <button
            ref={triggerRef}
            onClick={handleTriggerClick}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label="User Account Menu"
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#124F40] to-[#1E7A62] text-white font-bold text-xs flex items-center justify-center hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:ring-offset-2 dark:focus:ring-offset-[#112019]"
          >
            {initials}
          </button>
        ) : (
          <button
            ref={triggerRef}
            onClick={handleTriggerClick}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label="User Account Menu"
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#112019] hover:bg-slate-50 dark:hover:bg-[#172b22] transition-all text-left group focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#124F40] to-[#1E7A62] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {displayName}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {isGuest ? 'Guest (Local only)' : emailDisplay}
                </div>
              </div>
            </div>
            <ChevronUp
              className={cn(
                'w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform shrink-0',
                isOpen && 'rotate-180'
              )}
            />
          </button>
        )
      ) : (
        /* TopBar or Mobile Trigger */
        <button
          ref={triggerRef}
          onClick={handleTriggerClick}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="User Account Menu"
          className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#124F40] to-[#1E7A62] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
            {initials}
          </div>
          <span className="hidden lg:inline text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
            {displayName}
          </span>
        </button>
      )}

      {/* Dropdown Menu Container */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={cn(
            'absolute z-50 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xl p-2 animate-in fade-in zoom-in-95 duration-150 select-none text-[#12211B] dark:text-[#E8F2EC]',
            variant === 'sidebar'
              ? (collapsed ? 'left-16 bottom-0 w-64 mb-0' : 'bottom-full mb-2 left-0 w-full min-w-[230px]')
              : 'top-full mt-2 right-0 w-64'
          )}
        >
          {/* Menu Header Card */}
          <div className="p-3 bg-slate-50 dark:bg-[#172b22] rounded-xl mb-1.5 border border-slate-100 dark:border-[#24392F]/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {displayName}
              </span>
              {isAdmin ? (
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Admin
                </span>
              ) : isGuest ? (
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-100 text-[#124F40] dark:bg-[#124F40] dark:text-[#5BB78D]">
                  Guest
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#5BB78D]/15 text-[#1E7A62] dark:text-[#5BB78D]">
                  Band {formatBand(profile?.targetBand || 7.5)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {emailDisplay}
            </p>
            {isGuest && (
              <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 leading-tight font-medium">
                Progress is saved on this device only.
              </p>
            )}
          </div>

          {/* Navigation Links */}
          <div className="space-y-0.5 text-xs font-medium">
            <Link
              to="/settings?tab=profile"
              onClick={() => setIsOpen(false)}
              role="menuitem"
              tabIndex={0}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1a3328] transition-colors focus:bg-slate-100 dark:focus:bg-[#1a3328] focus:outline-none"
            >
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Profile &amp; Goal</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              role="menuitem"
              tabIndex={0}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1a3328] transition-colors focus:bg-slate-100 dark:focus:bg-[#1a3328] focus:outline-none"
            >
              <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Settings</span>
            </Link>

            <Link
              to="/faq"
              onClick={() => setIsOpen(false)}
              role="menuitem"
              tabIndex={0}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1a3328] transition-colors focus:bg-slate-100 dark:focus:bg-[#1a3328] focus:outline-none"
            >
              <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Help &amp; Feedback</span>
            </Link>

            {/* Theme Toggle Submenu */}
            <div className="px-3 py-2 rounded-xl flex items-center justify-between text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#172b22] border-t border-slate-100 dark:border-[#24392F]/60 mt-1 pt-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Theme
              </span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#0B1612] p-0.5 rounded-lg border border-slate-200 dark:border-[#24392F]">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={cn(
                    'p-1 rounded text-xs transition-colors',
                    theme === 'light'
                      ? 'bg-white dark:bg-[#172b22] text-[#124F40] dark:text-[#5BB78D] shadow-2xs font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  )}
                  title="Light mode"
                  aria-label="Light mode"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'p-1 rounded text-xs transition-colors',
                    theme === 'dark'
                      ? 'bg-white dark:bg-[#172b22] text-[#124F40] dark:text-[#5BB78D] shadow-2xs font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  )}
                  title="Dark mode"
                  aria-label="Dark mode"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('system')}
                  className={cn(
                    'p-1 rounded text-xs transition-colors',
                    theme === 'system'
                      ? 'bg-white dark:bg-[#172b22] text-[#124F40] dark:text-[#5BB78D] shadow-2xs font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  )}
                  title="System theme"
                  aria-label="System theme"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-[#24392F] my-1 pt-1" />

          {/* Conditional Guest Mode vs Logged In Actions */}
          {isGuest ? (
            <div className="space-y-1 pt-0.5">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                role="menuitem"
                tabIndex={0}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:bg-brand-50 dark:hover:bg-[#1a3328] transition-colors focus:outline-none"
              >
                <LogIn className="w-4 h-4" />
                <span>Log in to existing account</span>
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                role="menuitem"
                tabIndex={0}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#124F40] hover:bg-[#0E3D32] shadow-2xs transition-colors focus:outline-none justify-center"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create free account</span>
              </Link>

              <button
                type="button"
                onClick={handleExitGuestMode}
                role="menuitem"
                tabIndex={0}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:underline justify-center mt-1"
              >
                Exit guest mode
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={initiateLogout}
              role="menuitem"
              tabIndex={0}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors focus:bg-rose-50 dark:focus:bg-rose-950/40 focus:outline-none"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          )}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showConfirmLogout && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isExamInProgress ? 'Unfinished Test In Progress' : 'Log Out Confirmation'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isExamInProgress
                    ? 'You have an unfinished test in progress. Are you sure you want to log out?'
                    : 'Are you sure you want to log out of your Zarii account?'}
                </p>
              </div>
            </div>

            {/* Sync retention option for non-guests */}
            {!isGuest && (
              <div className="pt-2 border-t border-slate-100 dark:border-[#24392F]/60">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={keepDeviceData}
                    onChange={(e) => setKeepDeviceData(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#124F40] focus:ring-[#5BB78D]"
                  />
                  <span>
                    <strong>Keep my progress on this device</strong> (offline mock scores and vocabulary flashcards will stay saved locally).
                  </span>
                </label>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmLogout(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#172b22] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeLogout}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
