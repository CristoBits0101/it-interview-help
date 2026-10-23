# Componentes y continuidad

Pauta solicitada el 23 de octubre de 2026: reutilizar componentes y plantillas con datos por parámetros. Separar responsabilidades para que la aplicación no crezca como un archivo monolítico. Esta pauta se conserva para las siguientes sesiones.

## Composición

| Responsabilidad | Ubicación |
| --- | --- |
| Componer Home y estudio con el catálogo disponible | `src/pages/index.astro` |
| Documento HTML, fuentes, metadatos y marco de aplicación | `src/layouts/AppLayout.astro` |
| Catálogo publicado localmente, destinos, referencias y opciones de presentación | `src/data/published-catalog.ts` |
| Sidebar y cabecera | `src/components/layout/` |
| Buscador y selector de idioma | `src/components/controls/` |
| Área de estudio, módulos, tarjetas, fuentes, vistas y progreso | `src/components/study/` |
| Estadísticas, perfiles, etapas, paneles, crecimiento y rutas disponibles | `src/components/home/` |
| Diálogos de repaso y referencias | `src/components/dialogs/` |
| Cálculo de vistas y funciones de catálogo | `src/lib/` |

Los componentes reciben propiedades tipadas. Las tarjetas reciben el concepto y opciones de presentación. Los módulos reciben los datos de su ruta. Los paneles de Home reciben perfiles, etapas y datos de las áreas. El layout recibe navegación y fuentes y usa un slot para el contenido. Las políticas de disponibilidad se mantienen fuera de la plantilla de tarjeta. No se añade React ni otra dependencia.

La composición conserva el marcado útil existente para evitar cambios visuales o de accesibilidad. Las clases y los atributos `data-*` forman el contrato con los scripts. No añadir envoltorios, cambiar IDs o introducir estilos locales sin comprobar ese contrato. Las fuentes siguen centralizadas en `concept-sources.ts` y el estilo compartido permanece en los tokens y las hojas existentes.

## Comportamiento

`app.ts` coordina ruta, búsqueda, niveles, idioma y progreso. Delega funciones delimitadas:

- `navigation.ts` mide el sidebar y persiste las ramas abiertas.
- `navigation-drawer.ts` controla el panel móvil, su foco y el atajo de búsqueda.
- `study-cards.ts` cambia vistas de una tarjeta y comunica la acción de progreso mediante un callback.
- `review.ts` recibe las tarjetas, el estado de progreso y callbacks para idioma, avisos y cambios.
- `dialogs.ts` comparte el cierre de diálogos.
- `home.ts` mantiene la selección de perfil y etapa.
- `dom.ts` centraliza las dos funciones tipadas de consulta al documento.

El estado de los desplegables permanece en `tech-training:navigation:v1`. Se guarda la lista de ramas abiertas y las demás se restauran cerradas. Se mantiene el estado de hijos aunque el padre esté cerrado. Las claves usan identificadores canónicos independientes del idioma. No se abre una rama automáticamente por visitar su ruta. No se sustituyen por cookies ni se utilizan estas elecciones para seguimiento.

## Cómo ampliar

Antes de copiar una plantilla busca un componente existente. Añade una propiedad cuando represente una variación real y conserva valores predeterminados razonables. Una sección nueva compone componentes; no replica una tarjeta completa. Si una parte tiene un comportamiento independiente extráelo con una interfaz pequeña. No crees un componente por cada palabra ni abstracciones genéricas sin un uso claro.

En una refactorización conserva datos, selección, progreso, traducciones, búsqueda, atajos y accesibilidad. Revisa tipos, currículo y compilación. Verifica el resultado real en escritorio y móvil. Los scripts y capturas de prueba no se añaden al repositorio.

## Validación de esta extracción

Astro check con cero errores, advertencias y sugerencias. Build y comprobación de currículo correctos. Se compararon 28 árboles DOM renderizados antes y después en siete rutas, dos idiomas y dos tamaños de pantalla. No hubo diferencias en texto, estructura ni atributos y no aparecieron errores de ejecución. Se comprobaron las vistas de tarjetas con contenido temporal de prueba que no se guarda en el catálogo, perfil y etapa de Home, atajo de búsqueda, panel móvil y persistencia de ramas abiertas y cerradas tras recarga y cambio de idioma. Las comprobaciones complementan las auditorías anteriores y no certifican accesibilidad completa.
