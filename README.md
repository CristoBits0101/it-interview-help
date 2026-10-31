# Tech Interview Prep

Web estática responsive para preparar entrevistas técnicas y repasar ingeniería de software. Construida con Astro 7, TypeScript y CSS; sin backend, cuentas ni servicios de IA necesarios para usarla.

El contenido se centra en fundamentos para entrevistas de distintos perfiles y empresas. No pretende enseñar exhaustivamente todas las áreas desde cero ni sustituir una formación completa.

## Nombre y dominios propuestos / Proposed name and domains

**ES:** «Computer Science Interviews» es un nombre candidato pendiente de decisión. Gemini propuso `computer-science-interviews.dev` y `computer-science-interviews.com`; estas variantes no se han comprobado. Una consulta previa a RDAP de Verisign para `computerscienceinterviews.com` (sin guiones) devolvió HTTP 404, por lo que parecía no registrado en ese momento, pendiente de confirmación por un registrador. No se ha completado una comprobación registral de marcas ni se han verificado ventajas de SEO. No se confirma ninguna compra de dominio ni un cambio definitivo de nombre; la marca actual sigue siendo Tech Interview Prep.

**EN:** “Computer Science Interviews” is a candidate name awaiting a decision. Gemini proposed `computer-science-interviews.dev` and `computer-science-interviews.com`; these variants have not been checked. An earlier Verisign RDAP query for `computerscienceinterviews.com` (without hyphens) returned HTTP 404, so it appeared unregistered at that time, pending confirmation by a registrar. No trademark registry check has been completed and no SEO advantages have been verified. No domain purchase or final name change is confirmed; the current brand remains Tech Interview Prep.

## Home y contenido

Home permite elegir un área profesional y uno de sus perfiles y una etapa desde Trainee o Becario hasta Senior. La etapa muestra conocimientos recomendados, bases previas y objetivos prácticos con enlaces al contenido disponible. Las rutas por alcance conservan su aviso de contenido en desarrollo. Los puestos se seleccionan únicamente en Home; el menú lateral organiza disciplinas y conocimientos. Las opciones de especialización, liderazgo y gestión no representan una jerarquía profesional universal.

Home presenta el encabezado «Prepara tu próxima entrevista técnica» y una orientación breve. Conserva los cuatro contadores y los selectores de área, profesión y etapa. El menú reúne seis grupos: Sistemas Informáticos, Ciberseguridad, Interacción Persona-Computadora, Ingeniería de Software, Tecnologías de Datos e Inteligencia Artificial. Las bases se integran en sus ámbitos y se comparten cuando corresponda. El orden y los años de las etapas orientan el aprendizaje sin imponer una progresión profesional universal.

El catálogo publicado incluye Software Design con 19 conceptos en cuatro módulos y Aplicaciones de IA Generativa con 104 conceptos en diez páginas temáticas. El glosario recoge los cien términos del README de prácticas más cuatro fundamentos acordados. El contenido disponible se define en `src/app/data/published-catalog.ts`; subir cambios al repositorio no publica por sí mismo la web alojada. Las demás áreas mantienen sus ramas visibles y sus hojas sin contenido deshabilitadas.

El catálogo fuente conserva estas rutas. La navegación publicada permite abrir Software Design y Generative AI Applications:

Java añade un resumen visual en `#java/versions` bajo Software Engineering → Software Development → Programming Languages → Java → Version Evolution. Muestra 27 fichas de Java 1.0 a Java 26 con año y mejoras principales visibles en dos columnas o una en móvil. Las fuentes se despliegan dentro de cada ficha. El contenido y las etiquetas están disponibles en ES/EN y la búsqueda encuentra la sección. Los datos amplios de versiones y ejemplos se conservan como fuente sin montar el antiguo comparador ni los ejemplos en la interfaz. TypeScript y Python siguen sin contenido.

El presupuesto de compilación admite el contenido bilingüe de esta guía: 116 KiB de HTML comprimido, 68 KiB de JavaScript comprimido y 2400 KiB de archivos totales. El incremento se limita a datos educativos, marcado y controles locales sin nuevas dependencias.

1. User Experience Design: 6 conceptos de arquitectura de información y experiencia de usuario.
2. Software Design: 19 conceptos. SOLID Principles contiene cinco principios en el orden S, O, L, I, D. Design Patterns contiene cinco creacionales, tres estructurales y seis de comportamiento.
3. Software Architecture: 5 conceptos.
4. Distributed Systems: 40 conceptos en 5 módulos sobre comunicación, datos, coordinación y mensajería.
5. System Design: 12 conceptos sobre requisitos, capacidad, flujo de datos y bloques de arquitectura.
6. Generative AI Applications: el contenido local disponible se define en `src/features/artificial-intelligence/generative-artificial-intelligence/generative-ai-applications/data/ai-glossary.ts`. El catálogo anterior de 32 conceptos en `src/features/artificial-intelligence/generative-artificial-intelligence/generative-ai-applications/data/applied-ai.ts` se conserva como material histórico sin montar ni duplicar sus lecciones. Conserva el ID applied-ai.

Cada tarjeta publicada muestra una explicación breve en un párrafo y su fuente concreta. Las referencias están centralizadas en `src/shared/data/concept-sources.ts`. Las vistas Caso de Uso e Implementación solo se habilitan cuando existe contenido. Los ejemplos y recordatorios históricos de las rutas no publicadas se conservan en los datos. Al final de cada módulo aparece únicamente «Siguiente módulo» cuando existe un destino posterior.

## Privacidad

El progreso se almacena solo en `localStorage` del navegador (`tech-training:v1`). El menú empieza cerrado y recuerda las ramas abiertas con `tech-training:navigation:v1`. No se comparten entre dispositivos. Si el almacenamiento no está disponible, se mantienen durante la sesión. Las tipografías se sirven desde la propia web.

La aplicación genera HTML estático. JavaScript habilita la selección de perfil y etapa, la navegación entre módulos, búsqueda, progreso y repaso. Sin JavaScript se puede consultar el resumen inicial de Home. El área y el perfil no se guardan entre recargas y la etapa se conserva localmente. El idioma y las preferencias de audio también se guardan localmente; los sonidos están desactivados por defecto y sus archivos se sirven desde la propia web.

Las dependencias Python del material de referencia son contexto para la ruta Generative AI Applications; no son necesarias para ejecutar esta web.

## Organización del código

El código se separa por responsabilidades y áreas funcionales. Los directorios de agrupación contienen solo subcarpetas y las carpetas finales contienen archivos relacionados. Astro conserva sus entradas en `src/pages/` y el documento común en `src/layouts/`. La estructura y sus contratos se describen en [Componentes y continuidad](docs/COMPONENT_ARCHITECTURE.md).

## Memoria del proyecto

- [AGENTS.md](AGENTS.md): instrucciones de continuidad para agentes y colaboradores.
- [Revisión conceptual de navegación](docs/NAVIGATION_REVIEW.md): pertenencia de áreas, bases compartidas, progresión pedagógica, fuentes y validación.
- [Guía de producto, diseño y desarrollo](docs/PROJECT_GUIDE.md): preferencias, tipografías, colores, espaciado, navegación, arquitectura, comprobaciones y publicación.
- [Revisión de accesibilidad](docs/ACCESSIBILITY_REVIEW.md): criterios WCAG 2.2 y USWDS, contrastes medidos, mejoras de lectura, pruebas y límites de la revisión.
- [Auditoría de la sesión y continuidad](docs/SESSION_AUDIT.md): peticiones verificadas, correcciones que prevalecen e instrucciones para futuras sesiones.
