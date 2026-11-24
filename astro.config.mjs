// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL drives canonical/Open Graph URLs and the sitemap (set by the deploy workflow).
export default defineConfig({
  site: process.env.SITE_URL || 'https://huy-8bit.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark-default' }, defaultColor: false },
  },
});
