/// <reference types="node" />
import { Configuration, IEncodeDecodeUtil } from "@src.shared/shared/interfaces";
export declare class JwtUtil implements IEncodeDecodeUtil {
    protected secret: string;
    protected algorithm: any;
    constructor(config: Configuration);
    encode(data: string | Buffer, options?: any): Promise<string>;
    decode(data: string): any;
}
