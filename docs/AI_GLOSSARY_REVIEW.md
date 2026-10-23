# Glosario para entrevistas — 22 de octubre de 2026

## Alcance y procedencia

El usuario autoriza implementar directamente el glosario y comprobarlo antes de subirlo. La referencia es el apartado «Glosario de Terminos» del README local de `C:\Workspace\rag-agentic-ai-toolkit`. Ese repositorio es material de consulta y no se modifica. No se añaden dependencias de Python ni servicios de IA a esta aplicación estática.

`src/data/ai-glossary.ts` conserva los cien términos originales mediante `glossaryInventory`. Incluye además Tokens, Inferencia, Ventana de Contexto y Alucinaciones como fundamentos comentados expresamente en la conversación. Son 104 conceptos nuevos visibles y 123 al sumar Software Design. La comprobación de currículo admite `--readme <ruta>` para contrastar automáticamente la cobertura contra la tabla de origen. No depende de esa carpeta para funcionar normalmente.

## Navegación y formato

Se mantiene Inteligencia Artificial → Inteligencia Artificial Generativa → Aplicaciones de IA Generativa. Cada temática tiene una página con varias tarjetas. No se crea una página por palabra ni se aplana el menú existente.

| Página | Conceptos |
| --- | ---: |
| Modelos y Lenguaje | 17 |
| Búsqueda y Recuperación | 11 |
| Índices y Almacenamiento Vectorial | 9 |
| RAG y Fiabilidad | 8 |
| Agentes y Orquestación | 11 |
| Bibliotecas y Frameworks | 8 |
| Modelos y Proveedores | 9 |
| Fundamentos Multimodales | 12 |
| Generación de Imagen y Vídeo | 14 |
| Voz y Audio | 5 |

Se separan los conceptos de los productos y de los componentes específicos de bibliotecas. LCEL y StateGraph no se presentan como características de Python. No se abre una ruta nueva de fundamentos del lenguaje Python.

Las tarjetas reutilizan la paleta, tipografía, iconos, espaciado, numeración, fuente y control «Lo entiendo» existentes. La definición es visible sin desplegar nada y se redacta para responder en una entrevista con lenguaje sencillo y preciso. El glosario oculta el selector de vistas cuando solo existe explicación. Software Design conserva sus tres botones. El modelo de datos mantiene `useCase` y `example` para ampliar cada ficha después sin rehacer la interfaz. No se inventan implementaciones ni ejemplos para habilitar controles.

## Revisión conceptual y de fuentes

Las definiciones se reformulan y no se copian literalmente del README. Las fuentes están centralizadas en `glossarySources` dentro de `src/data/concept-sources.ts`. Se usan documentación de autores y proveedores, publicaciones originales y documentos de NIST. Los niveles son una orientación editorial para repasar. No expresan una lista universal de conocimientos obligatorios para cualquier entrevista.

Correcciones relevantes:

- IA agéntica no requiere varios agentes. Los flujos predefinidos y las decisiones de un agente tienen alcances distintos. Fuente: [Anthropic](https://www.anthropic.com/research/building-effective-agents).
- Point es un registro de Qdrant y no una equivalencia universal de un fragmento. Fuente: [Qdrant](https://qdrant.tech/documentation/manage-data/points/).
- Reflexion utiliza retroalimentación verbal y memoria entre intentos. No se define por una obligación de buscar información externa. Fuente: [publicación original](https://arxiv.org/abs/2303.11366).
- MessageGraph es histórico y se orienta el código nuevo hacia StateGraph. Fuente: [referencia de LangGraph](https://reference.langchain.com/python/langgraph/graph/message).
- ACP en este README significa Agent Communication Protocol y se ha integrado en A2A. No se confunde con Agent Client Protocol. Fuente: [ACP](https://agentcommunicationprotocol.dev/introduction/welcome).
- DALL·E y sus variaciones se conservan para reconocer el material de prácticas pero se explican como históricos. No se invita a usar servicios retirados. Fuentes: [modelo retirado](https://developers.openai.com/api/docs/models/dall-e-2) y [contrato histórico de variaciones](https://developers.openai.com/api/reference/resources/images/methods/create_variation).
- edge-tts es una biblioteca comunitaria que accede a un servicio remoto. No es un modelo local ni un SDK oficial de Microsoft. Fuente: [repositorio del autor](https://github.com/rany2/edge-tts#readme).

La comprobación de referencias revisó respuestas y contenido. Se corrigieron redirecciones generales de LCEL y páginas de documentación que devolvían un aviso de inexistencia aunque respondieran con HTTP 200. Algunas fuentes editoriales bloquean la descarga directa y se contrastaron con el acceso web. Una respuesta HTTP correcta por sí sola no certifica el contenido.

## Entrega

Comprobaciones finales: Astro check sin errores, advertencias ni sugerencias. Build correcto. `check:curriculum` contrasta el inventario original completo y las traducciones. Las diez páginas en ambos idiomas no presentan desbordamiento a 1440, 390 y 320 px y sus explicaciones ocupan como máximo tres líneas a tamaño normal sin recortes. Se revisan filtros, progreso tras recarga, búsquedas por nombres originales en ambos idiomas, inventario dinámico de Home y conservación de los controles SOLID. En pantallas grandes el pie sin vistas hace que «Lo entiendo» abarque todas las columnas de la rejilla para conservar el extremo derecho del separador. Medido a 1920 px sin el hueco de la columna vacía. Cuarenta estados de axe sin infracciones automáticas y diez estados de espaciado personalizado sin desbordamiento. Se comprueban también texto al 200 %, movimiento reducido y colores forzados. No se afirma certificación completa ni se sustituye una prueba con lectores de pantalla reales.

Cambios guardados únicamente en el repositorio local. No hay commit, push ni publicación de Sites como parte de esta petición. El usuario solicita apagar el ordenador después de completar la validación. La solicitud de apagado se realiza al final sin forzar el cierre de otras aplicaciones.
