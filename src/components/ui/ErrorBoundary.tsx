import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home, LifeBuoy, Download, RefreshCw } from 'lucide-react';
import { errorLogger } from '../../lib/errorLogger';
import { ReportProblemModal } from './ReportProblemModal';
import { emergencySalvageAndExport, resetAndRecoverDatabase } from '../../lib/db';
import { copy } from '../../lib/copy';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  isReportModalOpen: boolean;
  salvagedJson?: string;
  isRecoveringDb: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    isReportModalOpen: false,
    isRecoveringDb: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    errorLogger.log({
      message: error.message || 'React render boundary caught error',
      stack: error.stack,
      type: 'error',
      context: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  private handleEmergencyExport = async () => {
    const { backupJson } = await emergencySalvageAndExport();
    if (backupJson) {
      this.setState({ salvagedJson: backupJson });
      const blob = new Blob([backupJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zarii-emergency-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  private handleDatabaseReset = async () => {
    if (window.confirm('This will re-initialize the local database to fix corruption. Continue?')) {
      this.setState({ isRecoveringDb: true });
      await resetAndRecoverDatabase();
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      const isDbError =
        this.state.error?.name?.includes('Dexie') ||
        this.state.error?.message?.toLowerCase().includes('indexeddb') ||
        this.state.error?.message?.toLowerCase().includes('database');

      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 text-slate-900 dark:text-white">
          <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold">Something went wrong.</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {copy.errors.generic}
              </p>
            </div>

            {this.state.error && (
              <pre className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-left overflow-x-auto text-rose-600 dark:text-rose-400 max-h-32">
                {this.state.error.message}
              </pre>
            )}

            {/* Database corruption recovery options if DB issue detected */}
            {isDbError && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-left space-y-2">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block">
                  Database Recovery Options:
                </span>
                <p className="text-[11px] text-amber-700 dark:text-amber-400">
                  A local database lock or corruption was detected. You can export salvaged records before resetting.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={this.handleEmergencyExport}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Backup
                  </button>
                  <button
                    onClick={this.handleDatabaseReset}
                    disabled={this.state.isRecoveringDb}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${this.state.isRecoveringDb ? 'animate-spin' : ''}`} />
                    Reset &amp; Reopen
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <a
                href="/"
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-700 text-white inline-flex items-center gap-1.5 shadow-sm"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </a>
              <button
                onClick={() => this.setState({ isReportModalOpen: true })}
                className="px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 inline-flex items-center gap-1.5"
              >
                <LifeBuoy className="w-4 h-4 text-teal-600" />
                <span>Report Problem</span>
              </button>
            </div>
          </div>

          <ReportProblemModal
            isOpen={this.state.isReportModalOpen}
            onClose={() => this.setState({ isReportModalOpen: false })}
            initialError={this.state.error?.message}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
