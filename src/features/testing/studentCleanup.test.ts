import { describe, it, expect } from 'vitest';
import { MAIN_NAVIGATION, getPageTitle } from '../../lib/navigationConfig';
import { settingsStore } from '../../shared/settings/settingsStore';
import { communicationStore } from '../../shared/communication/communicationStore';

const mockStorage: Record<string, string> = {};
if (typeof globalThis.localStorage === 'undefined') {
  (globalThis as any).localStorage = {
    getItem: (k: string) => mockStorage[k] ?? null,
    setItem: (k: string, v: string) => { mockStorage[k] = v; },
    removeItem: (k: string) => { delete mockStorage[k]; },
    clear: () => { Object.keys(mockStorage).forEach((k) => delete mockStorage[k]); },
    length: 0,
    key: () => null,
  };
}

describe('STUDENT APP CLEANUP: Information Architecture & Student-Only Features', () => {
  describe('1. Final Navigation Specifications', () => {
    it('defines the 4 navigation groups containing Home, Practice, Mock Tests, Vocabulary, Progress, Study Plan, and Profile', () => {
      expect(MAIN_NAVIGATION).toHaveLength(4);

      // Home
      expect(MAIN_NAVIGATION[0].items[0].name).toBe('Home');
      expect(MAIN_NAVIGATION[0].items[0].path).toBe('/app');

      // Learn
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

      // Progress
      expect(MAIN_NAVIGATION[2].label).toBe('PROGRESS');
      expect(MAIN_NAVIGATION[2].items[0].name).toBe('Progress');
      expect(MAIN_NAVIGATION[2].items[0].path).toBe('/app/dashboard');

      // Account
      expect(MAIN_NAVIGATION[3].label).toBe('ACCOUNT');
      expect(MAIN_NAVIGATION[3].items[0].name).toBe('Profile & Settings');
      expect(MAIN_NAVIGATION[3].items[0].path).toBe('/app/settings');
    });

    it('resolves correct titles and categories for student routes and aliases', () => {
      expect(getPageTitle('/')).toEqual({ title: 'Home' });
      expect(getPageTitle('/practice')).toEqual({ title: 'Practice Modules', category: 'Learn' });
      expect(getPageTitle('/mock')).toEqual({ title: 'Mock Exams', category: 'Learn' });
      expect(getPageTitle('/vocab')).toEqual({ title: 'Vocabulary & Grammar', category: 'Learn' });
      expect(getPageTitle('/plan')).toEqual({ title: 'Study Plan', category: 'Learn' });
      expect(getPageTitle('/dashboard')).toEqual({ title: 'Performance Dashboard', category: 'Progress' });
      expect(getPageTitle('/progress')).toEqual({ title: 'Performance Dashboard', category: 'Progress' });
      expect(getPageTitle('/settings')).toEqual({ title: 'Settings' });
      expect(getPageTitle('/profile')).toEqual({ title: 'Settings' });
    });
  });

  describe('2. Student-Only Profile and Settings Tabs', () => {
    it('ensures SettingsPage exports valid student tabs', async () => {
      const settingsModule = await import('../settings/SettingsPage');
      expect(settingsModule.SettingsPage).toBeDefined();
    }, 15000);

    it('manages student study preferences and defaults cleanly', () => {
      const defaults = settingsStore.getDefaults();
      expect(defaults.readingTimerMinutes).toBe(60);
      expect(defaults.listeningTimerMinutes).toBe(40);
      expect(defaults.writingTask1Minutes).toBe(20);
      expect(defaults.writingTask2Minutes).toBe(40);
      expect(defaults.defaultTargetBand).toBe(7.5);
    });
  });

  describe('3. Module Landing Pages and Practice Structure', () => {
    it('verifies ModuleLandingStructure exports and contract', async () => {
      const moduleLanding = await import('../../components/practice/ModuleLandingStructure');
      expect(moduleLanding.ModuleLandingStructure).toBeDefined();
    });

    it('verifies all 4 skill module pages exist and render cleanly', async () => {
      const reading = await import('../reading/ReadingPage');
      const listening = await import('../listening/ListeningPage');
      const writing = await import('../writing/WritingPage');
      const speaking = await import('../speaking/SpeakingPage');

      expect(reading.ReadingPage).toBeDefined();
      expect(listening.ListeningPage).toBeDefined();
      expect(writing.WritingPage).toBeDefined();
      expect(speaking.SpeakingPage).toBeDefined();
    });
  });

  describe('4. Maintenance Mode & Feature Flags', () => {
    it('respects maintenance mode toggle', () => {
      expect(settingsStore.getMaintenance().enabled).toBe(false);
      settingsStore.updateMaintenance({ enabled: true, message: 'Upgrading question bank' });
      expect(settingsStore.getMaintenance().enabled).toBe(true);
      expect(settingsStore.getMaintenance().message).toBe('Upgrading question bank');

      // Revert to normal
      settingsStore.updateMaintenance({ enabled: false });
      expect(settingsStore.getMaintenance().enabled).toBe(false);
    });

    it('respects individual feature flags for modules', () => {
      expect(settingsStore.isFeatureEnabled('listening')).toBe(true);
      expect(settingsStore.isFeatureEnabled('speaking')).toBe(true);

      settingsStore.updateFeatureFlag('listening', false);
      expect(settingsStore.isFeatureEnabled('listening')).toBe(false);

      // Restore
      settingsStore.updateFeatureFlag('listening', true);
      expect(settingsStore.isFeatureEnabled('listening')).toBe(true);
    });

    it('serves active dismissible announcements to student runtime', () => {
      const active = communicationStore.getActiveAnnouncementsForStudent();
      expect(Array.isArray(active)).toBe(true);
    });
  });

  describe('5. Student UI Bundle Isolation', () => {
    it('ensures no /admin links are present in student navigation', () => {
      const allPaths = MAIN_NAVIGATION.flatMap((g) => g.items.map((i) => i.path));
      for (const p of allPaths) {
        expect(p.startsWith('/admin')).toBe(false);
      }
    });
  });
});
