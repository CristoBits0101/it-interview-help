import { conceptSources } from '../../../../../shared/data/concept-sources';
import type { FoundationGuide } from '../../../../../shared/lib/foundation-guide';
import { localizedText as text } from '../../../../../shared/lib/localized-text';

export const httpGuide: FoundationGuide = {
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
  };
