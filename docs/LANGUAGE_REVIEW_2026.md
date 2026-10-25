# Revisión lingüística ES/EN

Revisión paralela de ortografía y gramática con intervención mínima. Se excluyeron ajustes de estilo, sinónimos, armonización de voz, mayúsculas opcionales, variantes válidas de inglés y nombres técnicos. No se modificó puntuación, símbolos ni el placeholder con tres puntos.

Se aplicó una única corrección inequívoca en `src/data/ai-glossary.ts`, explicación inglesa de LLM:

- Antes: It is an LLM learns language patterns and generates text from the supplied context. It does not verify truth by itself.
- Después: An LLM learns language patterns and generates text from the supplied context. It does not verify truth by itself.

Se eliminó una construcción verbal incorrecta. La clave española permanece intacta y la traducción compartida se deriva del mismo glosario. La secuencia Unicode de puntuación y símbolos del texto es idéntica (`..`); también se comparó la secuencia de todo el archivo antes/después sin diferencias.

## Cobertura examinada

Los 14 archivos `src/data/career-*.ts` completos, incluidos perfiles, etapas, alcances y traducciones. `ai-glossary.ts`, `curriculum.ts`, `design-patterns.ts`, los campos humanos ES/EN de `pattern-guides/creational.ts`, `structural.ts` y `behavioral.ts`, y sus archivos `types.ts` e `index.ts`. Traducciones generales en `src/lib/translations.ts`, navegación, navegación pendiente, textos de Home, controles, diálogos, tarjetas, avisos y mensajes dinámicos. Se examinaron además los contenidos históricos de `applied-ai.ts` y `system-design.ts`. Se excluyeron código de ejemplo, URLs y textos externos citados.

No se aplicaron dos propuestas ambiguas: «Conserva y expone la instancia» admite una lectura descriptiva en tercera persona, y «Define cómo colaboran» admite un referente singular a la categoría. Convertirlas a imperativo o plural podía ser armonización editorial y no una corrección inequívoca. No se detectaron otras correcciones objetivas dentro de los textos examinados. Esto no constituye una garantía de ausencia absoluta de errores.
