import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateCarouselLayout, formatCarouselRange, formatCarouselSelection, getCarouselSelectionState, getCarouselFocusIndex, getCarouselPage, getCarouselRange, getNearestCarouselScroll } from '../src/features/home/lib/horizontal-carousel.ts';

const rectangles = (count, itemWidth, gap, scroll = 0) => Array.from({ length: count }, (_, index) => ({ left: index * (itemWidth + gap) - scroll, right: index * (itemWidth + gap) + itemWidth - scroll }));

test('empty, single and short rows fit without stretching past the maximum width', () => {
  assert.deepEqual(calculateCarouselLayout(800, 0, 144, 288, 8), { slots: 0, itemWidth: 0 });
  assert.deepEqual(calculateCarouselLayout(800, 1, 144, 288, 8), { slots: 1, itemWidth: 288 });
  assert.deepEqual(calculateCarouselLayout(800, 4, 144, 288, 8), { slots: 4, itemWidth: 194 });
  assert.deepEqual(calculateCarouselLayout(0, 8, 144, 288, 8), { slots: 0, itemWidth: 0 });
});

test('eight items use at most five columns and adapt to narrow or doubled text layouts', () => {
  assert.deepEqual(calculateCarouselLayout(792, 8, 144, 288, 8), { slots: 5, itemWidth: 152 });
  assert.deepEqual(calculateCarouselLayout(320, 8, 144, 288, 8), { slots: 2, itemWidth: 156 });
  assert.deepEqual(calculateCarouselLayout(320, 8, 288, 576, 8), { slots: 1, itemWidth: 320 });
  assert.deepEqual(calculateCarouselLayout(120, 8, 144, 288, 8), { slots: 1, itemWidth: 120 });
  assert.deepEqual(calculateCarouselLayout(2000, 8, 144, 288, 8), { slots: 5, itemWidth: 288 });
});

test('ranges report actual complete items and exclude the sixth partial item during manual scrolling', () => {
  assert.deepEqual(getCarouselRange(792, rectangles(8, 152, 8)), { start: 1, end: 5, total: 8 });
  assert.deepEqual(getCarouselRange(792, rectangles(8, 152, 8, 80)), { start: 2, end: 5, total: 8 });
  assert.deepEqual(getCarouselRange(792, rectangles(8, 152, 8, 480)), { start: 4, end: 8, total: 8 });
  assert.deepEqual(getCarouselRange(792, rectangles(8, 152, 8, 0.5)), { start: 1, end: 5, total: 8 });
});

test('empty, hidden and partially visible single items have bounded truthful ranges', () => {
  assert.deepEqual(getCarouselRange(320, []), { start: 0, end: 0, total: 0 });
  assert.deepEqual(getCarouselRange(0, rectangles(4, 194, 8)), { start: 0, end: 0, total: 4 });
  assert.deepEqual(getCarouselRange(120, [{ left: -10, right: 190 }]), { start: 1, end: 1, total: 1 });
  assert.deepEqual(getCarouselRange(800, rectangles(4, 194, 8)), { start: 1, end: 4, total: 4 });
  assert.deepEqual(getCarouselRange(2000, rectangles(8, 288, 8)), { start: 1, end: 5, total: 8 });
  assert.equal(formatCarouselRange({ start: 4, end: 8, total: 8 }, 'en'), '4 - 8 of 8');
  assert.equal(formatCarouselRange({ start: 1, end: 4, total: 4 }, 'es'), '1 - 4 de 4');
});

