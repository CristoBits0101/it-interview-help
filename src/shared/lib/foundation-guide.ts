import type { ConceptSource } from '../data/concept-sources';
import type { LocalizedText } from './localized-text';

type DiagramPart = { title: LocalizedText; text: LocalizedText; code?: string };

export type FoundationGuide = {
  route: string;
  label: string;
  title: LocalizedText;
  description: LocalizedText;
  diagram: DiagramPart[];
  concepts: { title: LocalizedText; description: LocalizedText }[];
  questions: { prompt: LocalizedText; answer: LocalizedText }[];
  sections?: { title: LocalizedText; description: LocalizedText; items: { title: LocalizedText; description: LocalizedText; code?: string; source: ConceptSource }[] }[];
  related: string[];
  source: ConceptSource;
};
