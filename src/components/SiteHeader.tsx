'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

/* Brand mark — the real logo asset on a white chip, per the design comps */
export function LogoChip({ className }: { className?: string }) {
  return (
    <div className={`bg-white rounded-md p-1 flex items-center justify-center shrink-0 ${className ?? ''}`}>
      <Image src="/brand/logo-mark.png" alt="OfficialWho" width={822} height={1262} className="h-full w-auto" priority unoptimized />
    </div>
  )
}

function initials(user: User) {
  const name = (user.user_metadata?.full_name as string) || user.email || '?'
  return name
    .split(/\s+/)
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function AuthStatus() {
  const [user, setUser] = useState<User | null | undefined>(undefined) // undefined = loading
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [supabase])

  if (user === undefined) {
    return <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full bg-heritage-gold/20 border border-heritage-gold/50 flex items-center justify-center text-xs font-black text-heritage-gold"
          title={user.email ?? ''}
        >
          {initials(user)}
        </div>
        <form action="/auth/signout" method="post">
          <button type="submit" className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block">
            Sign Out
          </button>
        </form>
      </div>
    )
  }

  return (
    <>
      <Link href="/login" className="text-sm text-slate-200 hover:text-white hidden sm:block">Log In</Link>
      <Link href="/signup" className="bg-courage-red hover:bg-courage-red/85 text-white text-sm font-semibold px-4 sm:px-5 py-2 rounded transition-colors whitespace-nowrap">
        Sign Up
      </Link>
    </>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f1a]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <LogoChip className="h-10 w-10 sm:h-11 sm:w-11" />
          <div className="flex flex-col min-w-0">
            <div className="font-sans font-black text-xl sm:text-2xl leading-none tracking-tight whitespace-nowrap text-white">
              Official<span className="text-courage-red">Who</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 mt-1">
              <span className="h-px w-3 bg-courage-red" />
              <span className="text-[8px] tracking-[0.26em] text-slate-300 uppercase font-semibold whitespace-nowrap">
                Verified. Celebrated. Remembered.
              </span>
              <span className="h-px w-3 bg-courage-red" />
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-slate-200">
          {['Discover', 'Stories', 'Categories', 'Map', 'Resources', 'About'].map((item) => (
            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-300 hidden sm:block" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.8-3.8" />
          </svg>
          <AuthStatus />
        </div>
      </div>
    </header>
  )
}
