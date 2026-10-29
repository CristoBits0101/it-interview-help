import type { LocalizedText } from '../../../../../../../shared/lib/localized-text';
import type { ReferenceComparison } from '../../../../../../../shared/lib/reference-comparison';
import { comparisonSources } from '../../../../../../../shared/data/concept-sources';

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const hibernateLoadingComparison: ReferenceComparison = {
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
  };
