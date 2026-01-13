import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://navaigate.dev',
  adapter: vercel(),
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
