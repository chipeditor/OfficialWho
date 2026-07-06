/**
 * Mock Data for Development
 * Replace with real API calls in production
 */

export const mockSchools = [
  {
    id: 'school-1',
    name: 'Harvard University',
    city: 'Cambridge',
    state: 'MA',
    colors: [
      { name: 'Crimson', hex: '#C60C30', rgb: { r: 198, g: 12, b: 48 }, usage: 'primary' as const },
      { name: 'White', hex: '#FFFFFF', rgb: { r: 255, g: 255, b: 255 }, usage: 'secondary' as const },
    ],
    mascot: 'Crimson Tide',
    logoUrl: '/placeholder-logo.png',
    coordinateLat: 42.3601,
    coordinateLng: -71.0589,
    verificationStatus: 'verified' as const,
    confidence: 0.95,
  },
  {
    id: 'school-2',
    name: 'Yale University',
    city: 'New Haven',
    state: 'CT',
    colors: [
      { name: 'Yale Blue', hex: '#00356B', rgb: { r: 0, g: 53, b: 107 }, usage: 'primary' as const },
      { name: 'White', hex: '#FFFFFF', rgb: { r: 255, g: 255, b: 255 }, usage: 'secondary' as const },
    ],
    mascot: 'Bulldogs',
    logoUrl: '/placeholder-logo.png',
    coordinateLat: 41.3083,
    coordinateLng: -72.9279,
    verificationStatus: 'verified' as const,
    confidence: 0.95,
  },
  {
    id: 'school-3',
    name: 'Stanford University',
    city: 'Palo Alto',
    state: 'CA',
    colors: [
      { name: 'Cardinal Red', hex: '#8C1515', rgb: { r: 140, g: 21, b: 21 }, usage: 'primary' as const },
      { name: 'White', hex: '#FFFFFF', rgb: { r: 255, g: 255, b: 255 }, usage: 'secondary' as const },
    ],
    mascot: 'Cardinal',
    logoUrl: '/placeholder-logo.png',
    coordinateLat: 37.4275,
    coordinateLng: -122.1697,
    verificationStatus: 'verified' as const,
    confidence: 0.95,
  },
  {
    id: 'school-4',
    name: 'MIT',
    city: 'Cambridge',
    state: 'MA',
    colors: [
      { name: 'MIT Red', hex: '#A31F34', rgb: { r: 163, g: 31, b: 52 }, usage: 'primary' as const },
      { name: 'White', hex: '#FFFFFF', rgb: { r: 255, g: 255, b: 255 }, usage: 'secondary' as const },
    ],
    mascot: 'Engineers',
    logoUrl: '/placeholder-logo.png',
    coordinateLat: 42.3601,
    coordinateLng: -71.0921,
    verificationStatus: 'verified' as const,
    confidence: 0.95,
  },
  {
    id: 'school-5',
    name: 'UC Berkeley',
    city: 'Berkeley',
    state: 'CA',
    colors: [
      { name: 'Berkeley Blue', hex: '#003262', rgb: { r: 0, g: 50, b: 98 }, usage: 'primary' as const },
      { name: 'Gold', hex: '#FDB515', rgb: { r: 253, g: 181, b: 21 }, usage: 'secondary' as const },
    ],
    mascot: 'Golden Bears',
    logoUrl: '/placeholder-logo.png',
    coordinateLat: 37.8722,
    coordinateLng: -122.2592,
    verificationStatus: 'verified' as const,
    confidence: 0.95,
  },
];

export const mockCategories = [
  // Service & civic
  { id: 'high-school', label: 'High School', color: '#3248A8' },
  { id: 'military', label: 'Military', color: '#2E7D32' },
  { id: 'police', label: 'Police', color: '#0D47A1' },
  { id: 'fire', label: 'Fire', color: '#E53946' },
  { id: 'teacher', label: 'Teacher', color: '#1976D2' },
  { id: 'ems', label: 'EMS', color: '#00838F' },
  { id: 'nurse', label: 'Nurse', color: '#E53935' },
  { id: 'skilled-trades', label: 'Skilled Trades', color: '#B5651D' },
  { id: 'community-leaders', label: 'Community Leaders', color: '#5E60CE' },
  // Culture & music
  { id: 'hip-hop', label: 'Hip Hop', color: '#F72585' },
  { id: 'house', label: 'House', color: '#00B4A0' },
  { id: 'gospel', label: 'Gospel', color: '#FFB703' },
  { id: 'dance', label: 'Dance', color: '#C2185B' },
  { id: 'musician', label: 'Musician', color: '#7B2CBF' },
  { id: 'djs-producers', label: 'DJs & Producers', color: '#4CC9F0' },
  { id: 'choirs', label: 'Choirs & Praise Teams', color: '#E9A820' },
  { id: 'steppers', label: 'Steppers & Line Dance', color: '#FF6B9D' },
  { id: 'spoken-word', label: 'Spoken Word & Poets', color: '#9D4EDD' },
  // Achievement & community
  { id: 'athlete', label: 'Athlete', color: '#F77F00' },
  { id: 'coaches', label: 'Coaches & Mentors', color: '#2A9D8F' },
  { id: 'greek-life', label: 'Greek Life', color: '#C1121F' },
  { id: 'faith-ministry', label: 'Faith & Ministry', color: '#D4A017' },
  { id: 'first-gen-grads', label: 'First-Gen Graduates', color: '#3A86FF' },
];

export const mockPosterStyles = [
  { id: 'sports', label: 'Sports', description: 'Championship style athletics' },
  { id: 'varsity', label: 'Varsity', description: 'Classic varsity aesthetic' },
  { id: 'luxury', label: 'Luxury', description: 'Premium, elegant design' },
  { id: 'vintage', label: 'Vintage', description: 'Retro throwback style' },
  { id: 'military-tribute', label: 'Military Tribute', description: 'Honor & service' },
  { id: 'hall-of-fame', label: 'Hall of Fame', description: 'Achievement showcase' },
  { id: 'movie-poster', label: 'Movie Poster', description: 'Cinematic blockbuster' },
  { id: 'magazine-cover', label: 'Magazine Cover', description: 'Publication style' },
  { id: 'street-art', label: 'Street Art', description: 'Urban contemporary' },
];

export const mockUserProfiles = [
  {
    id: 'user-1',
    name: 'James Walker',
    school: 'Harvard University',
    graduationYear: 2015,
    category: 'Military',
    categoryId: 'military',
    bio: 'U.S. Army Veteran | Leadership & Service',
    avatar: '/placeholder-avatar.png',
    verified: true,
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    school: 'Stanford University',
    graduationYear: 2018,
    category: 'Musician',
    categoryId: 'musician',
    bio: 'Composer & Performer | Award-winning artist',
    avatar: '/placeholder-avatar.png',
    verified: true,
  },
  {
    id: 'user-3',
    name: 'Michael Thompson',
    school: 'Yale University',
    graduationYear: 2012,
    category: 'Police',
    categoryId: 'police',
    bio: 'Captain, NYPD | 15 years of service',
    avatar: '/placeholder-avatar.png',
    verified: true,
  },
];

export async function searchSchools(query: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockSchools.filter(
    (school) =>
      school.name.toLowerCase().includes(query.toLowerCase()) ||
      school.city.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getSchoolById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return mockSchools.find((school) => school.id === id);
}

export function getCategoryColor(categoryId: string): string {
  const category = mockCategories.find((c) => c.id === categoryId);
  return category?.color || '#3248A8';
}
