import { test, expect } from '@playwright/test';

test('sidebar preserves its full height scrollbar and pinned controls with a long tree', async ({ page }) => {
  await page.goto('/preferences');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => document.querySelectorAll('#course-navigation details').forEach(branch => { branch.open = true; }));
  await page.waitForTimeout(200);
  if (await page.locator('#mobile-toggle').isVisible()) await page.locator('#mobile-toggle').click();
  const bounds = () => page.locator('.sidebar-header, .nav-eyebrow, .sidebar-search, .sidebar-preferences').evaluateAll(elements => elements.map(element => {
    const box = element.getBoundingClientRect();
    return { x: box.x, y: box.y, width: box.width, height: box.height };
  }));
  const before = await bounds();
  const scrollbar = () => page.locator('#sidebar').evaluate(element => {
    const style = getComputedStyle(element);
    return { height: element.clientHeight, viewport: innerHeight, width: style.scrollbarWidth, gutter: style.scrollbarGutter, overflow: style.overflowY };
  });
  const channel = await scrollbar();
  expect(channel).toEqual({ height: channel.viewport, viewport: channel.viewport, width: 'thin', gutter: 'auto', overflow: 'auto' });
  await page.locator('#sidebar').evaluate(element => { element.scrollTop = element.scrollHeight; });
  await expect.poll(() => page.locator('#sidebar').evaluate(element => element.scrollTop)).toBeGreaterThan(500);
  expect(await bounds()).toEqual(before);
  expect(await scrollbar()).toEqual(channel);
  expect(await page.locator('#course-navigation, .navigation-heading, .nav-eyebrow').evaluateAll(elements => elements.every(element => element.scrollHeight <= element.clientHeight + 1))).toBe(true);
  await page.locator('#search').fill('quantum');
  await expect(page.locator('.navigation-disabled').filter({ hasText: 'Quantum Computing' })).toBeVisible();
  await page.locator('#search-clear').click();
  await page.locator('#preferences-link').click();
  await expect(page.locator('#preferences-view')).toBeVisible();
  if (await page.locator('#mobile-toggle').isVisible()) {
    await page.locator('#mobile-toggle').click();
    await expect(page.locator('.workspace')).toHaveAttribute('inert', '');
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-toggle')).toBeFocused();
    await expect(page.locator('#sidebar')).toHaveAttribute('inert', '');
  }
});

test('all menu explanations switch language without changing destinations', async ({ page }) => {
  await page.goto('/preferences');
  const count = await page.locator('#course-navigation li').count() - await page.locator('.navigation-root > li').count();
  await expect(page.locator('.navigation-description-trigger')).toHaveCount(count);
  for (const language of ['es', 'en']) {
    await page.locator(`label[lang="${language}"]`).click();
    expect(await page.locator('.navigation-description-trigger').evaluateAll((buttons, language) => buttons.every(button => button.dataset.navigationDescription === button.getAttribute(`data-i18n-${language}`)), language)).toBe(true);
    const expected = language === 'es' ? 'Configura la aplicación según tus necesidades y gustos.' : 'Configure the application according to your needs and tastes.';
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', expected);
    if (await page.locator('#mobile-toggle').isVisible()) await page.locator('#mobile-toggle').click();
    const firstBranch = page.locator('.navigation-root > li > details').first();
    if (!await firstBranch.evaluate(element => element.open)) await firstBranch.locator(':scope > summary').click();
    const button = page.locator('.navigation-description-trigger:visible').first();
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#navigation-description-tooltip')).toBeVisible();
    await expect(page.locator('#navigation-description-tooltip')).toHaveText(await button.getAttribute('data-navigation-description'));
    await page.keyboard.press('Escape');
    await expect(page.locator('#navigation-description-tooltip')).not.toBeVisible();
    if (await page.locator('#sidebar').evaluate(element => element.classList.contains('mobile-open'))) await page.locator('#sidebar-close').click();
  }
});
