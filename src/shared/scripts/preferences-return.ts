import { writeSessionPreference } from '../lib/preferences';
import { safePreferencesReturn, lastVisitedRouteKey } from '../lib/preferences-return';

export function initializePreferencesReturn(routes: ReadonlySet<string>) {
  const link = document.querySelector<HTMLAnchorElement>('#preferences-back');
  let previous: string | null = null;
  const safe = (value: unknown) => safePreferencesReturn(value, location.origin, routes);
  const update = () => {
    const current = `${location.pathname}${location.search}${location.hash}`;
    if (location.pathname.replace(/\/$/, '') !== '/preferences' && location.hash !== '#preferences') {
      previous = safe(current);
      if (previous) writeSessionPreference(lastVisitedRouteKey, JSON.stringify(previous));
      return;
    }
    let state: Record<string, unknown> = {};
    try {
      if (history.state && typeof history.state === 'object' && !Array.isArray(history.state)) state = history.state;
    } catch {}
    const destination = safe(state.preferencesReturn) ?? previous ?? safe(document.referrer) ?? '/';
    if (link) link.href = destination;
    try { history.replaceState({ ...state, preferencesReturn: destination }, '', location.href); }
    catch {}
  };
  window.addEventListener('hashchange', update);
  return update;
}
