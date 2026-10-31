import type { CareerProfile } from './career-paths';

export const contentCareerProfileTemplates: CareerProfile[] = [
  {
    id: 'ux-writer',
    label: 'Redactor UX',
    purpose: 'Redacta textos de interfaz',
    summary: 'Escribe textos claros y accesibles que ayudan a completar tareas en una interfaz.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Comprende las necesidades de las personas y la función de cada texto en una tarea.', areas: ['User Research', 'Information Architecture', 'Accessibility'], milestone: 'Explica qué necesita saber una persona antes de completar un formulario.' },
      { id: 'junior', label: 'Junior', goal: 'Redacta mensajes y etiquetas de un flujo definido con acompañamiento.', areas: ['Information Architecture', 'Interaction Design', 'User Interface Design', 'Accessibility'], milestone: 'Redacta una etiqueta y un mensaje de error que indiquen cómo continuar.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Evalúa la comprensión de los textos y mantiene una voz coherente.', areas: ['User Research', 'Usability Evaluation', 'Accessibility', 'Software Requirements'], milestone: 'Prueba dos versiones de un mensaje con usuarios y justifica la elección.' },
      { id: 'senior', label: 'Senior', goal: 'Orienta criterios de escritura compartidos entre recorridos y equipos.', areas: ['User Research', 'User Experience Design', 'Accessibility', 'Usability Evaluation'], milestone: 'Acuerda una guía de voz y comprueba su utilidad en distintos flujos.' },
    ],
  },
  {
    id: 'information-architect',
    label: 'Arquitecto de Información',
    purpose: 'Organiza información y navegación',
    summary: 'Organiza la información para que las personas puedan encontrarla y comprenderla.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Comprende cómo las personas buscan información y agrupan conceptos.', areas: ['User Research', 'Information Architecture', 'Accessibility'], milestone: 'Agrupa un conjunto pequeño de contenidos y explica el criterio usado.' },
      { id: 'junior', label: 'Junior', goal: 'Practica la organización de contenidos y etiquetas con apoyo.', areas: ['User Research', 'Information Architecture', 'Usability Evaluation'], milestone: 'Prueba si una persona encuentra un contenido dentro de una estructura sencilla.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Diseña taxonomías y navegación a partir de necesidades comprobadas.', areas: ['User Research', 'Information Architecture', 'Interaction Design', 'Usability Evaluation', 'Accessibility'], milestone: 'Compara dos estructuras de navegación y justifica cuál facilita las tareas evaluadas.' },
      { id: 'senior', label: 'Senior', goal: 'Orienta la evolución de estructuras compartidas entre productos y equipos.', areas: ['Information Architecture', 'User Experience Design', 'Software Requirements', 'Accessibility'], milestone: 'Planifica una revisión de taxonomía con responsables y criterios de mantenimiento.' },
    ],
  },
  {
    id: 'content-strategist',
    label: 'Estratega de Contenidos',
    purpose: 'Planifica contenido de producto',
    summary: 'Orienta la gestión del contenido durante la vida de un producto digital.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Comprende qué contenido necesita una persona para completar sus tareas.', areas: ['User Research', 'Information Architecture', 'Accessibility'], milestone: 'Relaciona un contenido con una necesidad y detecta información que falta.' },
      { id: 'junior', label: 'Junior', goal: 'Practica auditorías de contenido y documenta responsabilidades con apoyo.', areas: ['Information Architecture', 'Software Requirements', 'Accessibility'], milestone: 'Prepara un inventario con propósito y responsable de cada contenido.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Planifica la creación y revisión de contenido según evidencia de uso.', areas: ['User Research', 'Information Architecture', 'Data Analytics', 'Usability Evaluation'], milestone: 'Prioriza una mejora de contenido y define cómo evaluar su utilidad.' },
      { id: 'senior', label: 'Senior', goal: 'Acuerda criterios de gobierno y mantenimiento de contenido entre equipos.', areas: ['Information Architecture', 'User Experience Design', 'Software Requirements', 'Accessibility'], milestone: 'Define quién revisa y retira contenido y cómo comprobar que sigue siendo útil.' },
    ],
  },
  {
    id: 'ux-strategist',
    label: 'Estratega UX',
    purpose: 'Orienta prioridades de experiencia',
    summary: 'Orienta la experiencia de usuario según los objetivos y posibilidades del producto.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Comprende cómo una necesidad de usuario se relaciona con un objetivo de producto.', areas: ['User Research', 'User Experience Design', 'Software Requirements'], milestone: 'Distingue una necesidad observada de una solución propuesta por el equipo.' },
      { id: 'junior', label: 'Junior', goal: 'Practica la síntesis de evidencia y la comparación de oportunidades con apoyo.', areas: ['User Research', 'Information Architecture', 'Data Analytics', 'Usability Evaluation'], milestone: 'Resume un hallazgo de investigación y explica qué decisión puede informar.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Prioriza mejoras de experiencia según evidencia y restricciones del producto.', areas: ['User Research', 'User Experience Design', 'Software Requirements', 'Accessibility', 'Usability Evaluation'], milestone: 'Compara dos oportunidades y propone una prioridad con un resultado medible.' },
      { id: 'senior', label: 'Senior', goal: 'Acuerda una dirección de experiencia compartida entre productos y equipos.', areas: ['User Research', 'User Experience Design', 'Data Analytics', 'Software Requirements', 'Accessibility'], milestone: 'Propone una estrategia de experiencia y define cuándo revisarla según los resultados.' },
    ],
  },
];
