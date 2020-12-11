"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const Algorithmia_1 = require("../src/Algorithmia");
describe("Localisation initialization", () => {
    beforeEach(() => {
        jest.resetModules();
    });
    describe('algorithm file put call', () => {
        it('puts file', async () => {
            var _a;
            let file = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');
            await file.exists().then(x => {
                if (x == true) {
                    file.delete();
                }
            });
            await ((_a = file.parent()) === null || _a === void 0 ? void 0 : _a.exists().then(x => {
                if (x == false) {
                    let dir = file.parent();
                    let dirName = dir.baseName();
                    let dirParentDir = dir.parent();
                    let dirParentName = dirParentDir === null || dirParentDir === void 0 ? void 0 : dirParentDir.baseName();
                    let dir2 = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir(dirParentName);
                    dir2.post(dirName);
                }
            }));
            await file.put('nah dawg');
            expect(file.exists().then(x => { return x; }));
        });
    });
    describe('algorithm file parent', () => {
        it('gets parent', async () => {
            var _a;
            let file = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');
            assert_1.strict(await ((_a = file.parent()) === null || _a === void 0 ? void 0 : _a.baseName()) == 'DalesNotSoFunTime2');
        });
    });
    describe('algorithm file get call', () => {
        it('gets for file', async () => {
            let file = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');
            await file.get().then(x => { assert_1.strict.equal(JSON.parse(x), 'nah dawg'); });
        });
    });
    describe('algorithm file head call', () => {
        it('checks for file', async () => {
            let file = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');
            await file.exists().then(x => { assert_1.strict.equal(x, true); });
        });
    });
    describe('algorithm file delete call', () => {
        it('deletes for file', async () => {
            let file = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('data://dherring/DalesNotSoFunTime2/NahDawg2.txt');
            await file.put('nah dawg 2');
            let expected = { "result": { "deleted": 1 } };
            await file.delete().then(x => { assert_1.strict.equal(x, JSON.stringify(expected)); });
        });
    });
    describe('algorithm directory head call', () => {
        it('checks for directory', async () => {
            let dir = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('data://dherring/DalesNotSoFunTime2');
            await dir.exists().then(x => { assert_1.strict.equal(x, true); });
        });
    });
    describe('algorithm directory get call', () => {
        it('gets dir', async () => {
            let dir = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('data://dherring/DalesNotSoFunTime2');
            await dir.get().then(x => { let dataList = JSON.parse(x); assert_1.strict(dataList.files.length == 1); });
        });
    });
    describe('algorithm directory post call', () => {
        it('creates dir', async () => {
            let dir = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('data://dherring');
            await dir.exists().then(x => {
                if (x == true) {
                    dir.delete(true);
                }
            });
            await dir.post('DalesNotSoFunTime3').then(x => { assert_1.strict.equal(JSON.parse(x), 'data://dherring/DalesNotSoFunTime3'); });
        });
    });
    /*
    describe('algorithm directory file put call', () => {
        it('puts file', () => {
            let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('data://dherring/DalesNotSoFunTime2');
            let file: DataFile = dir.file('YeahDawg.txt');
    
            file.exists().then(x => {
                if (x == true) {
                    file.delete();
                }
            })
    
            let expected = {"result":"data://dherring/DalesNotSoFunTime2/YeahDawg.txt"};
            dir.put(file.baseName(), 'yeah dawg').then(x => { assert(x == expected) });
        });
    });
    
    describe('algorithm directory delete call', () => {
        it('deletes directory', () => {
            let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('data://dherring/DalesNotSoFunTime2');
            let expected = {"result":{"deleted":2}};
            dir.delete(true).then(x => { assert(x == JSON.stringify(expected)) });
        });
    });*/
});
//# sourceMappingURL=Data.test.js.map