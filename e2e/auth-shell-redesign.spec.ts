import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('zarii_product_tour_completed', 'true');
  });
});

test.describe('Issue 1: Redesigned Auth Brand Panel (Responsive Viewports)', () => {
  const desktopViewports = [
    { width: 1366, height: 768, name: '1366x768' },
    { width: 1440, height: 900, name: '1440x900' },
    { width: 1920, height: 1080, name: '1920x1080' },
  ];

  for (const vp of desktopViewports) {
    test(`renders /login cleanly without vertical page scroll on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/login');

      // Headline and Confidently mint highlight
      const headline = page.locator('h1').first();
      await expect(headline).toContainText('Prepare for IELTS.');
      const mintWord = page.locator('h1 span');
      await expect(mintWord).toHaveText('Confidently.');

      // 3 benefit items
      await expect(page.getByText('Free forever')).toBeVisible();
      await expect(page.getByText('All four skills')).toBeVisible();
      await expect(page.getByText('Personalised study plan')).toBeVisible();

      // Footer note (13px)
      await expect(page.getByText('Free for every student. No credit card needed.')).toBeVisible();

      // Check zero document scrolling on desktop
      const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const clientHeight = await page.evaluate(() => document.documentElement.clientHeight);
      expect(scrollHeight).toBeLessThanOrEqual(clientHeight + 2);
    });
  }

  test('renders mobile auth layout without horizontal scroll at 390x844', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/login');

    // Mobile header present
    const mobileHeader = page.locator('header');
    await expect(mobileHeader).toBeVisible();

    // Verify no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });
});

test.describe('Issue 2: Single Logo in App Shell & Grouped Sidebar Alignment', () => {
  test('desktop (1440px) shows exactly ONE logo in sidebar and NO logo in top bar', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // Enter as guest
    await page.goto('/login');
    await page.getByRole('button', { name: /continue without an account/i }).click();
    await page.waitForURL('**/app');

    // Sidebar has Zarii logo
    const sidebarLogo = page.locator('aside').getByAltText('Zarii: IELTS Preparation');
    await expect(sidebarLogo).toBeVisible();

    // TopBar on desktop must NOT contain Zarii logo
    const topBar = page.locator('header');
    const topBarDesktopLogo = topBar.locator('.hidden.md\\:flex').getByAltText('Zarii: IELTS Preparation');
    await expect(topBarDesktopLogo).toHaveCount(0);

    // Sidebar navigation groups: LEARN and PROGRESS
    await expect(page.locator('aside').getByText('LEARN')).toBeVisible();
    await expect(page.locator('aside').getByText('PROGRESS', { exact: true })).toBeVisible();
  });

  test('mobile (390px) shows top bar logo and mobile drawer does NOT repeat logo header', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/login');
    await page.getByRole('button', { name: /continue without an account/i }).click();
    await page.waitForURL('**/app');

    // Mobile top bar shows logo
    const mobileTopBarLogo = page.locator('header').getByAltText('Zarii: IELTS Preparation');
    await expect(mobileTopBarLogo).toBeVisible();

    // Open hamburger drawer
    await page.getByRole('button', { name: 'Open navigation menu' }).click();

    // Drawer is visible with Close button
    const drawer = page.getByRole('dialog', { name: 'Navigation' });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('button', { name: 'Close navigation' })).toBeVisible();

    // Drawer does NOT contain a second logo header
    const drawerLogo = drawer.getByAltText('Zarii: IELTS Preparation');
    await expect(drawerLogo).toHaveCount(0);
  });
});

test.describe('Issue 3: Account Controls, Guest Mode, and Logout Flow', () => {
  test('guest mode shows Log In and Create Account instead of Log Out', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/login');
    await page.getByRole('button', { name: /continue without an account/i }).click();
    await page.waitForURL('**/app');

    // Open user menu from TopBar
    const userBtn = page.locator('header').getByRole('button', { name: 'User Account Menu' });
    await userBtn.click();

    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByText('Guest User')).toBeVisible();
    await expect(menu.getByRole('menuitem', { name: /log in to existing account/i })).toBeVisible();
    await expect(menu.getByRole('menuitem', { name: /create free account/i })).toBeVisible();
    await expect(menu.getByRole('menuitem', { name: /log out/i })).toHaveCount(0);
  });

  test('settings page has visible Log Out button and handles logout flow', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/login');
    await page.getByRole('button', { name: /continue without an account/i }).click();
    await page.waitForURL('**/app');

    // Go to settings
    await page.goto('/app/settings');
    const logoutBtn = page.getByRole('button', { name: /log out of zarii/i });
    await expect(logoutBtn).toBeVisible();

    // Click logout
    await logoutBtn.click();
    await page.waitForURL('**/login');
  });
});
