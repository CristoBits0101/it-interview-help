import test from 'node:test';
import assert from 'node:assert/strict';
import { javaGuidePages } from '../src/features/software-engineering/software-development/programming-languages/java/data/navigation';
import { javaTechnologies, springTechnologies, javaArchitecture } from '../src/features/software-engineering/software-development/programming-languages/java/language-overview/ecosystem/data/java-ecosystem';
import { javaCareerPaths } from '../src/features/software-engineering/software-development/programming-languages/java/language-overview/career-paths/data/java-career-paths';
import { javaDeveloperRoadmap } from '../src/features/software-engineering/software-development/programming-languages/java/developer-roadmap/data/java-developer-roadmap';
import { javaEcosystemSources } from '../src/shared/data/concept-sources.ts';
import { publishedNavigation, publishedGuides, publishedSources } from '../src/app/data/published-catalog.ts';
import { translate } from '../src/shared/lib/translations.ts';

const flatten = nodes => nodes.flatMap(node => [node, ...flatten(node.children ?? [])]);

test('Java groups its three overview dimensions and preserves versions', () => {
  const java = flatten(publishedNavigation).find(node => node.label === 'Java');
  assert.deepEqual(java.children.map(node => node.label), ['Language Overview', 'Developer Roadmap', 'Libraries', 'Frameworks']);
  assert.deepEqual(java.children[0].children.map(node => node.label), ['Version History', 'Ecosystem', 'Career Paths']);
  const roadmap = java.children.find(node => node.label === 'Developer Roadmap');
  assert.equal(roadmap.href, undefined);
  assert.deepEqual(roadmap.children.map(node => node.label), ['Development Environment', 'Programming Fundamentals', 'Data Structures', 'Algorithms']);
  assert(roadmap.children.slice(1).every(node => node.href === undefined));
  assert(!publishedGuides.some(guide => guide.href === '#java/developer-roadmap'));
  for (const page of javaGuidePages) {
    assert(publishedGuides.some(guide => guide.href === page.href));
    assert.equal(flatten(publishedNavigation).filter(node => node.href === page.href).length, 1);
    assert.equal(translate(translate(page.label, 'es'), 'en'), page.label);
  }
  assert(!flatten(java.children).some(node => /^(?:Backend|Android|Desktop) Developer$|^Data Engineer$/.test(node.label)));
});

test('the ecosystem covers both supplied reference cards without adding unrelated technologies', () => {
  assert.deepEqual(javaTechnologies.map(item => item.name), ['Spring', 'Hibernate', 'JavaFX', 'Android SDK', 'Maven', 'Jenkins', 'Apache Kafka', 'Selenium', 'JSP']);
  assert.equal(javaArchitecture.name, 'Microservices');
  assert.deepEqual(springTechnologies.map(item => item.name), ['Spring Boot', 'Spring Data JPA', 'Spring Security', 'Spring Web', 'Spring WebFlux', 'Spring Cloud', 'Spring Cloud OpenFeign', 'Spring AMQP / Kafka', 'Spring Cache', 'Spring Batch', 'JUnit + Mockito', 'Springdoc OpenAPI', 'Spring Actuator']);
  const technologies = [...javaTechnologies, ...springTechnologies, javaArchitecture];
  assert.equal(new Set(technologies.map(item => item.id)).size, technologies.length);
  for (const technology of technologies) {
    for (const field of [technology.need, technology.outcome]) assert(field.es.trim() && field.en.trim());
    assert(technology.sourceIds.length);
    for (const id of technology.sourceIds) {
      const source = javaEcosystemSources[id];
      assert(source.publisher && source.title);
      assert.equal(new URL(source.url).protocol, 'https:');
      assert(publishedSources.some(item => item.url === source.url));
    }
  }
});

test('professional paths and learning stages retain the supplied scope and resolve ecosystem connections', () => {
  assert.deepEqual(javaCareerPaths.map(path => path.title.en), ['Backend Developer', 'Android Developer', 'Desktop Developer', 'Data Engineer']);
  for (const path of javaCareerPaths) {
    assert(path.title.es && path.focus.es && path.focus.en);
    for (const id of path.technologyIds) assert(javaTechnologies.some(technology => technology.id === id));
  }
  assert.deepEqual(javaDeveloperRoadmap.map(stage => stage.en), ['Programming Fundamentals', 'Data Structures', 'Algorithms']);
  assert(javaDeveloperRoadmap.every(stage => stage.es));
});
