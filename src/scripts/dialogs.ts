import { $, $$ } from './dom';
export function initializeDialogs() {
  document.querySelectorAll<HTMLDialogElement>('[data-learning-guide]').forEach(dialog => {
    let trigger: HTMLElement | null = null;
    document.querySelectorAll<HTMLButtonElement>('[data-open-guide]').forEach(button => {
      if (button.dataset.openGuide !== dialog.id) return;
      button.addEventListener('click', () => { trigger = button; dialog.showModal(); });
    });
    dialog.addEventListener('close', () => trigger?.focus({ preventScroll: true }));
  });
$$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest<HTMLDialogElement>('dialog')!.close()));
$$<HTMLDialogElement>('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }));
document.querySelector('#open-sources')?.addEventListener('click', () => $<HTMLDialogElement>('#sources-dialog').showModal());

}
