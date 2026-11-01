import { test, expect } from './fixtures.mjs';

test('preferences preserves the previous internal route and hash through reload', async ({ page }) => {
  await page.goto('/software-design/solid#concept-srp');
  if (await page.locator('#mobile-toggle').isVisible()) await page.locator('#mobile-toggle').click();
  await page.locator('#preferences-link').click();
  await expect(page.locator('#preferences-back')).toHaveAttribute('href', '/software-design/solid#concept-srp');
  await page.reload();
  await expect(page.locator('#preferences-back')).toHaveAttribute('href', '/software-design/solid#concept-srp');
  for (const language of ['es', 'en']) {
    await page.locator(`label[lang="${language}"]`).click();
    await expect(page.locator('#preferences-title')).toHaveText(language === 'es' ? 'Ajuste de Preferencias' : 'Preference Settings');
    await expect(page.locator('#preferences-back')).toHaveText(language === 'es' ? 'Volver' : 'Back');
    const spacing = await page.evaluate(() => {
      const header = document.querySelector('.topbar-route-row').getBoundingClientRect();
      const breadcrumb = document.querySelector('.breadcrumb').getBoundingClientRect();
      const heading = document.querySelector('#preferences-language-title');
      const back = document.querySelector('#preferences-back').getBoundingClientRect();
      return { right: back.right, headerRight: header.right, center: back.top + back.height / 2, breadcrumbCenter: breadcrumb.top + breadcrumb.height / 2, size: getComputedStyle(heading).fontSize, section: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-section')) };
    });
    expect(spacing.right).toBe(spacing.headerRight);
    expect(spacing.center).toBeCloseTo(spacing.breadcrumbCenter, 1);
    await expect(page.locator('#preferences-back > span').last()).toBeVisible();
    expect(spacing.size).toBe('15px');
  }
  await page.locator('#preferences-back').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/software-design\/solid#concept-srp$/);
  await expect(page.locator('#preferences-view')).toBeHidden();
  await expect(page.locator('#preferences-back')).toBeHidden();
});

test('direct preferences entry safely falls back to Home with unavailable storage', async ({ page }) => {
  await page.addInitScript(() => {
    for (const key of ['localStorage', 'sessionStorage']) Object.defineProperty(window, key, { get() { throw new Error('Unavailable'); } });
  });
  await page.goto('/preferences');
  await expect(page.locator('#storage-consent-dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#preferences-back')).toHaveAttribute('href', '/');
  await page.evaluate(() => history.replaceState({ preferencesReturn: 'https://external.example/' }, '', location.href));
  await page.reload();
  await expect(page.locator('#storage-consent-dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#preferences-back')).toHaveAttribute('href', '/');
  await page.locator('#preferences-back').click();
  await expect(page.locator('#home-view')).toBeVisible();
});
