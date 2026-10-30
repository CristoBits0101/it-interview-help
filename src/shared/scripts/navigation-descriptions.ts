import { translate } from '../lib/translations';

export function initializeNavigationDescriptions() {
  const sidebar = document.getElementById('sidebar');
  const tooltip = document.getElementById('navigation-description-tooltip');
  if (!sidebar || !tooltip) return;
  const triggers = sidebar.querySelectorAll<HTMLButtonElement>('[data-navigation-description]');
  let active: HTMLButtonElement | null = null;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  const cancelClose = () => clearTimeout(closeTimer);
  const hide = () => {
    cancelClose();
    if (tooltip.matches(':popover-open')) tooltip.hidePopover();
    active?.removeAttribute('aria-describedby');
    active = null;
  };
  const scheduleClose = () => {
    cancelClose();
    if (active?.matches(':focus-visible')) return;
    closeTimer = setTimeout(hide, 160);
  };
  const show = (trigger: HTMLButtonElement) => {
    cancelClose();
    if (active !== trigger) active?.removeAttribute('aria-describedby');
    active = trigger;
    tooltip.textContent = translate(trigger.dataset.navigationDescription!, document.documentElement.lang === 'es' ? 'es' : 'en');
    trigger.setAttribute('aria-describedby', tooltip.id);
    if (!tooltip.matches(':popover-open')) tooltip.showPopover();
    const anchor = trigger.getBoundingClientRect();
    const bounds = tooltip.getBoundingClientRect();
    const margin = parseFloat(getComputedStyle(tooltip).paddingLeft);
    const gap = margin / 2;
    const left = Math.max(margin, Math.min(anchor.right + gap, document.documentElement.clientWidth - bounds.width - margin));
    const top = Math.max(margin, Math.min(anchor.top + (anchor.height - bounds.height) / 2, window.innerHeight - bounds.height - margin));
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') show(trigger);
    });
    trigger.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'touch') scheduleClose();
    });
    trigger.addEventListener('focus', () => {
      if (trigger.matches(':focus-visible')) show(trigger);
    });
    trigger.addEventListener('blur', () => {
      if (active === trigger) hide();
    });
    trigger.addEventListener('click', () => show(trigger));
  });
  tooltip.addEventListener('pointerenter', cancelClose);
  tooltip.addEventListener('pointerleave', scheduleClose);
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !active) return;
    hide();
    event.preventDefault();
    event.stopPropagation();
  }, true);
  document.addEventListener('pointerdown', event => {
    if (active && event.target instanceof Node && !active.contains(event.target) && !tooltip.contains(event.target)) hide();
  });
  document.getElementById('language-toggle')?.addEventListener('click', hide);
  document.getElementById('sidebar-close')?.addEventListener('click', hide);
  document.addEventListener('scroll', hide, true);
  window.addEventListener('resize', hide);
  window.addEventListener('popstate', hide);
  window.addEventListener('sidebar-layout-change', hide);
}
