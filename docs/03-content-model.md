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

type Video =
  | { kind: 'youtube'; youtubeId: string; title: string; duration?: string; uploadDate: string }
  | { kind: 'file'; src: string /* bajo public/ */; poster: ImageMetadata; title: string; duration?: string; uploadDate: string }
// Un video propio se sirve desde public/videos/ (MP4 H.264, ≤ 5 MB, vertical 540×960 o 720×1280) con su poster en src/assets/; la fachada lo carga solo al pulsar.

export interface SiteConfig {
  name: string                  // "DJ Eddy"
  legalName: string             // para © y JSON-LD
  domain: string                // https://[DOMINIO]
  city: string                  // "[CIUDAD]"
  countryCode: string           // ISO-3166 alpha-2, p. ej. "CO"
  tagline: string               // meta description (≤ 155 chars), incluye "DJ en {city}"
  keywords: readonly string[]   // servicios para H2/JSON-LD: ['DJ para bodas', 'DJ para fiestas privadas', 'DJ para eventos corporativos']
  founderName: string           // "Eddy [APELLIDO]" para JSON-LD
  whatsapp: {
    /** E.164 sin '+': 573001234567 */
    number: string
    /** forma legible que se muestra en la página: '+57 300 123 4567' (evita formatear por código: cada país agrupa distinto) */
    display: string
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
  countryCode: '[PAIS_ISO2]',
  keywords: ['DJ para bodas', 'DJ para fiestas privadas', 'DJ para eventos corporativos'],
  founderName: 'Eddy [APELLIDO]',
  tagline: 'DJ para bodas, fiestas privadas y eventos corporativos en [CIUDAD]. Sonido, luces y la lectura de pista que mantiene a todos bailando.',
  whatsapp: {
    number: '[NUMERO_E164]',
    display: '[+00 000 000 0000]',
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
    { youtubeId: '[ID_VIDEO_1]', title: 'Boda en [LUGAR]', duration: '[DURACION]', uploadDate: '[FECHA_ISO]' },
    { youtubeId: '[ID_VIDEO_2]', title: 'Fiesta privada en [LUGAR]', uploadDate: '[FECHA_ISO]' },
  ],
} as const satisfies SiteConfig
```

## `src/data/services.json` + colección `services` (antes `events`)
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
> Cambio de la Fase 6: el cliente descartó una agenda con fechas ("no podemos cambiar esto dinámicamente"). La sección conserva la tarjeta pero muestra **tipos de evento** perennes (`order`, `tag`, `title`, `description`, `image`, `url?`; se ordena por `order` porque el loader devuelve las entradas por `id`) sin fechas. `lib/dates.ts` y los nodos `Event` del JSON-LD se eliminaron.

Reglas de presentación (versión original con fechas, ya no vigente):
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
- `pnpm build` construye siempre (avisa por consola si `sampleData` es
  `true`). `pnpm build:release` (`RELEASE=1`) **falla** mientras quede un
  valor entre `[CORCHETES]` o `sampleData` siga en `true`:
  `src/lib/placeholders.ts` exporta `findPlaceholders` /
  `assertNoPlaceholders` y `BaseLayout` los ejecuta cuando
  `import.meta.env.PROD && process.env.RELEASE === '1'`. El hosting debe
  ejecutar `pnpm build:release`.
- Helpers en `src/lib/`: `whatsapp.ts` (`buildWhatsAppUrl`), `dates.ts`
  (`formatEventDate` → `{ day, month, iso }` en UTC, `upcoming(items, now, limit)`),
  `seo.ts` (`buildJsonLd`, ver Parte 5), `placeholders.ts`. Un único archivo
  de pruebas `src/lib/lib.test.ts` con `node:test` (`pnpm test`).
- Astro 7: `z` se importa de `astro/zod` (el de `astro:content` está
  deprecado) y las URL se validan con `z.url()`.
- Las imágenes se importan desde `src/assets` para que `astro:assets` las
  optimice (AVIF/WebP, `widths`), nunca desde `public/`.

## Criterios de aceptación
- [x] `site.ts` compila con `satisfies SiteConfig`; ninguna propiedad opcional silenciosa.
- [x] Un evento con `time: "9pm"` o `image` inexistente hace fallar `astro check`/`build`.
- [ ] Con `events.json` vacío (se verifica al construir `Events.astro` en la Fase 4) la sección muestra el estado vacío y el sitio compila.
