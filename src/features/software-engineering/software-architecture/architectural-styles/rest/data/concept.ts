import { createConcept as concept } from '../../../../../../shared/lib/curriculum';
import { conceptSources } from '../../../../../../shared/data/concept-sources';

export const restConcept = concept('rest', 'REST',
            'REST es un estilo arquitectónico para sistemas distribuidos basado en recursos y una interfaz uniforme.',
            [
              'El cliente intercambia representaciones y utiliza enlaces para descubrir acciones. Cada petición incluye lo necesario para interpretarla sin depender de una sesión almacenada en el servidor.',
              'El estilo también establece restricciones de caché y de capas. Enviar JSON mediante HTTP no basta para cumplirlas.',
            ],
            conceptSources.rest,
            'Recursos y representaciones con reglas comunes.',
            'Una respuesta de pedido incluye enlaces a sus acciones y recursos relacionados.', 'Intermedio');
