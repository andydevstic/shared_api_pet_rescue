import { genSalt, hash, compare } from 'bcrypt';

import { provideSingletonNamed } from "@src.shared/infra/ioc/decorators";
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from "@src.shared/shared/constants";
import { Configuration, HashUtil } from "@src.shared/shared/interfaces";
import { inject } from 'inversify';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.BCRYPT)
export class BcryptUtil implements HashUtil {
  protected saltRounds: number;

  constructor(
    @inject(SHARED_PROVIDER_TYPES.CONFIG)
    config: Configuration,
  ) {
    const bcryptConfig = config.get('bcrypt');
    if (!bcryptConfig) {
      throw new Error('Missing bcrypt hash config');
    }

    this.saltRounds = bcryptConfig && bcryptConfig.saltRounds || 8;
  }

  public hash(data: string | Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      genSalt(this.saltRounds, (error, salt) => {
        if (error) { return reject(error); }

        hash(data, salt, (error, encrypted) => {
          if (error) { return reject(error); }

          resolve(encrypted);
        });
      })
    });
  }

  public verify(rawData: string | Buffer, encryptedData: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      compare(rawData, encryptedData, (error, isMatch) => {
        if (error) { return reject(error); }

        resolve(isMatch);
      })
    });
  }
}