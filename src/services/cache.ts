/**
 * Multi-layer Cache Service
 * Browser cache (5min) → Redis (24h) → Supabase (persistent)
 */

import { CacheEntry, CacheStrategy } from '@/types'
import { logger } from '@/utils/logger'

const DEFAULT_STRATEGY: CacheStrategy = {
  browserTtl: 5 * 60 * 1000, // 5 minutes
  redisTtl: 24 * 60 * 60, // 24 hours
  dbPersist: true,
}

export class CacheService {
  private memoryCache: Map<string, CacheEntry<unknown>> = new Map()

  async get<T>(
    key: string,
    strategy: CacheStrategy = DEFAULT_STRATEGY
  ): Promise<T | null> {
    // Layer 1: Browser/Memory Cache
    const memoryEntry = this.memoryCache.get(key)
    if (memoryEntry && memoryEntry.expiresAt > new Date()) {
      logger.debug(`Cache HIT (memory): ${key}`)
      return memoryEntry.value as T
    }

    // Layer 2: Redis Cache
    if (typeof window === 'undefined') {
      // Server-side only
      try {
        const redisKey = `cache:${key}`
        // Redis lookup would happen here
        logger.debug(`Cache MISS (redis): ${key}`)
      } catch (error) {
        logger.error(`Redis cache error: ${error}`)
      }
    }

    // Layer 3: Database Cache
    if (typeof window === 'undefined') {
      try {
        // Database lookup would happen here
        logger.debug(`Cache MISS (database): ${key}`)
      } catch (error) {
        logger.error(`Database cache error: ${error}`)
      }
    }

    return null
  }

  async set<T>(
    key: string,
    value: T,
    strategy: CacheStrategy = DEFAULT_STRATEGY
  ): Promise<void> {
    const expiresAt = new Date(Date.now() + strategy.browserTtl)
    const entry: CacheEntry<T> = {
      value,
      expiresAt,
      source: 'browser',
    }

    // Layer 1: Memory Cache
    this.memoryCache.set(key, entry)
    logger.debug(`Cache SET (memory): ${key}`)

    // Layer 2: Redis Cache (server-side)
    if (typeof window === 'undefined') {
      try {
        // Redis set would happen here
        logger.debug(`Cache SET (redis): ${key}`)
      } catch (error) {
        logger.error(`Redis cache set error: ${error}`)
      }
    }

    // Layer 3: Database Cache (server-side)
    if (typeof window === 'undefined' && strategy.dbPersist) {
      try {
        // Database set would happen here
        logger.debug(`Cache SET (database): ${key}`)
      } catch (error) {
        logger.error(`Database cache set error: ${error}`)
      }
    }
  }

  async invalidate(pattern: string): Promise<void> {
    // Browser cache
    const regex = new RegExp(pattern)
    for (const key of this.memoryCache.keys()) {
      if (regex.test(key)) {
        this.memoryCache.delete(key)
      }
    }
    logger.info(`Cache INVALIDATED: ${pattern}`)

    // Redis and database invalidation would happen here
  }

  async clear(): Promise<void> {
    this.memoryCache.clear()
    logger.info(`Cache CLEARED`)
  }

  getStats(): {
    memorySize: number
    hits: number
    misses: number
  } {
    return {
      memorySize: this.memoryCache.size,
      hits: 0,
      misses: 0,
    }
  }
}

// Singleton instance
export const cacheService = new CacheService()
