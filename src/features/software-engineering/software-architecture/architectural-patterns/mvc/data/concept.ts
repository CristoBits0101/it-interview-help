import { createConcept as concept } from '../../../../../../shared/lib/curriculum';
import { conceptSources } from '../../../../../../shared/data/concept-sources';

export const mvcConcept = concept('mvc', 'MVC',
            'MVC organiza la interacción de una aplicación en tres responsabilidades.',
            [
              'El modelo representa el estado y las reglas de la aplicación.',
              'La vista presenta la información.',
              'El controlador interpreta las acciones del usuario.',
              'Esta separación organiza responsabilidades dentro de la aplicación. No determina cuántos servicios se despliegan.',
            ],
            conceptSources.mvc,
            'Modelo sabe, vista muestra, controlador coordina.',
            'El controlador recibe un formulario, actualiza el modelo y selecciona la vista.');
