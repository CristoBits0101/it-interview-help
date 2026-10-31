import { test, expect } from '@playwright/test';

test('available study titles keep their link icon and color the heading on hover', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-career-stage="junior"]').click();
  const panel = page.locator('[data-career-panel]:visible');
  const link = panel.locator('.career-area-heading a').first();
  const heading = link.locator('xpath=../..');
  await expect(link.locator('svg')).toBeVisible();
  expect(await panel.locator('.career-area-heading strong svg').count()).toBe(0);
  await link.scrollIntoViewIfNeeded();
  const before = await heading.boundingBox();
  await link.hover();
  const styles = await heading.evaluate(element => {
    const link = element.querySelector('a');
    const icon = link.querySelector('svg');
    return {
      colors: [...element.querySelectorAll('.career-area-number, .career-area-separator, a, a svg')].map(node => getComputedStyle(node).color),
      decoration: getComputedStyle(link).textDecorationLine,
      iconOpacity: getComputedStyle(icon).opacity,
      rightGap: link.getBoundingClientRect().right - icon.getBoundingClientRect().right,
    };
  });
  expect(new Set(styles.colors).size).toBe(1);
  expect(styles.decoration).toBe('none');
  expect(styles.iconOpacity).toBe('1');
  expect(styles.rightGap).toBeLessThanOrEqual(0.5);
  expect(await heading.boundingBox()).toEqual(before);
  await page.keyboard.press('Tab');
  await link.focus();
  expect(await link.evaluate(element => getComputedStyle(element).boxShadow)).not.toBe('none');
  await expect(panel.locator('.career-outcome-title [aria-hidden="true"]')).toHaveText(['🤔', '💪']);
});
