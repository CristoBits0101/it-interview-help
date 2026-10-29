import { mcpClientSections } from './clients';
import { conceptSources } from '../../../../../shared/data/concept-sources';
import type { FoundationGuide } from '../../../../../shared/lib/foundation-guide';
import type { LocalizedText } from '../../../../../shared/lib/localized-text';

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const mcpGuide: FoundationGuide = {
  route: 'applied-ai/mcp',
  label: 'Model Context Protocol (MCP)',
  title: text('Protocolo de Contexto del Modelo (MCP)', 'Model Context Protocol (MCP)'),
  description: text('MCP es un protocolo abierto que conecta aplicaciones de IA con herramientas y fuentes de contexto. Estandariza el intercambio sin definir cómo razona el modelo.', 'MCP is an open protocol connecting AI applications to tools and context sources. It standardizes exchange without defining how the model reasons.'),
  diagram: [
    { title: text('Host · aplicación de IA', 'Host · AI Application'), text: text('Una aplicación como VS Code coordina al modelo y sus conexiones MCP.', 'An application such as VS Code coordinates the model and its MCP connections.') },
    { title: text('Cliente MCP', 'MCP Client'), text: text('El host crea un cliente por conexión a un servidor. Ese cliente intercambia mensajes MCP.', 'The host creates one client per server connection. That client exchanges MCP messages.') },
    { title: text('Servidor MCP', 'MCP Server'), text: text('Un programa local o remoto expone capacidades. Puede conectar con una API o una base de datos.', 'A local or remote program exposes capabilities. It can connect to an API or database.') },
    { title: text('Resultado y contexto', 'Result and Context'), text: text('El servidor devuelve el resultado al cliente. El host decide cómo incorporarlo a la respuesta.', 'The server returns the result to the client. The host decides how to incorporate it into the response.') },
  ],
  concepts: [
    { title: text('Tools · herramientas', 'Tools'), description: text('Son operaciones que el modelo puede solicitar. Una herramienta podría buscar incidencias con tools/call tras descubrirse mediante tools/list.', 'These are operations the model can request. A tool could search issues using tools/call after discovery through tools/list.') },
    { title: text('Resources · recursos', 'Resources'), description: text('Son datos que la aplicación puede leer como contexto. Un esquema de base de datos podría obtenerse con resources/read.', 'These are data the application can read as context. A database schema could be retrieved with resources/read.') },
    { title: text('Prompts · plantillas', 'Prompts'), description: text('Son instrucciones reutilizables que el usuario puede seleccionar. Una plantilla de revisión de código puede recuperarse con prompts/get.', 'These are reusable instructions the user can select. A code review template can be retrieved with prompts/get.') },
    { title: text('Mensajes y transportes', 'Messages and Transports'), description: text('JSON-RPC 2.0 estructura los mensajes. stdio comunica procesos locales y Streamable HTTP permite conexiones remotas.', 'JSON-RPC 2.0 structures messages. stdio connects local processes and Streamable HTTP enables remote connections.') },
    { title: text('Servidor y servicio externo', 'Server and External Service'), description: text('GitHub o una base de datos pueden estar detrás del servidor MCP. El servidor adapta sus capacidades al protocolo.', 'GitHub or a database can sit behind the MCP server. The server adapts their capabilities to the protocol.') },
    { title: text('Permisos y control', 'Permissions and Control'), description: text('Conectar un servidor no autoriza todas sus acciones. Limita los permisos y solicita confirmación para operaciones sensibles.', 'Connecting a server does not authorize every action. Limit permissions and request confirmation for sensitive operations.') },
  ],
  questions: [
    { prompt: text('¿El host y el cliente MCP son lo mismo?', 'Are the host and MCP client the same?'), answer: text('No. El host es la aplicación y el cliente es su componente de conexión a un servidor.', 'No. The host is the application and the client is its component connecting to one server.') },
    { prompt: text('¿Cómo distinguirías las tres primitivas en un repositorio?', 'How would you distinguish the three primitives in a repository?'), answer: text('Buscar incidencias puede ser una herramienta. Leer documentación puede ser un recurso. Preparar una revisión puede partir de una plantilla.', 'Searching issues can be a tool. Reading documentation can be a resource. Preparing a review can start from a prompt template.') },
    { prompt: text('¿Un servidor MCP tiene que estar en la nube?', 'Must an MCP server run in the cloud?'), answer: text('No. Puede ejecutarse localmente con stdio o ser remoto mediante Streamable HTTP. La ubicación no cambia el propósito del protocolo.', 'No. It can run locally over stdio or remotely through Streamable HTTP. Location does not change the purpose of the protocol.') },
  ],
  sections: mcpClientSections,
  related: ['computer-networks/http'],
  source: conceptSources.mcp,
};
