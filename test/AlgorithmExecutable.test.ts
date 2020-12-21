import { strict as assert } from 'assert';
import { Algorithmia } from '../src/Algorithmia';

describe("Localisation initialization", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('algorithm pipe call', () => {
        it('invokes algorithm', async() => {
            let input =  {"user_file" : "data://dherring/DalesFunTime/SpongebobMockingApp.jpg"};
            let expected = 'Before bytes -  14004 after bytes -  24776 result file path - {"imageSaveLocation":"data://dherring/DalesFunTime/save_location.png","rectsSaveLocation":"data://dherring/DalesFunTime/save_location.pngrects.txt"}';
            Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).algo("dherring/ResultFile").pipe(input, '0.5.37').then(x => { assert.equal(x, expected) });
        });
    });

});
