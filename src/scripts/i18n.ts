export type Language = 'es' | 'en';

const spanishToEnglish: Record<string, string> = {
  'Saltar al contenido': 'Skip to content', 'Navegación de aprendizaje': 'Learning navigation',
  'Cerrar menú de rutas': 'Close learning paths menu', 'RUTAS DE APRENDIZAJE': 'LEARNING PATHS',
  'Ruta actual': 'Current path', 'Inicio': 'Home', 'Buscar conceptos': 'Search concepts',
  'Creacionales': 'Creational', 'Estructurales': 'Structural', 'Comportamiento': 'Behavioral',
  'Borrar búsqueda': 'Clear search', 'Todos los niveles': 'All levels', Esencial: 'Essential',
  Intermedio: 'Intermediate', Avanzado: 'Advanced', 'Filtrar por nivel': 'Filter by level',
  'Nivel anterior': 'Previous level', 'Nivel siguiente': 'Next level',
  'Explicación': 'Explanation', 'Caso de uso': 'Use case', 'Implementación': 'Implementation',
  'Lo entiendo': 'I understand', Comprendido: 'Understood', 'Fuente original': 'Original source',
  'Se abre en una pestaña nueva': 'Opens in a new tab', 'No hay conceptos con estos filtros': 'No concepts match these filters',
  'Prueba con otra palabra o cambia el nivel seleccionado.': 'Try another search term or change the selected level.',
  'Limpiar filtros': 'Clear filters', 'Siguiente módulo': 'Next module',
  'No hay conceptos con estos filtros Prueba con otra palabra o cambia el nivel seleccionado. Limpiar filtros': 'No concepts match these filters. Try another search term or change the selected level. Clear filters',
  'Abrir menú de rutas': 'Open learning paths menu', 'TU MAPA DE APRENDIZAJE': 'YOUR LEARNING MAP',
  'Organiza tu': 'Shape your', 'aprendizaje técnico.': 'technical learning.',
  'Elige un perfil y una etapa para ver las áreas recomendadas. Estudia los conceptos disponibles y consulta sus fuentes originales.': 'Choose a role and career stage to see recommended areas. Study available concepts and explore their original sources.',
  'Encuentra tu ruta': 'Find your path', 'Proceso de aprendizaje': 'Learning process',
  'EL CONOCIMIENTO SE CONSTRUYE': 'KNOWLEDGE GROWS STEP BY STEP',
  'Construye una base': 'Build a foundation', 'Comprende antes de especializarte.': 'Understand the basics before specializing.',
  'Conecta las áreas': 'Connect related fields', 'Estudia según el perfil que buscas.': 'Choose topics that fit your goals.',
  'Amplía tu impacto': 'Expand your impact', 'De resolver tareas a orientar equipos.': 'Grow from solving tasks to guiding teams.',
  'Resumen del catálogo': 'Catalog overview', 'Áreas principales': 'Core areas', 'El mapa completo': 'The full learning map',
  'Rutas con contenido': 'Learning paths with lessons', 'Disponibles para estudiar': 'Available to study',
  Conceptos: 'Concepts', 'Breves y conectados': 'Short and connected',
  'Perfiles profesionales': 'Career paths', 'Un camino para cada objetivo': 'A path for each goal',
  '01 / ELIGE TU DIRECCIÓN': '01 / CHOOSE YOUR DIRECTION', 'Un perfil. Varias áreas conectadas.': 'One role. Connected areas.',
  'Selecciona una especialidad y una etapa. El orden de estudio es orientativo y conserva los conocimientos de base.': 'Choose a specialty and a career stage. The suggested order builds on foundational knowledge.',
  'Perfil profesional': 'Career path', '¿En qué etapa quieres trabajar?': 'Which career stage are you targeting?',
  Fundamentos: 'Foundations', 'Las etapas orientan el aprendizaje. Los títulos varían según la organización.': 'Stages guide learning. Job titles vary by organization.',
  'áreas en esta etapa': 'areas at this stage', 'Orden sugerido de estudio': 'Suggested study order',
  'Conserva las bases de etapas anteriores': 'Build on earlier foundations', 'Base previa': 'Prior knowledge',
  'Puedes empezar aquí': 'You can start here', 'conceptos disponibles': 'concepts available',
  'Contenido no disponible ahora': 'Content not available yet', 'Objetivo y práctica de esta etapa': 'Stage goal and practice',
  'QUÉ DEBERÍAS PODER HACER': 'WHAT YOU SHOULD BE ABLE TO DO', 'DEMUESTRA LO APRENDIDO': 'SHOW WHAT YOU HAVE LEARNED',
  'Valora lo que puedes explicar y construir. Comprueba también que puedes mantenerlo. Leer los conceptos es solo el comienzo.': 'Focus on what you can explain and build. Make sure you can maintain it too. Reading is only the start.',
  'Recorrido orientativo': 'Suggested path', 'El mapa incluye áreas todavía sin lecciones. Solo los títulos con contenido disponible abren una ruta.': 'The map includes areas that do not have lessons yet. Only areas with available content open a learning path.',
  '02 / AMPLÍA TU ALCANCE': '02 / EXPAND YOUR SCOPE', 'Después de Senior, el camino se abre.': 'After Senior, more paths open up.',
  'Puedes crecer en especialización técnica o en liderazgo y negocio. Analyst y Architect describen especialidades. Lead describe una responsabilidad de liderazgo. No son etapas obligatorias para todo el mundo.': 'You can grow through technical specialization or leadership and business. Analyst and Architect describe specialties. Lead describes a leadership responsibility. These are not required steps for everyone.',
  'Cómo interpretar estos niveles': 'How to read these levels',
  'Esta propuesta orienta el estudio. No representa una escala universal de puestos. Valora la autonomía y la complejidad del trabajo. Considera también el alcance de las decisiones. El título y los años no bastan para determinar una etapa. Las responsabilidades de análisis pueden aparecer desde las primeras etapas. La dirección tecnológica también exige gestión de personas y conocimientos de estrategia y negocio.': 'This guide helps you plan your learning. It is not a universal job ladder. Consider autonomy and work complexity. Also consider the scope of decisions. Job titles and years of experience alone do not define a stage. Analytical responsibilities can appear early. Technology leadership also calls for people management, strategy, and business knowledge.',
  'Referencias para las competencias y la progresión.': 'References for skills and career progression.',
  '03 / PASA A LOS CONCEPTOS': '03 / EXPLORE THE CONCEPTS', 'Explora las rutas disponibles.': 'Explore available learning paths.',
  'rutas disponibles. Definiciones breves y fuentes originales para profundizar.': 'learning paths available. Concise definitions and original sources to explore further.',
  RUTA: 'PATH', módulo: 'module', módulos: 'modules',
  'SOLID · cinco principios': 'SOLID · five principles',
  'Patrones para decidir cómo se crean los objetos.': 'Patterns for deciding how objects are created.',
  'Patrones para organizar objetos y sus relaciones.': 'Patterns for organizing objects and their relationships.',
  'Patrones para organizar la comunicación y las responsabilidades entre objetos.': 'Patterns for organizing communication and responsibilities between objects.',
  'Un módulo debe responder a una sola responsabilidad de negocio y tener una única razón para cambiar.': 'A module should serve one business responsibility and have one reason to change.',
  'Permite añadir comportamientos sin modificar el código estable mediante implementaciones nuevas.': 'Add new behavior through new implementations without changing stable code.',
  'Un tipo derivado debe sustituir al tipo base respetando sus garantías sin exigir condiciones más estrictas.': 'A derived type should replace its base type while honoring its guarantees and without requiring stricter conditions.',
  'Cada componente debe depender solo de las operaciones que necesita mediante interfaces adaptadas a su uso.': 'Each component should depend only on the operations it needs through interfaces suited to its use.',
  'Las reglas de negocio y los detalles técnicos dependen de interfaces. Los detalles se adaptan a esos contratos.': 'Business rules and technical details depend on abstractions. Technical details adapt to those contracts.',
  'Facade simplifica el uso de varios componentes con un acceso común que coordina sus operaciones internas.': 'Facade provides a single entry point that coordinates several components and simplifies their use.',
  'Adapter traduce la interfaz de un componente para conectarlo con otro incompatible sin modificar el original.': 'Adapter converts one component interface so it can work with an incompatible one without changing either original.',
  'Iterator recorre una colección mediante una interfaz común sin exponer cómo se almacenan sus elementos.': 'Iterator traverses a collection through a common interface without exposing how its elements are stored.',
  'Devuelve un objeto según el argumento recibido con un método común de interfaz o clase abstracta.': 'A simple factory returns an object based on an argument through a shared interface or abstract class.',
  'Simplifica la creación de objetos para evitar la sobrecarga de constructores o demasiados parámetros.': 'Builder simplifies object creation when constructors become overloaded or require too many parameters.',
  'Permite copiar un objeto y el estado de sus atributos.': 'Prototype creates a copy of an object and its attribute state.',
  'Strategy permite intercambiar algoritmos con una interfaz común sin modificar el código que los utiliza.': 'Strategy lets you swap algorithms behind a common interface without changing the code that uses them.',
  'Decorator añade funciones envolviendo un objeto con otro que conserva su interfaz sin cambiar su clase.': 'Decorator adds behavior by wrapping an object while preserving its interface and leaving its class unchanged.',
  'Observer notifica a los objetos suscritos cuando cambia el estado de otro para que puedan reaccionar.': 'Observer notifies subscribed objects when another object changes so they can react.',
  'Sirve para limitar a una única instancia por clase y requiere definir un punto de acceso al objeto.': 'Singleton limits a class to one instance and provides a shared access point.',
  'Una clase padre define un método de creación común que cada subclase implementa para devolver un objeto.': 'A base class defines a creation method that subclasses implement to return different object types.',
  'State cambia el comportamiento de un objeto al delegarlo en otro que representa su estado actual.': 'State changes an object’s behavior by delegating it to an object representing its current state.',
  'Mediator coordina la comunicación entre objetos para que colaboren sin depender directamente entre sí.': 'Mediator coordinates communication so objects can work together without depending on one another directly.',
  'Visitor añade operaciones sin cambiar las clases. Cada objeto acepta un visitante que actúa según su tipo.': 'Visitor adds operations without changing the classes. Each object accepts a visitor that acts according to its type.',
  'Cinco principios para gestionar responsabilidades, contratos y dependencias, en el orden de la sigla SOLID.': 'Five principles for managing responsibilities, contracts, and dependencies, in the order of the SOLID acronym.',
  'Comprendido.': 'Understood.', 'Lo entiendo.': 'I understand.',
  'Resultados de búsqueda': 'Search results', Búsqueda: 'Search',
  'Sigue aprendiendo': 'Keep learning', 'Una definición es el comienzo. Profundiza con documentación y referencias originales.': 'A definition is a starting point. Explore the documentation and original references to learn more.',
  'Tu progreso y el estado del menú se almacenan únicamente en este navegador.': 'Your progress and menu state are stored only in this browser.',
  'Cerrar fuentes': 'Close sources', 'Cerrar repaso': 'Close review', 'REPASO ACTIVO': 'ACTIVE REVIEW',
  '¿Cómo se lo explicarías a otra persona?': 'How would you explain this to someone else?',
  'Mostrar explicación': 'Show explanation', 'Seguir practicando': 'Keep practicing',
  'Un paso más.': 'One step further.', 'Volver a los conceptos': 'Back to concepts',
  'Primero recuérdalo. Después, compruébalo.': 'Recall it first. Then check your answer.',
  'No se encontraron conceptos.': 'No concepts found.',
  'El progreso se mantendrá durante esta sesión. El almacenamiento local no está disponible.': 'Your progress will be kept for this session. Local storage is unavailable.',
  'Puedes consultar el resumen y el primer itinerario. Activa JavaScript para elegir otro perfil, navegar entre módulos, buscar y guardar tu progreso.': 'You can view the overview and first path. Enable JavaScript to choose another role, navigate modules, search, and save your progress.',
  'Concepto marcado como comprendido.': 'Concept marked as understood.',
  'Concepto marcado como pendiente.': 'Concept marked for review.',
  'Elige primero algún concepto para repasar.': 'Choose a concept to review first.',
  'concepto encontrado': 'concept found', 'conceptos encontrados': 'concepts found',
  'Siguiente módulo:': 'Next module:',
  'Front-end': 'Frontend', 'Diseño de experiencia': 'User Experience Design',
  'Nivel intermedio': 'Mid-Level', 'Nivel intermedio → Senior': 'Mid-Level → Senior',
  'Sistemas distribuidos': 'Distributed Systems',
  'MDN · fundamentos de desarrollo web': 'MDN · web development fundamentals',
  'MDN · primeros pasos en backend': 'MDN · backend development basics',
  'Google · prerrequisitos de Machine Learning': 'Google · Machine Learning prerequisites',
  'SFIA · autonomía y responsabilidad profesional': 'SFIA · autonomy and responsibility',
  'GitLab · trayectorias de ingeniería': 'GitLab · engineering career paths',
  'Contenido de': 'Content for',
  'Especialización técnica': 'Technical specialization', 'Liderazgo técnico': 'Technical leadership',
  'Gestión y dirección': 'Management and leadership',
  'Amplía tu impacto entre equipos. Analyst y Architect son especialidades cuyo alcance depende de la empresa. No son grados obligatorios después de Senior.': 'Expand your impact across teams. Analyst and Architect are specialties whose scope varies by company. They are not required levels after Senior.',
  'Orienta las decisiones y acompaña al equipo. Coordina las entregas. Technical Lead es una responsabilidad que puede coexistir con distintos niveles técnicos.': 'Guide decisions and support the team. Coordinate delivery. Technical Lead is a responsibility that can coexist with different technical levels.',
  'Asume la gestión de personas y la estrategia de la organización. Chief Technology Officer exige visión de negocio. Los cargos y los pasos varían según la empresa.': 'Take responsibility for people management and organizational strategy. A Chief Technology Officer also needs business perspective. Titles and career steps vary by company.',
  'Aprende a automatizar tareas y diagnosticar procesos y conexiones.': 'Learn to automate tasks and diagnose processes and connections.',
  'Entrega cambios repetibles con pruebas y acceso controlado.': 'Deliver repeatable changes with tests and controlled access.',
  'Opera entornos reproducibles y reduce trabajo manual con seguridad.': 'Operate reproducible environments and safely reduce manual work.',
  'Anticipa fallos entre servicios y define mecanismos de recuperación.': 'Anticipate service failures and define recovery mechanisms.',
  'Guía decisiones de fiabilidad y capacidad con objetivos de negocio.': 'Guide reliability and capacity decisions around business goals.',
  'Automatiza la entrega y la operación de sistemas. Colabora con los equipos para mantener software fiable.': 'Automate software delivery and operations. Work with teams to keep systems reliable.',
  'Empieza por los servicios y los datos. Añade distribución y nube cuando entiendas sus costes.': 'Start with services and data. Explore distributed systems and cloud as you understand their tradeoffs.',
  'Conecta la interfaz con los servicios y los datos. Profundiza en una parte sin perder la visión completa.': 'Connect interfaces with services and data. Deepen one skill while keeping the full picture.',
  'Aplica matemáticas e ingeniería al trabajo con datos. Evalúa los modelos antes de integrarlos en productos útiles.': 'Apply mathematics and engineering to data. Evaluate models before integrating them into useful products.',
  'Desarrollo frontend': 'Frontend Development', 'Desarrollo backend': 'Backend Development', 'Matemáticas': 'Mathematics', 'Estadística': 'Statistics', 'Programación': 'Programming', 'Sistemas informáticos': 'Computer Systems', 'Ingeniería de software': 'Software Engineering', 'Patrones de diseño': 'Design Patterns', 'Principios SOLID': 'SOLID Principles', 'Diseño de experiencia de usuario': 'User Experience Design',
  'Estudia álgebra y funciones. Desarrolla el razonamiento cuantitativo.': 'Study algebra and functions. Develop quantitative reasoning.',
  'Comprende los tipos de datos y las funciones. Estudia las estructuras de datos. Practica la depuración y el control de versiones.': 'Understand data types and functions. Study data structures. Practice debugging and version control.',
  'Comprende HTTP y DNS. Sigue el recorrido de una petición y las conexiones que utiliza.': 'Understand HTTP and DNS. Follow a request and the connections it uses.',
  'Convierte necesidades en comportamientos y criterios de aceptación.': 'Turn needs into behaviors and acceptance criteria.',
  'Utiliza HTML semántico y CSS. Gestiona el estado de la interfaz con JavaScript. Comprueba su accesibilidad.': 'Use semantic HTML and CSS. Manage interface state with JavaScript. Check its accessibility.',
  'Gestiona peticiones HTTP mediante APIs. Valida los datos y aplica la lógica de negocio.': 'Handle HTTP requests through APIs. Validate data and apply business rules.',
  'Define las responsabilidades del código. Aplica SOLID y patrones a problemas concretos.': 'Define code responsibilities. Apply SOLID and patterns to real problems.',
  'Define los límites y contratos de módulos y servicios. Evalúa el coste de cada decisión.': 'Define module and service boundaries and contracts. Assess the cost of each decision.',
  'Combina la programación con la experiencia de usuario. Aplica criterios de calidad para construir interfaces accesibles.': 'Combine programming and user experience. Apply quality principles to build accessible interfaces.',
  'Entiende la web y organiza la información antes de elegir un framework.': 'Understand the web and organize information before choosing a framework.',
  'Entrega interfaces pequeñas con acompañamiento y pruebas básicas.': 'Build small interfaces with guidance and basic tests.',
  'Resuelve funcionalidades completas y toma decisiones de diseño con autonomía.': 'Deliver complete features and make design decisions independently.',
  'Mejora la estructura y el rendimiento de una aplicación existente. Facilita la entrega de sus cambios.': 'Improve the structure and performance of an existing application. Make changes easier to deliver.',
  'Decide con contexto de producto y guía cambios que afectan a otros equipos.': 'Make decisions with product context and guide changes that affect other teams.',
  'Comprende el lenguaje de programación y los procesos. Estudia la comunicación entre cliente y servidor.': 'Understand a programming language and processes. Study communication between clients and servers.',
  'Construye servicios pequeños con persistencia y controles de seguridad.': 'Build small services with persistence and security controls.',
  'Mantén servicios completos y elige el almacenamiento según el problema.': 'Maintain complete services and choose storage to fit the problem.',
  'Define los límites de los servicios. Evalúa su capacidad y el efecto de los fallos parciales.': 'Define service boundaries. Assess capacity and the impact of partial failures.',
  'Compara las necesidades de fiabilidad y seguridad. Considera también el coste y la evolución del sistema.': 'Compare reliability and security needs. Consider cost and how the system may evolve.',
  'Conecta los fundamentos de programación con el recorrido de una petición web.': 'Connect programming fundamentals to the journey of a web request.',
  'Completa una funcionalidad sencilla de extremo a extremo con ayuda.': 'Complete a simple feature across the whole system with guidance.',
  'Asume una funcionalidad de producto desde su uso hasta su despliegue.': 'Own a product feature from user experience through deployment.',
  'Separa responsabilidades y entiende cuándo distribuir una aplicación.': 'Separate responsibilities and recognize when an application should be distributed.',
  'Coordina decisiones entre capas y ayuda a otros a mantener el producto.': 'Coordinate decisions across layers and help others maintain the product.',
  'Construye una base de programación y razonamiento matemático para trabajar con datos.': 'Build programming and mathematical reasoning foundations for working with data.',
  'Entrena y evalúa modelos sencillos con código reproducible y acompañamiento.': 'Train and evaluate simple models with reproducible code and guidance.',
  'Pasa de experimentos a una aplicación evaluable y mantenible.': 'Move from experiments to an application that can be evaluated and maintained.',
  'Opera aplicaciones con modelos y controla el uso de los datos. Gestiona los fallos y el consumo de recursos.': 'Operate applications that use models and govern data use. Manage failures and resource consumption.',
  'Decide cuándo usar IA. Diseña cómo evaluar la solución y cómo operarla. Define un proceso de mejora.': 'Decide when to use AI. Design how to evaluate and operate the solution. Define an improvement process.',
  '5 conceptos': '5 concepts',
};

