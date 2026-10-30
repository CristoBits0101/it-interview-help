import assert from 'node:assert/strict';
import test from 'node:test';
import { retainCareerView, restoreCareerView } from '../src/features/home/lib/career-view.ts';
import { restoreCareerSelectionState } from '../src/features/home/lib/career-selection.ts';

const directions = [{ id: 'software', profileIds: ['frontend', 'backend'] }, { id: 'data', profileIds: ['data-engineer'] }];
const profileIds = ['frontend', 'backend', 'data-engineer'];
const stages = new Set(['foundation', 'junior', 'mid', 'senior']);
const previous = { directionId: 'software', profileId: 'backend', stageId: 'mid' };

test('deselecting a stage or its parents retains the last consulted route in session', () => {
  for (const selection of [
    { directionId: 'software', profileId: 'backend' },
    { directionId: 'software', profileId: null },
    { directionId: null, profileId: null },
  ]) assert.deepEqual(retainCareerView(directions, profileIds, previous, selection, null), previous);
});

test('new choices update the consulted route while retaining a compatible stage', () => {
  assert.deepEqual(retainCareerView(directions, profileIds, previous, { directionId: 'software', profileId: 'frontend' }, null), { ...previous, profileId: 'frontend' });
  assert.deepEqual(retainCareerView(directions, profileIds, previous, { directionId: 'data', profileId: 'data-engineer' }, null), { directionId: 'data', profileId: 'data-engineer', stageId: 'mid' });
  assert.deepEqual(retainCareerView(directions, profileIds, previous, { directionId: 'software', profileId: 'backend' }, 'senior'), { ...previous, stageId: 'senior' });
});

test('session restoration keeps the consulted route separate from deselected controls', () => {
  const saved = { directionId: null, profileId: null, view: previous };
  assert.deepEqual(restoreCareerSelectionState(directions, profileIds, saved, previous), { directionId: null, profileId: null });
  assert.deepEqual(restoreCareerView(directions, profileIds, stages, saved, { ...previous, stageId: 'foundation' }), previous);
  for (const value of [undefined, null, [], {}, { view: [] }, { view: { ...previous, profileId: 'data-engineer' } }, { view: { ...previous, stageId: 'removed' } }, { view: { ...previous, directionId: 'removed' } }]) {
    assert.deepEqual(restoreCareerView(directions, profileIds, stages, value, previous), previous);
  }
});
