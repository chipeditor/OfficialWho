# 🚀 DEPLOY NOW: OfficialWho.com

**Status**: Ready to execute  
**Timeline**: 30 minutes to first deployment  
**Domain**: OfficialWho.com  
**Tagline**: Verified. Celebrated. Remembered.

---

## Pre-Deployment (Right Now)

### 1. Register Domain (2 minutes)
```
Domain: OfficialWho.com
Registrar: GoDaddy / Namecheap / Google Domains (your choice)
Budget: $15–20/year
⏱️ Do this FIRST (DNS propagation takes 5–10 min)
```

### 2. Create External Services (10 minutes)

#### Supabase (PostgreSQL Database)
```
URL: https://supabase.com/dashboard
Project name: officialwho
Region: US East
Free tier: Yes
Copy to .env.local:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_KEY
```

#### Upstash Redis (Caching)
```
URL: https://console.upstash.com
Database type: Redis
Region: US East
Free tier: Yes (10k commands/day)
Copy to .env.local:
  - UPSTASH_REDIS_REST_URL
  - UPSTASH_REDIS_REST_TOKEN
```

#### Hugging Face API Key (Image Generation)
```
URL: https://huggingface.co/settings/tokens
Create token: Read-only ok
Copy to .env.local:
  - HUGGING_FACE_API_KEY
```

#### Sentry (Error Tracking) - Optional
```
URL: https://sentry.io
Framework: Next.js
Free tier: Yes (5k events/month)
Copy to .env.local:
  - SENTRY_DSN
```

### 3. Setup Local Environment (5 minutes)
```bash
cd /Users/chipeberhart/Documents/Claude\ Code/Alumi\ Poster\ Generator

# Copy env template
cp .env.example .env.local

# Edit .env.local with credentials from steps 1-4
# (Supabase, Upstash, HF key, Sentry DSN)

# Verify dependencies
npm install

# Run database migrations
npm run db:migrate

# Test local dev server
npm run dev
# Visit http://localhost:3000
# Should see landing page
# Press Ctrl+C to stop
```

### 4. Push to GitHub (3 minutes)
```bash
git add .
git commit -m "Deploy: OfficialWho MVP - Verified. Celebrated. Remembered."
git push origin main
```

---

## Deployment to Vercel (5 minutes)

### Step 1: Connect Vercel to GitHub
```
URL: https://vercel.com
1. Sign in (GitHub login)
2. "Import Project"
3. Select your repo
4. Click "Import"
```

### Step 2: Add Vercel Environment Variables
```
In Vercel Dashboard → Settings → Environment Variables

Add ALL of these (copy from .env.local):
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_KEY
  - UPSTASH_REDIS_REST_URL
  - UPSTASH_REDIS_REST_TOKEN
  - HUGGING_FACE_API_KEY
  - SENTRY_DSN (if using)
  - NODE_ENV=production
  - NEXT_PUBLIC_APP_URL=https://officialwho.com
  - LOG_LEVEL=info
  - FREE_TIER_DAILY_LIMIT=2
  - DAILY_API_BUDGET_THRESHOLD=5
  - MONETIZATION_ENABLED=false

Save → Auto-triggers deployment
```

### Step 3: Configure Domain
```
In Vercel Dashboard → Settings → Domains
1. Add domain: officialwho.com
2. Copy Vercel nameservers
3. Go to your domain registrar
4. Update nameservers (points domain to Vercel)
5. Wait 5–10 minutes for DNS to propagate
6. Verify: officialwho.com → Vercel deploy ✓
```

---

## Verify Deployment ✓

```bash
# Check Vercel dashboard
# Deployments tab → Should show 1 successful deploy

# Visit your domain (after DNS propagates)
# https://officialwho.com
# Should load without errors

# Check landing page
# Should display tagline: "Verified. Celebrated. Remembered."
```

---

## If Something Breaks

### "Build failed"
- Check Vercel build log: Deployments → Failed deploy → View log
- Verify all env vars present in Vercel
- Test locally: `npm run build`

### "Domain not resolving"
- Wait 15 minutes (DNS propagation)
- Verify nameservers changed at registrar
- Check Vercel nameservers are correct

### "Database connection error"
- Verify Supabase credentials in .env.local
- Test locally: `npm run dev`
- Check Supabase project is active

### "Can't connect to Redis"
- Verify Upstash Redis URL is correct
- Test locally: `npm run dev`
- Check Redis is within free tier quota

---

## What's Now Live

✅ Landing page (officialwho.com)  
✅ Domain + SSL  
✅ Database connected  
✅ Vercel auto-deployment (any push to main)  
✅ Tagline: "Verified. Celebrated. Remembered."  

❌ Poster generation (Phase 1, Week 2)  
❌ Then/Now template (Phase 1, Week 2–3)  
❌ Monetization (Phase 2)  

---

## Next: Phase 1 Development

See `PHASE_1_ROADMAP.md` for detailed 4-week sprint plan.

**Week 1 priorities**:
1. School search API
2. Image upload API
3. Poster generation (FLUX.1)

---

## Success Checklist

- [ ] Domain registered (OfficialWho.com)
- [ ] Supabase project created
- [ ] Upstash Redis created
- [ ] HuggingFace API key obtained
- [ ] GitHub repo pushed (main branch)
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Domain pointed to Vercel nameservers
- [ ] officialwho.com loads (after DNS propagates)
- [ ] Landing page displays tagline
- [ ] Vercel deployments working

---

## Timeline

```
NOW:     Register domain (parallel with next steps)
Next:    Create external services (10 min)
Next:    Setup local environment (5 min)
Next:    Push to GitHub (3 min)
Next:    Connect Vercel (5 min)
Next:    Add environment variables (2 min)
Next:    Configure domain in Vercel (1 min)
+5-10min: DNS propagates
Then:    OfficialWho.com LIVE 🚀

Total elapsed time: 30 minutes + DNS propagation
```

---

## Support

- **Deployment questions**: See `DEPLOYMENT_GUIDE.md`
- **Phase 1 roadmap**: See `PHASE_1_ROADMAP.md`
- **Troubleshooting**: See `QUICKSTART.md`

---

**Ready?**

Start with domain registration, then follow the checklist above.

**OfficialWho: Not another social network. A digital hall of honor.**

Let's go. 🚀
