import assert from 'node:assert/strict';
import test from 'node:test';
import { foundationGuides } from '../src/app/data/foundation-guides.ts';
import { publishedNavigation } from '../src/app/data/published-catalog.ts';
import { migrateBranchId } from '../src/app/data/navigation-migrations.ts';

const findPath = (nodes, route, parents = []) => {
  for (const node of nodes) {
    const path = [...parents, node.label];
    if (node.href === `#${route}`) return path;
    const result = findPath(node.children ?? [], route, path);
    if (result) return result;
  }
};

test('Java setup and servlet deployment belong to separate knowledge branches', () => {
  const java = ['Software Engineering', 'Software Development', 'Programming Languages', 'Java'];
  assert.deepEqual(findPath(publishedNavigation, 'java/jdk-environment'), [...java, 'Developer Roadmap', 'Development Environment']);
  assert.deepEqual(findPath(publishedNavigation, 'spring-boot/project-creation'), [...java, 'Frameworks', 'Spring Boot', 'Project Creation']);
  assert.deepEqual(findPath(publishedNavigation, 'servlet-containers/apache-tomcat'), ['Software Engineering', 'Software Engineering Operations', 'Servlet Containers', 'Apache Tomcat']);
});

test('HTTP retains its route and existing ancestor expansion identifiers', () => {
  assert.deepEqual(findPath(publishedNavigation, 'computer-networks/http'), ['Computer Systems', 'Computer Networks', 'Network Protocols', 'HTTP Protocol']);
  for (const path of [['Computer Systems'], ['Computer Systems', 'Computer Networks']]) {
    const id = path.map(encodeURIComponent).join('/');
    assert.equal(migrateBranchId(id), id);
  }
  assert.equal(foundationGuides.filter(guide => guide.route === 'computer-networks/http').length, 1);
});

test('setup examples retain the supplied coordinates and distinguish configuration responsibilities', () => {
  const jdk = foundationGuides.find(guide => guide.route === 'java/jdk-environment');
  const spring = foundationGuides.find(guide => guide.route === 'spring-boot/project-creation');
  const tomcat = foundationGuides.find(guide => guide.route === 'servlet-containers/apache-tomcat');
  const codes = guide => guide.sections.flatMap(section => [...section.items, ...(section.groups ?? []).flatMap(group => group.items)].map(item => item.code).filter(Boolean));
  assert(codes(jdk).includes('JAVA_HOME=C:\\Program Files\\Java\\jdk-21'));
  assert(codes(jdk).includes('C:\\Program Files\\Java\\jdk-21\\bin'));
  assert(codes(jdk).includes('%JAVA_HOME%\\bin'));
  assert(codes(jdk).some(code => code.includes('source ~/.bashrc')));
  assert.deepEqual(jdk.sections.map(section => section.title.es), ['Introducción al JDK', 'Descargar el JDK', 'Configurar las variables de entorno']);
  const introduction = jdk.sections[0].groups;
  assert.deepEqual(introduction.map(group => group.title.es), ['¿Qué es el JDK?', '¿Qué incluye el JDK?']);
  assert.deepEqual(jdk.sections[2].groups.map(group => group.title.en), ['Windows', 'Linux']);
  for (const language of ['es', 'en']) {
    assert(introduction[0].description[language].includes('Java Development Kit'));
    assert(introduction[0].description[language].includes('Software Development Kit'));
    const runtime = introduction[1].items.find(item => item.title.en === 'Runtime').description[language];
    assert(runtime.includes('JVM (Java Virtual Machine)'));
    assert(runtime.includes('JRE (Java Runtime Environment)'));
  }
  for (const value of ['com.creativa360.itv', 'cd360itv-api-core', 'com.creativa360.itv:cd360itv-api-core:1.0.0', 'CD360 ITV API Core', 'Core API para autenticación y gestión ITV', 'com.creativa360.itv.api.core']) assert(codes(spring).flatMap(code => code.split('\n')).includes(value), value);
  assert.deepEqual(spring.sections[0].items.map(item => item.title.en), ['Group', 'Artifact', 'Package name', 'Name', 'Description']);
  assert.match(spring.sections[0].items.find(item => item.title.en === 'Name').description.en, /human-readable project name/);
  assert.equal(tomcat.sections.length, 1);
  for (const guide of [jdk, spring, tomcat]) {
    assert.equal(guide.questions.length + guide.diagram.length + guide.concepts.length + guide.related.length, 0);
    for (const locale of ['es', 'en']) {
      assert(guide.description[locale].endsWith('.'));
      assert(!/[,;:→]/u.test(guide.description[locale]));
    }
  }
});

test('saved Java environment expansion moves to the roadmap without changing ancestors', () => {
  const java = ['Software Engineering', 'Software Development', 'Programming Languages', 'Java'];
  const branch = labels => labels.map(encodeURIComponent).join('/');
  assert.equal(migrateBranchId(branch([...java, 'Development Environment'])), branch([...java, 'Developer Roadmap']));
  assert.equal(migrateBranchId(branch(java)), branch(java));
});
