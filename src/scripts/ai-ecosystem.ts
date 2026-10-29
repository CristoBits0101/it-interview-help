import { sourceDescription, type Language } from '../lib/translations';

export function initializeAiEcosystem() {
  const controls = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-ai-category]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-ai-tool]'));
  const status = document.querySelector<HTMLElement>('#ai-tools-status');
  let selection = 'all';
  const refresh = (announce = false) => {
    const language = document.documentElement.lang as Language;
    let count = 0;
    for (const card of cards) {
      card.hidden = selection !== 'all' && !card.dataset.aiCategories?.split(' ').includes(selection);
      if (!card.hidden) count++;
    }
    controls.forEach(control => control.setAttribute('aria-pressed', String(control.dataset.aiCategory === selection)));
    document.querySelectorAll<HTMLAnchorElement>('[data-ai-source]').forEach(link => {
      const name = link.dataset.aiSource!;
      link.setAttribute('aria-label', sourceDescription(name, name, name, language));
    });
    if (announce && status) status.textContent = language === 'es' ? `${count} herramientas visibles.` : `${count} tools visible.`;
  };
  controls.forEach(control => control.addEventListener('click', () => { selection = control.dataset.aiCategory!; refresh(true); }));
  refresh();
  return () => refresh(Boolean(status?.textContent));
}
