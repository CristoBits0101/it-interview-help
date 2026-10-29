import assert from 'node:assert/strict';
import test from 'node:test';
import { foundationGuides } from '../src/data/foundation-guides.ts';
import { publishedGuides, publishedNavigation, publishedSources } from '../src/data/published-catalog.ts';
import { translate } from '../src/lib/translations.ts';

const flatten = nodes => nodes.flatMap(node => [node, ...flatten(node.children ?? [])]);
const bilingual = value => {
  assert(value.es.trim() && value.en.trim());
  assert.equal(typeof value.es, 'string');
  assert.equal(typeof value.en, 'string');
};

test('foundation guides are reachable bilingual resources with verified source contracts', () => {
  const routes = new Set(foundationGuides.map(guide => guide.route));
  assert.equal(routes.size, foundationGuides.length);
  for (const guide of foundationGuides) {
    assert.match(guide.route, /^[a-z-]+\/[a-z-]+$/);
    assert(publishedGuides.some(item => item.href === `#${guide.route}`));
    assert.equal(flatten(publishedNavigation).filter(node => node.href === `#${guide.route}`).length, 1);
    assert.equal(translate(translate(guide.label, 'es'), 'en'), guide.label);
    bilingual(guide.title);
    bilingual(guide.description);
    assert(guide.diagram.length >= 2);
    for (const part of guide.diagram) { bilingual(part.title); bilingual(part.text); }
    for (const concept of guide.concepts) { bilingual(concept.title); bilingual(concept.description); }
    assert.equal(guide.questions.length, 3);
    for (const question of guide.questions) { bilingual(question.prompt); bilingual(question.answer); }
    assert(guide.related.length);
    for (const route of guide.related) { assert(routes.has(route)); assert.notEqual(route, guide.route); }
    assert.equal(new URL(guide.source.url).protocol, 'https:');
    assert(publishedSources.some(source => source.url === guide.source.url));
  }
});

test('HTTP and REST retain their distinct conceptual coverage', () => {
  const http = foundationGuides.find(guide => guide.label === 'HTTP Protocol');
  assert.match(http.diagram[0].code, /GET \/products\/42 HTTP\/1.1/);
  assert.match(http.diagram[1].code, /200 OK/);
  assert(http.concepts.some(concept => concept.title.en.startsWith('Body')));
  const architecture = foundationGuides.find(guide => guide.label === 'REST');
  for (const title of ['Client and Server', 'Stateless', 'Cache', 'Uniform Interface', 'Layered System', 'Code on Demand · Optional']) {
    assert(architecture.concepts.some(concept => concept.title.en === title));
  }
});
