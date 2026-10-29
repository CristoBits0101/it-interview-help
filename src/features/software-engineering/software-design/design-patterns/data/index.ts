import { creationalGuides } from '../creational/data/creational';
import { structuralGuides } from '../structural/data/structural';
import { behavioralGuides } from '../behavioral/data/behavioral';
import type { PatternGuide } from './types';

export const patternGuides: Record<string, PatternGuide> = {
  ...creationalGuides,
  ...structuralGuides,
  ...behavioralGuides,
};

export const patternGuideTranslations: Record<string, string> = Object.fromEntries(
  Object.values(patternGuides).flatMap(guide => [
    [guide.useCase.es, guide.useCase.en],
    ...guide.steps.flatMap(step => [[step.title.es, step.title.en], [step.why.es, step.why.en]]),
  ]),
);
