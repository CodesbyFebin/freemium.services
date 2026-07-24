# Cutover Runbook — Sprint 0

**Version:** 1.0  
**Prepared:** 2026-07-24  
**Status:** DRAFT — Requires Validation

---

## Overview

This runbook defines the step-by-step procedure for switching Freemium.Services from the current static-builder architecture to the new Astro application. Each step must be completed and validated before proceeding to the next.

---

## Pre-Cutover Checklist

### Technical Prerequisites

- [ ] Sprint 0 validation criterion met: "CURRENT" URL inventory complete
- [ ] Sprint 1 validation criterion met: Astro production build passes
- [ ] Sprint 2 validation criterion met: Content schema validated
- [ ] Sprint 3 validation criterion met: Vertical slice tested
- [ ] Sprint 4 validation criterion met: Security audit passes
- [ ] Sprint 5 validation criterion met: URL mapping tested

### Data Prerequisites

- [ ] All tool records exported to `content/tools/*.json`
- [ ] All category records exported to `content/categories/*.json`
- [ ] All comparison records exported to `content/comparisons/*.json`
- [ ] Wiki/guide content in `content/guides/`
- [ ] URL redirects tested in staging

---

## Cutover Procedure

### Phase 1: Staging Deployment

1. **Deploy to Staging Environment**
   ```bash
   # Build Astro
   npm run build
   
   # Deploy to staging URL
   vercel --cwd apps/web --prebuilt --token $VERCEL_TOKEN
   
   # Record staging URL for testing
   ```

2. **Webmaster Preview**
   - Verify all page types render correctly
   - Check meta tags and structured data
   - Validate URL structure matches contract

3. **SEO Validation**
   - Submit staging sitemap to Google Search Console
   - Request indexing for high-priority pages
   - Monitor for crawl errors

### Phase 2: Redirect Validation

1. **Test Redirect Map**
   ```bash
   # Run redirect validation script
   npm run validate:redirects
   
   # Expected output: All redirects pass, 0 loops, 0 chains
   ```

2. **Validate Canonical URLs**
   ```bash
   npm run validate:canonicals
   ```

3. **Cross-Reference with Live Site**
   - Ensure all currently indexed URLs have a migration path
   - Verify no orphaned content

### Phase 3: Production Cutover

1. **Freeze Content Updates**
   - Lock content repository branch
   - Notify stakeholders of maintenance window

2. **Deploy Production Build**
   ```bash
   # Build from main branch
   npm run build
   
   # Deploy to production
   vercel --cwd apps/web --prebuilt --prod --token $VERCEL_TOKEN
   ```

3. **Update DNS (if needed)**
   - If using custom domain, update CNAME or A records
   - Ensure SSL certificate is valid

4. **Verify Deployment**
   - Check homepage renders correctly
   - Verify tool pages load
   - Test search functionality

### Phase 4: Post-Cutover Validation

1. **URL Health Check**
   ```bash
   # Crawl new site
   npm run crawl:new-site
   
   # Compare with old URLs
   npm run compare:urls
   ```

2. **Search Console Monitoring**
   - Submit new sitemap
   - Monitor for 404 errors
   - Check index coverage report

3. **Analytics Setup**
   - Verify Vercel Analytics is working
   - Set up goal tracking

4. **Performance Monitoring**
   - Check Lighthouse scores
   - Monitor Core Web Vitals

---

## Rollback Procedure

If cutover fails or critical issues are discovered:

### Immediate Actions

1. **Pause** - Stop all non-essential deployments
2. **Identify** - Determine scope of issue (content, routing, functionality)
3. **Communicate** - Notify team and stakeholders

### Rollback Steps

1. **Revert DNS (if needed)**
   ```bash
   # Point DNS back to old Vercel app
   ```

2. **Restore Old Build**
   ```bash
   # Deploy previous working version from backup tag
   git checkout tags/v0.9.0-stable
   npm run build
   vercel --prod --force
   ```

3. **Re-enable Old Redirects**
   - Update vercel.json to point to old structure
   - Ensure all routes work

4. **Post-Rollback Validation**
   - Verify all pages load
   - Check search indexing
   - Confirm analytics tracking

### Decision Criteria for Rollback

| Issue | Rollback Trigger | No Rollback |
|-------|-----------------|-------------|
| Homepage down | 5 min+ downtime | Fix and redeploy |
| 404s > 10% of indexed pages | Must rollback | Only non-critical paths |
| SEO degradation > 20% | Must rollback | Continue with monitoring |
| Security vulnerability | Must rollback immediately | N/A |

---

## Monitoring Schedule

### First 24 Hours (Critical)

| Time | Check | Action |
|------|-------|--------|
| +0h | Deploy complete | Verify homepage |
| +1h | Google Search Console | Check crawl errors |
| +4h | Sample user flows | Verify key paths |
| +12h | Index coverage | Compare to pre-cutover |
| +24h | Performance metrics | Core Web Vitals |

### First Week

- Daily: Search Console & Analytics review
- Daily: Sitemap validation
- Every 4 hours: Uptime monitoring

### Ongoing

- Weekly: Content validation
- Weekly: Link integrity check
- Monthly: Full SEO audit

---

## Communication Plan

### Internal Stakeholders

| Role | Notification | Timing |
|------|--------------|--------|
| Dev Team | Slack #migration-alerts | Immediate |
| Product | Email summary | Daily |
| Marketing | SEO status update | Every 2 hours |

### External Stakeholders

| Audience | Communication | Timing |
|----------|---------------|--------|
| Users | None required | - |
| Search Engines | Site message in robots.txt | Before/after |
| Partners | Email notification | Once |

---

## Runbook Template

Use this template for future migrations:

```markdown
# {PROJECT} Cutover Runbook

## Overview
...

## Pre-Cutover Checklist
...

## Cutover Procedure
...

## Rollback Procedure
...

## Monitoring Schedule
...

## Communication Plan
...

## Revision History
| Date | Version | Author | Changes |
|------|---------|--------|---------|
```

---

## Appendix A: Critical URLs to Preserve

| URL | Priority | Migration Action |
|-----|----------|------------------|
| `/` | High | Preserve |
| `/tools/ollama/` | High | Preserve |
| `/tools/n8n/` | High | Preserve |
| `/categories/ai-tools/` | High | Preserve |
| `/knowledge-hub/` | High | Preserve |
| `/compare/ollama-vs-lmstudio/` | Medium | Preserve |
| `/sitemap.xml` | High | Regenerate |
| `/robots.txt` | High | Regenerate |

## Appendix B: Emergency Contacts

| Person | Role | Contact |
|--------|------|---------|
| Lead Developer | Primary | [Contact Info] |
| DevOps | Deployment | [Contact Info] |
| SEO Specialist | Indexing | [Contact Info] |

---

## Approval

This runbook must be reviewed and approved before cutover.

**Prepared by:** [Author]  
**Reviewed by:** [Reviewer]  
**Approved by:** [Approver]  
**Date:** [Date]