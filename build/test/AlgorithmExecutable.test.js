"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const Algorithmia_1 = require("../src/Algorithmia");
describe("Localisation initialization", () => {
    beforeEach(() => {
        jest.resetModules();
    });
    describe('algorithm pipe call', () => {
        it('invokes algorithm', async () => {
            let input = { "user_file": "data://dherring/DalesFunTime/SpongebobMockingApp.jpg" };
            let expected = 'Before bytes -  14004 after bytes -  24776 result file path - {"imageSaveLocation":"data://dherring/DalesFunTime/save_location.png","rectsSaveLocation":"data://dherring/DalesFunTime/save_location.pngrects.txt"}';
            Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).algo("dherring/ResultFile").pipe(input, 'raw').then(x => { assert_1.strict.equal(x, expected); });
        });
    });
});
//# sourceMappingURL=AlgorithmExecutable.test.js.map