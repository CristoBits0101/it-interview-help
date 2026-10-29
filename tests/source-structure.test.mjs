import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { navigation } from '../src/app/data/navigation.ts';
import { publishedGuides, publishedTracks } from '../src/app/data/published-catalog.ts';

const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));
const featureRoot = join(sourceRoot, 'features');
const technicalFolders = new Set(['components', 'data', 'lib', 'scripts', 'styles']);
const slug = label => label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const navigationPaths = (nodes, parent = []) => nodes.flatMap(node => {
  const segments = [...parent, slug(node.label)];
  return [{ node, segments }, ...navigationPaths(node.children ?? [], segments)];
});
const canonicalPaths = navigationPaths(navigation);

test('custom source directories contain grouping folders or leaf files without mixing both', () => {
  const mixedDirectories = [];
  const visit = directory => {
    const entries = readdirSync(directory, { withFileTypes: true });
    const folders = entries.filter(entry => entry.isDirectory());
    const files = entries.filter(entry => entry.isFile());
    const name = relative(sourceRoot, directory).replaceAll('\\', '/');
    if (name === 'pages' || name.startsWith('pages/')) return;
    if (folders.length && files.length) mixedDirectories.push(name || 'src');
    for (const folder of folders) visit(join(directory, folder.name));
  };
  visit(sourceRoot);
  assert.deepEqual(mixedDirectories, [], 'Keep grouping folders separate from directories containing source files.');
});

test('implemented business domains follow the sidebar hierarchy without empty folders', () => {
  assert(existsSync(featureRoot), 'Place implemented business domains under src/features.');
  const domainPaths = new Set(canonicalPaths.map(item => item.segments.join('/')));
  domainPaths.add('home');
  const visit = (directory, segments = []) => {
    const entries = readdirSync(directory, { withFileTypes: true });
    const name = segments.join('/') || 'features';
    assert(entries.length, `Empty business folder: ${name}`);
    assert(entries.every(entry => entry.isDirectory()), `Business folders contain only grouped responsibilities or subdomains: ${name}`);
    for (const entry of entries) {
      const childSegments = [...segments, entry.name];
      const childName = childSegments.join('/');
      const childDirectory = join(directory, entry.name);
      if (segments.length && technicalFolders.has(entry.name)) {
        const files = readdirSync(childDirectory, { withFileTypes: true });
        assert(files.length, `Empty responsibility folder: ${childName}`);
        assert(files.every(file => file.isFile()), `Responsibility folders contain only source files: ${childName}`);
      } else {
        assert(domainPaths.has(childName), `Business path does not match the sidebar: ${childName}`);
        visit(childDirectory, childSegments);
      }
    }
  };
  visit(featureRoot);
});

test('every published content destination has files in its deepest sidebar domain', () => {
  const destinations = new Set([
    ...publishedGuides.map(guide => guide.href),
    ...publishedTracks.flatMap(track => track.modules.map(module => `#${track.id}/${module.id}`)),
  ]);
  for (const destination of destinations) {
    const matches = canonicalPaths.filter(item => item.node.href === destination);
    assert(matches.length, `Published content is missing from the sidebar: ${destination}`);
    const depth = Math.max(...matches.map(item => item.segments.length));
    const owners = matches.filter(item => item.segments.length === depth);
    assert.equal(owners.length, 1, `Published content has ambiguous sidebar ownership: ${destination}`);
    const segments = owners[0].segments;
    const directory = join(featureRoot, ...segments);
    assert(existsSync(directory), `Missing business domain for ${destination}: ${segments.join('/')}`);
    const responsibilities = readdirSync(directory, { withFileTypes: true }).filter(entry => entry.isDirectory() && technicalFolders.has(entry.name));
    const ownedFiles = responsibilities.flatMap(entry => readdirSync(join(directory, entry.name), { withFileTypes: true }).filter(file => file.isFile()));
    assert(ownedFiles.length, `Published content has no files owned by its sidebar domain: ${destination}`);
  }
});
