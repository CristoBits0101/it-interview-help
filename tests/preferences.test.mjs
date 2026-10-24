import assert from 'node:assert/strict';
import test from 'node:test';
import { preferenceKeys, readPreference, writePreference, parseStoredJson, readJsonPreference, restoreKnownIds, restoreLearnedIds, restoreCareerStage } from '../src/lib/preferences.ts';
import { migrateBranchId } from '../src/data/navigation-migrations.ts';

test('existing preferences keep their persistent keys', () => {
  assert.deepEqual(preferenceKeys, {
    progress: 'tech-training:v1',
    navigation: 'tech-training:navigation:v1',
    language: 'tech-training:language:v1',
    careerStage: 'tech-training:career-stage:v1',
  });
});

test('blocked storage reads and writes do not escape to application startup', () => {
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('quota'); } };
  assert.equal(readPreference('key', blocked), null);
  assert.equal(readJsonPreference('key', blocked), undefined);
  assert.equal(writePreference('key', 'value', blocked), false);
  assert.equal(writePreference('key', 'value', null), false);
});

test('malformed progress can be replaced and recovered on the next visit', () => {
  let saved = '{invalid';
  const storage = { getItem: () => saved, setItem: (_key, value) => { saved = value; } };
  const valid = new Set(['prototype']);
  assert.deepEqual(restoreLearnedIds(readJsonPreference(preferenceKeys.progress, storage), valid), []);
  assert.equal(writePreference(preferenceKeys.progress, JSON.stringify({ learned: ['prototype'] }), storage), true);
  assert.deepEqual(restoreLearnedIds(readJsonPreference(preferenceKeys.progress, storage), valid), ['prototype']);
});

test('storage can recover after a transient write error', () => {
  let unavailable = true;
  const storage = { getItem: () => null, setItem() { if (unavailable) throw new Error('quota'); } };
  assert.equal(writePreference('key', 'value', storage), false);
  unavailable = false;
  assert.equal(writePreference('key', 'value', storage), true);
});

test('only current concept IDs survive unknown or corrupt progress shapes', () => {
  const valid = new Set(['solid-s', 'prototype']);
  for (const value of [null, undefined, 'solid-s', 5, [], { learned: 'solid-s' }]) {
    assert.deepEqual(restoreLearnedIds(value, valid), []);
  }
  assert.deepEqual(restoreLearnedIds({ learned: ['solid-s', 2, 'removed', 'solid-s', 'prototype'] }, valid), ['solid-s', 'prototype']);
});

test('saved child branches survive independently of their closed parents and migrate', () => {
  const parent = 'Data%20Science';
  const child = 'Data%20Science/Mathematical%20and%20Statistical%20Foundations';
  assert.deepEqual(restoreKnownIds(['Mathematics', child, 'removed'], new Set([parent, child]), migrateBranchId), [child]);
});

test('closed stages differ from missing, malformed or unknown stage preferences', () => {
  const valid = new Set(['foundation', 'junior', 'mid', 'senior']);
  for (const raw of [null, '{invalid', '5', '"unknown"', '{}', '[]']) {
    assert.equal(restoreCareerStage(parseStoredJson(raw), valid, 'foundation'), 'foundation');
  }
  assert.equal(restoreCareerStage(parseStoredJson('null'), valid, 'foundation'), null);
  assert.equal(restoreCareerStage(parseStoredJson('"junior"'), valid, 'foundation'), 'junior');
});
