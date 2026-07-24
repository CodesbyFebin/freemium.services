# Current Architecture Analysis

**Date:** 2026-07-24  
**Status:** Analysis Only — Do Not Modify Production

## Architecture Overview

The project currently contains three competing architectures:

### 1. Static Builder (Production)

**Location:** `/builder.js`  
**Status:** Live on Vercel  
**Purpose:** Static HTML generation for SEO

```
builder.js
├── data/tools.json (12 tools)
├── data/glossary.json
├── data/faqs.json
├── src/ (CSS, JS widgets)
├── public/ (generated output)
└── scripts/ (supporting scripts)
```

**Runtime Environment:**
- Node.js script execution
- Outputs to `public/` directory
- Vercel deployment from `public/`
- `cleanUrls: true` in vercel.json

**URL Structure:**
- Tools: `/tools/ollama.html`
- Categories: `/category/ai-tools.html`
- Knowledge Hub: `/knowledge-hub.html`
- Comparisons: `/compare/a-vs-b.html`

**Features:**
- Static HTML generation (SEO-friendly)
- Multilingual support (en, hi, ml, ta)
- Schema.org JSON-LD markup
- OG image generation
- Sitemap generation

---

### 2. React/Vite App (Inactive)

**Location:** `/freemium_v2/`  
**Status:** Code exists but not deployed  
**Purpose:** Richer interactive experience

**Key Files:**
- `freemium_v2/src/App.tsx` (main app)
- `freemium_v2/src/lib/data.ts` (39 tools in V2)
- `freemium_v2/src/lib/utils.ts`
- `freemium_v2/src/lib/blocks.ts`

**Package Dependencies:**
```json
{
  "dependencies": {
    "@google/genai": "^1.29.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.14.0",
    "tailwindcss": "^4.1.14"
  }
}
```

**Security Issues:**
- **CRITICAL:** Direct Anthropic API calls from client-side (lines 579-596 in App.tsx)
- Requires browser exposure of `ANTHROPIC_API_KEY`
- No server-side proxy or authentication

**URL Structure:**
- Tools: `/tools/ollama`
- Categories: `/ai-tools`
- Knowledge Hub: `/quickstart` or `/knowledge/:id`
- Comparisons: `/compare/:id`

**Features:**
- React Router navigation
- Dark/light mode toggle
- Search modal with keyboard shortcut
- AI chat widget (client-side Anthropic calls)
- Semantic graph visualizations

---

### 3. Next.js App (Skeleton)

**Location:** `/apps/web/`  
**Status:** Nearly empty skeleton  
**Purpose:** Monorepo workspace placeholder

**Key Files:**
- `apps/web/app/page.tsx` (minimal - nearly empty)
- `apps/web/app/layout.tsx`
- `apps/web/app/globals.css`

**Package Dependencies:**
- React 18.2.0
- Next.js 15.0.0
- References `@freemium/types` and `@freemium/ui` (packages not fully built)

**URL Structure:**
- Default Next.js file-system routing
- Not yet configured

**Features:**
- None implemented yet

---

## Data Sources Comparison

| Source | Tool Count | Format | Last Updated |
|--------|------------|--------|--------------|
| `data/tools.json` | 12 | JSON | Freeze date |
| `freemium_v2/src/lib/data.ts` | 34 | TS Interface | Dynamic |
| Generated HTML (static) | 12 | HTML | Build time |

**Tool ID Coverage:**
- Common: n8n, ollama, dify, langflow, open-webui, activepieces, windmill, coolify, qdrant, ripgrep, supabase, auto-gpt
- V2 Only: zed, anythingllm, perplexica, marimo, weaviate, claude-code

---

## Route Analysis

### Current Production Routes (from live site)

**Category Pages:**
- `/category/ai-tools.html`
- `/category/automation-tools.html`
- `/category/self-hosting.html`
- `/category/rag-tools.html`
- `/category/ai-agents.html`
- `/category/developer-tools.html`
- `/category/vector-databases.html`
- `/category/cli-tools.html`
- `/category/assistants.html`
- `/category/open-source.html`

**Tool Pages (12):**
- `/tools/n8n.html`, `/tools/ollama.html`, `/tools/dify.html`, `/tools/langflow.html`
- `/tools/open-webui.html`, `/tools/activepieces.html`, `/tools/windmill.html`
- `/tools/coolify.html`, `/tools/qdrant.html`, `/tools/ripgrep.html`
- `/tools/supabase.html`, `/tools/auto-gpt.html`

**Comparison Pages:**
- `/compare/n8n-vs-zapier.html`
- `/compare/ollama-vs-lmstudio.html`
- `/compare/qdrant-vs-weaviate.html`
- `/compare/cursor-vs-vscode-cline.html`
- `/compare/dify-vs-flowise.html`

**Other:**
- `/knowledge-hub.html`
- `/index.html`

---

## URL Conflicts

| Content Type | Static Pattern | V2 Pattern | Conflict? |
|--------------|---------------|------------|-----------|
| Tool | `/tools/ollama.html` | `/tools/ollama` | YES |
| Category | `/category/ai-tools.html` | `/category/ai-tools.html` | Similar but different |
| Knowledge | `/knowledge-hub.html` | `/quickstart` or `/knowledge/:id` | YES |
| Comparison | `/compare/a-vs-b.html` | `/compare/:id` | YES |

**Impact:**
- Search results show mixed URL variants
- Duplicate content risk
- Canonicalization issues

---

## Vercel Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "public",
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [...],
  "headers": [...]
}
```

**Key Note:** `cleanUrls: true` strips `.html` from deployed URLs but the source files retain the extension.

---

## Test Configuration Issues

1. `builder.test.js` imports `require('../builder')` but `builder.js` is at repository root
2. Root `package.json` expects tests under `tests/` but `builder.test.js` is at root
3. V2 has its own test configuration

---

## Migration Blocking Issues

### P0 Critical
1. Architecture consolidation - Need to pick one architecture
2. Security vulnerability - Client-side Anthropic calls expose credentials
3. Data inconsistency - 12 static tools, 39 V2 tools, claims vs actual
4. Test configuration - Broken imports and paths
5. URL drift - Conflicting URL patterns

### P1 Important
1. AI integration needs server-side routing
2. Verification engine needed for truthful counters
3. Source citations and review methodology missing

### P2 Future
1. Programmatic alternative clusters
2. Deployable self-hosting recipes
3. Personalized stack builder

---

## Recommendations

Based on the review document:

1. **Choose Astro 6** with content collections and React islands
2. **Consolidate data** to authoritative JSON source
3. **Fix security** by removing client-side API calls
4. **Establish clean URL contract** and 301-redirect legacy paths
5. **Fix tests** to match actual repository structure

---

## Next Steps

See `URL-CONTRACT.md` for the proposed clean URL structure and `CONTENT-SOURCE-OF-TRUTH.md` for tool data reconciliation strategy.