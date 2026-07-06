import type { Metadata } from 'next'
import ChenProfile from './profile'

const TITLE = 'Michael Chen — U.S. Army Veteran | OfficialWho'
const DESCRIPTION =
  '28 years of service. 3 deployments. 200+ veterans mentored. 1,200+ people have co-signed this legacy. Verified. Celebrated. Remembered.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'profile',
    images: ['/brand/heroes/military-veterans.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/brand/heroes/military-veterans.jpg'],
  },
}

export default function Page() {
  return <ChenProfile />
}
