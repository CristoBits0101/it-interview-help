import { conceptSources } from '../../../../../../shared/data/concept-sources';

export const creationalConcepts = [
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
  }
];

export const creationalPage = {
    id: 'patrones',
    title: 'Creational',
    description: 'Definen cómo se crean los objetos.',
    conceptIds: ['factory', 'builder', 'prototype', 'singleton', 'factory-method'],
  };
