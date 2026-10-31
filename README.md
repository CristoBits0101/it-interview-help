# IT Interview Help

Web estática responsive para preparar entrevistas técnicas y repasar ingeniería de software. Construida con Astro 7, TypeScript y CSS; sin backend, cuentas ni servicios de IA necesarios para usarla.

El contenido se centra en fundamentos para entrevistas de distintos perfiles y empresas. No pretende enseñar exhaustivamente todas las áreas desde cero ni sustituir una formación completa.

## Nombre y dominio / Name and domain

**ES:** La marca es «IT Interview Help» y su dominio definitivo es `itinterviewhelp.com`, adquirido según confirmación del propietario. El repositorio es [it-interview-help](https://github.com/CristoBits0101/it-interview-help). La compra no confirma la configuración de DNS, HTTPS o alojamiento ni la publicación de la web en ese dominio.

**EN:** The brand is “IT Interview Help” and its definitive domain is `itinterviewhelp.com`, purchased as confirmed by the owner. The repository is [it-interview-help](https://github.com/CristoBits0101/it-interview-help). The purchase does not confirm DNS, HTTPS or hosting configuration or publication of the website at that domain.

## Home y contenido

Home permite elegir un área profesional y uno de sus perfiles y una etapa desde Trainee o Becario hasta Senior. La etapa muestra conocimientos recomendados, bases previas y objetivos prácticos con enlaces al contenido disponible. Amplía tu Alcance enlaza recursos externos en inglés sobre responsabilidades y competencias para todos los puestos. Los puestos se seleccionan únicamente en Home; el menú lateral organiza disciplinas y conocimientos. Las opciones de especialización, liderazgo y gestión no representan una jerarquía profesional universal.

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

## Herramientas y ejecución / Tools and execution

**ES:** Usa Node.js 22.23.2 y pnpm 12.16.1. `packageManager` fija pnpm y `pnpm-lock.yaml` fija las resoluciones. Si pnpm no está disponible puedes ejecutar `npx --yes pnpm@12.16.1` seguido del comando sin instalarlo globalmente.

**EN:** Use Node.js 22.23.2 and pnpm 12.16.1. `packageManager` pins pnpm and `pnpm-lock.yaml` pins resolutions. If pnpm is unavailable you can run `npx --yes pnpm@12.16.1` followed by the command without installing it globally.

```sh
pnpm install --frozen-lockfile
pnpm run dev --host localhost --port 4321
pnpm run validate
pnpm exec playwright install chromium
pnpm run test:e2e
pnpm run preview
```

| Dependencia / Dependency | Tipo / Type | Uso ES | Purpose EN |
| --- | --- | --- | --- |
| `@biomejs/biome` 2.6.4 | Desarrollo / Development | Detecta errores concretos de control de flujo y duplicación y el uso de eval. No reformatea. | Detects specific control-flow and duplication errors and eval usage. Does not reformat. |
| `@sentry/astro` 11.10.0 | Ejecución / Runtime | SDK oficial instalado y sin configurar. No se importa ni activa en la aplicación. | Official SDK installed and unconfigured. It is not imported or activated in the application. |
| `@playwright/test` 1.64.1 | Desarrollo / Development | Ejecuta recorridos en Chromium aislado sobre el build local en el puerto 4322. | Runs journeys in isolated Chromium against the local build on port 4322. |
| `@axe-core/playwright` 4.14.0 | Desarrollo / Development | Ejecuta axe dentro de Playwright para detectar problemas automáticos WCAG A/AA. Incluye axe-core como dependencia transitiva. | Runs axe inside Playwright to detect automated WCAG A/AA issues. Includes axe-core as a transitive dependency. |

**ES:** `validate` ejecuta Biome, Astro/TypeScript, contratos del catálogo, pruebas unitarias, build y comprobación del artefacto. Biome analiza JS/TS, JSON y CSS y las partes JS/TS de Astro mediante su soporte parcial. No activamos el análisis completo experimental de Astro ni comprobaciones Markdown. Las pruebas `test:e2e` y su alias `test:a11y` comprueban Home, selección y persistencia de etapa, enlaces externos con respuesta local simulada, búsqueda, preferencias ES/EN, panel móvil, progreso, niveles, alineación del buscador y foco de diálogos en 1440 y 390 px. No certifican accesibilidad ni sustituyen revisión manual o lectores de pantalla. La CI ejecuta validación, auditoría y estas pruebas sin desplegar; los checks no configuran protección de ramas ni impiden por sí solos hacer push.

**EN:** `validate` runs Biome, Astro/TypeScript, catalog contracts, unit tests, build and artifact checks. Biome analyzes JS/TS, JSON and CSS and the JS/TS parts of Astro through its partial support. We do not enable experimental full Astro analysis or Markdown checks. `test:e2e` and its alias `test:a11y` check Home, stage selection and persistence, external links with a mocked local response, search, ES/EN preferences, the mobile drawer, progress, levels, search alignment and dialog focus at 1440 and 390 px. They do not certify accessibility or replace manual review or screen readers. CI runs validation, auditing and these tests without deploying; checks do not configure branch protection or prevent pushes by themselves.

## Sentry

**ES:** `@sentry/astro` está instalado y sin configurar ni activar. No hay integración, inicialización, DSN ni envío de datos a Sentry. La configuración queda pendiente de una petición posterior. Los overrides acotados de `glob` y `minimatch` corrigen los avisos GHSA-3g3m-2fjr-6pw4 y GHSA-g3hv-75wg-m249 en sus dependencias de build.

**EN:** `@sentry/astro` is installed and neither configured nor activated. There is no integration, initialization, DSN or data sent to Sentry. Configuration awaits a later request. The scoped `glob` and `minimatch` overrides fix advisories GHSA-3g3m-2fjr-6pw4 and GHSA-g3hv-75wg-m249 in its build dependencies.

**ES:** Preferencias ofrece únicamente Español y English en una fila de radios nativos con forma de píldora y selección visible sin banderas ni códigos. Conserva el idioma elegido entre visitas y permite cambiar con las flechas del teclado. Los encabezados Idioma y Sonido usan iconos Lucide distintos. El foco normal usa una marca inferior sin outline exterior; los colores forzados conservan un indicador compatible con el sistema.

**EN:** Preferences offers only Español and English in a row of pill-shaped native radio controls with visible selection and no flags or codes. It preserves the chosen language across visits and supports keyboard arrow selection. The Language and Sound headings use distinct Lucide icons. Normal focus uses a bottom indicator without an external outline; forced colors retain an indicator compatible with the system.

**ES:** Cada idioma tiene su propia píldora blanca con borde. Idioma y Sonido conservan sus paneles exteriores redondeados con los títulos encima. El icono de Idioma es Languages y el de Sonido es Music2. Sonido sitúa el botón de silenciar a la izquierda del contenedor de volumen dentro del panel común. Los controles pasan a otra fila cuando falta espacio. El volumen queda bloqueado al desactivar el sonido sin perder su valor guardado. Los paneles y controles reutilizan la paleta y los estados del selector de áreas de Home. La etiqueta del deslizador sigue disponible para lectores de pantalla.

**EN:** Each language has its own white bordered pill. Language and Sound retain their rounded outer panels with headings above them. The Language icon is Languages and the Sound icon is Music2. Sound places the mute button to the left of the volume container inside the shared panel. Controls wrap onto another row when space is insufficient. Volume is disabled when sound is switched off without losing its saved value. Panels and controls reuse the palette and states of the Home area selector. The slider label remains available to screen readers.

**ES:** El buscador filtra también las etiquetas ES/EN del menú y conserva sus ancestros. Abre ramas solo durante la búsqueda y restaura las aperturas anteriores al limpiarla sin escribir esa expansión temporal en preferencias. Las hojas sin contenido siguen deshabilitadas.

**EN:** Search also filters the menu’s ES/EN labels and preserves their ancestors. It opens branches only during search and restores their previous expansion when cleared without writing that temporary expansion to preferences. Leaves without content remain disabled.
