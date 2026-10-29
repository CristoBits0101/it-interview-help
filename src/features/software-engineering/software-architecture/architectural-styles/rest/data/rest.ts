import { conceptSources } from '../../../../../../shared/data/concept-sources';
import type { FoundationGuide } from '../../../../../../shared/lib/foundation-guide';
import { localizedText as text } from '../../../../../../shared/lib/localized-text';

export const restArchitectureGuide: FoundationGuide = {
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
  };
