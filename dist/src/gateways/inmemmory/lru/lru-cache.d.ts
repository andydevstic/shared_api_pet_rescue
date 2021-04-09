import { ILogger, ILruCache } from "@src.shared/shared/interfaces";
export declare class LruCache implements ILruCache {
    protected logger: ILogger;
    protected cacheInstance: any;
    constructor(logger: ILogger, config?: any);
    set(key: string, value: string, maxAgeInMilliSecs?: number): void;
    get(key: string): string;
    reset(): void;
    has(key: string): boolean;
}