Object.assign(spanishToEnglish, {
  'Idioma': 'Language',
  'Tech Training. Inicio': 'Tech Training. Home',
  'Orienta tu aprendizaje en Frontend, Backend, Full Stack, DevOps y Artificial Intelligence. Áreas relacionadas, etapas profesionales y conceptos para practicar.': 'Guide your learning in Frontend, Backend, Full Stack, DevOps and Artificial Intelligence. Related areas and career stages with concepts to practice.',
  'Tech Training · Tu mapa de aprendizaje': 'Tech Training · Your learning map',
  'Elige tu perfil técnico, descubre qué áreas estudiar juntas y avanza desde fundamentos hasta especialización.': 'Choose your technical role and discover related areas to study from foundations to specialization.',
  'Barbara Liskov y Jeannette Wing': 'Barbara Liskov and Jeannette Wing',
  'El Principio de Responsabilidad Única': 'The Single Responsibility Principle',
  'El Principio Abierto-Cerrado': 'The Open-Closed Principle',
  'Una Noción Conductual del Subtipado': 'A Behavioral Notion of Subtyping',
  'El Principio de Segregación de Interfaces': 'The Interface Segregation Principle',
  'El Principio de Inversión de Dependencias': 'The Dependency Inversion Principle',
  'Comparación de Fábricas — Fábrica Simple': 'Factory Comparison — Simple Factory',
  'Repasar el módulo visible': 'Review the current module',
  'Repasar los conceptos visibles': 'Review the visible concepts',
  'S · Responsabilidad única': 'S · Single responsibility',
  'O · Abierto / Cerrado': 'O · Open / Closed',
  'L · Sustitución de Liskov': 'L · Liskov substitution',
  'I · Segregación de interfaces': 'I · Interface segregation',
  'D · Inversión de dependencias': 'D · Dependency inversion',
  'Sistemas distribuidos': 'Distributed Systems',
  'Comprende cómo se gestionan los procesos y la memoria. Trabaja con archivos y permisos mediante la terminal.': 'Understand how processes and memory are managed. Work with files and permissions in the terminal.',
  'Sigue el recorrido de una petición y las conexiones que utiliza.': 'Follow the path of a request and the connections it uses.',
  'Organiza los contenidos y sus etiquetas. Diseña una navegación que facilite su comprensión.': 'Organize content and labels. Design navigation that makes information easier to understand.',
  'Define una jerarquía visual y componentes con estados claros. Adapta la interfaz a distintas pantallas.': 'Set a visual hierarchy and clear component states. Adapt the interface to different screens.',
  'Escribe pruebas que verifiquen el comportamiento. Incluye los casos límite relevantes.': 'Write tests that verify behavior. Include relevant edge cases.',
  'Diseña flujos comprensibles y accesibles. Valida la experiencia con las personas que los utilizan.': 'Design clear and accessible flows. Validate them with the people who use them.',
  'Valida las entradas y trátalas de forma segura. Aplica autenticación y autorización.': 'Validate and safely handle inputs. Apply authentication and authorization.',
  'Evalúa la mantenibilidad y la fiabilidad con evidencia. Mide también el rendimiento.': 'Evaluate maintainability and reliability with evidence. Measure performance too.',
  'Practica la integración y la entrega continuas. Observa el sistema y prepara la respuesta a incidentes.': 'Practice continuous integration and delivery. Monitor the system and prepare incident responses.',
  'Relaciona los requisitos con las decisiones de arquitectura. Estima la capacidad y define las necesidades de fiabilidad.': 'Connect requirements to architecture decisions. Estimate capacity and define reliability needs.',
  'Entrevistas y observación para contrastar necesidades reales.': 'Use interviews and observation to validate real needs.',
  'Cambia software existente con compatibilidad y migraciones controladas.': 'Change existing software while preserving compatibility and controlling migrations.',
  'Modela los datos de forma relacional y consúltalos con SQL. Estudia los índices y las transacciones.': 'Model relational data and query it with SQL. Study indexes and transactions.',
  'Compara modelos de datos y patrones de acceso antes de elegir.': 'Compare data models and access patterns before choosing.',
  'Estudia la comunicación entre nodos y la replicación de datos. Razona sobre la consistencia y los fallos parciales.': 'Study communication between nodes and data replication. Reason about consistency and partial failures.',
  'Despliega recursos en la nube. Evalúa su capacidad y disponibilidad. Controla su coste.': 'Deploy cloud resources. Assess capacity and availability. Track their cost.',
  'Protege los datos durante todo su ciclo de vida. Define permisos y plazos de retención. Aplica cifrado donde corresponda.': 'Protect data throughout its lifecycle. Define permissions and retention periods. Use encryption where appropriate.',
  'Protege las comunicaciones con TLS. Segmenta la red y revisa los servicios expuestos. Limita el acceso al necesario.': 'Protect communications with TLS. Segment the network and review exposed services. Limit access to what is needed.',
  'Gestiona las identidades y los secretos. Limita los permisos. Comprende la responsabilidad compartida con el proveedor.': 'Manage identities and secrets. Limit permissions. Understand shared responsibility with the provider.',
  'Estudia los vectores y las matrices. Comprende las transformaciones que utilizan los modelos.': 'Study vectors and matrices. Understand the transformations used by models.',
  'Estudia los eventos y sus distribuciones. Aprende a razonar bajo incertidumbre.': 'Study events and their distributions. Learn to reason under uncertainty.',
  'Estudia la variabilidad y el muestreo. Utiliza la inferencia para interpretar resultados.': 'Study variability and sampling. Use inference to interpret results.',
  'Estudia el aprendizaje supervisado. Compara los modelos con referencias simples. Evalúa su capacidad de generalizar.': 'Study supervised learning. Compare models with simple baselines. Evaluate their ability to generalize.',
  'Explora los datos y detecta problemas. Comunica resultados medibles.': 'Explore data and find issues. Communicate measurable results.',
  'Derivadas y gradientes para profundizar en la optimización de modelos.': 'Study derivatives and gradients to understand model optimization.',
  'Estudia las redes neuronales y su entrenamiento. Aprende a controlar el sobreajuste.': 'Study neural networks and training. Learn to control overfitting.',
  'Prepara la ingesta y la transformación de datos. Comprueba su calidad y conserva su trazabilidad.': 'Prepare data ingestion and transformation. Check quality and preserve traceability.',
  'Integra modelos y recuperación de contexto en una aplicación. Evalúa su funcionamiento.': 'Integrate models and context retrieval into an application. Evaluate how it performs.',
  'Estudia los modelos generativos y sus límites. Evalúa la calidad de sus respuestas.': 'Study generative models and their limits. Evaluate the quality of their responses.',
  'Construye una página semántica y explica cómo llega del servidor al navegador.': 'Build a semantic page and explain how it travels from server to browser.',
  'Implementa un formulario accesible que se adapte al móvil. Comprueba su funcionamiento con pruebas.': 'Build an accessible form that adapts to mobile. Verify it with tests.',
  'Entrega un flujo con validación segura. Muestra cuándo está cargando y cómo resolver los errores.': 'Deliver a flow with secure validation. Show loading states and how to resolve errors.',
  'Justifica una modularización y mide su efecto en rendimiento y mantenimiento.': 'Explain a modularization and measure its effect on performance and maintenance.',
  'Dirige una evolución de la interfaz con un plan de migración. Comprueba la compatibilidad y mide los resultados.': 'Lead an interface update with a migration plan. Check compatibility and measure results.',
  'Explica una petición HTTP y construye un programa que procese y valide datos.': 'Explain an HTTP request and build a program that processes and validates data.',
  'Entrega una API con autenticación y consultas parametrizadas. Comprueba su funcionamiento con pruebas de integración.': 'Deliver an API with authentication and parameterized queries. Verify it with integration tests.',
  'Opera un servicio con despliegues reproducibles. Utiliza registros y métricas para observar su funcionamiento.': 'Operate a service with reproducible deployments. Use logs and metrics to monitor it.',
  'Diseña una integración con colas. Aplica reintentos seguros mediante idempotencia y comprueba cómo responde ante fallos.': 'Design an integration that uses queues. Use idempotent retries and check how it responds to failures.',
  'Defiende un diseño con estimaciones y objetivos de servicio. Propón una migración gradual.': 'Defend a design with estimates and service objectives. Propose a gradual migration.',
  'Describe cómo una petición viaja del navegador al servidor y accede a los datos. Maqueta una interfaz clara.': 'Describe how a request travels from browser to server and reaches data. Sketch a clear interface.',
  'Construye un flujo que guarde datos y pruebe tanto la interfaz como la API.': 'Build a flow that saves data and tests both the interface and the API.',
  'Entrega una mejora completa y observa errores y comportamiento después del despliegue.': 'Deliver a complete improvement and monitor errors and behavior after deployment.',
  'Compara mantener un monolito con extraer un servicio y justifica la decisión.': 'Compare keeping a monolith with extracting a service and explain the decision.',
  'Conduce una evolución del producto con contratos claros. Identifica sus riesgos y define métricas de éxito.': 'Lead product evolution with clear contracts. Identify risks and define success metrics.',
  'Automatiza una tarea. Practica el diagnóstico de fallos de procesos y permisos. Revisa también los problemas de conexión.': 'Automate a task. Practice diagnosing process and permission failures. Also investigate connection issues.',
  'Prepara una integración continua con pruebas y un despliegue reversible.': 'Set up continuous integration with tests and a reversible deployment.',
  'Versiona la infraestructura y limita los permisos. Prueba la restauración de una copia.': 'Version infrastructure and limit permissions. Test restoring a backup.',
  'Simula una caída y comprueba las alertas. Verifica la recuperación y la protección de los datos.': 'Simulate an outage and check alerts. Verify recovery and data protection.',
  'Define objetivos de servicio y un presupuesto de errores. Acuerda un plan de mejora compartido.': 'Define service objectives and an error budget. Agree on a shared improvement plan.',
  'Manipula un conjunto de datos y explica cómo lo representan los vectores. Describe sus distribuciones y su variabilidad.': 'Work with a dataset and explain how vectors represent it. Describe its distributions and variability.',
  'Compara un modelo con una referencia simple usando datos de evaluación separados.': 'Compare a model with a simple baseline using separate evaluation data.',
  'Integra un modelo en una API. Usa un conjunto de evaluación para medir su calidad. Registra también la latencia y el coste.': 'Integrate a model into an API. Measure its quality on an evaluation set. Track latency and cost too.',
  'Despliega una solución con evaluaciones y trazabilidad. Aplica controles sobre los datos enviados.': 'Deploy a solution with evaluations and traceability. Apply controls to submitted data.',
  'Justifica la solución frente a una alternativa sin IA y define monitorización y retirada segura.': 'Compare the solution with an alternative without AI and define monitoring and safe retirement.',
});

