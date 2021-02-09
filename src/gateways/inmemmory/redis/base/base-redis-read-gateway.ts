import { RedisReadGateway } from "@src.shared/shared/interfaces";
import { promisify } from 'util';
import { BaseRedisGateway } from "./base-redis-gateway";
export abstract class BaseRedisReadGateway extends BaseRedisGateway implements RedisReadGateway {
  get(key: string): Promise<string> {
    const promisified = promisify(this.client.get).bind(this.client);

    return promisified(key);
  }

  getHash(hashKey: string, field: string): Promise<string> {
    const promisified = promisify(this.client.hget).bind(this.client);

    return promisified(hashKey, field);
  }
}