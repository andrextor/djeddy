import activationPoster from '@/assets/dj-eddy-activacion-de-marca-poster.jpg'
import hablamePoster from '@/assets/dj-eddy-hablame-carangano-poster.jpg'
import introPoster from '@/assets/dj-eddy-presentacion-poster.jpg'
import type { IconName } from '@/components/Icon.astro'

export type SocialNetwork = 'instagram' | 'tiktok' | 'youtube' | 'facebook'

export interface SocialLink {
  network: SocialNetwork
  label: string
  url: string
}

interface VideoBase {
  title: string
  duration?: string
  /** ISO date; required for VideoObject rich results */
  uploadDate: string
}

export interface YouTubeVideo extends VideoBase {
  kind: 'youtube'
  /** 11-char id */
  youtubeId: string
}

export interface FileVideo extends VideoBase {
  kind: 'file'
  /** Path under public/ */
  src: string
  poster: ImageMetadata
}

export type Video = YouTubeVideo | FileVideo

export interface Stat {
  /** Short figure that stays true over time, e.g. '+300' */
  value: string
  label: string
}

export interface Testimonial {
  quote: string
  /** First name only */
  name: string
  /** e.g. 'Boda en Cali' */
  event: string
}

export interface SiteConfig {
  name: string
  legalName: string
  founderName: string
  city: string
  /** ISO-3166 alpha-2 */
  countryCode: string
  countryName: string
  /** Other cities named as served areas (the DJ travels) */
  travelCities: readonly string[]
  /** Meta description (≤ 155 chars) */
  tagline: string
  /** Service keywords, used in headings and JSON-LD offers */
  keywords: readonly string[]
  whatsapp: {
    /** E.164 without '+', e.g. 573001234567 */
    number: string
    /** Human-readable form shown on the page */
    display: string
  }
  email: string
  socials: readonly SocialLink[]
  /** Proof strip under the hero; hidden while empty. Only figures Eddy has confirmed. */
  stats: readonly Stat[]
  /** "Qué incluye" tiles; only claims Eddy has made, 2–3 words each */
  included: readonly { icon: IconName; label: string }[]
  /** Real client quotes; the section is hidden while empty */
  testimonials: readonly Testimonial[]
  /** Shown as 9:16 cards; real-event clips first */
  videos: readonly Video[]
}

/** Set to false once the client's real data replaces the sample values below; release builds refuse it. */
export const sampleData = true

export const site = {
  name: 'DJ Eddy',
  legalName: 'DJ Eddy',
  founderName: 'Edison Ayala',
  city: 'Cali',
  countryCode: 'CO',
  countryName: 'Colombia',
  travelCities: ['Medellín', 'Bogotá', 'Cartagena', 'Pereira'],
  tagline:
    'DJ en Cali para bodas, fiestas privadas, marcas y eventos corporativos. Salsa clásica y romántica, crossover y una pista que no se vacía.',
  keywords: [
    'DJ para bodas',
    'DJ para fiestas privadas',
    'DJ para activaciones de marca',
    'DJ para eventos corporativos',
    'DJ de salsa clásica y romántica',
  ],
  whatsapp: {
    number: '573182720357',
    display: '+57 318 272 0357',
  },
  email: 'edisonayalaramirez17@gmail.com',
  socials: [
    { network: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/djeddy007' },
    { network: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@dj.eddy07' },
    { network: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@DjeddycrossoverCO' },
    { network: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/edison.ayalaramirez' },
  ],
  stats: [],
  testimonials: [],
  included: [
    { icon: 'speaker', label: 'Sonido propio' },
    { icon: 'light', label: 'Iluminación' },
    { icon: 'music', label: 'Tu música' },
    { icon: 'pin', label: 'Todo Colombia' },
  ],
  videos: [
    {
      kind: 'file',
      src: '/videos/dj-eddy-presentacion.mp4',
      poster: introPoster,
      title: 'Haz que tu evento se sienta diferente',
      duration: '0:24',
      uploadDate: '2026-10-08',
    },
    {
      kind: 'file',
      src: '/videos/dj-eddy-activacion-de-marca.mp4',
      poster: activationPoster,
      title: 'Activación de marca en Cali',
      duration: '0:42',
      uploadDate: '2026-10-08',
    },
    {
      kind: 'file',
      src: '/videos/dj-eddy-hablame-carangano.mp4',
      poster: hablamePoster,
      title: 'Háblame Carangano · DJ Eddy',
      duration: '3:39',
      uploadDate: '2025-04-09',
    },
  ],
} as const satisfies SiteConfig
