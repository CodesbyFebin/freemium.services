# Content Source of Truth

**Version:** 1.0  
**Effective:** Sprint 2  
**Author:** ZCode Agent

## Objective

Establish a single authoritative source for all catalog data, replacing the current state of three divergent data sources.

---

## Data Sources

### Current Sources

| Source | Location | Records | Format | Stability |
|--------|----------|---------|--------|-----------|
| **Static Builder** | `data/tools.json` | 12 | JSON | Frozen |
| **React V2** | `freemium_v2/src/lib/data.ts` | 34 | TS Interface | Dynamic |
| **Generated HTML** | `public/*.html` | 12 | HTML | Build-time |

### Required Fields

Every tool record in the new system MUST include:

```typescript
interface ToolRecord {
  // Identity
  id: string;           // Unique, URL-safe slug
  name: string;         // Human-readable name
  description: string;  // 160 chars max for SEO
  
  // Categorization
  category: string;     // Must match category file name
  tags: string[];      // Additional relevant tags
  
  // License and Access
  license: 'free' | 'freemium' | 'open-source' | 'agpl' | 'other';
  selfHostable: boolean;
  
  // Technical Details
  platforms: string[];  // ['docker', 'kubernetes', 'linux', 'mac', 'windows']
  requirements?: {
    ramMinMB?: number;
    gpuRequired?: boolean;
  };
  
  // Metadata
  website: string;     // Primary URL
  github?: string;     // Repository URL
  stars?: number;      // GitHub stars (for credibility)
  
  // Installation
  install?: string;    // One-line install command
  installDifficulty?: 1 | 2 | 3 | 4 | 5;  // 1 = easy, 5 = expert
  
  // Alternatives
  alternatives: string[];  // Array of other tool IDs
  
  // Evidence
  lastVerified: string;    // ISO date
  verificationMethod: string;  // How was this verified?
  sourceUrls: string[];    // References for claims
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  
  // Migration status
  migrationStatus: 'approved' | 'pending' | 'needs-review';
}
```

---

## Reconciliation Process

### Step 1: Identify Overlapping Tools

Tools present in BOTH sources:

| Tool ID | Static Builder (`tools.json`) | React V2 (`data.ts`) | Action |
|---------|-------------------------------|----------------------|--------|
| n8n | Has record | Has record | Merge, validate |
| ollama | Has record | Has record | Merge, validate |
| dify | Has record | Has record | Merge, validate |
| langflow | Has record | Has record | Merge, validate |
| open-webui | Has record | Has record | Merge, validate |
| activepieces | Has record | Has record | Merge, validate |
| windmill | Has record | Has record | Merge, validate |
| coolify | Has record | Has record | Merge, validate |
| qdrant | Has record | Has record | Merge, validate |
| ripgrep | Has record | N/A | Keep from static |
| supabase | Has record | N/A | Keep from static |
| auto-gpt | Has record | N/A | Keep from static |
| zed | N/A | Has record | Import from V2 |
| anythingllm | N/A | Has record | Import from V2 |
| perplexica | N/A | Has record | Import from V2 |
| marimo | N/A | Has record | Import from V2 |
| weaviate | N/A | Has record | Import from V2 |
| claude-code | N/A | Has record | Import from V2 |

### Step 2: Decision Matrix

For each field, determine the authoritative source:

| Field | Source Priority | Notes |
|-------|-----------------|-------|
| Basic info (name, description) | Static Builder | More detailed |
| Features list | Static Builder | More complete |
| Alternatives | Static Builder | Curated |
| Installation | Static Builder | Production-tested |
| GitHub stars | Static Builder | Updated per build |
| Category | Static Builder | Consistent with URLs |
| Features array | Both | Static has more features |
| Use cases | React V2 | More detailed |
| Self-hosting guide | React V2 | More comprehensive |
| SEO metadata | React V2 | More optimized |

### Step 3: Validation Criteria

A record is **APPROVED** for publication if:

1. ✅ All required fields are present and non-empty
2. ✅ At least one verifiable source URL exists
3. ✅ Installation command is documented
4. ✅ License category is specified
5. ✅ `lastVerified` date is within 180 days
6. ✅ No placeholder or test data
7. ✅ Claims (star counts, etc.) are factual

---

## Content File Structure

### Directory Layout

```
content/
├── tools/
│   ├── n8n.json
│   ├── ollama.json
│   ├── dify.json
│   │   └── ...
├── categories/
│   ├── ai-tools.json
│   ├── automation-tools.json
│   │   └── ...
├── comparisons/
│   ├── n8n-vs-zapier.json
│   ├── ollama-vs-lmstudio.json
│   │   └── ...
└── guides/
    ├── quickstart.json
    ├── self-hosting-101.json
    └── ...
```

