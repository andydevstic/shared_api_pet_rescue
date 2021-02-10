"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenReadRedisGateway = void 0;
const base_redis_read_gateway_1 = require("../base/base-redis-read-gateway");
class AuthTokenReadRedisGateway extends base_redis_read_gateway_1.BaseRedisReadGateway {
    constructor() {
        super(...arguments);
        this.gatewayPrefix = 'auth_token';
    }
}
exports.AuthTokenReadRedisGateway = AuthTokenReadRedisGateway;
