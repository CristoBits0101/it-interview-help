# Auditoría de peticiones y continuidad de la sesión

## 24 de octubre de 2026 — espacio interior del selector de idiomas

Se modifica únicamente el inset derecho del chevron de idiomas de 16 a 14 px. Su margen transparente añadía unos 3 px hasta el trazo visible. La distancia desde el borde exterior al inicio de la caja de texto conserva 17 px y la distancia al trazo visible de la flecha pasa de aproximadamente 19,02 a 17,02 px. El select conserva 106 × 44 px, padding de 8/38/8/16 px, Google Sans Flex a 14 px/peso 400 e interlineado de 16 px.

Verificado en navegador en ES/EN a 1440, 390 y 320 px sin desbordamiento. Cambio de idioma por teclado, foco visible y persistencia tras recarga correctos. Sin errores ni avisos de consola. Astro check sobre 57 archivos sin errores, advertencias ni sugerencias y build correcto. El cambio está solo en `C:\Users\reuda\.codex\worktrees\6727\tech-training`; su servidor queda disponible en `http://127.0.0.1:4327/`. Se conserva la modificación previa de esta auditoría. No se realiza commit, push ni publicación en Sites.

## 24 de octubre de 2026 — Home con separaciones de 42 px y prosa justificada

La petición se limita al contenido principal de Home. `--space-home: 42px` centraliza las distancias entre bloques y tarjetas sin reducirlas en móvil. Se retiran los márgenes y paddings que se acumulaban en esas separaciones. Los separadores son elementos del flujo sin margen ni padding y reciben 42 px a cada lado mediante el gap del contenedor. El separador anterior a las recomendaciones se oculta junto con el panel al cerrar la etapa. Se conservan los insets funcionales de los controles, el padding exterior de `main`, los textos, la tipografía, los colores y `--line-body`.

La prosa de Home usa justificación con última línea al inicio y `hyphens: none`, `word-break: normal` y `overflow-wrap: normal`. Las estadísticas reducen el número de columnas cuando falta ancho. El bloque de objetivos pasa a una columna en pantallas estrechas. Con texto ampliado y muy poco ancho disponible los números y títulos se distribuyen en filas y se reduce el padding de los paneles informativos anidados para conservar las palabras completas. Los controles mantienen su padding funcional.

La implementación queda en `C:\Users\reuda\.codex\worktrees\6576\tech-training`. Antes de modificar se confirma que este worktree y `C:\Workspace\tech-training` comparten HEAD y el mismo cambio pendiente en esta auditoría. Se conserva ese cambio anterior. El resultado se sirve en `http://127.0.0.1:4322/#home` y se mantiene disponible para revisión. El checkout habitual y su servidor de 4321 permanecen intactos. No se hace commit, push ni publicación en Sites.

Validación con Node 22.23.2: `npm run check` sobre 57 archivos sin errores, advertencias ni sugerencias y `npm run build` correcto. `git diff --check` correcto. En navegador se miden 42 px desde el título hasta las tarjetas y entre bloques. Cada separador del flujo mide 1 px y deja 42 px a ambos lados. Se revisan ES/EN a 1440, 1251, 1255, 1475, 390 y 320 px y los 40 estados de perfil y etapa a 320 px. Otros 40 estados se recorren con texto al 200 % y se corrigen los tres objetivos con palabras que excedían su caja. Tras las correcciones no se detectan desbordamientos de página ni de esos textos. El espaciado personalizado funciona a 1440, 390 y 320 px en ambos idiomas. Se comparan 52 elementos con el checkout original y conservan texto, familia, tamaño, peso, color e interlineado. El cierre del panel retira también su separador. Se revisan capturas de escritorio y móvil, se restauran Español, Frontend y Trainee y se eliminan las páginas temporales de prueba. Estas comprobaciones se limitan a Home.

## 24 de octubre de 2026 — interlineado global de 16 px

Por petición expresa del usuario todas las interfaces usan un interlineado compartido de 1rem (16 px a tamaño normal) mediante --line-body. Incluye Home, navegación, búsqueda, selectores, tarjetas, diálogos y código en ambos idiomas y todos los estados responsive. Esta decisión sustituye únicamente los valores anteriores de line-height y el factor proporcional. Se conservan familias, tamaños, pesos, colores, padding y alturas mínimas de controles y filas. El interlineado escala con el tamaño raíz y permite las preferencias de espaciado del usuario.

Validación en el checkout habitual C:\Workspace\tech-training: npm run check sobre 57 archivos sin errores, advertencias ni sugerencias y npm run build correcto. git diff --check correcto. En navegador los 3.766 elementos de texto y controles inspeccionados usan 16 px sin excepciones, incluidos selectores, diálogos ocultos y código. Home, patrones y glosario se revisan en ES/EN a 1440, 390 y 320 px sin desbordamiento de página. Se conservan las fuentes, filas de navegación de 48 px y controles de guía de 44 px. Escape devuelve el foco a Implementación y no hay errores de consola.

