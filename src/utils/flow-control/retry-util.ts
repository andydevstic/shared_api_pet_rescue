import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { IRetryUtil, TaskRetryConfig } from '@src.shared/shared/interfaces';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.RETRY)
export class RetryUtil implements IRetryUtil {
  protected taskRegistry = new Map();

  public async retryIfFail<T>(task: any, config: TaskRetryConfig = {}): Promise<T> {
    const totalRetryCount = config.retryTimes || 3;

    for (let retriedCount = 0; retriedCount < totalRetryCount; retriedCount += 1) {
      try {
        return task();
      } catch (error) {
        if (retriedCount !== totalRetryCount) {
          await this.sleep(config.interval);
        }

        throw error;
      }
    }
  }

  public async retryConstantly<T>(task: any, interval: number = 0): Promise<T> {
    let taskReturnValue: T;
    while (!taskReturnValue) {
      try {
        taskReturnValue = await task();

        return taskReturnValue;
      } catch (error) {
        await this.sleep(interval);
      }
    }
  }

  protected sleep(timeInMilliseconds: number = 0): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeInMilliseconds);
    });
  }
}
