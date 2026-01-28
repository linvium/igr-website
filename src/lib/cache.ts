/**
 * Simple in-memory cache for repository data
 * This can be replaced with Redis or other caching solutions in production
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class CacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes in milliseconds

  /**
   * Get data from cache
   * @param key Cache key
   * @returns Cached data or null if not found or expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    // Check if cache entry has expired
    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  /**
   * Set data in cache
   * @param key Cache key
   * @param data Data to cache
   * @param ttl Time to live in milliseconds (optional, defaults to 5 minutes)
   */
  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    })
  }

  /**
   * Clear specific cache entry
   * @param key Cache key
   */
  clear(key: string): void {
    this.cache.delete(key)
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    this.cache.clear()
  }

  /**
   * Clear all cache entries matching a pattern
   * @param pattern String pattern to match (simple includes check)
   */
  clearPattern(pattern: string): void {
    const keys = Array.from(this.cache.keys())
    keys.forEach((key) => {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    })
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }
}

// Export singleton instance
export const cache = new CacheManager()

/**
 * Helper function to wrap async functions with caching
 * @param key Cache key
 * @param fn Async function to execute
 * @param ttl Time to live in milliseconds (optional)
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Try to get from cache first
  const cached = cache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  // Execute function and cache result
  const result = await fn()
  cache.set(key, result, ttl)
  return result
}
