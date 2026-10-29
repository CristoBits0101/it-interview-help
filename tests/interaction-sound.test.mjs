import assert from 'node:assert/strict';
import test from 'node:test';
import { restoreSoundPreference, createSoundGate, soundForChange } from '../src/shared/lib/interaction-sound.ts';

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
  assert(typing <= 19);
  assert(allow('select', 1100));
  assert.equal(allow('scroll', 1120), false);
  assert(allow('scroll', 1600));
  assert.equal(allow('scroll', 1700), false);
  assert(allow('deselect', 1750));
  assert(allow('deselect', 1751));
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


test('player drops unloaded cues, interrupts without overlap and keeps important actions above secondary input', async () => {
  const { createSoundPlayer } = await import('../src/shared/scripts/sound-player.ts');
  const original = { AudioContext: globalThis.AudioContext, fetch: globalThis.fetch, document: globalThis.document };
  const starts = [];
  let resume;
  let context;
  let requests = 0;
  const parameter = () => ({ value: 0, setValueAtTime() {}, linearRampToValueAtTime() {}, cancelAndHoldAtTime() {} });
  const node = () => ({ gain: parameter(), frequency: parameter(), connect(target) { return target; }, disconnect() {} });
  class Context {
    currentTime = 1;
    state = 'suspended';
    destination = {};
    constructor(options) { assert.equal(options.latencyHint, 'interactive'); context = this; }
    resume() { return new Promise(resolve => { resume = () => { this.state = 'running'; resolve(); }; }); }
    suspend() { this.state = 'suspended'; return Promise.resolve(); }
    createGain() { return node(); }
    createBiquadFilter() { return node(); }
    createBuffer(channels, length, sampleRate) {
      return { numberOfChannels: channels, length, sampleRate, duration: length / sampleRate, copyToChannel() {}, getChannelData: () => new Float32Array(length).fill(0.1) };
    }
    async decodeAudioData() { return this.createBuffer(1, 7104, 48000); }
    createBufferSource() {
      return { ...node(), start(time) { this.begin = time; starts.push(this); }, stop(time = context.currentTime) { this.end = time; } };
    }
  }
  globalThis.AudioContext = Context;
  globalThis.document = { hidden: false };
  globalThis.fetch = async () => { requests++; return { ok: true, arrayBuffer: async () => new ArrayBuffer(0) }; };
  try {
    const player = createSoundPlayer(() => assert.fail('audio unavailable'));
    assert.equal(requests, 0);
    const enabling = player.enable();
    player.play('open');
    assert.equal(starts.length, 0);
    resume();
    await enabling;
    assert.equal(requests, 6);
    assert.equal(starts.length, 0);
    player.play('open');
    player.play('type');
    player.play('scroll');
    assert.equal(starts.length, 1);
    context.currentTime += 0.001;
    player.play('close');
    player.play('select');
    const intervals = starts.filter(source => source.end > source.begin).sort((a, b) => a.begin - b.begin);
    for (let index = 1; index < intervals.length; index++) assert(intervals[index].begin >= intervals[index - 1].end);
    assert(starts.every(source => source.buffer.duration <= 0.035));
    player.setVolume(0);
    assert(starts.every(source => source.end <= context.currentTime));
    player.play('open');
    assert.equal(starts.length, 3);
    player.setVolume(30);
    await player.enable();
    assert.equal(requests, 6);
    player.disable();
    player.play('open');
    assert.equal(starts.length, 3);
  } finally {
    Object.assign(globalThis, original);
  }
});
