# Monetization Architecture

**Status**: Modular, non-blocking design ready for integration  
**RevenueCat Integration**: Ready to plug-in when business model confirmed

---

## Design Philosophy

✅ **Non-blocking**: Monetization layers cleanly separated from core generation logic  
✅ **Feature-flaggable**: Can launch without monetization; toggle on later  
✅ **Mock-first**: All services have mock implementations; RevenueCat swapped in as drop-in replacement  
✅ **Tier-driven**: All logic derived from tier config; easy to adjust tiers without code changes  

---

## Revenue Principles (The Anti-Marquis Doctrine)

> **Charge for the honor, never the truth.**

1. **Verification is free, always.** No paid verification, no paid expediting, no
   verification-adjacent upsell. Enforced in code: the verification service has zero
   dependency on entitlements/payments. See `VERIFICATION_MODEL.md`.
2. **We charge for craft, not status**: the submission (publishing a tribute), the
   honoree hero image, and physical prints.
3. **Transparent pricing on the page. No sales calls. Ever.**

### What's Paid vs. Free

| | Free | Paid |
|---|---|---|
| Draft & preview a tribute (watermarked) | ✅ | |
| Verification (all tiers, forever) | ✅ | |
| Browsing, stories, tributes, messages | ✅ | |
| **Publish a submission** (honoree page + 2 digital tribute posters) | | **$19 one-time** |
| **Honoree Hero Image** (cinematic AI portrait — the design-comp panel look; profile hero + poster backgrounds) | | **$29 one-time** |
| Submission + Hero bundle | | **$39** |
| Prints (poster/framed/canvas/metal) | | **$29–$129** (see On-Demand Printing) |
| Membership tiers (multiple honorees, member print pricing) | | $0.99 / $5.99 (existing tiers) |

**The funnel**: Submit free → see watermarked preview (emotional peak) → pay $19–39 to
publish → print upsell ("Bring the honor home") → membership for families/orgs with
multiple honorees.

