import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Merriweather } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const merriweather = Merriweather({
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
})

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
    <html lang="en" suppressHydrationWarning className={`${bebasNeue.variable} ${inter.variable} ${merriweather.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
