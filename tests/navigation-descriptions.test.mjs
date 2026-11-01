import assert from 'node:assert/strict';
import test from 'node:test';
import { navigation } from '../src/app/data/navigation.ts';
import { translate } from '../src/shared/lib/translations.ts';

const flatten = nodes => nodes.flatMap(node => [node, ...flatten(node.children ?? [])]);

test('every destination with an existing dot has a bilingual declarative explanation', () => {
  for (const node of flatten(navigation.flatMap(area => area.children ?? []))) {
    assert.ok(node.description?.es, `Missing Spanish explanation: ${node.label}`);
    assert.ok(node.description?.en, `Missing English explanation: ${node.label}`);
    assert.notEqual(node.description.es, node.description.en);
    for (const description of Object.values(node.description)) {
      assert.ok(!description.endsWith('.'), node.label);
      assert.doesNotMatch(description, /[?¿]/u, node.label);
    }
  }
});

test('quantum computing is translated and remains a disabled computer systems destination', () => {
  const quantum = navigation.find(node => node.label === 'Computer Systems').children.find(node => node.label === 'Quantum Computing');
  assert.ok(quantum);
  assert.equal(quantum.href, undefined);
  assert.equal(quantum.children, undefined);
  assert.equal(translate(quantum.label, 'es'), 'Computación Cuántica');
  assert.equal(translate('Computación Cuántica', 'en'), quantum.label);
});
