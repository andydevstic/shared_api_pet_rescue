import { RedisWriteGateway } from "@src.shared/shared/interfaces";
import { injectable } from "inversify";
import { promisify } from 'util';
import { BaseRedisGateway } from "./base-redis-gateway";

@injectable()
export abstract class BaseRedisWriteGateway extends BaseRedisGateway implements RedisWriteGateway {
  set(key: string, data: string, ttl?: number): Promise<void> {
    const promisified = promisify(this.client.set).bind(this.client);

    return promisified(this.getFormattedKey(key), data, 'EX', ttl);
  }

  unSet(key: string): Promise<void> {
    const promisified = promisify(this.client.del).bind(this.client);
    
    return promisified(this.getFormattedKey(key));
  }

  hmSet(key: string, objectData: object, ttlInSeconds?: number): Promise<void> {
    const flattenedObjectData = [];

    for (let key in objectData) {
      let value = objectData[key];
      
      if (!value) { continue; }
      if (typeof value === 'object') { value = JSON.stringify(value); }

      flattenedObjectData.push(key, value);
    }

    return new Promise((resolve, reject) => {
      this.client.hmset(this.getFormattedKey(key), flattenedObjectData, (error) => {
        if (error) {
          reject(error);

          return;
        }

        if (ttlInSeconds && ttlInSeconds > 0) {
          this.client.expire(this.getFormattedKey(key), ttlInSeconds, (expireError) => {
            if (expireError) {
              reject(expireError);

              return;
            }

            resolve();
          })
        } else {
          resolve();
        }
      });
    })
  }

  setByEntityId(entityId: string | number, data: string, ttl?: number) {
    return this.set(`id:${entityId}`, data, ttl);
  }

  setHash(hashKey: string, field: string, value: string): Promise<void> {
    const promisified = promisify(this.client.hset).bind(this.client);

    return promisified(this.getFormattedKey(hashKey), field, value);
  }
}