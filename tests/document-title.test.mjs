import assert from 'node:assert/strict';
import test from 'node:test';
import { createRouteTitles, documentTitle } from '../src/shared/lib/document-title.ts';
import { publishedNavigation, publishedTracks, publishedGuides, pendingPages } from '../src/app/data/published-catalog.ts';

const titles = createRouteTitles(publishedNavigation);

test('every published route has a canonical title in the shared inventory', () => {
  const routes = ['/', '/preferences', ...publishedTracks.flatMap(track => track.modules.map(module => `/${track.id}/${module.id}`)), ...[...publishedGuides, ...pendingPages].map(page => page.href.replace(/^#/, '/'))];
  for (const route of routes) {
    assert(titles[route], route);
    for (const language of ['es', 'en']) {
      const title = documentTitle(route, titles, language);
      assert(title.endsWith(' | IT Interview Help'));
      assert.equal(title.split(' | ').length, 2);
      assert.equal(documentTitle(`${route}/`, titles, language), title);
    }
  }
});

test('titles use translated route names and the leaf instead of its parent', () => {
  assert.equal(documentTitle('/', titles, 'en'), 'Home | IT Interview Help');
  assert.equal(documentTitle('/', titles, 'es'), 'Inicio | IT Interview Help');
  assert.equal(documentTitle('/preferences', titles, 'es'), 'Preferencias | IT Interview Help');
  assert.equal(documentTitle('/software-design/solid', titles, 'en'), 'SOLID Principles | IT Interview Help');
  assert.equal(documentTitle('/software-design/patrones', titles, 'en'), 'Creational | IT Interview Help');
});
