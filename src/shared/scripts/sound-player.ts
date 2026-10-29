import { createSoundGate, type SoundCue } from '../lib/interaction-sound';

const clips = { click: 'click_002', off: 'select_002', select: 'select_001', open: 'open_001', close: 'close_001', tick: 'tick_001' } as const;
const cues = {
  select: ['select', 0.035, 0.8], deselect: ['off', 0.03, 0.7],
  open: ['open', 0.035, 0.55], close: ['close', 0.03, 0.5],
  navigate: ['tick', 0.018, 0.5], type: ['click', 0.008, 0.35], scroll: ['tick', 0.012, 0.2],
} as const;

type Voice = { source: AudioBufferSourceNode; envelope: GainNode; start: number; end: number; cue: SoundCue };

export function createSoundPlayer(onUnavailable: () => void) {
  let context: AudioContext | undefined;
  let master: GainNode | undefined;
  let loading: Promise<void> | undefined;
  let enabled = false;
  let volume = 30;
  let generation = 0;
  let voice: Voice | undefined;
  let fadingUntil = 0;
  const sources = new Set<AudioBufferSourceNode>();
  const buffers = new Map<string, AudioBuffer>();
  const allow = createSoundGate();

  const stop = () => {
    generation++;
    if (master && context) master.gain.setValueAtTime(0, context.currentTime);
    sources.forEach(source => { try { source.stop(); } catch {} });
    sources.clear();
    fadingUntil = 0;
    voice = undefined;
  };
  const setVolume = (value: number) => {
    volume = value;
    if (volume === 0) stop();
    if (master && context) master.gain.setValueAtTime(enabled ? volume / 100 * 0.18 : 0, context.currentTime);
  };
  const prepare = async () => {
    if (!context) {
      context = new AudioContext({ latencyHint: 'interactive' });
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
      const original = await context!.decodeAudioData(await response.arrayBuffer());
      let first = 0;
      while (first < original.length && Array.from({ length: original.numberOfChannels }, (_, channel) => Math.abs(original.getChannelData(channel)[first])).every(value => value < 0.008)) first++;
      const length = Math.min(original.length - first, Math.floor(original.sampleRate * 0.035));
      if (length < 1) throw new Error('Empty audio');
      const buffer = context!.createBuffer(original.numberOfChannels, length, original.sampleRate);
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) buffer.copyToChannel(original.getChannelData(channel).subarray(first, first + length), channel);
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
    const [id, maximum, gain] = cues[cue];
    const buffer = buffers.get(id);
    if (!buffer) return;
    const now = context.currentTime;
    const secondary = cue === 'type' || cue === 'scroll';
    if (secondary && voice && voice.end > now && voice.cue !== 'type' && voice.cue !== 'scroll') return;
    if (!allow(cue, performance.now())) return;
    let start = Math.max(now, fadingUntil);
    if (voice && voice.end > now) {
      const end = voice.start > now ? now : Math.min(voice.end, now + 0.002);
      voice.envelope.gain.cancelAndHoldAtTime(now);
      voice.envelope.gain.linearRampToValueAtTime(0, end);
      voice.source.stop(end);
      fadingUntil = Math.max(fadingUntil, end);
      start = Math.max(start, end);
    }
    const source = context.createBufferSource();
    const envelope = context.createGain();
    const duration = Math.min(buffer.duration, maximum);
    source.buffer = buffer;
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(gain, start + Math.min(0.002, duration / 4));
    envelope.gain.setValueAtTime(gain, start + Math.max(duration / 2, duration - 0.005));
    envelope.gain.linearRampToValueAtTime(0, start + duration);
    source.connect(envelope).connect(master);
    const currentVoice = { source, envelope, start, end: start + duration, cue };
    voice = currentVoice;
    sources.add(source);
    source.onended = () => { sources.delete(source); if (voice === currentVoice) voice = undefined; source.disconnect(); envelope.disconnect(); };
    source.start(start);
    source.stop(start + duration);
  };
  return {
    enable, play, setVolume, stop,
    disable() { enabled = false; stop(); void context?.suspend().catch(() => undefined); },
  };
}