Con raíz al 200 % el interlineado escala a 32 px. Persisten las limitaciones previas a 320 px en números de círculos, ancho del botón Implementación y títulos de cabecera de las guías. No se alteran dimensiones ajenas a la petición. El espaciado personalizado se aplica sin desbordamiento de página. Se retiran las páginas temporales de prueba y se detiene solo su servidor de preview. El servidor habitual se conserva. El cambio está aplicado localmente también en la carpeta habitual y conserva todos sus cambios previos. No se realiza commit, push ni publicación en Sites para este ajuste.


## 24 de octubre de 2026 — interlineado proporcional compartido — histórico

Por precisión expresa del usuario toda la aplicación usa el mismo factor de interlineado sin unidad: `--line-body: 1.6`. Las reglas locales de Home, navegación, estudio, controles, diálogos y código remiten a ese token. La altura resultante es proporcional al tamaño de cada fuente y sustituye las alturas particulares anteriores. Se conservan familias, tamaños, pesos, colores y espaciados salvo la igualdad tipográfica solicitada para las cifras y etiquetas del resumen de Home. Ambos usan Google Sans Flex a `--font-small` (14 px), peso 400, tracking normal y línea de 22,4 px a escala normal. Conservan sus colores distintos.

Aplicado tanto en el worktree de revisión como en `C:\Workspace\tech-training` conservando los cambios previos. Tipos sin errores, advertencias ni sugerencias y build correcto. Verificado en la página local servida a 1280 px: resumen ES/EN con tipografía idéntica, factor 1.6 en el texto visible de Home y Creacionales y en títulos, controles y código del diálogo de implementación. Sin desbordamiento horizontal en Home y Creacionales. Revisión visual de Home y diálogo. Revisión posterior: Home, Creacionales y su diálogo se comprueban a 320 y 390 px con texto normal sin desbordamiento de página ni texto fuera de sus cajas. Home y su panel de recomendaciones también se comprueban con el tamaño raíz duplicado de 16 a 32 px a 320 y 1280 px y el resumen en inglés a 320 y 390 px sin desbordamientos. La prueba al 200 % detecta limitaciones previas en estudio: números que exceden sus círculos, la etiqueta Implementación que supera su caja a 320 px y títulos de la guía que se solapan a ese ancho. Se reproducen al restituir temporalmente el interlineado anterior de los elementos afectados; el número ya heredaba 1.6 antes del cambio. No se modifican esos problemas de anchura y tamaño fijo ajenos al ajuste solicitado ni se afirma que toda la aplicación supere la prueba al 200 %. Se retiran todos los estilos temporales de prueba y se restaura el viewport. Sigue sin realizarse una prueba con lector de pantalla. No se publica en Sites.

## 24 de octubre de 2026 — tooltips y pegatinas en las etiquetas de etapa

El usuario solicita una definición breve bilingüe para cada una de las siete etiquetas. Se presenta en tooltips disponibles al pasar el puntero y accesibles mediante teclado y dispositivos táctiles. Trainee se explica como formación para un puesto o una nueva área sin asociarlo a carecer de estudios. Las definiciones no incorporan años ni equivalencias obligatorias entre nombres.

Las cápsulas conservan su aspecto de pegatina con radio completo de `9999px` y acabado plano sin sombra ni borde blanco inferior. Sus colores de texto, fondo y borde permanecen fijos. Conservan Google Sans Flex a 13 px y peso 300 y no tienen hover ni estado activo propios. Siguen siendo etiquetas dentro de cuatro botones compartidos con los mismos IDs, números, 20 paneles y persistencia. Esta petición habilita las explicaciones en tooltips que antes no se mostraban.

## 24 de octubre de 2026 — tipografía compartida en las cápsulas de etapa

Por petición del usuario los nombres de las cápsulas usan la misma tipografía que los números del 1 al 4: Google Sans Flex, tamaño `--font-meta` de `.8125rem` (13 px a escala normal) y peso 300. El ajuste se limita a `.career-stage-term`.

## 24 de octubre de 2026 — cápsulas de nombres dentro de cuatro botones de etapa

El usuario aclara que desea cuatro botones y cuatro itinerarios compartidos. Dentro de cada botón los nombres aparecen en cápsulas redondeadas: `Trainee` y `Becario`, `Entry Level` y `Junior`, `Mid Level` y `Semi-Senior` y finalmente `Senior` solo. Cada grupo conserva un único número del 1 al 4. En inglés se muestra `Intern` en lugar de `Becario`. Pulsar cualquiera de las cápsulas activa el botón y el itinerario del grupo. Se retiran los separadores de barras o punto medio. No se añaden años ni texto aclaratorio.

Se conservan los IDs `foundation`, `junior`, `mid` y `senior` y los 20 paneles derivados de cinco perfiles y cuatro etapas. Senior mantiene la unión con advanced. La selección y el cierre siguen guardándose por ID. La separación de los siete nombres es visual y no crea siete etapas independientes ni IDs nuevos.

