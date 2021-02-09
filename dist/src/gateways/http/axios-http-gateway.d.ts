import { AxiosInstance } from 'axios';
import { HttpClient, HttpClientOptions, HttpRequestOptions } from '@src.shared/shared/interfaces';
export declare class AxiosHttpClient implements HttpClient {
    protected _client: AxiosInstance;
    initialize(options?: HttpClientOptions): void;
    protected get client(): AxiosInstance;
    get(url: string, options: HttpRequestOptions): Promise<any>;
    post(url: string, body: any, options: HttpRequestOptions): Promise<any>;
    put(url: string, body: any, options: HttpRequestOptions): Promise<any>;
    delete(url: string, options: HttpRequestOptions): Promise<any>;
}
