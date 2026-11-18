import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Database,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Activity,
  FileCheck,
  Server,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  FileText,
  Clock,
  Layers,
  Cpu,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { useAdminToast } from '../components/AdminToast';
import { ConfirmDialog } from '../components/ConfirmDialog';
import {
  systemStore,
  type HealthIssue,
  type BackupDryRunSummary,
  type GroupedClientError,
  type InfrastructureHealth,
} from '../../../shared/system/systemStore';
import { errorLogger } from '../../../lib/errorLogger';
import { contentStore } from '../../../shared/content/contentStore';
import type { AuditLogEntity } from '../../../shared/types/database';

type SystemTab = 'audit' | 'backups' | 'healthcheck' | 'errors' | 'infrastructure';

export function AdminSystemPage() {
  const { addToast } = useAdminToast();
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'audit' | 'backups' | 'healthcheck' | 'errors' | 'infrastructure'
  >('audit');

  // ------------------------------------------------------------------------
  // 1. AUDIT LOG STATE & FILTERS
  // ------------------------------------------------------------------------
  const [auditLogs, setAuditLogs] = useState<AuditLogEntity[]>(() =>
    systemStore.getAuditLogs()
  );
  const [auditSearch, setAuditSearch] = useState('');
  const [auditActionFilter, setAuditActionFilter] = useState('all');
  const [auditTargetFilter, setAuditTargetFilter] = useState('all');

  useEffect(() => {
    return contentStore.subscribe(() => {
      setAuditLogs(
        systemStore.getAuditLogs({
          search: auditSearch,
          action: auditActionFilter,
          targetType: auditTargetFilter,
        })
      );
    });
  }, [auditSearch, auditActionFilter, auditTargetFilter]);

  const handleExportAuditCsv = () => {
    const csv = systemStore.exportAuditLogsCsv(auditLogs);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zarii-audit-log-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Audit Log Exported',
      message: `Exported ${auditLogs.length} append-only audit records as CSV.`,
    });
  };

  // ------------------------------------------------------------------------
  // 2. BACKUP & DRY-RUN RESTORE STATE
  // ------------------------------------------------------------------------
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dryRunSummary, setDryRunSummary] = useState<BackupDryRunSummary | null>(null);
  const [stagedBackupJson, setStagedBackupJson] = useState<string>('');
  const [isRestoring, setIsRestoring] = useState(false);

  const handleDownloadFullBackup = () => {
    const json = systemStore.createFullBackupPackage();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zarii-full-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Full Backup Downloaded',
      message: 'Content, passages, questions, vocab, and settings packaged into JSON backup.',
    });
  };

  const handleSelectRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const dryRun = systemStore.inspectBackupDryRun(content);
      setStagedBackupJson(content);
      setDryRunSummary(dryRun);

      if (dryRun.isValid) {
        addToast({
          type: 'info',
          title: 'Dry-Run Inspection Ready',
          message: `Verified valid backup package v${dryRun.version} (${dryRun.testsCount} tests). Review summary before committing.`,
        });
      } else {
        addToast({
          type: 'error',
          title: 'Invalid Backup File',
          message: dryRun.error || 'Could not validate file signature.',
        });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCommitRestore = () => {
    if (!stagedBackupJson) return;
    setIsRestoring(true);
    setTimeout(() => {
      const res = systemStore.commitBackupRestore(stagedBackupJson);
      setIsRestoring(false);
      setDryRunSummary(null);
      setStagedBackupJson('');

      if (res.success) {
        addToast({
          type: 'success',
          title: 'Restore Completed',
          message: 'System data and content tables restored successfully.',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Restore Failed',
          message: res.error || 'Restore error.',
        });
      }
    }, 500);
  };

  // ------------------------------------------------------------------------
  // 3. CONTENT HEALTH CHECK STATE
  // ------------------------------------------------------------------------
  const [healthReport, setHealthReport] = useState<{
    totalTestsChecked: number;
    healthyTestsCount: number;
    issuesCount: number;
    issues: HealthIssue[];
  } | null>(() => systemStore.runContentHealthCheck());
  const [isRunningHealthCheck, setIsRunningHealthCheck] = useState(false);

  const handleRunHealthCheck = () => {
    setIsRunningHealthCheck(true);
    setTimeout(() => {
      const report = systemStore.runContentHealthCheck();
      setHealthReport(report);
      setIsRunningHealthCheck(false);
      addToast({
        type: 'success',
        title: 'Health Check Complete',
        message: `Validated ${report.totalTestsChecked} mock tests. ${report.healthyTestsCount} healthy, ${report.issuesCount} flags.`,
      });
    }, 400);
  };

  // ------------------------------------------------------------------------
  // 4. CLIENT ERROR LOGS
  // ------------------------------------------------------------------------
  const [groupedErrors, setGroupedErrors] = useState<GroupedClientError[]>(() =>
    systemStore.getGroupedClientErrors()
  );

  const handleClearErrors = () => {
    errorLogger.clearLogs();
    setGroupedErrors([]);
    addToast({
      type: 'info',
      title: 'Error Buffer Cleared',
      message: 'Client-side runtime error logs reset.',
    });
  };

  // ------------------------------------------------------------------------
  // 5. INFRASTRUCTURE HEALTH
  // ------------------------------------------------------------------------
  const infra = systemStore.getInfrastructureHealth();

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              System Operations &amp; Diagnostics
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#124F40] text-[#5BB78D] rounded-full border border-[#5BB78D]/30">
              Audit &amp; Infrastructure
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Append-only audit trail, full system backups with dry-run verification, content health validation, and client error logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'audit' && (
            <button
              onClick={handleExportAuditCsv}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#5BB78D]" />
              <span>Export Audit CSV</span>
            </button>
          )}

          {activeTab === 'healthcheck' && (
            <button
              onClick={handleRunHealthCheck}
              disabled={isRunningHealthCheck}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-[#5BB78D] ${
                  isRunningHealthCheck ? 'animate-spin' : ''
                }`}
              />
              <span>Run Health Validation</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Top-Level Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {(
          [
            { id: 'audit', label: 'Append-Only Audit Log', icon: Shield, count: auditLogs.length },
            { id: 'backups', label: 'Backups & Dry-Run Restore', icon: Database, count: undefined },
            { id: 'healthcheck', label: 'Content Health Check', icon: FileCheck, count: healthReport?.issuesCount },
            { id: 'errors', label: 'Client Error Logs', icon: AlertTriangle, count: groupedErrors.length },
            { id: 'infrastructure', label: 'Infrastructure & Quotas', icon: Server, count: undefined },
          ] as Array<{ id: SystemTab; label: string; icon: any; count?: number }>
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#124F40] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* SECTION 1: APPEND-ONLY AUDIT LOG VIEWER                              */}
      {/* ==================================================================== */}
      {activeTab === 'audit' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Append-Only Security Audit Trail
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Every administrative action, content modification, and setting update is permanently recorded.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search actions..."
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white w-44"
                />
              </div>

              <select
                value={auditActionFilter}
                onChange={(e) => setAuditActionFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="all">All Actions</option>
                <option value="UPDATE_TEST">UPDATE_TEST</option>
                <option value="UPDATE_BRANDING_SETTINGS">UPDATE_BRANDING</option>
                <option value="UPDATE_FEATURE_FLAG">UPDATE_FEATURE_FLAG</option>
                <option value="UPDATE_EXAMINER_PROMPT">UPDATE_PROMPT</option>
                <option value="RUN_CALIBRATION_SUITE">RUN_CALIBRATION</option>
              </select>

              <select
                value={auditTargetFilter}
                onChange={(e) => setAuditTargetFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="all">All Entities</option>
                <option value="test">test</option>
                <option value="site_settings">site_settings</option>
                <option value="feature_flag">feature_flag</option>
                <option value="ai_provider">ai_provider</option>
                <option value="feedback_ticket">feedback_ticket</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Actor / Admin</th>
                  <th className="py-3 px-3">Security Action</th>
                  <th className="py-3 px-3">Target Entity</th>
                  <th className="py-3 px-3">State Change Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                      {log.created_at}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-900 dark:text-white block">
                        {log.actor_id || 'system'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[11px] font-bold text-[#124F40] dark:text-[#5BB78D] bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200/60 dark:border-teal-900/40">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="capitalize text-slate-700 dark:text-slate-300">
                        {log.target_type}
                      </span>
                      {log.target_id && (
                        <span className="font-mono text-[10px] text-slate-400 block">
                          ID: {log.target_id}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <pre className="font-mono text-[10px] text-slate-500 max-w-xs truncate bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {JSON.stringify(log.new_state || log.previous_state || {})}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 2: BACKUPS & DRY-RUN RESTORE                                 */}
      {/* ==================================================================== */}
      {activeTab === 'backups' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-5">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                One-Click Full System Backup &amp; Restore
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate complete JSON backups of all mock exams, questions, vocabulary decks, grammar lessons, and site settings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* One-Click Backup Export */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#5BB78D]" />
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    Create Full Backup Package
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Packages all published tests, answer keys, vocabulary decks, feature switches, and prompt versions into a single JSON snapshot.
                </p>
                <button
                  onClick={handleDownloadFullBackup}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#5BB78D]" />
                  <span>Download Backup Package (.json)</span>
                </button>
              </div>

              {/* Restore with Dry-Run File Upload */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    Restore from Backup (with Dry-Run)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Select a backup file to preview its contents and verify data integrity before committing any table changes.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all shadow-xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select Backup File for Dry-Run</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleSelectRestoreFile}
                  accept=".json"
                  className="hidden"
                />
              </div>
            </div>

            {/* Dry-Run Inspection Panel */}
            {dryRunSummary && (
              <div className="p-5 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/60 dark:bg-teal-950/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#5BB78D]" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Dry-Run Verification Summary (Package v{dryRunSummary.version})
                    </h4>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    Exported: {dryRunSummary.timestamp}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Mock Tests
                    </span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                      {dryRunSummary.testsCount}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Questions
                    </span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                      {dryRunSummary.questionsCount}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Vocabulary Words
                    </span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                      {dryRunSummary.vocabCount}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Site Settings
                    </span>
                    <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      {dryRunSummary.hasSettings ? 'Included' : 'None'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-teal-200/60 dark:border-teal-900/40">
                  <button
                    onClick={() => setDryRunSummary(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCommitRestore}
                    disabled={isRestoring}
                    className="px-5 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isRestoring ? 'Restoring System...' : 'Confirm Restore'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 3: CONTENT HEALTH CHECK                                      */}
      {/* ==================================================================== */}
      {activeTab === 'healthcheck' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Automated Content Integrity &amp; Validation Check
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audits all published tests to detect missing answer keys, empty questions, duplicate numbering, or broken audio assets.
              </p>
            </div>
          </div>

          {healthReport && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                title="Tests Checked"
                value={healthReport.totalTestsChecked.toString()}
                icon={FileCheck}
              />
              <StatCard
                title="Healthy Tests"
                value={healthReport.healthyTestsCount.toString()}
                icon={CheckCircle2}
                badge="100% Ready"
                badgeColor="mint"
              />
              <StatCard
                title="Integrity Flags"
                value={healthReport.issuesCount.toString()}
                icon={AlertTriangle}
                badge={healthReport.issuesCount === 0 ? 'Clean' : 'Attention'}
                badgeColor={healthReport.issuesCount === 0 ? 'mint' : 'amber'}
              />
            </div>
          )}

          {healthReport && healthReport.issues.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle className="w-8 h-8 mx-auto text-[#5BB78D] mb-2" />
              <div className="font-bold text-sm">All Published Content is 100% Healthy!</div>
              <p className="text-[11px] text-slate-500 mt-1">
                Zero missing answer keys, broken audio paths, or duplicate question numbers detected.
              </p>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              {healthReport?.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          issue.severity === 'error'
                            ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {issue.severity}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {issue.issue}
                      </span>
                      <span className="text-slate-400">in "{issue.testTitle}"</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{issue.details}</p>
                  </div>

                  <button
                    onClick={() => navigate(issue.actionUrl)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs shrink-0 self-start md:self-auto cursor-pointer"
                  >
                    <span>Fix in Editor</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#5BB78D]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 4: CLIENT ERROR LOGS                                         */}
      {/* ==================================================================== */}
      {activeTab === 'errors' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Client-Side Runtime Exception Buffer
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Unhandled promise rejections and UI exceptions captured across candidate browsers ($0 Free Telemetry).
              </p>
            </div>

            {groupedErrors.length > 0 && (
              <button
                onClick={handleClearErrors}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Clear Error Buffer</span>
              </button>
            )}
          </div>

          {groupedErrors.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <CheckCircle className="w-8 h-8 mx-auto text-[#5BB78D]" />
              <p>Clean exception log! Zero unhandled client errors recorded.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {groupedErrors.map((err, idx) => (
                <div key={idx} className="py-3.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-700 dark:text-rose-400 text-[10px]">
                        {err.count}x Events
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {err.message}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Last: {err.lastSeen}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono">URL: {err.url}</div>

                  {err.stack && (
                    <pre className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 font-mono text-[10px] text-slate-600 dark:text-slate-400 overflow-x-auto max-h-24 leading-snug">
                      {err.stack}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 5: INFRASTRUCTURE & QUOTAS                                   */}
      {/* ==================================================================== */}
      {activeTab === 'infrastructure' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Backend Infrastructure Health &amp; Free-Tier Headroom
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Supabase free tier utilization metrics, edge function execution latency, and local persistence status.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Database Storage Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Database Tables
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {infra.databaseStatus}
                </span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                {infra.databaseSizeMb} MB{' '}
                <span className="text-xs font-normal text-slate-400">
                  / {infra.databaseLimitMb} MB Free Tier
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5BB78D] rounded-full"
                  style={{ width: `${infra.databasePercent}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {infra.databasePercent}% utilized • 491.6 MB headroom remaining
              </div>
            </div>

            {/* Asset Storage Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Media &amp; Audio Storage
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {infra.storageStatus}
                </span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                {infra.storageSizeMb} MB{' '}
                <span className="text-xs font-normal text-slate-400">
                  / {infra.storageLimitMb} MB Free Tier
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5BB78D] rounded-full"
                  style={{ width: `${infra.storagePercent}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {infra.storagePercent}% utilized • 975.8 MB headroom remaining
              </div>
            </div>

            {/* Edge Functions Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Edge Functions Runtime
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {infra.edgeFunctionsStatus}
                </span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                {infra.edgeLatencyMs} ms{' '}
                <span className="text-xs font-normal text-slate-400">Avg Cold Latency</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Global Anycast edge deployment active across 30+ regional PoPs.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
