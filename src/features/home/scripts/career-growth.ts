export function initializeCareerGrowth() {
  const container = document.getElementById('career-growth');
  const links = Array.from(container?.querySelectorAll<HTMLAnchorElement>('[data-career-growth]') ?? []);
  const update = (profileId: string) => {
    links.forEach(link => {
      const item = link.closest<HTMLElement>('[data-growth-option]');
      if (item) item.hidden = !link.dataset.growthProfiles?.split(' ').includes(profileId);
    });
    container?.querySelectorAll<HTMLElement>('[data-growth-group]').forEach(group => {
      group.hidden = !Array.from(group.querySelectorAll<HTMLElement>('[data-growth-option]')).some(option => !option.hidden);
    });
  };
  return { update };
}
