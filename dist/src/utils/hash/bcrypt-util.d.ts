/// <reference types="node" />
import { Configuration, HashUtil } from "@src.shared/shared/interfaces";
export declare class BcryptUtil implements HashUtil {
    protected saltRounds: number;
    constructor(config: Configuration);
    hash(data: string | Buffer): Promise<string>;
    verify(rawData: string | Buffer, encryptedData: string): Promise<boolean>;
}
