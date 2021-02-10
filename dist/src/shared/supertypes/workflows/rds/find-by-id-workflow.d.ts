import { ICriteria, IParser, IRdsFindByIdWorkflow } from '@src.shared/shared/interfaces';
import { FindOptions } from 'sequelize';
import { BaseRdsWorkflow } from './base-rds-workflow';
export declare abstract class RdsFindByIdWorkflow<Entity> extends BaseRdsWorkflow<Entity> implements IRdsFindByIdWorkflow<Entity> {
    protected sequelizeOptionParser: IParser<FindOptions>;
    protected idFieldName: string;
    constructor(sequelizeOptionParser: IParser<FindOptions>);
    execute(id: string | number, criteria?: ICriteria): Promise<Entity>;
    private addFilterById;
    protected parseSequelizeOptions(rawOptions: any): FindOptions;
}
