import { conceptSources } from '../../../../../shared/data/concept-sources';
import type { FoundationGuide } from '../../../../../shared/lib/foundation-guide';
import { localizedText as text } from '../../../../../shared/lib/localized-text';

export const bufferGuide: FoundationGuide = {
    route: 'computer-systems/buffer', label: 'Buffer', title: text('Búfer', 'Buffer'),
    description: text('Guarda datos temporalmente mientras pasan de un lugar a otro. Ayuda a conectar procesos que trabajan a ritmos distintos.', 'It holds data temporarily as it moves from one place to another. It helps connect processes that work at different speeds.'),
    diagram: [
      { title: text('Origen', 'Source'), text: text('Llegan fragmentos de los datos de un producto.', 'Chunks of product data arrive.'), code: 'A  B  C' },
      { title: text('Buffer', 'Buffer'), text: text('Una zona de memoria los conserva hasta que se consumen. En este ejemplo caben cuatro bloques.', 'A memory area holds them until they are consumed. This example has room for four blocks.'), code: '[ A ][ B ][ C ][   ]' },
      { title: text('Tras la lectura', 'After Reading'), text: text('El consumidor lee A y libera espacio. El buffer conserva B y C para las siguientes lecturas.', 'The consumer reads A and frees space. The buffer keeps B and C for subsequent reads.'), code: '[ B ][ C ][   ][   ]' },
    ],
    concepts: [
      { title: text('Capacidad limitada', 'Limited Capacity'), description: text('Piensa en una bandeja de entrada con plazas limitadas. Si se llena hace falta esperar o aplicar la política de desbordamiento del sistema.', 'Think of an inbox with limited slots. When it fills up the system must wait or apply its overflow policy.') },
      { title: text('Datos por fragmentos', 'Data in Chunks'), description: text('El buffer puede contener solo una parte del mensaje. No hay que esperar siempre a tenerlo completo para procesarlo.', 'A buffer may hold only part of a message. Processing does not always require waiting for the whole message.') },
      { title: text('Buffer y caché', 'Buffer and Cache'), description: text('El buffer facilita una transferencia o un procesamiento. Una caché conserva datos para reutilizarlos y evitar trabajo repetido.', 'A buffer supports transfer or processing. A cache keeps data for reuse to avoid repeated work.') },
    ],
    questions: [
      { prompt: text('Si llegan tres bloques por segundo y se consume uno ¿qué ocurre?', 'If three blocks arrive per second and one is consumed what happens?'), answer: text('Se acumulan dos bloques por segundo mientras haya espacio. Una capacidad finita no puede absorber esa diferencia indefinidamente.', 'Two blocks accumulate per second while space remains. Finite capacity cannot absorb that difference indefinitely.') },
      { prompt: text('¿El dibujo representa un producto o los bytes que se transfieren?', 'Does the diagram represent a product or the bytes being transferred?'), answer: text('Los bloques representan fragmentos de datos. El recurso producto pertenece al modelo de la aplicación.', 'The blocks represent chunks of data. The product resource belongs to the application model.') },
      { prompt: text('Explica cuándo usarías un buffer al leer un archivo.', 'Explain when you would use a buffer while reading a file.'), answer: text('Lo usaría para leer y procesar el archivo por fragmentos en lugar de cargarlo entero. El tamaño debe ajustarse al procesamiento y a los recursos disponibles.', 'I would use it to read and process the file in chunks instead of loading it all at once. Its size should suit the processing and available resources.') },
    ],
    related: ['computer-networks/http'], source: conceptSources.buffer,
  };
