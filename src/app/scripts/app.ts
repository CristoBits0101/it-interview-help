import { documentTitle } from '../../shared/lib/document-title';
import { initializePreferencesReturn } from '../../shared/scripts/preferences-return';
import { initializeAiEcosystem } from '../../features/artificial-intelligence/generative-artificial-intelligence/ecosystem/scripts/ai-ecosystem';
import { preferenceKeys, readJsonPreference, restoreLearnedIds, writePreference } from '../../shared/lib/preferences';
import { $, $$ } from '../../shared/scripts/dom';
import { initializeNavigationDrawer } from '../../shared/scripts/navigation-drawer';
import { initializeStudyCards } from '../../shared/scripts/study-cards';
import { initializeImplementationGuides } from '../../features/software-engineering/software-design/design-patterns/scripts/implementation-guides';
import { initializeReview } from '../../shared/scripts/review';
import { initializeDialogs } from '../../shared/scripts/dialogs';
import { initializeNavigation } from '../../shared/scripts/navigation';
import { normalizeSearch as normalize } from '../../shared/lib/search';
import { initializeInteractionSounds } from '../../shared/scripts/interaction-sounds';
import { initializeCareerPaths } from '../../features/home/scripts/home';
import { initializeCareerTooltips } from '../../features/home/scripts/career-tooltips';
import { applyStaticTranslations, getSavedLanguage, saveLanguage, translate, translatePatternTitle, type Language } from '../../shared/scripts/i18n';

