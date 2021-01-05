import { HttpClient } from './HttpClient';
import { ContentTypeHelper } from './ContentTypeHelper';

class AlgorithmExecutable {
  private client: HttpClient;
  private path: string;

  public constructor(client: HttpClient, path: string) {
    this.client = client;
    this.path = path;
  }

  pipe(
    input: Object,
    version?: string,
    output = 'raw',
    stdout = false,
    timeout = 300
  ) {
    const contentTypeHelper: ContentTypeHelper = new ContentTypeHelper();
    let contentType: string;

    contentType = contentTypeHelper.contentTypeHelper(input);

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
  result?: string | Object;
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
