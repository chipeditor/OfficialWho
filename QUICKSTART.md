# QuickStart: Deploy OfficialWho to Vercel

**Estimated time**: 30 minutes to first deployment  
**Difficulty**: Beginner-friendly  
**Tagline**: Verified. Celebrated. Remembered.

---

## Step 1: Clone & Setup (5 minutes)

```bash
cd /Users/chipeberhart/Documents/Claude\ Code/Alumi\ Poster\ Generator

# Verify structure
ls -la src/ package.json vercel.json

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

---

## Step 2: Create External Services (10 minutes)

### A. Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
   - Name: `officialwho`
   - Region: US East (closest to Vercel)
3. Wait for project creation (2–3 min)
4. Copy credentials:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_KEY`
5. Paste into `.env.local`

### B. Upstash Redis
1. Go to https://console.upstash.com
2. Click "Create Database"
   - Type: Redis
   - Region: US East
3. Copy credentials:
   - **REST URL** → `UPSTASH_REDIS_REST_URL`
   - **REST Token** → `UPSTASH_REDIS_REST_TOKEN`
5. Paste into `.env.local`

### C. Hugging Face API Key
1. Go to https://huggingface.co/settings/tokens
2. Create new token (read-only ok)
3. Paste into `.env.local` as `HUGGING_FACE_API_KEY`

### D. Sentry (Optional, can skip for MVP)
1. Go to https://sentry.io
2. Create account → New Project (Next.js)
3. Copy DSN → `.env.local` as `SENTRY_DSN`

---

## Step 3: Database Migration (5 minutes)

```bash
# From project root
npm run db:migrate

# Verify tables exist
# Go to Supabase Dashboard → SQL Editor
# Run: SELECT * FROM schools LIMIT 1;
# Should return: (0 rows)
```

---

## Step 4: Local Test (5 minutes)

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Should see landing page

# Press Ctrl+C to stop
```

---

## Step 5: Connect GitHub (5 minutes)

```bash
# Push to GitHub (if not already)
git add .
git commit -m "Initial commit: MVP scaffold"
git push origin main
```

1. Go to https://vercel.com
2. Sign up or sign in with GitHub
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Import"

---

## Step 6: Add Vercel Environment Variables (5 minutes)

In Vercel dashboard:

1. Project Settings → Environment Variables
2. Add ALL variables from `.env.production.example`:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_KEY
   UPSTASH_REDIS_REST_URL
   UPSTASH_REDIS_REST_TOKEN
   HUGGING_FACE_API_KEY
   SENTRY_DSN
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://legacywho.com
   LOG_LEVEL=info
   FREE_TIER_DAILY_LIMIT=2
   DAILY_API_BUDGET_THRESHOLD=5
   MONETIZATION_ENABLED=false (for MVP)
   ```

3. Save → Auto-triggers deployment

---

## Step 7: Configure Domain (5 minutes)

1. In Vercel dashboard: Settings → Domains
2. Add domain: `officialwho.com`
3. Follow Vercel's nameserver instructions
   - Point your domain registrar (GoDaddy, Namecheap, etc.) to Vercel nameservers
   - Wait 5–10 minutes for DNS propagation
4. Verify: `officialwho.com` → Shows Vercel deploy ✓

---

## Step 8: First Deployment ✅

```bash
# Your repo is already connected to Vercel
# Any push to main auto-deploys

# Check deployment status:
# Vercel Dashboard → Deployments → View latest

# Visit your domain:
# https://officialwho.com
```

---

## What's Live Now

✅ Landing page  
✅ Domain name  
✅ Vercel hosting  
✅ Database connected  

❌ Poster generation (Phase 1, Week 2)  
❌ Then/Now template (Phase 1, Week 2–3)  
❌ Monetization (Phase 2)  

---

## Next: Begin Phase 1 Development

See `PHASE_1_ROADMAP.md` for 4-week sprint plan.

**Week 1 priorities**:
1. School search API (`GET /api/schools/search`)
2. Image upload API (`POST /api/upload`)
3. Generate page UI
4. Basic poster generation (FLUX.1 integration)

---

## Troubleshooting

### "Build fails on Vercel"
- Check build log: Vercel Dashboard → Deployments → Click failed deploy
- Verify all environment variables present
- Test locally: `npm run build`

### "Domain not resolving"
- Verify nameservers changed at registrar
- Wait 15 minutes (DNS propagation)
- Check Vercel nameservers correct

### "Database connection error"
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Test connection locally: `npm run dev`
- Check Supabase project is active (free tier expires after 7 days inactivity)

### "Image generation fails"
- Verify `HUGGING_FACE_API_KEY` is valid
- Check HF API quota (free tier: ~15 req/min)
- See Phase 1 Week 3 for fallback implementation

---

## Success Criteria

- [ ] `officialwho.com` loads without errors
- [ ] Landing page displays "Verified. Celebrated. Remembered." tagline
- [ ] Vercel deployments trigger on git push
- [ ] Supabase tables exist (verified in SQL editor)
- [ ] Redis connection works (`npm run dev` shows no Redis errors)

**If all ✓, you're ready for Phase 1 development!**

---

**Need help?** See `DEPLOYMENT_GUIDE.md` for detailed troubleshooting.

Go build. 🚀

**OfficialWho: Not another social network. A digital hall of honor.**
