import { preferenceKeys, readJsonPreference, restoreKnownIds, writePreference } from '../lib/preferences';
import { migrateBranchId } from '../data/navigation-migrations';

function fitSidebarToLabels() {
  const sidebar = document.querySelector<HTMLElement>('#sidebar');
  if (!sidebar) return;
  let frame = 0;

  const measureVisibleContent = () => {
    const probe = sidebar.cloneNode(true) as HTMLElement;
    probe.removeAttribute('id');
    probe.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    probe.querySelectorAll('details:not([open])').forEach(branch => {
      Array.from(branch.children).filter(child => child.tagName !== 'SUMMARY').forEach(child => child.remove());
    });
    probe.setAttribute('aria-hidden', 'true');
    probe.inert = true;
    Object.assign(probe.style, {
      width: 'max-content', maxWidth: 'none', visibility: 'hidden',
      pointerEvents: 'none', transform: 'none', transition: 'none', left: '-100000px',
    });
    document.body.append(probe);
    const width = Math.ceil(probe.getBoundingClientRect().width);
    probe.remove();
    return width;
  };

  const measure = () => {
    frame = 0;
    const width = measureVisibleContent();
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

  new MutationObserver(schedule).observe(sidebar, { childList: true, characterData: true, attributes: true, attributeFilter: ['open', 'hidden'], subtree: true });
  const sizes = new ResizeObserver(schedule);
  sidebar.querySelectorAll('.navigation-label, .nav-eyebrow, .brand span').forEach(label => sizes.observe(label));
  document.fonts.ready.then(schedule);
  document.fonts.addEventListener('loadingdone', schedule);
  window.addEventListener('resize', schedule);
  measure();
}

export function initializeNavigation() {
  fitSidebarToLabels();
  const branches = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-nav-branch]'));
  const validIds = new Set(branches.map(branch => branch.dataset.navBranch!));
  const expanded = new Set(restoreKnownIds(readJsonPreference(preferenceKeys.navigation), validIds, migrateBranchId));

  branches.forEach(branch => { branch.open = expanded.has(branch.dataset.navBranch!); });

  const persistNavigation = () => {
    const openIds = branches.filter(branch => branch.open).map(branch => branch.dataset.navBranch!);
    writePreference(preferenceKeys.navigation, JSON.stringify(openIds));
  };

  branches.forEach(branch => branch.addEventListener('toggle', persistNavigation));
  window.addEventListener('pagehide', persistNavigation);
}
