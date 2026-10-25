import assert from 'node:assert/strict';
import test from 'node:test';
import { restoreSoundPreference, createSoundGate, soundForChange } from '../src/lib/interaction-sound.ts';

test('sound requires explicit opt-in and preserves a zero volume', () => {
  for (const value of [undefined, null, [], 'true', { enabled: 'true' }]) assert.deepEqual(restoreSoundPreference(value), { enabled: false, volume: 30 });
  assert.deepEqual(restoreSoundPreference({ enabled: true, volume: 0 }), { enabled: true, volume: 0 });
  assert.equal(restoreSoundPreference({ volume: -10 }).volume, 0);
  assert.equal(restoreSoundPreference({ volume: 120 }).volume, 100);
  assert.equal(restoreSoundPreference({ volume: NaN }).volume, 30);
});

test('typing and scrolling are bounded while intentional actions retain priority', () => {
  const allow = createSoundGate();
  let typing = 0;
  for (let time = 0; time < 1000; time += 10) if (allow('type', time)) typing++;
  assert(typing <= 10);
  assert(allow('select', 1100));
  assert.equal(allow('scroll', 1150), false);
  assert(allow('scroll', 1600));
  assert.equal(allow('scroll', 1700), false);
  assert(allow('deselect', 1750));
  assert.equal(allow('deselect', 1751), false);
  assert(allow('scroll', 2400));
});

test('one actual state transition selects a semantic cue and no-op actions stay silent', () => {
  const initial = { pressed: 'false', expanded: null, disclosure: undefined, dialog: '', drawer: false, destination: 'home' };
  assert.equal(soundForChange(initial, { ...initial }), null);
  const selected = { ...initial, pressed: 'true', destination: 'changed' };
  assert.equal(soundForChange(initial, selected), 'select');
  assert.equal(soundForChange(selected, initial), 'deselect');
  assert.equal(soundForChange(initial, { ...initial, disclosure: true }), 'open');
  assert.equal(soundForChange({ ...initial, disclosure: true }, { ...initial, disclosure: false }), 'close');
  assert.equal(soundForChange(initial, { ...initial, dialog: 'guide' }), 'open');
  assert.equal(soundForChange({ ...initial, dialog: 'guide' }, initial), 'close');
  assert.equal(soundForChange(initial, { ...initial, destination: 'next' }), 'navigate');
});
