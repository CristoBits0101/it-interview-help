# Auditoría de peticiones y continuidad de la sesión

## 22 de octubre de 2026 — REST API sin Design

La hoja REST API Design pasa a llamarse REST API en inglés y API REST en español. Se mantiene dentro de API Design y no cambia su estado pendiente de contenido ni el resto de la jerarquía. La etiqueta de su rama superior conserva Design.

## 22 de octubre de 2026 — etiquetas de estilos sin redundancia

Se retira Architecture de las tres hojas: Monolithic, Microservices y Event-Driven. En español quedan Monolítica, Microservicios y Orientada a Eventos. La categoría superior ya aporta el contexto arquitectónico. Se mantienen el árbol y sus estados. Verificado ES/EN/ES y móvil a 320 px sin desbordamiento. Tipos y compilación correctos.

## 22 de octubre de 2026 — arquitectura visible en el aside

Se incorpora a Software Architecture la jerarquía Architectural Styles → REST, Monolithic Architecture, Microservices Architecture y Event-Driven Architecture y Architectural Patterns → MVC. Las dos categorías son desplegables y las hojas no tienen href hasta publicar su contenido. Se conservan REST API Design bajo Software Design → API Design y las páginas e IDs existentes. Todas las etiquetas nuevas se traducen al español y REST/MVC conservan sus siglas. La clasificación se contrasta con Microsoft Learn y la definición original de REST de Fielding, enlazadas en PROJECT_GUIDE.

Verificado en Chrome el árbol completo y sus traducciones durante ES/EN/ES, apertura y cierre con Enter y menú móvil a 320 px sin desbordamiento de página. Revisada captura de escritorio. Las cinco hojas permanecen deshabilitadas y no se añaden destinos vacíos. Tipos y compilación correctos.

## 22 de octubre de 2026 — API Design y REST API Design

Se añade dentro de Software Design el desplegable `API Design` con la hoja `REST API Design`, después de Design Patterns. Se traducen como `Diseño de API` y `Diseño de API REST`. La rama se puede abrir aunque no tenga páginas publicadas. La hoja permanece deshabilitada y sin href. Esta petición reincorpora únicamente estos niveles de navegación y no restaura el antiguo módulo REST ni sus conceptos.

Verificado en Chrome el árbol anidado y la alternancia ES/EN/ES, apertura con teclado y vista móvil a 320 px sin desbordamiento de página. Se conserva la marca fija y el scroll. Tipos y compilación correctos.

## 21 de octubre de 2026 — cobertura opaca de la cabecera del aside

El usuario pide que las filas que pasan por detrás de Tech Training no se vean, conservando el diseño del scroll. El fondo de la cabecera sticky ya cubría su propia caja pero dejaba visible el contenido en el padding superior. Se añade un pseudoelemento opaco que cubre también ese padding y los laterales. Sus offsets derivan de `--sidebar-padding`, compartida con el padding del aside. No añade espacio de layout, no intercepta clics y conserva el scroll vertical a toda altura.

Reproducido y comparado en Chrome con todas las ramas abiertas y scrollTop de 120 px. Las capturas muestran texto sobre la marca antes del ajuste y fondo limpio después. Verificado a 1440 y 320 px, incluido texto al 200 %. Se conservan los anchos de 423/320 px, el padding, la posición de la cabecera y el scrollbar de 10 px. El contenedor sigue de 0 a 900 px de altura y no hay desbordamiento de página. Tipos y compilación correctos.

## 21 de octubre de 2026 — títulos españoles sin duplicar nombres

La última petición sustituye la decisión de mantener siempre el título inglés. Con Español seleccionado, los 14 patrones muestran solo su nombre español. Con English seleccionado muestran solo el inglés. No se añade un segundo nombre tras `·`. Las equivalencias se centralizan en `translatePatternTitle` e incluyen `Fábrica Simple`, `Constructor`, `Instancia Única` y `Método de Fábrica`. Los datos e IDs conservan su forma original. `data-pattern-title` guarda el nombre inglés canónico y el motor actualiza el texto y `lang` de forma explícita. El HTML inicial también muestra español. El repaso y las etiquetas accesibles conservan el nombre visible y la búsqueda admite ambos idiomas.

Chrome comprobó los 14 nombres durante cinco alternancias ES/EN y tras recargar. Las búsquedas `Método de Fábrica` y `Factory Method` devuelven la misma tarjeta española y ocurre lo mismo con `Instancia Única` y `Singleton`. Las etiquetas de vistas y fuentes coinciden con cada título. Revisadas capturas a 1440 y 320 px sin desbordamiento. Se conserva Google Sans Flex. Tipos y compilación correctos.

## 21 de octubre de 2026 — títulos de patrones siempre en inglés

El usuario pide conservar los nombres de los patrones de diseño en inglés por ser su denominación natural para el estudio técnico. Se elimina la tabla de títulos bilingües del motor de traducción. Los títulos se toman de `src/data/design-patterns.ts` sin añadir equivalentes españoles tras `·`. Se marcan con `lang="en"` y `translate="no"` y el motor respeta esos atributos. El repaso mantiene también esa semántica. La búsqueda y los nombres accesibles usan el mismo título. Las categorías y explicaciones siguen el idioma seleccionado. Esta decisión sustituye la presentación bilingüe descrita en la revisión anterior.

Verificado en Chrome: los 14 títulos permanecen iguales durante cinco cambios consecutivos ES/EN y tras recargar. Se recorrieron Creational, Structural y Behavioral y se comprobaron las etiquetas de vistas y fuentes. Buscar `Factory Method` devuelve su tarjeta. Las explicaciones siguen cambiando de idioma. Se revisaron escritorio y móvil a 320 px sin desbordamiento y con Google Sans Flex. Tipos y compilación correctos.

## 21 de octubre de 2026 — desplegables sin bloqueo por contenido

