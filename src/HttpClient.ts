import { HttpClient as TypedHttpClient } from 'typed-rest-client/HttpClient';
import { IHeaders } from 'typed-rest-client/Interfaces';
import { Input, Json } from './ContentTypeHelper';

class HttpClient {
  private key: string;
  private userAgent =
    '{User-Agent : algorithmia-nodejs/' +
    process.env.npm_package_version +
    ' (NodeJS ' +
    process.version +
    ')}';
  private headers: IHeaders = {};
  private httpClient: TypedHttpClient;

  public constructor(key: string) {
    this.key = key;
    this.headers['Authorization'] = this.key;
    this.httpClient = new TypedHttpClient(this.userAgent);
  }

  async get(path: string, acceptHeader = 'application/octet-stream') {
    this.headers['Accept'] = acceptHeader;
    const response = await this.httpClient.get(path, this.headers);

    return response.readBody();
  }

  async head(path: string) {
    const response = await this.httpClient.head(path, this.headers);

    return response.message.statusCode === 200;
  }

  async post(path: string, data: Input, contentType: string) {
    this.headers['Content-Type'] = contentType;
    const toString = (data: unknown) =>
      typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    const response = await this.httpClient.post(
      path,
      toString(data),
      this.headers
    );

    return response.readBody();
  }

  async put(path: string, data: Input) {
    this.headers['Content-Type'] = 'application/json';
    const toString = (data: unknown) =>
      typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    const response = await this.httpClient.put(
      path,
      toString(data),
      this.headers
    );

    return response.readBody();
  }

  async putJson(path: string, data: Json) {
    const response = await this.httpClient.put(
      path,
      JSON.stringify(data),
      this.headers
    );

    return response.readBody();
  }

  async delete(path: string) {
    const response = await this.httpClient.del(path, this.headers);

    return response.readBody();
  }
}

export { HttpClient };
