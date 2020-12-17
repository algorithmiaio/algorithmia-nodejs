"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorithmiaClient = void 0;
const HttpClient_1 = require("./HttpClient");
const AlgorithmExecutable_1 = require("./AlgorithmExecutable");
const Data_1 = require("./Data");
class AlgorithmiaClient {
    constructor(key, apiAddress) {
        this.defaultApiAddress = 'https://api.algorithmia.com';
        this.algoPrefix = '/v1/algo';
        this.algorithmsPrefix = '/v1/algorithms';
        this.dataPrefix = '/v1/data';
        this.scmPrefix = '/v1/scms';
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
        return new AlgorithmExecutable_1.AlgorithmExecutable(this.httpClient, this.apiAddress + this.algoPrefix + '/' + algoUri);
    }
    /**
     * Get an Algorithm object from this client
     * @param userName the users algorithmia user name
     * @param algoName the name of the algorithm
     * @return an Algorithm object for the specified algorithm
     */
    getAlgo(userName, algoName) {
        return this.httpClient.get(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName);
    }
    /**
     * List algorithm versions from this client
     * @param userName the users Algorithmia user name
     * @param algoName the name of the algorithm
     * @param callable whether to return only public or private algorithm versions
     * @param limit items per page
     * @param published whether to return only versions that have been published
     * @param marker used for pagination
     * @return an AlgorithmVersionsList object for the specified algorithm
     */
    listAlgoVersions(userName, algoName, callable = true, limit = 50, published = true, marker) {
        if (marker == undefined) {
            return this.httpClient.get(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName + '/versions' + '?callable=' + callable + '&limit=' + limit + '&published=' + published);
        }
        else {
            return this.httpClient.get(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName + '/versions' + '?callable=' + callable + '&limit=' + limit + '&published=' + published + '&marker=' + marker);
        }
    }
    /**
     * List algorithm builds from this client
     * @param userName the users algorithmia user name
     * @param algoName the name of the algorithm
     * @param limit items per page
     * @param marker used for pagination
     * @return an AlgorithmBuildsList object for the specified algorithm
     */
    listAlgoBuilds(userName, algoName, limit = 50, marker) {
        if (marker == undefined) {
            return this.httpClient.get(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName + '/builds' + '?limit=' + limit);
        }
        else {
            return this.httpClient.get(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName + '/builds' + '?limit=' + limit + '&marker=' + marker);
        }
    }
    /**
     * Get build logs for an Algorithm object from this client
     * @param userName the users Algorithmia user name
     * @param algoName the name of the algorithm
     * @param buildId id of the build to retrieve logs
     * @return a BuildLogs object for the specified algorithm
     */
    getAlgoBuildLogs(userName, algoName, buildId) {
        return this.httpClient.get(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName + '/builds/' + buildId + '/logs');
    }
    /**
     * Delete an Algorithm from this client
     * @param userName the users algorithmia user name
     * @param algoName the name of the algorithm
     * @return an empty response
     */
    deleteAlgo(userName, algoName) {
        return this.httpClient.delete(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName);
    }
    /**
     * Create a new Algorithm object from this client
     * @param userName the users algorithmia user name
     * @param requestObject object payload
     * @return an Algorithm object for the specified algorithm
     */
    createAlgo(userName, requestObject) {
        return this.httpClient.post(this.apiAddress + this.algorithmsPrefix + '/' + userName, requestObject);
    }
    /**
     * List Algorithm SCMs from this client
     * @return an Algorithm SCM object
     */
    listSCMs() {
        return this.httpClient.get(this.apiAddress + this.scmPrefix);
    }
    /**
     * Get am Algorithm SCM object from this client
     * @param scmId id of the scm to retrieve
     * @return an Algorithm SCM object
     */
    getSCM(scmId) {
        return this.httpClient.get(this.apiAddress + this.scmPrefix + '/' + scmId);
    }
    /**
    * Query an Algorithm SCM status from this client
    * @param scmId id of the scm to retrieve
    * @return an Algorithm SCM authorization object
    */
    querySCMStatus(scmId) {
        return this.httpClient.get(this.apiAddress + this.scmPrefix + '/' + scmId + '/oauth/status');
    }
    /**
     * Revoke an Algorithm SCM status from this client
     * @param scmId id of the scm to retrieve
     * @return an Algorithm SCM authorization object
     */
    /*revokeSCMStatus(scmId: string) {
        return this.httpClient.post(this.apiAddress + this.scmPrefix + '/' + scmId + '/oauth/revoke', {});
    }*/
    /**
      * Initialize an DataFile object from this client
      * @param path to a data file, e.g., data://.my/foo/bar.txt
      * @return a DataFile client for the specified file
      */
    file(path) {
        return new Data_1.DataFile(this.httpClient, this.apiAddress + this.dataPrefix + '/' + path);
    }
    /**
      * Initialize a DataDirectory object from this client
      * @param path to a data directory, e.g., data://.my/foo
      * @return a DataDirectory client for the specified directory
      */
    dir(path) {
        return new Data_1.DataDir(this.httpClient, this.apiAddress + this.dataPrefix + '/' + path);
    }
}
exports.AlgorithmiaClient = AlgorithmiaClient;
//# sourceMappingURL=AlgorithmiaClient.js.map