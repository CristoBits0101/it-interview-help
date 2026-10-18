# Memoria de producto, diseño y desarrollo

Estado documentado: **18 de octubre de 2026**. Lee también [AGENTS.md](../AGENTS.md). Las preferencias expresas del usuario se indican como tales; las medidas y limitaciones describen la implementación actual y no impiden cambios posteriores solicitados.

## 1. Propósito y preferencias

Tech Training es una web abierta para aprender fundamentos de tecnología y preparar pruebas técnicas. Prioriza conceptos claros, descripciones cortas y recuperación activa de lo aprendido. No es una aplicación de escritorio ni una plataforma que ejecute modelos de IA.

El usuario pidió un diseño profesional, moderno y minimalista, con especial cuidado por la simetría, márgenes y alineación. Los enlaces de navegación usan nombres completos en inglés y Title Case; las explicaciones y buena parte de los controles están en español. No traduzcas ni abrevies áreas de forma arbitraria. Las siglas propias de conceptos técnicos, como SQL, RPC o LLM, pueden formar parte de las lecciones.

La marca del sidebar es exactamente **Tech Training**. El usuario retiró el logo gráfico, el guion y el subtítulo «Un concepto. Un paso más.». También retiró el separador horizontal, la biblioteca de exploración/guardados y el pie de progreso. El borde vertical entre sidebar y contenido y las guías de indentación de los submenús siguen presentes. La nueva portada Home sustituye al antiguo hero y la franja de seis rutas. La etiqueta `Library` y el acceso al repaso rápido global también se eliminaron; el repaso de conceptos visibles continúa dentro del estudio.

## 2. Tipografía

| Uso | Familia y configuración actual |
| --- | --- |
| Interfaz completa, texto, controles y encabezados | `Google Sans Flex Variable`, fallback `sans-serif` |
| Marca del sidebar | `IBM Plex Mono`, fallback `monospace`; 500, 22 px, línea 24 px, tracking -1.1 px |
| Texto base | 14 px, interlineado 1.6 |
| Menú principal | 12 px, línea 24 px; ramas con peso 550 |
| Submenús | 11 px, línea 24 px |
| Etiqueta `LEARNING PATHS` | 9 px, peso 650, tracking 1.5 px, línea 24 px |

`src/pages/index.astro` importa `@fontsource-variable/google-sans-flex` y `@fontsource/ibm-plex-mono/500.css`. Las fuentes se incluyen en los assets de la web; no dependen de una petición a Google Fonts en ejecución. En CSS, `--body` contiene Google Sans Flex y `--display` referencia `var(--body)`.

