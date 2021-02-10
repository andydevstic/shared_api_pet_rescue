import { Validator, HasId, IRdsBulkCreateWorkflow } from '@src.shared/shared/interfaces';
import { Transaction } from 'sequelize';
import { BaseRdsWorkflow } from './base-rds-workflow';
export declare abstract class RdsBulkCreateWorkflow<Entity extends HasId> extends BaseRdsWorkflow<Entity> implements IRdsBulkCreateWorkflow<Entity> {
    protected workflowValidator: Validator;
    constructor(workflowValidator: Validator);
    execute(data: any[], transaction?: Transaction): Promise<Entity[]>;
}
