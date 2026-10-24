import assert from 'node:assert/strict';
import test from 'node:test';
import { designPatterns } from '../src/data/design-patterns.ts';
import { patternGuides, patternGuideTranslations } from '../src/data/pattern-guides/index.ts';

const patterns = new Map(designPatterns.map(pattern => [pattern.id, pattern]));

test('every published pattern has exactly one guide using the same complete code', () => {
  assert.equal(patterns.size, 14);
  assert.deepEqual(new Set(Object.keys(patternGuides)), new Set(patterns.keys()));
  for (const [id, guide] of Object.entries(patternGuides)) {
    assert.equal(patterns.get(id).useCase, guide.useCase.es, id);
    assert.equal(patterns.get(id).example, guide.code, id);
    assert(guide.output.trim(), `Missing expected output: ${id}`);
    assert.match(guide.code, /public class Main\s*\{/);
    assert.match(guide.code, /public static void main\(String\[\] args\)/);
  }
});

for (const [id, guide] of Object.entries(patternGuides)) {
  test(`${id}: ordered steps have valid highlighted lines and complete bilingual explanations`, () => {
    const lines = guide.code.split('\n');
    assert(guide.steps.length >= 3 && guide.steps.length <= 5);
    let previousEnd = 0;
    const bilingual = [guide.useCase];
    for (const step of guide.steps) {
      assert(Number.isInteger(step.from) && Number.isInteger(step.to));
      assert(step.from > previousEnd && step.to >= step.from && step.to <= lines.length);
      assert(step.focus.length >= 1 && step.focus.length <= 3);
      assert.equal(new Set(step.focus).size, step.focus.length);
      for (const focus of step.focus) {
        assert(Number.isInteger(focus) && focus >= step.from && focus <= step.to);
        assert(lines[focus - 1].trim(), `Empty highlighted line: ${id}:${focus}`);
      }
      bilingual.push(step.title, step.why);
      previousEnd = step.to;
    }
    for (const text of bilingual) {
      assert(text.es.trim() && text.en.trim());
      assert.notEqual(text.es, text.en);
      assert.equal(patternGuideTranslations[text.es], text.en);
    }
  });
}
