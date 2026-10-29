import assert from 'node:assert/strict';
import test from 'node:test';
import { aiEcosystemTools, aiToolCategories, aiToolKinds } from '../src/features/artificial-intelligence/generative-artificial-intelligence/ecosystem/data/ai-ecosystem.ts';
import { referenceComparisons } from '../src/app/data/reference-comparisons.ts';
import { aiGlossary, glossaryInventory } from '../src/features/artificial-intelligence/generative-artificial-intelligence/generative-ai-applications/data/ai-glossary.ts';

test('the reference ecosystem preserves all image occurrences with one record per tool', () => {
  assert.equal(aiToolCategories.length, 10);
  assert.equal(new Set(aiEcosystemTools.map(tool => tool.id)).size, aiEcosystemTools.length);
  const uses = aiEcosystemTools.flatMap(tool => tool.uses);
  assert.equal(uses.length, 89);
  for (const alias of ['LlamaIndex Workflows', 'LangChain Agents', 'LangGraph Memory', 'Microsoft Agent Framework', 'MCP Registry', 'MongoDB Atlas Vector Search']) assert(uses.some(use => use.label === alias));
  for (const tool of aiEcosystemTools) {
    assert(aiToolKinds[tool.kind]?.es && aiToolKinds[tool.kind]?.en);
    assert.equal(new URL(tool.url).protocol, 'https:');
    for (const use of tool.uses) assert(aiToolCategories.some(category => category.id === use.category));
  }
  for (const id of ['redis', 'chroma', 'langchain', 'llamaindex', 'langgraph']) assert.equal(aiEcosystemTools.find(tool => tool.id === id).uses.length, 2);
  assert.equal(aiEcosystemTools.find(tool => tool.id === 'pgvector').kind, 'extension');
  for (const id of ['slack-mcp', 'postgres-mcp', 'gdrive-mcp']) assert.equal(aiEcosystemTools.find(tool => tool.id === id).kind, 'archived');
});

test('comparisons preserve the glossary and have bilingual evidence and retrieval questions', () => {
  assert.equal(aiGlossary.modules.length, 10);
  assert.equal(glossaryInventory.length, 100);
  assert.equal(referenceComparisons.length, 2);
  const checkText = value => assert(value.es.trim() && value.en.trim());
  for (const guide of referenceComparisons) {
    assert.equal(guide.columns.length, 2);
    checkText(guide.title);
    checkText(guide.description);
    checkText(guide.question);
    checkText(guide.answer);
    for (const column of guide.columns) column.steps.forEach(checkText);
    for (const row of guide.rows) { checkText(row.title); assert.equal(row.values.length, 2); row.values.forEach(checkText); }
    guide.tips.forEach(checkText);
    assert(guide.sources.length >= 2);
    for (const source of guide.sources) assert.equal(new URL(source.url).protocol, 'https:');
  }
  assert.match(referenceComparisons.find(guide => guide.id === 'hibernate-loading-guide').answer.en, /No\./);
  assert.match(referenceComparisons.find(guide => guide.id === 'rag-kag-guide').description.en, /OpenSPG/);
});
