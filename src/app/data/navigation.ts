import type { IconName } from '../../shared/components/primitives/Icon.astro';
import { softwareEngineeringSectionDescriptions } from '../../features/software-engineering/data/section-descriptions';
import { glossaryTopics } from '../../features/artificial-intelligence/generative-artificial-intelligence/generative-ai-applications/data/ai-glossary';
import { javaGuidePages } from '../../features/software-engineering/software-development/programming-languages/java/data/navigation';
import { itServiceManagement } from '../../features/computer-systems/it-service-management/data/pending-navigation';

export interface NavigationNode {
  label: string;
  description?: string;
  id?: string;
  icon?: IconName;
  href?: string;
  module?: string;
  shared?: boolean;
  separatorBefore?: boolean;
  group?: boolean;
  overviewArea?: boolean;
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
  children: ['Discrete Mathematics', 'Algebra and Functions', 'Linear Algebra', 'Probability Theory', 'Statistics', 'Calculus'].map(foundation),
});

export const navigation: (NavigationNode & { icon: IconName })[] = [
  { label: 'Computer Systems', icon: 'cpu', children: [
    { label: 'Computing Fundamentals' },
    { label: 'Computer Architecture' }, { label: 'Operating Systems', children: [{ label: 'Buffer', href: '#computer-systems/buffer' }] },
    { label: 'Computer Networks', children: [{ label: 'HTTP Protocol', href: '#computer-networks/http' }] }, { label: 'Parallel Computing' },
    { label: 'Distributed Systems', href: '#distributed-systems/fundamentos' },
    { label: 'Cloud Computing' },
    itServiceManagement,
  ] },
  { label: 'Cybersecurity', icon: 'shield', children: [
    { label: 'Security Fundamentals' },
    { label: 'Cryptography', children: [foundation('Discrete Mathematics')] },
    { label: 'Application Security' }, { label: 'Network Security' },
    { label: 'Data Security' }, { label: 'Cloud Security' },
  ] },
  { label: 'Human-Computer Interaction', icon: 'interaction', separatorBefore: true, children: [
    { label: 'Interaction Fundamentals' },
    { label: 'Accessibility' },
    { label: 'User Experience Design', href: '#ux-design/arquitectura-informacion', children: [
      { label: 'User Research' },
      { label: 'Information Architecture', module: 'arquitectura-informacion', href: '#ux-design/arquitectura-informacion' },
      { label: 'Interaction Design' },
    ] },
    { label: 'User Interface Design' },
    { label: 'Usability Evaluation' },
  ] },
  { label: 'Software Engineering', icon: 'blocks', children: [
    { label: 'Software Requirements' },
    { label: 'Software Engineering Methods', children: [
      { label: 'Heuristic Methods' }, { label: 'Formal Methods' },
      { label: 'Prototyping Methods' }, { label: 'Agile Methods' },
    ] },
    { label: 'System Design', href: '#system-design/sd-fundamentals' },
    { label: 'Software Architecture', href: '#software-architecture/estilos-arquitectura', children: [
      { label: 'Architectural Styles', children: [
        { label: 'Monolithic' },
        { label: 'REST', href: '#software-architecture/rest' },
        { label: 'Event-Driven' },
        { label: 'Microservices' },
      ] },
      { label: 'Architectural Patterns', children: [
        { label: 'MVC' },
        { label: 'Hexagonal' },
      ] },
    ] },
    { label: 'Software Design', href: '#software-design/solid', children: [
      { label: 'SOLID Principles', module: 'solid', href: '#software-design/solid' },
      { label: 'Design Patterns', children: [
          { label: 'Creational', module: 'patrones', href: '#software-design/patrones' },
          { label: 'Structural', module: 'patrones-estructurales', href: '#software-design/patrones-estructurales' },
          { label: 'Behavioral', module: 'patrones-comportamiento', href: '#software-design/patrones-comportamiento' },
      ] },
      { label: 'API Design', children: [
        { label: 'REST API', href: '#api-design/rest-api' }, { label: 'Webhook' },
        { label: 'GraphQL' }, { label: 'SOAP' },
        { label: 'WebSocket' }, { label: 'gRPC' },
      ] },
    ] },
    { label: 'Software Development', children: [
      { label: 'Programming Languages', children: [
        { label: 'C' }, { label: 'C++' }, { label: 'C#' }, { label: 'Go' },
        { label: 'JavaScript' }, { label: 'Kotlin' }, { label: 'PHP' },
        { label: 'Ruby' }, { label: 'Rust' }, { label: 'Swift' },
        { label: 'Java', children: [
          { label: 'Language Overview', children: [
            { label: 'Version History', href: '#java/versions' },
            ...javaGuidePages,
          ] },
          { label: 'Developer Roadmap', children: [
            { label: 'Programming Fundamentals' },
            { label: 'Data Structures' }, { label: 'Algorithms' },
          ] },
        ] }, { label: 'Python', children: [{ label: 'Language Overview', children: [
          { label: 'Version History' }, { label: 'Ecosystem' }, { label: 'Career Paths' },
        ] }, { label: 'Developer Roadmap', children: [
          { label: 'Programming Fundamentals' }, { label: 'Data Structures' }, { label: 'Algorithms' },
        ] }] },
        { label: 'TypeScript', children: [{ label: 'Language Overview', children: [
          { label: 'Version History' }, { label: 'Ecosystem' }, { label: 'Career Paths' },
        ] }, { label: 'Developer Roadmap', children: [
          { label: 'Programming Fundamentals' }, { label: 'Data Structures' }, { label: 'Algorithms' },
        ] }] },
      ] },
      { label: 'Runtimes', children: [{ label: 'Node.js' }] },
      { label: 'Development Domains', children: [
        { label: 'Desktop Development' },
        { label: 'Embedded Software Development' },
        { label: 'Game Development' },
        { label: 'IoT Development' },
        { label: 'Mobile Development' },
        { label: 'Web Development', children: [
          { label: 'Web Rendering', href: '#software-development/web-rendering' },
        ] },
      ] },
    ] },
    { label: 'Software Testing' }, { label: 'Software Quality' },
    { label: 'Software Engineering Operations' }, { label: 'Software Maintenance' },
  ].map(node => ({ ...node, description: softwareEngineeringSectionDescriptions[node.label]?.es })) },
  { label: 'Data Technologies', id: 'Data', icon: 'database', separatorBefore: true, group: true, children: [
    { label: 'Data Engineering', icon: 'workflow', children: [
      { label: 'Database Management', children: [
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
      { label: 'Data Integration', children: [
        { label: 'Data Ingestion' }, { label: 'Data Transformation' },
        { label: 'Data Pipelines', children: [
          { label: 'Batch Processing' }, { label: 'Stream Processing' },
        ] },
        { label: 'Data Quality and Governance' },
      ] },
      { label: 'Big Data' },
    ] },
    { label: 'Data Analytics', overviewArea: false, children: [
      { label: 'Data Preparation' }, { label: 'Exploratory Data Analysis' },
      { label: 'Data Visualization' },
    ] },
    { label: 'Data Science', icon: 'science', children: [
      foundation('Programming Fundamentals'),
      quantitativeFoundations(),
      { label: 'Data Mining' },
    ] },
  ] },
  { label: 'Artificial Intelligence', icon: 'brain', children: [
    foundation('Programming Fundamentals'),
    quantitativeFoundations(),
    { label: 'Artificial Intelligence Fundamentals', children: [
      { label: 'Search and Planning' }, { label: 'Knowledge Representation and Reasoning' },
    ] },
    { label: 'Machine Learning', children: [
      { label: 'Supervised Learning' }, { label: 'Model Evaluation' },
      { label: 'Unsupervised Learning' }, { label: 'Deep Learning' },
      { label: 'Reinforcement Learning' },
    ] },
    { label: 'Natural Language Processing' }, { label: 'Computer Vision' },
    { label: 'Generative Artificial Intelligence', children: [
      { label: 'Ecosystem', href: '#applied-ai/ecosystem' },
      { label: 'Model Context Protocol (MCP)', href: '#applied-ai/mcp' },
      { label: 'Generative AI Applications', href: '#applied-ai/ai-fundamentos', children: glossaryTopics.map(topic => ({
        label: topic.en, module: topic.id, href: `#applied-ai/${topic.id}`,
      })) },
    ] },
  ] },
];
