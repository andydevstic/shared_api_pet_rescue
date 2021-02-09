import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES, TASK_SCHEDULER_RULES } from '@src.shared/shared/constants';
import { ITaskSchedulerFactory, TaskScheduler } from '@src.shared/shared/interfaces';
import { BottleneckTaskScheduler } from './schedulers';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.FACTORY, SHARED_PROVIDER_NAMES.TASK_SCHEDULER)
export class TaskSchedulerFactory implements ITaskSchedulerFactory {
  public createInstance(schedulerRule: TASK_SCHEDULER_RULES): TaskScheduler {
    switch (schedulerRule) {
      case TASK_SCHEDULER_RULES.MIN_3_MAX_5:
        return new BottleneckTaskScheduler({
          tasksPerSecond: 3,
          maxConcurrent: 5,
        });
      case TASK_SCHEDULER_RULES.MIN_5_MAX_10:
        return new BottleneckTaskScheduler({
          tasksPerSecond: 5,
          maxConcurrent: 10,
        });
      default:
        throw new Error(`Task scheduler rule ${schedulerRule} not found.`);
    }
  }
}