Validación: tipos sin errores ni avisos y currículo y build correctos. En navegador se comprueban español e inglés a 1600 y 390 px y el ajuste a 320 px sin desbordamiento. Trainee y Becario abren el mismo panel y una segunda pulsación cierra el grupo. Las cápsulas permanecen dentro de sus botones.

## 24 de octubre de 2026 — punto medio en las etiquetas de etapa — histórico

El usuario autoriza sustituir las barras por un punto medio en las etiquetas de Home: `Trainee · Becario`, `Entry Level · Junior`, `Mid Level · Semi-Senior` y `Senior`. En inglés se muestra `Trainee · Intern` en la primera etapa. Se conservan las cuatro etapas y sus IDs. Esta decisión sustituye los separadores de las etiquetas históricas del 23 de octubre.

## 24 de octubre de 2026 — etiquetas de etapa alineadas a la izquierda

El usuario decide alinear a la izquierda el texto de los botones de etapa. El cambio se limita a `text-align` de las etiquetas y conserva las posiciones y medidas de los números y la distribución de escritorio y móvil. La pregunta que identifica el selector no cambia. Esta decisión sustituye el centrado anterior documentado más abajo.

Build y `git diff --check` correctos. Verificado en navegador a 1600 y 390 px: las cuatro etiquetas usan alineación izquierda y los números conservan sus medidas e inset izquierdo. Sin desbordamiento horizontal en móvil.

## 24 de octubre de 2026 — estadísticas con contador y título juntos

Se coloca cada contador a la izquierda de su título y la subdescripción debajo. Los títulos pasan a Áreas Principales, Rutas con Contenido, Conceptos y Perfiles Profesionales con traducciones equivalentes. Los contadores conservan el verde existente y usan peso 400. Se mantienen los valores calculados y el resto de textos.

Validación: Astro check sin errores, advertencias ni sugerencias y build correcto. Verificado en navegador a 1600, 390 y 320 px con revisión de ES/EN. Los contadores usan peso computado 400 y conservan el color verde. Título y cifra comparten fila y la descripción queda debajo. Sin desbordamiento horizontal ni errores de consola.

## 24 de octubre de 2026 — centrado de etiquetas de etapa

Se centra únicamente el texto de las etapas respecto al botón completo mediante columnas laterales iguales. Se corrige el primer ajuste que centraba la etiqueta solo en el espacio posterior al número. Los círculos permanecen a la izquierda con sus medidas originales y se conserva el modo responsive en columna.

Verificado en navegador a 1600 y 390 px: las cajas de las cuatro etiquetas coinciden con el centro horizontal de sus botones. Sin desbordamiento horizontal. Se comprueban español e inglés y se conserva el número en el lateral izquierdo.

## 24 de octubre de 2026 — descripciones de perfiles sin punto final

Se retira el punto final de los cinco textos breves de Elige tu Dirección en ES/EN. A petición del usuario se acorta únicamente DevOps a «Automatiza la entrega y operación» con traducción «Automates delivery and operations». Se conservan los resúmenes y las recomendaciones de los paneles.

Verificados los cinco textos renderizados en español e inglés. Tipos y compilación correctos.

## 24 de octubre de 2026 — espacio exterior del contenido

Por aclaración del usuario el padding exterior pertenece a `main` arriba y abajo. Se aplica `--space-page` en sus cuatro lados y se retiran los paddings equivalentes de Home, estudio y el final de Siguiente módulo. Se conservan el margen entre tarjetas y pie y los gaps entre secciones. Home y búsqueda también mantienen espacio al final.

Validación: build y git diff --check correctos. Home comprobada en navegador a 1280 y 390 px con padding inferior de 42 y 20 px respectivamente y sin desbordamiento horizontal. Glosario y búsqueda con y sin resultados revisados a 390 px. Estudio y pie no duplican padding. Sin errores de consola.

## 24 de octubre de 2026 — cierre del panel de etapa de Home

El usuario solicita cerrar el panel inferior al volver a pulsar la etapa seleccionada. El selector admite quedar sin etapa activa y oculta el contenedor completo. Seleccionar una etapa lo abre con el perfil actual. El cambio de perfil y de idioma conserva el cierre y el anuncio accesible está traducido a ES/EN. Por petición posterior la etapa o el cierre se guardan en almacenamiento local y se restauran al recargar. La primera visita conserva la selección inicial. Los datos inválidos o el almacenamiento inaccesible no bloquean la interacción.

Validación: Astro check sin errores, advertencias ni sugerencias y build correcto. Comprobados en navegador cierre y reapertura, cambio directo de etapa, cambio de perfil y de idioma con el panel cerrado, activación con Enter y Espacio y conservación del foco en el botón.

Validación posterior de persistencia: recargar conserva el panel cerrado sin ninguna etapa marcada. Seleccionar Junior y recargar restaura Junior y su panel. Volver a cerrarlo y recargar conserva de nuevo el cierre. Sin errores de consola.

