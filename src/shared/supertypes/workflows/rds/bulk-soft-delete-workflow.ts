import { injectable } from 'inversify';
import { Validator, IRdsBulkSoftDeleteWorkflow } from '@src.shared/shared/interfaces';
import { Transaction } from 'sequelize';
import { BaseRdsWorkflow } from './base-rds-workflow';

@injectable()
export abstract class RdsBulkSoftDeleteWorkflow extends BaseRdsWorkflow implements IRdsBulkSoftDeleteWorkflow {
  protected idField = 'id';

  constructor(
    protected workflowValidator: Validator,
  ) { super(); }

  public async execute(identifierIds: any[], transaction?: Transaction): Promise<void> {
    return this.repository.update(
      { isDeleted: true },
      {
        transaction,
        where: {
          [this.idField]: {
            $in: identifierIds,
          },
        },
      }
    );
  }
}
