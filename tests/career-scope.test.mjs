import assert from 'node:assert/strict';
import test from 'node:test';
import { toggleCareerScope, reconcileCareerScope } from '../src/lib/career-scope.ts';
import { careerGrowthGroups, careerGrowthTargets } from '../src/data/career-growth.ts';
import { careerProfiles, careerStages } from '../src/data/career-paths.ts';
import { translate } from '../src/lib/translations.ts';

test('a career stage and growth target replace each other rather than combining', () => {
  const choices = [
    ...careerStages.map(stage => ({ kind: 'stage', id: stage.id })),
    ...careerGrowthTargets.map(target => ({ kind: 'growth', id: target.id })),
  ];
  for (const previous of choices) {
    for (const next of choices) {
      assert.deepEqual(toggleCareerScope(previous, next), previous.kind === next.kind && previous.id === next.id ? null : next);
    }
    assert.deepEqual(toggleCareerScope(null, previous), previous);
  }
});

test('changing role retains only compatible growth goals and preserves ordinary stages', () => {
  for (const profile of careerProfiles) {
    for (const target of careerGrowthTargets) {
      const scope = { kind: 'growth', id: target.id };
      assert.deepEqual(reconcileCareerScope(scope, profile.id, careerGrowthTargets), target.profileIds.includes(profile.id) ? scope : null);
    }
    for (const stage of careerStages) {
      const scope = { kind: 'stage', id: stage.id };
      assert.deepEqual(reconcileCareerScope(scope, profile.id, careerGrowthTargets), scope);
    }
  }
  assert.equal(reconcileCareerScope({ kind: 'growth', id: 'unknown' }, 'frontend', careerGrowthTargets), null);
  assert.equal(reconcileCareerScope(null, 'frontend', careerGrowthTargets), null);
});

test('growth choices have bilingual preparation and explicit role compatibility', () => {
  const profileIds = new Set(careerProfiles.map(profile => profile.id));
  const groupIds = new Set(careerGrowthGroups.map(group => group.id));
  assert.deepEqual(careerGrowthGroups.map(group => group.id), ['specialization', 'leadership', 'management', 'executive']);
  assert.equal(new Set(careerGrowthTargets.map(target => target.id)).size, careerGrowthTargets.length);
  for (const target of careerGrowthTargets) {
    assert(groupIds.has(target.group));
    assert(target.profileIds.length > 0);
    assert.equal(new Set(target.profileIds).size, target.profileIds.length);
    target.profileIds.forEach(id => assert(profileIds.has(id), id));
    for (const text of [target.label, target.goal, target.practice]) {
      assert.notEqual(translate(text, 'es'), translate(text, 'en'), text);
      assert.equal(translate(translate(text, 'en'), 'es'), translate(text, 'es'));
    }
  }
  for (const group of careerGrowthGroups) {
    assert.notEqual(translate(group.title, 'en'), group.title);
    assert.notEqual(translate(group.question, 'en'), group.question);
  }
  for (const profile of careerProfiles) {
    assert(careerGrowthTargets.some(target => target.profileIds.includes(profile.id)), profile.id);
    assert.deepEqual(profile.stages.map(stage => stage.id), ['foundation', 'junior', 'mid', 'senior']);
  }
  for (const id of ['systems-analyst', 'software-architect']) assert(careerGrowthTargets.find(target => target.id === id)?.profileIds.includes('frontend'));
  assert(!careerGrowthTargets.find(target => target.id === 'staff-engineer').profileIds.includes('ux-designer'));
  assert(!careerGrowthTargets.find(target => target.id === 'cto').profileIds.includes('business-analyst'));
  for (const profileId of ['it-support-specialist', 'systems-administrator', 'network-engineer', 'penetration-tester', 'soc-analyst', 'data-analyst', 'business-analyst']) {
    for (const targetId of ['staff-engineer', 'principal-engineer', 'technical-lead', 'engineering-manager', 'engineering-director', 'engineering-vp', 'cto']) {
      assert(!careerGrowthTargets.find(target => target.id === targetId).profileIds.includes(profileId), `${profileId} must not receive ${targetId}`);
    }
  }
  assert(careerGrowthTargets.find(target => target.id === 'infrastructure-architect').profileIds.includes('it-support-specialist'));
  assert(careerGrowthTargets.find(target => target.id === 'security-architect').profileIds.includes('soc-analyst'));
  assert(careerGrowthTargets.find(target => target.id === 'it-service-manager').profileIds.includes('it-support-specialist'));
  assert(careerGrowthTargets.find(target => target.id === 'network-operations-manager').profileIds.includes('network-engineer'));
  assert(careerGrowthTargets.find(target => target.id === 'security-operations-manager').profileIds.includes('soc-analyst'));
  assert(careerGrowthTargets.find(target => target.id === 'principal-data-analyst').profileIds.includes('data-analyst'));
  assert(careerGrowthTargets.find(target => target.id === 'chief-data-officer').profileIds.includes('data-analyst'));
  assert(careerGrowthTargets.find(target => target.id === 'chief-information-security-officer').profileIds.includes('soc-analyst'));
  assert.deepEqual(careerGrowthTargets.filter(target => target.group === 'executive').map(target => target.id), ['engineering-director', 'engineering-vp', 'cto', 'chief-data-officer', 'chief-information-security-officer']);
});
