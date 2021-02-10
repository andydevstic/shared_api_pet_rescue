import { Transaction } from 'sequelize';
import { IRdsSoftDeleteByIdWorkflow } from '@src.shared/shared/interfaces';
import { BaseRdsWorkflow } from './base-rds-workflow';
export declare abstract class RdsSoftDeleteByIdWorkflow extends BaseRdsWorkflow implements IRdsSoftDeleteByIdWorkflow {
    protected idField: string;
    constructor();
    execute(id: any, transaction?: Transaction): Promise<void>;
}
