import { RedisClient } from 'redis';
export declare abstract class BaseRedisGateway {
    protected client: RedisClient;
    platformPrefix: string;
    protected abstract gatewayPrefix: string;
    constructor(client: RedisClient);
    protected getFormattedKey(key: string): string;
}
