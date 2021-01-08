import { HttpClient } from './HttpClient';
import { getContentType } from './ContentTypeHelper';
import { readFileSync } from 'fs';
import { basename } from 'path';

abstract class Data {
  protected client: HttpClient;
  protected path: string;

  public constructor(client: HttpClient, path: string) {
    this.client = client;
    this.path = path.replace(/data\:\/\//, '');
  }

  baseName(): string {
    return this.path.slice(this.path.lastIndexOf('/') + 1);
  }

  parent(): DataDir | null {
    const offset = this.path.lastIndexOf('/');
    if (offset >= 0) {
      return new DataDir(this.client, `data://${this.path.slice(0, offset)}`);
    } else {
      return null;
    }
  }
}

/*
 * File objects in the Algorithmia Data API
 */
class DataFile extends Data {
  get() {
    return this.client.get(this.path);
  }

  getString() {
    const acceptHeader = 'text/plain';
    return this.client.get(this.path, acceptHeader);
  }

  getJson() {
    const acceptHeader = 'application/json';
    return this.client.get(this.path, acceptHeader);
  }

  getBinary() {
    const acceptHeader = 'application/octet-stream';
    return this.client.get(this.path, acceptHeader);
  }

  put(input: string) {
    return this.client.put(this.path, input);
  }

  putString(input: string) {
    return this.client.put(this.path, input);
  }

  putJson(input: string) {
    return this.client.putJson(this.path, input);
  }

  delete() {
    return this.client.delete(this.path);
  }

  exists() {
    return this.client.head(this.path);
  }
}

/*
# Dir objects in the Algorithmia Data API
*/
class DataDir extends Data {
  file(fileName: string) {
    return new DataFile(this.client, `data://${this.path}/${fileName}`);
  }

  get() {
    const acceptHeader = 'application/octet-stream';
    return this.client.get(this.path, acceptHeader);
  }

  put(fileName: string, input: string) {
    return this.file(fileName).put(input);
  }

  putFile(localFilePath: string) {
    const fileName = basename(localFilePath);
    return this.file(fileName).put(
      readFileSync(localFilePath, { encoding: 'utf-8' })
    );
  }

  create(input: string) {
    const contentType = getContentType(input);
    return this.client.post(this.path, input, contentType);
  }

  exists() {
    return this.client.head(this.path);
  }

  delete(force: boolean) {
    return this.client.delete(`${this.path}?force=${force}`);
  }
}

interface DataList {
  folders: string[];
  files: string[];
}

export { DataFile, DataDir, DataList };
