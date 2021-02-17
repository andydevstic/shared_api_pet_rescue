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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLruCache = void 0;
const inversify_1 = require("inversify");
const LruCache = require("lru-cache");
let BaseLruCache = class BaseLruCache {
    constructor(appConfig) {
        const cacheConfig = appConfig.get('cache.lru');
        this.cacheInstance = new LruCache(cacheConfig);
    }
    set(key, value, maxAgeInMilliSecs) {
        this.cacheInstance.set(key, value, maxAgeInMilliSecs);
    }
    get(key) {
        return this.cacheInstance.get(key);
    }
    reset() {
        this.cacheInstance.reset();
    }
    has(key) {
        return this.cacheInstance.has(key);
    }
};
BaseLruCache = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object])
], BaseLruCache);
exports.BaseLruCache = BaseLruCache;
