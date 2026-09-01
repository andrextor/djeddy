import { defineCollection } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'

const services = defineCollection({
  loader: file('src/data/services.json'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      order: z.number().int().positive(),
      tag: z.string().min(1).max(12),
      title: z.string().min(1),
      description: z.string().min(1).max(160),
      image: image().optional(),
      url: z.url().optional(),
    }),
})

export const collections = { services }
