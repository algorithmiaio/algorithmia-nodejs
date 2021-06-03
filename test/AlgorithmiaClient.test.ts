import { Algorithmia } from '../src/Algorithmia';
import {
  Algorithm,
  SCM,
  AlgorithmVersionsList,
  AlgorithmBuildsList,
  AlgorithmSCMAuthorizationStatus,
  Organization,
  OrgType,
} from '../src/Algorithm';
import {
  ALGORITHMIA_TEST_API_ADDRESS,
  ALGORITHMIA_TEST_DEFAULT_API_KEY,
  ALGORITHMIA_TEST_USERNAME,
  ALGORITHMIA_TEST_ADMIN_API_KEY,
  createTestAlgo,
} from './TestUtils';

describe('Localisation initialization', () => {
  const testAlgo = createTestAlgo('test_algorithmia_client');
  const algoClient = Algorithmia.getClient(
    ALGORITHMIA_TEST_DEFAULT_API_KEY,
    ALGORITHMIA_TEST_API_ADDRESS
  );
  const algoAdminClient = Algorithmia.getClient(
    ALGORITHMIA_TEST_ADMIN_API_KEY,
    ALGORITHMIA_TEST_API_ADDRESS
  );

  beforeEach(() => {
    jest.resetModules();
    jest.setTimeout(60000);
  });

  describe('algorithm get call', () => {
    it('gets for algorithm', async () => {
      // create an algorithm.
      await algoClient.createAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo);

      const algorithm: Algorithm = JSON.parse(
        await algoClient.getAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name)
      );

      expect(algorithm.name).toBe(testAlgo.name);

      // delete the algorithm.
      await algoClient.deleteAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name);
    });
  });

  describe('algorithm versions list call', () => {
    it('gets for algorithm versions list', async () => {
      // create an algorithm.
      await algoClient.createAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo);
      // invoke algorithm build process.
      await algoClient.buildAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name);

      await algoClient.publishAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name);

      const algorithmVersionsList: AlgorithmVersionsList = JSON.parse(
        await algoClient.listAlgoVersions(
          ALGORITHMIA_TEST_USERNAME,
          testAlgo.name,
          false
        )
      );

      expect(algorithmVersionsList.results.length).toBe(1);

      // delete the algorithm.
      await algoClient.deleteAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name);
    });
  });

  describe('algorithm builds list call', () => {
    it('gets for algorithm builds list', async () => {
      // create an algorithm.
      await algoClient.createAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo);
      // invoke algorithm build process.
      await algoClient.buildAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name);

      const algorithmBuildsList: AlgorithmBuildsList = JSON.parse(
        await algoClient.listAlgoBuilds(
          ALGORITHMIA_TEST_USERNAME,
          testAlgo.name
        )
      );

      expect(algorithmBuildsList.results.length).toBe(1);

      // delete the algorithm.
      await algoClient.deleteAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name);
    });
  });

  describe('algorithm builds log call', () => {
    it('gets for algorithm build logs', async () => {
      // create an algorithm.
      await algoClient.createAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo);
      // invoke algorithm build process.
      await algoClient.buildAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name);

      const algorithmBuildsList: AlgorithmBuildsList = JSON.parse(
        await algoClient.listAlgoBuilds(
          ALGORITHMIA_TEST_USERNAME,
          testAlgo.name
        )
      );

      const response = JSON.parse(
        await algoClient.getAlgoBuildLogs(
          ALGORITHMIA_TEST_USERNAME,
          testAlgo.name,
          algorithmBuildsList.results[0].build_id
        )
      );

      expect(response.logs).toBeDefined;
      expect(response.logs).toMatch('Beginning container customization');

      // delete the algorithm.
      await algoClient.deleteAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name);
    });
  });

  describe('algorithm delete call', () => {
    it('deletes for algorithm', async () => {
      await algoClient.createAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo);
      const algorithm: Algorithm = JSON.parse(
        await algoClient.getAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name)
      );

      expect(algorithm.name).toBe(testAlgo.name);

      const response = await algoClient.deleteAlgo(
        ALGORITHMIA_TEST_USERNAME,
        testAlgo.name
      );

      expect(response).toBe('');

      const deletedAlgo = await algoClient.getAlgo(
        ALGORITHMIA_TEST_USERNAME,
        testAlgo.name
      );
      expect(deletedAlgo).toBe('{"error":"No such algorithm"}');
    });
  });

  describe('algorithm create call', () => {
    it('creates for algorithm', async () => {
      const anotherAlgo = {
        details: {
          label: 'Another Algorithm',
        },
        name: 'another_algorithm',
        settings: {
          environment: 'cpu',
          language: 'python3-1',
          license: 'apl',
          network_access: 'full',
          pipeline_enabled: true,
          source_visibility: 'closed',
        },
      };
      const algorithm: Algorithm = JSON.parse(
        await algoClient.createAlgo(ALGORITHMIA_TEST_USERNAME, anotherAlgo)
      );

      expect(algorithm.name).toBe(anotherAlgo.name);
      await algoClient.deleteAlgo(ALGORITHMIA_TEST_USERNAME, anotherAlgo.name);
    });
  });

  describe('algorithm list scms call', () => {
    it('lists scms', async () => {
      const response: SCM[] = JSON.parse(await algoClient.listSCMs()).results;

      const internalSCM = response.filter((scm) => scm.id === 'internal')[0];
      expect(response.length > 0);
      expect(internalSCM.provider).toBe('internal');
    });
  });

  describe('algorithm get scm call', () => {
    it('gets an scm', async () => {
      const scm: SCM = JSON.parse(await algoClient.getSCM('internal'));

      expect(scm.enabled).toBe(true);
    });
  });

  describe('algorithm get query scm call', () => {
    it('queries an scm', async () => {
      const scmAuth: AlgorithmSCMAuthorizationStatus = JSON.parse(
        await algoClient.querySCMStatus('internal')
      );

      expect(scmAuth.authorization_status).toBe('unauthorized');
    });
  });

  /*describe('algorithm post revoke scm status call', () => {
        it('revokes an scm status', async () => {
            const response = JSON.parse(await Algorithmia.getClient(process.env.ALGORITHMIA_TEST_DEFAULT_API_KEY, process.env.ALGORITHMIA_TEST_API_ADDRESS).revokeSCMStatus('fa359f8a-5a37-4726-9174-1475b41939ef'));

            expect(response).toBe('');
        });
    });*/

  describe('organization get organization', () => {
    it('gets an organization', async () => {
      const testOrganization = {
        org_contact_name: 'some owner',
        org_email: 'SomeEmail@example.com',
        org_label: 'MyTestOrganization1',
        org_name: 'MyTestOrganization1',
        org_url: 'https://algorithmia.com',
        resource_type: 'organization',
      };

      await algoAdminClient.createOrganization(
        testOrganization,
        OrgType.Legacy
      );

      const organization: Organization = await algoAdminClient.getOrganization(
        testOrganization.org_name
      );

      expect(organization.org_name).toBe(testOrganization.org_name);
    });
  });

  describe('organization edit call', () => {
    it('edits for organization', async () => {
      const testOrganization = {
        org_contact_name: 'some owner',
        org_email: 'SomeEmail@example.com',
        org_label: 'MyTestOrganization2',
        org_name: 'MyTestOrganization2',
        org_url: 'https://algorithmia.com',
        resource_type: 'organization',
      };

      await algoAdminClient.createOrganization(
        testOrganization,
        OrgType.Legacy
      );

      const organization: Organization = await algoAdminClient.getOrganization(
        testOrganization.org_name
      );

      organization.org_email = 'SomeOtherEmail@example.com';
      await algoAdminClient.editOrganization(
        testOrganization.org_name,
        JSON.stringify(organization)
      );

      const organizationEdited: Organization =
        await algoAdminClient.getOrganization(testOrganization.org_name);

      expect(organizationEdited.org_email).toBe('SomeOtherEmail@example.com');
    });
  });

  describe('organization create call', () => {
    it('creates for organization', async () => {
      const testOrganization = {
        org_contact_name: 'some owner',
        org_email: 'SomeEmail@example.com',
        org_label: 'MyTestOrganization3',
        org_name: 'MyTestOrg3' + Date.now(),
        org_url: 'https://algorithmia.com',
        resource_type: 'organization',
      };

      const organization: Organization = JSON.parse(
        await algoAdminClient.createOrganization(
          testOrganization,
          OrgType.Legacy
        )
      );
      expect(organization.org_name).toBe(testOrganization.org_name);
    });
  });
});
