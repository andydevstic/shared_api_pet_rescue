import { ILogger, ILruCache, IRegistry } from '@src.shared/shared/interfaces';
export declare class LruCacheRegistry implements IRegistry<[string, any], ILruCache> {
    protected logger: ILogger;
    protected cacheInstanceRegistry: Map<string, ILruCache>;
    constructor(logger: ILogger);
    getInstance(moduleIdentifier: string, options?: any): ILruCache;
}
