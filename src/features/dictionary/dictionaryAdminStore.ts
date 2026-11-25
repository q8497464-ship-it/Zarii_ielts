/**
 * Zarii Dictionary Admin Store & Patch Management Service
 * 
 * Manages:
 * - Runtime dictionary patches (add, edit, hide, needs review)
 * - Versioned patch releases without redeploying static shards
 * - Bulk Urdu meaning CSV imports with interactive dry-run
 * - Student reported problem triage & resolution
 * - Dictionary build metadata and license attributions
 * - Append-only administrative audit logging
 */

import { contentStore } from '../../shared/content/contentStore';
import { dictionaryStore, type DictionaryEntry } from './dictionaryService';
import type { DictionaryPatchAction, DictionaryPatch } from '../../types/dictionaryPatch';

export interface AdminDictionaryPatch extends DictionaryPatch {
  needsReview?: boolean;
  status: 'draft' | 'published';
  version: number;
}

export interface DictionaryReportEntity {
  id: string;
  word: string;
  category: 'definition' | 'pronunciation' | 'offensive' | 'other';
  details?: string;
  user_email?: string;
  status: 'new' | 'in_review' | 'resolved' | 'ignored';
  createdAt: string;
  resolvedAt?: string;
}

export interface CsvDryRunResult {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  newWordsCount: number;
  existingWordsCount: number;
  errors: string[];
  sampleRows: Array<{
    word: string;
    urduMeaning: string;
    exampleSentence?: string;
    isExisting: boolean;
  }>;
}

export interface DictionaryBuildInfo {
  engineVersion: string;
  patchReleaseVersion: string;
  lastPublishedAt: string;
  totalStaticHeadwords: number;
  totalPatchesCount: number;
  activePublishedPatchesCount: number;
  draftPatchesCount: number;
  totalShards: number;
  sources: Array<{
    name: string;
    version: string;
    license: string;
    url: string;
    description: string;
  }>;
}

const STORAGE_KEY_PATCHES = 'zarii_admin_dictionary_patches_v1';
const STORAGE_KEY_REPORTS = 'zarii_admin_dictionary_reports_v1';
const STORAGE_KEY_BUILD = 'zarii_admin_dictionary_build_v1';

