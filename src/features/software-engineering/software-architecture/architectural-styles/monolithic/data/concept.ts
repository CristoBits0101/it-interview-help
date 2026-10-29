import { createConcept as concept } from '../../../../../../shared/lib/curriculum';
import { conceptSources } from '../../../../../../shared/data/concept-sources';

export const monolithicConcept = concept('monolito', 'Monolito',
            'Un monolito es una aplicación que se construye y despliega como una unidad.',
            [
              'Puede organizarse internamente en módulos con responsabilidades y contratos claros.',
              'Un cambio suele requerir desplegar la unidad completa. Su tamaño no determina por sí solo la calidad de su diseño.',
            ],
            conceptSources.microservices,
            'Una unidad desplegable, módulos posibles.',
            'Catálogo y pedidos comparten despliegue, pero mantienen interfaces y responsabilidades separadas.');
