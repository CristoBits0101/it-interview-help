import assert from 'node:assert/strict';
import test from 'node:test';
import { preferenceKeys, createPreferenceStore, storageConsentKey, parseStoredJson, restoreKnownIds, restoreLearnedIds, restoreCareerStage } from '../src/shared/lib/preferences.ts';
import { migrateBranchId } from '../src/app/data/navigation-migrations.ts';
import { navigation } from '../src/app/data/navigation.ts';

test('existing preferences keep their persistent keys', () => {
  assert.deepEqual(preferenceKeys, {
    progress: 'tech-training:v1',
    navigation: 'tech-training:navigation:v1',
    language: 'tech-training:language:v1',
    careerStage: 'tech-training:career-stage:v1',
  });
});

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
}

test('missing or invalid consent only reads the legacy language and never writes preferences', () => {
  for (const decision of [undefined, 'true', 'false', '{}', 'invalid']) {
    const local = memoryStorage({ [preferenceKeys.language]: 'es', ...(decision ? { [storageConsentKey]: decision } : {}) });
    const reads = [];
    const store = createPreferenceStore(() => ({ ...local, getItem(key) { reads.push(key); return local.getItem(key); } }), () => memoryStorage());
    assert.equal(store.getConsent(), null);
    assert.equal(store.read(preferenceKeys.language), 'es');
    assert.equal(store.read(preferenceKeys.progress), null);
    assert.equal(store.write(preferenceKeys.language, 'en'), true);
    assert.equal(store.read(preferenceKeys.language), 'en');
    assert(reads.length > 0 && reads.every(key => key === storageConsentKey || key === preferenceKeys.language));
    assert.equal(local.getItem(preferenceKeys.language), 'es');
  }
});

test('initial acceptance restores legacy values only after the explicit decision', () => {
  const local = memoryStorage({ [preferenceKeys.language]: 'es' });
  const session = memoryStorage();
  const store = createPreferenceStore(() => local, () => session);
  assert.equal(store.getConsent(), null);
  assert.equal(store.decide('accepted', true), true);
  assert.equal(store.read(preferenceKeys.language), 'es');
  assert.equal(local.getItem(storageConsentKey), 'accepted');
});

test('rejection and revocation remove only owned data and preserve current memory', () => {
  const local = memoryStorage({ [storageConsentKey]: 'accepted', [preferenceKeys.language]: 'es', 'tech-training:sound:v1': '{}', unrelated: 'keep' });
  const session = memoryStorage({ [preferenceKeys.careerStage]: '{}', 'tech-training:last-route:v1': '"/"', unrelated: 'keep' });
  const store = createPreferenceStore(() => local, () => session);
  assert.equal(store.read(preferenceKeys.language), 'es');
  assert.equal(store.decide('rejected'), true);
  assert.deepEqual([...local.values], [[storageConsentKey, 'rejected'], ['unrelated', 'keep']]);
  assert.deepEqual([...session.values], [['unrelated', 'keep']]);
  assert.equal(store.read(preferenceKeys.language), 'es');
  store.write(preferenceKeys.careerStage, '"senior"');
  store.write(preferenceKeys.careerStage, '{}', true);
  assert.equal(local.getItem(preferenceKeys.careerStage), null);
  assert.equal(session.getItem(preferenceKeys.careerStage), null);
  const nextVisit = createPreferenceStore(() => local, () => session);
  assert.equal(nextVisit.getConsent(), 'rejected');
  assert.equal(nextVisit.read(preferenceKeys.language), null);
  assert.equal(store.decide('accepted'), true);
  assert.equal(local.getItem(preferenceKeys.language), 'es');
  assert.equal(local.getItem(preferenceKeys.careerStage), '"senior"');
});

test('acceptance after using memory saves current state without restoring unread old data', () => {
  const local = memoryStorage({ [preferenceKeys.progress]: '{"learned":["prototype"]}' });
  const store = createPreferenceStore(() => local, () => memoryStorage());
  assert.equal(store.read(preferenceKeys.progress), null);
  store.write(preferenceKeys.language, 'es');
  assert.equal(store.decide('accepted'), true);
  assert.equal(local.getItem(preferenceKeys.progress), null);
  assert.equal(local.getItem(preferenceKeys.language), 'es');
});

