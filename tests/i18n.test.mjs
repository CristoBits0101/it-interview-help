import assert from 'node:assert/strict';
import test from 'node:test';
import { defaultLanguage, t, translate, translatePatternTitle, stageAreaCount, availableConceptCount } from '../src/shared/lib/translations.ts';
import { getSavedLanguage, saveLanguage, applyStaticTranslations } from '../src/shared/scripts/i18n.ts';
import { publishedTracks } from '../src/app/data/published-catalog.ts';
import { preferenceKeys } from '../src/shared/lib/preferences.ts';
import { careerProfiles } from '../src/features/home/data/career-paths.ts';

test('English is the deterministic default and persisted manual choices take precedence', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const writes = [];
  try {
    for (const [stored, expected] of [[null, 'en'], ['en', 'en'], ['es', 'es'], ['fr', 'en'], ['', 'en']]) {
      Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
        getItem: key => { assert.equal(key, preferenceKeys.language); return stored; },
        setItem: (key, value) => writes.push([key, value]),
      }});
      assert.equal(getSavedLanguage(), expected);
    }
    saveLanguage('es');
    saveLanguage('en');
    assert.deepEqual(writes, [[preferenceKeys.language, 'es'], [preferenceKeys.language, 'en']]);
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('Storage blocked'); }});
    assert.equal(getSavedLanguage(), 'en');
    assert.doesNotThrow(() => saveLanguage('es'));
    assert.equal(defaultLanguage, 'en');
  } finally {
    if (original) Object.defineProperty(globalThis, 'localStorage', original);
    else delete globalThis.localStorage;
  }
});

test('published explanations retain their approved Spanish through English rendering', () => {
  for (const track of publishedTracks) for (const module of track.modules) for (const concept of module.concepts) {
    const english = t(concept.description);
    assert.notEqual(english, concept.description, concept.id);
    assert.equal(translate(english, 'es'), concept.description, concept.id);
  }
  assert.equal(t('Envuelve un objeto con otro para añadirle funcionalidades sin tener que tocar su clase.'), 'Wraps an object with another to add functionality without having to change its class.');
  assert.equal(translatePatternTitle('Prototype', 'es'), 'Prototipo');
  assert.equal(translatePatternTitle('Prototype', 'en'), 'Prototype');
  assert.equal(stageAreaCount(1, 'en'), '1 area at this stage');
  assert.equal(stageAreaCount(2, 'es'), '2 áreas en esta etapa');
  assert.equal(availableConceptCount(1, 'en'), '1 concept available');
});

test('professional role labels remain canonical Spanish and alternate without inversion', () => {
  const expected = {
    'data-analyst': ['Analista de datos', 'Data Analyst'],
    'systems-administrator': ['Administrador de sistemas', 'Systems Administrator'],
    'it-support-specialist': ['Especialista de soporte TI', 'IT Support Specialist'],
    'network-engineer': ['Ingeniero de redes', 'Network Engineer'],
    'cloud-engineer': ['Ingeniero de nube', 'Cloud Engineer'],
    'site-reliability-engineer': ['Ingeniero de fiabilidad de sitios', 'Site Reliability Engineer'],
    'platform-engineer': ['Ingeniero de plataforma', 'Platform Engineer'],
    'penetration-tester': ['Especialista en pruebas de penetración', 'Penetration Tester'],
    'soc-analyst': ['Analista SOC', 'SOC Analyst'],
    'detection-engineer': ['Ingeniero de detección', 'Detection Engineer'],
    'machine-learning-engineer': ['Ingeniero de aprendizaje automático', 'Machine Learning Engineer'],
    'mlops-engineer': ['Ingeniero MLOps', 'MLOps Engineer'],
    'artificial-intelligence': ['Ingeniero de IA', 'AI Engineer'],
  };
  for (const [id, [spanish, english]] of Object.entries(expected)) {
    const profile = careerProfiles.find(candidate => candidate.id === id);
    assert.equal(profile?.label, spanish);
    for (const language of ['en', 'es', 'en', 'es']) {
      assert.equal(translate(profile.label, language), language === 'en' ? english : spanish);
    }
    assert.equal(translate(english, 'es'), spanish);
  }
});

class ElementFixture {
  constructor(text = '', attributes = {}, dataset = {}) {
    this.attributes = new Map(Object.entries(attributes));
    this.dataset = dataset;
    this.tagName = 'SPAN';
    this.lang = attributes.lang ?? '';
    this.classList = { contains: () => false };
    this.text = { data: text, parentElement: this };
  }
  get textContent() { return this.text.data; }
  set textContent(value) { this.text.data = value; }
  get title() { return this.getAttribute('title'); }
  set title(value) { this.setAttribute('title', value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  setAttribute(name, value) { this.attributes.set(name, value); }
  closest(selector) {
    if (this.getAttribute('translate') === 'no' && selector.includes('[translate="no"]')) return this;
    if (this.dataset.i18nEs !== undefined && selector.includes('[data-i18n-es]')) return this;
    return null;
  }
}

test('DOM localization preserves canonical titles, bilingual guide text and accessible language action', () => {
  const originalDocument = globalThis.document;
  const originalFilter = globalThis.NodeFilter;
  const heading = new ElementFixture('Choose your Direction');
  const concept = new ElementFixture('NLU', {}, { i18nSource: 'Comprensión del Lenguaje Natural' });
  const code = new ElementFixture('System.out.println("Server");', { translate: 'no' });
  const guide = new ElementFixture('Create the object', {}, { i18nEs: 'Crea el objeto', i18nEn: 'Create the object' });
  const stepButton = new ElementFixture('1', { title: 'Create the object' }, { i18nEs: 'Crea el objeto', i18nEn: 'Create the object', i18nAttribute: 'title' });
  const toggle = new ElementFixture('English', { translate: 'no', lang: 'en', 'aria-label': 'Switch to Spanish' });
  const root = { lang: 'en' };
  const nodes = [heading, concept, code, guide, stepButton, toggle].map(element => element.text);
  globalThis.NodeFilter = { SHOW_TEXT: 4 };
  globalThis.document = {
    documentElement: root,
    body: {},
    createTreeWalker() { let position = 0; return { nextNode: () => nodes[position++] ?? null }; },
    querySelector: selector => selector === '#language-toggle' ? toggle : null,
    querySelectorAll(selector) {
      if (selector === '[lang]') return [toggle];
      if (selector === '[aria-label], [title], [placeholder], meta[content]') return [stepButton, toggle];
      if (selector === '[data-i18n-es][data-i18n-en]') return [guide, stepButton];
      return [];
    },
  };
  try {
    for (const language of ['es', 'en', 'es', 'en']) {
      applyStaticTranslations(language);
      assert.equal(root.lang, language);
      assert.equal(heading.textContent, language === 'es' ? 'Elige tu Dirección' : 'Choose your Direction');
      assert.equal(concept.textContent, translate('Comprensión del Lenguaje Natural', language));
      assert.equal(guide.textContent, language === 'es' ? 'Crea el objeto' : 'Create the object');
      assert.equal(stepButton.title, guide.textContent);
      assert.equal(stepButton.textContent, '1');
      assert.equal(toggle.textContent, language === 'es' ? 'Español' : 'English');
      assert.equal(toggle.getAttribute('aria-label'), language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish');
      assert.equal(code.textContent, 'System.out.println("Server");');
    }
  } finally {
    globalThis.document = originalDocument;
    globalThis.NodeFilter = originalFilter;
  }
});
