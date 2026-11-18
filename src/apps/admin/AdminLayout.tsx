import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminTopBar } from './components/AdminTopBar';
import { AdminSearchModal } from './components/AdminSearchModal';
import { AdminToastProvider } from './components/AdminToast';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [userRole, setUserRole] = useState<'admin' | 'editor'>('admin');

  useEffect(() => {
    try {
      const s = sessionStorage.getItem('zarii_admin_session');
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed.role === 'editor' || parsed.role === 'admin') {
          setUserRole(parsed.role);
        }
      }
    } catch {}
  }, []);

  // Global keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AdminToastProvider>
      <div className="admin-shell h-[100dvh] w-full flex bg-[#F7FAF8] dark:bg-[#0B1612] text-slate-900 dark:text-slate-100 overflow-hidden m-0 p-0 select-text">
        {/* 1. Desktop Fixed Deep-Green Sidebar (#124F40) */}
        <AdminSidebar
          userRole={userRole}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />

        {/* 2. Mobile Navigation Drawer */}
        {mobileDrawerOpen && (
          <AdminSidebar
            userRole={userRole}
            isMobileDrawer
            onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
          />
        )}

        {/* 3. Main Content Column: starts directly at sidebar right edge */}
        <div
          className={`flex-1 flex flex-col h-[100dvh] min-w-0 overflow-hidden transition-all duration-200 ${
            collapsed ? 'md:pl-[72px]' : 'md:pl-64'
          }`}
        >
          {/* Admin TopBar */}
          <AdminTopBar
            userRole={userRole}
            onOpenMobileMenu={() => setMobileDrawerOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Scrollable Main Area (Light content area with dark mode support) */}
          <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 [scrollbar-gutter:stable] focus:outline-none bg-[#F7FAF8] dark:bg-[#0B1612]">
            <div className="max-w-7xl mx-auto w-full space-y-6">
              {children}
            </div>
          </main>
        </div>

        {/* 4. Global Search Modal (Ctrl/Cmd + K) */}
        <AdminSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          userRole={userRole}
        />
      </div>
    </AdminToastProvider>
  );
}
