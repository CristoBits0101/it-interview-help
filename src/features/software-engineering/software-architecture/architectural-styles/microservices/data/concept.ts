import { createConcept as concept } from '../../../../../../shared/lib/curriculum';
import { conceptSources } from '../../../../../../shared/data/concept-sources';

export const microservicesConcept = concept('microservicios', 'Microservicios',
            'La arquitectura de microservicios organiza una aplicación en servicios con despliegue independiente.',
            [
              'Cada servicio delimita una capacidad de negocio y se comunica mediante un contrato explícito.',
              'La autonomía exige gestionar los fallos de red y la coordinación de datos entre servicios.',
            ],
            conceptSources.microservices,
            'Autonomía a cambio de coordinación.',
            'El equipo de pagos despliega su servicio sin volver a publicar catálogo.', 'Intermedio');
