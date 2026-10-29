import type { Track } from '../../../../shared/lib/curriculum';
import { restConcept } from '../architectural-styles/rest/data/concept';
import { mvcConcept } from '../architectural-patterns/mvc/data/concept';
import { monolithicConcept } from '../architectural-styles/monolithic/data/concept';
import { microservicesConcept } from '../architectural-styles/microservices/data/concept';
import { eventDrivenConcept } from '../architectural-styles/event-driven/data/concept';

export const softwareArchitecture: Track = {
    id: 'software-architecture',
    title: 'Arquitectura de software',
    eyebrow: 'Software Architecture',
    modules: [
      {
        id: 'estilos-arquitectura',
        title: 'Estilos y estructuras',
        description: 'Cinco formas de organizar responsabilidades y comunicación.',
        concepts: [
          restConcept,
          mvcConcept,
          monolithicConcept,
          microservicesConcept,
          eventDrivenConcept,
        ],
      },
    ],
  };
