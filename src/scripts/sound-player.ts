import { createSoundGate, type SoundCue } from '../lib/interaction-sound';

const clips = { click: 'click_002', off: 'select_002', select: 'select_001', open: 'open_001', close: 'close_001', tick: 'tick_001' } as const;
const cues = {
  select: ['select', 1, 0.8], deselect: ['off', 0.9, 0.7],
  open: ['open', 0.94, 0.55], close: ['close', 0.94, 0.5],
  navigate: ['tick', 0.9, 0.5], type: ['click', 0.8, 0.4], scroll: ['tick', 0.85, 0.25],
} as const;

export function createSoundPlayer(onUnavailable: () => void) {
  let context: AudioContext | undefined;
  let master: GainNode | undefined;
  let loading: Promise<void> | undefined;
  let enabled = false;
  let volume = 30;
  let generation = 0;
  const buffers = new Map<string, AudioBuffer>();
  const active = new Set<AudioBufferSourceNode>();
  const allow = createSoundGate();

  const stop = () => {
    generation++;
    if (master && context) master.gain.setValueAtTime(0, context.currentTime);
    active.forEach(source => { try { source.stop(); } catch {} });
    active.clear();
  };
  const setVolume = (value: number) => {
    volume = value;
    if (volume === 0) stop();
    if (master && context) master.gain.setValueAtTime(enabled ? volume / 100 * 0.18 : 0, context.currentTime);
  };
  const prepare = async () => {
    if (!context) {
      context = new AudioContext();
      master = context.createGain();
      const filter = context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2400;
      master.connect(filter).connect(context.destination);
    }
    if (context.state === 'suspended') await context.resume();
    setVolume(volume);
    if (!loading) loading = Promise.all(Object.entries(clips).map(async ([id, filename]) => {
      if (buffers.has(id)) return;
      const response = await fetch(`/audio/interface/${filename}.ogg`);
      if (!response.ok) throw new Error('Audio unavailable');
      const buffer = await context!.decodeAudioData(await response.arrayBuffer());
      buffers.set(id, buffer);
    })).then(() => undefined).catch(error => { loading = undefined; throw error; });
    await loading;
  };
  const enable = async () => {
    enabled = true;
    const current = ++generation;
    try { await prepare(); }
    catch {
      if (generation === current && enabled) { enabled = false; stop(); onUnavailable(); }
    }
  };
  const play = (cue: SoundCue) => {
    if (!enabled || volume === 0 || !context || !master || context.state !== 'running' || document.hidden) return;
    if ((cue === 'type' || cue === 'scroll') && active.size > 0) return;
    if (active.size >= 3) { const oldest = active.values().next().value; oldest?.stop(); if (oldest) active.delete(oldest); }
    const [id, rate, gain] = cues[cue];
    const buffer = buffers.get(id);
    if (!buffer || !allow(cue, performance.now())) return;
    const source = context.createBufferSource();
    const envelope = context.createGain();
    const duration = Math.min(buffer.duration / rate, cue === 'type' || cue === 'scroll' ? 0.085 : 0.18);
    const now = context.currentTime;
    source.buffer = buffer;
    source.playbackRate.value = rate;
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(gain, now + 0.004);
    envelope.gain.setValueAtTime(gain, now + Math.max(0.004, duration - 0.025));
    envelope.gain.linearRampToValueAtTime(0, now + duration);
    source.connect(envelope).connect(master);
    active.add(source);
    source.onended = () => { active.delete(source); source.disconnect(); envelope.disconnect(); };
    source.start(now);
    source.stop(now + duration);
  };
  return {
    enable, play, setVolume, stop,
    disable() { enabled = false; stop(); void context?.suspend().catch(() => undefined); },
  };
}
