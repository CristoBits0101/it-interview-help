import type { ConceptSource } from '../data/concept-sources';
import type { LocalizedText } from './localized-text';

type DiagramPart = { title: LocalizedText; text: LocalizedText; code?: string };
type GuideItem = { title: LocalizedText; description: LocalizedText; code?: string; source: ConceptSource };
type GuideGroup = { title: LocalizedText; description: LocalizedText; question?: boolean; items: GuideItem[] };

export type FoundationGuide = {
  route: string;
  label: string;
  title: LocalizedText;
  description: LocalizedText;
  separateIntroduction?: boolean;
  diagram: DiagramPart[];
  concepts: { title: LocalizedText; description: LocalizedText; source?: ConceptSource }[];
  questions: { prompt: LocalizedText; answer: LocalizedText }[];
  sections?: (Omit<GuideGroup, 'description' | 'question'> & { description?: LocalizedText; groups?: GuideGroup[] })[];
  related: string[];
  source: ConceptSource;
};
