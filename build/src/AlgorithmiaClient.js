"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorithmiaClient = void 0;
const HttpClient_1 = require("./HttpClient");
const AlgorithmExecutable_1 = require("./AlgorithmExecutable");
const Data_1 = require("./Data");
class AlgorithmiaClient {
    constructor(key, apiAddress) {
        this.defaultApiAddress = 'https://api.algorithmia.com';
        this.algoPrefix = '/v1/algo/';
        this.dataPrefix = '/v1/data/';
        this.apiAddress = apiAddress || process.env.ALGORITHMIA_API_ADDRESS || this.defaultApiAddress;
        this.key = key || process.env.ALGORITHMIA_API_KEY || '';
        if (key) {
            if (key.indexOf('Simple ') === 0) {
                this.key = key;
            }
            else {
                this.key = 'Simple ' + key;
            }
        }
        else {
            this.key = '';
        }
        this.httpClient = new HttpClient_1.HttpClient(this.key);
    }
    /**
      * Initialize an Algorithm object from this client
      * @param algoUri the algorithm's URI, e.g., algo://user/algoname
      * @return an Algorithm client for the specified algorithm
      */
    algo(algoUri) {
        return new AlgorithmExecutable_1.AlgorithmExecutable(this.httpClient, this.defaultApiAddress + this.algoPrefix + algoUri);
    }
    /**
      * Initialize an DataFile object from this client
      * @param path to a data file, e.g., data://.my/foo/bar.txt
      * @return a DataFile client for the specified file
      */
    file(path) {
        return new Data_1.DataFile(this.httpClient, this.defaultApiAddress + this.dataPrefix + path);
    }
    /**
      * Initialize a DataDirectory object from this client
      * @param path to a data directory, e.g., data://.my/foo
      * @return a DataDirectory client for the specified directory
      */
    dir(path) {
        return new Data_1.DataDir(this.httpClient, this.defaultApiAddress + this.dataPrefix + path);
    }
}
exports.AlgorithmiaClient = AlgorithmiaClient;
//# sourceMappingURL=AlgorithmiaClient.js.map