// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.williamgermany.com',

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-dark',
        dark: 'github-dark',
      },
    },
  },

  integrations: [mdx(), react(), sitemap()],
  adapter: cloudflare(),
});