const navigationEnglishToSpanish: Record<string, string> = {
  'API Design': 'Diseño de API', 'REST API': 'API REST',
  'Architectural Styles': 'Estilos arquitectónicos', 'Architectural Patterns': 'Patrones arquitectónicos',
  Monolithic: 'Monolítica', Microservices: 'Microservicios', 'Event-Driven': 'Orientada a eventos',
  CONCEPTS: 'CONCEPTOS', PATH: 'RUTA',
  Creational: 'Creacionales', Structural: 'Estructurales', Behavioral: 'Comportamiento',
  Home: 'Inicio', Mathematics: 'Matemáticas', 'Discrete Mathematics': 'Matemáticas discretas', 'Linear Algebra': 'Álgebra lineal', Calculus: 'Cálculo', 'Probability Theory': 'Teoría de la probabilidad',
  'Mid-Level': 'Nivel intermedio', 'Mid-Level → Senior': 'Nivel intermedio → Senior',
  'Frontend Engineer': 'Ingeniero frontend', 'Backend Engineer': 'Ingeniero backend', 'Full Stack Engineer': 'Ingeniero full stack', 'DevOps Engineer': 'Ingeniero DevOps', 'Artificial Intelligence Engineer': 'Ingeniero de inteligencia artificial',
  'Senior Engineer': 'Ingeniero Senior', 'Staff Engineer': 'Ingeniero Staff', 'Principal Engineer': 'Ingeniero Principal', 'Technical Lead': 'Líder Técnico', 'Engineering Manager': 'Responsable De Ingeniería', 'Director of Engineering': 'Director De Ingeniería', 'Vice President of Engineering': 'Vicepresidente De Ingeniería', 'Chief Technology Officer': 'Director De Tecnología',
  Statistics: 'Estadística', Programming: 'Programación', 'Computer Systems': 'Sistemas informáticos', 'Computer Architecture': 'Arquitectura de computadores', 'Operating Systems': 'Sistemas operativos', 'Computer Networks': 'Redes informáticas', 'Parallel Computing': 'Computación paralela', 'Distributed Systems': 'Sistemas distribuidos', 'Cloud Computing': 'Computación en la nube',
  'Human-Computer Interaction': 'Interacción persona-computadora', 'User Research': 'Investigación de usuarios', 'Information Architecture': 'Arquitectura de la información', 'Interaction Design': 'Diseño de interacción', 'User Experience Design': 'Diseño de experiencia de usuario', 'User Interface Design': 'Diseño de interfaz de usuario',
  'Software Engineering': 'Ingeniería de software', 'Software Requirements': 'Requisitos de software', 'Software Development': 'Desarrollo de software', 'Frontend Development': 'Desarrollo frontend', 'Backend Development': 'Desarrollo backend', 'Software Design': 'Diseño de software', 'SOLID Principles': 'Principios SOLID', 'Design Patterns': 'Patrones de diseño', 'Software Architecture': 'Arquitectura de software', 'System Design': 'Diseño de sistemas', 'Software Testing': 'Pruebas de software', 'Software Quality': 'Calidad del software', 'Software Engineering Operations': 'Operaciones de ingeniería de software', 'Software Maintenance': 'Mantenimiento de software',
  'Data Management': 'Gestión de datos', Databases: 'Bases de datos', 'Relational Databases': 'Bases de datos relacionales', 'Non-Relational Databases': 'Bases de datos no relacionales', 'Key-Value Databases': 'Bases de datos clave-valor', 'Document Databases': 'Bases de datos documentales', 'Wide-Column Databases': 'Bases de datos de columnas anchas', 'Graph Databases': 'Bases de datos de grafos', 'Vector Databases': 'Bases de datos vectoriales',
  'Data Engineering': 'Ingeniería de datos', Cybersecurity: 'Ciberseguridad', 'Application Security': 'Seguridad de aplicaciones', 'Network Security': 'Seguridad de redes', 'Cloud Security': 'Seguridad en la nube', 'Data Security': 'Seguridad de datos', 'Data Science': 'Ciencia de datos', 'Data Analytics': 'Analítica de datos', 'Data Mining': 'Minería de datos', 'Data Visualization': 'Visualización de datos', 'Artificial Intelligence': 'Inteligencia artificial', 'Machine Learning': 'Aprendizaje automático', 'Deep Learning': 'Aprendizaje profundo', 'Natural Language Processing': 'Procesamiento del lenguaje natural', 'Computer Vision': 'Visión artificial', 'Generative Artificial Intelligence': 'Inteligencia artificial generativa', 'Applied Artificial Intelligence': 'Inteligencia artificial aplicada',
};

