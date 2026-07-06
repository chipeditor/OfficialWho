'use client'

import Link from 'next/link'
import { useState, useEffect, useId } from 'react'
import { mockCategories, mockPosterStyles, mockUserProfiles } from '@/lib/mock-data'

/* Dignified side-profile bust, facing right — from the brand study.
   Head with defined brow/nose/lips/chin, straight plinth-like torso. */
const BUST_PATH = `M29 5
  C 20 5.5 13.5 12 13.5 22
  C 13.5 30 15 35 15 40
  C 15 45 14 48 12 50.5
  C 7.5 54 4.5 58 3 64
  C 2.2 68 2 72 2 78
  L 2 96
  L 62 96
  L 62 80
  C 62 70 57 62 47 57
  C 43.5 55.2 41 52.8 41 49.5
  L 41 46.5
  C 43.5 45.8 46 44.5 48.6 42
  C 50.2 40.8 50 38.8 48.4 38
  C 48 37.4 48 37 48.8 36.6
  C 50.2 35.8 50 34.4 48.6 33.8
  L 49 33.4
  C 50.2 32.8 50 31.6 48.6 31
  L 48.4 30.5
  L 54.5 28
  L 48.2 21.5
  C 47.6 20.6 47.4 19.6 48 18.5
  C 48.2 15.5 47.5 12.5 45.5 10
  C 42 6.5 36 5 29 5 Z`

function Bust({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 100" className={className} aria-hidden="true">
      <path d={BUST_PATH} fill="currentColor" />
    </svg>
  )
}

/* Brand mark — red frame interrupted by the bust (clean gap), per the study.
   `bust` sets the silhouette color: white for dark surfaces, navy for light. */
function LogoMark({ className, bust = 'fill-white' }: { className?: string; bust?: string }) {
  const maskId = useId()
  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 ${className ?? ''}`} aria-hidden="true">
      <defs>
        <mask id={maskId}>
          <rect width="120" height="120" fill="white" />
          {/* Cut a clean gap in the frame around the bust */}
          <g transform="translate(19 36.5) scale(0.68)">
            <path d={BUST_PATH} fill="black" stroke="black" strokeWidth="8" />
          </g>
        </mask>
      </defs>
      {/* Red frame ring */}
      <path
        d="M22 6 L114 6 L114 102 L22 102 Z M37 21 L99 21 L99 87 L37 87 Z"
        fillRule="evenodd"
        className="fill-courage-red"
        mask={`url(#${maskId})`}
      />
      {/* Bust */}
      <g transform="translate(19 36.5) scale(0.68)">
        <path d={BUST_PATH} className={bust} />
      </g>
    </svg>
  )
}

