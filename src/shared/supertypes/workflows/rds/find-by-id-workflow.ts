import { injectable } from 'inversify';
import { ICriteria, IParser, IRdsFindByIdWorkflow } from '@src.shared/shared/interfaces';
import { BadRequestError } from '@src.shared/shared/errors';
import { FILTER_OPERATORS } from '@src.shared/shared/constants';
import { FindOptions } from 'sequelize';
import { BaseRdsWorkflow } from './base-rds-workflow';

@injectable()
export abstract class RdsFindByIdWorkflow<Entity> extends BaseRdsWorkflow<Entity> implements IRdsFindByIdWorkflow<Entity> {
  protected idFieldName = 'id';

  constructor(
    protected sequelizeOptionParser: IParser<FindOptions>,
  ) { super(); }

  public async execute(id: string | number, criteria: ICriteria = {}): Promise<Entity> {
    const { transaction, ...findCriteria } = criteria;

    this.addFilterById(id, findCriteria);

    const parsedCriteria = this.parseSequelizeOptions(findCriteria);
    const entity = await this.repository.findOne({
      ...parsedCriteria,
      transaction,
      raw: true,
    });

    if (!entity) {
      throw new BadRequestError('Resource not found');
    }

    return entity;
  }

  private addFilterById(entityId: string | number, userFindCriteria: ICriteria): ICriteria {
    const filters = userFindCriteria.filters || [];
    filters.push({
      code: this.idFieldName,
      operator: FILTER_OPERATORS.EQUALS,
      value: [entityId],
    });

    userFindCriteria.filters = filters;

    return userFindCriteria;
  }

  protected parseSequelizeOptions(rawOptions: any): FindOptions {
    return this.sequelizeOptionParser.parse(rawOptions);
  }
}
