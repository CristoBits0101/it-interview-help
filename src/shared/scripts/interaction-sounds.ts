import { readJsonPreference, writePreference } from '../lib/preferences';
import { restoreSoundPreference, soundPreferenceKey, soundForChange, type InteractionState } from '../lib/interaction-sound';
import { translate } from './i18n';
import { createSoundPlayer } from './sound-player';

export function initializeInteractionSounds() {
  const toggle = document.querySelector<HTMLButtonElement>('#sound-toggle');
  const slider = document.querySelector<HTMLInputElement>('#sound-volume');
  const output = document.querySelector<HTMLOutputElement>('#sound-volume-value');
  const settings = document.querySelector<HTMLDetailsElement>('#sound-settings');
  const status = document.querySelector<HTMLElement>('#sound-status');
  if (!toggle || !slider || !output || !settings || !status) return;
  let preference = restoreSoundPreference(readJsonPreference(soundPreferenceKey));
  let unlocked = false;
  let scrollIntent = -Infinity;
  let suppressScrollUntil = 0;
  const language = () => document.documentElement.lang === 'es' ? 'es' : 'en';
  const persist = () => writePreference(soundPreferenceKey, JSON.stringify(preference));
  const render = () => {
    toggle.setAttribute('aria-pressed', String(preference.enabled));
    const label = translate(preference.enabled ? 'Desactivar sonidos' : 'Activar sonidos', language());
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    toggle.querySelectorAll<HTMLElement>('[data-sound-icon]').forEach(icon => {
      icon.hidden = icon.dataset.soundIcon !== (preference.enabled && preference.volume > 0 ? 'on' : 'off');
    });
    slider.value = String(preference.volume);
    output.value = `${preference.volume}%`;
  };
  const player = createSoundPlayer(() => {
    preference.enabled = false;
    unlocked = false;
    persist();
    render();
    status.textContent = translate('El audio no estÃ¡ disponible. Puedes volver a intentarlo.', language());
    status.hidden = false;
    settings.open = true;
  });
  player.setVolume(preference.volume);
  render();
  const unlock = () => {
    if (!preference.enabled || unlocked) return;
    unlocked = true;
    void player.enable();
  };
  toggle.addEventListener('click', () => {
    preference.enabled = !preference.enabled;
    status.hidden = true;
    persist();
    render();
    if (preference.enabled) {
      unlocked = true;
      void player.enable();
      player.play('select');
    } else { unlocked = false; player.disable(); }
  });
  slider.addEventListener('input', () => {
    preference.volume = Number(slider.value);
    player.setVolume(preference.volume);
    persist();
    render();
  });
  slider.addEventListener('change', () => { unlock(); player.play('navigate'); });
  const snapshot = (control?: Element): InteractionState => {
    const carousel = control?.closest('[data-carousel]');
    const viewport = carousel?.querySelector<HTMLElement>('[data-carousel-viewport]');
    const guide = control?.closest<HTMLElement>('[data-implementation]');
    const review = control?.closest('#review-dialog');
    return {
      pressed: control?.getAttribute('aria-pressed') ?? null,
      expanded: control?.getAttribute('aria-expanded') ?? null,
      disclosure: control?.closest('summary')?.parentElement instanceof HTMLDetailsElement ? (control.closest('summary')!.parentElement as HTMLDetailsElement).open : undefined,
      dialog: document.querySelector('dialog[open]')?.id ?? '',
      drawer: document.getElementById('sidebar')?.classList.contains('mobile-open') ?? false,
      destination: [location.pathname, document.documentElement.lang, guide?.dataset.currentStep,
        carousel?.querySelector('[aria-pressed="true"]')?.textContent,
        viewport?.scrollLeft, carousel?.contains(document.activeElement) ? document.activeElement?.textContent : '', carousel?.querySelector('[data-carousel-position-list] [aria-current]')?.textContent,
        (document.getElementById('search') as HTMLInputElement)?.value,
        document.getElementById('level-current')?.textContent,
        review?.textContent, (review?.querySelector('#review-answer') as HTMLElement | null)?.hidden, window.scrollY].join('|'),
    };
  };
  type Action = { control?: Element; before: InteractionState; navigation?: boolean };
  const actions = new WeakMap<Event, Action>();
  const disclosures = new WeakMap<HTMLDetailsElement, boolean>();
  const closing = new WeakSet<HTMLDialogElement>();
  const begin = (event: Event, control?: Element, navigation = false) => {
    unlock();
    suppressScrollUntil = performance.now() + 250;
    actions.set(event, { control, before: snapshot(control), navigation });
  };
  const finish = (event: Event) => {
    const action = actions.get(event);
    if (!action || !preference.enabled) return;
    const cue = soundForChange(action.before, snapshot(action.control));
    if (cue) {
      player.play(action.navigation ? 'navigate' : cue);
      document.querySelectorAll<HTMLDialogElement>('dialog').forEach(dialog => closing.delete(dialog));
    }
    else if (event.type === 'click' && !event.defaultPrevented && action.control instanceof HTMLAnchorElement && action.control.href && action.control.href !== location.href) player.play('navigate');
  };
  document.addEventListener('click', event => {
    if (!event.isTrusted || !preference.enabled || !(event.target instanceof Element)) return;
    const control = event.target.closest('button, summary, a, #mobile-backdrop, dialog');
    if (!control || control.closest('#sound-toggle, #sound-volume') || control.matches(':disabled, [aria-disabled="true"]')) return;
    begin(event, control);
    if (control instanceof HTMLElement && control.matches('summary') && control.parentElement instanceof HTMLDetailsElement) disclosures.set(control.parentElement, control.parentElement.open);
  }, true);
  document.addEventListener('click', finish);
  document.addEventListener('toggle', event => {
    const target = event.target;
    if (!(target instanceof HTMLDetailsElement) || !disclosures.has(target)) return;
    const before = disclosures.get(target);
    disclosures.delete(target);
    if (preference.enabled && before !== target.open) player.play(target.open ? 'open' : 'close');
  }, true);
  document.addEventListener('keydown', event => {
    if (!event.isTrusted || !preference.enabled) return;
    unlock();
    if (event.key === 'Escape') {
      begin(event, settings.open ? settings.querySelector('summary') ?? undefined : undefined);
      if (settings.open) settings.open = false;
      const dialog = document.querySelector<HTMLDialogElement>('dialog[open]');
      if (dialog) closing.add(dialog);
    }
    if (event.target instanceof Element && event.target.closest('[data-carousel-viewport]') && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) begin(event, event.target, true);
    if (!(event.target instanceof Element && event.target.closest('input, textarea, button, summary, [contenteditable]')) && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
      scrollIntent = performance.now();
      suppressScrollUntil = 0;
    }
  }, true);
  document.addEventListener('keydown', finish);
  document.addEventListener('close', event => {
    if (event.target instanceof HTMLDialogElement && closing.delete(event.target) && preference.enabled) player.play('close');
  }, true);
  let searchValue = (document.getElementById('search') as HTMLInputElement | null)?.value;
  document.getElementById('search')?.addEventListener('input', event => {
    if (!event.isTrusted || !preference.enabled || event instanceof InputEvent && event.isComposing) return;
    const value = (event.target as HTMLInputElement).value;
    if (value === searchValue) return;
    searchValue = value;
    unlock();
    player.play('type');
  });
  const markScrollIntent = (event: Event) => {
    if (!event.isTrusted || !preference.enabled) return;
    unlock();
    scrollIntent = performance.now();
    suppressScrollUntil = 0;
  };
  document.addEventListener('wheel', markScrollIntent, { passive: true, capture: true });
  document.addEventListener('touchmove', markScrollIntent, { passive: true, capture: true });
  document.addEventListener('pointermove', event => { if (event.buttons === 1) markScrollIntent(event); }, { passive: true, capture: true });
  const positions = new WeakMap<Element, [number, number]>();
  document.addEventListener('scroll', event => {
    const target = event.target === document ? document.scrollingElement : event.target;
    if (!(target instanceof Element)) return;
    const position: [number, number] = [target.scrollLeft, target.scrollTop];
    const previous = positions.get(target);
    positions.set(target, position);
    const now = performance.now();
    if (!preference.enabled || now < suppressScrollUntil || now - scrollIntent > 700) return;
    if (previous && Math.abs(position[0] - previous[0]) < 2 && Math.abs(position[1] - previous[1]) < 2) return;
    player.play('scroll');
  }, { passive: true, capture: true });
  document.addEventListener('interaction-feedback', event => {
    if (preference.enabled && event instanceof CustomEvent && event.detail === 'navigate') player.play('navigate');
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { player.disable(); unlocked = false; }
  });
  window.addEventListener('pagehide', () => { player.disable(); unlocked = false; });
}
