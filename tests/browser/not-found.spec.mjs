import { test, expect } from '@playwright/test';

test('unknown URLs return an accessible bilingual 404 and retain safe return navigation', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/preferences');
  await page.locator('label[lang="es"]').click();
  await page.goto('/software-design/solid#concept-srp');
  await expect(page.locator('#study')).toBeVisible();
  const response = await page.goto('/missing-interview-page');
  expect(response.status()).toBe(404);
  await expect(page).toHaveTitle('Página no encontrada | IT Interview Help');
  await expect(page.locator('#not-found-back')).toHaveAttribute('href', '/software-design/solid#concept-srp');
  await expect(page.locator('#preferences-back')).toBeHidden();
  await expect(page.locator('#language-selector')).toHaveCount(0);
  await expect(page.locator('#not-found-title')).toHaveText('ERROR 404 Vas más rápido que nuestro equipo de desarrollo 🚀');
  await expect(page.getByText('Íbamos a decir que esta página era exclusiva para ti. Técnicamente lo es. Nadie más consigue verla.', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page).toHaveTitle('Página no encontrada | IT Interview Help');
  await page.locator('#not-found-back').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/software-design\/solid#concept-srp$/);
  await expect(page.locator('#study')).toBeVisible();
  expect(errors).toEqual([]);
});

test('direct error entry uses Home and rejects corrupt or external return data', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('tech-training:last-route:v1', JSON.stringify('https://external.example/')));
  expect((await page.goto('/another-missing-page')).status()).toBe(404);
  await expect(page.locator('#not-found-back')).toBeHidden();
  await page.getByRole('link', { name: 'Go to Home', exact: true }).click();
  await expect(page.locator('#home-view')).toBeVisible();
  await page.goto('/#software-design/patrones');
  await expect(page).toHaveTitle('Creational | IT Interview Help');
  await expect(page.locator('#study')).toBeVisible();
});

test('404 HTML is usable in English without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    expect((await page.goto('http://127.0.0.1:4322/no-script-missing')).status()).toBe(404);
    await expect(page).toHaveTitle('Page Not Found | IT Interview Help');
    await expect(page.locator('#not-found-back')).toBeHidden();
    await expect(page.locator('#language-selector')).toHaveCount(0);
    await expect(page.getByText('You are moving faster than our development team', { exact: true })).toBeVisible();
    await expect(page.getByText('We were going to say that this page was exclusive to you. Technically it is. No one else manages to see it.', { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Go to Home', exact: true }).click();
    await expect(page).toHaveTitle('Home | IT Interview Help');
  } finally { await context.close(); }
});

test('404 defaults to English without a valid saved preference regardless of browser locale', async ({ browser }) => {
  for (const storage of ['empty', 'invalid', 'blocked']) {
    const context = await browser.newContext({ locale: 'es-ES' });
    try {
      await context.addInitScript(mode => {
        if (mode === 'invalid') localStorage.setItem('tech-training:language:v1', 'invalid');
        if (mode === 'blocked') {
          for (const key of ['localStorage', 'sessionStorage']) Object.defineProperty(window, key, { get() { throw new Error('Unavailable'); } });
        }
      }, storage);
      const page = await context.newPage();
      await page.goto('http://127.0.0.1:4322/missing-language');
      await expect(page).toHaveTitle('Page Not Found | IT Interview Help');
      await expect(page.locator('#not-found-back')).toBeHidden();
      await expect(page.locator('#language-selector')).toHaveCount(0);
    } finally { await context.close(); }
  }
});