// Capitalize meaningful title words; keep articles, prepositions and conjunctions lowercase.
const smallTitleWords = new Set(['a', 'al', 'ante', 'bajo', 'con', 'contra', 'de', 'del', 'desde', 'durante', 'en', 'entre', 'hacia', 'hasta', 'mediante', 'para', 'por', 'según', 'sin', 'sobre', 'tras', 'el', 'la', 'las', 'lo', 'los', 'un', 'una', 'unos', 'unas', 'y', 'e', 'o', 'u', 'ni', 'que']);
const titleCase = (value: string) => {
  let firstWord = true;
  return value.replace(/[\p{L}\p{N}]+/gu, word => {
    const first = firstWord;
    firstWord = false;
    const lower = word.toLocaleLowerCase('es');
    return !first && smallTitleWords.has(lower) ? lower : word[0].toLocaleUpperCase('es') + word.slice(1);
  });
};
const navigationLabels = Object.fromEntries(Object.entries(navigationEnglishToSpanish).map(([en, es]) => [en, titleCase(es)]));
const spanishNavigationLabels = Object.fromEntries(Object.entries(navigationEnglishToSpanish).flatMap(([en, es]) => [[es, en], [titleCase(es), en]]));
const englishToSpanish: Record<string, string> = {};
for (const [es, en] of Object.entries(spanishToEnglish)) englishToSpanish[en] ??= es;

