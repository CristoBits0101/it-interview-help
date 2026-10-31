import assert from 'node:assert/strict';
import test from 'node:test';
import { navigation } from '../src/app/data/navigation.ts';
import { publishedTracks, publishedNavigation, publishedSources, pendingPages, publishedGuides } from '../src/app/data/published-catalog.ts';
import { createConceptViews } from '../src/shared/lib/concept-views.ts';
import { translate } from '../src/shared/lib/translations.ts';

const flatten = nodes => nodes.flatMap(node => [node, ...flatten(node.children ?? [])]);
const concepts = publishedTracks.flatMap(track => track.modules.flatMap(module => module.concepts));
const routeIds = publishedTracks.flatMap(track => track.modules.map(module => `#${track.id}/${module.id}`));
const pendingIds = pendingPages.map(page => page.href);
const availableIds = [...routeIds, ...pendingIds, ...publishedGuides.map(guide => guide.href)];
const publishedNodes = flatten(publishedNavigation);

test('programming language placeholders remain bilingual and unavailable without invented pages', () => {
  const languages = publishedNodes.find(node => node.label === 'Programming Languages');
  const added = ['C', 'C++', 'C#', 'Go', 'JavaScript', 'Kotlin', 'PHP', 'Ruby', 'Rust', 'Swift'];
  assert.equal(new Set(languages.children.map(node => node.label)).size, languages.children.length);
  for (const label of added) {
    const node = languages.children.find(item => item.label === label);
    assert(node, label);
    assert.equal(node.href, undefined);
    assert.deepEqual(node.children.map(child => child.label), label === 'JavaScript' ? ['Runtimes', 'Frameworks', 'Libraries'] : ['Frameworks', 'Libraries']);
    assert.equal(translate(label, 'en'), label);
    assert.equal(translate(label, 'es'), label);
  }
  for (const label of ['Java', 'Python', 'TypeScript']) {
    assert(languages.children.find(node => node.label === label)?.children.length);
  }
  assert(!languages.children.some(node => node.label === 'Node.js'));
  for (const language of languages.children) {
    for (const label of ['Frameworks', 'Libraries']) {
      const entries = language.children.filter(node => node.label === label);
      assert.equal(entries.length, 1);
      assert.equal(entries[0].href, undefined);
      assert.equal(entries[0].children, undefined);
    }
  }
});

test('development domains group web content without publishing empty mobile or desktop pages', () => {
  const development = navigation.find(node => node.label === 'Software Engineering').children.find(node => node.label === 'Software Development');
  assert.deepEqual(development.children.map(node => node.label), [
    'Programming Languages', 'Development Domains',
  ]);
  const domains = development.children.at(-1);
  const runtimes = development.children.find(node => node.label === 'Programming Languages').children.find(node => node.label === 'JavaScript').children.find(node => node.label === 'Runtimes');
  assert.deepEqual(runtimes.children.map(({ label }) => label), ['Node.js']);
  const runtimeEntries = publishedNodes.find(node => node.label === 'Runtimes').children;
  assert.equal(runtimeEntries.length, 1);
  assert.equal(runtimeEntries[0].label, 'Node.js');
  assert.equal(runtimeEntries[0].href, undefined);
  assert.equal(runtimeEntries[0].children, undefined);
  assert.deepEqual(domains.children.map(node => node.label), ['Desktop Development', 'Embedded Software Development', 'Game Development', 'IoT Development', 'Mobile Development', 'Web Development']);
  assert.deepEqual(domains.children.at(-1).children.map(({ label, href }) => ({ label, href })), [{ label: 'Web Rendering', href: '#software-development/web-rendering' }]);
  for (const node of domains.children.slice(0, -1)) {
    assert.equal(node.href, undefined);
    assert.equal(node.children, undefined);
    assert.equal(publishedNodes.find(item => item.label === node.label).href, undefined);
  }
  for (const [en, es] of [
    ['Runtimes', 'Entornos de Ejecución'], ['Frameworks', 'Marcos de Trabajo'], ['Libraries', 'Bibliotecas'],
    ['Development Domains', 'Ámbitos de Desarrollo'], ['Web Development', 'Desarrollo Web'],
    ['Mobile Development', 'Desarrollo Móvil'], ['Desktop Development', 'Desarrollo de Escritorio'],
  ]) {
    assert.equal(translate(en, 'es'), es);
    assert.equal(translate(es, 'en'), en);
  }
});

