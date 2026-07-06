# Phase 1: MVP Development Roadmap

**Duration**: 4 weeks  
**Target**: OfficialWho.com live with poster generation + Then/Now template prep  
**Team Size**: 1–2 engineers recommended  
**Tagline**: Verified. Celebrated. Remembered.  

---

## Sprint 1: Core Infrastructure (Days 1–7)

### Backend Setup

#### Task 1.1: Supabase Database & Auth
- [ ] Create Supabase project (free tier, US East)
- [ ] Run database migrations: `npm run db:migrate`
- [ ] Test: `psql` query returns tables
- [ ] Setup Row-Level Security (RLS) policies
- [ ] Configure auth: Email/password + anonymous mode
- [ ] Create initial admin user

**Acceptance Criteria**:
- All 14 tables exist + have data
- RLS policies enforce user isolation
- Auth works (sign up, sign in, token refresh)
- Estimated effort: 8 hours

#### Task 1.2: Vercel Setup & Deployment
- [ ] Create Vercel project, connect GitHub
- [ ] Add all environment variables (`.env.production.example`)
- [ ] Test preview deployment (staging)
- [ ] Configure domain: LegacyWho.com
- [ ] SSL certificate auto-provisioned
- [ ] Verify build succeeds locally + on Vercel

**Acceptance Criteria**:
- `vercel deploy` succeeds
- Environment variables present in Vercel dashboard
- Domain resolves to Vercel IP
- Staging URL works
- Estimated effort: 4 hours

#### Task 1.3: External Services Integration
- [ ] Setup Upstash Redis (free tier)
- [ ] Create Sentry project + get DSN
- [ ] Configure HuggingFace API key
- [ ] Test all credentials work locally

**Acceptance Criteria**:
- Redis ping succeeds
- Sentry test event received
- HF API call returns valid response
- Estimated effort: 3 hours

### Frontend Setup

#### Task 1.4: Landing Page & Navigation
- [ ] Build basic nav (Home, Generate, Gallery, About, API Docs)
- [ ] Enhance landing page with feature highlights
- [ ] Add footer + legal links
- [ ] Mobile responsive test

**Acceptance Criteria**:
- Mobile-first, responsive, Lighthouse > 80
- Navigation consistent across pages
- No console errors
- Estimated effort: 6 hours

---

## Sprint 2: API & Poster Generation (Days 8–14)

### API Endpoints

#### Task 2.1: School Search Endpoint
- [ ] `GET /api/schools/search?q=Harvard&state=MA`
- [ ] Implement Wikipedia API lookup
- [ ] Cache results in Supabase
- [ ] Return: school ID, name, colors, mascot, city, state
- [ ] Handle no results gracefully

**Acceptance Criteria**:
- Search returns 5+ results for "Harvard"
- Color data includes hex codes
- Caching TTL: 24 hours
- Error handling for API failures
- Estimated effort: 10 hours

#### Task 2.2: Image Upload Endpoint
- [ ] `POST /api/upload` (multipart/form-data)
- [ ] Validate file: type (JPEG/PNG/WebP), size (< 50MB)
- [ ] Magic byte validation
- [ ] Store in Supabase storage
- [ ] Return: uploadedUrl, previewUrl

**Acceptance Criteria**:
- Upload < 50MB file succeeds
- Reject > 50MB with 400 error
- Reject non-image with 400 error
- Both uploadedUrl and previewUrl returned
- Estimated effort: 8 hours

#### Task 2.3: Poster Generation Endpoint
- [ ] `POST /api/generate` (JSON body)
  - `{ portraitUrl, schoolId, style, graduationYear }`
- [ ] Implement FLUX.1 provider (no fallback yet)
- [ ] Cost tracking + logging
- [ ] Streaming progress via SSE (`/api/events/progress`)
- [ ] Return: jobId, status, imageUrl

