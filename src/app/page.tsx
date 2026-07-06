'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { mockPosterStyles } from '@/lib/mock-data'
import { ShareBar } from '@/components/ShareBar'
import { LogoChip, SiteHeader } from '@/components/SiteHeader'

const HONOR_DEGREES = [
  { n: 1, label: 'I am an honoree', brag: 'First degree. I AM the story.' },
  { n: 2, label: 'I know an honoree personally', brag: 'Second degree. Greatness shakes my hand.' },
  { n: 3, label: 'A friend of mine knows one', brag: 'Third degree. Honor runs in my circle.' },
]

/* "What's Your Honor Number?" — degrees-of-separation gamification teaser */
function HonorNumber() {
  const [degree, setDegree] = useState<(typeof HONOR_DEGREES)[number] | null>(null)

  return (
    <section className="border-t border-white/10">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="text-[11px] tracking-[0.4em] text-heritage-gold uppercase font-bold">Bragging Rights, Quantified</div>
          <h2 className="font-serif font-black text-[2.15rem] sm:text-4xl md:text-5xl text-balance">
            What&apos;s Your{' '}
            <span className="whitespace-nowrap">
              <span className="text-courage-red">Honor Number</span>?
            </span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            How many degrees of separation stand between you and a verified honoree?
            Claim your number, climb the rankings, and prove greatness runs in your circle.
          </p>

          {!degree ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {HONOR_DEGREES.map((d) => (
                <button
                  key={d.n}
                  onClick={() => setDegree(d)}
                  className="border border-white/15 hover:border-courage-red rounded-lg px-5 py-6 text-center transition-colors bg-white/[0.02] group"
                >
                  <div className="font-serif font-black text-4xl text-courage-red">{d.n}°</div>
                  <div className="text-sm text-slate-200 mt-2 group-hover:text-white">{d.label}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6 pt-2">
              <div className="inline-block border border-heritage-gold/50 rounded-xl px-12 py-8 bg-heritage-gold/5">
                <div className="font-serif font-black text-7xl text-heritage-gold">{degree.n}°</div>
                <div className="text-sm font-bold tracking-[0.2em] uppercase mt-2">Honor Number</div>
                <div className="text-slate-300 text-sm mt-2 italic">&ldquo;{degree.brag}&rdquo;</div>
              </div>
              <div className="flex justify-center">
                <ShareBar text={`My Honor Number is ${degree.n}° on OfficialWho — ${degree.brag} Every Story. Every Legacy.`} label="Share My Honor Number" />
              </div>
              <button onClick={() => setDegree(null)} className="text-xs text-slate-400 hover:text-white underline underline-offset-4">
                Recalculate
              </button>
            </div>
          )}

          <p className="text-xs text-slate-500">
            Verified honoree connections and global leaderboards arrive with profiles. Your number can only get better.
          </p>
        </div>
      </div>
    </section>
  )
}

const HERO_PANELS = [
  { label: 'Law Enforcement', img: '/brand/heroes/law-enforcement.jpg' },
  { label: 'Firefighters & EMS', img: '/brand/heroes/firefighters-ems.jpg' },
  { label: 'Military Veterans', img: '/brand/heroes/military-veterans.jpg' },
  { label: 'Educators & Alumni', img: '/brand/heroes/educators-alumni.jpg' },
  { label: 'Artists & Creatives', img: '/brand/heroes/artists-creatives.jpg' },
  { label: 'Healthcare Professionals', img: '/brand/heroes/healthcare.jpg' },
  { label: 'Entrepreneurs & Leaders', img: '/brand/heroes/entrepreneurs.jpg' },
]

const FEATURED_STORIES = [
  { name: 'U.S. Army', line: '12 Years of Service', img: '/brand/heroes/military-veterans.jpg' },
  { name: 'Firefighter', line: 'Bravery in Action', img: '/brand/heroes/firefighters-ems.jpg' },
  { name: 'High School Alumni', line: 'Class of 2005', img: '/brand/heroes/educators-alumni.jpg' },
  { name: 'Musician', line: 'Inspiring Generations', img: '/brand/heroes/artists-creatives.jpg' },
  { name: 'Nurse', line: 'Healing with Heart', img: '/brand/heroes/healthcare.jpg' },
  { name: 'Entrepreneur', line: 'Building Futures', img: '/brand/heroes/entrepreneurs.jpg' },
]

const STATS = [
  { n: '125K+', label: 'Verified Profiles', icon: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9c.7-3.6 3.4-6 7-6s6.3 2.4 7 6" /> },
  { n: '64K+', label: 'Stories Shared', icon: <path d="M4 5h16v11H8l-4 4V5zm4 4h8m-8 3.5h5" /> },
  { n: '32', label: 'Categories', icon: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /> },
  { n: '195', label: 'Countries', icon: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.3 4 5.1 4 8.5s-1.4 6.2-4 8.5c-2.6-2.3-4-5.1-4-8.5s1.4-6.2 4-8.5z" /></> },
  { n: 'Millions', label: 'Inspired', icon: <path d="M12 20s-7-4.5-9-9c-1.2-2.8.7-6 3.8-6 1.9 0 3.4 1 4.2 2.5H12C12.8 6 14.3 5 16.2 5c3.1 0 5 3.2 3.8 6-2 4.5-8 9-8 9z" /> },
]

const VALUES = [
  {
    title: 'Verified',
    desc: 'Authentic stories and identities.',
    icon: <><path d="M12 3l7.5 2.8v6.1c0 4.4-3 8.1-7.5 9.6-4.5-1.5-7.5-5.2-7.5-9.6V5.8L12 3z" /><path d="M9 12l2.2 2.2L15.5 10" /></>,
  },
  {
    title: 'Celebrated',
    desc: 'Honoring impact and achievement.',
    icon: <><circle cx="12" cy="9" r="5.5" /><path d="M12 6.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3.9-1.8zM9 13.8L7.5 20l4.5-2.4L16.5 20 15 13.8" /></>,
  },
  {
    title: 'Remembered',
    desc: 'Preserving legacies for generations.',
    icon: <path d="M12 3c2.5 2.6 4 4.9 4 7.4 0 1.5-.6 2.8-1.6 3.7.1-1.6-.5-3-2.4-4.4-.2 2.4-1 3.3-2 4.6-.8 1-1.3 2-1.3 3.1A4.6 4.6 0 0112 21a5.9 5.9 0 006-6c0-4-2.8-8.4-6-12z" />,
  },
  {
    title: 'Connected',
    desc: 'Uniting communities through shared stories.',
    icon: <><circle cx="9" cy="9" r="2.8" /><circle cx="16.5" cy="10" r="2.2" /><path d="M3.8 19c.6-3 2.6-4.8 5.2-4.8s4.6 1.8 5.2 4.8M14.5 14.6c2.2.3 3.9 1.8 4.5 4.4" /></>,
  },
]

const CATEGORY_CHIPS = [
  { label: 'Law Enforcement', color: '#3A86FF', icon: <><path d="M12 3l7 2.5v5.6c0 4-2.8 7.5-7 8.9-4.2-1.4-7-4.9-7-8.9V5.5L12 3z" /><path d="M12 8l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5L11 10l1-2z" /></> },
  { label: 'Firefighters & EMS', color: '#E63946', icon: <path d="M12 3c2.5 2.6 4 4.9 4 7.4 0 1.5-.6 2.8-1.6 3.7.1-1.6-.5-3-2.4-4.4-.2 2.4-1 3.3-2 4.6-.8 1-1.3 2-1.3 3.1A4.6 4.6 0 0112 21a5.9 5.9 0 006-6c0-4-2.8-8.4-6-12z" /> },
  { label: 'Military Veterans', color: '#FFB703', icon: <path d="M12 3l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 15.6l-5.1 2.8 1.1-5.6-4.2-3.9 5.7-.7L12 3z" /> },
  { label: 'Educators & Alumni', color: '#219EBC', icon: <><path d="M12 4L2.5 8.5 12 13l9.5-4.5L12 4z" /><path d="M6 10.8V15c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.2M20.5 9v5" /></> },
  { label: 'Artists & Creatives', color: '#8338EC', icon: <><path d="M9 17V6l10-2v11" /><circle cx="6.8" cy="17.2" r="2.4" /><circle cx="16.8" cy="15.2" r="2.4" /></> },
  { label: 'Healthcare Professionals', color: '#D81860', icon: <><path d="M12 20s-7-4.5-9-9c-1.2-2.8.7-6 3.8-6 1.9 0 3.4 1 4.2 2.5C11.8 6 13.3 5 15.2 5c3.1 0 5 3.2 3.8 6-2 4.5-7 9-7 9z" /><path d="M6 12h3.5l1.5-2.5 2 4 1.5-2.5H18" /></> },
  { label: 'Entrepreneurs & Leaders', color: '#F77F00', icon: <><rect x="3.5" y="8" width="17" height="11" rx="1.5" /><path d="M9 8V5.8C9 5 9.7 4.5 10.4 4.5h3.2c.7 0 1.4.5 1.4 1.3V8M3.5 13h17" /></> },
  { label: 'Hip Hop', color: '#F72585', icon: <><rect x="9.5" y="3" width="5" height="10" rx="2.5" /><path d="M6.5 11a5.5 5.5 0 0011 0M12 16.5V20m-3 0h6" /></> },
  { label: 'House', color: '#00B4A0', icon: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></> },
  { label: 'Dance', color: '#C2185B', icon: <><circle cx="13.5" cy="4.8" r="1.8" /><path d="M9 8.5l4.5 1 3.5-2M13 9.5l-1 4.5-3.5 5M12.5 13.5l3.5 2 1 4" /></> },
  { label: 'Gospel', color: '#FFB703', icon: <><path d="M12 5.5C10.5 4 8.3 3.5 5.5 3.5c-1 0-2 .1-3 .4v14.6c1-.3 2-.4 3-.4 2.8 0 5 .5 6.5 2 1.5-1.5 3.7-2 6.5-2 1 0 2 .1 3 .4V3.9c-1-.3-2-.4-3-.4-2.8 0-5 .5-6.5 2z" /><path d="M12 5.5v14.6M7.5 8.5v3m-1.5-1.5h3" /></> },
  { label: 'DJs & Producers', color: '#4CC9F0', icon: <><path d="M4 13.5v-2a8 8 0 0116 0v2" /><rect x="3" y="13" width="4" height="6.5" rx="1.5" /><rect x="17" y="13" width="4" height="6.5" rx="1.5" /></> },
  { label: 'Coaches & Mentors', color: '#2A9D8F', icon: <><circle cx="8" cy="14.5" r="4.5" /><path d="M8 12.5v2l1.5 1M11.5 11l8-6.5 1.5 2-6.5 5.5" /></> },
  { label: 'Greek Life', color: '#C1121F', icon: <><path d="M3.5 8L12 3.5 20.5 8h-17z" /><path d="M5.5 8v9M9.8 8v9M14.2 8v9M18.5 8v9M4 17h16M3 20h18" /></> },
]

function StrokeIcon({ children, className, strokeWidth = 1.5 }: { children: React.ReactNode; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0f1a] text-white">
      <SiteHeader />

      {/* Hero — serif stack left, diagonal honoree panels right */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] items-center">
            <div className="py-16 lg:py-24 pr-0 lg:pr-10 space-y-7 relative z-10">
              <h1 className="font-serif font-black leading-[1.04] text-[2.55rem] sm:text-[3.4rem] md:text-[4.2rem]">
                <span className="text-white">Every Story.</span>
                <br />
                <span className="text-courage-red">Every Legacy.</span>
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[10px] sm:text-[12px] tracking-[0.18em] sm:tracking-[0.25em] uppercase font-bold text-slate-100 whitespace-nowrap">
                <span className="h-px w-4 sm:w-7 bg-courage-red shrink-0" />
                Verified. Celebrated. Remembered.
                <span className="h-px w-4 sm:w-7 bg-courage-red shrink-0" />
              </div>
              <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                The global platform honoring the people who serve, achieve, and inspire—across every walk of life, in every nation.
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <Link href="/gallery" className="bg-courage-red hover:bg-courage-red/85 text-white font-semibold px-7 py-3.5 rounded transition-colors inline-flex items-center gap-2">
                  Explore Stories <span aria-hidden>→</span>
                </Link>
                <Link href="/generate" className="border border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded transition-colors">
                  Create a Profile
                </Link>
              </div>
            </div>

            {/* Diagonal panels */}
            <div className="relative h-64 lg:h-[560px] flex overflow-hidden lg:-mr-8">
              {HERO_PANELS.map((panel, i) => (
                <div key={panel.label} className="relative flex-1 -ml-3 first:ml-0 skew-x-[-6deg] overflow-hidden border-r border-black/60">
                  <Image
                    src={panel.img}
                    alt={panel.label}
                    fill
                    sizes="(min-width: 1024px) 12vw, 14vw"
                    className="object-cover skew-x-[6deg] scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/70 via-transparent to-[#0a0f1a]/80" />
                  <div className="absolute top-4 inset-x-0 skew-x-[6deg] px-2 text-center hidden lg:block">
                    <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/95 leading-tight block">
                      {panel.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {CATEGORY_CHIPS.map((cat) => (
              <a
                key={cat.label}
                href="#"
                className="border border-white/10 hover:border-white/30 rounded-lg px-3 py-4 flex flex-col items-center gap-2.5 text-center transition-colors bg-white/[0.02]"
              >
                <StrokeIcon className="w-7 h-7" strokeWidth={1.6}>
                  <g style={{ color: cat.color }} stroke={cat.color}>{cat.icon}</g>
                </StrokeIcon>
                <span className="text-[11px] font-bold uppercase tracking-wide leading-tight text-slate-100">{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 justify-center">
                <StrokeIcon className="w-8 h-8 text-courage-red shrink-0" strokeWidth={1.6}>{stat.icon}</StrokeIcon>
                <div>
                  <div className="font-sans font-black text-2xl leading-none">{stat.n}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {VALUES.map((value) => (
            <div key={value.title} className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full border border-white/25 flex items-center justify-center">
                <StrokeIcon className="w-9 h-9 text-white" strokeWidth={1.4}>{value.icon}</StrokeIcon>
              </div>
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase">{value.title}</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Honoree spotlight */}
      <section className="border-t border-white/10">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-10 items-center max-w-5xl mx-auto">
            <Link href="/honoree/michael-chen" className="block relative rounded-xl overflow-hidden aspect-[3/4] border-2 border-heritage-gold/60 shadow-[0_0_60px_-15px_rgba(255,183,3,0.4)] hover:border-heritage-gold transition-colors">
              <Image src="/brand/heroes/michael-chen-portrait.jpg" alt="Featured honoree" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
              <div className="absolute top-4 left-4 bg-heritage-gold text-[#0a0f1a] text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded">
                ★ Featured Honoree
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-2">
                <div className="font-serif font-black text-2xl">Michael Chen</div>
                <div className="text-sm text-slate-300">U.S. Army Veteran · 28 Years of Service · Seattle, WA</div>
                <div className="inline-flex items-center gap-2 bg-black/60 border border-heritage-gold/60 rounded-full px-3 py-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-heritage-gold" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 17l4.5-1 9-9a2.1 2.1 0 00-3-3l-9 9-1 4.5z" /><path d="M13 6l3 3M4 21h16" />
                  </svg>
                  <span className="text-xs font-bold text-heritage-gold tracking-wide">1,214 CO-SIGNS · LEGEND</span>
                </div>
              </div>
            </Link>
            <div className="space-y-6">
              <div className="text-[11px] tracking-[0.4em] text-heritage-gold uppercase font-bold">This Week on OfficialWho</div>
              <h2 className="font-serif font-black text-4xl md:text-5xl leading-tight text-balance">
                Being featured here is <span className="text-courage-red whitespace-nowrap">earned.</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                One honoree. Every week. Chosen from verified stories around the world and
                celebrated across the entire platform. When someone you love is featured on
                OfficialWho, the world hears about it.
              </p>
              <ShareBar text="Michael Chen — U.S. Army Veteran, 28 years of service — is this week's Featured Honoree on OfficialWho. Every Story. Every Legacy." label="Share This Honor" />

              {/* Co-sign ladder */}
              <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02] space-y-3">
                <div className="text-[10px] tracking-[0.3em] text-slate-400 uppercase font-bold text-balance">
                  The Co&#8209;Sign Ladder — every co&#8209;sign is a person vouching for a life
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { n: '10+', label: 'Co-Signed', color: '#3A86FF' },
                    { n: '50+', label: 'Community Honored', color: '#C0C6CF' },
                    { n: '100+', label: 'Century Honoree', color: '#FFB703' },
                    { n: '1,000+', label: 'Legend', color: '#E63946' },
                  ].map((tier) => (
                    <div key={tier.label} className="text-center border border-white/10 rounded-md py-2.5 px-1.5" style={{ borderColor: `${tier.color}55` }}>
                      <div className="font-serif font-black text-lg leading-none" style={{ color: tier.color }}>{tier.n}</div>
                      <div className="text-[9px] font-bold uppercase tracking-wide text-slate-300 mt-1 leading-tight">{tier.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Co-signing is free, takes one tap, and instantly makes you a 1° connection.
                  Verification can&apos;t be bought — but a legacy can be witnessed.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/honoree/michael-chen"
                  className="inline-block border border-heritage-gold/50 text-heritage-gold hover:bg-heritage-gold hover:text-[#0a0f1a] font-semibold px-6 py-3 rounded transition-colors text-sm"
                >
                  View Michael&apos;s Full Profile →
                </Link>
                <p className="text-sm text-slate-400">
                  Know someone who belongs here?{' '}
                  <Link href="/generate" className="text-courage-red font-semibold hover:underline underline-offset-4">
                    Submit your honoree →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honor Number */}
      <HonorNumber />

      {/* Featured Stories */}
      <section className="border-t border-white/10 bg-black/30">
        <div className="container mx-auto px-4 py-20">
          <h2 className="font-sans font-black text-3xl mb-10">Featured Stories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_STORIES.map((story) => (
              <a key={story.name} href="#" className="group relative rounded-lg overflow-hidden aspect-[3/4] border border-white/10 hover:border-white/30 transition-colors">
                <Image src={story.img} alt={story.name} fill sizes="(min-width: 1024px) 15vw, 40vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <div className="font-bold text-sm">{story.name}</div>
                  <div className="text-[11px] text-slate-300">{story.line}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#" className="inline-block border border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded transition-colors">
              View All Stories
            </a>
          </div>
        </div>
      </section>

      {/* Nine premium styles — the tribute product */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-sans font-black text-3xl text-balance">Nine Premium <span className="whitespace-nowrap">Tribute Styles</span></h2>
          <p className="text-slate-400 mt-3">Every honoree deserves a poster worth framing. 300 DPI, print-ready.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {mockPosterStyles.map((style) => (
            <div key={style.id} className="group border border-white/10 rounded-lg p-6 text-center space-y-3 hover:border-courage-red/60 transition-colors bg-white/[0.02]">
              <h3 className="font-bold text-lg group-hover:text-courage-red transition-colors">{style.label}</h3>
              <p className="text-sm text-slate-400">{style.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 space-y-5">
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Every honoree receives two free tribute posters. Bring the honor home with a framed print.
          </p>
          <Link href="/generate" className="inline-block bg-courage-red hover:bg-courage-red/85 text-white font-semibold px-10 py-4 rounded transition-colors">
            Submit Your Honoree
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40">
        {/* Value strip */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-center">
            {[
              { title: 'Secure & Verified', desc: 'Every profile is carefully verified for authenticity.', icon: <><path d="M12 3l7.5 2.8v6.1c0 4.4-3 8.1-7.5 9.6-4.5-1.5-7.5-5.2-7.5-9.6V5.8L12 3z" /><path d="M9 12l2.2 2.2L15.5 10" /></> },
              { title: 'Celebrated & Shared', desc: 'Stories are highlighted and shared with the world.', icon: <path d="M12 3l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 15.6l-5.1 2.8 1.1-5.6-4.2-3.9 5.7-.7L12 3z" /> },
              { title: 'Remembered Forever', desc: 'Legacies documented today inspire generations tomorrow.', icon: <><circle cx="9" cy="9" r="2.8" /><circle cx="16.5" cy="10" r="2.2" /><path d="M3.8 19c.6-3 2.6-4.8 5.2-4.8s4.6 1.8 5.2 4.8M14.5 14.6c2.2.3 3.9 1.8 4.5 4.4" /></> },
              { title: 'Global Impact', desc: 'Connecting people and communities worldwide.', icon: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.3 4 5.1 4 8.5s-1.4 6.2-4 8.5c-2.6-2.3-4-5.1-4-8.5s1.4-6.2 4-8.5z" /></> },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <StrokeIcon className="w-8 h-8 text-white shrink-0 mt-0.5" strokeWidth={1.4}>{item.icon}</StrokeIcon>
                <div>
                  <div className="font-bold text-sm">{item.title}</div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
            <blockquote className="lg:text-right">
              <span className="text-courage-red text-3xl font-serif leading-none" aria-hidden>“</span>
              <p className="font-serif italic text-slate-200 text-sm leading-relaxed inline">
                We don&apos;t just tell stories. We honor lives that shaped our world.
              </p>
            </blockquote>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <LogoChip className="h-9 w-9" />
              <span className="font-sans font-black text-lg tracking-tight">
                Official<span className="text-courage-red">Who</span>
              </span>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400 justify-center">
              {['About', 'Pricing', 'API', 'Blog', 'Contact', 'Privacy', 'Terms'].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
              ))}
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-slate-500">© 2026 OfficialWho. Every Story. Every Legacy.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
