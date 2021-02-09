import { RedisGateway } from '@src.shared/shared/interfaces';
import { RedisClient } from 'redis';

export abstract class BaseRedisGateway implements RedisGateway {
  protected abstract gatewayPrefix: string;

  constructor(
    protected client: RedisClient
  ) {}

  getKey(key: string): string {
    return `${this.gatewayPrefix}:${key}`;
  }
}