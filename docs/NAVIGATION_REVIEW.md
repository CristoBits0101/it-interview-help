# Revisión de navegación y contenido — 22 de octubre de 2026

## Resultado y alcance

El propósito del producto es preparar y repasar fundamentos para entrevistas técnicas de distintos perfiles y empresas. La organización ayuda a localizar y relacionar conocimientos. No pretende impartir una formación exhaustiva desde cero. Las referencias universitarias sirven para contrastar dependencias concretas y no definen el alcance del producto.

Revisados los 114 nodos del menú y sus 28 desplegables. Se conservan siete grupos principales y cuatro enlaces publicados dentro de Software Design. Se revisaron también las 19 explicaciones publicadas y las recomendaciones de los cinco perfiles en sus cinco etapas. Las etiquetas y las explicaciones modificadas están disponibles en español e inglés.

La estructura es coherente para el catálogo seleccionado de este producto. Es una síntesis editorial basada en áreas reconocidas y relaciones de aprendizaje. No es una taxonomía universal ni un currículo completo de informática. El árbol expresa pertenencia o referencia contextual. El orden de hermanos orienta el estudio pero no convierte cada elemento anterior en un prerrequisito obligatorio.

El usuario pidió integrar las bases en sus ámbitos y conservar una progresión pedagógica. La relación base → disciplina → especialidad → área se interpreta como niveles de agrupación cuando tienen sentido. No se fuerza ese número de niveles sobre cada conocimiento ni se atribuye esa jerarquía a ACM, IEEE, MIT o Harvard. Los puestos profesionales siguen en los perfiles de Home.

## Criterios y correspondencia

