import { provideSingletonNamed } from "@src.shared/infra/ioc/decorators";
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from "@src.shared/shared/constants";
import { HashUtil } from "@src.shared/shared/interfaces";
import * as Fnv1 from 'fnv-plus';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.FNV_HASH)
export class FnvHashUtil implements HashUtil {
  public hash(content: string | Buffer, hashBits?: number): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const hashed = Fnv1.hash(content, hashBits || 52).hex();
        resolve(hashed);
      } catch (error) {
        reject(error);
      }
    });
  }

  public verify(rawData: string, hashedData: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
