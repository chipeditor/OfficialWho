# Verification Model — Low Friction, Never For Sale

**Date**: 2026-07-06
**Principle**: *Charge for the honor, never the truth.* Verification is free, cannot be
purchased, and cannot be expedited for money. This is the structural moat against the
Marquis "vanity registry" failure mode.

---

## Design Goals

1. **Zero friction at submission** — verification never blocks publishing. An honoree page
   goes live immediately with an honest status badge; verification upgrades it asynchronously.
2. **Automated first** — humans only review what machines can't.
3. **Progressive trust** — badges upgrade over time; nothing is all-or-nothing.
4. **Free forever** — no paid fast lane, no "premium verification." Published criteria page.

## The Ladder

```
SUBMITTED ──▶ IDENTITY VERIFIED ──▶ SERVICE VERIFIED ──▶ INSTITUTIONALLY VERIFIED
 (instant)      (minutes, auto)        (days, async)          (partner-confirmed)
```

### Tier 0 — Submitted (instant, no friction)
- Submitter confirms email/phone + signs a truthfulness attestation (one checkbox + typed name)
- Page publishes immediately with a neutral "Community Submitted" state
- Rate limiting + duplicate detection guard abuse (existing middleware)

### Tier 1 — Identity Verified (minutes, fully automated)
Any ONE of:
- OAuth sign-in with institutional email (`.edu`, `.gov`, `.mil`, department domains)
- LinkedIn OAuth match (name + role consistency)
- SheerID or ID.me instant check — the standard, consumer-familiar verifiers for
  military, first responders, teachers, nurses, students (used by Nike, Spotify, etc.)
- Badge: **VERIFIED IDENTITY** (blue check per design system)

### Tier 2 — Service Verified (async, automated + community)
Any TWO of:
- Public-record match: news, Wikipedia, agency rosters, license registries
  (fits our dynamic-metadata-discovery architecture — same pattern as school lookup)
- Peer attestation: 2+ already-verified members of the same organization/class confirm
- Document upload with automated extraction (diploma, DD-214, service award) —
  reviewed by machine, spot-checked by humans
- Badge: **VERIFIED** (the full gold-check state in the design comps)

### Tier 3 — Institutionally Verified (partner channel)
- Org partner (school registrar, department, union local, alumni association) confirms
  via the Phase 3 admin verification dashboard or bulk import (CSV/JSON — already planned)
- Badge: **OFFICIALLY VERIFIED** + org crest on profile
- This is also the B2B wedge: partners get the dashboard free; they pay for bulk prints/features

## Friction Budget (what the submitter actually experiences)

| Step | Time | Required? |
|---|---|---|
| Submit honoree + attestation | 3 min | Yes |
| Email/phone confirm | 30 sec | Yes |
| OAuth or SheerID check | 60–90 sec | Optional — one tap, upgrades badge |
| Documents | — | Never required; only an option for Tier 2 |

The honoree page is live after step 2. Everything else raises the badge, never gates the page.

## Anti-Marquis Guardrails

- Verification status can NEVER be influenced by payment — enforced in code
  (verification service has no dependency on entitlements/tier)
- No paid expediting; the queue is FIFO within each tier
- Criteria published on a public `/verification` page
- Badges revocable on fraud; every status change written to `audit_logs` (schema exists)
- Paid products (submission, hero image, prints) render identically for all tiers —
  money changes what you can *buy*, never what's *true*

## Cost Reality (free-tier constraint)

- Launch (free): OAuth domain checks + peer attestation + public-record matching — $0/verification
- Scale (funded by submission revenue): SheerID/ID.me (~$0.50–2.00 per instant verification),
  paid only from paid submissions — verification stays free to the user
- Human review only for Tier 2 document spot-checks and disputes

## Data Model Hooks

- `poster_requests.verification_status` → `submitted | identity_verified | verified | official`
- `audit_logs` — every transition, actor, evidence pointer
- `schools`/org tables' `confidence` scores feed public-record matching (already in schema)
