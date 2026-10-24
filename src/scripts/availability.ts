import { translate } from './i18n';

type AvailabilityMode = 'production' | 'development';
const availabilityStorageKey = 'tech-training:availability:v1';

export function initializeAvailability() {
  const control = document.querySelector<HTMLButtonElement>('#availability-switch');
  if (!control) return;
  const entries = Array.from(document.querySelectorAll<HTMLElement>('[data-catalog-published]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-career-panel]'));
  let mode: AvailabilityMode = 'development';
  try {
    if (localStorage.getItem(availabilityStorageKey) === 'production') mode = 'production';
  } catch {}

  const refresh = () => {
    const development = mode === 'development';
    const language = document.documentElement.lang === 'en' ? 'en' : 'es';
    control.setAttribute('aria-checked', String(development));
    control.title = translate(development ? 'Desarrollo. Mostrar todas las áreas.' : 'Producción. Mostrar solo contenido publicado.', language);
    entries.forEach(entry => { entry.hidden = !development && entry.dataset.catalogPublished !== 'true'; });
    document.querySelectorAll<HTMLElement>('[data-home-total]').forEach(stat => {
      stat.textContent = (development ? stat.dataset.homeTotal : stat.dataset.homePublished) ?? '';
    });
    panels.forEach(panel => {
      const visibleCards = Array.from(panel.querySelectorAll<HTMLElement>('.career-area-card')).filter(card => !card.hidden);
      visibleCards.forEach((card, index) => {
        const number = card.querySelector('.career-area-number');
        if (number) number.textContent = String(index + 1).padStart(2, '0');
      });
      const count = panel.querySelector<HTMLElement>('[data-stage-area-count]');
      if (count) {
        count.dataset.stageAreaCount = String(visibleCards.length);
        count.textContent = language === 'en'
          ? visibleCards.length + (visibleCards.length === 1 ? ' area' : ' areas') + ' at this stage'
          : visibleCards.length + (visibleCards.length === 1 ? ' área en esta etapa' : ' áreas en esta etapa');
      }
      const grid = panel.querySelector<HTMLElement>('.career-area-grid');
      const empty = panel.querySelector<HTMLElement>('[data-career-empty]');
      if (grid) grid.hidden = visibleCards.length === 0;
      if (empty) empty.hidden = visibleCards.length !== 0;
    });
    window.dispatchEvent(new Event('catalog-availability-change'));
  };

  const select = (next: AvailabilityMode) => {
    mode = next;
    try { localStorage.setItem(availabilityStorageKey, mode); } catch {}
    refresh();
  };
  control.addEventListener('click', () => select(mode === 'development' ? 'production' : 'development'));
  control.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'Home') {
      event.preventDefault();
      select('production');
    } else if (event.key === 'ArrowRight' || event.key === 'End') {
      event.preventDefault();
      select('development');
    }
  });
  refresh();
  return refresh;
}
