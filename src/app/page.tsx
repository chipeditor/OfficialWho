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
            <div className="w-10 h-10 bg-courage-red rounded-lg flex items-center justify-center font-bold text-white">
              O
            </div>
            <div className="flex flex-col">
              <div className="font-display text-xl text-courage-red font-bold">OfficialWho</div>
              <div className="text-xs text-slate-400">Verified • Celebrated • Remembered</div>
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
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="font-display text-6xl md:text-7xl font-bold text-white tracking-tight">
              Celebrate <span className="text-courage-red">Extraordinary</span> Lives
            </h1>
            <p className="text-xl text-slate-300">
              OfficialWho is not another social network. It's a digital hall of honor for verified alumni,
              professionals, and communities.
            </p>
            <p className="text-lg font-semibold text-courage-red italic">
              Verified. Celebrated. Remembered.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/generate" className="brand-button text-lg px-8 py-4">
              Create Your Poster
            </Link>
            <Link href="/gallery" className="brand-button-secondary text-lg px-8 py-4">
              Explore Gallery
            </Link>
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
