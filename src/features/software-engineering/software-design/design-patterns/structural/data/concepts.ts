import { conceptSources } from '../../../../../../shared/data/concept-sources';

export const structuralConcepts = [
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
    id: 'decorator',
    title: 'Decorator',
    description: 'Envuelve un objeto con otro para añadirle funcionalidades sin tener que tocar su clase.',
    source: conceptSources.decorator,
    level: 'Intermedio',
  }
];

export const structuralPage = {
    id: 'patrones-estructurales',
    title: 'Structural',
    description: 'Definen cómo se componen los objetos para formar estructuras.',
    conceptIds: ['facade', 'adapter', 'decorator'],
  };