**Acceptance Criteria**:
- Generate 1 test poster successfully
- Cost logged to Sentry
- Progress stream works
- Error handling for API failures
- Estimated effort: 16 hours

#### Task 2.4: Rate Limiting Middleware
- [ ] Implement tier-based rate limiting (Upstash Redis)
- [ ] Free tier: 2/month, Pro: 10/month, Plus: unlimited
- [ ] Check quota before allowing generation
- [ ] Return 429 with retry-after header

**Acceptance Criteria**:
- Free user limited to 2 generates/month
- Quota resets on month boundary
- Rate limit headers present in response
- Estimated effort: 6 hours

### Frontend

#### Task 2.5: Generate Page (Upload Flow)
- [ ] Upload portrait (file input + drag-drop)
- [ ] School search with autocomplete
- [ ] Style selector (9 options with preview)
- [ ] Graduation year input
- [ ] Submit button → calls `/api/generate`

**Acceptance Criteria**:
- Drag-drop works on desktop + mobile
- School search returns results
- Style selector shows all 9 options
- Mobile UX smooth (< 5 taps to generate)
- Estimated effort: 12 hours

#### Task 2.6: Progress & Result Pages
- [ ] Real-time progress via SSE
  - "Fetching school data... 25%"
  - "Removing background... 50%"
  - "Generating poster... 75%"
  - "Rendering... 100%"
- [ ] Result page with image + download button
- [ ] Social share buttons (Twitter, LinkedIn, Facebook)
- [ ] "Generate Another" CTA

**Acceptance Criteria**:
- Progress updates in real-time
- Download works (PNG, JPG, PDF)
- Social share pre-fills text + image
- Estimated effort: 10 hours

---

## Sprint 3: Polish & AI Integration (Days 15–21)

### Image Processing

#### Task 3.1: Background Removal
- [ ] Integrate BRIA RMBG (via HuggingFace)
- [ ] Implement as pipeline step before generation
- [ ] Quality check: if confidence < 0.75, retry
- [ ] Cache results

**Acceptance Criteria**:
- Background removal succeeds > 90% of time
- Output quality acceptable (manual review)
- Cost per image < $0.01
- Estimated effort: 8 hours

#### Task 3.2: Watermarking Layer
- [ ] Add watermark to free-tier posters
- [ ] "OfficialWho Verified" text
- [ ] Bottom-right corner, 30% opacity
- [ ] Doesn't trigger on paid tiers (mock for now)

**Acceptance Criteria**:
- Free-tier posters have watermark
- Paid-tier posters don't (mocked)
- Watermark doesn't obscure important content
- Estimated effort: 4 hours

#### Task 3.3: Multi-Provider Setup (Circuit Breaker)
- [ ] Implement circuit breaker pattern
- [ ] Providers: FLUX.1 (primary), Pollinations (fallback)
- [ ] Health tracking: error rate, response time
- [ ] Auto-failover on provider down

**Acceptance Criteria**:
- Circuit breaker state machine works
- Failover tested by mocking FLUX.1 failure
- Health metrics logged to Sentry
- Estimated effort: 10 hours

### Error Handling & Monitoring

#### Task 3.4: Error Recovery UI
- [ ] Graceful error messages (not "Generation failed")
- [ ] Suggest next steps (retry, contact support, etc.)
- [ ] Show cached data if available
- [ ] Link to help docs

**Acceptance Criteria**:
- 5+ error scenarios handled gracefully
- No generic "error" messages
- Support email/chat link present
- Estimated effort: 6 hours

#### Task 3.5: Analytics & Logging
- [ ] Track events: portrait upload, generation start/success/fail, download
- [ ] Log to Sentry: errors, performance metrics
- [ ] Cost tracking: log cost per poster
- [ ] Basic dashboard: renders/day, errors, costs

**Acceptance Criteria**:
- Events captured to analytics
- Errors surface in Sentry
- Cost spreadsheet auto-generated
- Estimated effort: 8 hours

---

