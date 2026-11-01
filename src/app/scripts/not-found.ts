import { applyStaticTranslations, getSavedLanguage, translate } from '../../shared/scripts/i18n';
import { initializeNavigation } from '../../shared/scripts/navigation';
import { initializeNavigationDrawer } from '../../shared/scripts/navigation-drawer';
import { documentTitle } from '../../shared/lib/document-title';
import { safePreferencesReturn, lastVisitedRouteKey } from '../../shared/lib/preferences-return';
import { readSessionJsonPreference } from '../../shared/lib/preferences';

export function initializeNotFoundPage() {
  const refreshLanguage = () => {
    const language = getSavedLanguage();
    applyStaticTranslations(language);
    document.title = documentTitle('/404', {}, language, 'Page Not Found');
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')!.content = document.title;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document.querySelector<HTMLMetaElement>(selector)!.content = translate('No encontramos esta página.', language);
    }
  };
  refreshLanguage();
  const filterNavigation = initializeNavigation();
  const search = document.querySelector<HTMLInputElement>('#search')!;
  const clear = document.querySelector<HTMLButtonElement>('#search-clear')!;
  initializeNavigationDrawer(search);
  search.addEventListener('input', () => {
    filterNavigation(search.value);
    clear.hidden = !search.value;
  });
  clear.addEventListener('click', () => {
    search.value = '';
    filterNavigation('');
    clear.hidden = true;
    search.focus();
  });
  const titles: Record<string, string> = JSON.parse(document.querySelector<HTMLTitleElement>('title')!.dataset.routeTitles!);
  const routes = new Set(Object.keys(titles));
  const safe = (value: unknown) => safePreferencesReturn(value, location.origin, routes);
  const refreshReturn = () => {
    const destination = safe(readSessionJsonPreference(lastVisitedRouteKey)) ?? safe(document.referrer);
    const back = document.querySelector<HTMLAnchorElement>('#not-found-back')!;
    back.hidden = destination === null;
    if (destination) back.href = destination;
  };
  refreshReturn();
  window.addEventListener('pageshow', () => { refreshLanguage(); refreshReturn(); });
}
