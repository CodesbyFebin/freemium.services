#!/usr/bin/env npx tsx
/**
 * Sprint 0 URL Inventory Script
 * 
 * Crawls live site, sitemaps, and repository to catalog all URLs.
 * Usage: npx tsx scripts/inventory-urls.ts [--output path/to/file.json]
 */

import { readdir, readFile, writeFile, exists } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import { createHash } from 'node:crypto';
import { URL } from 'node:url';

const SITE_URL = 'https://www.freemium.services';

interface UrlRecord {
  sourceUrl: string;
  liveStatus: number | null;
  canonical: string;
  indexable: boolean;
  contentType: 'tool' | 'category' | 'comparison' | 'guide' | 'homepage' | 'knowledge' | 'sitemap' | 'unknown';
  language: 'en' | 'hi' | 'ml' | 'ta';
  sourceArchitecture: 'static-builder' | 'react-v2' | 'nextjs' | 'sitemap' | 'crawler' | 'manual';
  targetUrl?: string;
  migrationAction: 'preserve' | 'redirect' | 'merge' | 'noindex' | 'retire';
  contentHash?: string;
  lastChecked: string;
  validationStatus: 'pass' | 'fail' | 'pending';
}

/**
 * Extract content hash from file content
 */
function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex').substring(0, 16);
}

/**
 * Determine if URL is indexable (no robots directives)
 */
function isIndexable(url: string): boolean {
  const lower = url.toLowerCase();
  return !lower.includes('noindex') && !lower.includes('admin') && !lower.includes('login');
}

/**
 * Identify content type from URL pattern
 */
function identifyContentType(url: string): UrlRecord['contentType'] {
  if (url === '/' || url === '/index.html') return 'homepage';
  if (url.includes('/tools/') && !url.includes('/tools')) return 'tool';
  if (url.includes('/category/')) return 'category';
  if (url.includes('/compare/')) return 'comparison';
  if (url.includes('/knowledge') || url.includes('/docs')) return 'knowledge';
  if (url.includes('/guides/')) return 'guide';
  if (url.includes('sitemap')) return 'sitemap';
  return 'unknown';
}

/**
 * Extract language from URL
 */
function extractLanguage(url: string): UrlRecord['language'] {
  if (url.startsWith('/hi/')) return 'hi';
  if (url.startsWith('/ml/')) return 'ml';
  if (url.startsWith('/ta/')) return 'ta';
  return 'en';
}

/**
 * Generate redirect target for URL
 */
function generateTargetUrl(url: string): string {
  // Normalize trailing slash behavior
  let normalized = url;
  
  // Remove .html extension and ensure trailing slash
  normalized = normalized.replace(/\.html$/, '');
  if (!normalized.endsWith('/') && normalized !== '') {
    normalized += '/';
  }
  
  // Handle index.html -> /
  if (normalized === '/' || normalized === '/index/') {
    return '/';
  }
  
  return normalized;
}

/**
 * Parse current tools.json for source URLs
 */
async function parseToolsJson(basePath: string): Promise<UrlRecord[]> {
  const toolsPath = join(basePath, 'data', 'tools.json');
  const records: UrlRecord[] = [];
  
  try {
    const content = await readFile(toolsPath, 'utf-8');
    const tools = JSON.parse(content);
    
    for (const [id, tool] of Object.entries(tools as Record<string, any>)) {
      const sourceUrl = `/tools/${id}.html`;
      records.push({
        sourceUrl,
        liveStatus: null,
        canonical: `${SITE_URL}${generateTargetUrl(sourceUrl)}`,
        indexable: true,
        contentType: 'tool',
        language: 'en',
        sourceArchitecture: 'static-builder',
        targetUrl: generateTargetUrl(sourceUrl),
        migrationAction: 'redirect',
        lastChecked: new Date().toISOString().split('T')[0],
        validationStatus: 'pending'
      });
    }
  } catch (e) {
    console.error('Failed to parse tools.json:', e);
  }
  
  return records;
}

/**
 * Parse React V2 data for additional tools
 */
async function parseReactV2Data(basePath: string): Promise<UrlRecord[]> {
  const dataPath = join(basePath, 'freemium_v2', 'src', 'lib', 'data.ts');
  const records: UrlRecord[] = [];
  
  try {
    const content = await readFile(dataPath, 'utf-8');
    
    // Extract tool IDs from the TOOLS array
    const toolIdPattern = /id:\s*['"]([^'"]+)['"]/g;
    let match;
    const toolIds = new Set<string>();
    
    while ((match = toolIdPattern.exec(content)) !== null) {
      toolIds.add(match[1]);
    }
    
    // Also check for tool definitions
    const toolImportPattern = /(ollama|dify|n8n|open-webui|qdrant|weaviate|claude-code|zed|anythingllm|perplexica|marimo|activepieces|coolify|ripgrep|supabase|auto-gpt)/g;
    let importMatch;
    
    while ((importMatch = toolImportPattern.exec(content)) !== null) {
      toolIds.add(importMatch[1]);
    }
    
    for (const id of toolIds) {
      const sourceUrl = `/tools/${id}`;
      const existing = records.find(r => r.sourceUrl === sourceUrl);
      if (!existing) {
        records.push({
          sourceUrl,
          liveStatus: null,
          canonical: `${SITE_URL}${generateTargetUrl(sourceUrl)}`,
          indexable: true,
          contentType: 'tool',
          language: 'en',
          sourceArchitecture: 'react-v2',
          targetUrl: generateTargetUrl(sourceUrl),
          migrationAction: sourceUrl.includes('.html') ? 'redirect' : 'preserve',
          lastChecked: new Date().toISOString().split('T')[0],
          validationStatus: 'pending'
        });
      }
    }
  } catch (e) {
    console.error('Failed to parse React V2 data:', e);
  }
  
  return records;
}

