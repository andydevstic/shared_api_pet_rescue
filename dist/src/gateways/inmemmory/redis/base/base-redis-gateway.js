"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRedisGateway = void 0;
class BaseRedisGateway {
    constructor(client) {
        this.client = client;
    }
    getKey(key) {
        return `${this.gatewayPrefix}:${key}`;
    }
}
exports.BaseRedisGateway = BaseRedisGateway;