Referencias pedidas por el usuario: [Google Sans Flex](https://fonts.google.com/specimen/Google+Sans+Flex) e [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono).

Error que no debe repetirse: antes se importaba Google Sans Flex pero `--body` seguía apuntando a Inter. No basta con instalar o importar la fuente: comprueba `getComputedStyle(element).fontFamily` en menú, contenido, inputs, select y botones, además de `document.fonts.ready` y la carga efectiva de la familia. Inter y Manrope ya no son dependencias.

## 3. Colores y superficies

Los tokens de `:root` en `src/styles/global.css` son la referencia principal:

| Token | Valor | Función |
| --- | --- | --- |
| `--paper` | `#ffffff` | Tarjetas y superficies |
| `--canvas` | `#fcfcfa` | Fondo general |
| `--sidebar` | `#f4f5f0` | Fondo de navegación |
| `--ink` | `#252d29` | Texto principal |
| `--muted` | `#717870` | Texto secundario base |
| `--line` | `#e5e8e0` | Bordes y divisiones |
| `--green` | `#285c45` | Acción principal, foco y acento |
| `--lime` | `#d5edaf` | Selección de texto |

Estados y colores efectivos relevantes:

| Elemento | Colores |
| --- | --- |
| Texto del menú / deshabilitado | `#4c584a` / `#7a8276` |
| Iconos de área / chevrons | `#56754c` / `#7a8674` |
| Hover de navegación | Fondo `#e9ede3`, texto `--green` |
| Enlace actual | Fondo `#e3ecd9`, texto `#31593b`, peso 600 |
| Guías de submenú | `#d9dfd3` |
| Descripción de concepto | `#66705e` |
| Etiquetas secundarias y `LEARNING PATHS` | `#657357` |
| Ayuda para recordar | Fondo `#f5f7f0`, borde `#c5d8b0`, texto `#5c6d48` |
| Nivel Esencial | Fondo `#f0f5e9`, texto `#536c38` |
| Nivel Intermedio | Fondo `#edf2f8`, texto `#506d8a` |
| Nivel Avanzado | Fondo `#f4edf7`, texto `#7f5b8e` |

El CSS se organiza en capas `reset`, `base`, `layout`, `components`, `responsive`. Algunos colores de texto se corrigen en la última capa, incluso fuera de media queries: no tomes una declaración anterior como el color final. Conserva las diferencias entre estados sin depender únicamente del color; hay etiquetas, `aria-current` y `aria-pressed`.

Tarjetas de concepto con borde de 1 px y radio de 11 px; filas del menú con radio de 8 px; botones normalmente de 7 px. Sombras y transiciones son discretas. Se respeta `prefers-reduced-motion`.

## 4. Espaciado y navegación visual

Preferencia general del usuario: separación visual simétrica y gaps proporcionados, normalmente la mitad del margen/padding. El contenido principal parte de `--space-page: 42px` y `--space-gap: 21px`, con ajustes responsive existentes.

En el sidebar se corrigió un problema concreto: sumar gap + padding + márgenes daba separaciones distintas entre marca, subtítulo y desplegables. La implementación actual usa una **retícula uniforme de filas**, sin separación vertical adicional entre cajas:

| Propiedad | Valor actual |
| --- | --- |
| Ancho del sidebar | 332 px; móvil `min(332px, 100vw)` |
| Padding exterior | 16 px en los cuatro lados |
| Marca, subtítulo y filas de todos los niveles | `min-height: 48px`, `line-height: 24px`, padding vertical 12 px |
| Gaps/márgenes verticales entre filas | 0 |
| Padding horizontal principal | 16 px |
| Gap horizontal icono-texto | 8 px |
| Padding izquierdo de fila anidada | 8 px |
| Indentación de cada árbol hijo | Margen izquierdo 24 px + padding izquierdo 8 px + guía de 1 px |
| Inset derecho de todas las filas | `--navigation-end-inset: 16px` |

La retícula mantiene 48 px entre centros de filas de una sola línea, incluidos marca y subtítulo. No significa que los trazos de fuentes de diferentes tamaños tengan exactamente el mismo espacio óptico. Los títulos largos de subniveles pueden ocupar más de una línea; no recortes contenido ni fuerces alturas que lo oculten. Los nombres principales permanecen en una línea cuando caben.

Los chevrons son de 14 px, con `margin-inline-start: auto` y centrado vertical. La indentación solo cambia la izquierda; añadir márgenes o padding derecho a cada subárbol rompe su columna común. Los iconos de área son de 18 px. `Icon.astro` centraliza Lucide con trazo 1.65 y SVG decorativos `aria-hidden`.

No vuelvas al ajuste anterior de gaps 16/8/4 sumados a padding vertical: el usuario señaló que no resultaba uniforme. Revisa medidas reales y captura visual, no solo números del CSS.

### Iconos de las áreas principales

| Área | Icono Lucide |
| --- | --- |
| Mathematics | `Sigma` |
| Statistics | `ChartColumn` |
| Programming | `CodeXml` |
| Computer Systems | `Cpu` |
| Human-Computer Interaction | `MousePointerClick` |
| Software Engineering | `Blocks` |
| Data Management | `Database` |
| Data Engineering | `Workflow` |
| Cybersecurity | `ShieldCheck` |
| Data Science | `FlaskConical` |
| Artificial Intelligence | `BrainCircuit` |

Usa iconos por significado, no por posición. Solo las áreas principales llevan estos iconos; los chevrons repetidos indican una acción común y sí se conservan.

### Responsive

El sidebar es fijo en escritorio. A 850 px o menos pasa a un panel móvil con backdrop, control de foco, `inert`, cierre con Escape y cierre al navegar. A 640 px o menos las tarjetas pasan a una columna. Hay ajustes adicionales en 1050, 1250 y 1600 px. Conserva la navegación accesible y verifica ausencia de desbordamiento horizontal, también con submenús abiertos.

## 5. Taxonomía y contenido

El árbol completo y su orden se definen en `src/data/navigation.ts`. Las once áreas principales aparecen en el mismo orden que la tabla de iconos. Incluye niveles todavía sin contenido: no los ocultes. `NavigationTree.astro` distingue:

- Rama con hijos: `details`/`summary` nativos, desplegable.
- Hoja con `href`: enlace a un módulo existente.
- Hoja sin `href`: `span` con `aria-disabled="true"`, visible y no clicable.

El árbol amplio sustituye al antiguo sidebar de solo seis rutas. Las seis rutas **con lecciones** siguen este orden en la generación de contenidos:

| Ruta | ID | Conceptos actuales | Ubicación en el árbol |
| --- | --- | ---: | --- |
| User Experience Design | `ux-design` | 6 | Human-Computer Interaction |
| Software Design | `software-design` | 15 | Software Engineering |
| Software Architecture | `software-architecture` | 5 | Software Engineering |
| Distributed Systems | `distributed-systems` | 40 | Computer Systems |
| System Design | `system-design` | 12 | Software Engineering |
| Applied Artificial Intelligence | `applied-ai` | 32 | Artificial Intelligence |

Total actual: 110 conceptos. Es un inventario, no un límite de producto. `Information Architecture` y `User Experience Design` apuntan actualmente al mismo módulo; no dupliques sus conceptos solo para crear dos destinos. Sistemas distribuidos y diseño de sistemas son áreas distintas, no una debe absorber la otra.

Modelo: `Track` contiene módulos; cada `Module` contiene conceptos. Un `Concept` tiene `id`, `title`, `description`, `memory`, `example` y `level` (`Esencial`, `Intermedio` o `Avanzado`). Mantén definiciones precisas y breves; SOLID ya se divide en cinco principios. Enlaza fuentes originales cuando amplíes la teoría. Los archivos de datos son la fuente de verdad, no el HTML compilado.

Para añadir contenido, actualiza el archivo de datos apropiado y el destino de navegación. Una nueva ruta también requiere revisar imports, `tracks` y `trackOrder` en `index.astro`. La portada recibe esos datos y deriva de ellos disponibilidad y conteos; no mantengas una segunda cifra manual. No alteres todo el layout como efecto secundario de añadir una lección.

### Home y orientación profesional

La raíz y `#home` muestran una portada propia: presenta el alcance de la aplicación, el inventario de áreas y conceptos, recomendaciones por perfil y etapa y opciones de desarrollo profesional. No debe abrir por defecto User Experience Design ni ningún otro módulo. Las once áreas siguen visibles también cuando sus lecciones están pendientes; diferencia recomendaciones de estudio de contenido que realmente puede abrirse.

Inventario actual: **11 áreas principales, 6 rutas con contenido, 110 conceptos y 5 perfiles**. Son valores derivados del árbol, los tracks y los perfiles, no constantes del diseño.

Los perfiles definidos en `src/data/career-paths.ts` son Frontend Engineer, Backend Engineer, Full Stack Engineer, DevOps Engineer y Artificial Intelligence Engineer. Cada uno contiene Fundamentos, Junior, Mid-Level, Mid-Level → Senior y Senior. Cada etapa combina un objetivo, áreas relacionadas y un hito práctico. `areaGuidance` aporta el enfoque de cada área y conocimientos previos útiles; sus etiquetas deben coincidir exactamente con las de `navigation.ts` para resolver los destinos.

La selección de perfil y etapa cambia las recomendaciones visibles con botones cuyo estado se comunica mediante `aria-pressed`. Actualmente se conserva mientras la página está cargada; no añade otra clave de localStorage. No conviertas los prerrequisitos orientativos en bloqueos de acceso, ni los hitos en certificaciones o promesas de contratación.

Después de Senior se presentan ramas de especialización técnica, liderazgo técnico y gestión/dirección. Analyst y Architect son especialidades posibles, no niveles obligatorios entre Senior y puestos directivos. Technical Lead describe una responsabilidad que puede coexistir con distintos niveles. Los títulos y recorridos varían por empresa: no impongas una escalera universal ni equipares un cargo con dominio de todas las áreas.

`careerSources`, en el mismo archivo de datos, conserva referencias primarias de MDN, Google Machine Learning, Google Site Reliability Engineering, SFIA y GitLab. Las recomendaciones son una síntesis editorial apoyada por esas fuentes; ninguna fuente certifica esta combinación exacta de etapas. Al cambiarlas, revisa las fuentes y los prerrequisitos además de los nombres.

`HomeOverview.astro` y `home.css` contienen la composición y los estilos de la portada. Reutilizan la paleta y las tipografías comunes. El rediseño de Home no autoriza cambiar la retícula de 48 px, los iconos o la persistencia del sidebar.

## 6. Arquitectura y comportamiento

| Archivo | Responsabilidad |
| --- | --- |
| `src/pages/index.astro` | Página única, fuentes, montaje de datos, tarjetas y diálogos |
| `src/styles/global.css` | Tokens, diseño compartido, estados y responsive |
| `src/styles/home.css` | Composición y adaptación responsive de Home |
| `src/components/HomeOverview.astro` | Portada, inventario derivado y recomendaciones profesionales |
| `src/components/NavigationTree.astro` | Árbol recursivo, enlaces y nodos sin contenido |
| `src/components/Icon.astro` | Catálogo tipado de iconos Lucide |
| `src/data/navigation.ts` | Taxonomía, nombres, iconos y destinos |
| `src/data/career-paths.ts` | Perfiles, etapas, orientación de áreas, prerrequisitos, ramas y fuentes |
| `src/data/curriculum.ts` | Tipos, contenido principal y fuentes |
| `src/data/system-design.ts` | Contenido de System Design |
| `src/data/applied-ai.ts` | Contenido y fuentes de Applied Artificial Intelligence |
| `src/scripts/app.ts` | Home/rutas hash, búsqueda, niveles, progreso, repaso, menú móvil y diálogos |
| `src/scripts/home.ts` | Selección de perfil y etapa, panel visible y estado accesible |
| `src/scripts/navigation.ts` | Restaurar y guardar el estado de ramas |
| `public/favicon.svg` | Favicon |
| `astro.config.mjs` | URL del sitio, salida estática y configuración Astro |

Astro 7.4, TypeScript estricto y CSS sin framework de componentes. No hay backend, API propia, login ni servicio de IA. Las dependencias Python que aparecieron en el material inicial eran contexto educativo; no son requisitos de ejecución.

La raíz y `#home` abren Home. Los módulos usan `#track-id/module-id`, por ejemplo `#ux-design/arquitectura-informacion`. Los hashes desconocidos vuelven a `#home`; los destinos internos de la portada permiten desplazarse a sus secciones. `#main` es el salto accesible al contenido y `#study` se conserva como ancla cuando se está en un módulo. Los modos actuales son Home, módulo y búsqueda; `routeMode` recuerda si la búsqueda se inició desde Home o desde un módulo. No hay rutas de exploración global ni de guardados.

La búsqueda es global, ignora mayúsculas y diacríticos, y acepta `/` o `Ctrl/Cmd + K` para enfocar el campo. El filtro por nivel se combina con la vista. Vaciar la búsqueda o pulsar «Limpiar filtros» restaura `routeMode`: Home si se inició allí, o el módulo seleccionado. «Lo entiendo» marca progreso; «Repasar conceptos» usa todas las tarjetas visibles del módulo o de los resultados, oculta la definición, prioriza pendientes y mezcla tarjetas. No hay un botón de repaso global ni un límite fijo de diez tarjetas.

### Persistencia local

| Clave | Forma y propósito |
| --- | --- |
| `tech-training:v1` | `{ "learned": ["concept-id", ...] }`: conceptos comprendidos |
| `tech-training:navigation:v1` | Array de IDs de ramas abiertas, calculados a partir de su ruta completa de etiquetas codificadas |

No se sincroniza entre dispositivos. Se validan IDs al leer. Si localStorage está bloqueado o contiene JSON inválido, la interfaz debe seguir funcionando. Menús cerrados en una primera visita sin estado; después se restaura cada rama, incluidos hijos abiertos dentro de padres cerrados. Se guarda con `toggle` y `pagehide`. Navegar a una lección no abre sus padres automáticamente.

Los IDs de conceptos y módulos deben ser únicos y estables; la selección de módulo también compara su ID por separado. Renombrar una etiqueta de rama cambia su clave de persistencia: considera compatibilidad al reorganizar el árbol.

## 7. Desarrollo y comprobación

Requiere Node.js **>=22.22.0** según `package.json`. El fallo histórico con 22.13.0 se resuelve usando una versión compatible. Instala con el lockfile:

```bash
npm ci
npm run dev
```

El script enlaza el servidor a `127.0.0.1`; usa la URL que imprime Astro, normalmente `http://127.0.0.1:4321/`. Reutiliza el servidor del proyecto si ya está activo.

```bash
npm run check
npm run build
npm run preview
```

No existe script `npm test`. `dist/` es generado, no se versiona. Para cambios solo de documentación no hace falta recompilar la aplicación.

Verifica según el alcance del cambio:

1. Tipos y build cuando cambie código, configuración o dependencias.
2. Raíz/`#home`, enlaces de módulo, anclas internas, navegación atrás y retorno al origen desde búsqueda vacía o «Limpiar filtros» si cambian rutas o filtros.
3. Progreso y estado de ramas tras recargar si cambian almacenamiento o navegación.
4. Fuente computada y carga de fuentes, no solo imports, si cambia tipografía.
5. Separación entre centros de filas, ancho, chevrons de varios niveles y textos completos si cambia el sidebar.
6. Escritorio de 1440 px y móvil de 390 px como referencias, menú abierto y subniveles incluidos.
7. Foco visible, teclado, diálogos, Escape y ausencia de errores de consola cuando cambien interacciones.
8. En Home, combinación de los cinco perfiles con sus etapas, recomendaciones y prerrequisitos, conteos derivados, enlaces disponibles y áreas pendientes sin enlaces ficticios. Comprueba también el repaso de resultados visibles después de buscar desde Home.

La revisión visual anterior a Home comprobó filas principales de 48 px, misma distancia entre centros desde la marca hasta la última área, chevrons alineados, fuentes correctas, móvil sin desbordamiento y sin errores de JavaScript. El rediseño de Home conservó esa retícula. La comprobación de la nueva portada validó sus 25 combinaciones de perfil y etapa, navegación Home/módulo/atrás y rutas desconocidas, búsqueda vacía y sin resultados, progreso tras recarga y repaso desde módulo y búsqueda. Se revisaron capturas a 1440 y 390 px y ausencia de desbordamiento horizontal a 1440, 1050, 900, 850, 640 y 390 px, además de apertura/cierre del menú móvil, Google Sans Flex computada y ausencia de errores de JavaScript. Las capturas se toman una vez terminada la transición del sidebar.

En el entorno original el visor automatizado llegó a fallar por BitLocker. La alternativa que funcionó fue Playwright con Chrome instalado, en un contexto de prueba independiente. No instales navegadores o dependencias sin comprobar primero las herramientas disponibles. Los scripts y capturas de esa comprobación eran temporales y no forman parte del proyecto.

## 8. GitHub y publicación

GitHub: https://github.com/CristoBits0101/tech-training. `origin` apunta a ese repositorio y `main` sigue `origin/main`. Comprueba estado y remoto antes de operar. Conserva cambios ajenos y no fuerces pushes para resolver divergencias.

La publicación actual es https://tech-training.active-map-0560.chatgpt.site/. La configuración de Sites está en `.openai/hosting.json`: conserva el `project_id` allí registrado y `static.directory: "dist"`. No crees otro sitio para actualizar este.

**Subir a GitHub y publicar en Sites son operaciones independientes.** No se ha configurado GitHub Actions para desplegar. En el ordenador original, `.sites-runtime/publish` es un checkout separado gestionado por Sites, excluido de GitHub; no es la fuente diaria de desarrollo.

Para publicar una modificación de la aplicación, usa el skill/flujo vigente de Sites: comprobar sitio y audiencia, abrir su fuente con el helper, sincronizar los archivos finales, comprobar/build, empaquetar la salida correspondiente al commit y guardar/desplegar esa versión. Conserva la audiencia pública existente. Las credenciales son efímeras y no se guardan en documentación, código ni comandos visibles. Espera a que termine el build antes de copiar `dist` o empaquetar; evita copias que creen `src/src` o dejen assets viejos mezclados.

Una modificación documental se puede versionar y subir a GitHub sin reconstruir ni republicar la web. No des por hecho que una orden de guardar documentación requiere alterar el sitio publicado.

## 9. Mantenimiento de esta memoria

Actualiza la guía y, si procede, el resumen de `AGENTS.md` cuando cambien decisiones de producto, fuentes, tokens, navegación, persistencia o despliegue. Mantén el README como entrada de instalación y uso. Distingue una nueva preferencia del usuario de una decisión técnica puntual y de un problema pendiente; no conviertas un defecto existente en un requisito.
