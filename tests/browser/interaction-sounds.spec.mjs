import { test, expect } from './fixtures.mjs';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.audioStarts = 0;
    const start = AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start = function (...args) {
      window.audioStarts++;
      return start.apply(this, args);
    };
  });
});

async function feedback(page, action, expected = 1) {
  const before = await page.evaluate(() => window.audioStarts);
  await action();
  if (expected) await expect.poll(() => page.evaluate(() => window.audioStarts)).toBe(before + expected);
  await page.waitForTimeout(180);
  expect(await page.evaluate(() => window.audioStarts)).toBe(before + expected);
}

test('language and volume produce one cue per effective user change and preserve mute', async ({ page }) => {
  await page.goto('/preferences');
  const spacing = await page.locator('.language-selector').evaluate(element => {
    const group = element.parentElement;
    const first = element.children[0].getBoundingClientRect();
    const last = element.children[1].getBoundingClientRect();
    const bounds = group.getBoundingClientRect();
    const styles = getComputedStyle(group);
    return [first.left - bounds.left - parseFloat(styles.borderLeftWidth), last.left - first.right, bounds.right - last.right - parseFloat(styles.borderRightWidth)];
  });
  expect(spacing).toEqual([16, 16, 16]);
  expect(await page.evaluate(() => window.audioStarts)).toBe(0);
  await feedback(page, () => page.locator('#sound-toggle').click());
  await feedback(page, () => page.locator('label[lang="es"]').click());
  await feedback(page, () => page.locator('label[lang="es"]').click(), 0);
  await page.locator('#language-es').focus();
  await feedback(page, () => page.keyboard.press('ArrowRight'));
  await page.locator('#sound-volume').focus();
  await feedback(page, () => page.keyboard.press('ArrowRight'));
  await expect(page.locator('#sound-volume')).toHaveValue('31');
  await feedback(page, () => page.keyboard.press('Home'), 0);
  await feedback(page, () => page.keyboard.press('ArrowRight'));
  await feedback(page, () => page.evaluate(() => {
    document.querySelector('#sound-volume').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#language-es').click();
    document.dispatchEvent(new CustomEvent('interaction-feedback', { detail: { cue: 'navigate', source: new Event('click') } }));
  }), 0);
  await page.reload();
  expect(await page.evaluate(() => window.audioStarts)).toBe(0);
  await expect(page.locator('#sound-volume')).toHaveValue('1');
  await feedback(page, () => page.locator('label[lang="en"]').click());
  await feedback(page, () => page.locator('#sound-toggle').click(), 0);
  await expect(page.locator('#sound-volume')).toBeDisabled();
  await feedback(page, () => page.locator('label[lang="es"]').click(), 0);
});

test('navigation, study controls and dialogs provide feedback without duplicate cues', async ({ page }) => {
  await page.goto('/preferences');
  await feedback(page, () => page.locator('#sound-toggle').click());
  await feedback(page, () => page.locator('.breadcrumb a').first().click());
  await feedback(page, () => page.locator('[data-career-stage="junior"]').click());
  await feedback(page, () => page.locator('[data-career-stage="junior"]').click());
  await page.goto('/software-design/patrones');
  expect(await page.evaluate(() => window.audioStarts)).toBe(0);
  await feedback(page, () => page.locator('[data-guide-open]:visible').first().click());
  await feedback(page, () => page.locator('dialog[open] [data-guide-next]').click());
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  await feedback(page, () => page.locator('dialog[open] .implementation-complete > summary').click());
  await feedback(page, () => page.locator('dialog[open] [data-guide-copy]').click());
  await feedback(page, () => page.locator('dialog[open] [data-guide-go][aria-current="step"]').click(), 0);
  await feedback(page, () => page.keyboard.press('Escape'));
  await feedback(page, () => page.locator('[data-learn="builder"]').click());
  await feedback(page, () => page.locator('#level-next').click());
  await feedback(page, () => page.keyboard.press('Control+k'));
  await feedback(page, () => page.locator('#search').fill('solid'));
  await feedback(page, () => page.locator('#search-clear').click());
  const branch = page.locator('[data-nav-branch="Computer%20Systems"] > summary');
  await feedback(page, () => branch.click());
  await feedback(page, () => branch.click());
});

test('unavailable audio reports a translated status and restores the disabled state', async ({ page }) => {
  await page.route('**/audio/interface/*.ogg', route => route.abort());
  await page.goto('/preferences');
  await page.locator('#sound-toggle').click();
  await expect(page.locator('#sound-status')).toHaveText('Audio is unavailable. You can try again.');
  await expect(page.locator('#sound-volume')).toBeDisabled();
  await page.locator('label[lang="es"]').click();
  await expect(page.locator('#sound-status')).toHaveText('El audio no está disponible. Puedes volver a intentarlo.');
});
