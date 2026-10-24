export type BilingualText = { es: string; en: string };

export type PatternStep = {
  title: BilingualText;
  why: BilingualText;
  /** Inclusive line numbers in the complete Java example. */
  from: number;
  to: number;
  focus: number[];
};

export type PatternGuide = {
  useCase: BilingualText;
  code: string;
  steps: PatternStep[];
  output: string;
};
