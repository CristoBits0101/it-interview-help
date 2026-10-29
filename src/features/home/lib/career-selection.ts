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

export interface CareerSelectionState {
  directionId: string | null;
  profileId: string | null;
}

export function toggleCareerSelection(
  directions: readonly DirectionOption[],
  profileIds: readonly string[],
  current: CareerSelectionState,
  next: { kind: 'direction' | 'profile'; id: string },
): CareerSelectionState {
  if (next.kind === 'direction') {
    if (current.directionId === next.id) return { directionId: null, profileId: null };
    if (!directions.some(direction => direction.id === next.id)) return current;
    return resolveCareerSelection(directions, profileIds, { directionId: next.id, profileId: current.profileId ?? undefined }) ?? current;
  }
  const direction = directions.find(item => item.id === current.directionId);
  if (!direction?.profileIds.includes(next.id) || !profileIds.includes(next.id)) return current;
  return { directionId: direction.id, profileId: current.profileId === next.id ? null : next.id };
}

export function restoreCareerSelectionState(
  directions: readonly DirectionOption[],
  profileIds: readonly string[],
  value: unknown,
  fallback: CareerSelectionState,
): CareerSelectionState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fallback;
  const stored = value as Record<string, unknown>;
  if (!('directionId' in stored) || !('profileId' in stored)) return fallback;
  const direction = directions.find(item => item.id === stored.directionId);
  if (!direction) return { directionId: null, profileId: null };
  const profileId = typeof stored.profileId === 'string' && direction.profileIds.includes(stored.profileId) && profileIds.includes(stored.profileId) ? stored.profileId : null;
  return { directionId: direction.id, profileId };
}
