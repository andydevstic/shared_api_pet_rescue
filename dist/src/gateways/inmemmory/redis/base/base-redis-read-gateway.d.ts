import { RedisReadGateway } from "@src.shared/shared/interfaces";
import { BaseRedisGateway } from "./base-redis-gateway";
export declare abstract class BaseRedisReadGateway extends BaseRedisGateway implements RedisReadGateway {
    get(key: string): Promise<string>;
    getByEntityId(entityId: string | number): Promise<any>;
    hGetAll(key: string): Promise<any>;
    getHash(hashKey: string, field: string): Promise<string>;
}
