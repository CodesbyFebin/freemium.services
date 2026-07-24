#!/usr/bin/env npx tsx
/**
 * Sprint 0 Claims Audit Script
 * 
 * Alternative implementation: This script delegates to Python for efficient
 * claim extraction and analysis. See scripts/audit-claims.py for full
 * implementation.
 * 
 * Original TypeScript implementation failed with memory exhaustion due to
 * recursive directory scanning. The Python version uses streaming JSON
 * parsing and targeted file scanning.
 * 
 * Output: reports/claim-audit.json
 */

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

async function main() {
  console.log('Running claim audit (delegating to Python for efficiency)...');
  
  try {
    const { stdout, stderr } = await execAsync(
      'python3 scripts/audit-claims.py',
      { cwd: process.cwd() }
    );
    
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (e) {
    console.error('Claim audit failed:', e);
    process.exit(1);
  }
}

main();