test('blocked getters and storage keep the decision and settings in memory', () => {
  const store = createPreferenceStore(() => { throw Error('blocked'); }, () => { throw Error('blocked'); });
  assert.equal(store.getConsent(), null);
  assert.equal(store.decide('accepted', true), false);
  assert.equal(store.write(preferenceKeys.language, 'es'), false);
  assert.equal(store.read(preferenceKeys.language), 'es');
  assert.equal(store.decide('rejected'), false);
  assert.equal(store.getConsent(), 'rejected');
  assert.equal(store.write(preferenceKeys.language, 'en'), true);
});

test('transient quota failures retry the decision and all in-memory changes', () => {
  const local = memoryStorage();
  let blocked = true;
  const store = createPreferenceStore(() => ({ ...local, setItem(key, value) { if (blocked) throw Error('quota'); local.setItem(key, value); } }), () => memoryStorage());
  assert.equal(store.decide('accepted', true), false);
  assert.equal(store.write(preferenceKeys.language, 'es'), false);
  blocked = false;
  assert.equal(store.write(preferenceKeys.careerStage, '"junior"'), true);
  assert.equal(local.getItem(storageConsentKey), 'accepted');
  assert.equal(local.getItem(preferenceKeys.language), 'es');
  assert.equal(local.getItem(preferenceKeys.careerStage), '"junior"');
});

test('corrupt JSON does not prevent later valid writes', () => {
  const local = memoryStorage({ [storageConsentKey]: 'accepted', [preferenceKeys.progress]: '{invalid' });
  const store = createPreferenceStore(() => local, () => memoryStorage());
  assert.equal(parseStoredJson(store.read(preferenceKeys.progress)), undefined);
  store.write(preferenceKeys.progress, '{"learned":["prototype"]}');
  assert.deepEqual(parseStoredJson(local.getItem(preferenceKeys.progress)), { learned: ['prototype'] });
});

test('a decision revoked in another document cannot be overwritten by a stale writer', () => {
  const local = memoryStorage({ [storageConsentKey]: 'accepted' });
  const session = memoryStorage();
  const first = createPreferenceStore(() => local, () => session);
  const second = createPreferenceStore(() => local, () => session);
  first.write(preferenceKeys.language, 'es');
  second.decide('rejected');
  first.write(preferenceKeys.language, 'en');
  assert.equal(first.getConsent(), 'rejected');
  assert.equal(local.getItem(storageConsentKey), 'rejected');
  assert.equal(local.getItem(preferenceKeys.language), null);
});

test('failed deletion keeps old data inaccessible and retries before accepting current state', () => {
  const local = memoryStorage({ [storageConsentKey]: 'accepted', [preferenceKeys.progress]: '{"learned":["prototype"]}' });
  let blocked = true;
  const store = createPreferenceStore(() => ({ ...local, removeItem(key) { if (blocked) throw Error('blocked deletion'); local.removeItem(key); } }), () => memoryStorage());
  assert.equal(store.decide('rejected'), false);
  assert.equal(store.read(preferenceKeys.progress), null);
  assert.equal(store.decide('accepted'), false);
  assert.equal(local.getItem(storageConsentKey), 'rejected');
  blocked = false;
  assert.equal(store.write(preferenceKeys.language, 'en'), true);
  assert.equal(local.getItem(storageConsentKey), 'accepted');
  assert.equal(local.getItem(preferenceKeys.progress), null);
});

test('only current concept IDs survive unknown or corrupt progress shapes', () => {
  const valid = new Set(['solid-s', 'prototype']);
  for (const value of [null, undefined, 'solid-s', 5, [], { learned: 'solid-s' }]) {
    assert.deepEqual(restoreLearnedIds(value, valid), []);
  }
  assert.deepEqual(restoreLearnedIds({ learned: ['solid-s', 2, 'removed', 'solid-s', 'prototype'] }, valid), ['solid-s', 'prototype']);
});

