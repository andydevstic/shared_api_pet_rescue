"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LruCacheRegistry = void 0;
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
const lru_cache_1 = require("./lru-cache");
let LruCacheRegistry = class LruCacheRegistry {
    constructor(logger) {
        this.logger = logger;
        this.cacheInstanceRegistry = new Map();
    }
    getInstance(moduleIdentifier, options) {
        if (this.cacheInstanceRegistry.has(moduleIdentifier)) {
            return this.cacheInstanceRegistry.get(moduleIdentifier);
        }
        const newCacheInstance = new lru_cache_1.LruCache(this.logger, options);
        this.cacheInstanceRegistry.set(moduleIdentifier, newCacheInstance);
        return newCacheInstance;
    }
};
LruCacheRegistry = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.REGISTRY, constants_1.SHARED_PROVIDER_NAMES.LRU_CACHE),
    __param(0, decorators_1.injectNamed(constants_1.SHARED_PROVIDER_TYPES.LOGGER, constants_1.SHARED_PROVIDER_NAMES.LOG4JS)),
    __metadata("design:paramtypes", [Object])
], LruCacheRegistry);
exports.LruCacheRegistry = LruCacheRegistry;
