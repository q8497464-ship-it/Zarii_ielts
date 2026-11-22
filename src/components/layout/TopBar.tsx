import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  Sparkles,
  SlidersHorizontal,
  WifiOff,
  Download,
  Search,
  Flame,
  Menu,
  X,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ZariiLogo } from '../ui/ZariiLogo';
import { formatBand } from '../../lib/utils';
import { subscribeToOnlineStatus } from '../../lib/pwa';
import { getStreakData, getLevelInfo, getUserXp } from '../../features/habits/habitEngine';
import { getPageTitle, getSidebarNavigation } from '../../routes';
import { settingsStore } from '../../shared/settings/settingsStore';
import { UserMenu } from './UserMenu';
import { SurpriseHeartButton } from '../../features/surprise';

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, profile, settings, textSize, setTextSize, setCommandPaletteOpen, currentTrack, setCurrentTrack } = useAppStore();
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [features, setFeatures] = useState(() => settingsStore.getFeatures());

  useEffect(() => {
    return settingsStore.subscribe(() => {
      setFeatures(settingsStore.getFeatures());
    });
  }, []);

  const englishEnabled = features.english_course_enabled;
  const dictionaryEnabled = features.dictionary_enabled;
  const effectiveTrack = englishEnabled ? currentTrack : 'ielts';
  const navGroups = getSidebarNavigation(effectiveTrack).map(group => {
    if (!dictionaryEnabled) {
      return {
        ...group,
        items: group.items.filter(item => item.path !== '/app/dictionary' && item.path !== '/app/word-bank')
      };
    }
    return group;
  }).filter(group => group.items.length > 0);

  const isGamificationEnabled = settings?.gamificationEnabled !== false;
  const streak = getStreakData();
  const userXp = getUserXp();
  const levelInfo = getLevelInfo(userXp);

  const pageInfo = getPageTitle(location.pathname);

  useEffect(() => {
    const unsubscribe = subscribeToOnlineStatus(setIsOnline);

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      unsubscribe();
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Close mobile drawer on route change or Escape key
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileDrawerOpen]);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const cycleTextSize = () => {
    if (textSize === 'normal') setTextSize('medium');
    else if (textSize === 'medium') setTextSize('large');
    else setTextSize('normal');
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md transition-colors dark:border-[#24392F] dark:bg-[#112019]/95">
        {/* Left Side: Desktop shows Breadcrumbs/Title; Mobile shows Logo + Drawer toggle */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Only: Hamburger trigger */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Only: Zarii Logo */}
          <Link to="/" className="flex md:hidden items-center gap-2 group" aria-label="Zarii Home">
            <ZariiLogo variant="mark-wordmark" size="sm" />
          </Link>

          {/* Desktop Only: Page Title / Breadcrumbs (NO duplicate logo on desktop!) */}
          <div className="hidden md:flex items-center gap-2 min-w-0">
            {pageInfo.category && (
              <>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {pageInfo.category}
                </span>
                <span className="text-slate-300 dark:text-slate-700">/</span>
              </>
            )}
            <h1 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white truncate">
              {pageInfo.title}
            </h1>
          </div>

          {/* Offline Indicator Pill */}
          {!isOnline && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold animate-pulse shrink-0">
              <WifiOff className="w-3.5 h-3.5" />
              Offline
            </span>
          )}
        </div>

        {/* Right Side: Target Band, Search, Streak, Theme, User Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Target Band Pill (hidden on very narrow screens to prevent cut-off) */}
          {profile && profile.onboardingCompleted && (
            <div className="hidden sm:inline-flex items-center gap-1.5">
              <Badge variant="teal" className="text-xs font-bold shrink-0">
                <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                Target: Band {formatBand(profile.targetBand)}
              </Badge>
            </div>
          )}

          {/* Command Palette Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 transition-all shadow-subtle group"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
            <span className="hidden lg:inline">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Gamification Streak (Desktop) */}
          {isGamificationEnabled && (
            <Link
              to="/dashboard?tab=achievements"
              className="hidden xl:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-amber-200/80 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/40 hover:bg-amber-100/70 dark:hover:bg-amber-900/50 text-xs transition-colors shadow-2xs group"
              title={`${streak.currentStreak}-day streak • ${levelInfo.name} Level ${levelInfo.level} (${userXp} XP)`}
            >
              <span className="flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400 font-mono">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                {streak.currentStreak}
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-amber-700 dark:group-hover:text-amber-300">
                {levelInfo.name}
              </span>
            </Link>
          )}

          {/* PWA Install Button */}
          {deferredPrompt && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleInstallApp}
              className="hidden md:inline-flex text-xs font-bold border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/50"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Install
            </Button>
          )}

          {/* Text Size Selector */}
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleTextSize}
            className="hidden md:inline-flex text-xs font-semibold px-2 h-9 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            title={`Font size: ${textSize}. Click to change`}
          >
            <span className="text-xs uppercase mr-0.5 opacity-70">Font:</span>
            {textSize === 'normal' ? 'A' : textSize === 'medium' ? 'A+' : 'A++'}
          </Button>

          {/* Surprise Heart Easter Egg Button (Quietly next to Theme Toggle) */}
          <SurpriseHeartButton />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="h-9 w-9 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-xl"
            title={`Current theme: ${theme}. Click to switch.`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Moon className="h-4 w-4 text-teal-400" />
            ) : theme === 'light' ? (
              <Sun className="h-4 w-4 text-amber-500" />
            ) : (
              <SlidersHorizontal className="h-4 w-4" />
            )}
          </Button>

          {/* User Account Controls Menu (Top-Right) */}
          <UserMenu variant="topbar" />
        </div>
      </header>

      {/* Mobile Drawer (No Duplicate Logo Header; Close Button + User Card) */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-50 md:hidden flex"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-950 h-full flex flex-col p-4 shadow-2xl z-10 border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-200">
            {/* Drawer Header with Close Button Only (NO second logo header) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close navigation"
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Track Switcher (When English Course is Enabled) */}
            {englishEnabled && (
              <div className="pt-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="p-1 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center gap-1 border border-gray-200/60 dark:border-neutral-700/60">
                  <button
                    onClick={() => {
                      setCurrentTrack('ielts');
                      setMobileDrawerOpen(false);
                      navigate('/app');
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      effectiveTrack === 'ielts'
                        ? 'bg-white dark:bg-neutral-700 text-[#124F40] dark:text-emerald-400 shadow-xs'
                        : 'text-gray-500'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>IELTS</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTrack('english');
                      setMobileDrawerOpen(false);
                      navigate('/app/english');
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      effectiveTrack === 'english'
                        ? 'bg-white dark:bg-neutral-700 text-[#124F40] dark:text-emerald-400 shadow-xs'
                        : 'text-gray-500'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>English</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Groups */}
            <div className="flex-1 overflow-y-auto py-3 space-y-4">
              {navGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-1">
                  {group.label && (
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {group.label}
                    </div>
                  )}
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileDrawerOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-slate-400" />
                        </div>
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Drawer Footer: User Card Alone */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
              <UserMenu variant="sidebar" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
