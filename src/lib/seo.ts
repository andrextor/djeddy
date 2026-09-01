import type { SiteConfig, Video } from '@/data/site'

export type JsonLd = Record<string, unknown>

export interface EventForSeo {
  title: string
  date: Date
  venue: string
  city: string
  time: string
  imageUrl?: string
  url?: string
}

const businessId = (domain: string): string => `${domain}/#business`

const business = (site: SiteConfig, ogImageUrl: string): JsonLd => ({
  '@type': 'EntertainmentBusiness',
  '@id': businessId(site.domain),
  name: site.name,
  description: site.tagline,
  url: site.domain,
  image: ogImageUrl,
  telephone: `+${site.whatsapp.number}`,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressCountry: site.countryCode,
  },
  areaServed: [{ '@type': 'City', name: site.city }],
  priceRange: '$$',
  sameAs: site.socials.map((social) => social.url),
  founder: { '@type': 'Person', name: site.founderName, jobTitle: 'DJ' },
  makesOffer: site.keywords.map((keyword) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: keyword },
  })),
})

const website = (site: SiteConfig): JsonLd => ({
  '@type': 'WebSite',
  '@id': `${site.domain}/#website`,
  url: site.domain,
  name: site.name,
  inLanguage: 'es',
  publisher: { '@id': businessId(site.domain) },
})

const event = (site: SiteConfig, item: EventForSeo): JsonLd => ({
  '@type': 'Event',
  name: item.title,
  startDate: `${item.date.toISOString().slice(0, 10)}T${item.time}:00`,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: item.venue,
    address: { '@type': 'PostalAddress', addressLocality: item.city },
  },
  performer: { '@id': businessId(site.domain) },
  ...(item.imageUrl ? { image: item.imageUrl } : {}),
  ...(item.url ? { url: item.url } : {}),
})

const video = (item: Video): JsonLd => ({
  '@type': 'VideoObject',
  name: item.title,
  thumbnailUrl: `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${item.youtubeId}`,
  uploadDate: item.uploadDate,
})

export const buildJsonLd = (
  site: SiteConfig,
  events: readonly EventForSeo[],
  ogImageUrl: string,
): JsonLd => ({
  '@context': 'https://schema.org',
  '@graph': [
    business(site, ogImageUrl),
    website(site),
    ...events.map((item) => event(site, item)),
    ...site.videos.map(video),
  ],
})
