# Tech Training — instrucciones para agentes

Lee [docs/PROJECT_GUIDE.md](docs/PROJECT_GUIDE.md) antes de modificar el proyecto. Es la memoria de producto, diseño y desarrollo. Esta documentación recoge decisiones del usuario y el estado verificado el 18 de octubre de 2026; una petición posterior del usuario tiene prioridad. Actualízala cuando cambie una decisión para evitar contradicciones.

## Proyecto y alcance

- Aplicación web estática de aprendizaje y preparación de entrevistas técnicas. Astro, TypeScript y CSS; sin backend ni aplicación de escritorio.
- Repositorio: https://github.com/CristoBits0101/tech-training. La rama principal es `main`.
- Web: https://tech-training.active-map-0560.chatgpt.site/.
- En el ordenador original, el código está en `C:\Workspace\tech-training`. `C:\Workspace\big-tech-training` y `arrimate-monolithic-platform` son otros proyectos: comprueba la carpeta antes de editar.
- Trabaja sobre `src/`, `public/` y los archivos de configuración. No edites `dist/` como fuente ni recrees copias de `index.astro` o `app.ts` en la raíz.

## Decisiones que debes conservar

- Marca visible: **Tech Training**, sin guion, punto final, icono ni subtítulo. La marca y el enlace Home llevan a la portada real, no al primer módulo.
- La raíz y `#home` muestran el resumen de aprendizaje: áreas, lecciones disponibles y recomendaciones por perfil y etapa. Los contadores se derivan de los datos; no fijes a mano el inventario actual de 11 áreas, 6 rutas, 110 conceptos y 5 perfiles.
- Las recomendaciones profesionales son orientativas: relacionan áreas, conocimientos previos y objetivos prácticos. No presentes Analyst, Architect, liderazgo y dirección como ascensos obligatorios de una única jerarquía. Conserva las fuentes primarias en `src/data/career-paths.ts`.
- **Google Sans Flex** en toda la interfaz y encabezados. **IBM Plex Mono 500** solo en la marca del sidebar. Ambas fuentes se sirven localmente con Fontsource. Inter y Manrope se eliminaron.
- Estilo claro y sobrio: fondos marfil, superficies blancas, verdes apagados, bordes suaves. Usa los valores de `src/styles/global.css` y la paleta de la guía.
- Sidebar sin separador horizontal. Título, `LEARNING PATHS` y filas de navegación comparten la retícula actual de **48 px**: línea de 24 px y padding vertical de 12 px. No añadas gaps o márgenes verticales encima de ese padding. Los submenús conservan el mismo ritmo; los textos multilínea pueden aumentar su altura.
- Los chevrons se alinean en una sola columna derecha y se centran verticalmente, también en subniveles. Conserva el inset derecho compartido de 16 px.
- Usa Lucide mediante `Icon.astro`. Cada área principal tiene un icono significativo y distinto; no repitas iconos de área en cada enlace hijo.
- Nombres de áreas en inglés completo y Title Case. Respeta el árbol de `src/data/navigation.ts`; no lo sustituyas por las seis rutas que actualmente tienen contenido.
- Las áreas sin contenido permanecen visibles. Las hojas sin destino son elementos deshabilitados, no enlaces ficticios. Las ramas con hijos pueden desplegarse aunque no tengan lecciones.
- Menús cerrados en la primera visita; posteriormente se restaura su estado local. Navegar no debe abrir ramas automáticamente.
- **Distributed Systems** y **System Design** son rutas separadas.
- Se eliminaron `YOUR LIBRARY`, `Explore Concepts`, `My Bookmarks`, los marcadores, el pie de progreso del sidebar, la etiqueta `Library`, el repaso rápido global y el antiguo hero con su franja de rutas. No los reintroduzcas salvo nueva petición. Se conservan marcar conceptos comprendidos y repasar los conceptos visibles del módulo o de la búsqueda.
- Explicaciones breves en español, concepto + definición + ayuda para recordar + ejemplo. Divide temas compuestos cuando ayude, como S/O/L/I/D.

## Trabajo y validación

- Comprueba `git status` antes de trabajar y conserva cambios ajenos. Si necesitas una rama nueva, usa `codex/…`.
- Node.js **>=22.22.0**; Node 22.13.0 no sirve para esta versión. Comandos: `npm ci`, `npm run dev`, `npm run check`, `npm run build`, `npm run preview`. No hay `npm test`.
- Mantén estables y únicos los IDs de conceptos y módulos; se usan en enlaces, selección y progreso. Renombrar etiquetas de ramas también afecta a sus claves de persistencia. Las áreas recomendadas de `career-paths.ts` deben coincidir con las etiquetas de `navigation.ts` para resolver enlaces y estados pendientes.
- Para cambios de código, ejecuta las comprobaciones pertinentes. Para cambios visuales, revisa el resultado en navegador, fuentes computadas, espaciado y móvil; un build correcto no confirma el diseño. Para documentación solamente, revisa enlaces y `git diff --check`.
- No añadas dependencias Python, React, un servidor o servicios de IA para mostrar teoría. `Applied Artificial Intelligence` es contenido educativo.
- GitHub y Sites son destinos distintos. Un `git push` a GitHub no publica la web. Sigue la guía y el flujo vigente de Sites cuando corresponda publicar; no despliegues por un cambio exclusivamente documental.
- No subas `node_modules`, `dist`, `.astro`, `.sites-runtime`, archivos de entorno, credenciales, archivos temporales ni capturas de pruebas.
