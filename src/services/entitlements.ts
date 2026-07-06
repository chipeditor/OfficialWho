/**
 * User Entitlements Service
 * RevenueCat integration for subscription management
 * Can be swapped out or feature-flagged without breaking core
 */

import { logger } from '@/utils/logger'

export type UserTier = 'free' | 'pro' | 'plus' | 'enterprise'

export interface UserEntitlements {
  tier: UserTier
  rendersPerMonth: number
  renderingRemaining: number
  hasWatermark: boolean
  allowedStyles: string[]
  batchProcessing: boolean
  priorityQueue: boolean
  expiresAt?: Date
}

export interface TierConfig {
  rendersPerMonth: number
  cost: number | null
  costCycle: 'one-time' | 'monthly' | 'annual' | null
  hasWatermark: boolean
  allowedStyles: 'all' | string[]
  batchProcessing: boolean
  priorityQueue: boolean
}

export const TIER_CONFIGS: Record<UserTier, TierConfig> = {
  free: {
    rendersPerMonth: 2,
    cost: null,
    costCycle: null,
    hasWatermark: true,
    allowedStyles: ['sports', 'varsity', 'luxury'],
    batchProcessing: false,
    priorityQueue: false,
  },
  pro: {
    rendersPerMonth: 10,
    cost: 0.99,
    costCycle: 'one-time',
    hasWatermark: false,
    allowedStyles: 'all',
    batchProcessing: false,
    priorityQueue: false,
  },
  plus: {
    rendersPerMonth: 100,
    cost: 5.99,
    costCycle: 'monthly',
    hasWatermark: false,
    allowedStyles: 'all',
    batchProcessing: true,
    priorityQueue: true,
  },
  enterprise: {
    rendersPerMonth: 10000,
    cost: null, // Custom pricing
    costCycle: null,
    hasWatermark: false,
    allowedStyles: 'all',
    batchProcessing: true,
    priorityQueue: true,
  },
}

/**
 * Entitlements service (initially mock, swapped with RevenueCat later)
 */
export class EntitlementsService {
  private userTiers: Map<string, UserTier> = new Map()
  private renderCounts: Map<string, number> = new Map()
  private monthlyResets: Map<string, Date> = new Map()

  /**
   * Get user entitlements
   * Initially returns free tier; RevenueCat hook added later
   */
  async getUserEntitlements(userId: string): Promise<UserEntitlements> {
    const tier = this.userTiers.get(userId) || 'free'
    const config = TIER_CONFIGS[tier]

    // Check if monthly quota reset
    const lastReset = this.monthlyResets.get(userId)
    if (!lastReset || this.isMonthOlder(lastReset)) {
      this.renderCounts.set(userId, 0)
      this.monthlyResets.set(userId, new Date())
    }

    const used = this.renderCounts.get(userId) || 0
    const remaining = Math.max(0, config.rendersPerMonth - used)

    logger.debug(`User ${userId} entitlements: ${tier} (${remaining}/${config.rendersPerMonth} remaining)`)

    return {
      tier,
      rendersPerMonth: config.rendersPerMonth,
      renderingRemaining: remaining,
      hasWatermark: config.hasWatermark,
      allowedStyles: Array.isArray(config.allowedStyles)
        ? config.allowedStyles
        : ['sports', 'varsity', 'luxury', 'vintage', 'military-tribute', 'hall-of-fame', 'movie-poster', 'magazine-cover', 'street-art'],
      batchProcessing: config.batchProcessing,
      priorityQueue: config.priorityQueue,
    }
  }

  /**
   * Check if user can render poster
   */
  async canRender(userId: string): Promise<{ allowed: boolean; reason?: string }> {
    const entitlements = await this.getUserEntitlements(userId)

    if (entitlements.renderingRemaining <= 0) {
      return {
        allowed: false,
        reason: `Monthly quota reached. Upgrade to ${entitlements.tier === 'free' ? 'Pro' : 'Plus'} for more renders.`,
      }
    }

    return { allowed: true }
  }

  /**
   * Record a render attempt
   */
  async recordRender(userId: string): Promise<void> {
    const current = this.renderCounts.get(userId) || 0
    this.renderCounts.set(userId, current + 1)
    logger.info(`Render recorded for ${userId}: ${current + 1}`)
  }

  /**
   * Check if style is allowed for tier
   */
  isStyleAllowed(tier: UserTier, style: string): boolean {
    const config = TIER_CONFIGS[tier]
    if (config.allowedStyles === 'all') return true
    return config.allowedStyles.includes(style)
  }

  /**
   * Manually set tier (for testing or manual override)
   */
  setUserTier(userId: string, tier: UserTier): void {
    this.userTiers.set(userId, tier)
    this.renderCounts.set(userId, 0)
    this.monthlyResets.set(userId, new Date())
    logger.info(`Set user ${userId} to tier: ${tier}`)
  }

  private isMonthOlder(date: Date): boolean {
    const now = new Date()
    const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1)
    return date < monthAgo
  }
}

export const entitlementsService = new EntitlementsService()
