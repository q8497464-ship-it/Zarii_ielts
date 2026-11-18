import { NavLink } from 'react-router-dom';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';
import { Tooltip } from '../ui/Tooltip';
import { ZariiLogo } from '../ui/ZariiLogo';
import { MAIN_NAVIGATION } from '../../lib/navigationConfig';
import { UserMenu } from './UserMenu';

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col fixed inset-y-0 left-0 z-30 border-r border-slate-200/80 bg-white dark:border-[#24392F] dark:bg-[#112019] shrink-0 transition-all duration-200 ease-in-out h-[100dvh] select-none m-0 p-0',
        sidebarCollapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* 1. Header with Zarii Logo & Collapse Toggle (Exactly 64px / h-16 to match TopBar) */}
      <div
        className={cn(
          'h-16 flex items-center px-4 border-b border-slate-200/80 dark:border-[#24392F] shrink-0',
          sidebarCollapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <NavLink to="/app" className="flex items-center gap-2 group focus:outline-none" aria-label="Zarii Home">
          {sidebarCollapsed ? (
            <Tooltip content="Zarii: IELTS Preparation" position="right">
              <div>
                <ZariiLogo variant="mark" size="sm" className="group-hover:scale-105 transition-transform" />
              </div>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2">
              <ZariiLogo variant="mark-wordmark" size="sm" className="group-hover:scale-105 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-100 text-[#124F40] dark:bg-[#124F40]/80 dark:text-[#5BB78D]">
                Free
              </span>
            </div>
          )}
        </NavLink>

        <button
          onClick={toggleSidebar}
          className={cn(
            'p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D]',
            sidebarCollapsed && 'hidden'
          )}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {sidebarCollapsed && (
        <div className="flex justify-center pt-2 pb-1 shrink-0">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Grouped Navigation Links (Only middle area scrolls on short windows) */}
      <div className="flex-1 px-3 py-2 overflow-y-auto space-y-1 overscroll-contain">
        {MAIN_NAVIGATION.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {group.label && !sidebarCollapsed && (
              <div
                className={cn(
                  'px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500',
                  groupIdx === 0 ? 'pt-2 pb-2' : 'pt-6 pb-2'
                )}
              >
                {group.label}
              </div>
            )}
            {group.label && sidebarCollapsed && (
              <div className="h-px bg-slate-100 dark:bg-[#24392F] my-2 mx-2" />
            )}

            {group.items.map((item) => {
              const Icon = item.icon;

              const linkContent = (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center h-11 rounded-xl text-sm font-medium transition-all group relative',
                      sidebarCollapsed
                        ? 'justify-center w-full px-0'
                        : 'gap-3 px-3.5',
                      isActive
                        ? 'bg-[#124F40]/10 text-[#124F40] dark:bg-[#5BB78D]/15 dark:text-[#5BB78D] font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        <Icon
                          className={cn(
                            'w-4 h-4 transition-transform group-hover:scale-110 shrink-0',
                            isActive
                              ? 'text-[#124F40] dark:text-[#5BB78D]'
                              : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200'
                          )}
                        />
                      </div>
                      {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                      {isActive && (
                        <div
                          className={cn(
                            'rounded-full bg-[#124F40] dark:bg-[#5BB78D]',
                            sidebarCollapsed
                              ? 'absolute right-1 w-1 h-5 rounded-full'
                              : 'ml-auto w-1.5 h-1.5'
                          )}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );

              if (sidebarCollapsed) {
                return (
                  <Tooltip key={item.path} content={item.name} position="right">
                    {linkContent}
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </div>
        ))}
      </div>

      {/* 3. Bottom Pinned Section: User Card ONLY (Settings moved to ACCOUNT in MAIN_NAVIGATION) */}
      <div className="p-3 border-t border-slate-200/80 dark:border-[#24392F] mt-auto shrink-0 bg-white dark:bg-[#112019] relative">
        <UserMenu variant="sidebar" collapsed={sidebarCollapsed} />
      </div>
    </aside>
  );
}
