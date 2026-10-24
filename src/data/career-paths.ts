export interface CareerStage {
  id: string;
  label: string;
  goal: string;
  areas: string[];
  milestone: string;
}

export interface CareerProfile {
  id: string;
  label: string;
  purpose: string;
  summary: string;
  stages: CareerStage[];
}

const careerProfileTemplates: CareerProfile[] = [
  {
    id: 'frontend', label: 'Frontend Engineer',
    purpose: 'Construye interfaces web.',
    summary: 'Combina la programación con la experiencia de usuario. Aplica criterios de calidad para construir interfaces accesibles.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Entiende la web y organiza la información antes de elegir un framework.', areas: ['Computing Fundamentals', 'Programming Fundamentals', 'Computer Networks', 'User Research', 'Information Architecture', 'Software Requirements'], milestone: 'Construye una página semántica y explica cómo llega del servidor al navegador.' },
      { id: 'junior', label: 'Junior', goal: 'Entrega interfaces pequeñas con acompañamiento y pruebas básicas.', areas: ['User Interface Design', 'Frontend Development', 'Software Testing', 'Security Fundamentals', 'Application Security'], milestone: 'Implementa un formulario accesible que se adapte al móvil. Comprueba su funcionamiento con pruebas.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Resuelve funcionalidades completas y toma decisiones de diseño con autonomía.', areas: ['User Experience Design', 'Software Design', 'Application Security'], milestone: 'Entrega un flujo con validación segura. Muestra cuándo está cargando y cómo resolver los errores.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Mejora la estructura y el rendimiento de una aplicación existente. Facilita la entrega de sus cambios.', areas: ['Software Architecture', 'Software Quality', 'Software Engineering Operations'], milestone: 'Justifica una modularización y mide su efecto en rendimiento y mantenimiento.' },
      { id: 'senior', label: 'Senior', goal: 'Decide con contexto de producto y guía cambios que afectan a otros equipos.', areas: ['System Design', 'User Research', 'Software Quality', 'Software Maintenance'], milestone: 'Dirige una evolución de la interfaz con un plan de migración. Comprueba la compatibilidad y mide los resultados.' },
    ],
  },
  {
    id: 'backend', label: 'Backend Engineer',
    purpose: 'Implementa la lógica de negocio.',
    summary: 'Empieza por los servicios y los datos. Añade distribución y nube cuando entiendas sus costes.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Comprende el lenguaje de programación y los procesos. Estudia la comunicación entre cliente y servidor.', areas: ['Computing Fundamentals', 'Programming Fundamentals', 'Operating Systems', 'Computer Networks', 'Software Requirements'], milestone: 'Explica una petición HTTP y construye un programa que procese y valide datos.' },
      { id: 'junior', label: 'Junior', goal: 'Construye servicios pequeños con persistencia y controles de seguridad.', areas: ['Relational Databases', 'Backend Development', 'Software Testing', 'Security Fundamentals', 'Application Security'], milestone: 'Entrega una API con autenticación y consultas parametrizadas. Comprueba su funcionamiento con pruebas de integración.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Mantén servicios completos y elige el almacenamiento según el problema.', areas: ['Software Design', 'Non-Relational Databases', 'Software Engineering Operations'], milestone: 'Opera un servicio con despliegues reproducibles. Utiliza registros y métricas para observar su funcionamiento.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Define los límites de los servicios. Evalúa su capacidad y el efecto de los fallos parciales.', areas: ['Software Architecture', 'Distributed Systems', 'Cloud Computing'], milestone: 'Diseña una integración con colas. Aplica reintentos seguros mediante idempotencia y comprueba cómo responde ante fallos.' },
      { id: 'senior', label: 'Senior', goal: 'Compara las necesidades de fiabilidad y seguridad. Considera también el coste y la evolución del sistema.', areas: ['System Design', 'Software Quality', 'Data Security', 'Software Maintenance'], milestone: 'Defiende un diseño con estimaciones y objetivos de servicio. Propón una migración gradual.' },
    ],
  },
  {
    id: 'full-stack', label: 'Full Stack Engineer',
    purpose: 'Conecta interfaces y servicios web.',
    summary: 'Conecta la interfaz con los servicios y los datos. Profundiza en una parte sin perder la visión completa.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Conecta los fundamentos de programación con el recorrido de una petición web.', areas: ['Computing Fundamentals', 'Programming Fundamentals', 'Operating Systems', 'Computer Networks', 'User Research', 'Information Architecture', 'Software Requirements'], milestone: 'Describe cómo una petición viaja del navegador al servidor y accede a los datos. Maqueta una interfaz clara.' },
      { id: 'junior', label: 'Junior', goal: 'Completa una funcionalidad sencilla de extremo a extremo con ayuda.', areas: ['User Interface Design', 'Frontend Development', 'Relational Databases', 'Backend Development', 'Software Testing', 'Security Fundamentals', 'Application Security'], milestone: 'Construye un flujo que guarde datos y pruebe tanto la interfaz como la API.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Asume una funcionalidad de producto desde su uso hasta su despliegue.', areas: ['User Experience Design', 'Software Design', 'Software Engineering Operations'], milestone: 'Entrega una mejora completa y observa errores y comportamiento después del despliegue.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Separa responsabilidades y entiende cuándo distribuir una aplicación.', areas: ['Software Architecture', 'Cloud Computing', 'Distributed Systems'], milestone: 'Compara mantener un monolito con extraer un servicio y justifica la decisión.' },
      { id: 'senior', label: 'Senior', goal: 'Coordina decisiones entre capas y ayuda a otros a mantener el producto.', areas: ['System Design', 'Software Quality', 'Data Security', 'Software Maintenance'], milestone: 'Conduce una evolución del producto con contratos claros. Identifica sus riesgos y define métricas de éxito.' },
    ],
  },
  {
    id: 'devops', label: 'DevOps Engineer',
    purpose: 'Automatiza la entrega y operación del software.',
    summary: 'Automatiza la entrega y la operación de sistemas. Colabora con los equipos para mantener software fiable.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Aprende a automatizar tareas y diagnosticar procesos y conexiones.', areas: ['Computing Fundamentals', 'Operating Systems', 'Computer Networks', 'Programming Fundamentals', 'Security Fundamentals'], milestone: 'Automatiza una tarea. Practica el diagnóstico de fallos de procesos y permisos. Revisa también los problemas de conexión.' },
      { id: 'junior', label: 'Junior', goal: 'Entrega cambios repetibles con pruebas y acceso controlado.', areas: ['Software Engineering Operations', 'Software Testing', 'Network Security'], milestone: 'Prepara una integración continua con pruebas y un despliegue reversible.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Opera entornos reproducibles y reduce trabajo manual con seguridad.', areas: ['Cloud Computing', 'Cloud Security', 'Software Design'], milestone: 'Versiona la infraestructura y limita los permisos. Prueba la restauración de una copia.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Anticipa fallos entre servicios y define mecanismos de recuperación.', areas: ['Distributed Systems', 'Software Architecture', 'Data Security'], milestone: 'Simula una caída y comprueba las alertas. Verifica la recuperación y la protección de los datos.' },
      { id: 'senior', label: 'Senior', goal: 'Guía decisiones de fiabilidad y capacidad con objetivos de negocio.', areas: ['System Design', 'Software Quality', 'Software Maintenance'], milestone: 'Define objetivos de servicio y un presupuesto de errores. Acuerda un plan de mejora compartido.' },
    ],
  },
  {
    id: 'artificial-intelligence', label: 'Artificial Intelligence Engineer',
    purpose: 'Aplica modelos de IA a problemas reales.',
    summary: 'Aplica matemáticas e ingeniería al trabajo con datos. Evalúa los modelos antes de integrarlos en productos útiles.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Construye una base de programación y razonamiento matemático para trabajar con datos.', areas: ['Computing Fundamentals', 'Programming Fundamentals', 'Algebra and Functions', 'Linear Algebra', 'Probability Theory', 'Statistics'], milestone: 'Manipula un conjunto de datos y explica cómo lo representan los vectores. Describe sus distribuciones y su variabilidad.' },
      { id: 'junior', label: 'Junior', goal: 'Entrena y evalúa modelos sencillos con código reproducible y acompañamiento.', areas: ['Data Analytics', 'Artificial Intelligence Fundamentals', 'Machine Learning', 'Software Testing', 'Software Design'], milestone: 'Compara un modelo con una referencia simple usando datos de evaluación separados.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Pasa de experimentos a una aplicación evaluable y mantenible.', areas: ['Calculus', 'Deep Learning', 'Data Engineering', 'Backend Development', 'Generative Artificial Intelligence', 'Generative AI Applications'], milestone: 'Integra un modelo en una API. Usa un conjunto de evaluación para medir su calidad. Registra también la latencia y el coste.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Opera aplicaciones con modelos y controla el uso de los datos. Gestiona los fallos y el consumo de recursos.', areas: ['Operating Systems', 'Computer Networks', 'Cloud Computing', 'Generative Artificial Intelligence', 'Data Security'], milestone: 'Despliega una solución con evaluaciones y trazabilidad. Aplica controles sobre los datos enviados.' },
      { id: 'senior', label: 'Senior', goal: 'Decide cuándo usar IA. Diseña cómo evaluar la solución y cómo operarla. Define un proceso de mejora.', areas: ['Software Architecture', 'System Design', 'Software Engineering Operations', 'Software Quality'], milestone: 'Justifica la solución frente a una alternativa sin IA y define monitorización y retirada segura.' },
    ],
  },
];

