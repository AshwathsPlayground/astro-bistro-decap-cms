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

const heroSlides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/hero-slides' }),
  schema: z.object({
    title: z.string(),
    id: z.number(),
    img: z.string(),
    imgAlt: z.string(),
    userComment: z.string(),
    userAvatar: z.string()
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

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    hero: z.object({
      title: z.string(),
      description: z.string()
    }),
    about: z.object({
      badge: z.string().default('About Us'),
      title: z.string(),
      description: z.string(),
      readMoreLink: z.string().default('#'),
      image: z.string(),
      stats: z.array(z.object({
        value: z.string(),
        line1: z.string(),
        line2: z.string(),
        icon: z.string()
      }))
    }),
    contact: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    })),
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
    }))
  })
})

export const collections = { 
  blog, 
  'hero-slides': heroSlides, 
  features,
  testimonials,
  pages
}
