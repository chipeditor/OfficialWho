/**
 * Input validation schemas using Zod
 */

import { z } from 'zod'
import { PosterStyle } from '@/types'

export const SchoolMetadataSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  state: z.string().length(2).toUpperCase(),
  country: z.string().default('US'),
  colors: z
    .array(
      z.object({
        name: z.string(),
        hex: z.string().regex(/^#[0-9A-F]{6}$/i),
        usage: z.enum(['primary', 'secondary', 'accent']),
      })
    )
    .min(1),
  mascot: z.string().optional(),
  motto: z.string().optional(),
  coordinateLat: z.number().min(-90).max(90),
  coordinateLng: z.number().min(-180).max(180),
  verificationStatus: z.enum(['verified', 'pending', 'failed']),
  confidence: z.number().min(0).max(1),
})

export const PosterRequestSchema = z.object({
  schoolName: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  state: z.string().length(2).toUpperCase(),
  graduationYear: z.number().int().min(1900).max(new Date().getFullYear()),
  style: z.enum([
    'sports',
    'varsity',
    'luxury',
    'vintage',
    'military-tribute',
    'hall-of-fame',
    'movie-poster',
    'magazine-cover',
    'street-art',
  ] as const),
  customizations: z
    .object({
      colorOverrides: z
        .object({
          primary: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
          secondary: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
          accent: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
        })
        .optional(),
      fontFamily: z.string().optional(),
      saturation: z.number().min(-100).max(100).optional(),
      brightness: z.number().min(-100).max(100).optional(),
      temperature: z.number().min(-100).max(100).optional(),
    })
    .optional(),
})

export const ImageUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 50 * 1024 * 1024, 'File too large (max 50MB)')
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Invalid image format'
    ),
})

export const SchoolSearchSchema = z.object({
  query: z.string().min(1).max(200),
  state: z.string().length(2).toUpperCase().optional(),
})

/**
 * Validate magic bytes for image files
 */
export async function validateImageMagicBytes(file: File): Promise<boolean> {
  const buffer = await file.slice(0, 12).arrayBuffer()
  const bytes = new Uint8Array(buffer)

  // JPEG: FFD8FFE0 or FFD8FFE1
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return true
  }

  // PNG: 89504E47
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return true
  }

  // WebP: RIFF...WEBP
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return true
  }

  return false
}

export type SchoolMetadata = z.infer<typeof SchoolMetadataSchema>
export type PosterRequest = z.infer<typeof PosterRequestSchema>
export type ImageUpload = z.infer<typeof ImageUploadSchema>
export type SchoolSearch = z.infer<typeof SchoolSearchSchema>
