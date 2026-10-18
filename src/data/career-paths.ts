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
  summary: string;
  stages: CareerStage[];
}

// Editorial study recommendations, not a universal career ladder or certification.
// Repeated areas mean deeper practice as autonomy and responsibility increase.
export const careerProfiles: CareerProfile[] = [
  {
    id: 'frontend', label: 'Frontend Engineer',
    summary: 'Une programación, experiencia de usuario y calidad para construir interfaces accesibles.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Entiende la web y organiza la información antes de elegir un framework.', areas: ['Programming', 'Computer Networks', 'Information Architecture', 'Software Requirements'], milestone: 'Construye una página semántica y explica cómo llega del servidor al navegador.' },
      { id: 'junior', label: 'Junior', goal: 'Entrega interfaces pequeñas con acompañamiento y pruebas básicas.', areas: ['Frontend Development', 'User Interface Design', 'Software Testing'], milestone: 'Implementa un formulario accesible, adaptable a móvil y probado.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Resuelve funcionalidades completas y toma decisiones de diseño con autonomía.', areas: ['User Experience Design', 'Software Design', 'Application Security'], milestone: 'Entrega un flujo con estados de carga, errores y validación segura.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Mejora la estructura, el rendimiento y la entrega de una aplicación existente.', areas: ['Software Architecture', 'Software Quality', 'Software Engineering Operations'], milestone: 'Justifica una modularización y mide su efecto en rendimiento y mantenimiento.' },
      { id: 'senior', label: 'Senior', goal: 'Decide con contexto de producto y guía cambios que afectan a otros equipos.', areas: ['System Design', 'User Research', 'Software Quality', 'Software Maintenance'], milestone: 'Dirige una evolución de la interfaz con métricas, compatibilidad y plan de migración.' },
    ],
  },
  {
    id: 'backend', label: 'Backend Engineer',
    summary: 'Empieza por servicios y datos; añade distribución y nube cuando entiendas sus costes.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Comprende el lenguaje, los procesos y la comunicación entre cliente y servidor.', areas: ['Programming', 'Operating Systems', 'Computer Networks', 'Software Requirements'], milestone: 'Explica una petición HTTP y construye un programa que procese y valide datos.' },
      { id: 'junior', label: 'Junior', goal: 'Construye servicios pequeños con persistencia y controles de seguridad.', areas: ['Backend Development', 'Relational Databases', 'Software Testing', 'Application Security'], milestone: 'Entrega una API con autenticación, consultas parametrizadas y pruebas de integración.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Mantén servicios completos y elige el almacenamiento según el problema.', areas: ['Software Design', 'Non-Relational Databases', 'Software Engineering Operations'], milestone: 'Opera un servicio con registros, métricas y despliegues reproducibles.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Razona sobre límites de servicio, fallos parciales y capacidad.', areas: ['Software Architecture', 'Distributed Systems', 'Cloud Computing'], milestone: 'Diseña una integración con colas, reintentos e idempotencia y comprueba sus fallos.' },
      { id: 'senior', label: 'Senior', goal: 'Equilibra fiabilidad, seguridad, coste y evolución del sistema.', areas: ['System Design', 'Software Quality', 'Data Security', 'Software Maintenance'], milestone: 'Defiende un diseño con estimaciones, objetivos de servicio y una migración gradual.' },
    ],
  },
  {
    id: 'full-stack', label: 'Full Stack Engineer',
    summary: 'Conecta interfaz, servicios y datos; desarrolla profundidad en una parte sin perder la visión completa.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Conecta los fundamentos de programación con el recorrido de una petición web.', areas: ['Programming', 'Computer Networks', 'Information Architecture', 'Operating Systems'], milestone: 'Describe el recorrido navegador → servidor → datos y maqueta una interfaz clara.' },
      { id: 'junior', label: 'Junior', goal: 'Completa una funcionalidad sencilla de extremo a extremo con ayuda.', areas: ['Frontend Development', 'Backend Development', 'Relational Databases', 'Software Testing', 'Application Security'], milestone: 'Construye un flujo que guarde datos y pruebe tanto la interfaz como la API.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Asume una funcionalidad de producto, desde su uso hasta su despliegue.', areas: ['User Experience Design', 'Software Design', 'Software Engineering Operations'], milestone: 'Entrega una mejora completa y observa errores y comportamiento después del despliegue.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Separa responsabilidades y entiende cuándo distribuir una aplicación.', areas: ['Software Architecture', 'Cloud Computing', 'Distributed Systems'], milestone: 'Compara mantener un monolito con extraer un servicio y justifica la decisión.' },
      { id: 'senior', label: 'Senior', goal: 'Coordina decisiones entre capas y ayuda a otros a mantener el producto.', areas: ['System Design', 'Software Quality', 'Data Security', 'Software Maintenance'], milestone: 'Conduce una evolución del producto con riesgos, contratos y métricas de éxito claros.' },
    ],
  },
  {
    id: 'devops', label: 'DevOps Engineer',
    summary: 'Combina sistemas, automatización y colaboración para entregar y operar software fiable.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Aprende a automatizar tareas y diagnosticar procesos y conexiones.', areas: ['Programming', 'Operating Systems', 'Computer Networks'], milestone: 'Automatiza una tarea y diagnostica un fallo de proceso, permisos o conexión.' },
      { id: 'junior', label: 'Junior', goal: 'Entrega cambios repetibles con pruebas y acceso controlado.', areas: ['Software Engineering Operations', 'Software Testing', 'Network Security'], milestone: 'Prepara una integración continua con pruebas y un despliegue reversible.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Opera entornos reproducibles y reduce trabajo manual con seguridad.', areas: ['Cloud Computing', 'Cloud Security', 'Software Design'], milestone: 'Versiona infraestructura, limita permisos y prueba la restauración de una copia.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Anticipa fallos entre servicios y define mecanismos de recuperación.', areas: ['Distributed Systems', 'Software Architecture', 'Data Security'], milestone: 'Simula una caída y verifica alertas, recuperación y protección de datos.' },
      { id: 'senior', label: 'Senior', goal: 'Guía decisiones de fiabilidad y capacidad con objetivos de negocio.', areas: ['System Design', 'Software Quality', 'Software Maintenance'], milestone: 'Define objetivos de servicio, presupuesto de errores y un plan de mejora compartido.' },
    ],
  },
  {
    id: 'artificial-intelligence', label: 'Artificial Intelligence Engineer',
    summary: 'Une matemáticas, datos e ingeniería para evaluar modelos e integrarlos en productos útiles.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Construye una base de programación y razonamiento matemático para trabajar con datos.', areas: ['Mathematics', 'Programming', 'Linear Algebra', 'Probability Theory', 'Statistics'], milestone: 'Manipula un conjunto de datos y explica vectores, distribuciones y variabilidad.' },
      { id: 'junior', label: 'Junior', goal: 'Entrena y evalúa modelos sencillos con código reproducible y acompañamiento.', areas: ['Machine Learning', 'Data Analytics', 'Software Testing', 'Software Design'], milestone: 'Compara un modelo con una referencia simple usando datos de evaluación separados.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Pasa de experimentos a una aplicación evaluable y mantenible.', areas: ['Calculus', 'Deep Learning', 'Data Engineering', 'Backend Development', 'Applied Artificial Intelligence'], milestone: 'Integra un modelo en una API y mide calidad, latencia y coste con un conjunto de evaluación.' },
      { id: 'advanced', label: 'Mid-Level → Senior', goal: 'Opera aplicaciones con modelos y controla datos, fallos y consumo de recursos.', areas: ['Operating Systems', 'Computer Networks', 'Cloud Computing', 'Generative Artificial Intelligence', 'Data Security'], milestone: 'Despliega una solución con evaluaciones, trazabilidad y controles sobre los datos enviados.' },
      { id: 'senior', label: 'Senior', goal: 'Decide cuándo usar IA y diseña su ciclo de evaluación, operación y mejora.', areas: ['Software Architecture', 'System Design', 'Software Engineering Operations', 'Software Quality'], milestone: 'Justifica la solución frente a una alternativa sin IA y define monitorización y retirada segura.' },
    ],
  },
];

