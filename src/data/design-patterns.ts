import { conceptSources } from './concept-sources';
import type { Concept } from './curriculum';

export const designPatterns: Concept[] = [
  {
    id: 'facade',
    title: 'Facade',
    description: 'Facade simplifica el uso de varios componentes con un acceso común que coordina sus operaciones internas.',
    source: conceptSources.facade,
    level: 'Esencial',
  },
  {
    id: 'adapter',
    title: 'Adapter',
    description: 'Adapter traduce la interfaz de un componente para conectarlo con otro incompatible sin modificar el original.',
    source: conceptSources.adapter,
    level: 'Esencial',
  },
  {
    id: 'iterator',
    title: 'Iterator',
    description: 'Iterator recorre una colección mediante una interfaz común sin exponer cómo se almacenan sus elementos.',
    source: conceptSources.iterator,
    level: 'Esencial',
  },
  {
    id: 'factory',
    title: 'Factory',
    description: 'Factory separa la creación de objetos de su uso. En Factory Method las subclases deciden qué tipo crear.',
    source: conceptSources.factory,
    level: 'Esencial',
  },
  {
    id: 'builder',
    title: 'Builder',
    description: 'Simplifica la creación de objetos para evitar la sobrecarga de constructores o demasiados parámetros.',
    source: conceptSources.builder,
    level: 'Esencial',
  },
  {
    id: 'prototype',
    title: 'Prototype',
    description: 'Permite copiar un objeto y el estado de sus atributos.',
    source: conceptSources.prototype,
    level: 'Intermedio',
  },
  {
    id: 'strategy',
    title: 'Strategy',
    description: 'Strategy permite intercambiar algoritmos con una interfaz común sin modificar el código que los utiliza.',
    source: conceptSources.strategy,
    level: 'Intermedio',
  },
  {
    id: 'decorator',
    title: 'Decorator',
    description: 'Decorator añade funciones envolviendo un objeto con otro que conserva su interfaz sin cambiar su clase.',
    source: conceptSources.decorator,
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
    id: 'singleton',
    title: 'Singleton',
    description: 'Sirve para limitar a una única instancia por clase y requiere definir un punto de acceso al objeto.',
    source: conceptSources.singleton,
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
  },
];

const patternPages = [
  {
    id: 'patrones',
    title: 'Creational',
    description: 'Patrones para decidir cómo se crean los objetos.',
    conceptIds: ['factory', 'builder', 'prototype', 'singleton'],
  },
  {
    id: 'patrones-estructurales',
    title: 'Structural',
    description: 'Patrones para organizar objetos y sus relaciones.',
    conceptIds: ['facade', 'adapter', 'decorator'],
  },
  {
    id: 'patrones-comportamiento',
    title: 'Behavioral',
    description: 'Patrones para organizar la comunicación y las responsabilidades entre objetos.',
    conceptIds: ['iterator', 'strategy', 'observer', 'state', 'mediator', 'visitor'],
  },
];

export const designPatternPages = patternPages.map(({ conceptIds, ...page }) => {
  const ids = new Set(conceptIds);
  return { ...page, concepts: designPatterns.filter(concept => ids.has(concept.id)) };
});
