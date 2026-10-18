const navigationStorageKey = 'tech-training:navigation:v1';

export function initializeNavigation() {
  const branches = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-nav-branch]'));
  const validIds = new Set(branches.map(branch => branch.dataset.navBranch!));
  let expanded = new Set<string>();

  try {
    const stored: unknown = JSON.parse(localStorage.getItem(navigationStorageKey) ?? '[]');
    if (Array.isArray(stored)) {
      expanded = new Set(stored.filter((id): id is string => typeof id === 'string' && validIds.has(id)));
    }
  } catch {
    // Storage can be unavailable or malformed; the initial menu stays closed.
  }

  branches.forEach(branch => { branch.open = expanded.has(branch.dataset.navBranch!); });

  const persistNavigation = () => {
    // Include open children inside closed parents, so their state is preserved.
    const openIds = branches.filter(branch => branch.open).map(branch => branch.dataset.navBranch!);
    try {
      localStorage.setItem(navigationStorageKey, JSON.stringify(openIds));
    } catch {
      // Native disclosure controls keep working even when storage is blocked.
    }
  };

  branches.forEach(branch => branch.addEventListener('toggle', persistNavigation));
  window.addEventListener('pagehide', persistNavigation);
}
