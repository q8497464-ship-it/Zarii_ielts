import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  FileText,
  Users,
  Settings,
  Shield,
  BarChart2,
  MessageSquare,
  Key,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AdminSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
}

interface SearchItem {
  id: string;
  category: 'Pages' | 'Content' | 'Users' | 'Settings';
  title: string;
  subtitle: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roleRequired?: 'admin';
}

const SEARCH_ITEMS: SearchItem[] = [
  // Pages
  { id: 'p1', category: 'Pages', title: 'Platform Health Overview', subtitle: 'KPIs, activity, drafts', path: '/admin', icon: BarChart2, roleRequired: 'admin' },
  { id: 'p2', category: 'Pages', title: 'Content Management', subtitle: 'Reading, listening, writing tests', path: '/admin/content', icon: FileText },
  { id: 'p3', category: 'Pages', title: 'Student Cohorts', subtitle: 'Candidate profiles & targets', path: '/admin/users', icon: Users, roleRequired: 'admin' },
  { id: 'p4', category: 'Pages', title: 'Analytics & Trends', subtitle: 'Completion and band distributions', path: '/admin/analytics', icon: BarChart2, roleRequired: 'admin' },
  { id: 'p5', category: 'Pages', title: 'AI Providers & Usage', subtitle: 'Provider API keys, token budgets', path: '/admin/ai', icon: Key, roleRequired: 'admin' },
  { id: 'p6', category: 'Pages', title: 'Announcements & Feedback', subtitle: 'System banners & candidate reports', path: '/admin/communication', icon: MessageSquare },
  { id: 'p7', category: 'Pages', title: 'Site Settings & Flags', subtitle: 'Exam timings, maintenance, feature flags', path: '/admin/settings', icon: Settings, roleRequired: 'admin' },
  { id: 'p8', category: 'Pages', title: 'System & Audit Log', subtitle: 'Security logs, RLS telemetry', path: '/admin/system', icon: Shield, roleRequired: 'admin' },

  // Tests & Content shortcuts
  { id: 'c1', category: 'Content', title: 'Academic Reading Test 01', subtitle: 'Published • 40 questions', path: '/admin/content?type=reading', icon: FileText },
  { id: 'c2', category: 'Content', title: 'Academic Reading Test 02', subtitle: 'Published • 40 questions', path: '/admin/content?type=reading', icon: FileText },
  { id: 'c3', category: 'Content', title: 'Academic Reading Test 03', subtitle: 'Draft • Needs review', path: '/admin/content?type=reading&status=draft', icon: FileText },
  { id: 'c4', category: 'Content', title: 'Listening Practice Test 01', subtitle: 'Published • 4 sections', path: '/admin/content?type=listening', icon: FileText },
  { id: 'c5', category: 'Content', title: 'Academic Task 1 Charts', subtitle: '10 Prompts • Visual diagrams', path: '/admin/content?type=writing', icon: Layers },
  { id: 'c6', category: 'Content', title: 'Speaking Cue Cards', subtitle: '30 Part 2 Cards', path: '/admin/content?type=speaking', icon: MessageSquare },

  // Settings shortcuts
  { id: 's1', category: 'Settings', title: 'Maintenance Window Banner', subtitle: 'Enable/disable platform maintenance', path: '/admin/settings', icon: Settings, roleRequired: 'admin' },
  { id: 's2', category: 'Settings', title: 'Feature Flags: AI Writing Coach', subtitle: 'Toggle Band 9 examiner evaluation', path: '/admin/settings', icon: Settings, roleRequired: 'admin' },
];

export function AdminSearchModal({ isOpen, onClose, userRole = 'admin' }: AdminSearchModalProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation & Esc handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const accessibleItems = SEARCH_ITEMS.filter((item) => {
    if (item.roleRequired === 'admin' && userRole === 'editor') return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  const handleSelect = (item: SearchItem) => {
    navigate(item.path);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Admin Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200/90 dark:border-[#24392F]">
          <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tests, candidate profiles, settings, or audit logs... (ESC to close)"
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {accessibleItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching administrative records found.
            </div>
          ) : (
            accessibleItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#172b22] text-left cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#124F40]/10 dark:bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] uppercase font-mono font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#124F40] dark:group-hover:text-[#5BB78D] transition-colors shrink-0" />
                </div>
              );
            })
          )}
        </div>

        {/* Quick Nav Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#172A21]/30 border-t border-slate-100 dark:border-[#24392F]/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono">Role: {userRole.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
