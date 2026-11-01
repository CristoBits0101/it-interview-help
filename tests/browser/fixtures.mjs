import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      try { localStorage.setItem('tech-training:storage-consent:v1', 'accepted'); }
      catch {}
    });
    await use(page);
  },
});
export { expect };
