import { test, expect } from '@playwright/test';
import * as path from 'path';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'docs/baseline-screenshots');

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const themes = ['light', 'dark'] as const;

test.describe('Baseline Screenshot Capture (Desktop & Mobile, Light & Dark)', () => {
  for (const vp of viewports) {
    for (const theme of themes) {
      test(`captures baseline screenshots for ${vp.name} [${theme}]`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });

        // Helper to set theme & session
        const setupPage = async (url: string, isAdmin = false) => {
          await page.addInitScript(({ th, admin }) => {
            localStorage.setItem('zarii_theme', th);
            localStorage.setItem('zarii_guest_mode', 'true');
            localStorage.setItem('zarii_product_tour_completed', 'true');
            sessionStorage.setItem('zarii_splash_shown', 'true');
            if (th === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            if (admin) {
              sessionStorage.setItem(
                'zarii_admin_session',
                JSON.stringify({
                  role: 'admin',
                  email: 'admin@zarii.app',
                  name: 'Admin',
                  loginTime: Date.now(),
                })
              );
              sessionStorage.setItem('zarii_admin_last_activity', String(Date.now()));
            }
          }, { th: theme, admin: isAdmin });

          await page.goto(url);
          await page.waitForTimeout(600);

          // Force dark class on documentElement if dark theme
          if (theme === 'dark') {
            await page.evaluate(() => document.documentElement.classList.add('dark'));
          } else {
            await page.evaluate(() => document.documentElement.classList.remove('dark'));
          }
          await page.waitForTimeout(200);
        };

        // 1. Landing Page
        await setupPage('/');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `landing-${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // 2. Student Home
        await setupPage('/app');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `student-home-${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // 3. Reading Test Runner
        await setupPage('/app/practice/reading/test/acad-reading-01');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `reading-test-${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // 4. Listening Test Runner
        await setupPage('/app/practice/listening/test/list-test-01');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `listening-test-${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // 5. Writing Prompt Editor
        await setupPage('/app/practice/writing/prompt/t2-01');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `writing-editor-${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // 6. Speaking Practice
        await setupPage('/app/practice/speaking/part1');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `speaking-practice-${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // 7. Mock Exam Runner
        await setupPage('/app/mock/exam/mock-acad-01');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `mock-exam-${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // 8. Vocabulary & Grammar
        await setupPage('/app/vocab');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `vocab-grammar-${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // 9. Settings
        await setupPage('/app/settings');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `settings-${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // 10. Admin Overview
        await setupPage('/admin', true);
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `admin-overview-${vp.name}-${theme}.png`),
          fullPage: false,
        });
      });
    }
  }
});
