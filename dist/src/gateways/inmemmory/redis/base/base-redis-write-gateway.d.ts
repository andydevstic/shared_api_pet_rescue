import { RedisWriteGateway } from "@src.shared/shared/interfaces";
import { BaseRedisGateway } from "./base-redis-gateway";
export declare abstract class BaseRedisWriteGateway extends BaseRedisGateway implements RedisWriteGateway {
    set(key: string, data: string, ttl?: number): Promise<void>;
    unSet(key: string): Promise<void>;
    hmSet(key: string, objectData: object, ttlInSeconds?: number): Promise<void>;
    setByEntityId(entityId: string | number, data: string, ttl?: number): Promise<void>;
    setHash(hashKey: string, field: string, value: string): Promise<void>;
}
