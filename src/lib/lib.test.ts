import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatEventDate, upcoming } from './dates.ts'
import { assertNoPlaceholders, findPlaceholders } from './placeholders.ts'
import { buildJsonLd } from './seo.ts'
import { buildWhatsAppUrl } from './whatsapp.ts'

test('buildWhatsAppUrl encodes the message', () => {
  assert.equal(
    buildWhatsAppUrl('573001234567', 'Hola Eddy, ¿tienes fecha?'),
    'https://wa.me/573001234567?text=Hola%20Eddy%2C%20%C2%BFtienes%20fecha%3F',
  )
})

test('formatEventDate renders day, 3-letter month and iso in UTC', () => {
  assert.deepEqual(formatEventDate(new Date('2026-09-05')), {
    day: '05',
    month: 'SEP',
    iso: '2026-09-05',
  })
  assert.equal(formatEventDate(new Date('2026-01-01')).month, 'ENE')
})

test('upcoming filters past events, sorts ascending and limits to 3', () => {
  const now = new Date('2026-06-15T23:00:00Z')
  const items = ['2026-06-14', '2026-09-01', '2026-06-15', '2026-07-01', '2026-08-01'].map(
    (date) => ({ data: { date: new Date(date) } }),
  )
  assert.deepEqual(
    upcoming(items, now).map((item) => item.data.date.toISOString().slice(0, 10)),
    ['2026-06-15', '2026-07-01', '2026-08-01'],
  )
})

test('findPlaceholders reports nested bracket tokens with their path', () => {
  const found = findPlaceholders({ a: 'ok', b: ['x', '[CIUDAD]'], c: { d: '[URL_X]' } })
  assert.deepEqual(found, ['site.b[1]: [CIUDAD]', 'site.c.d: [URL_X]'])
  assert.doesNotThrow(() => assertNoPlaceholders({ a: 'Medellín', b: 'ok' }))
  assert.throws(() => assertNoPlaceholders({ a: '[CIUDAD]' }), /1 placeholder/)
})

test('buildJsonLd links events and videos to the business entity', () => {
  const site = {
    name: 'DJ Eddy',
    legalName: 'DJ Eddy',
    founderName: 'Eddy',
    domain: 'https://djeddy.test',
    city: 'Medellín',
    countryCode: 'CO',
    tagline: 'DJ en Medellín',
    keywords: ['DJ para bodas'],
    whatsapp: { number: '573001234567', display: '+57 300 123 4567', message: 'Hola' },
    email: 'hola@djeddy.test',
    socials: [{ network: 'instagram', label: 'Instagram', url: 'https://instagram.com/djeddy' }],
    videos: [
      { youtubeId: 'a', title: 'A', uploadDate: '2026-01-01' },
      { youtubeId: 'b', title: 'B', uploadDate: '2026-01-02' },
    ],
  } as const
  const json = buildJsonLd(
    site,
    [
      {
        title: 'Boda',
        date: new Date('2026-09-12'),
        venue: 'Finca',
        city: 'Medellín',
        time: '21:00',
      },
    ],
    'https://djeddy.test/og.jpg',
  )
  const graph = json['@graph']
  assert.ok(Array.isArray(graph))
  assert.deepEqual(
    graph.map((node: Record<string, unknown>) => node['@type']),
    ['EntertainmentBusiness', 'WebSite', 'Event', 'VideoObject', 'VideoObject'],
  )
  const eventNode = graph[2] as Record<string, unknown>
  assert.equal(eventNode.startDate, '2026-09-12T21:00:00')
  assert.deepEqual(eventNode.performer, { '@id': 'https://djeddy.test/#business' })
})
