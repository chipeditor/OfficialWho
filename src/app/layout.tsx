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

const SITE_TITLE = 'OfficialWho — The Global Hall of Honor'
const SITE_DESCRIPTION =
  'Every Story. Every Legacy. A global platform honoring the people who serve, achieve, and inspire — verified, celebrated, and remembered across 195 countries.'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL('https://officialwho.com'),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'OfficialWho',
    type: 'website',
    images: ['/brand/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/brand/og-image.jpg'],
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
