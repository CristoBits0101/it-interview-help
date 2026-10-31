import assert from 'node:assert/strict';
import test from 'node:test';
import { careerGrowthTargets, careerGrowthGroups } from '../src/features/home/data/career-growth.ts';
import { careerGrowthResources } from '../src/features/home/data/career-growth-resources.ts';
import { careerProfiles } from '../src/features/home/data/career-paths.ts';
import { initializeCareerGrowth } from '../src/features/home/scripts/career-growth.ts';

test('every compatible growth destination has a specific safe external resource', () => {
  assert.deepEqual(Object.keys(careerGrowthResources).sort(), careerGrowthTargets.map(target => target.id).sort());
  for (const resource of Object.values(careerGrowthResources)) {
    const url = new URL(resource.url);
    assert.equal(url.protocol, 'https:');
    assert.equal(url.username + url.password, '');
    assert(url.pathname.length > 1);
    assert(resource.publisher.trim());
    assert.equal(resource.language, 'en');
  }
  for (const profile of careerProfiles) {
    const options = careerGrowthTargets.filter(target => target.profileIds.includes(profile.id));
    assert(options.length, profile.id);
    assert(options.every(target => careerGrowthResources[target.id]), profile.id);
  }
  for (const [id, path] of [
    ['it-service-manager', '/it-service-manager/'],
    ['data-science-manager', '/data-scientist/'],
    ['head-content-design', '/content-designer/'],
    ['chief-information-security-officer', '/chief-information-security-officer/'],
  ]) assert(new URL(careerGrowthResources[id].url).pathname.endsWith(path));
});

test('external growth links retain profile filtering without intercepting navigation or stage selection', () => {
  const previousDocument = globalThis.document;
  const items = careerGrowthTargets.map(target => ({ target, hidden: true }));
  const links = items.map(item => ({
    dataset: { careerGrowth: item.target.id, growthProfiles: item.target.profileIds.join(' ') },
    closest: () => item,
    addEventListener: () => assert.fail('External links must use native navigation'),
  }));
  const groups = careerGrowthGroups.map(group => ({
    id: group.id,
    hidden: false,
    querySelectorAll: () => items.filter(item => item.target.group === group.id),
  }));
  const container = { querySelectorAll: selector => selector === '[data-career-growth]' ? links : groups };
  globalThis.document = { getElementById: id => id === 'career-growth' ? container : assert.fail(`Unexpected state access: ${id}`) };
  try {
    const growth = initializeCareerGrowth();
    for (const profile of careerProfiles) {
      growth.update(profile.id);
      for (const item of items) assert.equal(item.hidden, !item.target.profileIds.includes(profile.id));
      for (const group of groups) assert.equal(group.hidden, !items.some(item => item.target.group === group.id && !item.hidden));
    }
  } finally {
    globalThis.document = previousDocument;
  }
});
