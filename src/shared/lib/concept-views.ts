import type { Concept } from './curriculum';
export type ConceptView = { id: 'explanation' | 'use-case' | 'example'; label: string; content: string; active: boolean };
export function createConceptViews(concept: Concept): ConceptView[] {
  const views = [
    { id: 'explanation' as const, label: 'Explicación', content: concept.description.trim() },
    { id: 'use-case' as const, label: 'Caso de uso', content: concept.useCase?.trim() ?? '' },
    { id: 'example' as const, label: 'Implementación', content: concept.example?.trim() ?? '' },
  ];
  const initial = views.find(view => view.content);
  return views.map(view => ({ ...view, active: view.id === initial?.id }));
}
