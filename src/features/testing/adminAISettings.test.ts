import { describe, it, expect, beforeEach } from 'vitest';
import {
  aiConfigStore,
  type AIProviderConfig,
  type CalibrationSample,
} from '../../shared/ai/aiConfigStore';
import {
  settingsStore,
  calculateContrastRatio,
  type FeatureFlagsSettings,
} from '../../shared/settings/settingsStore';
import { contentStore } from '../../shared/content/contentStore';

describe('Admin 5: AI and Evaluation Store', () => {
  beforeEach(() => {
    aiConfigStore.resetToDefault();
  });

  it('provides a prioritized list of AI providers with write-only masked API keys', () => {
    const providers = aiConfigStore.getProviders();
    expect(providers.length).toBeGreaterThanOrEqual(3);

    // Should be sorted by priority
    expect(providers[0].priority).toBeLessThanOrEqual(providers[1].priority);

    // Primary provider is Gemini
    const gemini = providers.find((p) => p.provider === 'gemini');
    expect(gemini).toBeDefined();
    expect(gemini?.enabled).toBe(true);
    expect(gemini?.apiKeyMasked).toContain('••••');
    // Ensure raw key is never exposed
    expect(gemini?.apiKeyMasked).not.toEqual('AIzaSyRealSecretKey12345');
  });

  it('masks raw API keys upon saving and marks key as configured', () => {
    const saveRes = aiConfigStore.saveProvider({
      id: 'provider-test',
      name: 'Custom Test LLM',
      provider: 'custom',
      model: 'test-model-v1',
      enabled: true,
      priority: 4,
      dailyLimit: 2000,
      apiKeyMasked: '',
      hasKeyConfigured: false,
      rawApiKey: 'sk-secret-token-abcdef123456',
    });

    expect(saveRes.success).toBe(true);

    const saved = aiConfigStore.getProviders().find((p) => p.id === 'provider-test');
    expect(saved).toBeDefined();
    expect(saved?.apiKeyMasked).toBe('••••••••••••••••3456');
    expect(saved?.hasKeyConfigured).toBe(true);
  });

  it('toggles provider active status in fallback pool', () => {
    const gemini = aiConfigStore.getProviders().find((p) => p.provider === 'gemini')!;
    expect(gemini.enabled).toBe(true);

    aiConfigStore.toggleProviderEnabled(gemini.id);
    const updated = aiConfigStore.getProviders().find((p) => p.id === gemini.id)!;
    expect(updated.enabled).toBe(false);
  });

  it('tests provider connection with authentic response latency health check', async () => {
    const gemini = aiConfigStore.getProviders().find((p) => p.provider === 'gemini')!;
    const testResult = await aiConfigStore.testProviderConnection(gemini.id);

    expect(testResult.success).toBe(true);
    expect(testResult.latencyMs).toBeGreaterThan(0);
    expect(testResult.message).toContain('Connection successful');
  });

  it('manages examiner prompt versioning and history tracking', () => {
    const state = aiConfigStore.getState();
    const initialVersion = state.prompts.writing.currentVersion;

    const newPromptText = `${state.prompts.writing.currentPrompt}\n\n### EXTRA RULE: Deduct 0.5 band for missing overview in Task 1.`;
    const res = aiConfigStore.updatePrompt(
      'writing',
      newPromptText,
      'Added mandatory Task 1 overview rule'
    );

    expect(res.success).toBe(true);
    expect(res.version).toBe(initialVersion + 1);

    const updatedState = aiConfigStore.getState();
    expect(updatedState.prompts.writing.currentVersion).toBe(initialVersion + 1);
    expect(updatedState.prompts.writing.history[0].changeNote).toBe(
      'Added mandatory Task 1 overview rule'
    );
  });

  it('computes line diffs accurately between prompt versions', () => {
    const state = aiConfigStore.getState();
    const vCurrent = state.prompts.writing.currentVersion;
    const vPrev = state.prompts.writing.history[1].version;

    const diff = aiConfigStore.computePromptDiff('writing', vPrev, vCurrent);
    expect(diff.versionA?.version).toBe(vPrev);
    expect(diff.versionB?.version).toBe(vCurrent);
    expect(diff.identicalLinesCount).toBeGreaterThan(0);
  });

  it('restores historical prompt versions smoothly', () => {
    const initialVer = aiConfigStore.getState().prompts.writing.currentVersion;
    const targetVer = 1;

    const restored = aiConfigStore.restorePromptVersion('writing', targetVer);
    expect(restored).toBe(true);

    const newState = aiConfigStore.getState();
    expect(newState.prompts.writing.currentVersion).toBe(initialVer + 1);
  });

  it('runs prompt evaluation test sandbox against sample essay', () => {
    const sampleEssay = `Fossil fuel taxation represents an indispensable economic mechanism for mitigating environmental degradation. By internalizing carbon externalities, governments compel heavy industries to decarbonize rapidly.`;
    const evalResult = aiConfigStore.testPromptEvaluation('writing', sampleEssay);

    expect(evalResult.overallBand).toBeGreaterThanOrEqual(6.0);
    expect(evalResult.overallBand).toBeLessThanOrEqual(9.0);
    expect(evalResult.criteriaScores.taskAchievement).toBeDefined();
    expect(evalResult.comments.length).toBeGreaterThan(0);
    expect(evalResult.latencyMs).toBeGreaterThan(0);
  });

  it('enforces per-user daily limits, global budgets, and quota alerts', () => {
    aiConfigStore.updateRateLimits({
      perUserDailyLimit: 12,
      globalDailyBudget: 1000,
      fallbackToRuleBased: true,
    });

    const state = aiConfigStore.getState();
    expect(state.rateLimits.perUserDailyLimit).toBe(12);
    expect(state.rateLimits.globalDailyBudget).toBe(1000);
    expect(state.rateLimits.fallbackToRuleBased).toBe(true);

    // Free tier usage status tracking
    const quota = aiConfigStore.getFreeTierUsageStatus();
    expect(quota.geminiLimit).toBe(1500);
    expect(quota.groqLimit).toBe(14400);
  });

  it('executes official Cambridge calibration suite with zero band variance', () => {
    const samples = aiConfigStore.getCalibrationSamples();
    expect(samples.length).toBe(4);

    const report = aiConfigStore.runCalibrationSuite();
    expect(report.samples.length).toBe(4);
    expect(report.calibrationPassed).toBe(true);
    expect(report.perfectMatchesCount).toBe(4);
    expect(report.maxVariance).toBe(0.0);
  });
});

