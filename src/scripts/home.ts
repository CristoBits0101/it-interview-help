import { preferenceKeys, readJsonPreference, readSessionJsonPreference, writeSessionPreference, restoreCareerStage, writePreference } from '../lib/preferences';
import { resolveCareerSelection, restoreCareerSelectionState, toggleCareerSelection, type CareerSelectionState } from '../lib/career-selection';
import { reconcileCareerScope, toggleCareerScope, type CareerScope } from '../lib/career-scope';
import { initializeCareerGrowth } from './career-growth';
import { initializeHorizontalCarousels } from './horizontal-carousel';

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
  let selection: CareerSelectionState = resolveCareerSelection(directionOptions, profileIds, {
    profileId: profiles.find(button => button.getAttribute('aria-pressed') === 'true')?.dataset.careerProfile,
  })!;
  selection = restoreCareerSelectionState(directionOptions, profileIds, readSessionJsonPreference(preferenceKeys.careerStage), selection);
  const validStageIds = new Set(stages.map(button => button.dataset.careerStage!));
  const savedStageId = restoreCareerStage(readJsonPreference(preferenceKeys.careerStage), validStageIds, stages[0].dataset.careerStage!);
  let scope: CareerScope = savedStageId === null ? null : { kind: 'stage', id: savedStageId };
  let noticeKind: 'stage' | 'growth' | null = null;
  const carousels = initializeHorizontalCarousels(container);
  const growth = initializeCareerGrowth(id => {
    scope = toggleCareerScope(scope, { kind: 'growth', id });
    noticeKind = 'growth';
    writePreference(preferenceKeys.careerStage, JSON.stringify(null));
    update();
  });

  const update = () => {
    writeSessionPreference(preferenceKeys.careerStage, JSON.stringify(selection));
    if (!selection.profileId) {
      scope = null;
      writePreference(preferenceKeys.careerStage, JSON.stringify(null));
    }
    scope = reconcileCareerScope(scope, selection.profileId ?? '', growth.options);
    const profileCarousel = document.getElementById('career-profile-options')?.closest<HTMLElement>('.career-choice-group');
    if (profileCarousel) profileCarousel.hidden = !selection.directionId;
    const stageSection = container.querySelector<HTMLElement>('.career-stage-section');
    if (stageSection) stageSection.hidden = !selection.profileId;
    const growthSection = document.getElementById('career-growth');
    if (growthSection) growthSection.hidden = !selection.profileId;
    const growthSeparator = growthSection?.previousElementSibling;
    if (growthSeparator instanceof HTMLHRElement) growthSeparator.hidden = !selection.profileId;
    const stageId = scope?.kind === 'stage' ? scope.id : null;
    directions.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerDirection === selection.directionId)));
    profiles.forEach(button => {
      button.hidden = button.dataset.profileDirection !== selection.directionId;
      button.setAttribute('aria-pressed', String(button.dataset.careerProfile === selection.profileId));
    });
    stages.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerStage === stageId)));
    panels.forEach(panel => { panel.hidden = panel.dataset.careerPanel !== selection.profileId || panel.dataset.stage !== stageId; });
    if (panelContainer) panelContainer.hidden = !selection.profileId || !stageId;
    document.querySelectorAll<HTMLElement>('[data-career-notice]').forEach(notice => {
      notice.hidden = notice.dataset.careerNotice === 'stage' || notice.dataset.careerNotice !== noticeKind || scope?.kind !== noticeKind;
    });
    const profile = profiles.find(button => button.dataset.careerProfile === selection.profileId);
    growth.update(scope, selection.profileId ?? '', profile?.getAttribute('aria-label') ?? '', panels.find(panel => panel.dataset.careerPanel === selection.profileId && panel.dataset.stage === 'senior'));
    carousels.refresh();
  };
  directions.forEach(button => button.addEventListener('click', () => {
    noticeKind = null;
    const previousDirection = selection.directionId;
    selection = toggleCareerSelection(directionOptions, profileIds, selection, { kind: 'direction', id: button.dataset.careerDirection! });
    update();
    if (previousDirection !== selection.directionId) document.getElementById('career-profile-options')?.scrollTo({ left: 0, behavior: 'auto' });
  }));
  profiles.forEach(button => button.addEventListener('click', () => {
    noticeKind = null;
    selection = toggleCareerSelection(directionOptions, profileIds, selection, { kind: 'profile', id: button.dataset.careerProfile! });
    update();
  }));
  stages.forEach(button => button.addEventListener('click', () => {
    scope = toggleCareerScope(scope, { kind: 'stage', id: button.dataset.careerStage! });
    noticeKind = 'stage';
    writePreference(preferenceKeys.careerStage, JSON.stringify(scope?.id ?? null));
    update();
  }));
  return update;
}
