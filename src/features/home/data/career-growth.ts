export interface CareerGrowthTarget {
  id: string;
  label: string;
  abbreviation?: string;
  destinationProfileId?: string;
  group: 'specialization' | 'leadership' | 'management' | 'executive';
  profileIds: readonly string[];
  goal: string;
  practice: string;
}

export const careerGrowthGroups = [
  { id: 'specialization', title: 'Especialización', question: '¿Quieres especializarte?' },
  { id: 'leadership', title: 'Liderazgo', question: '¿Quieres liderar?' },
  { id: 'management', title: 'Gestión', question: '¿Quieres gestionar equipos?' },
  { id: 'executive', title: 'Ejecutivo', question: '¿Quieres dirigir tecnología?' },
] as const;

const softwareProfiles = ['software-engineer', 'frontend', 'backend', 'full-stack', 'mobile', 'desktop', 'game-developer', 'embedded-software', 'iot-developer', 'software-architect'];
const infrastructureProfiles = ['systems-administrator', 'it-support-specialist', 'network-engineer', 'cloud-engineer', 'devops', 'site-reliability-engineer', 'platform-engineer'];
const cloudPlatformProfiles = ['cloud-engineer', 'devops', 'site-reliability-engineer', 'platform-engineer'];
const securityProfiles = ['security-engineer', 'security-analyst', 'grc-analyst', 'application-security-engineer', 'cloud-security-engineer', 'penetration-tester', 'soc-analyst', 'detection-engineer'];
const dataEngineeringProfiles = ['data-engineer', 'data-analyst', 'business-intelligence-developer', 'analytics-engineer'];
const designProfiles = ['product-designer', 'ux-designer', 'ui-designer', 'ux-researcher', 'ux-ui-designer'];
const aiEngineeringProfiles = ['machine-learning-engineer', 'mlops-engineer', 'artificial-intelligence'];
const technicalEngineeringProfiles = [...softwareProfiles, 'qa-engineer', ...cloudPlatformProfiles, 'security-engineer', 'detection-engineer', 'data-engineer', ...aiEngineeringProfiles];
const architectureGoal = 'Defiende decisiones de arquitectura a partir de requisitos y restricciones. Compara alternativas y explica sus costes y riesgos.';
const architecturePractice = 'Diseña una evolución del sistema de tu especialidad. Presenta dos alternativas y justifica una migración gradual con criterios de éxito.';
const leadershipGoal = 'Orienta las decisiones de tu especialidad y ayuda al equipo a resolver desacuerdos. Relaciona la calidad técnica con las prioridades del trabajo.';
const leadershipPractice = 'Explica cómo conducirías una decisión controvertida. Propón un plan de entrega y describe cómo acompañarías al equipo durante un cambio.';
const managementGoal = 'Relaciona las necesidades del equipo con los resultados esperados. Prepara decisiones sobre personas y capacidad de entrega sin perder el criterio técnico.';
const managementPractice = 'Resuelve un caso con recursos limitados y compromisos incompatibles. Justifica las prioridades y explica cómo evaluarías al equipo y sus resultados.';

