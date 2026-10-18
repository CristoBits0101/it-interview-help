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
        { id: 'sd-requirements', title: 'Requirements', description: 'Define qué debe hacer el producto y qué restricciones debe respetar antes de elegir tecnología.', memory: 'Primero el problema, después las piezas.', example: 'Una app de reservas necesita buscar disponibilidad y confirmar pagos.', level: 'Esencial' },
        { id: 'sd-functional-requirements', title: 'Functional Requirements', description: 'Describen capacidades observables que el sistema debe ofrecer a sus usuarios o clientes.', memory: 'Qué puede hacer el sistema.', example: 'Crear una reserva, cancelarla y consultar su estado.', level: 'Esencial' },
        { id: 'sd-non-functional', title: 'Non-Functional Requirements', description: 'Describen calidad operativa: latencia, disponibilidad, seguridad, coste, capacidad y mantenibilidad.', memory: 'Cómo debe comportarse.', example: 'El 99.9% de las búsquedas responde en menos de 200 ms.', level: 'Esencial' },
        { id: 'sd-constraints', title: 'Constraints', description: 'Límites de negocio, equipo, normativa, presupuesto o tecnología que reducen el espacio de diseño.', memory: 'El contexto decide las opciones.', example: 'El equipo debe desplegar en una nube ya aprobada.', level: 'Intermedio' },
      ],
    },
    {
      id: 'sd-capacity',
      title: 'Capacity & Data Flow',
      description: 'Estima volumen y recorrido de datos para encontrar cuellos de botella antes de dibujar componentes.',
      concepts: [
        { id: 'sd-back-of-envelope', title: 'Back-of-the-Envelope Estimation', description: 'Cálculos aproximados de usuarios, peticiones, almacenamiento y ancho de banda para validar órdenes de magnitud.', memory: 'Aproximar evita diseñar a ciegas.', example: '100 millones de lecturas diarias son unas 1,160 lecturas por segundo.', level: 'Esencial' },
        { id: 'sd-qps', title: 'Queries Per Second', description: 'Mide cuántas operaciones recibe un sistema por segundo y ayuda a dimensionar servicios y almacenamiento.', memory: 'Carga de operaciones por segundo.', example: 'Separar QPS de lectura y escritura revela necesidades distintas.', level: 'Esencial' },
        { id: 'sd-read-write-ratio', title: 'Read-Write Ratio', description: 'Relación entre lecturas y escrituras; orienta el uso de cachés, réplicas de lectura y modelos de datos.', memory: 'No todas las cargas se comportan igual.', example: 'Un catálogo puede tener 100 lecturas por cada actualización.', level: 'Intermedio' },
        { id: 'sd-data-flow', title: 'Data Flow', description: 'Traza cómo entra, se transforma, almacena y entrega un dato para detectar dependencias y latencia.', memory: 'Sigue el dato de extremo a extremo.', example: 'Una imagen pasa por subida, virus scan, almacenamiento y CDN.', level: 'Esencial' },
      ],
    },
    {
      id: 'sd-building-blocks',
      title: 'Architecture Building Blocks',
      description: 'Selecciona componentes por su responsabilidad y por las propiedades que necesita el sistema.',
      concepts: [
        { id: 'sd-api-boundary', title: 'API Boundary', description: 'Contrato que separa consumidores y proveedores, define datos y permite evolucionar cada lado con independencia.', memory: 'Un límite claro reduce acoplamiento.', example: 'El servicio de pagos expone una API que oculta su proveedor bancario.', level: 'Esencial' },
        { id: 'sd-cache', title: 'Cache', description: 'Copia temporal de datos usados con frecuencia para reducir latencia y carga sobre la fuente principal.', memory: 'Rapidez a cambio de frescura.', example: 'Redis guarda el perfil más consultado durante unos minutos.', level: 'Esencial' },
        { id: 'sd-queue', title: 'Queue', description: 'Intermediario que desacopla productores y consumidores y absorbe picos mediante procesamiento posterior.', memory: 'Desacoplar ritmo y trabajo.', example: 'Una cola procesa emails aunque el usuario cierre la pantalla.', level: 'Esencial' },
        { id: 'sd-cdn', title: 'Content Delivery Network', description: 'Red de nodos cercanos al usuario que sirve contenido cacheable con menor latencia.', memory: 'Acerca contenido al usuario.', example: 'Una CDN entrega imágenes estáticas desde Madrid a un usuario en Canarias.', level: 'Intermedio' },
      ],
    },
  ],
};