test('the published catalog has unique stable identifiers and every page is reachable', () => {
  assert.equal(new Set(publishedTracks.map(track => track.id)).size, publishedTracks.length);
  assert.equal(new Set(routeIds).size, routeIds.length);
  assert.equal(new Set(concepts.map(concept => concept.id)).size, concepts.length);
  assert.deepEqual(new Set(publishedNodes.flatMap(node => node.href ? [node.href] : [])), new Set(availableIds));
  for (const track of publishedTracks) {
    assert(track.modules.length, `Empty track: ${track.id}`);
    for (const module of track.modules) {
      assert(module.concepts.length, `Empty module: ${module.id}`);
      for (const concept of module.concepts) {
        assert.match(concept.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        assert(concept.title.trim() && concept.description.trim(), `Empty concept: ${concept.id}`);
        assert(['Esencial', 'Intermedio', 'Avanzado'].includes(concept.level));
      }
    }
  }
});

test('unpublished navigation retains its hierarchy without producing dead links', () => {
  const compare = (source, available) => {
    assert.equal(available.length, source.length);
    for (const [index, node] of source.entries()) {
      const result = available[index];
      assert.equal(result.label, node.label);
      assert.equal(result.href, availableIds.includes(node.href) ? node.href : undefined);
      if (node.children) compare(node.children, result.children);
      else assert.equal(result.children, undefined);
    }
  };
  compare(navigation, publishedNavigation);
});

test('pending destinations are distinct leaves and do not publish empty learning content', () => {
  assert.equal(new Set(pendingIds).size, 7);
  assert.equal(new Set(availableIds).size, availableIds.length);
  for (const page of pendingPages) {
    assert.match(page.href, /^#it-service-management\/[a-z-]+$/);
    const nodes = publishedNodes.filter(node => node.href === page.href);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].children, undefined);
    assert.equal(nodes[0].label, page.label);
    assert(!routeIds.includes(page.href));
  }
  assert.equal(concepts.length, 123);
  assert.equal(publishedTracks.length, 2);
  const methods = publishedNodes.find(node => node.label === 'Software Engineering Methods');
  assert.deepEqual(methods.children.map(node => node.label), ['Heuristic Methods', 'Formal Methods', 'Prototyping Methods', 'Agile Methods']);
  for (const node of methods.children) assert.equal(node.href, undefined);
});

test('published sources use safe direct HTTPS addresses and remain deduplicated', () => {
  assert.equal(new Set(publishedSources.map(source => source.url)).size, publishedSources.length);
  for (const concept of concepts) {
    const { source } = concept;
    const url = new URL(source.url);
    assert.equal(url.protocol, 'https:', concept.id);
    assert.equal(url.username + url.password, '', concept.id);
    assert(source.publisher.trim() && source.title.trim(), `Incomplete source: ${concept.id}`);
    assert(publishedSources.some(item => item.url === source.url), `Missing reference: ${concept.id}`);
  }
});

test('optional card views cannot replace the stable explanation or activate empty content', () => {
  const fixture = { description: ' Explanation. ', useCase: ' ', example: ' class Main {} ' };
  const views = createConceptViews(fixture);
  assert.deepEqual(views.map(view => view.id), ['explanation', 'use-case', 'example']);
  assert.deepEqual(views.map(view => view.content), ['Explanation.', '', 'class Main {}']);
  assert.deepEqual(views.filter(view => view.active).map(view => view.id), ['explanation']);
  assert.equal(fixture.description, ' Explanation. ');
  assert.deepEqual(createConceptViews({ description: '', useCase: ' A case. ' }).filter(view => view.active).map(view => view.id), ['use-case']);
  assert.equal(createConceptViews({ description: ' ' }).filter(view => view.active).length, 0);
});
