import type { Track, Concept } from './curriculum';
import { glossarySources } from './concept-sources';

type Entry = [id: string, es: string, en: string, explanation: string, english: string, source: keyof typeof glossarySources, level?: Concept['level']];
type Topic = { id: string; es: string; en: string; entries: Entry[] };
export const glossaryTopics: Topic[] = [
  { id: 'ai-fundamentos', es: 'Modelos y Lenguaje', en: 'Models and Language', entries: [
    ['ai-llm', 'LLM', 'LLM', 'Un LLM genera texto según patrones aprendidos y el contexto recibido. Puede producir información falsa.', 'An LLM learns language patterns and generates text from the supplied context. It does not verify truth by itself.', 'llm'],
    ['ai-inferencia', 'Inferencia', 'Inference', 'Es el uso de un modelo ya entrenado para producir una salida a partir de una entrada.', 'It uses an already trained model to produce an output from an input.', 'llm'],
    ['ai-tokens', 'Tokens', 'Tokens', 'Son las unidades que procesa un modelo. Pueden ser palabras o partes de ellas y también signos.', 'Tokens are the units a model processes. They can include word fragments and punctuation.', 'token'],
    ['ai-contexto', 'Ventana de Contexto', 'Context Window', 'Limita la información que el modelo puede usar en una interacción. Más contexto no garantiza más precisión.', 'It limits the information a model can use in one interaction. More context does not guarantee greater accuracy.', 'context'],
    ['ai-alucinacion', 'Alucinaciones', 'Hallucinations', 'Son respuestas plausibles que contienen información falsa o sin fundamento. La fluidez no demuestra que sean ciertas.', 'Hallucinations are plausible but false or unsupported responses. Fluency does not demonstrate truth.', 'hallucinations'],
    ['ai-tokenizacion', 'Tokenización', 'Tokenization', 'Divide el texto en unidades que el modelo puede procesar. Un token no siempre equivale a una palabra.', 'It splits text into units a model can process. A token is not always a whole word.', 'token'],
    ['ai-prompting', 'Prompting', 'Prompting', 'Consiste en dar instrucciones y contexto al modelo para orientar su respuesta.', 'It provides instructions and context to guide a model response.', 'agents'],
    ['ai-templates', 'Plantillas de Prompts', 'Prompt Templates', 'Son instrucciones reutilizables con espacios para insertar los datos de cada consulta.', 'Prompt templates provide reusable instructions with placeholders for request data.', 'templates'],
    ['ai-cot', 'Razonamiento Paso a Paso', 'Chain-of-Thought', 'Utiliza pasos intermedios para resolver una tarea. Puede ayudar sin garantizar una respuesta correcta.', 'It uses intermediate steps to solve a task. It can help with some problems without guaranteeing a correct answer.', 'cot', 'Intermedio'],
    ['ai-finetuning', 'Ajuste Fino', 'Fine-tuning', 'Continúa el entrenamiento de un modelo existente con datos específicos para adaptar su comportamiento.', 'It continues training an existing model on specific data to adapt its behavior.', 'fine', 'Intermedio'],
    ['ai-self-supervised', 'Aprendizaje Autosupervisado', 'Self-Supervised Learning', 'Aprende a partir de señales extraídas de los propios datos sin exigir etiquetas manuales para cada ejemplo.', 'It learns from signals derived from the data itself without requiring manual labels for every example.', 'llm', 'Intermedio'],
    ['ai-zero-shot', 'Aprendizaje Sin Ejemplos', 'Zero-Shot Learning', 'Resuelve una tarea sin ejemplos específicos en la consulta o adaptación. Puede conocer información relacionada.', 'It handles a task without specific examples in the request or adaptation. It may know related information.', 'zero', 'Intermedio'],
    ['ai-nlp', 'Procesamiento del Lenguaje Natural', 'NLP', 'Es el área que permite analizar y generar lenguaje humano mediante sistemas informáticos.', 'It is the field of analyzing and generating human language with computer systems.', 'nlp'],
    ['ai-nlu', 'Comprensión del Lenguaje Natural', 'NLU', 'Busca interpretar el significado de un texto para reconocer intenciones y extraer información relevante.', 'It interprets text meaning to recognize intentions and extract relevant information.', 'nlp'],
    ['ai-nlg', 'Generación de Lenguaje Natural', 'NLG', 'Produce texto en lenguaje humano a partir de datos o de un contexto recibido.', 'It produces human language text from data or supplied context.', 'nlp'],
    ['ai-lemmatization', 'Lematización', 'Lemmatization', 'Reduce una palabra a su forma de diccionario para facilitar su análisis.', 'It reduces a word to its dictionary form to support analysis.', 'nlp'],
    ['ai-text-processing', 'Procesamiento de Texto', 'Text Processing', 'Prepara o transforma texto para tareas como clasificación y extracción de información.', 'It prepares or transforms text for tasks such as classification and information extraction.', 'nlp'],
  ] },
  { id: 'ai-retrieval', es: 'Búsqueda y Recuperación', en: 'Search and Retrieval', entries: [
    ['ai-embeddings', 'Embeddings', 'Embeddings', 'Representan datos mediante vectores numéricos. Permiten comparar similitud según lo aprendido por el modelo.', 'Embeddings represent data as vectors for similarity comparisons based on learned patterns.', 'retrieval'],
    ['ai-semantic', 'Búsqueda Semántica', 'Semantic Search', 'Encuentra información por su significado y no solo por palabras idénticas.', 'It finds information by meaning rather than only matching identical words.', 'retrieval'],
    ['ai-retrieval-process', 'Recuperación', 'Retrieval', 'Busca información relevante para una consulta en una fuente de datos.', 'It finds information relevant to a query in a data source.', 'retrieval'],
    ['ai-retriever', 'Recuperador', 'Retriever', 'Es el componente que recibe una consulta y devuelve información relevante.', 'It is a component that receives a query and returns relevant information.', 'retrieval'],
    ['ai-advanced-retriever', 'Recuperador Avanzado', 'Advanced Retriever', 'Combina estrategias para mejorar la búsqueda. Es un término general y no un algoritmo concreto.', 'It combines search strategies to improve results. It is a general description rather than one specific algorithm.', 'retrieval', 'Intermedio'],
    ['ai-chunk', 'Fragmento', 'Chunk', 'Es una parte de un documento que se prepara para almacenar o recuperar por separado.', 'It is a portion of a document prepared for independent storage or retrieval.', 'retrieval'],
    ['ai-chunking', 'División en Fragmentos', 'Chunking Strategy', 'Define cómo dividir documentos para recuperar contexto útil sin perder información necesaria.', 'It defines how to split documents to retrieve useful context without losing necessary information.', 'retrieval'],
    ['ai-bm25', 'BM25', 'BM25', 'Ordena documentos por coincidencias de palabras. Considera su frecuencia y la longitud del documento.', 'Ranks documents by matching words. It accounts for term frequency and document length.', 'bm25', 'Intermedio'],
    ['ai-tfidf', 'TF-IDF', 'TF-IDF', 'Asigna más peso a palabras frecuentes en un documento y poco comunes en la colección.', 'It gives more weight to words that are frequent in a document but uncommon in the collection.', 'tfidf', 'Intermedio'],
    ['ai-query-fusion', 'Fusión de Consultas', 'Query Fusion', 'Combina resultados de varias consultas o búsquedas para ampliar la cobertura y ordenar las coincidencias.', 'It combines results from multiple queries or searches to broaden coverage and rank matches.', 'fusion', 'Intermedio'],
    ['ai-reranking', 'Reordenación de Resultados', 'Reranking', 'Vuelve a ordenar los resultados recuperados con una evaluación adicional de su relevancia.', 'It reorders retrieved results using an additional relevance assessment.', 'retrieval', 'Intermedio'],
  ] },
  { id: 'ai-vectors', es: 'Índices y Almacenamiento Vectorial', en: 'Vector Indexes and Storage', entries: [
    ['ai-vector-database', 'Base de Datos Vectorial', 'Vector Database', 'Almacena vectores y permite buscar elementos similares. Puede combinar la similitud con filtros de metadatos.', 'It stores vectors and supports similarity search. It can combine similarity with metadata filters.', 'milvus'],
    ['ai-ann', 'ANN', 'ANN', 'Aproxima los vecinos más próximos para acelerar la búsqueda. Puede omitir coincidencias exactas.', 'It finds approximate nearest neighbors to reduce search cost. It may miss exact results.', 'faiss', 'Intermedio'],
    ['ai-hnsw', 'HNSW', 'HNSW', 'Organiza vectores en un grafo de varias capas para encontrar vecinos similares sin recorrer toda la colección.', 'It organizes vectors in a layered graph to find similar neighbors without scanning the entire collection.', 'hnsw', 'Avanzado'],
    ['ai-lsh', 'LSH', 'LSH', 'Utiliza funciones hash que tienden a agrupar elementos similares para acelerar búsquedas aproximadas.', 'It uses hash functions that tend to group similar items to accelerate approximate search.', 'lsh', 'Avanzado'],
    ['ai-faiss', 'FAISS', 'FAISS', 'Es una biblioteca de búsqueda entre vectores con distintos índices. No es una base de datos completa.', 'It is a library for vector similarity search. It provides different indexes rather than a complete database.', 'faiss', 'Intermedio'],
    ['ai-chroma', 'ChromaDB', 'ChromaDB', 'Almacena embeddings junto a documentos y metadatos para recuperar información por similitud.', 'It stores embeddings with documents and metadata to retrieve information by similarity.', 'chroma', 'Intermedio'],
    ['ai-milvus', 'Milvus', 'Milvus', 'Es una base de datos vectorial diseñada para buscar por similitud en colecciones grandes.', 'It is a vector database designed for similarity search over large collections.', 'milvus', 'Intermedio'],
    ['ai-point', 'Punto Vectorial', 'Point', 'En Qdrant es un registro con vectores y metadatos opcionales. No equivale siempre a un fragmento.', 'In Qdrant it is a record with an identifier and vectors that may include metadata. It is not always one chunk.', 'point', 'Intermedio'],
    ['ai-vector-retriever', 'Recuperador Vectorial', 'Vector Store Retriever', 'Convierte una consulta en una búsqueda sobre un almacén vectorial y devuelve los elementos más similares.', 'It turns a query into a vector store search and returns the most similar items.', 'retrieval', 'Intermedio'],
  ] },
  { id: 'ai-rag', es: 'RAG y Fiabilidad', en: 'RAG and Reliability', entries: [
    ['ai-rag', 'RAG', 'RAG', 'Aporta información externa al modelo para generar respuestas con contexto. No elimina todos los errores.', 'It retrieves external information and supplies it as context for generation. It does not eliminate all errors.', 'rag'],
    ['ai-grounding', 'Fundamentación', 'Grounding', 'Vincula una respuesta con información verificable para que sus afirmaciones puedan contrastarse.', 'It connects a response to verifiable information so its claims can be checked.', 'risk'],
    ['ai-hallucination-mitigation', 'Reducción de Alucinaciones', 'Hallucination Mitigation', 'Combina evidencia y comprobaciones para reducir afirmaciones falsas del modelo. No garantiza eliminarlas.', 'It combines evidence and checks to reduce false model claims. It cannot guarantee their elimination.', 'risk'],
    ['ai-explainable', 'IA Explicable', 'Explainable AI', 'Busca explicar los resultados de un sistema de forma comprensible y fiel a su funcionamiento.', 'Seeks understandable explanations of system results. An explanation should also reflect how the system works.', 'explain', 'Intermedio'],
    ['ai-transparency', 'Transparencia', 'Transparency', 'Comunica cómo se usa un sistema y cuáles son sus capacidades y límites para facilitar una evaluación informada.', 'It communicates how a system is used and its capabilities and limits to support informed assessment.', 'risk'],
    ['ai-deepfake', 'Deepfake', 'Deepfake', 'Es contenido sintético que imita una identidad o una situación real. Puede utilizarse para engañar sobre lo ocurrido.', 'Synthetic content that imitates a real identity or situation. It can mislead people about what happened.', 'risk'],
    ['ai-input-processing', 'Preparación de Entradas', 'Input Processing', 'Valida y transforma los datos recibidos antes de enviarlos al modelo.', 'It validates and transforms incoming data before sending it to a model.', 'messages'],
    ['ai-edge-computing', 'Computación en el Borde', 'Edge Computing', 'Procesa datos cerca de donde se generan para reducir transferencias y dependencia de servicios remotos.', 'It processes data near its source to reduce transfers and dependence on remote services.', 'edgeComputing', 'Intermedio'],
  ] },
  { id: 'ai-agentes', es: 'Agentes y Orquestación', en: 'Agents and Orchestration', entries: [
    ['ai-agentic', 'IA Agéntica', 'Agentic AI', 'Usa sistemas capaces de decidir acciones para alcanzar un objetivo. No requiere que participen varios agentes.', 'It uses systems that can choose actions toward a goal. It does not require multiple agents.', 'agents'],
    ['ai-agents', 'Agentes de IA', 'AI Agents', 'Deciden pasos y utilizan herramientas para completar una tarea dentro de los límites definidos por la aplicación.', 'AI agents choose steps and use tools to complete a task within application limits.', 'agents'],
    ['ai-multiagent', 'Sistema Multiagente', 'Multi-Agent System', 'Distribuye una tarea entre varios agentes que se coordinan. Añade complejidad y no siempre mejora el resultado.', 'It distributes work across coordinated agents. It adds complexity and does not always improve results.', 'agents', 'Intermedio'],
    ['ai-chaining', 'Encadenamiento', 'Chaining', 'Conecta pasos de procesamiento de modo que la salida de uno alimenta al siguiente.', 'It connects processing steps so that one output becomes the next input.', 'agents'],
    ['ai-orchestration', 'Orquestación', 'Orchestration', 'Coordina el orden y el intercambio de datos entre modelos y herramientas para ejecutar una tarea.', 'It coordinates execution order and data exchange between models and tools to perform a task.', 'agents', 'Intermedio'],
    ['ai-react', 'ReAct', 'ReAct', 'Alterna razonamiento y acciones con herramientas para usar sus resultados en las siguientes decisiones.', 'It alternates reasoning and tool actions so their results inform subsequent decisions.', 'react', 'Intermedio'],
    ['ai-reflection', 'Agente con Reflexión', 'Reflection Agent', 'Revisa una respuesta y utiliza la crítica para intentar mejorarla. La revisión no asegura que el resultado sea correcto.', 'It reviews a response and uses criticism to try to improve it. Review does not ensure correctness.', 'reflexion', 'Intermedio'],
    ['ai-reflexion', 'Agente Reflexion', 'Reflexion Agent', 'Guarda reflexiones verbales de intentos anteriores para orientar nuevos intentos sin actualizar los pesos del modelo.', 'It stores verbal reflections on previous attempts to guide later attempts without updating model weights.', 'reflexion', 'Avanzado'],
    ['ai-hitl', 'Supervisión Humana', 'Human-in-the-Loop', 'Incorpora revisión o aprobación humana en pasos concretos antes de continuar la ejecución.', 'It adds human review or approval at specific steps before execution continues.', 'human'],
    ['ai-mcp', 'MCP', 'Model Context Protocol', 'Es un protocolo que conecta aplicaciones de IA con herramientas y datos mediante una interfaz común.', 'It is a protocol connecting AI applications to tools and data sources through a common interface.', 'mcp', 'Intermedio'],
    ['ai-acp', 'ACP', 'ACP', 'Agent Communication Protocol permite comunicar agentes. Se integró en A2A y difiere de Agent Client Protocol.', 'Agent Communication Protocol connects agents. It joined A2A and differs from Agent Client Protocol.', 'acp', 'Avanzado'],
  ] },
  { id: 'ai-frameworks', es: 'Bibliotecas y Frameworks', en: 'Libraries and Frameworks', entries: [
    ['ai-langchain', 'LangChain', 'LangChain', 'Es un framework que integra modelos y herramientas en aplicaciones de IA. No forma parte del lenguaje Python.', 'It is a framework for integrating models and tools into AI applications. It is not a Python language feature.', 'chain'],
    ['ai-langgraph', 'LangGraph', 'LangGraph', 'Organiza procesos con estado en nodos y conexiones para controlar la ejecución de agentes y flujos.', 'It organizes stateful processes as nodes and connections to control agents and workflows.', 'graph', 'Intermedio'],
    ['ai-lcel', 'LCEL', 'LCEL', 'Compone componentes ejecutables de LangChain de forma declarativa. Pertenece al framework y no a Python.', 'It composes LangChain runnable components declaratively. It belongs to the framework rather than Python.', 'lcel', 'Intermedio'],
    ['ai-stategraph', 'StateGraph', 'StateGraph', 'Define un grafo de LangGraph cuyos nodos leen y actualizan un estado compartido.', 'It defines a LangGraph graph whose nodes read and update shared state.', 'graph', 'Intermedio'],
    ['ai-messagegraph', 'MessageGraph', 'MessageGraph', 'Es una interfaz histórica de LangGraph basada en mensajes. Para código nuevo se recomienda StateGraph.', 'MessageGraph is a historical LangGraph interface. New code should use StateGraph with message state.', 'messageGraph', 'Avanzado'],
    ['ai-durable', 'Ejecución Durable', 'Durable Execution', 'Guarda el progreso para reanudar un flujo. Sus pasos deben tolerar repeticiones sin duplicar efectos.', 'It resumes a workflow from saved progress. Steps must handle replay without duplicating effects.', 'durable', 'Intermedio'],
    ['ai-llamaindex', 'LlamaIndex', 'LlamaIndex', 'Es un framework para conectar datos propios con aplicaciones de modelos de lenguaje y procesos de recuperación.', 'It is a framework connecting private data to language model applications and retrieval workflows.', 'llamaindex', 'Intermedio'],
    ['ai-flask', 'Flask', 'Flask', 'Es un framework web de Python para crear aplicaciones y API. No aporta un modelo de IA por sí mismo.', 'It is a Python web framework for applications and APIs. It does not provide an AI model itself.', 'flask'],
  ] },
  { id: 'ai-models-tools', es: 'Modelos y Proveedores', en: 'Models and Providers', entries: [
    ['ai-huggingface', 'Hugging Face', 'Hugging Face', 'Ofrece una plataforma para compartir modelos y conjuntos de datos junto con bibliotecas para utilizarlos.', 'It provides a platform for sharing models and datasets alongside libraries to use them.', 'hf'],
    ['ai-openai', 'OpenAI', 'OpenAI', 'Es una organización que desarrolla modelos de IA y ofrece productos y API para utilizarlos.', 'OpenAI develops AI models and provides products and APIs to use them.', 'images'],
    ['ai-mistral', 'Mistral', 'Mistral', 'Es un proveedor de modelos de IA. El nombre también identifica varias de sus familias de modelos.', 'Mistral provides AI models. The name also identifies its model families.', 'mistral'],
    ['ai-llama4', 'Llama 4', 'Llama 4', 'Es una familia de modelos de Meta con capacidades de procesamiento de texto e imágenes.', 'It is a Meta model family with text and image processing capabilities.', 'llama', 'Intermedio'],
    ['ai-llava', 'LLaVA', 'LLaVA', 'Combina visión y lenguaje para responder a instrucciones y preguntas sobre imágenes.', 'LLaVA combines vision and language to answer questions about images.', 'llava', 'Intermedio'],
    ['ai-qwen', 'Qwen2.5-VL', 'Qwen2.5-VL', 'Es una familia de modelos de visión y lenguaje que interpreta imágenes y vídeo junto con instrucciones textuales.', 'It is a vision and language model family that interprets images and video alongside text instructions.', 'qwen', 'Intermedio'],
    ['ai-dalle', 'DALL·E', 'DALL·E', 'Fue una familia de modelos de OpenAI para generar imágenes desde texto. Sus modelos se retiraron de la API.', 'DALL·E generated images from text. Its API models have been retired.', 'dalle'],
    ['ai-whisper', 'Whisper', 'Whisper', 'Es un modelo de reconocimiento de voz que permite transcribir audio y traducir voz al inglés.', 'It is a speech recognition model supporting audio transcription and speech translation into English.', 'whisper'],
    ['ai-edge-tts', 'edge-tts', 'edge-tts', 'Conecta Python al servicio de voz de Microsoft Edge. No es un modelo local ni una biblioteca oficial.', 'It is a Python library accessing Microsoft Edge speech services. It is neither a local model nor an official Microsoft SDK.', 'edge', 'Intermedio'],
  ] },
  { id: 'ai-multimodal', es: 'Fundamentos Multimodales', en: 'Multimodal Foundations', entries: [
    ['ai-multimodal', 'IA Multimodal', 'Multimodal AI', 'Procesa o genera más de un tipo de información como texto e imágenes dentro de un mismo sistema.', 'It processes or generates more than one information type such as text and images within one system.', 'vision'],
    ['ai-computer-vision', 'Visión Artificial', 'Computer Vision', 'Analiza imágenes y vídeo para extraer información sobre su contenido.', 'Analyzes images and video to extract information about their content.', 'vision'],
    ['ai-cross-alignment', 'Alineación entre Modalidades', 'Cross-Modal Alignment', 'Relaciona representaciones de distintos tipos de datos para asociar contenidos equivalentes.', 'It connects representations of different data types to associate corresponding content.', 'clip', 'Intermedio'],
    ['ai-cross-understanding', 'Comprensión entre Modalidades', 'Cross-Modal Understanding', 'Relaciona información de distintos tipos para interpretar su significado conjunto.', 'It relates information from different data types to interpret their combined meaning.', 'vision', 'Intermedio'],
    ['ai-fusion', 'Fusión Multimodal', 'Multimodal Fusion', 'Combina datos de varias modalidades para producir una representación o respuesta conjunta.', 'It combines information from multiple modalities into a joint representation or response.', 'vision', 'Intermedio'],
    ['ai-multimodal-message', 'Mensaje Multimodal', 'Multimodal Message', 'Agrupa contenidos de distintos tipos en un mensaje que un modelo compatible puede procesar.', 'It groups different content types in a message that a compatible model can process.', 'messages'],
    ['ai-vlm', 'Modelo de Visión y Lenguaje', 'Vision-Language Model', 'Relaciona imágenes y texto para interpretar contenido visual y responder a instrucciones.', 'It relates images and text to interpret visual content and respond to instructions.', 'vision'],
    ['ai-visual-encoder', 'Codificador Visual', 'Visual Encoder', 'Convierte imágenes en representaciones numéricas para otros componentes del modelo.', 'It transforms images into numerical representations that other model components can process.', 'clip', 'Intermedio'],
    ['ai-mm-rag', 'RAG Multimodal', 'MM-RAG', 'Recupera contexto de distintas modalidades para apoyar una respuesta generada.', 'It retrieves context from different modalities to support a generated response.', 'retrieval', 'Intermedio'],
    ['ai-caption', 'Descripción de Imágenes', 'Image Captioning', 'Genera una descripción textual del contenido de una imagen.', 'It generates a text description of an image.', 'vision'],
    ['ai-vqa', 'Preguntas sobre Imágenes', 'Visual Question Answering', 'Responde preguntas utilizando la información visual de una imagen.', 'It answers questions using the visual information in an image.', 'vision'],
    ['ai-visual-search', 'Búsqueda Visual', 'Visual Search', 'Encuentra imágenes o elementos relacionados a partir de características visuales.', 'It finds related images or items using visual features.', 'clip', 'Intermedio'],
  ] },
  { id: 'ai-image-video', es: 'Generación de Imagen y Vídeo', en: 'Image and Video Generation', entries: [
    ['ai-diffusion', 'Modelo de Difusión', 'Diffusion Model', 'Aprende a invertir un proceso de ruido para generar contenido mediante pasos sucesivos.', 'It learns to reverse a noise process to generate content through successive steps.', 'diffusion', 'Intermedio'],
    ['ai-vae', 'VAE', 'VAE', 'Aprende un espacio probabilístico comprimido que permite representar datos y generar nuevas muestras.', 'It learns a compressed probabilistic data representation and can generate new samples from that space.', 'vae', 'Avanzado'],
    ['ai-text-image', 'Texto a Imagen', 'Text to Image', 'Genera una imagen a partir de una descripción escrita.', 'It generates an image from a written description.', 'diffusion'],
    ['ai-text-video', 'Texto a Vídeo', 'Text to Video', 'Genera una secuencia de vídeo a partir de instrucciones textuales.', 'It generates a video sequence from text instructions.', 'video'],
    ['ai-image-video', 'Imagen a Vídeo', 'Image-to-Video', 'Utiliza una imagen como punto de partida para generar una secuencia de vídeo.', 'It uses an image as the starting point for a generated video sequence.', 'video'],
    ['ai-inpainting', 'Relleno Generativo', 'Inpainting', 'Genera contenido para completar o sustituir una región seleccionada de una imagen.', 'It generates content to fill or replace a selected image region.', 'inpaint'],
    ['ai-dalle-edits', 'Edición con DALL·E', 'DALL-E Edits', 'Editaba regiones de una imagen mediante instrucciones con DALL·E 2. Es una función histórica.', 'DALL·E 2 edited image regions using instructions. This feature is historical.', 'dalleEdits', 'Intermedio'],
    ['ai-dalle-variations', 'Variaciones con DALL·E', 'DALL-E Variations', 'Generaba imágenes a partir de una imagen de referencia con DALL·E 2. Ese servicio está retirado.', 'DALL·E 2 generated variations of a reference image. The service has been retired.', 'dalleVariations', 'Intermedio'],
    ['ai-visual-prompt', 'Instrucciones Visuales', 'Visual Prompt Engineering', 'Describe el contenido y el estilo deseados para orientar una generación de imagen o vídeo.', 'It describes desired content and style to guide image or video generation.', 'video'],
    ['ai-storyboard', 'Guion Gráfico', 'Storyboard', 'Organiza una historia en escenas visuales para planificar su composición y continuidad.', 'It organizes a story into visual scenes to plan composition and continuity.', 'storyboard'],
    ['ai-temporal', 'Coherencia Temporal', 'Temporal Consistency', 'Mantiene continuidad entre fotogramas para evitar cambios injustificados en objetos y escenas.', 'Maintains continuity between frames to avoid unjustified changes in objects and scenes.', 'video', 'Intermedio'],
    ['ai-image-validation', 'Validación y Codificación de Imágenes', 'Image Validation and Encoding', 'Comprueba que una imagen cumple los requisitos de entrada y la convierte al formato que necesita el servicio.', 'It checks an image against input requirements and converts it to the format a service needs.', 'messages', 'Intermedio'],
    ['ai-b64', 'b64_json', 'b64_json', 'Es un campo de respuesta que contiene una imagen en Base64. No es un formato de imagen.', 'It is a field in some API responses containing a Base64-encoded image. It is not an image format.', 'images', 'Intermedio'],
    ['ai-visual-workflow', 'Flujo de Generación Visual', 'Visual Generation Workflow', 'Conecta la preparación de instrucciones con la generación y el procesamiento del resultado visual.', 'It connects instruction preparation with generation and processing of the visual result.', 'video', 'Intermedio'],
  ] },
  { id: 'ai-speech', es: 'Voz y Audio', en: 'Speech and Audio', entries: [
    ['ai-speech-processing', 'Procesamiento de Voz', 'Speech Processing', 'Agrupa técnicas para analizar y generar señales de voz humana.', 'It groups techniques for analyzing and generating human speech signals.', 'nlp'],
    ['ai-speech-recognition', 'Reconocimiento de Voz', 'Speech Recognition', 'Identifica el contenido lingüístico del habla. Es la base de la transcripción automática.', 'It recognizes the linguistic content of speech. It underpins automatic transcription.', 'whisper'],
    ['ai-stt', 'Voz a Texto', 'Speech to Text', 'Convierte el habla de una grabación en texto mediante reconocimiento automático de voz.', 'It converts recorded speech to text using automatic speech recognition.', 'whisper'],
    ['ai-transcription', 'Transcripción', 'Transcription', 'Es la versión escrita de una grabación de voz. Puede obtenerse manualmente o con reconocimiento automático.', 'Transcription is the written form of recorded speech. It can be produced manually or automatically.', 'whisper'],
    ['ai-tts', 'Texto a Voz', 'Text to Speech', 'Genera una señal de voz a partir de texto escrito.', 'It generates a speech signal from written text.', 'tts'],
  ] },
];

