import { FindOptions } from 'sequelize';
import { ICriteria, IParser, IRdsFindWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { TableDataGatewayNames } from '@src.shared/shared/constants';
export declare abstract class RdsFindWorkflow<Entity> implements IRdsFindWorkflow<Entity> {
    protected sequelizeOptionParser: IParser<FindOptions>;
    protected tableGateWayRegistry: ITableDataGatewayRegistry;
    protected abstract tableGatewayName: TableDataGatewayNames;
    constructor(sequelizeOptionParser: IParser<FindOptions>, tableGateWayRegistry: ITableDataGatewayRegistry);
    execute(criteria?: ICriteria): Promise<Entity[]>;
    protected parseSequelizeOptions(rawOptions: any): FindOptions;
}
