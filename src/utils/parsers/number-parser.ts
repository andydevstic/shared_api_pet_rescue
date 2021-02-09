import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { INumberParser } from '@src.shared/shared/interfaces';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.PARSER, SHARED_PROVIDER_NAMES.NUMBER)
export class NumberParser implements INumberParser {
  public tryParseOrZero(rawData: string): number {
    const tryParsed = Number(rawData);

    if (isNaN(tryParsed)) {
      return 0;
    }

    return tryParsed;
  }

  public tryParsePercentageOrZero(rawPercentage: string): number {
    const numberPortionOfPercentage = rawPercentage.split('%')[0];

    return this.tryParseOrZero(numberPortionOfPercentage) / 100;
  }
}
