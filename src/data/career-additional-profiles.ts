import type { CareerProfile } from './career-paths';

export const additionalCareerProfileTemplates: CareerProfile[] = [
  {
    id: 'mobile',
    label: 'Mobile Engineer',
    purpose: 'Desarrolla aplicaciones móviles',
    summary: 'Construye aplicaciones adaptadas al dispositivo. Gestiona su ciclo de vida y su comportamiento sin conexión.',
    stages: [
      {
        id: 'foundation',
        label: 'Fundamentos',
        goal: 'Comprende la ejecución de programas y la comunicación del dispositivo. Organiza la información de una aplicación.',
        areas: ['Programming Fundamentals', 'Operating Systems', 'Computer Networks', 'Information Architecture'],
        milestone: 'Explica cómo una aplicación guarda su estado y solicita datos a un servicio.',
      },
      {
        id: 'junior',
        label: 'Junior',
        goal: 'Implementa pantallas sencillas con estados claros y pruebas básicas.',
        areas: ['User Interface Design', 'Mobile Development', 'Software Testing', 'Security Fundamentals'],
        milestone: 'Construye una pantalla que conserve sus datos al cambiar de orientación.',
      },
      {
        id: 'mid',
        label: 'Mid-Level',
        goal: 'Separa la interfaz de los datos y protege el acceso a funciones del dispositivo.',
        areas: ['Software Design', 'Application Security', 'User Experience Design'],
        milestone: 'Entrega un flujo que funcione sin conexión y explique los permisos que solicita.',
      },
      {
        id: 'senior',
        label: 'Senior',
        goal: 'Guía la evolución de la aplicación con atención a compatibilidad y mantenimiento.',
        areas: ['Software Architecture', 'Software Quality', 'Software Maintenance'],
        milestone: 'Planifica una actualización gradual y comprueba su efecto en estabilidad y consumo de recursos.',
      },
    ],
  },
  {
    id: 'data-engineer',
    label: 'Data Engineer',
    purpose: 'Prepara datos fiables para otros equipos',
    summary: 'Integra datos de distintas fuentes. Construye procesos reproducibles y comprueba su calidad antes de entregarlos.',
    stages: [
      {
        id: 'foundation',
        label: 'Fundamentos',
        goal: 'Comprende cómo se procesan y transportan los datos. Identifica las necesidades de quienes los utilizan.',
        areas: ['Programming Fundamentals', 'Operating Systems', 'Computer Networks', 'Software Requirements'],
        milestone: 'Lee un archivo y valida su estructura antes de transformarlo.',
      },
      {
        id: 'junior',
        label: 'Junior',
        goal: 'Construye procesos pequeños de carga y transformación con pruebas.',
        areas: ['Relational Databases', 'Data Engineering', 'Software Testing'],
        milestone: 'Carga datos en una tabla y comprueba que una repetición no produzca duplicados.',
      },
      {
        id: 'mid',
        label: 'Mid-Level',
        goal: 'Organiza procesos mantenibles y controla la calidad y el acceso a los datos.',
        areas: ['Software Design', 'Data Quality and Governance', 'Data Security'],
        milestone: 'Detecta registros inválidos y conserva la trazabilidad de cada transformación.',
      },
      {
        id: 'senior',
        label: 'Senior',
        goal: 'Diseña procesos de datos fiables según su volumen y sus plazos de entrega.',
        areas: ['Distributed Systems', 'Cloud Computing', 'Software Engineering Operations'],
        milestone: 'Justifica una estrategia de procesamiento y prueba la recuperación de una carga interrumpida.',
      },
    ],
  },
  {
    id: 'security-engineer',
    label: 'Security Engineer',
    purpose: 'Protege aplicaciones y sistemas',
    summary: 'Relaciona amenazas con controles verificables. Colabora con desarrollo y operación para reducir riesgos concretos.',
    stages: [
      {
        id: 'foundation',
        label: 'Fundamentos',
        goal: 'Comprende los permisos y las comunicaciones. Identifica amenazas dentro de un alcance autorizado.',
        areas: ['Operating Systems', 'Computer Networks', 'Security Fundamentals', 'Programming Fundamentals'],
        milestone: 'Describe un riesgo y el control que protege el recurso afectado.',
      },
      {
        id: 'junior',
        label: 'Junior',
        goal: 'Comprueba controles de acceso y comunicación en entornos autorizados.',
        areas: ['Network Security', 'Application Security', 'Software Testing'],
        milestone: 'Verifica que un servicio rechace accesos sin permiso y registra la evidencia.',
      },
      {
        id: 'mid',
        label: 'Mid-Level',
        goal: 'Protege datos y recursos en la nube según su exposición y sensibilidad.',
        areas: ['Data Security', 'Cloud Computing', 'Cloud Security'],
        milestone: 'Revisa permisos y retención de datos. Propón correcciones con una prioridad justificada.',
      },
      {
        id: 'senior',
        label: 'Senior',
        goal: 'Integra controles en el diseño y en la operación de sistemas.',
        areas: ['Software Design', 'Software Architecture', 'System Design', 'Software Engineering Operations'],
        milestone: 'Evalúa amenazas de un cambio y acuerda cómo detectar y contener un incidente.',
      },
    ],
  },
  {
    id: 'qa-engineer',
    label: 'QA Engineer',
    purpose: 'Verifica la calidad del software',
    summary: 'Convierte expectativas en comprobaciones útiles. Combina exploración y automatización según el riesgo del producto.',
    stages: [
      {
        id: 'foundation',
        label: 'Fundamentos',
        goal: 'Comprende el comportamiento esperado y distingue un fallo de una expectativa ambigua.',
        areas: ['Computing Fundamentals', 'Programming Fundamentals', 'Software Requirements'],
        milestone: 'Describe un caso de prueba con un resultado esperado observable.',
      },
      {
        id: 'junior',
        label: 'Junior',
        goal: 'Diseña pruebas reproducibles y comunica defectos con información suficiente.',
        areas: ['Software Testing', 'Software Design'],
        milestone: 'Reproduce un defecto y automatiza una comprobación que detecte su regreso.',
      },
      {
        id: 'mid',
        label: 'Mid-Level',
        goal: 'Selecciona comprobaciones según los riesgos y las necesidades de acceso al producto.',
        areas: ['Software Quality', 'Software Engineering Operations', 'Accessibility'],
        milestone: 'Integra pruebas útiles en la entrega y revisa un flujo con teclado.',
      },
      {
        id: 'senior',
        label: 'Senior',
        goal: 'Orienta la estrategia de calidad durante la evolución del sistema.',
        areas: ['Software Architecture', 'Software Quality', 'Software Maintenance'],
        milestone: 'Prioriza los riesgos de una migración y define la evidencia necesaria para entregar el cambio.',
      },
    ],
  },
  {
    id: 'ux-designer',
    label: 'UX Designer',
    purpose: 'Diseña experiencias comprensibles',
    summary: 'Investiga necesidades y prueba alternativas de interacción. Utiliza evidencia para mejorar la experiencia de las personas.',
    stages: [
      {
        id: 'foundation',
        label: 'Fundamentos',
        goal: 'Observa necesidades reales y organiza la información alrededor de tareas.',
        areas: ['User Research', 'Information Architecture'],
        milestone: 'Describe una necesidad observada y representa el recorrido de una tarea.',
      },
      {
        id: 'junior',
        label: 'Junior',
        goal: 'Diseña flujos y prototipos sencillos con acompañamiento.',
        areas: ['User Experience Design', 'User Interface Design', 'Interaction Design'],
        milestone: 'Crea un prototipo que muestre los estados principales de una tarea.',
      },
      {
        id: 'mid',
        label: 'Mid-Level',
        goal: 'Contrasta decisiones de diseño con personas y requisitos de accesibilidad.',
        areas: ['Accessibility', 'Usability Evaluation', 'Software Requirements'],
        milestone: 'Prueba un flujo y modifica el diseño a partir de dificultades observadas.',
      },
      {
        id: 'senior',
        label: 'Senior',
        goal: 'Coordina decisiones de experiencia entre recorridos y equipos.',
        areas: ['User Research', 'User Experience Design', 'Interaction Design'],
        milestone: 'Justifica una mejora compartida y acuerda cómo comprobar su efecto en las tareas del usuario.',
      },
    ],
  },
  {
    id: 'software-architect',
    label: 'Software Architect',
    purpose: 'Orienta decisiones de arquitectura',
    summary: 'Relaciona requisitos con decisiones técnicas. Las primeras etapas preparan fundamentos para asumir responsabilidades de arquitectura.',
    stages: [
      {
        id: 'foundation',
        label: 'Fundamentos',
        goal: 'Construye una base de desarrollo y sistemas antes de abordar decisiones de arquitectura.',
        areas: ['Programming Fundamentals', 'Operating Systems', 'Computer Networks', 'Software Requirements'],
        milestone: 'Explica los componentes de una aplicación y el recorrido de una petición.',
      },
      {
        id: 'junior',
        label: 'Junior',
        goal: 'Practica el diseño de módulos y verifica sus contratos con apoyo.',
        areas: ['Software Design', 'Software Testing', 'Relational Databases'],
        milestone: 'Separa dos responsabilidades y comprueba su integración con una prueba.',
      },
      {
        id: 'mid',
        label: 'Mid-Level',
        goal: 'Compara alternativas de arquitectura según las restricciones del sistema.',
        areas: ['Software Architecture', 'Distributed Systems', 'Cloud Computing'],
        milestone: 'Documenta una decisión y explica el coste de las alternativas descartadas.',
      },
      {
        id: 'senior',
        label: 'Senior',
        goal: 'Guía decisiones entre equipos y planifica la evolución del sistema.',
        areas: ['System Design', 'Software Quality', 'Data Security', 'Software Maintenance'],
        milestone: 'Propón una migración gradual con riesgos explícitos y criterios de verificación.',
      },
    ],
  },
  {
    id: 'business-analyst',
    label: 'Business Analyst',
    purpose: 'Conecta necesidades con soluciones',
    summary: 'Analiza necesidades y aclara resultados esperados. Conecta a las personas implicadas con el equipo que construye la solución.',
    stages: [
      {
        id: 'foundation',
        label: 'Fundamentos',
        goal: 'Comprende el contexto de una necesidad y diferencia el problema de una solución propuesta.',
        areas: ['Computing Fundamentals', 'User Research', 'Software Requirements'],
        milestone: 'Describe un problema y un resultado observable sin imponer una implementación.',
      },
      {
        id: 'junior',
        label: 'Junior',
        goal: 'Organiza información y representa tareas con acompañamiento.',
        areas: ['Information Architecture', 'User Experience Design'],
        milestone: 'Representa un proceso y acuerda criterios de aceptación para una mejora pequeña.',
      },
      {
        id: 'mid',
        label: 'Mid-Level',
        goal: 'Contrasta requisitos y valida que una solución responda a las necesidades acordadas.',
        areas: ['Software Requirements', 'Usability Evaluation'],
        milestone: 'Relaciona una necesidad con sus criterios de aceptación y comprueba el resultado con las personas implicadas.',
      },
      {
        id: 'senior',
        label: 'Senior',
        goal: 'Coordina el análisis de cambios que afectan a distintos equipos y recorridos.',
        areas: ['Software Requirements', 'User Research', 'User Experience Design'],
        milestone: 'Compara alternativas de mejora y acuerda una prioridad con evidencia y restricciones explícitas.',
      },
    ],
  },
  {
    id: 'desktop',
    label: 'Desktop Engineer',
    purpose: 'Desarrolla aplicaciones de escritorio',
    summary: 'Construye aplicaciones que se integran con el sistema operativo. Cuida la respuesta de la interfaz y la conservación de los datos.',
    stages: [
      {
        id: 'foundation',
        label: 'Fundamentos',
        goal: 'Comprende los procesos y los archivos. Relaciona las acciones de una ventana con el trabajo que realiza el programa.',
        areas: ['Programming Fundamentals', 'Operating Systems', 'Computer Networks', 'Information Architecture'],
        milestone: 'Construye un programa que lea un archivo y gestione errores de acceso.',
      },
      {
        id: 'junior',
        label: 'Junior',
        goal: 'Implementa ventanas sencillas con teclado y pruebas de comportamiento.',
        areas: ['User Interface Design', 'Software Testing', 'Accessibility', 'Security Fundamentals'],
        milestone: 'Entrega un formulario que mantenga la interfaz disponible mientras carga datos.',
      },
      {
        id: 'mid',
        label: 'Mid-Level',
        goal: 'Separa la interfaz de la lógica y protege los datos que guarda la aplicación.',
        areas: ['Software Design', 'Relational Databases', 'Application Security'],
        milestone: 'Implementa un flujo con almacenamiento local y recuperación ante un cierre inesperado.',
      },
      {
        id: 'senior',
        label: 'Senior',
        goal: 'Planifica la evolución de la aplicación con atención a compatibilidad y distribución.',
        areas: ['Software Architecture', 'Software Quality', 'Software Maintenance'],
        milestone: 'Prepara una actualización reversible y comprueba su funcionamiento en los entornos admitidos.',
      },
    ],
  },
];

