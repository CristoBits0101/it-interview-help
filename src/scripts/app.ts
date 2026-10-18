import { initializeNavigation } from './navigation';
import { initializeCareerPaths } from './home';

initializeNavigation();
initializeCareerPaths();

const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const $$ = <T extends HTMLElement = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
const search = $<HTMLInputElement>('#search');
const levelFilter = $<HTMLSelectElement>('#level-filter');
const sections = $$<HTMLElement>('.concept-section');
const cards = $$<HTMLElement>('.concept-card');
const validIds = new Set(cards.map(card => card.dataset.conceptId!));
const storageKey = 'tech-training:v1';
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
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
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
};
const persist = () => {
  try { localStorage.setItem(storageKey, JSON.stringify({ learned: [...learned] })); }
  catch { storageAvailable = false; }
  if (!storageAvailable) say('El progreso se mantendrá durante esta sesión. El almacenamiento local no está disponible.');
};

function refreshProgress() {
  cards.forEach(card => {
    const id = card.dataset.conceptId!;
    const title = card.querySelector('h3')!.textContent!;
    const isLearned = learned.has(id);
    card.classList.toggle('is-learned', isLearned);
    const learnButton = card.querySelector<HTMLButtonElement>('[data-learn]')!;
    learnButton.setAttribute('aria-pressed', String(isLearned));
    learnButton.setAttribute('aria-label', `${isLearned ? 'Marcar como pendiente' : 'Marcar como comprendido'}: ${title}`);
    learnButton.querySelector('.learn-label')!.textContent = isLearned ? 'Comprendido' : 'Lo entiendo';
  });
}