/**
 * Parse sitemaps for URLs
 */
async function parseSitemaps(basePath: string): Promise<UrlRecord[]> {
  const sitemapDir = basePath;
  const records: UrlRecord[] = [];
  
  const sitemapFiles = ['sitemap.xml', 'sitemap-tools.xml', 'sitemap-categories.xml', 
                       'sitemap-knowledge.xml', 'sitemap-comparisons.xml'];
  
  for (const file of sitemapFiles) {
    const filePath = join(sitemapDir, file);
    try {
      const content = await readFile(filePath, 'utf-8');
      
      // Extract URLs from sitemap XML
      const urlPattern = /<loc>([^<]+)<\/loc>/g;
      let match;
      
      while ((match = urlPattern.exec(content)) !== null) {
        const url = match[1];
        const urlPath = url.replace(SITE_URL, '');
        
        if (urlPath && !records.some(r => r.sourceUrl === urlPath)) {
          records.push({
            sourceUrl: urlPath,
            liveStatus: null,
            canonical: url,
            indexable: true,
            contentType: 'sitemap',
            language: 'en',
            sourceArchitecture: 'sitemap',
            targetUrl: generateTargetUrl(urlPath),
            migrationAction: 'preserve',
            lastChecked: new Date().toISOString().split('T')[0],
            validationStatus: 'pending'
          });
        }
      }
    } catch (e) {
      console.error(`Failed to parse ${file}:`, e);
    }
  }
  
  return records;
}

/**
 * Parse repository for category pages
 */
async function parseCategories(basePath: string): Promise<UrlRecord[]> {
  const categories: UrlRecord[] = [];
  
  // Read categories from builder.js typically
  try {
    const builderContent = await readFile(join(basePath, 'builder.js'), 'utf-8');
    
    // Extract category definitions
    const categoryPattern = /(['"])([a-z-]+)\1:\s*\{[^}]*name:\s*['"]([^'"]+)/g;
    let match;
    
    while ((match = categoryPattern.exec(builderContent)) !== null) {
      const slug = match[2];
      const name = match[3];
      
      categories.push({
        sourceUrl: `/category/${slug}.html`,
        liveStatus: null,
        canonical: `${SITE_URL}/categories/${slug}/`,
        indexable: true,
        contentType: 'category',
        language: 'en',
        sourceArchitecture: 'static-builder',
        targetUrl: `/categories/${slug}/`,
        migrationAction: 'redirect',
        lastChecked: new Date().toISOString().split('T')[0],
        validationStatus: 'pending'
      });
    }
  } catch (e) {
    console.error('Failed to parse categories from builder.js:', e);
  }
  
  return categories;
}

/**
 * Generate full inventory
 */
async function generateInventory(basePath: string): Promise<UrlRecord[]> {
  console.log('Scanning repository for URLs...');
  
  const allRecords: UrlRecord[] = [];
  
  // Parse tools from JSON
  console.log('Parsing tools.json...');
  const tools = await parseToolsJson(basePath);
  allRecords.push(...tools);
  
  // Parse React V2
  console.log('Parsing React V2 data...');
  const reactV2 = await parseReactV2Data(basePath);
  // Merge, preferring existing records
  for (const record of reactV2) {
    const existing = allRecords.find(r => r.sourceUrl === record.sourceUrl);
    if (!existing) {
      allRecords.push(record);
    }
  }
  
  // Parse sitemaps
  console.log('Parsing sitemaps...');
  const sitemaps = await parseSitemaps(basePath);
  for (const record of sitemaps) {
    const existing = allRecords.find(r => r.sourceUrl === record.sourceUrl);
    if (!existing) {
      allRecords.push(record);
    }
  }
  
  // Parse categories
  console.log('Parsing categories...');
  const categories = await parseCategories(basePath);
  for (const record of categories) {
    const existing = allRecords.find(r => r.sourceUrl === record.sourceUrl);
    if (!existing) {
      allRecords.push(record);
    }
  }
  
  return allRecords;
}

/**
 * Main execution
 */
async function main() {
  const basePath = process.cwd();
  const outputPath = process.argv.includes('--output') 
    ? process.argv[process.argv.indexOf('--output') + 1]
    : join(basePath, 'data', 'migration', 'url-inventory.json');
  
  console.log('Generating URL inventory...');
  
  const inventory = await generateInventory(basePath);
  
  const output = {
    metadata: {
      generatedAt: new Date().toISOString(),
      sourcePath: basePath,
      totalUrls: inventory.length,
      contentTypeBreakdown: {
        tools: inventory.filter(r => r.contentType === 'tool').length,
        categories: inventory.filter(r => r.contentType === 'category').length,
        comparisons: inventory.filter(r => r.contentType === 'comparison').length,
        knowledge: inventory.filter(r => r.contentType === 'knowledge').length,
        other: inventory.filter(r => ['homepage', 'guide', 'sitemap'].includes(r.contentType)).length,
      }
    },
    urls: inventory
  };
  
  await writeFile(outputPath, JSON.stringify(output, null, 2));
  console.log(`Inventory complete: ${inventory.length} URLs written to ${outputPath}`);
}

main().catch(console.error);