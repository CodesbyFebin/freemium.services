import { z } from 'zod';

/**
 * Tool Schema for content collections
 * 
 * This schema defines the structure for tool entries in the Astro content collection.
 * All tools must have lastVerified and migrationStatus fields to be migration-ready.
 */

// License enum matching the source data
export const licenseSchema = z.enum([
  'MIT',
  'Apache 2.0',
  'GPL',
  'GPL-2.0',
  'GPL-3.0',
  'BSD',
  'BSD-3-Clause',
  'BSD-2-Clause',
  'Fair-code',
  'free',
  'freemium',
  'open-source',
  'Proprietary'
]);

// Migration status enum
export const migrationStatusSchema = z.enum([
  'source',        // Native source, no migration needed
  'v2-only',       // Only exists in V2 codebase, needs import
  'needs-sync',    // Exists in both, needs synchronization
  'migrated'       // Fully migrated to content collection
]);

// Primary evidence schema
export const primaryEvidenceSchema = z.object({
  documentation: z.string().url('Documentation URL must be valid'),
  pricing: z.string().url().optional(),
  licensing: z.string().url().optional(),
});

// FAQ schema
export const faqSchema = z.object({
  q: z.string().min(1, 'Question cannot be empty'),
  a: z.string().min(1, 'Answer cannot be empty'),
});

// Tool entry schema
export const toolSchema = z.object({
  // Core identification
  id: z.string().min(1, 'Tool ID is required'),
  name: z.string().min(1, 'Tool name is required'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  
  // Categorization
  category: z.string().min(1, 'Category is required'),
  emoji: z.string().optional(),
  
  // Metadata
  license: licenseSchema,
  stars: z.number().int().positive('Stars must be a positive integer'),
  
  // Migration requirements
  lastVerified: z
    .string()
    .datetime('lastVerified must be an ISO 8601 date string')
    .refine((val: string) => !isNaN(Date.parse(val)), {
      message: 'lastVerified must be a valid date'
    }),
  migrationStatus: migrationStatusSchema,
  
  // Evidence fields
  primaryEvidence: primaryEvidenceSchema.optional(),
  
  // Build information
  install: z.string().min(1, 'Install command is required'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  
  // Relationships
  alternatives: z.array(z.string()).optional(),
  
  // FAQ data
  faqs: z.array(faqSchema).optional(),
  
  // SEO/Open Graph
  ogImage: z.string().optional(),
});

export type ToolSchema = z.infer<typeof toolSchema>;
export type License = z.infer<typeof licenseSchema>;
export type MigrationStatus = z.infer<typeof migrationStatusSchema>;