import assert from 'node:assert/strict'
import { test } from 'node:test'
import { assertNoPlaceholders, findPlaceholders } from './placeholders.ts'
import { buildJsonLd, serializeJsonLd } from './seo.ts'
import { buildWhatsAppUrl } from './whatsapp.ts'

test('buildWhatsAppUrl encodes the message', () => {
  assert.equal(
    buildWhatsAppUrl('573001234567', 'Hola Eddy, ¿tienes fecha?'),
    'https://wa.me/573001234567?text=Hola%20Eddy%2C%20%C2%BFtienes%20fecha%3F',
  )
})

test('findPlaceholders reports nested bracket tokens with their path', () => {
  const found = findPlaceholders({ a: 'ok', b: ['x', '[CIUDAD]'], c: { d: '[URL_X]' } })
  assert.deepEqual(found, ['site.b[1]: [CIUDAD]', 'site.c.d: [URL_X]'])
  assert.doesNotThrow(() => assertNoPlaceholders({ a: 'Medellín', b: 'ok' }))
  assert.throws(() => assertNoPlaceholders({ a: '[CIUDAD]' }), /1 placeholder/)
})

test('buildJsonLd links videos to the business entity', () => {
  const site = {
    name: 'DJ Eddy',
    legalName: 'DJ Eddy',
    founderName: 'Eddy',
    domain: 'https://djeddy.test',
    city: 'Medellín',
    countryCode: 'CO',
    countryName: 'Colombia',
    travelCities: ['Bogotá'],
    tagline: 'DJ en Medellín',
    keywords: ['DJ para fiestas privadas'],
    whatsapp: { number: '573001234567', display: '+57 300 123 4567', message: 'Hola' },
    email: 'hola@djeddy.test',
    socials: [{ network: 'instagram', label: 'Instagram', url: 'https://instagram.com/djeddy' }],
    videos: [
      { kind: 'youtube', youtubeId: 'a', title: 'A', uploadDate: '2026-01-01' },
      {
        kind: 'file',
        src: '/videos/b.mp4',
        poster: { src: '/_astro/b.jpg', width: 540, height: 960, format: 'jpg' },
        title: 'B',
        uploadDate: '2026-01-02',
      },
    ],
  } as const
  const json = buildJsonLd(site, 'https://djeddy.test/og.jpg', 'https://djeddy.test/logo.png')
  const graph = json['@graph']
  assert.ok(Array.isArray(graph))
  assert.deepEqual(
    graph.map((node: Record<string, unknown>) => node['@type']),
    ['EntertainmentBusiness', 'WebSite', 'VideoObject', 'VideoObject'],
  )
  const business = graph[0] as Record<string, unknown>
  assert.equal(business.logo, 'https://djeddy.test/logo.png')
  const fileVideo = graph[3] as Record<string, unknown>
  assert.equal(fileVideo.contentUrl, 'https://djeddy.test/videos/b.mp4')
})

test('serializeJsonLd escapes closing script tags', () => {
  assert.equal(serializeJsonLd({ name: '</script><b>' }), '{"name":"\\u003c/script>\\u003cb>"}')
})
