export function initializeCareerPaths() {
  const profiles = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-career-profile]'));
  const stages = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-career-stage]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-career-panel]'));
  if (!profiles.length || !stages.length) return;

  let profileId = profiles[0].dataset.careerProfile!;
  let stageId = stages[0].dataset.careerStage!;
  const update = () => {
    profiles.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerProfile === profileId)));
    stages.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerStage === stageId)));
    panels.forEach(panel => { panel.hidden = panel.dataset.careerPanel !== profileId || panel.dataset.stage !== stageId; });
    const profile = profiles.find(button => button.dataset.careerProfile === profileId)!;
    const stage = stages.find(button => button.dataset.careerStage === stageId)!;
    const status = document.getElementById('career-selection-status');
    if (status) status.textContent = `${profile.getAttribute('aria-label')} · ${stage.getAttribute('aria-label')}`;
  };
  profiles.forEach(button => button.addEventListener('click', () => { profileId = button.dataset.careerProfile!; update(); }));
  stages.forEach(button => button.addEventListener('click', () => { stageId = button.dataset.careerStage!; update(); }));
}
