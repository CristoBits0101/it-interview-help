# Auditoría de renderizado

## Resultado y límites

Se corrigió una incompatibilidad verificable entre fuentes incrustadas y CSP. No se recibió una captura accesible del halo comunicado. Por tanto no se atribuye ese síntoma a una causa concreta ni se afirma que esta corrección lo resuelva. Para localizarlo quedan pendientes una captura original, el elemento afectado y el navegador, zoom y escala de pantalla usados.

La aplicación usa Astro, CSS y SVG Lucide. No se encontraron imágenes rasterizadas ni canvas para dibujar la interfaz. Se conservaron paleta, tamaños, pesos y diseño aprobados.

## Evidencias y decisiones

| Elemento | Evidencia | Acción o límite |
| --- | --- | --- |
| Fuentes y CSP | Vite incrustaba tres fuentes WOFF2 pequeñas de Google Sans Flex como data URLs. La CSP las bloqueaba. Corresponden a subconjuntos Canadian Aboriginal, Cherokee y Tifinagh, con rangos adicionales de marcas combinantes. | Emitir todas las fuentes WOFF/WOFF2 como archivos del mismo origen. Añadir comprobación del CSS generado. No relajar CSP. |
| Fuente latina visible | Antes y después se identificaron Google Sans Flex, IBM Plex Mono y Dancing Script como fuentes personalizadas reales de los nodos muestreados. | Los tres errores de fuente desaparecen, pero no prueban que el texto latino observado estuviera usando una fuente alternativa. |
| Color sólido | Los PNG generados contienen canvas RGB 252/252/250 y sidebar RGB 244/245/240, exactamente los tokens respectivos. | No se detectó desviación del color en esas superficies del renderizado controlado. No equivale a medir una pantalla física. |
| Texto en reposo | Los nodos visibles muestreados y sus ancestros no tenían filtros, transformaciones ni opacidad reducida. Sin text-shadow en el texto general. | Sin cambios globales de suavizado, contraste o peso. |
| SVG | ViewBox 24 × 24 y stroke-width 1.65. A 20 px el trazo equivale a 1.375 px CSS; a 14 px, a 0.9625 px. | Los bordes pueden distribuirse entre píxeles. No aplicar crispEdges global: puede eliminar suavizado en curvas y diagonales. |
| Geometría | Se observaron anchos fraccionales normales de flex/grid. Las flechas de nivel tienen un ajuste horizontal de medio píxel y algunos chevrons rotación. | Son candidatos para una comparación puntual si se identifica un icono afectado, no evidencia de desenfoque general. |
| Efectos intencionales | Las transiciones de idioma y aparición usan opacidad temporal. Los fondos de panel móvil y diálogo usan backdrop blur de 3 y 5 px. Hay sombras locales en controles y overlays. | No se retiraron efectos aprobados sin relacionarlos con un síntoma reproducible. |
| Chrome instalado | Su DOM añade dominios Kaspersky a la CSP y produce avisos sobre frame-src. El HTML generado conserva la política original; Chromium de prueba no presenta esos avisos. | Diferencia del entorno externo al repositorio. No demuestra la causa del halo. No se modificaron antivirus ni ajustes del sistema. |

Contrastes representativos calculados con tokens: texto suave/canvas 5.68:1, texto secundario/blanco 7.49:1, verde/superficie seleccionada 6.38:1, borde de control/superficie 5.40:1 e ink/blanco 14.13:1. Son muestras, no una certificación WCAG de toda la aplicación.

## Verificación efectuada

Chromium 148.0.7778.96 e instalación local de Chrome 156.0.8078.47, ambos Blink. ES y EN con DPR emulado 1, 1.25 y 2: doce casos. Se usaron anchuras de 1440 y 390 px, ampliación de la fuente raíz al 125 % y 200 %, y una comprobación adicional con zoom CSS 1.25. Sin desbordamiento horizontal en estos casos. Esto no sustituye probar zoom nativo del navegador, otros motores o monitores físicos.

Los navegadores temporales se lanzaron con perfil sRGB para comparar píxeles. No se cambiaron ajustes persistentes del navegador, ClearType, HDR, ICC, resolución o escala de Windows. Tras la corrección no hubo errores de carga de fuentes en ninguno de los dos navegadores; los avisos externos de CSP de Chrome se contabilizaron aparte.

La validación completa de esta corrección pasó con 56 pruebas. Tamaños medidos entonces: HTML gzip 94768 B, JavaScript gzip 65380 B, CSS gzip 12791 B y salida total 2272465 B. Son resultados de esta revisión, anteriores a posteriores refinamientos del audio.

## Referencias técnicas

- [Vite: build.assetsInlineLimit](https://vite.dev/config/build-options.html#build-assetsinlinelimit): el callback permite impedir la inclusión de fuentes como data URLs.
- [W3C: colores hexadecimales en sRGB](https://www.w3.org/TR/css-color-4/#hex-notation).
- [Chrome: renderizado de texto en Windows](https://developer.chrome.com/blog/better-text-rendering-in-chromium-based-browsers-on-windows?hl=en): el entorno de renderizado puede afectar gamma y contraste del texto.
- [MDN: devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio), [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering) y [font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-smooth): escala de píxeles, tratamiento de bordes y límites de propiedades de suavizado no estándar.
- [Microsoft: Advanced Color y perfiles ICC](https://learn.microsoft.com/en-gb/windows/win32/wcs/advanced-color-icc-profiles): el tratamiento de color de la pantalla pertenece también al sistema y al dispositivo.
- [WCAG: contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) y [contraste no textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
