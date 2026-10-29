import type { LocalizedText } from './localized-text';
import type { ConceptSource } from '../data/concept-sources';

export type ReferenceComparison = {
  id: string;
  label: string;
  title: LocalizedText;
  description: LocalizedText;
  example?: { tables: { title: string; columns: string[]; rows: (string | number)[][] }[]; code: string };
  columns: { title: string; steps: LocalizedText[]; code?: string }[];
  rows: { title: LocalizedText; values: [LocalizedText, LocalizedText] }[];
  tips: LocalizedText[];
  question: LocalizedText;
  answer: LocalizedText;
  sources: ConceptSource[];
};
