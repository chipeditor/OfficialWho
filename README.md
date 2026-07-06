# Alumni Legacy Poster Generator

Production-ready full-stack web app that generates premium alumni posters from portrait photos with dynamic school data discovery.

## 🎯 Key Features

- **Zero Hardcoded Data**: All school colors, mascots, landmarks discovered dynamically from Wikipedia, Wikimedia, OpenStreetMap
- **9 Premium Poster Styles**: Sports, Varsity, Luxury, Vintage, Military Tribute, Hall of Fame, Movie Poster, Magazine Cover, Street Art
- **Multi-Provider AI**: Automatic failover between FLUX.1, Pollinations, Stable Diffusion
- **Smart Multi-Layer Caching**: Browser (5min) → Redis (24h) → Database (persistent)
- **Production Observability**: Error tracking, cost budgets, provider health monitoring
- **Print-Ready Output**: 300 DPI with ICC color profiles

## 🏗️ Architecture

### Layers

```
┌─────────────────────────────────┐
│    Frontend (Next.js/React)     │ ← Upload, preview, customization
├─────────────────────────────────┤
│    API Layer (Next.js Routes)   │ ← Validation, rate limiting
├─────────────────────────────────┤
│    Service Layer                │ ← Business logic, orchestration
├─────────────────────────────────┤
│  Multi-Provider Abstraction     │ ← Circuit breakers, failover
├─────────────────────────────────┤
│  3-Tier Caching Layer           │ ← Memory/Redis/Database
├─────────────────────────────────┤
│  External APIs                  │ ← Wikipedia, Pollinations, etc
└─────────────────────────────────┘
```

### Key Design Decisions

1. **Graceful Degradation**: Any API failure surfaces cached data + user feedback
2. **Provider Abstraction**: Swappable image generation without code changes
3. **Cost-First Design**: Every component considers free tier quotas
4. **Observability Default**: All external calls logged, budgets tracked

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Supabase project (free tier ok)
- Vercel account (optional, for deployment)

### Setup

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

3. **Initialize database**

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Start dev server**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000

## 📋 Team Recommendations

### Week 1 (Alpha)

- [x] Multi-provider fallback strategy
- [x] 3-tier caching (memory/Redis/database)
- [x] Production observability (Sentry, cost alerts)
- [x] CI/CD pipeline (GitHub Actions)

### Week 2-3 (Beta)

- [ ] Streaming real-time progress (SSE)
- [ ] Granular error recovery UI
- [ ] Dual-model background removal
- [ ] Smart upscaling pipeline
- [ ] Async job queue with persistence

### Week 4+ (Production)

- [ ] Admin metadata verification
- [ ] Bulk school data imports
- [ ] Compliance & audit logging
- [ ] Rate limiting + user tiers

## 🔧 Technology Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Supabase (PostgreSQL)
- Redis (Upstash for free tier)
- Bull/BullMQ (job queue)
- Sentry (error tracking)

### AI/Image Processing

- FLUX.1 Schnell
- BRIA RMBG
- Pollinations.ai
- Real-ESRGAN (self-hosted)

### DevOps

- Vercel (hosting)
- GitHub Actions (CI/CD)
- Sentry (observability)

## 📊 Success Metrics

- **Reliability**: 99.5% uptime with graceful fallback (<5% failures)
- **Performance**: Poster generation <60s average, <120s 95th percentile
- **Cost**: <$5/day operational spend
- **UX**: 4.5+ star rating, <2% support tickets from API issues

## 🔐 Security

- Input validation with Zod
- Image magic-byte verification
- XSS prevention
- Row-level security in Supabase
- Environment-based API key rotation
- Audit logging for compliance

## 🛠️ Development

### Project Structure

```
src/
├── app/              # Next.js pages and layouts
├── components/       # React components
├── services/         # Business logic (image provider, cache, etc)
├── types/            # TypeScript interfaces
├── utils/            # Utilities (validation, errors, logging)
├── providers/        # AI provider implementations
├── middleware/       # Express-like middleware
├── hooks/            # React hooks
├── db/               # Database schema and utilities
└── api/              # Next.js API routes
```

### Key Files

- `src/types/index.ts` — Domain types and interfaces
- `src/services/image-provider.ts` — Provider abstraction with circuit breaker
- `src/services/cache.ts` — 3-tier caching layer
- `src/utils/errors.ts` — Error classification and recovery
- `src/db/schema.sql` — PostgreSQL schema with RLS

### Running Tests

```bash
npm test              # Run unit tests
npm run test:watch    # Watch mode
npm run load-test     # Load test against free API quotas
```

## 📈 Deployment

### To Vercel

```bash
vercel deploy
```

### Environment Setup

1. Create Supabase project
2. Run migrations: `npm run db:migrate`
3. Seed initial schools: `npm run db:seed`
4. Configure Vercel environment variables
5. Deploy

## 🤝 Contributing

This is a team project with specialist ownership:

- **Architecture**: @architect
- **Frontend**: @frontend-lead
- **Backend**: @backend-lead
- **AI/Image**: @ai-specialist
- **DevOps**: @devops-lead

## 📞 Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Team: See team recommendations in `/docs/TEAM_RECOMMENDATIONS.md`

## 📄 License

MIT

---

**Built with ❤️ by the Alumni Poster Generator team**
