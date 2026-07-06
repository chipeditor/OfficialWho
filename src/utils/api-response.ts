/**
 * Standardized API response envelope
 */

import { nanoid } from 'nanoid'
import { ApiResponse, RateLimitInfo } from '@/types'

export function createSuccessResponse<T>(
  data: T,
  rateLimitInfo?: RateLimitInfo
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    requestId: nanoid(16),
    timestamp: new Date().toISOString(),
  }
  return response
}

export function createErrorResponse<T>(
  code: string,
  message: string,
  details?: Record<string, unknown>
): ApiResponse<T> {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    requestId: nanoid(16),
    timestamp: new Date().toISOString(),
  }
}

export function addRateLimitHeaders(
  headers: Headers,
  limit: number,
  remaining: number,
  resetAt: Date
): void {
  headers.set('X-RateLimit-Limit', String(limit))
  headers.set('X-RateLimit-Remaining', String(remaining))
  headers.set('X-RateLimit-Reset', resetAt.toISOString())
}
