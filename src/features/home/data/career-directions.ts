import { navigation } from '../../../app/data/navigation';

export interface CareerDirection {
  id: string;
  label: string;
  profileIds: readonly string[];
}

const directionProfiles: Record<string, Omit<CareerDirection, 'label'>> = {
  'Computer Systems': {
    id: 'infrastructure-platforms',
    profileIds: ['it-support-specialist', 'systems-administrator', 'network-engineer', 'cloud-engineer', 'devops', 'site-reliability-engineer', 'platform-engineer'],
  },
  Cybersecurity: {
    id: 'cybersecurity',
    profileIds: ['security-analyst', 'soc-analyst', 'grc-analyst', 'security-engineer', 'application-security-engineer', 'cloud-security-engineer', 'penetration-tester', 'detection-engineer'],
  },
  'Human-Computer Interaction': {
    id: 'ux-design',
    profileIds: ['ui-designer', 'ux-writer', 'information-architect', 'ux-ui-designer', 'ux-researcher', 'ux-designer', 'product-designer', 'content-strategist', 'ux-strategist'],
  },
  'Software Engineering': {
    id: 'software-development',
    profileIds: ['software-engineer', 'product-engineer', 'business-analyst', 'qa-engineer', 'frontend', 'backend', 'full-stack', 'mobile', 'desktop', 'game-developer', 'embedded-software', 'iot-developer', 'software-architect'],
  },
  Data: {
    id: 'data-engineering',
    profileIds: ['data-analyst', 'business-intelligence-developer', 'analytics-engineer', 'data-engineer', 'data-scientist'],
  },
  'Artificial Intelligence': {
    id: 'data-ai',
    profileIds: ['artificial-intelligence', 'machine-learning-engineer', 'mlops-engineer', 'research-engineer', 'research-scientist'],
  },
};

export const careerDirections: readonly CareerDirection[] = navigation.map(node => {
  const direction = directionProfiles[node.id ?? node.label];
  if (!direction) throw new Error(`Missing career profiles for navigation area: ${node.label}`);
  return { ...direction, label: node.label };
});
