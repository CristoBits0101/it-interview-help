import type { LocalizedText } from './web-foundations';
import { comparisonSources, type ConceptSource } from './concept-sources';
const text = (es: string, en: string): LocalizedText => ({ es, en });
export type ReferenceComparison = {
  id: string;
  label: string;
  title: LocalizedText;
  description: LocalizedText;
  example?: { tables: { title: string; columns: string[]; rows: (string | number)[][] }[]; code: string };
  columns: { title: string; steps: LocalizedText[]; code?: string }[];
  rows: { title: LocalizedText; values: [LocalizedText, LocalizedText] }[];
  tips: LocalizedText[];
  question: LocalizedText;
  answer: LocalizedText;
  sources: ConceptSource[];
};
export const referenceComparisons: ReferenceComparison[] = [
  {
    id: 'hibernate-loading-guide', label: 'Lazy vs Eager Loading', title: text('Carga Diferida y Carga Anticipada', 'Lazy vs Eager Loading'),
    description: text('Comparan cuándo se cargan las relaciones entre entidades de JPA e Hibernate. Spring Boot puede alojar la aplicación pero no define estas estrategias.', 'They compare when JPA and Hibernate entity relationships are loaded. Spring Boot can host the application but does not define these strategies.'),
    example: {
      tables: [
        { title: 'Department', columns: ['id', 'name'], rows: [[1, 'HR'], [2, 'Engineering']] },
        { title: 'Employee', columns: ['id', 'name', 'department_id'], rows: [[101, 'Alice', 1], [102, 'Bob', 1], [201, 'Charlie', 2]] },
      ],
      code: 'Department department = departmentRepo.findById(1L).orElseThrow();\nSystem.out.println(department.getName());\nSystem.out.println(department.getEmployees());',
    },
    columns: [
      { title: 'LAZY', steps: [
        text('El cliente solicita un departamento.', 'The client requests a department.'),
        text('La aplicación consulta Department sin necesitar todavía sus empleados.', 'The application queries Department without needing its employees yet.'),
        text('Acceder a employees puede inicializar la relación y consultar Employee dentro de un contexto de persistencia disponible.', 'Accessing employees may initialize the relationship and query Employee within an available persistence context.'),
      ], code: '@OneToMany(mappedBy = "department", fetch = FetchType.LAZY)\nprivate List<Employee> employees;\n\nSELECT * FROM Department WHERE id = ?;\nSELECT * FROM Employee WHERE department_id = ?;' },
      { title: 'EAGER', steps: [
        text('El cliente solicita el mismo departamento.', 'The client requests the same department.'),
        text('El proveedor debe cargar también la relación marcada como EAGER.', 'The provider must also load the relationship marked EAGER.'),
        text('Puede utilizar un JOIN o consultas adicionales según el plan de carga. No garantiza una sola consulta.', 'It may use a JOIN or additional queries depending on the fetch plan. It does not guarantee a single query.'),
      ], code: '@OneToMany(mappedBy = "department", fetch = FetchType.EAGER)\nprivate List<Employee> employees;\n\nSELECT d.*, e.* FROM Department d\nLEFT JOIN Employee e ON e.department_id = d.id\nWHERE d.id = ?;' },
    ],
    rows: [
      { title: text('Momento de carga', 'Loading Time'), values: [text('LAZY solicita posponer la carga hasta que se necesite. Es una indicación que el proveedor puede anticipar.', 'LAZY requests deferred loading until needed. It is a hint that the provider may load earlier.'), text('EAGER exige cargar la relación de forma anticipada.', 'EAGER requires eager loading of the relationship.')] },
      { title: text('Consultas y N+1', 'Queries and N+1'), values: [text('Acceder a relaciones de muchos departamentos puede generar consultas adicionales y N+1.', 'Accessing relationships for many departments may produce additional queries and N+1.'), text('También puede producir N+1. El momento de carga no determina por sí solo la cantidad de consultas.', 'It may also produce N+1. Fetch timing alone does not determine query count.')] },
      { title: text('Rendimiento y memoria', 'Performance and Memory'), values: [text('Puede evitar cargar relaciones no utilizadas. El resultado depende del acceso real a los datos.', 'It may avoid loading unused relationships. The result depends on actual data access.'), text('Puede cargar más datos de los necesarios. Hay que medir el volumen y el coste de las consultas.', 'It may load more data than needed. Data volume and query cost must be measured.')] },
      { title: text('Valores predeterminados de JPA 3.2', 'JPA 3.2 Defaults'), values: [text('@OneToMany y @ManyToMany utilizan LAZY por defecto.', '@OneToMany and @ManyToMany default to LAZY.'), text('@ManyToOne y @OneToOne utilizan EAGER por defecto.', '@ManyToOne and @OneToOne default to EAGER.')] },
      { title: text('Decisión de uso', 'Usage Decision'), values: [text('Considera carga diferida para relaciones que no siempre se necesitan.', 'Consider deferred loading for relationships that are not always needed.'), text('Planifica la carga explícita de las relaciones que requiere cada consulta.', 'Plan explicit fetching of the relationships each query needs.')] },
    ],
    tips: [
      text('El ejemplo usa Department con HR y Engineering. Employee contiene Alice y Bob en HR y Charlie en Engineering.', 'The example uses Department with HR and Engineering. Employee contains Alice and Bob in HR and Charlie in Engineering.'),
      text('Los fragmentos muestran alternativas de mapeo y SQL ilustrativo. No se aplican ambos mapeos a la misma relación ni se garantiza ese SQL.', 'The snippets show alternative mappings and illustrative SQL. Both mappings are not applied to the same relationship and this SQL is not guaranteed.'),
      text('JOIN FETCH y EntityGraph permiten expresar necesidades de carga. Comprueba el SQL generado y mide el rendimiento.', 'JOIN FETCH and EntityGraph express fetching needs. Inspect generated SQL and measure performance.'),
      text('Una relación no inicializada puede fallar al acceder a ella sin un contexto de persistencia disponible.', 'Accessing an uninitialized relationship without an available persistence context may fail.'),
    ],
    question: text('¿Cambiar una relación a EAGER garantiza eliminar N+1?', 'Does changing a relationship to EAGER guarantee eliminating N+1?'),
    answer: text('No. EAGER establece cuándo debe estar cargada la relación pero el proveedor puede ejecutar consultas adicionales. Hay que revisar el plan de carga y el SQL.', 'No. EAGER determines when the relationship must be loaded but the provider may execute additional queries. Review the fetch plan and SQL.'),
    sources: [comparisonSources.jpaFetch, comparisonSources.hibernateFetching],
  },
  {
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
  },
];
