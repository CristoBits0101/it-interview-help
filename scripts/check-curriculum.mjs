import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import ts from 'typescript';

registerHooks({
  resolve(specifier, context, nextResolve) {
    try { return nextResolve(specifier, context); }
    catch (error) {
      if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) return nextResolve(`${specifier}.ts`, context);
      throw error;
    }
  },
  load(url, context, nextLoad) {
    if (url.startsWith('file:') && url.endsWith('.ts')) {
      return { format: 'module', shortCircuit: true, source: ts.transpileModule(readFileSync(new URL(url), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
      }).outputText };
    }
    return nextLoad(url, context);
  },
});

const { navigation, sharedFoundations } = await import('../src/data/navigation.ts');
const { careerProfiles, areaGuidance } = await import('../src/data/career-paths.ts');
const { tracks } = await import('../src/data/curriculum.ts');
const { systemDesign } = await import('../src/data/system-design.ts');
const { aiGlossary: appliedAI, glossaryInventory } = await import('../src/data/ai-glossary.ts');
const { translate } = await import('../src/scripts/i18n.ts');
const { migrateBranchId } = await import('../src/data/navigation-migrations.ts');
const pathId = path => path.map(encodeURIComponent).join('/');
const all = [];
function visit(nodes, parent = []) {
  assert.equal(new Set(nodes.map(n => n.label)).size, nodes.length, `Duplicate siblings: ${parent}`);
  for (const node of nodes) {
    const path = [...parent, node.label];
    all.push({ ...node, path });
    assert(!/\b(Engineer|Architect|Manager|Director|Lead)\b/.test(node.label), `Job title in menu: ${node.label}`);
    if (node.children) { assert(node.children.length); visit(node.children, path); }
    if (node.shared) assert.equal(node, sharedFoundations[node.label]);
  }
}
visit(navigation);
assert.equal(new Set(all.map(n => pathId(n.path))).size, all.length);
const labels = new Set(all.map(n => n.label));
const catalog = [...tracks, systemDesign, appliedAI];
for (const node of all) {
  const es = translate(node.label, 'es');
  assert.equal(translate(es, 'en'), node.label, `Translation round trip: ${node.label}`);
  if (!['REST', 'MVC', 'SQL', 'Hexagonal', 'SOAP', 'GraphQL', 'gRPC', 'Webhook', 'WebSocket'].includes(node.label)) assert.notEqual(es, node.label, `Missing Spanish: ${node.label}`);
  if (node.href) {
    const [trackId, moduleId] = node.href.slice(1).split('/');
    const track = catalog.find(t => t.id === trackId);
    assert(track?.modules.some(m => m.id === moduleId), `Missing destination: ${node.href}`);
    if (node.module) assert.equal(node.module, moduleId);
  }
}
const branches = new Set(all.filter(n => n.children).map(n => pathId(n.path)));
for (const old of [
  ['Mathematics'], ['Data Science', 'Mathematics'], ['Data Management', 'Databases'],
  ['Data Engineering', 'Data Management', 'Databases', 'Non-Relational Databases'],
]) {
  const migrated = migrateBranchId(pathId(old));
  assert(branches.has(migrated), `Lost disclosure state: ${old}`);
  assert.equal(migrateBranchId(migrated), migrated);
}
for (const [label, item] of Object.entries(areaGuidance)) {
  assert(labels.has(label), `Orphan Home guidance: ${label}`);
  assert.notEqual(translate(item.focus, 'en'), item.focus, `Untranslated guidance: ${label}`);
  for (const prerequisite of item.prerequisites) assert(labels.has(prerequisite), `Unknown prerequisite: ${prerequisite}`);
}
function checkAcyclic(label, ancestors = []) {
  assert(!ancestors.includes(label), `Prerequisite cycle: ${[...ancestors, label]}`);
  for (const prerequisite of areaGuidance[label]?.prerequisites ?? []) checkAcyclic(prerequisite, [...ancestors, label]);
}
Object.keys(areaGuidance).forEach(label => checkAcyclic(label));
for (const profile of careerProfiles) {
  for (const stage of profile.stages) {
    assert.equal(new Set(stage.areas).size, stage.areas.length);
    stage.areas.forEach((area, i) => {
      assert(labels.has(area) && areaGuidance[area], `Unresolved Home area: ${area}`);
      for (const prerequisite of areaGuidance[area].prerequisites) {
        const j = stage.areas.indexOf(prerequisite);
        assert(j < 0 || j < i, `Prerequisite appears later: ${profile.id}/${stage.id}: ${prerequisite} → ${area}`);
      }
    });
  }
}
const published = tracks.find(t => t.id === 'software-design');
const lessonLinks = all.filter(n => n.module && n.href?.startsWith('#software-design/'));
assert.deepEqual(lessonLinks.map(n => n.module), published.modules.map(m => m.id));
const expected = [
  ['solid-s', 'solid-o', 'solid-l', 'solid-i', 'solid-d'],
  ['factory', 'builder', 'prototype', 'singleton', 'factory-method'],
  ['facade', 'adapter', 'decorator'],
  ['iterator', 'strategy', 'observer', 'state', 'mediator', 'visitor'],
];
published.modules.forEach((m, i) => assert.deepEqual(m.concepts.map(c => c.id), expected[i]));
const publishedConcepts = published.modules.flatMap(m => m.concepts);
assert.equal(new Set(publishedConcepts.map(c => c.id)).size, publishedConcepts.length);
for (const concept of publishedConcepts) {
  assert(concept.description && new URL(concept.source.url).protocol === 'https:');
  assert.notEqual(translate(concept.description, 'en'), concept.description, `Untranslated concept: ${concept.id}`);
}
const glossary = appliedAI.modules.flatMap(m => m.concepts);
assert.equal(glossary.length, 104, 'Retain the 100 README terms and four agreed model basics');
const publishedIds = [...publishedConcepts, ...glossary].map(c => c.id);
assert.equal(new Set(publishedIds).size, publishedIds.length, 'Concept IDs must be globally unique');
assert.equal(new Set(glossaryInventory.map(c => c.term)).size, 100);
for (const module of appliedAI.modules) {
  assert(all.some(n => n.module === module.id && n.href === `#applied-ai/${module.id}`), `Missing glossary page: ${module.id}`);
  for (const c of module.concepts) {
    assert(c.description.endsWith('.') && !/[,;:—→]/u.test(c.description), `Interview wording: ${c.id}`);
    assert.notEqual(translate(c.description, 'en'), c.description, `Untranslated glossary: ${c.id}`);
    assert.equal(translate(translate(c.description, 'en'), 'es'), c.description, `Translation round trip: ${c.id}`);
    assert(c.source.publisher && c.source.title && new URL(c.source.url).protocol === 'https:', `Missing glossary source: ${c.id}`);
  }
}
const readmeIndex = process.argv.indexOf('--readme');
if (readmeIndex >= 0) {
  const readme = readFileSync(process.argv[readmeIndex + 1], 'utf8');
  const table = readme.split('## Glosario de Terminos')[1]?.split('\n## ')[0];
  assert(table, 'README glossary heading not found');
  const terms = [...table.matchAll(/^\| ([^|]+) \|/gm)].map(m => m[1].trim()).filter(t => t !== 'Termino' && !t.startsWith('---'));
  assert.deepEqual(terms.sort(), glossaryInventory.map(c => c.term).sort(), 'README inventory coverage');
}
console.log(`Validated ${all.length} navigation entries, ${branches.size} branches, ${lessonLinks.length} published links, ${publishedConcepts.length} published concepts and ${careerProfiles.reduce((n, p) => n + p.stages.length, 0)} career stages.`);
console.log(`Also validated ${glossary.length} bilingual glossary entries across ${appliedAI.modules.length} published local pages.`);
if (process.argv.includes('--inventory')) console.log(all.map(n => `${'  '.repeat(n.path.length - 1)}- ${n.label}${n.shared ? ' [shared]' : ''}${n.href ? ` → ${n.href}` : ''}`).join('\n'));
