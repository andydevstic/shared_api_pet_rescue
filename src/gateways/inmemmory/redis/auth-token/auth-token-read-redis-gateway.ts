import { BaseRedisWriteGateway } from '../base/base-redis-write-gateway';

export class AuthTokenWriteRedisGateway extends BaseRedisWriteGateway {
  protected gatewayPrefix = 'auth_token';
}
