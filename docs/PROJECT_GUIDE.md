# Memoria de producto, diseño y desarrollo

## 24 de octubre de 2026 — separación vertical de Home reducida a 21 px

Por petición posterior del usuario todos los espacios estructurales verticales de Home antes fijados en 42 px pasan a 21 px mediante `--space-home: 21px`. Incluye títulos y subtítulos respecto a sus bloques, pregunta de etapa respecto al grupo de niveles, filas de tarjetas y ambos lados de los separadores. Se conservan los gaps internos compactos y horizontales, el padding exterior, los demás tokens y las otras páginas. Las referencias a 42 px de las entradas anteriores describen el estado histórico sustituido por esta decisión. Se mantienen la geometría aceptada del selector y el orden de Diseño de API.


## 24 de octubre de 2026 — separaciones estructurales y orden de Diseño de API

La aclaración final aplica 42 px a la separación vertical estructural entre títulos, subtítulos, separadores y tarjetas de Home. Incluye la pregunta de etapa y su grupo de niveles. Se conservan los gaps compactos dentro de tarjetas y controles, incluido el interior del grupo de niveles, y los espacios horizontales.

Diseño de API ordena sus hojas como API REST, Webhook, GraphQL, SOAP, WebSocket y gRPC. Es un recorrido pedagógico de carga inicial creciente: peticiones HTTP, notificaciones HTTP, consultas tipadas, contratos XML, conexiones persistentes y contratos binarios con generación de clientes. No representa una clasificación universal de dificultad. Solo cambia el orden compartido ES/EN; las hojas conservan etiquetas, identidad, disponibilidad y ausencia de contenido.


## 24 de octubre de 2026 — aclaración de espaciado vertical y geometría del switch

Los 42 px de `--space-home` se aplican únicamente a la separación vertical entre bloques y tarjetas y a ambos lados de los separadores. No se aplican al espacio interno entre textos ni a la separación horizontal entre tarjetas o controles. Esos espacios recuperan los tokens compactos anteriores. Esta aclaración sustituye la interpretación amplia del apartado de espaciado de Home. Se conservan la justificación y los demás estilos.

El switch Producción/Desarrollo mantiene su posición y funcionamiento. Su pulgar tiene ancho y alto iguales de 1.75rem y la pista deriva sus dimensiones del pulgar y un inset de `calc(.125rem + .5px)` por la petición posterior de añadir 0.5 px interiores. A tamaño normal el pulgar mide 28 × 28 px y la pista 61 × 33 px. Los iconos comparten los centros de las dos posiciones.


## 24 de octubre de 2026 — cabeceras de Home y disponibilidad del catálogo

Los h2 de Home `#career-title` y `#growth-title` usan el mismo tratamiento visual que las cabeceras de patrones: IBM Plex Mono mediante `--brand` a 15 px/peso 500, mayúsculas por CSS, línea izquierda de 2 px con `--accent` y padding vertical de 0 y horizontal de 12 px mediante `--space-compact`. Se conservan sus textos ES/EN, interlineado y separaciones de Home. Esta decisión sustituye el peso 400 y la capitalización visible anteriores de esos dos títulos.

Junto a «Fundamentos por Área» hay un switch compacto. A la izquierda Producción muestra solo los destinos publicados según `publishedNavigation` y conserva sus ancestros. A la derecha Desarrollo muestra el árbol completo, incluidas ramas sin contenido y hojas deshabilitadas. Desarrollo es el estado inicial. La preferencia se guarda en `tech-training:availability:v1`. El cambio filtra la navegación y las tarjetas y contadores de Home sin cambiar la ruta ni abrir o cerrar ramas; sus estados se conservan. No publica contenido ni crea destinos para hojas pendientes.

## 24 de octubre de 2026 — estructura pendiente de Diseño de API

API Design / Diseño de API incorpora SOAP, GraphQL, gRPC, Webhook y WebSocket junto a REST API / API REST. Las cinco nuevas hojas conservan esos nombres técnicos en ES/EN y no tienen enlace ni página publicada. Se ven deshabilitadas en Desarrollo y se omiten en Producción mientras no tengan contenido disponible.

## 24 de octubre de 2026 — trabajo exclusivo en main

Por orden expresa del usuario la IA trabaja siempre sobre `main` en `C:\Workspace\tech-training`. No crea ramas ni worktrees ni desarrolla en copias auxiliares. Solo una nueva instrucción explícita del usuario que revoque esta regla permite cambiar este flujo. Esta decisión sustituye la pauta anterior de crear ramas `codex/…`. Antes de editar comprueba carpeta, rama y cambios pendientes. Conserva los cambios ajenos y el historial. El resultado local se muestra en `http://localhost:4321/` y ese servidor se mantiene disponible. No hagas push ni publiques en Sites por esta petición.

Home y el ajuste del chevron de idiomas ya están integrados en `main` en el checkout habitual. Los servidores auxiliares de 4322/4327 están detenidos. Las referencias anteriores a esos puertos y a cambios presentes solo en worktrees describen el estado histórico previo a esta integración. No se borran worktrees manualmente; la limpieza mediante archivo de los chats la coordina el chat principal.

