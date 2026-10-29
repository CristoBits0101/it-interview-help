import type { LocalizedText } from '../../../../../../../shared/lib/localized-text';

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const javaDeveloperRoadmap = [
  text('Fundamentos de Java', 'Java Fundamentals'),
  text('Programación Orientada a Objetos', 'OOP'),
  text('Colecciones', 'Collections'),
  text('Concurrencia', 'Concurrency'),
  text('Frameworks', 'Frameworks'),
  text('Pruebas', 'Testing'),
];
