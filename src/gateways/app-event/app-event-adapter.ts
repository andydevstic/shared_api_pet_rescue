import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { EventEmitter } from 'events';
import { APP_ENV, SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { IAppEventProxy, IEventEmitter, IEventTranslator, Subscription } from '@src.shared/shared/interfaces';
import { inject, named } from 'inversify';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.PROXY, SHARED_PROVIDER_NAMES.APP_EVENT)
export class AppEventProxy implements IAppEventProxy {
  protected eventEmitter: IEventEmitter = new EventEmitter();

  constructor(
    @inject(SHARED_PROVIDER_TYPES.UTIL)
    @named(SHARED_PROVIDER_NAMES.EVENT_TRANSLATOR)
    protected eventTranslator: IEventTranslator,
  ) {}

  public setEventEmitter(eventEmitter: IEventEmitter): void {
    this.eventEmitter = eventEmitter;
  }

  public emitEvent(eventName: APP_ENV, payload: any): void {
    const translatedEvents = this.eventTranslator.translate(eventName);

    translatedEvents.forEach((translatedEvent) => {
      const emissionResult = this.eventEmitter.emit(translatedEvent, payload);
      if (!emissionResult) {
        throw new Error(`Failed to emit event ${translatedEvent}`);
      }
    });
  }

  public subscribeToEvent(eventName: APP_ENV, handler: any): Subscription {
    this.eventEmitter.on(eventName, handler);

    return {
      unsubscribe: () => {
        this.eventEmitter.removeListener(eventName, handler);
      }
    };
  }
}
