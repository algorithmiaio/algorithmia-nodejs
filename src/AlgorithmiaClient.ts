import { HttpClient } from './HttpClient';
import { AlgorithmExecutable } from './AlgorithmExecutable';
import { DataFile, DataDir } from './Data';

class AlgorithmiaClient {
  private defaultApiAddress = 'https://api.algorithmia.com';
  private algoPrefix = '/v1/algo';
  private algorithmsPrefix = '/v1/algorithms';
  private dataPrefix = '/v1/data';
  private scmPrefix = '/v1/scms';
  private key: string;
  private apiAddress: string;
  private httpClient: HttpClient;

  constructor(key?: string, apiAddress?: string) {
    this.apiAddress =
      apiAddress ||
      process.env.ALGORITHMIA_API_ADDRESS ||
      this.defaultApiAddress;
    this.key = key || process.env.ALGORITHMIA_API_KEY || '';
    if (key) {
      if (key.startsWith('Simple ')) {
        this.key = key;
      } else {
        this.key = 'Simple ' + key;
      }
    } else {
      this.key = '';
    }
    this.httpClient = new HttpClient(this.key);
  }

  /**
    * Initialize an Algorithm object from this client
    * @param algoUri the algorithm's URI, e.g., algo://user/algoname
    * @return an Algorithm client for the specified algorithm
    */
  algo(algoUri: string): AlgorithmExecutable {
    return new AlgorithmExecutable(this.httpClient, this.apiAddress + this.algoPrefix + '/' + algoUri);
  }

  /**
   * Get an Algorithm object from this client
   * @param userName the users algorithmia user name
   * @param algoName the name of the algorithm
   * @return an Algorithm object for the specified algorithm
   */
  getAlgo(userName: string, algoName: string) {
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
  listAlgoVersions(userName: string, algoName: string, callable = true, limit = 50, published = true, marker?: string) {
    if (marker == undefined) {
      return this.httpClient.get(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName + '/versions' + '?callable=' + callable + '&limit=' + limit + '&published=' + published);
    } else {
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
  listAlgoBuilds(userName: string, algoName: string, limit = 50, marker?: string) {
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
  getAlgoBuildLogs(userName: string, algoName: string, buildId: string) {
    return this.httpClient.get(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName + '/builds/' + buildId + '/logs');
  }

  /**
   * Delete an Algorithm from this client
   * @param userName the users algorithmia user name
   * @param algoName the name of the algorithm
   * @return an empty response
   */
  deleteAlgo(userName: string, algoName: string) {
    return this.httpClient.delete(this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName);
  }

  /**
   * Create a new Algorithm object from this client
   * @param userName the users algorithmia user name
   * @param requestObject object payload
   * @return an Algorithm object for the specified algorithm
   */
  createAlgo(userName: string, requestObject: Object) {
    const contentType = 'application/json';
    return this.httpClient.post(this.apiAddress + this.algorithmsPrefix + '/' + userName, requestObject, contentType);
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
  getSCM(scmId: string) {
    return this.httpClient.get(this.apiAddress + this.scmPrefix + '/' + scmId);
  }

  /**
  * Query an Algorithm SCM status from this client
  * @param scmId id of the scm to retrieve
  * @return an Algorithm SCM authorization object
  */
  querySCMStatus(scmId: string) {
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
  file(path: string): DataFile {
    return new DataFile(this.httpClient, this.apiAddress + this.dataPrefix + '/' + path);
  }

  /**
    * Initialize a DataDirectory object from this client
    * @param path to a data directory, e.g., data://.my/foo
    * @return a DataDirectory client for the specified directory
    */
  dir(path: string): DataDir {
    return new DataDir(this.httpClient, this.apiAddress + this.dataPrefix + '/' + path);
  }

}

export { AlgorithmiaClient };
