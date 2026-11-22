import type { AuditLogEntity } from '../types/database';
import { contentStore } from '../content/contentStore';

export interface BrandingSettings {
  appName: string;
  tagline: string;
  logoLight: string;
  logoDark: string;
  primaryColor: string;
  accentColor: string;
  surfaceColor: string;
  faviconUrl: string;
}

export interface FeatureFlagsSettings {
  listening: boolean;
  speaking: boolean;
  gamification: boolean;
  ai_feedback: boolean;
  urdu_hints: boolean;
  signup: boolean;
  english_course_enabled: boolean;
  dictionary_enabled: boolean;
}

export interface MaintenanceSettings {
  enabled: boolean;
  message: string;
  estimatedReturnTime?: string;
}

export interface LegalContentSettings {
  about: string;
  privacy: string;
  terms: string;
  faq: string;
  contact: string;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
}

export interface DefaultsSettings {
  readingTimerMinutes: number;
  listeningTimerMinutes: number;
  writingTask1Minutes: number;
  writingTask2Minutes: number;
  defaultStudyMinutes: number;
  defaultTargetBand: number;
  readingScoreTable: { minRaw: number; maxRaw: number; band: number }[];
  listeningScoreTable: { minRaw: number; maxRaw: number; band: number }[];
}

export interface SiteSettingsState {
  branding: BrandingSettings;
  features: FeatureFlagsSettings;
  maintenance: MaintenanceSettings;
  legal: LegalContentSettings;
  seo: SeoSettings;
  defaults: DefaultsSettings;
  updatedAt: string;
}

const STORAGE_KEY = 'zarii_site_settings_v1';

export const DEFAULT_READING_TABLE = [
  { minRaw: 39, maxRaw: 40, band: 9.0 },
  { minRaw: 37, maxRaw: 38, band: 8.5 },
  { minRaw: 35, maxRaw: 36, band: 8.0 },
  { minRaw: 33, maxRaw: 34, band: 7.5 },
  { minRaw: 30, maxRaw: 32, band: 7.0 },
  { minRaw: 27, maxRaw: 29, band: 6.5 },
  { minRaw: 23, maxRaw: 26, band: 6.0 },
  { minRaw: 19, maxRaw: 22, band: 5.5 },
  { minRaw: 15, maxRaw: 18, band: 5.0 },
  { minRaw: 13, maxRaw: 14, band: 4.5 },
  { minRaw: 10, maxRaw: 12, band: 4.0 },
  { minRaw: 0, maxRaw: 9, band: 3.5 },
];

export const DEFAULT_LISTENING_TABLE = [
  { minRaw: 39, maxRaw: 40, band: 9.0 },
  { minRaw: 37, maxRaw: 38, band: 8.5 },
  { minRaw: 35, maxRaw: 36, band: 8.0 },
  { minRaw: 32, maxRaw: 34, band: 7.5 },
  { minRaw: 30, maxRaw: 31, band: 7.0 },
  { minRaw: 26, maxRaw: 29, band: 6.5 },
  { minRaw: 23, maxRaw: 25, band: 6.0 },
  { minRaw: 18, maxRaw: 22, band: 5.5 },
  { minRaw: 16, maxRaw: 17, band: 5.0 },
  { minRaw: 13, maxRaw: 15, band: 4.5 },
  { minRaw: 10, maxRaw: 12, band: 4.0 },
  { minRaw: 0, maxRaw: 9, band: 3.5 },
];

