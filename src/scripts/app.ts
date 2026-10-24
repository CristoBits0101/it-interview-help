import { $, $$ } from './dom';
import { initializeNavigationDrawer } from './navigation-drawer';
import { initializeStudyCards } from './study-cards';
import { initializeImplementationGuides } from './implementation-guides';
import { initializeReview } from './review';
import { initializeDialogs } from './dialogs';
import { initializeNavigation } from './navigation';
import { initializeCareerPaths } from './home';
import { initializeCareerTooltips } from './career-tooltips';
import { applyStaticTranslations, getSavedLanguage, saveLanguage, translate, translatePatternTitle, type Language } from './i18n';

initializeNavigation();
const refreshCareerSelection = initializeCareerPaths();
initializeCareerTooltips();
let language: Language = getSavedLanguage();
applyStaticTranslations(language);
refreshCareerSelection?.();

const search = $<HTMLInputElement>('#search');
const navigationDrawer = initializeNavigationDrawer(search);
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
    return !query || normalize(`${metadata} ${title.textContent} ${card.dataset.searchAliases ?? ''} ${patternTitle} ${translatePatternTitle(patternTitle, 'es')} ${card.querySelector('[data-card-panel="explanation"]')!.textContent}`).includes(query);
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
  document.title = isHome ? `Tech Interview Prep · ${translate('Home', language)}` : mode === 'search' ? `${translate('Búsqueda', language)} · Tech Interview Prep` : `${translate(selectedSection.dataset.moduleTitle!, language)} · Tech Interview Prep`;
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
  const showPatternPurpose = mode === 'module' && selectedSection.hasAttribute('data-pattern-category');
  heading.classList.toggle('sr-only', !showPatternPurpose);
  if (mode === 'module') {
    heading.textContent = showPatternPurpose ? translate(selectedSection.dataset.moduleDescription!, language).replace(/\.$/u, '') : moduleLabel;
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
  document.querySelectorAll<HTMLDialogElement>('[data-implementation][open]').forEach(dialog => dialog.close());
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
  navigationDrawer.close();
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

initializeImplementationGuides($('#concept-library'), () => language);
initializeStudyCards($('#concept-library'), learnId => {
  if (learned.has(learnId)) learned.delete(learnId);
  else learned.add(learnId);
  say(translate(learned.has(learnId) ? 'Concepto marcado como comprendido.' : 'Concepto marcado como pendiente.', language));
  persist(); refreshProgress();
});

initializeReview({ cards, learned, getLanguage: () => language, onChange: () => { persist(); refreshProgress(); }, onNotice: say, trigger: reviewModuleButton });
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
initializeDialogs();
refreshProgress();
goToHash(true);
