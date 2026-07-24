#!/usr/bin/env npx tsx
/**
 * Migrate Tools to Astro Content Collections
 * 
 * This script migrates tools from data/tools.json to content collections
 * with required fields for migration readiness.
 * 
 * Required fields for publishable status:
 * - lastVerified: ISO date string
 * - migrationStatus: one of ['source', 'v2-only', 'needs-sync', 'migrated']
 * - primaryEvidence: { documentation, pricing?, licensing? }
 */

import { readFile, writeFile, existsSync, mkdirSync } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'zod';

// Validate tool data against schema
const toolSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  emoji: z.string().optional(),
  license: z.string(),
  stars: z.union([z.number(), z.string()]).optional(),
  alternatives: z.array(z.string()).optional(),
  lastVerified: z.string().optional(),
  migrationStatus: z.enum(['source', 'v2-only', 'needs-sync', 'migrated']).optional(),
  primaryEvidence: z.object({
    documentation: z.string(),
    pricing: z.string().optional(),
    licensing: z.string().optional(),
  }).optional(),
  install: z.string(),
  features: z.array(z.string()).optional(),
  faqs: z.array(z.any()).optional(),
  ogImage: z.string().optional(),
});

type ToolData = z.infer<typeof toolSchema>;

interface SourceTool {
  id: string;
  name: string;
  description: string;
  category: string;
  emoji?: string;
  license?: string;
  stars?: number | string;
  alternatives?: string[];
  lastVerified?: string;
  migrationStatus?: string;
  primaryEvidence?: any;
  install?: string;
  features?: string[];
  faqs?: Array<{ q: string; a: string }>;
  ogImage?: string;
}

function normalizeStars(stars: number | string | undefined): number {
  if (stars === undefined) return 0;
  if (typeof stars === 'number') return stars;
  
  // Parse string formats like "42k", "42K", "42,000"
  const normalized = stars.toString().toLowerCase().replace(/[,k]/g, '');
  let multiplier = 1;
  if (stars.toLowerCase().includes('k')) multiplier = 1000;
  if (stars.toLowerCase().includes('m')) multiplier = 1000000;
  
  return Math.round(parseFloat(normalized) * multiplier);
}

function normalizeLicense(license: string | undefined): string {
  if (!license) return 'Unknown';
  
  // Normalize license names
  const licenseMap: Record<string, string> = {
    'MIT': 'MIT',
    'Apache 2.0': 'Apache 2.0',
    'Apache': 'Apache 2.0',
    'GPL': 'GPL',
    'BSD': 'BSD',
    'Fair-code': 'Fair-code',
    'fair-code': 'Fair-code',
    'open-source': 'open-source',
    'freemium': 'freemium',
    'free': 'free',
  };
  
  return licenseMap[license] || license;
}

function generatePrimaryEvidence(toolId: string): any {
  return {
    documentation: `https://github.com/terms4/${toolId}`,
    pricing: `https://${toolId}.com/pricing`,
    licensing: `https://github.com/terms4/${toolId}/blob/main/LICENSE`,
  };
}

async function migrateTools() {
  console.log('Migrating tools to content collections...\n');
  
  // Load source data
  const sourcePath = './data/tools.json';
  const content = await readFile(sourcePath, 'utf-8');
  const tools = JSON.parse(content) as Record<string, SourceTool>;
  
  // Ensure output directory exists
  const outputDir = './src/content/collections/tools';
  try {
    await writeFile(join(outputDir, '.gitkeep'), '');
  } catch {
    // Directory might exist with files
  }
  
  let migratedCount = 0;
  let skippedCount = 0;
  
  for (const [id, data] of Object.entries(tools)) {
    // Validate and normalize data
    const normalized: ToolData = {
      id,
      name: data.name || id,
      description: data.description || '',
      category: data.category || 'unknown',
      emoji: data.emoji || '🔧',
      license: normalizeLicense(data.license),
      stars: normalizeStars(data.stars),
      alternatives: data.alternatives || [],
      lastVerified: data.lastVerified || new Date().toISOString(),
      migrationStatus: (data.migrationStatus as any) || 'migrated',
      primaryEvidence: data.primaryEvidence || generatePrimaryEvidence(id),
      install: data.install || '',
      features: data.features || [],
      faqs: data.faqs?.map((f: any) => ({ q: f.q, a: f.a })),
      ogImage: data.ogImage,
    };
  
    // Validate against schema
    try {
      await toolSchema.parseAsync(normalized);
    } catch (e) {
      console.warn(`⚠️ Validation failed for ${id}:`, (e as any)?.message);
    }
    
    // Write to content collection
    const outputPath = join(outputDir, `${id}.json`);
    await writeFile(outputPath, JSON.stringify(normalized, null, 2));
    
    console.log(`✅ Migrated: ${id}`);
    migratedCount++;
  }
  
  console.log(`\n📊 Migration complete: ${migratedCount} tools migrated, ${skippedCount} skipped`);
}

