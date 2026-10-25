import { preferenceKeys, readJsonPreference, restoreCareerStage, writePreference } from '../lib/preferences';
import { resolveCareerSelection } from '../lib/career-selection';
import { reconcileCareerScope, toggleCareerScope, type CareerScope } from '../lib/career-scope';
import { initializeCareerGrowth } from './career-growth';
import { initializeHorizontalCarousels } from './horizontal-carousel';
import { translate } from './i18n';

export function initializeCareerPaths() {
  const container = document.getElementById('career-paths');
  if (!container) return;
  const directions = Array.from(container.querySelectorAll<HTMLButtonElement>('[data-career-direction]'));
  const profiles = Array.from(container.querySelectorAll<HTMLButtonElement>('[data-career-profile]'));
  const stages = Array.from(container.querySelectorAll<HTMLButtonElement>('[data-career-stage]'));
  const panels = Array.from(container.querySelectorAll<HTMLElement>('[data-career-panel]'));
  const panelContainer = document.getElementById('career-panels');
  if (!profiles.length || !stages.length || !directions.length) return;

  const profileIds = profiles.map(button => button.dataset.careerProfile!);
  const directionOptions = directions.map(button => ({
    id: button.dataset.careerDirection!,
    profileIds: profiles.filter(profile => profile.dataset.profileDirection === button.dataset.careerDirection).map(profile => profile.dataset.careerProfile!),
  }));
  let selection = resolveCareerSelection(directionOptions, profileIds, {
    profileId: profiles.find(button => button.getAttribute('aria-pressed') === 'true')?.dataset.careerProfile,
  })!;
  const validStageIds = new Set(stages.map(button => button.dataset.careerStage!));
  const savedStageId = restoreCareerStage(readJsonPreference(preferenceKeys.careerStage), validStageIds, stages[0].dataset.careerStage!);
  let scope: CareerScope = savedStageId === null ? null : { kind: 'stage', id: savedStageId };
  const carousels = initializeHorizontalCarousels(container);
  const growth = initializeCareerGrowth(id => {
    scope = toggleCareerScope(scope, { kind: 'growth', id });
    writePreference(preferenceKeys.careerStage, JSON.stringify(null));
    update();
  });

  const update = () => {
    const previousScope = scope;
    scope = reconcileCareerScope(scope, selection.profileId, growth.options);
    const stageId = scope?.kind === 'stage' ? scope.id : null;
    directions.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerDirection === selection.directionId)));
    profiles.forEach(button => {
      button.hidden = button.dataset.profileDirection !== selection.directionId;
      button.setAttribute('aria-pressed', String(button.dataset.careerProfile === selection.profileId));
    });
    stages.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerStage === stageId)));
    panels.forEach(panel => { panel.hidden = panel.dataset.careerPanel !== selection.profileId || panel.dataset.stage !== stageId; });
    if (panelContainer) panelContainer.hidden = stageId === null;
    const direction = directions.find(button => button.dataset.careerDirection === selection.directionId)!;
    const profile = profiles.find(button => button.dataset.careerProfile === selection.profileId)!;
    const stage = stages.find(button => button.dataset.careerStage === stageId);
    const growthLabel = growth.update(scope, selection.profileId, profile.getAttribute('aria-label') ?? '', panels.find(panel => panel.dataset.careerPanel === selection.profileId && panel.dataset.stage === 'senior'));
    const status = document.getElementById('career-selection-status');
    const stageStatus = growthLabel ?? stage?.getAttribute('aria-label') ?? translate(previousScope?.kind === 'growth' && !scope ? 'Este objetivo no corresponde al nuevo puesto. Selecciona otra opción.' : 'Selecciona una etapa o un objetivo para ver su preparación.', document.documentElement.lang === 'en' ? 'en' : 'es');
    if (status) status.textContent = `${direction.textContent} · ${profile.getAttribute('aria-label')} · ${stageStatus}`;
    carousels.refresh();
  };
  directions.forEach(button => button.addEventListener('click', () => {
    const previousDirection = selection.directionId;
    selection = resolveCareerSelection(directionOptions, profileIds, {
      ...selection,
      directionId: button.dataset.careerDirection!,
    })!;
    update();
    if (previousDirection !== selection.directionId) document.getElementById('career-profile-options')?.scrollTo({ left: 0, behavior: 'auto' });
  }));
  profiles.forEach(button => button.addEventListener('click', () => {
    selection = resolveCareerSelection(directionOptions, profileIds, {
      directionId: button.dataset.profileDirection!,
      profileId: button.dataset.careerProfile!,
    })!;
    update();
  }));
  stages.forEach(button => button.addEventListener('click', () => {
    scope = toggleCareerScope(scope, { kind: 'stage', id: button.dataset.careerStage! });
    writePreference(preferenceKeys.careerStage, JSON.stringify(scope?.id ?? null));
    update();
  }));
  return update;
}
