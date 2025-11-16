import { APIDecorator } from './APIDecorator';

/**
 * Decorator Pattern - Concrete Decorator
 * Adds caching functionality to API calls
 */
export class CachingAPIDecorator extends APIDecorator {
  private cache: Map<string, { data: any; timestamp: number }>;
  private cacheTTL: number; // Time to live in milliseconds

  constructor(component: import('./APIDecorator').APIDecorator, cacheTTL: number = 60000) {
    super(component);
    this.cache = new Map();
    this.cacheTTL = cacheTTL;
  }

  private getCacheKey(endpoint: string, method: string): string {
    return `${method}:${endpoint}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheTTL;
  }

  async call(endpoint: string, method: string, data?: any): Promise<any> {
    // Only cache GET requests
    if (method === 'GET') {
      const cacheKey = this.getCacheKey(endpoint, method);
      const cached = this.cache.get(cacheKey);

      if (cached && this.isCacheValid(cached.timestamp)) {
        console.log(`[CACHE] Cache HIT for ${endpoint}`);
        return Promise.resolve({
          ...cached.data,
          cached: true,
          cacheTimestamp: cached.timestamp
        });
      }

      console.log(`[CACHE] Cache MISS for ${endpoint}`);
      const result = await super.call(endpoint, method, data);
      
      // Store in cache
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      return result;
    }

    // For non-GET requests, clear cache and proceed
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      console.log(`[CACHE] Clearing cache due to ${method} request`);
      this.cache.clear();
    }

    return super.call(endpoint, method, data);
  }
}

