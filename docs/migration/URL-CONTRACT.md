# URL Contract for Astro Migration

**Version:** 1.0  
**Effective:** Sprint 1  
**Author:** ZCode Agent

## Overview

This document defines the canonical URL structure for the migrated Freemium.Services site. All routes must comply with this contract once the Astro application is deployed.

---

## Clean URL Schema

### Root and Navigation

```
/                           → Homepage
/about/                     → About page
/about/ methodology/       → Methodology page
/terms/                     → Terms of Service
/privacy/                   → Privacy Policy

```

### Tools

```
/tools/                     → Tool directory (paginated)
/tools/ollama/             → Individual tool page
/tools/n8n/              → Individual tool page
```

**Tool URL Pattern:** `/tools/{tool-id}/`

### Categories

```
/categories/              → Category directory
/categories/ai-tools/    → Individual category page
/categories/self-hosting/
/categories/automation-tools/
/categories/rag-tools/
/categories/ai-agents/
/categories/developer-tools/
/categories/vector-databases/
/categories/cli-tools/
/categories/assistants/
/categories/open-source/
```

**Category URL Pattern:** `/categories/{category-id}/`

### Comparisons

```
/compare/                  → Comparison hub (list of comparisons)
/compare/ollama-vs-lm-studio/
/compare/n8n-vs-zapier/
```

**Comparison URL Pattern:** `/compare/{tool-a}-vs-{tool-b}/`

### Guides and Documentation

```
/guides/                    → Guide directory
/guides/self-host-n8n/     → Individual guide
/guides/ollama-installation/

/knowledge-hub/              → Knowledge hub
/knowledge-hub/ quickstart/  → Quickstart guide
/knowledge-hub/ rag-guide/  → RAG implementation guide
```

---

## Legacy URL Mapping

### From Static Builder to Astro

| Legacy URL | New URL | Action | Priority |
|-----------|---------|--------|----------|
| `/index.html` | `/` | 301 Redirect | High |
| `/tools/ollama.html` | `/tools/ollama/` | 301 Redirect | High |
| `/tools/n8n.html` | `/tools/n8n/` | 301 Redirect | High |
| `/category/ai-tools.html` | `/categories/ai-tools/` | 301 Redirect | High |
| `/category/automation-tools.html` | `/categories/automation-tools/` | 301 Redirect | High |
| `/knowledge-hub.html` | `/knowledge-hub/` | 301 Redirect | High |
| `/compare/ollama-vs-lmstudio.html` | `/compare/ollama-vs-lmstudio/` | 301 Redirect | High |

### Multilingual Considerations

The current static site has:
- Hindi (`hi/`)
- Malayalam (`ml/`)
- Tamil (`ta/`)

**Decision:** Only generate translated versions for routes with actual translated content. The translator utility exists but many translations may be incomplete.

**Strategy:**
- Homepage: Redirect to English (no translation)
- Knowledge Hub: Keep if translated content exists
- Tool pages: Generate only for verified translations

---

## URL Generation Rules

### 1. Slugification

Tool IDs must match their slug exactly:
- `n8n` → `/tools/n8n/`
- `ollama` → `/tools/ollama/`
- IDs must be lowercase with hyphens for multi-word (no spaces)

### 2. Trailing Slashes

All pages must have trailing slashes for consistency:
- ✅ `/tools/ollama/`
- ✅ `/categories/ai-tools/`
- ❌ `/tools/ollama`

### 3. Canonicalization

Every page must have:
- A `<link rel="canonical">` pointing to its canonical URL
- No self-referential canonical conflicts
- Language-specific canonicals for non-English pages

### 4. Pagination

Tool directory pagination:
- `/tools/page/1/`
- `/tools/page/2/`

Category pages:
- `/categories/ai-tools/page/1/`

---

## Redirect Implementation

### Astro Configuration

`astro.config.ts`:

```typescript
export default defineConfig({
  // ...
  redirects: [
    {
      from: '/index.html',
      to: '/',
      status: 301,
    },
    {
      from: '/tools/:id.html',
      to: '/tools/:id/',
      status: 301,
    },
    {
      from: '/category/:id.html',
      to: '/categories/:id/',
      status: 301,
    },
    {
      from: '/knowledge-hub.html',
      to: '/knowledge-hub/',
      status: 301,
    },
    {
      from: '/compare/:id.html',
      to: '/compare/:id/',
      status: 301,
    },
  ],
});
```

### Validation Requirements

- No redirect chains longer than 1
- No redirect loops
- All bypass (original) URLs must return 301/302 status
- Final destination must have valid content

---

## Content Type Definitions

### Tool Page

Must include:
- `[Tool Name] | Freemium.Services` as title
- Description with unique value proposition
- JSON-LD `SoftwareApplication` schema
- `BreadcrumbList` schema
- Open Graph metadata
- Language alternates

### Category Page

Must include:
- `[Category Name] - Open Source Tools | Freemium.Services`
- `ItemList` schema with top 10 tools
- `BreadcrumbList` schema

### Comparison Page

Must include:
- `[Tool A] vs [Tool B] - Detailed Comparison | Freemium.Services`
- Feature matrix table
- Verdict section
- Social sharing metadata

---

## URLs to Preserve or Retire

### Preserve (Must Maintain)

| URL | Reason |
|-----|--------|
| `/tools/ollama/` | Core tool, high traffic |
| `/tools/n8n/` | Core tool, high traffic |
| `/category/ai-tools/` | Primary category |
| `/knowledge-hub/` | Documentation hub |

### Maybe Redirect

| Source | Target | Notes |
|--------|--------|-------|
| `/docs.html` | `/knowledge-hub/` | Legacy alias, remove |
| `/quickstart` | `/knowledge-hub/` | V2 route, consolidate |

### Retire

| URL | Reason |
|-----|--------|
| Empty sitemap sources | Placeholder, no content |
| Old error pages | Not user-facing |

---

## Sitemap Generation

### Astro Sitemaps

Default Astro sitemap:
- Enabled out of the box
- Generates from file system routes

### Custom Sitemaps

Additional sitemaps to generate:
- `sitemap-tools.xml`
- `sitemap-categories.xml`
- `sitemap-comparisons.xml`
- `sitemap-knowledge.xml`

### Sitemap Content

Each URL entry must include:
- `<loc>` (canonical URL)
- `<lastmod>` (date, from actual content changes)
- `<changefreq>` (appropriately set)
- `<priority>` (0.8-1.0 for important pages)

---

## Testing Checklist

- [ ] All legacy URLs return 301 status
- [ ] No redirect chains
- [ ] Canonical URLs match redirect targets
- [ ] Sitemap validates with Google Search Console
- [ ] All pages render without JavaScript
- [ ] Hreflang tags present for non-English pages (if content exists)
- [ ] Mobile-friendly URL structure

---

## Approval

This URL contract must be approved before starting Sprint 1 implementation.

**Approved by:** [Pending User Approval]  
**Date:** [Pending]