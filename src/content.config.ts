import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// License enum matching the source data
const licenseSchema = z.enum([
  'MIT',
  'Apache 2.0',
  'GPL',
  'GPL-2.0',
  'GPL-3.0',
  'BSD',
  'BSD-3-Clause',
  'BSD-2-Clause',
  'Fair-code',
  'Fair-code (Apache 2.0)',
  'AGPLv3',
  'MIT / Unlicense',
  'free',
  'freemium',
  'open-source',
  'Proprietary',
  'Unknown',
  'Other'
]);

// Migration status enum
// Tools must be verified before being publishable
const migrationStatusSchema = z.enum([
  'legacy',        // From legacy system, needs migration
  'candidate',     // Has some verification, needs more
  'verified',      // Has primary evidence, ready for review
  'publishable',   // Fully verified and ready to publish
  'migrated'       // Migrated to content collections but NOT verified (needs evidence)
]);

// Tool schema
const toolSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  emoji: z.string().optional(),
  license: licenseSchema,
  stars: z.number().optional(),
  alternatives: z.array(z.string()).optional(),
  migrationStatus: migrationStatusSchema.optional(),
  lastVerified: z.string().datetime().optional(),
  primaryEvidence: z.object({
    documentation: z.string().url(),
    pricing: z.string().url().optional(),
    licensing: z.string().url().optional(),
  }).optional(),
  install: z.string(),
  features: z.array(z.string()),
  faqs: z.array(z.object({
    q: z.string(),
    a: z.string()
  })).optional(),
  ogImage: z.string().optional(),
});

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
  description: z.string(),
  descriptionLong: z.string(),
  toolCount: z.number(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional(),
});

const comparisonSchema = z.object({
  id: z.string(),
  toolA: z.string(),
  toolB: z.string(),
  verdict: z.string(),
  features: z.array(z.object({
    name: z.string(),
    valA: z.string().or(z.boolean()).or(z.number()),
    valB: z.string().or(z.boolean()).or(z.number()),
  })),
});

const guideSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// Define collections with explicit loaders for Astro 6
export const collections = {
  tools: defineCollection({
    loader: glob({
      pattern: '**/*.json',
      base: './src/content/collections/tools',
    }),
    schema: toolSchema,
  }),
  
  categories: defineCollection({
    loader: glob({
      pattern: '**/*.json',
      base: './src/content/collections/categories',
    }),
    schema: categorySchema,
  }),
  
  comparisons: defineCollection({
    loader: glob({
      pattern: '**/*.json',
      base: './src/content/collections/comparisons',
    }),
    schema: comparisonSchema,
  }),
  
  guides: defineCollection({
    loader: glob({
      pattern: '**/*.json',
      base: './src/content/collections/guides',
    }),
    schema: guideSchema,
  }),
};

export type Collection = keyof typeof collections;