const careerGrowthTargetTemplates: readonly CareerGrowthTarget[] = [
  { id: 'ux-team-lead', label: 'UX Team Lead', group: 'leadership', profileIds: ['ux-strategist'], goal: 'Coordina investigación y diseño alrededor de una dirección de experiencia compartida. Ayuda al equipo a resolver prioridades con evidencia y criterios explícitos.', practice: 'Conduce una revisión de oportunidades con investigadores y diseñadores y acuerda qué evaluar antes de decidir.' },
  { id: 'content-strategist', label: 'Content Strategist', group: 'specialization', profileIds: ['ux-writer', 'information-architect'], goal: 'Amplía el trabajo con textos o estructuras hacia el gobierno del contenido. Conecta necesidades de usuarios con responsables y criterios de mantenimiento.', practice: 'Diseña un ciclo de revisión de contenido con responsables y una medida de utilidad para los usuarios.' },
  { id: 'lead-content-designer', label: 'Lead Content Designer', group: 'leadership', profileIds: ['ux-writer'], goal: 'Coordina decisiones de contenido y acompaña a otros profesionales. Revisa la coherencia y accesibilidad de los textos entre recorridos.', practice: 'Revisa un flujo con otro redactor y acuerda criterios de calidad que el equipo pueda comprobar.' },
  { id: 'head-content-design', label: 'Head of Content Design', group: 'management', profileIds: ['content-strategist'], goal: 'Prepara responsabilidades de gestión de una función de contenido. Planifica personas y recursos para sostener la estrategia y el desarrollo del equipo.', practice: 'Propón un plan de capacidad y acompañamiento para un equipo de contenido con prioridades en conflicto.' },
  { id: 'ai-research-scientist', destinationProfileId: 'research-scientist', label: 'AI Research Scientist', group: 'specialization', profileIds: ['research-engineer'], goal: 'Explora la investigación científica como una rama opcional. Prepara preguntas originales y evidencia reproducible para contrastarlas.', practice: 'Formula una hipótesis y diseña un experimento con una referencia y criterios de refutación.' },
  { id: 'principal-research-scientist', label: 'Principal Research Scientist', group: 'specialization', profileIds: ['research-scientist'], goal: 'Orienta una agenda científica de amplio alcance con contribuciones originales. Revisa la validez y los límites de la evidencia de varios proyectos.', practice: 'Propón una agenda de investigación y justifica sus preguntas abiertas con evidencia y experimentos reproducibles.' },
  { id: 'systems-analyst', label: 'Systems Analyst', group: 'specialization', profileIds: [...softwareProfiles, 'business-analyst'], goal: 'Convierte necesidades en requisitos comprobables. Analiza procesos e integraciones y detecta contradicciones antes de proponer una solución.', practice: 'Analiza una petición ambigua de tu especialidad. Define requisitos y criterios de aceptación y explica el impacto de un cambio.' },
  { id: 'software-architect', label: 'Software Architect', group: 'specialization', profileIds: softwareProfiles, goal: architectureGoal, practice: architecturePractice },
  { id: 'infrastructure-architect', label: 'Infrastructure Architect', group: 'specialization', profileIds: infrastructureProfiles, goal: architectureGoal, practice: architecturePractice },
  { id: 'cloud-architect', label: 'Cloud Architect', group: 'specialization', profileIds: cloudPlatformProfiles, goal: architectureGoal, practice: architecturePractice },
  { id: 'security-architect', label: 'Security Architect', group: 'specialization', profileIds: securityProfiles, goal: architectureGoal, practice: architecturePractice },
  { id: 'data-architect', label: 'Data Architect', group: 'specialization', profileIds: dataEngineeringProfiles, goal: architectureGoal, practice: architecturePractice },
  { id: 'ai-architect', label: 'AI Architect', group: 'specialization', profileIds: aiEngineeringProfiles, goal: architectureGoal, practice: architecturePractice },
  { id: 'principal-data-analyst', label: 'Principal Data Analyst', group: 'specialization', profileIds: ['data-analyst'], goal: 'Orienta análisis complejos con rigor metodológico y contexto de negocio. Explica la incertidumbre y ayuda a otros analistas a tomar decisiones reproducibles.', practice: 'Revisa un análisis que afecte a varias áreas. Define cómo validarías sus supuestos y cómo comunicarías una recomendación con sus límites.' },
  { id: 'staff-engineer', label: 'Staff Engineer', group: 'specialization', profileIds: technicalEngineeringProfiles, goal: 'Resuelve problemas técnicos que afectan a varios equipos. Explica cómo alinear interfaces y decisiones sin depender de autoridad jerárquica.', practice: 'Propón una mejora transversal en tu especialidad. Identifica dependencias y acuerda una adopción gradual con métricas de impacto.' },
  { id: 'principal-engineer', abbreviation: 'PE', label: 'Principal Engineer', group: 'specialization', profileIds: technicalEngineeringProfiles, goal: 'Define una dirección técnica que abarque varios sistemas. Evalúa decisiones de largo plazo y conecta sus consecuencias con los objetivos de la organización.', practice: 'Defiende una estrategia técnica para varios equipos. Compara opciones y explica qué riesgos aceptarías y cómo comprobarías los resultados.' },
  { id: 'principal-designer', label: 'Principal Designer', group: 'specialization', profileIds: designProfiles, goal: 'Orienta decisiones de experiencia que afectan a varios productos. Integra evidencia de usuarios y accesibilidad con las restricciones de implementación.', practice: 'Presenta una mejora de experiencia compartida entre productos. Justifica las decisiones con evidencia y propone cómo validar sus resultados.' },
  { id: 'principal-data-scientist', label: 'Principal Data Scientist', group: 'specialization', profileIds: ['data-scientist'], goal: 'Define una estrategia de evaluación para problemas analíticos complejos. Explica la incertidumbre y el valor de las decisiones basadas en datos.', practice: 'Diseña un estudio para orientar una decisión de negocio. Compara métodos y explica sus supuestos y límites de validez.' },
  { id: 'business-analysis-specialist', label: 'Business Analysis Specialist', group: 'specialization', profileIds: ['business-analyst'], goal: 'Analiza cambios que afectan a varias áreas de negocio. Relaciona necesidades y requisitos con resultados verificables.', practice: 'Evalúa dos soluciones para una necesidad de negocio. Explica sus dependencias y define cómo comprobarías el valor obtenido.' },
  { id: 'technical-lead', abbreviation: 'TL', label: 'Technical Lead', group: 'leadership', profileIds: technicalEngineeringProfiles, goal: leadershipGoal, practice: leadershipPractice },
  { id: 'design-lead', label: 'Design Lead', group: 'leadership', profileIds: designProfiles, goal: leadershipGoal, practice: leadershipPractice },
  { id: 'data-science-lead', label: 'Data Science Lead', group: 'leadership', profileIds: ['data-scientist'], goal: leadershipGoal, practice: leadershipPractice },
  { id: 'business-analysis-lead', label: 'Business Analysis Lead', group: 'leadership', profileIds: ['business-analyst'], goal: leadershipGoal, practice: leadershipPractice },
  { id: 'it-service-manager', label: 'IT Service Manager', group: 'management', profileIds: ['it-support-specialist', 'systems-administrator'], goal: 'Mejora servicios tecnológicos según su impacto en las personas y la operación. Coordina incidencias y cambios con niveles de servicio y riesgos explícitos.', practice: 'Prioriza una mejora de servicio con una incidencia recurrente. Define responsables y una medida de recuperación para comprobar su resultado.' },
  { id: 'network-operations-manager', label: 'Network Operations Manager', group: 'management', profileIds: ['network-engineer'], goal: 'Coordina la operación de red con capacidad y mantenimiento planificados. Equilibra disponibilidad y cambios con la calidad del servicio.', practice: 'Prepara una ventana de mantenimiento para una red crítica. Define el plan de reversión y cómo comprobarías la continuidad del servicio.' },
  { id: 'security-operations-manager', label: 'Security Operations Manager', group: 'management', profileIds: ['security-engineer', 'penetration-tester', 'soc-analyst', 'detection-engineer'], goal: 'Coordina la respuesta de seguridad según la prioridad de los riesgos. Mejora detecciones y procedimientos con evidencia de incidentes y ejercicios autorizados.', practice: 'Organiza la respuesta a un incidente simulado. Define escalado y revisa una mejora de detección que reduzca el riesgo de repetición.' },
  { id: 'engineering-manager', abbreviation: 'EM', label: 'Engineering Manager', group: 'management', profileIds: technicalEngineeringProfiles, goal: managementGoal, practice: managementPractice },
  { id: 'design-manager', label: 'Design Manager', group: 'management', profileIds: designProfiles, goal: managementGoal, practice: managementPractice },
  { id: 'data-science-manager', label: 'Data Science Manager', group: 'management', profileIds: ['data-scientist'], goal: managementGoal, practice: managementPractice },
  { id: 'business-analysis-manager', label: 'Business Analysis Manager', group: 'management', profileIds: ['business-analyst'], goal: managementGoal, practice: managementPractice },
  { id: 'engineering-director', label: 'Director of Engineering', group: 'executive', profileIds: technicalEngineeringProfiles, goal: 'Coordina varios equipos con prioridades y dependencias compartidas. Relaciona la estrategia técnica con la organización y la capacidad de ejecución.', practice: 'Prepara un plan para varios equipos con una dependencia crítica. Explica cómo repartirías responsabilidades y revisarías los resultados.' },
  { id: 'engineering-vp', abbreviation: 'VPE', label: 'Vice President of Engineering', group: 'executive', profileIds: technicalEngineeringProfiles, goal: 'Dirige la capacidad de ingeniería de una organización. Equilibra inversión y calidad con los compromisos de producto y la sostenibilidad de los equipos.', practice: 'Defiende un plan de inversión en ingeniería. Explica qué iniciativas priorizarías y cómo ajustarías la organización ante un cambio de objetivos.' },
  { id: 'cto', abbreviation: 'CTO', label: 'Chief Technology Officer', group: 'executive', profileIds: technicalEngineeringProfiles, goal: 'Conecta la estrategia tecnológica con el modelo de negocio. Evalúa riesgos y decisiones de inversión con una perspectiva organizativa.', practice: 'Presenta una estrategia tecnológica a dirección. Justifica qué construir y qué contratar y explica cómo medirías el valor y controlarías los riesgos.' },
  { id: 'chief-data-officer', abbreviation: 'CDO', label: 'Chief Data Officer', group: 'executive', profileIds: ['data-analyst', 'data-engineer', 'data-scientist'], goal: 'Define gobierno y capacidades de datos para decisiones de la organización. Equilibra calidad y acceso con privacidad y valor para los equipos.', practice: 'Presenta una prioridad de gobierno de datos para varias áreas. Define una medida de calidad y un control para gestionar un riesgo de uso.' },
  { id: 'chief-information-security-officer', abbreviation: 'CISO', label: 'Chief Information Security Officer', group: 'executive', profileIds: securityProfiles, goal: 'Dirige la gestión de riesgos de seguridad con objetivos y recursos claros. Conecta controles y respuesta ante incidentes con las prioridades de la organización.', practice: 'Explica una prioridad de seguridad ante dirección. Relaciona el riesgo con una inversión y define cómo comprobarías que reduce la exposición.' },
];

export const careerGrowthTargets: readonly CareerGrowthTarget[] = careerGrowthTargetTemplates.map(target => ({
  ...target,
  profileIds: target.profileIds.filter(profileId => profileId !== (target.destinationProfileId ?? target.id)),
}));
