"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingAPIDecorator = void 0;
const APIDecorator_1 = require("./APIDecorator");
/**
 * Decorator Pattern - Concrete Decorator
 * Adds caching functionality to API calls
 */
class CachingAPIDecorator extends APIDecorator_1.APIDecorator {
    constructor(component, cacheTTL = 60000) {
        super(component);
        this.cache = new Map();
        this.cacheTTL = cacheTTL;
    }
    getCacheKey(endpoint, method) {
        return `${method}:${endpoint}`;
    }
    isCacheValid(timestamp) {
        return Date.now() - timestamp < this.cacheTTL;
    }
    async call(endpoint, method, data) {
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
exports.CachingAPIDecorator = CachingAPIDecorator;
