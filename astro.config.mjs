import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import path from 'node:path';

export default defineConfig({
  site: 'https://kamalbhatt.com',
  integrations: [react()],
  vite: {
    server: {
      host: true,
      allowedHosts: true,
    },
    preview: {
      host: true,
      allowedHosts: true,
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
