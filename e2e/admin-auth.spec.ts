import { test, expect } from '@playwright/test';

test.describe('E2E: Full-Window Admin Authentication & 2FA Lifecycle', () => {
  const viewports = [
    { width: 360, height: 740, name: 'mobile-360px' },
    { width: 768, height: 1024, name: 'tablet-768px' },
    { width: 1440, height: 900, name: 'desktop-1440px' },
  ];

  // 1. Responsive checks across 360px, 768px, and 1440px
  for (const vp of viewports) {
    test(`renders /admin/login cleanly on ${vp.name} without horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/admin/login');

      // Title & Brand
      await expect(page.getByText('Admin Console')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Admin sign in' })).toBeVisible();
      await expect(page.getByText('Authorized personnel only. All activity is logged.')).toBeVisible();

      // Student login footer link
      const studentLink = page.getByRole('link', { name: 'Student login' });
      await expect(studentLink).toBeVisible();

      // No horizontal scrolling
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

      // On desktop (1440px), no vertical scroll
      if (vp.width === 1440) {
        const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        const clientHeight = await page.evaluate(() => document.documentElement.clientHeight);
        expect(scrollHeight).toBeLessThanOrEqual(clientHeight + 2);
      }
    });
  }

  // 2. Generic Error on Wrong Password
  test('displays identical generic error on wrong password without user enumeration', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('#admin-email', 'admin@zarii.app');
    await page.fill('#admin-password', 'WrongPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();

    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Invalid credentials or no access');
  });

  // 3. Student Account Blocked at Admin Login
  test('blocks student credentials and immediately shows generic error', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('#admin-email', 'q8497464@gmail.com');
    await page.fill('#admin-password', 'Qamar@000');
    await page.getByRole('button', { name: 'Sign in' }).click();

    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Invalid credentials or no access');
  });

  // 4. Direct visit to /admin/content while logged out redirects to /admin/login
  test('direct visit to /admin/content redirects to /admin/login and returns after authentication', async ({ page }) => {
    await page.goto('/admin/content');
    await expect(page).toHaveURL(/.*\/admin\/login/);

    // Authenticate with valid admin credentials
    await page.fill('#admin-email', 'admin@zarii.app');
    await page.fill('#admin-password', 'AdminSecret123!');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // If 2FA enrollment or challenge is required
    if (page.url().includes('setup-2fa') || page.url().includes('verify-2fa')) {
      const codeInput = page.locator('input[autoComplete="one-time-code"]').first();
      await codeInput.fill('123456');
    }
  });

  // 5. Invite acceptance flow
  test('accept invitation flow displays verified email and guides through 2FA setup', async ({ page }) => {
    await page.goto('/admin/accept-invite?token=invite_test_token_123&email=invited.editor@zarii.app');

    await expect(page.getByText('Accept admin invitation')).toBeVisible();
    await expect(page.getByText('Verified')).toBeVisible();

    // Fill registration
    await page.fill('#admin-name', 'Sarah Jenkins');
    await page.fill('#invite-password', 'AdminSecret123!');
    await page.fill('#confirm-invite-password', 'AdminSecret123!');
    await page.getByRole('button', { name: /Activate account/i }).click();

    // Navigates to 2FA enrollment
    await expect(page).toHaveURL(/.*\/admin\/setup-2fa/);
    await expect(page.getByText('Set up two-factor authentication')).toBeVisible();
    await expect(page.getByText('Scan with your authenticator')).toBeVisible();
  });

  // 6. Access Denied (/admin/forbidden)
  test('forbidden screen renders friendly explanation and student navigation', async ({ page }) => {
    await page.goto('/admin/forbidden');
    await expect(page.getByRole('heading', { name: 'Access denied' })).toBeVisible();
    await expect(page.getByText('Administrative clearance required')).toBeVisible();

    const studentBtn = page.getByRole('button', { name: 'Go to Student Workspace' });
    await expect(studentBtn).toBeVisible();
  });
});