export const careerStages = [
  { id: 'foundation', label: 'Trainee / Becario' },
  { id: 'junior', label: 'Entry Level / Junior' },
  { id: 'mid', label: 'Mid Level / Semi-Senior' },
  { id: 'senior', label: 'Senior' },
] as const;

export const careerProfiles: CareerProfile[] = careerProfileTemplates.map(profile => ({
  ...profile,
  stages: careerStages.map(({ id, label }) => {
    const stage = profile.stages.find(stage => stage.id === id)!;
    const transition = profile.stages.find(stage => stage.id === 'advanced');
    return {
      ...stage, label,
      areas: id === 'senior' ? [...new Set([...(transition?.areas ?? []), ...stage.areas])] : stage.areas,
    };
  }),
}));

export const areaGuidance: Record<string, { focus: string; prerequisites: string[] }> = {
  'Computing Fundamentals': { focus: 'Comprende el hardware y el software. Trabaja con archivos y herramientas básicas antes de profundizar en los sistemas.', prerequisites: [] },
  'Security Fundamentals': { focus: 'Identifica amenazas y protege la confidencialidad y la integridad de la información. Aplica el mínimo privilegio.', prerequisites: [] },
  'Artificial Intelligence Fundamentals': { focus: 'Representa problemas y razona sobre posibles soluciones. Distingue búsqueda y aprendizaje a partir de datos.', prerequisites: ['Programming Fundamentals'] },
  'Algebra and Functions': { focus: 'Estudia álgebra y funciones. Desarrolla el razonamiento cuantitativo.', prerequisites: [] },
  'Programming Fundamentals': { focus: 'Comprende los tipos de datos y las funciones. Estudia las estructuras de datos. Practica la depuración y el control de versiones.', prerequisites: [] },
  'Operating Systems': { focus: 'Comprende cómo se gestionan los procesos y la memoria. Trabaja con archivos y permisos mediante la terminal.', prerequisites: [] },
  'Computer Networks': { focus: 'Comprende HTTP y DNS. Sigue el recorrido de una petición y las conexiones que utiliza.', prerequisites: [] },
  'Information Architecture': { focus: 'Organiza los contenidos y sus etiquetas. Diseña una navegación que facilite su comprensión.', prerequisites: [] },
  'Software Requirements': { focus: 'Convierte necesidades en comportamientos y criterios de aceptación.', prerequisites: [] },
  'Frontend Development': { focus: 'Utiliza HTML semántico y CSS. Gestiona el estado de la interfaz con JavaScript. Comprueba su accesibilidad.', prerequisites: ['Programming Fundamentals', 'Computer Networks'] },
  'Backend Development': { focus: 'Gestiona peticiones HTTP mediante APIs. Valida los datos y aplica la lógica de negocio.', prerequisites: ['Programming Fundamentals'] },
  'User Interface Design': { focus: 'Define una jerarquía visual y componentes con estados claros. Adapta la interfaz a distintas pantallas.', prerequisites: ['Information Architecture'] },
  'Software Testing': { focus: 'Escribe pruebas que verifiquen el comportamiento. Incluye los casos límite relevantes.', prerequisites: ['Programming Fundamentals'] },
  'User Experience Design': { focus: 'Diseña flujos comprensibles y accesibles. Valida la experiencia con las personas que los utilizan.', prerequisites: ['Information Architecture'] },
  'Software Design': { focus: 'Define las responsabilidades del código. Aplica SOLID y patrones a problemas concretos.', prerequisites: ['Programming Fundamentals'] },
  'Application Security': { focus: 'Valida las entradas y trátalas de forma segura. Aplica autenticación y autorización.', prerequisites: ['Programming Fundamentals', 'Computer Networks', 'Security Fundamentals'] },
  'Software Architecture': { focus: 'Define los límites y contratos de módulos y servicios. Evalúa el coste de cada decisión.', prerequisites: ['Software Design'] },
  'Software Quality': { focus: 'Evalúa la mantenibilidad y la fiabilidad con evidencia. Mide también el rendimiento.', prerequisites: ['Software Testing', 'Software Design'] },
  'Software Engineering Operations': { focus: 'Practica la integración y la entrega continuas. Observa el sistema y prepara la respuesta a incidentes.', prerequisites: ['Programming Fundamentals'] },
  'System Design': { focus: 'Relaciona los requisitos con las decisiones de arquitectura. Estima la capacidad y define las necesidades de fiabilidad.', prerequisites: ['Software Architecture', 'Computer Networks'] },
  'User Research': { focus: 'Entrevistas y observación para contrastar necesidades reales.', prerequisites: [] },
  'Software Maintenance': { focus: 'Cambia software existente con compatibilidad y migraciones controladas.', prerequisites: ['Software Design', 'Software Testing'] },
  'Relational Databases': { focus: 'Modela los datos de forma relacional y consúltalos con SQL. Estudia los índices y las transacciones.', prerequisites: ['Programming Fundamentals'] },
  'Non-Relational Databases': { focus: 'Compara modelos de datos y patrones de acceso antes de elegir.', prerequisites: ['Programming Fundamentals'] },
  'Distributed Systems': { focus: 'Estudia la comunicación entre nodos y la replicación de datos. Razona sobre la consistencia y los fallos parciales.', prerequisites: ['Computer Networks', 'Operating Systems'] },
  'Cloud Computing': { focus: 'Despliega recursos en la nube. Evalúa su capacidad y disponibilidad. Controla su coste.', prerequisites: ['Operating Systems', 'Computer Networks'] },
  'Data Security': { focus: 'Protege los datos durante todo su ciclo de vida. Define permisos y plazos de retención. Aplica cifrado donde corresponda.', prerequisites: ['Programming Fundamentals'] },
  'Network Security': { focus: 'Protege las comunicaciones con TLS. Segmenta la red y revisa los servicios expuestos. Limita el acceso al necesario.', prerequisites: ['Computer Networks'] },
  'Cloud Security': { focus: 'Gestiona las identidades y los secretos. Limita los permisos. Comprende la responsabilidad compartida con el proveedor.', prerequisites: ['Cloud Computing', 'Network Security', 'Security Fundamentals'] },
  'Linear Algebra': { focus: 'Estudia los vectores y las matrices. Comprende las transformaciones que utilizan los modelos.', prerequisites: ['Algebra and Functions'] },
  'Probability Theory': { focus: 'Estudia los eventos y sus distribuciones. Aprende a razonar bajo incertidumbre.', prerequisites: ['Algebra and Functions'] },
  'Statistics': { focus: 'Estudia la variabilidad y el muestreo. Utiliza la inferencia para interpretar resultados.', prerequisites: ['Probability Theory'] },
  'Machine Learning': { focus: 'Estudia el aprendizaje supervisado. Compara los modelos con referencias simples. Evalúa su capacidad de generalizar.', prerequisites: ['Programming Fundamentals', 'Linear Algebra', 'Statistics'] },
  'Data Analytics': { focus: 'Explora los datos y detecta problemas. Comunica resultados medibles.', prerequisites: ['Programming Fundamentals', 'Statistics'] },
  'Calculus': { focus: 'Derivadas y gradientes para profundizar en la optimización de modelos.', prerequisites: ['Algebra and Functions'] },
  'Deep Learning': { focus: 'Estudia las redes neuronales y su entrenamiento. Aprende a controlar el sobreajuste.', prerequisites: ['Machine Learning', 'Linear Algebra', 'Calculus'] },
  'Data Engineering': { focus: 'Prepara la ingesta y la transformación de datos. Comprueba su calidad y conserva su trazabilidad.', prerequisites: ['Programming Fundamentals'] },
  'Generative AI Applications': { focus: 'Integra modelos y recuperación de contexto en una aplicación. Evalúa su funcionamiento.', prerequisites: ['Generative Artificial Intelligence', 'Software Design'] },
  'Generative Artificial Intelligence': { focus: 'Estudia los modelos generativos y sus límites. Evalúa la calidad de sus respuestas.', prerequisites: ['Deep Learning'] },
};

