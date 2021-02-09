import { TASK_SCHEDULER_RULES } from '@src.shared/shared/constants';
import { ITaskSchedulerFactory, TaskScheduler } from '@src.shared/shared/interfaces';
export declare class TaskSchedulerFactory implements ITaskSchedulerFactory {
    createInstance(schedulerRule: TASK_SCHEDULER_RULES): TaskScheduler;
}
