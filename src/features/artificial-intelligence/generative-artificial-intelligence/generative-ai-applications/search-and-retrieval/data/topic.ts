import type { Topic } from '../../data/topic';

export const searchAndRetrievalTopic: Topic = { id: 'ai-retrieval', es: 'Búsqueda y Recuperación', en: 'Search and Retrieval', entries: [
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
  ] };
