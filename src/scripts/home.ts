import { preferenceKeys, readJsonPreference, restoreCareerStage, writePreference } from '../lib/preferences';
import { translate } from './i18n';

export function initializeCareerPaths() {
  const profiles = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-career-profile]'));
  const stages = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-career-stage]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-career-panel]'));
  const panelContainer = document.getElementById('career-panels');
  if (!profiles.length || !stages.length) return;

  let profileId = profiles[0].dataset.careerProfile!;
  const validStageIds = new Set(stages.map(button => button.dataset.careerStage!));
  let stageId = restoreCareerStage(readJsonPreference(preferenceKeys.careerStage), validStageIds, stages[0].dataset.careerStage!);
  const update = () => {
    profiles.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerProfile === profileId)));
    stages.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerStage === stageId)));
    panels.forEach(panel => { panel.hidden = panel.dataset.careerPanel !== profileId || panel.dataset.stage !== stageId; });
    if (panelContainer) panelContainer.hidden = stageId === null;
    const profile = profiles.find(button => button.dataset.careerProfile === profileId)!;
    const stage = stages.find(button => button.dataset.careerStage === stageId);
    const status = document.getElementById('career-selection-status');
    const stageStatus = stage?.getAttribute('aria-label') ?? translate('Panel de etapa cerrado.', document.documentElement.lang === 'en' ? 'en' : 'es');
    if (status) status.textContent = `${profile.getAttribute('aria-label')} · ${stageStatus}`;
  };
  profiles.forEach(button => button.addEventListener('click', () => { profileId = button.dataset.careerProfile!; update(); }));
  stages.forEach(button => button.addEventListener('click', () => {
    stageId = stageId === button.dataset.careerStage ? null : button.dataset.careerStage!;
    writePreference(preferenceKeys.careerStage, JSON.stringify(stageId));
    update();
  }));
  return update;
}
