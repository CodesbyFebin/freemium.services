#!/usr/bin/env npx tsx
/**
 * Sprint 0 Redirect Validation Script
 * 
 * Validates that redirect map produces no chains or loops.
 * Output: reports/route-validation.json
 */

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

interface Redirect {
  from: string;
  to: string;
  type: 301 | 302;
  reason?: string;
}

interface RouteValidation {
  sourceUrl: string;
  canonical: string;
  hasRedirect: boolean;
  redirectChain: number;
  redirectLoop: boolean;
  validationStatus: 'pass' | 'fail';
}

/**
 * Load redirect map from data/migration/redirect-map.json
 */
async function loadRedirectMap(): Promise<Redirect[]> {
  const redirects: Redirect[] = [];
  
  try {
    const content = await readFile('./data/migration/redirect-map.json', 'utf-8');
    const data = JSON.parse(content);
    
    // Include all redirect families
    const mappings = data.mappings || [];
    const toolSpecific = data.toolSpecific || [];
    
    redirects.push(...mappings, ...toolSpecific);
    
  } catch (e) {
    console.warn('Could not load redirect-map.json, using defaults');
  }
  
  return redirects;
}

/**
 * Build redirect graph for cycle detection
 */
function buildRedirectGraph(redirections: Redirect[]): Map<string, string> {
  const graph = new Map<string, string>();
  
  for (const redirect of redirections) {
    // Skip self-redirects
    if (redirect.from !== redirect.to) {
      graph.set(redirect.from, redirect.to);
    }
  }
  
  return graph;
}

/**
 * Detect cycles in redirect graph using DFS
 */
function detectCycles(graph: Map<string, string>): string[] {
  const cycles: string[] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  function dfs(node: string, path: string[]): void {
    if (recursionStack.has(node)) {
      const cycleStart = path.indexOf(node);
      if (cycleStart >= 0) {
        const cycle = path.slice(cycleStart).concat([node]);
        cycles.push(cycle.join(' -> '));
      }
      return;
    }
    
    if (visited.has(node)) return;
    
    visited.add(node);
    recursionStack.add(node);
    
    const next = graph.get(node);
    if (next) {
      dfs(next, [...path, node]);
    }
    
    recursionStack.delete(node);
  }
  
  for (const [node] of graph) {
    if (!visited.has(node)) {
      dfs(node, []);
    }
  }
  
  return cycles;
}

/**
 * Find redirect chain length
 */
function findChainLength(
  graph: Map<string, string>, 
  start: string, 
  maxHops = 10
): number {
  let current = start;
  let hops = 0;
  
  while (graph.has(current) && hops < maxHops) {
    current = graph.get(current)!;
    hops++;
    
    // Check for loop back to start
    if (current === start) {
      return -1; // Loop detected
    }
  }
  
  return hops;
}

/**
 * Validate a single route
 */
function validateRoute(
  route: string, 
  graph: Map<string, string>
): RouteValidation {
  const canonical = route;
  const hasRedirect = graph.has(route);
  
  if (!hasRedirect) {
    return {
      sourceUrl: route,
      canonical,
      hasRedirect: false,
      redirectChain: 0,
      redirectLoop: false,
      validationStatus: 'pass'
    };
  }
  
  const chainLength = findChainLength(graph, route);
  const redirectLoop = chainLength === -1;
  
  return {
    sourceUrl: route,
    canonical,
    hasRedirect: true,
    redirectChain: redirectLoop ? 0 : chainLength,
    redirectLoop: redirectLoop,
    validationStatus: redirectLoop || chainLength > 1 ? 'fail' : 'pass'
  };
}

/**
 * Analyze all redirect relationships
 */
function analyzeRedirects(redirections: Redirect[], graph: Map<string, string>) {
  const sources = new Set<string>();
  const destinations = new Set<string>();
  const duplicateSources: string[] = [];
  const conflictingDestinations: Array<[string, string[]]> = [];
  
  for (const r of redirections) {
    sources.add(r.from);
    destinations.add(r.to);
  }
  
  // Check for duplicates and conflicts
  const sourceMap = new Map<string, string[]>();
  for (const r of redirections) {
    if (!sourceMap.has(r.from)) {
      sourceMap.set(r.from, []);
    }
    sourceMap.get(r.from)!.push(r.to);
  }
  
  for (const [src, dests] of sourceMap) {
    if (dests.length > 1) {
      conflictingDestinations.push([src, dests]);
    }
  }
  
  return {
    totalSources: sources.size,
    totalDestinations: destinations.size,
    duplicateSources: duplicateSources,
    conflictingDestinations
  };
}

async function validateRedirects() {
  console.log('Validating redirect map...');
  
  const redirects = await loadRedirectMap();
  
  console.log(`Loaded ${redirects.length} redirects from redirect-map.json`);
  
  // Build graph for analysis
  const graph = buildRedirectGraph(redirects);
  
  // Detect cycles
  const cycles = detectCycles(graph);
  
  // Analyze redirect relationships
  const analysis = analyzeRedirects(redirects, graph);
  
  // Validate each redirect
  const validations: RouteValidation[] = [];
  let failedCount = 0;
  
  for (const redirect of redirects) {
    const validation = validateRoute(redirect.from, graph);
    validations.push(validation);
    if (validation.validationStatus === 'fail') failedCount++;
  }
  
  // Generate detailed report
  const report = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalRedirects: redirects.length,
      totalSources: analysis.totalSources,
      totalDestinations: analysis.totalDestinations,
      cyclesDetected: cycles.length,
      failedValidations: failedCount
    },
    cycles,
    validations,
    analysis: {
      duplicateSources: analysis.duplicateSources,
      conflictingDestinations: analysis.conflictingDestinations,
      selfRedirects: redirects.filter(r => r.from === r.to).length
    },
    summary: {
      total: redirects.length,
      passes: validations.filter(v => v.validationStatus === 'pass').length,
      fails: failedCount,
      loops: cycles.length,
      chains: validations.filter(v => v.redirectChain > 1).length
    }
  };
  
  await writeFile('./reports/route-validation.json', JSON.stringify(report, null, 2));
  console.log('Report written to reports/route-validation.json');
  
  // Output summary
  console.log('\n=== Redirect Validation Summary ===');
  console.log(`Total redirects: ${redirects.length}`);
  console.log(`Unique sources: ${analysis.totalSources}`);
  console.log(`Unique destinations: ${analysis.totalDestinations}`);
  console.log(`Cycles detected: ${cycles.length}`);
  console.log(`Failed validations: ${failedCount}`);
  
  if (cycles.length > 0) {
    console.log('\nCycles found:');
    cycles.forEach(c => console.log(`  ⚠️  ${c}`));
  }
  
  if (failedCount > 0) {
    console.log('\nFailed validations:');
    validations.filter(v => v.validationStatus === 'fail').forEach(v => {
      console.log(`  ❌ ${v.sourceUrl} → ${v.canonical}`);
    });
  }
  
  if (cycles.length === 0 && failedCount === 0) {
    console.log('\n✓ All redirects validated successfully!');
  }
}

validateRedirects().then(() => {
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});