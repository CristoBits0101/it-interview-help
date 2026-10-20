# Revisión de accesibilidad y legibilidad

## Actualización del 20 de octubre de 2026

Alcance actual: Home y cuatro páginas de Software Design con 18 conceptos. La revisión anterior de todo el catálogo se conserva debajo como historial.

### Referencias consultadas

- [WCAG 2.2, recomendación del W3C](https://www.w3.org/TR/WCAG22/): referencia normativa de trabajo AA. [WCAG 3.0](https://www.w3.org/TR/wcag-3.0/) figura como Working Draft del 10 de septiembre de 2026 y no se presenta como norma aprobada.
- [Tamaño mínimo de objetivos](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [reflujo](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) y [contraste no textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): mínimo AA de 24 × 24 px con excepciones, revisión a 320 CSS px y contraste de indicadores necesarios de al menos 3:1. El proyecto conserva controles principales de al menos 44 px de altura.
- [Guía cognitiva del W3C](https://www.w3.org/TR/coga-usable/): patrones familiares, controles reconocibles y relación clara entre acción y contenido. Es guía complementaria, no un criterio normativo adicional de WCAG.
- [Content switcher de Carbon](https://www.carbondesignsystem.com/building-blocks/core/components/content-switcher/guidelines): agrupación de vistas relacionadas, selección visible y estados diferenciados. Se aplica su organización visual con botones nativos y `aria-pressed`, sin afirmar que se usa la implementación de Carbon.
- [Mayer, 2017, Using multimedia for e-learning](https://onlinelibrary.wiley.com/doi/10.1111/jcal.12197): coherencia, señalización y segmentación para reducir procesamiento ajeno al objetivo. Aplicarlo a esta interfaz es una decisión de diseño informada; sus resultados sobre aprendizaje multimedia no prueban la eficacia concreta de este pie.
- [Roediger y Karpicke, 2006](https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/) y [Butler y Roediger, 2008](https://link.springer.com/article/10.3758/MC.36.3.604): evidencia experimental sobre recuperación y feedback. «Lo entiendo» conserva su función de autovaloración y no acredita dominio. Un cambio visual confirma una acción de interfaz, no sustituye feedback educativo correctivo.
- [Portfolio del usuario](https://cristobits0101.dev/): referencia visual solicitada para las proporciones de los botones. La medición de la web pública da 48 px de altura, padding de 12/24 px y radio CSS de `10rem` (160 px) para «Open CV» y «Cont@ct Me», con radio efectivo de 24 px por la altura. Es una preferencia estética, no una norma de accesibilidad. No se copian su tipografía ni su paleta.

### Decisiones aplicadas

- Pie con rejilla `minmax(0, 1fr) auto`, tamaños mínimos y container queries de cada tarjeta. Por debajo de 32 rem, vistas y comprensión ocupan filas separadas; por debajo de 18 rem las vistas forman una columna sin retirar el padding horizontal. El texto personalizado puede replegar opciones completas sin cortar palabras. No se oculta el overflow ni se fija la altura del contenido.
- Por referencia posterior al portfolio, las vistas conservan fondo suave con botones de altura mínima de `3rem` (48 px), padding vertical/horizontal de 12/24 px y radio de `1.5rem` (24 px). El grupo calcula un radio concéntrico de botón más inset de 4 px y borde de 1 px, equivalente a 29 px a tamaño normal. Sustituye los radios `9999px` del selector para conservar su curvatura al replegarse sin formar un óvalo grande. El seleccionado tiene superficie blanca y borde contrastado, además de estado accesible. Los apartados vacíos siguen usando `disabled`; el activo no cambia ni se anima al hover.
- «Lo entiendo» vuelve al check circular con texto sin fondo ni borde exterior, también al hover y en estado comprendido. Permanece a la derecha con padding izquierdo `--gap-card`, derecho 0, vertical de la mitad de `--gap-card` y objetivo mínimo de 44 px. El check marcado conserva su relleno y el estado accesible. Se mantiene el foco interior de 2 px en los controles del pie para que sea visible y no quede cortado por el grupo.
- El separador deja el padding completo hasta las superficies del pie. El grupo anidado usa padding de 4 px y gap de 2 px. Se retira el cálculo fijo de compensación de 11 px del antiguo pie de texto plano.
- Se conserva la gama de 23 colores. Contrastes calculados: lectura 7,49:1; fuente 5,40:1; vista seleccionada 7,76:1; texto deshabilitado 4,65:1; texto comprendido 8,01:1 sobre la tarjeta blanca tras retirar su fondo. El borde de selección usa `--control-border`, que supera 3:1. Los bordes suaves son decorativos y no la única señal de selección o foco.
- Se mantienen Google Sans Flex y la marca IBM Plex Mono, con tamaños 13/14/15 px y pesos 300/400/500. Encabezados pequeños con tracking normal y línea 1.4, sin la compresión heredada de títulos grandes. Se conserva la justificación solicitada para las explicaciones y su reflujo sin recorte.
- Radios compartidos 12/8/6 px para superficies, controles e interiores, con la excepción posterior de radios interior/exterior de 24/29 px a tamaño normal en el selector de vistas. El buscador y los niveles conservan sus radios completos. La fuente conserva sus esquinas cuadradas. Estadísticas de Home con separación real desde sus divisiones. La tarjeta cambia de borde al hover y no se eleva como si fuera un enlace. Se mantienen las preferencias de movimiento reducido y los colores forzados.
- No se añaden premios, presión temporal, adornos ni afirmaciones sobre una psicología universal del verde. Se priorizan agrupación, previsibilidad, legibilidad y foco en un concepto cada vez.

### Verificación y alcance

Revisión específica tras ajustar las proporciones al portfolio: Chrome a 1440, 390 y 320 px confirmó botones de 48 px, radio interior de 24 px y exterior de 29 px. Con texto al 200 % a 1920, 1440, 390 y 320 px no hubo desbordamiento. Las cajas del selector y «Lo entiendo» conservan 0 px de diferencia respecto a los extremos del separador. Se mantuvieron activo sin hover y apartados vacíos deshabilitados. Se inspeccionaron las capturas de 1440 y 320 px. `astro check` sobre 17 archivos terminó sin errores, avisos ni sugerencias y la compilación fue correcta. Este ajuste no incluye un nuevo análisis de axe.

Chrome: las cinco páginas disponibles a 1920, 1440, 1150, 1050, 850, 640, 390 y 320 px. Texto al 200 % a 1440, 390 y 320 px. Espaciado personalizado de letras, palabras, líneas y párrafos en Home, SOLID y Creational. Sin desbordamiento horizontal, texto de botones recortado ni controles fuera del pie. Inspección visual de tarjetas, Home y ambos estados de comprensión. Carga local de fuentes, tamaño y familia computados y SVG de Lucide revisados.

Seis análisis de axe-core 4.10.3 sobre Home, SOLID y Creational a 1440 y 320 px: ninguna infracción automática con las reglas A/AA hasta 2.2 y buenas prácticas. Foco comprobado con Tab real: contorno sólido de 2 px dentro del control. Estados de hover, movimiento reducido y colores forzados revisados. No se añadieron dependencias al proyecto. Las verificaciones automáticas y locales no constituyen una certificación completa de conformidad ni una validación experimental de aprendizaje.

## Historial de la revisión del 19 de octubre

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