El usuario retira el bloqueo de ramas sin contenido. Todas las ramas con hijos vuelven a ser `details`/`summary` operables con ratón y teclado y conservan su persistencia. Se renderizan sus descendientes aunque no tengan ninguna página disponible. Solo las hojas sin destino continúan deshabilitadas. Las páginas disponibles siguen siendo Home y Software Design. Esta petición sustituye la decisión anterior de desactivar ramas vacías y su comprobación recursiva de contenido.

Comprobado en Chrome: 14 desplegables operables y 45 hojas deshabilitadas. La primera visita mantiene todas las ramas cerradas. Mathematics abre con Enter y conserva su estado al recargar. Las 63 etiquetas se traducen en español e inglés. Con todos los subniveles abiertos no hay etiquetas partidas ni desbordamiento de página en escritorio. El ancho automático se ajusta a 423 px en español y 347 px en inglés. A 320 px funcionan abrir/cerrar ramas, el desplazamiento interno y el cierre móvil sin desbordamiento de página. Solo permanecen los cuatro enlaces de páginas publicadas. Tipos y compilación correctos.

El árbol completo exige más espacio al ampliar texto. Se añade el paso a panel plegable cuando el ancho del sidebar dejaría menos de 20 rem al contenido, además del umbral móvil de 850 px. Los estilos, backdrop y estado `inert` comparten esta decisión. Se comprobó ausencia de desbordamiento a 1024 y 851 px con texto al 100 % y 200 %.

## 21 de octubre de 2026 — ancho del aside y scroll a toda altura

El usuario pide ajustar el ancho al largo de las etiquetas sin saltos de línea ni texto oculto y colocar la barra vertical a toda altura junto al borde derecho. Se sustituye el ancho fijo de 332 px por una medición del contenido completo, incluidos los subniveles cerrados. La medición usa un clon temporal sin IDs que se retira síncronamente y no modifica la persistencia ni abre ramas reales. `--sidebar-width` coordina aside, workspace y toast. Se recalcula con idioma, fuentes, ampliación y espaciado. La navegación usa etiquetas de una sola línea sin elipsis. En móvil conserva un scroll horizontal interno cuando el ancho disponible es insuficiente. La barra vertical corresponde al aside completo sin margen derecho y la cabecera sticky conserva el cierre accesible.

Verificado en Chrome a 1440, 1024, 851, 390 y 320 px con español e inglés y subniveles abiertos. Se midieron 362 px en español y 326 px en inglés a tamaño normal sin desbordamiento de página. Las flechas mantienen el inset de 18 px. Se comprobó texto al 200 % y espaciado personalizado sin cortes ni wrap. A 900 px de altura, el contenedor del scroll mide exactamente de 0 a 900 px; la sección interior no tiene scroll vertical propio. El botón de cierre sigue visible y operable al final del scroll vertical y horizontal móvil. Revisadas capturas de escritorio y móvil. `npm run check` pasó sobre 18 archivos sin incidencias y `npm run build` terminó correctamente.

## 21 de octubre de 2026 — mayúsculas solo en palabras principales

Se corrige la capitalización de navegación, breadcrumb, etiquetas profesionales y títulos de fuentes. Las palabras de enlace quedan en minúscula salvo al inicio. Por ejemplo `Diseño de Software`, `Calidad del Software` y `Director of Engineering`. Se mantienen siglas y nombres propios.

## 21 de octubre de 2026 — foco del selector de idiomas

Se retiran el contorno exterior y la sombra de foco del selector de idiomas. El foco usa el fondo suave y el color de texto e icono. Se conserva el indicador del sistema en colores forzados.

## 21 de octubre de 2026 — selector nativo y fidelidad de traducción

El usuario señala pérdida de capitalización y formato y traducciones incompletas. Se sustituyen los botones ES / EN por un selector nativo Español / English. Se conserva Title Case en navegación y breadcrumb y las mayúsculas de etiquetas y contadores. El motor conserva el texto original de los nodos y atributos para evitar traducciones acumulativas. Las explicaciones españolas no se reformulan. Los títulos de patrones incluyen en español el nombre técnico y su traducción tal como se propuso antes de la aprobación inicial. Se completan metadatos, nombres accesibles de perfiles y marca, fuentes, autorías y anuncios de resultados y selección profesional. La búsqueda admite las etiquetas localizadas. Esta decisión sustituye la forma de control y las limitaciones de cobertura del primer selector. Verificación en Chrome: recorrido ES → EN → ES repetido conserva exactamente textos, títulos y estructura; sin cadenas españolas pendientes de traducción en el inventario de textos ingleses. Se comprobó búsqueda y anuncios en el idioma nuevo y persistencia al recargar la misma ruta. Reflujo a 320, 390 y 1440 px y texto al 200 % sin desbordamiento. Se evita partir títulos y etiquetas de nivel en móvil. Tipos y compilación correctos.

## 21 de octubre de 2026 — selector ES / EN

Se añade un selector compacto a la derecha del buscador en la cabecera. La preferencia se guarda en `tech-training:language:v1`; cambiar idioma conserva la ruta, filtros y progreso. El español es el idioma inicial. Se localizan la navegación, la interfaz y el contenido de Home y Software Design, incluidos los conceptos SOLID, los 14 patrones, orientación profesional, filtros, estados y etiquetas accesibles. Las equivalencias centrales viven en `src/scripts/i18n.ts`; conserva ambas versiones al editar texto visible.

## 21 de octubre de 2026 — conservar la explicación de Simple Factory

El usuario no autorizó reformular Simple Factory al añadir Factory Method. Se restaura literalmente su explicación anterior: «Devuelve un objeto según el argumento recibido con un método común de interfaz o clase abstracta.» Se conserva la tarjeta nueva de Factory Method. No reformules conceptos existentes como efecto secundario de añadir otro.

## 21 de octubre de 2026 — Factory Method independiente

