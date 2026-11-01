import assert from 'node:assert/strict';
import test from 'node:test';
import { safePreferencesReturn } from '../src/shared/lib/preferences-return.ts';

const origin = 'https://interview.example';
const routes = new Set(['/', '/software-design/solid']);

test('preferences return preserves internal paths and anchors', () => {
  for (const route of ['/', '/#home', '/software-design/solid#concept-srp', '/software-design/solid/?view=study#concept-srp']) {
    assert.equal(safePreferencesReturn(route, origin, routes), route);
    assert.equal(safePreferencesReturn(`${origin}${route}`, origin, routes), route);
  }
});

test('preferences return rejects external destinations and preferences loops', () => {
  for (const route of [null, {}, '', 'https://other.example/software-design/solid', '//other.example/', 'javascript:alert(1)', '/preferences', '/preferences/', '/#preferences', '/#preferences/', '/unknown', '/404', '/404.html', '/#404', '/#404.html', 'https://user@interview.example/']) {
    assert.equal(safePreferencesReturn(route, origin, routes), null);
  }
});
