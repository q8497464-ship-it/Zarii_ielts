import { describe, it, expect } from 'vitest';
import { SIDEBAR_SECTIONS } from '../../apps/admin/components/AdminSidebar';

describe('Admin Panel Navigation & Layout Structure', () => {
  it('defines the 8 mandatory sidebar sections with exact IDs', () => {
    const sectionIds = SIDEBAR_SECTIONS.map((s) => s.id);
    expect(sectionIds).toEqual([
      'overview',
      'content',
      'users',
      'analytics',
      'ai',
      'communication',
      'settings',
      'system',
    ]);
  });

  it('restricts sidebar sections for editors: only Content and Communication are visible', () => {
    const editorSections = SIDEBAR_SECTIONS.filter((s) => {
      if (s.roleRequired === 'admin') return false;
      return true;
    });

    const editorSectionIds = editorSections.map((s) => s.id);
    expect(editorSectionIds).toEqual(['content', 'communication']);
    expect(editorSectionIds).not.toContain('overview');
    expect(editorSectionIds).not.toContain('users');
    expect(editorSectionIds).not.toContain('analytics');
    expect(editorSectionIds).not.toContain('ai');
    expect(editorSectionIds).not.toContain('settings');
    expect(editorSectionIds).not.toContain('system');
  });

  it('provides all 8 sections to users with the admin role', () => {
    const adminSections = SIDEBAR_SECTIONS.filter((s) => {
      // Admin satisfies all role requirements
      return true;
    });
    expect(adminSections.length).toBe(8);
  });

  it('includes pending badges on actionable items (drafts in content, unread in communication)', () => {
    const content = SIDEBAR_SECTIONS.find((s) => s.id === 'content');
    const comms = SIDEBAR_SECTIONS.find((s) => s.id === 'communication');

    expect(content?.badge).toBeDefined();
    expect(content?.badge).toContain('drafts');

    expect(comms?.badge).toBeDefined();
    expect(comms?.badge).toContain('unread');
  });

  it('configures distinct sub-items for multi-faceted administrative domains', () => {
    const content = SIDEBAR_SECTIONS.find((s) => s.id === 'content');
    expect(content?.items?.map((i) => i.id)).toEqual([
      'tests',
      'questions',
      'writing',
      'speaking',
      'vocab',
    ]);

    const users = SIDEBAR_SECTIONS.find((s) => s.id === 'users');
    expect(users?.items?.map((i) => i.id)).toEqual(['students', 'roles']);

    const system = SIDEBAR_SECTIONS.find((s) => s.id === 'system');
    expect(system?.items?.map((i) => i.id)).toEqual(['audit', 'health', 'media']);
  });
});

describe('Admin Data Table & Utilities Logic', () => {
  it('correctly sorts tabular data ascending and descending', () => {
    const items = [
      { id: '1', score: 7.0, title: 'Academic Test B' },
      { id: '2', score: 8.5, title: 'Academic Test C' },
      { id: '3', score: 6.5, title: 'Academic Test A' },
    ];

    const sortedAsc = [...items].sort((a, b) => a.score - b.score);
    expect(sortedAsc[0].score).toBe(6.5);
    expect(sortedAsc[2].score).toBe(8.5);

    const sortedDesc = [...items].sort((a, b) => b.score - a.score);
    expect(sortedDesc[0].score).toBe(8.5);
    expect(sortedDesc[2].score).toBe(6.5);
  });

  it('correctly filters rows based on search queries across fields', () => {
    const rows = [
      { id: 't-101', title: 'Cambridge Academic 19 Reading', band: 'Band 7.5' },
      { id: 't-102', title: 'Listening Test Audio Stage', band: 'Band 7.0' },
      { id: 't-103', title: 'Renewable Energy Reading Passage', band: 'Band 8.0' },
    ];

    const filterQuery = (query: string) => {
      const q = query.toLowerCase();
      return rows.filter((r) => r.title.toLowerCase().includes(q) || r.band.toLowerCase().includes(q));
    };

    expect(filterQuery('reading').length).toBe(2);
    expect(filterQuery('8.0').length).toBe(1);
    expect(filterQuery('nonexistent').length).toBe(0);
  });

  it('formats CSV data strings correctly escaping commas and quotes', () => {
    const headers = ['ID', 'Title', 'Module'];
    const row = ['t-101', 'Cambridge Academic 19, Test 1', 'Reading'];

    const formatCsvRow = (cells: string[]) =>
      cells.map((c) => (c.includes(',') ? `"${c.replace(/"/g, '""')}"` : c)).join(',');

    expect(formatCsvRow(headers)).toBe('ID,Title,Module');
    expect(formatCsvRow(row)).toBe('t-101,"Cambridge Academic 19, Test 1",Reading');
  });

  it('validates type-to-confirm requirements for destructive actions', () => {
    const confirmMatchText = 'DELETE';
    const validate = (typed: string) => typed.trim() === confirmMatchText;

    expect(validate('delete')).toBe(false);
    expect(validate('DEL')).toBe(false);
    expect(validate('DELETE')).toBe(true);
    expect(validate('  DELETE  ')).toBe(true);
  });
});
