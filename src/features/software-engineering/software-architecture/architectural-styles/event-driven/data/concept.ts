import { createConcept as concept } from '../../../../../../shared/lib/curriculum';
import { conceptSources } from '../../../../../../shared/data/concept-sources';

export const eventDrivenConcept = concept('event-driven', 'Arquitectura orientada a eventos',
            'Una arquitectura orientada a eventos conecta componentes mediante hechos publicados y reacciones a esos hechos.',
            [
              'El productor comunica un cambio sin tener que dirigir toda la lógica de sus consumidores.',
              'El diseño debe hacer visible el recorrido de los eventos y definir cómo tratar repeticiones o retrasos.',
            ],
            conceptSources.events,
            'Un hecho activa varias reacciones.',
            'PedidoPagado activa preparación, facturación y notificaciones en consumidores independientes.', 'Intermedio');
