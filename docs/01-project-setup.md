# Parte 1 · Configuración del proyecto

## Herramientas y versiones
- Node ≥ 22 LTS (archivo `.nvmrc` → `22`).
- pnpm 10 fijado en `package.json` → `"packageManager": "pnpm@10.x.x"`.
- Astro 7 (el scaffold instaló 7.2; los docs decían 5: misma API para lo que usamos), TypeScript 5 (fijado a `^5` porque `@astrojs/check` aún no acepta TS 7), Biome 2.5, `@astrojs/check`, `@astrojs/sitemap`.

## Comando de arranque
```bash
pnpm create astro@latest . --template minimal --install --no-git --yes   # crea una subcarpeta con nombre aleatorio: mover su contenido a la raíz
pnpm add @fontsource-variable/sora @fontsource-variable/manrope @astrojs/sitemap
pnpm add -D @biomejs/biome @astrojs/check typescript@^5
```

## Estructura de carpetas
```
djeddy/
├─ design/                 # lienzo de diseño (fuente visual; no se sirve)
├─ docs/                   # estas especificaciones
├─ public/
│  ├─ favicon.svg
│  └─ og.jpg               # 1200×630, negro/dorado con el wordmark
├─ src/
│  ├─ assets/
│  │  ├─ hero.jpg          # foto principal del DJ
│  │  └─ events/           # imágenes/flyers de eventos
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ Hero.astro
│  │  ├─ Marquee.astro
│  │  ├─ Videos.astro
│  │  ├─ Events.astro
│  │  ├─ Contact.astro
│  │  ├─ Footer.astro
│  │  ├─ WhatsAppButton.astro
│  │  ├─ SectionHeading.astro
│  │  └─ icons/            # Instagram.astro, TikTok.astro, YouTube.astro, Facebook.astro, WhatsApp.astro, Play.astro, ArrowUpRight.astro
│  ├─ data/
│  │  ├─ site.ts           # datos del DJ, contacto, redes, videos
│  │  └─ events.json       # agenda
│  ├─ layouts/
│  │  └─ BaseLayout.astro  # <head>, SEO, fuentes, tokens globales
│  ├─ lib/
│  │  └─ whatsapp.ts       # buildWhatsAppUrl()
│  ├─ pages/
│  │  └─ index.astro
│  ├─ styles/
│  │  ├─ tokens.css        # custom properties (Parte 2)
│  │  └─ global.css        # reset mínimo, tipografía base, utilidades de efecto
│  └─ content.config.ts    # colección `events`
├─ astro.config.mjs
├─ biome.json
├─ tsconfig.json
├─ .nvmrc
└─ package.json
```

## `package.json` (scripts)
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "lint": "biome check .",
    "format": "biome format --write .",
    "typecheck": "astro check"
  }
}
```

## `tsconfig.json`
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": [".astro/types.d.ts", "src/**/*"],
  "exclude": ["dist"]
}
```

## `biome.json`
```json
{
  "$schema": "https://biomejs.dev/schemas/2.5.11/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": { "includes": ["src/**", "*.mjs", "*.json", "!pnpm-lock.yaml"] },
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2, "lineWidth": 100 },
  "linter": {
    "enabled": true,
    "rules": { "preset": "recommended", "suspicious": { "noExplicitAny": "error" } }
  },
  "javascript": { "formatter": { "quoteStyle": "single", "semicolons": "asNeeded", "trailingCommas": "all" } },
  "assist": { "actions": { "source": { "organizeImports": "on" } } },
  "overrides": [
    { "includes": ["**/*.astro"], "linter": { "rules": { "correctness": { "noUnusedVariables": "off", "noUnusedImports": "off" } } } },
    { "includes": ["src/styles/global.css"], "linter": { "rules": { "complexity": { "noImportantStyles": "off" } } } }
  ]
}
```

## `astro.config.mjs`
```js
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://djeddy.example.com', // sustituir por el dominio real en la Fase 6
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
})
```

Notas de Biome: solo analiza el frontmatter de los `.astro`, por lo que las variables usadas en la plantilla parecen sin usar (override que apaga esas dos reglas en `*.astro`); el bloque `prefers-reduced-motion` necesita `!important` (override en `global.css`).

## Reglas de código
- Identificadores, archivos, carpetas y comentarios en inglés.
- Comentarios solo para lógica no evidente.
- Prohibido `any`; usar `unknown` + type guards o interfaces.
- Props de componentes tipadas con `interface Props` exportada.
- Un componente = una responsabilidad; los estilos van `scoped` en el propio `.astro`.

## Criterios de aceptación
- [x] `pnpm install` reproducible con lockfile; `pnpm dev` sirve la página vacía.
- [x] `pnpm lint` y `pnpm typecheck` pasan sin avisos.
- [x] `pnpm build` genera `dist/` sin JS de cliente (`dist/_astro/*.js` inexistente).
