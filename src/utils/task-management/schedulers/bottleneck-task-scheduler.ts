import { TaskFunction, TaskScheduler, TaskSchedulerConfig } from '@src.shared/shared/interfaces';
// tslint:disable-next-line:import-name
import Bottleneck from 'bottleneck';

export class BottleneckTaskScheduler implements TaskScheduler {
  protected taskScheduler: Bottleneck;

  constructor(private config: TaskSchedulerConfig) {
    const { tasksPerSecond, maxConcurrent } = this.config;
    const bottleneck = new Bottleneck({
      maxConcurrent,
      minTime: 1000 / tasksPerSecond,
      clearDatastore: true,
    });

    this.taskScheduler = bottleneck;
  }

  public run<T>(taskFn: TaskFunction): Promise<T> {
    return this.taskScheduler.schedule(taskFn);
  }
}
