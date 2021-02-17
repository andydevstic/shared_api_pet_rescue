import { Configuration, ILruCache } from '@src.shared/shared/interfaces';
import { injectable } from 'inversify';
import * as LruCache from 'lru-cache';

@injectable()
export abstract class BaseLruCache implements ILruCache {
  protected cacheInstance: LruCache<any, any>;

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
