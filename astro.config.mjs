import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://navaigate.dev',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    react(),
    tailwind(),
    sitemap()
  ],
  vite: {
    optimizeDeps: {
      exclude: ['lucide-react']
    }
  }
});
