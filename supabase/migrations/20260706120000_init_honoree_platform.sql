-- OfficialWho — Sprint 0 schema
-- The honoree page is the product. This replaces the poster-only mock schema
-- with tables for the actual platform: honorees, verification ladder, co-signs,
-- tributes, evidence/links, objections. See docs/VERIFICATION_MODEL.md,
-- docs/ROLLOUT_PLAN.md, docs/MONETIZATION_ARCHITECTURE.md for the product spec
-- these tables implement.

create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ============================================================================
-- Users (extends Supabase auth.users with public profile data)
-- ============================================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name varchar(120),
  avatar_url text,
  city varchar(100),
  country varchar(100) default 'US',
  identity_tier varchar(30) not null default 'none'
    check (identity_tier in ('none', 'email_verified', 'oauth_domain', 'sheerid', 'idme')),
  honor_number int, -- degrees of separation from nearest verified honoree; null = unclaimed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_profiles_honor_number on public.profiles (honor_number);

-- ============================================================================
-- Categories (reference table — mirrors src/lib/mock-data.ts mockCategories)
-- ============================================================================

create table public.categories (
  id varchar(60) primary key,
  label varchar(120) not null,
  color varchar(7) not null,
  sort_order int not null default 0
);

-- ============================================================================
-- Honorees — the core object. The product IS this page.
-- ============================================================================

