/// <reference types="node" />
import { HashUtil } from "@src.shared/shared/interfaces";
export declare class FnvHashUtil implements HashUtil {
    hash(content: string | Buffer, hashBits?: number): Promise<string>;
    verify(rawData: string, hashedData: string): Promise<boolean>;
}
