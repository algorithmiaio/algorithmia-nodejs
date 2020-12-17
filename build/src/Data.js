"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataDir = exports.DataFile = void 0;
class Data {
    constructor(client, path) {
        this.client = client;
        this.path = path.replace(/data\:\/\//, '');
    }
    baseName() {
        return this.path.slice(this.path.lastIndexOf('/') + 1);
    }
    parent() {
        const offset = this.path.lastIndexOf('/');
        if (offset >= 0) {
            return new DataDir(this.client, 'data://' + this.path.slice(0, offset));
        }
        else {
            return null;
        }
    }
    ;
}
/*
* File objects in the Algorithmia Data API
*/
class DataFile extends Data {
    get() {
        return this.client.get(this.path);
    }
    put(input) {
        return this.client.put(this.path, input);
    }
    delete() {
        return this.client.delete(this.path);
    }
    exists() {
        return this.client.head(this.path);
    }
}
exports.DataFile = DataFile;
/*
# Dir objects in the Algorithmia Data API
*/
class DataDir extends Data {
    file(fileName) {
        return new DataFile(this.client, 'data://' + this.path + '/' + fileName);
    }
    get() {
        return this.client.get(this.path);
    }
    put(fileName, input) {
        return this.file(fileName).put(input);
    }
    post(input) {
        return this.client.post(this.path, input);
    }
    exists() {
        return this.client.head(this.path);
    }
    delete(force) {
        return this.client.delete(this.path + '?force=' + force);
    }
}
exports.DataDir = DataDir;
//# sourceMappingURL=Data.js.map