test('saved child branches survive independently of their closed parents and migrate', () => {
  const parent = 'Data/Data%20Science';
  const child = 'Data/Data%20Science/Mathematical%20and%20Statistical%20Foundations';
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

test('data navigation migrations retain nested disclosures without opening their parents', () => {
  const pathId = labels => labels.map(encodeURIComponent).join('/');
  const known = new Set();
  function collect(nodes, parents = []) {
    for (const node of nodes) {
      const path = [...parents, node.id ?? node.label];
      if (node.children) {
        known.add(pathId(path));
        collect(node.children, path);
      }
    }
  }
  collect(navigation);
  const currentChild = pathId(['Data', 'Data Engineering', 'Database Management', 'Databases', 'Non-Relational Databases']);
  const oldChild = pathId(['Data Management and Engineering', 'Data Management', 'Databases', 'Non-Relational Databases']);
  const currentPipeline = pathId(['Data', 'Data Engineering', 'Data Integration', 'Data Pipelines']);
  const oldPipeline = pathId(['Data Management and Engineering', 'Data Engineering', 'Data Pipelines']);
  assert.deepEqual(restoreKnownIds([oldChild, oldPipeline], known, migrateBranchId), [currentChild, currentPipeline]);
  assert.equal(migrateBranchId(pathId(['Data Management', 'Databases', 'Non-Relational Databases'])), currentChild);
  assert.equal(migrateBranchId(pathId(['Data Engineering', 'Data Management', 'Databases', 'Non-Relational Databases'])), currentChild);
  assert.equal(migrateBranchId(pathId(['Data Engineering', 'Data Engineering', 'Data Pipelines'])), currentPipeline);
  assert.equal(migrateBranchId(pathId(['Data Management and Engineering'])), pathId(['Data', 'Data Engineering']));
  const engineering = pathId(['Data', 'Data Engineering']);
  const science = pathId(['Data', 'Data Science']);
  const analytics = pathId(['Data', 'Data Analytics']);
  const restored = restoreKnownIds([
    pathId(['Data Engineering']), pathId(['Data Science']),
    pathId(['Data Engineering', 'Data Integration', 'Data Pipelines']),
    pathId(['Data Science', 'Data Analytics']),
  ], known, migrateBranchId);
  assert.deepEqual(restored, [engineering, science, currentPipeline, analytics]);
  assert.deepEqual(restoreKnownIds([pathId(['Data', 'Data Science', 'Data Analytics'])], known, migrateBranchId), [analytics]);
  assert.equal(restored.includes('Data'), false);
  assert.deepEqual(restoreKnownIds(restored, known, migrateBranchId), restored);
  assert.equal(migrateBranchId(pathId(['Data Management', 'Data Engineering', 'Data Integration', 'Data Pipelines'])), currentPipeline);
  assert.equal(migrateBranchId(pathId(['Data Management', 'Database Management', 'Databases', 'Non-Relational Databases'])), currentChild);
  assert.equal(migrateBranchId(pathId(['Software Development'])), pathId(['Software Engineering', 'Software Development']));
  assert.equal(migrateBranchId(pathId(['Mathematical and Statistical Foundations'])), pathId(['Data', 'Data Science', 'Mathematical and Statistical Foundations']));
  for (const id of known) assert.equal(migrateBranchId(id), id);
});


test('runtime expansion follows Node.js into JavaScript without opening ancestors', () => {
  const old = ['Software Engineering', 'Software Development', 'Runtimes'].map(encodeURIComponent).join('/');
  const current = ['Software Engineering', 'Software Development', 'Programming Languages', 'JavaScript', 'Runtimes'].map(encodeURIComponent).join('/');
  assert.equal(migrateBranchId(old), current);
  assert.equal(migrateBranchId(current), current);
  assert.deepEqual(restoreKnownIds([old], new Set([current]), migrateBranchId), [current]);
});
