"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const hC = require("typed-rest-client/HttpClient");
class HttpClient {
    constructor(key) {
        this.key = key;
        this.headers = { 'Authorization': this.key, 'Content-Type': 'application/json' };
        this.httpClient = new hC.HttpClient('');
    }
    async get(path) {
        return await this.httpClient.get(path, this.headers).then(x => { return x.readBody(); });
    }
    async head(path) {
        return await this.httpClient.head(path, this.headers).then(x => {
            if (x.message.statusCode == 200) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    async post(path, data) {
        return await this.httpClient.post(path, JSON.stringify(data), this.headers).then(x => { return x.readBody(); });
    }
    async put(path, data) {
        return await this.httpClient.put(path, JSON.stringify(data), this.headers).then(x => { return x.readBody(); });
    }
    async delete(path) {
        return await this.httpClient.del(path, this.headers).then(x => { return x.readBody(); });
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map