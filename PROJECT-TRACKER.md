# Freemium.Services Migration Tracker

**Status:** Sprint 0 in Progress  
**Last Updated:** 2026-07-24

---

## Sprint Overview

| Sprint | Name | Status | Duration | Target Date |
|--------|------|--------|----------|-------------|
| 0 | Baseline and Safety | ✅ IN PROGRESS | 3-5 days | 2026-07-27 |
| 1 | Astro Foundation | ⏳ PENDING | 5-7 days | 2026-08-03 |
| 2 | Unified Tool Schema | ⏳ PENDING | 3-5 days | 2026-08-10 |
| 3 | Deployable Vertical Slice | ⏳ PENDING | 5-7 days | 2026-08-17 |
| 4 | Security and Interactive Migration | ⏳ PENDING | 3-5 days | 2026-08-24 |
| 5 | URL and Production Migration | ⏳ PENDING | 2-3 days | 2026-08-29 |
| 6 | Verification Engine | ⏳ PENDING | 5-7 days | 2026-09-05 |

---

## Sprint 0: Baseline and Safety

### Goals
Establish baseline data, URL mappings, and validation infrastructure.

### Tasks

| Task | Status | Owner | Due | Notes |
|------|--------|-------|-----|-------|
| Create directory structure | ✅ DONE | Agent | 2026-07-24 | docs/migration/, data/migration/, reports/ |
| Document current architecture | ✅ DONE | Agent | 2026-07-24 | CURRENT-ARCHITECTURE.md |
| Define URL contract | ✅ DONE | Agent | 2026-07-24 | URL-CONTRACT.md |
| Create content source rules | ✅ DONE | Agent | 2026-07-24 | CONTENT-SOURCE-OF-TRUTH.md |
| Document security findings | ✅ DONE | Agent | 2026-07-24 | SECURITY-FINDINGS.md |
| Create cutover runbook | ✅ DONE | Agent | 2026-07-24 | CUTOVER-RUNBOOK.md |
| Create URL inventory script | ✅ DONE | Agent | 2026-07-24 | scripts/inventory-urls.ts |
| Create claims audit script | ✅ DONE | Agent | 2026-07-24 | scripts/audit-claims.ts |
| Create redirect validator | ✅ DONE | Agent | 2026-07-24 | scripts/validate-redirects.ts |
| Create report templates | ✅ DONE | Agent | 2026-07-24 | reports/*.json |
| Create redirect map template | ✅ DONE | Agent | 2026-07-24 | data/migration/redirect-map.json |
| Create tool source map | ✅ DONE | Agent | 2026-07-24 | data/migration/tool-source-map.json |
| Run URL inventory | ⏳ PENDING | Agent | 2026-07-25 | `npx tsx scripts/inventory-urls.ts` |
| Run claims audit | ⏳ PENDING | Agent | 2026-07-25 | `npx tsx scripts/audit-claims.ts` |
| Validate redirects | ⏳ PENDING | Agent | 2026-07-25 | `npx tsx scripts/validate-redirects.ts` |
| Finalize URL inventory | ⏳ PENDING | Agent | 2026-07-26 | Manual reconciliation |
| Update PROJECT-TRACKER.md | ⏳ PENDING | Agent | 2026-07-26 | Mark sprint complete |

### Sprint 0 Validation Criteria

- [ ] URL inventory complete (all live routes documented)
- [ ] Redirect map has zero chains, zero loops
- [ ] Claims audit shows zero unaddressed claims
- [ ] Tool source map has all 12+ tools reconciled
- [ ] Security findings document finalized
- [ ] All JSON reports validate against schemas

---

## Sprint 1: Astro Foundation

### Goals
Create Astro 6 application with TypeScript strict mode, Tailwind, and base layouts.

### Tasks

| Task | Status | Prerequisites |
|------|--------|---------------|
| Initialize Astro 6 project | PENDING | Sprint 0 complete |
| Configure TypeScript strict | PENDING | Astro initialized |
| Add Tailwind CSS | PENDING | TypeScript configured |
| Extract design tokens | PENDING | Tailwind added |
| Create base layouts | PENDING | Tailwind configured |
| Create SEO components | PENDING | Layouts created |
| Configure sitemap generation | PENDING | SEO added |
| Fix CI/CD configuration | PENDING | Build working |
| Replace README | PENDING | All above |

### Validation

- [ ] `npm run build` succeeds
- [ ] TypeScript strict mode passes
- [ ] All routes render
- [ ] SEO meta tags validated
- [ ] Source maps generated

---

## Sprint 2: Unified Tool Schema

### Goals
Create content collections schema and migrate all tool records.

### Tasks

| Task | Status | Prerequisites |
|------|--------|---------------|
| Define TypeScript schema | PENDING | Sprint 1 complete |
| Create content collection | PENDING | Schema defined |
| Export static builder data | PENDING | Content collection |
| Export React V2 data | PENDING | Content collection |
| Reconcile conflicting fields | PENDING | Data exported |
| Create validation script | PENDING | Records migrated |
| Validate all records | PENDING | Validation script |
| Mark approved records | PENDING | Validations complete |

### Validation

- [ ] All 12+ tools in JSON format
- [ ] All required fields present
- [ ] Evidence sources identified
- [ ] Schema validation passes

---

## Sprint 3: Deployable Vertical Slice

### Goals
Implement homepage, tool directory, search, and one comparison page.

### Tasks

| Task | Status | Prerequisites |
|------|--------|---------------|
| Homepage | PENDING | Sprint 2 complete |
| Tool list page | PENDING | Homepage done |
| Tool detail page | PENDING | Tool list done |
| Search component | PENDING | Tool detail done |
| Category pages | PENDING | Search done |
| One comparison page | PENDING | Category pages |
| Knowledge hub | PENDING | Comparison done |

### Validation

- [ ] Mobile and desktop work
- [ ] No client-side rendering for content
- [ ] SEO scores pass
- [ ] Linked data valid

---

## Sprint 4: Security and Interactive Migration

### Goals
Remove client-side API calls, add server endpoints, migrate useful V2 features.

### Tasks

| Task | Status | Prerequisites |
|------|--------|---------------|
| Remove Anthropic client code | PENDING | Sprint 3 complete |
| Create chat API endpoint | PENDING | Client code removed |
| Add rate limiting | PENDING | API endpoint |
| Add input validation | PENDING | Rate limiting |
| Migrate search improvements | PENDING | All above |
| Archive obsolete V2 app | PENDING | Features migrated |

### Validation

- [ ] No API calls in client bundle
- [ ] Secrets not in source
- [ ] Endpoint has auth
- [ ] All V2 tests pass

---

## Sprint 5: URL and Production Migration

### Goals
Generate canonical URLs, apply redirects, cut over to production.

### Tasks

| Task | Status | Prerequisites |
|------|--------|---------------|
| Generate all URLs | PENDING | Sprint 4 complete |
| Apply permanent redirects | PENDING | URLs generated |
| Remove legacy paths | PENDING | Redirects working |
| Crawl for validation | PENDING | Redirects applied |
| Cutover to production | PENDING | Crawl passes |

### Validation

- [ ] No 404s
- [ ] No redirect chains
- [ ] Sitemap validates
- [ ] Index coverage maintained

---

## Sprint 6: Verification Engine

### Goals
Build scoring system for tool intelligence.

### Tasks

| Task | Status | Prerequisites |
|------|--------|---------------|
| Define scoring model | PENDING | Sprint 5 complete |
| Implement scorer | PENDING | Model defined |
| Add evidence tracker | PENDING | Scorer implemented |
| Display scores publicly | PENDING | Evidence tracker |
| Generate reports | PENDING | Scores displayed |

### Validation

- [ ] Every score has evidence
- [ ] Scores update on rebuild
- [ ] Methodology documented
- [ ] Verification workflow added

---

## Metrics Dashboard

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| URL Coverage | 100% | 0% | 🔴 |
| Redirect Coverage | 100% | 0% | 🔴 |
| Valid Claims | 100% | 0% | 🔴 |
| Tool Records | 12+ | 0 | 🔴 |
| Build Pass | 100% | 0% | 🔴 |
| Security Pass | 100% | 0% | 🔴 |

---

## Blockers

1. **Client-side Anthropic calls** - Must be addressed before spectral overlap
2. **Data inconsistency** - Need to reconcile 12 vs 34 tool records
3. **Test configuration** - Broken imports must be fixed

---

## Decision Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-07-24 | Approach 2: Parallel Track | Production must stay live |
| 2026-07-24 | Astro 6 | Stable, content collections |
| 2026-07-24 | JSON for content | Schema validation, scoring |
| 2026-07-24 | Extract existing design | No redesign during migration |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-24 | Agent | Initial sprint planning |