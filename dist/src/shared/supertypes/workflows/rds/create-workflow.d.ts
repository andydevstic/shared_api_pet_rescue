import { Transaction } from 'sequelize';
import { HasId, Validator, IRdsCreateWorkflow } from '@src.shared/shared/interfaces';
import { BaseRdsWorkflow } from './base-rds-workflow';
export declare abstract class RdsCreateWorkflow<Entity extends HasId> extends BaseRdsWorkflow<Entity> implements IRdsCreateWorkflow<Entity> {
    protected workflowValidator: Validator;
    constructor(workflowValidator: Validator);
    execute(dto: any, transaction?: Transaction): Promise<Entity>;
    protected createNewEntity(dto: any, transaction?: Transaction): Promise<Entity>;
}
