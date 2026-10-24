export const preferenceKeys = {
  progress: 'tech-training:v1',
  navigation: 'tech-training:navigation:v1',
  language: 'tech-training:language:v1',
  careerStage: 'tech-training:career-stage:v1',
} as const;

type PreferenceStorage = Pick<Storage, 'getItem' | 'setItem'>;

function browserStorage(): PreferenceStorage | null {
  try { return globalThis.localStorage ?? null; }
  catch { return null; }
}

export function readPreference(key: string, storage = browserStorage()): string | null {
  try { return storage?.getItem(key) ?? null; }
  catch { return null; }
}

export function writePreference(key: string, value: string, storage = browserStorage()): boolean {
  if (!storage) return false;
  try {
    storage.setItem(key, value);
    return true;
  } catch { return false; }
}

export function parseStoredJson(value: string | null): unknown {
  if (value === null) return undefined;
  try { return JSON.parse(value); }
  catch { return undefined; }
}

export function readJsonPreference(key: string, storage = browserStorage()): unknown {
  return parseStoredJson(readPreference(key, storage));
}

export function restoreKnownIds(value: unknown, validIds: ReadonlySet<string>, migrate = (id: string) => id): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is string => typeof id === 'string').map(migrate).filter(id => validIds.has(id)))];
}

export function restoreLearnedIds(value: unknown, validIds: ReadonlySet<string>): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  return restoreKnownIds((value as Record<string, unknown>).learned, validIds);
}

export function restoreCareerStage(value: unknown, validIds: ReadonlySet<string>, fallback: string): string | null {
  return value === null || typeof value === 'string' && validIds.has(value) ? value : fallback;
}
