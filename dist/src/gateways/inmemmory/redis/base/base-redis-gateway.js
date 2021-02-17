"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRedisGateway = void 0;
class BaseRedisGateway {
    constructor(client) {
        this.client = client;
    }
    getFormattedKey(key) {
        if (this.platformPrefix) {
            return `${this.platformPrefix}:${this.gatewayPrefix}:${key}`;
        }
        return `${this.gatewayPrefix}:${key}`;
    }
}
exports.BaseRedisGateway = BaseRedisGateway;