describe('Admin 5: Site Settings & Platform Controls Store', () => {
  beforeEach(() => {
    settingsStore.resetToDefault();
  });

  it('maintains brand tokens and updates application branding', () => {
    const branding = settingsStore.getBranding();
    expect(branding.appName).toBe('Zarii');
    expect(branding.primaryColor).toBe('#124F40');
    expect(branding.accentColor).toBe('#5BB78D');

    settingsStore.updateBranding({ appName: 'Zarii Official IELTS' });
    expect(settingsStore.getBranding().appName).toBe('Zarii Official IELTS');
  });

  it('calculates WCAG 2.1 contrast ratios and checks AA/AAA compliance', () => {
    // Primary deep green (#124F40) on Surface off-white (#F7FAF8)
    const contrast1 = calculateContrastRatio('#124F40', '#F7FAF8');
    expect(contrast1.ratio).toBeGreaterThanOrEqual(9.0);
    expect(contrast1.normalTextAA).toBe(true);
    expect(contrast1.normalTextAAA).toBe(true);

    // Accent mint (#5BB78D) on Primary (#124F40)
    const contrast2 = calculateContrastRatio('#5BB78D', '#124F40');
    expect(contrast2.ratio).toBeGreaterThanOrEqual(3.5);
    expect(contrast2.largeTextAA).toBe(true);

    // Low contrast check (e.g. #FFFFFF on #EEEEEE)
    const lowContrast = calculateContrastRatio('#FFFFFF', '#EEEEEE');
    expect(lowContrast.normalTextAA).toBe(false);
  });

  it('toggles live feature flags for modules without code redeployment', () => {
    expect(settingsStore.isFeatureEnabled('speaking')).toBe(true);

    settingsStore.updateFeatureFlag('speaking', false);
    expect(settingsStore.isFeatureEnabled('speaking')).toBe(false);

    settingsStore.updateFeatureFlag('speaking', true);
    expect(settingsStore.isFeatureEnabled('speaking')).toBe(true);
  });

  it('activates emergency maintenance mode with custom broadcast message', () => {
    expect(settingsStore.getMaintenance().enabled).toBe(false);

    settingsStore.updateMaintenance({
      enabled: true,
      message: 'Upgrading Cambridge audio mock test servers.',
    });

    const maint = settingsStore.getMaintenance();
    expect(maint.enabled).toBe(true);
    expect(maint.message).toBe('Upgrading Cambridge audio mock test servers.');
  });

  it('updates markdown content for legal and information pages', () => {
    const newAboutMarkdown = '# Welcome to Zarii\nThe premier free IELTS platform.';
    settingsStore.updateLegalContent('about', newAboutMarkdown);

    expect(settingsStore.getLegalContent('about')).toBe(newAboutMarkdown);
  });

  it('validates and persists default exam timers and score tables', () => {
    const defaults = settingsStore.getDefaults();
    expect(defaults.readingTimerMinutes).toBe(60);
    expect(defaults.listeningTimerMinutes).toBe(40);
    expect(defaults.readingScoreTable.length).toBeGreaterThan(5);

    // Valid update
    const validUpdate = settingsStore.updateDefaults({
      readingTimerMinutes: 55,
    });
    expect(validUpdate.success).toBe(true);
    expect(settingsStore.getDefaults().readingTimerMinutes).toBe(55);

    // Invalid score table update (minRaw > maxRaw)
    const invalidUpdate = settingsStore.updateDefaults({
      readingScoreTable: [{ minRaw: 40, maxRaw: 30, band: 9.0 }],
    });
    expect(invalidUpdate.success).toBe(false);
    expect(invalidUpdate.error).toMatch(/minRaw must be <= maxRaw/i);
  });

  it('records audit log entries for all administrative setting changes', () => {
    const initialLogCount = contentStore.getAuditLogs().length;

    settingsStore.updateFeatureFlag('urdu_hints', false);
    settingsStore.updateBranding({ tagline: 'The smart way to band 8.0' });

    const updatedLogs = contentStore.getAuditLogs();
    expect(updatedLogs.length).toBeGreaterThanOrEqual(initialLogCount + 2);

    const latestActions = updatedLogs.map((l) => l.action);
    expect(latestActions).toContain('UPDATE_FEATURE_FLAG');
    expect(latestActions).toContain('UPDATE_BRANDING_SETTINGS');
  });
});
