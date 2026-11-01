import { test, expect } from './fixtures.mjs';
import AxeBuilder from '@axe-core/playwright';

let pageErrors = [];
test.beforeEach(({ page }) => {
  pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
});
test.afterEach(() => expect(pageErrors).toEqual([]));

async function checkAccessibility(page) {
  await page.evaluate(() => document.fonts.ready);
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(result.violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

for (const language of ['en', 'es']) {
  test(`${language}: sidebar filtering restores branches without changing saved expansion`, async ({ page }) => {
    await page.addInitScript(value => localStorage.setItem('tech-training:language:v1', value), language);
    await page.goto('/');
    await page.keyboard.press('Control+k');
    const software = page.locator('[data-nav-branch="Software%20Engineering"]');
    await software.locator(':scope > summary').click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('tech-training:navigation:v1'))).toContain('Software%20Engineering');
    const saved = await page.evaluate(() => localStorage.getItem('tech-training:navigation:v1'));
    const before = await page.locator('[data-nav-branch][open]').evaluateAll(branches => branches.map(branch => branch.dataset.navBranch).sort());
    await page.locator('#search').fill('solid');
    await expect(page.locator('#course-navigation a[href="/software-design/solid"]')).toBeVisible();
    await expect(page.locator('[data-nav-branch="Cybersecurity"]')).toBeHidden();
    expect(await page.evaluate(() => localStorage.getItem('tech-training:navigation:v1'))).toBe(saved);
    await page.locator('#search').fill('Rust');
    const rust = page.locator('[data-nav-branch$="/Rust"]');
    await expect(rust).toBeVisible();
    await expect(rust.locator('.navigation-disabled').first()).toBeVisible();
    await expect(rust.locator('.navigation-disabled').first()).not.toHaveAttribute('href');
    await page.locator('#search').fill('ciberseguridad');
    await expect(page.locator('[data-nav-branch="Cybersecurity"]')).toBeVisible();
    await page.locator('#search').fill('zzzz-no-match');
    await expect(page.locator('#navigation-search-empty')).toBeVisible();
    await expect(page.locator('#course-navigation .navigation-row:visible')).toHaveCount(0);
    await page.locator('#search-clear').click();
    await expect(page.locator('#navigation-search-empty')).toBeHidden();
    expect(await page.locator('[data-nav-branch][open]').evaluateAll(branches => branches.map(branch => branch.dataset.navBranch).sort())).toEqual(before);
    expect(await page.evaluate(() => localStorage.getItem('tech-training:navigation:v1'))).toBe(saved);
    await checkAccessibility(page);
  });

  test(`${language}: Home selection, external resources and persisted stage`, async ({ page }) => {
    await page.addInitScript(value => { if (!localStorage.getItem('tech-training:language:v1')) localStorage.setItem('tech-training:language:v1', value); }, language);
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await page.locator('[data-career-stage="junior"]').click();
    await expect(page.locator('#career-panels')).toBeVisible();
    await checkAccessibility(page);
    const link = page.locator('[data-career-growth]:visible').first();
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    const stage = await page.evaluate(() => localStorage.getItem('tech-training:career-stage:v1'));
    await page.context().route(url => url.protocol === 'https:', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Resource fixture</title>' }));
    const popupPromise = page.waitForEvent('popup');
    await link.focus();
    await page.keyboard.press('Enter');
    const popup = await popupPromise;
    await expect(popup).toHaveTitle('Resource fixture');
    await popup.close();
    expect(await page.evaluate(() => localStorage.getItem('tech-training:career-stage:v1'))).toBe(stage);
    await page.reload();
    await expect(page.locator('[data-career-stage="junior"]')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('[data-career-stage="junior"]').click();
    await expect(page.locator('#career-panels')).toBeHidden();
  });

  test(`${language}: study, search, mobile drawer and implementation focus`, async ({ page }, testInfo) => {
    await page.addInitScript(value => { if (!localStorage.getItem('tech-training:language:v1')) localStorage.setItem('tech-training:language:v1', value); }, language);
    await page.goto('/software-design/patrones');
    await expect(page.locator('[data-guide-open]:visible').first()).toBeVisible();
    await checkAccessibility(page);
    const trigger = page.locator('[data-guide-open]:visible').first();
    await trigger.click();
    await expect(page.locator('dialog[open]')).toBeVisible();
    await checkAccessibility(page);
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await page.keyboard.press('Control+k');
    await expect(page.locator('#search')).toBeFocused();
    const searchFocus = await page.locator('.sidebar-search .search-box').evaluate(element => {
      const style = getComputedStyle(element);
      return { outline: style.outlineStyle, shadow: style.boxShadow };
    });
    expect(searchFocus.outline).toBe('none');
    expect(searchFocus.shadow).not.toBe('none');
    await page.locator('#search').fill('Builder');
    await expect(page.locator('.concept-card:visible')).toHaveCount(1);
    const searchGeometry = await page.locator('.sidebar-search .search-box').evaluate(element => {
      const bounds = ['input', ':scope > svg', 'button', 'button > svg'].map(selector => element.querySelector(selector).getBoundingClientRect());
      return { centers: bounds.map(rect => rect.y + rect.height / 2), target: { width: bounds[2].width, height: bounds[2].height } };
    });
    expect(Math.max(...searchGeometry.centers) - Math.min(...searchGeometry.centers)).toBeLessThanOrEqual(0.5);
    expect(searchGeometry.target.width).toBeGreaterThanOrEqual(44);
    expect(searchGeometry.target.height).toBeGreaterThanOrEqual(44);
    await page.locator('#search-clear').hover();
    await page.screenshot({ path: testInfo.outputPath(`${language}-search-focus.png`) });
    await page.locator('#search-clear').click();
    if (testInfo.project.name === 'mobile') {
      await checkAccessibility(page);
      await page.keyboard.press('Escape');
      await expect(page.locator('#mobile-toggle')).toBeFocused();
    }
    await page.locator('[data-learn="builder"]').click();
    await page.reload();
    await expect(page.locator('[data-learn="builder"]')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#level-next').click();
    await expect(page.locator('#level-previous')).toBeEnabled();
    await page.locator('#level-previous').click();
    await page.emulateMedia({ forcedColors: 'active' });
    await page.keyboard.press('Tab');
    await page.locator('[data-guide-open]:visible').first().focus();
    expect(await page.locator('[data-guide-open]:visible').first().evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none');
    await page.emulateMedia({ forcedColors: 'none' });
    await page.goto('/preferences');
    const soundGeometry = await page.locator('.sound-controls').evaluate(element => {
      const toggle = element.querySelector('button').getBoundingClientRect();
      const slider = element.querySelector('input[type="range"]').getBoundingClientRect();
      return { centerDifference: Math.abs(toggle.y + toggle.height / 2 - slider.y - slider.height / 2), gap: slider.x - toggle.right };
    });
    expect(soundGeometry.centerDifference).toBeLessThanOrEqual(0.5);
    expect(soundGeometry.gap).toBeGreaterThan(0);
    await expect(page.locator('#sound-volume')).toBeDisabled();
    await page.locator('#sound-toggle').click();
    await expect(page.locator('#sound-volume')).toBeEnabled();
    await page.locator('#sound-volume').focus();
    await page.keyboard.press('End');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#sound-volume')).toHaveValue('99');
    await page.locator('#sound-toggle').click();
    await expect(page.locator('#sound-volume')).toBeDisabled();
    await expect(page.locator('#sound-volume')).toHaveValue('99');
    await page.reload();
    await expect(page.locator('#sound-volume')).toBeDisabled();
    await expect(page.locator('#sound-volume')).toHaveValue('99');
    await page.locator('#sound-toggle').click();
    await expect(page.locator('#sound-volume')).toBeEnabled();
    await expect(page.locator('#sound-volume')).toHaveValue('99');
    await expect(page.locator('#sound-toggle')).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await expect(page.locator('#sound-volume')).toHaveValue('99');
    await expect(page.locator('#sound-toggle')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#sound-toggle').click();
    await expect(page.locator('#sound-volume')).toBeDisabled();
    await expect(page.locator('#language-selector input[type="radio"]')).toHaveCount(2);
    await page.locator(language === 'en' ? 'label:has(#language-es)' : 'label:has(#language-en)').click();
    await expect(page.locator('html')).toHaveAttribute('lang', language === 'en' ? 'es' : 'en');
    await expect(page.locator('#sound-volume')).toBeDisabled();
    await expect(page.locator('#sound-volume')).toHaveValue('99');
    await checkAccessibility(page);
    await page.reload();
    await expect(page.locator(language === 'en' ? '#language-es' : '#language-en')).toBeChecked();
    await page.locator('#language-es').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#language-en')).toBeChecked();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.screenshot({ path: testInfo.outputPath('preferences.png') });
    await page.setViewportSize({ width: 320, height: 900 });
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    await checkAccessibility(page);
  });
}
