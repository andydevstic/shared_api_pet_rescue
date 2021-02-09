import { RedisWriteGateway } from "@src.shared/shared/interfaces";
import { injectable } from "inversify";
import { promisify } from 'util';
import { BaseRedisGateway } from "./base-redis-gateway";

@injectable()
export abstract class BaseRedisWriteGateway extends BaseRedisGateway implements RedisWriteGateway {
  set(key: string, data: string, ttl?: number): Promise<void> {
    const promisified = promisify(this.client.set).bind(this.client);

    return promisified(key, data, 'EX', ttl);
  }

  setHash(hashKey: string, field: string, value: string): Promise<void> {
    const promisified = promisify(this.client.hset).bind(this.client);

    return promisified(hashKey, field, value);
  }
}