export interface CareerDirection {
  id: string;
  label: string;
  profileIds: readonly string[];
}

export const careerDirections: readonly CareerDirection[] = [
  {
    id: 'software-development',
    label: 'Software Development',
    profileIds: ['frontend', 'backend', 'full-stack', 'mobile', 'desktop', 'game-developer', 'embedded-software', 'iot-developer'],
  },
  {
    id: 'infrastructure-platforms',
    label: 'IT Infrastructure',
    profileIds: ['devops'],
  },
  {
    id: 'data-ai',
    label: 'Artificial Intelligence',
    profileIds: ['artificial-intelligence'],
  },
  {
    id: 'data-science',
    label: 'Data Science',
    profileIds: ['data-scientist'],
  },
  {
    id: 'data-engineering',
    label: 'Data Engineering',
    profileIds: ['data-engineer'],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    profileIds: ['security-engineer'],
  },
  {
    id: 'software-quality',
    label: 'Software Quality',
    profileIds: ['qa-engineer'],
  },
  {
    id: 'ux-design',
    label: 'UX Design',
    profileIds: ['ux-designer'],
  },
  {
    id: 'architecture',
    label: 'Software Architecture',
    profileIds: ['software-architect'],
  },
  {
    id: 'product-analysis',
    label: 'Business Analysis',
    profileIds: ['business-analyst'],
  },
];
