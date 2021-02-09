import { BaseRedisReadGateway } from '../base/base-redis-read-gateway';

export class AuthTokenReadRedisGateway extends BaseRedisReadGateway {
  protected gatewayPrefix = 'auth_token';
}