const patternNamesInSpanish: Record<string, string> = {
  Facade: 'Fachada', Adapter: 'Adaptador', Iterator: 'Iterador',
  'Simple Factory': 'Fábrica Simple', Builder: 'Constructor', Prototype: 'Prototipo',
  Strategy: 'Estrategia', Decorator: 'Decorador', Observer: 'Observador',
  Singleton: 'Instancia Única', 'Factory Method': 'Método de Fábrica',
  State: 'Estado', Mediator: 'Mediador', Visitor: 'Visitante',
};

export function translatePatternTitle(title: string, language: Language): string {
  return language === 'es' ? patternNamesInSpanish[title] ?? title : title;
}

export function translate(value: string, language: Language): string {
  const navigationLabel = navigationLabels[value] ? value : spanishNavigationLabels[value];
  if (navigationLabel) return language === 'en' ? navigationLabel : navigationLabels[navigationLabel];
  const prefix = value.match(/^(?:Recorrido orientativo|Suggested Path|Suggested path): (.+)$/);
  if (prefix) return `${language === 'en' ? 'Suggested path' : 'Recorrido orientativo'}: ${translate(prefix[1], language)}`;
  const sourceTitle = value.replace(language === 'en' ? ' — Patrones de diseño' : ' — Design Patterns', language === 'en' ? ' — Design Patterns' : ' — Patrones de diseño');
  const replacement = language === 'en' ? spanishToEnglish[sourceTitle] ?? sourceTitle : englishToSpanish[sourceTitle] ?? sourceTitle;
  return /\p{L}/u.test(value) && value === value.toLocaleUpperCase() ? replacement.toLocaleUpperCase() : replacement;
}

