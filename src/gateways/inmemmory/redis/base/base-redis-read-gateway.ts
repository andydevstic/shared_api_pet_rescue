import { RedisReadGateway } from "@src.shared/shared/interfaces";
import { promisify } from 'util';
import { BaseRedisGateway } from "./base-redis-gateway";
export abstract class BaseRedisReadGateway extends BaseRedisGateway implements RedisReadGateway {
  get(key: string): Promise<string> {
    const promisified = promisify(this.client.get).bind(this.client);

    return promisified(this.getFormattedKey(key));
  }

  getByEntityId(entityId: string | number): Promise<any> {
    return this.get(`id:${entityId}`);
  }

  hGetAll(key: string): Promise<any> {
    const promisified = promisify(this.client.hgetall).bind(this.client);

    return promisified(this.getFormattedKey(key));
  }

  getHash(hashKey: string, field: string): Promise<string> {
    const promisified = promisify(this.client.hget).bind(this.client);

    return promisified(this.getFormattedKey(hashKey), field);
  }
}
