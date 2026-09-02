import eventVideoPoster from '@/assets/dj-eddy-evento-poster.jpg'
import hablamePoster from '@/assets/dj-eddy-hablame-carangano-poster.jpg'

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
    /** Pre-filled message */
    message: string
  }
  email: string
  socials: readonly SocialLink[]
  videos: readonly [Video, Video]
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
    'DJ en Cali para fiestas privadas, activaciones de marca y eventos corporativos. Salsa clásica y romántica, crossover y la lectura de pista que mantiene a todos bailando.',
  keywords: [
    'DJ para fiestas privadas',
    'DJ para activaciones de marca',
    'DJ para eventos corporativos',
    'DJ de salsa clásica y romántica',
  ],
  whatsapp: {
    number: '573182720357',
    display: '+57 318 272 0357',
    message: 'Hola Eddy, quiero reservar una fecha para mi evento.',
  },
  email: 'edisonayalaramirez17@gmail.com',
  socials: [
    { network: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/djeddy007' },
    { network: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@dj.eddy07' },
    { network: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@DjeddycrossoverCO' },
    { network: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/edison.ayalaramirez' },
  ],
  videos: [
    {
      kind: 'file',
      src: '/videos/dj-eddy-hablame-carangano.mp4',
      poster: hablamePoster,
      title: 'Háblame Carangano · DJ Eddy',
      duration: '3:39',
      uploadDate: '2025-04-09',
    },
    {
      kind: 'file',
      src: '/videos/dj-eddy-evento.mp4',
      poster: eventVideoPoster,
      title: 'En vivo en un evento',
      duration: '0:22',
      uploadDate: '2026-08-31',
    },
  ],
} as const satisfies SiteConfig
