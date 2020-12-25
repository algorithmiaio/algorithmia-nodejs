import { HttpClient } from './HttpClient';
import { getContentType } from './common/utilities';

class AlgorithmExecutable {
  private client: HttpClient;
  private path: string;

  public constructor(client: HttpClient, path: string) {
    this.client = client;
    this.path = path;
  }

  pipe<T = unknown>(
    input: T,
    version?: string,
    output = 'raw',
    stdout = false,
    timeout = 300
  ) {
    const contentType = getContentType(input);

    if (version == undefined) {
      return this.client.post(
        this.path +
          '/?output=' +
          output +
          '&stdout=' +
          stdout +
          '&timeout=' +
          timeout,
        input,
        contentType
      );
    } else {
      return this.client.post(
        this.path +
          '/' +
          version +
          '/?output=' +
          output +
          '&stdout=' +
          stdout +
          '&timeout=' +
          timeout,
        input,
        contentType
      );
    }
  }
}

interface AlgoResponse {
  async?: boolean;
  error?: Error;
  metadata?: MetaData;
  request_id?: string;
  result?: string | Record<string, unknown>;
}

interface Error {
  message: string;
  stacktrace: string;
}

interface MetaData {
  content_type: string;
  duration: string;
  stdout: string;
}

export { AlgorithmExecutable, AlgoResponse };
