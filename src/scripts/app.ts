import { initializeNavigation } from './navigation';
import { initializeCareerPaths } from './home';
import { applyStaticTranslations, getSavedLanguage, saveLanguage, translate, translatePatternTitle, type Language } from './i18n';

initializeNavigation();
const refreshCareerSelection = initializeCareerPaths();
let language: Language = getSavedLanguage();
applyStaticTranslations(language);
refreshCareerSelection?.();

const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const $$ = <T extends HTMLElement = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
const search = $<HTMLInputElement>('#search');
const searchClear = $<HTMLButtonElement>('#search-clear');
const levelPrevious = $<HTMLButtonElement>('#level-previous');
const levelNext = $<HTMLButtonElement>('#level-next');
const levelCurrent = $('#level-current');
const allLevelOptions = [
  { value: 'all', label: 'Todos los niveles' },
  { value: 'Esencial', label: 'Esencial' },
  { value: 'Intermedio', label: 'Intermedio' },
  { value: 'Avanzado', label: 'Avanzado' },
] as const;
type LevelOption = typeof allLevelOptions[number];
let levelOptions: LevelOption[] = [...allLevelOptions];
let currentLevelIndex = 0;
let currentLevelValue: LevelOption['value'] = 'all';
const reviewModuleButton = document.querySelector<HTMLButtonElement>('#review-module');
const sections = $$<HTMLElement>('.concept-section');
const cards = $$<HTMLElement>('.concept-card');
const validIds = new Set(cards.map(card => card.dataset.conceptId!));
const storageKey = 'tech-training:v1';
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function setLevel(index: number) {
  currentLevelIndex = Math.max(0, Math.min(levelOptions.length - 1, index));
  currentLevelValue = levelOptions[currentLevelIndex].value;
  levelCurrent.textContent = translate(levelOptions[currentLevelIndex].label, language);
  levelPrevious.disabled = currentLevelIndex === 0;
  levelNext.disabled = currentLevelIndex === levelOptions.length - 1;
}
let learned = new Set<string>();
let storageAvailable = true;
try {
  const state = JSON.parse(localStorage.getItem(storageKey) || '{}');
  const validList = (value: unknown) => Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string' && validIds.has(id)) : [];
  learned = new Set(validList(state?.learned));
} catch { storageAvailable = false; }

let currentModule = sections[0].dataset.moduleId!;
let currentTrack = sections[0].dataset.trackId!;
let routeMode: 'home' | 'module' = 'home';
let mode: 'home' | 'module' | 'search' = 'home';
let toastTimer: ReturnType<typeof setTimeout>;
const say = (message: string) => {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 5000);
};
const persist = () => {
  try { localStorage.setItem(storageKey, JSON.stringify({ learned: [...learned] })); }
  catch { storageAvailable = false; }
  if (!storageAvailable) say(translate('El progreso se mantendrá durante esta sesión. El almacenamiento local no está disponible.', language));
};

function refreshProgress() {
  cards.forEach(card => {
    const id = card.dataset.conceptId!;
    const title = card.querySelector('h3')!.textContent!;
    const isLearned = learned.has(id);
    card.classList.toggle('is-learned', isLearned);
    const learnButton = card.querySelector<HTMLButtonElement>('[data-learn]')!;
    learnButton.setAttribute('aria-pressed', String(isLearned));
    const label = isLearned ? 'Comprendido' : 'Lo entiendo';
    learnButton.setAttribute('aria-label', `${translate(label, language)}. ${title}`);
    learnButton.querySelector('.learn-label')!.textContent = translate(label, language);
  });
}

