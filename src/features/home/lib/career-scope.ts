export type CareerScope = { kind: 'stage' | 'growth'; id: string } | null;

export interface GrowthOption {
  id: string;
  profileIds: readonly string[];
}

export function toggleCareerScope(current: CareerScope, next: Exclude<CareerScope, null>): CareerScope {
  return current?.kind === next.kind && current.id === next.id ? null : next;
}

export function reconcileCareerScope(scope: CareerScope, profileId: string, targets: readonly GrowthOption[]): CareerScope {
  if (scope?.kind !== 'growth') return scope;
  return targets.some(target => target.id === scope.id && target.profileIds.includes(profileId)) ? scope : null;
}
