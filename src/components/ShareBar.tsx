'use client'

import { useState } from 'react'

/* Social share bar — Web Share API first, intent links + copy fallback */
export function ShareBar({ text, label = 'Share' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : 'https://officialwho.com')

  const nativeShare = async () => {
    const url = getUrl()
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'OfficialWho', text, url })
        return
      } catch {
        /* user dismissed — fall through */
      }
    }
    copyLink()
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${text} ${getUrl()}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const openIntent = (intent: string) => {
    const url = encodeURIComponent(getUrl())
    const msg = encodeURIComponent(text)
    const intents: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${msg}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${msg}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${msg}%20${url}`,
    }
    window.open(intents[intent], '_blank', 'noopener,width=640,height=540')
  }

  const btn = 'w-10 h-10 rounded-full border border-white/25 hover:border-courage-red hover:bg-courage-red/10 flex items-center justify-center transition-colors'

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <button onClick={nativeShare} className="bg-courage-red hover:bg-courage-red/85 text-white font-semibold px-5 py-2.5 rounded transition-colors inline-flex items-center gap-2 text-sm">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="6" cy="12" r="2.5" /><circle cx="17.5" cy="5.5" r="2.5" /><circle cx="17.5" cy="18.5" r="2.5" />
          <path d="M8.3 10.8l7-4M8.3 13.2l7 4" />
        </svg>
        {label}
      </button>
      <button onClick={() => openIntent('x')} className={btn} aria-label="Share on X" title="Share on X">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      <button onClick={() => openIntent('facebook')} className={`${btn} font-black text-base`} aria-label="Share on Facebook" title="Share on Facebook">f</button>
      <button onClick={() => openIntent('linkedin')} className={`${btn} font-black text-xs tracking-tight`} aria-label="Share on LinkedIn" title="Share on LinkedIn">in</button>
      <button onClick={() => openIntent('whatsapp')} className={btn} aria-label="Share on WhatsApp" title="Share on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3.5a8.5 8.5 0 00-7.3 12.8L3.5 20.5l4.4-1.1A8.5 8.5 0 1012 3.5z" />
          <path d="M9 8.8c.6 2.8 3.4 5.4 6 6l.9-1.7-2.3-1.2-.9.8c-.9-.5-1.7-1.3-2.2-2.2l.8-.9-1.2-2.3L9 8.8z" />
        </svg>
      </button>
      <button onClick={copyLink} className={btn} aria-label="Copy link" title="Copy link">
        {copied ? (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9.5 14.5l5-5M8 12l-2.4 2.4a3.5 3.5 0 004.9 5L13 17M16 12l2.4-2.4a3.5 3.5 0 00-4.9-5L11 7" />
          </svg>
        )}
      </button>
      {copied && <span className="text-xs text-emerald-400 font-semibold">Copied!</span>}
    </div>
  )
}