### Example: Tool Record (`content/tools/ollama.json`)

```json
{
  "id": "ollama",
  "name": "Ollama",
  "description": "Run Llama 3.3, Mistral, DeepSeek-R1, Phi-4, and 150+ models locally with a single command. OpenAI API compatible.",
  "category": "ai-tools",
  "tags": ["llm", "inference", "local", "open-source"],
  "license": "open-source",
  "selfHostable": true,
  "platforms": ["docker", "linux", "mac", "windows"],
  "requirements": {
    "ramMinMB": 8192,
    "gpuRequired": false
  },
  "website": "https://ollama.ai",
  "github": "https://github.com/ollama/ollama",
  "stars": 94000,
  "install": "curl -fsSL https://ollama.com/install.sh | sh && ollama run llama3",
  "installDifficulty": 2,
  "alternatives": ["open-webui", "lmstudio", "vllm"],
  "lastVerified": "2026-07-24",
  "verificationMethod": "Manual inspection of GitHub releases and documentation",
  "sourceUrls": [
    "https://ollama.ai",
    "https://github.com/ollama/ollama"
  ],
  "seoTitle": "Ollama: Run LLMs Locally for Free | Freemium.Services",
  "seoDescription": "Run 150+ AI models locally with Ollama. Free, private, no API costs ever.",
  "migrationStatus": "approved"
}
```

---

## Series vs Parallel Facts

### Truth Table

A fact (like star count, last release date, feature) is:

1. **Deprecated** if it exists in old source but not in new
2. **Missing** if it's in new schema but has no value
3. **Up-to-date** if same value in both sources
4. **Conflicting** if different values in both sources

### Handling Conflicts

```
IF static.tools.json.stars == react-v2.data.ts.stars THEN
  VALUE = that common value
ELSE IF static tools exist THEN
  VALUE = static.tools.json.stars WITH "verified" flag
ELSE
  VALUE = react-v2.data.ts.stars WITH "detected" flag
END
```

---

## Implementation Order

### Sprint 2 Phase 1: Schema Definition

1. Create TypeScript interfaces in `packages/types/src/schema.ts`
2. Update package.json exports
3. Add validation functions

### Sprint 2 Phase 2: Content Migration

1. Export static builder data to JSON format
2. Export React V2 data to JSON format
3. Run reconciliation script
4. Generate approval list

### Sprint 2 Phase 3: Validation

1. Validate all fields against schema
2. Check for broken URLs
3. Verify star counts against GitHub API
4. Generate validation report

---

## Validation Rules

### Schema Validation

```typescript
import { z } from 'zod';

export const ToolSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().min(1).max(160),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  license: z.enum(['free', 'freemium', 'open-source', 'agpl', 'other']),
  selfHostable: z.boolean(),
  website: z.string().url(),
  github: z.string().url().optional(),
  stars: z.number().int().positive().optional(),
  install: z.string().optional(),
  alternatives: z.array(z.string()).min(1),
  lastVerified: z.string().date(),
});
```

### Business Validation

```typescript
// Tools claiming to be self-hostable must have install instructions
assert(tool.selfHostable ? tool.install : true, 
  "Self-hosted tools must have installation instructions");

// Tools must have at least one valid alternative
assert(tool.alternatives.some(id => knownTools.has(id)),
  "Tool must have at least one valid alternative");
```

---

## Approval Workflow

1. **Author**: Create/update tool record
2. **Validator**: Run validation scripts
3. **Reviewer**: Manually verify claims
4. **Merge**: Add to `approved/` directory

---

## Audit Trail

Each record modification must be logged:

```json
{
  "toolId": "ollama",
  "field": "description",
  "oldValue": "Run LLMs locally...",
  "newValue": "Run Llama 3.3, Mistral, DeepSeek-R1, Phi-4, and 150+ models...",
  "changedBy": "migration-sprint-2",
  "timestamp": "2026-07-24T10:00:00Z",
  "reason": "Updating to match current marketing copy"
}
```

---

## Resources

- [Survey of Open-Source Licensing](https://choosealicense.com)
- [Semantic Versioning](https://semver.org)
- [Open Source Initiative Licenses](https://opensource.org/licenses)

---

## Approval

This source-of-truth document must be approved before starting Sprint 2 content migration.

**Approved by:** [Pending User Approval]  
**Date:** [Pending]