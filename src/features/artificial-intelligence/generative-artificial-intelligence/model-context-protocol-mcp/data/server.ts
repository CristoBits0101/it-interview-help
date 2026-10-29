import { mcpServerSources, mcpClientSources } from '../../../../../shared/data/concept-sources';
import type { FoundationGuide } from '../../../../../shared/lib/foundation-guide';
import { localizedText as text } from '../../../../../shared/lib/localized-text';

const serverCode = `import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';

void serveStdio(() => {
  const server = new McpServer({ name: 'my-mcp', version: '1.0.0' });
  server.registerTool(
    'sum',
    {
      description: 'Add two numbers',
      inputSchema: z.object({ a: z.number(), b: z.number() })
    },
    async ({ a, b }) => ({
      content: [{ type: 'text', text: String(a + b) }]
    })
  );
  return server;
});`;

export const mcpServerSection: NonNullable<FoundationGuide['sections']>[number] = {
  title: text('Crear tu propio servidor MCP', 'Build Your Own MCP Server'),
  description: text('Un servidor propio expone capacidades de tu aplicación y no necesita incluir un LLM. Este ejemplo educativo usa el SDK oficial de TypeScript v2 en un proyecto separado de esta web.', 'Your own server exposes application capabilities and does not need to include an LLM. This educational example uses the official TypeScript SDK v2 in a separate project from this website.'),
  items: [
    { title: text('Documentación oficial y GitHub', 'Official Documentation and GitHub'), description: text('La guía del protocolo explica cómo construir un servidor y enlaza ejemplos completos en GitHub. La organización modelcontextprotocol mantiene los repositorios oficiales del protocolo y sus SDK.', 'The protocol guide explains how to build a server and links complete examples on GitHub. The modelcontextprotocol organization maintains the official protocol and SDK repositories.'), source: mcpServerSources.tutorial },
    { title: text('1. Preparar el proyecto', '1. Prepare the Project'), description: text('Con Node.js y npm instalados crea una carpeta independiente e instala el SDK y el ejecutor de TypeScript. Los comandos pertenecen al ejemplo y no añaden dependencias a esta aplicación educativa.', 'With Node.js and npm installed create a separate directory and install the SDK and TypeScript runner. These commands belong to the example and do not add dependencies to this educational application.'), code: 'mkdir my-mcp\ncd my-mcp\nnpm init -y\nnpm install @modelcontextprotocol/server zod\nnpm install --save-dev tsx typescript @types/node', source: mcpServerSources.repository },
    { title: text('2. Definir y exponer una herramienta', '2. Define and Expose a Tool'), description: text('Guarda este código completo en server.ts para registrar sum con dos entradas numéricas validadas. serveStdio conecta el servidor con un cliente local y reserva stdout para los mensajes del protocolo.', 'Save this complete code in server.ts to register sum with two validated numeric inputs. serveStdio connects the server to a local client and reserves stdout for protocol messages.'), code: serverCode, source: mcpServerSources.sdk },
    { title: text('3. Probar con MCP Inspector', '3. Test with MCP Inspector'), description: text('Desde la carpeta del ejemplo inicia Inspector y conecta el servidor para listar sus herramientas. Llama a sum con a igual a 2 y b igual a 3 y comprueba que devuelve el texto 5.', 'From the example directory start Inspector and connect the server to list its tools. Call sum with a set to 2 and b set to 3 and check that it returns the text 5.'), code: 'npx @modelcontextprotocol/inspector npx tsx server.ts', source: mcpServerSources.inspector },
    { title: text('4. Conectarlo a un cliente', '4. Connect It to a Client'), description: text('Desde la carpeta my-mcp registra el proceso local en Claude Code y usa /mcp para revisar la conexión. Para compartir la configuración entre proyectos utiliza rutas absolutas al ejecutor y a server.ts según las opciones de tu cliente.', 'From the my-mcp directory register the local process in Claude Code and use /mcp to inspect the connection. To share configuration across projects use absolute paths to the runner and server.ts according to your client options.'), code: 'claude mcp add --transport stdio my-mcp -- npx tsx server.ts\nclaude mcp list', source: mcpClientSources.claude },
    { title: text('5. Ampliar sus capacidades', '5. Extend Its Capabilities'), description: text('Sustituye la suma por una operación concreta y valida sus entradas y permisos antes de acceder a archivos o servicios. Añade recursos o plantillas cuando hagan falta y utiliza Streamable HTTP con la autenticación adecuada si necesitas ofrecerlo remotamente.', 'Replace the sum with a specific operation and validate inputs and permissions before accessing files or services. Add resources or prompts when needed and use Streamable HTTP with appropriate authentication if remote access is required.'), source: mcpServerSources.tutorial },
  ],
};
