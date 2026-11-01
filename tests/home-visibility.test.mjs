import assert from 'node:assert/strict';
import test from 'node:test';
import { initializeCareerPaths } from '../src/features/home/scripts/home.ts';
import { preferenceKeys, setStorageConsent, writePreference, writeSessionPreference } from '../src/shared/lib/preferences.ts';

class ElementFixture {
  constructor(dataset = {}, attributes = {}) {
    this.dataset = dataset;
    this.attributes = new Map(Object.entries(attributes));
    this.hidden = false;
    this.listeners = new Map();
    this.collections = new Map();
    this.elements = new Map();
  }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  setAttribute(name, value) { this.attributes.set(name, value); }
  addEventListener(name, listener) { this.listeners.set(name, listener); }
  click() { this.listeners.get('click')?.(); }
  querySelectorAll(selector) { return this.collections.get(selector) ?? []; }
  querySelector(selector) { return this.elements.get(selector) ?? null; }
  closest() { return null; }
  matches() { return false; }
}

function withHome(storedStage, run, storedSession) {
  const original = new Map(['document', 'HTMLElement', 'HTMLHRElement', 'localStorage', 'sessionStorage'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const values = new Map(storedStage === null ? [] : [[preferenceKeys.careerStage, storedStage]]);
  const session = new Map(storedSession ? [[preferenceKeys.careerStage, JSON.stringify(storedSession)]] : []);
  const storage = entries => ({ getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value), removeItem: key => entries.delete(key) });
  const container = new ElementFixture();
  const panelContainer = new ElementFixture();
  panelContainer.hidden = true;
  const directions = [new ElementFixture({ careerDirection: 'software' })];
  const profiles = [new ElementFixture({ careerProfile: 'frontend', profileDirection: 'software' }, { 'aria-pressed': 'true', 'aria-label': 'Frontend Engineer' })];
  const stages = ['foundation', 'junior', 'mid', 'senior'].map(id => new ElementFixture({ careerStage: id }, { 'aria-pressed': 'false' }));
  const panels = stages.map(stage => {
    const panel = new ElementFixture({ careerPanel: 'frontend', stage: stage.dataset.careerStage });
    panel.hidden = true;
    return panel;
  });
  container.collections.set('[data-career-direction]', directions);
  container.collections.set('[data-career-profile]', profiles);
  container.collections.set('[data-career-stage]', stages);
  container.collections.set('[data-career-panel]', panels);
  const document = {
    getElementById: id => ({ 'career-paths': container, 'career-panels': panelContainer })[id] ?? null,
    querySelectorAll: () => [],
  };
  try {
    for (const [key, value] of Object.entries({ document, HTMLElement: ElementFixture, HTMLHRElement: class {}, localStorage: storage(values), sessionStorage: storage(session) })) {
      Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
    }
    setStorageConsent('accepted', true);
    writePreference(preferenceKeys.careerStage, storedStage ?? 'null');
    writeSessionPreference(preferenceKeys.careerStage, JSON.stringify(storedSession ?? null));
    const update = initializeCareerPaths();
    update();
    run({ update, stages, panels, panelContainer, values });
  } finally {
    for (const [key, descriptor] of original) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
}

test('Home keeps the roadmap closed until a valid stage is selected even with a remembered route', () => {
  const previousSession = { directionId: 'software', profileId: 'frontend', view: { directionId: 'software', profileId: 'frontend', stageId: 'mid' } };
  for (const stored of [null, 'null', '{broken', '"removed"', '{}']) {
    withHome(stored, ({ stages, panels, panelContainer }) => {
      assert.equal(panelContainer.hidden, true, String(stored));
      assert.ok(panels.every(panel => panel.hidden), String(stored));
      assert.ok(stages.every(stage => stage.getAttribute('aria-pressed') === 'false'), String(stored));
    }, previousSession);
  }
});

test('selecting a stage opens its roadmap and deselecting closes it through subsequent refreshes', () => {
  withHome(null, ({ update, stages, panels, panelContainer, values }) => {
    const junior = stages.find(stage => stage.dataset.careerStage === 'junior');
    junior.click();
    assert.equal(panelContainer.hidden, false);
    assert.deepEqual(panels.filter(panel => !panel.hidden).map(panel => panel.dataset.stage), ['junior']);
    assert.equal(junior.getAttribute('aria-pressed'), 'true');
    assert.equal(values.get(preferenceKeys.careerStage), '"junior"');
    junior.click();
    assert.equal(panelContainer.hidden, true);
    assert.ok(panels.every(panel => panel.hidden));
    assert.equal(junior.getAttribute('aria-pressed'), 'false');
    assert.equal(values.get(preferenceKeys.careerStage), 'null');
    update();
    assert.equal(panelContainer.hidden, true);
    assert.ok(panels.every(panel => panel.hidden));
    stages.find(stage => stage.dataset.careerStage === 'senior').click();
    assert.equal(panelContainer.hidden, false);
    assert.deepEqual(panels.filter(panel => !panel.hidden).map(panel => panel.dataset.stage), ['senior']);
  });
});

test('a saved stage restores its matching roadmap instead of the last consulted stage', () => {
  const previousSession = { directionId: 'software', profileId: 'frontend', view: { directionId: 'software', profileId: 'frontend', stageId: 'mid' } };
  withHome('"junior"', ({ stages, panels, panelContainer }) => {
    assert.equal(panelContainer.hidden, false);
    assert.deepEqual(panels.filter(panel => !panel.hidden).map(panel => panel.dataset.stage), ['junior']);
    assert.deepEqual(stages.filter(stage => stage.getAttribute('aria-pressed') === 'true').map(stage => stage.dataset.careerStage), ['junior']);
  }, previousSession);
});
