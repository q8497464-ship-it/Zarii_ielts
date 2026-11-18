import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Sun,
  Moon,
  Laptop,
  LogOut,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { authApi } from '../../../shared/api';
import { AdminNotificationsPopover } from './AdminNotificationsPopover';

interface AdminTopBarProps {
  onOpenMobileMenu?: () => void;
  onOpenSearch: () => void;
  userRole?: string;
}

export function AdminTopBar({
  onOpenMobileMenu,
  onOpenSearch,
  userRole = 'admin',
}: AdminTopBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useAppStore();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const [adminEmail, setAdminEmail] = useState('admin@zarii.app');

  useEffect(() => {
    try {
      const s = sessionStorage.getItem('zarii_admin_session');
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed.email) setAdminEmail(parsed.email);
      }
    } catch {}
  }, []);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  // Sign out handler
  const handleSignOut = async () => {
    localStorage.removeItem('zarii_admin_auth');
    sessionStorage.removeItem('zarii_admin_session');
    await authApi.signOut();
    navigate('/admin/login', { replace: true });
  };

  // Breadcrumbs calculation
  const pathSegments = location.pathname.split('/').filter(Boolean); // ['admin', 'content', ...]
  const breadcrumbs = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = segment === 'admin' ? 'Admin' : segment.charAt(0).toUpperCase() + segment.slice(1);
    return { name, url, isLast: index === pathSegments.length - 1 };
  });

  const isProduction = typeof import.meta !== 'undefined' && (import.meta as any).env?.PROD;

  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-[#24392F] bg-white/95 dark:bg-[#112019]/95 px-4 sm:px-6 flex items-center justify-between backdrop-blur-md shrink-0 select-none">
      {/* Left Side: Mobile Menu Button & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.url}>
              {idx > 0 && <span className="text-slate-300 dark:text-slate-600">/</span>}
              <span
                className={`truncate max-w-[140px] font-medium ${
                  crumb.isLast
                    ? 'font-bold text-slate-900 dark:text-white'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer'
                }`}
                onClick={() => !crumb.isLast && navigate(crumb.url)}
              >
                {crumb.name}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right Side: Global Search, Environment, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Global Search Trigger (Ctrl/Cmd + K) */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#24392F] bg-slate-50 dark:bg-[#172A21]/60 hover:bg-slate-100 dark:hover:bg-[#172b22] text-xs text-slate-500 dark:text-slate-400 transition-colors shadow-2xs group"
          aria-label="Open administrative search"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
          <span className="hidden md:inline">Search console...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white dark:bg-[#112019] border border-slate-200 dark:border-slate-800 text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Environment Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
          <span className={`w-1.5 h-1.5 rounded-full ${isProduction ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
          <span>{isProduction ? 'Production' : 'Development'}</span>
        </div>

        {/* Notifications Popover */}
        <AdminNotificationsPopover />

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#124F40] to-[#1E7A62] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
              AD
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Administrator
              </span>
              <span className="text-[10px] font-mono text-slate-400 capitalize">
                {userRole}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProfileMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xl p-2 z-40 animate-in fade-in zoom-in-95 duration-150 text-xs"
            >
              {/* Profile Card Header */}
              <div className="p-3 bg-slate-50 dark:bg-[#172b22] rounded-xl mb-1 border border-slate-100 dark:border-[#24392F]/60">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    Zarii Admin
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">
                    {userRole}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {adminEmail}
                </p>
              </div>

              {/* Theme Selector */}
              <div className="px-3 py-2 border-t border-slate-100 dark:border-[#24392F]/60 flex items-center justify-between mt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Theme
                </span>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`p-1 rounded-md ${theme === 'light' ? 'bg-white text-amber-600 shadow-2xs' : 'text-slate-400'}`}
                    title="Light Mode"
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`p-1 rounded-md ${theme === 'dark' ? 'bg-[#112019] text-[#5BB78D] shadow-2xs' : 'text-slate-400'}`}
                    title="Dark Mode"
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('system')}
                    className={`p-1 rounded-md ${theme === 'system' ? 'bg-white dark:bg-[#112019] text-slate-700 dark:text-slate-200 shadow-2xs' : 'text-slate-400'}`}
                    title="System Default"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sign Out Action */}
              <div className="border-t border-slate-100 dark:border-[#24392F]/60 mt-1 pt-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out of Admin</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
