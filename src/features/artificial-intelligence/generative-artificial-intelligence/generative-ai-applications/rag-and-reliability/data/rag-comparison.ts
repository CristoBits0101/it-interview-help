import type { LocalizedText } from '../../../../../../shared/lib/localized-text';
import type { ReferenceComparison } from '../../../../../../shared/lib/reference-comparison';
import { comparisonSources } from '../../../../../../shared/data/concept-sources';

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const ragComparison: ReferenceComparison = {
    id: 'rag-kag-guide', label: 'RAG vs KAG', title: text('RAG y KAG', 'RAG vs KAG'),
    description: text('Ambos aportan conocimiento externo a la generación. Aquí KAG se refiere al enfoque de OpenSPG que combina recuperación con conocimiento estructurado y razonamiento guiado.', 'Both bring external knowledge into generation. Here KAG refers to the OpenSPG approach that combines retrieval with structured knowledge and guided reasoning.'),
    columns: [
      { title: 'RAG', steps: [
        text('La persona pregunta qué departamento tiene más empleados.', 'The user asks which department has the most employees.'),
        text('El recuperador busca evidencia relevante. Puede usar búsqueda vectorial o combinar otras técnicas.', 'The retriever finds relevant evidence. It may use vector search or combine other techniques.'),
        text('Se recuperan documentos o fragmentos sobre departamentos y empleados.', 'Documents or chunks about departments and employees are retrieved.'),
        text('La evidencia se incorpora al contexto del modelo.', 'The evidence is incorporated into the model context.'),
        text('El modelo genera una respuesta apoyada en lo recuperado. La calidad depende de la evidencia y de cómo se utiliza.', 'The model generates an answer grounded in the retrieved material. Quality depends on the evidence and how it is used.'),
      ] },
      { title: 'KAG · OpenSPG', steps: [
        text('La persona formula la misma pregunta.', 'The user asks the same question.'),
        text('El sistema consulta conocimiento estructurado y texto asociado.', 'The system queries structured knowledge and associated text.'),
        text('Las relaciones entre departamentos y empleados pueden apoyar operaciones de razonamiento.', 'Relationships between departments and employees can support reasoning operations.'),
        text('Los resultados y la evidencia se organizan como contexto.', 'Results and evidence are organized into context.'),
        text('El modelo genera una respuesta con ese apoyo. La estructura no garantiza por sí sola que sea correcta.', 'The model generates an answer with that support. Structure alone does not guarantee correctness.'),
      ] },
    ],
    rows: [
      { title: text('Fuentes de conocimiento', 'Knowledge Sources'), values: [text('Documentos y otros datos recuperables. RAG también puede utilizar grafos.', 'Documents and other retrievable data. RAG can also use graphs.'), text('Conocimiento estructurado y texto conectados dentro del enfoque de OpenSPG.', 'Structured knowledge and text connected within the OpenSPG approach.')] },
      { title: text('Actualización', 'Updates'), values: [text('Depende de la ingesta y de los índices utilizados.', 'Depends on ingestion and the indexes used.'), text('Depende también de cómo se construyen y mantienen las relaciones estructuradas.', 'Also depends on how structured relationships are built and maintained.')] },
      { title: text('Razonamiento', 'Reasoning'), values: [text('Depende de la evidencia recuperada y del sistema completo. No es necesariamente limitado.', 'Depends on retrieved evidence and the complete system. It is not necessarily limited.'), text('Incorpora mecanismos de razonamiento guiado. La mejora depende de la tarea y del conocimiento disponible.', 'Incorporates guided reasoning mechanisms. Improvement depends on the task and available knowledge.')] },
      { title: text('Complejidad', 'Complexity'), values: [text('Puede empezar con un flujo sencillo y crecer con los requisitos.', 'Can start with a simple flow and grow with requirements.'), text('Añade trabajo de representación y mantenimiento del conocimiento estructurado.', 'Adds work to represent and maintain structured knowledge.')] },
    ],
    tips: [
      text('La evidencia del ejemplo contiene HR con Alice y Bob y Engineering con Charlie. La respuesta esperada es HR con dos empleados.', 'The example evidence contains HR with Alice and Bob and Engineering with Charlie. The expected answer is HR with two employees.'),
      text('Compara ambos enfoques con las mismas preguntas y evidencia. Mide calidad de respuesta y coste junto con latencia y mantenimiento.', 'Compare both approaches using the same questions and evidence. Measure answer quality and cost alongside latency and maintenance.'),
      text('KAG no es una categoría universal opuesta a todo RAG. GraphRAG y otros enfoques también pueden usar relaciones y grafos.', 'KAG is not a universal category opposed to all RAG. GraphRAG and other approaches may also use relationships and graphs.'),
    ],
    question: text('¿Añadir un grafo garantiza respuestas mejores que cualquier RAG?', 'Does adding a graph guarantee better answers than every RAG system?'),
    answer: text('No. Hay que evaluar la calidad de los datos y las relaciones junto con la recuperación y la generación en la tarea concreta.', 'No. Data and relationship quality must be evaluated alongside retrieval and generation for the specific task.'),
    sources: [comparisonSources.ragPaper, comparisonSources.kag],
  };
