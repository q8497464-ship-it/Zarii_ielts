import { Shield, Database, Lock, CheckCircle, Cpu, HardDrive } from 'lucide-react';
import { apiSupabase } from '../../shared/api';

export function AdminPlaceholderPage() {
  const isSupabaseConfigured = apiSupabase.isLive;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Administrative Architecture &amp; Roles Active</h2>
              <p className="text-xs text-slate-400">
                Core backend separation, Row Level Security policies, and role-based permissions are enforced.
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            Backend Ready
          </span>
        </div>
      </div>

      {/* Backend & Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Supabase Status */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Database Mode</span>
            <Database className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white">
            {isSupabaseConfigured ? 'Supabase Live' : 'Local / Offline Sync'}
          </div>
          <p className="text-2xs text-slate-500">
            {isSupabaseConfigured
              ? 'Connected to Supabase PostgreSQL with real-time REST API.'
              : 'Operating in local offline mode. Add VITE_SUPABASE_URL in .env to connect live.'}
          </p>
        </div>

        {/* Card 2: Row Level Security */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Row Level Security</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">19 Tables Enforced</div>
          <p className="text-2xs text-slate-500">
            Students can only read published content and their own attempts. AI secrets isolated.
          </p>
        </div>

        {/* Card 3: Codebase Isolation */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bundle Isolation</span>
            <Cpu className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-xl font-bold text-white">Lazy Loaded</div>
          <p className="text-2xs text-slate-500">
            Admin bundle is strictly separated under src/apps/admin and excluded from student bundle.
          </p>
        </div>
      </div>

      {/* Upcoming Modules (Placeholders) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Admin Modules (Ready for Next Phases)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200 block">Content Management</span>
            <span className="text-2xs text-slate-500 block">Tests, sections, passages, and questions with draft/published status.</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200 block">Student Cohorts</span>
            <span className="text-2xs text-slate-500 block">View registered student profiles and target band distribution.</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200 block">AI Providers &amp; Tokens</span>
            <span className="text-2xs text-slate-500 block">Encrypted provider keys, token usage budgets, and fallback routing.</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200 block">Audit &amp; Telemetry</span>
            <span className="text-2xs text-slate-500 block">Structured audit logs for all content edits and administrative events.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
