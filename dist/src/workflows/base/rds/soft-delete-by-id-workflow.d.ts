import { Transaction } from 'sequelize';
import { IRdsSoftDeleteByIdWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';
export declare abstract class RdsSoftDeleteByIdWorkflow implements IRdsSoftDeleteByIdWorkflow {
    protected tableGateWayRegistry: ITableDataGatewayRegistry;
    protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
    protected abstract tableGatewayName: TableDataGatewayNames;
    protected idField: string;
    constructor(tableGateWayRegistry: ITableDataGatewayRegistry);
    execute(id: any, transaction?: Transaction): Promise<void>;
}
