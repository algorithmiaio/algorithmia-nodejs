import { HttpClient } from './HttpClient';
import { getContentType } from './ContentTypeHelper';
import { URLSearchParams } from 'url';

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
    const contentType = getContentType(input);

    const pathname = version ? `${this.path}/${version}/` : `${this.path}/`;

    const params = new URLSearchParams({
      timeout: timeout.toString(),
      stdout: stdout.toString(),
      output,
    });

    const fullPath = `${pathname}?${params.toString()}`;

    return this.client.post(fullPath, input, contentType);
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