test('pagination groups five roles and retains a partial final group', () => {
  assert.deepEqual(getCarouselPage(8, 0), { index: 0, pages: 2, start: 0, end: 5 });
  assert.deepEqual(getCarouselPage(8, 1), { index: 1, pages: 2, start: 5, end: 8 });
  assert.deepEqual(getCarouselPage(8, 99), getCarouselPage(8, 1));
  for (const count of [1, 5]) assert.deepEqual(getCarouselPage(count, 1), { index: 0, pages: 1, start: 0, end: count });
  assert.deepEqual(getCarouselPage(0, 1), { index: 0, pages: 0, start: 0, end: 0 });
  for (const width of [120, 320, 792]) {
    for (const index of [0, 1]) {
      const page = getCarouselPage(8, index);
      const count = page.end - page.start;
      const layout = calculateCarouselLayout(width, count, 144, 288, 8);
      assert.ok(layout.slots >= 1 && layout.slots <= count);
      const lastScroll = Math.max(0, count * (layout.itemWidth + 8) - 8 - width);
      const range = getCarouselRange(width, rectangles(count, layout.itemWidth, 8, lastScroll));
      assert.equal(page.start + range.end, page.end);
    }
  }
});
test('card navigation remains meaningful when one pagination block overflows the viewport', () => {
  for (const count of [3, 5]) {
    assert.equal(getCarouselPage(count, 0).pages, 1);
    assert.ok(calculateCarouselLayout(320, count, 144, 288, 8).slots < count);
  }
});
test('focus destinations never wrap and activation keys remain native', () => {
  assert.equal(getCarouselFocusIndex('ArrowLeft', 0, 8), 0);
  assert.equal(getCarouselFocusIndex('ArrowRight', 7, 8), 7);
  assert.equal(getCarouselFocusIndex('ArrowRight', 2, 8), 3);
  assert.equal(getCarouselFocusIndex('Home', 7, 8), 0);
  assert.equal(getCarouselFocusIndex('End', 0, 8), 7);
  assert.equal(getCarouselFocusIndex('End', 0, 0), undefined);
  for (const key of ['Enter', ' ', 'Tab', 'ArrowDown']) assert.equal(getCarouselFocusIndex(key, 0, 8), undefined);
});

test('revealing focus scrolls only the minimum horizontal distance within limits', () => {
  assert.equal(getNearestCarouselScroll(160, 792, { left: 10, right: 162 }, 480), 160);
  assert.equal(getNearestCarouselScroll(160, 792, { left: -80, right: 72 }, 480), 80);
  assert.equal(getNearestCarouselScroll(0, 792, { left: 800, right: 952 }, 480), 160);
  assert.equal(getNearestCarouselScroll(0, 792, { left: -10, right: 142 }, 480), 0);
  assert.equal(getNearestCarouselScroll(470, 792, { left: 800, right: 952 }, 480), 480);
});

test('selection controls follow the chosen item even when all choices fit in the viewport', () => {
  assert.deepEqual(getCarouselSelectionState(0, 8), { index: 0, controlsVisible: true, previousDisabled: true, nextDisabled: false });
  assert.deepEqual(getCarouselSelectionState(3, 8), { index: 3, controlsVisible: true, previousDisabled: false, nextDisabled: false });
  assert.deepEqual(getCarouselSelectionState(7, 8), { index: 7, controlsVisible: true, previousDisabled: false, nextDisabled: true });
  assert.deepEqual(getCarouselSelectionState(0, 1), { index: 0, controlsVisible: false, previousDisabled: true, nextDisabled: true });
  assert.deepEqual(getCarouselSelectionState(-1, 0), { index: -1, controlsVisible: false, previousDisabled: true, nextDisabled: true });
  assert.equal(formatCarouselSelection(3, 8, 'es'), '4 de 8');
  assert.equal(formatCarouselSelection(7, 8, 'en'), '8 of 8');
  assert.equal(formatCarouselSelection(-1, 0, 'en'), '0 of 0');
});

test('selection updates arrow limits without requiring a scroll event', () => {
  assert.deepEqual(getCarouselSelectionState(0, 3), { index: 0, controlsVisible: true, previousDisabled: true, nextDisabled: false });
  assert.deepEqual(getCarouselSelectionState(1, 3), { index: 1, controlsVisible: true, previousDisabled: false, nextDisabled: false });
  assert.deepEqual(getCarouselSelectionState(0, 3), { index: 0, controlsVisible: true, previousDisabled: true, nextDisabled: false });
  assert.deepEqual(getCarouselSelectionState(2, 3), { index: 2, controlsVisible: true, previousDisabled: false, nextDisabled: true });
});
