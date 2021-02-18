import { provideSingletonNamed } from "@src.shared/infra/ioc/decorators";
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from "@src.shared/shared/constants";
import { HashUtil } from "@src.shared/shared/interfaces";
import * as Fnv1 from 'fnv-plus';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.FNV_HASH)
export class FnvHashUtil implements HashUtil {
  public hash(content: string | Buffer, hashBits?: number): string {
    return Fnv1.hash(content, hashBits || 52).hex();
  }
}
