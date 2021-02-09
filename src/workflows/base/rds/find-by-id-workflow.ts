import { injectable } from 'inversify';
import { ICriteria, IParser, IRdsFindByIdWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { BadRequestError } from '@src.shared/shared/errors';
import { FILTER_OPERATORS, GatewayTypes, TableDataGatewayNames } from '@src.shared/shared/constants';
import { FindOptions } from 'sequelize';

@injectable()
export abstract class RdsFindByIdWorkflow<Entity> implements IRdsFindByIdWorkflow<Entity> {
  protected idFieldName = 'id';
  protected abstract tableGatewayName: TableDataGatewayNames;

  constructor(
    protected sequelizeOptionParser: IParser<FindOptions>,
    protected tableGateWayRegistry: ITableDataGatewayRegistry,
  ) {  }

  public async execute(id: string | number, criteria: ICriteria = {}): Promise<Entity> {
    const { transaction, ...findCriteria } = criteria;

    this.addFilterById(id, findCriteria);

    const parsedCriteria = this.parseSequelizeOptions(findCriteria);
    const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, GatewayTypes.READ);

    const entity = await tableDataGateway.findOne({
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
