export function initializeStudyCards(library: HTMLElement, onToggleLearned: (id: string) => void) {
library.addEventListener('click', event => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
  if (!button) return;
  if (button.dataset.guideOpen) return;
  if (button.dataset.cardView) {
    if (button.disabled) return;
    const deselect = button.getAttribute('aria-pressed') === 'true';
    const card = button.closest<HTMLElement>('.concept-card')!;
    const panel = card.querySelector<HTMLElement>(`[data-card-panel="${button.dataset.cardView}"]`);
    if (!panel?.textContent?.trim()) return;
    card.querySelectorAll<HTMLButtonElement>('[data-card-view]:not([data-guide-open])').forEach(viewButton => {
      viewButton.setAttribute('aria-pressed', String(!deselect && viewButton === button));
    });
    card.querySelectorAll<HTMLElement>('[data-card-panel]').forEach(viewPanel => {
      viewPanel.hidden = deselect || viewPanel !== panel;
    });
    return;
  }
  const learnId = button.dataset.learn;
  if (learnId) onToggleLearned(learnId);
});
}