// Dependencies describe useful prior knowledge, not hard admission requirements.
// Keep labels identical to navigation.ts so existing lessons can be resolved.
export const areaGuidance: Record<string, { focus: string; prerequisites: string[] }> = {
  'Mathematics': { focus: 'Álgebra, funciones y razonamiento cuantitativo.', prerequisites: [] },
  'Programming': { focus: 'Tipos, funciones, estructuras de datos, depuración y control de versiones.', prerequisites: [] },
  'Operating Systems': { focus: 'Procesos, memoria, archivos, permisos y terminal.', prerequisites: [] },
  'Computer Networks': { focus: 'HTTP, DNS, conexiones y el recorrido de una petición.', prerequisites: [] },
  'Information Architecture': { focus: 'Organiza contenidos, etiquetas y navegación para facilitar su comprensión.', prerequisites: [] },
  'Software Requirements': { focus: 'Convierte necesidades en comportamientos y criterios de aceptación.', prerequisites: [] },
  'Frontend Development': { focus: 'HTML semántico, CSS, JavaScript, accesibilidad y estado de la interfaz.', prerequisites: ['Programming', 'Computer Networks'] },
  'Backend Development': { focus: 'Peticiones HTTP, APIs, validación y lógica de negocio.', prerequisites: ['Programming'] },
  'User Interface Design': { focus: 'Jerarquía visual, componentes, estados y adaptación a pantallas.', prerequisites: ['Information Architecture'] },
  'Software Testing': { focus: 'Pruebas útiles, casos límite y verificación de comportamiento.', prerequisites: ['Programming'] },
  'User Experience Design': { focus: 'Flujos comprensibles, accesibilidad y validación de la experiencia.', prerequisites: ['Information Architecture'] },
  'Software Design': { focus: 'Responsabilidades, SOLID y patrones aplicados a problemas concretos.', prerequisites: ['Programming'] },
  'Application Security': { focus: 'Validación, autenticación, autorización y tratamiento seguro de entradas.', prerequisites: ['Programming', 'Computer Networks'] },
  'Software Architecture': { focus: 'Límites de módulos y servicios, contratos y decisiones con sus costes.', prerequisites: ['Software Design'] },
  'Software Quality': { focus: 'Evalúa mantenibilidad, fiabilidad y rendimiento con evidencia.', prerequisites: ['Software Testing', 'Software Design'] },
  'Software Engineering Operations': { focus: 'Integración y entrega continuas, observabilidad y respuesta a incidentes.', prerequisites: ['Programming'] },
  'System Design': { focus: 'Integra requisitos, capacidad, fiabilidad y decisiones arquitectónicas.', prerequisites: ['Software Architecture', 'Computer Networks'] },
  'User Research': { focus: 'Entrevistas y observación para contrastar necesidades reales.', prerequisites: [] },
  'Software Maintenance': { focus: 'Cambia software existente con compatibilidad y migraciones controladas.', prerequisites: ['Software Design', 'Software Testing'] },
  'Relational Databases': { focus: 'Modelado relacional, SQL, índices y transacciones.', prerequisites: ['Programming'] },
  'Non-Relational Databases': { focus: 'Compara modelos de datos y patrones de acceso antes de elegir.', prerequisites: ['Programming'] },
  'Distributed Systems': { focus: 'Comunicación, replicación, consistencia y fallos parciales.', prerequisites: ['Computer Networks', 'Operating Systems'] },
  'Cloud Computing': { focus: 'Recursos, despliegue, capacidad, disponibilidad y coste en la nube.', prerequisites: ['Operating Systems', 'Computer Networks'] },
  'Data Security': { focus: 'Permisos, cifrado, retención y protección de datos durante todo su ciclo.', prerequisites: ['Programming'] },
  'Network Security': { focus: 'TLS, segmentación, exposición de servicios y acceso mínimo.', prerequisites: ['Computer Networks'] },
  'Cloud Security': { focus: 'Identidades, secretos, permisos y responsabilidad compartida.', prerequisites: ['Cloud Computing', 'Network Security'] },
  'Linear Algebra': { focus: 'Vectores, matrices y transformaciones usadas por los modelos.', prerequisites: ['Mathematics'] },
  'Probability Theory': { focus: 'Eventos, distribuciones y razonamiento bajo incertidumbre.', prerequisites: ['Mathematics'] },
  'Statistics': { focus: 'Variabilidad, muestreo e inferencia para interpretar resultados.', prerequisites: ['Probability Theory'] },
  'Machine Learning': { focus: 'Aprendizaje supervisado, referencias simples, generalización y evaluación.', prerequisites: ['Programming', 'Linear Algebra', 'Statistics'] },
  'Data Analytics': { focus: 'Explora datos, detecta problemas y comunica resultados medibles.', prerequisites: ['Programming', 'Statistics'] },
  'Calculus': { focus: 'Derivadas y gradientes para profundizar en la optimización de modelos.', prerequisites: ['Mathematics'] },
  'Deep Learning': { focus: 'Redes neuronales, entrenamiento y control del sobreajuste.', prerequisites: ['Machine Learning', 'Linear Algebra', 'Calculus'] },
  'Data Engineering': { focus: 'Ingesta, transformación, calidad y trazabilidad de conjuntos de datos.', prerequisites: ['Programming'] },
  'Applied Artificial Intelligence': { focus: 'Integra modelos, recuperación de contexto y evaluaciones en una aplicación.', prerequisites: ['Machine Learning', 'Software Design'] },
  'Generative Artificial Intelligence': { focus: 'Modelos generativos, sus límites y evaluación de respuestas.', prerequisites: ['Deep Learning'] },
};

export const careerBranches: { title: string; description: string; sequence: string[] }[] = [
  {
    title: 'Especialización técnica',
    description: 'Amplía tu impacto entre equipos. Analyst y Architect son especialidades con distinto alcance según la empresa, no grados obligatorios después de Senior.',
    sequence: ['Senior Engineer', 'Staff Engineer', 'Principal Engineer'],
  },
  {
    title: 'Liderazgo técnico',
    description: 'Orienta decisiones, acompaña al equipo y coordina entregas. Technical Lead es una responsabilidad; puede coexistir con distintos niveles técnicos.',
    sequence: ['Senior Engineer', 'Technical Lead'],
  },
  {
    title: 'Gestión y dirección',
    description: 'La responsabilidad pasa a personas, organización y estrategia. Chief Technology Officer exige visión de negocio; los cargos y pasos varían según la empresa.',
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
