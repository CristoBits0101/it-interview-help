import { conceptSources } from './concept-sources';
import type { Concept } from './curriculum';
import { patternGuides } from './pattern-guides/index';

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
    title: 'Simple Factory',
    description: 'Devuelve un objeto según el argumento recibido con un método común de interfaz o clase abstracta.',
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
    description: 'Envuelve un objeto con otro para añadirle funcionalidades sin tener que tocar su clase.',
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
    id: 'factory-method',
    title: 'Factory Method',
    description: 'Una clase padre define un método de creación común que cada subclase implementa para devolver un objeto.',
    source: conceptSources.factoryMethod,
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
].map(concept => ({
  ...concept,
  level: concept.level as Concept['level'],
  useCase: patternGuides[concept.id].useCase.es,
  example: patternGuides[concept.id].code,
}));

const patternPages = [
  {
    id: 'patrones',
    title: 'Creational',
    description: 'Definen cómo se crean los objetos.',
    conceptIds: ['factory', 'builder', 'prototype', 'singleton', 'factory-method'],
  },
  {
    id: 'patrones-estructurales',
    title: 'Structural',
    description: 'Definen cómo se componen los objetos para formar estructuras.',
    conceptIds: ['facade', 'adapter', 'decorator'],
  },
  {
    id: 'patrones-comportamiento',
    title: 'Behavioral',
    description: 'Define cómo colaboran y se reparten responsabilidades los objetos.',
    conceptIds: ['iterator', 'strategy', 'observer', 'state', 'mediator', 'visitor'],
  },
];

export const designPatternPages = patternPages.map(({ conceptIds, ...page }) => {
  const ids = new Set(conceptIds);
  return { ...page, concepts: designPatterns.filter(concept => ids.has(concept.id)) };
});
