/**
 * Rate limiting middleware based on user tier
 * Applied to poster generation and other resource-intensive endpoints
 */

import { createErrorResponse } from '@/utils/api-response'
import { entitlementsService } from '@/services/entitlements'
import { logger } from '@/utils/logger'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorCodes } from '@/utils/errors'

/**
 * Middleware to check render quota and enforce tier limits
 */
export async function tierRateLimitMiddleware(
  request: NextRequest,
  userId: string
): Promise<NextResponse | null> {
  const entitlements = await entitlementsService.getUserEntitlements(userId)

  // Check render quota
  if (entitlements.renderingRemaining <= 0) {
    logger.warn(`User ${userId} render quota exceeded (${entitlements.tier} tier)`)
    return NextResponse.json(
      createErrorResponse(
        ErrorCodes.RATE_LIMIT_EXCEEDED,
        `Monthly render quota reached (${entitlements.tier} tier). Upgrade to continue.`,
        {
          tier: entitlements.tier,
          quotaRemaining: entitlements.renderingRemaining,
        }
      ),
      { status: 429 }
    )
  }

  // Add tier info to request for downstream use
  const headers = new Headers(request.headers)
  headers.set('x-user-tier', entitlements.tier)
  headers.set('x-renders-remaining', String(entitlements.renderingRemaining))
  headers.set('x-has-watermark', String(entitlements.hasWatermark))

  return null // No error, continue processing
}

/**
 * Middleware to enforce queue priority based on tier
 */
export async function tierQueuePriorityMiddleware(
  userId: string
): Promise<{ priority: number; maxWaitTime: number }> {
  const entitlements = await entitlementsService.getUserEntitlements(userId)

  const priorityMap = {
    free: { priority: 3, maxWaitTime: 300 }, // 5 minutes
    pro: { priority: 2, maxWaitTime: 120 }, // 2 minutes
    plus: { priority: 1, maxWaitTime: 30 }, // 30 seconds
    enterprise: { priority: 0, maxWaitTime: 5 }, // 5 seconds
  }

  return priorityMap[entitlements.tier]
}

/**
 * Middleware to apply watermark based on tier
 */
export async function tierWatermarkMiddleware(userId: string): Promise<boolean> {
  const entitlements = await entitlementsService.getUserEntitlements(userId)
  return entitlements.hasWatermark
}

/**
 * Middleware to enforce style restrictions
 */
export async function tierStyleRestrictionsMiddleware(
  userId: string,
  style: string
): Promise<{ allowed: boolean; reason?: string }> {
  if (!entitlementsService.isStyleAllowed('free', style)) {
    return {
      allowed: false,
      reason: 'This style is only available on Pro tier or higher',
    }
  }
  return { allowed: true }
}
