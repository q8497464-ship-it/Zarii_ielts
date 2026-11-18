import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Sparkles,
  MessageSquare,
  Settings,
  Shield,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  X,
  Database,
  Layers,
  Key,
  Sliders,
  Award,
} from 'lucide-react';
import { ZariiLogo } from '../../../components/ui/ZariiLogo';

export interface NavSectionItem {
  id: string;
  name: string;
  path: string;
  badge?: string;
  badgeColor?: 'mint' | 'amber' | 'rose';
}

export interface NavSectionGroup {
  id: string;
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roleRequired?: 'admin'; // If 'admin', hidden for 'editor'
  badge?: string;
  badgeColor?: 'mint' | 'amber' | 'rose';
  items?: NavSectionItem[];
}

export const SIDEBAR_SECTIONS: NavSectionGroup[] = [
  {
    id: 'overview',
    title: 'Overview',
    path: '/admin',
    icon: LayoutDashboard,
    roleRequired: 'admin',
  },
  {
    id: 'content',
    title: 'Content',
    path: '/admin/content',
    icon: FileText,
    badge: '2 drafts',
    badgeColor: 'amber',
    items: [
      { id: 'tests', name: 'Tests & Mocks', path: '/admin/content?tab=tests' },
      { id: 'questions', name: 'Question Bank', path: '/admin/content?tab=questions' },
      { id: 'writing', name: 'Writing Prompts', path: '/admin/content?tab=writing' },
      { id: 'speaking', name: 'Speaking Cards', path: '/admin/content?tab=speaking' },
      { id: 'vocab', name: 'Vocab & Grammar', path: '/admin/content?tab=vocab' },
    ],
  },
  {
    id: 'users',
    title: 'Users',
    path: '/admin/users',
    icon: Users,
    roleRequired: 'admin',
    items: [
      { id: 'students', name: 'All Candidates', path: '/admin/users?tab=students' },
      { id: 'roles', name: 'Admin & Editors', path: '/admin/users?tab=roles' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    path: '/admin/analytics',
    icon: BarChart3,
    roleRequired: 'admin',
    items: [
      { id: 'perf', name: 'Score Trends', path: '/admin/analytics?tab=scores' },
      { id: 'cohorts', name: 'Target Bands', path: '/admin/analytics?tab=bands' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Evaluation',
    path: '/admin/ai',
    icon: Sparkles,
    roleRequired: 'admin',
    items: [
      { id: 'providers', name: 'Providers & Keys', path: '/admin/ai?tab=providers' },
      { id: 'usage', name: 'Token Usage & Costs', path: '/admin/ai?tab=usage' },
      { id: 'prompts', name: 'Evaluator Rubrics', path: '/admin/ai?tab=rubrics' },
    ],
  },
  {
    id: 'communication',
    title: 'Communication',
    path: '/admin/communication',
    icon: MessageSquare,
    badge: '4 unread',
    badgeColor: 'amber',
    items: [
      { id: 'announcements', name: 'Announcements', path: '/admin/communication?tab=announcements' },
      { id: 'feedback', name: 'Candidate Feedback', path: '/admin/communication?tab=feedback' },
    ],
  },
  {
    id: 'settings',
    title: 'Site Settings',
    path: '/admin/settings',
    icon: Settings,
    roleRequired: 'admin',
    items: [
      { id: 'general', name: 'Platform Config', path: '/admin/settings?tab=general' },
      { id: 'flags', name: 'Feature Flags', path: '/admin/settings?tab=flags' },
    ],
  },
  {
    id: 'system',
    title: 'System',
    path: '/admin/system',
    icon: Shield,
    roleRequired: 'admin',
    items: [
      { id: 'audit', name: 'Audit Security Log', path: '/admin/system?tab=audit' },
      { id: 'health', name: 'Database & RLS', path: '/admin/system?tab=health' },
      { id: 'media', name: 'Storage & Media', path: '/admin/system?tab=media' },
    ],
  },
];

interface AdminSidebarProps {
  userRole?: string;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AdminSidebar({
  userRole = 'admin',
  isMobileDrawer = false,
  onCloseMobileDrawer,
  collapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) {
  // Collapsible groups expanded state
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    content: true,
    communication: true,
  });

  const toggleGroup = (groupId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Filter sections by user role (Editors see ONLY Content and Communication)
  const accessibleSections = SIDEBAR_SECTIONS.filter((sec) => {
    if (userRole === 'editor' && sec.roleRequired === 'admin') {
      return false;
    }
    return true;
  });

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#124F40] to-[#0E3D32] text-white select-none">
      {/* 1. Admin Sidebar Header (64px / h-16) */}
      <div
        className={`h-16 flex items-center px-4 border-b border-white/10 shrink-0 ${
          collapsed && !isMobileDrawer ? 'justify-center' : 'justify-between'
        }`}
      >
        <Link to="/admin" className="flex items-center gap-2.5 group focus:outline-none">
          {collapsed && !isMobileDrawer ? (
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-black text-sm text-[#5BB78D]">
              Z
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                <span className="text-[#5BB78D] font-mono">Zarii</span> Admin
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#5BB78D]/20 text-[#5BB78D] border border-[#5BB78D]/30">
                {userRole.toUpperCase()}
              </span>
            </div>
          )}
        </Link>

        {isMobileDrawer ? (
          <button
            onClick={onCloseMobileDrawer}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        ) : onToggleCollapse ? (
          <button
            onClick={onToggleCollapse}
            className={`p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors ${
              collapsed ? 'hidden' : 'block'
            }`}
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        ) : null}
      </div>

      {collapsed && !isMobileDrawer && onToggleCollapse && (
        <div className="flex justify-center pt-2 pb-1 shrink-0">
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Navigation List */}
      <div className="flex-1 px-3 py-3 overflow-y-auto space-y-1 [scrollbar-gutter:stable] overscroll-contain text-xs">
        {accessibleSections.map((sec) => {
          const Icon = sec.icon;
          const isExpanded = expandedGroups[sec.id] ?? false;
          const hasChildren = Boolean(sec.items && sec.items.length > 0);

          return (
            <div key={sec.id} className="space-y-0.5">
              <NavLink
                to={sec.path}
                end={sec.path === '/admin'}
                onClick={() => isMobileDrawer && onCloseMobileDrawer && onCloseMobileDrawer()}
                className={({ isActive }) =>
                  `flex items-center h-10 rounded-xl font-medium transition-all group relative ${
                    collapsed && !isMobileDrawer ? 'justify-center px-0' : 'px-3 gap-2.5'
                  } ${
                    isActive
                      ? 'bg-white/15 text-white font-bold shadow-xs'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#5BB78D]' : 'text-white/80'}`} />
                    </div>

                    {(!collapsed || isMobileDrawer) && (
                      <>
                        <span className="truncate flex-1">{sec.title}</span>

                        {sec.badge && (
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                              sec.badgeColor === 'amber'
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-[#5BB78D] text-slate-950'
                            }`}
                          >
                            {sec.badge}
                          </span>
                        )}

                        {hasChildren && (
                          <button
                            onClick={(e) => toggleGroup(sec.id, e)}
                            className="p-0.5 rounded text-white/50 hover:text-white transition-colors"
                            aria-label={`Toggle ${sec.title} sub-items`}
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </>
                    )}

                    {/* Active mint indicator on the right edge */}
                    {isActive && (
                      <span className="absolute right-1 w-1 h-5 rounded-full bg-[#5BB78D]" />
                    )}
                  </>
                )}
              </NavLink>

              {/* Sub-items (when group is expanded) */}
              {hasChildren && isExpanded && (!collapsed || isMobileDrawer) && (
                <div className="pl-8 pr-1 py-1 space-y-0.5 border-l border-white/10 ml-5 my-0.5">
                  {sec.items?.map((sub) => (
                    <NavLink
                      key={sub.id}
                      to={sub.path}
                      onClick={() => isMobileDrawer && onCloseMobileDrawer && onCloseMobileDrawer()}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[11px] transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white font-bold'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      <span className="truncate">{sub.name}</span>
                      {sub.badge && (
                        <span className="text-[9px] font-mono px-1 rounded bg-amber-400 text-slate-950">
                          {sub.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Pinned Admin Footer (Alone at the bottom) */}
      <div className="p-3 border-t border-white/10 shrink-0 bg-black/10">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5BB78D] to-[#8ACFAE] text-[#0E3D32] font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
            AD
          </div>
          {(!collapsed || isMobileDrawer) && (
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">Administrator</div>
              <div className="text-[10px] text-[#5BB78D] font-mono truncate">Zarii Console</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={onCloseMobileDrawer} />
        {/* Drawer */}
        <div className="relative w-4/5 max-w-xs h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
          {sidebarContent}
        </div>
      </div>
    );
  }

  return (
    <aside
      className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-30 border-r border-[#124F40]/60 shrink-0 transition-all duration-200 ease-in-out h-[100dvh] select-none m-0 p-0 ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {sidebarContent}
    </aside>
  );
}
