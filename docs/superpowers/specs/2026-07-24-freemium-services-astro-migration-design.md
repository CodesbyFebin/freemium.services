# Freemium.Services Astro Migration — Sprint 0 Design Document

**Date:** 2026-07-24  
**Version:** 1.0  
**Author:** ZCode Agent  

## Executive Summary

This document outlines the architectural migration plan for Freemium.Services from its current state (three competing architectures) to Astro 6 with content collections and React islands. The migration will follow a sprint-based approach with validation gates, preserving the working production site until the new architecture reaches full parity.

---

## Current State Analysis

### Three Competing Architectures

| Architecture | Location | Status | Purpose |
|-------------|----------|--------|---------|
| Static Builder | `builder.js` | **Production** | Generates static HTML to `public/` |
| React/Vite App | `freemium_v2/` | **Inactive** | Richer React app, client-side Anthropic calls |
| Next.js App | `apps/web/` | **Skeleton** | Nearly empty, references packages not fully built |

### Critical Issues

1. **Security Vulnerability**: `freemium_v2/src/App.tsx` contains direct client-side Anthropic API calls (lines 579-596), requiring browser exposure of credentials
2. **Data Drift**: 12 tools in `data/tools.json` vs 34 tools in `freemium_v2/src/lib/data.ts`
3. **URL Drift**: Static site uses `.html` extensions; Vercel has `cleanUrls: true`; V2 uses clean URLs
4. **Test Configuration**: `builder.test.js` imports `../builder` but file is at repo root
5. **Documentation**: README is a GitLab template, not project documentation

---

## Architecture Decision Log

### Chosen Approach: Parallel Track Migration (Approach 2)

**Rationale:**
- Production site remains live and functional throughout migration
- Each feature can be validated independently
- Rollback is trivial - keep the old site running
- Enables deployable vertical slices after every sprint

---

## Sprint 0: Baseline and Safety

### Goals
1. Inventory every live and generated URL
2. Record current titles, canonicals, status codes and indexable pages
3. Establish the clean URL contract for Astro
4. Create the complete legacy redirect map
5. Identify the authoritative record for every existing tool
6. Freeze unsupported page generation
7. Add implementation tracker and validation report

### Deliverables

#### 1. Project Structure

```text
docs/migration/
├── CURRENT-ARCHITECTURE.md        # Analysis of all three architectures
├── URL-CONTRACT.md               # Clean URL schema for Astro
├── CONTENT-SOURCE-OF-TRUTH.md    # Tool data reconciliation strategy
├── SECURITY-FINDINGS.md          # Client-side API issue documentation
└── CUTOVER-RUNBOOK.md            # Production migration checklist

data/migration/
├── url-inventory.json            # Full URL catalog from crawler + manual
├── redirect-map.json             # Explicit redirect mappings
├── tool-source-map.json          # Source resolution for each tool
└── sitemap-inventory.json        # Classification of all sitemaps

reports/
├── sprint-0-baseline.json        # Overall sprint metrics
├── route-validation.json         # URL mapping validation results
├── content-validation.json       # Tool data validation results
└── claim-audit.json              # Public claims vs actual data

scripts/
├── inventory-urls.ts             # Automated URL crawler
├── audit-claims.ts               # Generate claims audit report
├── validate-redirects.ts         # Test redirect map integrity
├── validate-tools.ts             # Validate tool record schema
└── verify-sitemaps.ts          # Sitemap health check

PROJECT-TRACKER.md                # Sprint-by-sprint implementation tracker

```

### Technical Implementation

#### 1. URL Inventory Script (`scripts/inventory-urls.ts`)