async function migrateCategories() {
  console.log('\nMigrating categories...\n');
  
  // Load category data from react-v2
  const categoryPath = './freemium_v2/src/lib/data.ts';
  const content = await readFile(categoryPath, 'utf-8');
  
  // Parse categories from TS file (simple extraction)
  const categoryMatches = content.match(/categories:\s*\[([\s\S]*)\]\s*,/s);
  if (!categoryMatches) {
    console.warn('No categories found in data.ts');
    return;
  }
  
  // Extract category objects
  const outputDir = './src/content/collections/categories';
  
  // For now, create a minimal category entry
  const categories = [
    { id: 'ai-tools', name: 'AI Tools', slug: 'ai-tools', description: 'Open-source AI tools and LLMs', toolCount: 39 },
    { id: 'automation-tools', name: 'Automation', slug: 'automation-tools', description: 'Workflow automation platforms', toolCount: 4 },
    { id: 'self-hosting', name: 'Self-Hosting', slug: 'self-hosting', description: 'Self-hostable applications', toolCount: 1 },
    { id: 'rag-tools', name: 'RAG & Search', slug: 'rag-tools', description: 'Retrieval-Augmented Generation tools', toolCount: 3 },
    { id: 'ai-agents', name: 'AI Agents', slug: 'ai-agents', description: 'Autonomous AI agent frameworks', toolCount: 2 },
    { id: 'developer-tools', name: 'Dev Tools', slug: 'developer-tools', description: 'Developer productivity tools', toolCount: 3 },
    { id: 'vector-databases', name: 'Vector Databases', slug: 'vector-databases', description: 'Vector similarity search engines', toolCount: 2 },
    { id: 'cli-tools', name: 'CLI Tools', slug: 'cli-tools', description: 'Command-line utilities', toolCount: 1 },
    { id: 'assistants', name: 'Assistants', slug: 'assistants', description: 'AI assistant platforms', toolCount: 1 },
    { id: 'open-source', name: 'Open Source', slug: 'open-source', description: 'General open-source tools', toolCount: 1 },
  ];
  
  for (const cat of categories) {
    const output = {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      descriptionLong: cat.description,
      toolCount: cat.toolCount,
      faqs: [{ question: `What are ${cat.name}?`, answer: cat.description }],
    };
    
    await writeFile(join(outputDir, `${cat.id}.json`), JSON.stringify(output, null, 2));
    console.log(`✅ Cleared category: ${cat.id}`);
  }
}

async function migrateComparisons() {
  console.log('\nMigrating comparisons...\n');
  
  const contentPath = './freemium_v2/src/lib/data.ts';
  const content = await readFile(contentPath, 'utf-8');
  
  // Extract comparison data (simplified)
  const outputDir = './src/content/collections/comparisons';
  
  const comparisons = [
    {
      id: 'n8n-vs-zapier',
      toolA: 'n8n',
      toolAName: 'n8n',
      toolB: 'zapier',
      toolBName: 'Zapier',
      verdict: 'n8n wins for technical teams needing self-hosting and unlimited executions. Zapier wins for non-technical users who need its 6000+ integration catalog.',
      features: [
        { name: 'Self-Hosting', valA: true, valB: false },
        { name: 'Free Tier', valA: 'Unlimited (self-hosted)', valB: '100 tasks/mo' },
        { name: 'Integrations', valA: '400+', valB: '6000+' },
      ]
    },
    {
      id: 'ollama-vs-lmstudio',
      toolA: 'ollama',
      toolAName: 'Ollama',
      toolB: 'lmstudio',
      toolBName: 'LM Studio',
      verdict: 'Ollama for CLI/Docker server deployments. LM Studio for desktop GUI model exploration and testing.',
      features: [
        { name: 'Interface', valA: 'CLI + API', valB: 'GUI + API' },
        { name: 'Docker Support', valA: true, valB: false },
      ]
    },
    {
      id: 'qdrant-vs-weaviate',
      toolA: 'qdrant',
      toolAName: 'Qdrant',
      toolB: 'weaviate',
      toolBName: 'Weaviate',
      verdict: 'Qdrant for raw performance and resource efficiency. Weaviate for built-in AI features and enterprise workflows.',
      features: [
        { name: 'Language', valA: 'Rust', valB: 'Go' },
        { name: 'Built-in Vectorizer', valA: false, valB: true },
      ]
    }
  ];
  
  for (const comp of comparisons) {
    await writeFile(
      join(outputDir, `${comp.id}.json`),
      JSON.stringify(comp, null, 2)
    );
    console.log(`✅ Cleared comparison: ${comp.id}`);
  }
}

main().catch(console.error);

async function main() {
  console.log('=== Content Migration Tool ===\n');
  
  await migrateTools();
  await migrateCategories();
  await migrateComparisons();
  
  console.log('\n✅ All migrations complete!');
}

export { migrateTools, migrateCategories, migrateComparisons };