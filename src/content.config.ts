import { defineCollection } from 'astro:content';

// For Astro 7, collections are loaded from the console directory automatically
// We need to define schemas but also provide loaders

// Simple schemas for validation
import { z } from 'zod';

export const toolSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  emoji: z.string().optional(),
  license: z.string(),
  stars: z.number().optional(),
  alternatives: z.array(z.string()).optional(),
  lastVerified: z.string(),
  migrationStatus: z.enum(['source', 'v2-only', 'needs-sync', 'migrated']),
  primaryEvidence: z.object({
    documentation: z.string(),
    pricing: z.string().optional(),
    licensing: z.string().optional(),
  }).optional(),
  install: z.string(),
  features: z.array(z.string()),
  faqs: z.array(z.object({
    q: z.string(),
    a: z.string()
  })).optional(),
  ogImage: z.string().optional(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  descriptionLong: z.string(),
  toolCount: z.number(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional(),
});

export const comparisonSchema = z.object({
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

export const guideSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// Export collections - Astro will auto-discover from the collections directory
export const collections = {
  tools: defineCollection({ schema: toolSchema }),
  categories: defineCollection({ schema: categorySchema }),
  comparisons: defineCollection({ schema: comparisonSchema }),
  guides: defineCollection({ schema: guideSchema }),
};

export type Collection = keyof typeof collections;