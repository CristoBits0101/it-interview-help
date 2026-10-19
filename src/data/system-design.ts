import { conceptSources } from './concept-sources';
import type { Track } from './curriculum';

export const systemDesign: Track = {
  id: 'system-design',
  title: 'System Design',
  eyebrow: 'System Design',
  modules: [
    {
      id: 'sd-fundamentals',
      title: 'System Design Foundations',
      description: 'El método para pasar de requisitos a una arquitectura defendible.',
      concepts: [
        { id: 'sd-requirements', title: 'Requirements', description: 'Un requisito expresa una necesidad que el sistema debe satisfacer de forma verificable.',
          details: [
            'Relaciona lo que se pide con una necesidad de las personas interesadas en el sistema.',
            'Un buen requisito es claro y permite comprobar si se ha cumplido antes de dar la solución por válida.',
          ],
          source: conceptSources.requirements, memory: 'Primero el problema, después las piezas.', example: 'Una app de reservas necesita buscar disponibilidad y confirmar pagos.', level: 'Esencial' },
        { id: 'sd-functional-requirements', title: 'Functional Requirements', description: 'Los requisitos funcionales describen las capacidades y los comportamientos que debe ofrecer el sistema.',
          details: [
            'Especifican qué resultado se espera ante unas condiciones o entradas definidas.',
            'Deben poder comprobarse sin imponer detalles de implementación que no sean necesarios.',
          ],
          source: conceptSources.requirements, memory: 'Qué puede hacer el sistema.', example: 'Crear una reserva, cancelarla y consultar su estado.', level: 'Esencial' },
        { id: 'sd-non-functional', title: 'Non-Functional Requirements', description: 'Los requisitos no funcionales establecen cualidades y condiciones que debe cumplir el funcionamiento del sistema.',
          details: [
            'Pueden fijar objetivos de rendimiento o de fiabilidad que condicionan el diseño.',
            'Una cualidad debe expresarse con criterios medibles para poder comprobar su cumplimiento.',
          ],
          source: conceptSources.requirements, memory: 'Cómo debe comportarse.', example: 'El 99.9% de las búsquedas responde en menos de 200 ms.', level: 'Esencial' },
        { id: 'sd-constraints', title: 'Constraints', description: 'Una restricción es una condición obligatoria que limita las soluciones de diseño aceptables.',
          details: [
            'Puede proceder del entorno o de una decisión técnica o de negocio ya establecida.',
            'Debe registrarse su origen para distinguirla de una preferencia que todavía puede negociarse.',
          ],
          source: conceptSources.requirements, memory: 'El contexto decide las opciones.', example: 'El equipo debe desplegar en una nube ya aprobada.', level: 'Intermedio' },
      ],
    },
    {
      id: 'sd-capacity',
      title: 'Capacity & Data Flow',
      description: 'Estima volumen y recorrido de datos para encontrar cuellos de botella antes de dibujar componentes.',
      concepts: [
        { id: 'sd-back-of-envelope', title: 'Back-of-the-Envelope Estimation', description: 'Una estimación aproximada calcula el orden de magnitud de los recursos necesarios a partir de supuestos explícitos.',
          details: [
            'Relaciona el volumen de actividad con la capacidad y el almacenamiento que puede requerir el sistema.',
            'Sirve para descartar diseños inviables. Después debe contrastarse con mediciones y pruebas de carga.',
          ],
          source: conceptSources.capacity, memory: 'Aproximar evita diseñar a ciegas.', example: '100 millones de lecturas diarias son unas 1,160 lecturas por segundo.', level: 'Esencial' },
        { id: 'sd-qps', title: 'Queries Per Second', description: 'QPS expresa cuántas consultas se realizan por segundo durante un intervalo definido.',
          details: [
            'Ayuda a describir la carga que debe atender un sistema.',
            'Una media puede ocultar picos. También importa cuánto trabajo consume cada consulta.',
          ],
          source: conceptSources.monitoring, memory: 'Carga de operaciones por segundo.', example: 'Separar QPS de lectura y escritura revela necesidades distintas.', level: 'Esencial' },
        { id: 'sd-read-write-ratio', title: 'Read-Write Ratio', description: 'La proporción de lecturas y escrituras compara la frecuencia de ambos tipos de operación en una carga de trabajo.',
          details: [
            'Ayuda a valorar si conviene optimizar el acceso a datos consultados con frecuencia.',
            'La proporción no basta para dimensionar el sistema. También deben medirse el coste y la distribución de esas operaciones.',
          ],
          source: conceptSources.capacity, memory: 'No todas las cargas se comportan igual.', example: 'Un catálogo puede tener 100 lecturas por cada actualización.', level: 'Intermedio' },
        { id: 'sd-data-flow', title: 'Data Flow', description: 'El flujo de datos describe el recorrido de la información entre los componentes de un sistema.',
          details: [
            'Permite seguir qué componente recibe un dato y qué intercambios realiza para completar una operación.',
            'Hacer explícito el recorrido ayuda a identificar dependencias y puntos donde se acumula espera.',
          ],
          source: conceptSources.dataFlow, memory: 'Sigue el dato de extremo a extremo.', example: 'Una imagen pasa por subida, virus scan, almacenamiento y CDN.', level: 'Esencial' },
      ],
    },
    {
      id: 'sd-building-blocks',
      title: 'Architecture Building Blocks',
      description: 'Selecciona componentes por su responsabilidad y por las propiedades que necesita el sistema.',
      concepts: [
        { id: 'sd-api-boundary', title: 'API Boundary', description: 'El límite de una API separa a quien solicita una capacidad de quien la implementa mediante un contrato público.',
          details: [
            'El contrato define las operaciones y el significado de los datos intercambiados.',
            'Ocultar detalles internos facilita cambios independientes mientras se conserve el comportamiento acordado.',
          ],
          source: conceptSources.api, memory: 'Un límite claro reduce acoplamiento.', example: 'El servicio de pagos expone una API que oculta su proveedor bancario.', level: 'Esencial' },
        { id: 'sd-cache', title: 'Cache', description: 'Una caché conserva copias de datos para atender accesos con menor tiempo o menor trabajo en el origen.',
          details: [
            'Una consulta puede reutilizar la copia mientras se considere válida.',
            'Es necesario definir cuándo actualizarla o descartarla. Una copia sin actualizar puede devolver información antigua.',
          ],
          source: conceptSources.cache, memory: 'Rapidez a cambio de frescura.', example: 'Redis guarda el perfil más consultado durante unos minutos.', level: 'Esencial' },
        { id: 'sd-queue', title: 'Queue', description: 'Una cola almacena trabajo pendiente para que los consumidores lo procesen de forma desacoplada de sus productores.',
          details: [
            'Puede absorber picos temporales de llegada de solicitudes.',
            'La espera seguirá creciendo mientras el trabajo entre más rápido de lo que se procesa de forma sostenida.',
          ],
          source: conceptSources.queue, memory: 'Desacoplar ritmo y trabajo.', example: 'Una cola procesa emails aunque el usuario cierre la pantalla.', level: 'Esencial' },
        { id: 'sd-cdn', title: 'Content Delivery Network', description: 'Una red de distribución de contenido entrega información desde ubicaciones distribuidas próximas a sus usuarios.',
          details: [
            'Los nodos pueden reutilizar contenido almacenado para reducir viajes al servidor de origen.',
            'La política de caché determina qué contenido se conserva y durante cuánto tiempo.',
          ],
          source: conceptSources.cdn, memory: 'Acerca contenido al usuario.', example: 'Una CDN entrega imágenes estáticas desde Madrid a un usuario en Canarias.', level: 'Intermedio' },
      ],
    },
  ],
};
