import { SCHEDULED_TASKS, TASK_SCHEDULER_RULES } from '@src.shared/shared/constants';
import { ITaskSchedulerRegistry, ITaskSchedulerFactory, TaskScheduler } from '@src.shared/shared/interfaces';
export declare class TaskSchedulerRegistry implements ITaskSchedulerRegistry {
    private taskSchedulerFactory;
    private _savedScheduledTasks;
    constructor(taskSchedulerFactory: ITaskSchedulerFactory);
    getClass(taskName: SCHEDULED_TASKS, scheduleRule: TASK_SCHEDULER_RULES): TaskScheduler;
    protected isTaskExist(taskName: SCHEDULED_TASKS, scheduleRule: TASK_SCHEDULER_RULES): boolean;
    protected getScheduleTaskHashKey(taskName: SCHEDULED_TASKS, scheduleRule: TASK_SCHEDULER_RULES): string;
}
