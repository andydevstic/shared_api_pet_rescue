"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_redis_write_gateway_1 = require("../base/base-redis-write-gateway");
class AuthTokenWriteRedisGateway extends base_redis_write_gateway_1.BaseRedisWriteGateway {
    constructor() {
        super(...arguments);
        this.gatewayPrefix = 'auth_token';
    }
}
exports.AuthTokenWriteRedisGateway = AuthTokenWriteRedisGateway;
