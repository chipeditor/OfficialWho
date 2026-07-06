/**
 * Error classification and handling
 */

import { ApplicationError, ErrorCategory, ApiResponse } from '@/types'

export class AlumniPosterError extends Error implements ApplicationError {
  code: string
  category: ErrorCategory
  statusCode: number
  details?: Record<string, unknown>
  recoverable: boolean

  constructor(
    code: string,
    message: string,
    category: ErrorCategory = 'permanent',
    statusCode: number = 500,
    details?: Record<string, unknown>,
    recoverable: boolean = false
  ) {
    super(message)
    this.code = code
    this.category = category
    this.statusCode = statusCode
    this.details = details
    this.recoverable = recoverable
    this.name = 'AlumniPosterError'
  }
}

export const ErrorCodes = {
  // User errors
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_FIELD: 'MISSING_FIELD',
  INVALID_SCHOOL: 'INVALID_SCHOOL',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  UNSUPPORTED_FORMAT: 'UNSUPPORTED_FORMAT',

  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',

  // Retriable errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',

  // Permanent errors
  INVALID_API_KEY: 'INVALID_API_KEY',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',

  // AI provider errors
  IMAGE_GENERATION_FAILED: 'IMAGE_GENERATION_FAILED',
  BACKGROUND_REMOVAL_FAILED: 'BACKGROUND_REMOVAL_FAILED',
  UPSCALING_FAILED: 'UPSCALING_FAILED',

  // Internal errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
}

export function createErrorResponse<T>(
  error: Error | ApplicationError,
  requestId: string
): ApiResponse<T> {
  if (error instanceof AlumniPosterError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      requestId,
      timestamp: new Date().toISOString(),
    }
  }

  return {
    success: false,
    error: {
      code: ErrorCodes.INTERNAL_ERROR,
      message: error.message || 'An unexpected error occurred',
    },
    requestId,
    timestamp: new Date().toISOString(),
  }
}

export function isRetriableError(error: ApplicationError | Error): boolean {
  if (error instanceof AlumniPosterError) {
    return error.category === 'retriable'
  }
  return false
}

export function getErrorRecoveryAction(error: ApplicationError): string {
  const actions: Record<string, string> = {
    [ErrorCodes.INVALID_SCHOOL]: 'Try searching for your school again',
    [ErrorCodes.FILE_TOO_LARGE]: 'Use a smaller image file (max 50MB)',
    [ErrorCodes.RATE_LIMIT_EXCEEDED]: 'Please wait a few minutes and try again',
    [ErrorCodes.TIMEOUT]: 'The request took too long. Please try again.',
    [ErrorCodes.SERVICE_UNAVAILABLE]:
      'Our service is temporarily unavailable. Please try again in a few minutes.',
  }
  return (
    actions[error.code] ||
    'Please try again or contact support if the problem persists'
  )
}
