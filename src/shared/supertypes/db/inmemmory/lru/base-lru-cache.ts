import { constructorProvideNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { Configuration, ILruCache } from '@src.shared/shared/interfaces';
import * as LruCache from 'lru-cache';

@constructorProvideNamed(SHARED_PROVIDER_TYPES.CONSTRUCTOR, SHARED_PROVIDER_NAMES.LRU_CACHE_DECORATOR)
export class LruCacheDecorator implements ILruCache {
  protected cacheInstance: LruCache<string, string>;

  constructor(appConfig: Configuration) {
    const cacheConfig = appConfig.get('cache.lru');

    this.cacheInstance = new LruCache(cacheConfig);
  }

  public set(key: string, value: string, maxAgeInMilliSecs?: number): void {
    this.cacheInstance.set(key, value, maxAgeInMilliSecs);
  }

  public get(key: string): string {
    return this.cacheInstance.get(key);
  }

  public reset(): void {
    this.cacheInstance.reset();
  }

  public has(key: string): boolean {
    return this.cacheInstance.has(key);
  }
}