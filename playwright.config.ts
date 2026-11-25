import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Configuration for Zarii IELTS
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:5190',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
  webServer: {
    command: 'npx vite --host 127.0.0.1 --port 5190',
    url: 'http://127.0.0.1:5190',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