## 24 de octubre de 2026 — retirada de información redundante

Por petición expresa se retiran el contador de pasos y Líneas clave. Se conserva el paginado con su estado activo y el resaltado de código. La descripción centrada ocupa el ancho disponible sin reservar columnas para el contador eliminado. Se retira también su actualización del script. Tipos y compilación correctos. Navegación comprobada a 1440, 390 y 320 px.

## 24 de octubre de 2026 — descripción centrada junto al contador

Se traslada implementation-why a la fila del contador con centrado horizontal estable y alineación vertical. La navegación mantiene sincronizados título, descripción y código. Se conservan los últimos ajustes del h3 centrado y de Líneas clave con peso 400 y puntos intermedios. Tipos y build correctos. Comprobada alineación y cambio de paso a 1440, 390 y 320 px.

## 24 de octubre de 2026 — títulos de paso en cabecera

Se trasladan los h3 de los pasos a la cabecera del diálogo con IBM Plex Mono 500 y mayúsculas. La navegación actualiza el único título visible y mantiene el enlace accesible de cada sección. Se conserva la traducción por nodos. Tipos y compilación correctos. Verificados cambio de paso, fuente cargada y ausencia de desbordamiento a 1440, 390 y 320 px. También se conserva la retirada solicitada del punto final en Líneas clave.

## 24 de octubre de 2026 — simetría vertical del diálogo

Se elimina la acumulación de márgenes usando el gap compartido en el flujo del cuerpo y los pasos. Se iguala la separación hasta el código y a ambos lados del bloque Ver código completo. Se oculta el espacio de estado de copia cuando está vacío. El padding vertical de cabecera y pie usa el mismo gap. Compilación correcta y siete separaciones consecutivas medidas en navegador: 12 px en escritorio y 8 px a 390 y 320 px. Captura móvil revisada.

## 24 de octubre de 2026 — cabecera y espaciado de las guías

Se retira «Implementación · Java» y se redondea completamente el hover de cierre. Se igualan los espacios de Líneas clave hasta el código y el separador y se derivan los espacios compactos del gap de la tarjeta. Verificado en navegador a 1440, 390 y 320 px: 12/12 px en escritorio y 8/8 px en móvil. Hover circular y ausencia de la etiqueta comprobados. Tipos y compilación correctos.

## 24 de octubre de 2026 — paginado redondeado y gap del paso

Se aplica radio completo a los botones numerados y el mismo gap compartido entre contador, título y descripción del paso. Se conserva el espacio completo hasta el código y el resto del diseño.

## 24 de octubre de 2026 — controles y radios de implementación

Se intercambian el contador superior y los botones numerados del pie. Se retiran borde y fondo del hover de Anterior y Siguiente. El diálogo y los bloques de código usan radio de 16 px. Tipos y compilación correctos. Navegación y medidas comprobadas en navegador a 1440, 390 y 320 px sin desbordamiento. Capturas revisadas. Se conservan los cambios anteriores en casos de uso.

## 24 de octubre de 2026 — precisión de cuatro casos de uso

Por la revisión del usuario se concretan únicamente los casos de uso de Simple Factory, Builder, Singleton y Factory Method con traducción inglesa. Se aclara la opción de notificación elegida por el usuario. Builder configura las propiedades del vehículo por pasos. Singleton comparte un objeto con datos de conexión. Factory Method comparte la validación entre servicios de email y SMS. Las explicaciones conceptuales y el código de las guías se conservan. Los ejemplos de código siguen siendo demostraciones mínimas del patrón.

## 24 de octubre de 2026 — integración para entrega autorizada

El usuario solicita subir el código a GitHub. Se integran las guías Java del commit remoto cfcf21c con las descripciones restauradas y las pautas de alcance estricto y código sin comentarios. Se preserva el caso de uso solicitado de Prototipo en el catálogo compartido de guías para evitar que la composición de datos lo sustituya. Esta autorización sustituye las notas anteriores de cambios locales pendientes de subir.

## 24 de octubre de 2026 — casos de uso mínimos y guías Java

El usuario concreta que el problema se explica en Caso de uso mediante un ejemplo mínimo y que Implementación presenta el código por pasos de construcción con explicaciones breves y líneas clave. Se añaden 14 casos de uso de una frase y 58 pasos repartidos en guías de 3 a 5 pasos. Las frases que explican los pasos tienen como máximo 17 palabras en español. Los fragmentos se derivan de un único ejemplo completo por patrón. Prototype copia una configuración de servidor y cambia la IP de la copia.

Las guías se abren en un diálogo con navegación manual y acceso al código completo. Se conservan las explicaciones originales y la selección de las otras vistas. El código usa IBM Plex Mono mediante el token compartido `--code`. Todos los textos de interfaz y de explicación tienen versión ES/EN. No hay ejecución Java dentro de la web.

