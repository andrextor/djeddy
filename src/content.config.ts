import { defineCollection } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'

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
      url: z.url().optional(),
    }),
})

export const collections = { events }
