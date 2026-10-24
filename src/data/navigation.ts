import type { IconName } from '../components/Icon.astro';
import { glossaryTopics } from './ai-glossary';

export interface NavigationNode {
  label: string;
  icon?: IconName;
  href?: string;
  module?: string;
  shared?: boolean;
  children?: NavigationNode[];
}

export const sharedFoundations: Record<string, NavigationNode> = Object.fromEntries([
  'Programming Fundamentals', 'Discrete Mathematics', 'Algebra and Functions',
  'Linear Algebra', 'Calculus', 'Probability Theory', 'Statistics',
].map(label => [label, { label, shared: true }]));
const foundation = (label: string): NavigationNode => {
  const node = sharedFoundations[label];
  if (!node) throw new Error(`Unknown shared foundation: ${label}`);
  return node;
};
const quantitativeFoundations = (): NavigationNode => ({
  label: 'Mathematical and Statistical Foundations',
  children: ['Algebra and Functions', 'Linear Algebra', 'Probability Theory', 'Statistics', 'Calculus'].map(foundation),
});

export const navigation: (NavigationNode & { icon: IconName })[] = [
  { label: 'Computer Systems', icon: 'cpu', children: [
    { label: 'Computing Fundamentals' },
    { label: 'Computer Architecture' }, { label: 'Operating Systems' },
    { label: 'Computer Networks' }, { label: 'Parallel Computing' },
    { label: 'Distributed Systems', href: '#distributed-systems/fundamentos' },
    { label: 'Cloud Computing' },
  ] },
  { label: 'Human-Computer Interaction', icon: 'interaction', children: [
    { label: 'Interaction Fundamentals' },
    { label: 'User Experience Design', href: '#ux-design/arquitectura-informacion', children: [
      { label: 'User Research' },
      { label: 'Information Architecture', module: 'arquitectura-informacion', href: '#ux-design/arquitectura-informacion' },
      { label: 'Interaction Design' },
    ] },
    { label: 'User Interface Design' },
    { label: 'Accessibility' },
    { label: 'Usability Evaluation' },
  ] },
  { label: 'Software Engineering', icon: 'blocks', children: [
    { label: 'Software Requirements' },
    { label: 'Software Development', children: [
      foundation('Programming Fundamentals'),
      { label: 'Programming Languages' },
      foundation('Discrete Mathematics'),
      { label: 'Data Structures' },
      { label: 'Algorithms' },
      { label: 'Frontend Development' }, { label: 'Backend Development' }, { label: 'Mobile Development' },
    ] },
    { label: 'Software Design', href: '#software-design/solid', children: [
      { label: 'SOLID Principles', module: 'solid', href: '#software-design/solid' },
      { label: 'Design Patterns', children: [
          { label: 'Creational', module: 'patrones', href: '#software-design/patrones' },
          { label: 'Structural', module: 'patrones-estructurales', href: '#software-design/patrones-estructurales' },
          { label: 'Behavioral', module: 'patrones-comportamiento', href: '#software-design/patrones-comportamiento' },
      ] },
      { label: 'API Design', children: [
        { label: 'REST API' }, { label: 'Webhook' },
        { label: 'GraphQL' }, { label: 'SOAP' },
        { label: 'WebSocket' }, { label: 'gRPC' },
      ] },
    ] },
    { label: 'Software Testing' }, { label: 'Software Quality' },
    { label: 'Software Architecture', href: '#software-architecture/estilos-arquitectura', children: [
      { label: 'Architectural Styles', children: [
        { label: 'Monolithic' },
        { label: 'REST' },
        { label: 'Event-Driven' },
        { label: 'Microservices' },
      ] },
      { label: 'Architectural Patterns', children: [
        { label: 'MVC' },
        { label: 'Hexagonal' },
      ] },
    ] },
    { label: 'System Design', href: '#system-design/sd-fundamentals' },
    { label: 'Software Engineering Operations' }, { label: 'Software Maintenance' },
  ] },
  { label: 'Data Management and Engineering', icon: 'workflow', children: [
    { label: 'Data Management', children: [
      { label: 'Databases', children: [
        { label: 'Database Fundamentals' },
        { label: 'Data Modeling' },
        { label: 'Relational Databases', children: [
          { label: 'SQL' },
        ] },
        { label: 'Non-Relational Databases', children: [
          { label: 'Key-Value Databases' }, { label: 'Document Databases' },
          { label: 'Wide-Column Databases' }, { label: 'Graph Databases' },
        ] },
        { label: 'Transactions' }, { label: 'Indexes and Query Optimization' },
        { label: 'Vector Search' },
      ] },
    ] },
    { label: 'Data Engineering', children: [
      { label: 'Data Ingestion' }, { label: 'Data Transformation' },
      { label: 'Data Pipelines', children: [
        { label: 'Batch Processing' }, { label: 'Stream Processing' },
      ] },
      { label: 'Data Quality and Governance' },
    ] },
  ] },
  { label: 'Cybersecurity', icon: 'shield', children: [
    { label: 'Security Fundamentals' },
    { label: 'Cryptography', children: [foundation('Discrete Mathematics')] },
    { label: 'Application Security' }, { label: 'Network Security' },
    { label: 'Data Security' }, { label: 'Cloud Security' },
  ] },
  { label: 'Data Science', icon: 'science', children: [
    foundation('Programming Fundamentals'),
    quantitativeFoundations(),
    { label: 'Data Analytics', children: [
      { label: 'Data Preparation' }, { label: 'Exploratory Data Analysis' },
      { label: 'Data Visualization' },
    ] },
    { label: 'Data Mining' },
  ] },
  { label: 'Artificial Intelligence', icon: 'brain', children: [
    foundation('Programming Fundamentals'),
    quantitativeFoundations(),
    { label: 'Artificial Intelligence Fundamentals', children: [
      { label: 'Search and Planning' }, { label: 'Knowledge Representation and Reasoning' },
    ] },
    { label: 'Machine Learning', children: [
      { label: 'Supervised Learning' }, { label: 'Unsupervised Learning' },
      { label: 'Model Evaluation' }, { label: 'Deep Learning' },
      { label: 'Reinforcement Learning' },
    ] },
    { label: 'Natural Language Processing' }, { label: 'Computer Vision' },
    { label: 'Generative Artificial Intelligence', children: [
      { label: 'Generative AI Applications', href: '#applied-ai/ai-fundamentos', children: glossaryTopics.map(topic => ({
        label: topic.en, module: topic.id, href: `#applied-ai/${topic.id}`,
      })) },
    ] },
  ] },
];
