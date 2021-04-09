"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LruCache = void 0;
const LruCacheLib = require("lru-cache");
class LruCache {
    constructor(logger, config) {
        this.logger = logger;
        this.cacheInstance = new LruCacheLib(config);
    }
    set(key, value, maxAgeInMilliSecs) {
        this.logger.debug(`Cached data using LRU cache for key:`, key);
        this.cacheInstance.set(key, value, maxAgeInMilliSecs);
    }
    get(key) {
        this.logger.debug(`Served data using LRU cache for key:`, key);
        return this.cacheInstance.get(key);
    }
    reset() {
        this.cacheInstance.reset();
    }
    has(key) {
        return this.cacheInstance.has(key);
    }
}
exports.LruCache = LruCache;
