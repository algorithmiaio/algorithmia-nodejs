import { HttpClient } from './HttpClient';

class AlgorithmExecutable {

  private client: HttpClient;
  private path: string;

  public constructor(client: HttpClient, path: string) {
    this.client = client;
    this.path = path;
  }

  pipe(input: Object, output: string) {
    return this.client.post(this.path + '/?output=' + output, input)
  }
}

interface AlgoResponse {
  async?: Boolean;
  error?: Error;
  metadata?: MetaData;
  request_id?: String;
  result?: String | Object;
}

interface Error {
  message: String;
  stacktrace: String;
}

interface MetaData {
  content_type: String;
  duration: String;
  stdout: String;
}

export { AlgorithmExecutable, AlgoResponse };