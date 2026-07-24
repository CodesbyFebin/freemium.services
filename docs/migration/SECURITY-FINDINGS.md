# Security Findings — Sprint 0

**Date:** 2026-07-24  
**Severity:** CRITICAL  
**Status:** Documented as Migration Blocker

---

## Executive Summary

A critical security vulnerability exists in the React/Vite application (`freemium_v2/src/App.tsx`) where Anthropic API calls are made directly from client-side JavaScript. This exposes API credentials to anyone with browser access and violates the principle of least privilege.

---

## Critical Finding: Client-Side API Key Exposure

### Location
- **File:** `freemium_v2/src/App.tsx`
- **Lines:** 579-596
- **Function:** ChatWidget component

### Vulnerable Code

```typescript
const send = useCallback(async () => {
  if (!input.trim() || loading) return;
  const userMsg = input.trim();
  setInput('');
  setMsgs(prev => [...prev, { role: 'user', text: userMsg }]);
  setLoading(true);

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `...`,
        messages: [{ role: 'user', content: userMsg }],
      }),
    });
```

### Impact

1. **Credential Exposure**: Anyone with access to the browser can discover which API endpoint is being called. If an API key were present in client code, it would be exposed.

2. **Unrestricted Usage**: The client could make unlimited API calls, potentially leading to:
   - Financial liability from unexpected usage
   - Rate limiting denial of service
   - Abuse of the AI service

3. **Data Leakage**: Sensitive user prompts and responses would flow through client code, potentially:
   - Being intercepted by browser extensions
   - Being logged by network monitoring tools
   - Being visible in browser dev tools

4. **No Authentication**: There's no mechanism to verify who is making requests.

### Root Cause

The application attempts to integrate an AI assistant without:
- A backend API proxy
- Server-side secret storage
- Request validation and sanitization
- Rate limiting
- Usage quotas

---

## Required Remediation

### Sprint 4 Requirement

Before proceeding with production migration, the following must be implemented:

### 1. Backend API Proxy

Create a server endpoint that:

```
POST /api/chat
```

Features:
- ✅ Stores Anthropic API key in server environment
- ✅ Validates and sanitizes input
- ✅ Enforces rate limits
- ✅ Tracks usage for quotas
- ✅ Logs requests (without storing sensitive prompts)
- ✅ Provides provider fallback capability

### 2. Client Changes

Replace client-side fetch with:

```typescript
const send = useCallback(async () => {
  if (!input.trim() || loading) return;
  
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [...msgs, { role: 'user', text: input.trim() }]
    }),
  });
```

### 3. Astro Implementation Options

**Option A: Netlify Functions**
```typescript
// netlify/functions/chat.ts
export async function handler(event: any) {
  const { messages } = JSON.parse(event.body);
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-02-01',
    },
    body: JSON.stringify({...messages, model: 'claude-3-opus-20240815'})
  });
  return { statusCode: 200, body: JSON.stringify(await response.json()) };
}
```

**Option B: Astro Server Actions**
```typescript
// src/actions/chat.ts
import { defineAction } from 'astro:actions';

export const chat = defineAction(async ({ context, input }) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.ANTHROPIC_API_KEY}`,
    },
    body: JSON.stringify(input)
  });
  return await response.json();
});
```

**Option C: Express/cluster mode**
If using server-side rendering, add Express middleware with auth.

---

## Rollout Plan

### Phase 1: Documentation (Sprint 0)

- [x] Document finding in this file
- [x] Add to security findings in project tracker
- [x] Include in Sprint 0 validation runbook

### Phase 2: Remediate (Sprint 4)

- [ ] Create API endpoint
- [ ] Add environment variable handling
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Update client to use new endpoint
- [ ] Remove old client-side code
- [ ] Test with production credentials

---

## Non-Negotiable Rules

1. **NO** client-side API calls to any third-party service
2. **ALL** secrets must be in server environment variables
3. **ALL** external API calls must go through a server endpoint
4. **MUST** log requests for audit purposes (without sensitive data)
5. **MUST** have a fallback if the primary provider fails

---

## Verification Checklist

After remediation, the following must pass:

- [ ] `npm run build` produces no references to `api.anthropic.com` in client bundle
- [ ] Browser bundle contains no API keys
- [ ] Security scan shows no exposed credentials
- [ ] All HTTP requests go through `/api/` routes
- [ ] Server-side tests pass for API proxy

---

## References

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Astro Security Best Practices](https://docs.astro.build/en/reference/security/)
- [Anthropic API Security](https://docs.anthropic.com/docs/security-and-compliance)

---

## Approval

This security finding blocks all production deployments until remediated.

**Documented by:** ZCode Agent  
**Date:** 2026-07-24  
**Next Review:** Sprint 4