"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRedisReadGateway = void 0;
const util_1 = require("util");
const base_redis_gateway_1 = require("./base-redis-gateway");
class BaseRedisReadGateway extends base_redis_gateway_1.BaseRedisGateway {
    get(key) {
        const promisified = util_1.promisify(this.client.get).bind(this.client);
        return promisified(key);
    }
    getHash(hashKey, field) {
        const promisified = util_1.promisify(this.client.hget).bind(this.client);
        return promisified(hashKey, field);
    }
}
exports.BaseRedisReadGateway = BaseRedisReadGateway;
