# Revisión de accesibilidad y legibilidad

Revisión local del 19 de octubre de 2026. Alcance: Home y sus 25 combinaciones de perfil y etapa. Los 17 módulos y sus 113 tarjetas. Búsqueda con resultados y vacía. Filtro de nivel. Navegación y menú móvil. Estados de foco, hover y selección.

## Criterios utilizados

- [WCAG 2.2 del W3C](https://www.w3.org/TR/WCAG22/), recomendación vigente consultada. Objetivo de trabajo: nivel AA. Contraste de texto normal de al menos 4,5:1. Contraste de indicadores necesarios de controles de al menos 3:1. Revisión de teclado, foco, reflujo, ampliación, espaciado y nombres accesibles.
- [Tipografía de USWDS](https://designsystem.digital.gov/components/typography/). Referencia de legibilidad: cuerpo de lectura de al menos 16 px efectivos. Tamaños menores reservados para información auxiliar breve. Alineación izquierda y longitud de línea limitada.
- [Redacción accesible del W3C WAI](https://www.w3.org/WAI/tips/writing/). Frases breves. Instrucciones concretas. Encabezados descriptivos y enlaces cuyo destino se entiende.
- [Objetivos de pulsación de WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). El mínimo AA es 24 × 24 CSS px con las excepciones del criterio. Los botones principales de esta interfaz usan al menos 44 px de altura. Los enlaces dentro del contenido conservan dimensiones adecuadas a su contexto.

WCAG no establece una familia tipográfica obligatoria ni un tamaño mínimo universal de texto. Los tamaños del sistema son decisiones de legibilidad. Una paleta tampoco cumple por sí sola: hay que comprobar cada combinación de primer plano, fondo y estado. Los bordes decorativos no tienen la misma función que los bordes necesarios para identificar un control.

## Decisiones aplicadas

- Se conservan Google Sans Flex y la marca IBM Plex Mono. Las fuentes se sirven localmente.
- Escala vigente por petición posterior del usuario en `rem`: títulos de 15 px/peso 500, subtítulos y controles de 14 px/peso 400 y texto y metadatos de 13 px/peso 300. La marca del sidebar queda como excepción a 20 px/peso 500. Estos tamaños crecen con la preferencia del navegador.
- Interlineado proporcional. Lectura alineada a la izquierda. Las tarjetas pasan a una columna cuando el ancho de lectura resulta insuficiente. No se reduce el cuerpo del texto en móvil.
- Los tonos secundarios de la paleta se oscurecen. Los controles usan `--control-border`. El foco general usa un contorno de 3 px. El buscador mantiene su borde y texto habituales, y usa un fondo `--surface-tinted` junto con el icono en `--green`; en colores forzados muestra el contorno del sistema. Los bordes decorativos de las tarjetas siguen siendo suaves.
- El enlace activo del sidebar se distingue por su color, peso y `aria-current`. Por petición posterior no lleva subrayado. El hover y los ancestros activos conservan texto e iconos sin fondo. Una rama abierta ajena a la ruta actual no se presenta como seleccionada.
- Buscador y selector mantienen la forma redondeada. La cabecera y el breadcrumb admiten varias líneas. La ruta permanece disponible en móvil.
- El menú móvil tiene botón de cierre visible. Tab recorre solo los elementos visibles. Escape y el botón de cierre devuelven el foco al botón de apertura. El contenido de fondo queda inerte mientras el menú está abierto.
- Se conserva la retícula de 48 px de navegación a tamaño normal. La fila crece cuando el texto ocupa más líneas o se amplía.
- El atajo de búsqueda utiliza Ctrl/Cmd + K. Se retira el atajo global de un solo carácter para evitar activaciones involuntarias con control por voz.
- «Saltar al contenido» mueve el foco sin sustituir la ruta del módulo. El módulo sigue disponible al recargar.
- Los nombres accesibles contienen el texto visible de cada acción. Búsqueda anuncia su contador con una región de estado. El progreso confirma exactamente si el concepto queda comprendido o pendiente.
- Tras la petición posterior de simplificar las fuentes, el enlace muestra la bombilla a la izquierda, el autor u organismo y un icono `Link2` de Lucide. No lleva subrayado ni radio en sus esquinas. Conserva el foco visible y el nombre accesible que identifica la fuente y avisa de la pestaña nueva.
- Home explica qué se puede hacer. Se retiran promesas de práctica que no corresponden a los controles visibles. Los estados vacíos indican cómo recuperar resultados.
- Se respetan movimiento reducido y colores forzados del sistema. `Highlight` se utiliza solo dentro de ese modo.

## Contrastes medidos

Fórmula de luminancia relativa de WCAG sobre los colores sRGB definidos en los tokens. Valores redondeados únicamente para mostrarlos.

| Uso | Combinación | Relación |
| --- | --- | --- |
| Explicaciones | `--text-secondary` / `--paper` | 7,49:1 |
| Navegación normal | `--text-soft` / `--sidebar` | 5,33:1 |
| Navegación activa y hover | `--ink` / `--sidebar` | 12,90:1 |
| Texto secundario sobre selección | `--text-soft` / `--surface-selected` | 4,80:1 |
| Controles sobre superficie suave | `--control-border` / `--surface-soft` | 5,40:1 |
| Énfasis del título de Home | `--accent-heading` / `--canvas` | 5,34:1 |
| Acción principal | `--paper` / `--green` | 7,76:1 |
| Acción principal en hover | `--paper` / `--accent-hover` | 5,65:1 |
| Texto de áreas deshabilitadas | `--disabled` / `--sidebar` | 4,58:1 |
| Contador de conceptos | `--text-count` / `--canvas` | 4,93:1 |

## Validación realizada

- Chrome mediante Playwright. Axe-core 4.11.0 cargado únicamente en el navegador de prueba. Sin dependencia nueva en la aplicación.
- 93 análisis de estados a 1440 y 320 px con las reglas WCAG A/AA hasta 2.2 y buenas prácticas de axe. Resultado final: ninguna infracción automática detectada.
- Todas las combinaciones de Home y todos los módulos en ambos anchos. Búsqueda, ausencia de resultados, filtro vacío, metodología desplegada y menú móvil abierto.
- Reflujo a 320 CSS px. Prueba adicional con texto al 200 % mediante tamaño raíz. Prueba con interlineado 1,5, espaciado de letras .12em, palabras .16em y separación de párrafos 2em. Sin desbordamiento horizontal en Home y SOLID en los escenarios comprobados. Los 320 CSS px representan el ancho disponible de una ventana de 1280 px ampliada al 400 %; no se ha utilizado el control de zoom del navegador para simularlo.
- Teclado: salto al contenido, atajo de búsqueda, cierre del diálogo, ciclo de foco del menú móvil, Escape y restauración del foco. Recarga y persistencia de «Lo entiendo».
- Fuentes cargadas y familias computadas. Todos los SVG de interfaz proceden de Lucide. Filas principales de 48 px. Padding uniforme de tarjetas y gap de la mitad del padding.
- Alineación de cabecera y contenido y ausencia de desbordamiento a 1920, 1440, 1250, 1050, 900, 850, 640, 390 y 320 px. Revisión visual de capturas de Home y SOLID en escritorio y móvil. Foco visible en colores forzados.
- `npm run check`: 17 archivos sin errores, advertencias ni sugerencias. `npm run build`: correcto. `git diff --check`: correcto.

Esta revisión técnica no es una certificación de conformidad completa. Las pruebas automáticas y de teclado no sustituyen sesiones con personas usuarias ni la comprobación con lectores de pantalla reales como NVDA y VoiceOver. No se han probado esos lectores en esta sesión. Los documentos externos enlazados no forman parte del alcance de la interfaz local.

Mantener estas comprobaciones cuando cambien tokens, componentes, estados o contenido. Las capturas y scripts de prueba son temporales y no se incluyen en el repositorio.

La auditoría de continuidad posterior recuperó el color exacto `#657357` del contador mediante un token propio. Ese color ya supera 4,5:1 sobre su fondo. No se modificaron los tonos de los demás componentes. Véase [SESSION_AUDIT.md](SESSION_AUDIT.md) para la relación entre cada petición y su decisión final.