export const INITIAL_SITE_SETTINGS: SiteSettingsState = {
  branding: {
    appName: 'Zarii',
    tagline: 'Prepare for IELTS. Confidently.',
    logoLight: '/logo-light.svg',
    logoDark: '/logo-dark.svg',
    primaryColor: '#124F40',
    accentColor: '#5BB78D',
    surfaceColor: '#F7FAF8',
    faviconUrl: '/favicon.ico',
  },
  features: {
    listening: true,
    speaking: true,
    gamification: true,
    ai_feedback: true,
    urdu_hints: true,
    signup: true,
    english_course_enabled: true,
    dictionary_enabled: true,
  },
  maintenance: {
    enabled: false,
    message: 'Zarii is temporarily undergoing scheduled maintenance to upgrade practice mock tests. We will be back online shortly.',
    estimatedReturnTime: '2026-11-18 12:00 UTC',
  },
  legal: {
    about: `# About Zarii IELTS
Zarii is a completely free, high-standard IELTS preparation workspace designed for ambitious candidates worldwide.
- **Examiner Rubrics**: Authentic Cambridge-standard assessment.
- **Zero Paywalls**: Practice without subscriptions or hidden costs.
- **All 4 Modules**: Listening, Reading, Writing, and Speaking in one place.`,
    privacy: `# Privacy Policy
We believe your preparation data belongs to you.
- **Local First**: Attempts and practice answers are preserved locally.
- **No Third-Party Trackers**: We do not sell candidate browsing data.
- **GDPR Compliant**: Full export and data wipe capabilities anytime.`,
    terms: `# Terms of Service
By using Zarii, you agree to fair study use.
- Content is provided for educational and diagnostic preparation purposes.
- Automated scraping or abuse of LLM grading backends is strictly prohibited.`,
    faq: `# Frequently Asked Questions
### Is Zarii really 100% free?
Yes! Zarii is built to guarantee open, unrestricted IELTS preparation for every candidate.
### Are band scores aligned with official IELTS exams?
Yes, scoring algorithms are calibrated against published Cambridge IELTS assessment rubrics.`,
    contact: `# Contact & Support
Have feedback, questions, or found an issue?
- **Email**: support@zarii.com
- **Bug Reporting**: Use the in-app "Report a Problem" modal anytime.`,
  },
  seo: {
    metaTitle: 'Zarii — Free Authentic IELTS Preparation Platform',
    metaDescription: 'Free authentic IELTS practice platform for Academic and General Training. Full mock tests, instant band evaluation, and examiner feedback.',
    ogImageUrl: 'https://zarii.app/og-preview.png',
  },
  defaults: {
    readingTimerMinutes: 60,
    listeningTimerMinutes: 40,
    writingTask1Minutes: 20,
    writingTask2Minutes: 40,
    defaultStudyMinutes: 45,
    defaultTargetBand: 7.5,
    readingScoreTable: DEFAULT_READING_TABLE,
    listeningScoreTable: DEFAULT_LISTENING_TABLE,
  },
  updatedAt: new Date().toISOString(),
};

/**
 * Calculates WCAG 2.1 relative luminance and contrast ratio between two hex colors.
 */
