import { test, expect } from '@playwright/test';

const consentKey = 'tech-training:storage-consent:v1';
const approvedPrivacy = {
  es: 'No utilizamos cookies y no realizamos sincronizaciones remotas. Si continúas sin guardar la aplicación recordará su negativa y no se le volverá a preguntar. Puedes cambiar esta decisión en la página de Preferencias.',
  en: 'We do not use cookies and we do not perform remote synchronizations. If you continue without saving the application will remember your refusal and you will not be asked again. You can change this decision on the Preferences page.',
};

test('the approved privacy paragraph remains literal in both languages on the app and 404', async ({ page }) => {
  await page.goto('/preferences');
  const paragraph = page.locator('#storage-consent-privacy');
  await expect(paragraph).toHaveText(approvedPrivacy.en);
  await page.locator('#storage-consent-accept').click();
  for (const language of ['es', 'en']) {
    await page.goto('/preferences');
    await page.locator(`label[lang="${language}"]`).click();
    await expect(paragraph).toHaveText(approvedPrivacy[language]);
    await page.goto('/missing-literal-copy');
    await expect(paragraph).toHaveText(approvedPrivacy[language]);
  }
});

async function seedLegacy(page) {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('tech-training:language:v1', 'es');
    localStorage.setItem('tech-training:v1', JSON.stringify({ learned: ['solid-s'] }));
    localStorage.setItem('tech-training:career-stage:v1', JSON.stringify('senior'));
    localStorage.setItem('tech-training:navigation:v1', JSON.stringify(['Software%20Engineering']));
    localStorage.setItem('tech-training:sound:v1', JSON.stringify({ enabled: true, volume: 80 }));
    localStorage.setItem('unrelated', 'keep');
    sessionStorage.setItem('tech-training:last-route:v1', JSON.stringify('/software-design/solid'));
    sessionStorage.setItem('unrelated', 'keep');
  });
  await page.reload();
}

