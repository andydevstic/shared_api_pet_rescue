import { RedisGateway } from '@src.shared/shared/interfaces';
import { RedisClient } from 'redis';
export declare abstract class BaseRedisGateway implements RedisGateway {
    protected client: RedisClient;
    protected abstract gatewayPrefix: string;
    constructor(client: RedisClient);
    getKey(key: string): string;
}