La configuración local [config.toml](../.codex/config.toml) deshabilita `create_worktree` del plugin `codex-app-tools@openai-bundled`. [main-only.rules](../.codex/rules/main-only.rules) prohíbe los prefijos cubiertos de creación de worktrees y ramas y `git branch`, conservando `git commit`. Las consultas de rama usan `git symbolic-ref --short HEAD` o `git for-each-ref`. Se verificaron decisiones con `codex execpolicy check` sin ejecutar los comandos evaluados. La carga requiere un proyecto confiable y reiniciar Codex. Las listas por herramienta y los prefijos son barreras parciales y no garantizan bloquear la interfaz de la aplicación, scripts, variantes de comandos u otras herramientas. No sustituyen la instrucción permanente de usar el checkout original y `main`. Véanse las [reglas oficiales](https://learn.chatgpt.com/docs/agent-configuration/rules) y la [configuración de herramientas MCP](https://learn.chatgpt.com/docs/config-file/config-reference).


## 24 de octubre de 2026 — espacio interior del selector de idiomas

El chevron del selector de idiomas se desplaza 2 px hacia el borde derecho mediante `inset-inline-end: calc(var(--language-padding) - 2px)`. Compensa el margen transparente del SVG Lucide para equilibrar sus extremos visuales. Se conservan el select nativo, sus opciones, padding, dimensiones, tipografía, colores, foco y funcionamiento. El ajuste está integrado en `main` en `C:\Workspace\tech-training` y se revisa en `http://localhost:4321/`. Esta petición mantiene el servidor local disponible y no autoriza commit, push ni publicación en Sites.

## 24 de octubre de 2026 — espaciado y justificación exclusivos de Home

Los espacios entre bloques y tarjetas del contenido principal de Home usan `--space-home: 42px`, definido en `tokens.css` y constante también en móvil. Los separadores visibles tienen 42 px efectivos desde el contenido anterior y otros 42 px hasta el siguiente. Entre «Elige tu Dirección» y sus tarjetas también hay 42 px. Cada separación tiene un único origen, preferentemente `gap`, sin acumular márgenes y paddings. Esta petición sustituye los gaps anteriores de Home y la proporción de mitad del padding únicamente para esos espacios. Se mantienen el padding exterior responsive de `main` y los paddings e insets internos funcionales de los controles.

La prosa de Home se justifica con la última línea al inicio mediante `text-align: justify`, `text-align-last: start`, `hyphens: none`, `word-break: normal` y `overflow-wrap: normal`. Se conservan textos, fuentes, tamaños, colores, interlineado `--line-body`, otras páginas y comportamientos. El resultado se revisa en localhost y su servidor queda disponible al terminar. Esta petición local no requiere commit, push ni publicación en Sites.

## 24 de octubre de 2026 — interlineado global de 16 px

Por petición expresa del usuario todas las interfaces usan un interlineado compartido de 1rem (16 px a tamaño normal) mediante --line-body. Incluye Home, navegación, búsqueda, selectores, tarjetas, diálogos y código en ambos idiomas y todos los estados responsive. Esta decisión sustituye únicamente los valores anteriores de line-height y el factor proporcional. Se conservan familias, tamaños, pesos, colores, padding y alturas mínimas de controles y filas. El interlineado escala con el tamaño raíz y permite las preferencias de espaciado del usuario.

## 24 de octubre de 2026 — interlineado proporcional compartido — histórico

Por precisión expresa del usuario toda la aplicación usa el mismo factor de interlineado sin unidad: `--line-body: 1.6`. Las reglas locales de Home, navegación, estudio, controles, diálogos y código remiten a ese token. La altura resultante es proporcional al tamaño de cada fuente y sustituye las alturas particulares anteriores. Se conservan familias, tamaños, pesos, colores y espaciados salvo la igualdad tipográfica solicitada para las cifras y etiquetas del resumen de Home. Ambos usan Google Sans Flex a `--font-small` (14 px), peso 400, tracking normal y línea de 22,4 px a escala normal. Conservan sus colores distintos.

Aplicado tanto en el worktree de revisión como en `C:\Workspace\tech-training` conservando los cambios previos. Tipos sin errores, advertencias ni sugerencias y build correcto. Verificado en la página local servida a 1280 px: resumen ES/EN con tipografía idéntica, factor 1.6 en el texto visible de Home y Creacionales y en títulos, controles y código del diálogo de implementación. Sin desbordamiento horizontal en Home y Creacionales. Revisión visual de Home y diálogo. Revisión posterior: Home, Creacionales y su diálogo se comprueban a 320 y 390 px con texto normal sin desbordamiento de página ni texto fuera de sus cajas. Home y su panel de recomendaciones también se comprueban con el tamaño raíz duplicado de 16 a 32 px a 320 y 1280 px y el resumen en inglés a 320 y 390 px sin desbordamientos. La prueba al 200 % detecta limitaciones previas en estudio: números que exceden sus círculos, la etiqueta Implementación que supera su caja a 320 px y títulos de la guía que se solapan a ese ancho. Se reproducen al restituir temporalmente el interlineado anterior de los elementos afectados; el número ya heredaba 1.6 antes del cambio. No se modifican esos problemas de anchura y tamaño fijo ajenos al ajuste solicitado ni se afirma que toda la aplicación supere la prueba al 200 %. Se retiran todos los estilos temporales de prueba y se restaura el viewport. Sigue sin realizarse una prueba con lector de pantalla. No se publica en Sites.

## 24 de octubre: tooltips y pegatinas de las etapas

Cada una de las siete etiquetas incluye una definición breve en español e inglés. Trainee describe formación para un puesto o una nueva área y no presupone falta de estudios. Becario describe prácticas. Entry Level identifica puestos de acceso con poca o ninguna experiencia. Junior alude a tareas con apoyo. Mid Level destaca autonomía. Semi-Senior se presenta como una denominación habitual de nivel intermedio. Senior destaca complejidad, criterio y orientación a otros profesionales. Las definiciones no fijan años ni equivalencias obligatorias.

Los tooltips aparecen al pasar el puntero y su contenido también es accesible mediante teclado y dispositivos táctiles. Las cápsulas conservan su aspecto de pegatina con radio completo de `9999px` y acabado plano sin sombra ni borde blanco inferior. Son etiquetas estáticas dentro de los cuatro botones compartidos. Conservan Google Sans Flex a 13 px mediante `--font-meta` y peso 300. Sus colores de texto, fondo y borde permanecen fijos y no tienen hover ni estado activo propios. Se conservan los cuatro grupos, sus números y la activación y persistencia compartidas.

## 24 de octubre: nombres en cápsulas dentro de cuatro grupos de etapa

El selector conserva cuatro botones y sus itinerarios compartidos. Cada botón muestra un único número del 1 al 4. Los nombres se presentan en cápsulas redondeadas dentro del botón: `Trainee` y `Becario` en el primero, `Entry Level` y `Junior` en el segundo, `Mid Level` y `Semi-Senior` en el tercero y `Senior` en el cuarto. En inglés `Becario` se presenta como `Intern`. Las cápsulas sustituyen las etiquetas unidas por barras o punto medio.

Los nombres de las cápsulas comparten con los números del 1 al 4 la familia Google Sans Flex, el tamaño `--font-meta` de `.8125rem` (13 px a escala normal) y el peso 300.

Pulsar cualquier cápsula activa el mismo botón y el itinerario de su grupo. Se mantienen los IDs `foundation`, `junior`, `mid` y `senior`, los 20 paneles derivados de cinco perfiles y cuatro etapas y la persistencia de selección o cierre. Senior conserva la unión anterior con `advanced`. La separación visual de los siete nombres no crea etapas ni IDs adicionales. No se añaden rangos de años. La petición posterior de tooltips habilita las definiciones breves de cada etiqueta.

## 24 de octubre: punto medio en las etiquetas de etapa — histórico

En ese ajuste las etiquetas de Home fueron `Trainee · Becario`, `Entry Level · Junior`, `Mid Level · Semi-Senior` y `Senior`. En inglés la primera fue `Trainee · Intern`. El punto medio sustituyó las barras de las etiquetas documentadas el 23 de octubre. Se conservaron las cuatro etapas y sus IDs. Esa petición cambió únicamente el separador y mantuvo las agrupaciones editoriales anteriores. La decisión posterior de mostrar los nombres en cápsulas dentro de los cuatro botones sustituye este estado.

## 24 de octubre: cabeceras de estadísticas de Home

Cada estadística coloca el contador a la izquierda del título en la misma fila y la subdescripción debajo. Los títulos capitalizan sus palabras principales en ES/EN. Los contadores mantienen `--green` y pasan a peso 400 sin cambiar su tamaño. El inventario sigue derivándose de los datos y la lista descriptiva conserva su semántica. En pantallas estrechas el título puede ocupar más de una línea junto al contador sin recortes.

## 24 de octubre: etiquetas de etapa alineadas a la izquierda

El texto de cada botón de etapa se alinea a la izquierda en ambos idiomas. El cambio se limita a `text-align` de las etiquetas. Se conservan las columnas de escritorio y el layout responsive en columna. Los círculos mantienen su posición izquierda y sus medidas. Esta decisión sustituye el centrado anterior de las etiquetas y no modifica la pregunta que identifica el selector.

## 24 de octubre: descripciones breves de los perfiles

Las cinco descripciones bajo los nombres de perfil en Elige tu Dirección se presentan sin punto final en español e inglés. DevOps se acorta a «Automatiza la entrega y operación» y «Automates delivery and operations». Los demás textos conservan su redacción. Esta excepción de puntuación se limita al campo `purpose` mostrado en esos controles.

## 24 de octubre: espacio exterior del contenido

El contenedor `main` aplica `--space-page` en sus cuatro lados. Home y estudio no añaden padding superior propio y el pie Siguiente módulo no repite el padding inferior. Se conserva el margen interior que separa ese pie de las tarjetas. Home y búsqueda obtienen así separación inferior compartida sin alterar los gaps entre secciones. Esta decisión sustituye el padding vertical localizado en Home.

## 24 de octubre: cerrar el panel de etapa

Pulsar de nuevo la etapa activa de Home la desmarca y oculta el panel de recomendaciones. Elegir otra etapa muestra su contenido y volver a elegir la etapa cerrada lo abre. Cambiar perfil o idioma conserva el estado cerrado. La etapa seleccionada o el cierre explícito se guardan en `tech-training:career-stage:v1` y se restauran al recargar. Sin preferencia guardada se mantiene la selección inicial existente. El cierre se anuncia de forma accesible en español e inglés.

## 24 de octubre: simplificación de textos de Home

También se retiran el desplegable Cómo interpretar estos niveles con sus referencias y la sección completa de rutas disponibles. Las rutas siguen accesibles desde la navegación. La sección de perfiles conserva el texto Elige tu Dirección. Su presentación posterior del 24 de octubre usa IBM Plex Mono 500 y mayúsculas por CSS, como Amplía tu Alcance. Se conservan los datos de fuentes profesionales como respaldo interno.

Por petición expresa se retiran de la portada el título visible Fundamentos para entrevistas técnicas y su párrafo introductorio. También se eliminan la explicación de selección de perfil y etapa y la nota sobre la variación de títulos entre organizaciones. Inicio conserva un h1 solo accesible. Esta decisión sustituye la instrucción anterior de mostrar esos textos. No se alteran perfiles, etapas ni recomendaciones.

## 24 de octubre: presentación de las guías

Copiar código comparte el estilo sin borde ni fondo de Anterior y Siguiente y cambia solo el color al hover. Lleva el icono Copy de Lucide a la izquierda del texto. Ver código completo conserva un gap inferior hasta el separador del pie.

Decisión vigente posterior: se eliminan el contador de pasos y el texto Líneas clave porque el paginado y el resaltado del código ya comunican esa información. La descripción permanece centrada y aprovecha todo el ancho del cuerpo. Las notas siguientes sobre su contador, pesos y separadores describen ajustes históricos sustituidos por esta retirada.

Las descripciones de los pasos explican la implementación sin mencionar el lenguaje en que se realiza y omiten el punto final por petición expresa. Esta pauta se aplica a ambos idiomas de la interfaz y no altera el código ni los datos de sus ejemplos.

La descripción `implementation-why` comparte fila con el contador de pasos y se centra respecto al ancho del cuerpo con columnas laterales iguales. Cambia junto al título y al código del paso activo. Las etiquetas Líneas clave y Paso y los dos puntos usan peso 300. Los valores de líneas con puntos intermedios y el contador numérico con barra diagonal usan peso 400 mediante la clase compartida `implementation-value`.

Los h3 de los pasos aparecen en la misma fila de la cabecera centrados respecto al ancho total del diálogo. Las columnas laterales tienen el mismo ancho para que el nombre del patrón no desplace el centro. Solo se muestra el correspondiente al paso activo y conserva su ID accesible y traducción. Usan IBM Plex Mono mediante `--brand` a 15 px/peso 500 y mayúsculas por CSS. Es una excepción tipográfica expresa solicitada por el usuario. Líneas clave no lleva punto final.

La cabecera muestra únicamente el nombre del patrón y la X de cierre con hover circular. Se elimina la etiqueta «Implementación · Java». «Líneas clave» conserva la misma separación por encima y por debajo hasta el separador. Los espacios compactos del diálogo derivan de `--gap-card` y su mitad para mantener la proporción al cambiar de tamaño.

Por ajuste posterior los botones numerados tienen radio completo. La separación vertical de contador, título, descripción, código, líneas clave y separadores usa un único `--gap-card` sin acumular márgenes. El diálogo conserva padding horizontal completo y vertical de la mitad. El bloque Ver código completo tiene la misma separación superior e inferior. Esta decisión sustituye el espacio doble anterior hasta el código.

El diálogo de implementación y los contenedores de código usan radio 2XL de 16 px mediante el token compartido. El contador de pasos se sitúa al principio del cuerpo. Los botones numerados de paginado ocupan el pie entre Anterior y Siguiente y pasan a una fila propia en móvil. Anterior y Siguiente no tienen borde ni fondo y su hover cambia únicamente el color. Conservan el foco y los estados deshabilitados.

## Sincronización del 24 de octubre

La entrega autorizada integra las guías de implementación ya existentes en GitHub con las tres descripciones restauradas y la retirada de comentarios. El caso de uso de Prototipo conserva la frase solicitada «Clonar un objeto de configuración de servidor y modificar solo los valores necesarios» en el catálogo compartido de guías con su traducción. Las referencias históricas a Implementación deshabilitada quedan sustituidas por las guías disponibles. Se mantiene la pauta de consultar antes de cambiar algo fuera del alcance solicitado.

## 24 de octubre: casos de uso mínimos e implementación por pasos

Cada patrón incorpora un caso de uso de una frase y una guía Java de 3 a 5 pasos manuales. El caso de uso contiene el escenario concreto. La implementación empieza directamente por las piezas del programa y explica su orden de construcción con una frase breve por paso. No repite el problema ni añade teoría extensa. Los ejemplos no llevan comentarios internos.

La acción Implementación abre un diálogo amplio con pasos numerados y navegación Anterior/Siguiente. Cada paso muestra un fragmento del mismo código completo y resalta entre una y tres líneas clave. La salida se identifica como esperada y se muestra en el último paso. El código completo está disponible para consulta y copia. No se ejecuta Java en el navegador. Prototype utiliza la copia de una configuración de servidor con una IP diferente y conserva la configuración original.

Los datos bilingües viven en `src/data/pattern-guides/`. Sus rangos se interpretan sobre el código completo y las traducciones se integran con el motor existente. `ImplementationGuide.astro` y `implementation-guides.ts` contienen la presentación y la interacción reutilizables. La vista de código usa el token `--code` basado en IBM Plex Mono. Se conservan los IDs de conceptos y módulos y el progreso. La navegación del diálogo es manual y permite cerrar con Escape. Explicación y Caso de uso siguen alternando dentro de la tarjeta.

Esta petición habilita esas dos vistas en los 14 patrones y sustituye las restricciones históricas que indicaban dejarlas vacías. No modifica las definiciones existentes ni añade ejemplos a SOLID o al glosario.
## 24 de octubre: alcance estricto y restauración de descripciones

El usuario exige cambiar exactamente lo solicitado y preguntar antes de modificar algo no especificado. No se realizan mejoras editoriales, visuales o técnicas ajenas a la petición por iniciativa propia. Se restauran literalmente las explicaciones anteriores al 22 de octubre de Simple Factory, Builder y Factory Method. Sus traducciones existentes se conservan. Las frases de cabecera de categorías y el caso de uso de Prototipo no cambian. Esta decisión sustituye las reformulaciones de esas tres tarjetas documentadas anteriormente.

## 24 de octubre: código sin comentarios

El usuario solicita retirar todos los comentarios del código y conservar esta pauta para futuros cambios. El código fuente, los scripts y la configuración no incorporan comentarios de línea, bloque, JSDoc ni HTML. Las explicaciones se mantienen en la documentación. Se priorizan nombres claros, tipos y componentes pequeños sin alterar el comportamiento de la aplicación.

## 24 de octubre: caso de uso de Prototipo

Por petición expresa Prototipo añade un caso de uso breve: «Clonar un objeto de configuración de servidor y modificar solo los valores necesarios». Tiene traducción inglesa. El botón «Caso de uso» cambia únicamente el contenido del cuerpo de su tarjeta mediante `useCase` y el comportamiento compartido de `study-cards.ts`. La definición original permanece en Explicación y sigue siendo la fuente de búsqueda y repaso. Implementación permanece deshabilitada porque no tiene contenido. No se añaden casos a otros conceptos. El ejemplo ilustra la clonación de objetos configurados descrita en la fuente específica de Refactoring.Guru y no una copia de infraestructura completa.

## Entrega de la sesión — 23 de octubre de 2026

El usuario autoriza expresamente subir a GitHub el lote acumulado del glosario, componentes y ajustes de interfaz. Sustituye la instrucción anterior de mantenerlo pendiente de subir. La web de Sites requiere una publicación independiente y no se despliega con esta petición. Se detienen los servidores locales al terminar. No se repite el apagado solicitado en la sesión del día anterior.

## 23 de octubre: descripciones de perfiles

Las cinco tarjetas para elegir perfil incluyen una frase breve bajo el nombre que resume el trabajo del rol. El campo `purpose` vive en `career-paths.ts` y se traduce en `i18n.ts`. `CareerProfileOption.astro` recibe perfil, índice y selección por parámetros. La descripción usa 13 px/peso 300 y se conecta al botón con `aria-describedby`. Por petición posterior expresa la frase de Frontend es «Construye interfaces web». Su versión inglesa es «Builds web interfaces». No se enumeran criterios de calidad en esta descripción breve.

## 23 de octubre: cuatro etapas de Home — histórico

Las etiquetas definitivas pedidas por el usuario son `Trainee / Becario`, `Entry Level / Junior`, `Mid Level / Semi-Senior` y `Senior`. En inglés `Becario` se presenta como `Intern`. El selector recupera fondo y borde exteriores redondeados y conserva los botones con radio completo. Sustituye el selector anterior de cinco etapas y la retirada temporal del marco. `careerStages` define los cuatro nombres compartidos. Se conservan IDs de las etapas restantes y las áreas de la antigua transición se unen a Senior sin duplicados. Las plantillas anteriores permanecen en el catálogo fuente como referencia. Home tiene ahora veinte combinaciones de perfil y etapa. Son etiquetas editoriales reconocibles y no se presentan como una clasificación universal ni como equivalencias contractuales exactas entre trainee y becario.

## 23 de octubre: arquitectura reutilizable

El usuario solicita conservar como pauta de futuro una aplicación componentizada con propiedades tipadas y datos por parámetros. La página principal compone el layout, Home y estudio. Se separan tarjetas, fuentes, vistas, controles, diálogos y paneles de Home. El catálogo disponible se centraliza en `src/data/published-catalog.ts`. Los scripts delegan menú móvil, vistas de tarjetas, repaso y cierre de diálogos. No se modifica el diseño ni se añaden dependencias. La organización y los contratos de continuidad se describen en [COMPONENT_ARCHITECTURE.md](COMPONENT_ARCHITECTURE.md). Antes de añadir marcado repetido se debe buscar un componente reutilizable. Se conserva el almacenamiento local de las ramas abiertas y cerradas al recargar y cambiar idioma.

## 23 de octubre: propósito de las categorías de patrones

Por petición expresa se muestra una frase como título encima del contador y los niveles únicamente en Creational, Structural y Behavioral. Los textos explican respectivamente cómo se crean los objetos, cómo se componen y cómo colaboran y reparten responsabilidades. Se derivan de las descripciones de `designPatternPages` y tienen versiones ES/EN. El h1 compartido usa IBM Plex Mono mediante `--brand` a 15 px/peso 500 y separación `--space-gap` por la petición posterior del mismo día. Es una excepción expresa al uso exclusivo de esta familia en la marca. La cabecera incorpora una línea izquierda de 2 px con --accent y padding vertical de 0 y horizontal de 12 px derivado de --space-compact. No añade fondo ni icono. Por petición posterior del 23 de octubre estas tres frases se muestran en mayúsculas mediante text-transform en ambos idiomas sin modificar sus datos originales. Sus cabeceras visibles omiten el punto final por petición posterior. Esta petición sustituye la restricción anterior de no mostrar encabezados para esas tres páginas. SOLID, glosario y búsqueda conservan sus encabezados semánticos ocultos. No se modifica el contenido de ninguna tarjeta ni se suben los cambios.

## Actualización vigente: glosario de IA

Por petición posterior del 22 de octubre se implementa localmente el glosario orientado a entrevistas. Son cien términos del README de prácticas y cuatro fundamentos acordados. Aplicaciones de IA Generativa contiene diez páginas temáticas bajo IA Generativa. El catálogo local disponible suma 123 conceptos y catorce módulos entre Software Design y esta ruta. Este cambio sustituye para el código local la limitación previa a Home y Software Design. No se ha subido ni publicado. El detalle y las fuentes están en [AI_GLOSSARY_REVIEW.md](AI_GLOSSARY_REVIEW.md). El contenido y las traducciones propias del glosario viven juntos en `src/data/ai-glossary.ts` y se integran en `i18n.ts`. Las fuentes siguen en `concept-sources.ts`. La referencia de cien entradas tiene cobertura automática contra el README local. Las tarjetas conservan el diseño compartido pero ocultan los controles de vistas cuando solo tienen explicación. No se añaden casos de uso o código ficticios. El antiguo `applied-ai.ts` permanece histórico y no se monta junto al glosario.

Estado documentado: **22 de octubre de 2026**. Lee también [AGENTS.md](../AGENTS.md). Las preferencias expresas del usuario se indican como tales; las medidas y limitaciones describen la implementación actual y no impiden cambios posteriores solicitados.

## 1. Propósito y preferencias

Tech Interview Prep prepara fundamentos para entrevistas técnicas de distintos perfiles y empresas. Prioriza conceptos claros, descripciones cortas y recuperación activa de lo aprendido. No pretende enseñar exhaustivamente todas las áreas desde cero ni reproducir un currículo universitario completo. No es una aplicación de escritorio ni una plataforma que ejecute modelos de IA. El nombre elegido el 22 de octubre de 2026 es Tech Interview Prep.

La interfaz de Home y Software Design está disponible en español e inglés. El selector de idiomas es un `<select>` nativo con las opciones Español y English en la cabecera después del buscador. Sustituye los dos botones ES / EN. El español es el idioma inicial y la elección se conserva en `tech-training:language:v1`. El cambio mantiene la ruta actual y actualiza títulos, navegación, tarjetas, niveles, ayudas y mensajes dinámicos. Mantén las dos versiones al editar contenido visible. Los textos bilingües se centralizan en `src/scripts/i18n.ts`. Por la última petición del 21 de octubre, los nombres de patrones de diseño muestran solo su traducción española al elegir Español y solo su nombre inglés al elegir English, sin combinar ambos. Las siglas técnicas conservan su notación.

El usuario pidió un diseño profesional, moderno y minimalista, con especial cuidado por la simetría, márgenes y alineación. Los enlaces de navegación usan nombres completos en el idioma elegido y conservan Title Case. Las etiquetas inglesas canónicas se mantienen en los datos para resolver rutas y persistencia. Las siglas propias de conceptos técnicos, como SQL, RPC o LLM, pueden formar parte de las lecciones.

La marca del sidebar es exactamente **Tech Interview Prep**. El usuario retiró el logo gráfico, el guion y el subtítulo «Un concepto. Un paso más.». También retiró el separador horizontal, la biblioteca de exploración/guardados y el pie de progreso. El borde vertical entre sidebar y contenido y las guías de indentación de los submenús siguen presentes. La nueva portada Home sustituye al antiguo hero y la franja de seis rutas. La etiqueta `Library` y el acceso al repaso rápido global también se eliminaron. Más adelante se retiró el botón de repaso de la cabecera de estudio; su código y diálogo se conservan.

## 2. Tipografía

| Uso | Familia y configuración actual |
| --- | --- |
| Interfaz completa, texto, controles y encabezados | `Google Sans Flex Variable`, fallback `sans-serif` |
| Marca del sidebar | `IBM Plex Mono`, fallback `monospace`; 500, 20 px |
| Títulos | `--font-title` / `--font-section: .9375rem` (15 px por defecto), peso 500 |
| Subtítulos y controles | `--font-small: .875rem` (14 px), peso 400; navegación con línea 16 px |
| Texto y metadatos | `--font-body` / `--font-meta: .8125rem` (13 px por defecto), peso 300 |

`src/pages/index.astro` importa `@fontsource-variable/google-sans-flex` y `@fontsource/ibm-plex-mono/500.css`. Las fuentes se incluyen en los assets de la web; no dependen de una petición a Google Fonts en ejecución. En `src/styles/tokens.css`, `--body` contiene Google Sans Flex, `--display` referencia `var(--body)` y `--brand` contiene IBM Plex Mono. Solo `.brand` usa `--brand` y peso 500. No declares familias distintas en componentes ni mezcles tipografías según la sección. Controles, diálogos y encabezados heredan la familia general.

Referencias pedidas por el usuario: [Google Sans Flex](https://fonts.google.com/specimen/Google+Sans+Flex) e [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono).

Error que no debe repetirse: antes se importaba Google Sans Flex pero `--body` seguía apuntando a Inter. No basta con instalar o importar la fuente: comprueba `getComputedStyle(element).fontFamily` en menú, contenido, inputs, select y botones, además de `document.fonts.ready` y la carga efectiva de la familia. Inter y Manrope ya no son dependencias.

La jerarquía tipográfica usa tamaños de 15, 14 y 13 px expresados en `rem` para respetar el tamaño de fuente del navegador: títulos a 15 px/peso 500, subtítulos y controles a 14 px/peso 400 y texto y metadatos a 13 px/peso 300. Por petición posterior, la marca del sidebar usa 20 px/peso 500, definido mediante `--font-brand`. WCAG no establece una familia tipográfica ni un tamaño mínimo universal. Las líneas de navegación usan 1rem que equivale a 16 px a escala normal y crecen al ampliar el texto. No reduzcas el cuerpo de lectura en móvil.

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

Tarjetas con borde de 1 px y radio compartido de 12 px; controles de 8 px e interiores de 6 px. Las formas circulares y los radios completos del buscador y los niveles se conservan. Por referencia posterior al portfolio del usuario, los botones de vistas usan radio de 24 px y el grupo un radio concéntrico de 29 px a tamaño normal, en lugar de `9999px`. Por petición expresa del usuario, el sidebar no añade fondo en hover ni en estado activo. El hover, el enlace de la página actual y los desplegables que lo contienen cambian texto y SVG a `--ink`. Las ramas abiertas ajenas a la ruta activa conservan sus colores normales. Los ancestros se identifican mediante `:has(.navigation-link[aria-current='page'])`, sin abrir ramas ni modificar la persistencia. El texto normal usa `--text-soft` y los SVG heredan el color de su propia fila. El enlace actual conserva `aria-current="page"`, peso 400 y ausencia de subrayado. Sobre el sidebar, el contraste calculado es 5,33:1 para texto normal y 12,90:1 para hover y ruta activa. Se mantienen la retícula de 48 px, padding vertical de 12 px e inset horizontal y de chevrons de 18 px. Se respeta `prefers-reduced-motion`.

## 4. Espaciado y navegación visual

Preferencia general del usuario: separación visual simétrica y gaps iguales a la mitad del padding de su contenedor, con la excepción de 42 px constantes entre bloques y tarjetas de Home. Los valores compartidos se declaran en `tokens.css`:

| Ámbito | Padding o margen de referencia | Gap derivado |
| --- | --- | --- |
| Página base | `--space-page: 42px` | `--space-gap: calc(var(--space-page) / 2)` = 21 px |
| Página hasta 1250 px | 28 px | 14 px |
| Página hasta 640 px | 20 px | 10 px |
| Bloques y tarjetas de Home | `--space-home: 42px`, independiente del padding | 42 px constantes |
| Tarjeta | `--space-card: 24px` | `--gap-card` = 12 px |
| Control | `--space-control: 16px` | `--gap-control` = 8 px |
| Elemento compacto | `--space-compact: 12px` | `--gap-compact` = 6 px |

Topbar y contenido principal comparten alineación horizontal y el mismo padding de página, incluso cuando el contenido alcanza su ancho máximo de 1500 px. El padding exterior pertenece a `main`. La raíz de Home usa `--space-home` entre sus bloques y no añade padding exterior propio.

El buscador conserva el borde completamente redondeado (`9999px`). No muestra una etiqueta «Ctrl K» o «⌘ K», pero mantiene el atajo Ctrl/Cmd + K para enfocarlo. Al enfocarlo conserva el borde y el texto de lectura normales, aplica un fondo suave `--surface-tinted` y cambia el icono a `--green` con una transición breve. Al escribir, muestra un botón X de Lucide para borrar la consulta. El navegador no muestra su X nativa. La X usa los colores de la paleta y al hover o foco aparece sobre un círculo de 32 px con fondo `--surface-tinted` y borde `--border-strong`. En colores forzados se muestra el contorno del sistema. El texto y el placeholder usan `--font-small` (14 px), igual que los enlaces del sidebar. La auditoría de accesibilidad sustituyó el atajo de un solo carácter `/` por Ctrl/Cmd + K para no interferir con el control por voz.

El filtro de niveles es un control horizontal transparente y sin borde propio. Muestra el nivel entre flechas izquierda y derecha, sin desplegable. Mantiene el orden Todos los niveles, Esencial, Intermedio y Avanzado, pero solo incluye los niveles que tienen tarjetas filtrables en el módulo o resultados actuales. Si una búsqueda o navegación deja sin contenido el nivel seleccionado, vuelve a Todos los niveles. En los extremos desactiva la flecha que ya no tiene dirección disponible. Al pasar el ratón sobre una flecha habilitada, aparece un círculo de 24 px con relleno `--surface-tinted` y borde de 1 px `--border-strong`; el icono cambia a `--ink` y el área del botón permanece en 40 px. `.level-step-visual` contiene el borde circular y el SVG de 16 px en una misma caja sin padding con centrado grid. El chevron se compensa ópticamente 0.5 px hacia su punta en cada dirección. La caja se alinea al borde exterior del botón sin pseudoelementos ni grandes desplazamientos separados. El selector se alinea a la derecha también cuando ocupa una segunda fila en pantallas estrechas. El botón deshabilitado no recibe hover. Los botones tienen nombres accesibles y el nivel actual se anuncia al cambiar. Conserva el foco visible en escritorio y móvil.

Las páginas de estudio tienen una única fila sobre las tarjetas: contador dinámico de conceptos a la izquierda (`5 CONCEPTS`) y selector de niveles a la derecha, en la misma línea también en móvil con el tamaño de texto normal. Con texto ampliado pueden pasar a dos líneas para conservar toda la información. El contador usa `--body` (Google Sans Flex Variable), 13 px, peso 300, línea de 16 px, `--text-count` (`#657357`) y mayúsculas. Se retiraron de esa cabecera el área y número de módulo, el título visible, la descripción, el botón «Repasar conceptos», el punto decorativo y «At your pace». La ubicación se identifica mediante el breadcrumb; el título semántico de la sección se conserva solo para lectores de pantalla. El código y diálogo de repaso se conservan, sin acceso desde esta cabecera.

El final de las páginas de estudio muestra únicamente «Siguiente módulo», alineado a la derecha en escritorio y móvil y acompañado por una flecha `ArrowRight` de Lucide a 13 px, más pequeña que la flecha original de 18 px; no se utiliza un chevron. Se retiraron el consejo «Hazlo tuyo. Explica el concepto en voz alta, sin mirar la definición.» y el pie común con la marca, el lema y «Fuentes y recursos». El enlace sigue calculando su destino a partir de los módulos; no aparece en búsqueda ni cuando no hay conceptos visibles. Las fuentes primarias y el diálogo de fuentes se conservan, sin el acceso del pie retirado.

Las tarjetas tienen padding uniforme de 24 px de base, 28 px desde 1600 px y 20 px hasta 1050 px. La separación entre tarjetas y la barra de niveles usa su mitad: 12/14/10 px. Ambos valores se declaran juntos en `.concept-grid`. El espacio en torno a los separadores y entre descripción y fuente usa el padding completo. En el pie se mide hasta las superficies visibles de los controles, sin la compensación fija del antiguo botón de texto. El selector de vistas usa su propia escala anidada de 4/2 px. Las tarjetas visibles conservan igual altura con `grid-auto-rows: 1fr` y descripción flexible; no se fija la altura ni se recorta el texto. La fuente no usa margen automático. Home mantiene 42 px entre sus bloques y tarjetas en todas las container queries. Sus estadísticas no acumulan padding exterior y de celda para definir una misma separación.

La cabecera de cada tarjeta muestra el número dentro de un círculo con borde, seguido inmediatamente por el título; el nivel queda a la derecha. Una línea separa esta cabecera de la descripción y conserva el padding completo por encima y por debajo. Los gaps entre número, título y nivel usan la mitad de ese padding. La etiqueta de nivel tiene fondo completamente redondeado (`9999px`) y conserva los colores de Esencial, Intermedio y Avanzado. Muestra únicamente el nombre del nivel, sin punto ni icono delante. La última petición del usuario retira el punto y sustituye la anterior que pedía conservarlo. No muestra borde al pasar el cursor. Los elementos de la cabecera se alinean verticalmente.

Desde el 20 de octubre de 2026, el pie de cada tarjeta muestra los botones «Explicación», «Caso de Uso» y «Implementación» a la izquierda y «Lo entiendo» al extremo derecho. Cada botón cambia únicamente el cuerpo de su tarjeta. Los apartados vacíos usan `disabled` y no reciben hover. El seleccionado usa `aria-pressed`, cursor normal y ningún cambio visual ni transición al pasar el ratón. La selección inicial es Explicación o el primer apartado con contenido. Cada botón referencia su panel mediante `aria-controls` y el cuerpo anuncia los cambios con `aria-live="polite"`. Los botones nativos permiten activación con teclado. En móvil el pie puede ocupar varias filas, pero «Lo entiendo» conserva su alineación a la derecha. No repitas la categoría.

Las filas número–título, bombilla–autor–enlace y check–«Lo entiendo» comparten `--gap-card`: 12 px de base, 14 px desde 1600 px y 10 px hasta 1050 px. La fuente usa `--gap-card` como padding interior. Por petición posterior, «Lo entiendo» recupera el check circular y el texto sin fondo ni borde exterior en estado normal, hover o seleccionado. Conserva su alineación a la derecha con padding izquierdo `--gap-card`, derecho 0 y vertical de la mitad de `--gap-card`, altura mínima de 44 px y foco visible. El estado comprendido mantiene el relleno del check. El selector de vistas tiene su propia escala anidada: padding de 4 px y gap de 2 px, derivado como su mitad. Sus botones tienen altura mínima de `3rem` (48 px) y padding vertical/horizontal de 12/24 px; el espacio horizontal de 24 px define su mitad vertical de 12 px. El pie no añade padding horizontal. El borde izquierdo del selector y la caja de «Lo entiendo» coinciden con los extremos del separador. `.learn-label` añade únicamente `.05em` de compensación óptica a la derecha para contener la tinta de la última letra de Google Sans Flex. No sustituyas esta compensación tipográfica por un inset estructural del pie. El pie usa el padding completo tras el separador; ya no resta la antigua compensación fija de 11 px.

La armonización del 20 de octubre agrupa las vistas en una superficie suave con botones interiores. La petición posterior toma como referencia los botones de [cristobits0101.dev](https://cristobits0101.dev/). En la web pública, «Open CV» y «Cont@ct Me» tienen altura de 48 px, padding de 12/24 px y radio CSS de `10rem` (160 px) que se limita geométricamente a 24 px por su altura. Se trasladan sus proporciones a las vistas con radio de `1.5rem` (24 px). El grupo calcula un radio concéntrico como radio del botón más 4 px de inset y 1 px de borde, equivalente a 29 px a tamaño normal. Esta medida sustituye los radios `9999px` de este selector y evita que su contorno se convierta en un óvalo grande al ocupar varias filas. Se conservan la tipografía y la paleta de Tech Training.

El seleccionado tiene fondo blanco y borde `--control-border`, además de `aria-pressed`, y permanece estático al hover. Los deshabilitados conservan `--disabled` sin opacidad reducida. El pie usa una rejilla con columnas `minmax(0, 1fr) auto`, y `.concept-card` es un contenedor de consulta. Por debajo de 32 rem de ancho útil, el selector ocupa una fila completa y «Lo entiendo» otra, a la derecha. Por debajo de 18 rem las vistas se disponen en columna y mantienen el padding horizontal. El grupo usa `width: fit-content` y `max-width: 100%`: conserva su ancho natural y queda limitado por la columna del pie en lugar de estirar el fondo y los botones por todo el espacio sobrante. Las opciones pueden replegarse sin cortar palabras cuando se personaliza el espaciado. Al ampliar el texto, el selector de niveles envuelve su etiqueta y la cabecera puede separar título y nivel en filas. No se usa recorte para esconder desbordamientos.

Los radios compartidos son `--radius-card: 12px`, `--radius-control: 8px` y `--radius-inset: 6px`. Home y las tarjetas usan esos tokens. El selector de vistas es la excepción solicitada por el usuario con radios interior/exterior de 24/29 px a tamaño normal; el bloque de fuente sigue sin esquinas redondeadas. Los encabezados de 15 px conservan peso 500, tracking normal y línea de 1rem. Se retiraron valores de tracking de hasta -2 px heredados de títulos mayores. El hover de una tarjeta cambia solo el borde; las acciones se reconocen por sus propios controles. La revisión, las fuentes y las limitaciones de la evidencia están en [ACCESSIBILITY_REVIEW.md](ACCESSIBILITY_REVIEW.md).

Igualar gaps no alinea el texto si los elementos anteriores tienen distinto ancho. Título y autor comienzan en una misma columna. Bombilla y check miden 20 px. `--card-number-size` deriva de `20px + --gap-card`, con diámetros de 32/34/30 px según el breakpoint. Título y autor empiezan en `20px + 2 × --gap-card` desde el borde interior de la tarjeta. La raya de la fuente es una sombra interior de 2 px que no consume ancho de layout. No compenses esta columna con márgenes fijos que solo coincidan en un breakpoint. La petición del 20 de octubre mueve «Lo entiendo» a la derecha y sustituye su anterior alineación en esa columna.

Al sobrescribir una variable de espacio con gap derivado en un contenedor o breakpoint, vuelve a declarar allí su gap como `calc(var(--space-...) / 2)`. Una variable derivada heredada puede haberse resuelto con el valor del ancestro; no presupongas que cambiar solo el padding local recalcula el gap. Mantén juntos ambos tokens y comprueba sus píxeles computados. El espacio constante `--space-home` es independiente del padding. Bordes, radios, alturas de controles y pequeños ajustes de línea no son gaps estructurales.

La descripción de cada tarjeta ocupa un único párrafo sin listas y un máximo de tres líneas a tamaño normal desde 320 px. Usa todo el ancho interior de la tarjeta, sin un límite de ancho que cree margen derecho. Las respuestas son resumidas de una o dos frases y se justifican con la última línea alineada al inicio. Declara `overflow-wrap: normal`, `word-break: normal` y `hyphens: none` para conservar las palabras completas. No se corta el contenido con `line-clamp`, altura fija, overflow oculto ni puntos suspensivos. Al ampliar la fuente se permite que el texto ocupe más líneas para mantener la lectura completa. La separación entre el bloque de descripción y el enlace de fuente usa `--space-card`, igual al padding interior y al espacio junto a los separadores, no `--gap-card`. Son 24 px de base, 28 px desde 1600 px y 20 px hasta 1050 px. El párrafo no añade otro margen que duplique esa separación.

La navegación conserva una retícula propia de filas; no apliques gaps adicionales que alteren su ritmo.

En el sidebar se corrigió un problema concreto: sumar gap + padding + márgenes daba separaciones distintas entre marca, subtítulo y desplegables. La implementación actual usa una **retícula uniforme de filas**, sin separación vertical adicional entre cajas:

| Propiedad | Valor actual |
| --- | --- |
| Ancho del sidebar | Intrínseco al texto más largo de todos los subniveles renderizados mediante `--sidebar-width`; móvil `min(var(--sidebar-width), 100vw)` |
| Padding exterior | 16 px en los cuatro lados |
| Marca | `min-height: 48px`, texto a 20 px, padding vertical/horizontal 9/18 px |
| Etiqueta y filas de navegación de todos los niveles | `min-height: 48px`, `line-height: 1rem`, padding vertical de 12 px y horizontal de 18 px |
| Gaps/márgenes verticales entre filas | 0 |
| Padding horizontal de las filas | 18 px en ambos lados, alineado con el texto de la marca |
| Gap entre icono y texto | 9 px; mitad del padding horizontal |
| Separación interior desde la guía del árbol | 12 px |
| Indentación de cada árbol hijo | Margen izquierdo 24 px + padding izquierdo 12 px + guía de 1 px |
| Inset derecho de todas las filas | `--navigation-end-inset: 18px` |

La retícula mantiene 48 px entre centros de filas, incluidos marca y etiqueta. No significa que los trazos de fuentes de diferentes tamaños tengan exactamente el mismo espacio óptico. Por petición del 21 de octubre, todas las etiquetas se muestran completas en una sola línea. No uses wrap, elipsis ni overflow oculto. `navigation.ts` mide un clon temporal con todos los subniveles renderizados abiertos y lo retira inmediatamente sin modificar el estado del menú real. Incluye las indentaciones, iconos, paddings, chevrons y el espacio de scrollbar. El ancho se recalcula con el idioma, las fuentes, el tamaño de texto y el espaciado. La variable compartida ajusta también el margen del contenido y la posición del toast. Tras habilitar todas las ramas, en Chrome a tamaño normal se midieron 423 px en español y 347 px en inglés; son resultados y no valores que se deban fijar.

La barra vertical pertenece al aside completo y ocupa toda su altura junto al borde derecho sin margen exterior. Conserva el padding interior de 16 px y reserva el espacio de la barra para que no cambie el ancho al abrir ramas. La cabecera es sticky para mantener accesible la marca y el cierre móvil. Su fondo opaco debe tapar las filas que pasan por detrás, incluidos los espacios superiores y laterales de padding. `.sidebar-header::before` extiende ese fondo mediante offsets negativos derivados de `--sidebar-padding`, la misma variable que define el padding del aside. No ocupa layout ni cambia el tamaño o diseño de la barra y no intercepta eventos. Si una pantalla estrecha no permite mostrar una fila completa, la sección de navegación admite desplazamiento horizontal interno sin truncar texto ni desplazar la cabecera.

Los chevrons son de 14 px, con `margin-inline-start: auto` y centrado vertical. La indentación solo cambia la izquierda; añadir márgenes o padding derecho a cada subárbol rompe su columna común. Los iconos de área son de 18 px. `Icon.astro` centraliza Lucide con trazo 1.65 y SVG decorativos `aria-hidden`.

Los contenedores mantienen lados opuestos iguales. El padding horizontal puede duplicar el vertical; el gap derivado es la mitad del padding que lo define, salvo los espacios constantes entre bloques y tarjetas de Home. En el header, página/gap es 42/21 px, y en las filas del sidebar el padding horizontal/vertical es 24/12 px con gap 12 px. Revisa las sumas de margin, padding y gap para no duplicar separaciones. Verifica medidas reales y captura visual, no solo números del CSS.

### Iconos de las áreas principales

| Área | Icono Lucide |
| --- | --- |
| Computer Systems | `Cpu` |
| Human-Computer Interaction | `MousePointerClick` |
| Software Engineering | `Blocks` |
| Data Management and Engineering | `Workflow` |
| Cybersecurity | `ShieldCheck` |
| Data Science | `FlaskConical` |
| Artificial Intelligence | `BrainCircuit` |

Usa iconos por significado, no por posición. Solo las áreas principales llevan estos iconos; los chevrons repetidos indican una acción común y sí se conservan.

Todos los pictogramas se obtienen de `lucide-astro` mediante `Icon.astro`, también los puntos decorativos (`Circle`, relleno para `dot`) y el favicon (`CodeXml`). No añadas SVG dibujados a mano, iconos hechos con CSS, emojis ni caracteres usados como sustitutos de iconos. Los números de etapas, signos de puntuación y flechas dentro de explicaciones técnicas siguen siendo texto. Los contenedores, bordes y conectores de layout se pueden construir con CSS. Los títulos usan mayúscula tras separadores y las descripciones de tarjetas no usan flechas ni guiones explicativos.

`src/pages/favicon.svg.ts` prerenderiza `/favicon.svg` con AstroContainer y el componente `Icon`; devuelve SVG sin wrapper HTML. No recrees `public/favicon.svg` ni copies geometría de la biblioteca a un asset manual. Al sincronizar una copia antigua del sitio, elimina aquel asset obsoleto para que no compita con el endpoint.

### Responsive

El sidebar es fijo en escritorio. A 850 px o menos pasa a un panel móvil con backdrop, control de foco, `inert`, cierre con Escape y cierre al navegar. También pasa a panel plegable si su ancho intrínseco dejaría menos de 20 rem al contenido principal, para responder a traducciones largas y texto ampliado. `navigation.ts` coordina `.sidebar-drawer` y el evento `sidebar-layout-change` con el estado accesible de `app.ts`. Las tarjetas pasan a una columna cuando su contenedor mide 44rem o menos. Esta condición también responde al tamaño de fuente del navegador. Hay ajustes adicionales en 1050, 1250 y 1600 px. Conserva la navegación accesible y verifica ausencia de desbordamiento horizontal de la página, también con submenús abiertos. El desplazamiento horizontal interno del menú en pantallas estrechas es intencional para conservar las etiquetas completas.

## 5. Taxonomía y contenido

El árbol completo y su orden se definen en `src/data/navigation.ts`. Las siete áreas principales aparecen en el mismo orden que la tabla de iconos. En Desarrollo, por petición del 21 de octubre, todas las ramas con hijos se pueden desplegar aunque no tengan páginas disponibles. Sus descendientes conservan el árbol completo. Producción muestra únicamente los destinos publicados y sus ancestros por la petición posterior del 24 de octubre. Las hojas sin destino siguen como filas deshabilitadas sin enlace. Esta decisión sustituye el bloqueo recursivo de ramas sin contenido. Abrirlas no publica páginas ni cambia las rutas disponibles.

Por petición del usuario, dentro de Software Development aparece primero Frontend Development y después Backend Development.

El 22 de octubre, Software Architecture pasa a ser un desplegable con Architectural Styles (REST, Monolithic, Microservices y Event-Driven) y Architectural Patterns (MVC y Hexagonal). En español se muestran Estilos Arquitectónicos, Monolítica, Microservicios, Orientada a Eventos y Patrones Arquitectónicos. REST y MVC mantienen sus siglas. Las ramas se pueden abrir y las hojas sin página publicada permanecen deshabilitadas. Se añade estructura de navegación sin publicar ni duplicar los conceptos históricos del catálogo. REST API sigue dentro de Software Design → API Design como aplicación práctica. Las fuentes conceptuales son [Microsoft sobre MVC](https://learn.microsoft.com/en-us/aspnet/core/mvc/overview), [Fielding sobre REST](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) y [Microsoft sobre estilos arquitectónicos](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/).

`NavigationTree.astro` distingue:

- Rama con hijos: `details`/`summary` nativos. Se puede desplegar aunque todavía no tenga lecciones publicadas.
- Hoja con `href`: enlace a un módulo existente.
- Hoja sin `href`: `span` con `aria-disabled="true"`, visible y no clicable.

La petición del 21 de octubre sustituye el bloqueo de ramas vacías del día 19. Abrir una rama no habilita destinos sin contenido.

El árbol amplio sustituye al antiguo sidebar de solo seis rutas. El catálogo fuente conserva seis rutas con lecciones. La disponibilidad visible en la aplicación quedó limitada posteriormente a Software Design. Las otras rutas no se renderizan como páginas ni tienen enlaces activos. Este es el orden de su catálogo fuente:

| Ruta | ID | Conceptos actuales | Ubicación en el árbol |
| --- | --- | ---: | --- |
| User Experience Design | `ux-design` | 6 | Human-Computer Interaction |
| Software Design | `software-design` | 19 | Software Engineering |
| Software Architecture | `software-architecture` | 5 | Software Engineering |
| Distributed Systems | `distributed-systems` | 40 | Computer Systems |
| System Design | `system-design` | 12 | Software Engineering |
| Generative AI Applications | `applied-ai` | 32 | Artificial Intelligence → Generative Artificial Intelligence |

Total actual en el catálogo fuente: 114 conceptos. La interfaz disponible muestra Home y Software Design con 19 conceptos en cuatro páginas: SOLID Principles, Creational, Structural y Behavioral. Las recomendaciones de Home conservan el mapa profesional y muestran las rutas excluidas como no disponibles. El diálogo histórico de fuentes se limita a las referencias de Software Design. `Information Architecture` y `User Experience Design` apuntan actualmente al mismo módulo en el catálogo; no dupliques sus conceptos solo para crear dos destinos. Sistemas distribuidos y diseño de sistemas son áreas distintas, no una debe absorber la otra.

Modelo: `Track` contiene módulos; cada `Module` contiene conceptos. Un `Concept` tiene `id`, `title`, `description`, `source` y `level` (`Esencial`, `Intermedio` o `Avanzado`). `description` contiene la Explicación en un único párrafo. `useCase` y `example` son campos opcionales para los otros dos botones; si faltan o solo tienen espacios, sus botones quedan deshabilitados. Los 19 conceptos publicados solo tienen explicación. No se añade contenido para habilitar controles por iniciativa del agente. `source` es obligatorio y referencia un autor u organismo con título y URL en `src/data/concept-sources.ts`. `details` y `memory` son históricos y no se renderizan. Búsqueda y repaso leen explícitamente el panel de explicación para no variar al cambiar de vista. Los archivos de datos son la fuente de verdad, no el HTML compilado.

En los títulos de las tarjetas, la palabra que sigue a un separador tipográfico como `·` o `/` empieza con mayúscula: `O · Abierto / Cerrado`, `RPC · Llamada remota` y `Delay · Retardo`. Esta convención no altera los IDs ni las notaciones técnicas, como `Precision@k`.

Por petición del usuario del 19 de octubre de 2026, las tarjetas no incluyen el desplegable «Un ejemplo». Posteriormente pidió sustituir la ayuda para recordar por una fuente verificable y simplificar su presentación. El enlace muestra la bombilla a la izquierda, el nombre del autor u organismo y un único icono de cadena `Link2` de Lucide a la derecha. No muestra la etiqueta visible «Fuente original» ni otro icono de enlace. El bloque no tiene esquinas redondeadas. El texto no tiene subrayado, tampoco en hover. Toda la zona sigue siendo un enlace y sus iconos y texto cambian de color juntos en hover. Abre una pestaña nueva con `noopener noreferrer` y anuncia esa acción mediante su nombre accesible. El título del documento se conserva en `title`. Todas las tarjetas incluyen el enlace y el repaso reutiliza el mismo contenido y fuente.

La pauta editorial del 19 de octubre de 2026 exige respuestas más simples y resumidas para una entrevista técnica. La vista Explicación presenta un único párrafo de una o dos frases con un máximo de tres líneas a tamaño normal en los anchos soportados. El texto se justifica, su última línea queda alineada al inicio y las palabras no se dividen. Explica lo esencial de forma directa y profesional. Debe entenderse al escucharla una vez tanto por selección de personal IT como por el equipo técnico. Conserva el significado técnico sin añadir detalles secundarios ni repetir el título cuando no aporta información. Cada oración termina con punto. En las descripciones no se usan comas, punto y coma, dos puntos, guiones explicativos ni flechas. Reformula la frase en lugar de retirar puntuación mecánicamente. No mezcles ejemplos ni eslóganes de recuerdo en la explicación; los ejemplos tienen su apartado opcional desde la petición del 20 de octubre. Las 19 explicaciones publicadas de SOLID y Design Patterns siguen este formato.

Los 113 conceptos se revisaron con fuentes primarias o documentación del organismo responsable. Se aclararon especialmente SRP y LSP, el alcance de Singleton, la diferencia entre Factory Method y Simple Factory, CAP frente a ACID, los límites de RAG y la distinción entre respaldo documental y verdad. Los títulos de escalado vertical y horizontal ya no se asocian respectivamente a RDBMS y NoSQL porque ambas estrategias pueden aplicarse a distintos modelos de datos. Se conservaron los IDs y el progreso.

Las referencias apuntan al concepto específico. Por petición del usuario del 20 de octubre de 2026, los 14 patrones enlazan a sus páginas específicas de Refactoring.Guru. Factory Method usa su página en español y Simple Factory usa la sección específica de Factory Comparison en inglés y muestran Refactoring.Guru como organismo. Esta decisión sustituye los enlaces anteriores a UNC y Addison-Wesley y constituye una excepción a la preferencia general por fuentes primarias. SOLID enlaza a Martin y a Liskov y Wing. Otras referencias incluyen IETF, W3C, NASA, NIST, los proyectos Apache, documentación de los proveedores y artículos originales de investigación. Una institución no es una garantía absoluta: comprueba que el pasaje respalda la explicación y vuelve a revisar las referencias cuando cambie el contenido. No presentes una fuente como «la mejor del mundo» mediante una clasificación no verificable.

Ese mismo día, el usuario pidió integrar los patrones de `C:\Workspace\design-pattern-practices` en Software Design. Esta área muestra `SOLID Principles` y el desplegable `Design Patterns`, que contiene las subpáginas `Creational`, `Structural` y `Behavioral`. El antiguo módulo de APIs REST y sus cinco conceptos siguen retirados de las páginas, búsqueda y repaso. El 22 de octubre se añade únicamente la estructura `API Design` → `REST API` dentro de Software Design, después de Design Patterns. Sus traducciones son `Diseño de API` → `API REST`. La rama se puede desplegar en Desarrollo y la hoja permanece deshabilitada sin href hasta publicar contenido. La petición posterior del 24 de octubre añade SOAP, GraphQL, gRPC, Webhook y WebSocket con el mismo estado pendiente. Su `href` de área sigue apuntando a SOLID para las recomendaciones y las tarjetas de Home; el sidebar renderiza sus hijos. Se mantienen los IDs `solid`, `patrones` y los IDs de los conceptos conservados para mantener enlaces y progreso. Creational conserva el ID y la ruta anteriores `patrones`; las otras páginas usan `patrones-estructurales` y `patrones-comportamiento`.

`src/data/design-patterns.ts` reúne 14 patrones: Facade, Adapter, Iterator, Simple Factory, Factory Method, Builder, Prototype, Strategy, Decorator, Observer, Singleton, State, Mediator y Visitor. `designPatternPages` los distribuye en las categorías GoF: Creational (Simple Factory, Factory Method, Builder, Prototype y Singleton), Structural (Facade, Adapter y Decorator) y Behavioral (Iterator, Strategy, Observer, State, Mediator y Visitor). Cada tarjeta de patrones muestra el nombre y la explicación conceptual con su fuente, además del nivel y el control de progreso compartidos. Actualmente no tienen casos de uso ni ejemplos, por lo que esos botones están deshabilitados. No se muestran frases de recuerdo. Búsqueda y repaso utilizan el párrafo de Explicación aunque se seleccione otro apartado con contenido.

Los patrones se ordenan de Esencial a Intermedio y Avanzado, según las abstracciones y la coordinación necesarias para comprenderlos. Por petición expresa del usuario, SOLID sigue el orden de su sigla: S (01), O (02), L (03), I (04) y D (05), independientemente del nivel de dificultad de cada principio. La dificultad de los patrones es una propuesta editorial de aprendizaje, no una clasificación universal. Las referencias de las tarjetas se centralizan en `src/data/concept-sources.ts`. Design Patterns usa Refactoring.Guru y SOLID conserva las fuentes de Martin y de Liskov y Wing.

El inventario se contrastó con el README y las carpetas Java del proyecto de prácticas. `visitor` no aparece en su README y su implementación es una estrategia de pago; la tarjeta explica Visitor mediante visitantes y doble despacho, sin reproducir esa confusión. `Simple Factory` centraliza la elección según un argumento y conserva el ID `factory`. La tarjeta independiente `Factory Method` explica la creación mediante subclases. No equipares Simple Factory, la variante del proyecto de prácticas, con Factory Method. El proyecto de prácticas solo se consulta como referencia y no se modifica.

Para añadir contenido, actualiza el archivo de datos apropiado y el destino de navegación. Una nueva ruta también requiere revisar imports, `tracks` y `trackOrder` en `index.astro`. La portada recibe esos datos y deriva de ellos disponibilidad y conteos; no mantengas una segunda cifra manual. No alteres todo el layout como efecto secundario de añadir una lección.

### Home y orientación profesional

La raíz y `#home` muestran una portada propia: presenta el alcance de la aplicación, el inventario de áreas y conceptos, recomendaciones por perfil y etapa y opciones de desarrollo profesional. No debe abrir por defecto User Experience Design ni ningún otro módulo. Las siete áreas siguen visibles también cuando sus lecciones están pendientes; diferencia recomendaciones de estudio de contenido que realmente puede abrirse.

Inventario visible actual: **7 áreas principales, 1 ruta con contenido, 19 conceptos y 5 perfiles**. El catálogo fuente conserva seis rutas y 114 conceptos. Son valores derivados del árbol, los tracks y los perfiles, no constantes del diseño.

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

No se sincroniza entre dispositivos. Se validan IDs al leer y se ignoran solo los que ya no existen en el árbol renderizado. Se conserva el estado de todas las ramas con hijos aunque no tengan contenido publicado. Si localStorage está bloqueado o contiene JSON inválido, la interfaz debe seguir funcionando. Menús cerrados en una primera visita sin estado; después se restaura cada rama, incluidos hijos abiertos dentro de padres cerrados. Se guarda con `toggle` y `pagehide`. Navegar a una lección no abre sus padres automáticamente.

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

La vista «Implementación» sustituye la etiqueta «Ejemplo» por petición del 20 de octubre de 2026 y está destinada a mostrar código. Conserva el ID y el campo interno `example`. Solo se habilita cuando tiene contenido.

El 21 de octubre de 2026 se añade Factory Method con ID `factory-method` y nivel Intermedio. Simple Factory conserva el ID `factory` y nivel Esencial. Son conceptos distintos. Simple Factory enlaza a la sección correspondiente de Factory Comparison de Refactoring.Guru en inglés. Factory Method enlaza a su página en español. Hay 14 patrones y 19 conceptos publicados en Software Design.

Al añadir un concepto no reformules otros existentes sin petición expresa. El 21 de octubre se restauró literalmente la explicación de Simple Factory por indicación del usuario.


### Corrección de idiomas del 21 de octubre de 2026

El selector nativo mantiene un objetivo de 44 px y la escala de 14 px/400. Usa los tokens y el chevron de Lucide. La cabecera permite reflujo al ampliar texto sin desbordar. Las traducciones conservan el HTML y las cadenas originales mediante referencias a cada nodo y atributo. Navegación y breadcrumb mantienen Title Case como `Diseño de Software`. Los párrafos mantienen la capitalización y el número de frases originales. Los títulos de patrones se localizan con `translatePatternTitle` en `src/scripts/i18n.ts`: por ejemplo `Método de Fábrica` en español y `Factory Method` en inglés. Cada título muestra un solo idioma. El HTML inicial usa español y conserva el nombre inglés de `src/data/design-patterns.ts` en `data-pattern-title`. El motor actualiza explícitamente el texto y su atributo `lang`; `translate="no"` protege frente a traducciones automáticas externas. El repaso mantiene estos atributos y las etiquetas accesibles leen el título localizado. La búsqueda admite los dos nombres. Esta petición sustituye los títulos siempre ingleses y la presentación bilingüe anterior. No se reformulan las explicaciones españolas. Se cubren además metadatos, autorías, títulos de fuentes, etiquetas accesibles y anuncios de búsquedas y perfiles. Behavioral se traduce como `Comportamiento`.

El selector de idiomas no muestra outline exterior ni sombra al enfocarse por petición posterior del usuario. La señal de foco utiliza el fondo suave y el color de texto e icono. El modo de colores forzados mantiene el contorno del sistema.

La capitalización de títulos y etiquetas se aplica solo a las palabras principales. Artículos, preposiciones y conjunciones como de, del, la, en e y quedan en minúscula salvo al inicio. Conserva nombres propios y siglas. Ejemplos: `Diseño de Software`, `Calidad del Software` y `Director of Engineering`. Esta precisión sustituye la regla anterior que capitalizaba cada palabra.

### Home sin introducción — 22 de octubre de 2026
Por petición del usuario se retira únicamente la cabecera introductoria: Tu mapa de aprendizaje, Organiza tu aprendizaje técnico, su descripción, Encuentra tu ruta y El conocimiento se construye. Home comienza visualmente por las cuatro estadísticas. Se conservan los perfiles, el selector de etapa, las recomendaciones, las ramas profesionales y las rutas disponibles. El título Home permanece solo para lectores de pantalla.


## Organización conceptual y orden de aprendizaje — 22 de octubre de 2026
La revisión final cubre 114 nodos y 28 desplegables. Los siete grupos principales son Sistemas Informáticos, Interacción Persona-Computadora, Ingeniería de Software, Gestión e Ingeniería de Datos, Ciberseguridad, Ciencia de Datos e Inteligencia Artificial. La pertenencia conceptual y los conocimientos previos son relaciones distintas. El orden del menú orienta el aprendizaje sin obligar a completar cada grupo antes del siguiente. Es una síntesis editorial contrastada con CS2023, SWEBOK y cursos reales. No es una taxonomía universal ni una reproducción de MIT o Harvard.

Programación y sus bases pertenecen a Desarrollo de Software. Diseño, Arquitectura, Pruebas y Operación conservan sus ámbitos. Matemáticas Discretas precede a estructuras y algoritmos dentro de Desarrollo y se referencia también desde Criptografía. Las bases matemáticas y estadísticas se comparten entre Ciencia de Datos e IA mediante definiciones únicas. No vuelvas a encerrarlas bajo Algoritmos ni a tratarlas como propiedad exclusiva de Ciencia de Datos.

Gestión e Ingeniería de Datos agrupa Gestión de Datos y la rama Ingeniería de Datos. Modelado, transacciones e índices están bajo Bases de Datos porque no son exclusivos del modelo relacional. Búsqueda Vectorial es una capacidad y no un tercer modelo excluyente. IA incluye búsqueda, planificación y razonamiento además de aprendizaje automático. Aplicaciones de IA Generativa queda dentro de IA Generativa y mantiene el ID applied-ai.

Los roles se mantienen en Home. Sus fundamentos remiten a Programming Fundamentals. Las etapas iniciales incorporan computación, pruebas y seguridad. Las referencias y sus prerrequisitos están comprobados y no tienen ciclos. Las migraciones de navegación conservan preferencias antiguas sin abrir padres automáticamente. El estado remoto auditado tenía Home y Software Design con 19 conceptos y cuatro módulos. La petición posterior incorpora localmente el glosario de IA con 104 conceptos en diez páginas y queda pendiente de subir. Las hojas pendientes siguen sin enlaces.

Se corrigieron las explicaciones y traducciones de Simple Factory, Builder y Factory Method. La revisión conceptual solicitada el 22 de octubre sustituye para esos textos la restauración literal del 21 de octubre. Se conservan IDs y progreso. La justificación, las fuentes y el alcance de las pruebas están en [la revisión de navegación](NAVIGATION_REVIEW.md). Ejecuta npm run check:curriculum además de tipos y build cuando cambien las relaciones del catálogo.

Aclaración posterior: Sistemas comienza con Fundamentos de Computación; Desarrollo incluye Frontend, Backend y Móvil. Estas hojas todavía no tienen lecciones ni enlaces habilitados. El último grupo se llama Inteligencia Artificial: nombra el campo, no un puesto.


### Identidad y orientación para entrevistas — 22 de octubre de 2026

El usuario eligió Tech Interview Prep y autorizó únicamente el cambio de nombre, subtítulo y presentación/orientación. Home incorpora una cabecera breve con «Fundamentos para entrevistas técnicas» y «Repasa conceptos clave y prepara tus respuestas para entrevistas técnicas de distintos perfiles y empresas». En inglés usa «Foundations for technical interviews» y su presentación traducida. La escala tipográfica existente se conserva. Esta petición posterior permite esa presentación breve sin recuperar el antiguo hero, sus diagramas o llamadas a la acción. Se actualizan marca, nombre accesible, títulos dinámicos y metadatos. El selector de perfil orienta el repaso para entrevistas. No se modifican áreas, conceptos ni recomendaciones curriculares. Se mantienen IDs, claves de almacenamiento, nombre interno del paquete y destino de alojamiento para conservar compatibilidad. No se publica remotamente.

La redacción vigente del propósito de Comportamiento es «Define cómo colaboran y se reparten responsabilidades los objetos». La cabecera se presenta en mayúsculas y sin punto final. Su versión inglesa es «Defines how objects collaborate and share responsibilities».

Petición del 23 de octubre: los botones del selector de etapa de Home usan radio completo de 9999 px. Se retira el marco exterior del grupo para que el reflujo no produzca un óvalo grande. Conserva colores, escala y estados. Se está contrastando una propuesta de niveles laborales basada en empresas reales. No presentar Fundamentos o Intermedio–Senior como categorías laborales oficiales ni mezclar Lead, Analyst, Architect y CTO en una única escalera. Las etiquetas y recomendaciones del catálogo aún no se han reestructurado durante esta consulta.

Petición posterior del 23 de octubre: las tarjetas de selección de perfil bajo «Un perfil. Varias áreas conectadas» usan radio 2XL equivalente a 16 px a escala normal mediante --radius-profile: 1rem. No se aplica a las demás tarjetas ni al selector de etapas, que conserva su radio completo.

Descripción de Backend elegida expresamente el 23 de octubre tras debatir alternativas: «Implementa la lógica de negocio». Versión inglesa: «Implements business logic». Sustituye «Desarrolla servicios y gestiona datos». No modificar las frases durante una conversación exploratoria sin una petición de cambio.
