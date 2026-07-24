#!/usr/bin/env npx tsx
/**
 * Sprint 0 Sitemap Verification Script
 * 
 * Validates sitemap health and classification.
 * Output: reports/sitemap-inventory.json
 */

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

interface SitemapInfo {
  file: string;
  status: 'active' | 'empty' | 'stale' | 'invalid';
  urlCount: number;
  sizeBytes: number;
  hasUrls: boolean;
  urls: string[];
}

async function parseSitemap(content: string, filename: string): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  const urlPattern = /<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?(?:\s*<changefreq>([^<]+)<\/changefreq>)?(?:\s*<priority>([^<]+)<\/priority>)?\s*<\/url>/gi;
  
  let match;
  while ((match = urlPattern.exec(content)) !== null) {
    entries.push({
      loc: match[1],
      lastmod: match[2] || undefined,
      changefreq: match[3] || undefined,
      priority: match[4] || undefined
    });
  }
  
  return entries;
}

async function classifySitemap(filePath: string, basePath: string): Promise<SitemapInfo> {
  const filename = filePath.split('/').pop() || 'unknown';
  const relativePath = filePath.replace(basePath + '/', '');
  
  try {
    const content = await readFile(filePath, 'utf-8');
    const sizeBytes = content.length;
    
    // Check if it's a valid sitemap
    if (!content.includes('<urlset') && !content.includes('<sitemapindex')) {
      return {
        file: relativePath,
        status: 'invalid',
        urlCount: 0,
        sizeBytes,
        hasUrls: false,
        urls: []
      };
    }
    
    const urls = await parseSitemap(content, filename);
    
    let status: 'active' | 'empty' | 'stale' | 'invalid' = 'empty';
    if (urls.length > 0) status = 'active';
    
    // Check for stale content (old dates)
    if (urls.length > 0) {
      const now = new Date();
      const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      const stale = urls.some(u => {
        if (u.lastmod) {
          return new Date(u.lastmod) < oneYearAgo;
        }
        return false;
      });
      
      if (stale && urls.length < 5) {
        status = 'stale';
      }
    }
    
    return {
      file: relativePath,
      status,
      urlCount: urls.length,
      sizeBytes,
      hasUrls: urls.length > 0,
      urls: urls.slice(0, 10) // First 10 URLs for reference
    };
  } catch (e) {
    return {
      file: relativePath,
      status: 'invalid',
      urlCount: 0,
      sizeBytes: 0,
      hasUrls: false,
      urls: []
    };
  }
}

async function main() {
  console.log('Verifying sitemaps...');
  
  const sitemapFiles: SitemapInfo[] = [];
  const sitemapDir = '.';
  
  try {
    const files = await readdir(sitemapDir);
    const sitemapPattern = /^sitemap/;
    
    for (const file of files) {
      if (sitemapPattern.test(file) && file.endsWith('.xml')) {
        const filePath = join(sitemapDir, file);
        console.log(`Analyzing ${file}...`);
        const info = await classifySitemap(filePath, sitemapDir);
        sitemapFiles.push(info);
      }
    }
  } catch (e) {
    console.error('Error reading sitemap files:', e);
  }
  
  // Determine overall status
  const totalUrls = sitemapFiles.reduce((sum, s) => sum + s.urlCount, 0);
  const activeSitemaps = sitemapFiles.filter(s => s.status === 'active').length;
  const inactiveSitemaps = sitemapFiles.filter(s => s.status === 'empty').length;
  const staleSitemaps = sitemapFiles.filter(s => s.status === 'stale').length;
  const invalidSitemaps = sitemapFiles.filter(s => s.status === 'invalid').length;
  
  const report = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalSitemaps: sitemapFiles.length,
      totalUrls,
      active: activeSitemaps,
      empty: inactiveSitemaps,
      stale: staleSitemaps,
      invalid: invalidSitemaps
    },
    sitemaps: sitemapFiles,
    classification: {} as Record<string, string[]>,
    recommendations: [] as string[]
  };
  
  // Group by status
  for (const sitemap of sitemapFiles) {
    report.classification[sitemap.status] = report.classification[sitemap.status] || [];
    report.classification[sitemap.status].push(sitemap.file);
  }
  
  // Generate recommendations
  if (invalidSitemaps > 0) {
    report.recommendations.push(`Remove ${invalidSitemaps} invalid sitemap(s)`);
  }
  if (staleSitemaps > 0) {
    report.recommendations.push(`Review ${staleSitemaps} stale sitemap(s) - may need removal`);
  }
  if (inactiveSitemaps > 3) {
    report.recommendations.push(`Consider removing ${inactiveSitemaps} empty sitemaps`);
  }
  
  await writeFile('./reports/sitemap-inventory.json', JSON.stringify(report, null, 2));
  console.log('Report written to reports/sitemap-inventory.json');
  
  console.log('\n=== Sitemap Verification Summary ===');
  console.log(`Total sitemaps: ${sitemapFiles.length}`);
  console.log(`Active: ${activeSitemaps}`);
  console.log(`Empty: ${inactiveSitemaps}`);
  console.log(`Stale: ${staleSitemaps}`);
  console.log(`Invalid: ${invalidSitemaps}`);
  console.log(`Total URLs: ${totalUrls}`);
  
  if (report.recommendations.length > 0) {
    console.log('\nRecommendations:');
    report.recommendations.forEach(r => console.log(`  • ${r}`));
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});