import { soundPreferenceKey } from './interaction-sound';
import { lastVisitedRouteKey } from './preferences-return';

export const preferenceKeys = {
  progress: 'tech-training:v1',
  navigation: 'tech-training:navigation:v1',
  language: 'tech-training:language:v1',
  careerStage: 'tech-training:career-stage:v1',
} as const;
export const storageConsentKey = 'tech-training:storage-consent:v1';
export type StorageConsent = 'accepted' | 'rejected' | null;
type PreferenceStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
const ownedKeys = [...Object.values(preferenceKeys), soundPreferenceKey, lastVisitedRouteKey];

function browserStorage(session = false): PreferenceStorage | null {
  try { return (session ? globalThis.sessionStorage : globalThis.localStorage) ?? null; }
  catch { return null; }
}

export function createPreferenceStore(local: () => PreferenceStorage | null, session: () => PreferenceStorage | null = () => null) {
  const memory = [new Map<string, string | null>(), new Map<string, string | null>()];
  let initialized = false;
  let decisionPending = false;
  let consent: StorageConsent = null;
  let needsCleanup = false;
  const storage = (temporary: boolean) => {
    try { return (temporary ? session : local)(); }
    catch { return null; }
  };
  const cleanup = () => {
    let success = true;
    for (const temporary of [false, true]) {
      const target = storage(temporary);
      if (!target) { success = false; continue; }
      for (const key of ownedKeys) {
        try { target.removeItem(key); }
        catch { success = false; }
      }
    }
    needsCleanup = !success;
    return success;
  };
  const getConsent = (): StorageConsent => {
    if (!initialized || !decisionPending) {
      const previous = consent;
      initialized = true;
      try {
        const saved = storage(false)?.getItem(storageConsentKey);
        consent = saved === 'accepted' || saved === 'rejected' ? saved : null;
      } catch {}
      if (consent === 'rejected' && previous !== 'rejected') { needsCleanup = true; cleanup(); }
    }
    return consent;
  };
  const saveDecision = () => {
    if (consent === null) return false;
    try {
      const target = storage(false);
      if (!target) return false;
      target.setItem(storageConsentKey, consent);
      decisionPending = false;
      return true;
    } catch { return false; }
  };
  const read = (key: string, temporary = false): string | null => {
    const decision = getConsent();
    const allowed = decision === 'accepted' || decision === null && key === preferenceKeys.language && !temporary;
    const cache = memory[Number(temporary)];
    if (cache.has(key)) return cache.get(key) ?? null;
    let value = null;
    if (allowed) {
      try { value = storage(temporary)?.getItem(key) ?? null; }
      catch {}
    }
    cache.set(key, value);
    return value;
  };
  const flush = () => {
    if (consent !== 'accepted') return true;
    if (needsCleanup && !cleanup()) return false;
    if (decisionPending && !saveDecision()) return false;
    let success = true;
    for (const temporary of [false, true]) {
      const cache = memory[Number(temporary)];
      if (!cache.size) continue;
      const target = storage(temporary);
      if (!target) { success = false; continue; }
      for (const [key, value] of cache) {
        try { if (value === null) target.removeItem(key); else target.setItem(key, value); }
        catch { success = false; }
      }
    }
    return success;
  };
  const write = (key: string, value: string, temporary = false) => {
    getConsent();
    memory[Number(temporary)].set(key, value);
    if (consent === 'rejected') { if (decisionPending) saveDecision(); if (needsCleanup) cleanup(); }
    return flush();
  };
  const decide = (next: Exclude<StorageConsent, null>, preserveExisting = false) => {
    const previous = getConsent();
    consent = next;
    decisionPending = true;
    if (next === 'rejected') {
      needsCleanup = true;
      const saved = saveDecision();
      const cleaned = cleanup();
      return saved && cleaned;
    }
    if (preserveExisting && previous === null) {
      memory.forEach(cache => cache.clear());
      return saveDecision();
    }
    if (previous !== 'accepted') needsCleanup = true;
    return flush();
  };
  return { getConsent, read, write, decide };
}

const preferences = createPreferenceStore(() => browserStorage(), () => browserStorage(true));
export const getStorageConsent = preferences.getConsent;
export const setStorageConsent = preferences.decide;
export const readPreference = preferences.read;
export const writePreference = preferences.write;
export function readJsonPreference(key: string): unknown { return parseStoredJson(preferences.read(key)); }
export function readSessionJsonPreference(key: string): unknown { return parseStoredJson(preferences.read(key, true)); }
export function writeSessionPreference(key: string, value: string): boolean { return preferences.write(key, value, true); }

export function parseStoredJson(value: string | null): unknown {
  if (value === null) return undefined;
  try { return JSON.parse(value); }
  catch { return undefined; }
}

export function restoreKnownIds(value: unknown, validIds: ReadonlySet<string>, migrate = (id: string) => id): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is string => typeof id === 'string').map(migrate).filter(id => validIds.has(id)))];
}

export function restoreLearnedIds(value: unknown, validIds: ReadonlySet<string>): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  return restoreKnownIds((value as Record<string, unknown>).learned, validIds);
}

export function restoreCareerStage(value: unknown, validIds: ReadonlySet<string>, fallback: string | null): string | null {
  return value === null || typeof value === 'string' && validIds.has(value) ? value : fallback;
}
