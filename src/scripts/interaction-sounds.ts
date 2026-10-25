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
  let activation = 0;
  let scrollIntent = -Infinity;
  let suppressScrollUntil = 0;
  let nextScrollCheck = 0;
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
    status.textContent = translate('El audio no está disponible. Puedes volver a intentarlo.', language());
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
    const currentActivation = ++activation;
    const activatedAt = performance.now();
    status.hidden = true;
    persist();
    render();
    if (preference.enabled) {
      unlocked = true;
      void player.enable().then(() => { if (preference.enabled && activation === currentActivation && performance.now() - activatedAt < 250) player.play('select'); });
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
      destination: [location.hash, document.documentElement.lang, guide?.dataset.currentStep,
        carousel?.querySelector('[aria-pressed="true"]')?.textContent,
        viewport?.scrollLeft, carousel?.querySelector('[data-carousel-position-list] [aria-current]')?.textContent,
        (document.getElementById('search') as HTMLInputElement)?.value,
        document.getElementById('level-current')?.textContent,
        review?.textContent, (review?.querySelector('#review-answer') as HTMLElement | null)?.hidden, window.scrollY].join('|'),
    };
  };
  const compareAfterAction = (control?: Element, navigation = false) => {
    const before = snapshot(control);
    setTimeout(() => {
      if (!preference.enabled) return;
      const cue = soundForChange(before, snapshot(control));
      if (cue) player.play(navigation ? 'navigate' : cue);
    }, 0);
  };
  document.addEventListener('click', event => {
    if (!event.isTrusted || !preference.enabled || !(event.target instanceof Element)) return;
    const control = event.target.closest('button, summary, a, #mobile-backdrop, dialog');
    if (!control || control.closest('#sound-toggle, #sound-volume') || control.matches(':disabled, [aria-disabled="true"]')) return;
    unlock();
    suppressScrollUntil = performance.now() + 600;
    compareAfterAction(control);
  }, true);
  document.addEventListener('keydown', event => {
    if (!event.isTrusted || !preference.enabled) return;
    unlock();
    if (event.key === 'Escape') {
      compareAfterAction(settings.open ? settings.querySelector('summary') ?? undefined : undefined);
      if (settings.open) settings.open = false;
    }
    if (event.target instanceof Element && event.target.closest('[data-carousel-viewport]') && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      suppressScrollUntil = performance.now() + 600;
      compareAfterAction(event.target, true);
    }
    if (!(event.target instanceof Element && event.target.closest('input, textarea, button, summary, [contenteditable]')) && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) scrollIntent = performance.now();
  }, true);
  document.getElementById('search')?.addEventListener('input', event => {
    if (!event.isTrusted || !preference.enabled || event instanceof InputEvent && event.isComposing) return;
    unlock();
    player.play('type');
  });
  const markScrollIntent = (event: Event) => {
    if (event.isTrusted && preference.enabled) scrollIntent = performance.now();
  };
  document.addEventListener('wheel', markScrollIntent, { passive: true, capture: true });
  document.addEventListener('touchmove', markScrollIntent, { passive: true, capture: true });
  const positions = new WeakMap<object, number>();
  document.addEventListener('scroll', event => {
    if (!preference.enabled) return;
    const now = performance.now();
    if (now < nextScrollCheck || now < suppressScrollUntil || now - scrollIntent > 250) return;
    nextScrollCheck = now + 100;
    const target = event.target === document ? document.scrollingElement : event.target;
    if (!(target instanceof Element)) return;
    const position = target.scrollTop + target.scrollLeft;
    const previous = positions.get(target) ?? 0;
    if (Math.abs(position - previous) < 60) return;
    positions.set(target, position);
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
