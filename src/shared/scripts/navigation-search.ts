import { normalizeSearch } from '../lib/search';
import { translate } from '../lib/translations';

export function initializeNavigationSearch(root: HTMLElement) {
  const rows = Array.from(root.querySelectorAll<HTMLLIElement>('li'));
  const labels = new Map(rows.map(row => {
    const label = row.querySelector<HTMLElement>(':scope > .navigation-row .navigation-label, :scope > details > summary .navigation-label');
    const source = label?.dataset.i18nSource ?? label?.textContent ?? '';
    return [row, normalizeSearch(`${source} ${translate(source, 'es')} ${translate(source, 'en')}`)];
  }));
  return (value: string) => {
    const query = normalizeSearch(value.trim());
    const matches = new Set(rows.filter(row => !query || labels.get(row)?.includes(query)));
    for (const row of rows) {
      const ancestors = [];
      let parent = row.parentElement?.closest('li');
      while (parent && root.contains(parent)) {
        ancestors.push(parent);
        parent = parent.parentElement?.closest('li');
      }
      row.hidden = Boolean(query) && !matches.has(row) && !ancestors.some(ancestor => matches.has(ancestor))
        && !Array.from(row.querySelectorAll('li')).some(child => matches.has(child));
    }
    const openBranches = new Set(Array.from(root.querySelectorAll<HTMLDetailsElement>('details')).filter(branch =>
      !branch.closest('li')?.hidden && Array.from(branch.querySelectorAll(':scope > ul > li')).some(row => !(row as HTMLElement).hidden)));
    return { hasMatches: matches.size > 0, openBranches };
  };
}