```typescript
#!/usr/bin/env npx tsx
/**
 * Sprint 0 URL Inventory Script
 * 
 * Crawls live site, sitemaps, and repository to catalog all URLs.
 * Merges with manual reconciliation for complete accuracy.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { glob } from 'node:glob';

interface UrlRecord {
  sourceUrl: string;
  liveStatus: number;
  canonical: string;
  indexable: boolean;
  contentType: 'tool' | 'category' | 'comparison' | 'guide' | 'homepage' | 'other';
  language: 'en' | 'hi' | 'ml' | 'ta';
  sourceArchitecture: 'static-builder' | 'react-v2' | 'nextjs' | 'manual';
  targetUrl?: string;
  migrationAction: 'preserve' | 'redirect' | 'merge' | 'noindex' | 'retire';
  contentHash?: string;
  lastChecked: string;
  validationStatus: 'pass' | 'fail' | 'pending';
}

async function crawlSite(url: string): Promise<UrlRecord[]> {
  // Implementation: use playwright or simple HTTP fetch
  // Parse links, check status codes, extract canonicals
  return [];
}

async function parseSitemaps(): Promise<UrlRecord[]> {
  // Read all sitemap XML files
  // Extract URLs and metadata
  return [];
}

async function parseRepository(): Promise<UrlRecord[]> {
  // Scan data/ directory for tool records
  // Parse builder.js for URL patterns
  // Extract route definitions from code
  return [];
}
```

#### 2. Clean URL Contract (`docs/migration/URL-CONTRACT.md`)

**New URL Structure:**

```
https://freemium.services/
├── /                                  (homepage)
├── /tools/                            
│   └── /tools/ollama/                 (was /tools/ollama.html)
│   └── /tools/n8n/
├── /categories/
│   └── /categories/ai-tools/          (was /category/ai-tools.html)
│   └── /categories/automation-tools/
├── /compare/
│   └── /compare/ollama-vs-lm-studio/   
├── /knowledge-hub/                    (was /knowledge-hub.html)
├── /guides/
│   └── /guides/self-host-n8n/
├── /licenses/
│   └── /licenses/agpl-3/
└── /about/
```

**URL Transformation Rules:**

| Source Pattern | Target Pattern | Action |
|---------------|----------------|--------|
| `/tools/:id.html` | `/tools/:id/` | 301 Redirect |
| `/category/:id.html` | `/categories/:id/` | 301 Redirect |
| `/knowledge-hub.html` | `/knowledge-hub/` | 301 Redirect |
| `/compare/:a-vs-b.html` | `/compare/:a-vs-b/` | 301 Redirect |
| `/index.html` | `/` | 301 Redirect |

#### 3. Redirect Map Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Migration Redirect Map",
  "type": "object",
  "properties": {
    "mappings": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["from", "to", "type"],
        "properties": {
          "from": { "type": "string" },
          "to": { "type": "string" },
          "type": { "enum": ["301", "302", "canonical"] },
          "reason": { "type": "string" },
          "validationStatus": { "enum": ["pending", "validated", "broken"] }
        }
      }
    }
  }
}
```

#### 4. Tool Source Map Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Tool Source Resolution",
  "type": "object",
  "properties": {
    "tools": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "decisions"],
        "properties": {
          "id": { "type": "string" },
          "sources": {
            "type": "array",
            "items": { "type": "string" }
          },
          "canonicalRecord": { "type": "string" },
          "decisions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "field": { "type": "string" },
                "chosenSource": { "type": "string" },
                "reason": { "type": "string" }
              }
            }
          }
        }
      }
    }
  }
}
```

#### 5. Claims Audit Script (`scripts/audit-claims.ts`)

```typescript
#!/usr/bin/env npx tsx
/**
 * Sprint 0 Claims Audit
 * 
 * Finds all public numerical claims and validates against actual data.
 */

const CLAIMS_TO_FIND = [
  /(\d+(?:\.\d+)?)\s*\+\s*tools?/i,
  /(\d+(?:\.\d+)?)\s*tool[s]?/i,
  /(\d+(?:\.\d+)?)\s*categories?/i,
  /(\d+(?:\.\d+)?)\s*databases?/i,
  /(\d+(?:\.\d+)?)\s*integrations?/i,
  /(\d+(?:\.\d+)?)\s*star[s]?/i,
];

interface Claim {
  text: string;
  location: string;
  file: string;
  value: number;
  unit: string;
  validationStatus: 'valid' | 'invalid' | 'unverifiable';
  actualValue?: number;
  evidence?: string;
}

export async function auditClaims() {
  const claims: Claim[] = [];
  
  // Search in source files
  const sourceFiles = await glob(['src/**/*.ts', 'src/**/*.tsx', 'data/**/*.json']);
  
  // Check public claims
  const publicFiles = await glob(['public/**/*.html', 'index.html']);
  
  return claims;
}
```