function refreshView() {
  const query = normalize(search.value.trim());
  searchClear.hidden = !search.value;
  const selectedSection = sections.find(section => section.dataset.moduleId === currentModule)!;
  const matchesSearch = (card: HTMLElement) => {
    const section = card.closest<HTMLElement>('.concept-section')!;
    const metadata = [section.dataset.trackTitle, section.dataset.trackEyebrow, section.dataset.moduleTitle]
      .map(label => `${label ?? ''} ${translate(label ?? '', language)}`).join(' ');
    const title = card.querySelector<HTMLElement>('h3')!;
    const patternTitle = title.dataset.patternTitle ?? '';
    return !query || normalize(`${metadata} ${title.textContent} ${patternTitle} ${translatePatternTitle(patternTitle, 'es')} ${card.querySelector('[data-card-panel="explanation"]')!.textContent}`).includes(query);
  };
  const availableCards = cards.filter(card => {
    const section = card.closest<HTMLElement>('.concept-section')!;
    return (mode === 'search' || mode === 'module' && section.dataset.moduleId === currentModule) && matchesSearch(card);
  });
  const availableLevels = new Set(availableCards.map(card => card.dataset.level));
  levelOptions = [allLevelOptions[0], ...allLevelOptions.slice(1).filter(option => availableLevels.has(option.value))];
  if (!levelOptions.some(option => option.value === currentLevelValue)) currentLevelValue = 'all';
  currentLevelIndex = levelOptions.findIndex(option => option.value === currentLevelValue);
  levelCurrent.textContent = translate(levelOptions[currentLevelIndex].label, language);
  levelPrevious.disabled = currentLevelIndex === 0;
  levelNext.disabled = currentLevelIndex === levelOptions.length - 1;
  const navigationLinks = $$<HTMLAnchorElement>('[data-nav-link]');
  const moduleLink = navigationLinks.find(link => link.dataset.navModule === currentModule)
    ?? navigationLinks.find(link => new URL(link.href).hash === `#${currentTrack}/${currentModule}`);
  const currentLink = moduleLink
    ?? navigationLinks.find(link => !link.dataset.navModule && new URL(link.href).hash.slice(1).split('/')[0] === currentTrack);
  const moduleLabel = currentLink?.querySelector('.navigation-label')?.textContent ?? selectedSection.dataset.moduleTitle!;
  const parentPath = currentLink?.closest<HTMLElement>('[data-nav-branch]')?.dataset.navBranch;
  const navigationPath = [...(parentPath?.split('/').map(label => translate(decodeURIComponent(label), language)) ?? []), moduleLabel];
  const isHome = mode === 'home';
  const isGrouped = mode === 'search';
  $('#home-view').hidden = !isHome;
  $('#study').hidden = isHome;
  const breadcrumbPath = $('#breadcrumb-path');
  breadcrumbPath.hidden = isHome;
  breadcrumbPath.replaceChildren();
  const pathLabels = isHome ? [] : isGrouped ? [translate('Búsqueda', language)] : navigationPath;
  pathLabels.forEach((label, index) => {
    const separator = document.createElement('span');
    separator.className = 'breadcrumb-slash';
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = '/';
    const isCurrent = index === pathLabels.length - 1;
    const item = document.createElement('span');
    item.className = isCurrent ? 'breadcrumb-current' : 'breadcrumb-ancestor';
    item.textContent = label;
    item.lang = language;
    item.title = label;
    if (isCurrent) {
      item.id = 'breadcrumb-module';
      item.setAttribute('aria-current', 'page');
    }
    breadcrumbPath.append(separator, item);
  });
  const homeLink = $('[data-home-link]');
  if (isHome) homeLink.setAttribute('aria-current', 'page');
  else homeLink.removeAttribute('aria-current');
  document.title = isHome ? `Tech Training · ${translate('Home', language)}` : mode === 'search' ? `${translate('Búsqueda', language)} · Tech Training` : `${translate(selectedSection.dataset.moduleTitle!, language)} · Tech Training`;
  let visibleCount = 0;
  sections.forEach(section => {
    let groupCount = 0;
    section.querySelectorAll<HTMLElement>('.concept-card').forEach(card => {
      const matchesMode = mode === 'search' || mode === 'module' && section.dataset.moduleId === currentModule;
      const selectedLevel = currentLevelValue;
      const matchesLevel = selectedLevel === 'all' || card.dataset.level === selectedLevel;
      card.hidden = !(matchesMode && matchesLevel && matchesSearch(card));
      if (!card.hidden) groupCount++;
    });
    section.hidden = groupCount === 0;
    section.querySelector<HTMLElement>('.search-group-heading')!.classList.toggle('sr-only', !isGrouped);
    visibleCount += groupCount;
  });
  $('#visible-count').textContent = String(visibleCount);
  $('.concept-count').setAttribute('aria-label', `${visibleCount} ${language === 'en' ? visibleCount === 1 ? 'concept' : 'concepts' : visibleCount === 1 ? 'concepto' : 'conceptos'}`);
  $('#empty-state').hidden = visibleCount > 0;
  $('#module-bottom').hidden = isGrouped || visibleCount === 0;
  const heading = $('#study-title');
  if (mode === 'module') {
    heading.textContent = moduleLabel;
  } else {
    heading.textContent = translate('Resultados de búsqueda', language);
  }
  if (reviewModuleButton) {
    reviewModuleButton.disabled = visibleCount === 0;
    reviewModuleButton.style.opacity = visibleCount === 0 ? '.4' : '1';
    reviewModuleButton.setAttribute('aria-label', translate(mode === 'module' ? 'Repasar el módulo visible' : 'Repasar los conceptos visibles', language));
  }
  navigationLinks.forEach(link => {
    if (mode === 'module' && link === currentLink) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const next = sections[(sections.indexOf(selectedSection) + 1) % sections.length];
  const nextLink = $<HTMLAnchorElement>('#next-module');
  nextLink.href = `#${next.dataset.trackId}/${next.dataset.moduleId}`;
  nextLink.setAttribute('aria-label', `${translate('Siguiente módulo:', language)} ${translate(next.dataset.moduleTitle!, language)}`);
}

function goToHash(initial = false) {
  const route = location.hash.slice(1);
  if (route === 'main' && !initial) return;
  if (route === 'study' && routeMode === 'module') return;
  search.value = '';
  setLevel(0);
  const match = sections.find(section => `${section.dataset.trackId}/${section.dataset.moduleId}` === route);
  const anchor = document.getElementById(route);
  const homeAnchor = anchor && $('#home-view').contains(anchor) ? anchor : null;
  if (match) {
    currentModule = match.dataset.moduleId!;
    currentTrack = match.dataset.trackId!;
    routeMode = 'module';
  } else {
    routeMode = 'home';
    if (route && route !== 'home' && !homeAnchor) history.replaceState(null, '', '#home');
  }
  mode = routeMode;
  closeMenu();
  refreshView();
  if (homeAnchor) requestAnimationFrame(() => homeAnchor.scrollIntoView({ block: 'start' }));
  else if (!initial) {
    $('#main').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
window.addEventListener('hashchange', () => goToHash());
$('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  $('#main').focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
});
$$<HTMLAnchorElement>('[data-route], [data-nav-link], [data-home-link], .brand').forEach(link => {
  link.addEventListener('click', event => {
    if (new URL(link.href).hash === location.hash) { event.preventDefault(); goToHash(); }
  });
});
$('#clear-filters').addEventListener('click', () => {
  search.value = '';
  setLevel(0);
  mode = routeMode;
  refreshView();
  search.focus();
});
let resultsTimer: ReturnType<typeof setTimeout>;
function announceResults() {
  clearTimeout(resultsTimer);
  resultsTimer = setTimeout(() => {
    const count = Number($('#visible-count').textContent);
    $('#results-status').textContent = `${count} ${translate(count === 1 ? 'concepto encontrado' : 'conceptos encontrados', language)}.`;
  }, 350);
}
search.addEventListener('input', () => { mode = search.value.trim() ? 'search' : routeMode; refreshView(); announceResults(); });
searchClear.addEventListener('click', () => {
  search.value = '';
  mode = routeMode;
  refreshView();
  announceResults();
  search.focus();
});
const moveLevel = (step: number) => {
  setLevel(currentLevelIndex + step);
  refreshView();
  announceResults();
};
levelPrevious.addEventListener('click', () => moveLevel(-1));
levelNext.addEventListener('click', () => moveLevel(1));

$('#concept-library').addEventListener('click', event => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
  if (!button) return;
  if (button.dataset.cardView) {
    if (button.disabled || button.getAttribute('aria-pressed') === 'true') return;
    const card = button.closest<HTMLElement>('.concept-card')!;
    const panel = card.querySelector<HTMLElement>(`[data-card-panel="${button.dataset.cardView}"]`);
    if (!panel?.textContent?.trim()) return;
    card.querySelectorAll<HTMLButtonElement>('[data-card-view]').forEach(viewButton => {
      viewButton.setAttribute('aria-pressed', String(viewButton === button));
    });
    card.querySelectorAll<HTMLElement>('[data-card-panel]').forEach(viewPanel => {
      viewPanel.hidden = viewPanel !== panel;
    });
    return;
  }
  const learnId = button.dataset.learn;
  if (learnId) {
    if (learned.has(learnId)) learned.delete(learnId);
    else learned.add(learnId);
    say(translate(learned.has(learnId) ? 'Concepto marcado como comprendido.' : 'Concepto marcado como pendiente.', language));
    persist(); refreshProgress();
  }
});

const sidebar = $('#sidebar');
const backdrop = $('#mobile-backdrop');
const mobileToggle = $('#mobile-toggle');
const isNavigationDrawer = () => document.documentElement.classList.contains('sidebar-drawer');
function closeMenu() {
  sidebar.classList.remove('mobile-open');
  backdrop.hidden = true;
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  $('.workspace').inert = false;
  sidebar.setAttribute('role', 'complementary');
  sidebar.removeAttribute('aria-modal');
  if (isNavigationDrawer()) sidebar.inert = true;
}
function openMenu() {
  sidebar.inert = false;
  sidebar.classList.add('mobile-open');
  backdrop.hidden = false;
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  $('.workspace').inert = true;
  sidebar.setAttribute('role', 'dialog');
  sidebar.setAttribute('aria-modal', 'true');
  sidebar.querySelector<HTMLAnchorElement>('.brand')!.focus();
}
mobileToggle.addEventListener('click', () => sidebar.classList.contains('mobile-open') ? closeMenu() : openMenu());
$('#sidebar-close').addEventListener('click', () => { closeMenu(); mobileToggle.focus(); });
backdrop.addEventListener('click', () => { closeMenu(); mobileToggle.focus(); });
window.addEventListener('sidebar-layout-change', () => { closeMenu(); sidebar.inert = isNavigationDrawer(); });
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && !$('dialog[open]') && !sidebar.classList.contains('mobile-open')) {
    event.preventDefault(); search.focus();
  }
  if (sidebar.classList.contains('mobile-open')) {
    if (event.key === 'Escape') { closeMenu(); mobileToggle.focus(); }
    if (event.key === 'Tab') {
      const focusable = Array.from(sidebar.querySelectorAll<HTMLElement>('a, button, summary')).filter(el => el.checkVisibility());
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }
});

