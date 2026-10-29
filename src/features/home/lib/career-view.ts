import { resolveCareerSelection, type CareerSelection, type CareerSelectionState } from './career-selection';

export interface CareerView extends CareerSelection { stageId: string }
type Directions = Parameters<typeof resolveCareerSelection>[0];

export function restoreCareerView(directions: Directions, profileIds: readonly string[], stageIds: ReadonlySet<string>, value: unknown, fallback: CareerView): CareerView {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fallback;
  const view = (value as Record<string, unknown>).view;
  if (!view || typeof view !== 'object' || Array.isArray(view)) return fallback;
  const stored = view as Record<string, unknown>;
  const direction = directions.find(item => item.id === stored.directionId);
  if (!direction || typeof stored.profileId !== 'string' || !direction.profileIds.includes(stored.profileId) || !profileIds.includes(stored.profileId)) return fallback;
  if (typeof stored.stageId !== 'string' || !stageIds.has(stored.stageId)) return fallback;
  return { directionId: direction.id, profileId: stored.profileId, stageId: stored.stageId };
}

export function retainCareerView(directions: Directions, profileIds: readonly string[], previous: CareerView, selection: CareerSelectionState, stageId: string | null): CareerView {
  const resolved = resolveCareerSelection(directions, profileIds, {
    directionId: selection.directionId ?? previous.directionId,
    profileId: selection.profileId ?? previous.profileId,
  });
  return { ...(resolved ?? previous), stageId: stageId ?? previous.stageId };
}
