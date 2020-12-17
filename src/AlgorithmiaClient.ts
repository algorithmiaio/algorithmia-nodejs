import { HttpClient } from './HttpClient';
import { AlgorithmExecutable } from './AlgorithmExecutable';
import { DataFile, DataDir } from './Data';

class AlgorithmiaClient {

    private defaultApiAddress = 'https://api.algorithmia.com';
    private algoPrefix = '/v1/algo/';
    private dataPrefix = '/v1/data/';
    private key: string;
    private apiAddress: string;
    private httpClient: HttpClient;

    constructor(key?: string, apiAddress?: string) {
        this.apiAddress = apiAddress || process.env.ALGORITHMIA_API_ADDRESS || this.defaultApiAddress;
        this.key = key || process.env.ALGORITHMIA_API_KEY || '';
        if (key) {
            if (key.indexOf('Simple ') === 0) {
                this.key = key;
            } else {
                this.key = 'Simple ' + key;
            }
        } else {
            this.key = '';
        }
        this.httpClient = new HttpClient(this.key)
    }

    /**
      * Initialize an Algorithm object from this client
      * @param algoUri the algorithm's URI, e.g., algo://user/algoname
      * @return an Algorithm client for the specified algorithm
      */
    algo(algoUri: string): AlgorithmExecutable {
        return new AlgorithmExecutable(this.httpClient, this.defaultApiAddress + this.algoPrefix + algoUri);
    }

    /**
      * Initialize an DataFile object from this client
      * @param path to a data file, e.g., data://.my/foo/bar.txt
      * @return a DataFile client for the specified file
      */
     file(path : string): DataFile {
        return new DataFile(this.httpClient, this.defaultApiAddress + this.dataPrefix + path);
    }

    /**
      * Initialize a DataDirectory object from this client
      * @param path to a data directory, e.g., data://.my/foo
      * @return a DataDirectory client for the specified directory
      */
     dir(path : string): DataDir {
         return new DataDir(this.httpClient, this.defaultApiAddress + this.dataPrefix + path);
     }
     

}

export { AlgorithmiaClient };