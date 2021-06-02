import { HttpClient } from './HttpClient';
import { AlgorithmExecutable } from './AlgorithmExecutable';
import type { Input } from './ContentTypeHelper';
import { DataFile, DataDir } from './Data';
import { URLSearchParams } from 'url';
import { Organization, OrgType, OrgTypes } from './Algorithm';
import dotenv from 'dotenv';
dotenv.config();

class AlgorithmiaClient {
  private defaultApiAddress = 'https://api.algorithmia.com';
  private algoPrefix = '/v1/algo';
  private algorithmsPrefix = '/v1/algorithms';
  private dataPrefix = '/v1/data';
  private scmPrefix = '/v1/scms';
  private organizationTypePrefix = '/v1/organization';
  private organizationsPrefix = '/v1/organizations';
  private typesMapList: OrgTypes[] = [];
  private key: string;
  private apiAddress: string;
  private httpClient: HttpClient;

  constructor(key?: string, apiAddress?: string) {
    this.apiAddress =
      apiAddress ||
      process.env.ALGORITHMIA_API_ADDRESS ||
      this.defaultApiAddress;
    this.key = key || process.env.ALGORITHMIA_DEFAULT_API_KEY || '';
    if (key) {
      if (key.startsWith('Simple ')) {
        this.key = key;
      } else {
        this.key = 'Simple ' + key;
      }
    }

    this.httpClient = new HttpClient(this.key);
  }

  /**
   * Initialize an Algorithm object from this client
   * @param algoUri the algorithm's URI, e.g., algo://user/algoname
   * @return an Algorithm client for the specified algorithm
   */
  algo(algoUri: string): AlgorithmExecutable {
    return new AlgorithmExecutable(
      this.httpClient,
      this.apiAddress + this.algoPrefix + '/' + algoUri
    );
  }

  /**
   * Get an Algorithm object from this client
   * @param userName the users algorithmia user name
   * @param algoName the name of the algorithm
   * @return an Algorithm object for the specified algorithm
   */
  getAlgo(userName: string, algoName: string) {
    return this.httpClient.get(
      this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName
    );
  }

  /**
   * Get an Algorithm build object from this client
   * @param userName the algorithmia user name
   * @param algoName the name of the algorithm
   * @return an Algorithm build object for the specified algorithm
   */
  buildAlgo(userName: string, algoName: string) {
    return this.httpClient.post(
      `${this.apiAddress}${this.algorithmsPrefix}/${userName}/${algoName}/compile`,
      {},
      'application/json'
    );
  }

