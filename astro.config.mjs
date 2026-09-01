// @ts-check
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// Canonical origin: explicit SITE_URL wins; on Vercel the production domain is used; local fallback last.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
const site = process.env.SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:4321')

export default defineConfig({
  site,
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
})
