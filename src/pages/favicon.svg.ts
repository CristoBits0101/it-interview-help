import type { APIRoute } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Icon from '../shared/components/primitives/Icon.astro';
import designTokens from '../shared/styles/tokens.css?raw';

export const prerender = true;

export const GET: APIRoute = async () => {
  const color = designTokens.match(/--green:\s*(#[\da-fA-F]{6})\s*;/)?.[1];
  if (!color) throw new Error('The green design token must define a six-digit hex color.');
  const container = await AstroContainer.create();
  const svg = await container.renderToString(Icon, {
    props: { name: 'brand', size: 32, color, strokeWidth: 2.25 },
  });
  return new Response(svg.trim(), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
};
