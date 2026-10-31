import type { APIRoute } from 'astro';
import designTokens from '../shared/styles/tokens.css?raw';

export const prerender = true;

export const GET: APIRoute = () => {
  const color = designTokens.match(/--green:\s*(#[\da-fA-F]{6})\s*;/)?.[1];
  if (!color) throw new Error('The green design token must define a six-digit hex color.');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text x="16" y="26" text-anchor="middle" font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif" font-size="28" fill="${color}">✍️</text></svg>`;
  return new Response(svg.trim(), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
};
