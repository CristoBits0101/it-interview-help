export function initializeCareerTooltips() {
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-career-stage-option]'));
  let active: { group: HTMLElement; button: HTMLButtonElement; tooltip: HTMLElement; mode: 'pointer' | 'keyboard' | 'touch' } | null = null;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  const cancelClose = () => clearTimeout(closeTimer);
  const hide = () => {
    cancelClose();
    if (!active) return;
    active.tooltip.hidden = true;
    active.tooltip.querySelectorAll<HTMLElement>('[data-career-term-description]').forEach(row => { row.hidden = false; });
    active = null;
  };
  const scheduleClose = () => {
    cancelClose();
    if (active?.mode !== 'keyboard') closeTimer = setTimeout(hide, 160);
  };

  groups.forEach(group => {
    const button = group.querySelector<HTMLButtonElement>('[data-career-stage]');
    const tooltip = group.querySelector<HTMLElement>('[role="tooltip"]');
    const terms = Array.from(group.querySelectorAll<HTMLElement>('[data-career-term]'));
    if (!button || !tooltip) return;

    const show = (term: HTMLElement | null, mode: 'pointer' | 'keyboard' | 'touch') => {
      hide();
      tooltip.querySelectorAll<HTMLElement>('[data-career-term-description]').forEach(row => {
        row.hidden = term !== null && row.dataset.careerTermDescription !== term.dataset.careerTerm;
      });
      tooltip.hidden = false;
      const anchor = (term ?? button).getBoundingClientRect();
      const bounds = group.closest<HTMLElement>('#home-view')!.getBoundingClientRect();
      const groupBounds = group.getBoundingClientRect();
      const { width, height } = tooltip.getBoundingClientRect();
      const margin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-page'));
      const leftEdge = Math.max(margin, bounds.left);
      const rightEdge = Math.min(document.documentElement.clientWidth - margin, bounds.right);
      const left = Math.max(leftEdge, Math.min(anchor.left + (anchor.width - width) / 2, rightEdge - width));
      const gap = parseFloat(getComputedStyle(button).columnGap) / 2;
      const roomBelow = window.innerHeight - groupBounds.bottom - gap;
      const above = roomBelow < height && groupBounds.top > roomBelow;
      tooltip.style.left = `${left - groupBounds.left}px`;
      tooltip.style.top = `${above ? -height - gap : groupBounds.height + gap}px`;
      active = { group, button, tooltip, mode };
    };

    terms.forEach(term => {
      term.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'touch') show(term, 'pointer');
      });
      term.addEventListener('pointerleave', event => {
        if (event.pointerType !== 'touch') scheduleClose();
      });
    });
    button.addEventListener('focus', () => {
      if (button.matches(':focus-visible')) show(null, 'keyboard');
    });
    button.addEventListener('blur', () => {
      if (active?.button === button && active.mode === 'keyboard') hide();
    });
    button.addEventListener('pointerup', event => {
      if (event.pointerType !== 'touch') return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-career-term]') : null;
      show(target, 'touch');
    });
    tooltip.addEventListener('pointerenter', cancelClose);
    tooltip.addEventListener('pointerleave', scheduleClose);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active) {
      hide();
      event.preventDefault();
    }
  });
  document.addEventListener('pointerdown', event => {
    if (active && event.target instanceof Node && !active.group.contains(event.target)) hide();
  });
  document.getElementById('language-select')?.addEventListener('change', hide);
  window.addEventListener('resize', hide);
  window.addEventListener('hashchange', hide);
}
