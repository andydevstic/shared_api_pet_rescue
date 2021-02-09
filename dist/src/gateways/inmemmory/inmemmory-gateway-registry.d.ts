import { RedisClient } from 'redis';
import { GatewayTypes, InMemmoryGatewayNames } from '@src.shared/shared/constants';
import { ConnectionAdapter, IInmemmoryGatewayRegistry, RedisReadGateway, RedisWriteGateway } from '@src.shared/shared/interfaces';
export declare class InMemmoryGatewayRegistry implements IInmemmoryGatewayRegistry {
    private authTokenReadConn;
    private authTokenWriteConn;
    constructor(redisReadAdapter: ConnectionAdapter<RedisClient>, redisWriteAdapter: ConnectionAdapter<RedisClient>);
    getClass(identifier: InMemmoryGatewayNames, type: GatewayTypes): RedisReadGateway | RedisWriteGateway;
    private initReadConnections;
    private initWriteConnections;
}
