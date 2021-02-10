import { Transaction } from 'sequelize';
import { IWorkerEventService, IRdsDeleteByIdWorkflow } from '@src.shared/shared/interfaces';
import { WORKER_EVENT_ENTITY_NAMES } from '@src.shared/shared/constants';
import { BaseRdsWorkflow } from './base-rds-workflow';
export declare abstract class RdsDeleteByIdWorkflow extends BaseRdsWorkflow implements IRdsDeleteByIdWorkflow {
    protected workerEventService: IWorkerEventService;
    protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
    protected idField: string;
    constructor(workerEventService: IWorkerEventService);
    execute(id: string | number, transaction?: Transaction): Promise<void>;
}
