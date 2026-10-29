import type { ConceptSource } from '../data/concept-sources';

export type Concept = {
  id: string;
  title: string;
  description: string;
  useCase?: string;
  example?: string;
  details?: string[];
  source: ConceptSource;
  memory?: string;
  level: 'Esencial' | 'Intermedio' | 'Avanzado';
};

export type Module = {
  id: string;
  title: string;
  description: string;
  concepts: Concept[];
};

export type Track = {
  id: string;
  title: string;
  eyebrow: string;
  modules: Module[];
};

export const createConcept = (
  id: string,
  title: string,
  description: string,
  details: string[],
  source: ConceptSource,
  memory: string,
  example: string,
  level: Concept['level'] = 'Esencial',
): Concept => ({ id, title, description, details, source, memory, example, level });
