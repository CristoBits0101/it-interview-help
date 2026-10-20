# Memoria de producto, diseño y desarrollo

Estado documentado: **20 de octubre de 2026**. Lee también [AGENTS.md](../AGENTS.md). Las preferencias expresas del usuario se indican como tales; las medidas y limitaciones describen la implementación actual y no impiden cambios posteriores solicitados.

## 1. Propósito y preferencias

Tech Training es una web abierta para aprender fundamentos de tecnología y preparar pruebas técnicas. Prioriza conceptos claros, descripciones cortas y recuperación activa de lo aprendido. No es una aplicación de escritorio ni una plataforma que ejecute modelos de IA.

El usuario pidió un diseño profesional, moderno y minimalista, con especial cuidado por la simetría, márgenes y alineación. Los enlaces de navegación usan nombres completos en inglés y Title Case; las explicaciones y buena parte de los controles están en español. No traduzcas ni abrevies áreas de forma arbitraria. Las siglas propias de conceptos técnicos, como SQL, RPC o LLM, pueden formar parte de las lecciones.

La marca del sidebar es exactamente **Tech Training**. El usuario retiró el logo gráfico, el guion y el subtítulo «Un concepto. Un paso más.». También retiró el separador horizontal, la biblioteca de exploración/guardados y el pie de progreso. El borde vertical entre sidebar y contenido y las guías de indentación de los submenús siguen presentes. La nueva portada Home sustituye al antiguo hero y la franja de seis rutas. La etiqueta `Library` y el acceso al repaso rápido global también se eliminaron. Más adelante se retiró el botón de repaso de la cabecera de estudio; su código y diálogo se conservan.

## 2. Tipografía

| Uso | Familia y configuración actual |
| --- | --- |
| Interfaz completa, texto, controles y encabezados | `Google Sans Flex Variable`, fallback `sans-serif` |
| Marca del sidebar | `IBM Plex Mono`, fallback `monospace`; 500, 20 px |
| Títulos | `--font-title` / `--font-section: .9375rem` (15 px por defecto), peso 500 |
| Subtítulos y controles | `--font-small: .875rem` (14 px), peso 400; navegación con línea 24 px |
| Texto y metadatos | `--font-body` / `--font-meta: .8125rem` (13 px por defecto), peso 300 |

`src/pages/index.astro` importa `@fontsource-variable/google-sans-flex` y `@fontsource/ibm-plex-mono/500.css`. Las fuentes se incluyen en los assets de la web; no dependen de una petición a Google Fonts en ejecución. En `src/styles/tokens.css`, `--body` contiene Google Sans Flex, `--display` referencia `var(--body)` y `--brand` contiene IBM Plex Mono. Solo `.brand` usa `--brand` y peso 500. No declares familias distintas en componentes ni mezcles tipografías según la sección. Controles, diálogos y encabezados heredan la familia general.

