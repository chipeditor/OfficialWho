# Team Meeting — Scope Reset & Sprint Plan

**Date**: 2026-07-06
**Trigger**: Scope grew from "alumni poster generator" → global hall-of-honor platform
(profiles, verification ladder, co-signs, Honor Number, featured system, prints, share loops).
Before building further: freeze scope, sequence sprints, and pressure-test monetization.

**Seats**: Architecture · Frontend · Backend · AI/Image · DevOps · **Payments/Fintech (new)** ·
**Trust & Safety (new)** · **Growth (new)**

---

## 1. What We Are (scope statement)

> OfficialWho is the global, visual-first hall of honor: verified biography pages that look
> art-directed, funded by honor products (submissions, hero imagery, prints, archives) —
> never by verification, featuring, or co-signs.

**The product is the honoree page.** Posters, prints, and hero images are artifacts OF the
page. Everything ships in service of a page worth sharing.

## 2. Scope Freeze (MoSCoW)

**MUST (launch)**
- Auth (email + Google/Apple OAuth), honoree profile pages (hero, story, timeline, links, media)
- "Submit Your Honoree" wizard (5 steps, per UX comps) — free draft, watermarked preview
- Payments v1: $19 publish / $29 hero image / $39 bundle (Stripe Checkout + Apple/Google Pay)
- Verification ladder v1: attestation + email/OAuth-domain checks; public /verification page
- External links on profiles (see §5); photo uploads (5 free)
- Share loop: per-honoree OG cards, ShareBar everywhere
- Real Supabase (schema exists), RLS, audit logs

**SHOULD (fast follow, weeks 5–8)**
- Co-sign system + badges (10/50/100/1K) + Honor Number v1 (real 0°/1°)
- Prints via POD (Printful/Prodigi) + Stripe
- Legacy Archive premium (video/audio/docs — see §6)
- Featured Honoree system (editorial tools + weekly cadence)

**COULD (weeks 9–12)**
- Group gifting / Honoree Registry (§4), gift cards
- Leaderboards, Hall of Legends, map view
- Org/B2B portal (bulk import + verification dashboard + invoicing)

**WON'T (explicitly out, revisit post-launch)**
- Native mobile apps (responsive web + PWA first)
- Messaging/DMs (moderation load too early)
- P2P money of any kind (see Fintech red lines)
- AI school-metadata discovery for the poster engine (keep mocked until profiles ship)

## 3. Fintech Seat — Smart Monetization (with red lines)

**Adopt now**
- Stripe Checkout + Payment Links; Apple Pay/Google Pay (gift buyers are mobile);
  Stripe Tax for international sales tax/VAT; multi-currency presentment (global platform)
- RevenueCat stays for future app subscriptions only — web one-times go direct Stripe

**Adopt in COULD phase (the differentiated plays)**
- **Honoree Registry / group gifting**: a retirement, graduation, or memorial creates a
  registry (hero image, framed print, Legacy Archive). Family & friends chip in toward
  items — like a wedding registry for honor. Regulatory-light because contributions
  purchase OUR products (no custodial funds, no payouts to individuals).
- **Gift cards** ("Give an honor"): holiday/retirement season play, high margin,
  standard gift-card rules only.
- **B2B invoicing**: departments/alumni associations pay by invoice (Stripe Invoicing)
  for bulk submissions + wall prints.

**Red lines (Trust & Safety co-signed)**
- ❌ No custodial wallets, no P2P transfers, no cash tributes, no memorial-fund escrow —
  that's money-transmitter licensing + KYC + fraud surface. If families want fundraising,
  we partner/affiliate (GoFundMe, Ever Loved), we don't hold funds.
- ❌ No BNPL on honor products (predatory optics on grief/pride purchases)
- ❌ Nothing that routes money to a profile's status: no paid featuring, paid co-signs,
  paid verification, paid ranking — the Marquis test applies to every future SKU:
  **"Does paying change what's true or only what's crafted?"** Only craft may be paid.

## 4. Growth Seat — conversion notes

- Registry converts the *audience* of an honoring event (50–500 guests) into accounts
- Co-sign remains the top-of-funnel engine (free account → 1° Honor Number → own submission)
- Featured week + share loop stays free/editorial — it's marketing, not inventory

## 5. External Links on Profiles (Backend + T&S)

- **Free**: 3 links per profile (personal site, LinkedIn, news, YouTube, obituary, etc.)
- **Premium (part of Legacy Archive)**: unlimited links, custom labels, click analytics
- Safety: URL scanning (Safe Browsing API), nofollow/ugc rel attributes, domain
  reputation check, no link-based verification claims
- **Two visual classes**: "Family-provided links" (default chips) vs "Evidence" (sources
  that satisfied Tier 2 verification — rendered with the truth-badge family, immutable)
- Anti-Marquis: links never affect badges; premium buys *quantity/analytics*, not credibility

## 6. Premium Media — "Legacy Archive" (AI/Image + Architecture)

Pay for capacity and craft, never status:

| | Free | Legacy Archive ($49/yr or $79 lifetime per honoree) |
|---|---|---|
| Photos | 5 | 500 |
| Video | — | 30 min (Mux/Cloudflare Stream, usage-priced under the hood) |
| Audio | — | Voice recordings ("hear their voice" — memorial gold) |
| Documents | — | Letters, certificates, service records (PDF viewer) |
| Links | 3 | Unlimited + analytics |
| Badges/verification | identical | identical ← the anti-Marquis clause, in the pricing table |

Storage costs are real, so the price is honest — this is capacity, not a vanity fee.
Every archive item renders in the cinematic page language (film-strip, plaque frames).

## 7. Sprint Plan (2-week sprints)

| Sprint | Theme | Ships |
|---|---|---|
| **0** (this wk) | Foundations | Domain live, Supabase provisioned + schema migrated, auth working, CI green |
| **1** | Profiles & Submission | Honoree page (hero/story/timeline/links/photos), 5-step wizard, free draft + watermark |
| **2** | Money & Publish | Stripe ($19/$29/$39), publish flow, per-honoree OG cards, receipts w/ honoree language |
| **3** | Trust | Verification ladder v1, /verification public page, link safety, audit trail UI |
| **4** | Community | Co-sign system + badges, Honor Number v1, tribute wall, share-moment triggers |
| **5** | Artifacts & Archive | POD prints + Stripe, Legacy Archive (photos→video→audio), print upsell flow |
| **6** | Stage & Scale | Featured system + editorial tools, registry v1, leaderboards, load test, LAUNCH |

**Definition of done, every sprint**: deployed to production, tested on mobile,
honoree-language copy review, Marquis-test on any new SKU, audit logging on new mutations.

**KPIs from Sprint 2 on**: publish conversion (draft→paid), share rate per publish,
co-signs per honoree, registry attach rate, refund rate (<2%).

## 8. Decisions Log

1. Scope frozen per §2 — new ideas go to `docs/PARKING_LOT.md`, not into sprints
2. All payments through Stripe; no custodial money, ever (red lines §3)
3. Legacy Archive is the premium container for media + links (one SKU, not five)
4. Verification, featuring, co-signs, rankings: free forever, code-enforced
5. Poster engine's dynamic school-discovery stays mocked until profiles ship —
   the page is the product now; posters are artifacts of it
