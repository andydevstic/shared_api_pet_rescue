import { ILruCache } from '@src.shared/shared/interfaces';
import * as LruCache from 'lru-cache';
export declare class LruCacheDecorator implements ILruCache {
    protected cacheInstance: LruCache<string, string>;
    constructor(config: any);
    set(key: string, value: string, maxAgeInMilliSecs?: number): void;
    get(key: string): string;
    reset(): void;
    has(key: string): boolean;
}
