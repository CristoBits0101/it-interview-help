export const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
export const $$ = <T extends HTMLElement = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
