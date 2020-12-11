import * as hC from 'typed-rest-client/HttpClient';

class HttpClient {

    private key: string;
    private headers: Object;
    private httpClient: hC.HttpClient;

    public constructor(key: string) {
        this.key = key;
        this.headers = { 'Authorization': this.key, 'Content-Type': 'application/json' };
        this.httpClient = new hC.HttpClient('');
    }

    async get(path: string) {
        return await this.httpClient.get(path, this.headers).then(x => { return x.readBody() });
    }

    async head(path: string) {
        return await this.httpClient.head(path, this.headers).then(x => {
            if (x.message.statusCode == 200) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    async post(path: string, data: Object) {
        return await this.httpClient.post(path, JSON.stringify(data), this.headers).then(x => { return x.readBody() });
    }

    async put(path: string, data: Object) {
        return await this.httpClient.put(path, JSON.stringify(data), this.headers).then(x => { return x.readBody() });
    }

    async delete(path: string) {
        return await this.httpClient.del(path, this.headers).then(x => { return x.readBody() });
    }

}

export { HttpClient };