[CS2023 de ACM/IEEE-CS/AAAI](https://csed.acm.org/knowledge-areas/) distingue áreas de conocimiento que aquí se agrupan por utilidad para la navegación. Por ejemplo, Computer Systems reúne conocimientos de arquitectura, sistemas operativos, redes y computación paralela/distribuida. No equivale a un único bloque oficial de CS2023.

| Grupo del producto | Qué incluye y en qué orden orientativo | Correspondencia o límite |
| --- | --- | --- |
| Sistemas Informáticos | Uso y comprensión básica del computador. Arquitectura. Sistemas operativos. Redes. Paralelismo. Sistemas distribuidos. Nube. | SF, AR, OS, NC y PDC de CS2023. No es necesario terminar arquitectura y sistemas antes de empezar a programar. |
| Interacción Persona-Computadora | Fundamentos de interacción. Investigación de usuarios. Organización de información. Diseño de interacción e interfaces. Accesibilidad y evaluación de usabilidad. | HCI de CS2023. Es diseño y evaluación para personas. Aprender a usar archivos y herramientas pertenece a Fundamentos de Computación. La accesibilidad se practica desde las primeras interfaces. |
| Ingeniería de Software | Requisitos. Construcción mediante programación. Diseño. Pruebas y calidad. Arquitectura. Diseño de sistemas. Operación y mantenimiento. | SDF, FPL, AL y SE de CS2023 más los ámbitos de SWEBOK. Diseño y pruebas acompañan la programación. Arquitectura profundiza después en decisiones de estructura y atributos de calidad. |
| Gestión e Ingeniería de Datos | Fundamentos y modelado. Modelos relacionales y no relacionales. Transacciones y consultas eficientes. Búsqueda vectorial. Ingesta y transformación. Canalizaciones por lotes o flujos. Calidad y gobierno. | DM de CS2023 y prácticas de ingeniería de datos. Gestión e ingeniería son ramas relacionadas. Gestión de datos no se presenta como un subconjunto de ingeniería. |
| Ciberseguridad | Fundamentos. Criptografía con acceso a matemáticas discretas. Protección de aplicaciones, redes, datos y nube. | SEC de CS2023. Los controles básicos aparecen ya en las etapas iniciales de Home. La posición del grupo no significa aplazar la seguridad hasta terminar software y datos. |
| Ciencia de Datos | Bases de programación, matemáticas y estadística. Preparación, exploración y visualización de datos. Minería de datos. | Intersección de MSF, DM y AI. CS2023 no la presenta como una de sus áreas independientes. El catálogo tiene aquí un punto de entrada práctico. |
| Inteligencia Artificial | Bases compartidas. Búsqueda, planificación, representación y razonamiento. Aprendizaje automático y evaluación. Aprendizaje profundo y por refuerzo. Lenguaje, visión y generación. Aplicaciones generativas. | AI y MSF de CS2023. IA es más amplia que aprendizaje automático y que IA generativa. Lenguaje y visión tampoco dependen exclusivamente de redes neuronales. |

[SWEBOK de IEEE Computer Society](https://www.computer.org/education/bodies-of-knowledge/software-engineering) distingue requisitos, diseño, construcción, pruebas, mantenimiento y otros ámbitos de ingeniería. Por ello Desarrollo de Software se usa aquí para construcción/programación, mientras Diseño y Arquitectura conservan sus ramas. Frontend, Backend y Móvil describen entornos de construcción. No absorben todo el conocimiento arquitectónico.

## Correcciones aplicadas y relaciones compartidas

- Programación deja de competir como grupo raíz con Desarrollo de Software. Sus fundamentos, lenguajes, estructuras de datos y algoritmos están en Desarrollo.
- Matemáticas Discretas deja de ser un hijo de Algoritmos. Aparece como base contextual para desarrollo y criptografía.
- Programación, álgebra, álgebra lineal, probabilidad, estadística y cálculo tienen definiciones canónicas compartidas. Ciencia de Datos e IA las referencian en su contexto. La ayuda de cada referencia indica que es una base compartida.
- Las bases matemáticas no se asignan exclusivamente a Ciencia de Datos ni se imponen como un curso completo antes de comenzar cualquier programación.
- Se añaden fundamentos de interacción, accesibilidad y evaluación de usabilidad para que HCI no quede reducido a apariencia visual.
- Gestión de Datos y Bases de Datos quedan junto a Ingeniería de Datos dentro del grupo Gestión e Ingeniería de Datos.
- Modelado, transacciones e índices están bajo Bases de Datos. También existen fuera del modelo relacional, como documenta MongoDB para [modelado](https://www.mongodb.com/docs/manual/data-modeling/), [transacciones](https://www.mongodb.com/docs/manual/core/transactions/) e [índices](https://www.mongodb.com/docs/manual/indexes/).
- Búsqueda Vectorial reemplaza la clasificación de bases vectoriales como un tercer modelo excluyente junto a relacional y no relacional. [pgvector](https://github.com/pgvector/pgvector) permite esa capacidad dentro de PostgreSQL.
- Ingeniería de Datos incorpora ingesta, transformación, canalizaciones por lotes y flujos y calidad/gobierno. La secuencia refleja preparación y operación del dato. No exige usar siempre ETL en lugar de ELT. Véanse [ETL de Google Cloud](https://cloud.google.com/learn/what-is-etl) y [procesamiento batch/stream de Dataflow](https://docs.cloud.google.com/dataflow/docs/overview).
- IA incorpora búsqueda, planificación y representación del conocimiento. No se reduce a aprendizaje automático.
- Aplicaciones de IA Generativa precisa el alcance del material de LLMs, recuperación, RAG, agentes y evaluación. Se conserva el ID interno applied-ai y sus datos históricos.
- REST permanece como estilo arquitectónico según [Fielding](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm). API REST es su aplicación práctica bajo Diseño de API. Hexagonal conserva la separación de puertos y adaptadores de [Cockburn](https://alistair.cockburn.us/hexagonal-architecture). Estilos y patrones se agrupan para navegar, sin afirmar que todas las fuentes usan una clasificación idéntica.

## Progresión pedagógica

Se usan ejemplos reales para contrastar dependencias, no para declarar que esta web reproduce un plan universitario. [MIT 6.100A y las asignaturas posteriores](https://catalog.mit.edu/subjects/6/) permiten distinguir introducción a programación, construcción de software y diseño más avanzado. [CS50](https://cs50.harvard.edu/college/2026/fall/weeks/) pasa de programación y estructuras a SQL y desarrollo web. [CS50 AI](https://cs50.harvard.edu/ai/) incluye búsqueda y conocimiento antes de aprendizaje y lenguaje. [CS50 SQL](https://cs50.harvard.edu/sql/weeks/) profundiza desde consultas hasta diseño, optimización y escala.

Las recomendaciones de Home conservan un grafo de conocimientos previos separado del árbol. Programación precede a diseño de código y pruebas. Álgebra y funciones preceden a álgebra lineal y probabilidad. Probabilidad precede a estadística. Aprendizaje automático, álgebra lineal y cálculo apoyan aprendizaje profundo. IA generativa precede a sus aplicaciones dentro del recorrido de formación de ingeniería de IA.

Esto no exige dominar aprendizaje profundo para hacer una primera llamada a una API generativa. Tampoco exige ser especialista frontend antes de aprender backend. Las etapas indican aumento de práctica y autonomía; no acreditan un puesto ni agotan todos los prerrequisitos de un programa formativo.

Se introducen Fundamentos de Computación y prácticas de seguridad en etapas iniciales. Pruebas se incluye junto a los primeros desarrollos. Las bases explícitas de cada tarjeta se mantienen visibles aunque no formen parte de la selección de esa misma etapa.

## Explicaciones publicadas

Las 19 explicaciones fueron revisadas por significado y clasificación. Las fichas son resúmenes introductorios; no sustituyen las definiciones completas de las fuentes.

| Módulo | Conceptos revisados | Resultado |
| --- | --- | --- |
| SOLID | Responsabilidad Única, Abierto/Cerrado, Sustitución de Liskov, Segregación de Interfaces, Inversión de Dependencias | Se conserva el orden de la sigla. Responsabilidad se refiere a razones de cambio. Sustitución conserva contratos. Inversión de dependencias no se equipara simplemente a inyección de dependencias. |
| Creacionales | Simple Factory, Builder, Prototype, Singleton, Factory Method | Se corrigen tres explicaciones. Simple Factory selecciona la creación según entradas. Builder construye paso a paso. Factory Method permite redefinir la creación en subclases sin exigir que toda subclase la implemente. |
| Estructurales | Facade, Adapter, Decorator | Se conserva la distinción entre simplificar un subsistema, adaptar una interfaz y extender mediante envoltura. |
| Comportamiento | Iterator, Strategy, Observer, State, Mediator, Visitor | Se conserva la distinción entre recorrido, algoritmos intercambiables, notificación, estado, coordinación y operaciones sobre tipos. |

Simple Factory es un recurso de creación habitual, no uno de los 23 patrones GoF. Se incluye pedagógicamente en Creacionales y se diferencia de Factory Method. Los niveles y el orden dentro de cada módulo son orientativos. SOLID conserva su orden mnemónico aunque Liskov tenga nivel Intermedio.

Fuentes de SOLID: [SRP de Martin](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html), [OCP](https://objectmentor.com/resources/articles/ocp.pdf), [Liskov y Wing](https://www.cs.cmu.edu/~wing/publications/LiskovWing94.pdf), [ISP](https://objectmentor.com/resources/articles/isp.pdf) y [DIP](https://objectmentor.com/resources/articles/dip.pdf).

Por petición expresa previa se mantiene Refactoring.Guru para patrones: [creacionales](https://refactoring.guru/es/design-patterns/creational-patterns), [estructurales](https://refactoring.guru/es/design-patterns/structural-patterns), [comportamiento](https://refactoring.guru/es/design-patterns/behavioral-patterns), [comparación de fábricas](https://refactoring.guru/design-patterns/factory-comparison), [Builder](https://refactoring.guru/es/design-patterns/builder) y [Factory Method](https://refactoring.guru/es/design-patterns/factory-method). Cada ficha conserva su enlace específico en concept-sources.ts.

La revisión conceptual solicitada el 22 de octubre autoriza estas tres correcciones y sustituye, para esos textos, la instrucción histórica de conservar literalmente la explicación anterior de Simple Factory. Los IDs y el progreso no cambian.

## Verificación técnica y límites

- scripts/check-curriculum.mjs comprueba rutas y módulos existentes, traducciones, referencias compartidas, claves de Home, ausencia de ciclos y orden de prerrequisitos seleccionados en una misma etapa. También comprueba los 19 IDs y sus módulos, así como las migraciones de ramas antiguas.
- Se abrieron los 28 desplegables en navegador y se recorrieron los cuatro enlaces en español e inglés. Contadores de módulos: 5, 5, 3 y 6. Breadcrumbs correctos.
- Se recorrieron las 25 combinaciones de Home a 1440 px en español y a 390 px en inglés. No hubo desbordamiento horizontal de página. El menú móvil abierto conserva desplazamiento interno cuando lo necesita.
- Se restauraron las preferencias originales y se comprobó su persistencia tras recargar sin abrir ramas adicionales.
- A 320 px las nuevas explicaciones ocupan como máximo tres líneas en ambos idiomas. Se comprobaron capturas de escritorio y móvil, fuentes cargadas y filas del árbol de 48 px.
- Astro check terminó con cero errores, advertencias y sugerencias. El build estático terminó correctamente. No certifican por sí solos la corrección pedagógica.
- Solo Home y Software Design están publicados. Las hojas pendientes permanecen sin enlaces activos. Los borradores históricos de las otras rutas conservan su contenido y se verifican como destinos internos existentes, pero esta revisión no certifica palabra por palabra esos textos ocultos.
- No se publica ni se despliega la aplicación remota en esta revisión. El servidor local sirve la versión revisada.

## Inventario reproducible

Ejecuta npm run check:curriculum para las comprobaciones y node scripts/check-curriculum.mjs --inventory para listar cada nodo y su pertenencia actual. El inventario deriva de navigation.ts. Evita mantener otra copia manual del árbol que pueda quedar desactualizada.
