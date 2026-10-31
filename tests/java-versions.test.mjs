import test from 'node:test';
import assert from 'node:assert/strict';
import { javaFeatures, javaReleases, javaExamples } from '../src/features/software-engineering/software-development/programming-languages/java/language-overview/version-history/data/java-versions.ts';
import { javaSummary } from '../src/features/software-engineering/software-development/programming-languages/java/language-overview/version-history/data/java-summary.ts';
import { javaFeatureState, javaFeatureChange, javaFeatureMilestone } from '../src/features/software-engineering/software-development/programming-languages/java/language-overview/version-history/lib/java-release-state.ts';

const feature = id => javaFeatures.find(item => item.id === id);

test('visual summary covers the requested historical releases through Java 26', () => {
  assert.equal(javaSummary.length, 27);
  assert.deepEqual(javaSummary.slice(0, 5).map(item => item.version), ['1.0', '1.1', '1.2', '1.3', '1.4']);
  assert.equal(javaSummary.at(-1).number, 26);
  assert.equal(javaSummary.find(item => item.number === 24).year, 2025);
  for (const release of javaSummary) {
    assert(release.highlights.length > 0 && release.highlights.length <= 5);
    for (const item of release.highlights) assert(item.title.es && item.title.en && new URL(item.source).protocol === 'https:');
  }
  assert(!javaSummary.find(item => item.number === 17).highlights.some(item => item.title.en === 'Records'));
  assert.equal(javaSummary.find(item => item.number === 25).highlights.find(item => item.title.en === 'Primitive types in patterns').status.en, 'Preview 3');
});

test('release cards show own milestones rather than inherited features', () => {
  assert.equal(javaFeatureMilestone(feature('records'), 14), 'added');
  assert.equal(javaFeatureMilestone(feature('records'), 15), 'preview');
  assert.equal(javaFeatureMilestone(feature('records'), 16), 'finalized');
  assert.equal(javaFeatureMilestone(feature('records'), 17), null);
  assert.equal(javaFeatureMilestone(feature('string-templates'), 23), 'removed');
});

test('Java milestones distinguish introduction, finalization and inherited availability', () => {
  assert.equal(javaFeatureState(feature('records'), 14), 'preview');
  assert.equal(javaFeatureState(feature('records'), 16), 'final');
  assert.equal(javaFeatureChange(feature('records'), 17, 21), null);
  assert.equal(javaFeatureChange(feature('switch-patterns'), 17, 21), 'finalized');
  assert.equal(javaFeatureChange(feature('virtual-threads'), 17, 21), 'added');
  assert.equal(javaFeatureState(feature('text-blocks'), 14), 'preview');
  assert.equal(javaFeatureState(feature('text-blocks'), 15), 'final');
});

test('experimental, incubator and withdrawn features are not cumulative stable features', () => {
  assert.equal(javaFeatureState(feature('http-client'), 10), 'incubator');
  assert.equal(javaFeatureState(feature('zgc'), 11), 'experimental');
  assert.equal(javaFeatureState(feature('string-templates'), 21), 'preview');
  assert.equal(javaFeatureState(feature('string-templates'), 23), 'unavailable');
  assert.equal(javaFeatureChange(feature('string-templates'), 21, 25), 'removed');
  assert.equal(javaFeatureChange(feature('records'), 21, 17), null);
});

test('Java learning records have bilingual text, official sources and consistent timelines', () => {
  assert.equal(new Set(javaFeatures.map(item => item.id)).size, javaFeatures.length);
  assert.equal(new Set(javaReleases.map(item => item.number)).size, javaReleases.length);
  assert.equal(javaReleases.at(-1).number, 27);
  for (const item of [...javaFeatures, ...javaReleases]) {
    const source = new URL(item.source);
    assert.equal(source.protocol, 'https:');
    assert(['docs.oracle.com', 'www.oracle.com', 'openjdk.org', 'inside.java', 'dev.java', 'ops.java'].includes(source.hostname));
    const text = 'description' in item ? item.description : item.summary;
    assert(text.es.trim() && text.en.trim());
    if ('stable' in item) assert(item.stable >= item.introduced);
    if ('removed' in item) assert(item.removed > item.introduced);
  }
  for (const example of javaExamples) assert(example.before && example.after && example.explanation.es && example.explanation.en);
});
