import { conceptSources } from '../../../../../shared/data/concept-sources';
import type { FoundationGuide } from '../../../../../shared/lib/foundation-guide';
import { localizedText as text } from '../../../../../shared/lib/localized-text';

export const webRenderingGuide: FoundationGuide = {
    route: 'software-development/web-rendering', label: 'Web Rendering', title: text('Renderizado Web', 'Web Rendering'),
    description: text('SSR prepara el HTML en el servidor al atender una petición. La hidratación conecta ese HTML con la lógica interactiva del navegador.', 'SSR prepares HTML on the server when handling a request. Hydration connects that HTML to interactive browser logic.'),
    diagram: [
      { title: text('Pedir la página', 'Request the Page'), text: text('El navegador solicita la ficha de un producto.', 'The browser requests a product page.'), code: 'GET /products/42' },
      { title: text('Preparar el HTML', 'Prepare the HTML'), text: text('El servidor obtiene el producto y genera su HTML mediante SSR.', 'The server obtains the product and generates its HTML using SSR.'), code: '<h1>Notebook</h1>\n<button>Likes: 0</button>' },
      { title: text('Mostrar el contenido', 'Display the Content'), text: text('El navegador puede mostrar el producto antes de activar el contador. Los enlaces y formularios nativos no necesitan hidratación para funcionar.', 'The browser can display the product before activating the counter. Native links and forms do not require hydration to work.') },
      { title: text('Hidratar el contador', 'Hydrate the Counter'), text: text('El JavaScript del componente reutiliza el HTML y conecta su estado y eventos. Pulsar el botón ya puede incrementar el contador.', 'Component JavaScript reuses the HTML and connects its state and events. Pressing the button can now increment the counter.') },
    ],
    concepts: [
      { title: text('Renderizado en el Servidor (SSR)', 'Server-Side Rendering (SSR)'), description: text('El servidor genera el HTML para una petición y lo envía al navegador. Puede incorporar datos actuales o personalizados y requiere recursos de ejecución en el servidor.', 'The server generates HTML for a request and sends it to the browser. It can include current or personalized data and requires server execution resources.') },
      { title: text('Hidratación', 'Hydration'), description: text('El JavaScript del navegador conecta un componente con su HTML ya renderizado para gestionar estado y eventos. Su primera representación debe coincidir con ese HTML.', 'Browser JavaScript connects a component to its already rendered HTML to manage state and events. Its initial representation must match that HTML.') },
    ],
    questions: [
      { prompt: text('¿SSR e hidratación son lo mismo?', 'Are SSR and hydration the same thing?'), answer: text('SSR produce el HTML en el servidor. La hidratación reutiliza ese HTML en el navegador para activar componentes y no es obligatoria en una página SSR.', 'SSR produces HTML on the server. Hydration reuses that HTML in the browser to activate components and is not mandatory on an SSR page.') },
      { prompt: text('¿Una página generada estáticamente puede hidratarse?', 'Can a statically generated page be hydrated?'), answer: text('Sí. SSG genera el HTML durante la construcción del sitio y SSR lo genera al atender la petición. Ambos pueden combinarse con hidratación mientras que CSR genera la interfaz mediante JavaScript en el navegador.', 'Yes. SSG generates HTML during the site build and SSR generates it when handling the request. Both can be combined with hydration while CSR generates the interface using JavaScript in the browser.') },
      { prompt: text('¿Hay que hidratar toda la ficha del producto?', 'Must the entire product page be hydrated?'), answer: text('No. La hidratación parcial puede activar solo el contador y mantener estáticos el nombre y la descripción. Esa separación limita el JavaScript que necesita el navegador.', 'No. Partial hydration can activate only the counter and keep the name and description static. This separation limits the JavaScript needed by the browser.') },
    ],
    related: ['computer-networks/http'], source: conceptSources.webRendering,
  };
