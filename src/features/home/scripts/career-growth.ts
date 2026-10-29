import type { CareerScope, GrowthOption } from '../lib/career-scope';

export function initializeCareerGrowth(onSelect: (id: string) => void) {
  const container = document.getElementById('career-growth');
  const buttons = Array.from(container?.querySelectorAll<HTMLButtonElement>('[data-career-growth]') ?? []);
  const options: GrowthOption[] = buttons.map(button => ({
    id: button.dataset.careerGrowth!,
    profileIds: button.dataset.growthProfiles?.split(' ') ?? [],
  }));
  const preparation = document.getElementById('growth-preparation');
  const title = document.getElementById('growth-preparation-title');
  const profileLabel = container?.querySelector<HTMLElement>('[data-growth-profile-label]');
  const goal = container?.querySelector<HTMLElement>('[data-growth-selected-goal]');
  const practice = container?.querySelector<HTMLElement>('[data-growth-selected-practice]');
  const foundations = container?.querySelector<HTMLElement>('[data-growth-foundations]');
  const copies = Array.from(container?.querySelectorAll<HTMLElement>('[data-growth-copy]') ?? []);
  buttons.forEach(button => button.addEventListener('click', () => onSelect(button.dataset.careerGrowth!)));

  const update = (scope: CareerScope, profileId: string, label: string, basePanel?: HTMLElement) => {
    buttons.forEach((button, index) => {
      const item = button.closest<HTMLElement>('[data-growth-option]');
      if (item) item.hidden = !options[index].profileIds.includes(profileId);
      button.setAttribute('aria-pressed', String(scope?.kind === 'growth' && scope.id === options[index].id));
    });
    container?.querySelectorAll<HTMLElement>('[data-growth-group]').forEach(group => {
      group.hidden = !Array.from(group.querySelectorAll<HTMLElement>('[data-growth-option]')).some(option => !option.hidden);
    });
    const active = scope?.kind === 'growth' ? buttons.find(button => button.dataset.careerGrowth === scope.id) : undefined;
    if (preparation) preparation.hidden = true;
    if (!active) {
      foundations?.replaceChildren();
      return undefined;
    }
    const targetLabel = active.getAttribute('aria-label') ?? '';
    const copy = copies.find(item => item.dataset.growthCopy === scope?.id);
    if (title) title.textContent = targetLabel;
    if (profileLabel) profileLabel.textContent = label;
    if (goal) goal.textContent = copy?.querySelector('[data-growth-goal]')?.textContent ?? '';
    if (practice) practice.textContent = copy?.querySelector('[data-growth-practice]')?.textContent ?? '';
    const grid = basePanel?.querySelector('.career-area-grid');
    foundations?.replaceChildren(...(grid ? [grid.cloneNode(true)] : []));
    return targetLabel;
  };

  return { options, update };
}