class DictionaryAdminStore {
  private patches: Map<string, AdminDictionaryPatch> = new Map();
  private reports: DictionaryReportEntity[] = [];
  private patchVersion = '1.1.0';
  private lastPublishedAt = '2026-11-20T10:00:00Z';
  private listeners: Set<() => void> = new Set();
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized) return;

    try {
      if (typeof localStorage !== 'undefined') {
        const rawPatches = localStorage.getItem(STORAGE_KEY_PATCHES);
        if (rawPatches) {
          const list: AdminDictionaryPatch[] = JSON.parse(rawPatches);
          list.forEach((p) => this.patches.set(p.id, p));
        } else {
          // Default initial sample patches
          this.seedInitialPatches();
        }

        const rawReports = localStorage.getItem(STORAGE_KEY_REPORTS);
        if (rawReports) {
          this.reports = JSON.parse(rawReports);
        } else {
          this.seedInitialReports();
        }

        const rawBuild = localStorage.getItem(STORAGE_KEY_BUILD);
        if (rawBuild) {
          const b = JSON.parse(rawBuild);
          if (b.patchVersion) this.patchVersion = b.patchVersion;
          if (b.lastPublishedAt) this.lastPublishedAt = b.lastPublishedAt;
        }
      } else {
        this.seedInitialPatches();
        this.seedInitialReports();
      }

      this.initialized = true;
    } catch (e) {
      console.warn('[DictionaryAdminStore] Init error:', e);
      this.initialized = true;
    }
  }

  private seedInitialPatches() {
    const sample: AdminDictionaryPatch[] = [
      {
        id: 'patch-resilience',
        headword: 'resilience',
        pos: 'noun',
        action: 'edit',
        urduMeaning: 'لچک / مصیبت سے ابھرنے کی صلاحیت',
        urduNotes: 'عام طور پر نفسیات اور ذاتی ترقی میں استعمال ہوتا ہے۔',
        needsReview: false,
        status: 'published',
        version: 1,
        isOfficial: true,
        createdAt: '2026-11-20T10:00:00Z',
        updatedAt: '2026-11-20T10:00:00Z',
      },
      {
        id: 'patch-serendipity',
        headword: 'serendipity',
        pos: 'noun',
        action: 'edit',
        urduMeaning: 'غیر متوقع خوشگوار دریافت',
        needsReview: true,
        status: 'draft',
        version: 1,
        isOfficial: true,
        createdAt: '2026-11-22T14:30:00Z',
        updatedAt: '2026-11-22T14:30:00Z',
      },
    ];
    sample.forEach((p) => this.patches.set(p.id, p));
  }

  private seedInitialReports() {
    this.reports = [
      {
        id: 'rep-1',
        word: 'eloquent',
        category: 'definition',
        details: 'The definition could highlight spoken vs written eloquence more clearly.',
        user_email: 'candidate1@zarii.app',
        status: 'new',
        createdAt: '2026-11-22T08:15:00Z',
      },
      {
        id: 'rep-2',
        word: 'paradigm',
        category: 'pronunciation',
        details: 'IPA shows silent g correctly, but audio accent is slightly fast.',
        user_email: 'sarah.l@zarii.app',
        status: 'in_review',
        createdAt: '2026-11-21T16:40:00Z',
      },
      {
        id: 'rep-3',
        word: 'meticulous',
        category: 'definition',
        details: 'Urdu meaning باریک بین / انتہائی محتاط would be very helpful.',
        user_email: 'ahmed.k@zarii.app',
        status: 'resolved',
        createdAt: '2026-11-19T11:20:00Z',
        resolvedAt: '2026-11-20T09:00:00Z',
      },
    ];
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          STORAGE_KEY_PATCHES,
          JSON.stringify(Array.from(this.patches.values()))
        );
        localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(this.reports));
        localStorage.setItem(
          STORAGE_KEY_BUILD,
          JSON.stringify({
            patchVersion: this.patchVersion,
            lastPublishedAt: this.lastPublishedAt,
          })
        );
      }
    } catch (e) {
      console.warn('[DictionaryAdminStore] Persist error:', e);
    }
    this.notify();
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error(e);
      }
    });
  }

  /**
   * Retrieves patches filtered by search, status, and review flags
   */
  public getPatches(filter?: {
    search?: string;
    status?: 'all' | 'draft' | 'published';
    needsReview?: boolean;
    forStudent?: boolean;
  }): AdminDictionaryPatch[] {
    this.init();
    let result = Array.from(this.patches.values());

    if (filter?.forStudent) {
      result = result.filter((p) => p.status === 'published');
    }

    if (filter?.status && filter.status !== 'all') {
      result = result.filter((p) => p.status === filter.status);
    }

    if (filter?.needsReview !== undefined) {
      result = result.filter((p) => !!p.needsReview === filter.needsReview);
    }

    if (filter?.search?.trim()) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.headword.toLowerCase().includes(q) ||
          (p.urduMeaning && p.urduMeaning.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  public getPatchForWord(word: string, options: { forStudent?: boolean } = {}): AdminDictionaryPatch | null {
    this.init();
    const clean = word.toLowerCase().trim();
    for (const p of this.patches.values()) {
      if (p.headword.toLowerCase() === clean) {
        if (options.forStudent && p.status !== 'published') return null;
        return { ...p };
      }
    }
    return null;
  }

  /**
   * Saves or creates a patch entry
   */
  public savePatch(
    patch: Omit<AdminDictionaryPatch, 'version' | 'createdAt' | 'updatedAt'> & {
      id?: string;
      version?: number;
      createdAt?: string;
      updatedAt?: string;
    },
    actorId = 'admin@zarii.app'
  ): AdminDictionaryPatch {
    this.init();
    const cleanWord = patch.headword.toLowerCase().trim();
    const patchId = patch.id || `patch-${cleanWord}`;
    const prev = this.patches.get(patchId);
    const isNew = !prev;

    const updated: AdminDictionaryPatch = {
      ...patch,
      id: patchId,
      headword: cleanWord,
      version: (prev?.version || 0) + 1,
      createdAt: prev?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.patches.set(patchId, updated);
    this.persist();

    contentStore.recordAudit(
      isNew ? 'CREATE_DICTIONARY_PATCH' : 'UPDATE_DICTIONARY_PATCH',
      'dictionary_patch',
      cleanWord,
      prev || null,
      updated
    );

    return updated;
  }

  /**
   * Deletes a patch
   */
  public deletePatch(patchId: string, actorId = 'admin@zarii.app'): boolean {
    this.init();
    const prev = this.patches.get(patchId);
    if (!prev) return false;

    this.patches.delete(patchId);
    this.persist();

    contentStore.recordAudit('DELETE_DICTIONARY_PATCH', 'dictionary_patch', patchId, prev, null);
    return true;
  }

  /**
   * Publishes all draft patches as a new versioned release
   */
  public publishPatches(actorId = 'admin@zarii.app'): {
    version: string;
    publishedCount: number;
  } {
    this.init();
    let count = 0;
    const prevVersion = this.patchVersion;
    const parts = prevVersion.split('.').map(Number);
    const nextVersion = `${parts[0] || 1}.${parts[1] || 1}.${(parts[2] || 0) + 1}`;

    this.patches.forEach((patch) => {
      if (patch.status === 'draft') {
        patch.status = 'published';
        patch.version += 1;
        patch.updatedAt = new Date().toISOString();
        count++;
      }
    });

    this.patchVersion = nextVersion;
    this.lastPublishedAt = new Date().toISOString();
    this.persist();

    contentStore.recordAudit('PUBLISH_DICTIONARY_PATCHES', 'dictionary_release', nextVersion, { prevVersion }, {
      nextVersion,
      publishedCount: count,
      publishedAt: this.lastPublishedAt,
    });

    return { version: nextVersion, publishedCount: count };
  }

  /**
   * Bulk Import Urdu meanings CSV with dry-run
   */
  public dryRunImportUrduCsv(csvText: string): CsvDryRunResult {
    this.init();
    const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const errors: string[] = [];
    const sampleRows: CsvDryRunResult['sampleRows'] = [];
    let validRows = 0;
    let newWordsCount = 0;
    let existingWordsCount = 0;

    if (lines.length === 0) {
      return {
        totalRows: 0,
        validRows: 0,
        invalidRows: 0,
        newWordsCount: 0,
        existingWordsCount: 0,
        errors: ['CSV file is empty.'],
        sampleRows: [],
      };
    }

    // Skip header if detected
    const firstLine = lines[0].toLowerCase();
    const startIndex = firstLine.includes('word') || firstLine.includes('urdu') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      // Simple CSV parse supporting comma separation
      const cols = line.split(',').map((c) => c.replace(/^["']|["']$/g, '').trim());
      const word = cols[0]?.toLowerCase();
      const urdu = cols[1];
      const example = cols[2];

      if (!word || !urdu) {
        errors.push(`Row ${i + 1}: Missing headword or Urdu meaning ("${line.slice(0, 30)}...")`);
        continue;
      }

      validRows++;
      const isExisting = Array.from(this.patches.values()).some((p) => p.headword === word);
      if (isExisting) existingWordsCount++;
      else newWordsCount++;

      if (sampleRows.length < 10) {
        sampleRows.push({
          word,
          urduMeaning: urdu,
          exampleSentence: example,
          isExisting,
        });
      }
    }

    return {
      totalRows: lines.length - startIndex,
      validRows,
      invalidRows: lines.length - startIndex - validRows,
      newWordsCount,
      existingWordsCount,
      errors,
      sampleRows,
    };
  }

  /**
   * Commits bulk Urdu import
   */
  public commitImportUrduCsv(
    csvText: string,
    actorId = 'admin@zarii.app'
  ): { importedCount: number } {
    this.init();
    const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const firstLine = lines[0]?.toLowerCase() || '';
    const startIndex = firstLine.includes('word') || firstLine.includes('urdu') ? 1 : 0;
    let count = 0;

    for (let i = startIndex; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.replace(/^["']|["']$/g, '').trim());
      const word = cols[0]?.toLowerCase();
      const urdu = cols[1];
      const example = cols[2];

      if (word && urdu) {
        const patchId = `patch-${word}`;
        const prev = this.patches.get(patchId);
        this.patches.set(patchId, {
          id: patchId,
          headword: word,
          pos: prev?.pos || 'noun',
          action: prev ? 'edit' : 'add',
          urduMeaning: urdu,
          senses: example
            ? [{ def: prev?.senses?.[0]?.def || '', urduMeaning: urdu, examples: [example] }]
            : prev?.senses,
          needsReview: false,
          status: 'draft',
          version: (prev?.version || 0) + 1,
          isOfficial: true,
          createdAt: prev?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        count++;
      }
    }

    this.persist();

    contentStore.recordAudit('BULK_IMPORT_URDU_DICTIONARY_CSV', 'dictionary_patch', 'bulk', null, {
      importedCount: count,
    });

    return { importedCount: count };
  }

  // ====================================================================
  // STUDENT REPORTS MANAGEMENT
  // ====================================================================

  public getReports(filter?: { status?: string; word?: string }): DictionaryReportEntity[] {
    this.init();
    let list = [...this.reports];
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((r) => r.status === filter.status);
    }
    if (filter?.word?.trim()) {
      const q = filter.word.toLowerCase().trim();
      list = list.filter((r) => r.word.toLowerCase().includes(q));
    }
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  public submitReport(
    word: string,
    category: DictionaryReportEntity['category'],
    details?: string,
    userEmail?: string
  ): DictionaryReportEntity {
    this.init();
    const report: DictionaryReportEntity = {
      id: `rep-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      word: word.toLowerCase().trim(),
      category,
      details,
      user_email: userEmail,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    this.reports.unshift(report);
    this.persist();
    return report;
  }

  public updateReportStatus(
    reportId: string,
    status: DictionaryReportEntity['status'],
    actorId = 'admin@zarii.app'
  ): boolean {
    this.init();
    const report = this.reports.find((r) => r.id === reportId);
    if (!report) return false;

    report.status = status;
    if (status === 'resolved') {
      report.resolvedAt = new Date().toISOString();
    }
    this.persist();

    contentStore.recordAudit('UPDATE_DICTIONARY_REPORT_STATUS', 'dictionary_report', reportId, null, {
      status,
      word: report.word,
    });
    return true;
  }

  /**
   * Returns dictionary build info and licensing attributions
   */
  public getBuildInfo(): DictionaryBuildInfo {
    this.init();
    const allPatches = Array.from(this.patches.values());
    const publishedPatches = allPatches.filter((p) => p.status === 'published');
    const draftPatches = allPatches.filter((p) => p.status === 'draft');

    return {
      engineVersion: '2024.11-v1',
      patchReleaseVersion: `v${this.patchVersion}`,
      lastPublishedAt: this.lastPublishedAt,
      totalStaticHeadwords: 144410,
      totalPatchesCount: allPatches.length,
      activePublishedPatchesCount: publishedPatches.length,
      draftPatchesCount: draftPatches.length,
      totalShards: 44,
      sources: [
        {
          name: 'Open English WordNet',
          version: '2024 Release',
          license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
          url: 'https://en-word.net',
          description: 'Primary headwords, senses, synsets, definitions, and morphological exceptions.',
        },
        {
          name: 'CMU Pronouncing Dictionary',
          version: '0.7b',
          license: 'BSD 2-Clause License',
          url: 'http://www.speech.cs.cmu.edu/cgi-bin/cmudict',
          description: 'North American phonetic transcriptions (ARPAbet & mapped IPA).',
        },
        {
          name: 'DWYL English Words',
          version: 'words_alpha',
          license: 'MIT License',
          url: 'https://github.com/dwyl/english-words',
          description: 'Spelling validation and lexical headword candidate filtering.',
        },
        {
          name: 'Wiktionary / Kaikki.org',
          version: '2024 Extracts',
          license: 'Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)',
          url: 'https://kaikki.org',
          description: 'Secondary inflections and etymology (active under Wiktionary layer).',
        },
      ],
    };
  }
}

export const dictionaryAdminStore = new DictionaryAdminStore();