Referencias pedidas por el usuario: [Google Sans Flex](https://fonts.google.com/specimen/Google+Sans+Flex) e [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono).

Error que no debe repetirse: antes se importaba Google Sans Flex pero `--body` seguía apuntando a Inter. No basta con instalar o importar la fuente: comprueba `getComputedStyle(element).fontFamily` en menú, contenido, inputs, select y botones, además de `document.fonts.ready` y la carga efectiva de la familia. Inter y Manrope ya no son dependencias.

La jerarquía tipográfica usa tamaños de 15, 14 y 13 px expresados en `rem` para respetar el tamaño de fuente del navegador: títulos a 15 px/peso 500, subtítulos y controles a 14 px/peso 400 y texto y metadatos a 13 px/peso 300. Por petición posterior, la marca del sidebar usa 20 px/peso 500, definido mediante `--font-brand`. WCAG no establece una familia tipográfica ni un tamaño mínimo universal. Las líneas de navegación usan proporciones que equivalen a 24 px a escala normal y crecen al ampliar el texto. No reduzcas el cuerpo de lectura en móvil.

## 3. Colores y superficies

`src/styles/tokens.css` es la única fuente de colores literales. Contiene 23 tonos de la gama verde, marfil y neutros; `global.css` y `home.css` consumen variables. Usa los tokens por función, no selecciones un tono nuevo para cada componente.

| Token | Valor | Función |
| --- | --- | --- |
| `--paper` | `#ffffff` | Tarjetas y superficies |
| `--canvas` | `#fcfcfa` | Fondo general y color del navegador |
| `--sidebar` | `#f4f5f0` | Fondo de navegación |
| `--ink` | `#252d29` | Texto principal |
| `--muted` | `#626b60` | Texto secundario neutro |
| `--line` | `#e5e8e0` | Bordes y divisiones |
| `--green` | `#285c45` | Acción principal, foco y favicon |
| `--lime` | `#d5edaf` | Selección de texto |
| `--text-secondary` | `#4c584a` | Texto secundario con mayor contraste |
| `--text-soft` | `#5d694f` | Etiquetas secundarias |
| `--text-count` | `#657357` | Color exacto solicitado para el contador |
| `--disabled` | `#697261` | Contenido no disponible |
| `--accent` | `#56754c` | Iconos y acentos secundarios |
| `--accent-strong` | `#31593b` | Texto seleccionado |
| `--accent-hover` | `#3b7252` | Hover de acciones principales |
| `--accent-heading` | `#587048` | Énfasis en el título de Home |
| `--surface-soft` | `#f5f7f0` | Fondos secundarios suaves |
| `--surface-tinted` | `#edf3e5` | Paneles y nivel Esencial |
| `--surface-hover` | `#e9ede3` | Hover de controles |
| `--surface-selected` | `#e3ecd9` | Selección y nivel Intermedio |
| `--border-soft` | `#d9dfd3` | Guías de árbol y bordes suaves |
| `--border-accent` | `#bacdab` | Bordes destacados |
| `--border-strong` | `#94ad7c` | Borde decorativo |

Los bordes necesarios para reconocer controles utilizan el alias `--control-border: var(--text-soft)`. Los bordes decorativos de tarjetas y separadores siguen siendo suaves. No deben usarse esos bordes decorativos como única indicación de foco o selección.

Estados de nivel:

| Nivel | Fondo | Texto |
| --- | --- | --- |
| Esencial | `--surface-tinted` | `--text-secondary` |
| Intermedio | `--surface-selected` | `--accent-strong` |
| Avanzado | `--green` | `--paper` |

No reintroduzcas azul o violeta para distinguir niveles. Conserva etiquetas y estados accesibles (`aria-current`, `aria-pressed`); el significado no debe depender únicamente del color.

Fuera de `tokens.css`, usa `var(...)` o `currentColor`. Sombras, fondos translúcidos y overlays se derivan con `color-mix()` de los tokens y `transparent`. En modo de colores forzados se permite el color de sistema `Highlight` para respetar la elección del usuario. No añadas hexadecimales, otros colores nombrados ni RGB/HSL literales en componentes, hojas de estilo, metadatos o scripts. Si hace falta ampliar la paleta, define y documenta el token en un único lugar. El favicon toma `--green` del archivo de tokens y `theme-color` toma `--canvas`; no mantienen copias de esos valores.

El CSS se organiza en capas `reset`, `base`, `layout`, `components` y `responsive`. Comprueba los valores computados, incluidos hover, selección y diálogos. No uses correcciones de color dispersas en la capa responsive como sustituto de los tokens comunes.

Tarjetas de concepto con borde de 1 px y radio de 11 px; filas del sidebar con radio completo (`9999px`); botones normalmente de 7 px. Por petición expresa del usuario, el sidebar no añade fondo en hover ni en estado activo. El hover, el enlace de la página actual y todos los desplegables que contienen ese enlace cambian el color del texto y los SVG de su propia fila (iconos y chevrons) a `--ink`. Las ramas abiertas ajenas a la ruta activa conservan sus colores normales cuando no tienen hover: estar abierto no es un estado de selección. Los ancestros se identifican mediante `:has(.navigation-link[aria-current='page'])`, sin abrir ramas ni modificar su persistencia. El texto normal usa `--text-soft`. Los SVG heredan el color de su propia fila, sin colorear las filas hijas. el enlace actual conserva `aria-current="page"` y peso 400. No lleva subrayado. Sobre el fondo del sidebar, el contraste calculado es 5,33:1 para el texto normal y 12,90:1 para hover y ruta activa. Se mantienen la retícula de 48 px, el padding simétrico de 12 px y la alineación de chevrons con inset de 12 px. Sombras y transiciones son discretas. Se respeta `prefers-reduced-motion`.

## 4. Espaciado y navegación visual

Preferencia general del usuario: separación visual simétrica y gaps iguales a la mitad del padding de su contenedor. Los pares compartidos se declaran en `tokens.css`:

| Ámbito | Padding o margen de referencia | Gap derivado |
| --- | --- | --- |
| Página base | `--space-page: 42px` | `--space-gap: calc(var(--space-page) / 2)` = 21 px |
| Página hasta 1250 px | 28 px | 14 px |
| Página hasta 640 px | 20 px | 10 px |
| Panel de Home | `--space-panel: 32px` | `--gap-panel` = 16 px |
| Tarjeta | `--space-card: 24px` | `--gap-card` = 12 px |
| Control | `--space-control: 16px` | `--gap-control` = 8 px |
| Elemento compacto | `--space-compact: 12px` | `--gap-compact` = 6 px |

Topbar y contenido principal comparten alineación horizontal y el mismo padding de página, incluso cuando el contenido alcanza su ancho máximo de 1500 px. La raíz de Home usa el padding de página y su gap derivado, la mitad de ese padding, entre sus bloques.

El buscador conserva el borde completamente redondeado (`9999px`). No muestra una etiqueta «Ctrl K» o «⌘ K», pero mantiene el atajo Ctrl/Cmd + K para enfocarlo. Al enfocarlo conserva el borde y el texto de lectura normales, aplica un fondo suave `--surface-tinted` y cambia el icono a `--green` con una transición breve. Al escribir, muestra un botón X de Lucide para borrar la consulta. El navegador no muestra su X nativa. La X usa los colores de la paleta y al hover o foco aparece sobre un círculo de 32 px con fondo `--surface-tinted` y borde `--border-strong`. En colores forzados se muestra el contorno del sistema. El texto y el placeholder usan `--font-small` (14 px), igual que los enlaces del sidebar. La auditoría de accesibilidad sustituyó el atajo de un solo carácter `/` por Ctrl/Cmd + K para no interferir con el control por voz.

El filtro de niveles es un control horizontal transparente y sin borde propio. Muestra el nivel entre flechas izquierda y derecha, sin desplegable. Mantiene el orden Todos los niveles, Esencial, Intermedio y Avanzado, pero solo incluye los niveles que tienen tarjetas filtrables en el módulo o resultados actuales. Si una búsqueda o navegación deja sin contenido el nivel seleccionado, vuelve a Todos los niveles. En los extremos desactiva la flecha que ya no tiene dirección disponible. Al pasar el ratón sobre una flecha habilitada, aparece un círculo de 24 px con relleno `--surface-tinted` y borde de 1 px `--border-strong`; el icono cambia a `--ink` y el área del botón permanece en 40 px. `.level-step-visual` contiene el borde circular y el SVG de 16 px en una misma caja sin padding con centrado grid. El chevron se compensa ópticamente 0.5 px hacia su punta en cada dirección. La caja se alinea al borde exterior del botón sin pseudoelementos ni grandes desplazamientos separados. El selector se alinea a la derecha también cuando ocupa una segunda fila en pantallas estrechas. El botón deshabilitado no recibe hover. Los botones tienen nombres accesibles y el nivel actual se anuncia al cambiar. Conserva el foco visible en escritorio y móvil.

Las páginas de estudio tienen una única fila sobre las tarjetas: contador dinámico de conceptos a la izquierda (`5 CONCEPTS`) y selector de niveles a la derecha, en la misma línea también en móvil con el tamaño de texto normal. Con texto ampliado pueden pasar a dos líneas para conservar toda la información. El contador usa `--body` (Google Sans Flex Variable), 13 px, peso 300, línea de 18 px, `--text-count` (`#657357`) y mayúsculas. Se retiraron de esa cabecera el área y número de módulo, el título visible, la descripción, el botón «Repasar conceptos», el punto decorativo y «At your pace». La ubicación se identifica mediante el breadcrumb; el título semántico de la sección se conserva solo para lectores de pantalla. El código y diálogo de repaso se conservan, sin acceso desde esta cabecera.

El final de las páginas de estudio muestra únicamente «Siguiente módulo», alineado a la derecha en escritorio y móvil y acompañado por una flecha `ArrowRight` de Lucide a 13 px, más pequeña que la flecha original de 18 px; no se utiliza un chevron. Se retiraron el consejo «Hazlo tuyo. Explica el concepto en voz alta, sin mirar la definición.» y el pie común con la marca, el lema y «Fuentes y recursos». El enlace sigue calculando su destino a partir de los módulos; no aparece en búsqueda ni cuando no hay conceptos visibles. Las fuentes primarias y el diálogo de fuentes se conservan, sin el acceso del pie retirado.

Las tarjetas de conceptos tienen padding uniforme en sus cuatro lados: 24 px de base, 28 px desde 1600 px y 20 px hasta 1050 px. La separación entre tarjetas y la barra de niveles usa la mitad del padding de la tarjeta: 12 px, 14 px o 10 px respectivamente. El gap se deriva en `.concept-grid` junto con el padding para que sus valores responsivos coincidan. Los gaps dentro de las filas de controles usan esa mitad. En los separadores de cabecera y pie y entre el bloque de descripción y fuente, la separación usa el padding completo. En el pie, el botón conserva su área pulsable y su contenido centrado, por lo que el padding que sigue al separador compensa ese centrado. La última petición exige igual altura en todas las tarjetas visibles de una cuadrícula, incluida la última fila. Se usa `grid-auto-rows: 1fr` y el bloque de descripción ocupa el espacio flexible. No hay altura fija ni recorte de texto. La fuente no usa margen automático. Esta decisión sustituye el anterior `align-self: start`, que producía alturas diferentes. Home adapta sus paneles, tarjetas y controles mediante overrides locales en container queries; conserva en cada ámbito la relación 2:1.

La cabecera de cada tarjeta muestra el número dentro de un círculo con borde, seguido inmediatamente por el título; el nivel queda a la derecha. Una línea separa esta cabecera de la descripción y conserva el padding completo por encima y por debajo. Los gaps entre número, título y nivel usan la mitad de ese padding. La etiqueta de nivel tiene fondo completamente redondeado (`9999px`) y conserva los colores de Esencial, Intermedio y Avanzado. Muestra únicamente el nombre del nivel, sin punto ni icono delante. La última petición del usuario retira el punto y sustituye la anterior que pedía conservarlo. No muestra borde al pasar el cursor. Los elementos de la cabecera se alinean verticalmente.

Desde el 20 de octubre de 2026, el pie de cada tarjeta muestra los botones «Explicación», «Caso de Uso» y «Ejemplo» a la izquierda y «Lo entiendo» al extremo derecho. Cada botón cambia únicamente el cuerpo de su tarjeta. Los apartados vacíos usan `disabled` y no reciben hover. El seleccionado usa `aria-pressed`, cursor normal y ningún cambio visual ni transición al pasar el ratón. La selección inicial es Explicación o el primer apartado con contenido. Cada botón referencia su panel mediante `aria-controls` y el cuerpo anuncia los cambios con `aria-live="polite"`. Los botones nativos permiten activación con teclado. En móvil el pie puede ocupar varias filas, pero «Lo entiendo» conserva su alineación a la derecha. No repitas la categoría.

Las tres filas número–título, bombilla–autor–enlace y check–«Lo entiendo» comparten `--gap-card`: 12 px de base, 14 px desde 1600 px y 10 px hasta 1050 px. Se deriva del padding de la tarjeta y sustituye los 6 px compactos fijos de fuente y botón. La fuente usa `--gap-card` como padding interior. «Lo entiendo» lo usa a la izquierda y su mitad verticalmente, sin padding derecho, conservando un área pulsable de al menos 44 px y la compensación vertical del pie. Los tres botones de vista usan el mismo gap y una altura mínima de 44 px.

Igualar gaps no alinea el texto si los elementos anteriores tienen distinto ancho. Título y autor comienzan en una misma columna. Bombilla y check miden 20 px. `--card-number-size` deriva de `20px + --gap-card`, con diámetros de 32/34/30 px según el breakpoint. Título y autor empiezan en `20px + 2 × --gap-card` desde el borde interior de la tarjeta. La raya de la fuente es una sombra interior de 2 px que no consume ancho de layout. No compenses esta columna con márgenes fijos que solo coincidan en un breakpoint. La petición del 20 de octubre mueve «Lo entiendo» a la derecha y sustituye su anterior alineación en esa columna.

Al sobrescribir una variable de espacio en un contenedor o breakpoint, vuelve a declarar allí su gap como `calc(var(--space-...) / 2)`. Una variable derivada heredada puede haberse resuelto con el valor del ancestro; no presupongas que cambiar solo el padding local recalcula el gap. Mantén juntos ambos tokens y comprueba sus píxeles computados. Bordes, radios, alturas de controles y pequeños ajustes de línea no son gaps estructurales.

La descripción de cada tarjeta ocupa un único párrafo sin listas y un máximo de tres líneas a tamaño normal desde 320 px. Usa todo el ancho interior de la tarjeta, sin un límite de ancho que cree margen derecho. Las respuestas son resumidas de una o dos frases y se justifican con la última línea alineada al inicio. Declara `overflow-wrap: normal`, `word-break: normal` y `hyphens: none` para conservar las palabras completas. No se corta el contenido con `line-clamp`, altura fija, overflow oculto ni puntos suspensivos. Al ampliar la fuente se permite que el texto ocupe más líneas para mantener la lectura completa. La separación entre el bloque de descripción y el enlace de fuente usa `--space-card`, igual al padding interior y al espacio junto a los separadores, no `--gap-card`. Son 24 px de base, 28 px desde 1600 px y 20 px hasta 1050 px. El párrafo no añade otro margen que duplique esa separación.

La navegación conserva una retícula propia de filas; no apliques gaps adicionales que alteren su ritmo.

En el sidebar se corrigió un problema concreto: sumar gap + padding + márgenes daba separaciones distintas entre marca, subtítulo y desplegables. La implementación actual usa una **retícula uniforme de filas**, sin separación vertical adicional entre cajas:

| Propiedad | Valor actual |
| --- | --- |
| Ancho del sidebar | 332 px; móvil `min(332px, 100vw)` |
| Padding exterior | 16 px en los cuatro lados |
| Marca | `min-height: 48px`, texto a 20 px, padding vertical/horizontal 9/18 px |
| Etiqueta y filas de navegación de todos los niveles | `min-height: 48px`, `line-height: 24px`, padding vertical de 12 px y horizontal de 18 px |
| Gaps/márgenes verticales entre filas | 0 |
| Padding horizontal de las filas | 18 px en ambos lados, alineado con el texto de la marca |
| Gap entre icono y texto | 9 px; mitad del padding horizontal |
| Separación interior desde la guía del árbol | 12 px |
| Indentación de cada árbol hijo | Margen izquierdo 24 px + padding izquierdo 12 px + guía de 1 px |
| Inset derecho de todas las filas | `--navigation-end-inset: 18px` |

La retícula mantiene 48 px entre centros de filas de una sola línea, incluidos marca y etiqueta. No significa que los trazos de fuentes de diferentes tamaños tengan exactamente el mismo espacio óptico. Los títulos largos de subniveles pueden ocupar más de una línea; no recortes contenido ni fuerces alturas que lo oculten. Los nombres principales permanecen en una línea cuando caben.

Los chevrons son de 14 px, con `margin-inline-start: auto` y centrado vertical. La indentación solo cambia la izquierda; añadir márgenes o padding derecho a cada subárbol rompe su columna común. Los iconos de área son de 18 px. `Icon.astro` centraliza Lucide con trazo 1.65 y SVG decorativos `aria-hidden`.

Los contenedores mantienen lados opuestos iguales. El padding horizontal puede duplicar el vertical; el gap siempre es la mitad del padding que lo define. En el header, página/gap es 42/21 px, y en las filas del sidebar el padding horizontal/vertical es 24/12 px con gap 12 px. Revisa las sumas de margin, padding y gap para no duplicar separaciones. Verifica medidas reales y captura visual, no solo números del CSS.

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

Todos los pictogramas se obtienen de `lucide-astro` mediante `Icon.astro`, también los puntos decorativos (`Circle`, relleno para `dot`) y el favicon (`CodeXml`). No añadas SVG dibujados a mano, iconos hechos con CSS, emojis ni caracteres usados como sustitutos de iconos. Los números de etapas, signos de puntuación y flechas dentro de explicaciones técnicas siguen siendo texto. Los contenedores, bordes y conectores de layout se pueden construir con CSS. Los títulos usan mayúscula tras separadores y las descripciones de tarjetas no usan flechas ni guiones explicativos.

`src/pages/favicon.svg.ts` prerenderiza `/favicon.svg` con AstroContainer y el componente `Icon`; devuelve SVG sin wrapper HTML. No recrees `public/favicon.svg` ni copies geometría de la biblioteca a un asset manual. Al sincronizar una copia antigua del sitio, elimina aquel asset obsoleto para que no compita con el endpoint.

### Responsive

El sidebar es fijo en escritorio. A 850 px o menos pasa a un panel móvil con backdrop, control de foco, `inert`, cierre con Escape y cierre al navegar. Las tarjetas pasan a una columna cuando su contenedor mide 44rem o menos. Esta condición también responde al tamaño de fuente del navegador. Hay ajustes adicionales en 1050, 1250 y 1600 px. Conserva la navegación accesible y verifica ausencia de desbordamiento horizontal, también con submenús abiertos.

## 5. Taxonomía y contenido

El árbol completo y su orden se definen en `src/data/navigation.ts`. Las once áreas principales aparecen en el mismo orden que la tabla de iconos. Las áreas y ramas sin contenido permanecen visibles como filas deshabilitadas. Sus descendientes se conservan en los datos y aparecerán cuando la rama tenga contenido disponible.

Por petición del usuario, dentro de Software Development aparece primero Frontend Development y después Backend Development.

`NavigationTree.astro` distingue:

- Rama con alguna hoja descendiente con `href`: `details`/`summary` nativos, desplegable. La disponibilidad se comprueba recursivamente en todos los niveles.
- Rama sin ninguna hoja descendiente con `href`: `span` con `aria-disabled="true"` y chevron cerrado. No puede abrirse con ratón ni teclado y no entra en el orden de tabulación. Texto e iconos usan `--disabled`, igual que las hojas sin destino y sin cambio en hover.
- Hoja con `href`: enlace a un módulo existente.
- Hoja sin `href`: `span` con `aria-disabled="true"`, visible y no clicable.

Esta petición del 19 de octubre de 2026 sustituye la decisión anterior de mantener operables todas las ramas con hijos aunque no tuvieran lecciones. Al añadir un destino válido a cualquiera de sus hojas se habilitan automáticamente sus antecesoras.

El árbol amplio sustituye al antiguo sidebar de solo seis rutas. El catálogo fuente conserva seis rutas con lecciones. La disponibilidad visible en la aplicación quedó limitada posteriormente a Software Design. Las otras rutas no se renderizan como páginas ni tienen enlaces activos. Este es el orden de su catálogo fuente:

| Ruta | ID | Conceptos actuales | Ubicación en el árbol |
| --- | --- | ---: | --- |
| User Experience Design | `ux-design` | 6 | Human-Computer Interaction |
| Software Design | `software-design` | 18 | Software Engineering |
| Software Architecture | `software-architecture` | 5 | Software Engineering |
| Distributed Systems | `distributed-systems` | 40 | Computer Systems |
| System Design | `system-design` | 12 | Software Engineering |
| Applied Artificial Intelligence | `applied-ai` | 32 | Artificial Intelligence |

Total actual en el catálogo fuente: 113 conceptos. La interfaz disponible muestra Home y Software Design con 18 conceptos en cuatro páginas: SOLID Principles, Creational, Structural y Behavioral. Las recomendaciones de Home conservan el mapa profesional y muestran las rutas excluidas como no disponibles. El diálogo histórico de fuentes se limita a las referencias de Software Design. `Information Architecture` y `User Experience Design` apuntan actualmente al mismo módulo en el catálogo; no dupliques sus conceptos solo para crear dos destinos. Sistemas distribuidos y diseño de sistemas son áreas distintas, no una debe absorber la otra.

Modelo: `Track` contiene módulos; cada `Module` contiene conceptos. Un `Concept` tiene `id`, `title`, `description`, `source` y `level` (`Esencial`, `Intermedio` o `Avanzado`). `description` contiene la Explicación en un único párrafo. `useCase` y `example` son campos opcionales para los otros dos botones; si faltan o solo tienen espacios, sus botones quedan deshabilitados. Los 18 conceptos publicados solo tienen explicación. No se añade contenido para habilitar controles por iniciativa del agente. `source` es obligatorio y referencia un autor u organismo con título y URL en `src/data/concept-sources.ts`. `details` y `memory` son históricos y no se renderizan. Búsqueda y repaso leen explícitamente el panel de explicación para no variar al cambiar de vista. Los archivos de datos son la fuente de verdad, no el HTML compilado.

En los títulos de las tarjetas, la palabra que sigue a un separador tipográfico como `·` o `/` empieza con mayúscula: `O · Abierto / Cerrado`, `RPC · Llamada remota` y `Delay · Retardo`. Esta convención no altera los IDs ni las notaciones técnicas, como `Precision@k`.

Por petición del usuario del 19 de octubre de 2026, las tarjetas no incluyen el desplegable «Un ejemplo». Posteriormente pidió sustituir la ayuda para recordar por una fuente verificable y simplificar su presentación. El enlace muestra la bombilla a la izquierda, el nombre del autor u organismo y un único icono de cadena `Link2` de Lucide a la derecha. No muestra la etiqueta visible «Fuente original» ni otro icono de enlace. El bloque no tiene esquinas redondeadas. El texto no tiene subrayado, tampoco en hover. Toda la zona sigue siendo un enlace y sus iconos y texto cambian de color juntos en hover. Abre una pestaña nueva con `noopener noreferrer` y anuncia esa acción mediante su nombre accesible. El título del documento se conserva en `title`. Todas las tarjetas incluyen el enlace y el repaso reutiliza el mismo contenido y fuente.

La pauta editorial del 19 de octubre de 2026 exige respuestas más simples y resumidas para una entrevista técnica. La vista Explicación presenta un único párrafo de una o dos frases con un máximo de tres líneas a tamaño normal en los anchos soportados. El texto se justifica, su última línea queda alineada al inicio y las palabras no se dividen. Explica lo esencial de forma directa y profesional. Debe entenderse al escucharla una vez tanto por selección de personal IT como por el equipo técnico. Conserva el significado técnico sin añadir detalles secundarios ni repetir el título cuando no aporta información. Cada oración termina con punto. En las descripciones no se usan comas, punto y coma, dos puntos, guiones explicativos ni flechas. Reformula la frase en lugar de retirar puntuación mecánicamente. No mezcles ejemplos ni eslóganes de recuerdo en la explicación; los ejemplos tienen su apartado opcional desde la petición del 20 de octubre. Las 18 explicaciones publicadas de SOLID y Design Patterns siguen este formato.

Los 113 conceptos se revisaron con fuentes primarias o documentación del organismo responsable. Se aclararon especialmente SRP y LSP, el alcance de Singleton, la diferencia entre Factory Method y Simple Factory, CAP frente a ACID, los límites de RAG y la distinción entre respaldo documental y verdad. Los títulos de escalado vertical y horizontal ya no se asocian respectivamente a RDBMS y NoSQL porque ambas estrategias pueden aplicarse a distintos modelos de datos. Se conservaron los IDs y el progreso.

Las referencias apuntan al concepto específico. Para los patrones se usa el texto original de GoF conservado por UNC y el extracto de Adapter publicado por Addison-Wesley. SOLID enlaza a Martin y a Liskov y Wing. Otras referencias incluyen IETF, W3C, NASA, NIST, los proyectos Apache, documentación de los proveedores y artículos originales de investigación. Una institución no es una garantía absoluta: comprueba que el pasaje respalda la explicación y vuelve a revisar las referencias cuando cambie el contenido. No presentes una fuente como «la mejor del mundo» mediante una clasificación no verificable.

Ese mismo día, el usuario pidió integrar los patrones de `C:\Workspace\design-pattern-practices` en Software Design. Esta área muestra `SOLID Principles` y el desplegable `Design Patterns`, que contiene las subpáginas `Creational`, `Structural` y `Behavioral`. El usuario retiró expresamente el módulo de APIs REST y sus cinco conceptos; no se muestran en navegación, búsqueda ni repaso. Su `href` de área sigue apuntando a SOLID para las recomendaciones y las tarjetas de Home; el sidebar renderiza sus hijos. Se mantienen los IDs `solid`, `patrones` y los IDs de los conceptos conservados para mantener enlaces y progreso. Creational conserva el ID y la ruta anteriores `patrones`; las otras páginas usan `patrones-estructurales` y `patrones-comportamiento`.

`src/data/design-patterns.ts` reúne 13 patrones: Facade, Adapter, Iterator, Factory, Builder, Prototype, Strategy, Decorator, Observer, Singleton, State, Mediator y Visitor. `designPatternPages` los distribuye en las categorías GoF: Creational (Factory, Builder, Prototype y Singleton), Structural (Facade, Adapter y Decorator) y Behavioral (Iterator, Strategy, Observer, State, Mediator y Visitor). Cada tarjeta de patrones muestra el nombre y la explicación conceptual con su fuente, además del nivel y el control de progreso compartidos. No incorpora ejemplos ni frases de recuerdo. Búsqueda y repaso utilizan el mismo párrafo completo de la tarjeta.

Los patrones se ordenan de Esencial a Intermedio y Avanzado, según las abstracciones y la coordinación necesarias para comprenderlos. Por petición expresa del usuario, SOLID sigue el orden de su sigla: S (01), O (02), L (03), I (04) y D (05), independientemente del nivel de dificultad de cada principio. La dificultad de los patrones es una propuesta editorial de aprendizaje, no una clasificación universal. Las fuentes originales de GoF y Robert C. Martin se conservan en `sources`.

El inventario se contrastó con el README y las carpetas Java del proyecto de prácticas. `visitor` no aparece en su README y su implementación es una estrategia de pago; la tarjeta explica Visitor mediante visitantes y doble despacho, sin reproducir esa confusión. `Factory` resume la idea general de fábrica y precisa que en Factory Method las subclases deciden el tipo creado. No equipares Simple Factory, la variante del proyecto de prácticas, con Factory Method. El proyecto de prácticas solo se consulta como referencia y no se modifica.

Para añadir contenido, actualiza el archivo de datos apropiado y el destino de navegación. Una nueva ruta también requiere revisar imports, `tracks` y `trackOrder` en `index.astro`. La portada recibe esos datos y deriva de ellos disponibilidad y conteos; no mantengas una segunda cifra manual. No alteres todo el layout como efecto secundario de añadir una lección.

### Home y orientación profesional

La raíz y `#home` muestran una portada propia: presenta el alcance de la aplicación, el inventario de áreas y conceptos, recomendaciones por perfil y etapa y opciones de desarrollo profesional. No debe abrir por defecto User Experience Design ni ningún otro módulo. Las once áreas siguen visibles también cuando sus lecciones están pendientes; diferencia recomendaciones de estudio de contenido que realmente puede abrirse.

Inventario actual: **11 áreas principales, 6 rutas con contenido, 113 conceptos y 5 perfiles**. Son valores derivados del árbol, los tracks y los perfiles, no constantes del diseño.

Los perfiles definidos en `src/data/career-paths.ts` son Frontend Engineer, Backend Engineer, Full Stack Engineer, DevOps Engineer y Artificial Intelligence Engineer. Cada uno contiene Fundamentos, Junior, Mid-Level, Mid-Level → Senior y Senior. Cada etapa combina un objetivo, áreas relacionadas y un hito práctico. `areaGuidance` aporta el enfoque de cada área y conocimientos previos útiles; sus etiquetas deben coincidir exactamente con las de `navigation.ts` para resolver los destinos.

La pauta de frases completas sin comas ni punto y coma también se aplica a los resúmenes y descripciones de las tarjetas de Home. Incluye el enfoque de áreas y los objetivos e hitos. La auditoría de continuidad completó esa reformulación sin alterar perfiles, etapas, áreas, prerrequisitos ni fuentes. Los nombres técnicos mantienen su notación.

La selección de perfil y etapa cambia las recomendaciones visibles con botones cuyo estado se comunica mediante `aria-pressed`. Actualmente se conserva mientras la página está cargada; no añade otra clave de localStorage. No conviertas los prerrequisitos orientativos en bloqueos de acceso, ni los hitos en certificaciones o promesas de contratación.

Después de Senior se presentan ramas de especialización técnica, liderazgo técnico y gestión/dirección. Analyst y Architect son especialidades posibles, no niveles obligatorios entre Senior y puestos directivos. Technical Lead describe una responsabilidad que puede coexistir con distintos niveles. Los títulos y recorridos varían por empresa: no impongas una escalera universal ni equipares un cargo con dominio de todas las áreas.

El objetivo de aprendizaje de Home utiliza el icono `Target` de Lucide como elemento decorativo. La bombilla se usa en los enlaces de fuente a petición posterior del usuario y permanece a la izquierda del nombre del autor.

`careerSources`, en el mismo archivo de datos, conserva referencias primarias de MDN, Google Machine Learning, Google Site Reliability Engineering, SFIA y GitLab. Las recomendaciones son una síntesis editorial apoyada por esas fuentes; ninguna fuente certifica esta combinación exacta de etapas. Al cambiarlas, revisa las fuentes y los prerrequisitos además de los nombres.

`HomeOverview.astro` y `home.css` contienen la composición y los estilos de la portada. Reutilizan la paleta y las tipografías comunes. El rediseño de Home no autoriza cambiar la retícula de 48 px, los iconos o la persistencia del sidebar.

## 6. Arquitectura y comportamiento

| Archivo | Responsabilidad |
| --- | --- |
| `src/pages/index.astro` | Página única, fuentes, montaje de datos, tarjetas y diálogos |
| `src/styles/tokens.css` | Única paleta literal, familias tipográficas y pares padding/gap |
| `src/styles/global.css` | Diseño compartido, estados y responsive; consume tokens |
| `src/styles/home.css` | Composición y adaptación responsive de Home |
| `src/components/HomeOverview.astro` | Portada, inventario derivado y recomendaciones profesionales |
| `src/components/NavigationTree.astro` | Árbol recursivo, enlaces y nodos sin contenido |
| `src/components/Icon.astro` | Catálogo tipado de iconos Lucide |
| `src/data/navigation.ts` | Taxonomía, nombres, iconos y destinos |
| `src/data/career-paths.ts` | Perfiles, etapas, orientación de áreas, prerrequisitos, ramas y fuentes |
| `src/data/curriculum.ts` | Tipos, contenido principal y fuentes |
| `src/data/design-patterns.ts` | Catálogo conceptual de patrones ordenado por dificultad |
| `src/data/concept-sources.ts` | Referencias específicas obligatorias de las tarjetas con autor, título y URL |
| `src/data/system-design.ts` | Contenido de System Design |
| `src/data/applied-ai.ts` | Contenido y fuentes de Applied Artificial Intelligence |
| `src/scripts/app.ts` | Home/rutas hash, búsqueda, niveles, progreso, repaso, menú móvil y diálogos |
| `src/scripts/home.ts` | Selección de perfil y etapa, panel visible y estado accesible |
| `src/scripts/navigation.ts` | Restaurar y guardar el estado de ramas |
| `src/pages/favicon.svg.ts` | Favicon estático generado desde Lucide y tokens de color |
| `astro.config.mjs` | URL del sitio, salida estática y configuración Astro |

Astro 7.4, TypeScript estricto y CSS sin framework de componentes. No hay backend, API propia, login ni servicio de IA. Las dependencias Python que aparecieron en el material inicial eran contexto educativo; no son requisitos de ejecución.

La raíz y `#home` abren Home. Los módulos usan `#track-id/module-id`, por ejemplo `#ux-design/arquitectura-informacion`. Los hashes desconocidos vuelven a `#home`; los destinos internos de la portada permiten desplazarse a sus secciones. El enlace «Saltar al contenido» usa `#main` como destino HTML de respaldo. Con JavaScript mueve el foco sin modificar la ruta. Una carga directa de `#main` se resuelve a Home. `#study` se conserva como ancla cuando se está en un módulo. Los modos actuales son Home, módulo y búsqueda; `routeMode` recuerda si la búsqueda se inició desde Home o desde un módulo. No hay rutas de exploración global ni de guardados.

El breadcrumb del header reproduce la jerarquía completa y las etiquetas exactas del sidebar: `Home / Artificial Intelligence / Applied Artificial Intelligence` o `Home / Software Engineering / Software Design / SOLID Principles`. No utiliza los títulos editoriales ni el `eyebrow` de los tracks, y evita duplicar una ruta en mayúsculas seguida por su mismo nombre. Resuelve el enlace por módulo o destino exacto y, para módulos sin enlace propio, utiliza el enlace de su ruta como hace la selección del sidebar. Obtiene los ancestros de las claves de rama ya derivadas de las etiquetas, sin modificar la persistencia ni abrir desplegables. La página actual lleva `aria-current="page"`. Todas las etiquetas tienen peso normal (400), incluida la página actual, que se renderiza como `span` sin negrita. Esta petición afecta al breadcrumb y no cambia el estado activo del sidebar. En Home solo se muestra Home; en búsqueda, `Home / Búsqueda`. Los separadores se ocultan a lectores de pantalla. Las etiquetas largas se distribuyen en varias líneas sin truncarlas. El breadcrumb también permanece visible en móvil. El header tiene altura adaptable y deja de ser fijo en móvil y ventanas de poca altura.

La búsqueda es global, ignora mayúsculas y diacríticos, y acepta `Ctrl/Cmd + K` para enfocar el campo. Las flechas del filtro de nivel mueven el estado actual y actualizan las tarjetas visibles. Volver a Home, abrir otro módulo o pulsar «Limpiar filtros» restablece Todos los niveles. Vaciar la búsqueda restaura `routeMode`: Home si se inició allí, o el módulo seleccionado. «Lo entiendo» marca progreso; «Repasar conceptos» usa todas las tarjetas visibles del módulo o de los resultados, oculta la definición, prioriza pendientes y mezcla tarjetas. No hay un botón de repaso global ni un límite fijo de diez tarjetas.

### Persistencia local

| Clave | Forma y propósito |
| --- | --- |
| `tech-training:v1` | `{ "learned": ["concept-id", ...] }`: conceptos comprendidos |
| `tech-training:navigation:v1` | Array de IDs de ramas abiertas, calculados a partir de su ruta completa de etiquetas codificadas |

No se sincroniza entre dispositivos. Se validan IDs al leer y se ignoran las ramas que ahora están deshabilitadas por no tener contenido. Si localStorage está bloqueado o contiene JSON inválido, la interfaz debe seguir funcionando. Menús cerrados en una primera visita sin estado; después se restaura cada rama disponible, incluidos hijos abiertos dentro de padres cerrados. Se guarda con `toggle` y `pagehide`. Navegar a una lección no abre sus padres automáticamente.

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
4. Fuente computada y carga efectiva de Google Sans Flex en menú, contenido y controles; IBM Plex Mono 500 solo en la marca. Comprueba `document.fonts.ready`, no solo imports.
5. Separación entre centros de filas, ancho, chevrons de varios niveles y textos completos si cambia el sidebar. Para otros contenedores, mide igualdad de padding en los cuatro lados, gap derivado y alineación topbar/contenido en sus breakpoints.
6. Escritorio de 1440 px y móvil de 390 px como referencias, menú abierto y subniveles incluidos.
7. Foco visible, teclado, diálogos, Escape y ausencia de errores de consola cuando cambien interacciones.
8. En Home, combinación de los cinco perfiles con sus etapas, recomendaciones y prerrequisitos, conteos derivados, enlaces disponibles y áreas pendientes sin enlaces ficticios. Comprueba también el repaso de resultados visibles después de buscar desde Home.
9. Procedencia Lucide de los SVG de interfaz y favicon, respuesta SVG válida y ausencia de geometría artesanal. Audita colores literales fuera de `tokens.css` y colores computados de niveles, hover, selección y diálogos.

La revisión visual anterior a Home comprobó filas principales de 48 px, misma distancia entre centros desde la marca hasta la última área, chevrons alineados, fuentes correctas, móvil sin desbordamiento y sin errores de JavaScript. El rediseño de Home conservó esa retícula. La comprobación de la nueva portada validó sus 25 combinaciones de perfil y etapa, navegación Home/módulo/atrás y rutas desconocidas, búsqueda vacía y sin resultados, progreso tras recarga y repaso desde módulo y búsqueda. Se revisaron capturas a 1440 y 390 px y ausencia de desbordamiento horizontal a 1440, 1050, 900, 850, 640 y 390 px, además de apertura/cierre del menú móvil, Google Sans Flex computada y ausencia de errores de JavaScript. Las capturas se toman una vez terminada la transición del sidebar.

La auditoría posterior de identidad visual validó `astro check` sobre 15 archivos sin errores y el build estático, incluido el favicon generado. En Chrome se comprobaron 582 SVG, todos de Lucide, y la carga y familias computadas de ambas fuentes. Se midieron 13 filas de navegación de 48 px, 12 chevrons alineados y centrados, y padding igual en los cuatro lados de las tarjetas de conceptos. A 1920, 1440, 1050, 900, 850, 640 y 390 px se verificaron alineación de topbar y contenido, gaps equivalentes a la mitad de su padding de referencia, ausencia de desbordamiento horizontal y ausencia de errores JavaScript.

La revisión editorial del 19 de octubre de 2026 comprobó los 113 conceptos y sus enlaces específicos. Los documentos respondieron correctamente y se verificaron los anclajes HTML y las páginas de los PDF enlazados. En Chrome se validaron las 17 vistas de módulo a 1440, 1050 y 390 px sin desbordamiento horizontal. Se comprobaron listas completas con punto final y sin la puntuación descartada, una fuente accesible por tarjeta, apertura en otra pestaña, hover de texto y bombilla, foco visible, Google Sans Flex y la relación entre padding y gap. Búsqueda por contenido de las listas, filtro de nivel, progreso tras recarga y el soporte de repaso conservado funcionaron correctamente. `astro check` sobre 17 archivos y el build estático finalizaron sin errores. Los scripts y capturas utilizados fueron temporales.

En el entorno original el visor automatizado llegó a fallar por BitLocker. La alternativa que funcionó fue Playwright con Chrome instalado, en un contexto de prueba independiente. No instales navegadores o dependencias sin comprobar primero las herramientas disponibles. Los scripts y capturas de esa comprobación eran temporales y no forman parte del proyecto.

La revisión de accesibilidad del 19 de octubre de 2026 está documentada en [ACCESSIBILITY_REVIEW.md](ACCESSIBILITY_REVIEW.md). Incluye 93 análisis automáticos sin incidencias finales, texto al 200 %, espaciado personalizado, reflujo a 320 px, teclado, menú móvil, fuentes y contrastes. Se corrigieron también el ciclo de foco del menú y la pérdida de la ruta al usar «Saltar al contenido». `npm run check` terminó sin errores, advertencias ni sugerencias y `npm run build` fue correcto. La revisión no sustituye pruebas con lectores de pantalla reales ni una certificación completa.

## 8. GitHub y publicación

GitHub: https://github.com/CristoBits0101/tech-training. `origin` apunta a ese repositorio y `main` sigue `origin/main`. Comprueba estado y remoto antes de operar. Conserva cambios ajenos y no fuerces pushes para resolver divergencias.

La publicación actual es https://tech-training.active-map-0560.chatgpt.site/. La configuración de Sites está en `.openai/hosting.json`: conserva el `project_id` allí registrado y `static.directory: "dist"`. No crees otro sitio para actualizar este.

**Subir a GitHub y publicar en Sites son operaciones independientes.** No se ha configurado GitHub Actions para desplegar. En el ordenador original, `.sites-runtime/publish` es un checkout separado gestionado por Sites, excluido de GitHub; no es la fuente diaria de desarrollo.

Para publicar una modificación de la aplicación, usa el skill/flujo vigente de Sites: comprobar sitio y audiencia, abrir su fuente con el helper, sincronizar los archivos finales, comprobar/build, empaquetar la salida correspondiente al commit y guardar/desplegar esa versión. Conserva la audiencia pública existente. Las credenciales son efímeras y no se guardan en documentación, código ni comandos visibles. Espera a que termine el build antes de copiar `dist` o empaquetar; evita copias que creen `src/src` o dejen assets viejos mezclados.

Una modificación documental se puede versionar y subir a GitHub sin reconstruir ni republicar la web. No des por hecho que una orden de guardar documentación requiere alterar el sitio publicado.

## 9. Mantenimiento de esta memoria

Consulta [la auditoría de la sesión](SESSION_AUDIT.md) para conocer la petición final que prevalece en cada detalle y las comprobaciones de continuidad. Actualiza la guía y, si procede, el resumen de `AGENTS.md` cuando cambien decisiones de producto, fuentes, tokens, navegación, persistencia o despliegue. Mantén el README como entrada de instalación y uso. Distingue una nueva preferencia del usuario de una decisión técnica puntual y de un problema pendiente; no conviertas un defecto existente en un requisito.
