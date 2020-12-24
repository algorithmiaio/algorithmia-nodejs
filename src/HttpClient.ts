import { HttpClient as TypedHttpClient } from 'typed-rest-client/HttpClient';
import { IHeaders } from 'typed-rest-client/Interfaces';

class HttpClient {
  private key: string;

  private userAgent = `{User-Agent : algorithmia-nodejs/${process.env.npm_package_version} (NodeJS ${process.version})}`;

  private headers: IHeaders = {};

  private httpClient: TypedHttpClient;

  public constructor(key: string) {
    this.key = key;
    this.headers.Authorization = this.key;
    this.httpClient = new TypedHttpClient(this.userAgent);
  }

  async get(path: string) {
    return await this.httpClient.get(path, this.headers).then((x) => {
      return x.readBody();
    });
  }

  async head(path: string) {
    return await this.httpClient.head(path, this.headers).then((x) => {
      return x.message.statusCode === 200;
    });
  }

  async post(path: string, data: Object, contentType: string) {
    this.headers['Content-Type'] = contentType;
    return await this.httpClient
      .post(path, JSON.stringify(data), this.headers)
      .then((x) => {
        return x.readBody();
      });
  }

  async put(path: string, data: Object) {
    return await this.httpClient
      .put(path, JSON.stringify(data), this.headers)
      .then((x) => {
        return x.readBody();
      });
  }

  async delete(path: string) {
    return await this.httpClient.del(path, this.headers).then((x) => {
      return x.readBody();
    });
  }
}

export { HttpClient };
