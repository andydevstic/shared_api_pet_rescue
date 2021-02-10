import { Repository } from 'sequelize-typescript';
export declare abstract class BaseRdsWorkflow<Entity = any> {
    protected entityRepository: Repository<Entity>;
    setRepository(repository: any): this;
    protected get repository(): any;
}
