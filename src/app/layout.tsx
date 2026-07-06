import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OfficialWho — Verified. Celebrated. Remembered.',
  description:
    'Not another social network. A digital hall of honor for verified alumni, professionals, and communities.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {children}
        </div>
      </body>
    </html>
  )
}
