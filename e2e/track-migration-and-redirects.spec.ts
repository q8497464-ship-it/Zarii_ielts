import { test, expect } from '@playwright/test';

test.describe('E2E: Backward-Compatibility URL Redirects & Track Migration Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
      localStorage.setItem('zarii_product_tour_completed', 'true');
      sessionStorage.setItem('zarii_splash_shown', 'true');
    });
  });

  // 1. Un-prefixed legacy top-level routes redirect to /app/ielts/*
  test('redirects un-prefixed legacy URLs to their new homes', async ({ page }) => {
    // /practice -> /app/ielts/practice
    await page.goto('/practice');
    await page.waitForURL('**/app/ielts/practice');
    expect(page.url()).toContain('/app/ielts/practice');

    // /mock -> /app/ielts/mock
    await page.goto('/mock');
    await page.waitForURL('**/app/ielts/mock');
    expect(page.url()).toContain('/app/ielts/mock');

    // /vocab -> /app/ielts/vocab
    await page.goto('/vocab');
    await page.waitForURL('**/app/ielts/vocab');
    expect(page.url()).toContain('/app/ielts/vocab');

    // /progress -> /app/progress
    await page.goto('/progress');
    await page.waitForURL('**/app/progress');
    expect(page.url()).toContain('/app/progress');

    // /settings -> /app/settings
    await page.goto('/settings');
    await page.waitForURL('**/app/settings');
    expect(page.url()).toContain('/app/settings');
  });

  // 2. Legacy /app/ prefixed subpaths redirect to /app/ielts/*
  test('redirects legacy /app/practice and /app/mock subpaths to /app/ielts/*', async ({ page }) => {
    // /app/practice -> /app/ielts/practice
    await page.goto('/app/practice');
    await page.waitForURL('**/app/ielts/practice');
    expect(page.url()).toContain('/app/ielts/practice');

    // /app/mock -> /app/ielts/mock
    await page.goto('/app/mock');
    await page.waitForURL('**/app/ielts/mock');
    expect(page.url()).toContain('/app/ielts/mock');

    // /app/vocab -> /app/ielts/vocab
    await page.goto('/app/vocab');
    await page.waitForURL('**/app/ielts/vocab');
    expect(page.url()).toContain('/app/ielts/vocab');
  });

  // 3. Pre-migration seeded user profile keeps all data and supports rollback
  test('seeded user profile preserves all data post-migration and rollback functions correctly', async ({ page }) => {
    await page.goto('/app');

    // Test migration within browser window with real IndexedDB
    const migrationResult = await page.evaluate(async () => {
      // Access db from window / dynamic import
      const { db } = await import('/src/lib/db.ts');
      const { runTrackMigration, rollbackTrackMigration } = await import('/src/lib/trackMigration.ts');

      // Clear existing records
      await db.profile.clear();
      await db.attempts.clear();
      await db.vocabProgress.clear();

      // Seed pre-migration legacy data without track field
      await db.profile.add({
        id: 'seeded-student-1',
        name: 'Ahmad Khan',
        targetBand: 8.0,
        createdAt: '2025-01-01T00:00:00Z',
        onboardingCompleted: true,
      } as any);

      await db.attempts.add({
        id: 'legacy-attempt-1',
        module: 'reading',
        score: 35,
        rawScore: 35,
        completedAt: '2025-01-05T00:00:00Z',
      } as any);

      await db.vocabProgress.add({
        id: 'legacy-word-1',
        word: 'ubiquitous',
        box: 3,
        lastReviewed: '2025-01-06T00:00:00Z',
      } as any);

      // Execute migration
      const res = await runTrackMigration(true);

      // Verify post-migration tagging
      const attempt = await db.attempts.get('legacy-attempt-1');
      const vocab = await db.vocabProgress.get('legacy-word-1');
      const profile = await db.profile.get('seeded-student-1');

      // Verify backup exists
      const backupRaw = localStorage.getItem('zarii_track_migration_v1_backup');

      // Test rollback
      const rollback = await rollbackTrackMigration();
      const flagAfterRollback = localStorage.getItem('zarii_track_migration_v1_completed');

      return {
        migrationResult: res,
        attemptTrack: attempt?.track,
        attemptScore: attempt?.score,
        vocabTrack: vocab?.track,
        profileTrack: profile?.primaryTrack,
        profileBand: profile?.targetBand,
        hasBackup: Boolean(backupRaw),
        rollbackSuccess: rollback.success,
        flagAfterRollback,
      };
    });

    expect(migrationResult.migrationResult.migrated).toBe(true);
    expect(migrationResult.attemptTrack).toBe('ielts');
    expect(migrationResult.attemptScore).toBe(35);
    expect(migrationResult.vocabTrack).toBe('ielts');
    expect(migrationResult.profileTrack).toBe('ielts');
    expect(migrationResult.profileBand).toBe(8.0);
    expect(migrationResult.hasBackup).toBe(true);
    expect(migrationResult.rollbackSuccess).toBe(true);
    expect(migrationResult.flagAfterRollback).toBeNull();
  });
});
