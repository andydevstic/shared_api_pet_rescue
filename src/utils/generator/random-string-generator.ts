import * as RandomString from 'randomstring';

import { provideSingletonNamed } from "@src.shared/infra/ioc/decorators";
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from "@src.shared/shared/constants";
import { GeneratorUtil } from "@src.shared/shared/interfaces";

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.RANDOM_STRING_GENERATOR)
export class CryptoRandomStringGeneratorUtil implements GeneratorUtil {
  public generate(options: RandomString.GenerateOptions): string {
    return RandomString.generate(options);
  }
}