Se añade Factory Method en Creational con ID `factory-method` y nivel Intermedio. Simple Factory conserva `factory` y su nivel Esencial. Se aclara su explicación y se corrige su fuente a la sección Simple Factory de Factory Comparison. Factory Method conserva la referencia específica en español. Creational muestra cinco tarjetas y el total pasa a 14 patrones y 19 conceptos con SOLID. No se añaden casos de uso ni implementaciones. Verificado en Chrome a 1440, 390 y 320 px. Comprobación de tipos y compilación correctas. El enlace de Simple Factory usa un fragmento de texto porque la sección no tiene un ID HTML.

## 20 de octubre de 2026 — etiqueta Implementación

El usuario confirma «Implementación» como nombre definitivo de la vista de código. Sustituye «Codificación» y conserva el ID `example`, los datos y la disponibilidad según contenido.

## 20 de octubre de 2026 — etiqueta Codificación

El botón «Ejemplo» pasa a llamarse «Codificación» para identificar la vista de código. Se conservan el ID `example`, sus datos y el estado deshabilitado cuando no hay contenido.

## 20 de octubre de 2026 — fuentes de Design Patterns

Por petición expresa del usuario, las 13 tarjetas de patrones muestran Refactoring.Guru y enlazan a la página específica de cada patrón en español. Factory conserva su ID y enlaza a Factory Method. Esta decisión sustituye las referencias anteriores de patrones a UNC y Addison-Wesley. SOLID conserva sus cinco referencias originales. No se modifican explicaciones, niveles, categorías ni progreso.

Se verificaron las 13 páginas de destino y los enlaces renderizados en Chrome en las tres categorías (4/3/6 tarjetas). A 390 px los nombres de fuente no desbordan. SOLID conserva sus cinco enlaces. `npm run check` sin errores, avisos ni sugerencias y `npm run build` correcto.

## 20 de octubre de 2026 — proporciones de botones del portfolio

