// @ts-check
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://djeddy.example.com',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
})
