import type { CareerProfile } from './career-paths';

export const researchCareerProfileTemplates: CareerProfile[] = [
  {
    id: 'research-engineer',
    label: 'Ingeniero de Investigación en IA',
    purpose: 'Construye sistemas para experimentar',
    summary: 'Implementa métodos y sistemas que permiten contrastar ideas de investigación. Las primeras etapas preparan fundamentos para esta especialidad.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Prepara una base de programación y matemáticas para reproducir experimentos.', areas: ['Programming Fundamentals', 'Linear Algebra', 'Probability Theory', 'Statistics'], milestone: 'Implementa un cálculo con datos de prueba y verifica su resultado esperado.' },
      { id: 'junior', label: 'Junior', goal: 'Practica la reproducción de resultados publicados con acompañamiento.', areas: ['Machine Learning', 'Software Design', 'Software Testing', 'Data Analytics'], milestone: 'Reproduce un experimento sencillo y registra la configuración y sus diferencias con la referencia.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Construye herramientas que permiten comparar métodos con resultados reproducibles.', areas: ['Deep Learning', 'Data Engineering', 'Distributed Systems', 'Software Engineering Operations'], milestone: 'Compara dos implementaciones con los mismos datos y mide su calidad y coste computacional.' },
      { id: 'senior', label: 'Senior', goal: 'Orienta sistemas de experimentación que permiten investigar a mayor escala.', areas: ['Software Architecture', 'System Design', 'Software Quality', 'Data Security'], milestone: 'Diseña una infraestructura experimental y define cómo detectar errores que invaliden sus resultados.' },
    ],
  },
  {
    id: 'research-scientist',
    label: 'Científico de Investigación en IA',
    purpose: 'Investiga nuevos métodos de IA',
    summary: 'Formula hipótesis y desarrolla métodos que aportan conocimiento verificable. Las primeras etapas preparan fundamentos para una trayectoria de investigación.',
    stages: [
      { id: 'foundation', label: 'Fundamentos', goal: 'Prepara matemáticas y programación para comprender y contrastar modelos.', areas: ['Programming Fundamentals', 'Linear Algebra', 'Calculus', 'Probability Theory', 'Statistics'], milestone: 'Explica los supuestos de un modelo sencillo y comprueba un resultado con datos simulados.' },
      { id: 'junior', label: 'Junior', goal: 'Practica la lectura crítica y la reproducción de experimentos con supervisión.', areas: ['Artificial Intelligence Fundamentals', 'Machine Learning', 'Data Analytics', 'Software Testing'], milestone: 'Reproduce un resultado publicado y distingue la evidencia de las conclusiones que no permite obtener.' },
      { id: 'mid', label: 'Mid-Level', goal: 'Formula hipótesis y diseña experimentos que separan el efecto de cada decisión.', areas: ['Statistics', 'Deep Learning', 'Data Engineering', 'Generative Artificial Intelligence'], milestone: 'Contrasta una hipótesis con referencias y ablaciones y comunica la incertidumbre del resultado.' },
      { id: 'senior', label: 'Senior', goal: 'Orienta una agenda de investigación y evalúa la validez de sus contribuciones.', areas: ['Statistics', 'Machine Learning', 'Deep Learning', 'Data Quality and Governance', 'Software Quality'], milestone: 'Propone una contribución original con criterios de refutación y un plan de reproducción independiente.' },
    ],
  },
];
