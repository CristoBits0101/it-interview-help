export const lastVisitedRouteKey = 'tech-training:last-route:v1';

export function safePreferencesReturn(value: unknown, origin: string, routes: ReadonlySet<string>): string | null {
  if (typeof value !== 'string' || !value) return null;
  try {
    const url = new URL(value, origin);
    const path = url.pathname.replace(/\/$/, '') || '/';
    const hashRoute = url.hash.slice(1).replace(/^\/+|\/+$/g, '');
    if (url.origin !== origin || url.username || url.password || path === '/preferences' || path === '/404' || path === '/404.html' || hashRoute === 'preferences' || hashRoute === '404' || hashRoute === '404.html') return null;
    if (!routes.has(path)) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch { return null; }
}
