import { APP_ENV } from '@src.shared/shared/constants';
import { IAppEventProxy, IEventEmitter, IEventTranslator, Subscription } from '@src.shared/shared/interfaces';
export declare class AppEventProxy implements IAppEventProxy {
    protected eventTranslator: IEventTranslator;
    protected eventEmitter: IEventEmitter;
    constructor(eventTranslator: IEventTranslator);
    setEventEmitter(eventEmitter: IEventEmitter): void;
    emitEvent(eventName: APP_ENV, payload: any): void;
    subscribeToEvent(eventName: APP_ENV, handler: any): Subscription;
}
