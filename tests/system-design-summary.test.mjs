import test from 'node:test';
import assert from 'node:assert/strict';
import { systemDesignSummary, systemDesignGroups } from '../src/data/system-design-summary.ts';
import { systemDesignSummarySources } from '../src/data/concept-sources.ts';
import { publishedGuides, publishedNavigation, publishedSources } from '../src/data/published-catalog.ts';

test('the system design summary covers each technical topic once with bilingual learning content', () => {
  const topicIds = systemDesignSummary.map(topic => topic.id);
  assert.deepEqual(topicIds, ['method', 'capacity', 'scaling', 'rate-limiter', 'consistent-hashing', 'key-value', 'unique-ids', 'url-shortener', 'crawler', 'notifications', 'news-feed', 'chat', 'autocomplete', 'video', 'file-sync']);
  const grouped = systemDesignGroups.flatMap(group => group.topicIds);
  assert.equal(new Set(grouped).size, grouped.length);
  assert.deepEqual(new Set(grouped), new Set(topicIds));
  const bilingual = value => assert(value.es.trim() && value.en.trim());
  for (const group of systemDesignGroups) bilingual(group.title);
  for (const topic of systemDesignSummary) {
    for (const value of [topic.title, topic.decision, topic.question, topic.answer]) bilingual(value);
    assert(topic.terms.length >= 4);
    for (const item of topic.terms) {
      bilingual(item.title);
      bilingual(item.description);
      assert(item.description.es.endsWith('.') && item.description.en.endsWith('.'));
    }
    assert(topic.sourceIds.length);
    for (const id of topic.sourceIds) {
      const source = systemDesignSummarySources[id];
      assert.equal(new URL(source.url).protocol, 'https:');
      assert(publishedSources.some(item => item.url === source.url));
    }
  }
  assert(!/Bookey|Alex Xu|sobre el autor|introducción|introduction/i.test(JSON.stringify(systemDesignSummary)));
});

test('the existing System Design destination publishes the summary without mounting the historical catalog', () => {
  const flatten = nodes => nodes.flatMap(node => [node, ...flatten(node.children ?? [])]);
  const route = '#system-design/sd-fundamentals';
  assert.equal(publishedGuides.filter(guide => guide.href === route).length, 1);
  assert.equal(flatten(publishedNavigation).filter(node => node.href === route).length, 1);
});
