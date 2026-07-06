# Alumni Poster Generator — Claude Code Setup

## Project Overview

Production-ready full-stack web app generating premium alumni posters from portrait photos with **zero hardcoded school data**. All school branding (colors, mascots, landmarks, skylines) discovered dynamically via Wikipedia, OpenStreetMap, Wikimedia Commons.

**Tech Stack**: Next.js 16, React, TypeScript, Tailwind CSS, shadcn/ui, Supabase, PostgreSQL, Edge Functions, Vercel

## Architecture Principles

1. **No Hardcoding**: All school data dynamically discovered and cached
2. **Graceful Degradation**: API failures → cached data + user feedback
3. **Provider Abstraction**: Swappable image generation (FLUX.1 ↔ Pollinations) without code redeploys
4. **Cost-First Design**: Every component considers free tier quotas
5. **Observability by Default**: All external API calls logged, budgets tracked, provider health monitored

## Key Directories

```
src/
├── app/              # Next.js pages (layout.tsx, page.tsx)
├── components/       # React components (form, progress, preview, etc)
├── services/         # Core services (image-provider, cache, job-queue)
├── types/            # Domain types and interfaces
├── utils/            # Utilities (validation, errors, logger)
├── providers/        # AI provider implementations (Flux, Pollinations, Modnet)
├── middleware/       # Auth, rate-limiting, error handling
├── hooks/            # React hooks (useProgress, useSchoolLookup)
├── db/               # Database schema and migrations
└── api/              # Next.js API routes (/api/generate, /api/schools)
```

## Critical Services

### 1. Image Provider Abstraction (`src/services/image-provider.ts`)
- **What**: Multi-provider failover with circuit breaker pattern
- **Fallback Chain**: FLUX.1 → Pollinations → Stable Diffusion → cache templates
- **Circuit Breaker**: Auto-detects failing providers, transitions: CLOSED → OPEN → HALF_OPEN
- **Health Monitoring**: Tracks error rate, response time, success rate

### 2. Multi-Layer Cache (`src/services/cache.ts`)
- **Layer 1**: Browser memory (5 minutes)
- **Layer 2**: Redis (24 hours, via Upstash for free tier)
- **Layer 3**: Supabase database (persistent school metadata)
- **Strategy**: Separate school metadata from user artwork

### 3. Job Queue (`src/services/job-queue.ts` — not yet built)
- **Tool**: Bull/BullMQ with Supabase persistence
- **Tracking**: Metadata lookup → Background removal → AI generation → Upscaling → Rendering
- **Real-time**: WebSocket/SSE progress streaming to client
- **Recovery**: Auto-retry with exponential backoff; resume on page refresh

## Database Schema (`src/db/schema.sql`)

**Key Tables**:
- `schools` — Verified school metadata with confidence scores
- `school_colors`, `school_landmarks` — Dynamic school branding
- `poster_requests` — User submissions
- `poster_jobs` — Generation progress tracking
- `metadata_cache` — API response caching
- `audit_logs` — Compliance-ready event log
- `provider_health` — Per-provider monitoring

**Security**: Row-level security (RLS) enabled; users can only see their own requests

## Development Workflow

### First Time Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with Supabase credentials
npm run db:migrate
npm run db:seed  # Load initial schools
npm run dev
```

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Public anon key
SUPABASE_SERVICE_KEY              # Service role key (server-only)
REDIS_URL                          # Redis connection (Upstash)
HUGGING_FACE_API_KEY              # Hugging Face API
SENTRY_DSN                         # Error tracking
DAILY_API_BUDGET_THRESHOLD        # Alert threshold ($5)
```

## Implementation Phases

### Phase 1: Alpha (Week 1) — Reliability Foundation
- [x] Provider abstraction with circuit breaker
- [x] 3-tier caching strategy
- [x] Observability (Sentry, budget alerts)
- [x] CI/CD with GitHub Actions
- [ ] Implement in code

### Phase 2: Beta (Weeks 2-3) — Features & Quality
- [ ] Streaming real-time progress (SSE)
- [ ] Granular error recovery UI
- [ ] Dual-model background removal (BRIA + Modnet)
- [ ] Smart upscaling (Real-ESRGAN + SwinIR)
- [ ] Async job queue with persistence

### Phase 3: Production (Week 4+) — Compliance
- [ ] Admin metadata verification dashboard
- [ ] Bulk school data import (CSV/JSON)
- [ ] Audit logging + compliance exports
- [ ] User tiers + rate limiting

## Type Safety

All types defined in `src/types/index.ts`:
- Domain models: `SchoolMetadata`, `PosterRequest`, `PosterJob`
- Enums: `PosterStyle`, `JobStatus`, `GenerationStage`
- Provider interface: `IImageProvider` + `ProviderHealth`
- Error types: `ApplicationError`, `ErrorCategory`

Use Zod for runtime validation: `src/utils/validation.ts`

## Error Handling

Categories:
- `user_error` — Invalid input (400)
- `retriable` — Network timeout, rate limit (retry with backoff)
- `quota_exceeded` — API limit hit (fallback or queue)
- `permanent` — Invalid API key (alert ops)

Response envelope:
```typescript
{
  success: false,
  error: {
    code: "RATE_LIMIT_EXCEEDED",
    message: "Daily API quota reached",
    details: { retryAfter: 3600 }
  },
  requestId: "abc123",
  timestamp: "2026-07-06T..."
}
```

## Testing

```bash
npm test                    # Unit tests
npm run type-check          # TypeScript check
npm run load-test           # Load test (k6)
npm run lint                # ESLint
```

## Deployment

```bash
npm run build               # Production build
vercel deploy               # Deploy to Vercel
```

## Team Specialist Ownership

- **Architecture**: Fallback strategy, provider abstraction, caching layers
- **Frontend**: Real-time progress, error recovery UI, customization panel
- **Backend**: Schema design, metadata verification, audit logging
- **AI/Image**: Provider implementations, quality gates, upscaling
- **DevOps**: CI/CD, monitoring, cost budgets, load testing

## Key Constraints & Notes

1. **Free Tier APIs Only**: No paid services (Wikipedia, Nominatim, Hugging Face free, Pollinations, Vercel free, Supabase free)
2. **Never Hardcode Schools**: All data fetched at runtime and cached
3. **Graceful Fallback**: Must surface cached data if APIs fail
4. **Cost Budget**: Alert if daily spend exceeds $5
5. **Observability**: Every external API call logged; cache hits tracked

## Quick References

- **Error codes**: `src/utils/errors.ts` → `ErrorCodes` enum
- **Validation schemas**: `src/utils/validation.ts` → Zod schemas
- **Logging**: `src/utils/logger.ts` → `logger.info/debug/error/warn`
- **Cache keys**: Convention: `${entityType}:${id}` (e.g., `school:123`, `poster-job:456`)
- **Provider fallback**: Implement order in `ImageProviderManager.fallbackChain`

---

**Last Updated**: 2026-07-06  
**Current Phase**: Scaffold Complete — Ready for Phase 1 Implementation
