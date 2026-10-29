import { createConcept as concept, type Track } from '../../../../../shared/lib/curriculum';
import { conceptSources } from '../../../../../shared/data/concept-sources';

export const informationArchitecture: Track = {
    id: 'ux-design',
    title: 'Diseño de experiencia',
    eyebrow: 'User Experience Design',
    modules: [
      {
        id: 'arquitectura-informacion',
        title: 'Arquitectura de la información',
        description: 'Da estructura al contenido antes de añadir detalles visuales.',
        concepts: [
          concept('arquitectura-informacion', 'Arquitectura de la información',
            'La arquitectura de la información define cómo se organiza y relaciona el contenido para que las personas lo comprendan y encuentren.',
            [
              'Establece categorías y nombres que reflejan las tareas y expectativas de quienes lo usan.',
              'La navegación hace visible parte de esa estructura. No es toda la arquitectura de la información.',
            ],
            conceptSources.informationArchitecture,
            'Da un mapa antes de pedir un recorrido.',
            'Una biblioteca técnica se organiza en rutas, módulos y conceptos.'),
          concept('taxonomia', 'Taxonomía y etiquetas',
            'Una taxonomía clasifica contenidos mediante categorías y relaciones definidas.',
            [
              'Las etiquetas expresan esas categorías con nombres que las personas pueden reconocer y distinguir.',
              'Una clasificación útil mantiene criterios coherentes y se contrasta con las tareas reales de sus usuarios.',
            ],
            conceptSources.taxonomy,
            'Nombres claros construyen categorías claras.',
            'Agrupa Raft y elección de líder bajo Coordinación distribuida.'),
          concept('jerarquia', 'Jerarquía visual',
            'La jerarquía visual orienta la atención para comunicar qué información tiene mayor importancia.',
            [
              'Las diferencias de tamaño y contraste permiten destacar unos elementos respecto de otros.',
              'La posición y el espaciado ayudan a reconocer grupos y a seguir un orden de lectura.',
            ],
            conceptSources.hierarchy,
            'Lo principal se reconoce antes de leer.',
            'El título del módulo destaca; la definición es protagonista y el ejemplo queda en segundo plano.'),
          concept('navegacion', 'Navegación consistente',
            'La navegación consistente mantiene un orden relativo estable en los mecanismos de navegación que se repiten.',
            [
              'Las personas pueden reconocer las opciones y anticipar dónde encontrarlas al cambiar de página.',
              'La consistencia permite cambios iniciados por el usuario. No obliga a que todas las páginas tengan idéntico contenido.',
            ],
            conceptSources.navigation,
            'La misma acción vive en el mismo lugar.',
            'El menú conserva su orden y resalta el módulo abierto.'),
          concept('agrupacion-cognitiva', 'Agrupación de información',
            'La agrupación de información organiza elementos relacionados en unidades con significado.',
            [
              'Cada unidad ayuda a interpretar el contenido sin tratar todos sus detalles como piezas aisladas.',
              'Los grupos deben responder a relaciones comprensibles. No existe una cantidad fija que sea adecuada para todos los casos.',
            ],
            conceptSources.chunkingUX,
            'Agrupa por significado, no por cantidad.',
            'Estudia SOLID como cinco principios relacionados, con una definición y un ejemplo por letra.'),
          concept('divulgacion-progresiva', 'Divulgación progresiva',
            'La divulgación progresiva presenta primero las opciones principales y deja los detalles secundarios para cuando se necesitan.',
            [
              'Reduce la complejidad inicial que una persona debe interpretar.',
              'El acceso a los detalles debe resultar reconocible. La información imprescindible para una decisión debe estar disponible en ese momento.',
            ],
            conceptSources.disclosure,
            'Primero comprende; después profundiza.',
            'Una tarjeta muestra el concepto y permite desplegar su ejemplo al pulsar Ver ejemplo.'),
        ],
      },
    ],
  };
