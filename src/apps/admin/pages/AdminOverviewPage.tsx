import React, { useState } from 'react';
import {
  Users,
  Activity,
  Award,
  MessageSquare,
  FilePlus,
  Bell,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Database,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { useAdminToast } from '../components/AdminToast';

// 30-Day Activity Chart Mock Data
const ACTIVITY_DATA = [
  { date: 'Oct 19', attempts: 45, sessions: 92 },
  { date: 'Oct 21', attempts: 52, sessions: 110 },
  { date: 'Oct 23', attempts: 48, sessions: 104 },
  { date: 'Oct 25', attempts: 60, sessions: 135 },
  { date: 'Oct 27', attempts: 58, sessions: 120 },
  { date: 'Oct 29', attempts: 72, sessions: 148 },
  { date: 'Oct 31', attempts: 68, sessions: 139 },
  { date: 'Nov 02', attempts: 75, sessions: 160 },
  { date: 'Nov 04', attempts: 82, sessions: 175 },
  { date: 'Nov 06', attempts: 79, sessions: 168 },
  { date: 'Nov 08', attempts: 91, sessions: 194 },
  { date: 'Nov 10', attempts: 88, sessions: 186 },
  { date: 'Nov 12', attempts: 95, sessions: 210 },
  { date: 'Nov 14', attempts: 92, sessions: 202 },
  { date: 'Nov 16', attempts: 104, sessions: 228 },
  { date: 'Nov 18', attempts: 94, sessions: 215 },
];

export function AdminOverviewPage() {
  const { addToast } = useAdminToast();
  const [isQuickActionModalOpen, setIsQuickActionModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'test' | 'announcement' | null>(null);

  const [announcementText, setAnnouncementText] = useState('');
  const [testTitle, setTestTitle] = useState('');

  const handleOpenAction = (type: 'test' | 'announcement') => {
    setModalType(type);
    setIsQuickActionModalOpen(true);
  };

  const handleSaveQuickAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'test') {
      addToast({
        type: 'success',
        title: 'Draft Test Created',
        message: `"${testTitle || 'New Practice Test'}" added to drafts list for review.`,
      });
      setTestTitle('');
    } else {
      addToast({
        type: 'success',
        title: 'Announcement Published',
        message: 'Platform announcement has been broadcasted to all students.',
      });
      setAnnouncementText('');
    }
    setIsQuickActionModalOpen(false);
    setModalType(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header & Quick Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Platform Health &amp; Operations
            </h1>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Operational
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time status of candidate cohorts, test papers, AI scoring telemetry, and Row Level Security.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleOpenAction('announcement')}
            className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112019] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#172b22] transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span>Add Announcement</span>
          </button>

          <button
            onClick={() => handleOpenAction('test')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#124F40] hover:bg-[#0E3D32] dark:bg-[#5BB78D] dark:hover:bg-[#4AA67C] text-white dark:text-[#0B1612] shadow-xs transition-colors flex items-center gap-1.5"
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span>Add Test</span>
          </button>
        </div>
      </div>

      {/* 2. Top 5 Key Performance Indicators (KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Students"
          value="1,420"
          change="+14%"
          changeType="positive"
          subtitle="vs last month"
          icon={Users}
        />
        <StatCard
          title="Active This Week"
          value="486"
          change="+8%"
          changeType="positive"
          subtitle="candidate sessions"
          icon={Activity}
        />
        <StatCard
          title="Attempts Today"
          value="94"
          change="+22%"
          changeType="positive"
          subtitle="reading & listening"
          icon={Clock}
        />
        <StatCard
          title="Average Band Score"
          value="6.8"
          subtitle="Target avg: Band 7.5"
          icon={Award}
          badge="Band 6.8"
          badgeColor="mint"
        />
        <StatCard
          title="New Feedback"
          value="4"
          subtitle="unread inquiries"
          icon={MessageSquare}
          badge="Needs Attention"
          badgeColor="amber"
        />
      </div>

      {/* 3. 30-Day Activity Chart & Activity Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 30-Day Activity Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                30-Day Candidate Exam &amp; Session Activity
              </h2>
              <p className="text-2xs text-slate-400">
                Daily completed mock attempts and study sessions across all skills
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#124F40] dark:bg-[#5BB78D]" />
                Daily Attempts
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                Active Sessions
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="attemptsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#124F40" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#124F40" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5BB78D" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5BB78D" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#112019',
                    borderColor: '#24392F',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="attempts"
                  stroke="#124F40"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#attemptsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#5BB78D"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#sessionsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: "Needs Attention" Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Needs Attention
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold">
              3 items
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {/* Item 1: Draft Test */}
            <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-300 truncate">
                  Academic Reading Test 03
                </span>
                <StatusBadge status="draft" />
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                40 questions generated. Awaiting editorial answer verification before publication.
              </p>
            </div>

            {/* Item 2: AI Rate-limit / Quota Notice */}
            <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900 dark:text-rose-300 truncate">
                  Groq LLM Rate Limit
                </span>
                <StatusBadge status="warning" label="AI Limit" />
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Free tier quota hit 85% today. Automatic rule-based evaluator fallback engaged.
              </p>
            </div>

            {/* Item 3: Flagged Candidate Feedback */}
            <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300 truncate">
                  Listening Audio Sync Report
                </span>
                <StatusBadge status="pending" label="Feedback" />
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Reported latency on Section 4 timer during Safari iOS background playback.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-[#24392F]/60">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Zero database or security exceptions in the past 24 hours.
            </span>
          </div>
        </div>
      </div>

      {/* 4. Quick Action Modal (Add Test or Add Announcement) */}
      {isQuickActionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsQuickActionModalOpen(false)}
          />

          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-150 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {modalType === 'test' ? 'Create New Practice Test' : 'Broadcast System Announcement'}
            </h3>

            <form onSubmit={handleSaveQuickAction} className="space-y-4">
              {modalType === 'test' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Test Title
                    </label>
                    <input
                      type="text"
                      required
                      value={testTitle}
                      onChange={(e) => setTestTitle(e.target.value)}
                      placeholder="e.g. Academic Reading Test 04"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Module Skill
                    </label>
                    <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]">
                      <option value="reading">Reading (3 Passages, 40 Qs)</option>
                      <option value="listening">Listening (4 Sections, 40 Qs)</option>
                      <option value="writing">Writing (Task 1 &amp; Task 2)</option>
                      <option value="speaking">Speaking (Parts 1, 2, 3)</option>
                      <option value="full">Full Mock Exam (2h 45m)</option>
                    </select>
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Announcement Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    placeholder="Message will appear in the top global banner for all candidate workspaces..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuickActionModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#124F40] hover:bg-[#0E3D32] dark:bg-[#5BB78D] dark:hover:bg-[#4AA67C] dark:text-[#0B1612]"
                >
                  Save &amp; Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