export const additionalAreaGuidance: Record<string, { focus: string; prerequisites: string[] }> = {
  'Mobile Development': {
    focus: 'Gestiona el ciclo de vida y el estado de una aplicación móvil. Adapta su interfaz y su acceso a datos al dispositivo.',
    prerequisites: ['Programming Fundamentals', 'Operating Systems'],
  },
  'Interaction Design': {
    focus: 'Diseña las acciones y respuestas de una interfaz. Representa los estados que permiten completar una tarea.',
    prerequisites: ['Information Architecture'],
  },
  Accessibility: {
    focus: 'Comprueba el uso con teclado y tecnologías de apoyo. Identifica barreras de percepción y de interacción.',
    prerequisites: [],
  },
  'Usability Evaluation': {
    focus: 'Observa cómo se completan tareas concretas. Registra dificultades y contrasta posibles mejoras.',
    prerequisites: ['User Research'],
  },
  'Data Quality and Governance': {
    focus: 'Define criterios de calidad y responsabilidades sobre los datos. Mantén su trazabilidad durante las transformaciones.',
    prerequisites: ['Data Engineering'],
  },
};

export const additionalCareerSources: { title: string; url: string }[] = [
  {
    title: 'Android · arquitectura de aplicaciones móviles',
    url: 'https://developer.android.com/topic/architecture',
  },
  {
    title: 'Microsoft Learn · responsabilidades de ingeniería de datos',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-data-engineering/',
  },
  {
    title: 'NIST · marco de trabajo de ciberseguridad NICE',
    url: 'https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/getting-started',
  },
  {
    title: 'ISTQB · fundamentos de pruebas de software',
    url: 'https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/',
  },
  {
    title: 'Gobierno británico · diseño de interacción',
    url: 'https://understand-digital-data-roles-skills.service.gov.uk/role/interaction-designer/',
  },
  {
    title: 'Gobierno británico · arquitectura técnica',
    url: 'https://understand-digital-data-roles-skills.service.gov.uk/role/technical-architect/',
  },
  {
    title: 'Gobierno británico · análisis de negocio',
    url: 'https://understand-digital-data-roles-skills.service.gov.uk/role/business-analyst/',
  },
  {
    title: 'Microsoft Learn · aplicaciones de escritorio con Windows App SDK',
    url: 'https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/',
  },
];
