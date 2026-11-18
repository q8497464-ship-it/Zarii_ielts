import { describe, it, expect } from 'vitest';
import { LANDING_COPY } from '../../landing/copy';
import { MAIN_NAVIGATION, MOBILE_NAV_ITEMS } from '../../routes';

describe('Public Landing Page: Content, Architecture & Policy Verification', () => {
  it('contains all 11 mandatory sections in structured copy registry', () => {
    expect(LANDING_COPY.navbar).toBeDefined();
    expect(LANDING_COPY.hero).toBeDefined();
    expect(LANDING_COPY.trustStrip).toBeDefined();
    expect(LANDING_COPY.modules).toBeDefined();
    expect(LANDING_COPY.howItWorks).toBeDefined();
    expect(LANDING_COPY.features).toBeDefined();
    expect(LANDING_COPY.whyZarii).toBeDefined();
    expect(LANDING_COPY.scoreEstimateNote).toBeDefined();
    expect(LANDING_COPY.faq).toBeDefined();
    expect(LANDING_COPY.finalCta).toBeDefined();
    expect(LANDING_COPY.footer).toBeDefined();
  });

  it('guarantees zero fake statistics in Key Stats / Trust Strip', () => {
    expect(LANDING_COPY.trustStrip).toHaveLength(4);
    // Ensure all 4 items represent factual capabilities rather than fabricated marketing metrics
    const statsTexts = LANDING_COPY.trustStrip.map((s) => `${s.title} ${s.description}`).join(' ');
    expect(statsTexts).toContain('4 skills');
    expect(statsTexts).toContain('Academic and General');
    expect(statsTexts).toContain('Free forever');
    expect(statsTexts).toContain('phone and laptop');

    // Reject fake claims
    expect(statsTexts).not.toMatch(/100,?000\+ students/i);
    expect(statsTexts).not.toMatch(/4\.9\s*stars/i);
    expect(statsTexts).not.toMatch(/98%\s*pass\s*rate/i);
  });

  it('provides all 4 IELTS skill modules with balanced details and color tokens', () => {
    expect(LANDING_COPY.modules.cards).toHaveLength(4);
    const titles = LANDING_COPY.modules.cards.map((m) => m.name);
    expect(titles).toEqual(['Listening', 'Reading', 'Writing', 'Speaking']);

    LANDING_COPY.modules.cards.forEach((m) => {
      expect(m.bullets).toHaveLength(3);
      expect(m.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(m.bgTint).toBeTruthy();
      expect(m.borderTint).toBeTruthy();
    });
  });

  it('configures 4 progressive How It Works steps', () => {
    expect(LANDING_COPY.howItWorks.steps).toHaveLength(4);
    expect(LANDING_COPY.howItWorks.steps[0].title.toLowerCase()).toContain('target band');
    expect(LANDING_COPY.howItWorks.steps[1].title.toLowerCase()).toContain('diagnostic');
    expect(LANDING_COPY.howItWorks.steps[2].title.toLowerCase()).toContain('study plan');
    expect(LANDING_COPY.howItWorks.steps[3].title.toLowerCase()).toContain('mock tests');
  });

  it('features 4 alternating showcase rows highlighting core platform capabilities', () => {
    expect(LANDING_COPY.features.rows).toHaveLength(4);
    const showcaseTitles = LANDING_COPY.features.rows.map((r) => r.title.toLowerCase());
    expect(showcaseTitles[0]).toContain('split-screen computer-delivered');
    expect(showcaseTitles[1]).toContain('writing and speaking');
    expect(showcaseTitles[2]).toContain('study plan');
    expect(showcaseTitles[3]).toContain('mistake notebook');

    LANDING_COPY.features.rows.forEach((row) => {
      expect(row.checklist.length).toBeGreaterThanOrEqual(3);
      expect(row.ctaHref).toBeTruthy();
    });
  });

  it('features exactly 6 Why Zarii benefit cards with privacy and offline commitments', () => {
    expect(LANDING_COPY.whyZarii.items).toHaveLength(6);
    const ids = LANDING_COPY.whyZarii.items.map((i) => i.id);
    expect(ids).toContain('why-free');
    expect(ids).toContain('why-original');
    expect(ids).toContain('why-offline');
    expect(ids).toContain('why-vocab');
    expect(ids).toContain('why-notebook');
    expect(ids).toContain('why-privacy');
  });

  it('contains honest Cambridge raw-to-band conversion and disclaimer note', () => {
    expect(LANDING_COPY.scoreEstimateNote.statement).toContain('not official IELTS results');
    expect(LANDING_COPY.scoreEstimateNote.explanation).toContain('Cambridge 40-question raw-to-band conversion tables');
  });

  it('includes 8 accessible FAQs covering cost, guest mode, device support, and privacy', () => {
    expect(LANDING_COPY.faq.items).toHaveLength(8);
    const questions = LANDING_COPY.faq.items.map((f) => f.question.toLowerCase());
    expect(questions[0]).toContain('free');
    expect(questions[1]).toContain('account');
    expect(questions[2]).toContain('academic and general');
    expect(questions[3]).toContain('accurate');
    expect(questions[4]).toContain('mobile');
    expect(questions[5]).toContain('offline');
    expect(questions[6]).toContain('private');
    expect(questions[7]).toContain('who is zarii for');
  });

  it('STRICT SECURITY RULE: Zero links to /admin or /app anywhere in public landing copy', () => {
    const rawJson = JSON.stringify(LANDING_COPY);
    expect(rawJson).not.toContain('/admin');
    expect(rawJson).not.toContain('/app');
    expect(rawJson).not.toContain('Open dashboard');
    expect(rawJson).not.toContain('Go to app');
  });

  it('guarantees navbar copy provides only Log in and Sign up', () => {
    expect(LANDING_COPY.navbar.loginLabel).toBe('Log in');
    expect(LANDING_COPY.navbar.signupLabel).toBe('Sign up');
    expect((LANDING_COPY.navbar as any).dashboardLabel).toBeUndefined();
  });

  it('verifies student app namespace isolation under /app/*', () => {
    const allStudentNavPaths = MAIN_NAVIGATION.flatMap((group) => group.items.map((i) => i.path));
    expect(allStudentNavPaths.every((path) => path.startsWith('/app'))).toBe(true);

    const mobilePaths = MOBILE_NAV_ITEMS.map((i) => i.path);
    expect(mobilePaths.every((path) => path.startsWith('/app'))).toBe(true);
  });

  it('verifies SITE_CONFIG contains genuine brand data and zero fake contacts', async () => {
    const { SITE_CONFIG } = await import('../../landing/siteConfig');
    expect(SITE_CONFIG.name).toBe('Zarii');
    expect(SITE_CONFIG.fullName).toBe('Zarii IELTS Preparation');
    expect(SITE_CONFIG.supportEmail).toBe('support@zarii.app');
    expect(SITE_CONFIG.description).toContain('Free, exam-style practice');

    // No fake addresses or phone numbers
    expect((SITE_CONFIG as any).phone).toBeUndefined();
    expect((SITE_CONFIG as any).address).toBeUndefined();
  });

  it('guarantees siteConfig contains zero references to /admin or /app', async () => {
    const { SITE_CONFIG } = await import('../../landing/siteConfig');
    const raw = JSON.stringify(SITE_CONFIG);
    expect(raw).not.toContain('/admin');
    expect(raw).not.toContain('/app');
  });
});
