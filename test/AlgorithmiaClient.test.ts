import { Algorithmia } from '../src/Algorithmia';
import {
  Algorithm,
  SCM,
  AlgorithmVersionsList,
  AlgorithmBuildsList,
  AlgorithmSCMAuthorizationStatus,
  Organization,
  OrgType
} from '../src/Algorithm';

describe('Localisation initialization', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('algorithm get call', () => {
    it('gets for algorithm', async () => {
      const algorithm: Algorithm = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_DEFAULT_API_KEY
        ).getAlgo('dherring', 'ResultFile')
      );

      expect(algorithm.name).toBe('ResultFile');
    });
  });

  describe('algorithm versions list call', () => {
    it('gets for algorithm versions list', async () => {
      const algorithmVersionsList: AlgorithmVersionsList = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_DEFAULT_API_KEY
        ).listAlgoVersions('dherring', 'ResultFile')
      );

      expect(algorithmVersionsList.results.length).toBe(50);
    });
  });

  describe('algorithm builds list call', () => {
    it('gets for algorithm builds list', async () => {
      const algorithmBuildsList: AlgorithmBuildsList = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_DEFAULT_API_KEY
        ).listAlgoBuilds('dherring', 'ResultFile')
      );

      expect(algorithmBuildsList.results.length).toBe(50);
    });
  });

  describe('algorithm builds log call', () => {
    it('gets for algorithm build logs', async () => {
      const response: [] = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_DEFAULT_API_KEY
        ).getAlgoBuildLogs(
          'dherring',
          'ResultFile',
          '579ff0a8-6b1f-4cf4-83a5-c7cb6999ae24'
        )
      );

      expect(response.length > 0);
    });
  });

  describe('algorithm delete call', () => {
    it('deletes for algorithm', async () => {
      const testAlgo = Algorithm.prototype.createTestAlgo();
      await Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).createAlgo('dherring', testAlgo);

      const response = await Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).deleteAlgo('dherring', 'my_first_algorithm');

      expect(response).toBe('');
    });
  });

  describe('algorithm create call', () => {
    it('creates for algorithm', async () => {
      const testAlgo = Algorithm.prototype.createTestAlgo();
      const algorithm: Algorithm = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_DEFAULT_API_KEY
        ).createAlgo('dherring', testAlgo)
      );

      expect(algorithm.name).toBe('my_first_algorithm');

      await Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).deleteAlgo('dherring', 'my_first_algorithm');
    });
  });

  describe('algorithm list scms call', () => {
    it('lists scms', async () => {
      const response: SCM[] = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_DEFAULT_API_KEY
        ).listSCMs()
      );

      expect(response.length > 0);
    });
  });

  describe('algorithm get scm call', () => {
    it('gets an scm', async () => {
      const scm: SCM = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_DEFAULT_API_KEY
        ).getSCM('internal')
      );

      expect(scm.enabled).toBe(true);
    });
  });

  describe('algorithm get query scm call', () => {
    it('queries an scm', async () => {
      const scmAuth: AlgorithmSCMAuthorizationStatus = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_DEFAULT_API_KEY
        ).querySCMStatus('github')
      );

      expect(scmAuth.authorization_status).toBe('authorized');
    });
  });

  /*describe('algorithm post revoke scm status call', () => {
        it('revokes an scm status', async () => {
            const response = JSON.parse(await Algorithmia.getClient(process.env.ALGORITHMIA_TEST_DEFAULT_KEY, process.env.ALGORITHMIA_TEST_ADDRESS).revokeSCMStatus('fa359f8a-5a37-4726-9174-1475b41939ef'));

            expect(response).toBe('');
        });
    });*/

  describe('organization get organization', () => {
    it('gets an organization', async () => {
      const organization: Organization = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_ADMIN_API_KEY,
          process.env.ALGORITHMIA_TEST_ADDRESS
        ).getOrganization('MyOrg1614039696593')
      );

      expect(organization.org_name).toBe('MyOrg1614039696593');
    });
  });

  describe('organization edit call', () => {
    it('edits for organization', async () => {
      const organization: Organization = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_ADMIN_API_KEY,
          process.env.ALGORITHMIA_TEST_ADDRESS
        ).getOrganization('MyOrg1614118479820'));
      organization.org_email = 'SomeOtherEmail@HowDoYouEven.com'
      const response = await Algorithmia.getClient(
        process.env.ALGORITHMIA_ADMIN_API_KEY,
        process.env.ALGORITHMIA_TEST_ADDRESS
      ).editOrganization(organization.org_name, JSON.stringify(organization));
      expect(response).toBe('');
    });
  });

  describe('organization create call', () => {
    it('creates for organization', async () => {
      const testOrganization = {
        org_contact_name: 'some owner',
        org_email: 'SomeEmail@Whatsittoyou.com',
        org_label: 'myLabel',
        org_name: 'MyOrg' + Date.now(),
        org_url: 'https://algorithmia.com',
        resource_type: 'organization'
      };

      const organization: Organization = JSON.parse(
        await Algorithmia.getClient(
          process.env.ALGORITHMIA_ADMIN_API_KEY,
          process.env.ALGORITHMIA_TEST_ADDRESS
        ).createOrganization(testOrganization, OrgType.Legacy)
      );
      expect(organization.org_name).toBe(testOrganization.org_name);
    });
  });
});
