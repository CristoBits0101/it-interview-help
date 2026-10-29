import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { publishedTracks, pendingPages, publishedGuides } from '../src/data/published-catalog.ts';
import { patternGuides } from '../src/data/pattern-guides/index.ts';
import { t } from '../src/lib/translations.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const outputRoot = resolve(projectRoot, 'dist');
const budgets = JSON.parse(readFileSync(new URL('./build-budgets.json', import.meta.url), 'utf8'));
assert(existsSync(join(outputRoot, 'index.html')), 'Run npm run build before checking the artifact.');
const collectFiles = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? collectFiles(path) : [path];
});
const files = collectFiles(outputRoot);
const html = readFileSync(join(outputRoot, 'index.html'), 'utf8');
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x27);/g, entity => ({
  '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&#39;': "'", '&#x27;': "'",
})[entity]);
const withoutScriptBodies = html.replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/gi, '$1</script>');
const tags = [...withoutScriptBodies.matchAll(/<([a-z][a-z\d-]*)\b([^>]*)>/gi)].map(match => {
  const [, name, source] = match;
  return {
    name: name.toLowerCase(),
    position: match.index,
    contentStart: match.index + match[0].length,
    attributes: Object.fromEntries([...source.matchAll(/([^\s=/"'>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)].map(([, key, doubleQuoted, singleQuoted, unquoted]) => [key.toLowerCase(), decode(doubleQuoted ?? singleQuoted ?? unquoted ?? '')])),
  };
});
const renderedText = tag => {
  assert(tag, 'Expected a rendered text container.');
  const end = withoutScriptBodies.indexOf(`</${tag.name}>`, tag.contentStart);
  assert(end >= tag.contentStart, `Unclosed text container: ${tag.name}`);
  return decode(withoutScriptBodies.slice(tag.contentStart, end).replace(/<[^>]*>/g, ''));
};
const normalizeText = value => value.replace(/\s+/g, ' ').trim();
const assertRenderedText = (tag, expected, label) => assert.equal(normalizeText(renderedText(tag)), normalizeText(expected), label);

const ids = tags.flatMap(tag => tag.attributes.id ? [tag.attributes.id] : []);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
const idSet = new Set(ids);
assert.equal(tags.find(tag => tag.name === 'html')?.attributes.lang, 'en', 'The static document must default to English.');
assert.equal(tags.find(tag => tag.name === 'body')?.attributes.lang, 'en', 'The static body must use the document language.');
assert.match(html, /Foundations for technical interviews/);
const canonical = tags.find(tag => tag.name === 'link' && tag.attributes.rel === 'canonical')?.attributes.href;
assert(canonical && new URL(canonical).protocol === 'https:', 'Missing HTTPS canonical URL.');
assert.equal(tags.find(tag => tag.name === 'meta' && tag.attributes.property === 'og:url')?.attributes.content, canonical);
assert(tags.find(tag => tag.name === 'meta' && tag.attributes.name === 'description')?.attributes.content?.trim());
assert(!html.includes('data-language-pending'), 'Do not hide the document while JavaScript initializes.');
assert.equal(tags.filter(tag => tag.name === 'main').length, 1);
assert(idSet.has('home-view') && idSet.has('study'));
const csp = tags.find(tag => tag.name === 'meta' && tag.attributes['http-equiv']?.toLowerCase() === 'content-security-policy')?.attributes.content;
assert(csp, 'The built document must carry the static CSP.');
assert(!/'unsafe-(?:inline|eval)'/.test(csp), 'The CSP must not allow unsafe inline or eval scripts.');
for (const directive of ["default-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'none'", "connect-src 'self'", "frame-src 'none'"]) {
  assert(csp.includes(directive), `Missing CSP restriction: ${directive}`);
}

for (const file of files.filter(file => extname(file) === '.css')) {
  const css = readFileSync(file, 'utf8');
  assert(!/@font-face\s*\{[^}]*url\(["']?data:/iu.test(css), 'Font URLs must remain same-origin files compatible with the CSP.');
}

const concepts = publishedTracks.flatMap(track => track.modules.flatMap(module => module.concepts));
const routes = new Set(publishedTracks.flatMap(track => track.modules.map(module => `#${track.id}/${module.id}`)));
const guideSections = tags.filter(tag => 'data-resource-route' in tag.attributes);
assert.deepEqual(new Set(guideSections.map(tag => `#${tag.attributes['data-resource-route']}`)), new Set(publishedGuides.map(guide => guide.href)));
for (const guide of publishedGuides) assert(guideSections.some(tag => tag.attributes.id === guide.href.slice(1)));
const pendingSections = tags.filter(tag => 'data-pending-route' in tag.attributes);
assert.deepEqual(new Set(pendingSections.map(tag => `#${tag.attributes['data-pending-route']}`)), new Set(pendingPages.map(page => page.href)));
for (const page of pendingPages) {
  const section = pendingSections.find(tag => tag.attributes.id === page.href.slice(1));
  assert(section && 'hidden' in section.attributes);
  assertRenderedText(tags.find(tag => tag.attributes.id === `${page.href.slice(1)}-title`), t(page.label), `Pending page title: ${page.href}`);
  const content = withoutScriptBodies.slice(section.contentStart, withoutScriptBodies.indexOf('</section>', section.contentStart));
  assert(content.includes(t('Contenido en preparación')));
  assert(!content.includes('data-concept-id'));
}
assert.deepEqual(new Set(tags.filter(tag => 'data-concept-id' in tag.attributes).map(tag => tag.attributes['data-concept-id'])), new Set(concepts.map(concept => concept.id)));
assert.deepEqual(new Set(tags.filter(tag => 'data-module-id' in tag.attributes).map(tag => `#${tag.attributes['data-track-id']}/${tag.attributes['data-module-id']}`)), routes);
assert.deepEqual(new Set(tags.filter(tag => tag.name === 'dialog' && 'data-implementation' in tag.attributes).map(tag => tag.attributes.id)), new Set(Object.keys(patternGuides).map(id => `implementation-${id}`)));

for (const concept of concepts) {
  const explanation = tags.find(tag => tag.attributes.id === `concept-${concept.id}-explanation`);
  assertRenderedText(explanation, t(concept.description), `Static English explanation: ${concept.id}`);
}
for (const [id, guide] of Object.entries(patternGuides)) {
  assertRenderedText(tags.find(tag => tag.attributes.id === `concept-${id}-use-case`), guide.useCase.en, `Static English use case: ${id}`);
  const dialog = tags.find(tag => tag.attributes.id === `implementation-${id}`);
  const dialogEnd = withoutScriptBodies.indexOf('</dialog>', dialog.contentStart);
  const content = tags.filter(tag => tag.position > dialog.position && tag.position < dialogEnd);
  const headings = content.filter(tag => 'data-guide-heading' in tag.attributes);
  const reasons = content.filter(tag => 'data-guide-why' in tag.attributes);
  assert.equal(headings.length, guide.steps.length, `Rendered step headings: ${id}`);
  assert.equal(reasons.length, guide.steps.length, `Rendered step reasons: ${id}`);
  for (const [index, step] of guide.steps.entries()) {
    assertRenderedText(headings.find(tag => tag.attributes['data-guide-heading'] === String(index)), step.title.en, `Static English step heading: ${id}:${index}`);
    assertRenderedText(reasons.find(tag => tag.attributes['data-guide-why'] === String(index)), step.why.en, `Static English step reason: ${id}:${index}`);
  }
  assert.equal(renderedText(content.find(tag => 'data-guide-code' in tag.attributes)).replaceAll('\r\n', '\n'), guide.code.replaceAll('\r\n', '\n'), `Complete copyable code: ${id}`);
}
const assertLocalAsset = (url, fromFile) => {
  if (!url || url.startsWith('#') || url.startsWith('data:')) return;
  assert(!/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(url), `Unexpected remote asset: ${url}`);
  const path = decodeURIComponent(url.split(/[?#]/, 1)[0]);
  const asset = resolve(path.startsWith('/') ? outputRoot : dirname(fromFile), path.replace(/^\/+/, ''));
  assert(asset.startsWith(`${outputRoot}${sep}`), `Asset escapes output: ${url}`);
  assert(existsSync(asset), `Missing built asset: ${relative(outputRoot, fromFile)} → ${url}`);
};

const expectedCssLayers = ['reset', 'base', 'layout', 'components', 'responsive'];
const effectiveCssLayers = new Set();
for (const tag of tags.filter(tag => tag.name === 'link' && tag.attributes.rel?.split(/\s+/).includes('stylesheet'))) {
  const href = tag.attributes.href;
  assertLocalAsset(href, join(outputRoot, 'index.html'));
  const stylesheet = resolve(outputRoot, decodeURIComponent(href.split(/[?#]/, 1)[0]).replace(/^\/+/, ''));
  const css = readFileSync(stylesheet, 'utf8');
  for (const [, names] of css.matchAll(/@layer\s+([a-z][\w.-]*(?:\s*,\s*[a-z][\w.-]*)*)\s*[;{]/gi)) {
    for (const name of names.split(',').map(name => name.trim())) {
      if (expectedCssLayers.includes(name)) effectiveCssLayers.add(name);
    }
  }
}
assert.deepEqual([...effectiveCssLayers], expectedCssLayers, 'CSS layers must establish reset → base → layout → components → responsive before component styles can override application controls.');

for (const tag of tags) {
  const attributes = tag.attributes;
  for (const name of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
    for (const reference of (attributes[name] ?? '').split(/\s+/).filter(Boolean)) {
      assert(idSet.has(reference), `Broken ${name}: ${reference}`);
    }
  }
  for (const name of Object.keys(attributes)) assert(!/^on[a-z]+$/.test(name), `Inline event handler: ${name}`);
  if (tag.name === 'script') assert(!attributes.src?.startsWith('data:'), 'Scripts must be local build assets.');
  if (attributes.src) assertLocalAsset(attributes.src, join(outputRoot, 'index.html'));
  if (tag.name === 'link' && ['stylesheet', 'icon', 'preload', 'modulepreload'].includes(attributes.rel)) {
    assertLocalAsset(attributes.href, join(outputRoot, 'index.html'));
  }
  if (tag.name !== 'a' || !attributes.href) continue;
  const href = attributes.href;
  if (href.startsWith('/')) {
    assert(existsSync(join(outputRoot, href, 'index.html')), `Missing static route: ${href}`);
  } else if (href.startsWith('#')) {
    assert(routes.has(href) || href === '#home' || idSet.has(href.slice(1)), `Broken local link: ${href}`);
  } else {
    const url = new URL(href, 'https://build.invalid/');
    assert.equal(url.protocol, 'https:', `Unsafe link: ${href}`);
    assert.equal(url.username + url.password, '', `Credentialed link: ${href}`);
    if (attributes.target === '_blank') {
      const rel = attributes.rel?.split(/\s+/) ?? [];
      assert(rel.includes('noopener') && rel.includes('noreferrer'), `Unprotected external link: ${href}`);
    }
  }
}

const totals = { htmlGzipBytes: 0, javascriptGzipBytes: 0, cssGzipBytes: 0, totalBytes: 0 };
for (const file of files) {
  const relativePath = relative(outputRoot, file).replaceAll('\\', '/');
  assert(!/(^|\/)(?:\.env(?:\.|$)|\.git(?:\/|$)|node_modules(?:\/|$)|qa-[^/]*|test-results(?:\/|$))|\.map$/i.test(relativePath), `Development artifact in dist: ${relativePath}`);
  const buffer = readFileSync(file);
  totals.totalBytes += buffer.length;
  const extension = extname(file);
  if (extension === '.html') totals.htmlGzipBytes += gzipSync(buffer).length;
  if (extension === '.js') totals.javascriptGzipBytes += gzipSync(buffer).length;
  if (extension === '.css') {
    totals.cssGzipBytes += gzipSync(buffer).length;
    for (const [, url] of buffer.toString().matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) assertLocalAsset(url, file);
  }
}
for (const [metric, limit] of Object.entries(budgets)) {
  assert(totals[metric] <= limit, `${metric}: ${totals[metric]} exceeds ${limit}. Review growth before changing the budget.`);
}
console.log(`Validated static English HTML, ${concepts.length} concepts, ${routes.size} concept pages, ${publishedGuides.length} topic guides, ${Object.keys(patternGuides).length} pattern guides, IDs, ARIA, links, assets and CSP.`);
console.log(JSON.stringify({ bytes: totals, budgets }, null, 2));
