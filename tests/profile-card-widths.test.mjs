import test from 'node:test';
import assert from 'node:assert/strict';
import { distributeProfileWidths, roundProfileWidths } from '../src/features/home/lib/profile-card-widths.ts';

test('role widths stay equal when titles already fit', () => {
  assert.deepEqual(distributeProfileWidths(280, [190, 250, 180, 160, 160], 230), [280, 280, 280, 280, 280]);
});

test('surplus funds a longer title while preserving the group total and lower bound', () => {
  const preferred = [190, 310, 200, 180, 180];
  const widths = distributeProfileWidths(280, preferred, 230);
  assert(widths[1] > 310);
  assert(Math.abs(widths.reduce((sum, width) => sum + width, 0) - 1400) < 0.000001);
  assert(widths.every((width, index) => width >= Math.max(230, preferred[index])));
  assert(widths.filter((_, index) => index !== 1).every(width => width < 280));
  const slack = widths.map((width, index) => width - Math.max(230, preferred[index]));
  assert(slack.every(value => Math.abs(value - slack[0]) < 0.000001));
});

test('rounding retains complete title insets when the group fits exactly', () => {
  const required = [190, 310, 200, 180, 180];
  const widths = roundProfileWidths(distributeProfileWidths(212, required, 144));
  assert.deepEqual(widths, required);
});

test('insufficient room remains bounded and permits wrapping instead of growing the row', () => {
  const widths = distributeProfileWidths(160, [300, 260, 100, 100, 100], 144);
  assert(widths[0] < 300 && widths[1] < 260);
  assert(widths.every(width => width >= 144));
  assert(Math.abs(widths.reduce((sum, width) => sum + width, 0) - 800) < 0.000001);
  assert.deepEqual(distributeProfileWidths(120, [300], 144), [120]);
});

test('cumulative rounding preserves the complete track including a partial final group', () => {
  const widths = [171.4, 238.6, 172.7, 171.4, 171.4, 171.4, 238.6];
  const rounded = roundProfileWidths(widths);
  assert.equal(rounded.reduce((sum, width) => sum + width, 0), Math.round(widths.reduce((sum, width) => sum + width, 0)));
  assert(rounded.every((width, index) => Math.abs(width - widths[index]) < 1));
});
