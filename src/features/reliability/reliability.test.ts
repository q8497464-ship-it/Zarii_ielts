import { describe, it, expect, beforeEach, vi } from 'vitest';
import { errorLogger } from '../../lib/errorLogger';
import { debouncedSave, checkDatabaseHealth, emergencySalvageAndExport } from '../../lib/db';
import {
  getOfflineTestIds,
  isTestDownloaded,
  downloadTestForOffline,
  removeOfflineTest,
} from '../../lib/pwa';

// In-memory mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('Reliability: Global Error Logger ($0 Paid Telemetry)', () => {
  beforeEach(() => {
    localStorageMock.clear();
    errorLogger.clearLogs();
  });

  it('records structured errors with timestamps and URLs', () => {
    errorLogger.log({
      message: 'Failed to parse JSON response',
      stack: 'Error: Failed to parse\n    at fetchTestContent (reading.ts:42)',
      url: 'https://zarii.app/practice/reading',
      type: 'manual',
    });

    const logs = errorLogger.getRecentLogs();
    expect(logs.length).toBe(1);
    expect(logs[0].message).toBe('Failed to parse JSON response');
    expect(logs[0].type).toBe('manual');
    expect(logs[0].url).toBe('https://zarii.app/practice/reading');
    expect(logs[0].id).toBeDefined();
    expect(logs[0].timestamp).toBeDefined();
  });

  it('caps ring buffer to maximum 50 entries', () => {
    for (let i = 0; i < 60; i++) {
      errorLogger.log({
        message: `Error event number ${i}`,
        type: 'error',
      });
    }

    const logs = errorLogger.getRecentLogs();
    expect(logs.length).toBe(50);
    expect(logs[logs.length - 1].message).toBe('Error event number 59');
  });

  it('generates a complete Markdown diagnostic report for GitHub/mailto', () => {
    errorLogger.log({
      message: 'Network offline during mock exam',
      stack: 'NetworkError: Offline',
      type: 'unhandledrejection',
    });

    const report = errorLogger.generateDiagnosticReport('Exam screen hung on passage 2.');
    expect(report).toContain('### Problem Summary');
    expect(report).toContain('Exam screen hung on passage 2.');
    expect(report).toContain('### Environment Diagnostics');
    expect(report).toContain('Zarii Version:');
    expect(report).toContain('Network offline during mock exam');
  });

  it('clears logs cleanly', () => {
    errorLogger.log({ message: 'Temporary glitch' });
    expect(errorLogger.getRecentLogs().length).toBe(1);

    errorLogger.clearLogs();
    expect(errorLogger.getRecentLogs().length).toBe(0);
  });
});

describe('Reliability: Safe Debounced Writes', () => {
  it('debounces rapid repeated saves for the same key into a single write', async () => {
    const saveTarget = vi.fn().mockResolvedValue('success');

    // Dispatch 5 rapid calls in succession
    const p1 = debouncedSave('user_draft_1', saveTarget, 50);
    const p2 = debouncedSave('user_draft_1', saveTarget, 50);
    const p3 = debouncedSave('user_draft_1', saveTarget, 50);

    const result = await p3;
    expect(result).toBe('success');
    expect(saveTarget).toHaveBeenCalledTimes(1);
  });
});

describe('Reliability: PWA Offline Download Management', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('tracks downloaded test IDs and reports status accurately', async () => {
    expect(isTestDownloaded('read-test-01')).toBe(false);

    await downloadTestForOffline('read-test-01', ['/content/reading/read-test-01.json']);
    expect(isTestDownloaded('read-test-01')).toBe(true);
    expect(getOfflineTestIds()).toContain('read-test-01');

    await removeOfflineTest('read-test-01', ['/content/reading/read-test-01.json']);
    expect(isTestDownloaded('read-test-01')).toBe(false);
    expect(getOfflineTestIds()).not.toContain('read-test-01');
  });
});

describe('Reliability: Database Health & Emergency Recovery', () => {
  it('checks database health without errors', async () => {
    const health = await checkDatabaseHealth();
    expect(health.healthy).toBe(true);
  });

  it('produces valid emergency salvage JSON export', async () => {
    const { backupJson, error } = await emergencySalvageAndExport();
    expect(error).toBeUndefined();
    expect(backupJson).toBeDefined();

    const parsed = JSON.parse(backupJson!);
    expect(parsed.appName).toContain('Zarii');
    expect(parsed.data).toBeDefined();
  });
});
