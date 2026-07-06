'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { ShareBar } from '@/components/ShareBar'

const TABS = ['Overview', 'Timeline', 'Gallery', 'Achievements', 'Tributes'] as const
type Tab = (typeof TABS)[number]

const TIMELINE = [
  { year: '2024', title: 'Retired after 28 years of service', detail: 'Master Sergeant, U.S. Army. 200+ veterans mentored through transition.' },
  { year: '2019', title: 'Promoted to Master Sergeant', detail: '2nd Battalion. Awarded Meritorious Service Medal.' },
  { year: '2016', title: 'Bronze Star Medal', detail: 'For meritorious service in a combat zone. Began mentoring transitioning veterans in Seattle.' },
  { year: '2010', title: 'Deployment — Kandahar, Afghanistan', detail: 'Third deployment. Led a squad of twelve through a 12-month rotation.' },
  { year: '2008', title: 'Promoted to Sergeant First Class', detail: 'Fort Lewis, Washington.' },
  { year: '2003', title: 'First deployment — Operation Iraqi Freedom', detail: 'Two consecutive tours.' },
  { year: '1996', title: 'Enlisted, U.S. Army', detail: 'Basic training, Fort Benning, Georgia. Age 19.' },
]

const ACHIEVEMENTS = [
  { year: '2025', title: 'Veteran Mentor of the Year — Seattle Vet Center' },
  { year: '2024', title: 'Meritorious Service Medal (second award)' },
  { year: '2019', title: 'Meritorious Service Medal' },
  { year: '2016', title: 'Bronze Star Medal' },
  { year: '2014', title: 'Army Commendation Medal (third award)' },
  { year: '2011', title: 'Afghanistan Campaign Medal' },
  { year: '2005', title: 'Iraq Campaign Medal' },
  { year: '2004', title: 'Army Commendation Medal' },
]

const TRIBUTES = [
  { name: 'David Thompson', tag: 'Served with', text: 'Kandahar, 2010. He carried us — sometimes literally. There is no one I would rather have had on my left.' },
  { name: 'Sarah Martinez', tag: 'Family', text: 'Uncle Mike taught me what showing up means. Twenty-eight years, and he never missed a birthday call from wherever in the world he was.' },
  { name: 'Emily Johnson', tag: 'Community', text: 'Your story inspired my students today. Thank you for coming to speak — three of them want to serve now.' },
  { name: 'Marcus Reed', tag: 'Mentee', text: 'Half the vets at our center owe their restart to Mike. I owe him mine.' },
  { name: 'James R. Williams', tag: 'Fellow honoree', text: 'An honor to share the Hall with you, brother. Service recognizes service.' },
]

const GALLERY = [
  { src: '/brand/heroes/michael-chen-portrait.jpg', caption: 'Portrait, 2024', filter: '' },
  { src: '/brand/heroes/military-veterans.jpg', caption: 'Fort Benning, 1996', filter: 'sepia' },
  { src: '/brand/heroes/military-veterans.jpg', caption: 'Kandahar rotation, 2010', filter: 'grayscale' },
  { src: '/brand/heroes/entrepreneurs.jpg', caption: 'Mentorship cohort, 2023 — family archive', filter: 'grayscale' },
  { src: '/brand/heroes/educators-alumni.jpg', caption: 'Speaking at Rainier High, 2025 — family archive', filter: '' },
  { src: '/brand/heroes/healthcare.jpg', caption: 'Vet Center volunteers — family archive', filter: 'grayscale' },
]

const EVIDENCE_LINKS = [
  { label: 'Seattle Times — "The Sergeant Who Never Stopped Serving" (2024)', href: '#' },
  { label: 'U.S. Army service record — verified via ID.me', href: null },
]

