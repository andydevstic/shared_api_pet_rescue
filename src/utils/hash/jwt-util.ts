import { sign, verify } from 'jsonwebtoken';
import { inject } from 'inversify';

import { provideSingletonNamed } from "@src.shared/infra/ioc/decorators";
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from "@src.shared/shared/constants";
import { Configuration, IEncodeDecodeUtil } from "@src.shared/shared/interfaces";

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.JWT)
export class JwtUtil implements IEncodeDecodeUtil {
  protected secret: string;
  protected algorithm: any;

  constructor(
    @inject(SHARED_PROVIDER_TYPES.CONFIG)
    config: Configuration,
  ) {
    const jwtConfig = config.get('jwt');

    if (!jwtConfig) {
      throw new Error('Missing jwt config');
    }

    this.secret = jwtConfig.secret;
    this.algorithm = jwtConfig.algorithm || 'HS256';
  }

  public encode(data: string | Buffer, options?: any): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(data, this.secret, { algorithm: this.algorithm, ...options }, (error, encoded) => {
        if (error) {
          return reject(error);
        }

        resolve(encoded);
      });
    });
  }

  public decode(data: string): any {
    return new Promise((resolve, reject) => {
      verify(data, this.secret, { algorithms: this.algorithm }, (error, decoded) => {
        if (error) { return reject(error); }

        resolve(decoded);
      })
    });
  }
}