test('no decision reads only consent and language and Escape leaves the app usable without saving', async ({ page }) => {
  await page.addInitScript(() => {
    window.storageReads = [];
    window.storageWrites = [];
    const read = Storage.prototype.getItem;
    const write = Storage.prototype.setItem;
    const remove = Storage.prototype.removeItem;
    Storage.prototype.getItem = function(key) { window.storageReads.push(key); return read.call(this, key); };
    Storage.prototype.setItem = function(key, value) { window.storageWrites.push(key); return write.call(this, key, value); };
    Storage.prototype.removeItem = function(key) { window.storageWrites.push(key); return remove.call(this, key); };
  });
  await seedLegacy(page);
  const dialog = page.locator('#storage-consent-dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName('Solicitud de Consentimiento');
  await expect(dialog.locator('button')).toHaveCount(2);
  await expect(page.locator('#storage-consent-accept')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#storage-consent-reject')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#storage-consent-accept')).toBeFocused();
  const spacing = await dialog.evaluate(element => {
    const copy = element.querySelector('.storage-consent-copy');
    const actions = element.querySelector('.storage-consent-actions');
    const line = copy.querySelector('hr');
    const bounds = line.getBoundingClientRect();
    return { padding: getComputedStyle(element).padding, horizontal: getComputedStyle(actions).columnGap, vertical: getComputedStyle(copy).rowGap, before: bounds.top - line.previousElementSibling.getBoundingClientRect().bottom, after: line.nextElementSibling.getBoundingClientRect().top - bounds.bottom };
  });
  expect(spacing).toEqual({ padding: '21px', horizontal: '21px', vertical: '21px', before: 21, after: 21 });
  expect(await page.locator('#storage-consent-accept').evaluate(button => {
    const style = getComputedStyle(button);
    return { background: style.backgroundColor, color: style.color, border: style.borderTopColor };
  })).toMatchObject({ background: 'rgba(0, 0, 0, 0)' });
  expect(await page.evaluate(() => window.storageReads.every(key => ['tech-training:storage-consent:v1', 'tech-training:language:v1'].includes(key)))).toBe(true);
  expect(await page.evaluate(() => window.storageWrites)).toEqual([]);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('#main')).toBeFocused();
  await expect(page.locator('#home-view')).toBeVisible();
  expect(await page.evaluate(() => window.storageWrites)).toEqual([]);
  expect(await page.evaluate(() => localStorage.getItem('tech-training:storage-consent:v1'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('tech-training:language:v1'))).toBe('es');
  await page.reload();
  await expect(dialog).toBeVisible();
});

test('initial acceptance restores prior settings and remains valid on reload and 404', async ({ page }) => {
  await seedLegacy(page);
  await page.locator('#storage-consent-accept').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('[data-career-stage="senior"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-nav-branch="Software%20Engineering"]')).toHaveAttribute('open', '');
  await page.reload();
  await expect(page.locator('#storage-consent-dialog')).not.toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await page.goto('/software-design/solid');
  await expect(page.locator('[data-learn="solid-s"]')).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/preferences');
  await expect(page.locator('#sound-toggle')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#sound-volume')).toHaveValue('80');
  await page.goto('/missing-consent-page');
  await expect(page).toHaveTitle('Página no encontrada | IT Interview Help');
  await expect(page.locator('#language-selector')).toHaveCount(0);
  await expect(page.locator('#storage-consent-dialog')).not.toBeVisible();
});

test('revocation in another page prevents a previously accepted page from saving again', async ({ page, context }) => {
  await page.goto('/preferences');
  await page.locator('#storage-consent-accept').click();
  await expect(page.locator('#storage-save-toggle')).toBeChecked();
  const other = await context.newPage();
  await other.goto('/preferences');
  await other.locator('#storage-save-toggle').uncheck();
  await expect(page.locator('#storage-save-toggle')).not.toBeChecked();
  await page.locator('label[lang="es"]').click();
  expect(await page.evaluate(() => localStorage.getItem('tech-training:language:v1'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('tech-training:storage-consent:v1'))).toBe('rejected');
  await other.close();
});

test('rejection clears only owned storage and the switch saves current memory when re-enabled', async ({ page }) => {
  await seedLegacy(page);
  await page.locator('#storage-consent-reject').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  expect(await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }))).toEqual({ local: { [consentKey]: 'rejected', unrelated: 'keep' }, session: { unrelated: 'keep' } });
  await page.goto('/preferences');
  await expect(page.locator('#storage-consent-dialog')).not.toBeVisible();
  const toggle = page.locator('#storage-save-toggle');
  await expect(page.locator('#storage-saving-description')).toHaveCount(0);
  expect(await toggle.getAttribute('aria-describedby')).toBeNull();
  expect(await toggle.evaluate(input => getComputedStyle(input).borderRadius)).toBe('9999px');
  await expect(toggle).not.toBeChecked();
  await expect(page.locator('#sound-toggle')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#sound-volume')).toHaveValue('30');
  await page.locator('label[lang="es"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  expect(await page.evaluate(() => localStorage.getItem('tech-training:language:v1'))).toBeNull();
  expect(await page.evaluate(() => history.state?.preferencesReturn)).toBeUndefined();
  await toggle.check();
  expect(await page.evaluate(() => localStorage.getItem('tech-training:language:v1'))).toBe('es');
  await toggle.uncheck();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  expect(await page.evaluate(() => localStorage.getItem('tech-training:language:v1'))).toBeNull();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(toggle).not.toBeChecked();
  await page.goto('/missing-rejected-page');
  await expect(page).toHaveTitle('Page Not Found | IT Interview Help');
  await expect(page.locator('#storage-consent-dialog')).not.toBeVisible();
});

test('learning stays in memory after rejection and reactivation saves that current progress', async ({ page }) => {
  await page.goto('/software-design/solid');
  await page.locator('#storage-consent-reject').click();
  const learned = page.locator('[data-learn="solid-s"]');
  await learned.click();
  await expect(learned).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => localStorage.getItem('tech-training:v1'))).toBeNull();
  await page.reload();
  await expect(learned).toHaveAttribute('aria-pressed', 'false');
  await learned.click();
  if (await page.locator('#mobile-toggle').isVisible()) await page.locator('#mobile-toggle').click();
  await page.locator('#preferences-link').click();
  await page.locator('#storage-save-toggle').check();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('tech-training:v1')))).toEqual({ learned: ['solid-s'] });
  await page.goto('/software-design/solid');
  await expect(learned).toHaveAttribute('aria-pressed', 'true');
});

