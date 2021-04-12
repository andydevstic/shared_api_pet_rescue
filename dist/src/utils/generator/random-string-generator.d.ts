import * as RandomString from 'randomstring';
import { GeneratorUtil } from "@src.shared/shared/interfaces";
export declare class CryptoRandomStringGeneratorUtil implements GeneratorUtil {
    generate(options: RandomString.GenerateOptions): string;
}
