import { Configuration, ILruCache } from '@src.shared/shared/interfaces';
import * as LruCache from 'lru-cache';
export declare class LruCacheDecorator implements ILruCache {
    protected cacheInstance: LruCache<string, string>;
    constructor(appConfig: Configuration);
    set(key: string, value: string, maxAgeInMilliSecs?: number): void;
    get(key: string): string;
    reset(): void;
    has(key: string): boolean;
}
