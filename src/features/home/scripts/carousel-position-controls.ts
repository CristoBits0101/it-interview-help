import { translate, type Language } from '../../../shared/lib/translations';
import { getCarouselPage } from '../lib/horizontal-carousel';

export function initializeCarouselPositions(controls: HTMLElement, viewportId: string, navigate: (index: number) => void, signal: AbortSignal) {
  const list = controls.querySelector<HTMLElement>('[data-carousel-position-list]');
  if (!list) throw new Error('Missing carousel position list');
  let items: HTMLElement[] = [];
  let buttons: HTMLButtonElement[] = [];
  let language: Language = 'en';

  controls.addEventListener('click', event => {
    const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>('[data-carousel-position]') : null;
    const index = button ? buttons.indexOf(button) : -1;
    if (index >= 0) navigate(index);
  }, { signal });

  return {
    refresh(nextItems: HTMLElement[]) {
      items = nextItems;
      language = document.documentElement.lang === 'es' ? 'es' : 'en';
      controls.setAttribute('aria-label', translate('Navegación de puestos', language));
      const { pages } = getCarouselPage(items.length, 0);
      if (buttons.length !== pages) {
        buttons = Array.from({ length: pages }, (_, index) => {
          const button = document.createElement('button');
          const number = document.createElement('span');
          button.type = 'button';
          button.dataset.carouselPosition = String(index);
          number.textContent = String(index + 1);
          button.append(number);
          button.setAttribute('aria-controls', viewportId);
          return button;
        });
        list.replaceChildren(...buttons);
      }
    },
    update(currentPage: number) {
      buttons.forEach((button, index) => {
        const page = getCarouselPage(items.length, index);
        const range = `${page.start + 1}–${page.end}`;
        button.setAttribute('aria-label', `${translate('Mostrar página', language)} ${index + 1}: ${translate('Puestos', language)} ${range}`);
        if (index === currentPage) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });
    },
  };
}
