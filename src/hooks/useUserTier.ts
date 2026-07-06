/**
 * React hook for accessing user tier and entitlements
 * Works with mock initially; swapped with RevenueCat Purchases hook later
 */

'use client'

import { useEffect, useState } from 'react'
import { UserEntitlements, UserTier } from '@/services/entitlements'
import { logger } from '@/utils/logger'

/**
 * Mock implementation using localStorage
 * Will be replaced with RevenueCat Purchases.useCustomerInfo() hook
 */
export function useUserTier(userId: string) {
  const [entitlements, setEntitlements] = useState<UserEntitlements | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEntitlements = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/entitlements/${userId}`)
        if (!response.ok) throw new Error('Failed to fetch entitlements')
        const data = await response.json()
        setEntitlements(data)
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        logger.error(`Failed to fetch entitlements: ${error.message}`)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchEntitlements()
  }, [userId])

  return { entitlements, loading, error }
}

/**
 * Hook to check if user can render
 */
export function useCanRender(userId: string) {
  const { entitlements, loading } = useUserTier(userId)

  if (loading) return { canRender: true, loading: true, reason: undefined }
  if (!entitlements) return { canRender: false, loading: false, reason: 'Failed to load entitlements' }

  return {
    canRender: entitlements.renderingRemaining > 0,
    loading: false,
    reason:
      entitlements.renderingRemaining <= 0
        ? `Monthly quota reached (${entitlements.tier} tier). Upgrade for more.`
        : undefined,
  }
}

/**
 * Hook to check if style is allowed
 */
export function useIsStyleAllowed(userId: string, style: string) {
  const { entitlements, loading } = useUserTier(userId)

  if (loading) return { allowed: true, loading: true }
  if (!entitlements) return { allowed: false, loading: false }

  // Free tier only allows 3 styles
  if (entitlements.tier === 'free') {
    return {
      allowed: entitlements.allowedStyles.includes(style),
      loading: false,
    }
  }

  return { allowed: true, loading: false }
}

/**
 * Hook to check if feature is available
 */
export function useFeatureAvailable(userId: string, feature: 'batch' | 'priority') {
  const { entitlements, loading } = useUserTier(userId)

  if (loading) return { available: false, loading: true }
  if (!entitlements) return { available: false, loading: false }

  const available =
    feature === 'batch'
      ? entitlements.batchProcessing
      : feature === 'priority'
        ? entitlements.priorityQueue
        : false

  return { available, loading: false }
}
