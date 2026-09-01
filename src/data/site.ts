export type SocialNetwork = 'instagram' | 'tiktok' | 'youtube' | 'facebook'

export interface SocialLink {
  network: SocialNetwork
  label: string
  url: string
}

export interface Video {
  /** YouTube video id (11 chars) */
  youtubeId: string
  title: string
  duration?: string
  /** ISO date; required for VideoObject rich results */
  uploadDate: string
}

export interface SiteConfig {
  name: string
  legalName: string
  founderName: string
  domain: string
  city: string
  /** ISO-3166 alpha-2 */
  countryCode: string
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

export const site = {
  name: 'DJ Eddy',
  legalName: 'DJ Eddy',
  founderName: 'Eddy [APELLIDO]',
  domain: 'https://djeddy.example.com',
  city: '[CIUDAD]',
  countryCode: '[PAIS_ISO2]',
  tagline:
    'DJ en [CIUDAD] para bodas, fiestas privadas y eventos corporativos. Sonido, luces y la lectura de pista que mantiene a todos bailando.',
  keywords: ['DJ para bodas', 'DJ para fiestas privadas', 'DJ para eventos corporativos'],
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
    {
      youtubeId: '[ID_VIDEO_1]',
      title: 'Boda en [LUGAR]',
      duration: '[DURACION]',
      uploadDate: '[FECHA_ISO]',
    },
    { youtubeId: '[ID_VIDEO_2]', title: 'Fiesta privada en [LUGAR]', uploadDate: '[FECHA_ISO]' },
  ],
} as const satisfies SiteConfig
