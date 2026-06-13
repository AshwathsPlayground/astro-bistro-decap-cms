import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    img: z.string(),
    alt: z.string(),
    description: z.string(),
    blogLink: z.string().default('#')
  })
})

const features = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/features' }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    type: z.string(),
    description: z.string()
  })
})

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testimonials' }),
  schema: z.object({
    title: z.string(),
    avatar: z.string(),
    rating: z.number(),
    content: z.string()
  })
})

const sections = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sections' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    slides: z.array(z.object({
      title: z.string(),
      id: z.number(),
      img: z.string(),
      imgAlt: z.string(),
      userComment: z.string(),
      userAvatar: z.string()
    })).optional(),
    badge: z.string().default('About Us').optional(),
    readMoreLink: z.string().default('#').optional(),
    image: z.string().optional(),
    stats: z.array(z.object({
      value: z.string(),
      line1: z.string(),
      line2: z.string(),
      icon: z.string()
    })).optional(),
    contact: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    })).optional(),
    promotions: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      className: z.string(),
      offerText: z.object({
        text: z.string(),
        className: z.string().optional()
      }).optional(),
      offerButton: z.object({
        text: z.string(),
        link: z.string(),
        className: z.string().optional()
      }).optional()
    })).optional()
  })
})

export const collections = { 
  blog, 
  features,
  testimonials,
  sections
}
