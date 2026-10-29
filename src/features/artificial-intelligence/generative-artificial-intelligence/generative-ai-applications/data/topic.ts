import type { Concept } from '../../../../../shared/lib/curriculum';
import type { glossarySources } from '../../../../../shared/data/concept-sources';

export type Entry = [id: string, es: string, en: string, explanation: string, english: string, source: keyof typeof glossarySources, level?: Concept['level']];
export type Topic = { id: string; es: string; en: string; entries: Entry[] };
