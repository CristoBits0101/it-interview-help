import { migrateBranchId } from '../data/navigation-migrations';

const navigationStorageKey = 'tech-training:navigation:v1';

function fitSidebarToLabels() {
  const sidebar = document.querySelector<HTMLElement>('#sidebar');
  if (!sidebar) return;
  let frame = 0;

  const measure = () => {
    frame = 0;
    const probe = sidebar.cloneNode(true) as HTMLElement;
    probe.removeAttribute('id');
    probe.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    probe.setAttribute('aria-hidden', 'true');
    probe.inert = true;
    Object.assign(probe.style, {
      width: 'max-content', maxWidth: 'none', visibility: 'hidden',
      pointerEvents: 'none', transform: 'none', transition: 'none', left: '-100000px',
    });
    probe.querySelectorAll('details').forEach(branch => { branch.open = true; });
    document.body.append(probe);
    const width = Math.ceil(probe.getBoundingClientRect().width);
    probe.remove();
    if (document.documentElement.style.getPropertyValue('--sidebar-width') !== `${width}px`) {
      document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
    }
    const root = document.documentElement;
    const drawer = innerWidth <= 850 || innerWidth - width < 20 * parseFloat(getComputedStyle(root).fontSize);
    if (root.classList.contains('sidebar-drawer') !== drawer) {
      root.classList.toggle('sidebar-drawer', drawer);
      window.dispatchEvent(new Event('sidebar-layout-change'));
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };

  new MutationObserver(schedule).observe(sidebar, { childList: true, characterData: true, subtree: true });
  const sizes = new ResizeObserver(schedule);
  sidebar.querySelectorAll('.navigation-label, .nav-eyebrow, .brand span').forEach(label => sizes.observe(label));
  document.fonts.ready.then(schedule);
  document.fonts.addEventListener('loadingdone', schedule);
  window.addEventListener('resize', schedule);
  window.addEventListener('catalog-availability-change', schedule);
  measure();
}

export function initializeNavigation() {
  fitSidebarToLabels();
  const branches = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-nav-branch]'));
  const validIds = new Set(branches.map(branch => branch.dataset.navBranch!));
  let expanded = new Set<string>();

  try {
    const stored: unknown = JSON.parse(localStorage.getItem(navigationStorageKey) ?? '[]');
    if (Array.isArray(stored)) {
      expanded = new Set(stored.filter((id): id is string => typeof id === 'string')
        .map(migrateBranchId).filter(id => validIds.has(id)));
    }
  } catch {
  }

  branches.forEach(branch => { branch.open = expanded.has(branch.dataset.navBranch!); });

  const persistNavigation = () => {
    const openIds = branches.filter(branch => branch.open).map(branch => branch.dataset.navBranch!);
    try {
      localStorage.setItem(navigationStorageKey, JSON.stringify(openIds));
    } catch {
    }
  };

  branches.forEach(branch => branch.addEventListener('toggle', persistNavigation));
  window.addEventListener('pagehide', persistNavigation);
}
