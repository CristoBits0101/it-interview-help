import { translate, type Language } from './i18n';

export function initializeImplementationGuides(library: HTMLElement, getLanguage: () => Language) {
  const showStep = (dialog: HTMLDialogElement, index: number) => {
    const steps = [...dialog.querySelectorAll<HTMLElement>('[data-guide-step]')];
    const current = Math.max(0, Math.min(index, steps.length - 1));
    dialog.dataset.currentStep = String(current);
    steps.forEach((step, position) => { step.hidden = position !== current; });
    dialog.querySelectorAll<HTMLElement>('[data-guide-heading]').forEach((heading, position) => { heading.hidden = position !== current; });
    dialog.querySelectorAll<HTMLElement>('[data-guide-why]').forEach((description, position) => { description.hidden = position !== current; });
    dialog.querySelectorAll<HTMLButtonElement>('[data-guide-go]').forEach((button, position) => {
      if (position === current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    dialog.querySelector<HTMLButtonElement>('[data-guide-previous]')!.disabled = current === 0;
    dialog.querySelector<HTMLButtonElement>('[data-guide-next]')!.disabled = current === steps.length - 1;
    dialog.querySelector<HTMLElement>('.implementation-body')!.scrollTop = 0;
  };

  library.addEventListener('click', async event => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!button || button.disabled) return;
    if (button.dataset.guideOpen) {
      const dialog = document.getElementById(button.dataset.guideOpen) as HTMLDialogElement;
      showStep(dialog, Number(dialog.dataset.currentStep ?? 0));
      dialog.showModal();
      dialog.querySelector<HTMLElement>('h2')!.focus({ preventScroll: true });
      return;
    }

    const dialog = button.closest<HTMLDialogElement>('[data-implementation]');
    if (!dialog) return;
    const current = Number(dialog.dataset.currentStep ?? 0);
    if (button.hasAttribute('data-guide-go') || button.hasAttribute('data-guide-previous') || button.hasAttribute('data-guide-next')) {
      const next = button.dataset.guideGo !== undefined ? Number(button.dataset.guideGo) : current + (button.hasAttribute('data-guide-next') ? 1 : -1);
      showStep(dialog, next);
      if (button.disabled) dialog.querySelector<HTMLButtonElement>('[data-guide-go][aria-current="step"]')!.focus({ preventScroll: true });
    }
    if (button.hasAttribute('data-guide-copy')) {
      const status = dialog.querySelector<HTMLElement>('[data-copy-status]')!;
      try {
        await navigator.clipboard.writeText(dialog.querySelector<HTMLElement>('[data-guide-code]')!.textContent!);
        status.textContent = translate('Código copiado.', getLanguage());
        document.dispatchEvent(new CustomEvent('interaction-feedback', { detail: 'navigate' }));
      } catch {
        status.textContent = translate('Selecciona el código para copiarlo.', getLanguage());
      }
    }
  });
}
