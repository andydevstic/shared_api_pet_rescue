import { injectable } from 'inversify';
import { FindOptions } from 'sequelize';

import { ICriteria, IParser, IRdsFindWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { GatewayTypes, TableDataGatewayNames } from '@src.shared/shared/constants';

@injectable()
export abstract class RdsFindWorkflow<Entity> implements IRdsFindWorkflow<Entity> {
  protected abstract tableGatewayName: TableDataGatewayNames;

  constructor(
    protected sequelizeOptionParser: IParser<FindOptions>,
    protected tableGateWayRegistry: ITableDataGatewayRegistry,
  ) {  }

  public async execute(criteria: ICriteria = {}): Promise<Entity[]> {
    const { transaction, ...findCriteria } = criteria;

    const parsedCriteria = this.parseSequelizeOptions(findCriteria);
    const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, GatewayTypes.READ);
    const entities = await tableDataGateway.findAll({
      ...parsedCriteria,
      transaction,
      raw: true,
    });

    return entities;
  }

  protected parseSequelizeOptions(rawOptions: any): FindOptions {
    return this.sequelizeOptionParser.parse(rawOptions);
  }
}
