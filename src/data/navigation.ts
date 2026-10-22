import type { IconName } from '../components/Icon.astro';

export interface NavigationNode {
  label: string;
  icon?: IconName;
  href?: string;
  module?: string;
  children?: NavigationNode[];
}

// Icons belong to their subject, never to an item's position in the menu.
export const navigation: (NavigationNode & { icon: IconName })[] = [
  { label: 'Mathematics', icon: 'sigma', children: [
    { label: 'Discrete Mathematics' }, { label: 'Linear Algebra' },
    { label: 'Calculus' }, { label: 'Probability Theory' },
  ] },
  { label: 'Statistics', icon: 'chart' },
  { label: 'Programming', icon: 'programming' },
  { label: 'Computer Systems', icon: 'cpu', children: [
    { label: 'Computer Architecture' }, { label: 'Operating Systems' },
    { label: 'Computer Networks' }, { label: 'Parallel Computing' },
    { label: 'Distributed Systems', href: '#distributed-systems/fundamentos' },
    { label: 'Cloud Computing' },
  ] },
  { label: 'Human-Computer Interaction', icon: 'interaction', children: [
    { label: 'User Research' },
    { label: 'Information Architecture', module: 'arquitectura-informacion', href: '#ux-design/arquitectura-informacion' },
    { label: 'Interaction Design' },
    { label: 'User Experience Design', href: '#ux-design/arquitectura-informacion' },
    { label: 'User Interface Design' },
  ] },
  { label: 'Software Engineering', icon: 'blocks', children: [
    { label: 'Software Requirements' },
    { label: 'Software Development', children: [
      { label: 'Frontend Development' }, { label: 'Backend Development' },
    ] },
    { label: 'Software Design', href: '#software-design/solid', children: [
      { label: 'SOLID Principles', module: 'solid', href: '#software-design/solid' },
      { label: 'Design Patterns', children: [
          { label: 'Creational', module: 'patrones', href: '#software-design/patrones' },
          { label: 'Structural', module: 'patrones-estructurales', href: '#software-design/patrones-estructurales' },
          { label: 'Behavioral', module: 'patrones-comportamiento', href: '#software-design/patrones-comportamiento' },
      ] },
      { label: 'API Design', children: [
        { label: 'REST API' },
      ] },
    ] },
    { label: 'Software Architecture', href: '#software-architecture/estilos-arquitectura', children: [
      { label: 'Architectural Styles', children: [
        { label: 'REST' },
        { label: 'Monolithic' },
        { label: 'Microservices' },
        { label: 'Event-Driven' },
      ] },
      { label: 'Architectural Patterns', children: [
        { label: 'MVC' },
        { label: 'Hexagonal' },
      ] },
    ] },
    { label: 'System Design', href: '#system-design/sd-fundamentals' },
    { label: 'Software Testing' }, { label: 'Software Quality' },
    { label: 'Software Engineering Operations' }, { label: 'Software Maintenance' },
  ] },
  { label: 'Data Management', icon: 'database', children: [
    { label: 'Databases', children: [
      { label: 'Relational Databases' },
      { label: 'Non-Relational Databases', children: [
        { label: 'Key-Value Databases' }, { label: 'Document Databases' },
        { label: 'Wide-Column Databases' }, { label: 'Graph Databases' },
      ] },
      { label: 'Vector Databases' },
    ] },
  ] },
  { label: 'Data Engineering', icon: 'workflow' },
  { label: 'Cybersecurity', icon: 'shield', children: [
    { label: 'Application Security' }, { label: 'Network Security' },
    { label: 'Cloud Security' }, { label: 'Data Security' },
  ] },
  { label: 'Data Science', icon: 'science', children: [
    { label: 'Data Analytics' }, { label: 'Data Mining' }, { label: 'Data Visualization' },
  ] },
  { label: 'Artificial Intelligence', icon: 'brain', children: [
    { label: 'Machine Learning', children: [{ label: 'Deep Learning' }] },
    { label: 'Natural Language Processing' }, { label: 'Computer Vision' },
    { label: 'Generative Artificial Intelligence' },
    { label: 'Applied Artificial Intelligence', href: '#applied-ai/ai-fundamentos' },
  ] },
];
