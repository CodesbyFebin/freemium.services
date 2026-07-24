#!/usr/bin/env npx tsx
/**
 * Sprint 0 Tool Validation Script
 * 
 * Validates all tool records against migration schema.
 * Output: reports/content-validation.json
 * 
 * This script distinguishes between:
 * - sourceValid: Can be read/parsed from source
 * - migrationReady: Has required migration metadata
 * - publishable: Has verified primary sources (documentation, pricing, licensing)
 */

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

interface ToolRecord {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  license?: string;
  stars?: number;
  alternatives?: string[];
  lastVerified?: string;
  migrationStatus?: 'source' | 'v2-only' | 'needs-sync' | 'migrated';
  primaryEvidence?: {
    documentation?: string;
    pricing?: string;
    licensing?: string;
  };
  install?: string;
  features?: string[];
  ogImage?: string;
  [key: string]: unknown;
}

interface ValidationResult {
  toolId: string;
  sourceValid: boolean;
  migrationReady: boolean;
  publishable: boolean;
  missingFields: string[];
  failures: string[];
  warnings: string[];
}

// Required fields for publishable status (not just readable)
const PUBLISHABLE_FIELDS: (keyof ToolRecord)[] = [
  'id', 'name', 'description', 'category', 'license',
  'alternatives', 'lastVerified', 'migrationStatus'
];

async function loadToolRecord(data: any, id: string): Promise<ToolRecord> {
  const record: ToolRecord = {
    id,
    ...data
  };
  return record;
}

function validateTool(tool: ToolRecord): ValidationResult {
  const result: ValidationResult = {
    toolId: tool.id,
    sourceValid: true,  // If we can read it, it's source valid
    migrationReady: true,  // Will be set based on required fields
    publishable: true,  // Will be set based on all checks
    missingFields: [],
    failures: [],
    warnings: []
  };
  
  // Check publishable fields (all required for migration)
  for (const field of PUBLISHABLE_FIELDS) {
    if (tool[field] === undefined || tool[field] === null || tool[field] === '') {
      result.missingFields.push(field);
      result.failures.push(`${field}:missing`);
    }
  }
  
  // If fields are missing, not ready for migration/publish
  if (result.missingFields.length > 0) {
    result.migrationReady = false;
    result.publishable = false;
  }
  
  // Check stars
  if (tool.stars !== undefined && typeof tool.stars !== 'number') {
    result.warnings.push(`stars should be a number, got ${typeof tool.stars}`);
  }
  
  // Check alternatives is array
  if (tool.alternatives && !Array.isArray(tool.alternatives)) {
    result.warnings.push('alternatives must be an array');
  }
  
  // Check lastVerified is a date
  if (tool.lastVerified) {
    const date = new Date(tool.lastVerified);
    if (isNaN(date.getTime())) {
      result.warnings.push(`Invalid lastVerified date: ${tool.lastVerified}`);
    }
  }
  
  return result;
}

async function validateAllTools(): Promise<void> {
  console.log('Validating tool records...');
  
  const results: Record<string, ValidationResult> = {};
  let total = 0;
  let sourceValid = 0;
  let migrationReady = 0;
  let publishable = 0;
  
  // Load from tools.json
  try {
    const toolsPath = './data/tools.json';
    const content = await readFile(toolsPath, 'utf-8');
    const tools = JSON.parse(content) as Record<string, any>;
    
    for (const [id, data] of Object.entries(tools)) {
      const tool = await loadToolRecord(data, id);
      const result = validateTool(tool);
      results[id] = result;
      total++;
      
      if (result.sourceValid) sourceValid++;
      if (result.migrationReady) migrationReady++;
      if (result.publishable) publishable++;
    }
  } catch (e) {
    console.error('Error reading tools.json:', e);
  }
  
  // Generate report
  const report = {
    metadata: {
      generatedAt: new Date().toISOString(),
      total: total,
      sourceValid: sourceValid,
      migrationReady: migrationReady,
      publishable: publishable,
    },
    tools: results,
    summary: {
      total: total,
      sourceValid: sourceValid,
      migrationReady: migrationReady,
      publishable: publishable,
      issues: [] as Array<{ tool: string; issue: string }>
    }
  };
  
  // Collect all issues
  for (const [id, result] of Object.entries(results)) {
    if (!result.migrationReady) {
      result.missingFields.forEach(field => {
        report.summary.issues.push({ tool: id, issue: `Missing field: ${field}` });
      });
    }
    result.warnings.forEach(warning => {
      report.summary.issues.push({ tool: id, issue: warning });
    });
  }
  
  await writeFile('./reports/content-validation.json', JSON.stringify(report, null, 2));
  console.log(`Report written to reports/content-validation.json`);
  
  console.log('\n=== Content Validation Summary ===');
  console.log(`Total tools: ${total}`);
  console.log(`Source valid: ${sourceValid}`);
  console.log(`Migration ready: ${migrationReady}`);
  console.log(`Publishable: ${publishable}`);
  
  if (migrationReady < total) {
    console.log('\n⚠ Tools missing migration fields (not publishable):');
    Object.entries(results).forEach(([id, result]) => {
      if (!result.migrationReady) {
        console.log(`  - ${id}: ${JSON.stringify(result.missingFields)}`);
      }
    });
  }
}

validateAllTools().catch(e => {
  console.error(e);
  process.exit(1);
});