const reviewDialog = $<HTMLDialogElement>('#review-dialog');
let reviewCards: HTMLElement[] = [];
let reviewIndex = 0;
let reviewUnderstood = 0;
function drawReview() {
  const card = reviewCards[reviewIndex];
  $('#review-position').textContent = `${reviewIndex + 1} / ${reviewCards.length}`;
  const cardTitle = card.querySelector('h3')!;
  const reviewTitle = $('#review-title');
  reviewTitle.textContent = cardTitle.textContent;
  reviewTitle.lang = cardTitle.lang || language;
  reviewTitle.translate = cardTitle.translate;
  if (cardTitle.dataset.patternTitle) reviewTitle.dataset.patternTitle = cardTitle.dataset.patternTitle;
  else delete reviewTitle.dataset.patternTitle;
  $('#review-definition').replaceChildren(...Array.from(card.querySelector('[data-card-panel="explanation"]')!.children, child => child.cloneNode(true)));
  $('#review-source').replaceChildren(card.querySelector('.concept-source')!.cloneNode(true));
  $('#review-category').textContent = translate(card.closest<HTMLElement>('.concept-section')!.dataset.trackEyebrow!, language);
  $('#review-answer').hidden = true;
  $('#reveal-answer').hidden = false;
  $('#review-rating').hidden = true;
  $('#review-complete').hidden = true;
  $('#review-question').hidden = false;
  reviewDialog.setAttribute('aria-labelledby', 'review-title');
  $('#review-helper').hidden = false;
  $('#reveal-answer').focus();
}
function startReview() {
  const available = cards.filter(card => !card.hidden && !card.closest<HTMLElement>('.concept-section')!.hidden);
  if (!available.length) { say(translate('Elige primero algún concepto para repasar.', language)); return; }
  // Prioritize pending concepts; shuffle within each group for varied practice.
  const shuffle = (list: HTMLElement[]) => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy;
  };
  reviewCards = [...shuffle(available.filter(card => !learned.has(card.dataset.conceptId!))), ...shuffle(available.filter(card => learned.has(card.dataset.conceptId!)))];
  reviewIndex = 0; reviewUnderstood = 0;
  reviewDialog.showModal(); drawReview();
}
reviewModuleButton?.addEventListener('click', () => startReview());
$('#reveal-answer').addEventListener('click', () => { $('#review-answer').hidden = false; $('#reveal-answer').hidden = true; $('#review-rating').hidden = false; $('#review-again').focus(); });
function nextReview(understood: boolean) {
  const id = reviewCards[reviewIndex].dataset.conceptId!;
  if (understood) { learned.add(id); reviewUnderstood++; }
  else learned.delete(id);
  persist(); refreshProgress();
  reviewIndex++;
  if (reviewIndex < reviewCards.length) drawReview();
  else {
    $('#review-question').hidden = true; $('#review-rating').hidden = true; $('#review-helper').hidden = true;
    $('#review-complete').hidden = false;
    $('#review-summary').textContent = language === 'en'
      ? `Concepts reviewed: ${reviewCards.length}. Understood: ${reviewUnderstood}. Keep practicing: ${reviewCards.length - reviewUnderstood}.`
      : `Conceptos repasados: ${reviewCards.length}. Comprendidos: ${reviewUnderstood}. Para seguir practicando: ${reviewCards.length - reviewUnderstood}.`;
    reviewDialog.setAttribute('aria-labelledby', 'review-complete-title');
    $('#review-complete button').focus();
  }
}
$('#review-known').addEventListener('click', () => nextReview(true));
$('#review-again').addEventListener('click', () => nextReview(false));
const languageSelect = $<HTMLSelectElement>('#language-select');
languageSelect.addEventListener('change', () => {
  language = languageSelect.value === 'en' ? 'en' : 'es';
  saveLanguage(language);
  applyStaticTranslations(language);
  refreshView();
  refreshProgress();
  refreshCareerSelection?.();
  if ($('#results-status').textContent || mode === 'search') announceResults();
});
$$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest<HTMLDialogElement>('dialog')!.close()));
$$<HTMLDialogElement>('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }));
document.querySelector('#open-sources')?.addEventListener('click', () => $<HTMLDialogElement>('#sources-dialog').showModal());
refreshProgress();
goToHash(true);
sidebar.inert = isNavigationDrawer();
