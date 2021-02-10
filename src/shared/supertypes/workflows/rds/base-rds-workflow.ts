import { Repository } from 'sequelize-typescript';

export abstract class BaseRdsWorkflow<Entity = any> {
  protected entityRepository: Repository<Entity>;

  public setRepository(repository: any) {
    this.entityRepository = repository;

    return this;
  }

  protected get repository() {
    if (!this.repository) {
      throw new Error('Repository not set');
    }

    return this.entityRepository.bind(this.entityRepository);
  }
}
