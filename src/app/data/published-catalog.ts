import { systemDesignSummarySources } from '../../shared/data/concept-sources';
import { aiEcosystemTools } from '../../features/artificial-intelligence/generative-artificial-intelligence/ecosystem/data/ai-ecosystem';
import { comparisonSources } from '../../shared/data/concept-sources';
import { javaGuidePages } from '../../features/software-engineering/software-development/programming-languages/java/data/navigation';
import { javaEcosystemSources } from '../../shared/data/concept-sources';
import { foundationGuides } from './foundation-guides';
import { navigation, type NavigationNode } from './navigation';
import { tracks as coreTracks } from './curriculum';
import { designPatterns, designPatternPages } from '../../features/software-engineering/software-design/design-patterns/data/design-patterns';
import { aiGlossary, glossaryTopics, glossaryInventory } from '../../features/artificial-intelligence/generative-artificial-intelligence/generative-ai-applications/data/ai-glossary';
import { itServiceManagement } from '../../features/computer-systems/it-service-management/data/pending-navigation';
export const pendingPages = [...itServiceManagement.children];
export const publishedGuides = [{ label: 'System Design', href: '#system-design/sd-fundamentals' }, { label: 'AI Ecosystem', href: '#applied-ai/ecosystem' }, { label: 'Version History', href: '#java/versions' }, ...javaGuidePages, ...foundationGuides.map(guide => ({ label: guide.label, href: `#${guide.route}` }))];
const pendingDestinations = new Set(pendingPages.map(page => page.href));
export const publishedTracks = [...coreTracks.filter(track => track.id === 'software-design'), aiGlossary];
const destinations = new Set([...publishedTracks.flatMap(track => track.modules.map(module => `#${track.id}/${module.id}`)), ...publishedGuides.map(guide => guide.href)]);
const availableNavigation = (nodes: NavigationNode[]): NavigationNode[] => nodes.map(node => ({
  ...node, href: node.href && (destinations.has(node.href) || pendingDestinations.has(node.href)) ? node.href : undefined,
  children: node.children ? availableNavigation(node.children) : undefined,
}));
export const publishedNavigation = availableNavigation(navigation);
export const publishedSources = [...new Map([...publishedTracks.flatMap(track => track.modules.flatMap(module => module.concepts.map(concept => [concept.source.url, concept.source] as const))), ...foundationGuides.flatMap(guide => [guide.source, ...(guide.sections ?? []).flatMap(section => section.items.map(item => item.source))].map(source => [source.url, source] as const)), ...Object.values(javaEcosystemSources).map(source => [source.url, source] as const), ...Object.values(comparisonSources).map(source => [source.url, source] as const), ...Object.values(systemDesignSummarySources).map(source => [source.url, source] as const), ...aiEcosystemTools.map(tool => [tool.url, { publisher: tool.name, title: tool.name, url: tool.url }] as const)]).values()];
export const patternIds = new Set(designPatterns.map(pattern => pattern.id));
export const patternModuleIds = new Set(designPatternPages.map(page => page.id));
const originalNames = new Map(glossaryInventory.map(item => [item.id, item.term]));
export const glossaryAliases = new Map(glossaryTopics.flatMap(topic => topic.entries.map(([id, es, en]) => [id, `${es} ${en} ${originalNames.get(id) ?? ''}`] as const)));
