export type BilingualText = { es: string; en: string };

export type PatternStep = {
  title: BilingualText;
  why: BilingualText;
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
