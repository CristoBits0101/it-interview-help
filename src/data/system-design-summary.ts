import type { LocalizedText } from './web-foundations';
import { systemDesignSummarySources } from './concept-sources';
const text = (es: string, en: string): LocalizedText => ({ es, en });
const term = (es: string, en: string, descriptionEs: string, descriptionEn: string) => ({ title: text(es, en), description: text(descriptionEs, descriptionEn) });
export type SystemDesignTopic = {
  id: string;
  title: LocalizedText;
  terms: ReturnType<typeof term>[];
  decision: LocalizedText;
  question: LocalizedText;
  answer: LocalizedText;
  sourceIds: (keyof typeof systemDesignSummarySources)[];
};
export const systemDesignSummary: SystemDesignTopic[] = [
  {
    id: 'method', title: text('Método de Diseño', 'Design Method'), sourceIds: ['architecture'],
    terms: [
      term('Aclarar el Alcance', 'Clarify Scope', 'Define qué debe hacer el sistema y qué queda fuera. Pregunta por usuarios y carga antes de elegir tecnologías.', 'Define what the system must do and what is out of scope. Ask about users and load before choosing technologies.'),
      term('Requisitos y Restricciones', 'Requirements and Constraints', 'Distingue funciones de objetivos medibles de calidad. Registra las condiciones obligatorias y los supuestos.', 'Distinguish features from measurable quality goals. Record mandatory constraints and assumptions.'),
      term('Diseño de Alto Nivel', 'High-level Design', 'Identifica clientes y servicios junto con almacenamiento e interfaces. Sigue una petición completa para comprobar cómo encajan.', 'Identify clients and services alongside storage and interfaces. Trace a complete request to check how they fit together.'),
      term('Profundizar', 'Deep Dive', 'Examina los componentes que más condicionan el resultado. Justifica las decisiones frente a alternativas y fallos.', 'Examine the components that most affect the outcome. Justify decisions against alternatives and failures.'),
      term('Revisar el Diseño', 'Review the Design', 'Recorre los requisitos de nuevo y busca cuellos de botella. Explica cómo medirías y mejorarías la solución.', 'Revisit requirements and look for bottlenecks. Explain how you would measure and improve the solution.'),
    ],
    decision: text('Empieza con el problema y añade complejidad solo cuando un requisito la justifique.', 'Start with the problem and add complexity only when a requirement justifies it.'),
    question: text('¿Qué debes aclarar antes de proponer una base de datos?', 'What should you clarify before proposing a database?'),
    answer: text('Los datos y las operaciones junto con la carga y las garantías necesarias. La elección debe responder a esas necesidades.', 'The data and operations alongside load and required guarantees. The choice should address those needs.'),
  },
  {
    id: 'capacity', title: text('Estimación de Capacidad', 'Capacity Estimation'), sourceIds: ['units', 'monitoring'],
    terms: [
      term('Unidades', 'Units', 'Un byte contiene ocho bits. Distingue unidades decimales como kB de unidades binarias como KiB.', 'A byte contains eight bits. Distinguish decimal units such as kB from binary units such as KiB.'),
      term('Carga Media y Picos', 'Average Load and Peaks', 'Divide las operaciones diarias entre 86400 para estimar operaciones por segundo. Dimensiona también los picos y el coste de cada operación.', 'Divide daily operations by 86400 to estimate operations per second. Also account for peaks and the cost of each operation.'),
      term('Lecturas y Escrituras', 'Reads and Writes', 'Estima ambas cargas por separado. Su proporción orienta el uso de caché y la distribución del almacenamiento.', 'Estimate both workloads separately. Their ratio informs caching and storage distribution.'),
      term('Almacenamiento', 'Storage', 'Multiplica los datos nuevos diarios por la retención. Añade el coste de índices y réplicas por separado.', 'Multiply new daily data by retention. Add index and replica costs separately.'),
      term('Latencia y Transferencia', 'Latency and Transfer', 'La latencia mide el tiempo de una operación. El ancho de banda limita cuánto puedes transferir en un intervalo.', 'Latency measures operation duration. Bandwidth limits how much data can be transferred in an interval.'),
      term('Disponibilidad', 'Availability', 'Relaciona el tiempo de servicio disponible con un periodo definido. Un objetivo del 99.9 % admite aproximadamente 8.76 horas de indisponibilidad en un año de 365 días.', 'Relate available service time to a defined period. A 99.9% target allows approximately 8.76 hours of unavailability in a 365-day year.'),
    ],
    decision: text('Como supuesto de ejemplo 100 millones de operaciones diarias equivalen a unas 1157 por segundo. El pico requiere otro supuesto explícito.', 'As an example assumption 100 million daily operations amount to about 1157 per second. Peak load requires a separate explicit assumption.'),
    question: text('¿Ver muchos vídeos significa almacenar muchos vídeos nuevos?', 'Does watching many videos mean storing many new videos?'),
    answer: text('No. Las subidas generan almacenamiento nuevo mientras las reproducciones generan principalmente tráfico de salida.', 'No. Uploads create new storage while playback mainly creates outbound traffic.'),
  },
  {
    id: 'scaling', title: text('Escalabilidad y Componentes', 'Scaling and Building Blocks'), sourceIds: ['architecture', 'consistency'],
    terms: [
      term('Servidor Único', 'Single Server', 'Un despliegue pequeño puede reunir aplicación y datos en una máquina. Es sencillo pero concentra capacidad y fallos.', 'A small deployment can keep the application and data on one machine. It is simple but concentrates capacity and failures.'),
      term('Recorrido de una Petición', 'Request Path', 'DNS resuelve el nombre del servicio y HTTP transporta la petición. La aplicación consulta sus datos y construye la respuesta.', 'DNS resolves the service name and HTTP carries the request. The application queries its data and builds the response.'),
      term('Escalado Vertical y Horizontal', 'Vertical and Horizontal Scaling', 'El vertical aumenta recursos de una máquina. El horizontal incorpora máquinas y exige repartir el trabajo.', 'Vertical scaling adds resources to one machine. Horizontal scaling adds machines and requires distributing work.'),
      term('Balanceo y Redundancia', 'Balancing and Redundancy', 'Un balanceador reparte peticiones entre servidores sanos. La redundancia reduce puntos únicos de fallo si la conmutación funciona.', 'A load balancer distributes requests across healthy servers. Redundancy reduces single points of failure when failover works.'),
      term('Datos y Réplicas', 'Data and Replicas', 'Separar aplicación y base de datos permite dimensionarlas de forma independiente. Las réplicas añaden copias pero pueden presentar retraso de lectura.', 'Separating application and database allows independent sizing. Replicas add copies but may introduce read lag.'),
      term('Relacional y NoSQL', 'Relational and NoSQL', 'Elige el modelo según los datos y las consultas junto con sus garantías. NoSQL no implica por sí solo mayor velocidad ni mejor escalabilidad.', 'Choose a model according to the data and queries alongside required guarantees. NoSQL alone does not imply greater speed or better scalability.'),
      term('Caché y CDN', 'Cache and CDN', 'Una caché reutiliza datos consultados y necesita reglas de caducidad o invalidación. Una CDN acerca contenido a los usuarios desde ubicaciones distribuidas.', 'A cache reuses queried data and needs expiration or invalidation rules. A CDN brings content closer to users through distributed locations.'),
      term('Estado y Colas', 'State and Queues', 'Externalizar el estado de sesión facilita repartir peticiones entre servidores. Las colas separan productores y consumidores para procesar trabajo de forma asíncrona.', 'Externalizing session state makes distributing requests across servers easier. Queues separate producers and consumers for asynchronous processing.'),
      term('Regiones y Operación', 'Regions and Operations', 'Varias regiones requieren decidir cómo enrutar tráfico y sincronizar datos. Los registros y las métricas permiten detectar problemas y comprobar el efecto del escalado.', 'Multiple regions require decisions about routing traffic and synchronizing data. Logs and metrics reveal problems and help verify scaling results.'),
      term('Particionamiento', 'Partitioning', 'Distribuye subconjuntos de datos entre servidores mediante una clave de partición. Una mala elección puede concentrar tráfico en pocos nodos.', 'Distribute subsets of data across servers using a partition key. A poor choice can concentrate traffic on a few nodes.'),
      term('Automatización', 'Automation', 'Automatiza tareas repetitivas de despliegue y operación. Comprueba sus efectos mediante registros y métricas.', 'Automate repetitive deployment and operations tasks. Check their effects through logs and metrics.'),
    ],
    decision: text('Mide el cuello de botella antes de añadir servidores. Más máquinas no corrigen automáticamente una consulta costosa o una clave muy solicitada.', 'Measure the bottleneck before adding servers. More machines do not automatically fix an expensive query or a hot key.'),
    question: text('¿Replicar y particionar resuelven el mismo problema?', 'Do replication and partitioning solve the same problem?'),
    answer: text('No. Replicar mantiene copias de los datos y particionar distribuye subconjuntos. Pueden combinarse según los requisitos.', 'No. Replication keeps copies of data while partitioning distributes subsets. They can be combined according to requirements.'),
  },
  {
    id: 'rate-limiter', title: text('Limitador de Tasa', 'Rate Limiter'), sourceIds: ['rate'],
    terms: [
      term('Política de Límite', 'Limit Policy', 'Define quién puede realizar cuántas solicitudes y durante qué intervalo. El límite puede aplicarse en un servicio o en una puerta de entrada.', 'Define who may make how many requests over which interval. A limit can be enforced in a service or at a gateway.'),
      term('Token Bucket', 'Token Bucket', 'Los tokens se reponen a una velocidad definida y cada petición consume uno. La capacidad del depósito determina la ráfaga permitida.', 'Tokens refill at a defined rate and each request consumes one. Bucket capacity determines the allowed burst.'),
      term('Leaky Bucket', 'Leaky Bucket', 'Una cola libera trabajo a un ritmo controlado. Una capacidad limitada obliga a decidir qué hacer cuando se llena.', 'A queue releases work at a controlled rate. Limited capacity requires deciding what happens when it fills up.'),
      term('Ventana Fija', 'Fixed Window', 'Cuenta solicitudes en intervalos separados. Las peticiones próximas a un cambio de ventana pueden acumular un pico.', 'Count requests in separate intervals. Requests near a window boundary can accumulate into a spike.'),
      term('Registro Deslizante', 'Sliding Window Log', 'Conserva marcas de tiempo para contar peticiones dentro del intervalo reciente. Aumenta la precisión a cambio de más memoria.', 'Keep timestamps to count requests within the recent interval. Greater precision costs more memory.'),
      term('Contador Deslizante', 'Sliding Window Counter', 'Combina contadores de ventanas próximas para aproximar la carga reciente. Consume menos memoria que guardar cada petición.', 'Combine counters from adjacent windows to approximate recent load. It uses less memory than storing every request.'),
      term('Coordinación y HTTP 429', 'Coordination and HTTP 429', 'Los contadores compartidos necesitan actualizaciones atómicas y expiración. HTTP 429 comunica un exceso de solicitudes y puede incluir Retry-After.', 'Shared counters need atomic updates and expiration. HTTP 429 reports too many requests and may include Retry-After.'),
    ],
    decision: text('Equilibra precisión y ráfagas con latencia y memoria. Un límite global distribuido también exige decidir qué ocurre ante una partición.', 'Balance precision and bursts against latency and memory. A distributed global limit also requires deciding what happens during a partition.'),
    question: text('¿Por qué puede fallar un contador con lectura y escritura separadas?', 'Why can a counter fail when reads and writes are separate?'),
    answer: text('Varias peticiones pueden leer el mismo valor y sobrescribir incrementos. La operación de comprobación y actualización necesita coordinación.', 'Several requests may read the same value and overwrite increments. The check-and-update operation needs coordination.'),
  },
  {
    id: 'consistent-hashing', title: text('Hashing Consistente', 'Consistent Hashing'), sourceIds: ['distribution'],
    terms: [
      term('Remapeo de Claves', 'Key Remapping', 'Usar hash de la clave módulo N puede reasignar muchas claves cuando cambia el número de servidores.', 'Using the key hash modulo N can reassign many keys when the server count changes.'),
      term('Anillo de Hash', 'Hash Ring', 'Coloca claves y nodos en un espacio circular. Una clave se asigna al siguiente nodo según el recorrido elegido.', 'Place keys and nodes in a circular space. A key is assigned to the next node along the chosen direction.'),
      term('Entrada y Salida de Nodos', 'Nodes Joining and Leaving', 'Cambiar los nodos modifica principalmente las asignaciones de los rangos afectados. No requiere redistribuir todas las claves.', 'Changing nodes mainly changes assignments in affected ranges. It does not require redistributing all keys.'),
      term('Nodos Virtuales', 'Virtual Nodes', 'Representa cada servidor mediante varias posiciones del anillo. Esto ayuda a repartir los rangos sin garantizar una carga uniforme.', 'Represent each server with several ring positions. This helps distribute ranges without guaranteeing uniform load.'),
      term('Claves Calientes', 'Hot Keys', 'Una clave muy solicitada puede saturar su nodo aunque el número de claves esté bien repartido.', 'A heavily requested key can saturate its node even when key counts are well distributed.'),
    ],
    decision: text('Evalúa tanto la distribución de datos como la de peticiones. No son la misma medida de equilibrio.', 'Evaluate both data distribution and request distribution. They are not the same measure of balance.'),
    question: text('¿Los nodos virtuales eliminan una clave caliente?', 'Do virtual nodes eliminate a hot key?'),
    answer: text('No. Mejoran el reparto de rangos pero una misma clave puede seguir recibiendo casi todo el tráfico.', 'No. They improve range distribution but one key can still receive most of the traffic.'),
  },
  {
    id: 'key-value', title: text('Almacén Clave-Valor', 'Key-Value Store'), sourceIds: ['distribution', 'storage', 'consistency'],
    terms: [
      term('Operaciones Básicas', 'Basic Operations', 'put asocia una clave con un valor y get recupera el valor de una clave. La distribución añade decisiones sobre particiones y réplicas.', 'put associates a key with a value and get retrieves a key’s value. Distribution adds decisions about partitions and replicas.'),
      term('CAP', 'CAP', 'Ante una partición de red no se puede garantizar a la vez consistencia linealizable y disponibilidad de todas las operaciones.', 'During a network partition linearizable consistency and availability of every operation cannot both be guaranteed.'),
      term('Modelos de Consistencia', 'Consistency Models', 'Una lectura fuerte refleja las escrituras completadas antes de iniciarse. La eventual permite divergencias temporales y converge cuando dejan de llegar actualizaciones y pueden propagarse.', 'A strongly consistent read reflects writes completed before it started. Eventual consistency allows temporary divergence and converges when updates stop and can propagate.'),
      term('Consistencia Débil', 'Weak Consistency', 'Ofrece garantías más limitadas sobre cuándo una lectura observa una escritura. Hay que concretar esas garantías en lugar de asumir convergencia o actualidad.', 'It offers weaker guarantees about when a read observes a write. Specify those guarantees rather than assuming convergence or freshness.'),
      term('Quórum Flexible', 'Sloppy Quorum', 'Puede aceptar confirmaciones de otros nodos disponibles cuando las réplicas previstas fallan. Favorece continuar operando pero modifica las garantías de la lectura y la escritura.', 'It may accept acknowledgments from other available nodes when intended replicas fail. This favors continued operation but changes read and write guarantees.'),
      term('Versiones y Relojes Vectoriales', 'Versions and Vector Clocks', 'El versionado permite detectar cambios. Los relojes vectoriales ayudan a distinguir causalidad de escrituras concurrentes sin decidir por sí solos cómo resolverlas.', 'Versioning helps detect changes. Vector clocks help distinguish causality from concurrent writes without deciding how to resolve them.'),
      term('Reparación de Réplicas', 'Replica Repair', 'El traspaso diferido puede conservar temporalmente escrituras destinadas a nodos caídos. La comparación mediante árboles de Merkle ayuda a localizar diferencias entre réplicas.', 'Hinted handoff can temporarily retain writes intended for unavailable nodes. Merkle tree comparisons help locate differences between replicas.'),
      term('Ruta de Escritura', 'Write Path', 'En un motor de tipo LSM la escritura pasa por un registro durable y una estructura en memoria. Después se vuelca en SSTables.', 'In an LSM-style engine a write passes through a durable log and an in-memory structure. It is later flushed to SSTables.'),
      term('Ruta de Lectura y Bloom', 'Read Path and Bloom Filters', 'La lectura puede revisar memoria y tablas persistidas. Un filtro de Bloom descarta ausencias pero puede dar falsos positivos de presencia.', 'A read can check memory and persisted tables. A Bloom filter rules out absence but may return false positives for presence.'),
    ],
    decision: text('La elección depende de las garantías de cada operación. Replicar datos no elimina los conflictos ni sustituye las copias de seguridad.', 'The choice depends on guarantees for each operation. Replication does not eliminate conflicts or replace backups.'),
    question: text('¿Un resultado positivo de Bloom demuestra que existe una clave?', 'Does a positive Bloom filter result prove that a key exists?'),
    answer: text('No. Indica que podría existir y hay que comprobar el almacenamiento correspondiente.', 'No. It means the key may exist and the relevant storage must be checked.'),
  },
  {
    id: 'unique-ids', title: text('Identificadores Distribuidos', 'Distributed Identifiers'), sourceIds: ['uuid', 'snowflake'],
    terms: [
      term('Requisitos del ID', 'ID Requirements', 'Aclara unicidad y tamaño junto con orden y velocidad de generación. Un identificador único no garantiza un orden global.', 'Clarify uniqueness and size alongside ordering and generation rate. A unique identifier does not guarantee global ordering.'),
      term('Alternativas', 'Alternatives', 'Un servidor de tickets centraliza la secuencia y requiere disponibilidad. Los UUID distribuyen la generación pero su tamaño y orden dependen del formato.', 'A ticket server centralizes the sequence and needs availability. UUIDs distribute generation but their size and ordering depend on the format.'),
      term('UUID', 'UUID', 'Los UUID utilizan 128 bits. UUIDv4 se basa en aleatoriedad mientras UUIDv7 incorpora una marca de tiempo.', 'UUIDs use 128 bits. UUIDv4 is based on randomness while UUIDv7 incorporates a timestamp.'),
      term('Distribución Snowflake', 'Snowflake Layout', 'Un esquema de ejemplo usa 1 bit de signo y 41 de tiempo con 5 de centro de datos y 5 de máquina más 12 de secuencia.', 'An example layout uses 1 sign bit and 41 timestamp bits with 5 data-center bits and 5 machine bits plus 12 sequence bits.'),
      term('Capacidad y Reloj', 'Capacity and Clock', 'Doce bits permiten 4096 valores de secuencia por intervalo y nodo. La unicidad exige gestionar el reloj y evitar reutilizar la misma identidad de nodo.', 'Twelve bits allow 4096 sequence values per interval and node. Uniqueness requires managing the clock and avoiding reuse of the same node identity.'),
    ],
    decision: text('Los 41 bits de milisegundos cubren unos 69.7 años desde una época elegida. Cambiar el reparto de bits modifica capacidad y duración.', 'The 41 millisecond bits cover about 69.7 years from a chosen epoch. Changing the bit allocation changes capacity and lifetime.'),
    question: text('¿Por qué importa un retroceso del reloj?', 'Why does a clock moving backward matter?'),
    answer: text('Puede reutilizar combinaciones de tiempo y secuencia. El generador necesita una política que preserve la unicidad.', 'It may reuse timestamp and sequence combinations. The generator needs a policy that preserves uniqueness.'),
  },
  {
    id: 'url-shortener', title: text('Acortador de URL', 'URL Shortener'), sourceIds: ['http', 'uuid'],
    terms: [
      term('Contrato y Datos', 'Contract and Data', 'Una operación crea el alias y otra resuelve su destino. Guarda la relación entre identificador corto y URL original.', 'One operation creates the alias and another resolves its target. Store the mapping between the short identifier and original URL.'),
      term('Base 62', 'Base 62', 'Representa un ID con letras y números. Siete posiciones permiten 62 elevado a 7 combinaciones sin que eso garantice por sí solo unicidad.', 'Represent an ID with letters and digits. Seven positions allow 62 to the power of 7 combinations without guaranteeing uniqueness by themselves.'),
      term('Hash y Colisiones', 'Hashing and Collisions', 'Acortar un hash puede producir el mismo alias para distintas URL. La creación debe detectar y resolver colisiones.', 'Truncating a hash may produce the same alias for different URLs. Creation must detect and resolve collisions.'),
      term('Redirección', 'Redirection', '301 indica un destino permanente y 302 uno temporal. Las reglas de caché y los requisitos de actualización condicionan la elección.', '301 indicates a permanent target and 302 a temporary one. Cache rules and update requirements influence the choice.'),
      term('Lecturas y Protección', 'Reads and Protection', 'La caché reduce consultas repetidas para enlaces populares. Controla los abusos y define qué ocurre con alias inexistentes o caducados.', 'Caching reduces repeated queries for popular links. Control abuse and define behavior for missing or expired aliases.'),
    ],
    decision: text('Compara identificadores generados y hashes con colisiones controladas. Base 62 es una codificación y no un mecanismo de cifrado.', 'Compare generated identifiers with hashes that handle collisions. Base 62 is an encoding rather than encryption.'),
    question: text('¿Puede recuperarse siempre la URL original invirtiendo un hash?', 'Can the original URL always be recovered by reversing a hash?'),
    answer: text('No. El servicio necesita conservar el mapeo o utilizar una representación reversible del identificador asociado.', 'No. The service needs to retain the mapping or use a reversible representation of the associated identifier.'),
  },
  {
    id: 'crawler', title: text('Rastreador Web', 'Web Crawler'), sourceIds: ['crawler'],
    terms: [
      term('URL Semilla y Frontera', 'Seed URLs and Frontier', 'Empieza con direcciones conocidas y guarda las pendientes en una frontera de URL. La prioridad decide qué visitar primero.', 'Start with known addresses and keep pending ones in a URL frontier. Priority determines what to visit first.'),
      term('Descarga y Extracción', 'Download and Extraction', 'Resuelve el destino y descarga la página para analizarla. Extrae enlaces y añade los que todavía deban procesarse.', 'Resolve the target and download the page for parsing. Extract links and add those that still need processing.'),
      term('Cortesía', 'Politeness', 'Respeta robots.txt y controla el ritmo por host. Separa las colas para evitar concentrar peticiones en un mismo servidor.', 'Respect robots.txt and control the rate per host. Separate queues to avoid concentrating requests on one server.'),
      term('Duplicados y Trampas', 'Duplicates and Traps', 'Detecta URL repetidas y contenido duplicado antes de volver a almacenarlo. Limita ciclos y espacios de URL que puedan crecer sin fin.', 'Detect repeated URLs and duplicate content before storing it again. Bound cycles and URL spaces that can grow indefinitely.'),
      term('Frescura y Robustez', 'Freshness and Robustness', 'Programa nuevas visitas según la frecuencia de cambio y el valor del contenido. Tolera tiempos de espera y páginas malformadas sin detener todo el rastreo.', 'Schedule revisits according to change frequency and content value. Handle timeouts and malformed pages without stopping the entire crawl.'),
    ],
    decision: text('Prioriza cobertura y frescura sin sobrecargar los sitios. robots.txt expresa reglas de rastreo y no concede acceso a recursos protegidos.', 'Prioritize coverage and freshness without overloading sites. robots.txt expresses crawling rules and does not grant access to protected resources.'),
    question: text('¿Deduplicar solo las URL elimina todo el contenido repetido?', 'Does deduplicating URLs eliminate all repeated content?'),
    answer: text('No. Distintas URL pueden devolver el mismo contenido y requieren una comprobación adicional.', 'No. Different URLs may return the same content and require an additional check.'),
  },
  {
    id: 'notifications', title: text('Sistema de Notificaciones', 'Notification System'), sourceIds: ['notifications'],
    terms: [
      term('Canales y Preferencias', 'Channels and Preferences', 'Distingue push de SMS y correo electrónico. Respeta las preferencias y los límites de frecuencia del usuario.', 'Distinguish push from SMS and email. Respect user preferences and frequency limits.'),
      term('Destinos y Proveedores', 'Destinations and Providers', 'Guarda los destinos necesarios para cada canal. Los trabajadores adaptan el envío a proveedores como APNs o FCM.', 'Store the destinations needed for each channel. Workers adapt delivery to providers such as APNs or FCM.'),
      term('Colas y Trabajadores', 'Queues and Workers', 'Separa la petición de envío del trabajo de entrega. Cada canal puede procesarse y escalar de forma independiente.', 'Separate the send request from delivery work. Each channel can be processed and scaled independently.'),
      term('Persistencia y Reintentos', 'Persistence and Retries', 'Conserva el trabajo pendiente y registra su resultado. Los reintentos necesitan controlar duplicados y limitar intentos.', 'Persist pending work and record its result. Retries need duplicate handling and bounded attempts.'),
      term('Plantillas y Seguimiento', 'Templates and Tracking', 'Las plantillas mantienen la estructura del mensaje. Mide errores y tiempos de entrega para detectar retrasos.', 'Templates keep message structure consistent. Measure errors and delivery times to detect delays.'),
    ],
    decision: text('Aceptar una notificación en una cola no significa que haya llegado al dispositivo. Distingue aceptación y entrega.', 'Accepting a notification into a queue does not mean it reached the device. Distinguish acceptance from delivery.'),
    question: text('¿Qué puede ocurrir si reintentas después de perder una confirmación?', 'What can happen if you retry after losing an acknowledgment?'),
    answer: text('El envío anterior podría haberse completado y el nuevo intento podría duplicarlo. Usa una identidad de operación y una política de deduplicación.', 'The previous delivery may have completed and the retry may duplicate it. Use an operation identity and a deduplication policy.'),
  },
  {
    id: 'news-feed', title: text('Feed de Noticias', 'News Feed'), sourceIds: ['architecture', 'notifications'],
    terms: [
      term('Publicación y Consulta', 'Publishing and Reading', 'Separa guardar una publicación de construir el feed del lector. Define el orden de presentación y las relaciones entre usuarios.', 'Separate saving a post from building a reader’s feed. Define presentation order and relationships between users.'),
      term('Difusión al Escribir', 'Fan-out on Write', 'Prepara las referencias del feed de los seguidores cuando se publica contenido. Acelera lecturas a costa de trabajo de escritura.', 'Prepare follower feed references when content is published. This speeds reads at the cost of write work.'),
      term('Difusión al Leer', 'Fan-out on Read', 'Combina publicaciones cuando el usuario consulta su feed. Reduce escrituras anticipadas pero aumenta el trabajo de lectura.', 'Combine posts when the user requests their feed. This reduces advance writes but adds read work.'),
      term('Enfoque Híbrido', 'Hybrid Approach', 'Combina ambas estrategias según la actividad y el número de seguidores. Evita tratar igual a todos los publicadores.', 'Combine both strategies according to activity and follower counts. Avoid treating every publisher identically.'),
      term('Capas de Caché', 'Cache Layers', 'Separa IDs del feed y contenido junto con relaciones sociales. Las acciones y los contadores tienen patrones de acceso distintos.', 'Separate feed IDs and content alongside social relationships. Actions and counters have different access patterns.'),
    ],
    decision: text('Elige dónde pagar el coste de construir el feed según la carga de lectura y escritura. No hay una estrategia óptima para todos los perfiles.', 'Choose where to pay feed-building costs according to read and write load. No strategy is optimal for every profile.'),
    question: text('¿Por qué un usuario con millones de seguidores cambia el diseño?', 'Why does a user with millions of followers change the design?'),
    answer: text('Cada publicación puede generar millones de actualizaciones si se difunde al escribir. Un enfoque híbrido puede evitar ese trabajo anticipado.', 'Each post may generate millions of updates with fan-out on write. A hybrid approach can avoid that advance work.'),
  },
  {
    id: 'chat', title: text('Sistema de Chat', 'Chat System'), sourceIds: ['websocket', 'consistency'],
    terms: [
      term('Alcance del Chat', 'Chat Scope', 'Define conversaciones individuales o de grupo junto con historial y dispositivos. Establece qué significa entregar y ordenar un mensaje.', 'Define one-to-one or group conversations alongside history and devices. Establish what delivering and ordering a message mean.'),
      term('Conexión Bidireccional', 'Bidirectional Connection', 'WebSocket mantiene una conexión para intercambiar mensajes en ambos sentidos. HTTP puede seguir atendiendo operaciones que no requieren esa conexión.', 'WebSocket keeps a connection for exchanging messages in both directions. HTTP can still handle operations that do not need that connection.'),
      term('Servicios con Estado', 'Stateful Services', 'Los servidores de chat mantienen conexiones activas mientras otros servicios pueden permanecer sin estado de sesión local.', 'Chat servers maintain active connections while other services can remain free of local session state.'),
      term('Historial y Orden', 'History and Ordering', 'Persiste los mensajes según los requisitos de recuperación. El orden de una conversación necesita una regla explícita y no solo IDs únicos.', 'Persist messages according to recovery requirements. Conversation ordering needs an explicit rule rather than just unique IDs.'),
      term('Presencia y Descubrimiento', 'Presence and Discovery', 'La presencia utiliza señales de conexión con un tiempo de caducidad. El descubrimiento ayuda a localizar el servidor que mantiene la sesión.', 'Presence uses connection signals with expiration. Discovery helps locate the server holding the session.'),
      term('Reconexión y Push', 'Reconnection and Push', 'La reconexión debe recuperar mensajes pendientes y controlar duplicados. Las notificaciones push pueden avisar a usuarios desconectados.', 'Reconnection must recover pending messages and handle duplicates. Push notifications can alert disconnected users.'),
    ],
    decision: text('Una conexión abierta no garantiza entrega durable. Define confirmaciones y recuperación para los fallos de red.', 'An open connection does not guarantee durable delivery. Define acknowledgments and recovery for network failures.'),
    question: text('¿Un ID ordenable por tiempo garantiza el orden total entre todos los servidores?', 'Does a time-sortable ID guarantee total ordering across all servers?'),
    answer: text('No. Los relojes y la concurrencia pueden diferir. Hay que definir el alcance y el mecanismo del orden requerido.', 'No. Clocks and concurrency can differ. Define the scope and mechanism of the required ordering.'),
  },
  {
    id: 'autocomplete', title: text('Autocompletado de Búsqueda', 'Search Autocomplete'), sourceIds: ['autocomplete'],
    terms: [
      term('Prefijo y Clasificación', 'Prefix and Ranking', 'Define si las sugerencias coinciden con el principio de la consulta. Establece cuántas devolver y cómo ordenarlas.', 'Define whether suggestions match the beginning of a query. Establish how many to return and how to rank them.'),
      term('Trie', 'Trie', 'Un árbol de prefijos comparte recorridos entre cadenas con el mismo comienzo. Buscar un prefijo depende de su longitud.', 'A prefix tree shares paths between strings with the same beginning. Looking up a prefix depends on its length.'),
      term('Top K en Caché', 'Cached Top K', 'Guardar las mejores sugerencias por nodo evita recorrer todos sus descendientes en cada petición.', 'Keeping top suggestions at each node avoids traversing all descendants on every request.'),
      term('Recogida y Actualización', 'Collection and Updates', 'Agrega frecuencias de consulta antes de reconstruir el índice. Actualizar por lotes reduce trabajo pero retrasa las tendencias nuevas.', 'Aggregate query frequencies before rebuilding the index. Batch updates reduce work but delay new trends.'),
      term('Escalado y Filtrado', 'Scaling and Filtering', 'Reparte el índice teniendo en cuenta la distribución de prefijos. Aplica reglas de filtrado y define el tratamiento de idiomas y Unicode.', 'Partition the index with prefix distribution in mind. Apply filtering rules and define language and Unicode handling.'),
    ],
    decision: text('Limitar el tamaño del prefijo acota el trabajo pero no convierte cualquier consulta en tiempo constante. El diseño equilibra velocidad y frescura.', 'Limiting prefix size bounds work but does not make every query constant-time. The design balances speed and freshness.'),
    question: text('¿Por qué guardar top K aumenta el coste de actualizar el índice?', 'Why does storing top K increase index update costs?'),
    answer: text('Cambiar la popularidad de un término puede obligar a actualizar las listas de varios prefijos.', 'Changing a term’s popularity may require updating lists for several prefixes.'),
  },
  {
    id: 'video', title: text('Plataforma de Vídeo', 'Video Platform'), sourceIds: ['video', 'streaming'],
    terms: [
      term('Subida y Reproducción', 'Upload and Playback', 'Separa el ingreso de archivos del servicio de reproducción. Sus necesidades de procesamiento y tráfico son distintas.', 'Separate file ingestion from playback. Their processing and traffic requirements differ.'),
      term('Contenido y Metadatos', 'Content and Metadata', 'Guarda archivos de vídeo en almacenamiento de objetos y administra sus metadatos mediante servicios de API.', 'Store video files in object storage and manage their metadata through API services.'),
      term('Transcodificación', 'Transcoding', 'Genera formatos y calidades adecuados para los dispositivos y las conexiones. La reproducción adaptativa elige entre variantes disponibles.', 'Generate formats and qualities suited to devices and connections. Adaptive playback chooses between available variants.'),
      term('DAG de Procesamiento', 'Processing DAG', 'Un grafo acíclico dirigido expresa dependencias entre tareas de procesamiento. Permite ejecutar en paralelo las que no dependen entre sí.', 'A directed acyclic graph expresses dependencies between processing tasks. It allows independent tasks to run in parallel.'),
      term('CDN y Costes', 'CDN and Costs', 'La CDN distribuye las variantes preparadas para reproducción. Distingue el coste de almacenamiento del procesamiento y del tráfico de salida.', 'The CDN distributes variants prepared for playback. Distinguish storage costs from processing and outbound traffic.'),
      term('Seguridad y Recuperación', 'Security and Recovery', 'Autoriza las subidas y protege el acceso al contenido. Reintenta errores recuperables y registra los que requieren intervención.', 'Authorize uploads and protect content access. Retry recoverable errors and record those requiring intervention.'),
    ],
    decision: text('No envíes siempre la variante de mayor tamaño. Ajusta la calidad a la conexión y al dispositivo sin confundir resolución con tasa de bits.', 'Do not always send the largest variant. Match quality to the connection and device without confusing resolution with bitrate.'),
    question: text('¿Por qué no conviene transcodificar cada vídeo durante cada reproducción?', 'Why should each video not be transcoded during every playback?'),
    answer: text('Repetiría trabajo costoso y aumentaría la latencia. Preparar variantes permite reutilizarlas durante muchas reproducciones.', 'It would repeat expensive work and increase latency. Preparing variants allows reuse across many playbacks.'),
  },
  {
    id: 'file-sync', title: text('Almacenamiento y Sincronización de Archivos', 'File Storage and Synchronization'), sourceIds: ['files', 'consistency'],
    terms: [
      term('Funciones del Servicio', 'Service Features', 'Permite subir y descargar archivos junto con compartirlos y consultar revisiones. Define cómo se sincronizan los dispositivos.', 'Support uploading and downloading files alongside sharing and revision history. Define how devices synchronize.'),
      term('Bloques y Metadatos', 'Blocks and Metadata', 'Separa los bloques del archivo de su nombre y sus permisos. Los metadatos relacionan las versiones con los bloques almacenados.', 'Separate file blocks from names and permissions. Metadata connects versions with stored blocks.'),
      term('Sincronización Delta', 'Delta Synchronization', 'Transfiere los bloques modificados en lugar de reenviar siempre el archivo completo. La compresión puede reducir los bytes enviados.', 'Transfer modified blocks instead of always resending the whole file. Compression can reduce bytes sent.'),
      term('Versiones y Conflictos', 'Versions and Conflicts', 'Detecta cambios concurrentes antes de sobrescribir contenido. Conserva versiones o presenta un conflicto según la política elegida.', 'Detect concurrent changes before overwriting content. Keep versions or present a conflict according to the chosen policy.'),
      term('Deduplicación y Retención', 'Deduplication and Retention', 'Reutilizar bloques idénticos puede ahorrar espacio. Define cuánto tiempo conservar revisiones y cómo recuperar eliminaciones.', 'Reusing identical blocks can save space. Define revision retention and recovery from deletion.'),
      term('Notificaciones de Cambios', 'Change Notifications', 'Avisa a los dispositivos de nuevas versiones para que soliciten los cambios. Una notificación no sustituye el estado persistido.', 'Notify devices of new versions so they can request changes. A notification does not replace persisted state.'),
      term('Protección y Fallos', 'Protection and Failures', 'Combina control de acceso y cifrado con recuperación de datos. Escalar servidores y metadatos exige comprobar consistencia y disponibilidad.', 'Combine access control and encryption with data recovery. Scaling servers and metadata requires checking consistency and availability.'),
    ],
    decision: text('Son decisiones de un servicio de sincronización de ejemplo. La resolución de conflictos no tiene una única política válida para todas las aplicaciones.', 'These are decisions for an example synchronization service. No single conflict-resolution policy is valid for every application.'),
    question: text('¿Por qué una segunda edición no debería sobrescribir la primera sin comprobar su versión?', 'Why should a second edit not overwrite the first without checking its version?'),
    answer: text('Podría borrar cambios que esa edición no había leído. Comparar versiones permite detectar el conflicto y aplicar la política definida.', 'It could erase changes that the edit had not read. Comparing versions detects the conflict so the defined policy can be applied.'),
  },
];

export const systemDesignGroups = [
  { id: 'foundations', title: text('Método y Fundamentos', 'Method and Foundations'), topicIds: ['method', 'capacity', 'scaling'] },
  { id: 'distribution', title: text('Distribución y Control', 'Distribution and Control'), topicIds: ['rate-limiter', 'consistent-hashing', 'key-value', 'unique-ids'] },
  { id: 'services', title: text('Servicios de Información', 'Information Services'), topicIds: ['url-shortener', 'crawler', 'notifications', 'news-feed', 'chat'] },
  { id: 'content', title: text('Búsqueda y Contenido', 'Search and Content'), topicIds: ['autocomplete', 'video', 'file-sync'] },
];