Verificación realizada: los 14 programas compilan con Java 17 y producen la salida documentada. Se validan cobertura de los 14 IDs y los 58 rangos y resaltados y sus traducciones. Astro check informa cero errores y advertencias. La comprobación del currículo y el build terminan correctamente. En navegador se comprueban las 14 aperturas y cierres y sus últimos pasos y salidas. Prototype verifica cambio de paso y código completo y traducción y cierre con Escape con retorno de foco. Volver a la ruta anterior cierra el diálogo antes de mover el foco a main. Se revisan marcos de 320 y 390 px y texto al 200 % sin desbordamiento horizontal de página. El código conserva desplazamiento horizontal interno. Se corrige el reflujo de los controles con texto ampliado.

El navegador de pruebas usa HTTP y verifica la alternativa de selección manual cuando Clipboard API no está disponible. El botón usa Clipboard API cuando está disponible. No se ha afirmado una prueba de copia en HTTPS.

Para la vista previa se retira el argumento redundante de host del script dev para que admita el host aportado por el entorno. Astro mantiene su host local por defecto. Se permite únicamente `terminal.local` como host adicional de desarrollo. No se desactiva la comprobación de hosts ni se alteran dependencias. La página temporal de pruebas responsive se retira antes de empaquetar.

La versión publicada de Sites está por detrás de GitHub. La entrega anterior documenta subir a GitHub sin publicar Sites. Se prepara el cambio completo y comprobable y se deja la publicación pendiente de confirmación antes de incorporar también los cambios anteriores del sitio.
## 24 de octubre de 2026 — restauración y alcance estricto

Tras revisar el historial se restauran las descripciones literales de Simple Factory, Builder y Factory Method anteriores al commit 49ade66 del 22 de octubre. Las traducciones correspondientes ya existen. Se conservan las cabeceras de categorías y el caso de uso solicitado de Prototipo. Se registra en AGENTS y PROJECT_GUIDE la instrucción permanente de cambiar únicamente lo pedido y consultar antes de modificar algo no especificado.

## 24 de octubre de 2026 — caso de uso de Prototipo

