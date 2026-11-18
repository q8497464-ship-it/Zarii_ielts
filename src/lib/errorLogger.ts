/**
 * Global In-Memory and Local Error Logger for Zarii IELTS
 * 100% Free & Open-Source ($0 cost, no third-party paid telemetry).
 * Captures unhandled exceptions and promise rejections into a local ring buffer.
 */

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  message: string;
  stack?: string;
  url: string;
  type: 'error' | 'unhandledrejection' | 'manual';
  context?: Record<string, any>;
}

const MAX_LOG_ENTRIES = 50;
const STORAGE_KEY = 'zarii_error_logs';

class ErrorLogger {
  private logs: ErrorLogEntry[] = [];
  private isInitialized = false;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.logs = JSON.parse(raw);
      }
    } catch {
      this.logs = [];
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs.slice(-MAX_LOG_ENTRIES)));
    } catch {
      // Ignore localStorage quotas
    }
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    // Window global error listener
    window.addEventListener('error', (event: ErrorEvent) => {
      this.log({
        message: event.message || 'Unknown window error',
        stack: event.error?.stack,
        url: window.location.href,
        type: 'error',
      });
    });

    // Window unhandled promise rejection listener
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      this.log({
        message: reason instanceof Error ? reason.message : String(reason || 'Unhandled Promise Rejection'),
        stack: reason instanceof Error ? reason.stack : undefined,
        url: window.location.href,
        type: 'unhandledrejection',
      });
    });

    console.log('✓ Zarii Global Error Logger initialized (Console & Local storage only)');
  }

  public log(entry: {
    message: string;
    stack?: string;
    url?: string;
    type?: 'error' | 'unhandledrejection' | 'manual';
    context?: Record<string, any>;
  }) {
    const newEntry: ErrorLogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      message: entry.message,
      stack: entry.stack,
      url: entry.url || (typeof window !== 'undefined' ? window.location.href : ''),
      type: entry.type || 'manual',
      context: entry.context,
    };

    this.logs.push(newEntry);
    if (this.logs.length > MAX_LOG_ENTRIES) {
      this.logs.shift();
    }
    this.saveToStorage();

    // Standard console reporting
    console.error(`[Zarii Error ${newEntry.type.toUpperCase()}]`, newEntry.message, newEntry);
  }

  public getRecentLogs(): ErrorLogEntry[] {
    return [...this.logs];
  }

  public getLatestError(): ErrorLogEntry | undefined {
    return this.logs[this.logs.length - 1];
  }

  public clearLogs() {
    this.logs = [];
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
    }
  }

  /**
   * Format full diagnostic system report for GitHub issue or email
   */
  public generateDiagnosticReport(userNote?: string): string {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
    const screenRes = typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Unknown';
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const latest = this.getLatestError();

    return [
      `### Problem Summary`,
      userNote ? userNote : `_No additional description provided by user._`,
      ``,
      `### Environment Diagnostics`,
      `- **Zarii Version:** 0.1.0`,
      `- **Timestamp:** ${new Date().toISOString()}`,
      `- **Current URL:** ${typeof window !== 'undefined' ? window.location.href : 'Unknown'}`,
      `- **User Agent:** \`${ua}\``,
      `- **Screen Resolution:** ${screenRes}`,
      `- **Network Status:** ${isOnline ? 'Online' : 'Offline'}`,
      `- **Total Recorded Errors:** ${this.logs.length}`,
      ``,
      `### Latest Error Trace`,
      latest
        ? [
            `**Message:** \`${latest.message}\``,
            `**Type:** ${latest.type}`,
            `**Stack:**`,
            '```',
            latest.stack || 'No stack trace available',
            '```',
          ].join('\n')
        : '_No error recorded in current session._',
    ].join('\n');
  }
}

export const errorLogger = new ErrorLogger();
