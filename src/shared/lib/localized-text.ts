export type LocalizedText = { es: string; en: string };

export const localizedText = (es: string, en: string): LocalizedText => ({ es, en });
