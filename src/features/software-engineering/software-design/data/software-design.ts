import type { Track } from '../../../../shared/lib/curriculum';
import { solidModule } from '../solid-principles/data/solid';
import { designPatternPages } from '../design-patterns/data/design-patterns';

export const softwareDesign: Track = {
    id: 'software-design',
    title: 'Diseño de software',
    eyebrow: 'Software Design',
    modules: [
      solidModule,
      ...designPatternPages,
    ],
  };