export const glossaryTranslations = Object.fromEntries(glossaryTopics.flatMap(topic => [
  [topic.es, topic.en], ...topic.entries.flatMap(([, es, en, text, english]) => [[es, en], [text, english]]),
]));

const originalNames: Record<string, string> = {
  'ai-agents': 'Agentes de IA', 'ai-tokenizacion': 'Tokenizacion',
  'ai-templates': 'Prompting Templates', 'ai-lemmatization': 'Lematizacion',
  'ai-multimodal': 'IA Multimodal', 'ai-visual-prompt': 'Prompt Engineering Visual',
  'ai-dalle': 'DALL-E', 'ai-qwen': 'Qwen2.5VL',
};
const supplementalIds = new Set(['ai-inferencia', 'ai-tokens', 'ai-contexto', 'ai-alucinacion']);
export const glossaryInventory = glossaryTopics.flatMap(topic => topic.entries.filter(([id]) => !supplementalIds.has(id)).map(([id, , en]) => ({
  id, term: originalNames[id] ?? en, topic: topic.en,
})));

export const aiGlossary: Track = {
  id: 'applied-ai', title: 'Generative AI Applications', eyebrow: 'GENERATIVE AI APPLICATIONS',
  modules: glossaryTopics.map(topic => ({
    id: topic.id, title: topic.es, description: topic.es,
    concepts: topic.entries.map(([id, title, , description, , source, level = 'Esencial']) => ({
      id, title, description, source: glossarySources[source], level,
    })),
  })),
};
