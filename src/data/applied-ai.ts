import { conceptSources } from './concept-sources';
import type { Track } from './curriculum';

export const appliedAI: Track = {
  id: 'applied-ai',
  title: 'Generative AI Applications',
  eyebrow: 'GENERATIVE AI APPLICATIONS',
  modules: [
    {
      id: 'ai-fundamentos',
      title: 'Fundamentos de LLMs',
      description: 'Comprende qué genera el modelo y cómo guiarlo.',
      concepts: [
        {
          id: 'ai-llm', title: 'LLM', level: 'Esencial',
          description: 'Un modelo de lenguaje de gran tamaño aprende patrones del lenguaje a partir de datos durante su entrenamiento.',
          details: [
            'Un modelo generativo produce una secuencia de tokens condicionada por el contexto disponible.',
            'Una secuencia probable puede ser incorrecta. La fluidez de la respuesta no demuestra que sus afirmaciones sean ciertas.',
          ],
          source: conceptSources.llm,
          memory: 'Predice lenguaje; verifica los hechos.',
          example: 'Completar una explicación, resumir un documento o clasificar un mensaje.',
        },
        {
          id: 'ai-tokens', title: 'Tokens', level: 'Esencial',
          description: 'Los tokens son las unidades en las que un tokenizador divide el contenido que procesa un modelo.',
          details: [
            'Una unidad puede corresponder a una palabra o a una parte de ella o a un signo.',
            'El número de tokens depende del tokenizador. No equivale directamente al número de palabras.',
          ],
          source: conceptSources.tokens,
          memory: 'La unidad de texto del modelo.',
          example: 'Una palabra larga puede ocupar varios tokens.',
        },
        {
          id: 'ai-contexto', title: 'Ventana de contexto', level: 'Esencial',
          description: 'La ventana de contexto limita la cantidad de tokens que un modelo puede considerar en una interacción.',
          details: [
            'Las instrucciones y el historial ocupan parte de esa capacidad junto con los datos aportados. La salida también debe respetar los límites del modelo.',
            'Disponer de más espacio no garantiza que el modelo use correctamente toda la información.',
          ],
          source: conceptSources.context,
          memory: 'Una mesa de trabajo con espacio limitado.',
          example: 'Recuperar tres párrafos útiles en lugar de enviar todo un manual.',
        },
        {
          id: 'ai-sampling', title: 'Sampling y temperatura', level: 'Intermedio',
          description: 'El muestreo selecciona el siguiente token a partir de la distribución de probabilidades que produce el modelo.',
          details: [
            'La temperatura modifica esa distribución cuando el modelo admite este ajuste. Un valor menor suele concentrarla en las opciones más probables.',
            'Reducir la variación no convierte una respuesta en verdadera ni garantiza resultados idénticos en cualquier implementación.',
          ],
          source: conceptSources.sampling,
          memory: 'Variedad de salida no equivale a verdad.',
          example: 'Ajustar la variación para generar ideas o extraer datos.',
        },
        {
          id: 'ai-alucinacion', title: 'Alucinaciones', level: 'Esencial',
          description: 'Una alucinación es contenido generado que se presenta de forma plausible aunque sea falso o carezca de fundamento.',
          details: [
            'Puede aparecer porque generar una respuesta probable no equivale a comprobar los hechos.',
            'El sistema debe contrastar las afirmaciones con evidencia y permitir reconocer que no hay información suficiente.',
          ],
          source: conceptSources.hallucinations,
          memory: 'Sonar convincente no demuestra nada.',
          example: 'El modelo inventa una función que la biblioteca no contiene.',
        },
        {
          id: 'ai-prompting', title: 'Prompting', level: 'Esencial',
          description: 'El prompting consiste en diseñar las instrucciones y el contexto que guían la respuesta de un modelo.',
          details: [
            'Una petición clara define la tarea y las condiciones que debe cumplir el resultado.',
            'La calidad del prompt se comprueba con casos representativos. Una redacción convincente no sustituye esa evaluación.',
          ],
          source: conceptSources.prompting,
          memory: 'Tarea, contexto, formato y ejemplos.',
          example: 'Clasifica este ticket como error, consulta o sugerencia.',
        },
        {
          id: 'ai-structured-output', title: 'Salida estructurada', level: 'Intermedio',
          description: 'La salida estructurada organiza la respuesta de un modelo según un esquema definido.',
          details: [
            'El esquema especifica los campos y tipos que espera la aplicación.',
            'Cumplir la estructura facilita procesar la respuesta. Los valores todavía deben comprobarse por separado.',
          ],
          source: conceptSources.structured,
          memory: 'Valida la forma y también el contenido.',
          example: 'Extraer nombre y fecha con tipos y campos obligatorios.',
        },
      ],
    },
    {
      id: 'ai-retrieval',
      title: 'Búsqueda y recuperación',
      description: 'Encuentra la información que merece entrar en el contexto.',
      concepts: [
        {
          id: 'ai-embeddings', title: 'Embeddings', level: 'Esencial',
          description: 'Un embedding representa un contenido mediante un vector de valores numéricos aprendido por un modelo.',
          details: [
            'Las representaciones de textos pueden compararse dentro del mismo espacio para estimar similitud semántica.',
            'Una gran similitud no demuestra que dos afirmaciones sean equivalentes ni que un documento responda a una pregunta.',
          ],
          source: conceptSources.embeddings,
          memory: 'Significado aproximado convertido en coordenadas.',
          example: 'Comparar “coche” con “automóvil” mediante vectores.',
        },
        {
          id: 'ai-semantic-search', title: 'Búsqueda semántica', level: 'Esencial',
          description: 'La búsqueda semántica recupera contenido según una similitud de significado estimada por un modelo.',
          details: [
            'Puede representar consultas y documentos en un espacio compatible de embeddings para comparar su proximidad.',
            'La cercanía semántica debe evaluarse con consultas reales. Puede fallar cuando importa una coincidencia exacta.',
          ],
          source: conceptSources.semantic,
          memory: 'Busca por significado.',
          example: '“Recuperar acceso” encuentra una guía para restablecer contraseñas.',
        },
        {
          id: 'ai-bm25', title: 'Búsqueda léxica · BM25', level: 'Intermedio',
          description: 'BM25 es una función que puntúa documentos según la presencia de los términos de una consulta.',
          details: [
            'Considera la frecuencia de los términos y su rareza en la colección además de la longitud del documento.',
            'La repetición tiene un efecto limitado para que un término muy frecuente no domine indefinidamente la puntuación.',
          ],
          source: conceptSources.bm25,
          memory: 'Busca por palabras.',
          example: 'Encontrar el error E_CONN_42 dentro de un manual.',
        },
        {
          id: 'ai-hybrid', title: 'Búsqueda híbrida', level: 'Intermedio',
          description: 'La búsqueda híbrida combina señales de recuperación léxica y semántica.',
          details: [
            'Una fusión por posiciones puede reunir listas ordenadas sin comparar directamente puntuaciones de escalas diferentes.',
            'La combinación debe evaluarse frente a cada método por separado. No garantiza una mejora en todas las consultas.',
          ],
          source: conceptSources.hybrid,
          memory: 'Palabras y significado trabajan juntos.',
          example: 'Combinar BM25 con embeddings para buscar incidencias técnicas.',
        },
        {
          id: 'ai-reranking', title: 'Reranking', level: 'Intermedio',
          description: 'El reranking vuelve a ordenar un conjunto de resultados candidatos mediante una evaluación adicional de relevancia.',
          details: [
            'Un modelo puede comparar cada candidato con la consulta con mayor detalle que la primera fase de búsqueda.',
            'Solo puede ordenar los candidatos recibidos. No recupera por sí mismo documentos que la primera fase omitió.',
          ],
          source: conceptSources.reranking,
          memory: 'Primero encuentra; después ordena mejor.',
          example: 'Recuperar veinte fragmentos y seleccionar los cinco más relevantes.',
        },
        {
          id: 'ai-vector-store', title: 'Índices y almacenes vectoriales', level: 'Intermedio',
          description: 'Un índice vectorial organiza vectores para buscar cuáles son más similares a una consulta.',
          details: [
            'Los métodos aproximados reducen el trabajo de búsqueda a cambio de poder omitir algunos vecinos cercanos.',
            'Faiss ofrece algoritmos de índices. Un almacén vectorial puede añadir persistencia y metadatos además de la búsqueda.',
          ],
          source: conceptSources.vectors,
          memory: 'Índice de similitud ≠ base de datos completa.',
          example: 'Buscar embeddings con FAISS o guardar documentos en Chroma.',
        },
        {
          id: 'ai-chunking', title: 'Chunking', level: 'Intermedio',
          description: 'El chunking divide un documento en fragmentos que puedan recuperarse y utilizarse de forma independiente.',
          details: [
            'Los límites de cada fragmento deben conservar suficiente contexto para interpretar su contenido.',
            'El tamaño y el solapamiento afectan a la recuperación. Los metadatos permiten localizar el pasaje en su fuente.',
          ],
          source: conceptSources.chunking,
          memory: 'Fragmentos pequeños, contexto suficiente.',
          example: 'Separar un PDF por secciones conservando página y título.',
        },
      ],
    },
    {
      id: 'ai-rag',
      title: 'RAG y aplicaciones',
      description: 'Conecta fuentes y modelos en un flujo útil.',
      concepts: [
        {
          id: 'ai-rag-pipeline', title: 'Retrieval-Augmented Generation', level: 'Esencial',
          description: 'RAG combina la recuperación de información con la generación de respuestas de un modelo de lenguaje.',
          details: [
            'El sistema busca contenido relevante y lo incorpora al contexto de generación.',
            'Cambiar las fuentes permite actualizar la información disponible sin reentrenar el modelo. La respuesta sigue necesitando evaluación.',
          ],
          source: conceptSources.rag,
          memory: 'Recuperar → aportar contexto → responder.',
          example: 'Responder sobre una política interna consultando su versión vigente.',
        },
        {
          id: 'ai-grounded-generation', title: 'Generación con evidencia', level: 'Intermedio',
          description: 'La generación con evidencia busca que la respuesta se apoye en información aportada al modelo.',
          details: [
            'Cada afirmación debe poder relacionarse con un pasaje que realmente la respalde.',
            'Una cita no prueba por sí sola ese respaldo. El sistema debe reconocer cuando los documentos no permiten responder.',
          ],
          source: conceptSources.ragEvaluation,
          memory: 'Cada afirmación necesita respaldo.',
          example: 'Mostrar la sección que justifica un plazo de devolución.',
        },
        {
          id: 'ai-orchestration', title: 'LangChain y LlamaIndex', level: 'Intermedio',
          description: 'La orquestación conecta la recuperación de datos con las llamadas a modelos y otras operaciones de una aplicación.',
          details: [
            'LlamaIndex organiza la incorporación de datos y su consulta. LangChain también ofrece componentes para conectar modelos y herramientas.',
            'Estos frameworks facilitan la composición. La calidad final depende del diseño y de la evaluación del conjunto.',
          ],
          source: conceptSources.orchestration,
          memory: 'Los componentes ayudan; las decisiones siguen siendo tuyas.',
          example: 'Componer un cargador PDF, un retriever y un modelo.',
        },
        {
          id: 'ai-ollama', title: 'Inferencia con Ollama', level: 'Intermedio',
          description: 'Ollama es una herramienta para ejecutar modelos compatibles y acceder a ellos mediante una API.',
          details: [
            'Puede servir modelos en el equipo local y también ofrece modalidades de ejecución en la nube.',
            'La ubicación de ejecución determina dónde se procesan los datos. En local la memoria y el hardware condicionan la capacidad.',
          ],
          source: conceptSources.ollama,
          memory: 'El modelo también necesita infraestructura.',
          example: 'Probar un asistente usando un modelo local servido por Ollama.',
        },
        {
          id: 'ai-serving', title: 'Servir IA con FastAPI', level: 'Intermedio',
          description: 'FastAPI permite exponer las operaciones de una aplicación de IA mediante una API web.',
          details: [
            'Los tipos y esquemas ayudan a validar las entradas y documentar el contrato del servicio.',
            'El modelo se ejecuta mediante la integración elegida por la aplicación. FastAPI no realiza por sí mismo la inferencia.',
          ],
          source: conceptSources.fastapi,
          memory: 'Un modelo útil necesita un contrato de servicio.',
          example: 'POST /ask valida una pregunta y devuelve respuesta y fuentes.',
        },
      ],
    },
    {
      id: 'ai-agentes',
      title: 'Agentes y herramientas',
      description: 'Distingue flujos controlados de decisiones dinámicas.',
      concepts: [
        {
          id: 'ai-tool-calling', title: 'Tool calling', level: 'Intermedio',
          description: 'La llamada a herramientas permite que un modelo solicite una operación mediante su nombre y argumentos estructurados.',
          details: [
            'La aplicación comprueba la petición y ejecuta la operación autorizada.',
            'El resultado puede volver al modelo para continuar la tarea. Proponer una llamada no significa que ya se haya ejecutado.',
          ],
          source: conceptSources.tools,
          memory: 'El modelo propone; la aplicación ejecuta.',
          example: 'Solicitar consultar_stock con el identificador de un producto.',
        },
        {
          id: 'ai-agent', title: 'Agentes', level: 'Intermedio',
          description: 'Un agente basado en un modelo decide de forma dinámica qué pasos y herramientas utilizar para realizar una tarea.',
          details: [
            'Observa los resultados de sus acciones para decidir cómo continuar.',
            'La aplicación debe fijar permisos y límites de ejecución además de condiciones de parada.',
          ],
          source: conceptSources.agents,
          memory: 'Observar, decidir, actuar y comprobar.',
          example: 'Buscar documentos adicionales cuando la primera consulta no basta.',
        },
        {
          id: 'ai-workflow', title: 'Workflows', level: 'Esencial',
          description: 'Un workflow define de antemano los pasos y transiciones de un proceso.',
          details: [
            'Puede incluir llamadas a modelos dentro de un recorrido controlado por código.',
            'Es útil cuando el procedimiento es conocido y se necesita comprobar cómo avanza cada ejecución.',
          ],
          source: conceptSources.agents,
          memory: 'Un recorrido definido para una tarea conocida.',
          example: 'Clasificar ticket → extraer campos → validar → guardar.',
        },
        {
          id: 'ai-langgraph', title: 'Estado y LangGraph', level: 'Avanzado',
          description: 'LangGraph permite construir procesos con estado mediante nodos conectados por transiciones.',
          details: [
            'Cada nodo realiza trabajo y puede actualizar el estado que comparte el proceso.',
            'La persistencia permite pausar y reanudar ejecuciones. El diseño decide qué transiciones controla el código y cuáles decide un modelo.',
          ],
          source: conceptSources.langgraph,
          memory: 'Pasos conectados que comparten estado.',
          example: 'Pausar un flujo para revisión humana antes de una acción.',
        },
        {
          id: 'ai-mcp', title: 'Model Context Protocol', level: 'Intermedio',
          description: 'MCP define un protocolo para conectar aplicaciones de IA con capacidades ofrecidas por servidores.',
          details: [
            'Los servidores pueden exponer herramientas y recursos además de plantillas de instrucciones.',
            'El protocolo facilita el intercambio. La aplicación sigue siendo responsable de autorizar acciones y controlar el acceso a datos.',
          ],
          source: conceptSources.mcp,
          memory: 'Un contrato común para conectar capacidades.',
          example: 'Un servidor FastMCP expone una herramienta de consulta documental.',
        },
        {
          id: 'ai-prompt-injection', title: 'Prompt injection', level: 'Avanzado',
          description: 'La inyección de instrucciones intenta hacer que un modelo siga órdenes no confiables que llegan dentro del contenido procesado.',
          details: [
            'El contenido externo puede mezclar datos útiles con instrucciones que contradicen la tarea autorizada.',
            'La defensa combina separación de datos y permisos limitados con comprobación de acciones. Un prompt defensivo no elimina por sí solo el riesgo.',
          ],
          source: conceptSources.injection,
          memory: 'El contenido externo no concede permisos.',
          example: 'Un PDF contiene órdenes para revelar datos ajenos a la tarea.',
        },
      ],
    },
    {
      id: 'ai-evaluacion',
      title: 'Evaluación y producción',
      description: 'Mide la calidad antes y después de cada cambio.',
      concepts: [
        {
          id: 'ai-eval-dataset', title: 'Dataset de evaluación', level: 'Esencial',
          description: 'Un conjunto de evaluación reúne casos y criterios que permiten medir el comportamiento de una aplicación de IA.',
          details: [
            'Debe representar tareas habituales y casos difíciles que importen a sus usuarios.',
            'Separar los casos de evaluación de los usados para ajustar el sistema ayuda a detectar mejoras que no se generalizan.',
          ],
          source: conceptSources.evaluation,
          memory: 'Compara cambios con los mismos casos.',
          example: 'Evaluar una nueva estrategia RAG con cincuenta preguntas revisadas.',
        },
        {
          id: 'ai-precision', title: 'Precision@k', level: 'Intermedio',
          description: 'Precision@k mide la proporción de resultados relevantes entre los primeros k resultados recuperados.',
          details: [
            'Se calcula dividiendo la cantidad de resultados relevantes seleccionados entre k.',
            'Requiere criterios de relevancia. Mide la selección de documentos y no la calidad de una respuesta generada.',
          ],
          source: conceptSources.retrievalMetrics,
          memory: 'De lo recuperado, ¿cuánto sirve?',
          example: 'Tres documentos relevantes entre cinco resultados: Precision@5 = 0,6.',
        },
        {
          id: 'ai-recall', title: 'Recall@k', level: 'Intermedio',
          description: 'Recall@k mide qué parte de todos los documentos relevantes aparece entre los primeros k resultados recuperados.',
          details: [
            'Se calcula dividiendo los relevantes recuperados entre el total de relevantes de la colección evaluada.',
            'Si las etiquetas de relevancia están incompletas la medida es una estimación. Una cobertura alta puede incluir resultados irrelevantes.',
          ],
          source: conceptSources.retrievalMetrics,
          memory: 'De lo necesario, ¿cuánto encontré?',
          example: 'Recuperar tres de cuatro documentos relevantes: Recall@k = 0,75.',
        },
        {
          id: 'ai-groundedness', title: 'Groundedness', level: 'Intermedio',
          description: 'El respaldo documental mide si las afirmaciones de una respuesta están sustentadas por el contexto proporcionado.',
          details: [
            'Se compara el contenido de la respuesta con la evidencia que estaba disponible para generarla.',
            'Una respuesta puede estar respaldada por documentos incorrectos. El respaldo y la verdad externa son comprobaciones distintas.',
          ],
          source: conceptSources.ragEvaluation,
          memory: 'Respaldo en fuentes y verdad son comprobaciones distintas.',
          example: 'Verificar si la cifra citada aparece en el documento recuperado.',
        },
        {
          id: 'ai-llm-judge', title: 'LLM como evaluador', level: 'Avanzado',
          description: 'Un modelo usado como evaluador valora respuestas según criterios y una escala definidos.',
          details: [
            'Puede automatizar parte de la evaluación de cualidades difíciles de medir con reglas exactas.',
            'Sus juicios pueden contener errores y sesgos. Deben contrastarse con revisión humana y comprobaciones independientes.',
          ],
          source: conceptSources.judge,
          memory: 'El evaluador también necesita evaluación.',
          example: 'Comparar valoraciones automáticas con una muestra etiquetada por personas.',
        },
        {
          id: 'ai-cost', title: 'Coste por tarea', level: 'Intermedio',
          description: 'El coste por tarea relaciona los recursos consumidos con el resultado completo de una ejecución.',
          details: [
            'Incluye las llamadas a modelos y los servicios utilizados durante todos sus pasos.',
            'Los reintentos y las herramientas pueden elevar el total. El coste estimado de tokens no representa todo el coste operativo.',
          ],
          source: conceptSources.cost,
          memory: 'Optimiza el resultado completo.',
          example: 'Comparar un modelo pequeño con más reintentos frente a uno mayor.',
        },
        {
          id: 'ai-latency', title: 'Latencia y observabilidad', level: 'Intermedio',
          description: 'La observabilidad registra el recorrido de una aplicación para entender su comportamiento y localizar retrasos o fallos.',
          details: [
            'Una traza relaciona la recuperación de datos con las llamadas al modelo y a las herramientas.',
            'El tiempo hasta el primer token y el tiempo total describen aspectos distintos de la espera del usuario.',
          ],
          source: conceptSources.observability,
          memory: 'Mide cada etapa y también el recorrido.',
          example: 'Detectar que el reranker domina la latencia p95.',
        },
      ],
    },
  ],
};

export const aiSources: { title: string; url: string }[] = [
  { title: 'LangChain · Retrieval y RAG', url: 'https://docs.langchain.com/oss/python/langchain/retrieval' },
  { title: 'LangSmith · Evaluar RAG', url: 'https://docs.langchain.com/langsmith/evaluate-rag-tutorial' },
  { title: 'LangGraph · Workflows y agentes', url: 'https://docs.langchain.com/oss/python/langgraph/workflows-agents' },
  { title: 'MCP · Arquitectura', url: 'https://modelcontextprotocol.io/docs/learn/architecture' },
  { title: 'Ollama · Documentación', url: 'https://docs.ollama.com/' },
  { title: 'FastAPI · Documentación', url: 'https://fastapi.tiangolo.com/' },
];