const FAMILY_LINKS = [
  { label: 'Rainier Veteran Mentorship Program', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export default function ChenProfile() {
  const [tab, setTab] = useState<Tab>('Overview')
  const [coSigns, setCoSigns] = useState(1214)
  const [coSigned, setCoSigned] = useState(false)
  const [applause, setApplause] = useState(3862)
  const [applauded, setApplauded] = useState(false)

  return (
    <main className="min-h-screen bg-[#0a0f1a] text-white">
      <SiteHeader />

      {/* Hero band */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/brand/heroes/military-veterans.jpg" alt="" fill sizes="100vw" className="object-cover object-top opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/60 via-[#0a0f1a]/80 to-[#0a0f1a]" />
        </div>
        <div className="relative container mx-auto px-4 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-end max-w-5xl mx-auto">
            <div className="relative rounded-lg overflow-hidden aspect-[3/4] border-2 border-heritage-gold/70 shadow-[0_0_50px_-12px_rgba(255,183,3,0.45)] w-48 md:w-full mx-auto md:mx-0">
              <Image src="/brand/heroes/michael-chen-portrait.jpg" alt="Michael Chen" fill sizes="240px" className="object-cover object-top" priority />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-400/50 text-emerald-300 text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true"><path d="M12 1l2.4 2.4h3.4l1 3.2 2.9 1.8-.9 3.3 2 2.8-2 2.8.9 3.3-2.9 1.8-1 3.2h-3.4L12 23l-2.4-2.4H6.2l-1-3.2-2.9-1.8.9-3.3-2-2.8 2-2.8-.9-3.3 2.9-1.8 1-3.2h3.4L12 1zm-1.2 14.5l5.4-5.4-1.4-1.4-4 4-1.8-1.8-1.4 1.4 3.2 3.2z" /></svg>
                  Verified
                </span>
                <span className="border border-white/25 text-slate-300 text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded">Public Profile</span>
                <span className="inline-flex items-center gap-1.5 bg-courage-red/15 border border-courage-red/60 text-courage-red text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded">
                  ★ Legend · {coSigns.toLocaleString()} co-signs
                </span>
              </div>
              <div>
                <h1 className="font-serif font-black text-4xl md:text-6xl leading-tight">Michael Chen</h1>
                <p className="text-lg text-slate-300 mt-1">U.S. Army Veteran, Master Sergeant (Ret.) · Seattle, WA</p>
              </div>
              {/* Stat chips */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {[
                  { n: '28', label: 'Years of Service' },
                  { n: '3', label: 'Deployments' },
                  { n: '12', label: 'Awards Earned' },
                ].map((s) => (
                  <div key={s.label} className="border border-white/15 rounded-md px-4 py-2.5 bg-white/[0.03] text-center">
                    <div className="font-sans font-black text-2xl leading-none">{s.n}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start pt-1">
                <button
                  onClick={() => { if (!coSigned) { setCoSigns((n) => n + 1); setCoSigned(true) } }}
                  className={`font-semibold px-6 py-2.5 rounded transition-colors inline-flex items-center gap-2 text-sm ${
                    coSigned ? 'bg-heritage-gold text-[#0a0f1a] cursor-default' : 'bg-courage-red hover:bg-courage-red/85 text-white'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 17l4.5-1 9-9a2.1 2.1 0 00-3-3l-9 9-1 4.5z" /><path d="M13 6l3 3M4 21h16" />
                  </svg>
                  {coSigned ? 'Witnessed — you are 1°' : 'Co-Sign This Legacy'}
                </button>
                <button
                  onClick={() => { if (!applauded) { setApplause((n) => n + 1); setApplauded(true) } }}
                  className={`border font-semibold px-5 py-2.5 rounded transition-colors text-sm ${
                    applauded ? 'border-heritage-gold text-heritage-gold cursor-default' : 'border-white/25 hover:border-white text-white'
                  }`}
                >
                  👏 {applause.toLocaleString()}
                </button>
                <ShareBar text="Michael Chen — U.S. Army Veteran, 28 years of service, 1,200+ co-signs — on OfficialWho. Every Story. Every Legacy." label="Share" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-y border-white/10 bg-black/30 sticky top-[65px] z-40 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto max-w-5xl mx-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  tab === t ? 'border-courage-red text-white' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {tab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
              <div className="space-y-6">
                <h2 className="font-serif font-black text-2xl">About</h2>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    Michael Chen served our country with honor for twenty-eight years, leading with courage
                    and compassion through three combat deployments. Enlisting at nineteen out of Rainier
                    Beach, Seattle, he rose from private to Master Sergeant — but if you ask the two hundred
                    veterans he has mentored since, his greatest command came after the uniform.
                  </p>
                  <p>
                    In 2016, while still on active duty, Michael began volunteering at the Seattle Vet Center,
                    guiding transitioning service members through the hardest deployment of all: coming home.
                    His mentorship program has since been adopted by three Vet Centers across Washington State.
                  </p>
                  <p className="font-serif italic text-slate-200">
                    &ldquo;The mission doesn&apos;t end when the uniform comes off. It just changes.&rdquo; — M.C.
                  </p>
                </div>
              </div>
              <aside className="space-y-6">
                <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02] space-y-3">
                  <h3 className="text-[10px] tracking-[0.3em] text-heritage-gold uppercase font-bold">Evidence</h3>
                  {EVIDENCE_LINKS.map((l) => (
                    <div key={l.label} className="flex items-start gap-2 text-sm">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11" /></svg>
                      {l.href ? (
                        <a href={l.href} rel="nofollow noopener" className="text-slate-200 hover:text-white underline underline-offset-4 decoration-white/30">{l.label}</a>
                      ) : (
                        <span className="text-slate-300">{l.label}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02] space-y-3">
                  <h3 className="text-[10px] tracking-[0.3em] text-slate-400 uppercase font-bold">Family-Provided Links</h3>
                  {FAMILY_LINKS.map((l) => (
                    <a key={l.label} href={l.href} rel="nofollow ugc noopener" className="block text-sm text-slate-300 hover:text-white border border-white/15 hover:border-white/40 rounded px-3 py-2 transition-colors">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </aside>
            </div>
          )}

          {tab === 'Timeline' && (
            <div className="max-w-2xl mx-auto">
              <ol className="relative border-l border-heritage-gold/40 ml-3 space-y-10">
                {TIMELINE.map((item) => (
                  <li key={item.year + item.title} className="pl-8 relative">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-heritage-gold bg-[#0a0f1a]" />
                    <div className="font-serif font-black text-heritage-gold text-xl">{item.year}</div>
                    <div className="font-bold text-lg mt-0.5">{item.title}</div>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {tab === 'Gallery' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GALLERY.map((g, i) => (
                <figure key={i} className="group relative rounded-lg overflow-hidden aspect-square border border-white/10">
                  <Image src={g.src} alt={g.caption} fill sizes="(min-width: 768px) 30vw, 45vw" className={`object-cover group-hover:scale-105 transition-transform duration-500 ${g.filter === 'sepia' ? 'sepia' : g.filter === 'grayscale' ? 'grayscale' : ''}`} />
                  <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-3 text-xs text-slate-200">
                    {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {tab === 'Achievements' && (
            <div className="max-w-2xl mx-auto space-y-3">
              {ACHIEVEMENTS.map((a) => (
                <div key={a.year + a.title} className="flex items-center gap-4 border border-white/10 rounded-lg px-5 py-4 bg-white/[0.02] hover:border-heritage-gold/40 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-heritage-gold shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="9" r="5.5" /><path d="M12 6.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3.9-1.8zM9 13.8L7.5 20l4.5-2.4L16.5 20 15 13.8" />
                  </svg>
                  <div className="flex-1 font-semibold">{a.title}</div>
                  <div className="font-serif font-black text-heritage-gold">{a.year}</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Tributes' && (
            <div className="max-w-2xl mx-auto space-y-4">
              {TRIBUTES.map((t) => (
                <blockquote key={t.name} className="border border-white/10 rounded-lg p-5 bg-white/[0.02] space-y-2">
                  <p className="text-slate-200 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <footer className="flex items-center gap-2 text-sm">
                    <span className="font-bold">{t.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold border border-heritage-gold/40 rounded-full px-2 py-0.5">{t.tag}</span>
                  </footer>
                </blockquote>
              ))}
              <div className="border border-dashed border-white/20 rounded-lg p-5 text-center text-sm text-slate-400">
                <Link href="#" className="text-courage-red font-semibold hover:underline underline-offset-4">Sign in</Link> to leave a tribute — every tribute notifies the family.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quiet integrity footer */}
      <section className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">← Back to the Halls</Link>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              <a href="#" className="hover:text-slate-300 transition-colors">Are you Michael Chen? Claim this page</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Raise a concern about this profile</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