export function initializeApp() {
  const routeTitles: Record<string, string> = JSON.parse(document.querySelector<HTMLTitleElement>('title')!.dataset.routeTitles!);
  let language: Language = getSavedLanguage();
  applyStaticTranslations(language);
  const filterNavigation = initializeNavigation();
  const refreshAiEcosystem = initializeAiEcosystem();
  const refreshCareerSelection = initializeCareerPaths();
  initializeCareerTooltips();
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
  const pendingSections = $$<HTMLElement>('[data-pending-route]');
  let currentPending: HTMLElement | undefined;
  const resourceSections = $$<HTMLElement>('[data-resource-route]');
  let currentResource: HTMLElement | undefined;
  const returnRoutes = new Set(['/', ...sections.map(section => `/${section.dataset.trackId}/${section.dataset.moduleId}`), ...pendingSections.map(section => `/${section.dataset.pendingRoute}`), ...resourceSections.map(section => `/${section.dataset.resourceRoute}`)]);
  const updatePreferencesReturn = initializePreferencesReturn(returnRoutes);
  const cards = $$<HTMLElement>('.concept-card');
  const validIds = new Set(cards.map(card => card.dataset.conceptId!));
  const resourceSearch = new Map([...resourceSections, ...$$<HTMLElement>('[data-learning-guide]')].map(section => [section.dataset.resourceRoute ?? section.id, normalize(`${section.textContent} ${Array.from(section.querySelectorAll<HTMLElement>('[data-i18n-es]'), item => `${item.dataset.i18nEs} ${item.dataset.i18nEn}`).join(' ')}`)]));
  function setLevel(index: number) {
    currentLevelIndex = Math.max(0, Math.min(levelOptions.length - 1, index));
    currentLevelValue = levelOptions[currentLevelIndex].value;
    levelCurrent.textContent = translate(levelOptions[currentLevelIndex].label, language);
    levelPrevious.disabled = currentLevelIndex === 0;
    levelNext.disabled = currentLevelIndex === levelOptions.length - 1;
  }
  const learned = new Set(restoreLearnedIds(readJsonPreference(preferenceKeys.progress), validIds));

  let currentModule = sections[0].dataset.moduleId!;
  let currentTrack = sections[0].dataset.trackId!;
  type RouteMode = 'home' | 'module' | 'pending' | 'resource' | 'preferences';
  let routeMode: RouteMode = 'home';
  let mode: RouteMode | 'search' = 'home';
  let toastTimer: ReturnType<typeof setTimeout>;
  const say = (message: string) => {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 5000);
  };
  const persist = () => {
    if (!writePreference(preferenceKeys.progress, JSON.stringify({ learned: [...learned] }))) {
      say(translate('El progreso se mantendrá durante esta sesión. El almacenamiento local no está disponible.', language));
    }
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
    filterNavigation(search.value);
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
    const moduleLink = mode === 'resource'
      ? navigationLinks.find(link => new URL(link.href).pathname === `/${currentResource?.dataset.resourceRoute}`)
      : mode === 'pending'
      ? navigationLinks.find(link => new URL(link.href).pathname === `/${currentPending?.dataset.pendingRoute}`)
      : navigationLinks.find(link => link.dataset.navModule === currentModule)
      ?? navigationLinks.find(link => new URL(link.href).pathname === `/${currentTrack}/${currentModule}`);
    const currentLink = moduleLink
      ?? navigationLinks.find(link => !link.dataset.navModule && new URL(link.href).pathname.slice(1).split('/')[0] === currentTrack);
    const moduleLabel = currentLink?.querySelector('.navigation-label')?.textContent ?? selectedSection.dataset.moduleTitle!;
    const navigationPath = [moduleLabel];
    let parentBranch = currentLink?.closest<HTMLElement>('[data-nav-branch]');
    while (parentBranch) {
      const label = parentBranch.querySelector(':scope > summary .navigation-label')?.textContent;
      if (label) navigationPath.unshift(label);
      parentBranch = parentBranch.parentElement?.closest<HTMLElement>('[data-nav-branch]');
    }
    const isHome = mode === 'home';
    const isPreferences = mode === 'preferences';
    $('#preferences-view').hidden = !isPreferences;
    $('#preferences-back').hidden = !isPreferences;
    if (isPreferences) $('#preferences-link').setAttribute('aria-current', 'page');
    else $('#preferences-link').removeAttribute('aria-current');
    const canonical = document.querySelector<HTMLLinkElement>('link[rel=canonical]');
    if (canonical?.dataset.baseUrl) {
      canonical.href = isPreferences ? new URL('preferences', canonical.dataset.baseUrl).href : canonical.dataset.baseUrl;
      document.querySelector<HTMLMetaElement>('meta[property="og:url"]')!.content = canonical.href;
    }
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name=description]')!;
    descriptionMeta.content = translate(isPreferences ? 'Configura la aplicación según tus necesidades y gustos.' : descriptionMeta.dataset.defaultDescription!, language);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')!.content = descriptionMeta.content;
    const isGrouped = mode === 'search';
    $('#home-view').hidden = !isHome;
    $('#study').hidden = isHome || isPreferences || mode === 'pending' || mode === 'resource';
    pendingSections.forEach(section => { section.hidden = mode !== 'pending' || section !== currentPending; });
    resourceSections.forEach(section => { section.hidden = mode !== 'resource' || section !== currentResource; });
    let resourceCount = 0;
    $$<HTMLElement>('[data-resource-result]').forEach(result => {
      result.hidden = mode !== 'search' || !query || !resourceSearch.get(result.dataset.resourceResult ?? '')?.includes(query);
      if (!result.hidden) resourceCount++;
    });
    const breadcrumbPath = $('#breadcrumb-path');
    breadcrumbPath.hidden = isHome;
    breadcrumbPath.replaceChildren();
    const pathLabels = isHome ? [] : isPreferences ? [translate('Preferencias', language)] : isGrouped ? [translate('Búsqueda', language)] : navigationPath;
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
    document.title = documentTitle(location.pathname, routeTitles, language);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')!.content = document.title;
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
    $('#empty-state').hidden = visibleCount > 0 || resourceCount > 0;
    $('.module-toolbar').hidden = visibleCount === 0 && resourceCount > 0;
    $('#module-bottom').hidden = isGrouped || visibleCount === 0;
    const heading = $('#study-title');
    const description = $('#study-description');
    description.hidden = mode !== 'module';
    if (mode === 'module') {
      heading.textContent = translate(selectedSection.dataset.moduleTitle!, language);
      description.textContent = translate(selectedSection.dataset.moduleDescription!, language);
    } else {
      heading.textContent = translate('Resultados de búsqueda', language);
    }
    if (reviewModuleButton) {
      reviewModuleButton.disabled = visibleCount === 0;
      reviewModuleButton.style.opacity = visibleCount === 0 ? '.4' : '1';
      reviewModuleButton.setAttribute('aria-label', translate(mode === 'module' ? 'Repasar el módulo visible' : 'Repasar los conceptos visibles', language));
    }
    navigationLinks.forEach(link => {
      if ((mode === 'module' || mode === 'pending' || mode === 'resource') && link === currentLink) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const next = sections[(sections.indexOf(selectedSection) + 1) % sections.length];
    const nextLink = $<HTMLAnchorElement>('#next-module');
    nextLink.href = `/${next.dataset.trackId}/${next.dataset.moduleId}`;
    nextLink.setAttribute('aria-label', `${translate('Siguiente módulo:', language)} ${translate(next.dataset.moduleTitle!, language)}`);
  }

  function goToRoute(initial = false) {
    updatePreferencesReturn();
    document.querySelectorAll<HTMLDialogElement>('[data-implementation][open], [data-learning-guide][open]').forEach(dialog => dialog.close());
    const legacyRoute = location.hash.slice(1);
    if (initial && location.pathname === '/' && (legacyRoute === 'home' || legacyRoute === 'preferences' || returnRoutes.has(`/${legacyRoute}`))) history.replaceState(history.state, '', legacyRoute === 'home' ? '/' : `/${legacyRoute}`);
    const route = location.pathname.replace(/^\/|\/$/g, '');
    if (route === 'main' && !initial) return;
    if (route === 'study' && routeMode === 'module') return;
    search.value = '';
    setLevel(0);
    const match = sections.find(section => `${section.dataset.trackId}/${section.dataset.moduleId}` === route);
    currentPending = pendingSections.find(section => section.dataset.pendingRoute === route);
    currentResource = resourceSections.find(section => section.dataset.resourceRoute === route);
    const anchor = document.getElementById(route);
    const homeAnchor = anchor && $('#home-view').contains(anchor) ? anchor : null;
    if (route === 'preferences') {
      routeMode = 'preferences';
    } else if (match) {
      currentModule = match.dataset.moduleId!;
      currentTrack = match.dataset.trackId!;
      routeMode = 'module';
    } else if (currentResource) {
      routeMode = 'resource';
    } else if (currentPending) {
      routeMode = 'pending';
    } else {
      routeMode = 'home';
      if (route && route !== 'home' && !homeAnchor) history.replaceState(null, '', '/');
    }
    mode = routeMode;
    navigationDrawer.close();
    refreshView();
    if (homeAnchor) requestAnimationFrame(() => homeAnchor.scrollIntoView({ block: 'start' }));
    else if (!initial) {
      $('#main').focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }
  window.addEventListener('popstate', () => goToRoute());
  window.addEventListener('hashchange', () => {
    if (location.pathname === '/' && (location.hash === '#home' || location.hash === '#preferences' || returnRoutes.has(`/${location.hash.slice(1)}`))) goToRoute(true);
  });
  $('.skip-link').addEventListener('click', event => {
    event.preventDefault();
    $('#main').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
    const destination = new URL(link.href);
    if (destination.origin !== location.origin || destination.hash) return;
    if (destination.pathname !== '/preferences' && !returnRoutes.has(destination.pathname.replace(/\/$/, '') || '/')) return;
    event.preventDefault();
    if (destination.pathname !== location.pathname) history.pushState(null, '', destination.pathname);
    goToRoute();
  });
  $('#clear-filters').addEventListener('click', () => {
    search.value = '';
    setLevel(0);
    mode = routeMode;
    refreshView();
    navigationDrawer.focusSearch();
  });
  let resultsTimer: ReturnType<typeof setTimeout>;
  function announceResults() {
    clearTimeout(resultsTimer);
    resultsTimer = setTimeout(() => {
      const count = Number($('#visible-count').textContent);
      const guides = $$<HTMLElement>('[data-resource-result]').filter(result => !result.hidden).length;
      $('#results-status').textContent = `${count} ${translate(count === 1 ? 'concepto encontrado' : 'conceptos encontrados', language)}.${guides ? ` ${guides} ${translate('Guías', language)}.` : ''}`;
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
  const languageSelector = $('#language-selector');
  languageSelector.addEventListener('change', event => {
    const option = event.target;
    if (!(option instanceof HTMLInputElement) || !option.checked || (option.value !== 'es' && option.value !== 'en')) return;
    language = option.value;
    saveLanguage(language);
    applyStaticTranslations(language);
    refreshAiEcosystem();
    refreshView();
    refreshProgress();
    refreshCareerSelection?.();
    document.documentElement.classList.remove('language-changing');
    void document.documentElement.offsetWidth;
    document.documentElement.classList.add('language-changing');
    if ($('#results-status').textContent || mode === 'search') announceResults();
  });
  initializeDialogs();
  refreshProgress();
  goToRoute(true);

  initializeInteractionSounds();
}
