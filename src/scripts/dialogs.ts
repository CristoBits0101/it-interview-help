import { $, $$ } from './dom';
export function initializeDialogs() {
$$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest<HTMLDialogElement>('dialog')!.close()));
$$<HTMLDialogElement>('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }));
document.querySelector('#open-sources')?.addEventListener('click', () => $<HTMLDialogElement>('#sources-dialog').showModal());

}
