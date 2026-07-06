# Deployment Guide: LegacyWho on Vercel

**Target Launch**: 4–6 weeks (Phase 1 MVP)  
**Platform**: Vercel (Next.js 16 native)  
**Domain**: OfficialWho.com  
**Database**: Supabase (free tier)  
**Tagline**: Verified. Celebrated. Remembered.  
**Status**: Ready for implementation

---

## Pre-Deployment Checklist

### Infrastructure Setup (Week 1)

- [ ] **Supabase Project**
  - Create free-tier project
  - Region: US East (closest to Vercel)
  - Database: PostgreSQL 15+
  - Run: `npm run db:migrate` to deploy schema

- [ ] **Vercel Project**
  - Connect GitHub repo
  - Framework: Next.js
  - Build command: `npm run build`
  - Environment: Production

- [ ] **Environment Variables** (in Vercel Settings → Environment Variables)
  - Copy all vars from `.env.production.example`
  - Never commit `.env.production`
  - Add to staging + production environments

- [ ] **Upstash Redis** (free tier)
  - Create Redis instance
  - Region: US East-1
  - Copy REST URL + token to environment

- [ ] **Sentry Project** (error tracking)
  - Create organization + project
  - Framework: Next.js
  - Get DSN + auth token

- [ ] **Domain Setup**
  - Register OfficialWho.com (if not done)
  - Point nameservers to Vercel DNS
  - Vercel → Settings → Domains → Add `officialwho.com`
  - SSL auto-provisioned by Vercel

### Development Setup (Week 1)

```bash
# Clone repo
git clone <repo>
cd alumi-poster-generator

# Install dependencies
npm install

# Setup local environment
cp .env.example .env.local
# Edit .env.local with local credentials

# Run migrations
npm run db:migrate

# Start dev server
npm run dev
```

---

## Phase 1: MVP Launch (4 Weeks)

### Week 1: Core Infrastructure

**What to build**:
- [ ] Poster generation API endpoint (`POST /api/generate`)
- [ ] School metadata lookup (`GET /api/schools/search`)
- [ ] Image upload handler (`POST /api/upload`)
- [ ] Rate limiting middleware (tier-based)
- [ ] Database schema (already scaffolded in `src/db/schema.sql`)

**Deliverables**:
- API routes working locally
- Database migrations passing
- Supabase auth configured

**Success criteria**:
- `npm run dev` starts without errors
- Database migrations run successfully
- API routes return 200 status

### Week 2: Frontend MVP

**What to build**:
- [ ] Landing page (`/`) — already scaffolded
- [ ] Upload flow (`/generate`)
  - File input + drag-drop
  - School search (autocomplete)
  - Style selector (9 options)
  - Graduation year input
- [ ] Generation progress page with SSE updates
- [ ] Result/download page
- [ ] Navigation + auth stub (allow anonymous for MVP)

**Deliverables**:
- Complete user flow from upload to download
- Mobile-responsive UI
- Real-time progress streaming

**Success criteria**:
- Upload → Generation → Download works end-to-end
- Mobile UX passes manual testing
- No console errors

### Week 3: AI Provider Integration

**What to build**:
- [ ] FLUX.1 provider implementation
- [ ] BRIA RMBG background removal
- [ ] Circuit breaker + fallback logic
- [ ] Image caching layer
- [ ] Cost tracking + budget alerts

**Deliverables**:
- Full poster generation pipeline working
- Multi-provider failover tested
- Cost logging to Sentry

**Success criteria**:
- Generate 10 test posters end-to-end
- Cost per poster < $0.05
- No provider downtime during tests

### Week 4: Polish + Launch Prep

**What to build**:
- [ ] Error recovery UI (graceful degradation)
- [ ] Watermarking layer (for free tier)
- [ ] Social sharing buttons
- [ ] Analytics integration
- [ ] Performance optimization
- [ ] Staging deployment

**Deliverables**:
- Staging environment matches production
- All critical paths tested
- Documentation updated

**Success criteria**:
- Lighthouse score > 80
- <3 second page load
- All critical user flows work

---

## Deployment Pipeline

### Staging Environment (Vercel Preview)

```bash
# Every PR automatically deploys to staging
# URL: https://officialwho-staging.vercel.app
# All environment vars same as production (optional override)
```

### Production Deployment (OfficialWho.com)

