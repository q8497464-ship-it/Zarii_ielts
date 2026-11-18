import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  Users,
  UserCheck,
  Calendar,
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  ExternalLink,
  Target,
  Sparkles,
  Award,
  HelpCircle,
  Activity,
  FileSpreadsheet,
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { useAdminToast } from '../components/AdminToast';
import {
  getAnalyticsDataset,
  exportAnalyticsCsv,
  type DateRange,
} from '../../../shared/analytics/analyticsData';

export function AdminAnalyticsPage() {
  const { addToast } = useAdminToast();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  // Compute dataset reactively based on dateRange
  const dataset = useMemo(() => getAnalyticsDataset(dateRange), [dateRange]);

  const handleExportCsv = () => {
    try {
      const csvContent = exportAnalyticsCsv(dataset);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `zarii-analytics-${dateRange}-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addToast({
        type: 'success',
        title: 'CSV Exported',
        message: `Analytics data for ${dateRange} downloaded successfully.`,
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Export Failed',
        message: 'Could not generate CSV export file.',
      });
    }
  };

  const handleReviewContent = (testId: string) => {
    navigate(`/admin/content?tab=tests&testId=${encodeURIComponent(testId)}`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Date-Range Picker and Export */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Platform Analytics &amp; Insights
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] rounded-full border border-[#5BB78D]/30">
              Aggregated &amp; Privacy-First
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Active candidate cohorts, skill module benchmarks, drop-off rates, and automated content audit flags.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range Selector */}
          <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
            {(
              [
                { label: '7 Days', value: '7d' },
                { label: '30 Days', value: '30d' },
                { label: '90 Days', value: '90d' },
                { label: 'All Time', value: 'all' },
              ] as const
            ).map((item) => {
              const active = dateRange === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => setDateRange(item.value)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    active
                      ? 'bg-white dark:bg-[#124F40] text-[#124F40] dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#124F40]/20 border border-slate-200 dark:border-[#24392F] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#124F40]/40 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#5BB78D]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Daily Active Users (DAU)"
          value={dataset.kpis.dau.toLocaleString()}
          change="+14.2% vs previous period"
          changeType="positive"
          icon={Users}
          badge="High Engagement"
          badgeColor="mint"
        />
        <StatCard
          title="Weekly Active Users (WAU)"
          value={dataset.kpis.wau.toLocaleString()}
          change="+8.6% week-on-week"
          changeType="positive"
          icon={UserCheck}
        />
        <StatCard
          title="Monthly Active Users (MAU)"
          value={dataset.kpis.mau.toLocaleString()}
          change="+21.4% monthly growth"
          changeType="positive"
          icon={Calendar}
        />
        <StatCard
          title="New Candidate Signups"
          value={dataset.kpis.totalSignups.toLocaleString()}
          change="+18.5% registration rate"
          changeType="positive"
          icon={TrendingUp}
          badge="Free Tier"
          badgeColor="slate"
        />
      </div>

      {/* 3. Activity Trends & Test Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#5BB78D]" />
                Candidate Signups vs Test Attempts ({dateRange.toUpperCase()})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tracking user acquisition and daily examination activity.
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataset.activityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="attemptsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#124F40" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#124F40" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="signupsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5BB78D" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#5BB78D" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#124F40',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="attempts"
                  name="Exam Attempts"
                  stroke="#124F40"
                  fillOpacity={1}
                  fill="url(#attemptsGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="signups"
                  name="New Signups"
                  stroke="#5BB78D"
                  fillOpacity={1}
                  fill="url(#signupsGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Completion & Drop-off Funnel */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-[#5BB78D]" />
              Mock Test Completion Funnel
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Drop-off retention across 40-question exam stages.
            </p>

            <div className="space-y-4 pt-6">
              {dataset.funnel.map((stage, idx) => (
                <div key={stage.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">
                      {idx + 1}. {stage.stage}
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {stage.count}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${stage.count}%`,
                        backgroundColor: stage.fill,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#5BB78D] shrink-0" />
            <span>Overall full-test completion rate remains high at 87%.</span>
          </div>
        </div>
      </div>

      {/* 4. Module Performance Cards */}
      <div>
        <div className="mb-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Skill Module Performance &amp; Usage
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Average scores, examiner band benchmarks, and time-on-task per skill module.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dataset.moduleMetrics.map((m) => (
            <div
              key={m.module}
              className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {m.module}
                </span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Attempts</div>
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {m.attempts.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Avg Band</div>
                  <div className="text-lg font-extrabold text-[#124F40] dark:text-[#5BB78D]">
                    {m.avgBand}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {m.avgTimeMinutes} min avg
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {m.completionRate}% complete
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Question Type Accuracy Benchmark Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#5BB78D]" />
              Question Type Accuracy &amp; Difficulty Calibration
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated candidate answer accuracy rates. Types with accuracy under 35% are flagged for review.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Question Type</th>
                <th className="py-3 px-3">Cohort Sample Size</th>
                <th className="py-3 px-3">Accuracy Rate</th>
                <th className="py-3 px-3">Difficulty Assessment</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {dataset.questionTypeAccuracies.map((q) => (
                <tr
                  key={q.type}
                  className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors ${
                    q.flaggedPoor ? 'bg-amber-500/5' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {q.label}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500 dark:text-slate-400">
                    {q.totalAnswered.toLocaleString()} questions answered
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold w-12 text-slate-900 dark:text-white">
                        {q.accuracyRate}%
                      </span>
                      <div className="w-24 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            q.flaggedPoor ? 'bg-amber-500' : 'bg-[#5BB78D]'
                          }`}
                          style={{ width: `${q.accuracyRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                    {q.accuracyRate < 40 ? 'High Difficulty / Possible Ambiguity' : q.accuracyRate > 70 ? 'Standard Diagnostic' : 'Well Calibrated'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {q.flaggedPoor ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                        <AlertTriangle className="w-3 h-3" />
                        Flagged (&lt; 35%)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="w-3 h-3" />
                        Healthy
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Most & Least Used Tests Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Used Tests */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#5BB78D]" />
              Top Engaged Mock Tests
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Highest test attempts and candidate completion rates.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {dataset.mostUsedTests.map((test, idx) => (
              <div key={test.testId} className="py-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5 max-w-[65%]">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">
                    {idx + 1}. {test.title}
                  </div>
                  <div className="text-[11px] text-slate-400 capitalize">
                    {test.skill} • {test.attemptsCount} attempts
                  </div>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {test.completionRate}% completion
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {test.dropOffRate}% drop-off
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Least Used / High Drop-off Tests */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Low Engagement / High Drop-off Tests
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tests with low engagement or high candidate abandonment rate.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {dataset.leastUsedTests.map((test, idx) => (
              <div key={test.testId} className="py-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5 max-w-[65%]">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">
                    {idx + 1}. {test.title}
                  </div>
                  <div className="text-[11px] text-slate-400 capitalize">
                    {test.skill} • {test.attemptsCount} attempts
                  </div>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {test.dropOffRate}% drop-off
                  </div>
                  <button
                    onClick={() => handleReviewContent(test.testId)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#124F40] dark:text-[#5BB78D] hover:underline"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. AI Evaluation Telemetry */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#124F40] to-[#0E3D32] text-white shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#5BB78D]/20 text-[#5BB78D] border border-[#5BB78D]/30">
              <Sparkles className="w-3 h-3" />
              AI Examiner Engine Telemetry
            </div>
            <h2 className="text-base font-extrabold tracking-tight">
              Writing &amp; Speaking Automated Assessment Reliability
            </h2>
            <p className="text-xs text-slate-300">
              Real-time monitoring of examiner inference pipelines, token costs, and latency benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-300">Success Rate</div>
              <div className="text-2xl font-black text-[#5BB78D]">{dataset.aiTelemetry.successRate}%</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-300">Avg Latency</div>
              <div className="text-2xl font-black">{dataset.aiTelemetry.avgGradingTimeSeconds}s</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
          <div>
            <span className="text-slate-300 text-[11px]">Total Grading Requests:</span>
            <p className="font-mono font-bold text-sm mt-0.5">{dataset.aiTelemetry.totalCalls.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-slate-300 text-[11px]">Successful Gradings:</span>
            <p className="font-mono font-bold text-sm text-[#5BB78D] mt-0.5">
              {dataset.aiTelemetry.successfulGradings.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-slate-300 text-[11px]">Failed / Timed Out:</span>
            <p className="font-mono font-bold text-sm text-rose-300 mt-0.5">
              {dataset.aiTelemetry.failedOrTimedOut}
            </p>
          </div>
          <div>
            <span className="text-slate-300 text-[11px]">Est. Inference Cost:</span>
            <p className="font-mono font-bold text-sm mt-0.5">{dataset.aiTelemetry.estimatedCostToday}</p>
          </div>
        </div>
      </div>

      {/* 8. Content Quality Insights (Actionable flags) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Content Quality Insights &amp; Anomaly Detection
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Automated heuristics flag tests with abnormal student error rates, high drop-off spikes, or user feedback tickets.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {dataset.qualityFlags.length} active flags requiring attention
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {dataset.qualityFlags.map((flag) => (
            <div
              key={flag.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                      flag.severity === 'high'
                        ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {flag.severity} Priority
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {flag.title}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl">
                  {flag.details}
                </p>
                <div className="text-[11px] font-mono text-slate-400">
                  Trigger: <span className="font-semibold text-slate-700 dark:text-slate-300">{flag.metric}</span>
                </div>
              </div>

              <button
                onClick={() => handleReviewContent(flag.testId)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-semibold transition-all shadow-xs shrink-0 self-start md:self-auto"
              >
                <span>Review in Editor</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
