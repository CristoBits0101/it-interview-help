import { translate, type Language } from './translations';

type TitleNode = { label: string; href?: string; children?: TitleNode[] };

export function createRouteTitles(nodes: TitleNode[]): Record<string, string> {
  const titles: Record<string, string> = { '/': 'Home', '/preferences': 'Preferences' };
  const visit = (items: TitleNode[]) => {
    for (const node of items) {
      if (node.href) titles[node.href.replace(/^#/, '/')] = node.label;
      if (node.children) visit(node.children);
    }
  };
  visit(nodes);
  return titles;
}

export function documentTitle(pathname: string, titles: Record<string, string>, language: Language, fallback = 'Home'): string {
  const route = pathname.replace(/\/$/, '') || '/';
  return `${translate(titles[route] ?? fallback, language)} | IT Interview Help`;
}
