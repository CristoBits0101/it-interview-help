# tech-training

Web estática responsive para preparar entrevistas técnicas y repasar ingeniería de software. Construida con Astro 7, TypeScript y CSS; sin backend, cuentas ni servicios de IA necesarios para usarla.

## Desarrollo

Requiere Node.js 22.22 o superior (también compatible con Node.js 24).

```bash
npm ci
npm run dev
```

Abre la dirección que imprime Astro, normalmente `http://localhost:4321`.

```bash
npm run check
npm run build
npm run preview
```

El build genera `dist/`, listo para cualquier alojamiento de archivos estáticos. Si cambia el dominio, actualiza `site` en `astro.config.mjs`. La aplicación usa rutas con fragmentos (`#ruta/modulo`), sin requerir reglas de reescritura en el servidor.

## Contenido

Las rutas siguen este orden de aprendizaje:

1. User Experience Design: 6 conceptos de arquitectura de información y experiencia de usuario.
2. Software Design: 15 conceptos, incluidos S, O, L, I y D por separado.
3. Software Architecture: 5 conceptos.
4. Distributed Systems: 40 conceptos en 5 módulos sobre comunicación, datos, coordinación y mensajería.
5. System Design: 12 conceptos sobre requisitos, capacidad, flujo de datos y bloques de arquitectura.
6. Applied Artificial Intelligence: 32 conceptos en 5 módulos: LLMs, recuperación, RAG, agentes y evaluación.

Cada concepto contiene una definición, una frase para recordarlo, un ejemplo y un nivel. Las fuentes originales están enlazadas en «Fuentes y recursos».

Edita `src/data/curriculum.ts` y `src/data/applied-ai.ts` para ampliar el contenido. Los IDs deben ser únicos y estables para conservar los enlaces y el progreso. `src/pages/index.astro` genera el contenido; `src/scripts/app.ts` controla las interacciones y `src/styles/global.css` el diseño.

## Uso y privacidad

Busca en todas las rutas con `/` o `Ctrl/Cmd + K`, filtra por nivel y marca los conceptos que comprendes. El repaso oculta la definición hasta que intentas recordarla; el repaso global selecciona hasta 10 tarjetas, priorizando las pendientes.

El progreso se almacena solo en `localStorage` del navegador (`tech-training:v1`). El menú empieza cerrado y recuerda las ramas abiertas con `tech-training:navigation:v1`. No se comparten entre dispositivos. Si el almacenamiento no está disponible, se mantienen durante la sesión. Las tipografías se sirven desde la propia web.

La aplicación genera HTML estático. JavaScript habilita la navegación entre módulos, búsqueda, progreso y repaso. Sin JavaScript se puede leer el primer módulo.

Las dependencias Python del material de referencia son contexto para la ruta Applied Artificial Intelligence; no son necesarias para ejecutar esta web.

## Validación

Comprobados build estático y tipos, búsqueda global, filtro vacío, navegación entre rutas, progreso tras recargar, tarjetas de repaso y menú móvil. Revisados tamaños de 390 y 1440 píxeles. Auditoría npm sin vulnerabilidades detectadas en la instalación realizada.