El usuario considera demasiado ovalados los botones de vistas y pide usar como referencia [su portfolio](https://cristobits0101.dev/). La web pública confirma para «Open CV» y «Cont@ct Me» altura de 48 px, padding vertical/horizontal de 12/24 px y radio CSS de `10rem` (160 px), limitado geométricamente a 24 px por la altura. Se trasladan esas proporciones a los botones de vistas con altura mínima de `3rem`, padding de 12/24 px y radio de `1.5rem`. Se mantienen la familia y la paleta de Tech Training.

El radio del grupo se calcula de forma concéntrica como radio del botón más 4 px de inset y 1 px de borde, equivalente a 29 px a tamaño normal. Se conservan padding/gap del grupo de 4/2 px. Esta decisión sustituye los radios `9999px` del selector y de sus botones descritos más abajo, evitando que el contorno crezca como un óvalo al replegarse. Buscador y niveles conservan sus radios completos. El pie pasa a dos filas por debajo de 32 rem y las vistas a columna por debajo de 18 rem sin retirar el padding horizontal. Se mantienen los extremos del separador y el aspecto de «Lo entiendo».

Verificación específica en Chrome a 1440, 390 y 320 px: botones de 48 px, radios interior/exterior de 24/29 px y cajas a 0 px de los extremos del separador. Texto al 200 % a 1920, 1440, 390 y 320 px sin desbordamiento. Activo sin hover y apartados vacíos deshabilitados conservados. Capturas de 1440 y 320 px revisadas. `astro check` sobre 17 archivos sin errores, avisos ni sugerencias y compilación correcta. No se ejecutó un nuevo análisis de axe para este ajuste.

## 20 de octubre de 2026 — saliente tipográfico en el pie

La comparación de cajas no detectaba el saliente visible del último carácter. Con Google Sans Flex cargada a 14 px, «Lo entiendo» mide 74,998 px de avance y 75,654 px hasta el extremo derecho de la tinta según Canvas TextMetrics. La métrica estima un saliente de aproximadamente 0,656 px aunque su caja DOM coincida con el separador. La auditoría no reprodujo un desbordamiento de layout ni tinta rasterizada fuera a escala normal. Se añade `.05em` de padding al final de `.learn-label` para contener ese saliente sin modificar los extremos del pie ni añadir un margen estructural. Selector, fuente, cabecera y separadores conservan el ancho útil determinado por el padding de la tarjeta. Tras la compensación, Chrome a 1920, 1440, 390 y 320 px conserva las cajas a 0 px de los extremos y la métrica de tinta queda dentro. Se comprobó también texto al 200 %. Tipos y build correctos.

## 20 de octubre de 2026 — alineación exacta del pie

La petición más reciente retira el inset horizontal anterior. El pie conserva únicamente su padding superior. El inicio del selector y el extremo derecho de «Lo entiendo» deben coincidir con los extremos del separador sin excederlos ni quedar retranqueados. Se conserva el ancho natural del selector y su límite del 100 %. Esta decisión sustituye el margen interior descrito a continuación.

## 20 de octubre de 2026 — margen interior del pie

El ajuste de ancho del selector no resolvía la percepción indicada por el usuario. Se añade padding horizontal simétrico de `--gap-card` a `.card-footer`. El separador mantiene su ancho y los controles quedan dentro de sus extremos. «Lo entiendo» deja 12 px en escritorio base y 10 px en móvil respecto al extremo derecho del separador. Se conserva el padding superior completo. Revisado visualmente y medido en Chrome a 1440, 390 y 320 px y con texto al 200 % a 320 px sin desbordamientos.

## 20 de octubre de 2026 — ancho del selector en el pie

Tras la observación visual del usuario, el selector de vistas se ajusta al ancho de sus etiquetas con `width: fit-content` y `max-width: 100%`. Se elimina el estiramiento innecesario del grupo dentro de la columna del pie. El separador conserva el mismo ancho que el resto del contenido y «Lo entiendo» permanece a la derecha. Chrome a 1440, 390 y 320 px y texto al 200 % a 320 px: sin controles fuera del pie ni desbordamiento horizontal. Se conservan los radios completos y los estados deshabilitado y activo sin hover.

## 20 de octubre de 2026 — ajuste posterior de los controles del pie

La última petición es «Lo entiendo dejalo como estaba y los botones full rounded fondo y diseño». «Lo entiendo» recupera el check circular y el texto sin fondo ni borde exterior en estado normal, hover o seleccionado, conservando su posición a la derecha. Usa padding izquierdo `--gap-card`, derecho 0 y vertical de la mitad de `--gap-card`, objetivo mínimo de 44 px y foco visible. El check marcado conserva su relleno. Esta decisión sustituye la superficie secundaria añadida en la armonización anterior.

El selector de vistas conserva su fondo suave, la selección blanca y el borde contrastado. Tanto el grupo como sus botones interiores pasan a radio completo de `9999px`. No cambian la selección de paneles, la desactivación de apartados vacíos ni la ausencia de hover y transición en el apartado activo. La documentación recoge esta excepción a los radios generales de 8/6 px. Se conserva la separación completa tras el separador y la distribución adaptable del pie.

Revisión específica en Chrome a 1440, 390 y 320 px y con texto al 200 %: sin desbordamiento. Se confirmó la alineación de «Lo entiendo» al extremo derecho, su transparencia y ausencia de borde en todos los estados, el relleno del check marcado, los radios completos del selector y los estados activo y deshabilitado.

## 20 de octubre de 2026 — armonización del pie y revisión de UX/UI

Se investigaron WCAG 2.2, el estado de borrador de WCAG 3.0, la guía cognitiva del W3C, el selector de contenido de Carbon y publicaciones originales de Mayer y de Roediger y colaboradores. Se documentan fuentes y límites en [ACCESSIBILITY_REVIEW.md](ACCESSIBILITY_REVIEW.md). No se atribuye a los colores una mejora universal de aprendizaje.

El pie combina un selector agrupado de vistas y una acción de comprensión independiente. La selección tiene superficie y borde accesibles, permanece estática al hover y los apartados vacíos siguen deshabilitados. Los controles quedan dentro del separador, con objetivos de al menos 44 px. La tarjeta usa container queries para repartir el pie en una o dos filas y responder a texto ampliado. El padding tras el separador es completo; se retira la compensación fija de 11 px. Se mantienen los tonos de la paleta y la escala tipográfica, se normalizan radios y tracking y se retira la elevación de tarjetas no clicables. Home recupera distancia entre estadísticas y divisiones.

Verificación en Chrome de Home y las cuatro páginas disponibles a ocho anchos (320 a 1920 px), texto al 200 % a tres anchos y espaciado personalizado. No hubo desbordamiento ni controles fuera de los límites del pie. Seis análisis de axe 4.10.3 con reglas A/AA hasta WCAG 2.2 y buenas prácticas no detectaron infracciones automáticas. Se verificaron foco por teclado, activo sin hover, movimiento reducido y colores forzados. Estos resultados locales no equivalen a una certificación completa ni a un ensayo de eficacia de aprendizaje.

## 20 de octubre de 2026 — vistas en el pie de las tarjetas

El usuario pidió «Explicación», «Caso de Uso» y «Ejemplo» a la izquierda del pie y mover «Lo entiendo» a la derecha. Cada botón selecciona su panel dentro de esa tarjeta. Solo los apartados con contenido no vacío están habilitados; el seleccionado no cambia de aspecto ni tiene transición al hover. Los 18 conceptos actuales solo tienen explicación, así que los otros dos botones se muestran deshabilitados. No se añadieron casos ni ejemplos nuevos. La petición sustituye la anterior colocación de «Lo entiendo» a la izquierda y permite los ejemplos como vista opcional, sin recuperar el desplegable retirado.

Se añadieron `useCase` opcional y paneles asociados mediante `aria-controls`, con estado `aria-pressed` y anuncio de cambios. Búsqueda y repaso siguen leyendo la explicación estable. En Chrome se verificaron los estados iniciales de las 18 tarjetas, el salto de teclado sobre controles deshabilitados, ausencia de hover/transición en el activo, la independencia de cada tarjeta, búsqueda y persistencia del progreso. El cambio entre apartados con contenido se probó con datos temporales solo en el navegador. El pie se revisó a 1920, 1440, 1050, 390 y 320 px; conserva «Lo entiendo» a la derecha y permite dos filas en móvil sin desbordamiento.

## 19 de octubre de 2026 — categorías de Design Patterns

Por petición del usuario, el desplegable `Design Patterns` dentro de Software Design se divide en `Creational`, `Structural` y `Behavioral`. Sus páginas muestran 4, 3 y 6 conceptos y reutilizan las tarjetas, fuentes, búsqueda y progreso existentes. Se conserva la ruta `#software-design/patrones` como Creational y los IDs de conceptos para no perder enlaces ni progreso. La ruta de Software Design tiene ahora cuatro páginas: SOLID y las tres categorías.

Por petición posterior, los nombres de esas categorías quedan en inglés Title Case, coherentes con el resto del sidebar. Se comprobaron las tres rutas en Chrome: muestran 4, 3 y 6 tarjetas, marcan su enlace como activo y no generan errores de ejecución.

## 19 de octubre de 2026 — hover del selector de niveles

El círculo de hover mide 24 px y el botón conserva 40 px de área táctil. `.level-step-visual` reúne el borde circular y el SVG de 16 px y los centra mediante grid sin padding. Se alinea al borde exterior del botón. La última corrección añade un ajuste óptico de 0.5 px hacia la punta de cada chevron, ya que el usuario seguía percibiendo descentrado pese al centrado geométrico. Se pasó el cursor por ambas flechas en Chrome y se revisaron sus capturas ampliadas. El selector conserva su alineación al borde derecho y no hay desbordamiento horizontal.

Los gaps número–título, bombilla–autor–enlace y check–«Lo entiendo» se unificaron con `--gap-card`. Se verificaron 14 px para padding de tarjeta de 28 px, 12 px para 24 px y 10 px para 20 px. La fuente y el botón dejaron de usar el gap compacto fijo de 6 px; sus paddings también derivan de la escala de la tarjeta.

La siguiente revisión corrige el ancho anterior a los textos, que seguían en columnas distintas pese a compartir gap. Bombilla y check miden 20 px y el número mide `20px + --gap-card`. La raya de la fuente se dibuja sin consumir ancho. En Chrome, título, autor y «Lo entiendo» tienen coordenadas X idénticas a 1920, 1440, 1050, 390 y 320 px: no hay diferencia entre las tres columnas en ninguno de esos anchos. Se revisaron las tarjetas y ambos hovers a tamaño ampliado.

Fecha: 19 de octubre de 2026. Proyecto: `C:\Workspace\tech-training`.

Este documento contrasta las peticiones de la sesión con la implementación local. Complementa [PROJECT_GUIDE.md](PROJECT_GUIDE.md) y [ACCESSIBILITY_REVIEW.md](ACCESSIBILITY_REVIEW.md). [AGENTS.md](../AGENTS.md) obliga a consultarlo al continuar. Una petición posterior del usuario prevalece sobre esta memoria.

## Resultado y correcciones de esta auditoría

- Por petición posterior, la interfaz muestra únicamente Home y Software Design. Home informa 11 áreas y 5 perfiles; la ruta disponible contiene 18 conceptos en SOLID Principles y Design Patterns. Las demás lecciones se excluyen del montaje visible y sus destinos se retiran recursivamente del árbol de navegación y de las recomendaciones enlazables. El catálogo fuente se conserva para evitar perder el material.
- Se verificaron en Chrome los 17 módulos y las 113 tarjetas. Los 13 patrones coinciden con los directorios del repositorio de prácticas, incluido Visitor, que no aparece en su README.
- Se recuperó el color exacto del contador solicitado por el usuario. La revisión general de accesibilidad lo había oscurecido junto con otros textos. Ahora usa `--text-count: #657357`, con contraste 4,93:1 sobre `--canvas`. La paleta centralizada tiene 23 colores literales.
- Se sustituyó la bombilla decorativa del objetivo de Home por `Target` de Lucide. Una petición posterior simplificó los enlaces de fuente. La corrección más reciente recupera la bombilla a la izquierda del autor y pide esquinas cuadradas.
- Se completó la pauta editorial en Home. Sus tarjetas de orientación todavía conservaban descripciones con comas y punto y coma. Se reformularon como frases completas sin cambiar perfiles, etapas, áreas, prerrequisitos ni fuentes.
- Se incorporaron a AGENTS las reglas que estaban solo en la guía: breadcrumb, Frontend antes de Backend, radios completos, número y nivel en extremos opuestos y apariencia del nivel. La última petición retira el punto y conserva la ausencia de borde en hover del nivel.
- Se corrigieron dos explicaciones desactualizadas de la guía: la columna única depende del contenedor de 44rem y el salto al contenido conserva la ruta cuando JavaScript está activo.
- Las reglas que ya estaban implementadas se conservaron. No se ha sustituido el contenido por ejemplos ni reintroducido los elementos retirados.

## Peticiones y estado final

Las filas agrupan reiteraciones de una misma petición. «Verificado» se refiere al estado local y a las comprobaciones indicadas.

| Petición de la sesión | Decisión final que debe conservarse | Estado y evidencia |
| --- | --- | --- |
| Ejecutar Tech Training en Google | Utilizar Google Chrome y el servidor del proyecto. La URL local es `http://127.0.0.1:4321/` mientras ese servidor esté disponible. | Servidor accesible y aplicación recorrida en Google Chrome. `package.json` define `npm run dev`. No es una aplicación de escritorio. |
| Eliminar los desplegables de ejemplo de todas las tarjetas | Ninguna tarjeta muestra ejemplos ni recordatorios. Los campos históricos opcionales no se renderizan ni se indexan en la búsqueda. | Verificado: no existen `.concept-example` ni `.memory-line` en la página. Plantilla en `src/pages/index.astro`. |
| Una tarjeta por patrón del repositorio de prácticas | Mantener una tarjeta conceptual por cada uno de los 13 patrones de `C:\Workspace\design-pattern-practices`. Ese repositorio solo es una referencia de lectura. | Coincidencia exacta entre directorios de patrones y IDs de `src/data/design-patterns.ts`. |
| Software Design como desplegable con patrones y SOLID | Software Engineering → Software Design → SOLID Principles / Design Patterns. | Verificado en `src/data/navigation.ts` y en el DOM. Solo módulos `solid` y `patrones` en esta ruta. |
| Ordenar por dificultad | Los patrones se agrupan en Esencial → Intermedio → Avanzado con un orden pedagógico orientativo. | Verificado. No se presenta la dificultad como una clasificación universal. |
| No añadir Diseño de APIs REST a Software Design | El módulo rechazado permanece eliminado. El concepto REST existente en Software Architecture se conserva. | Verificado en los módulos renderizados. No confundir un módulo nuevo rechazado con un concepto de otra ruta. |
| Mostrar la subpágina en el header | Home seguido de los ancestros y la hoja activa del sidebar. | Las rutas de los 17 módulos coinciden con el enlace activo y sus ancestros. |
| Quitar la negrita de la página actual en el header | Todas las etiquetas del breadcrumb tienen peso normal (400). La página actual usa `span` y conserva `aria-current="page"`. | Se retiraron el elemento `strong` y el peso 600 del breadcrumb. El enlace activo del sidebar usa 14 px/400, sin subrayado, y mantiene `aria-current="page"`. |
| Quitar el subrayado del enlace activo | El enlace activo del sidebar no lleva subrayado. | Se retiró la decoración de texto. Conserva el color, el peso 400 y `aria-current="page"` para identificar el estado. |
| Ajustar el tamaño del texto del buscador | Texto y placeholder a 14 px con `--font-small`, igual que los enlaces del sidebar. | Corregido `src/styles/global.css`, que aplicaba el tamaño de lectura de 16 px. |
| Cambiar el desplegable de niveles por un slider | Mostrar el nivel actual entre flechas anterior y siguiente sin desplegable. Recorrer Todos los niveles, Esencial, Intermedio y Avanzado, sin fondo ni borde propios en el contenedor. | Los botones conservan los nombres accesibles, el anuncio del nivel y el filtrado. Se desactiva la flecha en cada extremo. El hover usa un círculo de 32 px con relleno `--surface-tinted`, borde de 1 px `--border-strong` e icono `--ink`, dentro del objetivo de 40 px. Sustituye el selector nativo anterior y el borde tipo cápsula solicitado para el selector antiguo. |
| Mantener solo las páginas Home y Software Design | Renderizar el módulo SOLID y Design Patterns. Las demás páginas de módulos dejan de mostrarse y sus rutas se desactivan en navegación y recomendaciones. | Comprobado en Chrome: Home, 2 módulos y 18 conceptos disponibles. Solo hay 2 enlaces activos en el sidebar; las rutas excluidas devuelven a Home. El listado del diálogo contiene solo las 18 fuentes de Software Design. Sin desbordamiento móvil ni errores de consola. `npm run check`, `npm run build` y `git diff --check` pasaron. Se conserva el catálogo fuente. |
| Utilizar nombres de enlaces y no títulos editoriales | Usar `SOLID Principles`, `Design Patterns` y las demás etiquetas del árbol. No usar «SOLID · cinco principios» como breadcrumb. | Verificado. Cuando una ruta tiene varios módulos sin hojas propias, se conserva su enlace del sidebar. No inventar un nivel editorial adicional. |
| Corregir el breadcrumb de Artificial Intelligence | Home / Artificial Intelligence / Applied Artificial Intelligence. | Verificado en todos los módulos de esa ruta. Sin repetir el título ni usar el eyebrow en mayúsculas. |
| Hover del sidebar completamente redondeado | Las filas conservan `border-radius: 9999px`. | Verificado por estilo computado. El radio no autoriza añadir un fondo al hover. |
| Hover solo de texto y no de fondo | Hover y activo colorean texto y SVG. El fondo de las filas permanece transparente. | Verificado en enlaces, selectores y página activa. `src/styles/global.css`. |
| Contraste suficiente entre normal, hover, activo y fondo | Texto normal del sidebar 5,33:1. Hover y activo 12,90:1 sobre el fondo del sidebar. | Contrastes registrados en ACCESSIBILITY_REVIEW. Se conserva la paleta verde. |
| Colorear también iconos y chevrons | Los SVG de la fila heredan su color al hacer hover o pertenecer a la ruta activa. | Verificado con colores computados. No colorear por herencia las filas hijas ajenas. |
| No colorear todas las ramas desplegadas | Solo la fila con hover, el enlace actual y sus ancestros activos se resaltan. | Verificado con Computer Systems abierto mientras SOLID está activo. Abrir no equivale a seleccionar. Mathematics ahora está deshabilitado por la petición posterior. |
| Desactivar desplegables sin subpáginas con contenido | Comprobar los descendientes recursivamente. Una rama sin ninguna hoja con destino aparece como una fila deshabilitada con chevron. No se abre ni recibe foco y sus iconos tienen el mismo color atenuado que el texto. | Verificado en Mathematics, Data Management, Cybersecurity, Data Science, Software Development y Machine Learning. Las cinco ramas con contenido siguen siendo operables. Sustituye la regla anterior que permitía desplegar ramas vacías. |
| Número, título y nivel en la cabecera de la tarjeta | Número dentro de un círculo con borde a la izquierda, título junto al número y nivel al extremo derecho. El grid usa gaps de la mitad del padding de la card. Los espacios visibles arriba y abajo de los separadores de cabecera y pie igualan el padding interior, compensando el centrado del botón. | Actualizado en plantilla y estilos; `npm run check` y `npm run build` pasan. |
| Quitar el punto / dejarlo / finalmente eliminarlo | Prevalece la última petición: mostrar solo el nombre del nivel, sin punto ni icono delante. | Se retiró el SVG de la plantilla compartida y su clase CSS. Sustituye la decisión previa que pedía conservarlo. |
| Añadir borde al hover / después quitarlo del nivel | La tarjeta cambia su borde al hacer hover. La etiqueta del nivel no añade borde. | Verificado: cambia el borde de la tarjeta y el borde del nivel sigue en 0 px al hacer hover. |
| Frontend antes de Backend | Dentro de Software Development: Frontend Development y luego Backend Development. | Verificado en los datos. La rama permanece deshabilitada mientras esas hojas no tengan contenido. No invertir por orden alfabético. |
| Buscador full rounded y atajo | Buscador con radio 9999px. El atajo Ctrl/Cmd + K se conserva sin mostrar la etiqueta de teclado. Al enfocar mantiene el borde y texto y aplica el fondo suave `--surface-tinted` y el icono `--green`; colores forzados muestran el contorno del sistema. | Se descartó la inversión de colores tras revisión visual del usuario. La etiqueta visual y su `kbd` se retiraron a petición posterior. El filtro de nivel ahora es un control de flechas sin fondo ni borde propios. |
| Escala tipográfica jerárquica | Títulos 15 px/500, subtítulos 14 px/400, textos 13 px/300. La marca del sidebar usa 20 px/500 según la petición más reciente. | Tokens, Home, tarjetas, controles y navegación se ajustaron a los roles. |
| Distancias simétricas y proporcionadas | En cada contenedor, lados opuestos iguales; horizontal puede duplicar vertical. Cada gap es la mitad del padding de referencia. El header usa 42/21 px y las filas del sidebar padding vertical/horizontal de 12/18 px, gap de 9 px e inset derecho de 18 px para alinear con la marca. La guía anidada usa indentación 24 px y separación 12 px. | Sidebar, header, tarjetas y Home alineados con la regla; gaps responsivos se vuelven a derivar al cambiar su padding. |
| Quitar la cabecera editorial de las páginas de estudio | Sin eyebrow, número de módulo, título visible, descripción, botón de repaso ni «At your pace». | Verificado. Los encabezados semánticos ocultos se conservan para accesibilidad. No son una cabecera visible. |
| Solo contador a la izquierda y filtro a la derecha | Contador y selector en una fila a tamaño normal. El texto ampliado puede necesitar reflujo. | Verificado a 1440, 390 y 320 px. |
| Tipografía y color exactos del contador | Google Sans Flex. 13 px. Peso 300 según la escala tipográfica actual. Línea de 18 px. Mayúsculas. `#657357` mediante `--text-count`. | Se amplió desde 11 px para ajustarlo a la escala vigente. Los tamaños se expresan con `rem` para admitir ampliación. |
| SOLID en orden S1 O2 L3 I4 D5 | Mantener S, O, L, I, D con números 01 a 05. | Verificado. Esta corrección posterior prevalece sobre ordenar esas cinco tarjetas por dificultad. |
| Eliminar «Hazlo tuyo» y el pie de marca y recursos | En el cierre del módulo solo queda «Siguiente módulo» a la derecha. | Verificado en los 17 módulos. No hay `.page-footer` ni acceso `#open-sources`. El diálogo sin acceso visible se conserva como soporte histórico. |
| Flecha discreta y no un signo menor que | Usar `ArrowRight` de Lucide a 13 px en «Siguiente módulo». | Verificado en todos los módulos. No sustituir por ChevronRight ni por un carácter de texto. |
| Mayúscula después de los separadores del título | Ejemplo de formato: `O · Abierto / Cerrado`. Conservar notaciones técnicas. | Comprobación de los 113 títulos sin casos pendientes tras separadores tipográficos. |
| Descripciones naturales sin comas, punto y coma ni guiones explicativos | Respuesta resumida de entrevista en un único párrafo de una o dos frases sin listas. Máximo tres líneas a tamaño normal desde 320 px. Explicar lo esencial de forma simple y profesional. Mantener oraciones completas terminadas en punto. | Las 18 respuestas se han resumido y medido en Chrome. Ocupan dos o tres líneas en los tamaños comprobados. Sin recortes ni puntos suspensivos. Se conservan las fuentes y los IDs. |
| Conceptos verídicos y pedagógicos | Explicar qué es el concepto, cómo funciona y cuáles son sus límites. Mantener el alcance y las matizaciones de las fuentes primarias. | Revisión editorial y de fuentes realizada en esta sesión. No presentar un texto como verdad absoluta ni convertir la dificultad orientativa en norma universal. |
| Enlace a la fuente original concreta | Toda la zona de fuente es un enlace a documentación oficial, estándar o publicación original. Incluye el autor u organismo. La petición posterior retira la bombilla. | 113 tarjetas y 113 enlaces de fuente. Sin destinos vacíos. Las anclas a secciones concretas son válidas. Las URL y el contenido fueron contrastados en la revisión editorial previa de esta misma sesión; esta auditoría volvió a comprobar la cobertura y estructura. |
| Presentación del enlace de fuente | La petición más reciente muestra la bombilla a la izquierda, el autor u organismo y un icono `Link2` a la derecha. Sin etiqueta «Fuente original», subrayado ni esquinas redondeadas. | Revisado en Chrome: bombilla, autor y cadena en una fila; las cuatro esquinas tienen radio 0. Plantilla compartida para las tarjetas y el repaso. Conserva las URL y el nombre accesible del documento y de la apertura en pestaña nueva. Esta decisión prevalece sobre la petición intermedia de quitar también la bombilla. |
| Revisar colores, tipografía, usabilidad, accesibilidad y redacción | Mantener los cambios y controles descritos en ACCESSIBILITY_REVIEW. No afirmar conformidad total basándose solo en una herramienta. | 93 análisis de estados sin infracciones automáticas finales en la revisión previa. Teclado, reflujo y texto ampliado comprobados. Sigue pendiente la validación con lectores de pantalla reales. |
| Guardar memoria para las siguientes sesiones | AGENTS apunta a la guía y a esta matriz. README enlaza ambas auditorías. | Documentación guardada en este repositorio. No depende del historial del chat. |

## Ajustes posteriores que no deben confundirse con olvidos

- La revisión de accesibilidad sustituyó el atajo global `/` por Ctrl/Cmd + K para evitar activaciones involuntarias por voz. Se conserva la forma redondeada solicitada para el indicador de teclado.
- En una revisión anterior se habían aumentado los tamaños de lectura a 16 px y los controles a 14 px. La petición posterior del 19 de octubre los sustituye por títulos de 15 px/500, subtítulos de 14 px/400 y textos de 13 px/300.
- La fila del contador se puede dividir con ampliación de texto. La cabecera también puede crecer. No forzar una altura que oculte información para reproducir la distribución a escala normal.
- El subrayado y el peso de la hoja activa son señales adicionales a su color. No añaden un fondo. Los ancestros activos y el hover conservan el comportamiento de color de la fila y sus SVG.
- Los encabezados ocultos, los campos históricos de ejemplo y el soporte de diálogos retirados no significan que esos elementos hayan vuelto a aparecer en las páginas.

## Cómo continuar en otra sesión

1. Confirmar `C:\Workspace\tech-training`, leer AGENTS, PROJECT_GUIDE y esta matriz y ejecutar `git status`. Conservar todos los cambios locales existentes. El repositorio de prácticas es una referencia distinta y no se edita como parte de Tech Training.
2. Aplicar la última decisión sobre cada detalle. Los niveles no llevan punto ni borde de hover. No ordenar SOLID por dificultad. No añadir módulos, ejemplos, cabeceras o pies retirados por iniciativa propia.
3. Editar las fuentes de `src/`. Mantener IDs de módulo y concepto. Derivar inventarios de los datos. Seguir usando los tokens compartidos y Lucide.
4. Si cambia un concepto, verificar de nuevo su explicación y el destino de su fuente primaria. Cada concepto nuevo debe tener una respuesta continua de entrevista en `description`, nivel e identificación de su fuente. No añadir listas ni ejemplos. No basta con comprobar que una URL responde: su contenido debe respaldar el concepto.
5. Si cambian navegación o estilos, revisar la ruta activa, las ramas abiertas ajenas, los iconos, los radios y los bordes. Comprobar escritorio y móvil con el menú abierto. Mantener la retícula de 48 px a tamaño normal y la relación de padding y gap.
6. Ejecutar `npm run check` y `npm run build` para cambios de código. Revisar el resultado en navegador. Para documentación solamente, verificar enlaces y `git diff --check`. No existe `npm test`. Reutilizar el servidor local cuando siga activo.
7. Mantener la limitación pendiente de accesibilidad hasta realizar pruebas con NVDA o VoiceOver. No darla por resuelta con axe ni con capturas. Los criterios, medidas y alcance están en ACCESSIBILITY_REVIEW.
8. Actualizar la guía y esta matriz cuando una petición cambie una decisión. Documentar qué decisión anterior queda sustituida y qué evidencia se comprobó. No marcar un punto como terminado si solo existe una propuesta.
9. Las modificaciones están guardadas localmente. Un cambio local, un commit, un push y una publicación son estados distintos. Esta auditoría no autoriza por sí sola a publicar ni a modificar el despliegue existente.

## Límites y seguimiento

Formato final de las descripciones: por petición del usuario se justifican con la última línea alineada al inicio. `overflow-wrap: normal`, `word-break: normal` e `hyphens: none` evitan partir palabras. Chrome confirmó los estilos computados y las 18 descripciones siguen en un máximo de tres líneas a 320 px. Revisión visual a 1440 y 390 px. `git diff --check` pasó.

Último ajuste de altura y redacción: todas las tarjetas visibles de cada cuadrícula tienen la misma altura, incluida la última fila, mediante `grid-auto-rows: 1fr` y una descripción flexible. Sustituye el anterior `align-self: start`. Las 18 explicaciones se han resumido a una o dos frases profesionales y comprensibles. En Chrome se midieron SOLID y Design Patterns a 1920, 1440, 1150, 1050, 850, 640, 390 y 320 px. Todas las descripciones ocupan como máximo tres líneas a tamaño normal y las alturas son iguales dentro de cada módulo. La separación entre el bloque de descripción y la fuente conserva el padding completo. No hay desbordamiento horizontal. Con texto al 200 % se permite reflujo sin recortar contenido. La búsqueda por «intercambiar algoritmos» devuelve Strategy. Revisión visual en escritorio y móvil, tipos y compilación correctos.

Corrección posterior de espaciado: descripción y fuente se separan con el padding completo de la tarjeta. Se retiró el margen automático de la fuente y el estiramiento de las tarjetas para evitar espacios extra en las respuestas cortas. En Chrome se midieron las 18 tarjetas a 1920, 1440, 1050 y 390 px. La separación descripción/fuente coincide con la separación junto a los separadores y con el padding: 28, 24, 20 y 20 px respectivamente. Sin desbordamiento horizontal. Se revisaron capturas de State en escritorio y móvil. Tipos y compilación correctos.

Actualización editorial posterior del 19 de octubre de 2026: las 18 tarjetas publicadas presentan una respuesta continua de entrevista en un único párrafo. Se contrastaron las explicaciones con las fuentes originales enlazadas. Se comprobaron en Chrome SOLID y Design Patterns a 1440 y 390 px sin desbordamiento horizontal ni errores de ejecución. Cada tarjeta contiene un párrafo y conserva su enlace de fuente. La búsqueda por «intermediario» encuentra Adapter y Mediator en las nuevas respuestas. Se verificaron Google Sans Flex a 13 px/300 y padding/gap de 24/12 px en escritorio y 20/10 px en móvil. `npm run check` y `npm run build` pasaron. Las menciones a listas en las auditorías anteriores describen el estado histórico y quedan sustituidas por esta pauta.

La petición posterior de desactivar ramas sin contenido se comprobó en Chrome a 1440, 390 y 320 px. Se mantienen las once áreas principales y la retícula de 48 px. Texto, iconos y chevrons deshabilitados usan el mismo color y no cambian en hover. Los chevrons conservan su alineación. La primera visita mantiene los menús cerrados. Los estados guardados solo restauran ramas disponibles e ignoran las ramas vacías que antes podían abrirse. El recorrido de teclado omite filas deshabilitadas y conserva el ciclo de foco móvil y el cierre con Escape. Dos comprobaciones de axe del sidebar terminaron sin incidencias. Tipos y build pasaron. La guía y AGENTS recogen la nueva decisión.

Validación final de esta auditoría: comprobación de las 113 tarjetas, las rutas de los 17 módulos, los estados de navegación y tarjetas y las medidas a 1440, 390 y 320 px. Se verificaron también todas las bombillas dentro de enlaces y el color computado exacto del contador. Cuatro controles adicionales de axe sobre Home y SOLID a 1440 y 320 px finalizaron sin incidencias. `npm run check` y `npm run build` pasaron. Los enlaces locales de la memoria y `git diff --check` son correctos.

Tras completar la redacción de Home se validaron sus 94 campos de texto editorial y se comprobó que el resto de la estructura de datos permanecía idéntica. Las 25 combinaciones de perfil y etapa se recorrieron a 1440 y 320 px. Los 50 estados no presentaron desbordamiento con tamaño normal ni con texto al 200 %. Cuatro análisis adicionales de axe sobre los paneles de Frontend y Artificial Intelligence finalizaron sin infracciones. Se repitieron tipos y build sobre este estado final y ambos pasaron.

No se han encontrado otros incumplimientos de los requisitos de contenido y presentación comprobados. La certificación completa de accesibilidad y las pruebas con lectores de pantalla reales siguen fuera de la evidencia disponible. Las verificaciones se refieren a esta aplicación local; no certifican la accesibilidad de los documentos externos enlazados.

Los scripts y capturas utilizados para esta auditoría son temporales. No deben añadirse a Git. El resultado persistente es esta matriz, la guía, la revisión de accesibilidad y las instrucciones de AGENTS.
