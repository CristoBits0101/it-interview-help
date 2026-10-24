import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tech-training.active-map-0560.chatgpt.site',
  output: 'static',
  markdown: { syntaxHighlight: false },
  devToolbar: { enabled: false },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
        "connect-src 'none'",
        "frame-src 'none'",
      ],
    },
  },
  vite: { server: { allowedHosts: ['terminal.local'] } },
});
