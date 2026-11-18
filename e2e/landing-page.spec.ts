import { test, expect } from '@playwright/test';

test.describe('E2E: Public Landing Page Scroll, Clean Auth & Navigation Specifications', () => {
  // 1. Normal document scroll on desktop
  test('scrolls like a normal website: document height > viewport and window.scrollY changes', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForSelector('footer');

    // Document height must exceed viewport significantly (full 11 sections)
    const docHeight = await page.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
    const vpHeight = await page.evaluate(() => window.innerHeight);
    expect(docHeight).toBeGreaterThan(vpHeight * 2);

    // Initial scroll position is 0
    expect(await page.evaluate(() => window.scrollY)).toBe(0);

    // Scrolling down changes window.scrollY
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(250);
    const scrolledY = await page.evaluate(() => window.scrollY);
    expect(scrolledY).toBeGreaterThanOrEqual(900);

    // Sticky navbar remains visible while scrolled
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Floating Back to Top button appears after scrolling 600px
    const backToTopBtn = page.getByRole('button', { name: 'Back to top', exact: true });
    await expect(backToTopBtn).toBeVisible();

    // Clicking Back to top returns scroll to 0
    await backToTopBtn.click();
    await page.waitForFunction(() => window.scrollY <= 10);
    expect(await page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(10);
  });

  // 2. Mobile scroll verification
  test('scrolls smoothly on mobile viewport (390px) without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForSelector('footer');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // Scroll down on mobile
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(250);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThanOrEqual(700);

    // Navbar remains sticky
    await expect(page.locator('header')).toBeVisible();
  });

  // 3. Anchor Links Smooth-Scroll with 72px margin
  test('anchor links scroll to sections with headings visible beneath 72px navbar', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForSelector('footer');

    // Click FAQ anchor in header
    const faqBtn = page.locator('header').getByRole('button', { name: 'FAQ' });
    await faqBtn.click();
    await page.waitForTimeout(600);

    const faqHeading = page.getByRole('heading', { name: 'Frequently asked questions' });
    await expect(faqHeading).toBeVisible();

    // Verify heading top is at or below the navbar height (72px)
    const headingBox = await faqHeading.boundingBox();
    expect(headingBox).not.toBeNull();
    if (headingBox) {
      expect(headingBox.y).toBeGreaterThanOrEqual(60);
    }
  });

  // 4. Navbar and Page Buttons: ONLY Log in and Sign up
  test('displays ONLY Log in and Sign up with ZERO "Open dashboard" text', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForSelector('footer');

    // Navbar right buttons
    const navLogin = page.locator('header').getByRole('link', { name: 'Log in' });
    await expect(navLogin).toBeVisible();
    await expect(navLogin).toHaveAttribute('href', '/login');

    const navSignup = page.locator('header').getByRole('link', { name: 'Sign up' });
    await expect(navSignup).toBeVisible();
    await expect(navSignup).toHaveAttribute('href', '/signup');

    // Hero buttons
    const heroStartBtn = page.getByRole('link', { name: 'Start free' });
    await expect(heroStartBtn).toBeVisible();
    await expect(heroStartBtn).toHaveAttribute('href', '/signup');

    const heroLoginBtn = page.getByRole('link', { name: 'Log in' }).nth(1);
    await expect(heroLoginBtn).toBeVisible();
    await expect(heroLoginBtn).toHaveAttribute('href', '/login');

    // Footer CTA buttons
    const footerSignupBtn = page.locator('footer').getByRole('link', { name: 'Sign up free' });
    await expect(footerSignupBtn).toBeVisible();
    await expect(footerSignupBtn).toHaveAttribute('href', '/signup');

    // Target Band Roadmap Section verification
    const roadmapHeading = page.getByRole('heading', { name: 'What band are you aiming for?' });
    await expect(roadmapHeading).toBeVisible();

    // Strict Rule: No "Open dashboard" or "Go to app" anywhere
    await expect(page.getByText('Open dashboard')).toHaveCount(0);
    await expect(page.getByText('Go to app')).toHaveCount(0);
  });

  // 5. Mobile Menu: ONLY Log in and Sign up
  test('mobile drawer provides Log in and Sign up buttons', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForSelector('footer');

    const menuBtn = page.getByLabel('Open mobile navigation menu');
    await menuBtn.click();

    const drawer = page.getByRole('dialog', { name: 'Mobile Navigation Drawer' });
    await expect(drawer).toBeVisible();

    const drawerLogin = drawer.getByRole('link', { name: 'Log in' });
    await expect(drawerLogin).toBeVisible();
    await expect(drawerLogin).toHaveAttribute('href', '/login');

    const drawerSignup = drawer.getByRole('link', { name: 'Sign up' });
    await expect(drawerSignup).toBeVisible();
    await expect(drawerSignup).toHaveAttribute('href', '/signup');

    await expect(drawer.getByText('Open dashboard')).toHaveCount(0);
  });

  // 6. Auth Pages: Zarii logo & "Back to home" link
  test('auth pages provide Zarii logo and "Back to home" text link leading to "/"', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/login');

    // Left panel logo links to /
    const brandLogoLink = page.getByRole('link', { name: 'Zarii Home' }).first();
    await expect(brandLogoLink).toBeVisible();
    await expect(brandLogoLink).toHaveAttribute('href', '/');

    // "Back to home" text link
    const backToHome = page.getByRole('link', { name: 'Back to home' });
    await expect(backToHome).toBeVisible();
    await expect(backToHome).toHaveAttribute('href', '/');

    // Clicking Back to home lands on /
    await backToHome.click();
    await page.waitForURL('**/');
    expect(page.url()).toMatch(/\/$/);
  });

  // 7. Access Guard: Visiting /app/* without session redirects to /login
  test('visiting /app without a session redirects to /login with return target', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/app/practice');

    // Should redirect to /login?redirect=...
    await page.waitForURL('**/login?redirect=*');
    expect(page.url()).toContain('/login?redirect=');
    expect(page.url()).toContain('%2Fapp%2Fpractice');
  });

  // 8. Active session on /login redirects to /app
  test('user with valid session opening /login redirects automatically to /app', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Inject active guest session
    await page.addInitScript(() => {
      localStorage.setItem('zarii_guest_mode', 'true');
    });

    await page.goto('/login');
    await page.waitForURL('**/app');
    expect(page.url()).toContain('/app');
  });

  // 9. Strict Security Rule: Zero /admin links on landing page
  test('STRICT SECURITY: Contains zero links to /admin or /app on landing page', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForSelector('footer');

    const allLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a'));
      return anchors.map((a) => a.getAttribute('href')).filter(Boolean);
    });

    const adminLinks = allLinks.filter((href) => href?.includes('/admin'));
    expect(adminLinks).toHaveLength(0);

    const appLinks = allLinks.filter((href) => href?.startsWith('/app'));
    expect(appLinks).toHaveLength(0);
  });

  // 10. Footer layout, watermark wordmark, buttons, and legal bar
  test('renders professional footer with 4 columns, watermark wordmark, and legal disclaimer', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const footer = page.locator('footer[aria-label="Site Footer"]');
    await expect(footer).toBeVisible();

    // Floating CTA glass card
    const ctaCard = footer.getByTestId('footer-cta-card');
    await expect(ctaCard).toBeVisible();
    await expect(ctaCard).toContainText('Start your IELTS journey today');

    // CTA buttons
    const footerSignup = footer.getByRole('link', { name: 'Sign up free' });
    await expect(footerSignup).toBeVisible();
    await expect(footerSignup).toHaveAttribute('href', '/signup');

    const footerLogin = footer.getByRole('link', { name: 'Log in' });
    await expect(footerLogin).toBeVisible();
    await expect(footerLogin).toHaveAttribute('href', '/login');

    // Brand logo height: >= 64px (never smaller than 64px)
    const brandLogo = footer.locator('img[alt="Zarii IELTS Preparation"]');
    await expect(brandLogo).toBeVisible();
    const logoBox = await brandLogo.boundingBox();
    expect(logoBox).not.toBeNull();
    if (logoBox) {
      expect(logoBox.height).toBeGreaterThanOrEqual(64);
    }

    // Watermark wordmark band
    const wordmark = page.getByTestId('footer-wordmark');
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toContainText('Zarii');
    await expect(wordmark).toContainText('IELTS Preparation');

    // Trademark disclaimer
    await expect(footer).toContainText('IELTS is a registered trademark of its respective owners');
    await expect(footer).toContainText('Band scores shown are estimates, not official results');

    // Back to top button in legal bar
    const backToTopLegal = footer.getByRole('button', { name: 'Scroll back to top' });
    await expect(backToTopLegal).toBeVisible();
  });

  // 11. Public legal and info pages do not trigger auth wall
  test('public pages (/privacy, /terms, /about, /contact) load freely without auth guard redirect', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Privacy
    await page.goto('/privacy');
    await expect(page).toHaveURL(/\/privacy$/);
    await expect(page.locator('h1')).toContainText(/Privacy Policy|Privacy/i);

    // Terms
    await page.goto('/terms');
    await expect(page).toHaveURL(/\/terms$/);
    await expect(page.locator('h1')).toContainText(/Terms of Service|Terms/i);

    // About
    await page.goto('/about');
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator('h1')).toContainText(/About Zarii/i);

    // Contact
    await page.goto('/contact');
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator('h1')).toContainText(/Contact the Zarii Team|Contact/i);
  });

  // 12. All footer links navigate or scroll correctly, zero links to /app or /admin
  test('all footer links navigate or scroll without broken targets or /admin or /app paths', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const footer = page.locator('footer[aria-label="Site Footer"]');
    await expect(footer).toBeVisible();

    const footerLinks = await footer.locator('a').all();
    expect(footerLinks.length).toBeGreaterThanOrEqual(10);

    for (const link of footerLinks) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toContain('/admin');
      expect(href).not.toMatch(/^\/app(\/|$)/);
    }

    // Anchor smooth-scroll test on home page
    const howItWorksLink = footer.locator('nav[aria-label="Product Links"]').getByRole('link', { name: 'How it works' });
    await howItWorksLink.click();
    await page.waitForTimeout(400);
    const howItWorksHeading = page.getByRole('heading', { name: 'How it works' });
    await expect(howItWorksHeading).toBeVisible();
  });

  // 13. "Zarii IELTS Preparation" appears in brand column, large wordmark, and copyright line
  test('"Zarii IELTS Preparation" appears in brand column, large wordmark, and copyright line', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const footer = page.locator('footer[aria-label="Site Footer"]');

    // 1. Brand column
    const brandHeading = footer.locator('h2', { hasText: 'Zarii IELTS Preparation' });
    await expect(brandHeading).toBeVisible();

    // 2. Large wordmark
    const wordmark = page.getByTestId('footer-wordmark');
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toContainText('Zarii');
    await expect(wordmark).toContainText('IELTS Preparation');

    // 3. Copyright line
    const currentYear = new Date().getFullYear();
    const copyright = footer.getByText(new RegExp(`©\\s*${currentYear}\\s*Zarii IELTS Preparation`));
    await expect(copyright).toBeVisible();
  });

  // 14. Viewport responsiveness: No horizontal overflow & wordmark never clipped across viewports
  const viewports = [360, 390, 768, 1024, 1366, 1440, 1920];
  for (const width of viewports) {
    test(`layout has no overflow and wordmark is not clipped at width ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const footer = page.locator('footer[aria-label="Site Footer"]');
      await expect(footer).toBeVisible();

      // Check document horizontal scroll
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

      // Check wordmark is within bounds and not clipped
      const wordmark = page.getByTestId('footer-wordmark');
      await expect(wordmark).toBeVisible();
      const wordmarkBox = await wordmark.boundingBox();
      expect(wordmarkBox).not.toBeNull();
      if (wordmarkBox) {
        expect(wordmarkBox.width).toBeLessThanOrEqual(width + 2);
        expect(wordmarkBox.x).toBeGreaterThanOrEqual(0);
      }
    });
  }

  // 15. Screenshots in desktop and mobile viewports (light and dark mode)
  test('captures screenshots in desktop and mobile (light and dark)', async ({ page }) => {
    const screenshotDir = 'C:/Users/SiliCon/.gemini/antigravity/brain/79fb39b2-92cf-45ab-89c1-682ca7a62ee0';

    // 1. Desktop Light
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const footer = page.locator('footer[aria-label="Site Footer"]');
    await footer.scrollIntoViewIfNeeded();
    await footer.screenshot({ path: `${screenshotDir}/footer_desktop_light.png` });

    // 2. Desktop Dark
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(100);
    await footer.screenshot({ path: `${screenshotDir}/footer_desktop_dark.png` });

    // 3. Mobile Light
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });
    await page.goto('/');
    const mobileFooter = page.locator('footer[aria-label="Site Footer"]');
    await mobileFooter.scrollIntoViewIfNeeded();
    await mobileFooter.screenshot({ path: `${screenshotDir}/footer_mobile_light.png` });

    // 4. Mobile Dark
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(100);
    await mobileFooter.screenshot({ path: `${screenshotDir}/footer_mobile_dark.png` });
  });
});
