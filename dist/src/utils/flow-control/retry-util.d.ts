import { IRetryUtil, TaskRetryConfig } from '@src.shared/shared/interfaces';
export declare class RetryUtil implements IRetryUtil {
    protected taskRegistry: Map<any, any>;
    retryIfFail<T>(task: any, config?: TaskRetryConfig): Promise<T>;
    retryConstantly<T>(task: any, interval?: number): Promise<T>;
    protected sleep(timeInMilliseconds?: number): Promise<void>;
}
