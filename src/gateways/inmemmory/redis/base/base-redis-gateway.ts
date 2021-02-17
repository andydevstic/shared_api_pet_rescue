import { RedisClient } from 'redis';

export abstract class BaseRedisGateway {
  public platformPrefix: string;
  protected abstract gatewayPrefix: string;

  constructor(
    protected client: RedisClient,
  ) {}

  protected getFormattedKey(key: string): string {
    if (this.platformPrefix) {
      return `${this.platformPrefix}:${this.gatewayPrefix}:${key}`;
    }

    return `${this.gatewayPrefix}:${key}`;
  }
}