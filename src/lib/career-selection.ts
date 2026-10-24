interface DirectionOption {
  id: string;
  profileIds: readonly string[];
}

export interface CareerSelection {
  directionId: string;
  profileId: string;
}

export function resolveCareerSelection(
  directions: readonly DirectionOption[],
  profileIds: readonly string[],
  requested: Partial<CareerSelection> = {},
): CareerSelection | null {
  const knownProfiles = new Set(profileIds);
  const available = directions.filter(direction => direction.profileIds.some(id => knownProfiles.has(id)));
  const direction = available.find(item => item.id === requested.directionId)
    ?? available.find(item => requested.profileId && item.profileIds.includes(requested.profileId))
    ?? available[0];
  if (!direction) return null;
  const profiles = direction.profileIds.filter(id => knownProfiles.has(id));
  const profileId = requested.profileId && profiles.includes(requested.profileId) ? requested.profileId : profiles[0];
  return { directionId: direction.id, profileId };
}