function refreshView() {
  const query = normalize(search.value.trim());
  const selectedSection = sections.find(section => section.dataset.moduleId === currentModule)!;
  const isHome = mode === 'home';
  const isGrouped = mode === 'search';
  $('#home-view').hidden = !isHome;
  $('#study').hidden = isHome;
  $('#breadcrumb-slash').hidden = isHome;
  $('#breadcrumb-track').hidden = isHome;
  const homeLink = $('[data-home-link]');
  if (isHome) homeLink.setAttribute('aria-current', 'page');
  else homeLink.removeAttribute('aria-current');
  document.title = isHome ? 'Tech Training · Home' : mode === 'search' ? 'Búsqueda · Tech Training' : `${selectedSection.dataset.moduleTitle} · Tech Training`;
  let visibleCount = 0;
  sections.forEach(section => {
    let groupCount = 0;
    section.querySelectorAll<HTMLElement>('.concept-card').forEach(card => {
      const matchesMode = mode === 'search' || mode === 'module' && section.dataset.moduleId === currentModule;
      const matchesLevel = levelFilter.value === 'all' || card.dataset.level === levelFilter.value;
      const matchesSearch = !query || normalize(`${section.dataset.trackTitle} ${section.dataset.trackEyebrow} ${section.dataset.moduleTitle} ${card.querySelector('h3')!.textContent} ${card.querySelector('.concept-description')!.textContent} ${card.querySelector('.memory-line')!.textContent}`).includes(query);
      card.hidden = !(matchesMode && matchesLevel && matchesSearch);
      if (!card.hidden) groupCount++;
    });
    section.hidden = groupCount === 0;
    section.querySelector<HTMLElement>('.search-group-heading')!.hidden = !isGrouped;
    visibleCount += groupCount;
  });
  $('#visible-count').textContent = String(visibleCount);
  $('#empty-state').hidden = visibleCount > 0;
  $('#module-bottom').hidden = isGrouped || visibleCount === 0;
  const heading = $('#study-title');
  const description = $('#study-description');
  const eyebrow = $('#module-eyebrow');
  if (mode === 'module') {
    heading.textContent = selectedSection.dataset.moduleTitle!;
    description.textContent = selectedSection.dataset.moduleDescription!;
    eyebrow.textContent = `${selectedSection.dataset.trackEyebrow} / MODULE ${selectedSection.dataset.moduleNumber}`;
    $('#breadcrumb-track').textContent = selectedSection.dataset.trackEyebrow!;
  } else {
    heading.textContent = 'Encuentra la conexión.';
    description.textContent = `Resultados para «${search.value.trim()}» en todas las rutas.`;
    eyebrow.textContent = 'BUSCAR CONCEPTOS';
    $('#breadcrumb-track').textContent = isHome ? '' : 'Búsqueda';
  }
  $<HTMLButtonElement>('#review-module').disabled = visibleCount === 0;
  $('#review-module').style.opacity = visibleCount === 0 ? '.4' : '1';
  $('#review-module').setAttribute('aria-label', mode === 'module' ? 'Repasar el módulo visible' : 'Repasar los conceptos visibles');
  const navigationLinks = $$<HTMLAnchorElement>('[data-nav-link]');
  const currentLink = navigationLinks.find(link => link.dataset.navModule === currentModule)
    ?? navigationLinks.find(link => !link.dataset.navModule && new URL(link.href).hash.slice(1).split('/')[0] === currentTrack);
  navigationLinks.forEach(link => {
    if (mode === 'module' && link === currentLink) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const next = sections[(sections.indexOf(selectedSection) + 1) % sections.length];
  const nextLink = $<HTMLAnchorElement>('#next-module');
  nextLink.href = `#${next.dataset.trackId}/${next.dataset.moduleId}`;
  nextLink.setAttribute('aria-label', `Siguiente módulo: ${next.dataset.moduleTitle}`);
}

function goToHash(initial = false) {
  const route = location.hash.slice(1);
  if (route === 'main') return;
  if (route === 'study' && routeMode === 'module') return;
  search.value = '';
  levelFilter.value = 'all';
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
$$<HTMLAnchorElement>('[data-route], [data-nav-link], [data-home-link], .brand').forEach(link => {
  link.addEventListener('click', event => {
    if (new URL(link.href).hash === location.hash) { event.preventDefault(); goToHash(); }
  });
});
$('#clear-filters').addEventListener('click', () => {
  search.value = '';
  levelFilter.value = 'all';
  mode = routeMode;
  refreshView();
  search.focus();
});
search.addEventListener('input', () => { mode = search.value.trim() ? 'search' : routeMode; refreshView(); });
levelFilter.addEventListener('change', refreshView);

$('#concept-library').addEventListener('click', event => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
  if (!button) return;
  const learnId = button.dataset.learn;
  if (learnId) {
    if (learned.has(learnId)) learned.delete(learnId);
    else { learned.add(learnId); say('Una idea más conectada. Sigue así.'); }
    persist(); refreshProgress();
  }
});

const sidebar = $('#sidebar');
const backdrop = $('#mobile-backdrop');
const mobileToggle = $('#mobile-toggle');
function closeMenu() {
  sidebar.classList.remove('mobile-open');
  backdrop.hidden = true;
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  $('.workspace').inert = false;
  sidebar.removeAttribute('role');
  sidebar.removeAttribute('aria-modal');
  if (window.matchMedia('(max-width: 850px)').matches) sidebar.inert = true;
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
backdrop.addEventListener('click', () => { closeMenu(); mobileToggle.focus(); });
const mobileMedia = window.matchMedia('(max-width: 850px)');
mobileMedia.addEventListener('change', () => { closeMenu(); sidebar.inert = mobileMedia.matches; });
document.addEventListener('keydown', event => {
  const inInput = (event.target as HTMLElement).matches('input, textarea, select, [contenteditable="true"]');
  if ((event.key === '/' && !inInput || (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') && !$('dialog[open]')) {
    event.preventDefault(); search.focus();
  }
  if (sidebar.classList.contains('mobile-open')) {
    if (event.key === 'Escape') { closeMenu(); mobileToggle.focus(); }
    if (event.key === 'Tab') {
      const focusable = Array.from(sidebar.querySelectorAll<HTMLElement>('a, button, summary')).filter(el => el.getClientRects().length > 0);
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
  $('#review-title').textContent = card.querySelector('h3')!.textContent;
  $('#review-definition').textContent = card.querySelector('.concept-description')!.textContent;
  $('#review-memory').textContent = card.querySelector('.memory-line p')!.textContent;
  $('#review-category').textContent = card.closest<HTMLElement>('.concept-section')!.dataset.trackEyebrow!;
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
  if (!available.length) { say('Elige primero algún concepto para repasar.'); return; }
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
$('#review-module').addEventListener('click', () => startReview());
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
    $('#review-summary').textContent = `Conceptos repasados: ${reviewCards.length}. Comprendidos: ${reviewUnderstood}. Para seguir practicando: ${reviewCards.length - reviewUnderstood}.`;
    reviewDialog.setAttribute('aria-labelledby', 'review-complete-title');
    $('#review-complete button').focus();
  }
}
$('#review-known').addEventListener('click', () => nextReview(true));
$('#review-again').addEventListener('click', () => nextReview(false));
$$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest<HTMLDialogElement>('dialog')!.close()));
$$<HTMLDialogElement>('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }));
$('#open-sources').addEventListener('click', () => $<HTMLDialogElement>('#sources-dialog').showModal());
refreshProgress();
goToHash(true);
sidebar.inert = mobileMedia.matches;