create table public.honorees (
  id uuid primary key default uuid_generate_v4(),
  slug varchar(160) not null unique,
  submitted_by uuid not null references public.profiles(id),
  claimed_by uuid references public.profiles(id), -- living honoree who claimed their own page

  full_name varchar(200) not null,
  headline varchar(240), -- e.g. "U.S. Army Veteran, Master Sergeant (Ret.)"
  bio text,
  city varchar(100),
  state varchar(100),
  country varchar(100) default 'US',
  category_id varchar(60) references public.categories(id),

  hero_image_url text, -- the paid $29 cinematic portrait; null = branded placeholder
  hero_image_purchased boolean not null default false,

  -- Verification ladder (docs/VERIFICATION_MODEL.md) — FREE, never purchasable.
  -- Enforced structurally: no column here references payments/entitlements.
  verification_status varchar(30) not null default 'submitted'
    check (verification_status in ('submitted', 'identity_verified', 'verified', 'official')),
  verification_evidence jsonb default '[]'::jsonb, -- [{label, url, type, confirmed_at}]

  -- Listing threshold (docs/ROLLOUT_PLAN.md §1) — 10 co-signs to enter the Halls
  co_sign_count int not null default 0,
  is_listed boolean not null default false, -- flips true at 10 co-signs
  listed_at timestamptz,

  -- Founding Honoree free-submission window (docs/ROLLOUT_PLAN.md §3)
  is_founding_honoree boolean not null default false,

  -- Publish state — draft is free & watermarked; publishing is the $19 product
  is_published boolean not null default false,
  published_at timestamptz,

  is_featured boolean not null default false,
  featured_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_honorees_slug on public.honorees (slug);
create index idx_honorees_listed on public.honorees (is_listed) where is_listed = true;
create index idx_honorees_category on public.honorees (category_id);
create index idx_honorees_submitted_by on public.honorees (submitted_by);
create index idx_honorees_search on public.honorees using gin (
  to_tsvector('english', full_name || ' ' || coalesce(headline, '') || ' ' || coalesce(bio, ''))
);

-- ============================================================================
-- Links — "family-provided" (default, unlimited-in-Archive) vs "evidence"
-- (immutable, satisfied Tier 2 verification). Two visual classes per the
-- design system; evidence links never editable by the submitter.
-- ============================================================================

create table public.honoree_links (
  id uuid primary key default uuid_generate_v4(),
  honoree_id uuid not null references public.honorees(id) on delete cascade,
  label varchar(200) not null,
  url text not null,
  kind varchar(20) not null default 'family' check (kind in ('family', 'evidence')),
  click_count int not null default 0,
  created_at timestamptz not null default now()
);

create index idx_honoree_links_honoree on public.honoree_links (honoree_id);

-- ============================================================================
-- Media (photos/video/audio/docs) — free tier gets 5 photos; Legacy Archive
-- ($49/yr or $79 lifetime) unlocks video/audio/docs/500 photos.
-- ============================================================================

create table public.honoree_media (
  id uuid primary key default uuid_generate_v4(),
  honoree_id uuid not null references public.honorees(id) on delete cascade,
  media_type varchar(20) not null check (media_type in ('photo', 'video', 'audio', 'document')),
  url text not null,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index idx_honoree_media_honoree on public.honoree_media (honoree_id);

-- ============================================================================
-- Timeline & Achievements (profile tabs)
-- ============================================================================

create table public.honoree_timeline_events (
  id uuid primary key default uuid_generate_v4(),
  honoree_id uuid not null references public.honorees(id) on delete cascade,
  year varchar(10) not null,
  title varchar(240) not null,
  detail text,
  sort_order int not null default 0
);

create table public.honoree_achievements (
  id uuid primary key default uuid_generate_v4(),
  honoree_id uuid not null references public.honorees(id) on delete cascade,
  year varchar(10) not null,
  title varchar(240) not null,
  sort_order int not null default 0
);

create index idx_timeline_honoree on public.honoree_timeline_events (honoree_id);
create index idx_achievements_honoree on public.honoree_achievements (honoree_id);

-- ============================================================================
-- Co-signs — "I witness this legacy." One per person per honoree, free
-- forever, requires verified-email account. This is the 10-to-list mechanic
-- AND the friends-and-family conversion engine (docs/ROLLOUT_PLAN.md).
-- ============================================================================

create table public.co_signs (
  id uuid primary key default uuid_generate_v4(),
  honoree_id uuid not null references public.honorees(id) on delete cascade,
  co_signer_id uuid not null references public.profiles(id),
  relationship varchar(40) not null
    check (relationship in ('family', 'served_with', 'classmate', 'taught_by', 'community', 'colleague', 'other')),
  created_at timestamptz not null default now(),
  unique (honoree_id, co_signer_id) -- one co-sign per person per honoree
);

create index idx_co_signs_honoree on public.co_signs (honoree_id);
create index idx_co_signs_signer on public.co_signs (co_signer_id);

-- ============================================================================
-- Applause — unlimited up-votes. Distinct from co-signs (no relationship
-- weight, no Honor Number effect). Up-votes only per docs/ROLLOUT_PLAN.md §2.
-- ============================================================================

create table public.applause (
  id uuid primary key default uuid_generate_v4(),
  honoree_id uuid not null references public.honorees(id) on delete cascade,
  profile_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (honoree_id, profile_id)
);

create index idx_applause_honoree on public.applause (honoree_id);

-- ============================================================================
-- Tributes — the guestbook. Every tribute notifies the family.
-- ============================================================================

create table public.tributes (
  id uuid primary key default uuid_generate_v4(),
  honoree_id uuid not null references public.honorees(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  relationship varchar(40),
  body text not null check (char_length(body) between 1 and 2000),
  is_hidden boolean not null default false, -- moderation takedown, never a public downvote
  created_at timestamptz not null default now()
);

create index idx_tributes_honoree on public.tributes (honoree_id);

-- ============================================================================
-- Objections — private, structured review. Never a public counter-vote.
-- (docs/ROLLOUT_PLAN.md §2)
-- ============================================================================

create table public.objections (
  id uuid primary key default uuid_generate_v4(),
  honoree_id uuid not null references public.honorees(id) on delete cascade,
  raised_by uuid not null references public.profiles(id),
  category varchar(40) not null check (category in (
    'factual_inaccuracy', 'impersonation', 'stolen_valor', 'inappropriate_content', 'subject_nonconsent'
  )),
  reason text not null check (char_length(reason) between 10 and 2000),
  status varchar(20) not null default 'open'
    check (status in ('open', 'dismissed', 'correction_requested', 'unlisted_pending', 'removed')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  resolution_note text,
  created_at timestamptz not null default now()
);

create index idx_objections_honoree on public.objections (honoree_id);
create index idx_objections_status on public.objections (status) where status = 'open';

-- ============================================================================
-- Orders — Stripe-backed honor products. Verification/co-signs/featuring
-- are NEVER purchasable; this table only ever touches craft (submission,
-- hero image, prints, archive). The Marquis test, enforced by table design.
-- ============================================================================

create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  honoree_id uuid references public.honorees(id),
  purchased_by uuid not null references public.profiles(id),
  product varchar(40) not null check (product in (
    'submission', 'hero_image', 'bundle', 'print_poster', 'print_framed',
    'print_canvas', 'print_metal', 'print_bundle', 'legacy_archive_annual',
    'legacy_archive_lifetime', 'membership_pro', 'membership_plus'
  )),
  amount_cents int not null,
  currency varchar(3) not null default 'usd',
  stripe_payment_intent_id text,
  status varchar(20) not null default 'pending'
    check (status in ('pending', 'paid', 'refunded', 'failed')),
  created_at timestamptz not null default now()
);

create index idx_orders_honoree on public.orders (honoree_id);
create index idx_orders_purchaser on public.orders (purchased_by);

-- ============================================================================
-- Audit log — every mutation to trust-relevant state
-- ============================================================================

create table public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.profiles(id),
  entity_type varchar(50) not null,
  entity_id uuid not null,
  action varchar(50) not null,
  changes jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index idx_audit_entity on public.audit_logs (entity_type, entity_id);
create index idx_audit_actor on public.audit_logs (actor_id);
create index idx_audit_created on public.audit_logs (created_at desc);

-- ============================================================================
-- Trigger: keep co_sign_count and is_listed in sync (the 10-co-sign rule)
-- ============================================================================

create or replace function public.sync_honoree_co_sign_count()
returns trigger as $$
begin
  update public.honorees
  set
    co_sign_count = (select count(*) from public.co_signs where honoree_id = coalesce(new.honoree_id, old.honoree_id)),
    is_listed = (select count(*) from public.co_signs where honoree_id = coalesce(new.honoree_id, old.honoree_id)) >= 10,
    listed_at = case
      when is_listed = false and (select count(*) from public.co_signs where honoree_id = coalesce(new.honoree_id, old.honoree_id)) >= 10
        then now()
      else listed_at
    end,
    updated_at = now()
  where id = coalesce(new.honoree_id, old.honoree_id);
  return coalesce(new, old);
end;
$$ language plpgsql security definer;

create trigger trg_sync_co_sign_count
after insert or delete on public.co_signs
for each row execute function public.sync_honoree_co_sign_count();

-- ============================================================================
-- Row-Level Security
-- ============================================================================

alter table public.profiles enable row level security;
alter table public.honorees enable row level security;
alter table public.honoree_links enable row level security;
alter table public.honoree_media enable row level security;
alter table public.honoree_timeline_events enable row level security;
alter table public.honoree_achievements enable row level security;
alter table public.co_signs enable row level security;
alter table public.applause enable row level security;
alter table public.tributes enable row level security;
alter table public.objections enable row level security;
alter table public.orders enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles: public read (names/avatars are shown on co-signs/tributes), self-write
create policy "Profiles are publicly readable" on public.profiles
  for select using (true);
create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Honorees: published + listed pages are public; drafts visible to submitter/claimant only
create policy "Published honorees are publicly readable" on public.honorees
  for select using (is_published = true or submitted_by = auth.uid() or claimed_by = auth.uid());
create policy "Submitters can create honorees" on public.honorees
  for insert with check (submitted_by = auth.uid());
create policy "Submitters and claimants can update their honoree" on public.honorees
  for update using (submitted_by = auth.uid() or claimed_by = auth.uid());

-- Links & media: follow the honoree's visibility
create policy "Links visible with honoree" on public.honoree_links
  for select using (
    exists (select 1 from public.honorees h where h.id = honoree_id and (h.is_published or h.submitted_by = auth.uid()))
  );
create policy "Submitters manage their honoree links" on public.honoree_links
  for all using (
    exists (select 1 from public.honorees h where h.id = honoree_id and h.submitted_by = auth.uid())
  );

create policy "Media visible with honoree" on public.honoree_media
  for select using (
    exists (select 1 from public.honorees h where h.id = honoree_id and (h.is_published or h.submitted_by = auth.uid()))
  );
create policy "Submitters manage their honoree media" on public.honoree_media
  for all using (
    exists (select 1 from public.honorees h where h.id = honoree_id and h.submitted_by = auth.uid())
  );

create policy "Timeline visible with honoree" on public.honoree_timeline_events
  for select using (
    exists (select 1 from public.honorees h where h.id = honoree_id and (h.is_published or h.submitted_by = auth.uid()))
  );
create policy "Achievements visible with honoree" on public.honoree_achievements
  for select using (
    exists (select 1 from public.honorees h where h.id = honoree_id and (h.is_published or h.submitted_by = auth.uid()))
  );

-- Co-signs: publicly readable (social proof), any authenticated user may co-sign once
create policy "Co-signs are publicly readable" on public.co_signs
  for select using (true);
create policy "Authenticated users can co-sign" on public.co_signs
  for insert with check (auth.uid() = co_signer_id);

-- Applause: publicly readable counts, authenticated insert
create policy "Applause is publicly readable" on public.applause
  for select using (true);
create policy "Authenticated users can applaud" on public.applause
  for insert with check (auth.uid() = profile_id);

-- Tributes: publicly readable unless hidden, authenticated insert
create policy "Visible tributes are publicly readable" on public.tributes
  for select using (is_hidden = false);
create policy "Authenticated users can leave tributes" on public.tributes
  for insert with check (auth.uid() = author_id);

-- Objections: private — only the raiser and reviewers (service role) may read
create policy "Objectors can see their own objections" on public.objections
  for select using (auth.uid() = raised_by);
create policy "Authenticated users can raise objections" on public.objections
  for insert with check (auth.uid() = raised_by);

-- Orders: purchaser only
create policy "Users can see their own orders" on public.orders
  for select using (auth.uid() = purchased_by);

-- Audit logs: no public policy — service role only (backend writes/reads)

-- ============================================================================
-- Seed categories (mirrors src/lib/mock-data.ts — keep in sync)
-- ============================================================================

insert into public.categories (id, label, color, sort_order) values
  ('high-school', 'High School', '#3248A8', 1),
  ('military', 'Military', '#2E7D32', 2),
  ('police', 'Police', '#0D47A1', 3),
  ('fire', 'Fire', '#E53946', 4),
  ('teacher', 'Teacher', '#1976D2', 5),
  ('ems', 'EMS', '#00838F', 6),
  ('nurse', 'Nurse', '#E53935', 7),
  ('skilled-trades', 'Skilled Trades', '#B5651D', 8),
  ('community-leaders', 'Community Leaders', '#5E60CE', 9),
  ('hip-hop', 'Hip Hop', '#F72585', 10),
  ('house', 'House', '#00B4A0', 11),
  ('gospel', 'Gospel', '#FFB703', 12),
  ('dance', 'Dance', '#C2185B', 13),
  ('musician', 'Musician', '#7B2CBF', 14),
  ('djs-producers', 'DJs & Producers', '#4CC9F0', 15),
  ('choirs', 'Choirs & Praise Teams', '#E9A820', 16),
  ('steppers', 'Steppers & Line Dance', '#FF6B9D', 17),
  ('spoken-word', 'Spoken Word & Poets', '#9D4EDD', 18),
  ('athlete', 'Athlete', '#F77F00', 19),
  ('coaches', 'Coaches & Mentors', '#2A9D8F', 20),
  ('greek-life', 'Greek Life', '#C1121F', 21),
  ('faith-ministry', 'Faith & Ministry', '#D4A017', 22),
  ('first-gen-grads', 'First-Gen Graduates', '#3A86FF', 23)
on conflict (id) do nothing;
