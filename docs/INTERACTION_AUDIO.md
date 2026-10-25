# Sonidos de interacción

Audio opcional apagado por defecto. El altavoz alterna directamente el audio; el control adyacente abre el volumen (0–100). La preferencia `{enabled, volume}` se guarda en `tech-training:sound:v1`, con volumen inicial 30. Los valores inválidos se normalizan y los fallos de almacenamiento no bloquean la interfaz. Cero se conserva tras recarga.

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

Los originales suman 39 452 bytes. El tecleo es un clic de interfaz amortiguado, no una grabación autenticada de teclado antiguo. La reproducción usa un filtro paso bajo de 2400 Hz, ganancia maestra máxima 0,18, envolventes breves y velocidad de reproducción original. No hay música, bucles ni afirmaciones de beneficio cognitivo. La comodidad depende también del volumen del dispositivo y requiere escucha del usuario.

## Motor y límites

Un único `AudioContext({latencyHint: 'interactive'})` y una caché de seis buffers. No hay contexto ni peticiones antes del gesto de activación; una preferencia restaurada espera el primer gesto. Se decodifica cada original una vez, se elimina silencio inicial por debajo de 0,008 y se conserva como máximo 35 ms por buffer. Los originales locales permanecen intactos y verificables con el manifiesto.

| Resultado | Duración máxima reproducida |
| --- | --- |
| Seleccionar / activar | 35 ms |
| Desmarcar | 30 ms |
| Abrir | 35 ms |
| Cerrar | 30 ms |
| Navegar / confirmar copia | 18 ms |
| Escribir | 8 ms |
| Desplazar | 12 ms |

Las muestras cortas pueden terminar antes de ese máximo. La envolvente sube en hasta 2 ms y baja en los últimos 5 ms. Una acción importante corta la anterior con hasta 2 ms de caída y comienza cuando termina esa caída. Si llega otra acción durante ese traspaso se cancela la pendiente y se conserva el mismo final de caída: no se forma una cola ni se superponen intervalos de reproducción. Puede haber nodos pendientes de su callback `ended`; eso no equivale a varias voces audibles.

Tecleo y scroll no interrumpen una acción importante. El tecleo admite como máximo una solicitud cada 55 ms; scroll, cada 110 ms. Ambos se inhiben durante 50 ms después de una acción importante. Las acciones importantes consecutivas no se descartan por un límite global. Apagar, volumen cero, ocultar la pestaña o abandonar la página silencia el master y detiene todas las fuentes. No hay micrófono, música, bucles ni temporizador continuo.

Si falta un buffer o el contexto sigue suspendido, la solicitud se descarta. Ningún `await fetch`, decodificación o `resume` reproduce posteriormente una acción pasada, tampoco el primer clic de activación. Por tanto, ese primer gesto puede permanecer silencioso; los gestos posteriores usan la caché. Los fallos de API, carga o decodificación desactivan la preferencia y muestran el estado localizado. El reintento es manual.

## Inventario de resultados y hooks

La captura guarda el estado antes del evento confiable. El listener de burbujeo compara inmediatamente después de los handlers existentes, sin `setTimeout(0)`. Los clics sintéticos internos de carruseles se ignoran; el clic confiable exterior recoge su único resultado. Los controles nativos se completan con `toggle` y `close`, y la copia conserva su callback de éxito. No se reproducen sonidos por hover, foco ordinario, hidratación ni clic sin cambio.

| Familia real | Resultado observado / hook | Silencio deliberado |
| --- | --- | --- |
| Área, puesto, etapa y crecimiento de Home | `aria-pressed` o selección del carrusel; captura → burbujeo | Estado final idéntico |
| Flechas de área y puesto | Selección final tras el clic sintético interno | Flecha deshabilitada / extremo |
| Páginas de puestos | `aria-current` de página, actualizado antes del scroll suave | Página actual sin cambio |
| Teclado de carruseles | Selección o posición de foco dentro del carrusel tras flechas/Home/End | Extremo sin cambio |
| Ramas del aside y código completo | `toggle` nativo tras un summary confiable; compara `open` | Restauración de ramas, toggles programáticos sin gesto |
| Idioma | Cambio de `documentElement.lang` | Sin cambio |
| Marca, Home, breadcrumb, hojas publicadas y siguiente módulo | Enlace aceptado a destino distinto o cambio real de hash/scroll | Hojas deshabilitadas, enlace cancelado, destino actual sin cambio |
| Enlaces de fuentes externos | Navegación aceptada a href distinto | No garantiza que la carga remota termine |
| Saltar al contenido | Cambio real de posición | Ya está en la misma posición |
| Búsqueda y limpieza | `input` confiable con valor distinto, o cambio de valor al limpiar | IME intermedio, valor igual |
| Filtro de niveles y limpiar filtros | Nivel/texto/búsqueda final | Extremos deshabilitados o filtros ya limpios |
| Vistas de tarjeta y Lo entiendo | `aria-pressed` final | Vistas deshabilitadas o vacías |
| Abrir fuentes / implementación / repaso | Identidad de diálogo abierto | Sin transición |
| Cerrar diálogo, backdrop y Escape | Estado final o `close` nativo; Escape deduplicado | Clic interior, Escape sin diálogo |
| Pasos de guía | `data-current-step` final | Paso actual / extremo deshabilitado |
| Copiar código | `interaction-feedback` únicamente tras `clipboard.writeText` correcto | Error de portapapeles |
| Repaso conservado | Texto/estado de respuesta visible tras revelar o valorar | No añade controles de repaso retirados |
| Menú móvil, cierre y backdrop | `aria-expanded` / clase `mobile-open` final | Estado idéntico |
| Ajustes de sonido | `toggle` del disclosure; cambio de volumen en `change` | Off o cero, primer enable aún sin buffers |
| Scroll página / aside / guía anidada / horizontal | `scroll` capturado en document, comparación separada de X e Y | Sin desplazamiento, sin intención reciente, scroll programático tras botón |