Se añade a Prototipo el campo `useCase` con una frase sobre clonar un objeto de configuración de servidor y ajustar los valores necesarios. Se actualiza la traducción inglesa. La selección de vistas ya estaba implementada y solo faltaba contenido que habilitara el botón. No se modifica la explicación ni otros conceptos. Se conserva la fuente específica de [Refactoring.Guru](https://refactoring.guru/es/design-patterns/prototype) que respalda clonar objetos previamente configurados. Los cambios de esta petición quedan locales sin una nueva orden de subida.

## 23 de octubre de 2026 — entrega autorizada en GitHub

El usuario pide detener el servidor y subir el código a GitHub. Se prepara la entrega del lote acumulado con el glosario bilingüe, componentes reutilizables y últimos ajustes de Home y patrones. Esta autorización sustituye la retención local de las entradas históricas. Se comprueban tipos, currículo, compilación y diferencias antes de crear el commit y subirlo. No se publica Sites ni se apaga el ordenador. El resultado real de la sincronización se verifica con Git.

## 23 de octubre de 2026 — descripción breve de cada perfil

Se añaden cinco frases profesionales bajo los nombres del selector de perfil. Se almacenan en el campo `purpose` y tienen versión inglesa. Se extrae `CareerProfileOption.astro` con propiedades tipadas y descripción accesible. Se conserva el radio 2XL y el diseño responsive. Tipos, currículo y build correctos. Cinco descripciones y selección verificadas en ambos idiomas a 1440, 390 y 320 px y con texto al 200 % sin desbordamiento. El usuario pregunta después por la diferencia entre accesibilidad y usabilidad y aclara que no está pidiendo modificar el texto. No se cambia esa frase por la pregunta.

## 23 de octubre de 2026 — cuatro etapas y fondo redondeado — histórico

Se recupera el fondo con borde del selector de etapas y se redondea el contorno completo. Los botones también permanecen completamente redondeados. Por instrucciones sucesivas del usuario las etiquetas finales son `Trainee / Becario`, `Entry Level / Junior`, `Mid Level / Semi-Senior` y `Senior`. La tercera incluye barra por su última corrección. La primera se traduce como `Trainee / Intern` en inglés. Se mantienen IDs y se unifican las áreas de la transición anterior dentro de Senior. No se pierden las plantillas originales de recomendaciones. Los cinco perfiles comparten cuatro etapas y veinte paneles. No se presenta como una escala laboral oficial universal. Currículo y build correctos. Selector comprobado en ambos idiomas a 1440, 390 y 320 px sin desbordamiento y con selección operativa.

## 23 de octubre de 2026 — componentes y persistencia de navegación

Se extraen componentes tipados de layout, navegación, controles, estudio, tarjetas, fuentes, vistas, diálogos y paneles de Home. El catálogo local disponible sale de la página y se centraliza en `published-catalog.ts`. La lógica interactiva se reparte por responsabilidades con callbacks para estado y avisos. Se mantiene el diseño y los datos. Se incorpora la pauta permanente en AGENTS y [COMPONENT_ARCHITECTURE.md](COMPONENT_ARCHITECTURE.md).

Tipos sin errores, advertencias ni sugerencias. Currículo y build correctos. Comparación de 28 árboles DOM antes y después sin diferencias de estructura, atributos o textos ni errores de ejecución. Verificados perfil/etapa, vistas de tarjetas con datos temporales que no se publican, teclado y menú móvil. El usuario confirma que quiere conservar las ramas abiertas y cerradas. Se prueba el almacenamiento local existente tras recarga, cierre de rama y cambio de idioma. No se añaden cookies ni seguimiento. Los cambios siguen pendientes de subir y se conservan los anteriores.

## 23 de octubre de 2026 — descripción de cada categoría de patrones

El usuario solicita una frase como título encima de conceptos y niveles que explique el sentido de Creational, Structural y Behavioral. Se utiliza el h1 de estudio y las descripciones del catálogo con traducción al inglés. Los tres textos describen creación, composición y colaboración con reparto de responsabilidades. Estilo compartido de 15 px/peso 500 y separación derivada del padding de página. Se limita a esas tres rutas y desaparece en búsqueda. Las demás páginas mantienen su cabecera anterior. Esta decisión prevalece sobre la retirada histórica de títulos visibles. Se conservan todos los cambios locales pendientes del glosario y no se publica ni se repite el apagado de la sesión anterior.

## 22 de octubre de 2026 — Glosario de IA para entrevistas

El usuario pide implementar directamente el glosario del README local de rag-agentic-ai-toolkit. Se incorporan sus cien términos sin omisiones ni duplicados y cuatro fundamentos tratados en la conversación. Hay diez páginas bajo Aplicaciones de IA Generativa con 104 conceptos bilingües. Se distinguen fundamentos, recuperación, almacenamiento vectorial, RAG, agentes, bibliotecas, proveedores, multimodalidad, generación visual y voz. Python no recibe una nueva ruta. Las tarjetas reutilizan el diseño existente y ocultan los controles de vistas vacías únicamente en este glosario. Se conservan IDs antiguos reutilizables y el contenido histórico no montado. Software Design no se reformula.

La cobertura de cien entradas se contrasta automáticamente con el README de origen. `check:curriculum` valida además IDs globales, destinos de las diez páginas, fuentes HTTPS y traducciones de ida y vuelta. Se actualizan Home y su inventario desde los datos. El catálogo local tiene 123 conceptos en catorce módulos. La restricción previa de mostrar únicamente Software Design queda sustituida para esta implementación local. No se hace commit, push ni publicación. Las decisiones, fuentes y límites están en [AI_GLOSSARY_REVIEW.md](AI_GLOSSARY_REVIEW.md).

Se comprobaron navegación y las diez páginas en español e inglés a 1440, 390 y 320 px. Se revisaron búsqueda, persistencia de progreso, extremos del filtro de niveles, menú móvil, texto al 200 %, espaciado personalizado, movimiento reducido y colores forzados. Google Sans Flex computada a 13 px/peso 300 en descripciones. Cuarenta análisis de axe en las diez páginas a 1440 y 320 px en ambos idiomas sin infracciones automáticas. Se mantienen los límites ya documentados sobre lectores de pantalla reales y certificación de accesibilidad. Los scripts y capturas de prueba se guardan fuera del repositorio.

El usuario solicita apagar el ordenador al terminar. Es una instrucción para esta ejecución y no una automatización ni una instrucción para sesiones futuras. Se conserva la solicitud para el último paso tras guardar y validar los cambios. No se fuerza el cierre de aplicaciones ajenas.

## 22 de octubre de 2026 — Hexagonal en patrones arquitectónicos

Se añade Hexagonal bajo Software Architecture → Architectural Patterns, junto a MVC. La etiqueta es Hexagonal en español e inglés y permanece deshabilitada hasta publicar contenido. La clasificación se contrasta con el [artículo original de Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture), que presenta Ports and Adapters como patrón. Verificado el árbol en ES/EN/ES y móvil a 320 px sin desbordamiento. Tipos y compilación correctos.

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

### Simplificación de Home — 22 de octubre de 2026
Se elimina la introducción superior y sus estilos exclusivos. Se mantienen las cuatro estadísticas y todo el contenido posterior, incluidos profesión y etapa, de acuerdo con la aclaración final del usuario de quitar solo la parte de arriba.

Validación de esta simplificación: Astro check sin errores, advertencias ni sugerencias; build correcto. Home revisada en navegador a 1440 y 390 px; en móvil no hay desbordamiento horizontal. Se verifican cuatro estadísticas, cinco perfiles, cinco etapas y ausencia de la introducción.

## Organización conceptual y orden de aprendizaje — 22 de octubre de 2026
La revisión final cubre 114 nodos y 28 desplegables. Los siete grupos principales son Sistemas Informáticos, Interacción Persona-Computadora, Ingeniería de Software, Gestión e Ingeniería de Datos, Ciberseguridad, Ciencia de Datos e Inteligencia Artificial. La pertenencia conceptual y los conocimientos previos son relaciones distintas. El orden del menú orienta el aprendizaje sin obligar a completar cada grupo antes del siguiente. Es una síntesis editorial contrastada con CS2023, SWEBOK y cursos reales. No es una taxonomía universal ni una reproducción de MIT o Harvard.

Programación y sus bases pertenecen a Desarrollo de Software. Diseño, Arquitectura, Pruebas y Operación conservan sus ámbitos. Matemáticas Discretas precede a estructuras y algoritmos dentro de Desarrollo y se referencia también desde Criptografía. Las bases matemáticas y estadísticas se comparten entre Ciencia de Datos e IA mediante definiciones únicas. No vuelvas a encerrarlas bajo Algoritmos ni a tratarlas como propiedad exclusiva de Ciencia de Datos.

Gestión e Ingeniería de Datos agrupa Gestión de Datos y la rama Ingeniería de Datos. Modelado, transacciones e índices están bajo Bases de Datos porque no son exclusivos del modelo relacional. Búsqueda Vectorial es una capacidad y no un tercer modelo excluyente. IA incluye búsqueda, planificación y razonamiento además de aprendizaje automático. Aplicaciones de IA Generativa queda dentro de IA Generativa y mantiene el ID applied-ai.

Los roles se mantienen en Home. Sus fundamentos remiten a Programming Fundamentals. Las etapas iniciales incorporan computación, pruebas y seguridad. Las referencias y sus prerrequisitos están comprobados y no tienen ciclos. Las migraciones de navegación conservan preferencias antiguas sin abrir padres automáticamente. Solo Home y Software Design siguen publicados, con 19 conceptos y cuatro módulos. Las hojas pendientes siguen sin enlaces.

Se corrigieron las explicaciones y traducciones de Simple Factory, Builder y Factory Method. La revisión conceptual solicitada el 22 de octubre sustituye para esos textos la restauración literal del 21 de octubre. Se conservan IDs y progreso. La justificación, las fuentes y el alcance de las pruebas están en [la revisión de navegación](NAVIGATION_REVIEW.md). Ejecuta npm run check:curriculum además de tipos y build cuando cambien las relaciones del catálogo.

Se incorporan Fundamentos de Computación y Desarrollo Móvil a petición del usuario; ambos permanecen sin destino mientras no exista contenido.

Validación: Astro check sin errores, advertencias ni sugerencias y build correcto. Comprobadas las referencias de las 25 combinaciones de perfil/etapa, sus prerrequisitos, etiquetas únicas y los cuatro enlaces de módulos publicados. Navegador revisado a 1440 y 390 px, con menú móvil abierto sin desbordamiento de página, traducciones nuevas en ambos idiomas y breadcrumb de SOLID conservado. Las nuevas hojas no habilitan contenido inexistente.


Validación final de la revisión conceptual: 114 entradas, 28 ramas, cuatro enlaces de módulo y 25 combinaciones de perfil/etapa. Las cuatro rutas se recorrieron en ambos idiomas con 5/5/3/6 conceptos. Home se comprobó en 25 estados a 1440 px y otros 25 a 390 px. Menú móvil sin desbordamiento de página. Nuevas explicaciones en un máximo de tres líneas a 320 px en ambos idiomas. Preferencias originales restauradas y verificadas tras recarga. check:curriculum correcto. Astro check con cero errores, advertencias y sugerencias. Build correcto. Esta revisión actualiza las cifras y decisiones históricas anteriores; no certifica palabra por palabra el contenido aún no publicado.

Aclaración final de producto: preparación de fundamentos para entrevistas técnicas de distintos perfiles y empresas. No es un currículo universitario completo ni una formación exhaustiva desde cero. La marca Tech Training se conserva mientras el usuario valora nombres alternativos. La verificación de esta revisión cubre cuatro enlaces de módulo y 28 desplegables; no respalda una cifra de 360 enlaces comprobados.


### Identidad y orientación para entrevistas — 22 de octubre de 2026

El usuario eligió Tech Interview Prep y autorizó únicamente el cambio de nombre, subtítulo y presentación/orientación. Home incorpora una cabecera breve con «Fundamentos para entrevistas técnicas» y «Repasa conceptos clave y prepara tus respuestas para entrevistas técnicas de distintos perfiles y empresas». En inglés usa «Foundations for technical interviews» y su presentación traducida. La escala tipográfica existente se conserva. Esta petición posterior permite esa presentación breve sin recuperar el antiguo hero, sus diagramas o llamadas a la acción. Se actualizan marca, nombre accesible, títulos dinámicos y metadatos. El selector de perfil orienta el repaso para entrevistas. No se modifican áreas, conceptos ni recomendaciones curriculares. Se mantienen IDs, claves de almacenamiento, nombre interno del paquete y destino de alojamiento para conservar compatibilidad. No se publica remotamente.

Validación del cambio de identidad: marca y etiqueta accesible correctas. Subtítulo, presentación, descripción y Open Graph comprobados en español e inglés. Títulos de Home, búsqueda y módulo correctos. Revisión visual a 1440 y 390 px y marca legible a 320 px sin desbordamiento de página. Se mantienen cuatro enlaces y 28 desplegables. check:curriculum conserva 114 entradas y 19 conceptos. Astro check con cero errores, advertencias y sugerencias. Build correcto.

Validación del título de propósito del 23 de octubre: Astro check sin errores, advertencias ni sugerencias. check:curriculum y build correctos. Comprobados los doce estados de las tres categorías en ES/EN a 1440 y 320 px con título visible a 15 px/peso 500 encima del contador y sin desbordamiento. Revisadas capturas en escritorio y móvil. Búsqueda, SOLID y glosario conservan el título oculto. git diff --check correcto.

Ajuste posterior del 23 de octubre: a petición del usuario las tres frases de propósito usan IBM Plex Mono mediante el token --brand. Conservan 15 px/peso 500, traducción y espaciado. Esta excepción a la familia general se limita a los títulos visibles de estas tres categorías.

Petición posterior del 23 de octubre: la cabecera de propósito incorpora una línea izquierda discreta de 2 px en --accent y padding de 6/12 px derivado de --space-compact. Conserva IBM Plex Mono a 15 px/peso 500, sin fondo ni icono. El objetivo es identificar visualmente la cabecera de categoría con un tratamiento mínimo.

Ajuste de altura de la barra del 23 de octubre: se retira únicamente el padding vertical de la cabecera. La línea pasa de 33 a 21 px cuando el texto ocupa una línea. Conserva el texto a 15 px/peso 500, IBM Plex Mono, padding horizontal de 12 px, grosor de 2 px y separación exterior.

Petición posterior del 23 de octubre: las tres frases de propósito pasan visualmente a mayúsculas mediante text-transform. Se conservan los originales y traducciones, IBM Plex Mono a 15 px/peso 500 y la barra compacta sin padding vertical.

Petición posterior del 23 de octubre: se omite el punto final al presentar las tres cabeceras de propósito en ambos idiomas. Las descripciones originales conservan su puntuación y no se alteran las tarjetas.

Redacción posterior del 23 de octubre: Comportamiento muestra «DEFINE CÓMO COLABORAN Y SE REPARTEN RESPONSABILIDADES LOS OBJETOS» por petición literal del usuario. Se actualiza también la traducción inglesa. Las otras dos cabeceras se conservan.

23 de octubre: botones de etapa de Home completamente redondeados sin marco exterior continuo. Se mantiene la selección y el contenido actual mientras se concreta la escala laboral. La investigación contrasta GitLab y Dropbox y distingue niveles técnicos de especialidades y gestión.

23 de octubre: radio 2XL en los cinco botones de perfil de Home mediante el token compartido --radius-profile de 1rem. Se conservan padding, gap, colores y estados.

Petición posterior expresa: la descripción de Frontend se simplifica a «Construye interfaces web». Se actualiza también la traducción inglesa. Esta instrucción sustituye el texto que mencionaba accesibilidad.

23 de octubre: el usuario elige para Backend «Implementa la lógica de negocio». Se actualizan purpose y traducción inglesa. Las alternativas anteriores eran un debate y no se aplicaron.

Validación del caso de uso de Prototipo: tipos sin errores, advertencias ni sugerencias. Currículo y compilación correctos. En navegador a 1440, 390 y 320 px en ES/EN se comprueba que Caso de uso sustituye el cuerpo solo de Prototipo, Explicación recupera el original, Implementación permanece deshabilitada y la búsqueda mantiene la explicación como referencia. El texto cabe en tres líneas sin desbordamiento. El cambio de idioma conserva la vista seleccionada. Sin errores de ejecución. Captura revisada en móvil. Servidor temporal de prueba detenido al finalizar.

Corrección posterior del 24 de octubre: el usuario prefiere el infinitivo. La frase queda «Clonar un objeto de configuración de servidor y modificar solo los valores necesarios». Se actualiza la clave de traducción y se conserva su versión inglesa.
## 24 de octubre de 2026 — retirada de comentarios de código

Se retiran los comentarios de código de los datos, estilos y scripts. Se conserva la documentación y se registra en AGENTS y PROJECT_GUIDE la pauta permanente de no introducir nuevos comentarios. La retirada en TypeScript y JavaScript conserva la representación del código sin comentarios para comprobar que no cambia su comportamiento.

Validación: comprobación de tipos sin errores ni advertencias. Auditoría del currículo y compilación correctas. No se modifica el diseño ni se suben los cambios.
