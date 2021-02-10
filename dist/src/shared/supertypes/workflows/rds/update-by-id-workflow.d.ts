import { HasId, IWorkerEventService, IRdsUpdateByIdWorkflow } from '@src.shared/shared/interfaces';
import { Transaction } from 'sequelize';
import { BaseRdsWorkflow } from './base-rds-workflow';
export declare abstract class RdsUpdateByIdWorkflow<Entity extends HasId> extends BaseRdsWorkflow<Entity> implements IRdsUpdateByIdWorkflow<Entity> {
    protected workerEventService: IWorkerEventService;
    protected idField: string;
    constructor(workerEventService: IWorkerEventService);
    execute(id: string, data: any, transaction?: Transaction): Promise<Entity>;
}
