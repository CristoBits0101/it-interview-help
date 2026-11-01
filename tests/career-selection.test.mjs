import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveCareerSelection, restoreCareerSelectionState, toggleCareerSelection } from '../src/features/home/lib/career-selection.ts';
import { careerDirections } from '../src/features/home/data/career-directions.ts';
import { careerProfiles } from '../src/features/home/data/career-paths.ts';
import { navigation } from '../src/app/data/navigation.ts';
import { translate } from '../src/shared/lib/translations.ts';

const profileIds = careerProfiles.map(profile => profile.id);

test('every role belongs to one nonempty professional area without publishing new concepts', () => {
  assert.equal(careerDirections.length, 6);
  assert.deepEqual(careerDirections.map(direction => direction.label), navigation.map(node => node.label));
  assert.equal(new Set(careerDirections.map(direction => direction.id)).size, careerDirections.length);
  assert.deepEqual(new Set(careerDirections.flatMap(direction => direction.profileIds)), new Set(profileIds));
  assert.equal(careerDirections.flatMap(direction => direction.profileIds).length, profileIds.length);
  for (const direction of careerDirections) {
    assert(direction.profileIds.length > 0);
    assert.notEqual(translate(direction.label, 'es'), direction.label);
  }
});

test('switching professional areas preserves compatible roles and otherwise selects a valid first role', () => {
  for (const direction of careerDirections) {
    for (const profileId of profileIds) {
      const result = resolveCareerSelection(careerDirections, profileIds, { directionId: direction.id, profileId });
      assert.equal(result.directionId, direction.id);
      assert.equal(result.profileId, direction.profileIds.includes(profileId) ? profileId : direction.profileIds[0]);
    }
  }
});

test('legacy role identities restore their area and invalid selections recover without empty panels', () => {
  for (const profileId of ['frontend', 'backend', 'full-stack', 'devops', 'artificial-intelligence']) {
    const result = resolveCareerSelection(careerDirections, profileIds, { profileId });
    assert.equal(result.profileId, profileId);
    assert(careerDirections.find(direction => direction.id === result.directionId).profileIds.includes(profileId));
  }
  const fallback = resolveCareerSelection(careerDirections, profileIds, { directionId: 'removed', profileId: 'removed' });
  assert.equal(fallback.profileId, careerDirections[0].profileIds[0]);
  assert.equal(resolveCareerSelection(careerDirections, []), null);
  assert.deepEqual(resolveCareerSelection([{ id: 'empty', profileIds: ['missing'] }, { id: 'valid', profileIds: ['backend'] }], ['backend']), { directionId: 'valid', profileId: 'backend' });
  for (const [directionId, profileId, expectedDirection] of [
    ['data-science', 'data-scientist', 'data-engineering'],
    ['software-quality', 'qa-engineer', 'software-development'],
    ['architecture', 'software-architect', 'software-development'],
    ['product-analysis', 'business-analyst', 'software-development'],
  ]) {
    assert.deepEqual(resolveCareerSelection(careerDirections, profileIds, { directionId, profileId }), { directionId: expectedDirection, profileId });
  }
});

test('all role and stage content remains bilingual with the four shared stage identities', () => {
  for (const profile of careerProfiles) {
    assert.deepEqual(profile.stages.map(stage => stage.id), ['foundation', 'junior', 'mid', 'senior']);
    for (const source of [profile.label, profile.purpose, profile.summary, ...profile.stages.flatMap(stage => [stage.goal, stage.milestone])]) {
      const spanish = translate(source, 'es');
      const english = translate(source, 'en');
      assert.notEqual(spanish, english, source);
      assert.equal(translate(english, 'es'), spanish);
    }
  }
});

test('role exploration introduces shared foundations before integrated specializations', () => {
  const roles = id => careerDirections.find(direction => direction.id === id).profileIds;
  const software = roles('software-development');
  assert(software.indexOf('frontend') < software.indexOf('backend'));
  assert(software.indexOf('backend') < software.indexOf('full-stack'));
  assert(software.indexOf('embedded-software') < software.indexOf('iot-developer'));
  assert.equal(software.at(-1), 'software-architect');
  assert.equal(roles('infrastructure-platforms')[0], 'it-support-specialist');
  assert.equal(roles('cybersecurity')[0], 'soc-analyst');
  assert.equal(roles('data-engineering')[0], 'data-analyst');
  for (const id of ['research-engineer', 'research-scientist']) {
    assert(roles('data-ai').includes(id));
    const foundation = careerProfiles.find(profile => profile.id === id).stages[0];
    assert.equal(foundation.id, 'foundation');
    assert(foundation.areas.includes('Programming Fundamentals'));
  }
  assert.equal(translate(careerProfiles.find(profile => profile.id === 'ux-ui-designer').label, 'en'), 'Interaction Designer');
});

test('area and role selections clear their dependents without immediately restoring a default', () => {
  for (const direction of careerDirections) {
    const initial = resolveCareerSelection(careerDirections, profileIds, { directionId: direction.id });
    const clearedRole = toggleCareerSelection(careerDirections, profileIds, initial, { kind: 'profile', id: initial.profileId });
    assert.deepEqual(clearedRole, { directionId: direction.id, profileId: null });
    assert.deepEqual(toggleCareerSelection(careerDirections, profileIds, clearedRole, { kind: 'profile', id: initial.profileId }), initial);
    const clearedArea = toggleCareerSelection(careerDirections, profileIds, initial, { kind: 'direction', id: direction.id });
    assert.deepEqual(clearedArea, { directionId: null, profileId: null });
    assert.deepEqual(toggleCareerSelection(careerDirections, profileIds, clearedArea, { kind: 'direction', id: direction.id }), initial);
    assert.deepEqual(toggleCareerSelection(careerDirections, profileIds, clearedArea, { kind: 'profile', id: initial.profileId }), clearedArea);
    const other = careerDirections.find(item => item.id !== direction.id);
    assert.deepEqual(toggleCareerSelection(careerDirections, profileIds, clearedRole, { kind: 'profile', id: other.profileIds[0] }), clearedRole);
    assert.deepEqual(toggleCareerSelection(careerDirections, profileIds, initial, { kind: 'direction', id: other.id }), { directionId: other.id, profileId: other.profileIds[0] });
  }
});

test('session restoration distinguishes absent selections from explicit empty and invalid hierarchies', () => {
  const fallback = resolveCareerSelection(careerDirections, profileIds);
  const restore = value => restoreCareerSelectionState(careerDirections, profileIds, value, fallback);
  assert.deepEqual(restore(undefined), fallback);
  assert.deepEqual(restore({ directionId: null, profileId: null }), { directionId: null, profileId: null });
  assert.deepEqual(restore({ directionId: fallback.directionId, profileId: null }), { directionId: fallback.directionId, profileId: null });
  assert.deepEqual(restore({ directionId: null, profileId: fallback.profileId }), { directionId: null, profileId: null });
  const other = careerDirections.find(direction => direction.id !== fallback.directionId);
  assert.deepEqual(restore({ directionId: fallback.directionId, profileId: other.profileIds[0] }), { directionId: fallback.directionId, profileId: null });
  assert.deepEqual(restore({ directionId: 'removed', profileId: fallback.profileId }), { directionId: null, profileId: null });
});
