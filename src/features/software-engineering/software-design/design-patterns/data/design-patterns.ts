import { creationalConcepts, creationalPage } from '../creational/data/concepts';
import { structuralConcepts, structuralPage } from '../structural/data/concepts';
import { behavioralConcepts, behavioralPage } from '../behavioral/data/concepts';
const conceptOrder = ["facade","adapter","iterator","factory","builder","prototype","strategy","decorator","observer","singleton","factory-method","state","mediator","visitor"];
import type { Concept } from '../../../../../shared/lib/curriculum';
import { patternGuides } from './index';

export const designPatterns: Concept[] = [...creationalConcepts, ...structuralConcepts, ...behavioralConcepts].sort((left, right) => conceptOrder.indexOf(left.id) - conceptOrder.indexOf(right.id)).map(concept => ({
  ...concept,
  level: concept.level as Concept['level'],
  useCase: patternGuides[concept.id].useCase.es,
  example: patternGuides[concept.id].code,
}));

const patternPages = [creationalPage, structuralPage, behavioralPage];

export const designPatternPages = patternPages.map(({ conceptIds, ...page }) => {
  const ids = new Set(conceptIds);
  return { ...page, concepts: designPatterns.filter(concept => ids.has(concept.id)) };
});
