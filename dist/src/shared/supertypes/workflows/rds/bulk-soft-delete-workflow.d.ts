import { Validator, IRdsBulkSoftDeleteWorkflow } from '@src.shared/shared/interfaces';
import { Transaction } from 'sequelize';
import { BaseRdsWorkflow } from './base-rds-workflow';
export declare abstract class RdsBulkSoftDeleteWorkflow extends BaseRdsWorkflow implements IRdsBulkSoftDeleteWorkflow {
    protected workflowValidator: Validator;
    protected idField: string;
    constructor(workflowValidator: Validator);
    execute(identifierIds: any[], transaction?: Transaction): Promise<void>;
}
