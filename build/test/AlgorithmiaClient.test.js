"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const Algorithmia_1 = require("../src/Algorithmia");
const Algorithm_1 = require("../src/Algorithm");
describe("Localisation initialization", () => {
    beforeEach(() => {
        jest.resetModules();
    });
    describe('algorithm get call', () => {
        it('gets for algorithm', async () => {
            await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).getAlgo('dherring', 'ResultFile').then(x => {
                let algorithm = JSON.parse(x);
                assert_1.strict.equal(algorithm.name, 'ResultFile');
            });
        });
    });
    describe('algorithm versions list call', () => {
        it('gets for algorithm versions list', async () => {
            await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).listAlgoVersions('dherring', 'ResultFile').then(x => {
                let algorithmVersionsList = JSON.parse(x);
                assert_1.strict.equal(algorithmVersionsList.results.length, 46);
            });
        });
    });
    describe('algorithm builds list call', () => {
        it('gets for algorithm builds list', async () => {
            await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).listAlgoBuilds('dherring', 'ResultFile').then(x => {
                let algorithmBuildsList = JSON.parse(x);
                assert_1.strict.equal(algorithmBuildsList.results.length, 50);
            });
        });
    });
    describe('algorithm builds log call', () => {
        it('gets for algorithm build logs', async () => {
            await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).getAlgoBuildLogs('dherring', 'ResultFile', '579ff0a8-6b1f-4cf4-83a5-c7cb6999ae24').then(x => {
                assert_1.strict(x);
            });
        });
    });
    describe('algorithm delete call', () => {
        it('deletes for algorithm', async () => {
            let testAlgo = Algorithm_1.Algorithm.prototype.createTestAlgo();
            await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).createAlgo('dherring', testAlgo);
            await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).deleteAlgo('dherring', 'my_first_algorithm').then(x => {
                assert_1.strict.equal(x, '');
            });
        });
    });
    describe('algorithm create call', () => {
        it('creates for algorithm', async () => {
            let testAlgo = Algorithm_1.Algorithm.prototype.createTestAlgo();
            await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).createAlgo('dherring', testAlgo).then(x => {
                let algorithm = JSON.parse(x);
                assert_1.strict.equal(algorithm.name, testAlgo.name);
            });
            await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).deleteAlgo('dherring', 'my_first_algorithm');
        });
    });
});
describe('algorithm get scms call', () => {
    it('lists scms', async () => {
        await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).listSCMs().then(x => {
            assert_1.strict(x.length > 0);
        });
    });
});
describe('algorithm get scm call', () => {
    it('gets an scm', async () => {
        await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).getSCM('internal').then(x => {
            let scm = JSON.parse(x);
            assert_1.strict.equal(scm.enabled, true);
        });
    });
});
describe('algorithm get query scm call', () => {
    it('queries an scm', async () => {
        await Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).querySCMStatus('github').then(x => {
            let scmAuth = JSON.parse(x);
            assert_1.strict.equal(scmAuth.authorization_status, "authorized");
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
//# sourceMappingURL=AlgorithmiaClient.test.js.map