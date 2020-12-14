import { HttpClient } from './HttpClient';
declare class AlgorithmExecutable {
    private client;
    private path;
    constructor(client: HttpClient, path: string);
    pipe(input: Object): Promise<string>;
}
export { AlgorithmExecutable };
