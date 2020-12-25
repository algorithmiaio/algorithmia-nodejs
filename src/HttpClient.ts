import { HttpClient as TypedHttpClient } from 'typed-rest-client/HttpClient';
import { IHeaders } from 'typed-rest-client/Interfaces';

const {
  npm_package_version: packageVersion,
  version: nodeVersion,
} = process.env;

class HttpClient {
  private key: string;
  private userAgent = `algorithmia-nodejs/${packageVersion} (NodeJS ${nodeVersion})`;
  private headers: IHeaders = {};
  private httpClient: TypedHttpClient;

  public constructor(key: string) {
    this.key = key;
    this.headers['Authorization'] = this.key;
    this.httpClient = new TypedHttpClient(this.userAgent);
  }

  get(path: string) {
    return this.httpClient.get(path, this.headers).then((x) => {
      return x.readBody();
    });
  }

  head(path: string) {
    return this.httpClient.head(path, this.headers).then((x) => {
      return x.message.statusCode === 200;
    });
  }

  post(path: string, data: Object, contentType: string) {
    this.headers['Content-Type'] = contentType;
    return this.httpClient
      .post(path, JSON.stringify(data), this.headers)
      .then((x) => {
        return x.readBody();
      });
  }

  put(path: string, data: Object) {
    return this.httpClient
      .put(path, JSON.stringify(data), this.headers)
      .then((x) => {
        return x.readBody();
      });
  }

  delete(path: string) {
    return this.httpClient.del(path, this.headers).then((x) => {
      return x.readBody();
    });
  }
}

export { HttpClient };
