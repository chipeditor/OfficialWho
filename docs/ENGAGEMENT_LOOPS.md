# Engagement Loops — Featured, Share, Honor Number

**Date**: 2026-07-06
**Scope**: International platform. All loops must work across languages/regions (195-country framing).

---

## 1. "Featured on OfficialWho" — Make It a Big Deal

Being featured is the platform's highest-visibility honor. Treat it like a magazine cover.

- **Cadence**: one global Featured Honoree per week (+ per-category and per-country
  features as volume grows — "Featured in Law Enforcement," "Featured in Brazil")
- **Treatment**: gold-bordered spotlight on the landing page, top of Discover, push/email
  to followers, and a shareable branded card auto-generated for the honoree's family
- **Artifact**: "As Featured on OfficialWho" badge — permanent on the profile, printed
  seal available on physical products (print upsell tie-in)
- **Selection**: editorial + community signals (tributes, shares, story completeness).
  NEVER purchasable (same doctrine as verification). A paid feature is an ad and must be
  labeled as such if ever offered — default: don't.

## 2. Share Loop — Branded Listing Shares

Every profile/story/feature gets a one-tap branded share:

- **Mechanics**: Web Share API on mobile; X / Facebook / LinkedIn / WhatsApp intents +
  copy-link on desktop (implemented in `ShareBar`, `src/app/page.tsx`)
- **Branded OG cards**: every share unfurls as a cinematic card (portrait, name, honor
  line, logo) — `public/brand/og-image.jpg` today; per-honoree dynamic OG images via
  `next/og` ImageResponse in Phase 2
- **Share moments** (ranked by emotional peak):
  1. "My father was just featured on OfficialWho"
  2. Honoree page published ("Submit Your Honoree" completion)
  3. Verification badge upgrade ("Officially Verified")
  4. Honor Number claim / rank change
  5. Tribute received ("Someone honored my story")
- **Copy voice**: shares announce an honor, never promote a product

## 3. Honor Number — Degrees of Separation Gamification

Erdős-number-style bragging rights: your distance from a verified honoree.

- **0°** — you are a verified honoree (rare, coveted)
- **1°** — a verified honoree lists you as family/colleague, or you submitted them
- **2°** — you're connected to a 1° person
- **3°+** — computed transitively across the verified graph

**Mechanics (Phase 2+)**:
- Number computed from the verified-connection graph (submitter ↔ honoree,
  family links, same-unit/class attestations); recomputed on new connections —
  your number only improves, never degrades (loss aversion works for us)
- **Leaderboards**: per city, school, department, country ("Lowest average Honor
  Number: Chicago Fire Department") — org pride drives group adoption
- **Ranks/titles** by contribution, not payment: Storyteller (1 submission),
  Legacy Keeper (3), Historian (10), Guardian of the Hall (25+)
- Share card: "My Honor Number is 1° — greatness shakes my hand."

**MVP teaser (live now)**: self-declared 1°/2°/3° picker on the landing page with a
share CTA — zero backend, primes the mechanic and feeds the share loop.

**Integrity rule**: Honor Numbers derive ONLY from verified connections. Self-declared
numbers (MVP) are clearly playful; real numbers arrive with verified profiles.

## 4. Stickiness Systems (beyond gamification)

- **Anniversaries**: auto-resurface honoree milestones ("5 years since Sgt. Walker's
  retirement — add a tribute") — built-in return trigger, print re-upsell
- **Tribute threads**: anyone can add a memory to an honoree page (moderated);
  every tribute notifies the family → return visit
- **Weekly digest**: "This week in your halls" — new honorees from your school,
  department, city, country
- **Streak-free by design**: this is a hall of honor, not Duolingo. Return triggers are
  events (features, tributes, anniversaries), not guilt mechanics.

## KPIs

- Share rate per published honoree (target: >40% of publishes generate ≥1 share)
- K-factor from share → visit → submission
- Honor Number claims per week; % converting to profile creation
- Featured-week traffic multiple vs. baseline
