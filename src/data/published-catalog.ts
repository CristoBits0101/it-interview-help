import { navigation, type NavigationNode } from './navigation';
import { tracks as coreTracks } from './curriculum';
import { designPatterns, designPatternPages } from './design-patterns';
import { aiGlossary, glossaryTopics, glossaryInventory } from './ai-glossary';
import { itServiceManagement } from './pending-navigation';
export const pendingPages = [...itServiceManagement.children];
const pendingDestinations = new Set(pendingPages.map(page => page.href));
export const publishedTracks = [...coreTracks.filter(track => track.id === 'software-design'), aiGlossary];
const destinations = new Set(publishedTracks.flatMap(track => track.modules.map(module => `#${track.id}/${module.id}`)));
const availableNavigation = (nodes: NavigationNode[]): NavigationNode[] => nodes.map(node => ({
  ...node, href: node.href && (destinations.has(node.href) || pendingDestinations.has(node.href)) ? node.href : undefined,
  children: node.children ? availableNavigation(node.children) : undefined,
}));
export const publishedNavigation = availableNavigation(navigation);
export const publishedSources = [...new Map(publishedTracks.flatMap(track => track.modules.flatMap(module => module.concepts.map(concept => [concept.source.url, concept.source] as const)))).values()];
export const patternIds = new Set(designPatterns.map(pattern => pattern.id));
export const patternModuleIds = new Set(designPatternPages.map(page => page.id));
const originalNames = new Map(glossaryInventory.map(item => [item.id, item.term]));
export const glossaryAliases = new Map(glossaryTopics.flatMap(topic => topic.entries.map(([id, es, en]) => [id, `${es} ${en} ${originalNames.get(id) ?? ''}`] as const)));
