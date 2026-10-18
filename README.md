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

El build genera `dist/`, listo para cualquier alojamiento de archivos estáticos. Si cambia el dominio, actualiza `site` en `astro.config.mjs`. La raíz y `#home` abren la portada; los módulos usan fragmentos (`#ruta/modulo`), sin requerir reglas de reescritura en el servidor.

## Home y contenido

Home resume la aplicación y permite elegir un perfil —Frontend Engineer, Backend Engineer, Full Stack Engineer, DevOps Engineer o Artificial Intelligence Engineer— y una etapa, desde Fundamentos hasta Senior. Cada selección recomienda áreas relacionadas, conocimientos previos y un objetivo práctico. La progresión posterior distingue especialización, liderazgo y gestión; no representa una jerarquía profesional universal.

La portada calcula su inventario a partir de los datos: actualmente 11 áreas principales, 6 rutas con contenido, 110 conceptos y 5 perfiles. Las áreas todavía sin lecciones permanecen visibles como pendientes, sin enlaces ficticios.

Las rutas con lecciones siguen este orden de aprendizaje:

1. User Experience Design: 6 conceptos de arquitectura de información y experiencia de usuario.
2. Software Design: 15 conceptos, incluidos S, O, L, I y D por separado.
3. Software Architecture: 5 conceptos.
4. Distributed Systems: 40 conceptos en 5 módulos sobre comunicación, datos, coordinación y mensajería.
5. System Design: 12 conceptos sobre requisitos, capacidad, flujo de datos y bloques de arquitectura.
6. Applied Artificial Intelligence: 32 conceptos en 5 módulos: LLMs, recuperación, RAG, agentes y evaluación.

Cada concepto contiene una definición, una frase para recordarlo, un ejemplo y un nivel. Las fuentes originales están enlazadas en «Fuentes y recursos».

Edita `src/data/curriculum.ts`, `src/data/system-design.ts` y `src/data/applied-ai.ts` para ampliar las lecciones; `src/data/navigation.ts` define el árbol y sus enlaces. `src/data/career-paths.ts` contiene perfiles, etapas, prerrequisitos orientativos y fuentes primarias. Los IDs deben ser únicos y estables para conservar los enlaces y el progreso. `src/pages/index.astro` monta la página; `HomeOverview.astro`, `home.ts` y `home.css` implementan Home junto con la navegación general de `app.ts` y los estilos compartidos de `global.css`.

## Uso y privacidad

Busca en todas las rutas con `/` o `Ctrl/Cmd + K`, filtra por nivel y marca los conceptos que comprendes. Al vaciar la búsqueda o limpiar filtros vuelves a Home o al módulo desde el que buscaste. «Repasar conceptos» usa las tarjetas visibles y prioriza las pendientes; oculta la definición hasta que intentas recordarla.

El progreso se almacena solo en `localStorage` del navegador (`tech-training:v1`). El menú empieza cerrado y recuerda las ramas abiertas con `tech-training:navigation:v1`. No se comparten entre dispositivos. Si el almacenamiento no está disponible, se mantienen durante la sesión. Las tipografías se sirven desde la propia web.

La aplicación genera HTML estático. JavaScript habilita la selección de perfil y etapa, la navegación entre módulos, búsqueda, progreso y repaso. Sin JavaScript se pueden consultar el resumen y el primer itinerario de Home. La selección de perfil y etapa no se guarda entre recargas.

Las dependencias Python del material de referencia son contexto para la ruta Applied Artificial Intelligence; no son necesarias para ejecutar esta web.

## Validación

Para validar cambios, ejecuta tipos y build; comprueba Home, selección de perfil/etapa, enlaces disponibles, búsqueda y retorno a la vista de origen, progreso tras recargar, repaso y menú móvil. Usa 390 y 1440 píxeles como referencias visuales. La [guía del proyecto](docs/PROJECT_GUIDE.md) distingue las comprobaciones históricas de las necesarias para el rediseño actual.

## Memoria del proyecto

- [AGENTS.md](AGENTS.md): instrucciones de continuidad para agentes y colaboradores.
- [Guía de producto, diseño y desarrollo](docs/PROJECT_GUIDE.md): preferencias, tipografías, colores, espaciado, navegación, arquitectura, comprobaciones y publicación.
