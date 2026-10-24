import type { Track } from '../data/curriculum';
import type { NavigationNode } from '../data/navigation';
export const countConcepts = (track: Track) => track.modules.reduce((total, module) => total + module.concepts.length, 0);
export const flattenNavigation = (nodes: NavigationNode[]): NavigationNode[] => nodes.flatMap(node => [node, ...flattenNavigation(node.children ?? [])]);

export const firstPublishedDestination = (node: NavigationNode): string | undefined => node.href ?? node.children?.map(firstPublishedDestination).find(Boolean);
