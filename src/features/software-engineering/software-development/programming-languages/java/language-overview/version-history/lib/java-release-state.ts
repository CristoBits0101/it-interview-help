export interface JavaFeatureTimeline {
  introduced: number;
  stable?: number;
  preview?: readonly number[];
  incubator?: readonly number[];
  experimental?: readonly number[];
  removed?: number;
}
export function javaFeatureMilestone(feature: JavaFeatureTimeline, version: number): 'added' | 'finalized' | 'removed' | 'preview' | 'incubator' | 'experimental' | null {
  if (feature.removed === version) return 'removed';
  if (feature.introduced === version) return 'added';
  if (feature.stable === version) return 'finalized';
  if (feature.preview?.includes(version)) return 'preview';
  if (feature.incubator?.includes(version)) return 'incubator';
  if (feature.experimental?.includes(version)) return 'experimental';
  return null;
}
export function javaFeatureState(feature: JavaFeatureTimeline, version: number): 'final' | 'preview' | 'incubator' | 'experimental' | 'unavailable' {
  if (feature.removed !== undefined && version >= feature.removed) return 'unavailable';
  if (feature.stable !== undefined && version >= feature.stable) return 'final';
  if (feature.preview?.includes(version)) return 'preview';
  if (feature.incubator?.includes(version)) return 'incubator';
  if (feature.experimental?.includes(version)) return 'experimental';
  return 'unavailable';
}
export function javaFeatureChange(feature: JavaFeatureTimeline, from: number, to: number): 'added' | 'finalized' | 'removed' | 'changed' | null {
  if (to <= from) return null;
  if (feature.removed !== undefined && feature.removed > from && feature.removed <= to) return 'removed';
  if (feature.introduced > from && feature.introduced <= to) return 'added';
  if (feature.stable !== undefined && feature.stable > from && feature.stable <= to) return 'finalized';
  const before = javaFeatureState(feature, from);
  const after = javaFeatureState(feature, to);
  if (before !== after) return 'changed';
  return null;
}
