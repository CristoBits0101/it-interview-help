import type { Module } from '../../../../../shared/lib/curriculum';
import { conceptSources } from '../../../../../shared/data/concept-sources';

export const solidModule: Module = {
        id: 'solid',
        title: '5 Principios SOLID',
        description: 'Ayudan a separar el código en piezas fáciles de cambiar y combinar.',
        concepts: [
          {
            id: 'solid-s',
            title: '(S) Responsabilidad Única',
            description: 'Un módulo debe responder a una sola responsabilidad de negocio y tener una única razón para cambiar.',
            source: conceptSources.srp,
            level: 'Esencial',
          },
          {
            id: 'solid-o',
            title: '(O) Abierto / Cerrado',
            description: 'Permite añadir comportamientos sin modificar el código estable mediante implementaciones nuevas.',
            source: conceptSources.ocp,
            level: 'Esencial',
          },
          {
            id: 'solid-l',
            title: '(L) Sustitución de Liskov',
            description: 'Un tipo derivado debe sustituir al tipo base respetando sus garantías sin exigir condiciones más estrictas.',
            source: conceptSources.lsp,
            level: 'Intermedio',
          },
          {
            id: 'solid-i',
            title: '(I) Segregación de Interfaces',
            description: 'Cada componente debe depender solo de las operaciones que necesita mediante interfaces adaptadas a su uso.',
            source: conceptSources.isp,
            level: 'Esencial',
          },
          {
            id: 'solid-d',
            title: '(D) Inversión de Dependencias',
            description: 'Las reglas de negocio y los detalles técnicos dependen de interfaces. Los detalles se adaptan a esos contratos.',
            source: conceptSources.dip,
            level: 'Intermedio',
          },
        ],
      };
