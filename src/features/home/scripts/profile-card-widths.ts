import { distributeProfileWidths, roundProfileWidths } from '../lib/profile-card-widths';

export function measureProfileColumns(viewport: HTMLElement, items: readonly HTMLElement[], maximumSlots: number, availableWidth: number, gap: number, minimumWidth: number): { slots: number; widths: number[] } {
  const measurements = items.map(item => {
    const title = item.querySelector<HTMLElement>('.career-option-title');
    const probe = document.createElement('span');
    probe.className = 'career-option-title';
    probe.textContent = title?.textContent ?? '';
    probe.setAttribute('aria-hidden', 'true');
    Object.assign(probe.style, { position: 'fixed', inset: '0 auto auto 0', inlineSize: 'max-content', whiteSpace: 'pre', visibility: 'hidden', pointerEvents: 'none' });
    const style = getComputedStyle(item);
    const inset = Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight) + Number.parseFloat(style.borderLeftWidth) + Number.parseFloat(style.borderRightWidth);
    return { probe, inset };
  });
  viewport.append(...measurements.map(({ probe }) => probe));
  const preferred = measurements.map(({ probe, inset }) => Math.ceil(probe.getBoundingClientRect().width + inset));
  measurements.forEach(({ probe }) => probe.remove());
  let slots = maximumSlots;
  const fits = (count: number) => {
    const equal = (availableWidth - gap * (count - 1)) / count;
    const minimum = Math.min(equal, Math.max(minimumWidth, (availableWidth + gap) / (count + 1) - gap + 1));
    for (let start = 0; start < preferred.length; start += count) {
      const group = preferred.slice(start, start + count);
      if (group.reduce((total, width) => total + Math.max(minimum, width), 0) > equal * group.length) return false;
    }
    return true;
  };
  while (slots > 1 && !fits(slots)) slots--;
  const equalWidth = (availableWidth - gap * (slots - 1)) / slots;
  const minimum = Math.max(minimumWidth, (availableWidth + gap) / (slots + 1) - gap + 1);
  const widths: number[] = [];
  for (let start = 0; start < preferred.length; start += slots) widths.push(...distributeProfileWidths(equalWidth, preferred.slice(start, start + slots), minimum));
  return { slots, widths: roundProfileWidths(widths) };
}
