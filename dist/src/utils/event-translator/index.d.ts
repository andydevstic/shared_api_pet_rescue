import { APP_ENV } from '@src.shared/shared/constants';
import { IEventTranslator } from '@src.shared/shared/interfaces';
export declare class EventTranslator implements IEventTranslator {
    translate(event: APP_ENV): APP_ENV[];
}
