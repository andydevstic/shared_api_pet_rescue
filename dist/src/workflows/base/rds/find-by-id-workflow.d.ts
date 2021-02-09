import { ICriteria, IParser, IRdsFindByIdWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { TableDataGatewayNames } from '@src.shared/shared/constants';
import { FindOptions } from 'sequelize';
export declare abstract class RdsFindByIdWorkflow<Entity> implements IRdsFindByIdWorkflow<Entity> {
    protected sequelizeOptionParser: IParser<FindOptions>;
    protected tableGateWayRegistry: ITableDataGatewayRegistry;
    protected idFieldName: string;
    protected abstract tableGatewayName: TableDataGatewayNames;
    constructor(sequelizeOptionParser: IParser<FindOptions>, tableGateWayRegistry: ITableDataGatewayRegistry);
    execute(id: string | number, criteria?: ICriteria): Promise<Entity>;
    private addFilterById;
    protected parseSequelizeOptions(rawOptions: any): FindOptions;
}
