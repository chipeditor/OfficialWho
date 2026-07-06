'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { mockCategories, mockPosterStyles, mockUserProfiles } from '@/lib/mock-data'

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'healthy' | 'error'>('checking')

  useEffect(() => {
    // Check API health
    fetch('/api/health')
      .then((res) => res.json())
      .then(() => setApiStatus('healthy'))
      .catch(() => setApiStatus('error'))
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-legacy-navy via-slate-900 to-legacy-navy">
      {/* Header */}
      <header className="border-b border-white/10 bg-legacy-navy/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark: red frame + silhouette */}
            <div className="w-11 h-11 rounded-md border-[3px] border-courage-red bg-legacy-navy flex items-end justify-center overflow-hidden shrink-0">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current translate-y-1" aria-hidden="true">
                <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9c0-3.9 3.1-7 7-7s7 3.1 7 7H5z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="font-display text-2xl leading-none text-white tracking-wide">
                OFFICIAL<span className="text-courage-red">WHO</span>
              </div>
              <div className="text-[10px] tracking-[0.25em] text-heritage-gold uppercase">
                Verified • Celebrated • Remembered
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                apiStatus === 'healthy'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : apiStatus === 'checking'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-courage-red/20 text-courage-red'
              }`}
            >
              {apiStatus === 'healthy' ? '✓ API Ready' : apiStatus === 'checking' ? '⟳ Checking' : '⚠ Offline'}
            </span>
            <button className="brand-button text-sm py-2 px-4">Sign In</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-5">
              <div className="inline-block px-4 py-1.5 rounded-full border border-heritage-gold/40 text-heritage-gold text-xs font-semibold tracking-[0.2em] uppercase">
                A Digital Hall of Honor
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-white leading-[0.95]">
                Celebrate<br />
                <span className="text-courage-red">Extraordinary</span><br />
                Lives
              </h1>
              <p className="text-xl text-slate-300 max-w-xl mx-auto lg:mx-0">
                Not another social network. OfficialWho is where verified alumni, first responders,
                veterans, and communities are honored — permanently.
              </p>
              <p className="font-display text-2xl tracking-[0.15em] text-heritage-gold uppercase">
                Verified. Celebrated. Remembered.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link href="/generate" className="brand-button text-lg px-8 py-4">
                Create Your Poster
              </Link>
              <Link href="/gallery" className="brand-button-secondary text-lg px-8 py-4">
                Explore Gallery
              </Link>
            </div>
          </div>

          {/* Poster mockup: red frame + silhouette, echoing the logo */}
          <div className="relative mx-auto w-72 md:w-80">
            <div className="absolute -inset-6 bg-courage-red/15 blur-3xl rounded-full" aria-hidden="true" />
            <div className="relative border-[6px] border-courage-red rounded-lg bg-gradient-to-b from-slate-800 to-legacy-navy p-5 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-[4/5] rounded bg-gradient-to-b from-steel-blue/25 via-transparent to-black/40 flex items-end justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-44 h-44 text-white/90 fill-current translate-y-6" aria-hidden="true">
                  <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9c0-3.9 3.1-7 7-7s7 3.1 7 7H5z" />
                </svg>
              </div>
              <div className="mt-4 text-center border-t border-heritage-gold/30 pt-3">
                <div className="font-display text-3xl text-white uppercase tracking-wide">Your Name</div>
                <div className="text-[11px] tracking-[0.35em] text-heritage-gold uppercase mt-1">
                  Class of 2026 • Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Brand Pillars */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { icon: '✏️', title: 'CREATE', desc: 'Design a stunning legacy poster' },
            { icon: '👤', title: 'JOIN', desc: 'Build your official legacy profile' },
            { icon: '⭐', title: 'BE RECOGNIZED', desc: 'Share your story. Inspire generations.' },
            { icon: '🤝', title: 'CONNECT', desc: 'Find others. Build community.' },
            { icon: '🛡️', title: 'PRESERVE', desc: 'Your legacy. Officially remembered.' },
          ].map((pillar, i) => (
            <div key={i} className="glass-panel p-6 text-center space-y-3 animate-fade-in hover:border-courage-red/50 transition-colors">
              <div className="text-4xl">{pillar.icon}</div>
              <h3 className="font-display text-lg text-courage-red uppercase font-bold">{pillar.title}</h3>
              <p className="text-sm text-slate-300">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Showcase */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <h2 className="font-display text-4xl text-white text-center mb-12 uppercase tracking-wide">
          Why Choose OfficialWho?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Verified Credentials',
              description: 'Institutional verification through OAuth, batch imports, and peer validation',
              color: 'text-blue-400',
            },
            {
              title: '9 Premium Styles',
              description: 'Sports, Luxury, Vintage, Military Tribute, Hall of Fame, and more',
              color: 'text-courage-red',
            },
            {
              title: 'Print-Ready Quality',
              description: '300 DPI output perfect for framing, printing, and professional display',
              color: 'text-emerald-400',
            },
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-8 space-y-4 animate-fade-in">
              <h3 className={`text-xl font-bold ${feature.color}`}>{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mock Data Showcase */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <h2 className="font-display text-4xl text-white text-center mb-12 uppercase tracking-wide">
          Community Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockUserProfiles.map((profile) => (
            <div key={profile.id} className="glass-panel p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-courage-red to-heritage-gold rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{profile.name}</h3>
                  <p className="text-xs text-slate-400">{profile.school}</p>
                </div>
                {profile.verified && <span className="text-courage-red text-lg">✓</span>}
              </div>
              <p className="text-sm text-slate-300">{profile.bio}</p>
              <div className="flex gap-2">
                <span className="category-badge" style={{ backgroundColor: mockCategories.find(c => c.id === profile.categoryId)?.color }}>
                  {profile.category}
                </span>
                <span className="category-badge bg-slate-700">Class of {profile.graduationYear}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Showcase */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <h2 className="font-display text-4xl text-white text-center mb-12 uppercase tracking-wide">
          Every Community. One Legacy.
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {mockCategories.map((category) => (
            <div
              key={category.id}
              className="glass-panel p-4 text-center space-y-2 hover:border-white/30 transition-colors cursor-pointer"
            >
              <div className="text-2xl font-bold text-white">{category.label.charAt(0)}</div>
              <p className="text-sm font-semibold text-white">{category.label}</p>
              <div
                className="w-full h-1 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Poster Styles */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <h2 className="font-display text-4xl text-white text-center mb-12 uppercase tracking-wide">
          9 Premium Styles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPosterStyles.map((style) => (
            <div key={style.id} className="glass-panel p-6 text-center space-y-3 hover:border-courage-red/50 transition-all hover:scale-105">
              <h3 className="font-display text-xl text-courage-red uppercase font-bold">{style.label}</h3>
              <p className="text-slate-300">{style.description}</p>
              <button className="brand-button w-full text-sm py-2">
                Preview
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <div className="glass-panel p-12 text-center space-y-6">
          <h2 className="font-display text-4xl text-white uppercase tracking-wide">
            Ready to Create Your Legacy?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Start with 2 free posters. Upgrade to celebrate your full story.
          </p>
          <Link href="/generate" className="brand-button inline-block text-lg px-12 py-4">
            Create Your First Poster →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-legacy-navy/50 backdrop-blur-md mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h3 className="font-display text-courage-red text-lg uppercase font-bold">OfficialWho</h3>
              <p className="text-sm text-slate-400">A digital hall of honor for verified alumni and communities.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Product</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li><a href="#" className="hover:text-courage-red">Features</a></li>
                <li><a href="#" className="hover:text-courage-red">Pricing</a></li>
                <li><a href="#" className="hover:text-courage-red">API</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Company</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li><a href="#" className="hover:text-courage-red">About</a></li>
                <li><a href="#" className="hover:text-courage-red">Blog</a></li>
                <li><a href="#" className="hover:text-courage-red">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li><a href="#" className="hover:text-courage-red">Privacy</a></li>
                <li><a href="#" className="hover:text-courage-red">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-400">
            <p>© 2026 OfficialWho. Not another social network. A digital hall of honor.</p>
            <p className="mt-2 text-xs">Verified. Celebrated. Remembered.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
