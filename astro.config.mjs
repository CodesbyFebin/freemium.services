import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Redirects handled via static HTML files in public/ to avoid
// Astro 6 static build conflicts with .html source paths
export default defineConfig({
  site: 'https://freemium.services',
  integrations: [react(), mdx()],
  compress: true,
  vite: {
    server: {
      fs: {
        allow: ['./data', './content']
      }
    }
  }
});