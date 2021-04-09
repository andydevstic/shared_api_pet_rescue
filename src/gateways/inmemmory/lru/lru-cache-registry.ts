import { injectNamed, provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { ILogger, ILruCache, IRegistry } from '@src.shared/shared/interfaces';
import { LruCache } from './lru-cache';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.REGISTRY, SHARED_PROVIDER_NAMES.LRU_CACHE)
export class LruCacheRegistry implements IRegistry<[string, any], ILruCache> {
  protected cacheInstanceRegistry = new Map<string, ILruCache>();

  constructor(
    @injectNamed(SHARED_PROVIDER_TYPES.LOGGER, SHARED_PROVIDER_NAMES.LOG4JS)
    protected logger: ILogger,
  ) {}

  public getInstance(moduleIdentifier: string, options?: any): ILruCache {
    if (this.cacheInstanceRegistry.has(moduleIdentifier)) {
      return this.cacheInstanceRegistry.get(moduleIdentifier);
    }

    const newCacheInstance = new LruCache(this.logger, options);
    this.cacheInstanceRegistry.set(moduleIdentifier, newCacheInstance);

    return newCacheInstance;
  }
}