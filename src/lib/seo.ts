import type { SiteConfig, Video } from '@/data/site'

export type JsonLd = Record<string, unknown>

const businessId = (siteUrl: string): string => `${siteUrl}#business`

const business = (
  site: SiteConfig,
  siteUrl: string,
  ogImageUrl: string,
  logoUrl?: string,
): JsonLd => ({
  '@type': 'EntertainmentBusiness',
  '@id': businessId(siteUrl),
  name: site.name,
  description: site.tagline,
  url: siteUrl,
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

const website = (site: SiteConfig, siteUrl: string): JsonLd => ({
  '@type': 'WebSite',
  '@id': `${siteUrl}#website`,
  url: siteUrl,
  name: site.name,
  inLanguage: 'es',
  publisher: { '@id': businessId(siteUrl) },
})

const video = (siteUrl: string, item: Video): JsonLd => ({
  '@type': 'VideoObject',
  name: item.title,
  uploadDate: item.uploadDate,
  ...(item.kind === 'youtube'
    ? {
        thumbnailUrl: `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${item.youtubeId}`,
      }
    : {
        thumbnailUrl: new URL(item.poster.src, siteUrl).href,
        contentUrl: new URL(item.src, siteUrl).href,
      }),
})

export const buildJsonLd = (
  site: SiteConfig,
  siteUrl: string,
  ogImageUrl: string,
  logoUrl?: string,
): JsonLd => ({
  '@context': 'https://schema.org',
  '@graph': [
    business(site, siteUrl, ogImageUrl, logoUrl),
    website(site, siteUrl),
    ...site.videos.map((item) => video(siteUrl, item)),
  ],
})

/** Safe for inline <script>: a "</script>" inside a string cannot break out. */
export const serializeJsonLd = (data: JsonLd): string =>
  JSON.stringify(data).replace(/</g, '\\u003c')
