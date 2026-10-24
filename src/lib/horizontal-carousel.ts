export type CarouselLayout = { slots: number; itemWidth: number };
export type CarouselItemBounds = { left: number; right: number };
export type CarouselRange = { start: number; end: number; total: number };

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

export function calculateCarouselLayout(width: number, count: number, minimumWidth: number, maximumWidth: number, gap: number): CarouselLayout {
  const available = Math.max(0, width);
  const itemCount = Math.max(0, Math.floor(count));
  const minimum = Math.max(1, minimumWidth);
  const maximum = Math.max(minimum, maximumWidth);
  const spacing = Math.max(0, gap);
  if (!itemCount || !available) return { slots: 0, itemWidth: 0 };
  const capacity = clamp(Math.floor((available + spacing) / (minimum + spacing)), 1, 5);
  const slots = Math.min(itemCount, capacity);
  return { slots, itemWidth: Math.min(maximum, (available - spacing * (slots - 1)) / slots) };
}

export function getCarouselRange(width: number, items: readonly CarouselItemBounds[], maximumVisible = 5): CarouselRange {
  const total = items.length;
  if (!total || width <= 0) return { start: 0, end: 0, total };
  const limit = Math.max(1, Math.min(5, Math.floor(maximumVisible)));
  const fullyVisible = items.flatMap((item, index) => item.right > item.left && item.left >= -1 && item.right <= width + 1 ? [index] : []);
  if (fullyVisible.length) {
    const start = fullyVisible[0];
    const end = Math.min(fullyVisible.at(-1)!, start + limit - 1);
    return { start: start + 1, end: end + 1, total };
  }
  const intersections = items.map(item => Math.max(0, Math.min(width, item.right) - Math.max(0, item.left)));
  const largest = Math.max(...intersections);
  if (!largest) return { start: 0, end: 0, total };
  const index = intersections.indexOf(largest) + 1;
  return { start: index, end: index, total };
}

export function getCarouselPageTarget(current: number, direction: -1 | 1, slots: number, itemWidth: number, gap: number, maximumScroll: number): number {
  return clamp(current + direction * Math.max(1, slots) * (itemWidth + Math.max(0, gap)), 0, Math.max(0, maximumScroll));
}

export function getNearestCarouselScroll(current: number, width: number, item: CarouselItemBounds, maximumScroll: number): number {
  const distance = item.left < 0 ? item.left : item.right > width ? item.right - width : 0;
  return clamp(current + distance, 0, Math.max(0, maximumScroll));
}

export function getCarouselFocusIndex(key: string, current: number, count: number): number | undefined {
  if (!count) return undefined;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  if (key === 'ArrowLeft') return clamp(current - 1, 0, count - 1);
  if (key === 'ArrowRight') return clamp(current + 1, 0, count - 1);
  return undefined;
}

export function formatCarouselRange(range: CarouselRange, language: string): string {
  return `${range.start} - ${range.end} ${language === 'es' ? 'de' : 'of'} ${range.total}`;
}

export function getCarouselSelectionState(index: number, count: number) {
  const selectedIndex = index >= 0 && index < count ? index : -1;
  return {
    index: selectedIndex,
    controlsVisible: count > 1,
    previousDisabled: count < 2 || selectedIndex <= 0,
    nextDisabled: count < 2 || selectedIndex === count - 1,
  };
}

export function formatCarouselSelection(index: number, count: number, language: string): string {
  const position = index >= 0 && index < count ? index + 1 : 0;
  return `${position} ${language === 'es' ? 'de' : 'of'} ${count}`;
}