Rueda, toque, teclas de desplazamiento y arrastre con puntero marcan intención. Esta vence en 700 ms; cada nuevo gesto manual elimina la supresión de 250 ms asociada a acciones que pueden desplazar programáticamente. Las posiciones se actualizan incluso cuando no se reproduce sonido, evitando sumar desplazamientos antiguos. No se exige el anterior salto de 60 px: se acepta movimiento real de al menos 2 px entre eventos. El gate limita solicitudes, sin bloquear el scroll ni añadir timers.

## Verificación de la revisión

`npm run validate` completo: 57 tests, Astro sin errores/avisos. La prueba del motor simula carga/resume pendiente, tres acciones consecutivas en el mismo instante, traspaso pendiente, prioridad de acciones, volumen cero, desactivación y reutilización de caché. Comprueba intervalos de reproducción sin superposición; no se limita a contar nodos o repetir snapshots.

Chromium headless 148 en Windows, preview de producción y eventos confiables de Playwright. Instrumentación temporal externa al repositorio intercepta `AudioBufferSourceNode.start/stop` y registra el reloj monotónico del evento. Una ejecución dio:

| Acción | Evento → solicitud `start` | Intervalo reproducido | Espera adicional programada |
| --- | ---: | ---: | ---: |
| Seleccionar etapa | 4,7 ms | 35 ms | 0 ms |
| Desmarcar etapa | 2,0 ms | 30 ms | 0 ms |
| Abrir rama nativa | 15,3 ms | 35 ms | 0 ms |
| Cerrar rama nativa | 16,2 ms | 30 ms | 0 ms |
| Flecha de área | 5,7 ms | 18 ms | 0 ms |
| Cambiar idioma | 55,0 ms | 18 ms | 0 ms |
| Scroll anidado de guía | 0,2 ms | 12 ms | 0 ms |

Son muestras de esa ejecución, no percentiles ni promesa universal. Las ramas esperan el evento nativo `toggle` posterior a su acción por defecto. Cambiar idioma realiza traducción y refresco síncronos antes del feedback; ese trabajo explica el mayor tiempo observado. No se mide latencia física del dispositivo, del mezclador ni percepción auditiva en headless; tampoco se atribuye latencia cero a Web Audio.

Una ráfaga de 12 clics produjo 12 respuestas con máximo de un intervalo programado a la vez. Comprobados con una respuesta cada uno: vista de tarjeta, aprendido, abrir guía, avanzar paso, código completo, Escape, selección/desmarcado, ramas y flecha de área. El paso ya seleccionado produjo cero. Scroll de página, aside, horizontal y `.implementation-body` produjo una respuesta por gesto medido. El tecleo de 26 caracteres produjo ocho respuestas en la QA independiente (el límite anterior de cuatro era deliberadamente más lento).

La QA independiente verificó seis peticiones y un contexto después del opt-in, ninguno antes; volumen cero persistente; Enter/Espacio sin duplicados; Escape en ajustes; ES/EN en escritorio, 390 y 320 px y texto al 200 %. Casos de fallo: API ausente → apagado/estado/0 solicitudes; Ogg inválido → apagado/estado/6 solicitudes/0 reproducciones; carga retrasada 600 ms más apagado → 0 reproducciones tardías; preferencia on restaurada → 0 solicitudes/contextos hasta primer gesto y 0 reproducción tardía de ese gesto. Sin errores JavaScript observados.

Build medido: HTML gzip 94 769 bytes, JavaScript gzip 65 870, CSS gzip 12 791 y total 2 274 100. JavaScript creció 490 bytes sobre la primera entrega; el presupuesto pasó de 65 536 a 66 560 bytes para cubrir los eventos nativos, el traspaso monofónico y las cancelaciones. Las mediciones corresponden al build de esta revisión; cambios posteriores de estilo pueden alterar CSS/total.

## Antecedente

La primera entrega reproducía originales decodificados de hasta 148 ms, permitía tres fuentes, comparaba con `setTimeout(0)` y limitaba el scroll a 700 ms/60 px. Sus pruebas comprobaron la incorporación básica, pero no demostraron cobertura completa ni respuesta monofónica. Esas decisiones y límites se sustituyen por el comportamiento descrito arriba; la evidencia anterior no se presenta como validación del motor actual.
