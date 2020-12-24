import { AssertionError, strict as assert } from 'assert';
import { Algorithmia } from '../src/Algorithmia';
import { DataFile, DataDir, DataList } from '../src/Data';

describe('Localisation initialization', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('algorithm file put call', () => {
    it('puts file', async (done) => {
      const file: DataFile = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');

      await file.exists().then((x) => {
        if (x == true) {
          file.delete();
        }
      });

      await file
        .parent()
        ?.exists()
        .then((x) => {
          if (x == false) {
            const dir: DataDir = file.parent()!;
            const dirName = dir.baseName();
            const dirParentDir = dir.parent();
            const dirParentName = dirParentDir?.baseName();

            const dir2: DataDir = Algorithmia.getClient(
              process.env.ALGORITHMIA_DEFAULT_API_KEY
            ).dir(dirParentName);
            dir2.post(dirName);
          }
        });
      await file.put('nah dawg');
      expect(file.exists());
      done();
    });
  });

  describe('algorithm file parent', () => {
    it('gets parent', async (done) => {
      const file: DataFile = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');
      assert((await file.parent()?.baseName()) == 'DalesNotSoFunTime2');
      done();
    });
  });

  describe('algorithm file get call', () => {
    it('gets for file', async (done) => {
      const file: DataFile = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesFunTime/NahDawg.txt');
      await file.get().then((x) => {
        assert.equal(x, 'nah dawg');
      });
      done();
    });
  });

  describe('algorithm file head call', () => {
    it('checks for file', async (done) => {
      const file: DataFile = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesFunTime/NahDawg.txt');
      await file.exists().then((x) => {
        assert.equal(x, true);
      });
      done();
    });
  });

  describe('algorithm file delete call', () => {
    it('deletes for file', async (done) => {
      const file: DataFile = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesNotSoFunTime2/NahDawg2.txt');
      await file.put('nah dawg 2');
      const expected = { result: { deleted: 1 } };
      await file.delete().then((x) => {
        assert.equal(x, JSON.stringify(expected));
      });
      done();
    });
  });

  describe('algorithm directory head call', () => {
    it('checks for directory', async (done) => {
      const dir: DataDir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime2');
      await dir.exists().then((x) => {
        assert.equal(x, true);
      });
      done();
    });
  });

  describe('algorithm directory post call', () => {
    it('creates dir', async (done) => {
      const dir: DataDir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime3');

      await dir.exists().then((x) => {
        if (x == true) {
          dir.delete(true);
        }
      });

      await dir.post('DalesNotSoFunTime3');
      expect(
        dir.exists().then((x) => {
          return x;
        })
      );
      done();
    });
  });

  describe('algorithm directory file put call', () => {
    it('puts file', async (done) => {
      const dir: DataDir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime2');
      const file: DataFile = dir.file('YeahDawg.txt');

      await file.exists().then((x) => {
        if (x == true) {
          file.delete();
        }
      });

      await dir.put(file.baseName(), 'yeah dawg');
      expect(
        file.exists().then((x) => {
          return x;
        })
      );
      done();
    });
  });

  describe('algorithm directory get call', () => {
    it('gets dir', async (done) => {
      const dir: DataDir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesFunTime');
      await dir.get().then((x) => {
        const dataList: DataList = JSON.parse(x);
        assert(dataList.files.length == 7);
      });
      done();
    });
  });

  describe('algorithm directory delete call', () => {
    it('deletes directory', async (done) => {
      const dir: DataDir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring');
      await dir.post('DalesNotSoFunTime4');
      const newDir: DataDir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime4');
      const expected = { result: { deleted: 1 } };
      await newDir.delete(true).then((x) => {
        assert.equal(x, JSON.stringify(expected));
      });
      done();
    });
  });
});
