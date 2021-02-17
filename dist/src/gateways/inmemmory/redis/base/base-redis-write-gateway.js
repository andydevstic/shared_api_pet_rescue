"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRedisWriteGateway = void 0;
const inversify_1 = require("inversify");
const util_1 = require("util");
const base_redis_gateway_1 = require("./base-redis-gateway");
let BaseRedisWriteGateway = class BaseRedisWriteGateway extends base_redis_gateway_1.BaseRedisGateway {
    set(key, data, ttl) {
        const promisified = util_1.promisify(this.client.set).bind(this.client);
        return promisified(this.getFormattedKey(key), data, 'EX', ttl);
    }
    unSet(key) {
        const promisified = util_1.promisify(this.client.del).bind(this.client);
        return promisified(this.getFormattedKey(key));
    }
    hmSet(key, objectData, ttlInSeconds) {
        const flattenedObjectData = [];
        for (let key in objectData) {
            let value = objectData[key];
            if (!value) {
                continue;
            }
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            flattenedObjectData.push(key, value);
        }
        return new Promise((resolve, reject) => {
            this.client.hmset(this.getFormattedKey(key), flattenedObjectData, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (ttlInSeconds && ttlInSeconds > 0) {
                    this.client.expire(this.getFormattedKey(key), ttlInSeconds, (expireError) => {
                        if (expireError) {
                            reject(expireError);
                            return;
                        }
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        });
    }
    setByEntityId(entityId, data, ttl) {
        return this.set(`id:${entityId}`, data, ttl);
    }
    setHash(hashKey, field, value) {
        const promisified = util_1.promisify(this.client.hset).bind(this.client);
        return promisified(this.getFormattedKey(hashKey), field, value);
    }
};
BaseRedisWriteGateway = __decorate([
    inversify_1.injectable()
], BaseRedisWriteGateway);
exports.BaseRedisWriteGateway = BaseRedisWriteGateway;
