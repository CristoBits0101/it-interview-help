import type { LocalizedText } from '../../../../../../../shared/lib/localized-text';

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const javaDeveloperRoadmap = [
  text('Fundamentos de Programación', 'Programming Fundamentals'),
  text('Estructuras de Datos', 'Data Structures'),
  text('Algoritmos', 'Algorithms'),
];
