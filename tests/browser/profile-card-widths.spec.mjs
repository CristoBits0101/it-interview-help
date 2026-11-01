import { test, expect } from './fixtures.mjs';

test('surplus width keeps the reference Spanish role titles on one line', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  await page.setViewportSize({ width: 1800, height: 1000 });
  await page.addInitScript(() => localStorage.setItem('tech-training:language:v1', 'es'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const viewport = page.locator('#career-profile-options');
  await expect.poll(() => viewport.evaluate(element => {
    const cards = [...element.querySelectorAll('button:not([hidden])')].slice(0, 5);
    return cards.every(card => {
      const title = card.querySelector('.career-option-title');
      return title.getBoundingClientRect().height <= Number.parseFloat(getComputedStyle(title).lineHeight) + 1;
    });
  })).toBe(true);
  const geometry = await viewport.evaluate(element => {
    const cards = [...element.querySelectorAll('button:not([hidden])')].slice(0, 5);
    return { widths: cards.map(card => card.getBoundingClientRect().width), heights: cards.map(card => card.getBoundingClientRect().height), total: element.clientWidth, gap: Number.parseFloat(getComputedStyle(element).columnGap) };
  });
  expect(geometry.widths[1]).toBeGreaterThan(geometry.widths[0]);
  expect(geometry.widths.reduce((sum, width) => sum + width, 0) + geometry.gap * 4).toBe(geometry.total);
  expect(new Set(geometry.heights).size).toBe(1);
  const longTitleSpace = await viewport.locator('button:not([hidden])').nth(1).evaluate(card => {
    const range = document.createRange();
    range.selectNodeContents(card.querySelector('.career-option-title'));
    const bounds = card.getBoundingClientRect();
    const text = range.getBoundingClientRect();
    const style = getComputedStyle(card);
    return { left: text.left - bounds.left, right: bounds.right - text.right, inset: Number.parseFloat(style.paddingRight) + Number.parseFloat(style.borderRightWidth) };
  });
  expect(longTitleSpace.left).toBeGreaterThanOrEqual(longTitleSpace.inset);
  expect(longTitleSpace.right).toBeGreaterThan(longTitleSpace.inset + 1);
});

test('role widths retain edges, selection and reflow across areas and languages', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const language of ['es', 'en']) {
    await page.goto('/preferences');
    await page.locator(`label[lang="${language}"]`).click();
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const viewport = page.locator('#career-profile-options');
    const directions = page.locator('[data-career-direction]');
    for (let index = 0; index < await directions.count(); index++) {
      await directions.nth(index).evaluate(button => button.click());
      const cards = viewport.locator('button:not([hidden])');
      await cards.first().focus();
      await page.keyboard.press('End');
      await expect(cards.last()).toBeFocused();
      await expect.poll(() => cards.last().evaluate(card => {
        const viewport = card.parentElement;
        const box = card.getBoundingClientRect();
        const bounds = viewport.getBoundingClientRect();
        return box.right <= bounds.right + 1 && box.left >= bounds.left - 1;
      })).toBe(true);
      await page.keyboard.press('Home');
      await expect(cards.first()).toBeFocused();
      const wasSelected = await cards.first().getAttribute('aria-pressed') === 'true';
      await page.keyboard.press('Enter');
      await expect(cards.first()).toHaveAttribute('aria-pressed', String(!wasSelected));
      expect(await cards.evaluateAll(elements => elements.every(card => {
        const range = document.createRange();
        range.selectNodeContents(card.querySelector('.career-option-title'));
        const bounds = card.getBoundingClientRect();
        const style = getComputedStyle(card);
        const left = bounds.left + Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.borderLeftWidth);
        const right = bounds.right - Number.parseFloat(style.paddingRight) - Number.parseFloat(style.borderRightWidth);
        return [...range.getClientRects()].every(line => line.left >= left - 0.1 && line.right <= right + 0.1);
      }))).toBe(true);
      expect(await cards.evaluateAll(elements => elements.every(card => {
        const title = card.querySelector('.career-option-title');
        return title.getBoundingClientRect().height <= Number.parseFloat(getComputedStyle(title).lineHeight) + 1;
      }))).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    for (const width of [1001, 390, 851]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      const cards = viewport.locator('button:not([hidden])');
      await cards.first().focus();
      await page.keyboard.press('End');
      await expect.poll(() => cards.last().evaluate(card => card.getBoundingClientRect().right - card.parentElement.getBoundingClientRect().right)).toBeLessThanOrEqual(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
    }
  }
  expect(errors).toEqual([]);
});

test('narrow role rows reduce to one complete title before allowing reflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.addInitScript(() => localStorage.setItem('tech-training:language:v1', 'es'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const viewport = page.locator('#career-profile-options');
  await expect.poll(() => viewport.evaluate(element => {
    const card = element.querySelector('button:not([hidden])');
    return card.getBoundingClientRect().width === element.clientWidth;
  })).toBe(true);
  const longTitle = viewport.locator('button:not([hidden])').nth(1).locator('.career-option-title');
  await expect.poll(() => longTitle.evaluate(title => title.getBoundingClientRect().height <= Number.parseFloat(getComputedStyle(title).lineHeight) + 1)).toBe(true);
});
