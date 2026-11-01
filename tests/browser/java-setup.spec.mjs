import { test, expect } from '@playwright/test';

const routes = [
  ['java/jdk-environment', 'Development Environment', 'Entorno de Desarrollo'],
  ['spring-boot/project-creation', 'Project Creation', 'Creación de Proyectos'],
  ['servlet-containers/apache-tomcat', 'Apache Tomcat', 'Apache Tomcat'],
];

test('new setup guides support direct routes, both languages, supplied content without extra review sections', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const language of ['en', 'es']) {
    await page.goto('/preferences');
    await page.locator(`label[lang="${language}"]`).click();
    for (const [route, en, es] of routes) {
      expect((await page.goto(`/${route}`)).status()).toBe(200);
      const guide = page.locator(`[data-resource-route="${route}"]`);
      await expect(guide).toBeVisible();
      await expect(page).toHaveTitle(`${language === 'es' ? es : en} | IT Interview Help`);
      await expect(page.locator('.breadcrumb')).toContainText(language === 'es' ? es : en);
      await expect(guide.locator('details')).toHaveCount(0);
      await expect(guide.locator('.foundation-figure, .foundation-related')).toHaveCount(0);
      if (route === 'java/jdk-environment') {
        await expect(guide.locator(':scope > .foundation-practice > h2')).toHaveText(language === 'es'
          ? ['Introducción al JDK', 'Descargar el JDK', 'Configurar las variables de entorno']
          : ['Introduction to the JDK', 'Download the JDK', 'Configure Environment Variables']);
        await expect(guide.locator('.foundation-practice').first().locator('hr')).toHaveCount(0);
        await expect(guide.locator('.foundation-question')).toHaveText(language === 'es' ? ['¿Qué es el JDK?', '¿Qué incluye el JDK?'] : ['What Is the JDK?', 'What Does the JDK Include?']);
        const typography = await page.evaluate(() => {
          const read = element => {
            const style = getComputedStyle(element);
            return [style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight, style.letterSpacing];
          };
          return { home: read(document.querySelector('.career-control-label')), questions: [...document.querySelectorAll('.foundation-question')].map(read) };
        });
        expect(typography.questions).toEqual([typography.home, typography.home]);
      }
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const intervals = await guide.locator(':scope > .section-separator').evaluateAll(lines => lines.map(line => {
        const box = line.getBoundingClientRect();
        return [box.top - line.previousElementSibling.getBoundingClientRect().bottom, line.nextElementSibling.getBoundingClientRect().top - box.bottom];
      }));
      expect(intervals.length).toBe(route === 'java/jdk-environment' ? 3 : 0);
      for (const interval of intervals) expect(interval).toEqual([21, 21]);
      await page.evaluate(() => { document.documentElement.style.fontSize = ''; });

    }
  }
  expect(errors).toEqual([]);
});

test('HTTP preserves closed ancestors and search expansion stays temporary', async ({ page }) => {
  const branchId = labels => labels.map(encodeURIComponent).join('/');
  const computer = branchId(['Computer Systems']);
  const networks = branchId(['Computer Systems', 'Computer Networks']);
  const protocols = branchId(['Computer Systems', 'Computer Networks', 'Network Protocols']);
  await page.addInitScript(ids => {
    if (!localStorage.getItem('tech-training:navigation:v1')) localStorage.setItem('tech-training:navigation:v1', JSON.stringify(ids));
  }, [networks]);
  await page.goto('/computer-networks/http');
  await expect(page.locator('[data-resource-route="computer-networks/http"]')).toBeVisible();
  await expect(page.locator('.breadcrumb')).toContainText('Network Protocols');
  const branch = id => page.locator(`[data-nav-branch="${id}"]`);
  await expect(branch(networks)).toHaveAttribute('open', '');
  await expect(branch(computer)).not.toHaveAttribute('open', '');
  await expect(branch(protocols)).not.toHaveAttribute('open', '');
  if (await page.locator('#mobile-toggle').isVisible()) await page.locator('#mobile-toggle').click();
  await page.locator('#search').fill('HTTP');
  await expect(branch(protocols)).toHaveAttribute('open', '');
  await page.locator('#search-clear').click();
  await expect(branch(protocols)).not.toHaveAttribute('open', '');
  await expect(branch(computer)).not.toHaveAttribute('open', '');
  await page.locator('#search').fill('cd360itv-api-core');
  if (await page.locator('#sidebar').evaluate(element => element.classList.contains('mobile-open'))) await page.keyboard.press('Escape');
  const result = page.locator('[data-resource-result="spring-boot/project-creation"] a');
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.locator('[data-resource-route="spring-boot/project-creation"]')).toBeVisible();
  await page.reload();
  await expect(branch(networks)).toHaveAttribute('open', '');
  await expect(branch(computer)).not.toHaveAttribute('open', '');
  await page.goto('/preferences');
  await expect(page.locator('#preferences-view hr')).toHaveCount(0);
});

test('Java environment becomes the first roadmap leaf and restores saved expansion', async ({ page }) => {
  const java = ['Software Engineering', 'Software Development', 'Programming Languages', 'Java'];
  const branchId = labels => labels.map(encodeURIComponent).join('/');
  const oldBranch = branchId([...java, 'Development Environment']);
  const roadmap = branchId([...java, 'Developer Roadmap']);
  await page.addInitScript(id => {
    if (!localStorage.getItem('tech-training:navigation:v1')) localStorage.setItem('tech-training:navigation:v1', JSON.stringify([id]));
  }, oldBranch);
  await page.goto('/java/jdk-environment');
  const branch = page.locator('[data-nav-branch="' + roadmap + '"]');
  await expect(branch).toHaveAttribute('open', '');
  await expect(page.locator('[data-nav-branch="' + branchId(java) + '"]')).not.toHaveAttribute('open', '');
  await expect(page.locator('[data-nav-branch="' + oldBranch + '"]')).toHaveCount(0);
  await expect(branch.locator(':scope > ul > li').first().locator('a')).toHaveAttribute('href', '/java/jdk-environment');
  await expect(page.locator('.breadcrumb')).toContainText('Developer Roadmap');
  await page.reload();
  await expect(branch).toHaveAttribute('open', '');
  if (await page.locator('#mobile-toggle').isVisible()) await page.locator('#mobile-toggle').click();
  await page.locator('#search').fill('Entorno de Desarrollo');
  await expect(page.locator('#course-navigation a[href="/java/jdk-environment"]')).toBeVisible();
  await page.locator('#search-clear').click();
  await expect(page.locator('[data-nav-branch="' + branchId(java) + '"]')).not.toHaveAttribute('open', '');
});