```bash
# Merge to main branch
# Vercel auto-deploys to production
# URL: https://officialwho.com
```

### Monitoring Post-Launch

**Critical alerts** (Sentry):
- Error rate > 5%
- API latency > 5s
- Database connection errors
- Provider failover events

**Health checks** (automated):
- `/api/health` returns 200
- Database query < 500ms
- Cache hit rate tracked

---

## Vercel-Specific Configuration

### Edge Functions (Optional, Phase 2)

```typescript
// api/_middleware.ts
// Runs at edge for ultra-low latency
export async function middleware(request: NextRequest) {
  // Rate limiting at edge
  // Geo-blocking (optional)
  // Request logging
}
```

### Build Optimization

```bash
# vercel.json already configured for:
# - Cache headers (images: 1 year, API: no-cache)
# - Security headers (CSP, X-Frame-Options)
# - Redirects (admin → dashboard)
# - Environment variable validation
```

### Serverless Functions

All API routes are serverless by default:
- Cold start: ~100ms (acceptable for posters)
- Timeout: 60s (should finish generation in ~45s)
- Memory: 3GB (sufficient for image processing)

---

## Cost Estimation (Month 1)

| Service | Free Tier | Usage | Cost |
|---------|-----------|-------|------|
| Vercel | 100 GB bandwidth | ~10 GB | Free |
| Supabase | 500 MB storage, 2 million rows | ~100 MB | Free |
| Upstash Redis | 10k commands/day | ~5k/day | Free |
| Hugging Face | ~15 req/min | ~100 renders | Free |
| Sentry | 5k events/month | ~500 errors | Free |
| **Total** | — | — | **Free** |

At 1,000 renders/month:
- Vercel: ~$50 (above free tier)
- Supabase: Free (under limits)
- Total: ~$50/month

---

## Launch Checklist (Week 4 Friday)

### Pre-Launch (48 Hours Before)

- [ ] All secrets in Vercel environment
- [ ] Database backed up
- [ ] Staging deployment tested
- [ ] Analytics configured
- [ ] Sentry alerts configured
- [ ] Support email set up
- [ ] Documentation finalized
- [ ] Social media assets ready

### Launch (Friday Evening or Monday Morning)

- [ ] Merge to main → auto-deploys to production
- [ ] Monitor Sentry for errors (first 24h)
- [ ] Check Vercel analytics dashboard
- [ ] Test all critical paths on officialwho.com
- [ ] Share link with beta testers

### Post-Launch (First Week)

- [ ] Monitor 24/7 for critical errors
- [ ] Track metrics: users, posters, errors, costs
- [ ] Respond to support tickets
- [ ] Gather feedback for Phase 2
- [ ] Daily sync with team

---

## Phase 2: Template Expansion (Weeks 5–8)

After MVP stabilizes:
- [ ] Then/Now template
- [ ] Career Arc template
- [ ] Monetization UI (Pro/Plus tiers)
- [ ] Watermark removal paywall

---

## Rollback Plan

If production breaks:

```bash
# Option 1: Revert last deployment
# Vercel UI → Deployments → Previous → Redeploy

# Option 2: Rollback to known-good commit
git revert <commit>
git push origin main
# Auto-redeploys

# Option 3: Quick fix
git fix-<issue>
git push origin main
# Auto-redeploys
```

**Recovery time**: 2–5 minutes

---

## Support & Monitoring

### Vercel Dashboard
- Deployments tab: View all deploys + logs
- Analytics: Traffic, response times, error rates
- Settings: Environment, domains, integrations

### Sentry
- Alerts: Error rate, performance, new issues
- Releases: Track which version has issues
- Performance: Slow requests identified

### Supabase Dashboard
- Database browser: Query data live
- Logs: Real-time database logs
- Backups: Auto-backup to 7 days

---

## Success Metrics (Week 1)

- 0 critical errors in Sentry
- API response time < 2s
- Poster generation success > 95%
- Cost per poster < $0.05
- User feedback: "Works great" or better

---

## Next Steps

1. **Secure credentials** (Supabase, Upstash, Sentry, HuggingFace)
2. **Create Vercel project** + connect GitHub
3. **Push to main branch**
4. **Monitor first deployment**
5. **Begin Phase 1 development** (Weeks 1–4)

**Estimated go-live**: 4 weeks from today

Ready? Let's deploy.
