import { computerSystemsDescriptions } from '../../features/computer-systems/data/section-descriptions';
import { cybersecurityDescriptions } from '../../features/cybersecurity/data/section-descriptions';
import { humanComputerInteractionDescriptions } from '../../features/human-computer-interaction/data/section-descriptions';
import { softwareEngineeringSectionDescriptions } from '../../features/software-engineering/data/section-descriptions';
import { dataTechnologiesDescriptions } from '../../features/data-technologies/data/section-descriptions';
import { artificialIntelligenceDescriptions } from '../../features/artificial-intelligence/data/section-descriptions';

export const navigationDescriptions: Record<string, Record<string, { es: string; en: string }>> = {
  'Computer Systems': computerSystemsDescriptions,
  Cybersecurity: cybersecurityDescriptions,
  'Human-Computer Interaction': humanComputerInteractionDescriptions,
  'Software Engineering': softwareEngineeringSectionDescriptions,
  'Data Technologies': dataTechnologiesDescriptions,
  'Artificial Intelligence': artificialIntelligenceDescriptions,
};

export function describeNavigation(label: string, area: string) {
  const description = navigationDescriptions[area]?.[label]
    ?? dataTechnologiesDescriptions[label]
    ?? softwareEngineeringSectionDescriptions[label];
  if (!description) throw new Error(`Missing navigation description: ${area}/${label}`);
  return description;
}
