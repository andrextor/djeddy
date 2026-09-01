import type { SiteConfig, Video } from '@/data/site'

export type JsonLd = Record<string, unknown>

const businessId = (domain: string): string => `${domain}/#business`

const business = (site: SiteConfig, ogImageUrl: string, logoUrl?: string): JsonLd => ({
  '@type': 'EntertainmentBusiness',
  '@id': businessId(site.domain),
  name: site.name,
  description: site.tagline,
  url: site.domain,
  image: ogImageUrl,
  ...(logoUrl ? { logo: logoUrl } : {}),
  telephone: `+${site.whatsapp.number}`,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressCountry: site.countryCode,
  },
  areaServed: [
    { '@type': 'City', name: site.city },
    ...site.travelCities.map((name) => ({ '@type': 'City', name })),
    { '@type': 'Country', name: site.countryName },
  ],
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

const video = (site: SiteConfig, item: Video): JsonLd => ({
  '@type': 'VideoObject',
  name: item.title,
  uploadDate: item.uploadDate,
  ...(item.kind === 'youtube'
    ? {
        thumbnailUrl: `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${item.youtubeId}`,
      }
    : {
        thumbnailUrl: `${site.domain}${item.poster.src}`,
        contentUrl: `${site.domain}${item.src}`,
      }),
})

export const buildJsonLd = (site: SiteConfig, ogImageUrl: string, logoUrl?: string): JsonLd => ({
  '@context': 'https://schema.org',
  '@graph': [
    business(site, ogImageUrl, logoUrl),
    website(site),
    ...site.videos.map((item) => video(site, item)),
  ],
})

/** Safe for inline <script>: a "</script>" inside a string cannot break out. */
export const serializeJsonLd = (data: JsonLd): string =>
  JSON.stringify(data).replace(/</g, '\\u003c')
