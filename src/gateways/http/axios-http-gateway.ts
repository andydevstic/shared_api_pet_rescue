import axios, { AxiosInstance } from 'axios';

import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_TYPES, SHARED_PROVIDER_NAMES } from '@src.shared/shared/constants';
import { AxiosError } from '@src.shared/shared/errors';
import { HttpClient, HttpClientOptions, HttpRequestOptions } from '@src.shared/shared/interfaces';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.HTTP_CLIENT, SHARED_PROVIDER_NAMES.AXIOS)
export class AxiosHttpClient implements HttpClient {
  protected _client: AxiosInstance;

  public initialize(options?: HttpClientOptions): void {
    this._client = axios.create(options);
  }

  protected get client(): AxiosInstance {
    let client: AxiosInstance;
    if (this._client) {
      client = this._client;
    } else {
      client = axios.create();
    }

    return client;
  }

  public async get(url: string, options: HttpRequestOptions): Promise<any> {
    try {
      const response = await this.client.get(url, options);

      return response;
    } catch (error) {
      throw AxiosError.wrapError(error);
    }
  }

  public async post(url: string, body: any, options: HttpRequestOptions): Promise<any> {
    try {
      const response = await this.client.post(url, body, options);

      return response;
    } catch (error) {
      throw AxiosError.wrapError(error);
    }
  }

  public async put(url: string, body: any, options: HttpRequestOptions): Promise<any> {
    try {
      const response = await this.client.put(url, body, options);

      return response;
    } catch (error) {
      throw AxiosError.wrapError(error);
    }
  }

  public async delete(url: string, options: HttpRequestOptions): Promise<any> {
    try {
      const response = await this.client.delete(url, options);

      return response;
    } catch (error) {
      throw AxiosError.wrapError(error);
    }
  }
}
