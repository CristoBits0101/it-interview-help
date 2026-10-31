import type { CareerProfile } from './career-paths';

const stages = (foundation: string[], practice: string[], advanced: string[], specialty: string): CareerProfile['stages'] => [
  { id: 'foundation', label: 'Fundamentos', goal: 'Comprende los fundamentos del puesto y el contexto técnico en el que trabaja.', areas: foundation, milestone: 'Explica una tarea básica del puesto y qué evidencia usaría para comprobar su resultado.' },
  { id: 'junior', label: 'Junior', goal: 'Resuelve tareas definidas con apoyo y comunica sus resultados con claridad.', areas: practice, milestone: 'Completa una tarea acotada y documenta las decisiones y comprobaciones realizadas.' },
  { id: 'mid', label: 'Mid-Level', goal: 'Toma decisiones dentro de su ámbito y relaciona calidad técnica con las necesidades del producto.', areas: [...new Set([...practice, specialty])], milestone: 'Compara dos alternativas de su especialidad y justifica una decisión comprobable.' },
  { id: 'senior', label: 'Senior', goal: 'Orienta decisiones que afectan a otros equipos y mantiene explícitos los riesgos y límites.', areas: [...new Set([specialty, ...advanced])], milestone: 'Propone una mejora transversal y define cómo verificaría su efecto.' },
];

const profile = (id: string, label: string, purpose: string, summary: string, foundation: string[], practice: string[], advanced: string[], specialty = 'Software Design'): CareerProfile => ({ id, label, purpose, summary, stages: stages(foundation, practice, advanced, specialty) });

export const coreCareerProfileTemplates: CareerProfile[] = [
  profile('security-analyst', 'Analista de Seguridad', 'Analiza amenazas e incidentes', 'Investiga amenazas para orientar una respuesta proporcionada al riesgo.', ['Operating Systems', 'Computer Networks', 'Security Fundamentals'], ['Network Security', 'Application Security', 'Software Testing'], ['Cloud Security', 'Data Security', 'System Design']),
  profile('grc-analyst', 'Analista GRC', 'Gestiona gobierno y riesgo', 'Relaciona requisitos de seguridad con controles que responden a riesgos de la organización.', ['Security Fundamentals', 'Software Requirements'], ['Data Security', 'Application Security', 'Network Security'], ['Cloud Security', 'System Design', 'Software Quality']),
  profile('application-security-engineer', 'Ingeniero de Seguridad de Aplicaciones', 'Protege el ciclo de desarrollo', 'Integra la seguridad en el diseño y la entrega del software.', ['Programming Fundamentals', 'Computer Networks', 'Security Fundamentals'], ['Application Security', 'Software Testing', 'Software Design'], ['Software Architecture', 'Software Engineering Operations', 'System Design']),
  profile('cloud-security-engineer', 'Ingeniero de Seguridad Cloud', 'Protege servicios en la nube', 'Protege recursos en la nube mediante controles de identidad y configuración.', ['Operating Systems', 'Computer Networks', 'Security Fundamentals', 'Cloud Computing', 'Network Security'], ['Cloud Security', 'Data Security', 'Software Testing'], ['Software Architecture', 'System Design', 'Software Quality']),
  profile('product-designer', 'Diseñador de Producto', 'Diseña productos digitales', 'Conecta las necesidades de las personas con el producto mediante decisiones de diseño.', ['User Research', 'Information Architecture'], ['User Experience Design', 'User Interface Design', 'Software Requirements'], ['User Research', 'User Experience Design', 'Accessibility', 'Usability Evaluation'], 'User Experience Design'),
  profile('ui-designer', 'Diseñador de Interfaces', 'Diseña interfaces visuales', 'Diseña sistemas visuales que hacen comprensible una interfaz.', ['Information Architecture', 'User Research'], ['User Interface Design', 'User Experience Design', 'Software Requirements'], ['User Interface Design', 'Interaction Design', 'Accessibility', 'Usability Evaluation'], 'User Interface Design'),
  {
    id: 'ux-ui-designer',
    label: 'Diseñador de Interacción',
    purpose: 'Diseña flujos y comportamientos',
    summary: 'Diseña interacciones comprensibles y accesibles mediante pruebas de uso.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Comprende las necesidades de las personas y organiza las acciones de una tarea.', areas: ['User Research', 'Information Architecture', 'Accessibility'], milestone: 'Representa los pasos de una tarea y detecta una barrera de acceso.' },
      { id: 'junior', label: 'Junior', goal: 'Diseña un flujo pequeño con apoyo y representa sus estados principales.', areas: ['Interaction Design', 'User Interface Design', 'User Experience Design'], milestone: 'Crea un prototipo con estados de éxito y error que permita completar una tarea.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Evalúa interacciones con usuarios y mejora el diseño según la evidencia.', areas: ['Interaction Design', 'Usability Evaluation', 'Accessibility', 'Software Requirements'], milestone: 'Prueba un flujo con usuarios y justifica una mejora de interacción accesible.' },
      { id: 'senior', label: 'Senior', goal: 'Orienta patrones de interacción coherentes entre servicios y equipos.', areas: ['Interaction Design', 'User Experience Design', 'Accessibility', 'Usability Evaluation'], milestone: 'Acuerda un patrón compartido y define cómo comprobar su utilidad en distintos recorridos.' },
    ],
  },
  profile('ux-researcher', 'Investigador de Experiencia de Usuario', 'Investiga necesidades de usuarios', 'Orienta decisiones de producto a partir de la investigación con usuarios.', ['User Research', 'Information Architecture'], ['User Experience Design', 'Software Requirements', 'Data Analytics'], ['User Research', 'Usability Evaluation', 'Data Analytics', 'Accessibility'], 'User Research'),
  profile('software-engineer', 'Ingeniero de Software', 'Construye software mantenible', 'Construye software con decisiones técnicas y pruebas adecuadas al problema.', ['Computing Fundamentals', 'Programming Fundamentals', 'Software Requirements'], ['Software Design', 'Software Testing', 'API Design'], ['Software Architecture', 'Software Quality', 'System Design']),
  profile('business-intelligence-developer', 'Desarrollador de Inteligencia de Negocio', 'Construye productos de información', 'Facilita la interpretación de datos mediante modelos y visualizaciones.', ['Programming Fundamentals', 'Statistics', 'Data Analytics'], ['Data Engineering', 'Relational Databases', 'Software Testing'], ['Data Security', 'Software Quality', 'System Design']),
  profile('analytics-engineer', 'Ingeniero de Analítica', 'Prepara datos para análisis', 'Prepara datos validados para obtener análisis fiables.', ['Programming Fundamentals', 'Statistics', 'Data Analytics'], ['Data Engineering', 'Relational Databases', 'Software Testing'], ['Data Security', 'Software Quality', 'System Design']),
];
