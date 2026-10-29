import type { LocalizedText } from '../../../../../../shared/lib/localized-text';
import { javaEcosystemSources } from '../../../../../../shared/data/concept-sources';

export type JavaTechnology = {
  id: string;
  name: string;
  need: LocalizedText;
  outcome: LocalizedText;
  sourceIds: (keyof typeof javaEcosystemSources)[];
};
