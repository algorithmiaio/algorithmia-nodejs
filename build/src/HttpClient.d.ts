declare class HttpClient {
    private key;
    private apiAddress;
    private headers;
    private userAuth;
    private userAgent;
    private httpClient;
    constructor(key: string, apiAddress: string);
    post(path: string, data: Object): Promise<string>;
}
export { HttpClient };