test('blocked storage keeps decisions in memory and supports keyboard and enlarged text', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    for (const key of ['localStorage', 'sessionStorage']) Object.defineProperty(window, key, { get() { throw Error('Unavailable'); } });
  });
  await page.goto('/preferences');
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const dialog = page.locator('#storage-consent-dialog');
  await expect(dialog).toBeVisible();
  await page.locator('#storage-consent-reject').focus();
  await page.keyboard.press('Enter');
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('#storage-save-toggle')).toBeEnabled();
  await page.locator('label[lang="es"]').click();
  await page.locator('#storage-save-toggle').focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#storage-save-toggle')).toBeChecked();
  await expect(page.locator('#storage-saving-status')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('without JavaScript no consent dialog blocks content and saving stays disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4322/preferences');
    await expect(page.locator('#preferences-view')).toBeVisible();
    await expect(page.locator('#storage-consent-dialog')).not.toBeVisible();
    await expect(page.locator('#storage-save-toggle')).toBeDisabled();
    await expect(page.locator('#storage-consent-privacy')).toHaveText(approvedPrivacy.en);
  } finally { await context.close(); }
});

test('saved language localizes an undecided request on reload and 404 while memory language updates every modal label', async ({ page }) => {
  await page.goto('/preferences');
  for (const language of ['es', 'en']) {
    await page.evaluate(value => localStorage.setItem('tech-training:language:v1', value), language);
    for (const route of ['/preferences', '/missing-language-consent']) {
      await page.goto(route);
      await expect(page.locator('#storage-consent-dialog')).toBeVisible();
      await expect(page.locator('#storage-consent-title')).toHaveText(language === 'es' ? 'Solicitud de Consentimiento' : 'Consent Request');
      await expect(page.locator('#storage-consent-privacy')).toHaveText(approvedPrivacy[language]);
      await expect(page.locator('.storage-consent-items li')).toHaveText(language === 'es' ? ['Idioma Seleccionado.', 'Progreso de Aprendizaje.', 'Etapa Seleccionada.', 'Despliegue de las Ramas del Menú.', 'Sonido Activado o Desactivado.', 'Nivel de Volumen.'] : ['Selected Language.', 'Learning Progress.', 'Selected Stage.', 'Menu Branch Expansion.', 'Sound On or Off.', 'Volume Level.']);
      await expect(page.locator('#storage-consent-dialog hr')).toHaveCount(3);
      expect(await page.locator('.storage-consent-items').evaluate(element => getComputedStyle(element).listStyleType)).toBe('disc');
      expect(await page.evaluate(() => localStorage.getItem('tech-training:storage-consent:v1'))).toBeNull();
    }
  }
  await page.goto('/preferences');
  await page.locator('#storage-consent-reject').click();
  for (const language of ['es', 'en']) {
    await page.locator('label[lang="' + language + '"]').click();
    await page.evaluate(() => document.querySelector('#storage-consent-dialog').showModal());
    await expect(page.locator('#storage-consent-title')).toHaveText(language === 'es' ? 'Solicitud de Consentimiento' : 'Consent Request');
    await expect(page.locator('#storage-consent-privacy')).toHaveText(approvedPrivacy[language]);
    await expect(page.locator('.storage-consent-question')).toHaveText(language === 'es' ? '¿Qué queremos almacenar?' : 'What do we want to store?');
    await expect(page.locator('#storage-consent-accept')).toHaveText(language === 'es' ? 'Guardar mis preferencias' : 'Save my preferences');
    expect(await page.evaluate(() => localStorage.getItem('tech-training:language:v1'))).toBeNull();
    await page.keyboard.press('Escape');
  }
});
