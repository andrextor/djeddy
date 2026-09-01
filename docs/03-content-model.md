# Parte 3 · Modelo de contenido

Todo el contenido editable vive en `src/data/`. Nada de texto de negocio
dentro de componentes salvo microcopy estructural.

## `src/data/site.ts`
```ts
export interface SocialLink {
  network: 'instagram' | 'tiktok' | 'youtube' | 'facebook'
  label: string
  url: string
}

export interface Video {
  /** YouTube video id (11 chars) */
  youtubeId: string
  title: string
  duration?: string
}

export interface SiteConfig {
  name: string                  // "DJ Eddy"
  legalName: string             // para © y JSON-LD
  domain: string                // https://[DOMINIO]
  city: string                  // "[CIUDAD]"
  tagline: string               // meta description (≤ 155 chars)
  whatsapp: {
    /** E.164 sin '+': 573001234567 */
    number: string
    /** mensaje prellenado */
    message: string
  }
  email: string
  socials: readonly SocialLink[]
  videos: readonly [Video, Video]   // exactamente dos en v1
}

export const site = {
  name: 'DJ Eddy',
  legalName: 'DJ Eddy',
  domain: 'https://[DOMINIO]',
  city: '[CIUDAD]',
  tagline: 'DJ para bodas, fiestas privadas y eventos corporativos en [CIUDAD]. Sonido, luces y la lectura de pista que mantiene a todos bailando.',
  whatsapp: {
    number: '[NUMERO_E164]',
    message: 'Hola Eddy, quiero reservar una fecha para mi evento.',
  },
  email: '[CORREO]',
  socials: [
    { network: 'instagram', label: 'Instagram', url: '[URL_INSTAGRAM]' },
    { network: 'tiktok', label: 'TikTok', url: '[URL_TIKTOK]' },
    { network: 'youtube', label: 'YouTube', url: '[URL_YOUTUBE]' },
    { network: 'facebook', label: 'Facebook', url: '[URL_FACEBOOK]' },
  ],
  videos: [
    { youtubeId: '[ID_VIDEO_1]', title: 'Boda en [LUGAR]', duration: '[DURACION]' },
    { youtubeId: '[ID_VIDEO_2]', title: 'Fiesta privada en [LUGAR]' },
  ],
} as const satisfies SiteConfig
```

## `src/data/events.json` + colección `events`
```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content'
import { file } from 'astro/loaders'

const events = defineCollection({
  loader: file('src/data/events.json'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string().min(1),
      date: z.coerce.date(),
      venue: z.string().min(1),
      city: z.string().min(1),
      time: z.string().regex(/^\d{2}:\d{2}$/),
      image: image().optional(),
      url: z.string().url().optional(),
    }),
})

export const collections = { events }
```
```json
[
  { "id": "2026-09-12-boda", "title": "[NOMBRE DEL EVENTO]", "date": "2026-09-12", "venue": "[LUGAR]", "city": "[CIUDAD]", "time": "21:00", "image": "../assets/events/placeholder.jpg" }
]
```
Reglas de presentación:
- Se muestran solo eventos con `date >= hoy`, ordenados ascendente, **máximo 3**
  en escritorio y 3 en móvil. Si no hay eventos futuros, la sección muestra
  el estado vacío: "Agenda 2026: consulta disponibilidad por WhatsApp" con el
  CTA (no se oculta la sección: la ancla `#eventos` debe existir).
- Fecha formateada con `Intl.DateTimeFormat('es', …)`: numeral `dd` y mes
  abreviado en mayúsculas sin punto (`SEP`).
- `image` ausente → fondo `--gradient-event-a/b` alternado (como en el diseño).

## `src/lib/whatsapp.ts`
```ts
export const buildWhatsAppUrl = (number: string, message: string): string =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`
```
Único punto de construcción del enlace; se usa en Header, Hero, Contact y
WhatsAppButton con `target="_blank" rel="noopener"`.

## Placeholders y validación
- Mientras un valor siga entre `[CORCHETES]`, `pnpm build` debe **fallar**:
  añadir en `site.ts` un `assertNoPlaceholders(site)` que recorra los strings
  y lance `Error` si encuentra `/\[[A-Z_ ]+\]/`. Se ejecuta en `BaseLayout`
  (solo en build: `import.meta.env.PROD`).
- Las imágenes se importan desde `src/assets` para que `astro:assets` las
  optimice (AVIF/WebP, `widths`), nunca desde `public/`.

## Criterios de aceptación
- [ ] `site.ts` compila con `satisfies SiteConfig`; ninguna propiedad opcional silenciosa.
- [ ] Un evento con `time: "9pm"` o `image` inexistente hace fallar `astro check`/`build`.
- [ ] Con `events.json` vacío la sección muestra el estado vacío y el sitio compila.
