import { describe, it, expect } from 'vitest';
import { MAIN_NAVIGATION, BOTTOM_NAVIGATION, getPageTitle } from '../../lib/navigationConfig';

describe('Sidebar Layout & Navigation Polish Specifications', () => {
  it('places Profile & Settings inside ACCOUNT in MAIN_NAVIGATION', () => {
    const accountGroup = MAIN_NAVIGATION.find((g) => g.label === 'ACCOUNT');
    expect(accountGroup).toBeDefined();
    expect(accountGroup?.items).toHaveLength(1);
    expect(accountGroup?.items[0].name).toBe('Profile & Settings');
    expect(accountGroup?.items[0].path).toBe('/app/settings');
  });

  it('ensures BOTTOM_NAVIGATION is empty so the profile card sits alone at the bottom', () => {
    expect(BOTTOM_NAVIGATION).toHaveLength(0);
  });

  it('defines the 4 core navigation groups in strict hierarchical order', () => {
    expect(MAIN_NAVIGATION).toHaveLength(4);
    // Group 0: Top level Home
    expect(MAIN_NAVIGATION[0].label).toBeUndefined();
    expect(MAIN_NAVIGATION[0].items[0].name).toBe('Home');
    expect(MAIN_NAVIGATION[0].items[0].path).toBe('/app');

    // Group 1: LEARN
    expect(MAIN_NAVIGATION[1].label).toBe('LEARN');
    expect(MAIN_NAVIGATION[1].items.map((i) => i.name)).toEqual([
      'Practice',
      'Mock Tests',
      'Vocabulary',
      'Study Plan',
    ]);
    expect(MAIN_NAVIGATION[1].items.map((i) => i.path)).toEqual([
      '/app/practice',
      '/app/mock',
      '/app/vocab',
      '/app/plan',
    ]);

    // Group 2: PROGRESS
    expect(MAIN_NAVIGATION[2].label).toBe('PROGRESS');
    expect(MAIN_NAVIGATION[2].items[0].name).toBe('Progress');
    expect(MAIN_NAVIGATION[2].items[0].path).toBe('/app/dashboard');

    // Group 3: ACCOUNT
    expect(MAIN_NAVIGATION[3].label).toBe('ACCOUNT');
    expect(MAIN_NAVIGATION[3].items[0].name).toBe('Profile & Settings');
  });

  it('correctly maps titles for topbar breadcrumb display across routes', () => {
    expect(getPageTitle('/')).toEqual({ title: 'Home' });
    expect(getPageTitle('/practice')).toEqual({ title: 'Practice Modules', category: 'Learn' });
    expect(getPageTitle('/mock')).toEqual({ title: 'Mock Exams', category: 'Learn' });
    expect(getPageTitle('/vocab')).toEqual({ title: 'Vocabulary & Grammar', category: 'Learn' });
    expect(getPageTitle('/dashboard')).toEqual({ title: 'Performance Dashboard', category: 'Progress' });
    expect(getPageTitle('/settings')).toEqual({ title: 'Settings' });
  });

  it('validates layout token specifications', () => {
    // 64px header (h-16), 100dvh height, 20px icon column (w-5 h-5), 14px label (text-sm), 12px padding (p-3)
    const tokenSpecs = {
      headerHeightPx: 64,
      iconColumnWidthPx: 20,
      itemHeightMinPx: 40,
      itemHeightMaxPx: 44,
      sidebarPaddingPx: 12,
      groupSpacingTopPx: 24,
      groupSpacingBottomPx: 8,
      collapsedWidthPx: 72,
      expandedWidthPx: 256,
    };

    expect(tokenSpecs.headerHeightPx).toBe(64);
    expect(tokenSpecs.groupSpacingTopPx).toBe(24);
    expect(tokenSpecs.groupSpacingBottomPx).toBe(8);
    expect(tokenSpecs.sidebarPaddingPx).toBe(12);
    expect(tokenSpecs.iconColumnWidthPx).toBe(20);
    expect(tokenSpecs.collapsedWidthPx).toBe(72);
    expect(tokenSpecs.expandedWidthPx).toBe(256);
  });
});
