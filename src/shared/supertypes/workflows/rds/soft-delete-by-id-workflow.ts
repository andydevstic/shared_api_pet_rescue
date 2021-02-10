import { injectable } from 'inversify';
import { Transaction } from 'sequelize';

import { IRdsSoftDeleteByIdWorkflow } from '@src.shared/shared/interfaces';
import { BaseRdsWorkflow } from './base-rds-workflow';

@injectable()
export abstract class RdsSoftDeleteByIdWorkflow extends BaseRdsWorkflow implements IRdsSoftDeleteByIdWorkflow {
  protected idField = 'id';

  constructor() { super(); }

  public async execute(id: any, transaction?: Transaction): Promise<void> {
    return this.repository.update(
      { isDeleted: true },
      {
        transaction,
        where: {
          [this.idField]: id,
        },
      }
    );
  }
}
