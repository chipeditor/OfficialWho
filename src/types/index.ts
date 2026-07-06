/**
 * Core domain types
 */

export interface SchoolMetadata {
  id: string
  name: string
  abbreviation?: string
  city: string
  state: string
  country: string
  founded?: number
  colors: SchoolColor[]
  mascot?: string
  motto?: string
  nickname?: string
  logoUrl?: string
  buildingUrl?: string
  skylineUrl?: string
  landmarks?: Landmark[]
  wikipediaUrl?: string
  coordinateLat: number
  coordinateLng: number
  verificationStatus: 'verified' | 'pending' | 'failed'
  verifiedAt?: Date
  cachedAt: Date
  confidence: number
}

export interface SchoolColor {
  name: string
  hex: string
  rgb: { r: number; g: number; b: number }
  usage: 'primary' | 'secondary' | 'accent'
  source: string
}

export interface Landmark {
  name: string
  description?: string
  imageUrl?: string
  lat: number
  lng: number
}

export interface PosterRequest {
  id: string
  userId: string
  portraitUrl: string
  portraitFileName: string
  schoolId?: string
  schoolName: string
  city: string
  state: string
  graduationYear: number
  style: PosterStyle
  customizations?: PosterCustomizations
  status: JobStatus
  createdAt: Date
  updatedAt: Date
}

export type PosterStyle =
  | 'sports'
  | 'varsity'
  | 'luxury'
  | 'vintage'
  | 'military-tribute'
  | 'hall-of-fame'
  | 'movie-poster'
  | 'magazine-cover'
  | 'street-art'

export interface PosterCustomizations {
  colorOverrides?: {
    primary?: string
    secondary?: string
    accent?: string
  }
  fontFamily?: string
  saturation?: number
  brightness?: number
  temperature?: number
}

export type JobStatus =
  | 'pending'
  | 'processing'
  | 'generating'
  | 'upscaling'
  | 'rendering'
  | 'completed'
  | 'failed'

export interface PosterJob {
  id: string
  requestId: string
  status: JobStatus
  stage: GenerationStage
  stageProgress: number
  portraitImageUrl?: string
  backgroundRemovedUrl?: string
  aiGeneratedUrl?: string
  upscaledUrl?: string
  finalUrl?: string
  error?: {
    code: string
    message: string
    recoverable: boolean
    suggestedAction?: string
  }
  startedAt: Date
  completedAt?: Date
}

export type GenerationStage =
  | 'metadata-lookup'
  | 'background-removal'
  | 'ai-generation'
  | 'upscaling'
  | 'rendering'

export interface GenerationProgress {
  jobId: string
  stage: GenerationStage
  progress: number
  message: string
  estimatedSecondsRemaining?: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
  requestId: string
  timestamp: string
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  resetAt: Date
}

/**
 * Image provider interface for abstraction
 */
export interface IImageProvider {
  name: string
  health: ProviderHealth
  generateImage(
    prompt: string,
    options?: ImageGenerationOptions
  ): Promise<{
    imageUrl: string
    metadata: { width: number; height: number; format: string }
  }>
  removeBackground(
    imageUrl: string,
    options?: RemoveBackgroundOptions
  ): Promise<{
    imageUrl: string
    confidence: number
  }>
  upscale(
    imageUrl: string,
    targetWidth: number,
    targetHeight: number
  ): Promise<{
    imageUrl: string
    actualWidth: number
    actualHeight: number
  }>
}

export interface ProviderHealth {
  status: 'healthy' | 'degraded' | 'down'
  lastCheckedAt: Date
  lastSuccessAt?: Date
  errorRate: number
  avgResponseTime: number
}

export interface ImageGenerationOptions {
  model?: string
  steps?: number
  guidance?: number
  seed?: number
  format?: 'png' | 'jpg' | 'webp'
}

export interface RemoveBackgroundOptions {
  model?: string
  threshold?: number
}

/**
 * Cache-related types
 */
export interface CacheEntry<T> {
  value: T
  expiresAt: Date
  source: 'browser' | 'redis' | 'database'
}

export interface CacheStrategy {
  browserTtl: number
  redisTtl: number
  dbPersist: boolean
}

/**
 * Error handling types
 */
export type ErrorCategory =
  | 'user_error'
  | 'retriable'
  | 'quota_exceeded'
  | 'permanent'

export interface ApplicationError extends Error {
  code: string
  category: ErrorCategory
  statusCode: number
  details?: Record<string, unknown>
  recoverable: boolean
}