## Sprint 4: Testing & Launch Prep (Days 22–28)

### Quality Assurance

#### Task 4.1: End-to-End Testing
- [ ] Test complete flow: upload → generate → download
- [ ] Test on 5+ devices (iPhone, Android, desktop)
- [ ] Test 20 different schools
- [ ] Test all 9 poster styles
- [ ] Manual review of output quality

**Acceptance Criteria**:
- 20/20 posters generate successfully
- Quality acceptable for sharing
- Mobile UX smooth on 3+ devices
- Estimated effort: 12 hours

#### Task 4.2: Load Testing
- [ ] Simulate 50 concurrent users (using k6 or Artillery)
- [ ] Target: < 60s generation time at 50 concurrent
- [ ] Identify bottlenecks
- [ ] Scale Vercel/Supabase if needed

**Acceptance Criteria**:
- 50 concurrent users succeed
- Latency < 60s average
- No database connection errors
- Estimated effort: 6 hours

#### Task 4.3: Security Audit
- [ ] Input validation on all endpoints
- [ ] SQL injection test (Supabase should prevent, verify)
- [ ] XSS test (sanitize user inputs)
- [ ] Rate limiting test (verify quota enforcement)
- [ ] API key exposure test

**Acceptance Criteria**:
- All inputs validated
- No XSS vulnerabilities found
- Rate limiting enforced
- Estimated effort: 8 hours

### Launch Prep

#### Task 4.4: Documentation
- [ ] Update README.md with setup instructions
- [ ] API documentation (endpoint specs, examples)
- [ ] User guide (how to generate a poster)
- [ ] Support email/help page

**Acceptance Criteria**:
- New user can follow README to deploy locally
- All API endpoints documented
- Help page has 5+ FAQs
- Estimated effort: 4 hours

#### Task 4.5: Staging → Production
- [ ] All secrets in Vercel production environment
- [ ] Database backup strategy configured
- [ ] Sentry alerts configured
- [ ] Support email monitored
- [ ] Go/no-go decision

**Acceptance Criteria**:
- Staging environment mirrors production
- All checks pass
- Team ready to launch
- Estimated effort: 3 hours

---

## Success Metrics (End of Week 4)

| Metric | Target | Status |
|--------|--------|--------|
| MVP complete | ✓ | — |
| Poster generation success | > 95% | — |
| API latency | < 60s | — |
| Cost per poster | < $0.05 | — |
| Error rate | < 2% | — |
| Mobile UX | Lighthouse > 80 | — |
| Documentation | Complete | — |
| **Launch Ready** | **Yes** | **— |

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| FLUX.1 API rate limits | Medium | High | Fallback to Pollinations, implement queue |
| Database performance at scale | Low | Medium | Indexes, query optimization, caching |
| Image processing latency | Medium | High | Implement streaming, show progress |
| Watermark quality issues | Low | Medium | A/B test designs before launch |
| Mobile UX friction | Medium | Medium | Test on 5+ devices during Sprint 4 |

---

## Team Communication

**Daily standups** (15 min):
- What completed yesterday
- What starting today
- Blockers

**Weekly demos** (30 min):
- Show working features
- Get feedback
- Adjust priorities

**Async updates** (Slack):
- Deployments
- Errors
- Metrics

---

## Deployment Timeline

```
Week 1 (Days 1-7):   Infrastructure + Landing page
Week 2 (Days 8-14):  API + Upload + Generation
Week 3 (Days 15-21): Polish + AI integration
Week 4 (Days 22-28): Testing + Launch

Friday EOD Week 4:   OfficialWho.com goes live 🚀
```

---

## Post-Launch (Week 5+)

Once MVP is stable:
- Monitor metrics 24/7
- Gather user feedback
- Begin Phase 2: Then/Now template + monetization
- Start User research for Who's Who directory

**Estimated time before Phase 2**: 1 week (stabilization)

---

**Ready to start Week 1?**