type OriginalValue = { source: string; rendered: string };
const originalText = new WeakMap<Text, OriginalValue>();
const originalAttributes = new WeakMap<Element, Map<string, OriginalValue>>();

// Store original nodes and attributes so switching languages never translates a previous translation.
export function applyStaticTranslations(language: Language) {
  document.documentElement.lang = language;
  document.querySelectorAll<HTMLElement>('[lang]').forEach(element => {
    if (element.tagName === 'OPTION' || element.closest('[translate="no"]')) return;
    element.lang = element.classList.contains('brand') ? 'en' : language;
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node as Text;
    if (text.parentElement?.closest('script, style, code, pre, option, noscript, [translate="no"]')) continue;
    let original = originalText.get(text);
    if (!original || original.rendered !== text.data) original = { source: text.data, rendered: text.data };
    const trimmed = original.source.trim();
    original.rendered = trimmed ? original.source.replace(trimmed, translate(trimmed, language)) : original.source;
    text.data = original.rendered;
    originalText.set(text, original);
  }
  document.querySelectorAll<HTMLElement>('[aria-label], [title], [placeholder], meta[content]').forEach(element => {
    if (element.closest('[translate="no"]')) return;
    const attributes = originalAttributes.get(element) ?? new Map<string, OriginalValue>();
    for (const attribute of ['aria-label', 'title', 'placeholder', 'content']) {
      const value = element.getAttribute(attribute);
      if (value === null) continue;
      let original = attributes.get(attribute);
      if (!original || original.rendered !== value) original = { source: value, rendered: value };
      original.rendered = translate(original.source, language);
      element.setAttribute(attribute, original.rendered);
      attributes.set(attribute, original);
    }
    originalAttributes.set(element, attributes);
  });
  document.querySelectorAll<HTMLElement>('[data-pattern-title]').forEach(title => {
    title.textContent = translatePatternTitle(title.dataset.patternTitle!, language);
    title.lang = language;
  });
  document.querySelectorAll<HTMLElement>('.concept-card').forEach(card => {
    const title = card.querySelector('h3');
    const level = card.querySelector<HTMLElement>('.level-badge');
    if (level) level.textContent = translate(card.dataset.level ?? '', language);
    const conceptTitle = title?.textContent ?? '';
    card.querySelector('.card-views')?.setAttribute('aria-label', `${translate('Contenido de', language)} ${conceptTitle}`);
    const source = card.querySelector<HTMLAnchorElement>('.concept-source');
    if (source) {
      const publisher = source.querySelector('.source-publisher')?.textContent ?? '';
      const sourceTitle = source.getAttribute('title') ?? '';
      source.setAttribute('aria-label', language === 'en'
        ? `${publisher}. Original source. ${sourceTitle}. About ${conceptTitle}. Opens in a new tab.`
        : `${publisher}. Fuente original. ${sourceTitle}. Sobre ${conceptTitle}. Se abre en una pestaña nueva.`);
    }
  });
  const select = document.querySelector<HTMLSelectElement>('#language-select');
  if (select) select.value = language;
  document.querySelectorAll<HTMLElement>('[data-area-translation]').forEach(element => {
    element.textContent = translate(element.dataset.areaTranslation!, language);
  });
  document.querySelectorAll<HTMLElement>('[data-stage-area-count]').forEach(element => {
    const count = Number(element.dataset.stageAreaCount);
    element.textContent = language === 'en' ? `${count} ${count === 1 ? 'area' : 'areas'} at this stage` : `${count} ${count === 1 ? 'área en esta etapa' : 'áreas en esta etapa'}`;
  });
  document.querySelectorAll<HTMLElement>('[data-route-count]').forEach(element => {
    const count = Number(element.dataset.routeCount);
    element.textContent = language === 'en'
      ? `${count} ${count === 1 ? 'learning path' : 'learning paths'} available. Concise definitions and original sources to explore further.`
      : `${count} ${count === 1 ? 'ruta disponible' : 'rutas disponibles'}. Definiciones breves y fuentes originales para profundizar.`;
  });
  document.querySelectorAll<HTMLElement>('.career-content-status.is-available').forEach(element => {
    const match = element.textContent?.match(/\d+/);
    if (match) element.textContent = `${match[0]} ${language === 'en' ? Number(match[0]) === 1 ? 'concept available' : 'concepts available' : Number(match[0]) === 1 ? 'concepto disponible' : 'conceptos disponibles'}`;
  });
  document.querySelectorAll<HTMLElement>('[data-route-number]').forEach(element => {
    element.textContent = `${language === 'en' ? 'PATH' : 'RUTA'} ${element.dataset.routeNumber}`;
  });
  document.querySelectorAll<HTMLElement>('[data-concept-count]').forEach(element => {
    const count = Number(element.dataset.conceptCount);
    element.textContent = `${count} ${language === 'en' ? count === 1 ? 'concept' : 'concepts' : count === 1 ? 'concepto' : 'conceptos'}`;
  });
  document.querySelectorAll<HTMLElement>('[data-module-count]').forEach(element => {
    const count = Number(element.dataset.moduleCount);
    element.textContent = `${count} ${language === 'en' ? count === 1 ? 'module' : 'modules' : count === 1 ? 'módulo' : 'módulos'}`;
  });
  const count = document.querySelector<HTMLElement>('.concept-count');
  if (count) count.lastChild!.textContent = ` ${language === 'en' ? 'CONCEPTS' : 'CONCEPTOS'}`;
}

export function getSavedLanguage(): Language {
  try { return localStorage.getItem('tech-training:language:v1') === 'en' ? 'en' : 'es'; }
  catch { return 'es'; }
}

export function saveLanguage(language: Language) {
  try { localStorage.setItem('tech-training:language:v1', language); } catch { /* The selector remains usable for this visit. */ }
}