**Why the hero image is the premium anchor**: the cinematic honoree portrait (per the
design comps' diagonal panels) is the single most shareable, display-worthy artifact —
high perceived value, near-zero marginal cost, and it makes every downstream print
worth more.

---

## Current Architecture (Mock Mode)

### Layer 1: Entitlements Service (`src/services/entitlements.ts`)

**What it does**:
- Tracks user tier (free, pro, plus, enterprise)
- Manages monthly render quotas
- Defines feature access by tier
- Currently: In-memory mock (localStorage-backed)

**Tier Configuration**:
```typescript
free:      2 renders/month, watermark, limited styles
pro:       10 renders/month, no watermark, $0.99 one-time
plus:      100 renders/month, no watermark, batch processing, $5.99/month
enterprise: 10k renders/month, custom pricing
```

**Key methods**:
- `getUserEntitlements(userId)` → Returns entitlements for user
- `canRender(userId)` → Check if user has quota remaining
- `recordRender(userId)` → Increment monthly counter
- `isStyleAllowed(tier, style)` → Check tier has access to style

### Layer 2: React Hooks (`src/hooks/useUserTier.ts`)

**Hooks**:
- `useUserTier(userId)` → Get full entitlements
- `useCanRender(userId)` → Check render permission + reason
- `useIsStyleAllowed(userId, style)` → Check style access
- `useFeatureAvailable(userId, 'batch' | 'priority')` → Check feature access

**Usage in Components**:
```tsx
function GenerateButton({ userId }) {
  const { canRender, reason } = useCanRender(userId)
  
  if (!canRender) {
    return <UpgradePrompt reason={reason} />
  }
  
  return <button>Generate Poster</button>
}
```

### Layer 3: Tier Rate Limiting Middleware (`src/middleware/tier-rate-limit.ts`)

**Middlewares**:
- `tierRateLimitMiddleware()` → Enforce quota on API routes
- `tierQueuePriorityMiddleware()` → Queue priority by tier
- `tierWatermarkMiddleware()` → Apply watermark based on tier
- `tierStyleRestrictionsMiddleware()` → Enforce style access

**Applied to**:
- `POST /api/generate` → Check quota before starting generation
- Job queue → Priority by tier (free users wait 5min, Plus gets 30s)
- Image rendering → Add watermark if tier requires

### Layer 4: API Endpoint (`src/api/entitlements/[userId].ts` — TBD)

**Endpoint**: `GET /api/entitlements/{userId}`

**Response**:
```json
{
  "tier": "pro",
  "rendersPerMonth": 10,
  "renderingRemaining": 7,
  "hasWatermark": false,
  "allowedStyles": ["all"],
  "batchProcessing": false,
  "priorityQueue": false
}
```

---

## RevenueCat Integration (Next Phase)

### Phase: When to Add?

**Option A: Add after Phase 1** (Recommended)
- Finish core poster generation first
- Launch as "beta, always free"
- Add monetization once product-market fit confirmed
- Timeline: Week 5-6

**Option B: Build in parallel with Phase 2**
- Implement alongside streaming UI + error recovery
- Ready to monetize by Week 3
- More complex integration with job queue

### Integration Points (Drop-in Replacements)

#### 1. Replace `src/services/entitlements.ts`

**Current** (mock):
```typescript
export class EntitlementsService {
  async getUserEntitlements(userId: string): Promise<UserEntitlements> {
    const tier = this.userTiers.get(userId) || 'free'
    // ...
  }
}
```

**With RevenueCat** (actual):
```typescript
import Purchases from 'react-native-purchases'

export class EntitlementsService {
  async getUserEntitlements(userId: string): Promise<UserEntitlements> {
    // Initialize RevenueCat (happens once on app start)
    if (!Purchases.isConfigured) {
      await Purchases.setup('apple_api_key')
      await Purchases.setAppUserID(userId)
    }
    
    const customerInfo = await Purchases.getCustomerInfo()
    const entitlement = customerInfo.entitlements.active['renders_tier']
    
    if (!entitlement) {
      return TIER_CONFIGS['free']
    }
    
    // Map RevenueCat entitlement → tier
    const tierMap = {
      'renders_unlimited': 'plus',
      'renders_10': 'pro',
    }
    
    const tier = tierMap[entitlement.identifier] || 'free'
    return TIER_CONFIGS[tier]
  }
}
```

#### 2. Update React Hooks

**Current** (calls `/api/entitlements`):
```typescript
export function useUserTier(userId: string) {
  const [entitlements, setEntitlements] = useState(null)
  useEffect(() => {
    fetch(`/api/entitlements/${userId}`).then(...)
  }, [userId])
}
```

**With RevenueCat**:
```typescript
import { useCustomerInfo } from '@react-native-community/purchases'

export function useUserTier(userId: string) {
  const { customerInfo, loading } = useCustomerInfo()
  
  // Derive tier from customerInfo.entitlements.active
  const tier = customerInfo?.entitlements.active['renders_tier']
    ? 'plus'
    : 'free'
  
  return { entitlements: TIER_CONFIGS[tier], loading }
}
```

#### 3. Backend Webhook for Subscription Events

**New file**: `src/api/webhooks/revenuecat.ts`

```typescript
// RevenueCat sends webhook when user subscribes/cancels
export async function POST(request: Request) {
  const event = await request.json()
  
  // Map event to Supabase
  switch (event.type) {
    case 'INITIAL_PURCHASE':
    case 'RENEWAL':
      await db.user_subscriptions.upsert({
        user_id: event.app_user_id,
        tier: event.entitlement,
        expires_at: event.expiration_date,
      })
      break
    case 'SUBSCRIPTION_CANCELLED':
      await db.user_subscriptions.delete({
        user_id: event.app_user_id,
      })
      break
  }
}
```

#### 4. API Rate Limiting (No change needed)

The middleware already has tier info; RevenueCat just feeds different tier values:

```typescript
// This works the same way
const entitlements = await entitlementsService.getUserEntitlements(userId)
if (entitlements.renderingRemaining <= 0) {
  return error429()
}
```

---

## RevenueCat Configuration

### Packages to Set Up

In RevenueCat dashboard, create:

| Package ID | Display | Product ID | Offering |
|---|---|---|---|
| `renders_pro` | "Pro" | `renders_pro_99_onetime` | $0.99 one-time |
| `renders_plus` | "Plus" | `renders_plus_599_monthly` | $5.99/month or $49.99/year |

### Entitlements

Map to render tier:
- `renders_pro` → `pro` tier (10 renders)
- `renders_plus` → `plus` tier (100 renders)
- (nothing) → `free` tier (2 renders)

### SDK Setup

**Client (Next.js)**:
```bash
npm install react-native-purchases
```

**Server (verification)**:
```bash
npm install revenuecat  # For server-side validation
```

### Environment Variables

```
NEXT_PUBLIC_REVENUECAT_API_KEY=appl_...
REVENUECAT_API_SECRET=...
```

---

## Watermark Implementation

### Where Applied: `src/services/image-rendering.ts` (TBD)

```typescript
async function renderPoster(
  userId: string,
  artworkUrl: string
): Promise<Buffer> {
  const entitlements = await entitlementsService.getUserEntitlements(userId)
  
  if (entitlements.hasWatermark) {
    // Add "TapTap Performance" watermark to bottom-right
    return addWatermark(artworkUrl, 'TapTap Performance')
  }
  
  return artworkUrl
}
```

### Watermark Design

- Position: Bottom-right corner
- Opacity: 40%
- Font: "TapTap Performance" (or custom)
- Size: 1/10 of image width
- Color: White with dark outline (readable on any background)

---

## Free Tier Strategy

### Why 2 Renders/Month + Watermark?

**Prevents abuse** (estimated):
- At 2/month = 24 renders/year max per free user
- At 1000 free users = 24k renders/year ≈ $500-1000 API cost
- Sustainable on Supabase free tier

**Encourages upgrade**:
- Watermark reminds user on every share → viral CAC
- First 2 posters likely for close friends (low urgency to remove watermark)
- Third poster triggers "upgrade to continue" friction

**Backup model if abuse**:
- Implement email verification + 1 render per day
- Or IP-based rate limiting
- Or make renders expire (2/week instead of 2/month)

---

## On-Demand Printing (Physical Honors)

> **Copy rule (non-negotiable)**: The flow is always **"Submit Your Honoree"** — never "Add your poster."
> Users don't buy posters; they honor someone. All CTAs, emails, and receipts use honoree language.

### The Flow

```
Submit Your Honoree → Verify → Generate tribute → Digital preview (free/watermarked)
                                                       ↓
                                        "Bring this honor home" (print upsell)
```

### Product Line

| Product | Retail | Est. COGS (POD) | Margin |
|---------|--------|------------------|--------|
| Premium poster print (18×24, matte) | $29 | $8–12 | ~$18 |
| Framed print (18×24, wood frame) | $79 | $25–35 | ~$45 |
| Canvas wrap (16×20) | $69 | $20–28 | ~$42 |
| Metal / plaque tribute (12×18) | $99 | $30–40 | ~$60 |
| Hall of Honor bundle (framed + 2 posters) | $129 | $45–55 | ~$75 |

### Fulfillment

- **POD partner**: Printful / Prodigi / Gelato — zero inventory, pay-per-order (fits free-tier cost constraint: no fixed costs)
- Webhook-driven: order placed → POD API → tracking synced to user's profile
- Printed pieces are **never watermarked** — print purchase includes the clean render, on any tier
- 300 DPI output pipeline already a core requirement (see Print-Ready Quality)

### Why Print Fits the Brand

- A "digital hall of honor" earns its physical counterpart — the mantelpiece, the station wall, the trophy case
- Physical product = gift purchase (families buying for honorees), which decouples the buyer from the user
- Print margin ($18–75/order) dwarfs subscription ARPU; even 2% attach rate on renders materially changes unit economics
- Tier synergy: Pro/Plus members get member pricing (e.g., 15% off prints) — subscription justification without paywalling honor itself

### Integration Points

- `entitlements.ts` → add `printDiscountPct` per tier (free: 0, pro: 10, plus: 15, enterprise: wholesale)
- `POST /api/orders` (Phase 2) → create POD order, log to `audit_logs`
- RevenueCat handles subscriptions only; print orders go through Stripe checkout (one-time payments)

---

## Scaling the Monetization

### Stage 1: Free + Free Tier (Week 1-4)
- No RevenueCat
- Everyone gets 2 renders/month with watermark
- Measure usage patterns, viral coefficient, abuse

### Stage 2: Add Monetization (Week 5-6)
- Flip RevenueCat switch (no code changes needed)
- Existing free users grandfathered to "free tier"
- Track conversion rate from free → paid

### Stage 3: On-Demand Printing (Month 2+)
- Wire POD partner (Printful/Prodigi) + Stripe checkout
- "Submit Your Honoree" → digital tribute → print upsell
- Highest-margin revenue line; gift purchases decouple buyer from user

### Stage 4: B2B Upsell (Month 3+)
- Reach out to alumni associations + schools
- Custom "Enterprise" tier with unlimited renders, white-label, batch API
- Bulk print orders for reunions, memorials, station walls (wholesale pricing)
- Projected LTV: $500-5000/customer

### Stage 5: Ads Alternative (If needed)
- If monetization too aggressive, add ad-supported tier
- Interstitial ads between renders (video ads = higher eCPM)
- Keep watermark to justify ad placement

---

## Testing & QA

### Before Launch

1. **Tier system**: Test each tier works independently
2. **Quota rollover**: Reset quotas on month boundary
3. **RevenueCat sandbox**: Test purchase flow end-to-end
4. **Server validation**: Verify backend checks entitlements
5. **Grace period**: Handle expired subscriptions gracefully

### Feature Flags

```typescript
// Can disable monetization entirely
const MONETIZATION_ENABLED = process.env.MONETIZATION_ENABLED === 'true'

if (MONETIZATION_ENABLED) {
  await tierRateLimitMiddleware(request, userId)
} else {
  // Let everyone render unlimited
}
```

---

## Success Metrics

Track these once monetization launches:

| Metric | Target | Why |
|---|---|---|
| Free → Pro conversion | 2-5% | Acceptable for freemium |
| Free → Plus conversion | 0.5-2% | Higher friction, higher value |
| Watermark removal rate | 30-50% | Measure viral coefficient |
| Monthly churn (Plus) | <5% | Subscription retention |
| API cost/render | <$0.05 | Maintain 5-10x margin on Pro |
| CAC (paid users) | <$0.50 | Better than any marketing channel |

---

## Migration Path (Zero Downtime)

1. **Deploy entitlements service** (mock mode)
2. **Add tier checks** to UI + API (feature-flagged off)
3. **Test end-to-end** with mock tiers
4. **Integrate RevenueCat** on staging
5. **Flip flag** to enable monetization
6. **Monitor** for 1 week
7. **Adjust tiers** based on real usage

**No redeploy needed once RevenueCat is swapped in** — just changes to API keys.

---

**Next Step**: Wait for monetization team recommendations, then decide Stage 1 vs 2 entry point.
