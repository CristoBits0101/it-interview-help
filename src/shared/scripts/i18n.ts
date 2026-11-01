import { preferenceKeys, readPreference, writePreference } from '../lib/preferences';
import { translate, translatePatternTitle, stageAreaCount, sourceDescription, type Language } from '../lib/translations';
export { translate, translatePatternTitle, type Language } from '../lib/translations';

type OriginalValue = { source: string; rendered: string };
const originalText = new WeakMap<Text, OriginalValue>();
const originalAttributes = new WeakMap<Element, Map<string, OriginalValue>>();

export function applyStaticTranslations(language: Language) {
  document.documentElement.lang = language;
  document.querySelectorAll<HTMLElement>('[lang]').forEach(element => {
    if (element.tagName === 'OPTION' || element.closest('[translate="no"]')) return;
    element.lang = element.classList.contains('brand') ? 'en' : language;
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node as Text;
    if (text.parentElement?.closest('script, style, code, pre, option, noscript, [translate="no"], [data-i18n-es]')) continue;
    let original = originalText.get(text);
    if (!original || original.rendered !== text.data) original = { source: text.parentElement?.dataset.i18nSource ?? text.data, rendered: text.data };
    const trimmed = original.source.trim();
    original.rendered = trimmed ? original.source.replace(trimmed, translate(trimmed, language)) : original.source;
    text.data = original.rendered;
    originalText.set(text, original);
  }
  document.querySelectorAll<HTMLElement>('[aria-label], [title], [placeholder], meta[content]').forEach(element => {
    if (element.closest('[translate="no"]')) return;
    const attributes = originalAttributes.get(element) ?? new Map<string, OriginalValue>();
    for (const attribute of ['aria-label', 'title', 'placeholder', 'content']) {
      const value = element.getAttribute(attribute);
      if (value === null) continue;
      let original = attributes.get(attribute);
      if (!original || original.rendered !== value) original = { source: value, rendered: value };
      original.rendered = translate(original.source, language);
      element.setAttribute(attribute, original.rendered);
      attributes.set(attribute, original);
    }
    originalAttributes.set(element, attributes);
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-es][data-i18n-en]').forEach(element => {
    const text = language === 'en' ? element.dataset.i18nEn : element.dataset.i18nEs;
    if (text !== undefined) {
      if (element.dataset.i18nAttribute === 'title') element.title = text;
      else if (element.dataset.i18nAttribute === 'data-navigation-description') element.dataset.navigationDescription = text;
      else element.textContent = text;
    }
  });
  document.querySelectorAll<HTMLElement>('[data-pattern-title]').forEach(title => {
    title.textContent = translatePatternTitle(title.dataset.patternTitle!, language);
    title.lang = language;
  });
  document.querySelectorAll<HTMLElement>('.concept-card, .foundation-guide, .java-ecosystem-card, .comparison-panel, .system-design-topic').forEach(card => {
    const title = card.querySelector('h3');
    const level = card.querySelector<HTMLElement>('.level-badge');
    if (level) level.textContent = translate(card.dataset.level ?? '', language);
    const conceptTitle = card.dataset.guideTitle ? translate(card.dataset.guideTitle, language) : title?.textContent ?? translate(card.dataset.resourceTitle ?? '', language);
    card.querySelector('.card-views')?.setAttribute('aria-label', `${translate('Contenido de', language)} ${conceptTitle}`);
    card.querySelectorAll<HTMLAnchorElement>('.concept-source').forEach(source => {
      const publisher = source.querySelector('.source-publisher')?.textContent ?? '';
      const sourceTitle = source.getAttribute('title') ?? '';
      source.setAttribute('aria-label', sourceDescription(publisher, sourceTitle, conceptTitle, language));
    });
  });
  document.querySelectorAll<HTMLInputElement>('[data-language]').forEach(option => {
    option.checked = option.value === language;
  });
  document.querySelectorAll<HTMLElement>('[data-area-translation]').forEach(element => {
    element.textContent = translate(element.dataset.areaTranslation!, language);
  });
  document.querySelectorAll<HTMLElement>('#sidebar [data-i18n-source]').forEach(element => {
    element.textContent = translate(element.dataset.i18nSource!, language);
  });
  document.querySelectorAll<HTMLElement>('[data-navigation-alphabetical]').forEach(list => {
    const rows = Array.from(list.children);
    rows.sort((a, b) => {
      const label = (row: Element) => row.querySelector<HTMLElement>('.navigation-label')?.textContent ?? '';
      return label(a).localeCompare(label(b), language);
    });
    list.append(...rows);
  });
  document.querySelectorAll<HTMLElement>('[data-stage-area-count]').forEach(element => {
    const count = Number(element.dataset.stageAreaCount);
    element.textContent = stageAreaCount(count, language);
  });
  const count = document.querySelector<HTMLElement>('.concept-count');
  if (count) count.lastChild!.textContent = ` ${language === 'en' ? 'CONCEPTS' : 'CONCEPTOS'}`;
}

export function getSavedLanguage(): Language {
  return readPreference(preferenceKeys.language) === 'es' ? 'es' : 'en';
}

export function saveLanguage(language: Language) {
  writePreference(preferenceKeys.language, language);
}
