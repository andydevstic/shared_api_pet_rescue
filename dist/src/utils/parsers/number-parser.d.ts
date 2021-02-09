import { INumberParser } from '@src.shared/shared/interfaces';
export declare class NumberParser implements INumberParser {
    tryParseOrZero(rawData: string): number;
    tryParsePercentageOrZero(rawPercentage: string): number;
}
