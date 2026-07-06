import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alumni Legacy Poster Generator',
  description:
    'Generate premium alumni posters with dynamic school branding and AI-powered design',
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
