# Revisión factual del contenido integrado

## Alcance y criterio

Revisión del 25 de octubre de 2026 sobre el contenido integrado después de la corrección gramatical y los ajustes de interfaz. Se leyeron las 104 entradas publicadas de IA en ES/EN, los cinco principios SOLID, las 14 descripciones de patrones con sus casos y guías Java, los 14 archivos career-* y sus traducciones, el catálogo publicado, las afirmaciones visibles de Home y controles, metadatos y documentación actual pertinente de producto, privacidad y seguridad.

Inventario derivado de los exports: seis áreas, dos rutas publicadas, 14 módulos, 123 conceptos, 46 perfiles, 184 etapas, 44 guías de áreas y 35 destinos de alcance. Las rutas de preparación de Home siguen en desarrollo; su orientación conservada en los datos no se presenta como lecciones ya disponibles. Los materiales históricos no montados y las cifras fechadas de auditorías anteriores se distinguen de la versión publicada.

El contraste externo se dirigió a afirmaciones dudosas o volátiles y a las fuentes de los conceptos. La lectura íntegra no equivale a verificar cada oración contra una fuente independiente, ejecutar todas las tecnologías descritas, medir frecuencia laboral ni certificar la totalidad de internet. No se encontraron errores graves nuevos en las definiciones publicadas que justificaran una reescritura general. Las guías Java se revisaron junto con sus salidas, sin compilar Java en esta auditoría.

## Cambios justificados

| Texto o dato | Problema | Corrección mínima |
| --- | --- | --- |
| Puestos habituales / Common roles | Las fuentes prueban existencia y funciones, no frecuencia estadística. | Puestos del área / Roles in this area. |
| Orden y años de las etapas | Los intervalos 0 / 0–2 / 2–5 / 5+ podían leerse como equivalencias oficiales de seniority. | El texto visible aclara que el orden y los años son orientativos. Se conserva la selección de cuatro etapas. |
| Un camino para cada objetivo | Promesa demasiado amplia para un catálogo acotado y en desarrollo. | Orientación por especialidad. El contador inglés dice Professional Profiles en concordancia con lo que cuenta. |
| MessageGraph | La alternativa StateGraph estaba descrita como práctica universal. | Se expresa como recomendación para código nuevo, conforme al código upstream. Puntuación conservada. |
| UI Designer, Product Designer y UX Researcher | Un helper insertaba Software Design en mid/senior de todos los perfiles y priorizaba ingeniería de software en estas tres especialidades. | Se parametriza el área transversal y se usan investigación, diseño, accesibilidad y evaluación según la especialidad. Es un ajuste de la selección pedagógica, no una norma universal ni una afirmación de que programar nunca sea útil en HCI. |
| README y guía de proyecto | Inventarios antiguos presentados como actuales, una sola ruta, cinco etapas y ausencia de persistencia de etapa. | Inventario integrado, dos rutas, cuatro etapas y persistencia real. Se distinguen paneles de preparación pendientes y contenido publicado. |
| Guía de patrones | Negaba casos/ejemplos existentes y podía incluir Simple Factory entre los 23 GoF. | Reconoce las 14 guías y casos; distingue Simple Factory como variante introductoria. |

La corrección gramatical independiente de LLM se registra en LANGUAGE_REVIEW_2026.md. No se mezcló esa revisión con cambios de puntuación o estilo. Las correcciones factuales de UI y datos conservan la puntuación existente; la actualización de documentación incorpora las explicaciones necesarias.

## Fuentes y contraste

- [SFIA: responsabilidad y competencias](https://sfia-online.org/en/about-sfia/how-sfia-works) y [GitLab: trayectorias de ingeniería](https://handbook.gitlab.com/handbook/engineering/careers/): respaldan responsabilidad, autonomía y trayectorias diferenciadas. No certifican estos intervalos de años ni esta combinación exacta de etapas.
- [UK Government: User researcher](https://understand-digital-data-roles-skills.service.gov.uk/role/user-researcher/) y [Interaction designer](https://understand-digital-data-roles-skills.service.gov.uk/role/interaction-designer/): investigación, diseño, evaluación e inclusión respaldan la corrección curricular HCI. Las traducciones de títulos y el orden del producto siguen siendo editoriales.
- [MDN: currículo base](https://developer.mozilla.org/en-US/curriculum/core/): referencia de fundamentos web; no convierte su contenido en un requisito idéntico para cada profesión IT.
- [SRP](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html), [OCP](https://objectmentor.com/resources/articles/ocp.pdf), [LSP](https://www.cs.cmu.edu/~wing/publications/LiskovWing94.pdf), [ISP](https://objectmentor.com/resources/articles/isp.pdf) y [DIP](https://objectmentor.com/resources/articles/dip.pdf): se contrastaron las cinco referencias originales. Las 14 referencias configuradas de Refactoring.Guru fueron accesibles, incluida [la comparación de factories](https://refactoring.guru/design-patterns/factory-comparison); es la excepción de fuente secundaria autorizada por el proyecto.
- [OpenAI: retiradas de API](https://developers.openai.com/api/docs/deprecations): confirma la retirada de DALL·E 2 y 3 el 12 de mayo de 2026, coherente con las entradas históricas identificadas como tales.
- [ACP](https://agentcommunicationprotocol.dev/introduction/welcome): confirma su integración en A2A. [MessageGraph upstream](https://github.com/langchain-ai/langgraph/blob/main/libs/langgraph/langgraph/graph/message.py): interfaz obsoleta y recomendación de StateGraph con estado de mensajes.
- [Reflexion](https://arxiv.org/abs/2303.11366): reflexión verbal almacenada sin actualización de pesos. [Qwen2.5-VL](https://qwenlm.github.io/blog/qwen2.5-vl/), [Llama 4](https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct) y [edge-tts](https://github.com/rany2/edge-tts): capacidades y naturaleza de las herramientas contrastadas con sus autores.

Las referencias y capacidades pueden cambiar. El resultado documenta esta revisión; no garantiza vigencia indefinida, homologación profesional, contratación, conformidad completa de accesibilidad ni seguridad absoluta del alojamiento.

## Comprobación integrada

Tras integrar estos cambios y los ajustes finales de volumen, `npm run validate` terminó con cero errores y advertencias de Astro, 57 pruebas aprobadas, validación de 184 etapas y 104 entradas bilingües, build estático y comprobación de 123 conceptos, 14 páginas y 14 guías. Medidas finales: HTML gzip 94908 B, JavaScript gzip 65912 B, CSS gzip 12816 B y total 2271095 B, dentro de presupuesto. `git diff --check` sin errores.

Navegador ES/EN a 1440, 390 y 320 px: foco, teclado, reflujo al 200 %, control de volumen de ancho igual al icono y panel completamente dentro de la pantalla comprobados. Los detalles del audio y del renderizado están en INTERACTION_AUDIO.md y RENDERING_AUDIT_2026.md. Estos resultados son locales; el estado de CI remota se comunica por separado al entregar.
