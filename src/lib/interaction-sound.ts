export type SoundCue = 'select' | 'deselect' | 'open' | 'close' | 'navigate' | 'type' | 'scroll';
export interface SoundPreference { enabled: boolean; volume: number }
export const soundPreferenceKey = 'tech-training:sound:v1';

export function restoreSoundPreference(value: unknown): SoundPreference {
  const stored = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
  return {
    enabled: stored.enabled === true,
    volume: typeof stored.volume === 'number' && Number.isFinite(stored.volume) ? Math.min(100, Math.max(0, Math.round(stored.volume))) : 30,
  };
}

export function createSoundGate() {
  let last = -Infinity;
  let lastAction = -Infinity;
  const times = { type: -Infinity, scroll: -Infinity };
  return (cue: SoundCue, now: number) => {
    if (now - last < 35) return false;
    if (cue === 'type' || cue === 'scroll') {
      if (now - times[cue] < (cue === 'type' ? 110 : 700)) return false;
      if (cue === 'scroll' && now - lastAction < 400) return false;
      times[cue] = now;
    } else lastAction = now;
    last = now;
    return true;
  };
}

export interface InteractionState {
  pressed: string | null;
  expanded: string | null;
  disclosure: boolean | undefined;
  dialog: string;
  drawer: boolean;
  destination: string;
}

export function soundForChange(before: InteractionState, after: InteractionState): SoundCue | null {
  if (before.pressed !== after.pressed) return after.pressed === 'true' ? 'select' : 'deselect';
  if (before.expanded !== after.expanded) return after.expanded === 'true' ? 'open' : 'close';
  if (before.disclosure !== after.disclosure) return after.disclosure ? 'open' : 'close';
  if (before.dialog !== after.dialog) return after.dialog ? 'open' : 'close';
  if (before.drawer !== after.drawer) return after.drawer ? 'open' : 'close';
  return before.destination !== after.destination ? 'navigate' : null;
}