/* Section heading: gold kicker, Bebas title, gold rule */
function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center mb-14">
      <div className="text-[11px] tracking-[0.4em] text-heritage-gold uppercase mb-3">{kicker}</div>
      <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wide">{title}</h2>
      <div className="mt-5 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-heritage-gold/70 to-transparent" />
    </div>
  )
}

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'healthy' | 'error'>('checking')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then(() => setApiStatus('healthy'))
      .catch(() => setApiStatus('error'))
  }, [])

  return (
    <main className="min-h-screen bg-legacy-navy bg-[radial-gradient(1100px_500px_at_50%_-120px,rgba(255,183,3,0.07),transparent),radial-gradient(900px_500px_at_85%_110%,rgba(229,57,53,0.05),transparent)]">
      {/* Header */}
      <header className="border-b border-heritage-gold/15 bg-legacy-navy/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark className="w-12 h-12" />
            <div className="flex flex-col">
              <div className="font-sans font-black text-[26px] leading-none tracking-tight text-white">
                Official<span className="text-courage-red">Who</span>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="h-px w-4 bg-slate-400/50" />
                <span className="text-[8.5px] tracking-[0.28em] text-slate-300 uppercase font-semibold">
                  Verified. Celebrated. Remembered.
                </span>
                <span className="h-px w-4 bg-slate-400/50" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  apiStatus === 'healthy' ? 'bg-emerald-400' : apiStatus === 'checking' ? 'bg-yellow-400' : 'bg-courage-red'
                }`}
              />
              {apiStatus === 'healthy' ? 'All systems' : apiStatus === 'checking' ? 'Checking' : 'Offline'}
            </span>
            <button className="text-sm font-semibold text-white border border-white/20 hover:border-heritage-gold hover:text-heritage-gold rounded px-5 py-2 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-24 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 text-heritage-gold text-[11px] font-semibold tracking-[0.35em] uppercase">
                <span className="h-px w-10 bg-heritage-gold/60 hidden sm:block" />
                A Digital Hall of Honor
              </div>
              <h1 className="font-display text-6xl md:text-[5.2rem] text-white leading-[0.92] tracking-wide">
                Celebrate<br />
                <span className="text-courage-red">Extraordinary</span><br />
                Lives
              </h1>
              <p className="text-lg text-slate-300/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Not another social network. OfficialWho is where verified alumni, first responders,
                veterans, and communities are honored — permanently.
              </p>
              <p className="text-[13px] tracking-[0.3em] text-slate-300 uppercase font-semibold flex items-center gap-3 justify-center lg:justify-start">
                <span className="h-px w-8 bg-slate-400/50" />
                Verified. Celebrated. Remembered.
                <span className="h-px w-8 bg-slate-400/50" />
              </p>
              <p className="font-serif italic font-bold text-2xl text-courage-red">
                Every Story. Every Legacy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link href="/generate" className="brand-button text-base px-9 py-4 uppercase tracking-widest font-display">
                Create Your Poster
              </Link>
              <Link href="/gallery" className="brand-button-secondary text-base px-9 py-4 uppercase tracking-widest font-display">
                Explore the Hall
              </Link>
            </div>
          </div>

          {/* Honor plaque mockup */}
          <div className="relative mx-auto w-72 md:w-80">
            <div className="absolute -inset-10 bg-heritage-gold/10 blur-3xl rounded-full" aria-hidden="true" />
            <div className="relative border-[5px] border-courage-red bg-[#0a1523] p-1.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="border border-heritage-gold/50 p-4">
                <div className="aspect-[4/5] bg-[radial-gradient(ellipse_at_50%_30%,rgba(50,72,168,0.35),rgba(10,21,35,0.9))] flex items-end justify-center overflow-hidden">
                  <Bust className="w-40 h-60 text-white/85 translate-y-3" />
                </div>
                <div className="mt-5 text-center pb-1">
                  <div className="flex items-center justify-center gap-3 text-heritage-gold mb-2.5">
                    <span className="h-px w-10 bg-heritage-gold/60" />
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" /></svg>
                    <span className="h-px w-10 bg-heritage-gold/60" />
                  </div>
                  <div className="font-display text-3xl text-white uppercase tracking-[0.1em]">Your Name</div>
                  <div className="text-[10px] tracking-[0.45em] text-heritage-gold uppercase mt-1.5">
                    Class of 2026 · Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Code — five pillars as engraved numerals */}
      <section className="border-y border-heritage-gold/15 bg-black/20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-px bg-white/5 border border-white/5">
            {[
              {
                title: 'Create',
                desc: 'Design a stunning legacy poster',
                icon: (
                  <>
                    <rect x="4" y="3" width="16" height="18" rx="1.5" />
                    <path d="M8.5 16c.5-2 1.8-3 3.5-3s3 1 3.5 3" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </>
                ),
              },
              {
                title: 'Join',
                desc: 'Build your official legacy profile',
                icon: (
                  <>
                    <circle cx="9" cy="8.5" r="3" />
                    <path d="M3.5 19c.7-3.2 2.8-5 5.5-5s4.8 1.8 5.5 5" />
                    <circle cx="16.5" cy="9.5" r="2.4" />
                    <path d="M15.5 14.2c2.4.3 4.2 1.9 4.9 4.8" />
                  </>
                ),
              },
              {
                title: 'Be Recognized',
                desc: 'Share your story. Inspire generations.',
                icon: <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6L12 16.7 6.6 19.6l1.1-6L3.2 9.4l6.1-.8L12 3z" />,
              },
              {
                title: 'Connect',
                desc: 'Find others. Build community.',
                icon: (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.8 2.4 4.2 5.4 4.2 9S14.8 18.6 12 21c-2.8-2.4-4.2-5.4-4.2-9S9.2 5.4 12 3z" />
                  </>
                ),
              },
              {
                title: 'Preserve',
                desc: 'Your legacy. Officially remembered.',
                icon: <path d="M12 3l7.5 2.8v6.1c0 4.4-3 8.1-7.5 9.6-4.5-1.5-7.5-5.2-7.5-9.6V5.8L12 3z" />,
              },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-legacy-navy px-6 py-10 text-center space-y-4 hover:bg-[#101f31] transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10 mx-auto text-heritage-gold/90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {pillar.icon}
                </svg>
                <div className="mx-auto w-8 h-px bg-heritage-gold/40" />
                <h3 className="font-display text-xl text-white uppercase tracking-[0.15em]">{pillar.title}</h3>
                <p className="text-[13px] text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Standard */}
      <section className="container mx-auto px-4 py-24">
        <SectionHeading kicker="The Standard" title="Built on Verification" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: 'Verified Credentials',
              description: 'Institutional verification through OAuth, batch imports, and peer validation. Every honor is earned — and checked.',
            },
            {
              title: 'Nine Premium Styles',
              description: 'Sports, Luxury, Vintage, Military Tribute, Hall of Fame, and more — each designed like it belongs on a wall.',
            },
            {
              title: 'Print-Ready Quality',
              description: '300 DPI output, made for framing. Digital first, but built for the mantelpiece.',
            },
          ].map((feature) => (
            <div key={feature.title} className="border border-white/10 bg-white/[0.02] p-8 space-y-4 hover:border-heritage-gold/40 transition-colors">
              <h3 className="font-display text-2xl text-white uppercase tracking-wide">{feature.title}</h3>
              <div className="w-8 h-px bg-courage-red" />
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Honored */}
      <section className="border-y border-heritage-gold/15 bg-black/20">
        <div className="container mx-auto px-4 py-24">
          <SectionHeading kicker="The Honored" title="Community Highlights" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mockUserProfiles.map((profile) => (
              <div key={profile.id} className="border border-white/10 bg-legacy-navy p-7 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#0a1523] border border-heritage-gold/50 flex items-end justify-center overflow-hidden shrink-0">
                    <Bust className="w-8 h-12 text-white/40 translate-y-1.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl text-white tracking-wide uppercase truncate">{profile.name}</h3>
                    <p className="text-xs text-slate-400">{profile.school}</p>
                  </div>
                  {profile.verified && (
                    <span className="text-heritage-gold" title="Verified">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 1l2.4 2.4h3.4l1 3.2 2.9 1.8-.9 3.3 2 2.8-2 2.8.9 3.3-2.9 1.8-1 3.2h-3.4L12 28l-2.4-2.4H6.2l-1-3.2-2.9-1.8.9-3.3-2-2.8 2-2.8-.9-3.3 2.9-1.8 1-3.2h3.4L12 1zm-1.2 14.5l5.4-5.4-1.4-1.4-4 4-1.8-1.8-1.4 1.4 3.2 3.2z" /></svg>
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-300/90 leading-relaxed">{profile.bio}</p>
                <div className="flex gap-2 pt-1">
                  <span
                    className="category-badge text-[11px] tracking-wide"
                    style={{ backgroundColor: mockCategories.find((c) => c.id === profile.categoryId)?.color }}
                  >
                    {profile.category}
                  </span>
                  <span className="category-badge text-[11px] tracking-wide border border-white/15 bg-transparent text-slate-300">
                    Class of {profile.graduationYear}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Halls */}
      <section className="container mx-auto px-4 py-24">
        <SectionHeading kicker="The Halls" title="Every Community. One Legacy." />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {mockCategories.map((category) => (
            <div
              key={category.id}
              className="group border border-white/10 bg-white/[0.02] p-6 text-center space-y-3 hover:border-heritage-gold/40 transition-colors cursor-pointer"
            >
              <div
                className="mx-auto w-12 h-12 rounded-full border flex items-center justify-center font-display text-xl"
                style={{ borderColor: category.color, color: category.color }}
              >
                {category.label.charAt(0)}
              </div>
              <p className="text-[13px] font-semibold text-white tracking-wide uppercase">{category.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Collection */}
      <section className="border-y border-heritage-gold/15 bg-black/20">
        <div className="container mx-auto px-4 py-24">
          <SectionHeading kicker="The Collection" title="Nine Premium Styles" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mockPosterStyles.map((style) => (
              <div
                key={style.id}
                className="group border border-white/10 bg-legacy-navy p-7 text-center space-y-4 hover:border-courage-red/60 transition-colors"
              >
                <h3 className="font-display text-2xl text-white uppercase tracking-wide group-hover:text-courage-red transition-colors">
                  {style.label}
                </h3>
                <p className="text-sm text-slate-400">{style.description}</p>
                <button className="w-full text-xs py-2.5 border border-heritage-gold/40 text-heritage-gold hover:bg-heritage-gold hover:text-legacy-navy transition-colors font-semibold uppercase tracking-[0.2em]">
                  Preview
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-28">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <LogoMark className="w-16 h-16 mx-auto" />
          <h2 className="font-display text-5xl md:text-6xl text-white uppercase tracking-wide leading-tight">
            Ready to Take<br />Your Place?
          </h2>
          <p className="text-lg text-slate-300/90 max-w-xl mx-auto">
            Start with two free posters. Upgrade to celebrate your full story.
          </p>
          <Link href="/generate" className="brand-button inline-block text-base px-12 py-4 uppercase tracking-widest font-display">
            Create Your First Poster
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-heritage-gold/15 bg-black/30 py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <LogoMark className="w-10 h-10" />
                <span className="font-sans font-black text-xl tracking-tight text-white">
                  Official<span className="text-courage-red">Who</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                A digital hall of honor for verified alumni and communities.
              </p>
            </div>
            {[
              { heading: 'Product', links: ['Features', 'Pricing', 'API'] },
              { heading: 'Company', links: ['About', 'Blog', 'Contact'] },
              { heading: 'Legal', links: ['Privacy', 'Terms'] },
            ].map((col) => (
              <div key={col.heading} className="space-y-3">
                <h4 className="text-[11px] font-semibold text-heritage-gold uppercase tracking-[0.3em]">{col.heading}</h4>
                <ul className="text-sm text-slate-400 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-slate-500">© 2026 OfficialWho. Not another social network. A digital hall of honor.</p>
            <p className="mt-2 text-[10px] tracking-[0.4em] text-heritage-gold/70 uppercase">Verified · Celebrated · Remembered</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
