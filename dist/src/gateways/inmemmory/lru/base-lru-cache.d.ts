import { Configuration, ILruCache } from '@src.shared/shared/interfaces';
import * as LruCache from 'lru-cache';
export declare abstract class BaseLruCache implements ILruCache {
    protected cacheInstance: LruCache<any, any>;
    constructor(appConfig: Configuration);
    set(key: string, value: string, maxAgeInMilliSecs?: number): void;
    get(key: string): string;
    reset(): void;
    has(key: string): boolean;
}
