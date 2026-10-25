import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveCareerSelection } from '../src/lib/career-selection.ts';
import { careerDirections } from '../src/data/career-directions.ts';
import { careerProfiles } from '../src/data/career-paths.ts';
import { navigation } from '../src/data/navigation.ts';
import { translate } from '../src/lib/translations.ts';

const profileIds = careerProfiles.map(profile => profile.id);

test('every role belongs to one nonempty professional area without publishing new concepts', () => {
  assert.equal(careerDirections.length, 6);
  assert.deepEqual(careerDirections.map(direction => direction.label), navigation.map(node => node.label));
  assert.equal(new Set(careerDirections.map(direction => direction.id)).size, careerDirections.length);
  assert.deepEqual(careerDirections.find(direction => direction.id === 'infrastructure-platforms')?.profileIds, ['systems-administrator', 'it-support-specialist', 'network-engineer', 'cloud-engineer', 'devops', 'site-reliability-engineer', 'platform-engineer']);
  assert.deepEqual(careerDirections.find(direction => direction.id === 'cybersecurity')?.profileIds, ['security-engineer', 'security-analyst', 'soc-analyst', 'grc-analyst', 'application-security-engineer', 'cloud-security-engineer', 'penetration-tester', 'detection-engineer']);
  assert.deepEqual(careerDirections.find(direction => direction.id === 'ux-design')?.profileIds, ['product-designer', 'ux-designer', 'ui-designer', 'ux-researcher', 'ux-ui-designer']);
  assert.deepEqual(careerDirections.find(direction => direction.id === 'data-engineering')?.profileIds, ['data-engineer', 'data-analyst', 'business-intelligence-developer', 'data-scientist', 'analytics-engineer']);
  assert.deepEqual(careerDirections.find(direction => direction.id === 'data-ai')?.profileIds, ['machine-learning-engineer', 'mlops-engineer', 'artificial-intelligence']);
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
