import { calculateCarouselLayout, formatCarouselRange, formatCarouselSelection, getCarouselSelectionState, getCarouselFocusIndex, getCarouselPage, getCarouselRange, getNearestCarouselScroll, type CarouselLayout } from '../lib/horizontal-carousel';
import { initializeCarouselPositions } from './carousel-position-controls';

type CarouselController = { refresh(): void; destroy(): void };

function cssLength(value: string, rootSize: number, fallback: number): number {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return fallback;
  return value.trim().endsWith('rem') ? parsed * rootSize : parsed;
}

function initializeCarousel(root: HTMLElement): CarouselController | undefined {
  const viewport = root.querySelector<HTMLElement>('[data-carousel-viewport]');
  const previous = root.querySelector<HTMLButtonElement>('[data-carousel-previous]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  const controls = root.querySelector<HTMLElement>('[data-carousel-controls]');
  const range = root.querySelector<HTMLElement>('[data-carousel-range]');
  if (!viewport || !controls || !range) return;
  const selectionMode = root.hasAttribute('data-carousel-selection');
  if (selectionMode && (!previous || !next)) return;
  const events = new AbortController();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let items: HTMLElement[] = [];
  let layout: CarouselLayout = { slots: 0, itemWidth: 0 };
  let gap = 0;
  let insetStart = 0;
  let insetEnd = 0;
  let frame = 0;
  let needsLayout = false;
  let availableItems: HTMLElement[] = [];
  let pageIndex = 0;

  const positions = selectionMode ? undefined : initializeCarouselPositions(controls, viewport.id, index => {
    pageIndex = index;
    refresh();
    viewport.scrollTo({ left: 0, behavior: 'instant' });
    updateState();
  }, events.signal);

  const maximumScroll = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  const contentWidth = () => viewport.clientWidth - insetStart - insetEnd;
  const bounds = (item: HTMLElement) => {
    const origin = viewport.getBoundingClientRect().left + viewport.clientLeft + insetStart;
    const rectangle = item.getBoundingClientRect();
    return { left: rectangle.left - origin, right: rectangle.right - origin };
  };
  const selectedIndex = () => items.findIndex(item => item.getAttribute('aria-pressed') === 'true');
  const updateState = () => {
    let label: string;
    if (selectionMode) {
      const selection = getCarouselSelectionState(selectedIndex(), items.length);
      controls.hidden = !selection.controlsVisible;
      if (previous) previous.disabled = selection.previousDisabled;
      if (next) next.disabled = selection.nextDisabled;
      label = formatCarouselSelection(selection.index, items.length, document.documentElement.lang);
    } else {
      const page = getCarouselPage(availableItems.length, pageIndex);
      controls.hidden = page.pages <= 1;
      const visibleRange = getCarouselRange(contentWidth(), items.map(bounds), layout.slots || 1);
      positions?.update(pageIndex);
      label = formatCarouselRange({ start: visibleRange.start ? page.start + visibleRange.start : 0, end: visibleRange.end ? page.start + visibleRange.end : 0, total: availableItems.length }, document.documentElement.lang);
    }
    if (range.textContent !== label) range.textContent = label;
  };
  const scrollTo = (left: number) => {
    if (Math.abs(viewport.scrollLeft - left) < 0.5) return;
    viewport.scrollTo({ left, top: viewport.scrollTop, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };
  const reveal = (item: HTMLElement) => {
    scrollTo(getNearestCarouselScroll(viewport.scrollLeft, contentWidth(), bounds(item), maximumScroll()));
  };
  const refresh = () => {
    if (events.signal.aborted) return;
    const allItems = Array.from(viewport.children).filter((item): item is HTMLElement => item instanceof HTMLElement && item.matches('[data-carousel-item]'));
    const active = document.activeElement instanceof HTMLElement ? document.activeElement.closest<HTMLElement>('[data-carousel-item]') : null;
    const nextItems = allItems.filter(item => !item.hidden);
    if (availableItems.length !== nextItems.length || availableItems.some((item, index) => item !== nextItems[index])) pageIndex = 0;
    availableItems = nextItems;
    const page = getCarouselPage(availableItems.length, pageIndex);
    pageIndex = page.index;
    items = selectionMode ? availableItems : availableItems.slice(page.start, page.end);
    if (!selectionMode) allItems.forEach(item => item.classList.toggle('is-carousel-page-hidden', !items.includes(item)));
    positions?.refresh(availableItems);
    const rootSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const styles = getComputedStyle(root);
    const viewportStyles = getComputedStyle(viewport);
    gap = Number.parseFloat(viewportStyles.columnGap) || 0;
    insetStart = Number.parseFloat(viewportStyles.paddingInlineStart) || 0;
    insetEnd = Number.parseFloat(viewportStyles.paddingInlineEnd) || 0;
    layout = calculateCarouselLayout(contentWidth(), items.length, cssLength(styles.getPropertyValue('--carousel-min-width'), rootSize, 9 * rootSize), cssLength(styles.getPropertyValue('--carousel-max-width'), rootSize, 18 * rootSize), gap);
    const itemWidth = `${layout.itemWidth}px`;
    if (layout.slots && viewport.style.getPropertyValue('--carousel-item-width') !== itemWidth) viewport.style.setProperty('--carousel-item-width', itemWidth);
    if (active && allItems.includes(active) && !items.includes(active)) {
      const replacement = items[Math.min(allItems.indexOf(active), items.length - 1)];
      if (replacement) {
        replacement.focus({ preventScroll: true });
        reveal(replacement);
      } else {
        if (!viewport.hasAttribute('tabindex')) viewport.tabIndex = -1;
        viewport.focus({ preventScroll: true });
      }
    }
    updateState();
  };
  const schedule = (measure = false) => {
    needsLayout ||= measure;
    if (frame || events.signal.aborted) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const measureLayout = needsLayout;
      needsLayout = false;
      if (measureLayout) refresh();
      else updateState();
    });
  };
  const activate = (index: number, focus = false) => {
    const item = items[index];
    if (!item) return;
    if (focus) item.focus({ preventScroll: true });
    if (item.getAttribute('aria-pressed') !== 'true') item.click();
    reveal(item);
    updateState();
  };
  const turnPage = (direction: -1 | 1) => {
    const index = getCarouselFocusIndex(direction < 0 ? 'ArrowLeft' : 'ArrowRight', selectedIndex(), items.length);
    if (index !== undefined) activate(index);
  };
  previous?.addEventListener('click', () => turnPage(-1), { signal: events.signal });
  next?.addEventListener('click', () => turnPage(1), { signal: events.signal });
  viewport.addEventListener('scroll', () => schedule(), { passive: true, signal: events.signal });
  viewport.addEventListener('focusin', event => {
    const item = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>('[data-carousel-item]') : null;
    if (item && items.includes(item)) reveal(item);
  }, { signal: events.signal });
  viewport.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const item = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>('[data-carousel-item]') : null;
    if (!item || !items.includes(item)) return;
    const index = getCarouselFocusIndex(event.key, items.indexOf(item), items.length);
    if (index === undefined) return;
    event.preventDefault();
    if (selectionMode) activate(index, true);
    else {
      items[index].focus({ preventScroll: true });
      reveal(items[index]);
    }
  }, { signal: events.signal });
  const resize = new ResizeObserver(() => schedule(true));
  resize.observe(viewport);
  const rootChanges = new MutationObserver(() => schedule(true));
  rootChanges.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'lang'] });
  window.addEventListener('resize', () => schedule(true), { signal: events.signal });
  document.fonts.addEventListener('loadingdone', () => schedule(true), { signal: events.signal });
  void document.fonts.ready.then(() => schedule(true));
  refresh();
  return {
    refresh,
    destroy() {
      events.abort();
      resize.disconnect();
      rootChanges.disconnect();
      cancelAnimationFrame(frame);
    },
  };
}

export function initializeHorizontalCarousels(scope: ParentNode = document): CarouselController {
  const roots = Array.from(scope.querySelectorAll<HTMLElement>('[data-carousel]'));
  if (scope instanceof HTMLElement && scope.matches('[data-carousel]')) roots.unshift(scope);
  const controllers = roots.flatMap(root => {
    const controller = initializeCarousel(root);
    return controller ? [controller] : [];
  });
  return {
    refresh() { controllers.forEach(controller => controller.refresh()); },
    destroy() { controllers.forEach(controller => controller.destroy()); },
  };
}
