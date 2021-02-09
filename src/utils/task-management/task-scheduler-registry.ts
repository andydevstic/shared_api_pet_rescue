import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SCHEDULED_TASKS, SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES, TASK_SCHEDULER_RULES } from '@src.shared/shared/constants';
import { ITaskSchedulerRegistry, ITaskSchedulerFactory, TaskScheduler } from '@src.shared/shared/interfaces';
import { inject, named } from 'inversify';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.REGISTRY, SHARED_PROVIDER_NAMES.SCHEDULED_TASK)
export class TaskSchedulerRegistry implements ITaskSchedulerRegistry {
  private _savedScheduledTasks = new Map();

  constructor(
    @inject(SHARED_PROVIDER_TYPES.FACTORY)
    @named(SHARED_PROVIDER_NAMES.TASK_SCHEDULER)
    private taskSchedulerFactory: ITaskSchedulerFactory,
  ) {}

  public getClass(taskName: SCHEDULED_TASKS, scheduleRule: TASK_SCHEDULER_RULES): TaskScheduler {
    const taskHashKey = this.getScheduleTaskHashKey(taskName, scheduleRule);
    const savedScheduledTask = this._savedScheduledTasks.get(taskHashKey);
    if (savedScheduledTask) {
      return savedScheduledTask;
    }

    const taskScheduler = this.taskSchedulerFactory.createInstance(scheduleRule);
    this._savedScheduledTasks.set(taskHashKey, taskScheduler);

    return taskScheduler;
  }

  protected isTaskExist(taskName: SCHEDULED_TASKS, scheduleRule: TASK_SCHEDULER_RULES): boolean {
    const taskHashKey = this.getScheduleTaskHashKey(taskName, scheduleRule);

    return !!this._savedScheduledTasks.get(taskHashKey);
  }

  protected getScheduleTaskHashKey(taskName: SCHEDULED_TASKS, scheduleRule: TASK_SCHEDULER_RULES): string {
    return `${taskName}_${scheduleRule}`;
  }
}
