import { TaskFunction, TaskScheduler, TaskSchedulerConfig } from '@src.shared/shared/interfaces';
import Bottleneck from 'bottleneck';
export declare class BottleneckTaskScheduler implements TaskScheduler {
    private config;
    protected taskScheduler: Bottleneck;
    constructor(config: TaskSchedulerConfig);
    run<T>(taskFn: TaskFunction): Promise<T>;
}
