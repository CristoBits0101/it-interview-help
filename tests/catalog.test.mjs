import assert from 'node:assert/strict';
import test from 'node:test';
import { navigation } from '../src/data/navigation.ts';
import { publishedTracks, publishedNavigation, publishedSources } from '../src/data/published-catalog.ts';
import { createConceptViews } from '../src/lib/concept-views.ts';

const flatten = nodes => nodes.flatMap(node => [node, ...flatten(node.children ?? [])]);
const concepts = publishedTracks.flatMap(track => track.modules.flatMap(module => module.concepts));
const routeIds = publishedTracks.flatMap(track => track.modules.map(module => `#${track.id}/${module.id}`));
const publishedNodes = flatten(publishedNavigation);

test('the published catalog has unique stable identifiers and every page is reachable', () => {
  assert.equal(new Set(publishedTracks.map(track => track.id)).size, publishedTracks.length);
  assert.equal(new Set(routeIds).size, routeIds.length);
  assert.equal(new Set(concepts.map(concept => concept.id)).size, concepts.length);
  assert.deepEqual(new Set(publishedNodes.flatMap(node => node.href ? [node.href] : [])), new Set(routeIds));
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
      assert.equal(result.href, routeIds.includes(node.href) ? node.href : undefined);
      if (node.children) compare(node.children, result.children);
      else assert.equal(result.children, undefined);
    }
  };
  compare(navigation, publishedNavigation);
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
