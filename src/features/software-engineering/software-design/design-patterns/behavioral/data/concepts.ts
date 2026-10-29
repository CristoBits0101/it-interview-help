import { conceptSources } from '../../../../../../shared/data/concept-sources';

export const behavioralConcepts = [
{
    id: 'iterator',
    title: 'Iterator',
    description: 'Iterator recorre una colección mediante una interfaz común sin exponer cómo se almacenan sus elementos.',
    source: conceptSources.iterator,
    level: 'Esencial',
  },
{
    id: 'strategy',
    title: 'Strategy',
    description: 'Strategy permite intercambiar algoritmos con una interfaz común sin modificar el código que los utiliza.',
    source: conceptSources.strategy,
    level: 'Intermedio',
  },
{
    id: 'observer',
    title: 'Observer',
    description: 'Observer notifica a los objetos suscritos cuando cambia el estado de otro para que puedan reaccionar.',
    source: conceptSources.observer,
    level: 'Intermedio',
  },
{
    id: 'state',
    title: 'State',
    description: 'State cambia el comportamiento de un objeto al delegarlo en otro que representa su estado actual.',
    source: conceptSources.state,
    level: 'Intermedio',
  },
{
    id: 'mediator',
    title: 'Mediator',
    description: 'Mediator coordina la comunicación entre objetos para que colaboren sin depender directamente entre sí.',
    source: conceptSources.mediator,
    level: 'Intermedio',
  },
{
    id: 'visitor',
    title: 'Visitor',
    description: 'Visitor añade operaciones sin cambiar las clases. Cada objeto acepta un visitante que actúa según su tipo.',
    source: conceptSources.visitor,
    level: 'Avanzado',
  }
];

export const behavioralPage = {
    id: 'patrones-comportamiento',
    title: 'Behavioral',
    description: 'Define cómo colaboran y se reparten responsabilidades los objetos.',
    conceptIds: ['iterator', 'strategy', 'observer', 'state', 'mediator', 'visitor'],
  };
