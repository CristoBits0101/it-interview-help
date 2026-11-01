import { getStorageConsent, setStorageConsent } from '../lib/preferences';
import { applyStaticTranslations, getSavedLanguage } from './i18n';
import { translate } from '../lib/translations';

export function initializeStorageConsent(): Promise<void> {
  const dialog = document.querySelector<HTMLDialogElement>('#storage-consent-dialog')!;
  const toggle = document.querySelector<HTMLInputElement>('#storage-save-toggle');
  const status = document.querySelector<HTMLElement>('#storage-saving-status');
  const clearLegacyHistory = () => {
    if (getStorageConsent() !== 'rejected') return;
    try {
      if (history.state && typeof history.state === 'object' && !Array.isArray(history.state)) {
        const { preferencesReturn: _previous, ...state } = history.state;
        history.replaceState(state, '', location.href);
      }
    } catch {}
  };
  const sync = () => { if (toggle) { toggle.checked = getStorageConsent() === 'accepted'; toggle.disabled = false; } };
  const decide = (accepted: boolean, initial = false) => {
    const saved = setStorageConsent(accepted ? 'accepted' : 'rejected', initial);
    sync();
    clearLegacyHistory();
    const message = saved ? '' : translate('No se pudo actualizar el almacenamiento del navegador. Los cambios se mantienen en memoria. La decisión o los datos anteriores podrían seguir guardados.', document.documentElement.lang === 'es' ? 'es' : 'en');
    if (status) {
      status.hidden = saved;
      status.textContent = message;
    }
    if (initial && !saved) {
      const toast = document.getElementById('toast')!;
      toast.textContent = message;
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 10000);
    }
  };
  toggle?.addEventListener('change', () => decide(toggle.checked));
  window.addEventListener('storage', () => { sync(); clearLegacyHistory(); });
  window.addEventListener('pageshow', () => { sync(); clearLegacyHistory(); });
  sync();
  clearLegacyHistory();
  if (getStorageConsent() !== null) return Promise.resolve();
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  return new Promise(resolve => {
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey) return;
      const first = document.getElementById('storage-consent-accept')!;
      const last = document.getElementById('storage-consent-reject')!;
      if (event.shiftKey && document.activeElement === first || !event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    });
    dialog.addEventListener('close', () => {
      resolve();
      requestAnimationFrame(() => {
        const target = previousFocus && previousFocus !== document.body ? previousFocus : document.getElementById('main');
        target?.focus({ preventScroll: true });
      });
    }, { once: true });
    document.getElementById('storage-consent-accept')!.addEventListener('click', () => { decide(true, true); dialog.close(); });
    document.getElementById('storage-consent-reject')!.addEventListener('click', () => { decide(false, true); dialog.close(); });
    applyStaticTranslations(getSavedLanguage());
    dialog.showModal();
  });
}
