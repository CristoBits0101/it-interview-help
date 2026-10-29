import { $ } from './dom';
export function initializeNavigationDrawer(search: HTMLInputElement) {
const sidebar = $('#sidebar');
const backdrop = $('#mobile-backdrop');
const mobileToggle = $('#mobile-toggle');
const isNavigationDrawer = () => document.documentElement.classList.contains('sidebar-drawer');
function closeMenu() {
  sidebar.classList.remove('mobile-open');
  backdrop.hidden = true;
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  $('.workspace').inert = false;
  sidebar.setAttribute('role', 'complementary');
  sidebar.removeAttribute('aria-modal');
  if (isNavigationDrawer()) sidebar.inert = true;
}
function openMenu() {
  sidebar.inert = false;
  sidebar.classList.add('mobile-open');
  backdrop.hidden = false;
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  $('.workspace').inert = true;
  sidebar.setAttribute('role', 'dialog');
  sidebar.setAttribute('aria-modal', 'true');
  sidebar.querySelector<HTMLAnchorElement>('.brand')!.focus();
}
mobileToggle.addEventListener('click', () => sidebar.classList.contains('mobile-open') ? closeMenu() : openMenu());
$('#sidebar-close').addEventListener('click', () => { closeMenu(); mobileToggle.focus(); });
backdrop.addEventListener('click', () => { closeMenu(); mobileToggle.focus(); });
window.addEventListener('sidebar-layout-change', () => { closeMenu(); sidebar.inert = isNavigationDrawer(); });
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && !$('dialog[open]') && !sidebar.classList.contains('mobile-open')) {
    event.preventDefault(); search.focus();
  }
  if (sidebar.classList.contains('mobile-open')) {
    if (event.key === 'Escape') { closeMenu(); mobileToggle.focus(); }
    if (event.key === 'Tab') {
      const focusable = Array.from(sidebar.querySelectorAll<HTMLElement>('a, button, summary')).filter(el => el.checkVisibility());
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }
});


  sidebar.inert = isNavigationDrawer();
  return { close: closeMenu };
}
