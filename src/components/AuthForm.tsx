'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const supabase = createClient()

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('sent')
    }
  }

  const signInWithGoogle = async () => {
    setErrorMsg('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setErrorMsg(error.message)
  }

  if (status === 'sent') {
    return (
      <div className="border border-emerald-500/40 bg-emerald-500/10 rounded-lg p-6 text-center space-y-2">
        <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" />
        </svg>
        <p className="font-semibold text-white">Check your email</p>
        <p className="text-sm text-slate-300">We sent a sign-in link to {email}. Click it to continue.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <button
        onClick={signInWithGoogle}
        className="w-full flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-8z" />
          <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.2 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8C4.1 20.5 7.8 23 12 23z" />
          <path fill="#FBBC05" d="M6 14.4c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V7.2H2.3C1.5 8.7 1 10.3 1 12s.5 3.3 1.3 4.8L6 14.4z" />
          <path fill="#EA4335" d="M12 5.4c1.5 0 2.9.5 4 1.5l3-3C17.4 2.2 14.9 1 12 1 7.8 1 4.1 3.5 2.3 7.2L6 9.8c.9-2.5 3.2-4.4 6-4.4z" />
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-slate-500 uppercase tracking-wider">or</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={sendMagicLink} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-white/5 border border-white/20 focus:border-courage-red rounded px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-courage-red hover:bg-courage-red/85 disabled:opacity-60 text-white font-semibold py-3 rounded transition-colors"
        >
          {status === 'sending' ? 'Sending…' : mode === 'signup' ? 'Create Account' : 'Send Sign-In Link'}
        </button>
      </form>

      {errorMsg && <p className="text-sm text-courage-red text-center">{errorMsg}</p>}

      <p className="text-xs text-slate-500 text-center leading-relaxed">
        No password needed — we&apos;ll email you a secure sign-in link.
      </p>
    </div>
  )
}
