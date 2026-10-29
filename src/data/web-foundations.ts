import { conceptSources, type ConceptSource } from './concept-sources';

export type LocalizedText = { es: string; en: string };
type DiagramPart = { title: LocalizedText; text: LocalizedText; code?: string };
export type FoundationGuide = {
  route: string;
  label: string;
  title: LocalizedText;
  description: LocalizedText;
  diagram: DiagramPart[];
  concepts: { title: LocalizedText; description: LocalizedText }[];
  questions: { prompt: LocalizedText; answer: LocalizedText }[];
  related: string[];
  source: ConceptSource;
};
const text = (es: string, en: string): LocalizedText => ({ es, en });

export const webFoundations: FoundationGuide[] = [
  {
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
  },
  {
    route: 'computer-networks/http', label: 'HTTP Protocol', title: text('Protocolo HTTP', 'HTTP Protocol'),
    description: text('Define cómo un cliente pide una operación sobre un recurso y cómo el servidor comunica el resultado. La petición y la respuesta tienen funciones distintas.', 'It defines how a client requests an operation on a resource and how the server communicates the result. Requests and responses have different roles.'),
    diagram: [
      { title: text('Cliente · petición', 'Client · Request'), text: text('El navegador solicita la representación de un producto. Este GET no envía cuerpo.', 'The browser requests a product representation. This GET sends no body.'), code: 'GET /products/42 HTTP/1.1\nHost: shop.example\nAccept: application/json' },
      { title: text('Servidor · respuesta', 'Server · Response'), text: text('El servidor informa del éxito y devuelve la representación solicitada.', 'The server reports success and returns the requested representation.'), code: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"id":42,"name":"Notebook"}' },
    ],
    concepts: [
      { title: text('URL · dónde', 'URL · Where'), description: text('https://shop.example/products/42 identifica el destino. En este ejemplo HTTP/1.1 la ruta viaja en la línea de petición y la autoridad en Host.', 'https://shop.example/products/42 identifies the target. In this HTTP/1.1 example the path travels in the request line and the authority in Host.') },
      { title: text('Método · qué operación', 'Method · Which Operation'), description: text('GET solicita una representación. POST pide procesar el contenido enviado según las reglas del recurso.', 'GET requests a representation. POST asks the resource to process submitted content according to its rules.') },
      { title: text('Cabeceras · contexto', 'Headers · Context'), description: text('Accept indica formatos de respuesta aceptables. Content-Type identifica el formato del contenido enviado.', 'Accept indicates acceptable response formats. Content-Type identifies the format of the content being sent.') },
      { title: text('Cuerpo · contenido', 'Body · Content'), description: text('Transporta contenido cuando corresponde. Una petición o respuesta puede no tener cuerpo.', 'It carries content when appropriate. A request or response may have no body.') },
      { title: text('Estado · resultado', 'Status · Outcome'), description: text('200 indica éxito y 404 que no se encontró una representación actual del recurso de destino. El estado pertenece a la respuesta.', '200 indicates success and 404 means no current representation of the target resource was found. The status belongs to the response.') },
      { title: text('Un modelo compartido', 'A Shared Model'), description: text('El ejemplo muestra la forma textual de HTTP/1.1. HTTP/2 y HTTP/3 conservan estas ideas pero cambian cómo se transmiten los mensajes.', 'The example shows the textual form of HTTP/1.1. HTTP/2 and HTTP/3 retain these ideas but change how messages are transmitted.') },
    ],
    questions: [
      { prompt: text('¿Dónde buscarías el resultado de la operación y el formato devuelto?', 'Where would you look for the operation outcome and returned format?'), answer: text('En el código de estado y en Content-Type de la respuesta. En el ejemplo son 200 y application/json.', 'In the response status code and Content-Type. Here they are 200 and application/json.') },
      { prompt: text('¿Accept y Content-Type significan lo mismo?', 'Do Accept and Content-Type mean the same thing?'), answer: text('No. Accept expresa qué formatos puede recibir el cliente. Content-Type describe el contenido de ese mensaje.', 'No. Accept expresses which formats the client can receive. Content-Type describes the content of that message.') },
      { prompt: text('Ahora pide /products/99 y recibe 404. Explica qué cambió.', 'Now request /products/99 and receive 404. Explain what changed.'), answer: text('Cambió el recurso de destino y el resultado comunicado por el servidor. El método puede seguir siendo GET y la respuesta puede incluir un cuerpo explicativo.', 'The target resource and the outcome reported by the server changed. The method can still be GET and the response may include an explanatory body.') },
    ],
    related: ['api-design/rest-api', 'computer-systems/buffer'], source: conceptSources.http,
  },
  {
    route: 'api-design/rest-api', label: 'REST API', title: text('API REST', 'REST API'),
    description: text('Organiza la interacción alrededor de recursos y sus representaciones mediante una interfaz uniforme. Usar HTTP y JSON no basta para cumplir REST.', 'It organizes interaction around resources and their representations through a uniform interface. Using HTTP and JSON alone does not satisfy REST.'),
    diagram: [
      { title: text('Identificar el recurso', 'Identify the Resource'), text: text('El producto es el recurso. Su URI permite identificarlo sin confundirlo con los datos enviados.', 'The product is the resource. Its URI identifies it without confusing it with the transferred data.'), code: '/products/42' },
      { title: text('Solicitar una operación', 'Request an Operation'), text: text('GET solicita una representación del producto mediante una operación con significado compartido.', 'GET requests a product representation using an operation with shared meaning.'), code: 'GET /products/42\nAccept: application/json' },
      { title: text('Recibir una representación', 'Receive a Representation'), text: text('JSON es una forma de representar el producto. Un enlace indica una acción o recurso relacionado.', 'JSON is one way to represent the product. A link indicates a related action or resource.'), code: '200 OK\nContent-Type: application/json\nLink: </products/42/reviews>; rel="related"\n\n{"id":42,"name":"Notebook"}' },
    ],
    concepts: [
      { title: text('Recursos y representaciones', 'Resources and Representations'), description: text('El recurso es lo que se identifica. Su representación es la información transferida sobre él y no tiene que ser JSON.', 'The resource is what is identified. Its representation is the information transferred about it and need not be JSON.') },
      { title: text('Métodos HTTP', 'HTTP Methods'), description: text('GET obtiene una representación y PUT crea o reemplaza el estado del recurso de destino. DELETE pide eliminar la asociación con su funcionalidad actual y POST procesa contenido según el recurso.', 'GET retrieves a representation and PUT creates or replaces the target resource state. DELETE requests removal of the association with its current functionality and POST processes content according to the resource.') },
      { title: text('Sin estado de sesión', 'Stateless'), description: text('Cada petición aporta el contexto necesario para entenderla sin depender de una conversación previa guardada en el servidor. El servidor sí puede guardar productos y pedidos.', 'Each request supplies the context needed to understand it without relying on a previous conversation stored by the server. The server can still store products and orders.') },
      { title: text('Interfaz uniforme', 'Uniform Interface'), description: text('Combina identificación de recursos y manipulación mediante representaciones con mensajes autodescriptivos e hipermedia. Los enlaces orientan las siguientes interacciones.', 'It combines resource identification and manipulation through representations with self-descriptive messages and hypermedia. Links guide subsequent interactions.') },
      { title: text('Separación de responsabilidades', 'Separation of Concerns'), description: text('El cliente se ocupa de la interacción del usuario y el servidor de los recursos y sus reglas. Esa separación permite evolucionarlos de forma independiente.', 'The client handles user interaction and the server handles resources and their rules. This separation lets them evolve independently.') },
      { title: text('Caché y capas', 'Cache and Layers'), description: text('Las respuestas indican si se pueden reutilizar. Los intermediarios pueden gestionar tareas sin exigir que el cliente conozca la estructura interna del sistema.', 'Responses indicate whether they can be reused. Intermediaries can handle tasks without requiring the client to know the internal system structure.') },
    ],
    questions: [
      { prompt: text('¿El producto y su JSON son la misma cosa?', 'Are the product and its JSON the same thing?'), answer: text('No. El producto es el recurso y el JSON es una representación. El mismo recurso puede tener otras representaciones.', 'No. The product is the resource and the JSON is a representation. The same resource may have other representations.') },
      { prompt: text('¿Guardar pedidos en una base de datos rompe stateless?', 'Does storing orders in a database break stateless?'), answer: text('No. Se puede guardar el estado de los recursos. La restricción evita depender del estado de sesión del cliente guardado entre peticiones en el servidor.', 'No. Resource state can be stored. The constraint avoids depending on client session state stored on the server between requests.') },
      { prompt: text('Una API usa POST para todo y devuelve JSON. ¿Eso demuestra que es REST?', 'An API uses POST for everything and returns JSON. Does that prove it is REST?'), answer: text('No. Hay que evaluar las restricciones del estilo y el significado de las interacciones. El formato y el protocolo por sí solos no lo demuestran.', 'No. You must evaluate the style constraints and the meaning of the interactions. The format and protocol alone do not prove it.') },
    ],
    related: ['computer-networks/http', 'software-architecture/rest'], source: conceptSources.restArchitecture,
  },
  {
    route: 'software-architecture/rest', label: 'REST', title: text('REST como Estilo Arquitectónico', 'REST as an Architectural Style'),
    description: text('Establece restricciones para que los componentes de un sistema distribuido puedan colaborar y evolucionar. Cada restricción aporta ventajas y costes.', 'It establishes constraints that let distributed system components collaborate and evolve. Each constraint brings benefits and costs.'),
    diagram: [
      { title: text('Cliente', 'Client'), text: text('Gestiona la interacción y envía peticiones con el contexto necesario.', 'Handles interaction and sends requests with the necessary context.') },
      { title: text('Caché e intermediarios', 'Cache and Intermediaries'), text: text('Reutilizan respuestas cuando está permitido y separan responsabilidades en capas.', 'Reuse responses when permitted and separate responsibilities into layers.') },
      { title: text('Servidor', 'Server'), text: text('Expone recursos mediante una interfaz uniforme y comunica sus resultados.', 'Exposes resources through a uniform interface and communicates outcomes.') },
    ],
    concepts: [
      { title: text('Cliente y servidor', 'Client and Server'), description: text('Separa la interfaz de usuario de la gestión de los datos. Ambos lados pueden evolucionar sin compartir su implementación.', 'Separates the user interface from data management. Both sides can evolve without sharing their implementation.') },
      { title: text('Stateless', 'Stateless'), description: text('Cada petición se entiende por sí misma. Evita depender de sesiones del cliente almacenadas en el servidor pero puede repetir contexto en los mensajes.', 'Each request can be understood on its own. It avoids depending on client sessions stored on the server but may repeat context in messages.') },
      { title: text('Caché', 'Cache'), description: text('Una respuesta declara si se puede reutilizar. Puede reducir comunicaciones pero exige controlar su vigencia.', 'A response declares whether it can be reused. This can reduce communication but requires controlling freshness.') },
      { title: text('Interfaz uniforme', 'Uniform Interface'), description: text('Aplica reglas compartidas para identificar recursos y transferir sus representaciones. Incluye mensajes autodescriptivos y enlaces para guiar las interacciones.', 'Applies shared rules for identifying resources and transferring their representations. It includes self-descriptive messages and links to guide interactions.') },
      { title: text('Sistema por capas', 'Layered System'), description: text('Un componente interactúa con su capa inmediata sin conocer todo el sistema. Las capas pueden simplificar responsabilidades y añadir latencia.', 'A component interacts with its immediate layer without knowing the whole system. Layers can simplify responsibilities and add latency.') },
      { title: text('Código bajo demanda · opcional', 'Code on Demand · Optional'), description: text('El servidor puede ampliar las capacidades del cliente enviando código ejecutable. Es la restricción opcional del estilo.', 'The server may extend client capabilities by sending executable code. This is the optional constraint of the style.') },
    ],
    questions: [
      { prompt: text('¿Qué diferencia hay entre REST y HTTP?', 'What is the difference between REST and HTTP?'), answer: text('REST es un estilo arquitectónico con restricciones. HTTP es un protocolo de intercambio que puede utilizarse en sistemas con distintos estilos.', 'REST is an architectural style with constraints. HTTP is an exchange protocol that can be used in systems with different styles.') },
      { prompt: text('¿Por qué una caché no debería reutilizar cualquier respuesta?', 'Why should a cache not reuse every response?'), answer: text('Porque puede contener datos privados o desactualizados. La respuesta debe indicar si permite su reutilización y bajo qué condiciones.', 'Because it may contain private or stale data. The response must indicate whether reuse is permitted and under which conditions.') },
      { prompt: text('Explica una ventaja y un coste de añadir un intermediario.', 'Explain one benefit and one cost of adding an intermediary.'), answer: text('Puede centralizar una responsabilidad como la caché. También puede añadir latencia y otro punto que gestionar.', 'It can centralize a responsibility such as caching. It can also add latency and another point to manage.') },
    ],
    related: ['api-design/rest-api', 'computer-networks/http'], source: conceptSources.restArchitecture,
  },
];
