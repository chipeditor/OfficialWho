'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { mockCategories, mockPosterStyles, mockUserProfiles } from '@/lib/mock-data'

/* Dignified side-profile bust, facing right — shared brand silhouette */
const BUST_PATH = `M47 27
  C 44 23.5 37 22 30 23
  C 21 24.5 15.5 33 15.5 44
  C 15.5 50 17.5 54 17.5 58
  C 17.5 61.5 16.5 64 14 66.5
  C 9 70 6.5 75 5.5 82
  C 5 86 5 90 5 94
  L 59 94
  C 59 86 58 79 55 74
  C 52 70 47 67 43.5 64.5
  C 42.8 62.7 42.2 60.5 42.6 58.6
  L 47.8 54.6
  C 49.6 53.4 49.8 51.6 48.6 50.4
  L 47.6 49.6
  C 49.6 48.8 49.8 47.4 48.4 46.8
  L 48 46.4
  C 50 45.8 50.2 44.4 48.8 43.8
  L 48.4 43.2
  L 52.8 41.6
  L 48.2 34.8
  C 47.6 34 47.8 33 48.2 32.2
  C 48.8 30.4 48.2 28.4 47 27 Z`

function Bust({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 100" className={className} aria-hidden="true">
      <path d={BUST_PATH} fill="currentColor" />
    </svg>
  )
}

/* Brand mark — open red frame, bust breaking out of it (from the brand study) */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`shrink-0 ${className ?? ''}`} aria-hidden="true">
      {/* Red frame */}
      <path
        d="M12 4 L88 4 L88 72 L12 72 Z M24 16 L76 16 L76 60 L24 60 Z"
        fillRule="evenodd"
        className="fill-courage-red"
      />
      {/* Bust breaking the frame */}
      <g transform="translate(16 10) scale(1.02)">
        <path d={BUST_PATH} className="fill-white" />
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
              <div className="font-serif font-black text-[26px] leading-none text-white">
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
              { n: 'I', title: 'Create', desc: 'Design a stunning legacy poster' },
              { n: 'II', title: 'Join', desc: 'Build your official legacy profile' },
              { n: 'III', title: 'Be Recognized', desc: 'Share your story. Inspire generations.' },
              { n: 'IV', title: 'Connect', desc: 'Find others. Build community.' },
              { n: 'V', title: 'Preserve', desc: 'Your legacy. Officially remembered.' },
            ].map((pillar) => (
              <div key={pillar.n} className="bg-legacy-navy px-6 py-10 text-center space-y-3 hover:bg-[#101f31] transition-colors">
                <div className="font-display text-4xl text-heritage-gold/90">{pillar.n}</div>
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
                <span className="font-serif font-black text-xl text-white">
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
