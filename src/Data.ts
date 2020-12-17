import { HttpClient } from './HttpClient';

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
            return new DataDir(this.client, 'data://' + this.path.slice(0, offset));
        }
        else {
            return null;
        }
    };

}

/*
* File objects in the Algorithmia Data API
*/
class DataFile extends Data {

    get() {
        return this.client.get(this.path);
    }

    put(input: string) {
        return this.client.put(this.path, input);
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
        return new DataFile(this.client, 'data://' + this.path + '/' + fileName)
    }

    get() {
        return this.client.get(this.path);
    }

    put(fileName: string, input: string) {
        return this.file(fileName).put(input);
    }

    post(input: string) {
        return this.client.post(this.path, input);
    }

    exists() {
        return this.client.head(this.path);
    }

    delete(force: Boolean) {
        return this.client.delete(this.path + '?force=' + force)
    }

}

interface DataList {
    folders: String[];
    files: String[];
}

export { DataFile, DataDir, DataList };