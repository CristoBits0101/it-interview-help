import { navigation } from './navigation';

export interface CareerDirection {
  id: string;
  label: string;
  profileIds: readonly string[];
}

const directionProfiles: Record<string, Omit<CareerDirection, 'label'>> = {
  'Computer Systems': {
    id: 'infrastructure-platforms',
    profileIds: ['systems-administrator', 'it-support-specialist', 'network-engineer', 'cloud-engineer', 'devops', 'site-reliability-engineer', 'platform-engineer'],
  },
  Cybersecurity: {
    id: 'cybersecurity',
    profileIds: ['security-engineer', 'security-analyst', 'soc-analyst', 'grc-analyst', 'application-security-engineer', 'cloud-security-engineer', 'penetration-tester', 'detection-engineer'],
  },
  'Human-Computer Interaction': {
    id: 'ux-design',
    profileIds: ['product-designer', 'ux-designer', 'ui-designer', 'ux-researcher', 'ux-ui-designer'],
  },
  'Software Engineering': {
    id: 'software-development',
    profileIds: ['software-engineer', 'backend', 'full-stack', 'frontend', 'mobile', 'qa-engineer', 'desktop', 'game-developer', 'embedded-software', 'iot-developer', 'software-architect', 'business-analyst'],
  },
  Data: {
    id: 'data-engineering',
    profileIds: ['data-engineer', 'data-analyst', 'business-intelligence-developer', 'data-scientist', 'analytics-engineer'],
  },
  'Artificial Intelligence': {
    id: 'data-ai',
    profileIds: ['machine-learning-engineer', 'mlops-engineer', 'artificial-intelligence'],
  },
};

export const careerDirections: readonly CareerDirection[] = navigation.map(node => {
  const direction = directionProfiles[node.id ?? node.label];
  if (!direction) throw new Error(`Missing career profiles for navigation area: ${node.label}`);
  return { ...direction, label: node.label };
});