export const careerBranches: { title: string; description: string; sequence: string[] }[] = [
  {
    title: 'Especialización técnica',
    description: 'Amplía tu impacto entre equipos. Analyst y Architect son especialidades cuyo alcance depende de la empresa. No son grados obligatorios después de Senior.',
    sequence: ['Senior Engineer', 'Staff Engineer', 'Principal Engineer'],
  },
  {
    title: 'Liderazgo técnico',
    description: 'Orienta las decisiones y acompaña al equipo. Coordina las entregas. Technical Lead es una responsabilidad que puede coexistir con distintos niveles técnicos.',
    sequence: ['Senior Engineer', 'Technical Lead'],
  },
  {
    title: 'Gestión y dirección',
    description: 'Asume la gestión de personas y la estrategia de la organización. Chief Technology Officer exige visión de negocio. Los cargos y los pasos varían según la empresa.',
    sequence: ['Engineering Manager', 'Director of Engineering', 'Vice President of Engineering', 'Chief Technology Officer'],
  },
];

export const careerSources = [
  { title: 'MDN · fundamentos de desarrollo web', url: 'https://developer.mozilla.org/en-US/curriculum/core/' },
  { title: 'MDN · primeros pasos en backend', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps' },
  { title: 'Google · prerrequisitos de Machine Learning', url: 'https://developers.google.com/machine-learning/crash-course/prereqs-and-prework' },
  { title: 'Google · Site Reliability Engineering', url: 'https://sre.google/sre-book/table-of-contents/' },
  { title: 'SFIA · autonomía y responsabilidad profesional', url: 'https://sfia-online.org/en/about-sfia/how-sfia-works' },
  { title: 'GitLab · trayectorias de ingeniería', url: 'https://handbook.gitlab.com/handbook/engineering/careers/' },
];
