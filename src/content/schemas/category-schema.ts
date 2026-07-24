import { z } from 'zod';

/**
 * Category Schema for content collections
 * 
 * Schema defines the structure for category pages with pillar content
 * and tool listings.
 */

// Category entry schema
export const categorySchema = z.object({
  // Core identification
  id: z.string().min(1, 'Category ID is required'),
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Category slug is required'),
  
  // Description
  description: z.string().min(50, 'Description must be at least 50 characters'),
  descriptionLong: z.string().min(200, 'Long description must be at least 200 characters'),
  
  // Metadata
  icon: z.string().optional(),
  toolCount: z.number().int().nonnegative('Tool count must be non-negative'),
  
  // FAQ data
  faqs: z.array(z.object({
    question: z.string().min(1, 'Question cannot be empty'),
    answer: z.string().min(1, 'Answer cannot be empty'),
  })).optional(),
});

// Comparison schema for comparison pages
export const comparisonSchema = z.object({
  // Core identification
  id: z.string().min(1, 'Comparison ID is required'),
  
  // Tool references
  toolA: z.string().min(1, 'Tool A ID is required'),
  toolAName: z.string().optional(),
  toolB: z.string().min(1, 'Tool B ID is required'),
  toolBName: z.string().optional(),
  
  // Comparison data
  verdict: z.string().min(50, 'Verdict must be descriptive'),
  features: z.array(z.object({
    name: z.string().min(1, 'Feature name is required'),
    valA: z.string().or(z.boolean()).or(z.number()),
    valB: z.string().or(z.boolean()).or(z.number()),
  })).min(1, 'At least one feature comparison is required'),
});

// Guide schema for knowledge hub and guides
export const guideSchema = z.object({
  // Core identification
  id: z.string().min(1, 'Guide ID is required'),
  
  // Content
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  
  // Metadata
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
export type ComparisonSchema = z.infer<typeof comparisonSchema>;
export type GuideSchema = z.infer<typeof guideSchema>;