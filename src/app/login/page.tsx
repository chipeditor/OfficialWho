import Link from 'next/link'
import { SiteHeader, LogoChip } from '@/components/SiteHeader'
import { AuthForm } from '@/components/AuthForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1a] text-white">
      <SiteHeader />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-sm mx-auto space-y-8">
          <div className="text-center space-y-3">
            <LogoChip className="h-14 w-14 mx-auto" />
            <h1 className="font-serif font-black text-3xl">Welcome Back</h1>
            <p className="text-sm text-slate-400">Sign in to co-sign a legacy, leave a tribute, or submit an honoree.</p>
          </div>
          <AuthForm mode="login" />
          <p className="text-sm text-slate-400 text-center">
            New here?{' '}
            <Link href="/signup" className="text-courage-red font-semibold hover:underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
