import { RedisReadGateway } from "@src.shared/shared/interfaces";
import { BaseRedisGateway } from "./base-redis-gateway";
export declare abstract class BaseRedisReadGateway extends BaseRedisGateway implements RedisReadGateway {
    get(key: string): Promise<string>;
    getHash(hashKey: string, field: string): Promise<string>;
}
