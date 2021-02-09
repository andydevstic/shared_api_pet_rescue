import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { IObjectUtil } from '@src.shared/shared/interfaces';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.OBJECT)
export class ObjectUtil implements IObjectUtil {
  public groupPropertyValueOfArray(array: any[], propsName: string): any[] {
    const hashMap = new Map();

    array.forEach((element) => {
      const propertyValue = element[propsName];
      if (propertyValue === undefined) {
        return;
      }

      const isPropExistInHash = hashMap.get(propertyValue);

      if (isPropExistInHash) {
        return;
      }

      hashMap.set(propertyValue, true);
    });

    return Array.from(hashMap.keys());
  }
}
