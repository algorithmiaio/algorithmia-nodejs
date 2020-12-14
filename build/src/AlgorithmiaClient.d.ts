import { AlgorithmExecutable } from './AlgorithmExecutable';
declare class AlgorithmiaClient {
    private defaultApiAddress;
    private path;
    private key;
    private apiAddress;
    private httpClient;
    constructor(key?: string, apiAddress?: string);
    /**
      * Initialize an Algorithm object from this client
      * @param algoUri the algorithm's URI, e.g., algo://user/algoname
      * @return an Algorithm client for the specified algorithm
      */
    algo(algoUri: string): AlgorithmExecutable;
}
export { AlgorithmiaClient };
