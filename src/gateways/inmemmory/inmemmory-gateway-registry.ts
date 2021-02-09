import { inject, named } from 'inversify';
import { RedisClient } from 'redis';

import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { GatewayTypes, InMemmoryGatewayNames, SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { InternalServerError } from '@src.shared/shared/errors';
import { ConnectionAdapter, IInmemmoryGatewayRegistry, RedisReadGateway, RedisWriteGateway } from '@src.shared/shared/interfaces';
import {
  AuthTokenReadRedisGateway,
  AuthTokenWriteRedisGateway,
} from './redis';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.REGISTRY, SHARED_PROVIDER_NAMES.INMEMMORY_GATEWAY)
export class InMemmoryGatewayRegistry implements IInmemmoryGatewayRegistry {
  private authTokenReadConn: RedisReadGateway;
  private authTokenWriteConn: RedisWriteGateway;

  constructor(
    @inject(SHARED_PROVIDER_TYPES.ADAPTER)
    @named(SHARED_PROVIDER_NAMES.REDIS_READ)
    redisReadAdapter: ConnectionAdapter<RedisClient>,

    @inject(SHARED_PROVIDER_TYPES.ADAPTER)
    @named(SHARED_PROVIDER_NAMES.REDIS_WRITE)
    redisWriteAdapter: ConnectionAdapter<RedisClient>,
  ) {
    const redisReadConn = redisReadAdapter.getConnection();
    const redisWriteConn = redisWriteAdapter.getConnection();

    this.initReadConnections(redisReadConn);
    this.initWriteConnections(redisWriteConn);
  }

  public getClass(identifier: InMemmoryGatewayNames, type: GatewayTypes) {
    switch (identifier) {
      case InMemmoryGatewayNames.AUTH_TOKEN:
        return type === GatewayTypes.WRITE
          ? this.authTokenWriteConn
          : this.authTokenReadConn;
      default:
        throw new InternalServerError('Inmemmory gateway not found');
    }
  }

  private initReadConnections(redisReadConn: RedisClient): void {
    this.authTokenReadConn = new AuthTokenReadRedisGateway(redisReadConn);
  }

  private initWriteConnections(redisWriteConn: RedisClient): void {
    this.authTokenWriteConn = new AuthTokenWriteRedisGateway(redisWriteConn);
  }
}
