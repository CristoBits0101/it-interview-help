# Tech Interview Prep

Web estática responsive para preparar entrevistas técnicas y repasar ingeniería de software. Construida con Astro 7, TypeScript y CSS; sin backend, cuentas ni servicios de IA necesarios para usarla.

El contenido se centra en fundamentos para entrevistas de distintos perfiles y empresas. No pretende enseñar exhaustivamente todas las áreas desde cero ni sustituir una formación completa.

## Home y contenido

Home resume la aplicación y permite elegir un perfil —Frontend Engineer, Backend Engineer, Full Stack Engineer, DevOps Engineer o Artificial Intelligence Engineer— y una etapa, desde Fundamentos hasta Senior. Cada selección recomienda áreas relacionadas, conocimientos previos y un objetivo práctico. La progresión posterior distingue especialización, liderazgo y gestión; no representa una jerarquía profesional universal.

Home presenta el subtítulo «Fundamentos para entrevistas técnicas» y una orientación breve. Conserva los cuatro contadores y los selectores de profesión y etapa. El menú reúne siete grupos: Sistemas Informáticos, Interacción Persona-Computadora, Ingeniería de Software, Gestión e Ingeniería de Datos, Ciberseguridad, Ciencia de Datos e Inteligencia Artificial. Las bases se integran en sus ámbitos y se comparten cuando corresponda. El orden orienta el aprendizaje sin imponer una secuencia única entre especialidades.

El código local incluye Software Design con 19 conceptos en cuatro módulos y Aplicaciones de IA Generativa con 104 conceptos en diez páginas temáticas. El glosario recoge los cien términos del README de prácticas más cuatro fundamentos acordados. Este cambio está pendiente de subir y no modifica por sí mismo la web alojada. Las demás áreas mantienen sus ramas visibles y sus hojas sin contenido deshabilitadas.

El catálogo fuente conserva estas rutas. La navegación publicada permite abrir Software Design:

1. User Experience Design: 6 conceptos de arquitectura de información y experiencia de usuario.
2. Software Design: 19 conceptos. SOLID Principles contiene cinco principios en el orden S, O, L, I, D. Design Patterns contiene cinco creacionales, tres estructurales y seis de comportamiento.
3. Software Architecture: 5 conceptos.
4. Distributed Systems: 40 conceptos en 5 módulos sobre comunicación, datos, coordinación y mensajería.
5. System Design: 12 conceptos sobre requisitos, capacidad, flujo de datos y bloques de arquitectura.
6. Generative AI Applications: el contenido local disponible se define en `src/data/ai-glossary.ts`. El catálogo anterior de 32 conceptos en `src/data/applied-ai.ts` se conserva como material histórico sin montar ni duplicar sus lecciones. Conserva el ID applied-ai.

Cada tarjeta publicada muestra una explicación breve en un párrafo y su fuente concreta. Las referencias están centralizadas en `src/data/concept-sources.ts`. Las vistas Caso de Uso e Implementación solo se habilitan cuando existe contenido. Los ejemplos y recordatorios históricos de las rutas no publicadas se conservan en los datos. Al final de cada módulo aparece únicamente «Siguiente módulo» cuando existe un destino posterior.

## Privacidad

El progreso se almacena solo en `localStorage` del navegador (`tech-training:v1`). El menú empieza cerrado y recuerda las ramas abiertas con `tech-training:navigation:v1`. No se comparten entre dispositivos. Si el almacenamiento no está disponible, se mantienen durante la sesión. Las tipografías se sirven desde la propia web.

La aplicación genera HTML estático. JavaScript habilita la selección de perfil y etapa, la navegación entre módulos, búsqueda, progreso y repaso. Sin JavaScript se pueden consultar el resumen y el primer itinerario de Home. La selección de perfil y etapa no se guarda entre recargas.

Las dependencias Python del material de referencia son contexto para la ruta Generative AI Applications; no son necesarias para ejecutar esta web.

## Memoria del proyecto

- [AGENTS.md](AGENTS.md): instrucciones de continuidad para agentes y colaboradores.
- [Revisión conceptual de navegación](docs/NAVIGATION_REVIEW.md): pertenencia de áreas, bases compartidas, progresión pedagógica, fuentes y validación.
- [Guía de producto, diseño y desarrollo](docs/PROJECT_GUIDE.md): preferencias, tipografías, colores, espaciado, navegación, arquitectura, comprobaciones y publicación.
- [Revisión de accesibilidad](docs/ACCESSIBILITY_REVIEW.md): criterios WCAG 2.2 y USWDS, contrastes medidos, mejoras de lectura, pruebas y límites de la revisión.
- [Auditoría de la sesión y continuidad](docs/SESSION_AUDIT.md): peticiones verificadas, correcciones que prevalecen e instrucciones para futuras sesiones.
