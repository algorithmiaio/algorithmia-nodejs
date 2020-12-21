import { HttpClient } from './HttpClient';
import { ContentTypeHelper } from './ContentTypeHelper';

class AlgorithmExecutable {

  private client: HttpClient;
  private path: string;

  public constructor(client: HttpClient, path: string) {
    this.client = client;
    this.path = path;
  }

  pipe(input: Object, version?: string, output = 'raw', stdout = false, timeout = 300) {
    let contentTypeHelper: ContentTypeHelper = new ContentTypeHelper;
    let contentType: string;

    contentType = contentTypeHelper.contentTypeHelper(input);

    if(version == undefined) {
      return this.client.post(this.path + '/?output=' + output + '&stdout=' + stdout + '&timeout=' + timeout, input, contentType);
    }
    else {
      return this.client.post(this.path + '/' + version + '/?output=' + output + '&stdout=' + stdout + '&timeout=' + timeout, input, contentType);
    }
    
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