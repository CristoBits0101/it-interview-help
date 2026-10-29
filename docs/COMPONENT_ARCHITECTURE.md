# Arquitectura por dominios

La aplicación utiliza Screaming Architecture. `src/features/` reproduce la jerarquía de las etiquetas canónicas del sidebar. Los dominios reúnen sus componentes, datos, reglas, scripts y estilos en carpetas finales. Los niveles de agrupación contienen solo carpetas.

```text
src/
  features/
    computer-systems/
    human-computer-interaction/
    software-engineering/
      software-design/
        solid-principles/
        design-patterns/
          creational/
          structural/
          behavioral/
      software-development/
        programming-languages/
          java/
    artificial-intelligence/
      generative-artificial-intelligence/
    home/
  app/
  shared/
  layouts/
  pages/
```

`app/data/` compone los catálogos y conserva la navegación canónica y la disponibilidad. `app/scripts/app.ts` coordina el arranque. `shared/` contiene modelos, preferencias, traducción, referencias, controles y renderizadores reutilizables. Home conserva perfiles y orientación fuera del árbol de disciplinas. Las ramas sin implementación no necesitan carpetas vacías.

Los tipos compartidos se separan del contenido de los dominios. Las guías web, las páginas de Java, los temas del glosario y las categorías de patrones tienen datos propios en sus hojas del menú. Los agregadores conservan el orden editorial y las rutas públicas existentes.

Astro conserva sus entradas en `pages/` y el documento común en `layouts/AppLayout.astro`. AppLayout permanece como primer import de la composición para establecer el orden CSS reset, base, layout, components, responsive. Los tokens viven en `shared/styles/tokens.css`.

Las propiedades tipadas y los contratos de IDs, clases y atributos data mantienen la comunicación con los scripts. El idioma, progreso, ramas y preferencias conservan sus claves. Home mantiene el último panel visible al deseleccionar una etapa.

Las pruebas de estructura derivan la ramificación de navigation y comprueban que cada destino publicado tenga archivos propios en su dominio más profundo. También comprueban que no existan carpetas mixtas ni dominios vacíos.

## Regresión conocida de carga CSS

El commit `538a672` añadió el import de `SystemDesignSummary` antes de `AppLayout`. Esto estableció la capa `components` antes del orden general y permitió que reglas de base anularan bordes, fondos y estados de botones en Home y en las páginas de estudio. La revisión posterior de MCP no detectó inicialmente esa regresión visual pese a pasar las comprobaciones automáticas.

La corrección mantiene `AppLayout` como primer import y comprueba el orden efectivo de capas en `scripts/check-build.mjs`. Las próximas ampliaciones deben verificar también los controles compartidos y las páginas existentes en navegador. Una comprobación de tipos o un build correcto no acredita que se haya conservado el diseño. La organización por carpetas técnicas tampoco sustituye la ramificación de negocio del sidebar.

## Verificación histórica de la extracción de componentes

Este registro corresponde a una extracción anterior de componentes. No acredita la validación de la organización actual.

En aquella revisión Astro check terminó sin errores, advertencias ni sugerencias. Build y comprobación de currículo fueron correctos. Se compararon 28 árboles DOM renderizados antes y después en siete rutas, dos idiomas y dos tamaños de pantalla. No hubo diferencias en texto, estructura ni atributos y no aparecieron errores de ejecución. Se comprobaron las vistas de tarjetas con contenido temporal de prueba que no se guardó en el catálogo, perfil y etapa de Home, atajo de búsqueda, panel móvil y persistencia de ramas abiertas y cerradas tras recarga y cambio de idioma. Las comprobaciones complementaban las auditorías anteriores y no certificaban accesibilidad completa.