---

## Sprint 0 Validation Gate

### Pass Criteria

Sprint 0 passes if and only if:

1. **URL Coverage**: Every discoverable live URL has a recorded status in `url-inventory.json`

2. **Migration Decision**: Every existing route has one of: `preserve`, `redirect`, `merge`, `noindex`, or `retire` decision

3. **Redirect Integrity**: Redirect chains = 0, redirect loops = 0, all explicit mappings test successfully

4. **Claims Accuracy**: Every published numerical claim has evidence or has been added to `claim-audit.json` as needing correction

5. **Tool Authority**: Every public tool maps to one proposed canonical record in `tool-source-map.json`

6. **Sitemap Classification**: All sitemap files classified as `active`, `empty`, `stale`, or `invalid` in `sitemap-inventory.json`

7. **Security Documentation**: Client-side Anthropic usage documented in `docs/migration/SECURITY-FINDINGS.md` as a cutover blocker

8. **Production Safety**: Current production deployment remains untouched (no modifications to `builder.js`, `public/`, or deployed Vercel configuration)

9. **Schema Validation**: All JSON reports validate against their committed schemas

### Validation Command

```bash
# Run Sprint 0 validation
npm run validate:sprint-0

# This should output:
# ✅ URL inventory complete: 127 routes documented
# ✅ Migration decisions: 127 routes mapped
# ✅ Redirect integrity: 0 chains, 0 loops
# ✅ Claims audit: 8 mismatches identified, 0 unaddressed claims
# ✅ Tool source: 14 tools reconciled to 12 canonical records
# ⚠️  Bookmark: Issue trackers and source documents need linter
```

---

## Sprint 1+ Preview (Summary Only)

### Sprint 1: Astro Foundation
- Create Astro 6 app at `apps/web`
- Configure TypeScript strict mode
- Add Tailwind CSS with extracted design tokens
- Build layouts, components, SEO utilities
- Fix CI/CD and replace README
- Gate: Build passes, routes validate, metadata tests pass

### Sprint 2: Unified Tool Schema
- Create content collections schema
- Import and reconcile tool data
- Add evidence and scoring fields
- Gate: All records pass schema validation

### Sprint 3: Deployable Vertical Slice
- Homepage, tool directory, category pages
- Interactive search with React island
- One comparison page
- Gate: Mobile + desktop content renders correctly

### Sprint 4: Security Migration
- Remove client-side Anthropic calls
- Add serverless API endpoints
- Gate: No credentials in bundle, tests pass

### Sprint 5: URL Cutover
- Generate canonical URLs
- Apply redirects
- Gate: Crawl passes, no 404s

### Sprint 6: Verification Engine
- Build scoring system
- Gate: Scores traceable to evidence

---

## Appendix: Files to Create

### files/PROJECT-TRACKER.md
```markdown
# Freemium.Services Migration Tracker

## Sprints

### Sprint 0: Baseline and Safety
- [ ] URL inventory script
- [ ] Live site crawler
- [ ] Sitemaps parsed
- [ ] Repository routes mapped
- [ ] URL contract defined
- [ ] Redirect map generated
- [ ] Tool source map created
- [ ] Claims audit completed
- [ ] Security findings documented
- [ ] Cutover runbook written
- [ ] Validation gates implemented

### Sprint 1: [TBD]
...

## Metrics Dashboard

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| URL Coverage | 100% | 0% | 🔴 |
| Redirect Test Pass | 0% | 0% | 🔴 |
| Schema Validation | 100% | 0% | 🔴 |
| Claims Matched | 100% | 0% | 🔴 |
```

### files/data/migration/url-inventory.json (Template)
```json
{
  "metadata": {
    "generatedAt": "2026-07-24T00:00:00Z",
    "crawlerVersion": "1.0.0",
    "totalUrls": 0,
    "coveredByCrawler": 0,
    "manuallyReconciled": 0
  },
  "urls": []
}
```

---

## Approval Required

This design document requires your approval before proceeding to implementation. All Sprint 0 artifacts will be created after approval.

**Key Approvals Needed:**
- [ ] URL structure for Atlas content collections
- [ ] Redirect handling strategy
- [ ] Tool data reconciliation approach
- [ ] Sprint validation gate criteria