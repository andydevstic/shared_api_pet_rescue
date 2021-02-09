import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { APP_ENV, SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { IEventTranslator } from '@src.shared/shared/interfaces';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.EVENT_TRANSLATOR)
export class EventTranslator implements IEventTranslator {
  public translate(event: APP_ENV): APP_ENV[] {
    switch (event) {
      default:
        return [event];
    }
  }
}
