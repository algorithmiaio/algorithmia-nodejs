import { strict as assert } from 'assert';
import { Algorithmia } from '../src/Algorithmia';
import { Algorithm, SCM, AlgorithmVersionsList, AlgorithmBuildsList, AlgorithmSCMAuthorizationStatus } from '../src/Algorithm';

describe("Localisation initialization", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('algorithm get call', () => {
        it('gets for algorithm', async () => {
            await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).getAlgo('dherring', 'ResultFile').then(x => {
                let algorithm: Algorithm = JSON.parse(x); assert.equal(algorithm.name, 'ResultFile')
            });
        });
    });

    describe('algorithm versions list call', () => {
        it('gets for algorithm versions list', async () => {
            await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).listAlgoVersions('dherring', 'ResultFile').then(x => {
                let algorithmVersionsList: AlgorithmVersionsList = JSON.parse(x); assert.equal(algorithmVersionsList.results.length, 46)
            });
        });
    });

    describe('algorithm builds list call', () => {
        it('gets for algorithm builds list', async () => {
            await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).listAlgoBuilds('dherring', 'ResultFile').then(x => {
                let algorithmBuildsList: AlgorithmBuildsList = JSON.parse(x); assert.equal(algorithmBuildsList.results.length, 50)
            });
        });
    });

    describe('algorithm builds log call', () => {
        it('gets for algorithm build logs', async () => {
            await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).getAlgoBuildLogs('dherring', 'ResultFile', '579ff0a8-6b1f-4cf4-83a5-c7cb6999ae24').then(x => {
                assert(x)
            });
        });
    });

    describe('algorithm delete call', () => {
        it('deletes for algorithm', async () => {
            let testAlgo = Algorithm.prototype.createTestAlgo();
            await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).createAlgo('dherring', testAlgo);
            await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).deleteAlgo('dherring', 'my_first_algorithm').then(x => {
                assert.equal(x, '');
            });
        });
    });

    describe('algorithm create call', () => {
        it('creates for algorithm', async () => {
            let testAlgo = Algorithm.prototype.createTestAlgo();
            await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).createAlgo('dherring', testAlgo).then(x => {
                let algorithm: Algorithm = JSON.parse(x); assert.equal(algorithm.name, testAlgo.name);
            });
            await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).deleteAlgo('dherring', 'my_first_algorithm');
        });
    })
});

describe('algorithm get scms call', () => {
    it('lists scms', async () => {
        await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).listSCMs().then(x => {
            assert(x.length > 0);
        });
    });
});

describe('algorithm get scm call', () => {
    it('gets an scm', async () => {
        await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).getSCM('internal').then(x => {
            let scm: SCM = JSON.parse(x); assert.equal(scm.enabled, true);
        });
    });
});

describe('algorithm get query scm call', () => {
    it('queries an scm', async () => {
        await Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).querySCMStatus('github').then(x => {
            let scmAuth: AlgorithmSCMAuthorizationStatus = JSON.parse(x); assert.equal(scmAuth.authorization_status, "authorized");
        });
    });
});

/*describe('algorithm post revoke scm status call', () => {
    it('revokes an scm status', async () => {
        await Algorithmia.getClient(process.env.ALGORITHMIA_TEST_DEFAULT_KEY, process.env.ALGORITHMIA_TEST_ADDRESS).revokeSCMStatus('fa359f8a-5a37-4726-9174-1475b41939ef').then(x => {
            assert.equal(x, '');
        });
    });
});*/