  /**
   * Get an Algorithm published object from this client
   * @param userName the algorithmia user name
   * @param algoName the name of the algorithm
   * @return an Algorithm published object for the specified algorithm
   */
   publishAlgo(userName: string, algoName: string) {
    return this.httpClient.post(
      `${this.apiAddress}${this.algorithmsPrefix}/${userName}/${algoName}/version`,
      {settings:{
        algorithm_callability:"private",
        insights_enabled:false,
        royalty_microcredits:0
      },version_info:{version_type:"revision"}},
      'application/json'
    );
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
  listAlgoVersions(
    userName: string,
    algoName: string,
    callable = true,
    limit = 50,
    published = true,
    marker?: string
  ) {
    const path = `${this.algorithmsPrefix}/${userName}/${algoName}/versions`;
    const params = new URLSearchParams({
      callable: callable.toString(),
      limit: limit.toString(),
      published: published.toString(),
    });

    if (marker) {
      params.set('marker', marker);
    }

    const search = `?${params.toString()}`;

    return this.httpClient.get(`${this.apiAddress}${path}${search}`);
  }

  /**
   * List algorithm builds from this client
   * @param userName the users algorithmia user name
   * @param algoName the name of the algorithm
   * @param limit items per page
   * @param marker used for pagination
   * @return an AlgorithmBuildsList object for the specified algorithm
   */
  listAlgoBuilds(
    userName: string,
    algoName: string,
    limit = 50,
    marker?: string
  ) {
    const path = `${this.algorithmsPrefix}/${userName}/${algoName}/builds`;
    const params = new URLSearchParams({
      limit: limit.toString(),
    });

    if (marker) {
      params.set('marker', marker);
    }

    const search = `?${params.toString()}`;

    return this.httpClient.get(`${this.apiAddress}${path}${search}`);
  }

  /**
   * Get build logs for an Algorithm object from this client
   * @param userName the users Algorithmia user name
   * @param algoName the name of the algorithm
   * @param buildId id of the build to retrieve logs
   * @return a BuildLogs object for the specified algorithm
   */
  getAlgoBuildLogs(userName: string, algoName: string, buildId: string) {
    return this.httpClient.get(`${this.apiAddress}${this.algorithmsPrefix}/${userName}/${algoName}/builds/${buildId}/logs`);
  }

  /**
   * Delete an Algorithm from this client
   * @param userName the users algorithmia user name
   * @param algoName the name of the algorithm
   * @return an empty response
   */
  deleteAlgo(userName: string, algoName: string) {
    return this.httpClient.delete(
      this.apiAddress + this.algorithmsPrefix + '/' + userName + '/' + algoName
    );
  }

  /**
   * Create a new Algorithm object from this client
   * @param userName the users algorithmia user name
   * @param requestObject object payload
   * @return an Algorithm object for the specified algorithm
   */
  createAlgo(userName: string, requestObject: Input) {
    const contentType = 'application/json';
    return this.httpClient.post(
      this.apiAddress + this.algorithmsPrefix + '/' + userName,
      requestObject,
      contentType
    );
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
    return this.httpClient.get(
      this.apiAddress + this.scmPrefix + '/' + scmId + '/oauth/status'
    );
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
   * Create an organization from this client
   * @param requestObject object payload
   * @return an organization object
   */
  async createOrganization(requestObject: Input, type: OrgType) {
    const contentType = 'application/json';
    return this.httpClient.post(
      `${this.apiAddress}${this.organizationsPrefix}`,
      JSON.stringify(await this.organizationTypeIdChanger(requestObject, type)),
      contentType
    );
  }

  /**
   * Get an organization from this client
   * @param orgName the organization name
   * @return an organization object
   */
  async getOrganization(orgName: string): Promise<Organization> {
    const organization: Organization = JSON.parse(
      await this.httpClient.get(
        `${this.apiAddress}${this.organizationsPrefix}/${orgName}`
      )
    );
    return organization;
  }

  /**
   * Edit an organization from this client
   * @param orgName the organization name
   * @param requestObject payload
   * @return an empty response
   */
  editOrganization(orgName: string, requestObject: Input) {
    return this.httpClient.put(
      `${this.apiAddress}${this.organizationsPrefix}/${orgName}`,
      requestObject
    );
  }

  clone(obj: Input) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Helper for swapping out the type_id value
   */
  async organizationTypeIdChanger(requestObject: Input, type: OrgType) {
    const editedOrganization: Organization = this.clone(requestObject);
    let isSet = false;
    if (!this.typesMapList.length) {
      this.typesMapList = await this.getOrgTypes();
    }
    for (const typesMapObject of this.typesMapList) {
      if (type === typesMapObject.name) {
        editedOrganization.type_id = typesMapObject.id;
        isSet = true;
        break;
      }
    }
    if (!isSet) {
      throw new Error(
        "No matching organization type found, should be one of 'legacy', 'basic', 'pro'"
      );
    }
    return editedOrganization;
  }

  /**
   * Get types uuid endpoint
   */
  async getOrgTypes() {
    return JSON.parse(
      await this.httpClient.get(
        `${this.apiAddress}${this.organizationTypePrefix}/types`
      )
    );
  }

  /**
   * Initialize an DataFile object from this client
   * @param path to a data file, e.g., data://.my/foo/bar.txt
   * @return a DataFile client for the specified file
   */
  file(path: string): DataFile {
    return new DataFile(
      this.httpClient,
      this.apiAddress + this.dataPrefix + '/' + path
    );
  }

  /**
   * Initialize a DataDirectory object from this client
   * @param path to a data directory, e.g., data://.my/foo
   * @return a DataDirectory client for the specified directory
   */
  dir(path: string): DataDir {
    return new DataDir(
      this.httpClient,
      this.apiAddress + this.dataPrefix + '/' + path
    );
  }
}

export { AlgorithmiaClient };
