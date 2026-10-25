# Sonidos de interacción

Audio opcional apagado por defecto. El altavoz está a la derecha del idioma y actúa como interruptor directo. El control adyacente abre el volumen (0–100). La preferencia `{enabled, volume}` se guarda en `tech-training:sound:v1`; los valores inválidos se normalizan y los fallos de almacenamiento no bloquean la interfaz. El volumen inicial es 30 y cero permanece cero al recargar.

## Fuente y licencia

Los seis archivos Ogg originales proceden de [Interface Sounds de Kenney](https://kenney.nl/assets/interface-sounds), mediante su [descarga oficial](https://kenney.nl/media/pages/assets/interface-sounds/fa43c1dd4d-1677589452/kenney_interface-sounds.zip). La página y el License.txt del ZIP declaran [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Se conserva el texto de licencia con saltos de línea normalizados en `public/audio/interface/LICENSE.txt` y un manifiesto de origen, tamaños y SHA-256 en `provenance.json`. No hay archivos del sistema operativo ni dependencias de audio nuevas.

| Archivo | Uso |
| --- | --- |
| select_001.ogg | Activación o selección |
| select_002.ogg | Desmarcado |
| open_001.ogg | Abrir ramas, paneles o diálogos |
| close_001.ogg | Cerrar ramas, paneles o diálogos |
| tick_001.ogg | Navegación y desplazamiento |
| click_002.ogg | Escritura de búsqueda |

Los originales suman 39 452 bytes. El tecleo es un clic de interfaz amortiguado, no una grabación autenticada de teclado antiguo. La reproducción usa un filtro paso bajo de 2400 Hz, ganancia maestra máxima 0,18, envolventes breves y velocidades fijas según la acción. No hay música, bucles ni afirmaciones de beneficio cognitivo. La comodidad depende también del volumen del dispositivo y requiere escucha del usuario.

## Carga, eventos y silencio

Se siguen las [buenas prácticas de Web Audio de MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices): un AudioContext reutilizado, AudioBuffers decodificados una vez y fuentes efímeras por reproducción. No se crean contextos ni se solicitan clips mientras no haya activación voluntaria. Si una preferencia previa está activada, la carga espera un gesto; restaurar o hidratar la página no reproduce audio. La CSP permite conexiones solo al mismo origen para cargar estos archivos locales.

La captura de acciones compara estado antes/después de la interacción real. Distingue selección, desmarcado, apertura, cierre y navegación; ignora clics sintéticos internos, controles deshabilitados y acciones sin cambio. Las copias notifican solo tras éxito del portapapeles. No se acumulan sonidos durante la carga: una confirmación inicial tardía se descarta. Los cambios de idioma actualizan también nombres accesibles.

El tecleo se limita a un sonido cada 110 ms y excluye composición IME intermedia. El scroll requiere intención reciente de rueda, toque o teclado, desplazamiento real y un máximo de un sonido cada 700 ms; se suprime después de botones que desplazan el contenido. No hay temporizador continuo: las comprobaciones de scroll están limitadas a una cada 100 ms mientras hay eventos. Existe separación global de 35 ms y un máximo de tres fuentes simultáneas, dando prioridad a acciones voluntarias sobre tecleo/scroll. Apagar, llevar el volumen a cero u ocultar la pestaña detiene las fuentes actuales. No se usa el micrófono.

Los fallos de carga, decodificación o API desactivan el audio, muestran un estado localizado y conservan la aplicación utilizable. No hay bucles de reintentos; se puede activar de nuevo manualmente. El soporte de formatos y la política de reproducción pertenecen al navegador.

## Comprobaciones

Chromium de Playwright en Windows: seis clips decodificados sin errores; duraciones decodificadas entre 11,6 y 148 ms (el contexto remuestrea a 48 kHz). Cero solicitudes/contextos antes del opt-in; seis solicitudes y un contexto después. Selección y desmarcado producen un sonido cada uno con distinta velocidad, apertura/cierre usan sus muestras dedicadas y una flecha que cambia área produce un único feedback. Una ráfaga de 26 caracteres produjo cuatro sonidos y ocho eventos de rueda produjeron uno.

Verificados volumen cero persistente, silencio tras recarga, apagado durante carga de 600 ms sin reproducción posterior, archivos inválidos, API ausente y ausencia de reintentos por clic. No hubo errores JavaScript. Cabecera y volumen comprobados en ES/EN a 1440, 390 y 320 px y con texto al 200 %. Las capturas se inspeccionan fuera del repositorio. No se afirma equivalencia auditiva en otros navegadores, altavoces o auriculares ni latencia nula.

La incorporación completa se midió inicialmente en 2 274 372 bytes frente al límite anterior de 2 228 224. Se elevó únicamente el presupuesto total a 2 293 760 bytes para alojar los clips y su control; se mantienen los límites comprimidos de HTML, JavaScript y CSS. Las comprobaciones finales se ejecutan con `npm run validate`.


Resultado final: `npm run validate` completo con 56 tests, sin errores ni advertencias de Astro. Tras el último ajuste de hover, build y check:build vuelven a pasar: HTML gzip 94 770 bytes, JavaScript gzip 65 380, CSS gzip 21 752 y total 2 275 062. Verificados Enter/Espacio con un solo sonido, Escape cerrando el ajuste de volumen y la flecha deshabilitada en silencio. El fondo del altavoz es `rgba(0, 0, 0, 0)` tanto en reposo como en hover y en on/off; solo el color del icono cambia al pasar el ratón, de los colores existentes de estado a `--ink`. El buscador conserva una fila útil en las cabeceras móviles estrechas.
