const { test, expect } = require('@playwright/test');

test.describe('Homepage Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Add preview theme parameter if testing development theme
    const themeId = process.env.SHOPIFY_DEV_THEME_ID;
    const baseUrl = themeId ? `/?preview_theme_id=${themeId}` : '/';
    await page.goto(baseUrl);
  });

  test('homepage loads correctly', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check that essential elements are present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      threshold: 0.2
    });
  });

  test('header navigation is functional', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Test navigation menu
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Take screenshot of header area
    await expect(page.locator('header')).toHaveScreenshot('header-navigation.png');
  });

  test('mobile responsive design', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check mobile-specific elements
    await expect(page.locator('header')).toBeVisible();
    
    // Take mobile screenshot
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      threshold: 0.2
    });
  });

  test('product grid displays correctly', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for product grid or featured products
    const productGrid = page.locator('[data-testid="product-grid"], .product-grid, .featured-products');
    
    if (await productGrid.count() > 0) {
      await expect(productGrid.first()).toBeVisible();
      await expect(productGrid.first()).toHaveScreenshot('product-grid.png');
    }
  });

  test('page performance metrics', async ({ page }) => {
    // Navigate and measure performance
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Assert reasonable load time (adjust threshold as needed)
    expect(loadTime).toBeLessThan(5000); // 5 seconds
    
    // Check for performance-critical elements
    await expect(page.locator('img[loading="lazy"]')).toHaveCount(0, { timeout: 1000 });
  });
});
