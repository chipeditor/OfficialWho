/**
 * Image Provider Abstraction Layer
 * Implements circuit breaker pattern and provider failover
 */

import {
  IImageProvider,
  ProviderHealth,
  ImageGenerationOptions,
  RemoveBackgroundOptions,
} from '@/types'
import { logger } from '@/utils/logger'

export abstract class BaseImageProvider implements IImageProvider {
  abstract name: string
  health: ProviderHealth

  constructor() {
    this.health = {
      status: 'healthy',
      lastCheckedAt: new Date(),
      errorRate: 0,
      avgResponseTime: 0,
    }
  }

  abstract generateImage(
    prompt: string,
    options?: ImageGenerationOptions
  ): Promise<{
    imageUrl: string
    metadata: { width: number; height: number; format: string }
  }>

  abstract removeBackground(
    imageUrl: string,
    options?: RemoveBackgroundOptions
  ): Promise<{
    imageUrl: string
    confidence: number
  }>

  abstract upscale(
    imageUrl: string,
    targetWidth: number,
    targetHeight: number
  ): Promise<{
    imageUrl: string
    actualWidth: number
    actualHeight: number
  }>

  protected updateHealth(
    success: boolean,
    responseTime: number
  ): void {
    const alpha = 0.2
    this.health.avgResponseTime =
      this.health.avgResponseTime * (1 - alpha) + responseTime * alpha
    this.health.errorRate = success
      ? this.health.errorRate * 0.95
      : Math.min(this.health.errorRate + 0.05, 1.0)
    this.health.lastCheckedAt = new Date()
    if (success) {
      this.health.lastSuccessAt = new Date()
    }

    if (this.health.errorRate > 0.5) {
      this.health.status = 'degraded'
    } else if (this.health.errorRate > 0.9) {
      this.health.status = 'down'
    } else {
      this.health.status = 'healthy'
    }

    logger.debug(`Provider ${this.name} health updated:`, this.health)
  }
}

/**
 * Provider manager with circuit breaker and failover
 */
export class ImageProviderManager {
  private providers: Map<string, IImageProvider> = new Map()
  private circuitBreakers: Map<string, CircuitBreaker> = new Map()
  private fallbackChain: string[]

  constructor(fallbackChain: string[]) {
    this.fallbackChain = fallbackChain
  }

  registerProvider(provider: IImageProvider): void {
    this.providers.set(provider.name, provider)
    this.circuitBreakers.set(provider.name, new CircuitBreaker(provider.name))
    logger.info(`Registered image provider: ${provider.name}`)
  }

  async generateImage(
    prompt: string,
    options?: ImageGenerationOptions
  ): Promise<{
    imageUrl: string
    metadata: { width: number; height: number; format: string }
  }> {
    return this.executeWithFallback(
      async (provider) => provider.generateImage(prompt, options),
      'generateImage'
    )
  }

  async removeBackground(
    imageUrl: string,
    options?: RemoveBackgroundOptions
  ): Promise<{
    imageUrl: string
    confidence: number
  }> {
    return this.executeWithFallback(
      async (provider) => provider.removeBackground(imageUrl, options),
      'removeBackground'
    )
  }

  async upscale(
    imageUrl: string,
    targetWidth: number,
    targetHeight: number
  ): Promise<{
    imageUrl: string
    actualWidth: number
    actualHeight: number
  }> {
    return this.executeWithFallback(
      async (provider) =>
        provider.upscale(imageUrl, targetWidth, targetHeight),
      'upscale'
    )
  }

  private async executeWithFallback<T>(
    operation: (provider: IImageProvider) => Promise<T>,
    operationName: string
  ): Promise<T> {
    const errors: Array<{ provider: string; error: Error }> = []

    for (const providerName of this.fallbackChain) {
      const provider = this.providers.get(providerName)
      if (!provider) {
        logger.warn(`Provider not found: ${providerName}`)
        continue
      }

      const cb = this.circuitBreakers.get(providerName)!
      if (cb.isOpen()) {
        logger.warn(`Circuit breaker open for ${providerName}`)
        continue
      }

      try {
        const startTime = Date.now()
        const result = await operation(provider)
        const responseTime = Date.now() - startTime
        cb.recordSuccess()
        provider.health.lastSuccessAt = new Date()
        logger.info(
          `${operationName} succeeded with ${providerName} (${responseTime}ms)`
        )
        return result
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error))
        errors.push({ provider: providerName, error: err })
        cb.recordFailure()
        logger.error(
          `${operationName} failed with ${providerName}: ${err.message}`
        )
      }
    }

    const errorDetails = errors
      .map((e) => `${e.provider}: ${e.error.message}`)
      .join('; ')
    throw new Error(
      `${operationName} failed across all providers: ${errorDetails}`
    )
  }
}

/**
 * Circuit breaker pattern implementation
 */
class CircuitBreaker {
  private state: 'closed' | 'open' | 'half_open' = 'closed'
  private failureCount = 0
  private successCount = 0
  private lastFailureTime?: number
  private readonly failureThreshold = 5
  private readonly successThreshold = 2
  private readonly timeoutMs = 60000

  constructor(private providerName: string) {}

  isOpen(): boolean {
    if (this.state === 'open') {
      const timeSinceLastFailure = Date.now() - (this.lastFailureTime || 0)
      if (timeSinceLastFailure > this.timeoutMs) {
        logger.info(
          `Circuit breaker ${this.providerName} transitioning to HALF_OPEN`
        )
        this.state = 'half_open'
        this.successCount = 0
        return false
      }
      return true
    }
    return false
  }

  recordSuccess(): void {
    this.failureCount = 0
    if (this.state === 'half_open') {
      this.successCount++
      if (this.successCount >= this.successThreshold) {
        logger.info(
          `Circuit breaker ${this.providerName} transitioning to CLOSED`
        )
        this.state = 'closed'
      }
    }
  }

  recordFailure(): void {
    this.lastFailureTime = Date.now()
    this.failureCount++
    if (this.failureCount >= this.failureThreshold) {
      logger.warn(
        `Circuit breaker ${this.providerName} transitioning to OPEN`
      )
      this.state = 'open'
    }
  }
}