export function calculateContrastRatio(hex1: string, hex2: string): {
  ratio: number;
  ratioFormatted: string;
  normalTextAA: boolean;
  normalTextAAA: boolean;
  largeTextAA: boolean;
  largeTextAAA: boolean;
} {
  const parseHex = (hex: string) => {
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    if (clean.length !== 6) return [0, 0, 0];
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  };

  const getLuminance = (rgb: number[]) => {
    const a = rgb.map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum1 = getLuminance(parseHex(hex1));
  const lum2 = getLuminance(parseHex(hex2));

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  const rounded = Math.round(ratio * 100) / 100;

  return {
    ratio: rounded,
    ratioFormatted: `${rounded.toFixed(2)}:1`,
    normalTextAA: ratio >= 4.5,
    normalTextAAA: ratio >= 7.0,
    largeTextAA: ratio >= 3.0,
    largeTextAAA: ratio >= 4.5,
  };
}

class SettingsStore {
  private state: SiteSettingsState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.load();
  }

  private load(): SiteSettingsState {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return {
            ...INITIAL_SITE_SETTINGS,
            ...parsed,
            branding: { ...INITIAL_SITE_SETTINGS.branding, ...parsed.branding },
            features: { ...INITIAL_SITE_SETTINGS.features, ...parsed.features },
            maintenance: { ...INITIAL_SITE_SETTINGS.maintenance, ...parsed.maintenance },
            legal: { ...INITIAL_SITE_SETTINGS.legal, ...parsed.legal },
            seo: { ...INITIAL_SITE_SETTINGS.seo, ...parsed.seo },
            defaults: { ...INITIAL_SITE_SETTINGS.defaults, ...parsed.defaults },
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load settings from storage:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_SITE_SETTINGS));
  }

  private save(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      }
    } catch (e) {
      console.warn('Failed to save settings to storage:', e);
    }
  }

  private notify(): void {
    this.save();
    this.listeners.forEach((l) => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getSettings(): SiteSettingsState {
    return JSON.parse(JSON.stringify(this.state));
  }

  public getBranding(): BrandingSettings {
    return { ...this.state.branding };
  }

  public getFeatures(): FeatureFlagsSettings {
    return { ...this.state.features };
  }

  public isFeatureEnabled(feature: keyof FeatureFlagsSettings): boolean {
    return Boolean(this.state.features[feature]);
  }

  public getMaintenance(): MaintenanceSettings {
    return { ...this.state.maintenance };
  }

  public getLegalContent(page: keyof LegalContentSettings): string {
    return this.state.legal[page] || '';
  }

  public getDefaults(): DefaultsSettings {
    return { ...this.state.defaults };
  }

  public updateBranding(
    branding: Partial<BrandingSettings>,
    actorEmail = 'admin@zarii.com'
  ): void {
    const prev = { ...this.state.branding };
    this.state.branding = { ...this.state.branding, ...branding };
    this.state.updatedAt = new Date().toISOString();

    contentStore.recordAudit(
      'UPDATE_BRANDING_SETTINGS',
      'site_settings',
      'branding',
      prev,
      this.state.branding
    );

    this.notify();
  }

  public updateFeatureFlag(
    feature: keyof FeatureFlagsSettings,
    enabled: boolean,
    actorEmail = 'admin@zarii.com'
  ): void {
    const prev = this.state.features[feature];
    this.state.features[feature] = enabled;
    this.state.updatedAt = new Date().toISOString();

    contentStore.recordAudit(
      'UPDATE_FEATURE_FLAG',
      'feature_flag',
      feature,
      { [feature]: prev },
      { [feature]: enabled }
    );

    this.notify();
  }

  public updateMaintenance(
    maintenance: Partial<MaintenanceSettings>,
    actorEmail = 'admin@zarii.com'
  ): void {
    const prev = { ...this.state.maintenance };
    this.state.maintenance = { ...this.state.maintenance, ...maintenance };
    this.state.updatedAt = new Date().toISOString();

    contentStore.recordAudit(
      'UPDATE_MAINTENANCE_MODE',
      'site_settings',
      'maintenance',
      prev,
      this.state.maintenance
    );

    this.notify();
  }

  public updateLegalContent(
    page: keyof LegalContentSettings,
    markdown: string,
    actorEmail = 'admin@zarii.com'
  ): void {
    const prev = this.state.legal[page];
    this.state.legal[page] = markdown;
    this.state.updatedAt = new Date().toISOString();

    contentStore.recordAudit(
      'UPDATE_LEGAL_PAGE',
      'legal_page',
      page,
      { page, length: prev?.length || 0 },
      { page, length: markdown.length }
    );

    this.notify();
  }

  public updateSeo(
    seo: Partial<SeoSettings>,
    actorEmail = 'admin@zarii.com'
  ): void {
    const prev = { ...this.state.seo };
    this.state.seo = { ...this.state.seo, ...seo };
    this.state.updatedAt = new Date().toISOString();

    contentStore.recordAudit(
      'UPDATE_SEO_SETTINGS',
      'site_settings',
      'seo',
      prev,
      this.state.seo
    );

    this.notify();
  }

  public updateDefaults(
    defaults: Partial<DefaultsSettings>,
    actorEmail = 'admin@zarii.com'
  ): { success: boolean; error?: string } {
    // Validate score table if provided: ensure monotonic score ranges
    if (defaults.readingScoreTable) {
      for (const entry of defaults.readingScoreTable) {
        if (entry.minRaw > entry.maxRaw || entry.band < 0 || entry.band > 9) {
          return {
            success: false,
            error: 'Invalid Reading Score Table: minRaw must be <= maxRaw and band must be 0-9.',
          };
        }
      }
    }
    if (defaults.listeningScoreTable) {
      for (const entry of defaults.listeningScoreTable) {
        if (entry.minRaw > entry.maxRaw || entry.band < 0 || entry.band > 9) {
          return {
            success: false,
            error: 'Invalid Listening Score Table: minRaw must be <= maxRaw and band must be 0-9.',
          };
        }
      }
    }

    const prev = { ...this.state.defaults };
    this.state.defaults = { ...this.state.defaults, ...defaults };
    this.state.updatedAt = new Date().toISOString();

    contentStore.recordAudit(
      'UPDATE_DEFAULT_SETTINGS',
      'site_settings',
      'defaults',
      prev,
      this.state.defaults
    );

    this.notify();
    return { success: true };
  }

  public resetToDefault(): void {
    this.state = JSON.parse(JSON.stringify(INITIAL_SITE_SETTINGS));
    this.notify();
  }
}

export const settingsStore = new SettingsStore();
