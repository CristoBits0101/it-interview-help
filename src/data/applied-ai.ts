import type { Track } from './curriculum';

export const appliedAI: Track = {
  id: 'applied-ai',
  title: 'Applied Artificial Intelligence',
  eyebrow: 'APPLIED ARTIFICIAL INTELLIGENCE',
  modules: [
    {
      id: 'ai-fundamentos',
      title: 'Fundamentos de LLMs',
      description: 'Comprende qué genera el modelo y cómo guiarlo.',
      concepts: [
        {
          id: 'ai-llm', title: 'LLM', level: 'Esencial',
          description: 'Un modelo de lenguaje genera texto prediciendo tokens según el contexto. Aprende patrones durante el entrenamiento; una respuesta fluida no garantiza que sea correcta.',
          memory: 'Predice lenguaje; verifica los hechos.',
          example: 'Completar una explicación, resumir un documento o clasificar un mensaje.',
        },
        {
          id: 'ai-tokens', title: 'Tokens', level: 'Esencial',
          description: 'Unidades en las que el modelo divide el texto: pueden ser palabras, fragmentos o signos. Entrada y salida consumen tokens y afectan límites, coste y tiempo.',
          memory: 'La unidad de texto del modelo.',
          example: 'Una palabra larga puede ocupar varios tokens.',
        },
        {
          id: 'ai-contexto', title: 'Ventana de contexto', level: 'Esencial',
          description: 'Cantidad máxima de tokens que admite una interacción, según el modelo. Instrucciones, historial, documentos y respuesta compiten por espacio; más contexto no siempre mejora la calidad.',
          memory: 'Una mesa de trabajo con espacio limitado.',
          example: 'Recuperar tres párrafos útiles en lugar de enviar todo un manual.',
        },
        {
          id: 'ai-sampling', title: 'Sampling y temperatura', level: 'Intermedio',
          description: 'El muestreo decide qué token elegir entre las opciones probables. La temperatura ajusta su diversidad cuando el modelo la admite; reducirla no garantiza exactitud ni determinismo.',
          memory: 'Variedad de salida no equivale a verdad.',
          example: 'Ajustar la variación para generar ideas o extraer datos.',
        },
        {
          id: 'ai-alucinacion', title: 'Alucinaciones', level: 'Esencial',
          description: 'Respuestas plausibles con información falsa o sin respaldo. Pueden aparecer incluso con buenos prompts o RAG; se reducen con evidencia, validación y capacidad de reconocer incertidumbre.',
          memory: 'Sonar convincente no demuestra nada.',
          example: 'El modelo inventa una función que la biblioteca no contiene.',
        },
        {
          id: 'ai-prompting', title: 'Prompting', level: 'Esencial',
          description: 'Diseñar instrucciones con una tarea clara, contexto relevante, restricciones y formato esperado. Añadir ejemplos ayuda a comunicar el comportamiento; comprobar resultados permite mejorar el prompt.',
          memory: 'Tarea, contexto, formato y ejemplos.',
          example: 'Clasifica este ticket como error, consulta o sugerencia.',
        },
        {
          id: 'ai-structured-output', title: 'Salida estructurada', level: 'Intermedio',
          description: 'Generar datos conforme a un esquema, como JSON validado con Pydantic. Un formato válido facilita la integración, pero no demuestra que sus valores sean correctos.',
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
          description: 'Representaciones numéricas que permiten comparar textos por similitud. Usa modelos compatibles para consultas y documentos; una distancia pequeña no garantiza que el resultado responda a la pregunta.',
          memory: 'Significado aproximado convertido en coordenadas.',
          example: 'Comparar “coche” con “automóvil” mediante vectores.',
        },
        {
          id: 'ai-semantic-search', title: 'Búsqueda semántica', level: 'Esencial',
          description: 'Recupera contenido por similitud de significado usando embeddings. Puede encontrar expresiones diferentes para una misma idea, aunque puede fallar con identificadores o coincidencias exactas.',
          memory: 'Busca por significado.',
          example: '“Recuperar acceso” encuentra una guía para restablecer contraseñas.',
        },
        {
          id: 'ai-bm25', title: 'Búsqueda léxica · BM25', level: 'Intermedio',
          description: 'BM25 ordena documentos por coincidencias de términos, considerando frecuencia, rareza y longitud. Resulta útil para códigos, nombres concretos y vocabulario exacto.',
          memory: 'Busca por palabras.',
          example: 'Encontrar el error E_CONN_42 dentro de un manual.',
        },
        {
          id: 'ai-hybrid', title: 'Búsqueda híbrida', level: 'Intermedio',
          description: 'Combina resultados de búsqueda léxica y semántica. Métodos de fusión como RRF integran rankings distintos; conviene evaluar si mejora frente a cada búsqueda por separado.',
          memory: 'Palabras y significado trabajan juntos.',
          example: 'Combinar BM25 con embeddings para buscar incidencias técnicas.',
        },
        {
          id: 'ai-reranking', title: 'Reranking', level: 'Intermedio',
          description: 'Reordena un conjunto de documentos candidatos mediante una comparación más precisa con la consulta. Puede mejorar la relevancia, a cambio de procesamiento y latencia adicionales.',
          memory: 'Primero encuentra; después ordena mejor.',
          example: 'Recuperar veinte fragmentos y seleccionar los cinco más relevantes.',
        },
        {
          id: 'ai-vector-store', title: 'Índices y almacenes vectoriales', level: 'Intermedio',
          description: 'Permiten buscar vectores similares. Chroma ofrece almacenamiento y consultas con metadatos; FAISS es una biblioteca de índices de similitud, no una base de datos completa.',
          memory: 'Índice de similitud ≠ base de datos completa.',
          example: 'Buscar embeddings con FAISS o guardar documentos en Chroma.',
        },
        {
          id: 'ai-chunking', title: 'Chunking', level: 'Intermedio',
          description: 'Divide documentos en fragmentos recuperables. El tamaño, los límites semánticos y el solapamiento afectan relevancia y contexto; conserva metadatos para localizar la fuente.',
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
          description: 'RAG recupera información externa y la incorpora al contexto antes de generar una respuesta. Actualiza la evidencia disponible sin volver a entrenar el modelo.',
          memory: 'Recuperar → aportar contexto → responder.',
          example: 'Responder sobre una política interna consultando su versión vigente.',
        },
        {
          id: 'ai-grounded-generation', title: 'Generación con evidencia', level: 'Intermedio',
          description: 'Pide respuestas respaldadas por los documentos recuperados y citas comprobables. Si falta evidencia, el sistema debe reconocerlo; citar una fuente no asegura que apoye la afirmación.',
          memory: 'Cada afirmación necesita respaldo.',
          example: 'Mostrar la sección que justifica un plazo de devolución.',
        },
        {
          id: 'ai-orchestration', title: 'LangChain y LlamaIndex', level: 'Intermedio',
          description: 'Frameworks con componentes para conectar modelos, datos y herramientas. Facilitan construir aplicaciones, pero la calidad depende del diseño, la recuperación y la evaluación del sistema.',
          memory: 'Los componentes ayudan; las decisiones siguen siendo tuyas.',
          example: 'Componer un cargador PDF, un retriever y un modelo.',
        },
        {
          id: 'ai-ollama', title: 'Inferencia con Ollama', level: 'Intermedio',
          description: 'Ollama permite ejecutar modelos compatibles y consultarlos mediante una API. En ejecución local, la memoria disponible y el modelo elegido condicionan velocidad y capacidad.',
          memory: 'El modelo también necesita infraestructura.',
          example: 'Probar un asistente usando un modelo local servido por Ollama.',
        },
        {
          id: 'ai-serving', title: 'Servir IA con FastAPI', level: 'Intermedio',
          description: 'Una API expone el flujo de IA a clientes web. FastAPI facilita validación y endpoints; añade límites de tiempo, autenticación, control de concurrencia y observabilidad.',
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
          description: 'El modelo propone una herramienta y argumentos estructurados. La aplicación valida y ejecuta la llamada, y devuelve el resultado; el modelo por sí solo no ejecuta la función.',
          memory: 'El modelo propone; la aplicación ejecuta.',
          example: 'Solicitar consultar_stock con el identificador de un producto.',
        },
        {
          id: 'ai-agent', title: 'Agentes', level: 'Intermedio',
          description: 'Un agente usa un modelo para elegir próximos pasos y herramientas según resultados. Necesita límites de iteraciones, permisos y condiciones de parada para mantener el control.',
          memory: 'Observar, decidir, actuar y comprobar.',
          example: 'Buscar documentos adicionales cuando la primera consulta no basta.',
        },
        {
          id: 'ai-workflow', title: 'Workflows', level: 'Esencial',
          description: 'Flujos con pasos y transiciones definidos en código. Son apropiados cuando el proceso es conocido y permiten controlar mejor el recorrido, aunque incluyan llamadas a modelos.',
          memory: 'Un recorrido definido para una tarea conocida.',
          example: 'Clasificar ticket → extraer campos → validar → guardar.',
        },
        {
          id: 'ai-langgraph', title: 'Estado y LangGraph', level: 'Avanzado',
          description: 'LangGraph representa procesos como nodos y transiciones sobre un estado compartido. Facilita persistencia, pausas y reanudación de flujos; la aplicación define qué decisiones automatizar.',
          memory: 'Pasos conectados que comparten estado.',
          example: 'Pausar un flujo para revisión humana antes de una acción.',
        },
        {
          id: 'ai-mcp', title: 'Model Context Protocol', level: 'Intermedio',
          description: 'MCP estandariza la conexión entre aplicaciones de IA y servidores que ofrecen herramientas, recursos y prompts. No decide la estrategia del agente ni sustituye autenticación y autorización.',
          memory: 'Un contrato común para conectar capacidades.',
          example: 'Un servidor FastMCP expone una herramienta de consulta documental.',
        },
        {
          id: 'ai-prompt-injection', title: 'Prompt injection', level: 'Avanzado',
          description: 'Contenido no confiable intenta cambiar las instrucciones del sistema. Trata documentos como datos, restringe herramientas y valida acciones; un prompt defensivo por sí solo no elimina el riesgo.',
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
          description: 'Conjunto representativo de casos con criterios verificables. Incluye preguntas habituales, casos límite y preguntas sin respuesta; separa evaluación de los ejemplos usados para ajustar el sistema.',
          memory: 'Compara cambios con los mismos casos.',
          example: 'Evaluar una nueva estrategia RAG con cincuenta preguntas revisadas.',
        },
        {
          id: 'ai-precision', title: 'Precision@k', level: 'Intermedio',
          description: 'Proporción de resultados relevantes entre los primeros k recuperados. Mide cuánto ruido entra en la selección; requiere etiquetas de relevancia y no mide la respuesta final.',
          memory: 'De lo recuperado, ¿cuánto sirve?',
          example: 'Tres documentos relevantes entre cinco resultados: Precision@5 = 0,6.',
        },
        {
          id: 'ai-recall', title: 'Recall@k', level: 'Intermedio',
          description: 'Proporción de documentos relevantes conocidos que aparecen entre los primeros k resultados. Mide cobertura; un valor alto puede coexistir con mucho contenido irrelevante.',
          memory: 'De lo necesario, ¿cuánto encontré?',
          example: 'Recuperar tres de cuatro documentos relevantes: Recall@k = 0,75.',
        },
        {
          id: 'ai-groundedness', title: 'Groundedness', level: 'Intermedio',
          description: 'Evalúa si las afirmaciones de una respuesta están respaldadas por el contexto. No garantiza verdad externa: una respuesta puede reproducir fielmente documentos incorrectos o desactualizados.',
          memory: 'Respaldo en fuentes y verdad son comprobaciones distintas.',
          example: 'Verificar si la cifra citada aparece en el documento recuperado.',
        },
        {
          id: 'ai-llm-judge', title: 'LLM como evaluador', level: 'Avanzado',
          description: 'Un modelo puntúa salidas siguiendo una rúbrica. Puede equivocarse y mostrar sesgos; calibra sus juicios con revisión humana y combínalos con comprobaciones deterministas.',
          memory: 'El evaluador también necesita evaluación.',
          example: 'Comparar valoraciones automáticas con una muestra etiquetada por personas.',
        },
        {
          id: 'ai-cost', title: 'Coste por tarea', level: 'Intermedio',
          description: 'Suma inferencia, recuperación, herramientas e infraestructura. Mide coste por tarea resuelta, no solo por llamada; reintentos y bucles de agentes pueden multiplicarlo.',
          memory: 'Optimiza el resultado completo.',
          example: 'Comparar un modelo pequeño con más reintentos frente a uno mayor.',
        },
        {
          id: 'ai-latency', title: 'Latencia y observabilidad', level: 'Intermedio',
          description: 'Registra tiempos de búsqueda, modelo y herramientas para localizar retrasos. Mide percentiles y tiempo hasta el primer token; el streaming mejora la espera percibida, no necesariamente el tiempo total.',
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
