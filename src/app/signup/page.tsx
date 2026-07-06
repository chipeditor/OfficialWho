import Link from 'next/link'
import { SiteHeader, LogoChip } from '@/components/SiteHeader'
import { AuthForm } from '@/components/AuthForm'

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1a] text-white">
      <SiteHeader />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-sm mx-auto space-y-8">
          <div className="text-center space-y-3">
            <LogoChip className="h-14 w-14 mx-auto" />
            <h1 className="font-serif font-black text-3xl">Join OfficialWho</h1>
            <p className="text-sm text-slate-400">
              Free forever to browse, co-sign, and witness a legacy. Verified. Celebrated. Remembered.
            </p>
          </div>
          <AuthForm mode="signup" />
          <p className="text-sm text-slate-400 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-courage-red font-semibold hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
